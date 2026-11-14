import { spawn, execFile } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import zlib from 'zlib';
import { promisify } from 'util';
import { getCloudSession } from './cloudSessionStore';

const execFileAsync = promisify(execFile);

const TF_VERSION = '1.9.8';
const TF_BIN_DIR = path.join(os.tmpdir(), 'multicloud-tf-bin');
const TF_BIN_PATH = path.join(TF_BIN_DIR, 'terraform');
const TF_WORKSPACES_ROOT = path.join(os.tmpdir(), 'multicloud-tf-workspaces');

export type TerraformJobAction =
  | 'init'
  | 'validate'
  | 'plan'
  | 'apply'
  | 'refresh'
  | 'destroy'
  | 'replace-target'
  | 'destroy-target';

export interface TerraformPlanChange {
  address: string;
  type: string;
  name: string;
  actions: string[];
}

export interface TerraformPlanSummary {
  add: number;
  change: number;
  destroy: number;
  changes: TerraformPlanChange[];
}

export interface ProvisionedResourceInfo {
  address: string;
  type: string;
  name: string;
  provider: string;
  cloudResourceId: string;
  status: 'running' | 'stopped' | 'error' | 'destroyed' | 'unprovisioned';
  publicIp?: string;
  privateIp?: string;
  endpoint?: string;
  region?: string;
  consoleUrl?: string;
  diagramElementId?: string;
  attributes?: Record<string, any>;
}

export interface TerraformJobState {
  jobId: string;
  workspaceId: string;
  connectionId?: string;
  action: TerraformJobAction;
  targetAddress?: string;
  status: 'queued' | 'running' | 'succeeded' | 'failed';
  startedAt: string;
  finishedAt?: string;
  exitCode?: number | null;
  logs: string[];
  planSummary?: TerraformPlanSummary;
  outputs?: Record<string, { value: any; type?: any }>;
  resources?: ProvisionedResourceInfo[];
  error?: string;
}

const jobsMap = new Map<string, TerraformJobState>();
let binaryInstallPromise: Promise<string> | null = null;
let cachedTerraformBinary: string | null = null;

function stripAnsi(str: string): string {
  // eslint-disable-next-line no-control-regex
  return str.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '');
}

function sanitizeWorkspaceId(raw: string): string {
  const cleaned = String(raw || 'default').replace(/[^a-zA-Z0-9_-]/g, '_');
  return cleaned.slice(0, 80) || 'default';
}

export function getWorkspaceDir(workspaceId: string): string {
  const safeId = sanitizeWorkspaceId(workspaceId);
  const dir = path.join(TF_WORKSPACES_ROOT, safeId);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

export async function getTerraformStatus(): Promise<{ installed: boolean; path?: string; version?: string }> {
  try {
    if (cachedTerraformBinary && fs.existsSync(cachedTerraformBinary)) {
      const { stdout } = await execFileAsync(cachedTerraformBinary, ['version', '-json'], { timeout: 5000 });
      const parsed = JSON.parse(stdout);
      return { installed: true, path: cachedTerraformBinary, version: parsed.terraform_version };
    }
    // Check system PATH
    try {
      const { stdout: whichOut } = await execFileAsync('which', ['terraform'], { timeout: 3000 });
      const sysBin = whichOut.trim();
      if (sysBin) {
        const { stdout } = await execFileAsync(sysBin, ['version', '-json'], { timeout: 5000 });
        const parsed = JSON.parse(stdout);
        cachedTerraformBinary = sysBin;
        return { installed: true, path: sysBin, version: parsed.terraform_version };
      }
    } catch {
      // not on PATH
    }

    if (fs.existsSync(TF_BIN_PATH)) {
      const { stdout } = await execFileAsync(TF_BIN_PATH, ['version', '-json'], { timeout: 5000 });
      const parsed = JSON.parse(stdout);
      cachedTerraformBinary = TF_BIN_PATH;
      return { installed: true, path: TF_BIN_PATH, version: parsed.terraform_version };
    }
  } catch {
    // ignore
  }
  return { installed: false };
}

function extractZipArchive(zipBuffer: Buffer, destDir: string): string[] {
  // Locate End of Central Directory (EOCD) signature 0x06054b50
  const minOffset = Math.max(0, zipBuffer.length - 65557);
  let eocdOffset = -1;
  for (let i = zipBuffer.length - 22; i >= minOffset; i--) {
    if (zipBuffer.readUInt32LE(i) === 0x06054b50) {
      eocdOffset = i;
      break;
    }
  }
  if (eocdOffset === -1) {
    throw new Error('Arquivo ZIP do Terraform inválido (assinatura EOCD não encontrada).');
  }

  const totalEntries = zipBuffer.readUInt16LE(eocdOffset + 10);
  const cdOffset = zipBuffer.readUInt32LE(eocdOffset + 16);
  const resolvedDest = path.resolve(destDir);
  const extractedFiles: string[] = [];

  let offset = cdOffset;
  for (let i = 0; i < totalEntries; i++) {
    if (offset + 46 > zipBuffer.length || zipBuffer.readUInt32LE(offset) !== 0x02014b50) {
      throw new Error('Cabeçalho do diretório central ZIP inválido.');
    }

    const compressionMethod = zipBuffer.readUInt16LE(offset + 10);
    const compressedSize = zipBuffer.readUInt32LE(offset + 20);
    const fileNameLen = zipBuffer.readUInt16LE(offset + 28);
    const extraLen = zipBuffer.readUInt16LE(offset + 30);
    const commentLen = zipBuffer.readUInt16LE(offset + 32);
    const localHeaderOffset = zipBuffer.readUInt32LE(offset + 42);
    const fileName = zipBuffer.subarray(offset + 46, offset + 46 + fileNameLen).toString('utf8');
    offset += 46 + fileNameLen + extraLen + commentLen;

    if (fileName.endsWith('/')) continue;

    const targetPath = path.resolve(resolvedDest, fileName);
    if (!targetPath.startsWith(resolvedDest + path.sep)) {
      continue;
    }

    if (localHeaderOffset + 30 > zipBuffer.length || zipBuffer.readUInt32LE(localHeaderOffset) !== 0x04034b50) {
      throw new Error(`Cabeçalho local ZIP inválido para ${fileName}.`);
    }

    const lfNameLen = zipBuffer.readUInt16LE(localHeaderOffset + 26);
    const lfExtraLen = zipBuffer.readUInt16LE(localHeaderOffset + 28);
    const dataStart = localHeaderOffset + 30 + lfNameLen + lfExtraLen;
    const compressedData = zipBuffer.subarray(dataStart, dataStart + compressedSize);

    let fileData: Buffer;
    if (compressionMethod === 0) {
      fileData = compressedData;
    } else if (compressionMethod === 8) {
      fileData = zlib.inflateRawSync(compressedData);
    } else {
      throw new Error(`Método de compressão ZIP não suportado (${compressionMethod}) para ${fileName}.`);
    }

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, fileData);
    extractedFiles.push(targetPath);
  }

  return extractedFiles;
}

export async function ensureTerraformBinary(onLog?: (msg: string) => void): Promise<string> {
  const status = await getTerraformStatus();
  if (status.installed && status.path) {
    return status.path;
  }
  if (binaryInstallPromise) {
    return binaryInstallPromise;
  }

  binaryInstallPromise = (async () => {
    try {
      if (!fs.existsSync(TF_BIN_DIR)) {
        fs.mkdirSync(TF_BIN_DIR, { recursive: true });
      }
      const arch = process.arch === 'arm64' ? 'arm64' : 'amd64';
      const zipName = `terraform_${TF_VERSION}_linux_${arch}.zip`;
      const downloadUrl = `https://releases.hashicorp.com/terraform/${TF_VERSION}/${zipName}`;

      onLog?.(`[MultiCloud Studio] Baixando HashiCorp Terraform v${TF_VERSION} (${arch})...`);

      const res = await fetch(downloadUrl, { signal: AbortSignal.timeout(120000) });
      if (!res.ok) {
        throw new Error(`Falha ao baixar Terraform (${res.status} ${res.statusText})`);
      }
      const zipBuffer = Buffer.from(await res.arrayBuffer());

      onLog?.(`[MultiCloud Studio] Extraindo binário oficial do Terraform...`);
      extractZipArchive(zipBuffer, TF_BIN_DIR);

      if (!fs.existsSync(TF_BIN_PATH)) {
        throw new Error('Binário do Terraform não encontrado após extração do pacote.');
      }
      fs.chmodSync(TF_BIN_PATH, 0o755);
      cachedTerraformBinary = TF_BIN_PATH;
      onLog?.(`[MultiCloud Studio] Terraform v${TF_VERSION} pronto em ${TF_BIN_PATH}.`);
      return TF_BIN_PATH;
    } finally {
      binaryInstallPromise = null;
    }
  })();

  return binaryInstallPromise;
}

export function syncWorkspaceFiles(
  workspaceId: string,
  files: Record<string, string>,
  hclElementMap?: Record<string, { elementId: string; elementType: 'node' | 'container'; name: string }>
) {
  const dir = getWorkspaceDir(workspaceId);
  const allowedPattern = /^[a-zA-Z0-9_.-]+\.(tf|tfvars)$/;
  const written: string[] = [];

  for (const [filename, content] of Object.entries(files)) {
    if (!allowedPattern.test(filename)) continue;
    if (typeof content !== 'string') continue;
    fs.writeFileSync(path.join(dir, filename), content, 'utf8');
    written.push(filename);
  }

  if (hclElementMap) {
    fs.writeFileSync(path.join(dir, '.canvas-map.json'), JSON.stringify(hclElementMap, null, 2), 'utf8');
  }

  return { workspaceId: sanitizeWorkspaceId(workspaceId), directory: dir, files: written };
}

function loadCanvasMap(
  workspaceId: string
): Record<string, { elementId: string; elementType: 'node' | 'container'; name: string }> {
  const mapFile = path.join(getWorkspaceDir(workspaceId), '.canvas-map.json');
  if (!fs.existsSync(mapFile)) return {};
  try {
    return JSON.parse(fs.readFileSync(mapFile, 'utf8'));
  } catch {
    return {};
  }
}

function buildCredentialEnv(connectionId?: string): {
  env: Record<string, string>;
  tempFiles: string[];
} {
  const env: Record<string, string> = {
    ...process.env as Record<string, string>,
    TF_IN_AUTOMATION: '1',
    TF_INPUT: '0',
    CHECKPOINT_DISABLE: '1',
  };
  const tempFiles: string[] = [];

  if (!connectionId) {
    return { env, tempFiles };
  }

  const session = getCloudSession(connectionId);
  if (!session) {
    return { env, tempFiles };
  }

  const s = session.secrets;
  if (s.provider === 'aws') {
    if (s.awsAccessKeyId) env.AWS_ACCESS_KEY_ID = s.awsAccessKeyId;
    if (s.awsSecretAccessKey) env.AWS_SECRET_ACCESS_KEY = s.awsSecretAccessKey;
    if (s.awsSessionToken) env.AWS_SESSION_TOKEN = s.awsSessionToken;
    if (s.region) {
      env.AWS_DEFAULT_REGION = s.region;
      env.AWS_REGION = s.region;
      env.TF_VAR_aws_region = s.region;
    }
  } else if (s.provider === 'azure') {
    if (s.azureTenantId) env.ARM_TENANT_ID = s.azureTenantId;
    if (s.azureClientId) env.ARM_CLIENT_ID = s.azureClientId;
    if (s.azureClientSecret) env.ARM_CLIENT_SECRET = s.azureClientSecret;
    if (s.azureSubscriptionId) env.ARM_SUBSCRIPTION_ID = s.azureSubscriptionId;
    if (s.region) env.TF_VAR_azure_region = s.region;
  } else if (s.provider === 'gcp') {
    if (s.gcpProjectId) {
      env.GOOGLE_PROJECT = s.gcpProjectId;
      env.GCLOUD_PROJECT = s.gcpProjectId;
      env.TF_VAR_gcp_project_id = s.gcpProjectId;
    }
    if (s.region) {
      env.GOOGLE_REGION = s.region;
      env.TF_VAR_gcp_region = s.region;
    }
    if (s.gcpServiceAccountJson) {
      const tmpCred = path.join(
        os.tmpdir(),
        `mc-gcp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.json`
      );
      fs.writeFileSync(tmpCred, s.gcpServiceAccountJson, { mode: 0o600 });
      env.GOOGLE_APPLICATION_CREDENTIALS = tmpCred;
      tempFiles.push(tmpCred);
    }
  } else if (s.provider === 'oci') {
    if (s.ociTenancyOcid) {
      env.OCI_TENANCY_OCID = s.ociTenancyOcid;
      env.TF_VAR_oci_tenancy_ocid = s.ociTenancyOcid;
    }
    if (s.ociCompartmentId) {
      env.TF_VAR_oci_compartment_id = s.ociCompartmentId;
    } else if (s.ociTenancyOcid) {
      env.TF_VAR_oci_compartment_id = s.ociTenancyOcid;
    }
    if (s.ociUserOcid) env.OCI_USER_OCID = s.ociUserOcid;
    if (s.ociFingerprint) env.OCI_FINGERPRINT = s.ociFingerprint;
    if (s.region) {
      env.OCI_REGION = s.region;
      env.TF_VAR_oci_region = s.region;
    }
    if (s.ociPrivateKeyPem) {
      const tmpPem = path.join(
        os.tmpdir(),
        `mc-oci-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.pem`
      );
      fs.writeFileSync(tmpPem, s.ociPrivateKeyPem, { mode: 0o600 });
      env.OCI_PRIVATE_KEY_PATH = tmpPem;
      tempFiles.push(tmpPem);
    }
  }

  return { env, tempFiles };
}

function cleanupTempFiles(files: string[]) {
  for (const f of files) {
    try {
      if (fs.existsSync(f)) fs.unlinkSync(f);
    } catch {
      // ignore
    }
  }
}

function buildConsoleUrlForResource(
  provider: string,
  resType: string,
  id: string,
  region?: string
): string | undefined {
  const reg = region || 'us-east-1';
  if (provider === 'aws') {
    if (resType === 'aws_instance') {
      return `https://${reg}.console.aws.amazon.com/ec2/home?region=${reg}#InstanceDetails:instanceId=${id}`;
    }
    if (resType === 'aws_vpc') {
      return `https://${reg}.console.aws.amazon.com/vpcconsole/home?region=${reg}#VpcDetails:VpcId=${id}`;
    }
    if (resType === 'aws_s3_bucket') {
      return `https://s3.console.aws.amazon.com/s3/buckets/${encodeURIComponent(id)}?region=${reg}`;
    }
    if (resType === 'aws_db_instance') {
      return `https://${reg}.console.aws.amazon.com/rds/home?region=${reg}#database:id=${id}`;
    }
  }
  if (provider === 'gcp') {
    if (resType === 'google_compute_instance') {
      return `https://console.cloud.google.com/compute/instances`;
    }
    if (resType === 'google_storage_bucket') {
      return `https://console.cloud.google.com/storage/browser/${encodeURIComponent(id)}`;
    }
  }
  if (provider === 'azure' && id.startsWith('/subscriptions/')) {
    return `https://portal.azure.com/#@/resource${id}`;
  }
  if (provider === 'oci' && id.startsWith('ocid1.')) {
    return `https://cloud.oracle.com/?region=${reg}`;
  }
  return undefined;
}

function detectProviderFromType(resType: string): string {
  if (resType.startsWith('aws_')) return 'aws';
  if (resType.startsWith('azurerm_')) return 'azure';
  if (resType.startsWith('google_')) return 'gcp';
  if (resType.startsWith('oci_')) return 'oci';
  return 'generic';
}

export async function readTerraformState(
  workspaceId: string,
  connectionId?: string
): Promise<{
  resources: ProvisionedResourceInfo[];
  outputs: Record<string, { value: any; type?: any }>;
}> {
  const dir = getWorkspaceDir(workspaceId);
  const tfstatePath = path.join(dir, 'terraform.tfstate');
  const canvasMap = loadCanvasMap(workspaceId);
  const resources: ProvisionedResourceInfo[] = [];
  let outputs: Record<string, { value: any; type?: any }> = {};

  if (!fs.existsSync(tfstatePath)) {
    return { resources, outputs };
  }

  const tfBin = await ensureTerraformBinary();
  const { env, tempFiles } = buildCredentialEnv(connectionId);

  try {
    try {
      const { stdout: showOut } = await execFileAsync(tfBin, ['show', '-json'], {
        cwd: dir,
        env,
        timeout: 20000,
        maxBuffer: 10 * 1024 * 1024,
      });
      const parsed = JSON.parse(showOut);
      const rootResources = parsed?.values?.root_module?.resources || [];

      for (const r of rootResources) {
        const vals = r.values || {};
        const cloudResourceId = String(vals.id || vals.arn || vals.name || r.address);
        const provider = detectProviderFromType(r.type || '');
        const hclName = String(r.name || '');
        const mapped = canvasMap[hclName];
        const instanceStateRaw = String(vals.instance_state || vals.status || vals.state || '').toLowerCase();
        const status: ProvisionedResourceInfo['status'] =
          instanceStateRaw === 'stopped' || instanceStateRaw === 'terminated' ? 'stopped' : 'running';

        const region = vals.region || vals.location || env.AWS_DEFAULT_REGION || env.TF_VAR_gcp_region || env.TF_VAR_oci_region;

        resources.push({
          address: r.address,
          type: r.type,
          name: hclName,
          provider,
          cloudResourceId,
          status,
          publicIp: vals.public_ip || vals.access_config?.[0]?.nat_ip || undefined,
          privateIp: vals.private_ip || vals.network_interface?.[0]?.network_ip || undefined,
          endpoint: vals.endpoint || vals.dns_name || vals.bucket_domain_name || vals.self_link || undefined,
          region,
          consoleUrl: buildConsoleUrlForResource(provider, r.type, cloudResourceId, region),
          diagramElementId: mapped?.elementId,
          attributes: {
            instanceType: vals.instance_type || vals.machine_type || vals.size || vals.shape,
            cidrBlock: vals.cidr_block || vals.ip_cidr_range,
          },
        });
      }
    } catch (err) {
      console.warn('[Terraform show -json]:', (err as Error).message);
    }

    try {
      const { stdout: outJson } = await execFileAsync(tfBin, ['output', '-json'], {
        cwd: dir,
        env,
        timeout: 15000,
      });
      if (outJson.trim()) {
        outputs = JSON.parse(outJson);
      }
    } catch {
      // outputs might be empty
    }
  } finally {
    cleanupTempFiles(tempFiles);
  }

  return { resources, outputs };
}

function parsePlanSummary(planJson: any): TerraformPlanSummary {
  let add = 0;
  let change = 0;
  let destroy = 0;
  const changes: TerraformPlanChange[] = [];

  for (const rc of planJson?.resource_changes || []) {
    const actions: string[] = rc?.change?.actions || [];
    if (actions.length === 1 && actions[0] === 'no-op') continue;
    if (actions.includes('create')) add++;
    if (actions.includes('update')) change++;
    if (actions.includes('delete')) destroy++;
    changes.push({
      address: rc.address,
      type: rc.type,
      name: rc.name,
      actions,
    });
  }

  return { add, change, destroy, changes };
}

export function getTerraformJob(jobId: string): TerraformJobState | undefined {
  return jobsMap.get(jobId);
}

export function startTerraformJob(params: {
  workspaceId: string;
  connectionId?: string;
  action: TerraformJobAction;
  targetAddress?: string;
}): TerraformJobState {
  const workspaceId = sanitizeWorkspaceId(params.workspaceId);
  const jobId = `tfjob_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  const job: TerraformJobState = {
    jobId,
    workspaceId,
    connectionId: params.connectionId,
    action: params.action,
    targetAddress: params.targetAddress,
    status: 'queued',
    startedAt: new Date().toISOString(),
    logs: [],
  };
  jobsMap.set(jobId, job);

  const pushLog = (line: string) => {
    const cleaned = stripAnsi(line);
    if (!cleaned.trim()) return;
    job.logs.push(cleaned);
    if (job.logs.length > 1500) {
      job.logs.splice(0, job.logs.length - 1500);
    }
  };

  // Run asynchronously
  (async () => {
    const dir = getWorkspaceDir(workspaceId);
    let tempFiles: string[] = [];

    try {
      job.status = 'running';
      const tfBin = await ensureTerraformBinary(pushLog);
      const cred = buildCredentialEnv(params.connectionId);
      tempFiles = cred.tempFiles;

      const runCmd = (args: string[]) =>
        new Promise<number>((resolve, reject) => {
          pushLog(`$ terraform ${args.join(' ')}`);
          const child = spawn(tfBin, args, {
            cwd: dir,
            env: cred.env,
            stdio: ['ignore', 'pipe', 'pipe'],
          });

          const handleChunk = (buf: Buffer) => {
            const text = buf.toString('utf8');
            text.split(/\r?\n/).forEach((l) => {
              if (l.length > 0) pushLog(l);
            });
          };

          child.stdout.on('data', handleChunk);
          child.stderr.on('data', handleChunk);
          child.on('error', reject);
          child.on('close', (code) => resolve(code ?? 1));
        });

      // Ensure .terraform exists for non-init commands
      const dotTerraformExists = fs.existsSync(path.join(dir, '.terraform'));
      if (params.action !== 'init' && !dotTerraformExists) {
        pushLog('[MultiCloud Studio] Executando terraform init automaticamente...');
        const initCode = await runCmd(['init', '-no-color']);
        if (initCode !== 0) {
          job.status = 'failed';
          job.exitCode = initCode;
          job.error = 'terraform init falhou antes da execução.';
          job.finishedAt = new Date().toISOString();
          return;
        }
      }

      let args: string[] = [];
      if (params.action === 'init') {
        args = ['init', '-upgrade', '-no-color'];
      } else if (params.action === 'validate') {
        args = ['validate', '-no-color'];
      } else if (params.action === 'plan') {
        args = ['plan', '-no-color', '-out=tfplan'];
      } else if (params.action === 'apply') {
        args = ['apply', '-auto-approve', '-no-color'];
      } else if (params.action === 'refresh') {
        args = ['refresh', '-no-color'];
      } else if (params.action === 'destroy') {
        args = ['destroy', '-auto-approve', '-no-color'];
      } else if (params.action === 'replace-target') {
        if (!params.targetAddress) throw new Error('targetAddress obrigatório para replace-target.');
        args = ['apply', `-replace=${params.targetAddress}`, '-auto-approve', '-no-color'];
      } else if (params.action === 'destroy-target') {
        if (!params.targetAddress) throw new Error('targetAddress obrigatório para destroy-target.');
        args = ['destroy', `-target=${params.targetAddress}`, '-auto-approve', '-no-color'];
      }

      const exitCode = await runCmd(args);
      job.exitCode = exitCode;

      if (exitCode !== 0) {
        job.status = 'failed';
        job.error = `Comando terraform ${params.action} encerrou com código ${exitCode}.`;
        job.finishedAt = new Date().toISOString();
        return;
      }

      // Extract Plan JSON summary if action === plan
      if (params.action === 'plan' && fs.existsSync(path.join(dir, 'tfplan'))) {
        try {
          const { stdout: planOut } = await execFileAsync(tfBin, ['show', '-json', 'tfplan'], {
            cwd: dir,
            env: cred.env,
            timeout: 20000,
            maxBuffer: 10 * 1024 * 1024,
          });
          job.planSummary = parsePlanSummary(JSON.parse(planOut));
        } catch (err) {
          pushLog(`[Aviso] Não foi possível extrair resumo JSON do plan: ${(err as Error).message}`);
        }
      }

      // Extract State & Outputs if apply/refresh/destroy/target
      if (
        ['apply', 'refresh', 'destroy', 'replace-target', 'destroy-target'].includes(params.action)
      ) {
        const stateSnapshot = await readTerraformState(workspaceId, params.connectionId);
        job.resources = stateSnapshot.resources;
        job.outputs = stateSnapshot.outputs;
      }

      job.status = 'succeeded';
      job.finishedAt = new Date().toISOString();
    } catch (err: any) {
      job.status = 'failed';
      job.error = err?.message || 'Erro desconhecido ao executar Terraform';
      pushLog(`[ERRO] ${job.error}`);
      job.finishedAt = new Date().toISOString();
    } finally {
      cleanupTempFiles(tempFiles);
    }
  })();

  return job;
}
