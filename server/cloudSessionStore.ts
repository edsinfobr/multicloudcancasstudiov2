export type RealCloudProvider = 'aws' | 'gcp' | 'azure' | 'oci';

export interface ActiveCloudSecrets {
  provider: RealCloudProvider;
  region: string;
  // AWS
  awsAccessKeyId?: string;
  awsSecretAccessKey?: string;
  awsSessionToken?: string;
  // GCP
  gcpProjectId?: string;
  gcpServiceAccountJson?: string;
  // Azure
  azureTenantId?: string;
  azureClientId?: string;
  azureClientSecret?: string;
  azureSubscriptionId?: string;
  // OCI
  ociTenancyOcid?: string;
  ociUserOcid?: string;
  ociFingerprint?: string;
  ociPrivateKeyPem?: string;
  ociCompartmentId?: string;
}

export interface StoredCloudConnection {
  id: string;
  label: string;
  provider: RealCloudProvider;
  region: string;
  accountHint: string;
  status: 'connected' | 'disconnected' | 'error';
  lastTestedAt: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, any>;
  secrets: ActiveCloudSecrets;
}

const sessionConnections = new Map<string, StoredCloudConnection>();

export function maskSecretHint(value?: string, keepStart = 4, keepEnd = 4): string {
  if (!value) return '****';
  const trimmed = value.trim();
  if (trimmed.length <= keepStart + keepEnd) {
    return `${trimmed.slice(0, 2)}****`;
  }
  return `${trimmed.slice(0, keepStart)}...${trimmed.slice(-keepEnd)}`;
}

export function upsertCloudSession(conn: StoredCloudConnection): StoredCloudConnection {
  sessionConnections.set(conn.id, conn);
  return conn;
}

export function getCloudSession(id: string): StoredCloudConnection | undefined {
  return sessionConnections.get(id);
}

export function deleteCloudSession(id: string): boolean {
  return sessionConnections.delete(id);
}

export function listSanitizedCloudSessions() {
  return Array.from(sessionConnections.values()).map(({ secrets: _secrets, ...safe }) => ({
    ...safe,
    hasActiveSession: true,
  }));
}

export function sanitizeConnectionForClient(conn: StoredCloudConnection) {
  const { secrets: _secrets, ...safe } = conn;
  return {
    ...safe,
    hasActiveSession: true,
  };
}
