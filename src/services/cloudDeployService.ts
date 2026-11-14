import {
  CloudConnectionProfile,
  CloudCredentialInput,
  DiagramState,
  DiscoveredCloudResource,
  ProvisionedResourceInfo,
  TerraformJobAction,
  TerraformJobRecord,
} from '../types';
import {
  buildDiagramHclMapping,
  generateTerraformCode,
  TerraformGenerationOptions,
  TerraformProjectFiles,
} from '../utils/terraformGenerator';

export async function fetchServerCloudConnections(): Promise<CloudConnectionProfile[]> {
  const res = await fetch('/api/cloud/connections');
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Falha ao carregar sessões cloud');
  }
  return data.connections || [];
}

export async function connectCloudAccount(input: CloudCredentialInput): Promise<{
  connection: CloudConnectionProfile;
  message: string;
}> {
  const res = await fetch('/api/cloud/connect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Credenciais inválidas ou erro ao conectar na nuvem');
  }
  return { connection: data.connection, message: data.message };
}

export async function testCloudAccount(connectionId: string): Promise<{
  connection: CloudConnectionProfile;
  message: string;
}> {
  const res = await fetch(`/api/cloud/test/${encodeURIComponent(connectionId)}`, {
    method: 'POST',
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Falha no teste de conexão');
  }
  return { connection: data.connection, message: data.message };
}

export async function disconnectCloudAccount(connectionId: string): Promise<void> {
  await fetch(`/api/cloud/connections/${encodeURIComponent(connectionId)}`, {
    method: 'DELETE',
  });
}

export async function fetchDiscoveredCloudResources(connectionId: string): Promise<{
  resources: DiscoveredCloudResource[];
  region: string;
  provider: string;
}> {
  const res = await fetch(`/api/cloud/resources/${encodeURIComponent(connectionId)}`);
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Falha ao descobrir recursos na conta cloud');
  }
  return { resources: data.resources || [], region: data.region, provider: data.provider };
}

export async function executeCloudResourceControl(params: {
  connectionId: string;
  resourceId: string;
  resourceType: string;
  action: 'start' | 'stop' | 'reboot';
}): Promise<{ message: string; newState?: string }> {
  const res = await fetch('/api/cloud/control', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Falha ao executar comando no recurso');
  }
  return { message: data.message, newState: data.newState };
}

export async function getTerraformBinaryStatus(): Promise<{
  installed: boolean;
  path?: string;
  version?: string;
}> {
  const res = await fetch('/api/terraform/status');
  const data = await res.json();
  return data;
}

export function buildOptionsFromConnections(
  connections: CloudConnectionProfile[],
  activeConnectionId?: string
): TerraformGenerationOptions {
  const opts: TerraformGenerationOptions = {};
  const prioritized = activeConnectionId
    ? connections.find((c) => c.id === activeConnectionId)
    : undefined;

  const findFor = (prov: 'aws' | 'azure' | 'gcp' | 'oci') =>
    prioritized?.provider === prov
      ? prioritized
      : connections.find((c) => c.provider === prov && c.status === 'connected');

  const awsConn = findFor('aws');
  if (awsConn) opts.awsRegion = awsConn.region;

  const azConn = findFor('azure');
  if (azConn) opts.azureRegion = azConn.region;

  const gcpConn = findFor('gcp');
  if (gcpConn) {
    opts.gcpRegion = gcpConn.region;
    if (gcpConn.metadata?.projectId) opts.gcpProjectId = gcpConn.metadata.projectId;
  }

  const ociConn = findFor('oci');
  if (ociConn) {
    opts.ociRegion = ociConn.region;
    if (ociConn.metadata?.tenancyOcid) opts.ociTenancyOcid = ociConn.metadata.tenancyOcid;
    if (ociConn.metadata?.compartmentId) opts.ociCompartmentId = ociConn.metadata.compartmentId;
  }

  return opts;
}

export async function syncDiagramWorkspaceToServer(
  workspaceId: string,
  diagram: DiagramState,
  customFiles?: TerraformProjectFiles,
  connections: CloudConnectionProfile[] = [],
  activeConnectionId?: string
) {
  const opts = buildOptionsFromConnections(connections, activeConnectionId);
  const files = customFiles || generateTerraformCode(diagram, opts);
  const hclElementMap = buildDiagramHclMapping(diagram);

  const res = await fetch('/api/terraform/workspace', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workspaceId, files, hclElementMap }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Falha ao sincronizar workspace Terraform');
  }
  return data;
}

export async function runTerraformAction(params: {
  workspaceId: string;
  connectionId?: string;
  action: TerraformJobAction;
  targetAddress?: string;
}): Promise<TerraformJobRecord> {
  const res = await fetch('/api/terraform/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Falha ao iniciar job Terraform');
  }
  return data.job;
}

export async function fetchTerraformJob(jobId: string): Promise<TerraformJobRecord> {
  const res = await fetch(`/api/terraform/jobs/${encodeURIComponent(jobId)}`);
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Job Terraform não encontrado');
  }
  return data.job;
}

export async function fetchTerraformState(
  workspaceId: string,
  connectionId?: string
): Promise<{
  resources: ProvisionedResourceInfo[];
  outputs: Record<string, { value: any; type?: any }>;
}> {
  const q = connectionId ? `?connectionId=${encodeURIComponent(connectionId)}` : '';
  const res = await fetch(`/api/terraform/state/${encodeURIComponent(workspaceId)}${q}`);
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Falha ao ler estado Terraform');
  }
  return { resources: data.resources || [], outputs: data.outputs || {} };
}

export function applyLiveStateToDiagram(
  diagram: DiagramState,
  resources: ProvisionedResourceInfo[],
  workspaceId: string,
  connectionId?: string,
  markDestroyed = false
): DiagramState {
  const now = new Date().toISOString();
  const byElementId = new Map<string, ProvisionedResourceInfo>();
  resources.forEach((r) => {
    if (r.diagramElementId) {
      byElementId.set(r.diagramElementId, r);
    }
  });

  return {
    ...diagram,
    liveWorkspaceId: workspaceId,
    nodes: diagram.nodes.map((node) => {
      const matched = byElementId.get(node.id);
      if (matched) {
        return {
          ...node,
          liveState: {
            status: matched.status,
            terraformAddress: matched.address,
            cloudResourceId: matched.cloudResourceId,
            publicIp: matched.publicIp,
            privateIp: matched.privateIp,
            endpoint: matched.endpoint,
            region: matched.region,
            consoleUrl: matched.consoleUrl,
            connectionId,
            workspaceId,
            lastSyncedAt: now,
          },
        };
      }
      if (markDestroyed && node.liveState?.workspaceId === workspaceId) {
        return {
          ...node,
          liveState: {
            ...node.liveState,
            status: 'destroyed',
            lastSyncedAt: now,
          },
        };
      }
      return node;
    }),
    containers: diagram.containers.map((cont) => {
      const matched = byElementId.get(cont.id);
      if (matched) {
        return {
          ...cont,
          liveState: {
            status: matched.status,
            terraformAddress: matched.address,
            cloudResourceId: matched.cloudResourceId,
            endpoint: matched.endpoint,
            region: matched.region,
            consoleUrl: matched.consoleUrl,
            connectionId,
            workspaceId,
            lastSyncedAt: now,
          },
        };
      }
      if (markDestroyed && cont.liveState?.workspaceId === workspaceId) {
        return {
          ...cont,
          liveState: {
            ...cont.liveState,
            status: 'destroyed',
            lastSyncedAt: now,
          },
        };
      }
      return cont;
    }),
  };
}
