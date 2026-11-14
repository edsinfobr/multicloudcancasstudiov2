import crypto from 'crypto';
import { ActiveCloudSecrets, RealCloudProvider } from './cloudSessionStore';

export interface VerificationResult {
  valid: boolean;
  accountHint: string;
  message: string;
  metadata?: Record<string, any>;
}

export interface DiscoveredCloudResourceServer {
  id: string;
  name: string;
  provider: RealCloudProvider;
  service: string;
  resourceType: string;
  iconKey: string;
  category:
    | 'compute'
    | 'storage'
    | 'database'
    | 'networking'
    | 'security'
    | 'analytics'
    | 'ai'
    | 'container'
    | 'integration'
    | 'devops';
  state: 'running' | 'stopped' | 'available' | 'terminated' | 'unknown';
  region: string;
  publicIp?: string;
  privateIp?: string;
  endpoint?: string;
  instanceType?: string;
  consoleUrl?: string;
  controllable: boolean;
  supportedActions: Array<'start' | 'stop' | 'reboot'>;
  rawMeta?: Record<string, any>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sha256Hex(data: string | Buffer): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function hmacSha256(key: Buffer | string, data: string): Buffer {
  return crypto.createHmac('sha256', key).update(data, 'utf8').digest();
}

function base64UrlEncode(input: string | Buffer): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function extractXmlTag(xml: string, tag: string): string | undefined {
  const match = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'i'));
  return match?.[1]?.trim();
}

function extractAllXmlBlocks(xml: string, tag: string): string[] {
  const matches = xml.match(new RegExp(`<${tag}>[\\s\\S]*?</${tag}>`, 'gi'));
  return matches || [];
}

// ---------------------------------------------------------------------------
// AWS SigV4 Implementation
// ---------------------------------------------------------------------------

async function awsSignedRequest(params: {
  secrets: ActiveCloudSecrets;
  service: string;
  region: string;
  method: 'GET' | 'POST';
  host: string;
  path?: string;
  query?: string;
  body?: string;
  contentType?: string;
}) {
  const {
    secrets,
    service,
    region,
    method,
    host,
    path = '/',
    query = '',
    body = '',
    contentType = 'application/x-www-form-urlencoded; charset=utf-8',
  } = params;

  const accessKeyId = (secrets.awsAccessKeyId || '').trim();
  const secretAccessKey = (secrets.awsSecretAccessKey || '').trim();
  const sessionToken = (secrets.awsSessionToken || '').trim();

  if (!accessKeyId || !secretAccessKey) {
    throw new Error('AWS Access Key ID e Secret Access Key são obrigatórios.');
  }

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.slice(0, 8);
  const payloadHash = sha256Hex(body);

  const headersMap: Record<string, string> = {
    host,
    'x-amz-date': amzDate,
  };
  if (method === 'POST' && contentType) {
    headersMap['content-type'] = contentType;
  }
  if (service === 's3') {
    headersMap['x-amz-content-sha256'] = payloadHash;
  }
  if (sessionToken) {
    headersMap['x-amz-security-token'] = sessionToken;
  }

  const sortedHeaderKeys = Object.keys(headersMap).sort();
  const canonicalHeaders = sortedHeaderKeys.map((k) => `${k}:${headersMap[k]}\n`).join('');
  const signedHeaders = sortedHeaderKeys.join(';');

  // Ensure query params are canonically sorted if provided
  const canonicalQuery = query
    ? query
        .split('&')
        .filter(Boolean)
        .sort()
        .join('&')
    : '';

  const canonicalRequest = [
    method,
    path,
    canonicalQuery,
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n');

  const algorithm = 'AWS4-HMAC-SHA256';
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = [
    algorithm,
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join('\n');

  const kDate = hmacSha256(`AWS4${secretAccessKey}`, dateStamp);
  const kRegion = hmacSha256(kDate, region);
  const kService = hmacSha256(kRegion, service);
  const kSigning = hmacSha256(kService, 'aws4_request');
  const signature = crypto.createHmac('sha256', kSigning).update(stringToSign, 'utf8').digest('hex');

  const authorization = `${algorithm} Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const url = `https://${host}${path}${canonicalQuery ? `?${canonicalQuery}` : ''}`;
  const reqHeaders: Record<string, string> = {
    ...headersMap,
    Authorization: authorization,
  };
  delete reqHeaders.host;

  const response = await fetch(url, {
    method,
    headers: reqHeaders,
    body: method === 'POST' ? body : undefined,
    signal: AbortSignal.timeout(15000),
  });

  const text = await response.text();
  if (!response.ok) {
    const awsErrCode = extractXmlTag(text, 'Code') || `HTTP_${response.status}`;
    const awsErrMsg = extractXmlTag(text, 'Message') || text.slice(0, 300);
    throw new Error(`AWS ${service.toUpperCase()} (${awsErrCode}): ${awsErrMsg}`);
  }
  return text;
}

async function verifyAwsConnection(secrets: ActiveCloudSecrets): Promise<VerificationResult> {
  const region = secrets.region || 'us-east-1';
  const body = 'Action=GetCallerIdentity&Version=2011-06-15';
  const xml = await awsSignedRequest({
    secrets,
    service: 'sts',
    region,
    method: 'POST',
    host: `sts.${region}.amazonaws.com`,
    body,
  });

  const accountId = extractXmlTag(xml, 'Account') || 'AWS-Account';
  const arn = extractXmlTag(xml, 'Arn') || '';
  const userId = extractXmlTag(xml, 'UserId') || '';

  return {
    valid: true,
    accountHint: `AWS ${accountId}`,
    message: `Conectado à conta AWS ${accountId} (${region})`,
    metadata: { accountId, callerArn: arn, userId },
  };
}

async function discoverAwsResources(secrets: ActiveCloudSecrets): Promise<DiscoveredCloudResourceServer[]> {
  const region = secrets.region || 'us-east-1';
  const resources: DiscoveredCloudResourceServer[] = [];

  // 1. EC2 Instances
  try {
    const ec2Xml = await awsSignedRequest({
      secrets,
      service: 'ec2',
      region,
      method: 'POST',
      host: `ec2.${region}.amazonaws.com`,
      body: 'Action=DescribeInstances&Version=2016-11-15',
    });

    const reservationBlocks = extractAllXmlBlocks(ec2Xml, 'reservationSet');
    const instanceBlocks = ec2Xml.match(/<instancesSet>([\s\S]*?)<\/instancesSet>/gi) || [];
    for (const setBlock of instanceBlocks) {
      const items = extractAllXmlBlocks(setBlock, 'item');
      for (const item of items) {
        const instanceId = extractXmlTag(item, 'instanceId');
        if (!instanceId || !instanceId.startsWith('i-')) continue;
        const instanceType = extractXmlTag(item, 'instanceType') || 't3.micro';
        const stateName = (extractXmlTag(item, 'name') || 'unknown').toLowerCase();
        const publicIp = extractXmlTag(item, 'ipAddress');
        const privateIp = extractXmlTag(item, 'privateIpAddress');

        // Find Name tag if present
        let displayName = instanceId;
        const tagSetMatch = item.match(/<tagSet>([\s\S]*?)<\/tagSet>/i);
        if (tagSetMatch) {
          const tagItems = extractAllXmlBlocks(tagSetMatch[1], 'item');
          for (const t of tagItems) {
            if (extractXmlTag(t, 'key') === 'Name') {
              const v = extractXmlTag(t, 'value');
              if (v) displayName = v;
            }
          }
        }

        const normalizedState: DiscoveredCloudResourceServer['state'] =
          stateName === 'running'
            ? 'running'
            : stateName === 'stopped'
            ? 'stopped'
            : stateName === 'terminated'
            ? 'terminated'
            : 'unknown';

        resources.push({
          id: instanceId,
          name: displayName,
          provider: 'aws',
          service: 'EC2',
          resourceType: 'aws_instance',
          iconKey: 'aws_ec2',
          category: 'compute',
          state: normalizedState,
          region,
          publicIp,
          privateIp,
          instanceType,
          consoleUrl: `https://${region}.console.aws.amazon.com/ec2/home?region=${region}#InstanceDetails:instanceId=${instanceId}`,
          controllable: normalizedState !== 'terminated',
          supportedActions: normalizedState === 'stopped' ? ['start'] : ['stop', 'reboot'],
        });
      }
    }
    void reservationBlocks;
  } catch (err) {
    console.warn('[AWS Discover EC2]:', (err as Error).message);
  }

  // 2. VPCs
  try {
    const vpcXml = await awsSignedRequest({
      secrets,
      service: 'ec2',
      region,
      method: 'POST',
      host: `ec2.${region}.amazonaws.com`,
      body: 'Action=DescribeVpcs&Version=2016-11-15',
    });
    const vpcItems = extractAllXmlBlocks(vpcXml, 'item');
    for (const item of vpcItems) {
      const vpcId = extractXmlTag(item, 'vpcId');
      if (!vpcId || !vpcId.startsWith('vpc-')) continue;
      const cidr = extractXmlTag(item, 'cidrBlock');
      const state = extractXmlTag(item, 'state') === 'available' ? 'available' : 'unknown';
      let name = vpcId;
      const tagMatch = item.match(/<key>Name<\/key>\s*<value>([^<]+)<\/value>/i);
      if (tagMatch?.[1]) name = tagMatch[1];
      resources.push({
        id: vpcId,
        name,
        provider: 'aws',
        service: 'VPC',
        resourceType: 'aws_vpc',
        iconKey: 'aws_vpc_virtual_private_cloud',
        category: 'networking',
        state,
        region,
        endpoint: cidr,
        consoleUrl: `https://${region}.console.aws.amazon.com/vpcconsole/home?region=${region}#VpcDetails:VpcId=${vpcId}`,
        controllable: false,
        supportedActions: [],
      });
    }
  } catch (err) {
    console.warn('[AWS Discover VPC]:', (err as Error).message);
  }

  // 3. S3 Buckets
  try {
    const s3Xml = await awsSignedRequest({
      secrets,
      service: 's3',
      region: 'us-east-1',
      method: 'GET',
      host: 's3.amazonaws.com',
      path: '/',
    });
    const bucketBlocks = extractAllXmlBlocks(s3Xml, 'Bucket');
    for (const b of bucketBlocks.slice(0, 30)) {
      const bName = extractXmlTag(b, 'Name');
      if (!bName) continue;
      resources.push({
        id: bName,
        name: bName,
        provider: 'aws',
        service: 'S3',
        resourceType: 'aws_s3_bucket',
        iconKey: 'aws_s3',
        category: 'storage',
        state: 'available',
        region,
        endpoint: `s3://${bName}`,
        consoleUrl: `https://s3.console.aws.amazon.com/s3/buckets/${encodeURIComponent(bName)}?region=${region}`,
        controllable: false,
        supportedActions: [],
      });
    }
  } catch (err) {
    console.warn('[AWS Discover S3]:', (err as Error).message);
  }

  // 4. RDS Instances
  try {
    const rdsXml = await awsSignedRequest({
      secrets,
      service: 'rds',
      region,
      method: 'POST',
      host: `rds.${region}.amazonaws.com`,
      body: 'Action=DescribeDBInstances&Version=2014-10-31',
    });
    const dbBlocks = extractAllXmlBlocks(rdsXml, 'DBInstance');
    for (const db of dbBlocks) {
      const dbId = extractXmlTag(db, 'DBInstanceIdentifier');
      if (!dbId) continue;
      const status = (extractXmlTag(db, 'DBInstanceStatus') || 'unknown').toLowerCase();
      const dbClass = extractXmlTag(db, 'DBInstanceClass');
      const engine = extractXmlTag(db, 'Engine');
      const address = extractXmlTag(db, 'Address');
      const normalizedState: DiscoveredCloudResourceServer['state'] =
        status === 'available' ? 'running' : status === 'stopped' ? 'stopped' : 'unknown';
      resources.push({
        id: dbId,
        name: `${dbId} (${engine || 'RDS'})`,
        provider: 'aws',
        service: 'RDS',
        resourceType: 'aws_db_instance',
        iconKey: 'aws_rds_instance',
        category: 'database',
        state: normalizedState,
        region,
        endpoint: address,
        instanceType: dbClass,
        consoleUrl: `https://${region}.console.aws.amazon.com/rds/home?region=${region}#database:id=${dbId}`,
        controllable: status === 'available' || status === 'stopped',
        supportedActions: status === 'stopped' ? ['start'] : ['stop', 'reboot'],
      });
    }
  } catch (err) {
    console.warn('[AWS Discover RDS]:', (err as Error).message);
  }

  return resources;
}

async function controlAwsResource(
  secrets: ActiveCloudSecrets,
  resourceId: string,
  resourceType: string,
  action: 'start' | 'stop' | 'reboot'
) {
  const region = secrets.region || 'us-east-1';
  if (resourceType === 'aws_db_instance') {
    const rdsAction =
      action === 'start'
        ? 'StartDBInstance'
        : action === 'stop'
        ? 'StopDBInstance'
        : 'RebootDBInstance';
    await awsSignedRequest({
      secrets,
      service: 'rds',
      region,
      method: 'POST',
      host: `rds.${region}.amazonaws.com`,
      body: `Action=${rdsAction}&DBInstanceIdentifier=${encodeURIComponent(resourceId)}&Version=2014-10-31`,
    });
    return {
      ok: true,
      message: `Ação ${rdsAction} enviada ao RDS ${resourceId} (${region}).`,
      newState: action === 'stop' ? 'stopped' : 'running',
    };
  }

  // Default: EC2
  const ec2Action =
    action === 'start'
      ? 'StartInstances'
      : action === 'stop'
      ? 'StopInstances'
      : 'RebootInstances';
  await awsSignedRequest({
    secrets,
    service: 'ec2',
    region,
    method: 'POST',
    host: `ec2.${region}.amazonaws.com`,
    body: `Action=${ec2Action}&InstanceId.1=${encodeURIComponent(resourceId)}&Version=2016-11-15`,
  });
  return {
    ok: true,
    message: `Ação ${ec2Action} executada na instância EC2 ${resourceId} (${region}).`,
    newState: action === 'stop' ? 'stopped' : 'running',
  };
}

// ---------------------------------------------------------------------------
// GCP OAuth2 Service Account JWT Implementation
// ---------------------------------------------------------------------------

async function getGcpAccessToken(secrets: ActiveCloudSecrets): Promise<{
  accessToken: string;
  projectId: string;
  clientEmail: string;
}> {
  if (!secrets.gcpServiceAccountJson) {
    throw new Error('JSON da Service Account do GCP é obrigatório.');
  }
  let sa: any;
  try {
    sa = JSON.parse(secrets.gcpServiceAccountJson);
  } catch {
    throw new Error('JSON da Service Account do GCP inválido (erro de sintaxe).');
  }
  const clientEmail = sa.client_email;
  const privateKey = sa.private_key;
  const projectId = (secrets.gcpProjectId || sa.project_id || '').trim();
  if (!clientEmail || !privateKey || !projectId) {
    throw new Error('JSON do GCP deve conter client_email, private_key e project_id.');
  }

  const nowSec = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64UrlEncode(
    JSON.stringify({
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/cloud-platform',
      aud: sa.token_uri || 'https://oauth2.googleapis.com/token',
      iat: nowSec,
      exp: nowSec + 3600,
    })
  );
  const signingInput = `${header}.${claim}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signingInput);
  const signature = signer.sign(privateKey);
  const jwt = `${signingInput}.${base64UrlEncode(signature)}`;

  const res = await fetch(sa.token_uri || 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${encodeURIComponent(jwt)}`,
    signal: AbortSignal.timeout(15000),
  });
  const data = (await res.json()) as any;
  if (!res.ok || !data.access_token) {
    throw new Error(`GCP OAuth2: ${data.error_description || data.error || res.statusText}`);
  }
  return { accessToken: data.access_token, projectId, clientEmail };
}

async function verifyGcpConnection(secrets: ActiveCloudSecrets): Promise<VerificationResult> {
  const { accessToken, projectId, clientEmail } = await getGcpAccessToken(secrets);
  const res = await fetch(
    `https://cloudresourcemanager.googleapis.com/v1/projects/${encodeURIComponent(projectId)}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(15000),
    }
  );
  if (!res.ok) {
    const errText = await res.text();
    // Token succeeded even if CRM API isn't enabled; fallback check Compute API or report nicely
    if (res.status === 403 && errText.includes('Cloud Resource Manager API has not been used')) {
      return {
        valid: true,
        accountHint: projectId,
        message: `Service Account autenticada para projeto ${projectId} (${clientEmail}).`,
        metadata: { projectId, identityEmail: clientEmail },
      };
    }
    throw new Error(`GCP Project Check (${res.status}): ${errText.slice(0, 260)}`);
  }
  const proj = (await res.json()) as any;
  return {
    valid: true,
    accountHint: proj.projectId || projectId,
    message: `Conectado ao projeto GCP "${proj.name || projectId}" (${projectId}).`,
    metadata: { projectId, projectNumber: proj.projectNumber, identityEmail: clientEmail },
  };
}

async function discoverGcpResources(secrets: ActiveCloudSecrets): Promise<DiscoveredCloudResourceServer[]> {
  const { accessToken, projectId } = await getGcpAccessToken(secrets);
  const region = secrets.region || 'us-central1';
  const resources: DiscoveredCloudResourceServer[] = [];

  // 1. Compute Engine Instances
  try {
    const res = await fetch(
      `https://compute.googleapis.com/compute/v1/projects/${encodeURIComponent(projectId)}/aggregated/instances`,
      { headers: { Authorization: `Bearer ${accessToken}` }, signal: AbortSignal.timeout(15000) }
    );
    if (res.ok) {
      const json = (await res.json()) as any;
      const items = json.items || {};
      for (const [scopeKey, scopeVal] of Object.entries<any>(items)) {
        const instances = scopeVal?.instances || [];
        const zone = scopeKey.replace('zones/', '');
        for (const inst of instances) {
          const st = (inst.status || '').toUpperCase();
          const state: DiscoveredCloudResourceServer['state'] =
            st === 'RUNNING' ? 'running' : st === 'TERMINATED' || st === 'STOPPED' ? 'stopped' : 'unknown';
          const netIf = inst.networkInterfaces?.[0];
          const natIp = netIf?.accessConfigs?.[0]?.natIP;
          const machineType = (inst.machineType || '').split('/').pop();
          resources.push({
            id: `${zone}/${inst.name}`,
            name: inst.name,
            provider: 'gcp',
            service: 'Compute Engine',
            resourceType: 'google_compute_instance',
            iconKey: 'gcp_gce',
            category: 'compute',
            state,
            region: zone,
            publicIp: natIp,
            privateIp: netIf?.networkIP,
            instanceType: machineType,
            consoleUrl: `https://console.cloud.google.com/compute/instancesDetail/zones/${zone}/instances/${inst.name}?project=${projectId}`,
            controllable: true,
            supportedActions: state === 'stopped' ? ['start'] : ['stop', 'reboot'],
            rawMeta: { zone, name: inst.name },
          });
        }
      }
    }
  } catch (err) {
    console.warn('[GCP Discover GCE]:', (err as Error).message);
  }

  // 2. VPC Networks
  try {
    const res = await fetch(
      `https://compute.googleapis.com/compute/v1/projects/${encodeURIComponent(projectId)}/global/networks`,
      { headers: { Authorization: `Bearer ${accessToken}` }, signal: AbortSignal.timeout(15000) }
    );
    if (res.ok) {
      const json = (await res.json()) as any;
      for (const net of (json.items || []).slice(0, 20)) {
        resources.push({
          id: net.name,
          name: net.name,
          provider: 'gcp',
          service: 'VPC Network',
          resourceType: 'google_compute_network',
          iconKey: 'gcp_vpc',
          category: 'networking',
          state: 'available',
          region: 'global',
          consoleUrl: `https://console.cloud.google.com/networking/networks/details/${net.name}?project=${projectId}`,
          controllable: false,
          supportedActions: [],
        });
      }
    }
  } catch (err) {
    console.warn('[GCP Discover VPC]:', (err as Error).message);
  }

  // 3. GCS Buckets
  try {
    const res = await fetch(
      `https://storage.googleapis.com/storage/v1/b?project=${encodeURIComponent(projectId)}`,
      { headers: { Authorization: `Bearer ${accessToken}` }, signal: AbortSignal.timeout(15000) }
    );
    if (res.ok) {
      const json = (await res.json()) as any;
      for (const b of (json.items || []).slice(0, 25)) {
        resources.push({
          id: b.name,
          name: b.name,
          provider: 'gcp',
          service: 'Cloud Storage',
          resourceType: 'google_storage_bucket',
          iconKey: 'gcp_gcs',
          category: 'storage',
          state: 'available',
          region: b.location || region,
          endpoint: `gs://${b.name}`,
          consoleUrl: `https://console.cloud.google.com/storage/browser/${b.name}?project=${projectId}`,
          controllable: false,
          supportedActions: [],
        });
      }
    }
  } catch (err) {
    console.warn('[GCP Discover GCS]:', (err as Error).message);
  }

  return resources;
}

async function controlGcpResource(
  secrets: ActiveCloudSecrets,
  resourceId: string,
  action: 'start' | 'stop' | 'reboot'
) {
  const { accessToken, projectId } = await getGcpAccessToken(secrets);
  const [zone, name] = resourceId.includes('/') ? resourceId.split('/') : [`${secrets.region || 'us-central1'}-a`, resourceId];
  const gcpAction = action === 'reboot' ? 'reset' : action;
  const res = await fetch(
    `https://compute.googleapis.com/compute/v1/projects/${encodeURIComponent(projectId)}/zones/${encodeURIComponent(zone)}/instances/${encodeURIComponent(name)}/${gcpAction}`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(15000),
    }
  );
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GCP Compute ${gcpAction} falhou (${res.status}): ${txt.slice(0, 240)}`);
  }
  return {
    ok: true,
    message: `Operação GCP Compute Engine "${gcpAction}" iniciada em ${name} (${zone}).`,
    newState: action === 'stop' ? 'stopped' : 'running',
  };
}

// ---------------------------------------------------------------------------
// Azure Entra ID OAuth2 + ARM Implementation
// ---------------------------------------------------------------------------

async function getAzureAccessToken(secrets: ActiveCloudSecrets): Promise<string> {
  const tenantId = (secrets.azureTenantId || '').trim();
  const clientId = (secrets.azureClientId || '').trim();
  const clientSecret = (secrets.azureClientSecret || '').trim();
  if (!tenantId || !clientId || !clientSecret) {
    throw new Error('Tenant ID, Client ID e Client Secret do Azure são obrigatórios.');
  }

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'https://management.azure.com/.default',
  }).toString();

  const res = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(tenantId)}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    signal: AbortSignal.timeout(15000),
  });
  const data = (await res.json()) as any;
  if (!res.ok || !data.access_token) {
    throw new Error(`Azure Entra ID: ${data.error_description || data.error || res.statusText}`);
  }
  return data.access_token;
}

async function verifyAzureConnection(secrets: ActiveCloudSecrets): Promise<VerificationResult> {
  const subscriptionId = (secrets.azureSubscriptionId || '').trim();
  if (!subscriptionId) {
    throw new Error('Subscription ID do Azure é obrigatório.');
  }
  const token = await getAzureAccessToken(secrets);
  const res = await fetch(
    `https://management.azure.com/subscriptions/${encodeURIComponent(subscriptionId)}?api-version=2022-12-01`,
    {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(15000),
    }
  );
  const data = (await res.json()) as any;
  if (!res.ok) {
    throw new Error(`Azure ARM (${res.status}): ${data.error?.message || res.statusText}`);
  }
  return {
    valid: true,
    accountHint: `${data.displayName || 'Azure'} (${subscriptionId.slice(0, 8)}...)`,
    message: `Conectado à assinatura Azure "${data.displayName}" (${data.state}).`,
    metadata: {
      subscriptionId,
      tenantId: secrets.azureTenantId,
      subscriptionName: data.displayName,
    },
  };
}

async function discoverAzureResources(secrets: ActiveCloudSecrets): Promise<DiscoveredCloudResourceServer[]> {
  const subscriptionId = (secrets.azureSubscriptionId || '').trim();
  const token = await getAzureAccessToken(secrets);
  const resources: DiscoveredCloudResourceServer[] = [];

  const res = await fetch(
    `https://management.azure.com/subscriptions/${encodeURIComponent(subscriptionId)}/resources?api-version=2021-04-01`,
    {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(15000),
    }
  );
  if (!res.ok) return resources;
  const json = (await res.json()) as any;
  for (const item of (json.value || []).slice(0, 50)) {
    const typeLower = (item.type || '').toLowerCase();
    if (typeLower === 'microsoft.compute/virtualmachines') {
      resources.push({
        id: item.id,
        name: item.name,
        provider: 'azure',
        service: 'Virtual Machine',
        resourceType: 'azurerm_linux_virtual_machine',
        iconKey: 'azure_vm',
        category: 'compute',
        state: 'running',
        region: item.location || secrets.region || 'eastus',
        consoleUrl: `https://portal.azure.com/#@/resource${item.id}`,
        controllable: true,
        supportedActions: ['start', 'stop', 'reboot'],
      });
    } else if (typeLower === 'microsoft.network/virtualnetworks') {
      resources.push({
        id: item.id,
        name: item.name,
        provider: 'azure',
        service: 'Virtual Network',
        resourceType: 'azurerm_virtual_network',
        iconKey: 'azure_vnet',
        category: 'networking',
        state: 'available',
        region: item.location || secrets.region || 'eastus',
        consoleUrl: `https://portal.azure.com/#@/resource${item.id}`,
        controllable: false,
        supportedActions: [],
      });
    } else if (typeLower === 'microsoft.storage/storageaccounts') {
      resources.push({
        id: item.id,
        name: item.name,
        provider: 'azure',
        service: 'Storage Account',
        resourceType: 'azurerm_storage_account',
        iconKey: 'azure_storage',
        category: 'storage',
        state: 'available',
        region: item.location || secrets.region || 'eastus',
        consoleUrl: `https://portal.azure.com/#@/resource${item.id}`,
        controllable: false,
        supportedActions: [],
      });
    } else if (typeLower.includes('sql/servers') || typeLower.includes('dbforpostgresql')) {
      resources.push({
        id: item.id,
        name: item.name,
        provider: 'azure',
        service: 'Azure Database',
        resourceType: 'azurerm_mssql_server',
        iconKey: 'azure_sql',
        category: 'database',
        state: 'available',
        region: item.location || secrets.region || 'eastus',
        consoleUrl: `https://portal.azure.com/#@/resource${item.id}`,
        controllable: false,
        supportedActions: [],
      });
    }
  }
  return resources;
}

async function controlAzureResource(
  secrets: ActiveCloudSecrets,
  resourceId: string,
  action: 'start' | 'stop' | 'reboot'
) {
  const token = await getAzureAccessToken(secrets);
  const armOp = action === 'stop' ? 'deallocate' : action === 'reboot' ? 'restart' : 'start';
  const cleanId = resourceId.startsWith('/') ? resourceId : `/${resourceId}`;
  const res = await fetch(
    `https://management.azure.com${cleanId}/${armOp}?api-version=2024-03-01`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(15000),
    }
  );
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Azure ARM ${armOp} falhou (${res.status}): ${txt.slice(0, 240)}`);
  }
  return {
    ok: true,
    message: `Operação Azure VM "${armOp}" iniciada com sucesso.`,
    newState: action === 'stop' ? 'stopped' : 'running',
  };
}

// ---------------------------------------------------------------------------
// OCI HTTP Signature (RSA-SHA256) Implementation
// ---------------------------------------------------------------------------

async function ociSignedFetch(params: {
  secrets: ActiveCloudSecrets;
  host: string;
  path: string;
  method?: 'GET' | 'POST';
  body?: string;
}) {
  const { secrets, host, path, method = 'GET', body = '' } = params;
  const tenancy = (secrets.ociTenancyOcid || '').trim();
  const user = (secrets.ociUserOcid || '').trim();
  const fingerprint = (secrets.ociFingerprint || '').trim();
  const privateKey = (secrets.ociPrivateKeyPem || '').trim();

  if (!tenancy || !user || !fingerprint || !privateKey) {
    throw new Error('Tenancy OCID, User OCID, Fingerprint e Chave Privada PEM da OCI são obrigatórios.');
  }

  const dateStr = new Date().toUTCString();
  const headersToSign = ['date', '(request-target)', 'host'];
  const signLines = [
    `date: ${dateStr}`,
    `(request-target): ${method.toLowerCase()} ${path}`,
    `host: ${host}`,
  ];

  const extraHeaders: Record<string, string> = {};
  if (method === 'POST') {
    const bodyBuf = Buffer.from(body, 'utf8');
    const contentSha256 = crypto.createHash('sha256').update(bodyBuf).digest('base64');
    extraHeaders['content-type'] = 'application/json';
    extraHeaders['content-length'] = String(bodyBuf.length);
    extraHeaders['x-content-sha256'] = contentSha256;
    headersToSign.push('content-length', 'content-type', 'x-content-sha256');
    signLines.push(
      `content-length: ${bodyBuf.length}`,
      `content-type: application/json`,
      `x-content-sha256: ${contentSha256}`
    );
  }

  const signingString = signLines.join('\n');
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signingString);
  const signature = signer.sign(privateKey).toString('base64');
  const keyId = `${tenancy}/${user}/${fingerprint}`;
  const authHeader = `Signature version="1",headers="${headersToSign.join(' ')}",keyId="${keyId}",algorithm="rsa-sha256",signature="${signature}"`;

  const res = await fetch(`https://${host}${path}`, {
    method,
    headers: {
      date: dateStr,
      ...extraHeaders,
      Authorization: authHeader,
    },
    body: method === 'POST' ? body : undefined,
    signal: AbortSignal.timeout(15000),
  });

  const text = await res.text();
  if (!res.ok) {
    let parsedMsg = text;
    try {
      const parsed = JSON.parse(text);
      parsedMsg = `${parsed.code || res.status}: ${parsed.message || text}`;
    } catch {
      // keep raw
    }
    throw new Error(`OCI API (${res.status}): ${parsedMsg.slice(0, 260)}`);
  }
  return text ? JSON.parse(text) : {};
}

async function verifyOciConnection(secrets: ActiveCloudSecrets): Promise<VerificationResult> {
  const region = secrets.region || 'us-ashburn-1';
  const tenancy = (secrets.ociTenancyOcid || '').trim();
  const data = await ociSignedFetch({
    secrets,
    host: `identity.${region}.oraclecloud.com`,
    path: `/20160918/tenancies/${encodeURIComponent(tenancy)}`,
    method: 'GET',
  });
  return {
    valid: true,
    accountHint: `${data.name || 'OCI Tenancy'} (${tenancy.slice(-8)})`,
    message: `Conectado à Tenancy OCI "${data.name || tenancy}" (${region}).`,
    metadata: {
      tenancyOcid: tenancy,
      compartmentId: secrets.ociCompartmentId || tenancy,
      homeRegionKey: data.homeRegionKey,
    },
  };
}

async function discoverOciResources(secrets: ActiveCloudSecrets): Promise<DiscoveredCloudResourceServer[]> {
  const region = secrets.region || 'us-ashburn-1';
  const compartmentId = (secrets.ociCompartmentId || secrets.ociTenancyOcid || '').trim();
  const resources: DiscoveredCloudResourceServer[] = [];

  try {
    const instances = await ociSignedFetch({
      secrets,
      host: `iaas.${region}.oraclecloud.com`,
      path: `/20160918/instances?compartmentId=${encodeURIComponent(compartmentId)}`,
      method: 'GET',
    });
    if (Array.isArray(instances)) {
      for (const inst of instances.slice(0, 40)) {
        const st = (inst.lifecycleState || '').toUpperCase();
        const state: DiscoveredCloudResourceServer['state'] =
          st === 'RUNNING' ? 'running' : st === 'STOPPED' ? 'stopped' : st === 'TERMINATED' ? 'terminated' : 'unknown';
        resources.push({
          id: inst.id,
          name: inst.displayName || inst.id,
          provider: 'oci',
          service: 'OCI Compute',
          resourceType: 'oci_core_instance',
          iconKey: 'oci_compute',
          category: 'compute',
          state,
          region: inst.region || region,
          instanceType: inst.shape,
          consoleUrl: `https://cloud.oracle.com/compute/instances/${inst.id}?region=${region}`,
          controllable: st === 'RUNNING' || st === 'STOPPED',
          supportedActions: st === 'STOPPED' ? ['start'] : ['stop', 'reboot'],
        });
      }
    }
  } catch (err) {
    console.warn('[OCI Discover Compute]:', (err as Error).message);
  }

  try {
    const vcns = await ociSignedFetch({
      secrets,
      host: `iaas.${region}.oraclecloud.com`,
      path: `/20160918/vcns?compartmentId=${encodeURIComponent(compartmentId)}`,
      method: 'GET',
    });
    if (Array.isArray(vcns)) {
      for (const vcn of vcns.slice(0, 20)) {
        resources.push({
          id: vcn.id,
          name: vcn.displayName || vcn.id,
          provider: 'oci',
          service: 'OCI VCN',
          resourceType: 'oci_core_vcn',
          iconKey: 'oci_vcn',
          category: 'networking',
          state: 'available',
          region,
          endpoint: vcn.cidrBlock,
          consoleUrl: `https://cloud.oracle.com/networking/vcns/${vcn.id}?region=${region}`,
          controllable: false,
          supportedActions: [],
        });
      }
    }
  } catch (err) {
    console.warn('[OCI Discover VCN]:', (err as Error).message);
  }

  return resources;
}

async function controlOciResource(
  secrets: ActiveCloudSecrets,
  resourceId: string,
  action: 'start' | 'stop' | 'reboot'
) {
  const region = secrets.region || 'us-ashburn-1';
  const ociOp = action === 'start' ? 'START' : action === 'stop' ? 'STOP' : 'SOFTRESET';
  await ociSignedFetch({
    secrets,
    host: `iaas.${region}.oraclecloud.com`,
    path: `/20160918/instances/${encodeURIComponent(resourceId)}?action=${ociOp}`,
    method: 'POST',
    body: '',
  });
  return {
    ok: true,
    message: `Ação OCI Compute "${ociOp}" enviada para ${resourceId}.`,
    newState: action === 'stop' ? 'stopped' : 'running',
  };
}

// ---------------------------------------------------------------------------
// Unified Public Exports
// ---------------------------------------------------------------------------

export async function verifyCloudConnection(secrets: ActiveCloudSecrets): Promise<VerificationResult> {
  switch (secrets.provider) {
    case 'aws':
      return verifyAwsConnection(secrets);
    case 'gcp':
      return verifyGcpConnection(secrets);
    case 'azure':
      return verifyAzureConnection(secrets);
    case 'oci':
      return verifyOciConnection(secrets);
    default:
      throw new Error(`Provedor não suportado: ${secrets.provider}`);
  }
}

export async function discoverCloudResources(
  secrets: ActiveCloudSecrets
): Promise<DiscoveredCloudResourceServer[]> {
  switch (secrets.provider) {
    case 'aws':
      return discoverAwsResources(secrets);
    case 'gcp':
      return discoverGcpResources(secrets);
    case 'azure':
      return discoverAzureResources(secrets);
    case 'oci':
      return discoverOciResources(secrets);
    default:
      return [];
  }
}

export async function controlCloudResource(
  secrets: ActiveCloudSecrets,
  resourceId: string,
  resourceType: string,
  action: 'start' | 'stop' | 'reboot'
) {
  switch (secrets.provider) {
    case 'aws':
      return controlAwsResource(secrets, resourceId, resourceType, action);
    case 'gcp':
      return controlGcpResource(secrets, resourceId, action);
    case 'azure':
      return controlAzureResource(secrets, resourceId, action);
    case 'oci':
      return controlOciResource(secrets, resourceId, action);
    default:
      throw new Error(`Provedor não suportado para controle: ${secrets.provider}`);
  }
}
