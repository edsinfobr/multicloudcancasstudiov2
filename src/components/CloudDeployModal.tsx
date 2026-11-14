import React, { useEffect, useRef, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Check,
  CheckCircle2,
  Cloud,
  Copy,
  Download,
  ExternalLink,
  FileCode,
  KeyRound,
  Layers,
  Loader2,
  Play,
  Plus,
  Power,
  RefreshCw,
  Rocket,
  RotateCcw,
  Server,
  ShieldCheck,
  Square,
  Terminal,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  CloudConnectionProfile,
  CloudCredentialInput,
  DiagramNode,
  DiagramState,
  DiscoveredCloudResource,
  ProvisionedResourceInfo,
  RealCloudProvider,
  TerraformDeploymentRecord,
  TerraformJobAction,
  TerraformJobRecord,
} from '../types';
import {
  applyLiveStateToDiagram,
  buildOptionsFromConnections,
  connectCloudAccount,
  disconnectCloudAccount,
  executeCloudResourceControl,
  fetchDiscoveredCloudResources,
  fetchServerCloudConnections,
  fetchTerraformJob,
  fetchTerraformState,
  getTerraformBinaryStatus,
  runTerraformAction,
  syncDiagramWorkspaceToServer,
  testCloudAccount,
} from '../services/cloudDeployService';
import {
  generateTerraformCode,
  TerraformProjectFiles,
} from '../utils/terraformGenerator';
import {
  deleteCloudConnectionProfile,
  getCloudConnectionProfiles,
  getTerraformDeployments,
  saveCloudConnectionProfile,
  saveTerraformDeploymentRecord,
} from '../services/cloudStorageService';
import { getIconByKey } from '../data/cloudIcons';

interface CloudDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagram: DiagramState;
  setDiagram: React.Dispatch<React.SetStateAction<DiagramState>>;
  connections: CloudConnectionProfile[];
  setConnections: React.Dispatch<React.SetStateAction<CloudConnectionProfile[]>>;
  activeConnectionId: string | null;
  setActiveConnectionId: (id: string | null) => void;
  userId?: string;
  theme?: 'dark' | 'light';
  initialTab?: 'accounts' | 'deploy' | 'live';
  showToast?: (msg: string) => void;
  onRecordHistory?: () => void;
}

const PROVIDER_META: Record<
  RealCloudProvider,
  { name: string; defaultRegion: string; regions: string[]; accent: string }
> = {
  aws: {
    name: 'AWS',
    defaultRegion: 'us-east-1',
    regions: ['us-east-1', 'sa-east-1', 'us-west-2', 'eu-west-1', 'eu-central-1'],
    accent: '#FF9900',
  },
  gcp: {
    name: 'Google Cloud',
    defaultRegion: 'us-central1',
    regions: ['us-central1', 'southamerica-east1', 'us-east1', 'europe-west1', 'asia-east1'],
    accent: '#4285F4',
  },
  azure: {
    name: 'Microsoft Azure',
    defaultRegion: 'eastus',
    regions: ['eastus', 'brazilsouth', 'westus2', 'westeurope', 'centralus'],
    accent: '#0078D4',
  },
  oci: {
    name: 'Oracle Cloud (OCI)',
    defaultRegion: 'us-ashburn-1',
    regions: ['us-ashburn-1', 'sa-saopaulo-1', 'us-phoenix-1', 'eu-frankfurt-1', 'sa-vinhedo-1'],
    accent: '#F80000',
  },
};

export const CloudDeployModal: React.FC<CloudDeployModalProps> = ({
  isOpen,
  onClose,
  diagram,
  setDiagram,
  connections,
  setConnections,
  activeConnectionId,
  setActiveConnectionId,
  userId,
  theme = 'dark',
  initialTab = 'accounts',
  showToast,
  onRecordHistory,
}) => {
  const isLight = theme === 'light';
  const [activeTab, setActiveTab] = useState<'accounts' | 'deploy' | 'live'>(initialTab);

  // Accounts form state
  const [formProvider, setFormProvider] = useState<RealCloudProvider>('aws');
  const [formLabel, setFormLabel] = useState('AWS Produção');
  const [formRegion, setFormRegion] = useState('us-east-1');
  const [awsAccessKeyId, setAwsAccessKeyId] = useState('');
  const [awsSecretAccessKey, setAwsSecretAccessKey] = useState('');
  const [awsSessionToken, setAwsSessionToken] = useState('');
  const [gcpProjectId, setGcpProjectId] = useState('');
  const [gcpServiceAccountJson, setGcpServiceAccountJson] = useState('');
  const [azureTenantId, setAzureTenantId] = useState('');
  const [azureClientId, setAzureClientId] = useState('');
  const [azureClientSecret, setAzureClientSecret] = useState('');
  const [azureSubscriptionId, setAzureSubscriptionId] = useState('');
  const [ociTenancyOcid, setOciTenancyOcid] = useState('');
  const [ociUserOcid, setOciUserOcid] = useState('');
  const [ociFingerprint, setOciFingerprint] = useState('');
  const [ociCompartmentId, setOciCompartmentId] = useState('');
  const [ociPrivateKeyPem, setOciPrivateKeyPem] = useState('');

  const [reconnectingId, setReconnectingId] = useState<string | null>(null);
  const [connectingLoading, setConnectingLoading] = useState(false);
  const [testingConnId, setTestingConnId] = useState<string | null>(null);
  const [accountStatusMsg, setAccountStatusMsg] = useState<{
    type: 'ok' | 'err';
    text: string;
  } | null>(null);

  // Terraform workspace & execution state
  const workspaceId = diagram.liveWorkspaceId || diagram.id || 'default_workspace';
  const [tfFiles, setTfFiles] = useState<TerraformProjectFiles>(() =>
    generateTerraformCode(diagram, buildOptionsFromConnections(connections, activeConnectionId || undefined))
  );
  const [activeFileTab, setActiveFileTab] = useState<keyof TerraformProjectFiles>('main.tf');
  const [tfBinaryInfo, setTfBinaryInfo] = useState<{
    installed: boolean;
    version?: string;
  }>({ installed: false });
  const [currentJob, setCurrentJob] = useState<TerraformJobRecord | null>(null);
  const [isRunningTf, setIsRunningTf] = useState(false);
  const [confirmDestroyAll, setConfirmDestroyAll] = useState(false);
  const [deploymentHistory, setDeploymentHistory] = useState<TerraformDeploymentRecord[]>([]);
  const [copiedLogs, setCopiedLogs] = useState(false);

  // Live state & cloud discovery
  const [provisionedResources, setProvisionedResources] = useState<ProvisionedResourceInfo[]>([]);
  const [tfOutputs, setTfOutputs] = useState<Record<string, { value: any; type?: any }>>({});
  const [discoveredResources, setDiscoveredResources] = useState<DiscoveredCloudResource[]>([]);
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [controllingId, setControllingId] = useState<string | null>(null);
  const [liveActionNotice, setLiveActionNotice] = useState<{
    type: 'ok' | 'err';
    text: string;
  } | null>(null);

  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  // Auto scroll terminal
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentJob?.logs?.length]);

  // Initial load: sync connections from server + Firestore, binary status, state, history
  useEffect(() => {
    if (!isOpen) return;

    const loadAll = async () => {
      try {
        const [serverConns, tfStatus] = await Promise.all([
          fetchServerCloudConnections().catch(() => [] as CloudConnectionProfile[]),
          getTerraformBinaryStatus().catch(() => ({ installed: false })),
        ]);
        setTfBinaryInfo(tfStatus);

        let merged = [...serverConns];
        if (userId) {
          try {
            const firestoreConns = await getCloudConnectionProfiles(userId);
            const serverMap = new Map(serverConns.map((c) => [c.id, c]));
            firestoreConns.forEach((fc) => {
              const active = serverMap.get(fc.id);
              if (active) {
                serverMap.set(fc.id, { ...fc, ...active, hasActiveSession: true });
              } else {
                serverMap.set(fc.id, { ...fc, hasActiveSession: false, status: 'disconnected' });
              }
            });
            merged = Array.from(serverMap.values());

            const hist = await getTerraformDeployments(userId).catch(() => []);
            setDeploymentHistory(hist.slice(0, 12));
          } catch (err) {
            console.warn('Firestore cloudConnections read warning:', err);
          }
        }

        setConnections(merged);
        if (!activeConnectionId && merged.length > 0) {
          const firstActive = merged.find((c) => c.hasActiveSession) || merged[0];
          setActiveConnectionId(firstActive.id);
        }

        const stateRes = await fetchTerraformState(
          workspaceId,
          activeConnectionId || undefined
        ).catch(() => null);
        if (stateRes) {
          setProvisionedResources(stateRes.resources || []);
          setTfOutputs(stateRes.outputs || {});
        }
      } catch (err) {
        console.warn('CloudDeployModal init error:', err);
      }
    };

    loadAll();
  }, [isOpen, userId, workspaceId]);

  // Regenerate Terraform preview when diagram changes or connection switches
  const handleRegenerateCode = () => {
    const opts = buildOptionsFromConnections(connections, activeConnectionId || undefined);
    setTfFiles(generateTerraformCode(diagram, opts));
    showToast?.('Código Terraform atualizado com os dados da arquitetura e conta ativa.');
  };

  if (!isOpen) return null;

  const activeConnection = connections.find((c) => c.id === activeConnectionId) || null;

  const handleProviderTabSwitch = (prov: RealCloudProvider) => {
    setFormProvider(prov);
    setFormRegion(PROVIDER_META[prov].defaultRegion);
    setFormLabel(`${PROVIDER_META[prov].name} Principal`);
    setReconnectingId(null);
    setAccountStatusMsg(null);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'gcp' | 'oci'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = String(reader.result || '');
      if (target === 'gcp') {
        setGcpServiceAccountJson(content);
        try {
          const parsed = JSON.parse(content);
          if (parsed.project_id && !gcpProjectId) {
            setGcpProjectId(parsed.project_id);
          }
        } catch {
          // ignore
        }
      } else {
        setOciPrivateKeyPem(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleConnectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setConnectingLoading(true);
    setAccountStatusMsg(null);

    const payload: CloudCredentialInput = {
      id: reconnectingId || undefined,
      label: formLabel.trim() || `${PROVIDER_META[formProvider].name} (${formRegion})`,
      provider: formProvider,
      region: formRegion.trim() || PROVIDER_META[formProvider].defaultRegion,
      awsAccessKeyId,
      awsSecretAccessKey,
      awsSessionToken,
      gcpProjectId,
      gcpServiceAccountJson,
      azureTenantId,
      azureClientId,
      azureClientSecret,
      azureSubscriptionId,
      ociTenancyOcid,
      ociUserOcid,
      ociFingerprint,
      ociCompartmentId,
      ociPrivateKeyPem,
    };

    try {
      const { connection, message } = await connectCloudAccount(payload);
      const enriched: CloudConnectionProfile = { ...connection, userId };

      if (userId) {
        saveCloudConnectionProfile(userId, enriched).catch((err) =>
          console.warn('Could not persist non-secret connection profile to Firestore:', err)
        );
      }

      setConnections((prev) => {
        const idx = prev.findIndex((c) => c.id === enriched.id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = enriched;
          return copy;
        }
        return [enriched, ...prev];
      });
      setActiveConnectionId(enriched.id);
      setReconnectingId(null);
      setAccountStatusMsg({ type: 'ok', text: message });
      showToast?.(message);

      // Clear raw secret inputs immediately from React state
      setAwsSecretAccessKey('');
      setAwsSessionToken('');
      setGcpServiceAccountJson('');
      setAzureClientSecret('');
      setOciPrivateKeyPem('');
    } catch (err: any) {
      setAccountStatusMsg({
        type: 'err',
        text: err?.message || 'Erro ao verificar credenciais na nuvem.',
      });
    } finally {
      setConnectingLoading(false);
    }
  };

  const handleTestConnection = async (connId: string) => {
    setTestingConnId(connId);
    setAccountStatusMsg(null);
    try {
      const { connection, message } = await testCloudAccount(connId);
      setConnections((prev) => prev.map((c) => (c.id === connId ? { ...c, ...connection } : c)));
      setAccountStatusMsg({ type: 'ok', text: message });
    } catch (err: any) {
      setAccountStatusMsg({ type: 'err', text: err?.message || 'Teste falhou.' });
    } finally {
      setTestingConnId(null);
    }
  };

  const handleRemoveConnection = async (connId: string) => {
    await disconnectCloudAccount(connId).catch(() => {});
    if (userId) {
      await deleteCloudConnectionProfile(userId, connId).catch(() => {});
    }
    setConnections((prev) => prev.filter((c) => c.id !== connId));
    if (activeConnectionId === connId) {
      setActiveConnectionId(null);
    }
  };

  const startReconnect = (conn: CloudConnectionProfile) => {
    setFormProvider(conn.provider);
    setFormLabel(conn.label);
    setFormRegion(conn.region);
    setReconnectingId(conn.id);
    if (conn.metadata?.projectId) setGcpProjectId(conn.metadata.projectId);
    if (conn.metadata?.subscriptionId) setAzureSubscriptionId(conn.metadata.subscriptionId);
    if (conn.metadata?.tenantId) setAzureTenantId(conn.metadata.tenantId);
    if (conn.metadata?.tenancyOcid) setOciTenancyOcid(conn.metadata.tenancyOcid);
    if (conn.metadata?.compartmentId) setOciCompartmentId(conn.metadata.compartmentId);
    setAccountStatusMsg({
      type: 'ok',
      text: `Reinsira a chave secreta para reativar a sessão de "${conn.label}".`,
    });
  };

  // Run Terraform Action + Poll Logs
  const handleRunTerraform = async (
    action: TerraformJobAction,
    targetAddress?: string
  ) => {
    setConfirmDestroyAll(false);
    setIsRunningTf(true);
    try {
      const syncRes = await syncDiagramWorkspaceToServer(
        workspaceId,
        diagram,
        tfFiles,
        connections,
        activeConnectionId || undefined
      );
      if (syncRes.terraform) setTfBinaryInfo(syncRes.terraform);

      const started = await runTerraformAction({
        workspaceId,
        connectionId: activeConnectionId || undefined,
        action,
        targetAddress,
      });
      setCurrentJob(started);

      const poll = async (): Promise<void> => {
        const updated = await fetchTerraformJob(started.jobId);
        setCurrentJob(updated);
        if (updated.status === 'running' || updated.status === 'queued') {
          await new Promise((r) => setTimeout(r, 900));
          return poll();
        }

        // Completed
        if (updated.resources) {
          setProvisionedResources(updated.resources);
          if (['apply', 'refresh', 'destroy', 'replace-target', 'destroy-target'].includes(action)) {
            onRecordHistory?.();
            setDiagram((prev) =>
              applyLiveStateToDiagram(
                prev,
                updated.resources || [],
                workspaceId,
                activeConnectionId || undefined,
                action === 'destroy'
              )
            );
          }
        }
        if (updated.outputs) {
          setTfOutputs(updated.outputs);
        }

        const updatedStatus = await getTerraformBinaryStatus().catch(() => tfBinaryInfo);
        setTfBinaryInfo(updatedStatus);

        if (userId) {
          const rec: TerraformDeploymentRecord = {
            id: updated.jobId,
            userId,
            architectureId: diagram.id,
            architectureTitle: diagram.title || 'Arquitetura',
            workspaceId,
            connectionId: activeConnectionId || undefined,
            provider: activeConnection?.provider || 'multicloud',
            action,
            status: updated.status,
            summaryText:
              updated.status === 'succeeded'
                ? `terraform ${action} concluído (${updated.resources?.length || 0} recursos)`
                : updated.error || `terraform ${action} falhou`,
            planSummary: updated.planSummary,
            outputs: updated.outputs,
            resourcesCount: updated.resources?.length || 0,
            createdAt: updated.startedAt,
            updatedAt: updated.finishedAt || new Date().toISOString(),
          };
          saveTerraformDeploymentRecord(userId, rec)
            .then(() => setDeploymentHistory((prev) => [rec, ...prev].slice(0, 12)))
            .catch(() => {});
        }

        if (updated.status === 'succeeded') {
          showToast?.(`Terraform "${action}" concluído com sucesso.`);
        } else {
          showToast?.(`Terraform "${action}" falhou. Verifique o console.`);
        }
      };

      await poll();
    } catch (err: any) {
      setLiveActionNotice({
        type: 'err',
        text: err?.message || 'Erro ao executar comando Terraform.',
      });
    } finally {
      setIsRunningTf(false);
    }
  };

  const handleDiscoverLive = async () => {
    if (!activeConnectionId) {
      setLiveActionNotice({
        type: 'err',
        text: 'Selecione uma conta cloud ativa primeiro na aba Contas Cloud.',
      });
      return;
    }
    setIsDiscovering(true);
    setLiveActionNotice(null);
    try {
      const res = await fetchDiscoveredCloudResources(activeConnectionId);
      setDiscoveredResources(res.resources);
      setLiveActionNotice({
        type: 'ok',
        text: `${res.resources.length} recursos encontrados na conta ${res.provider.toUpperCase()} (${res.region}).`,
      });
    } catch (err: any) {
      setLiveActionNotice({
        type: 'err',
        text: err?.message || 'Falha ao consultar APIs da nuvem.',
      });
    } finally {
      setIsDiscovering(false);
    }
  };

  const handleControlLive = async (
    resource: DiscoveredCloudResource,
    action: 'start' | 'stop' | 'reboot'
  ) => {
    if (!activeConnectionId) return;
    setControllingId(`${resource.id}_${action}`);
    setLiveActionNotice(null);
    try {
      const result = await executeCloudResourceControl({
        connectionId: activeConnectionId,
        resourceId: resource.id,
        resourceType: resource.resourceType,
        action,
      });
      setLiveActionNotice({ type: 'ok', text: result.message });
      showToast?.(result.message);

      setDiscoveredResources((prev) =>
        prev.map((r) =>
          r.id === resource.id
            ? {
                ...r,
                state: result.newState === 'stopped' ? 'stopped' : 'running',
                supportedActions:
                  result.newState === 'stopped' ? ['start'] : ['stop', 'reboot'],
              }
            : r
        )
      );

      // Update Canvas node if matching cloudResourceId exists
      setDiagram((prev) => ({
        ...prev,
        nodes: prev.nodes.map((n) =>
          n.liveState?.cloudResourceId === resource.id
            ? {
                ...n,
                liveState: {
                  ...n.liveState,
                  status: result.newState === 'stopped' ? 'stopped' : 'running',
                  lastSyncedAt: new Date().toISOString(),
                },
              }
            : n
        ),
      }));
    } catch (err: any) {
      setLiveActionNotice({ type: 'err', text: err?.message || 'Comando falhou.' });
    } finally {
      setControllingId(null);
    }
  };

  const handleImportDiscoveredToCanvas = (res: DiscoveredCloudResource) => {
    const alreadyExists = diagram.nodes.some(
      (n) => n.liveState?.cloudResourceId === res.id
    );
    if (alreadyExists) {
      showToast?.(`"${res.name}" já está sincronizado no Canvas.`);
      return;
    }

    onRecordHistory?.();
    const iconDef = getIconByKey(res.iconKey);
    const maxX = diagram.nodes.reduce((m, n) => Math.max(m, n.x), 80);
    const col = diagram.nodes.length % 4;
    const row = Math.floor(diagram.nodes.length / 4);

    const newNode: DiagramNode = {
      id: `node_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name: res.name,
      provider: res.provider,
      category: res.category,
      iconKey: iconDef?.key || res.iconKey,
      resourceType: res.resourceType,
      x: Math.min(820, 120 + col * 150),
      y: 120 + row * 130 + (maxX > 900 ? 40 : 0),
      specs: {
        instanceType: res.instanceType || '',
        count: 1,
        region: res.region,
      },
      liveState: {
        status: res.state === 'stopped' ? 'stopped' : 'running',
        cloudResourceId: res.id,
        publicIp: res.publicIp,
        privateIp: res.privateIp,
        endpoint: res.endpoint,
        region: res.region,
        consoleUrl: res.consoleUrl,
        connectionId: activeConnectionId || undefined,
        lastSyncedAt: new Date().toISOString(),
      },
    };

    setDiagram((prev) => ({
      ...prev,
      nodes: [...prev.nodes, newNode],
    }));
    showToast?.(`"${res.name}" importado para o Canvas com telemetria live.`);
  };

  const handleCopyLogs = () => {
    if (!currentJob?.logs?.length) return;
    navigator.clipboard.writeText(currentJob.logs.join('\n'));
    setCopiedLogs(true);
    setTimeout(() => setCopiedLogs(false), 1800);
  };

  const cardBg = isLight
    ? 'bg-white border-slate-200 text-slate-900'
    : 'bg-[#12151C] border-white/10 text-slate-100';
  const surfaceBg = isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0C0E13] border-white/10';
  const inputCls = isLight
    ? 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 outline-none focus:border-blue-600'
    : 'w-full rounded-lg border border-white/10 bg-[#0A0C10] px-3 py-2 text-xs text-slate-100 outline-none focus:border-blue-500';

  return (
    <div
      id="cloud-deploy-modal-backdrop"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${
        isLight ? 'bg-slate-900/50' : 'bg-black/75'
      }`}
    >
      <div
        id="cloud-deploy-modal"
        className={`flex h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border shadow-2xl ${cardBg}`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between gap-4 border-b px-6 py-4 ${
            isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#0E1117]'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
              <Rocket className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold tracking-tight truncate">
                Cloud Deploy & Infraestrutura Live
              </h2>
              <p className={`text-xs truncate ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Conecte AWS, GCP, Azure ou OCI, execute Terraform real e controle recursos direto do estúdio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Active Cloud Indicator */}
            <div
              className={`hidden sm:flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs ${surfaceBg}`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  activeConnection?.hasActiveSession
                    ? 'bg-emerald-500'
                    : 'bg-slate-400'
                }`}
              />
              <span className="font-mono tabular-nums font-semibold whitespace-nowrap">
                {activeConnection
                  ? `${activeConnection.provider.toUpperCase()} • ${activeConnection.accountHint} (${activeConnection.region})`
                  : 'Nenhuma conta ativa'}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className={`rounded-lg p-1.5 transition-colors ${
                isLight ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-white/10 text-slate-400'
              }`}
              title="Fechar console"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          className={`flex items-center justify-between border-b px-6 py-2 ${
            isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-[#10131A]'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              id="tab-cloud-accounts"
              onClick={() => setActiveTab('accounts')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-colors ${
                activeTab === 'accounts'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-700 hover:bg-slate-100'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <KeyRound className="h-3.5 w-3.5" />
              <span>1. Contas Cloud ({connections.filter((c) => c.hasActiveSession).length})</span>
            </button>

            <button
              type="button"
              id="tab-terraform-deploy"
              onClick={() => setActiveTab('deploy')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-colors ${
                activeTab === 'deploy'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-700 hover:bg-slate-100'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>2. Deploy Terraform</span>
            </button>

            <button
              type="button"
              id="tab-live-control"
              onClick={() => setActiveTab('live')}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-colors ${
                activeTab === 'live'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-700 hover:bg-slate-100'
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <Activity className="h-3.5 w-3.5" />
              <span>3. Controle & Recursos Live ({provisionedResources.length + discoveredResources.length})</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3 text-[11px] font-mono tabular-nums">
            <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>
              Workspace: <strong className={isLight ? 'text-slate-900' : 'text-slate-200'}>{workspaceId}</strong>
            </span>
            <span className={isLight ? 'text-slate-300' : 'text-white/10'}>|</span>
            <span className={tfBinaryInfo.installed ? 'text-emerald-500 font-semibold' : 'text-amber-500'}>
              {tfBinaryInfo.installed
                ? `Terraform v${tfBinaryInfo.version}`
                : 'Terraform v1.9.8 (auto-install no 1º run)'}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {/* ================= TAB 1: CONTAS CLOUD ================= */}
          {activeTab === 'accounts' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Credential Connection Form */}
              <div className={`lg:col-span-7 rounded-xl border p-5 space-y-4 ${surfaceBg}`}>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold">
                      {reconnectingId ? 'Reconectar Sessão Cloud' : 'Conectar Nova Conta Cloud'}
                    </h3>
                    <p className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Validação real via API oficial (STS, OAuth2, ARM ou HTTP Signature OCI).
                    </p>
                  </div>
                  {reconnectingId && (
                    <button
                      type="button"
                      onClick={() => setReconnectingId(null)}
                      className="text-xs font-semibold text-blue-500 hover:underline whitespace-nowrap"
                    >
                      Cancelar reconexão
                    </button>
                  )}
                </div>

                {/* Provider Selector Tabs */}
                <div className="grid grid-cols-4 gap-2">
                  {(['aws', 'gcp', 'azure', 'oci'] as RealCloudProvider[]).map((prov) => {
                    const selected = formProvider === prov;
                    return (
                      <button
                        key={prov}
                        type="button"
                        onClick={() => handleProviderTabSwitch(prov)}
                        className={`rounded-lg border px-3 py-2 text-xs font-bold whitespace-nowrap transition-all ${
                          selected
                            ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                            : isLight
                            ? 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                            : 'border-white/10 bg-[#141821] text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        {prov.toUpperCase()}
                      </button>
                    );
                  })}
                </div>

                <form onSubmit={handleConnectSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
                        Rótulo / Ambiente
                      </label>
                      <input
                        type="text"
                        required
                        value={formLabel}
                        onChange={(e) => setFormLabel(e.target.value)}
                        placeholder="Ex: AWS Produção"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
                        Região Padrão
                      </label>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          required
                          list={`regions-${formProvider}`}
                          value={formRegion}
                          onChange={(e) => setFormRegion(e.target.value)}
                          className={`${inputCls} font-mono`}
                        />
                        <datalist id={`regions-${formProvider}`}>
                          {PROVIDER_META[formProvider].regions.map((r) => (
                            <option key={r} value={r} />
                          ))}
                        </datalist>
                      </div>
                    </div>
                  </div>

                  {/* AWS Fields */}
                  {formProvider === 'aws' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
                            AWS Access Key ID
                          </label>
                          <input
                            type="text"
                            required
                            value={awsAccessKeyId}
                            onChange={(e) => setAwsAccessKeyId(e.target.value)}
                            placeholder="AKIA..."
                            className={`${inputCls} font-mono`}
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
                            AWS Secret Access Key
                          </label>
                          <input
                            type="password"
                            required
                            value={awsSecretAccessKey}
                            onChange={(e) => setAwsSecretAccessKey(e.target.value)}
                            placeholder="••••••••••••••••••••"
                            className={`${inputCls} font-mono`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
                          Session Token (Opcional / STS)
                        </label>
                        <input
                          type="password"
                          value={awsSessionToken}
                          onChange={(e) => setAwsSessionToken(e.target.value)}
                          placeholder="Token temporário STS se aplicável"
                          className={`${inputCls} font-mono`}
                        />
                      </div>
                    </div>
                  )}

                  {/* GCP Fields */}
                  {formProvider === 'gcp' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
                          GCP Project ID
                        </label>
                        <input
                          type="text"
                          required
                          value={gcpProjectId}
                          onChange={(e) => setGcpProjectId(e.target.value)}
                          placeholder="meu-projeto-gcp-123"
                          className={`${inputCls} font-mono`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-[11px] font-bold uppercase tracking-wider">
                            Service Account Key (JSON)
                          </label>
                          <label className="cursor-pointer text-[11px] font-bold text-blue-500 hover:underline flex items-center gap-1">
                            <Upload className="h-3 w-3" />
                            <span>Importar .json</span>
                            <input
                              type="file"
                              accept=".json,application/json"
                              onChange={(e) => handleFileUpload(e, 'gcp')}
                              className="hidden"
                            />
                          </label>
                        </div>
                        <textarea
                          required
                          rows={5}
                          value={gcpServiceAccountJson}
                          onChange={(e) => setGcpServiceAccountJson(e.target.value)}
                          placeholder='{"type": "service_account", "project_id": "...", "private_key": "...", "client_email": "..."}'
                          className={`${inputCls} font-mono text-[11px]`}
                        />
                      </div>
                    </div>
                  )}

                  {/* Azure Fields */}
                  {formProvider === 'azure' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
                          Subscription ID
                        </label>
                        <input
                          type="text"
                          required
                          value={azureSubscriptionId}
                          onChange={(e) => setAzureSubscriptionId(e.target.value)}
                          placeholder="00000000-0000-0000-0000-000000000000"
                          className={`${inputCls} font-mono`}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
                          Directory (Tenant) ID
                        </label>
                        <input
                          type="text"
                          required
                          value={azureTenantId}
                          onChange={(e) => setAzureTenantId(e.target.value)}
                          placeholder="00000000-0000-0000-0000-000000000000"
                          className={`${inputCls} font-mono`}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
                          Application (Client) ID
                        </label>
                        <input
                          type="text"
                          required
                          value={azureClientId}
                          onChange={(e) => setAzureClientId(e.target.value)}
                          placeholder="Service Principal Client ID"
                          className={`${inputCls} font-mono`}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
                          Client Secret
                        </label>
                        <input
                          type="password"
                          required
                          value={azureClientSecret}
                          onChange={(e) => setAzureClientSecret(e.target.value)}
                          placeholder="••••••••••••••••••••"
                          className={`${inputCls} font-mono`}
                        />
                      </div>
                    </div>
                  )}

                  {/* OCI Fields */}
                  {formProvider === 'oci' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
                            Tenancy OCID
                          </label>
                          <input
                            type="text"
                            required
                            value={ociTenancyOcid}
                            onChange={(e) => setOciTenancyOcid(e.target.value)}
                            placeholder="ocid1.tenancy.oc1..aaaa..."
                            className={`${inputCls} font-mono`}
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
                            User OCID
                          </label>
                          <input
                            type="text"
                            required
                            value={ociUserOcid}
                            onChange={(e) => setOciUserOcid(e.target.value)}
                            placeholder="ocid1.user.oc1..aaaa..."
                            className={`${inputCls} font-mono`}
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
                            API Key Fingerprint
                          </label>
                          <input
                            type="text"
                            required
                            value={ociFingerprint}
                            onChange={(e) => setOciFingerprint(e.target.value)}
                            placeholder="aa:bb:cc:dd:ee:ff:..."
                            className={`${inputCls} font-mono`}
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1">
                            Compartment OCID
                          </label>
                          <input
                            type="text"
                            value={ociCompartmentId}
                            onChange={(e) => setOciCompartmentId(e.target.value)}
                            placeholder="ocid1.compartment.oc1.. (ou usa tenancy)"
                            className={`${inputCls} font-mono`}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-[11px] font-bold uppercase tracking-wider">
                            Private Key PEM
                          </label>
                          <label className="cursor-pointer text-[11px] font-bold text-blue-500 hover:underline flex items-center gap-1">
                            <Upload className="h-3 w-3" />
                            <span>Importar .pem</span>
                            <input
                              type="file"
                              accept=".pem,.key"
                              onChange={(e) => handleFileUpload(e, 'oci')}
                              className="hidden"
                            />
                          </label>
                        </div>
                        <textarea
                          required
                          rows={4}
                          value={ociPrivateKeyPem}
                          onChange={(e) => setOciPrivateKeyPem(e.target.value)}
                          placeholder="-----BEGIN PRIVATE KEY-----&#10;...&#10;-----END PRIVATE KEY-----"
                          className={`${inputCls} font-mono text-[11px]`}
                        />
                      </div>
                    </div>
                  )}

                  {/* Security Guarantee Notice */}
                  <div
                    className={`flex items-start gap-2.5 rounded-lg border p-3 text-[11px] ${
                      isLight
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                        : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                    }`}
                  >
                    <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-emerald-500" />
                    <span>
                      <strong>Segurança de Credenciais:</strong> Chaves secretas e arquivos PEM permanecem exclusivamente na memória RAM da sessão do servidor e <strong>nunca</strong> são salvos no Firestore ou no navegador.
                    </span>
                  </div>

                  {accountStatusMsg && (
                    <div
                      className={`rounded-lg border px-3 py-2 text-xs font-medium ${
                        accountStatusMsg.type === 'ok'
                          ? isLight
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                            : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                          : isLight
                          ? 'border-rose-300 bg-rose-50 text-rose-900'
                          : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
                      }`}
                    >
                      {accountStatusMsg.text}
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="submit"
                      id="btn-connect-cloud-submit"
                      disabled={connectingLoading}
                      className="flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-bold text-white shadow-sm whitespace-nowrap disabled:opacity-50"
                    >
                      {connectingLoading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      )}
                      <span>
                        {connectingLoading
                          ? 'Validando Credenciais...'
                          : reconnectingId
                          ? 'Reativar Sessão Cloud'
                          : 'Testar & Conectar Conta'}
                      </span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Right: Saved / Active Connections */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold">Contas Conectadas</h3>
                  <span className="text-[11px] font-mono tabular-nums text-slate-500">
                    {connections.length} perfil(is)
                  </span>
                </div>

                {connections.length === 0 ? (
                  <div
                    className={`rounded-xl border border-dashed p-8 text-center text-xs ${
                      isLight ? 'border-slate-300 text-slate-600' : 'border-white/15 text-slate-400'
                    }`}
                  >
                    <Cloud className="mx-auto mb-2 h-8 w-8 text-blue-500 opacity-70" />
                    Nenhuma conta conectada ainda. Preencha as credenciais ao lado para conectar AWS, GCP, Azure ou OCI.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {connections.map((conn) => {
                      const isActive = conn.id === activeConnectionId;
                      return (
                        <div
                          key={conn.id}
                          className={`rounded-xl border p-3.5 transition-all ${
                            isActive
                              ? isLight
                                ? 'border-blue-500 bg-blue-50/70'
                                : 'border-blue-500 bg-blue-500/10'
                              : cardBg
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className="h-2.5 w-2.5 rounded-full shrink-0"
                                  style={{ backgroundColor: PROVIDER_META[conn.provider]?.accent || '#3B82F6' }}
                                />
                                <span className="text-xs font-bold truncate">{conn.label}</span>
                              </div>
                              <div className="mt-1 font-mono text-[11px] tabular-nums text-slate-500 truncate">
                                {conn.provider.toUpperCase()} • {conn.accountHint} • {conn.region}
                              </div>
                              <div className="mt-1 text-[10px] font-semibold">
                                {conn.hasActiveSession ? (
                                  <span className="text-emerald-500">Sessão RAM ativa no servidor</span>
                                ) : (
                                  <span className="text-amber-500">
                                    Perfil salvo (reinsira a chave secreta para usar)
                                  </span>
                                )}
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveConnection(conn.id)}
                              className="p-1.5 rounded-md text-rose-500 hover:bg-rose-500/10"
                              title="Remover conexão"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <div className="mt-3 flex flex-wrap items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setActiveConnectionId(conn.id)}
                              className={`rounded-md px-2.5 py-1 text-[11px] font-bold whitespace-nowrap border ${
                                isActive
                                  ? 'border-blue-600 bg-blue-600 text-white'
                                  : isLight
                                  ? 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                                  : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
                              }`}
                            >
                              {isActive ? 'Conta Ativa' : 'Selecionar'}
                            </button>

                            {conn.hasActiveSession ? (
                              <button
                                type="button"
                                disabled={testingConnId === conn.id}
                                onClick={() => handleTestConnection(conn.id)}
                                className={`rounded-md px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap border flex items-center gap-1 ${
                                  isLight
                                    ? 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                                    : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
                                }`}
                              >
                                <RefreshCw
                                  className={`h-3 w-3 ${testingConnId === conn.id ? 'animate-spin' : ''}`}
                                />
                                <span>Testar</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => startReconnect(conn)}
                                className="rounded-md border border-amber-500/40 bg-amber-500/15 px-2.5 py-1 text-[11px] font-bold text-amber-500 hover:bg-amber-500/25 whitespace-nowrap"
                              >
                                Reconectar Chave
                              </button>
                            )}

                            {conn.hasActiveSession && (
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveConnectionId(conn.id);
                                  setActiveTab('deploy');
                                }}
                                className="rounded-md bg-emerald-600 hover:bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white whitespace-nowrap ml-auto"
                              >
                                Ir para Deploy →
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= TAB 2: DEPLOY TERRAFORM ================= */}
          {activeTab === 'deploy' && (
            <div className="space-y-4">
              {/* Top Action Bar */}
              <div
                className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border p-3 ${surfaceBg}`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={activeConnectionId || ''}
                    onChange={(e) => setActiveConnectionId(e.target.value || null)}
                    className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold outline-none ${
                      isLight
                        ? 'border-slate-300 bg-white text-slate-900'
                        : 'border-white/10 bg-[#141821] text-slate-100'
                    }`}
                  >
                    <option value="">Sem conta selecionada (somente Init/Validate)</option>
                    {connections
                      .filter((c) => c.hasActiveSession)
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label} — {c.provider.toUpperCase()} ({c.region})
                        </option>
                      ))}
                  </select>

                  <button
                    type="button"
                    onClick={handleRegenerateCode}
                    className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap ${
                      isLight
                        ? 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                        : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
                    }`}
                    title="Regenerar código .tf a partir do diagrama atual"
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-blue-500" />
                    <span>Sincronizar Canvas → HCL</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    disabled={isRunningTf}
                    onClick={() => handleRunTerraform('init')}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-bold whitespace-nowrap disabled:opacity-50 ${
                      isLight
                        ? 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                        : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
                    }`}
                  >
                    Init
                  </button>
                  <button
                    type="button"
                    disabled={isRunningTf}
                    onClick={() => handleRunTerraform('validate')}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-bold whitespace-nowrap disabled:opacity-50 ${
                      isLight
                        ? 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                        : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
                    }`}
                  >
                    Validate
                  </button>
                  <button
                    type="button"
                    disabled={isRunningTf}
                    onClick={() => handleRunTerraform('plan')}
                    className="rounded-lg bg-blue-600 hover:bg-blue-500 px-3 py-1.5 text-xs font-bold text-white whitespace-nowrap disabled:opacity-50"
                  >
                    Plan
                  </button>
                  <button
                    type="button"
                    id="btn-tf-apply"
                    disabled={isRunningTf || !activeConnection?.hasActiveSession}
                    onClick={() => handleRunTerraform('apply')}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-white whitespace-nowrap disabled:opacity-50"
                    title={
                      activeConnection?.hasActiveSession
                        ? 'Executar terraform apply -auto-approve na conta selecionada'
                        : 'Conecte e selecione uma conta cloud ativa para fazer Apply'
                    }
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Apply (Deploy Real)</span>
                  </button>
                  <button
                    type="button"
                    disabled={isRunningTf || !activeConnection?.hasActiveSession}
                    onClick={() => handleRunTerraform('refresh')}
                    className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap disabled:opacity-50 ${
                      isLight
                        ? 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                        : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
                    }`}
                  >
                    Refresh State
                  </button>

                  {!confirmDestroyAll ? (
                    <button
                      type="button"
                      disabled={isRunningTf || !activeConnection?.hasActiveSession}
                      onClick={() => setConfirmDestroyAll(true)}
                      className="rounded-lg border border-rose-500/40 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 text-xs font-bold text-rose-500 whitespace-nowrap disabled:opacity-50"
                    >
                      Destroy
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 rounded-lg border border-rose-500 bg-rose-500/15 px-2 py-1">
                      <span className="text-[11px] font-bold text-rose-500 whitespace-nowrap">
                        Confirmar Destroy?
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRunTerraform('destroy')}
                        className="rounded bg-rose-600 px-2 py-0.5 text-[11px] font-bold text-white whitespace-nowrap"
                      >
                        Sim, Destruir
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDestroyAll(false)}
                        className="rounded px-2 py-0.5 text-[11px] font-semibold text-slate-400 hover:text-white whitespace-nowrap"
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {!activeConnection?.hasActiveSession && (
                <div
                  className={`flex items-center justify-between gap-3 rounded-lg border px-3.5 py-2 text-xs ${
                    isLight
                      ? 'border-amber-300 bg-amber-50 text-amber-900'
                      : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>
                      Conecte uma conta AWS, GCP, Azure ou OCI para habilitar <strong>Plan / Apply / Destroy</strong> reais na nuvem. (Init e Validate funcionam sem credenciais.)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('accounts')}
                    className="rounded-md bg-amber-600 px-2.5 py-1 text-[11px] font-bold text-white whitespace-nowrap"
                  >
                    Conectar Conta
                  </button>
                </div>
              )}

              {/* Split View: HCL Code Editor + Live Streaming Terminal */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left: Editable HCL Files */}
                <div className={`lg:col-span-6 flex flex-col rounded-xl border overflow-hidden ${surfaceBg}`}>
                  <div
                    className={`flex items-center gap-1 overflow-x-auto border-b px-2 py-1.5 ${
                      isLight ? 'border-slate-200 bg-slate-100' : 'border-white/10 bg-[#141821]'
                    }`}
                  >
                    {(Object.keys(tfFiles) as Array<keyof TerraformProjectFiles>).map((fname) => (
                      <button
                        key={fname}
                        type="button"
                        onClick={() => setActiveFileTab(fname)}
                        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] font-semibold whitespace-nowrap ${
                          activeFileTab === fname
                            ? isLight
                              ? 'bg-white text-blue-700 shadow-sm border border-slate-300'
                              : 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                            : isLight
                            ? 'text-slate-600 hover:bg-slate-200/70'
                            : 'text-slate-400 hover:bg-white/5'
                        }`}
                      >
                        <FileCode className="h-3 w-3" />
                        <span>{fname}</span>
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={tfFiles[activeFileTab]}
                    onChange={(e) =>
                      setTfFiles((prev) => ({ ...prev, [activeFileTab]: e.target.value }))
                    }
                    spellCheck={false}
                    className={`h-[380px] w-full resize-none p-3.5 font-mono text-xs leading-relaxed outline-none ${
                      isLight ? 'bg-white text-slate-900' : 'bg-[#090B0F] text-slate-200'
                    }`}
                  />
                </div>

                {/* Right: Live Execution Terminal + Plan Diff */}
                <div className="lg:col-span-6 flex flex-col rounded-xl border border-white/10 bg-[#090B0F] text-slate-200 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#11151E] px-3.5 py-2">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="font-bold">Console Terraform</span>
                      {currentJob && (
                        <span
                          className={`ml-2 text-[11px] font-bold ${
                            currentJob.status === 'running'
                              ? 'text-amber-400'
                              : currentJob.status === 'succeeded'
                              ? 'text-emerald-400'
                              : 'text-rose-400'
                          }`}
                        >
                          [{currentJob.action.toUpperCase()} • {currentJob.status.toUpperCase()}]
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyLogs}
                      className="flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300 hover:bg-white/10 whitespace-nowrap"
                    >
                      {copiedLogs ? (
                        <Check className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      <span>{copiedLogs ? 'Copiado' : 'Copiar Log'}</span>
                    </button>
                  </div>

                  {/* Plan Summary Diff Strip */}
                  {currentJob?.planSummary && (
                    <div className="border-b border-white/10 bg-[#0F172A] px-3.5 py-2 flex items-center justify-between text-xs font-mono tabular-nums">
                      <span className="font-bold text-slate-300">Resumo do Plan:</span>
                      <div className="flex items-center gap-4 font-bold">
                        <span className="text-emerald-400">+{currentJob.planSummary.add} criar</span>
                        <span className="text-amber-400">~{currentJob.planSummary.change} alterar</span>
                        <span className="text-rose-400">-{currentJob.planSummary.destroy} destruir</span>
                      </div>
                    </div>
                  )}

                  <div className="h-[340px] flex-1 overflow-y-auto p-3.5 font-mono text-[11px] leading-relaxed tabular-nums space-y-0.5 custom-scrollbar">
                    {!currentJob ? (
                      <div className="text-slate-500">
                        Pronto para executar. Selecione uma ação acima (Init, Validate, Plan ou Apply) para iniciar o provisionamento no workspace "{workspaceId}".
                      </div>
                    ) : (
                      currentJob.logs.map((line, i) => (
                        <div
                          key={i}
                          className={
                            line.startsWith('$ ')
                              ? 'text-sky-400 font-bold'
                              : line.includes('Error:') || line.startsWith('[ERRO]')
                              ? 'text-rose-400'
                              : line.includes('Apply complete!') || line.includes('Success!')
                              ? 'text-emerald-400 font-bold'
                              : 'text-slate-300'
                          }
                        >
                          {line}
                        </div>
                      ))
                    )}
                    {isRunningTf && (
                      <div className="flex items-center gap-2 pt-2 text-amber-400">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Executando Terraform CLI...</span>
                      </div>
                    )}
                    <div ref={logsEndRef} />
                  </div>
                </div>
              </div>

              {/* Outputs & Recent History */}
              {(Object.keys(tfOutputs).length > 0 || deploymentHistory.length > 0) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {Object.keys(tfOutputs).length > 0 && (
                    <div className={`rounded-xl border p-4 ${surfaceBg}`}>
                      <h4 className="text-xs font-bold uppercase tracking-wider mb-2">
                        Terraform Outputs Provisionados
                      </h4>
                      <div className="space-y-1.5 font-mono text-xs tabular-nums">
                        {Object.entries(tfOutputs).map(([k, v]) => (
                          <div
                            key={k}
                            className={`flex items-center justify-between gap-2 rounded border px-2.5 py-1.5 ${
                              isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-black/30'
                            }`}
                          >
                            <span className="font-bold text-blue-500 truncate">{k}</span>
                            <span className="truncate">
                              {JSON.stringify(
                                v && typeof v === 'object' && 'value' in v
                                  ? (v as { value?: unknown }).value
                                  : v
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {deploymentHistory.length > 0 && (
                    <div className={`rounded-xl border p-4 ${surfaceBg}`}>
                      <h4 className="text-xs font-bold uppercase tracking-wider mb-2">
                        Histórico de Execuções (Firestore)
                      </h4>
                      <div className="space-y-1.5 text-xs">
                        {deploymentHistory.slice(0, 5).map((d) => (
                          <div
                            key={d.id}
                            className={`flex items-center justify-between gap-2 rounded border px-2.5 py-1.5 ${
                              isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-black/30'
                            }`}
                          >
                            <div className="truncate">
                              <span className="font-mono font-bold uppercase mr-2">{d.action}</span>
                              <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                                {d.summaryText}
                              </span>
                            </div>
                            <span
                              className={`font-mono text-[11px] font-bold shrink-0 ${
                                d.status === 'succeeded' ? 'text-emerald-500' : 'text-rose-500'
                              }`}
                            >
                              {d.status.toUpperCase()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 3: CONTROLE & RECURSOS LIVE ================= */}
          {activeTab === 'live' && (
            <div className="space-y-5">
              {liveActionNotice && (
                <div
                  className={`rounded-lg border px-3.5 py-2.5 text-xs font-medium ${
                    liveActionNotice.type === 'ok'
                      ? isLight
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                        : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                      : isLight
                      ? 'border-rose-300 bg-rose-50 text-rose-900'
                      : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
                  }`}
                >
                  {liveActionNotice.text}
                </div>
              )}

              {/* Section A: Provisioned Terraform State Resources */}
              <div className={`rounded-xl border p-4 space-y-3 ${surfaceBg}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <Layers className="h-4 w-4 text-emerald-500" />
                      <span>Recursos Gerenciados pelo State Terraform ({provisionedResources.length})</span>
                    </h3>
                    <p className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Recursos provisionados neste workspace com sincronização direta nos nós do Canvas.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={async () => {
                        const st = await fetchTerraformState(
                          workspaceId,
                          activeConnectionId || undefined
                        );
                        setProvisionedResources(st.resources);
                        setTfOutputs(st.outputs);
                        onRecordHistory?.();
                        setDiagram((prev) =>
                          applyLiveStateToDiagram(
                            prev,
                            st.resources,
                            workspaceId,
                            activeConnectionId || undefined
                          )
                        );
                        showToast?.('Estado Terraform sincronizado com os ícones do Canvas.');
                      }}
                      className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white whitespace-nowrap"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Sincronizar State → Canvas</span>
                    </button>
                  </div>
                </div>

                {provisionedResources.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-500">
                    Nenhum recurso provisionado no arquivo <code className="font-mono">terraform.tfstate</code> deste workspace ainda. Execute <strong>Apply</strong> na aba Deploy Terraform.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className={`border-b text-[10px] uppercase tracking-wider ${isLight ? 'border-slate-200 text-slate-500' : 'border-white/10 text-slate-400'}`}>
                          <th className="py-2 pr-3">Endereço Terraform</th>
                          <th className="py-2 pr-3">ID Cloud</th>
                          <th className="py-2 pr-3">Endpoint / IP</th>
                          <th className="py-2 pr-3">Status</th>
                          <th className="py-2 text-right">Ações Terraform</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-mono text-[11px] tabular-nums">
                        {provisionedResources.map((r) => (
                          <tr key={r.address}>
                            <td className="py-2.5 pr-3 font-bold">{r.address}</td>
                            <td className="py-2.5 pr-3 text-slate-400 max-w-[200px] truncate">{r.cloudResourceId}</td>
                            <td className="py-2.5 pr-3">{r.publicIp || r.privateIp || r.endpoint || '—'}</td>
                            <td className="py-2.5 pr-3">
                              <span className={`font-bold ${r.status === 'running' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                {r.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-2.5 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                {r.consoleUrl && (
                                  <a
                                    href={r.consoleUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded border border-white/10 px-2 py-1 hover:bg-white/10 inline-flex items-center gap-1 whitespace-nowrap"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                    <span>Console</span>
                                  </a>
                                )}
                                <button
                                  type="button"
                                  disabled={isRunningTf}
                                  onClick={() => {
                                    setActiveTab('deploy');
                                    handleRunTerraform('replace-target', r.address);
                                  }}
                                  className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-1 font-sans font-bold text-amber-500 hover:bg-amber-500/20 whitespace-nowrap"
                                >
                                  Recriar
                                </button>
                                <button
                                  type="button"
                                  disabled={isRunningTf}
                                  onClick={() => {
                                    setActiveTab('deploy');
                                    handleRunTerraform('destroy-target', r.address);
                                  }}
                                  className="rounded border border-rose-500/30 bg-rose-500/10 px-2 py-1 font-sans font-bold text-rose-500 hover:bg-rose-500/20 whitespace-nowrap"
                                >
                                  Destruir
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Section B: Cloud Account Discovery & Live Start/Stop/Reboot */}
              <div className={`rounded-xl border p-4 space-y-3 ${surfaceBg}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <Server className="h-4 w-4 text-blue-500" />
                      <span>Descoberta & Controle Direto na Conta Cloud</span>
                    </h3>
                    <p className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Consulte VMs, bancos RDS, VPCs e Storage diretamente da conta ativa, ligue/desligue instâncias ou importe para o Canvas.
                    </p>
                  </div>

                  <button
                    type="button"
                    id="btn-discover-cloud-resources"
                    disabled={isDiscovering || !activeConnection?.hasActiveSession}
                    onClick={handleDiscoverLive}
                    className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 px-3.5 py-1.5 text-xs font-bold text-white whitespace-nowrap disabled:opacity-50"
                  >
                    {isDiscovering ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <RefreshCw className="h-3.5 w-3.5" />
                    )}
                    <span>{isDiscovering ? 'Consultando APIs...' : 'Listar Recursos da Conta'}</span>
                  </button>
                </div>

                {discoveredResources.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-500">
                    Clique em <strong>Listar Recursos da Conta</strong> para inspecionar e controlar recursos reais na conta conectada.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className={`border-b text-[10px] uppercase tracking-wider ${isLight ? 'border-slate-200 text-slate-500' : 'border-white/10 text-slate-400'}`}>
                          <th className="py-2 pr-3">Serviço / Nome</th>
                          <th className="py-2 pr-3">ID / Região</th>
                          <th className="py-2 pr-3">IP / Endpoint</th>
                          <th className="py-2 pr-3">Estado</th>
                          <th className="py-2 text-right">Controle Live</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-xs">
                        {discoveredResources.map((res) => (
                          <tr key={`${res.service}_${res.id}`}>
                            <td className="py-2.5 pr-3">
                              <div className="font-bold">{res.name}</div>
                              <div className="font-mono text-[10px] text-slate-500">
                                {res.provider.toUpperCase()} {res.service} {res.instanceType ? `• ${res.instanceType}` : ''}
                              </div>
                            </td>
                            <td className="py-2.5 pr-3 font-mono text-[11px] tabular-nums">
                              <div className="max-w-[200px] truncate">{res.id}</div>
                              <div className="text-[10px] text-slate-500">{res.region}</div>
                            </td>
                            <td className="py-2.5 pr-3 font-mono text-[11px] tabular-nums">
                              {res.publicIp || res.privateIp || res.endpoint || '—'}
                            </td>
                            <td className="py-2.5 pr-3 font-mono text-[11px] font-bold">
                              <span
                                className={
                                  res.state === 'running' || res.state === 'available'
                                    ? 'text-emerald-500'
                                    : res.state === 'stopped'
                                    ? 'text-amber-500'
                                    : 'text-slate-400'
                                }
                              >
                                {res.state.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-2.5 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                {res.supportedActions.includes('start') && (
                                  <button
                                    type="button"
                                    disabled={controllingId === `${res.id}_start`}
                                    onClick={() => handleControlLive(res, 'start')}
                                    className="inline-flex items-center gap-1 rounded bg-emerald-600 hover:bg-emerald-500 px-2 py-1 text-[11px] font-bold text-white whitespace-nowrap"
                                  >
                                    <Power className="h-3 w-3" />
                                    <span>Iniciar</span>
                                  </button>
                                )}
                                {res.supportedActions.includes('stop') && (
                                  <button
                                    type="button"
                                    disabled={controllingId === `${res.id}_stop`}
                                    onClick={() => handleControlLive(res, 'stop')}
                                    className="inline-flex items-center gap-1 rounded bg-amber-600 hover:bg-amber-500 px-2 py-1 text-[11px] font-bold text-white whitespace-nowrap"
                                  >
                                    <Square className="h-3 w-3" />
                                    <span>Parar</span>
                                  </button>
                                )}
                                {res.supportedActions.includes('reboot') && (
                                  <button
                                    type="button"
                                    disabled={controllingId === `${res.id}_reboot`}
                                    onClick={() => handleControlLive(res, 'reboot')}
                                    className="inline-flex items-center gap-1 rounded border border-blue-500/40 bg-blue-500/15 px-2 py-1 text-[11px] font-bold text-blue-500 hover:bg-blue-500/25 whitespace-nowrap"
                                  >
                                    <RotateCcw className="h-3 w-3" />
                                    <span>Reiniciar</span>
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleImportDiscoveredToCanvas(res)}
                                  className={`inline-flex items-center gap-1 rounded border px-2 py-1 text-[11px] font-semibold whitespace-nowrap ${
                                    isLight
                                      ? 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                                      : 'border-white/15 bg-white/5 text-slate-200 hover:bg-white/10'
                                  }`}
                                  title="Adicionar recurso ao Canvas"
                                >
                                  <Plus className="h-3 w-3" />
                                  <span>Canvas</span>
                                </button>
                                {res.consoleUrl && (
                                  <a
                                    href={res.consoleUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 rounded hover:bg-white/10 text-slate-400"
                                    title="Abrir no Console Cloud"
                                  >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </a>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
