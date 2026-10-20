import React, { useState, useRef, useEffect } from 'react';
import { DiagramState, DiagramNode, DiagramContainer, ContainerType, CloudIconDefinition, CloudProvider } from './types';
import { STARTER_TEMPLATES } from './data/templates';
import { Navbar } from './components/Navbar';
import { SidebarCatalog } from './components/SidebarCatalog';
import { Canvas } from './components/Canvas';
import { PropertyPanel } from './components/PropertyPanel';
import { TerraformModal } from './components/TerraformModal';
import { CostModal } from './components/CostModal';
import { AiPromptModal } from './components/AiPromptModal';
import { TemplateModal } from './components/TemplateModal';
import { SavedArchitecturesModal } from './components/SavedArchitecturesModal';
import { GoogleDriveModal } from './components/GoogleDriveModal';
import { GmailModal } from './components/GmailModal';
import { MetadataModal } from './components/MetadataModal';
import { FeedbackModal } from './components/FeedbackModal';
import { ProposalModal } from './components/ProposalModal';
import { VersionTabsBar } from './components/VersionTabsBar';
import { CloudSecurityLinterModal } from './components/CloudSecurityLinterModal';
import { ChangelogModal } from './components/ChangelogModal';
import { LATEST_APP_VERSION } from './data/changelogData';
import { DocumentationModal } from './components/DocumentationModal';
import { ProfilePreferencesModal } from './components/ProfilePreferencesModal';
import { MultiCloudLogo } from './components/MultiCloudLogo';
import { AuthModal } from './components/AuthModal';
import { AuthScreen } from './components/AuthScreen';
import { useAuth } from './contexts/AuthContext';
import { saveArchitectureToCloud } from './services/cloudStorageService';
import { safeJsonParse, validateAndSanitizeDiagramSchema } from './utils/schemaValidator';
import { GoogleUser } from './services/googleDrive';
import { saveArchitectureToStorage, saveAutosaveDraft, getAutosaveDraft } from './utils/storageUtils';
import { exportArchitecturePdf } from './utils/exportUtils';
import { fitDiagramToContainer } from './utils/canvasNavigation';
import { getNextSubnetCidr } from './utils/networkUtils';
import { CheckCircle2, Cloud, BookOpen, Youtube } from 'lucide-react';
import { ProposalType } from './types';

// Helper to detect OS system theme preference (Dark or Light mode)
const getSystemTheme = (): 'dark' | 'light' => {
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

// Helper to calculate next version tag (e.g., v1.0 -> v1.1, v1.1 -> v1.2)
const calculateNextVersionTag = (versionsList: DiagramState[], currentVer: string): string => {
  const match = (currentVer || 'v1.0').match(/v?(\d+)\.(\d+)/i);
  if (match) {
    const major = parseInt(match[1], 10);
    let minor = parseInt(match[2], 10) + 1;
    let candidate = `v${major}.${minor}`;
    while (versionsList.some((v) => v.version === candidate)) {
      minor++;
      candidate = `v${major}.${minor}`;
    }
    return candidate;
  }
  return `${currentVer || 'v1.0'}-v2`;
};

const sanitizeDiagramNodes = (diag: DiagramState): DiagramState => ({
  ...diag,
  nodes: (diag.nodes || []).map((node) => {
    if (node.name === 'Clients & Frontend' && (node.specs?.count || 1) > 1) {
      return {
        ...node,
        specs: { ...node.specs, count: 1 }
      };
    }
    return node;
  })
});

export default function App() {
  // Versions list state: maintains all version tabs for the current project
  const [versions, setVersions] = useState<DiagramState[]>(() => {
    try {
      const cached = localStorage.getItem('multicloud_studio_versions_v1');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: DiagramState, idx: number) => sanitizeDiagramNodes({
            ...item,
            version: item.version || `v1.${idx}`
          }));
        }
      }
    } catch (err) {
      console.warn('Failed to load version tabs list from storage', err);
    }

    const draft = getAutosaveDraft();
    if (draft) {
      return [sanitizeDiagramNodes({ ...draft, version: draft.version || 'v1.0' })];
    }
    return [sanitizeDiagramNodes({ ...STARTER_TEMPLATES[0], version: 'v1.0' })];
  });

  const [activeVersionId, setActiveVersionId] = useState<string>(() => versions[0]?.id || `diag_${Date.now()}`);

  // Derived current active diagram
  const diagram = versions.find((v) => v.id === activeVersionId) || versions[0] || STARTER_TEMPLATES[0];

  // Custom setDiagram proxy to update the active version inside versions array
  const setDiagram: React.Dispatch<React.SetStateAction<DiagramState>> = (action) => {
    setVersions((prevVersions) => {
      let targetIndex = prevVersions.findIndex((v) => v.id === activeVersionId);
      if (targetIndex === -1 && prevVersions.length > 0) {
        targetIndex = 0;
      }
      if (targetIndex === -1) return prevVersions;

      const targetVersion = prevVersions[targetIndex];
      const nextDiagram = typeof action === 'function' ? action(targetVersion) : action;

      if (nextDiagram.id && nextDiagram.id !== activeVersionId) {
        setActiveVersionId(nextDiagram.id);
      }

      return prevVersions.map((v, idx) => (idx === targetIndex ? nextDiagram : v));
    });
  };

  // Sync versions list to local storage
  useEffect(() => {
    try {
      localStorage.setItem('multicloud_studio_versions_v1', JSON.stringify(versions));
    } catch (err) {
      console.error('Failed to save versions list:', err);
    }
  }, [versions]);

  const [lastAutoSavedAt, setLastAutoSavedAt] = useState<Date | null>(null);

  // Theme state: defaults to light mode with pure white whiteboard
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [isManualThemeOverride, setIsManualThemeOverride] = useState(false);

  // Version management handlers
  const handleSelectVersion = (id: string) => {
    setActiveVersionId(id);
    setSelectedNodeId(null);
    setSelectedContainerId(null);
    setSelectedLinkId(null);
  };

  const handleAddVersion = () => {
    recordHistory();
    const nextVerTag = calculateNextVersionTag(versions, diagram.version || 'v1.0');
    const newVersion: DiagramState = {
      id: `diag_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: diagram.title || 'Nova Arquitetura',
      description: diagram.description || '',
      primaryProvider: diagram.primaryProvider || 'aws',
      nodes: [],
      containers: [],
      links: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: nextVerTag,
      metadata: diagram.metadata ? { ...diagram.metadata } : undefined
    };

    setVersions((prev) => [...prev, newVersion]);
    setActiveVersionId(newVersion.id);
    setSelectedNodeId(null);
    setSelectedContainerId(null);
    setSelectedLinkId(null);
    showToast(`Nova versão ${nextVerTag} criada com sucesso!`);
  };

  const handleDuplicateVersion = (targetId?: string) => {
    recordHistory();
    const source = versions.find((v) => v.id === (targetId || activeVersionId)) || diagram;
    const nextVerTag = calculateNextVersionTag(versions, source.version || 'v1.0');

    const duplicated: DiagramState = JSON.parse(JSON.stringify(source));
    duplicated.id = `diag_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    duplicated.version = nextVerTag;
    duplicated.updatedAt = new Date().toISOString();

    setVersions((prev) => [...prev, duplicated]);
    setActiveVersionId(duplicated.id);
    setSelectedNodeId(null);
    setSelectedContainerId(null);
    setSelectedLinkId(null);
    showToast(`Versão ${source.version || 'v1.0'} duplicada como ${nextVerTag}!`);
  };

  const handleDeleteVersion = (targetId: string) => {
    if (versions.length <= 1) {
      showToast('O projeto deve ter pelo menos uma versão.');
      return;
    }
    recordHistory();
    const targetVer = versions.find((v) => v.id === targetId);
    const remaining = versions.filter((v) => v.id !== targetId);
    setVersions(remaining);
    if (activeVersionId === targetId) {
      setActiveVersionId(remaining[0].id);
    }
    showToast(`Versão ${targetVer?.version || ''} excluída com sucesso.`);
  };

  // Automatically follow OS color scheme (prefers-color-scheme)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!isManualThemeOverride) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    if (!isManualThemeOverride) {
      setTheme(mediaQuery.matches ? 'dark' : 'light');
    }

    // Modern matchMedia listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    } else {
      mediaQuery.addListener(handleSystemThemeChange);
      return () => mediaQuery.removeListener(handleSystemThemeChange);
    }
  }, [isManualThemeOverride]);

  // Sync DOM classes, root color scheme, and body background when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      document.body.style.backgroundColor = '#0a0b0e';
      document.body.style.color = '#cbd5e1';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
      document.body.style.backgroundColor = '#f1f5f9';
      document.body.style.color = '#0f172a';
    }
  }, [theme]);

  // Auth context for user session and preferences
  const { currentUser, loading: authLoading, userPreferences, updatePreferences, logout } = useAuth();
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [isProfilePreferencesModalOpen, setIsProfilePreferencesModalOpen] = useState(false);

  // Sidebars collapsed preferences state (initialized from user preferences or false)
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);

  // If user logs in while in guest mode, reset guest mode flag
  useEffect(() => {
    if (currentUser) {
      setIsGuestMode(false);
    }
  }, [currentUser]);

  // Sync user profile preferences (theme, left sidebar, right sidebar) if set and no manual override
  useEffect(() => {
    if (userPreferences?.theme && !isManualThemeOverride) {
      setTheme(userPreferences.theme);
    }
    if (userPreferences?.leftSidebarCollapsed !== undefined) {
      setLeftSidebarCollapsed(userPreferences.leftSidebarCollapsed);
    }
    if (userPreferences?.rightSidebarCollapsed !== undefined) {
      setRightSidebarCollapsed(userPreferences.rightSidebarCollapsed);
    }
  }, [userPreferences, isManualThemeOverride]);

  const toggleTheme = () => {
    setIsManualThemeOverride(true);
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    updatePreferences({ theme: nextTheme }).catch((err) => console.warn('Could not sync theme preference', err));
  };

  const handleToggleLeftSidebar = (collapsed: boolean) => {
    setLeftSidebarCollapsed(collapsed);
    updatePreferences({ leftSidebarCollapsed: collapsed }).catch((err) =>
      console.warn('Could not sync left sidebar preference', err)
    );
  };

  const handleToggleRightSidebar = (collapsed: boolean) => {
    setRightSidebarCollapsed(collapsed);
    updatePreferences({ rightSidebarCollapsed: collapsed }).catch((err) =>
      console.warn('Could not sync right sidebar preference', err)
    );
  };

  // Auto-save mechanism: persists current diagram state to local storage every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      saveAutosaveDraft(diagram);
      setLastAutoSavedAt(new Date());
    }, 30000);

    return () => clearInterval(intervalId);
  }, [diagram]);

  // Google OAuth User State
  const [googleUser, setGoogleUser] = useState<GoogleUser | null>(() => {
    try {
      const cached = localStorage.getItem('cloudcraft_google_user');
      if (cached) {
        const parsed: GoogleUser = JSON.parse(cached);
        if (parsed.expiresAt && parsed.expiresAt > Date.now()) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse cached google user state', e);
    }
    return null;
  });

  // Undo / Redo history state
  const [historyStack, setHistoryStack] = useState<DiagramState[]>([]);
  const [redoStack, setRedoStack] = useState<DiagramState[]>([]);

  // Selection states
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);

  // Interaction & Canvas states
  const [isConnectingMode, setIsConnectingMode] = useState(false);
  const [zoom, setZoom] = useState(1.0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Presentation & Fullscreen Handlers
  const handleEnterPresentation = () => {
    setIsPresentationMode(true);
    setSelectedNodeId(null);
    setSelectedContainerId(null);
    setSelectedLinkId(null);
    setIsConnectingMode(false);

    // Request browser full screen if available
    try {
      if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.warn('Fullscreen request deferred or blocked by browser:', err);
        });
      }
    } catch (e) {
      console.warn('Fullscreen request failed', e);
    }

    // Auto fit architecture neatly on the screen
    setTimeout(() => {
      fitDiagramToContainer(diagram, canvasRef.current, setZoom);
    }, 120);
  };

  const handleExitPresentation = () => {
    setIsPresentationMode(false);
    setSelectedNodeId(null);

    // Exit browser full screen if active
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.warn('Exit fullscreen error:', err);
        });
      }
    } catch (e) {
      console.warn('Exit fullscreen failed', e);
    }
  };

  const handleToggleFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch((err) => console.warn(err));
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch((err) => console.warn(err));
        }
      }
    } catch (e) {
      console.warn('Toggle fullscreen failed', e);
    }
  };

  // Sync isFullscreen state with browser fullscreenchange event
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  // Keyboard shortcut listener: Escape key exits presentation mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPresentationMode) {
        handleExitPresentation();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresentationMode]);

  // Modals
  const [aiModalMode, setAiModalMode] = useState<'generator' | 'audit' | null>(null);
  const [isTerraformModalOpen, setIsTerraformModalOpen] = useState(false);
  const [isCostModalOpen, setIsCostModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isGoogleDriveModalOpen, setIsGoogleDriveModalOpen] = useState(false);
  const [isGmailModalOpen, setIsGmailModalOpen] = useState(false);
  const [isMetadataModalOpen, setIsMetadataModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isSecurityLinterOpen, setIsSecurityLinterOpen] = useState(false);
  const [isChangelogModalOpen, setIsChangelogModalOpen] = useState(false);
  const [isDocumentationModalOpen, setIsDocumentationModalOpen] = useState(false);
  const [proposalInitialType, setProposalInitialType] = useState<ProposalType>('implementation');

  const handleOpenProposalModal = (type: ProposalType = 'implementation') => {
    setProposalInitialType(type);
    setIsProposalModalOpen(true);
  };

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Safe deep clone to prevent snapshot mutations
  const cloneDiagramState = (state: DiagramState): DiagramState => {
    try {
      return structuredClone(state);
    } catch {
      return JSON.parse(JSON.stringify(state));
    }
  };

  // Record history snapshot before mutation with bounded history stack (max 50)
  const recordHistory = () => {
    const snapshot = cloneDiagramState(diagram);
    setHistoryStack((prev) => {
      const next = [...prev, snapshot];
      return next.length > 50 ? next.slice(next.length - 50) : next;
    });
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const previous = historyStack[historyStack.length - 1];
    setHistoryStack((prev) => prev.slice(0, prev.length - 1));
    setRedoStack((prev) => [cloneDiagramState(diagram), ...prev]);
    setDiagram(cloneDiagramState(previous));
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setRedoStack((prev) => prev.slice(1));
    setHistoryStack((prev) => {
      const updated = [...prev, cloneDiagramState(diagram)];
      return updated.length > 50 ? updated.slice(updated.length - 50) : updated;
    });
    setDiagram(cloneDiagramState(next));
  };

  // Global keyboard shortcuts: Ctrl+Z (Undo) and Ctrl+Y / Ctrl+Shift+Z (Redo)
  useEffect(() => {
    const handleUndoRedoShortcuts = (e: KeyboardEvent) => {
      // Avoid triggering when user is typing in inputs or textareas
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'Y')) {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleUndoRedoShortcuts);
    return () => window.removeEventListener('keydown', handleUndoRedoShortcuts);
  }, [historyStack, redoStack, diagram]);

  const handleNewArchitecture = () => {
    recordHistory();
    const defaultStamp = userPreferences?.defaultStamp;
    const initialMetadata = defaultStamp
      ? {
          project: 'Nova Arquitetura Cloud',
          author: defaultStamp.author || '',
          role: defaultStamp.role || '',
          company: defaultStamp.company || '',
          date: new Date().toLocaleDateString('pt-BR'),
          showOnCanvas: defaultStamp.showOnCanvas ?? false,
          tags: [],
          x: 30,
          y: 30
        }
      : undefined;

    const newArch: DiagramState = {
      id: `diag_${Date.now()}`,
      title: 'Nova Arquitetura Cloud',
      description: 'Especificação de arquitetura cloud personalizada.',
      primaryProvider: 'aws',
      nodes: [],
      containers: [],
      links: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: initialMetadata
    };
    setDiagram(newArch);
    setSelectedNodeId(null);
    setSelectedContainerId(null);
    setSelectedLinkId(null);
    showToast('Nova arquitetura criada com sucesso!');
  };

  const handleSaveArchitecture = async () => {
    saveAutosaveDraft(diagram);
    setLastAutoSavedAt(new Date());

    if (currentUser) {
      try {
        await saveArchitectureToCloud(currentUser.uid, diagram, {
          title: diagram.title || 'Sem título',
          description: diagram.description || '',
          tags: diagram.metadata?.tags || []
        });
        showToast(`Arquitetura "${diagram.title || 'Sem título'}" salva na nuvem Firestore e localmente!`);
        return;
      } catch (err: any) {
        console.error('Failed to save architecture to cloud:', err);
      }
    }

    showToast(`Arquitetura "${diagram.title || 'Sem título'}" salva localmente com sucesso!`);
  };

  const handleLoadSavedDiagram = (loadedDiagram: DiagramState) => {
    recordHistory();
    setDiagram(loadedDiagram);
    setSelectedNodeId(null);
    setSelectedContainerId(null);
    setSelectedLinkId(null);
    showToast(`Arquitetura "${loadedDiagram.title}" carregada com sucesso!`);
  };

  const handleClearCanvas = () => {
    recordHistory();
    setDiagram((prev) => ({
      ...prev,
      containers: [],
      nodes: [],
      links: [],
      updatedAt: new Date().toISOString()
    }));
    setSelectedNodeId(null);
    setSelectedContainerId(null);
    setSelectedLinkId(null);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const rawContent = event.target?.result as string;
        const parsed = safeJsonParse(rawContent);
        const validation = validateAndSanitizeDiagramSchema(parsed);

        if (!validation.isValid || !validation.sanitizedData) {
          alert(`Falha na validação de integridade do arquivo JSON:\n${validation.errors.join('\n')}`);
          return;
        }

        if (validation.warnings.length > 0) {
          console.warn('[Schema Validator Warnings]:', validation.warnings);
        }

        recordHistory();
        setDiagram(validation.sanitizedData);
        showToast(
          validation.warnings.length > 0
            ? 'Projeto JSON importado com sanitizações de segurança aplicadas!'
            : 'Projeto JSON importado e validado com sucesso!'
        );
      } catch (err: any) {
        alert(`Arquivo de projeto JSON corrompido ou malformado: ${err?.message || 'Erro de leitura'}`);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleAddNode = (icon: CloudIconDefinition) => {
    recordHistory();
    const newNode: DiagramNode = {
      id: `node_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: icon.name,
      provider: icon.provider,
      category: icon.category,
      iconKey: icon.key,
      resourceType: icon.defaultResourceType,
      x: 300 + Math.random() * 80,
      y: 200 + Math.random() * 80,
      specs: { ...icon.defaultSpecs }
    };

    setDiagram((prev) => ({
      ...prev,
      nodes: [...(prev?.nodes || []), newNode]
    }));
    setSelectedNodeId(newNode.id);
  };

  const handleAddContainer = (
    type: ContainerType,
    provider: CloudProvider,
    customCidr?: string
  ) => {
    recordHistory();
    let containerName = '';
    const pUpper = String(provider).toUpperCase();
    const tUpper = String(type).toUpperCase();

    if (type === 'cloud_group') {
      if (provider === 'aws') containerName = 'AWS';
      else if (provider === 'azure') containerName = 'Azure';
      else if (provider === 'gcp') containerName = 'GCP';
      else if (provider === 'oci') containerName = 'OCI';
      else containerName = pUpper;
    } else if (type === 'vpc') {
      if (provider === 'azure') containerName = 'Azure VNet';
      else if (provider === 'oci') containerName = 'OCI VCN';
      else if (provider === 'gcp') containerName = 'GCP VPC Network';
      else containerName = 'AWS VPC';
    } else if (type === 'subnet') {
      if (provider === 'aws') containerName = 'AWS Subnet';
      else if (provider === 'azure') containerName = 'Azure Subnet';
      else if (provider === 'gcp') containerName = 'GCP Subnet';
      else if (provider === 'oci') containerName = 'OCI Subnet';
      else {
        const pLabel = provider === 'generic' ? '' : `${pUpper} `;
        containerName = `${pLabel}Subnet`;
      }
    } else if (type === 'resource_group') {
      containerName = 'Azure Resource Group';
    } else if (type === 'compartment') {
      containerName = 'OCI Compartment';
    } else if (type === 'on_premise') {
      containerName = 'On-Premise Datacenter';
    } else if (type === 'cluster') {
      containerName = provider === 'aws' ? 'Amazon EKS Cluster' : provider === 'azure' ? 'Azure AKS Cluster' : provider === 'gcp' ? 'GKE Cluster' : 'Kubernetes Cluster';
    } else if (type === 'app') {
      containerName = 'Application Scope';
    } else if (type === 'generic') {
      containerName = 'Container Genérico';
    } else if (type === 'asg') {
      containerName = 'AWS Auto Scaling Group';
    } else if (type === 'aws_account') {
      containerName = 'AWS Account Boundary';
    } else if (type === 'azure_subscription') {
      containerName = 'Azure Subscription';
    } else if (type === 'ai_stack') {
      containerName = 'AI & GenAI Stack (LLM & Agents)';
    } else if (type === 'region') {
      if (provider === 'aws') containerName = 'AWS Region (us-east-1)';
      else if (provider === 'azure') containerName = 'Azure Region (East US)';
      else if (provider === 'gcp') containerName = 'GCP Region (us-central1)';
      else if (provider === 'oci') containerName = 'OCI Region (us-ashburn-1)';
      else containerName = `${pUpper} Region`;
    } else {
      containerName = `${pUpper} ${tUpper}`;
    }

    // IP Range (CIDR) configuration
    let cidrBlock: string | undefined = undefined;
    if (customCidr && customCidr.trim()) {
      cidrBlock = customCidr.trim();
    } else if (type === 'vpc') {
      cidrBlock = '10.0.0.0/16';
    } else if (type === 'subnet') {
      cidrBlock = getNextSubnetCidr(diagram?.containers || []);
    } else if (type === 'on_premise') {
      cidrBlock = '192.168.0.0/16';
    }

    let containerColor = '#8B5CF6';
    if (provider === 'aws' || type === 'asg' || type === 'aws_account') containerColor = '#FF9900';
    else if (provider === 'azure' || type === 'resource_group' || type === 'azure_subscription') containerColor = '#0078D4';
    else if (provider === 'gcp') containerColor = '#4285F4';
    else if (provider === 'oci' || type === 'compartment') containerColor = '#F80000';
    else if (type === 'ai_stack') containerColor = '#A855F7';
    else if (type === 'on_premise') containerColor = '#64748B';
    else if (type === 'cluster') containerColor = '#326CE5';
    else if (type === 'app') containerColor = '#8B5CF6';
    else if (type === 'generic') containerColor = '#14B8A6';

    const newContainer: DiagramContainer = {
      id: `c_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: containerName,
      provider: type === 'azure_subscription' ? 'azure' : provider,
      type,
      cidrBlock,
      isPublicSubnet: type === 'subnet' ? ((diagram?.containers || []).filter((c) => c.type === 'subnet').length === 0) : undefined,
      borderStyle: (type === 'aws_account' || type === 'azure_subscription' || type === 'on_premise' || type === 'region') ? 'solid' : 'dashed',
      x: 100 + Math.random() * 50,
      y: 100 + Math.random() * 50,
      width: type === 'region' ? 660 : (type === 'cloud_group' || type === 'aws_account' || type === 'azure_subscription' || type === 'ai_stack') ? 560 : type === 'subnet' ? 440 : 500,
      height: type === 'region' ? 440 : (type === 'cloud_group' || type === 'aws_account' || type === 'azure_subscription' || type === 'ai_stack') ? 380 : type === 'subnet' ? 260 : 320,
      color: containerColor
    };

    setDiagram((prev) => ({
      ...prev,
      containers: [...(prev?.containers || []), newContainer]
    }));
    setSelectedContainerId(newContainer.id);
  };

  const handleGroupByCloud = (targetProvider: CloudProvider | 'all' = 'all') => {
    recordHistory();
    setDiagram((prev) => {
      const providersToGroup: CloudProvider[] =
        targetProvider === 'all'
          ? ['aws', 'azure', 'gcp', 'oci']
          : [targetProvider];

      const cloudNames: Record<string, string> = {
        aws: 'AWS',
        azure: 'Azure',
        gcp: 'GCP',
        oci: 'OCI'
      };
      const brandColors: Record<string, string> = {
        aws: '#FF9900',
        azure: '#0078D4',
        gcp: '#4285F4',
        oci: '#F80000'
      };

      let newContainers = [...prev.containers];
      let groupedCount = 0;

      providersToGroup.forEach((prov, idx) => {
        const cloudNodes = prev.nodes.filter((n) => n.provider === prov);
        const provName = cloudNames[prov] || String(prov).toUpperCase();

        if (cloudNodes.length > 0) {
          groupedCount++;
          let minX = Infinity;
          let minY = Infinity;
          let maxX = -Infinity;
          let maxY = -Infinity;

          cloudNodes.forEach((node) => {
            minX = Math.min(minX, node.x);
            minY = Math.min(minY, node.y);
            maxX = Math.max(maxX, node.x + 96);
            maxY = Math.max(maxY, node.y + 80);
          });

          const padX = 36;
          const padTop = 64;
          const padBottom = 32;

          const cx = Math.max(20, Math.round((minX - padX) / 10) * 10);
          const cy = Math.max(20, Math.round((minY - padTop) / 10) * 10);
          const cw = Math.max(280, Math.round((maxX - minX + padX * 2) / 10) * 10);
          const ch = Math.max(180, Math.round((maxY - minY + padTop + padBottom) / 10) * 10);

          const existingIdx = newContainers.findIndex(
            (c) => c.provider === prov && (c.type === 'cloud_group' || c.name.toLowerCase() === provName.toLowerCase())
          );

          if (existingIdx >= 0) {
            newContainers[existingIdx] = {
              ...newContainers[existingIdx],
              name: provName,
              provider: prov,
              type: 'cloud_group',
              x: cx,
              y: cy,
              width: cw,
              height: ch,
              color: brandColors[prov]
            };
          } else {
            newContainers.push({
              id: `cloud_group_${prov}_${Date.now()}_${idx}`,
              name: provName,
              provider: prov,
              type: 'cloud_group',
              x: cx,
              y: cy,
              width: cw,
              height: ch,
              color: brandColors[prov],
              borderStyle: 'solid'
            });
          }
        }
      });

      // If single provider requested or empty canvas, add default container
      if (groupedCount === 0 || targetProvider !== 'all') {
        const cloudsToAdd = targetProvider === 'all'
          ? (prev.nodes.length === 0 ? ['aws', 'azure', 'gcp', 'oci'] as CloudProvider[] : [])
          : [targetProvider];

        cloudsToAdd.forEach((prov, idx) => {
          const provName = cloudNames[prov] || String(prov).toUpperCase();
          const existingIdx = newContainers.findIndex(
            (c) => c.provider === prov && (c.type === 'cloud_group' || c.name.toLowerCase() === provName.toLowerCase())
          );

          if (existingIdx < 0) {
            const col = idx % 2;
            const row = Math.floor(idx / 2);
            newContainers.push({
              id: `cloud_group_${prov}_${Date.now()}_${idx}`,
              name: provName,
              provider: prov,
              type: 'cloud_group',
              x: 80 + col * 480,
              y: 80 + row * 340,
              width: 440,
              height: 300,
              color: brandColors[prov],
              borderStyle: 'solid'
            });
          }
        });
      }

      return {
        ...prev,
        containers: newContainers
      };
    });
  };

  // Initial Auth Loading Splash Screen
  if (authLoading) {
    return (
      <div
        id="auth-loading-screen"
        className={`flex flex-col items-center justify-center h-screen w-screen font-sans select-none transition-colors ${
          theme === 'light' ? 'bg-[#F4FBFC] text-[#03045E]' : 'bg-[#02081F] text-slate-100'
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          <MultiCloudLogo className="w-16 h-16 shadow-2xl shadow-indigo-500/30 animate-pulse" />
          <div className="text-center">
            <h1 className="text-base font-bold tracking-tight">MultiCloud Canvas Studio</h1>
            <p className="text-xs text-slate-400 mt-0.5">Carregando ambiente de trabalho...</p>
          </div>
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mt-1" />
        </div>
      </div>
    );
  }

  // FIRST SCREEN: Authentication screen required before entering the main MultiCloud Canvas Studio screen
  if (!currentUser && !isGuestMode) {
    return (
      <>
        <AuthScreen
          onContinueAsGuest={() => setIsGuestMode(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenChangelog={() => setIsChangelogModalOpen(true)}
          onOpenDocumentation={() => setIsDocumentationModalOpen(true)}
        />
        <ChangelogModal
          isOpen={isChangelogModalOpen}
          onClose={() => setIsChangelogModalOpen(false)}
          theme={theme}
        />
        <DocumentationModal
          isOpen={isDocumentationModalOpen}
          onClose={() => setIsDocumentationModalOpen(false)}
          theme={theme}
          onOpenChangelog={() => {
            setIsDocumentationModalOpen(false);
            setIsChangelogModalOpen(true);
          }}
          onOpenFeedback={() => {
            setIsDocumentationModalOpen(false);
            setIsFeedbackModalOpen(true);
          }}
        />
      </>
    );
  }

  return (
    <div className={`flex flex-col h-screen w-screen font-sans overflow-hidden select-none transition-colors ${
      theme === 'light' ? 'bg-[#F4FBFC] text-slate-900' : 'bg-[#02081F] text-slate-100'
    }`}>
      {/* Full-Screen Presentation Mode View */}
      {isPresentationMode ? (
        <div
          id="presentation-mode-fullscreen"
          className={`fixed inset-0 w-screen h-screen z-50 flex flex-col overflow-hidden select-none ${
            theme === 'light' ? 'bg-[#F4FBFC] text-slate-900' : 'bg-[#02081F] text-slate-100'
          }`}
        >
          <Canvas
            diagram={diagram}
            setDiagram={setDiagram}
            selectedNodeId={selectedNodeId}
            setSelectedNodeId={setSelectedNodeId}
            selectedContainerId={selectedContainerId}
            setSelectedContainerId={setSelectedContainerId}
            selectedLinkId={selectedLinkId}
            setSelectedLinkId={setSelectedLinkId}
            isConnectingMode={false}
            setIsConnectingMode={() => {}}
            zoom={zoom}
            setZoom={setZoom}
            canvasRef={canvasRef}
            onRecordHistory={recordHistory}
            onOpenMetadataModal={() => setIsMetadataModalOpen(true)}
            theme={theme}
            isPresentationMode={true}
            onExitPresentation={handleExitPresentation}
            isFullscreen={isFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
            onToggleTheme={toggleTheme}
            onFitToScreen={() => fitDiagramToContainer(diagram, canvasRef.current, setZoom)}
            onEnterPresentationMode={handleEnterPresentation}
          />
        </div>
      ) : (
        <>
          {/* Top Navbar */}
          <Navbar
            diagram={diagram}
            setDiagram={setDiagram}
            canvasRef={canvasRef}
            onOpenAiModal={() => setAiModalMode('generator')}
            onOpenAuditModal={() => setAiModalMode('audit')}
            onOpenSecurityLinter={() => setIsSecurityLinterOpen(true)}
            onOpenTerraformModal={() => setIsTerraformModalOpen(true)}
            onOpenCostModal={() => setIsCostModalOpen(true)}
            onOpenTemplateModal={() => setIsTemplateModalOpen(true)}
            onOpenMetadataModal={() => setIsMetadataModalOpen(true)}
            onOpenProfilePreferencesModal={() => setIsProfilePreferencesModalOpen(true)}
            onNewArchitecture={handleNewArchitecture}
            onSaveArchitecture={handleSaveArchitecture}
            onOpenSavedModal={() => setIsSavedModalOpen(true)}
            onOpenAuthModal={() => {
              setAuthModalMode('login');
              setIsAuthModalOpen(true);
            }}
            isGuestMode={isGuestMode && !currentUser}
            onReturnToAuth={() => setIsGuestMode(false)}
            zoom={zoom}
            setZoom={setZoom}
            onResetZoom={() => setZoom(1.0)}
            canUndo={historyStack.length > 0}
            canRedo={redoStack.length > 0}
            onUndo={handleUndo}
            onRedo={handleRedo}
            onClearCanvas={handleClearCanvas}
            onImportJson={handleImportJson}
            googleUser={googleUser}
            onOpenGoogleDriveModal={() => setIsGoogleDriveModalOpen(true)}
            onOpenGmailModal={() => setIsGmailModalOpen(true)}
            onOpenFeedbackModal={() => setIsFeedbackModalOpen(true)}
            onOpenChangelogModal={() => setIsChangelogModalOpen(true)}
            onOpenDocumentationModal={() => setIsDocumentationModalOpen(true)}
            lastAutoSavedAt={lastAutoSavedAt}
            theme={theme}
            onToggleTheme={toggleTheme}
            onEnterPresentationMode={handleEnterPresentation}
            onOpenProposalModal={handleOpenProposalModal}
          />

          {/* Main Workspace Body */}
          <div className="flex flex-1 relative overflow-hidden">
            {/* Left Sidebar Icon Palette */}
            <SidebarCatalog
              containers={diagram?.containers || []}
              onAddNode={handleAddNode}
              onAddContainer={handleAddContainer}
              onGroupByCloud={handleGroupByCloud}
              isConnectingMode={isConnectingMode}
              setIsConnectingMode={setIsConnectingMode}
              theme={theme}
              isCollapsed={leftSidebarCollapsed}
              onToggleCollapse={handleToggleLeftSidebar}
            />

            {/* Center Diagramming Canvas */}
            <Canvas
              diagram={diagram}
              setDiagram={setDiagram}
              selectedNodeId={selectedNodeId}
              setSelectedNodeId={setSelectedNodeId}
              selectedContainerId={selectedContainerId}
              setSelectedContainerId={setSelectedContainerId}
              selectedLinkId={selectedLinkId}
              setSelectedLinkId={setSelectedLinkId}
              isConnectingMode={isConnectingMode}
              setIsConnectingMode={setIsConnectingMode}
              zoom={zoom}
              setZoom={setZoom}
              canvasRef={canvasRef}
              onRecordHistory={recordHistory}
              onOpenMetadataModal={() => setIsMetadataModalOpen(true)}
              theme={theme}
              isPresentationMode={false}
              onExitPresentation={handleExitPresentation}
              isFullscreen={isFullscreen}
              onToggleFullscreen={handleToggleFullscreen}
              onToggleTheme={toggleTheme}
              onFitToScreen={() => fitDiagramToContainer(diagram, canvasRef.current, setZoom)}
              onEnterPresentationMode={handleEnterPresentation}
              canUndo={historyStack.length > 0}
              canRedo={redoStack.length > 0}
              onUndo={handleUndo}
              onRedo={handleRedo}
            />

            {/* Right Property Inspector */}
            <PropertyPanel
              diagram={diagram}
              setDiagram={setDiagram}
              selectedNodeId={selectedNodeId}
              selectedContainerId={selectedContainerId}
              selectedLinkId={selectedLinkId}
              setSelectedNodeId={setSelectedNodeId}
              setSelectedContainerId={setSelectedContainerId}
              setSelectedLinkId={setSelectedLinkId}
              onRecordHistory={recordHistory}
              theme={theme}
              isCollapsed={rightSidebarCollapsed}
              onToggleCollapse={handleToggleRightSidebar}
            />
          </div>

          {/* Version Tabs Bar (Bottom of screen above footer) */}
          <VersionTabsBar
            versions={versions}
            activeVersionId={activeVersionId}
            onSelectVersion={handleSelectVersion}
            onAddVersion={handleAddVersion}
            onDuplicateVersion={handleDuplicateVersion}
            onDeleteVersion={handleDeleteVersion}
            onOpenChangelog={() => setIsChangelogModalOpen(true)}
            theme={theme}
          />

          {/* Application Footer */}
          <footer className={`h-8 border-t px-4 flex items-center justify-between text-[11px] select-none z-10 shrink-0 ${
            theme === 'dark' ? 'bg-[#010618] border-[#023E8A]/40 text-slate-400' : 'bg-white/95 border-[#ADE8F4] text-[#023E8A]'
          }`}>
            <div className="flex items-center space-x-2 truncate">
              <span className="text-slate-500 hidden md:inline">Consultoria:</span>
              <a
                href="https://www.edsinfobr.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-amber-500 hover:text-amber-400 dark:text-amber-400 dark:hover:text-amber-300 hover:underline transition-colors flex items-center space-x-1"
                title="EdsInfoBR - Consultoria End-to-End em Nuvem & Inteligência Artificial"
              >
                <span>EdsInfoBR - Consultoria End-to-End em Nuvem & Inteligência Artificial</span>
              </a>
            </div>
            <div className="flex items-center space-x-3 text-[11px] shrink-0">
              <button
                id="footer-btn-documentation"
                onClick={() => setIsDocumentationModalOpen(true)}
                className="font-semibold text-[#0077B6] hover:text-[#0096C7] dark:text-[#48CAE4] dark:hover:text-[#ADE8F4] hover:underline transition-colors flex items-center space-x-1"
                title="Visualizar Manual e Documentação do Produto (DOCUMENTACAO.md)"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Documentação</span>
              </button>
              <span className="text-slate-500 opacity-50 hidden sm:inline">•</span>
              <button
                id="footer-btn-changelog"
                onClick={() => setIsChangelogModalOpen(true)}
                className="font-semibold text-[#0096C7] hover:text-[#48CAE4] dark:text-[#48CAE4] dark:hover:text-[#ADE8F4] hover:underline transition-colors flex items-center space-x-1"
                title={`Visualizar Registro de Mudanças das Versões (${LATEST_APP_VERSION})`}
              >
                <span>Changelog ({LATEST_APP_VERSION})</span>
              </button>
              <span className="text-slate-500 opacity-50 hidden sm:inline">•</span>
              <button
                id="footer-btn-feedback"
                onClick={() => setIsFeedbackModalOpen(true)}
                className="font-semibold text-pink-500 hover:text-pink-400 hover:underline transition-colors flex items-center space-x-1"
              >
                <span>Feedback & Reportar Erros</span>
              </button>
              <span className="text-slate-500 opacity-50 hidden sm:inline">•</span>
              <a
                href="https://www.youtube.com/@edsinfobr"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-link-youtube"
                className="font-semibold text-red-500 hover:text-red-400 dark:text-red-400 dark:hover:text-red-300 hover:underline transition-colors flex items-center space-x-1"
                title="Canal no YouTube (@edsinfobr)"
              >
                <Youtube className="w-3.5 h-3.5 text-red-500" />
                <span>YouTube</span>
              </a>
              <span className="text-slate-500 opacity-50 hidden sm:inline">•</span>
              <span className="text-slate-500 flex items-center space-x-1">
                <span>Criado e mantido por</span>
                <a
                  href="https://www.linkedin.com/in/edsinfobr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#0077B6] hover:text-[#0096C7] dark:text-[#48CAE4] dark:hover:text-[#ADE8F4] hover:underline transition-colors"
                  title="Perfil no LinkedIn (edsinfobr)"
                >
                  @edsinfobr
                </a>
              </span>
              <span className="text-slate-500 opacity-50 hidden sm:inline">•</span>
              <span className="text-slate-500 hidden sm:inline">© 2026 MultiCloud Canvas Studio</span>
            </div>
          </footer>
        </>
      )}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#12141A] border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2.5 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      {aiModalMode && (
        <AiPromptModal
          mode={aiModalMode}
          diagram={diagram}
          setDiagram={setDiagram}
          onClose={() => setAiModalMode(null)}
          onRecordHistory={recordHistory}
          theme={theme}
        />
      )}

      {isTerraformModalOpen && (
        <TerraformModal
          diagram={diagram}
          onClose={() => setIsTerraformModalOpen(false)}
          theme={theme}
        />
      )}

      {isCostModalOpen && (
        <CostModal
          diagram={diagram}
          setDiagram={setDiagram}
          onClose={() => setIsCostModalOpen(false)}
          theme={theme}
          onExportPdf={async (rate?: number) => {
            if (canvasRef.current) {
              await exportArchitecturePdf(canvasRef.current, diagram, rate);
            }
          }}
        />
      )}

      {isTemplateModalOpen && (
        <TemplateModal
          setDiagram={setDiagram}
          onClose={() => setIsTemplateModalOpen(false)}
          onRecordHistory={recordHistory}
          theme={theme}
        />
      )}

      {isSavedModalOpen && (
        <SavedArchitecturesModal
          onLoadDiagram={handleLoadSavedDiagram}
          onNewDiagram={handleNewArchitecture}
          onClose={() => setIsSavedModalOpen(false)}
          onOpenAuthModal={() => {
            setAuthModalMode('signup');
            setIsAuthModalOpen(true);
          }}
          theme={theme}
        />
      )}

      <GoogleDriveModal
        isOpen={isGoogleDriveModalOpen}
        onClose={() => setIsGoogleDriveModalOpen(false)}
        diagram={diagram}
        setDiagram={setDiagram}
        canvasRef={canvasRef}
        googleUser={googleUser}
        setGoogleUser={setGoogleUser}
        theme={theme}
      />

      <GmailModal
        isOpen={isGmailModalOpen}
        onClose={() => setIsGmailModalOpen(false)}
        diagram={diagram}
        googleUser={googleUser}
        onGoogleUserChange={setGoogleUser}
        theme={theme}
      />

      <MetadataModal
        isOpen={isMetadataModalOpen}
        onClose={() => setIsMetadataModalOpen(false)}
        diagram={diagram}
        setDiagram={setDiagram}
        onRecordHistory={recordHistory}
        theme={theme}
        showToast={showToast}
      />

      <ProfilePreferencesModal
        isOpen={isProfilePreferencesModalOpen}
        onClose={() => setIsProfilePreferencesModalOpen(false)}
        currentTheme={theme}
        theme={theme}
        onSetTheme={(newTheme) => {
          setIsManualThemeOverride(true);
          setTheme(newTheme);
        }}
        onThemeChange={(newTheme) => {
          setIsManualThemeOverride(true);
          setTheme(newTheme);
        }}
        leftSidebarCollapsed={leftSidebarCollapsed}
        setLeftSidebarCollapsed={setLeftSidebarCollapsed}
        rightSidebarCollapsed={rightSidebarCollapsed}
        setRightSidebarCollapsed={setRightSidebarCollapsed}
        onRecordHistory={recordHistory}
        showToast={showToast}
        diagram={diagram}
        setDiagram={setDiagram}
      />

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        diagram={diagram}
        theme={theme}
      />

      <CloudSecurityLinterModal
        isOpen={isSecurityLinterOpen}
        onClose={() => setIsSecurityLinterOpen(false)}
        diagram={diagram}
        onSelectResource={(resId) => {
          setSelectedNodeId(resId);
          setSelectedContainerId(null);
          setSelectedLinkId(null);
        }}
        theme={theme}
      />

      <ProposalModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        diagram={diagram}
        canvasRef={canvasRef}
        initialType={proposalInitialType}
        theme={theme}
        showToast={showToast}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        theme={theme}
      />

      <ChangelogModal
        isOpen={isChangelogModalOpen}
        onClose={() => setIsChangelogModalOpen(false)}
        theme={theme}
      />

      <DocumentationModal
        isOpen={isDocumentationModalOpen}
        onClose={() => setIsDocumentationModalOpen(false)}
        theme={theme}
        onOpenChangelog={() => {
          setIsDocumentationModalOpen(false);
          setIsChangelogModalOpen(true);
        }}
        onOpenFeedback={() => {
          setIsDocumentationModalOpen(false);
          setIsFeedbackModalOpen(true);
        }}
      />
    </div>
  );
}

