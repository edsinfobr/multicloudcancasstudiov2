import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, Box, Boxes, Layers, ArrowRightLeft, Shield, Server, Database, Cpu, Cloud, Globe, Sparkles, Network, ChevronDown, ChevronLeft, ChevronRight, AppWindow, FolderKanban, Zap } from 'lucide-react';
import { CLOUD_ICONS } from '../data/cloudIcons';
import { getCloudLogoSvg } from '../data/cloudLogos';
import { CloudProvider, ServiceCategory, CloudIconDefinition, DiagramContainer, ContainerType } from '../types';

interface ContainerOptionItem {
  id: string;
  btnId: string;
  type: ContainerType;
  provider: CloudProvider;
  label: string;
  badge: string;
  badgeColor: string;
  category?: 'region' | 'scope' | 'subnet' | 'infra';
  description: string;
  icon: React.ReactNode;
}

const CONTAINER_OPTIONS: ContainerOptionItem[] = [
  {
    id: 'aws_region',
    btnId: 'btn-container-awsregion',
    type: 'region',
    provider: 'aws',
    category: 'region',
    label: 'AWS Region',
    badge: 'AWS Region',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    description: 'Região AWS (ex: us-east-1, sa-east-1)',
    icon: <Globe className="w-3.5 h-3.5 text-amber-500 shrink-0" />
  },
  {
    id: 'azure_region',
    btnId: 'btn-container-azureregion',
    type: 'region',
    provider: 'azure',
    category: 'region',
    label: 'Azure Region',
    badge: 'Azure Region',
    badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    description: 'Região Azure (ex: East US, Brazil South)',
    icon: <Globe className="w-3.5 h-3.5 text-sky-500 shrink-0" />
  },
  {
    id: 'gcp_region',
    btnId: 'btn-container-gcpregion',
    type: 'region',
    provider: 'gcp',
    category: 'region',
    label: 'GCP Region',
    badge: 'GCP Region',
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    description: 'Região GCP (ex: us-central1, southamerica-east1)',
    icon: <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
  },
  {
    id: 'oci_region',
    btnId: 'btn-container-ociregion',
    type: 'region',
    provider: 'oci',
    category: 'region',
    label: 'OCI Region',
    badge: 'OCI Region',
    badgeColor: 'text-red-400 bg-red-500/10 border-red-500/20',
    description: 'Região OCI (ex: us-ashburn-1, sa-saopaulo-1)',
    icon: <Globe className="w-3.5 h-3.5 text-red-500 shrink-0" />
  },
  {
    id: 'compartment',
    btnId: 'btn-container-compartment',
    type: 'compartment',
    provider: 'oci',
    category: 'scope',
    label: 'Compartment',
    badge: 'OCI',
    badgeColor: 'text-red-400 bg-red-500/10 border-red-500/20',
    description: 'Compartimento OCI',
    icon: <Network className="w-3.5 h-3.5 text-red-500 shrink-0" />
  },
  {
    id: 'on_premise',
    btnId: 'btn-container-onpremise',
    type: 'on_premise',
    provider: 'generic',
    category: 'infra',
    label: 'On-Premise',
    badge: 'Datacenter',
    badgeColor: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
    description: 'Rede Local / Datacenter',
    icon: <Server className="w-3.5 h-3.5 text-slate-400 shrink-0" />
  },
  {
    id: 'cluster',
    btnId: 'btn-container-cluster',
    type: 'cluster',
    provider: 'generic',
    category: 'infra',
    label: 'Cluster',
    badge: 'K8s / ECS',
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    description: 'Kubernetes / Container Cluster',
    icon: <Boxes className="w-3.5 h-3.5 text-blue-500 shrink-0" />
  },
  {
    id: 'ai_stack',
    btnId: 'btn-container-aistack',
    type: 'ai_stack',
    provider: 'generic',
    category: 'infra',
    label: 'AI / GenAI Stack',
    badge: 'LLM & Agents',
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    description: 'Agrupamento para Modelos de IA, Agentes e Bancos Vetoriais',
    icon: <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
  },
  {
    id: 'app',
    btnId: 'btn-container-app',
    type: 'app',
    provider: 'generic',
    category: 'infra',
    label: 'App',
    badge: 'Aplicação',
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    description: 'Fronteira lógica de aplicação',
    icon: <AppWindow className="w-3.5 h-3.5 text-purple-500 shrink-0" />
  },
  {
    id: 'generic',
    btnId: 'btn-container-generico',
    type: 'generic',
    provider: 'generic',
    category: 'infra',
    label: 'Generico',
    badge: 'Genérico',
    badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    description: 'Container genérico livre',
    icon: <Box className="w-3.5 h-3.5 text-teal-500 shrink-0" />
  },
  {
    id: 'asg',
    btnId: 'btn-container-asg',
    type: 'asg',
    provider: 'aws',
    category: 'scope',
    label: 'Auto Scaling Group',
    badge: 'AWS ASG',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    description: 'Escalonamento automático AWS',
    icon: <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
  },
  {
    id: 'aws_account',
    btnId: 'btn-container-awsaccount',
    type: 'aws_account',
    provider: 'aws',
    category: 'scope',
    label: 'AWS Account',
    badge: 'Conta AWS',
    badgeColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    description: 'Fronteira de conta AWS',
    icon: <Shield className="w-3.5 h-3.5 text-orange-500 shrink-0" />
  },
  {
    id: 'resource_group',
    btnId: 'btn-container-azurerg',
    type: 'resource_group',
    provider: 'azure',
    category: 'scope',
    label: 'Azure Resource Group',
    badge: 'Azure',
    badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    description: 'Grupo de recursos Azure',
    icon: <FolderKanban className="w-3.5 h-3.5 text-sky-500 shrink-0" />
  },
  {
    id: 'azure_subscription',
    btnId: 'btn-container-azuresubscription',
    type: 'azure_subscription',
    provider: 'azure',
    category: 'scope',
    label: 'Azure Subscription',
    badge: 'Azure',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    description: 'Fronteira de assinatura Azure',
    icon: <Shield className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
  },
  {
    id: 'azure_subnet',
    btnId: 'btn-container-azuresubnet',
    type: 'subnet',
    provider: 'azure',
    category: 'subnet',
    label: 'Azure Subnet',
    badge: 'Azure VNet',
    badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    description: 'Sub-rede (Subnet) da Azure Virtual Network',
    icon: <Box className="w-3.5 h-3.5 text-sky-500 shrink-0" />
  },
  {
    id: 'oci_subnet',
    btnId: 'btn-container-ocisubnet',
    type: 'subnet',
    provider: 'oci',
    category: 'subnet',
    label: 'OCI Subnet',
    badge: 'OCI VCN',
    badgeColor: 'text-red-400 bg-red-500/10 border-red-500/20',
    description: 'Sub-rede (Subnet) da Oracle Cloud VCN',
    icon: <Box className="w-3.5 h-3.5 text-red-500 shrink-0" />
  },
  {
    id: 'gcp_subnet',
    btnId: 'btn-container-gcpsubnet',
    type: 'subnet',
    provider: 'gcp',
    category: 'subnet',
    label: 'GCP Subnet',
    badge: 'GCP VPC',
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    description: 'Sub-rede (Subnetwork) da Google Cloud VPC',
    icon: <Box className="w-3.5 h-3.5 text-blue-500 shrink-0" />
  },
  {
    id: 'aws_subnet',
    btnId: 'btn-container-awssubnet',
    type: 'subnet',
    provider: 'aws',
    category: 'subnet',
    label: 'AWS Subnet',
    badge: 'AWS VPC',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    description: 'Sub-rede (Subnet) da Amazon VPC',
    icon: <Box className="w-3.5 h-3.5 text-amber-500 shrink-0" />
  }
];

interface SidebarCatalogProps {
  containers?: DiagramContainer[];
  onAddNode: (icon: CloudIconDefinition) => void;
  onAddContainer: (type: ContainerType, provider: CloudProvider, customCidr?: string) => void;
  onGroupByCloud?: (provider?: CloudProvider | 'all') => void;
  isConnectingMode: boolean;
  setIsConnectingMode: (active: boolean) => void;
  theme?: 'dark' | 'light';
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

export const SidebarCatalog: React.FC<SidebarCatalogProps> = ({
  containers = [],
  onAddNode,
  onAddContainer,
  onGroupByCloud,
  isConnectingMode,
  setIsConnectingMode,
  theme = 'dark',
  isCollapsed: controlledIsCollapsed,
  onToggleCollapse
}) => {
  const isLight = theme === 'light';
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = controlledIsCollapsed !== undefined ? controlledIsCollapsed : internalCollapsed;
  const setIsCollapsed = (collapsed: boolean) => {
    setInternalCollapsed(collapsed);
    onToggleCollapse?.(collapsed);
  };
  const [selectedProvider, setSelectedProvider] = useState<CloudProvider | 'ai' | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
  const [isSubnetDropdownOpen, setIsSubnetDropdownOpen] = useState(false);
  const [isContainerListDropdownOpen, setIsContainerListDropdownOpen] = useState(false);
  const [selectedContainerOptionId, setSelectedContainerOptionId] = useState<string>('aws_region');
  const [draggingIconKey, setDraggingIconKey] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const subnetDropdownRef = useRef<HTMLDivElement>(null);
  const containerDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkCategoryScroll = () => {
    if (categoryScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
    }
  };

  useEffect(() => {
    checkCategoryScroll();
    const el = categoryScrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkCategoryScroll);
      window.addEventListener('resize', checkCategoryScroll);
      return () => {
        el.removeEventListener('scroll', checkCategoryScroll);
        window.removeEventListener('resize', checkCategoryScroll);
      };
    }
  }, []);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = 140;
      categoryScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkCategoryScroll, 300);
    }
  };

  // Quick search shortcut listeners (/ or Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement as HTMLElement | null;
      const isInputActive =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.isContentEditable);

      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsCollapsed(false);
        setTimeout(() => {
          searchInputRef.current?.focus();
          searchInputRef.current?.select();
        }, 60);
        return;
      }

      // '/' shortcut to quick-focus search when not inside an input field
      if (e.key === '/' && !isInputActive) {
        e.preventDefault();
        setIsCollapsed(false);
        setTimeout(() => {
          searchInputRef.current?.focus();
          searchInputRef.current?.select();
        }, 60);
        return;
      }

      // Escape inside search input clears and unfocuses
      if (e.key === 'Escape' && activeEl === searchInputRef.current) {
        searchInputRef.current?.blur();
        if (searchTerm) setSearchTerm('');
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [searchTerm]);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, icon: CloudIconDefinition) => {
    e.dataTransfer.setData('application/json', JSON.stringify(icon));
    e.dataTransfer.effectAllowed = 'copy';
    setDraggingIconKey(icon.key);

    // Create custom ghost drag preview element
    const ghost = document.createElement('div');
    ghost.style.position = 'fixed';
    ghost.style.top = '-1000px';
    ghost.style.left = '-1000px';
    ghost.style.pointerEvents = 'none';
    ghost.style.zIndex = '99999';
    ghost.className = `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl border-2 border-dashed shadow-2xl backdrop-blur-md opacity-90 ${
      isLight 
        ? 'bg-white/95 border-blue-500 text-slate-900 shadow-blue-500/30' 
        : 'bg-[#12141A]/95 border-blue-400 text-slate-100 shadow-blue-500/40'
    }`;
    
    ghost.innerHTML = `
      <div style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
        ${icon.svg}
      </div>
      <div style="display: flex; flex-direction: column;">
        <span style="font-size: 12px; font-weight: 800; color: ${isLight ? '#0f172a' : '#f8fafc'};">${icon.name}</span>
        <span style="font-size: 9px; font-weight: 800; text-transform: uppercase; color: ${icon.brandColor || '#3b82f6'};">${icon.provider}</span>
      </div>
    `;
    
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 45, 25);

    setTimeout(() => {
      if (ghost.parentNode) {
        ghost.parentNode.removeChild(ghost);
      }
    }, 0);
  };

  const handleDragEnd = () => {
    setDraggingIconKey(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNetworkDropdownOpen(false);
      }
      if (subnetDropdownRef.current && !subnetDropdownRef.current.contains(event.target as Node)) {
        setIsSubnetDropdownOpen(false);
      }
      if (containerDropdownRef.current && !containerDropdownRef.current.contains(event.target as Node)) {
        setIsContainerListDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getVpcButtonText = () => {
    switch (selectedProvider) {
      case 'aws': return 'AWS Network';
      case 'azure': return 'Azure Network';
      case 'gcp': return 'GCP Network';
      case 'oci': return 'OCI Network';
      default: return 'Network';
    }
  };

  const getSubnetButtonText = () => {
    switch (selectedProvider) {
      case 'aws': return 'AWS Subnet';
      case 'azure': return 'Azure Subnet';
      case 'gcp': return 'GCP Subnet';
      case 'oci': return 'OCI Subnet';
      default: return 'Subnet';
    }
  };

  const filteredIcons = CLOUD_ICONS.filter((icon) => {
    let matchesProvider = false;
    if (selectedProvider === 'all') {
      matchesProvider = true;
    } else if (selectedProvider === 'ai') {
      matchesProvider = icon.category === 'ai' || icon.key.startsWith('ai_');
    } else {
      matchesProvider = icon.provider === selectedProvider || icon.provider === 'generic';
    }

    const matchesCategory = selectedCategory === 'all' || icon.category === selectedCategory;
    const matchesSearch = icon.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (icon.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          icon.key.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesProvider && matchesCategory && matchesSearch;
  });

  const isAiView = selectedCategory === 'ai' || selectedProvider === 'ai';

  const groupedAiIcons = useMemo(() => {
    if (!isAiView) return null;

    const groupOrder = [
      'Modelos Fundacionais & LLMs',
      'Aceleração & Inferência',
      'Bancos Vetoriais & RAG',
      'Agentes & Orquestração',
      'Pesquisa & Plataformas',
      'Multimodal & Geração',
      'Nuvem & Outros Serviços de IA',
    ];

    const map: Record<string, CloudIconDefinition[]> = {};
    groupOrder.forEach((g) => { map[g] = []; });

    filteredIcons.forEach((icon) => {
      let g = icon.aiGroup;
      if (!g) {
        if (icon.provider !== 'generic') {
          g = 'Nuvem & Outros Serviços de IA';
        } else {
          g = 'Modelos Fundacionais & LLMs';
        }
      }
      if (!map[g]) map[g] = [];
      map[g].push(icon);
    });

    return groupOrder
      .map((name) => ({ name, icons: map[name] || [] }))
      .filter((grp) => grp.icons.length > 0);
  }, [isAiView, filteredIcons]);

  if (isCollapsed) {
    return (
      <aside
        id="sidebar-catalog-collapsed"
        className={`w-12 border-r flex flex-col items-center py-4 select-none transition-all duration-200 z-20 ${
          isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#12141A] border-white/10 text-slate-300'
        }`}
      >
        <button
          onClick={() => setIsCollapsed(false)}
          className={`p-2 rounded-xl transition-all shadow-md border ${
            isLight
              ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-300'
              : 'bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border-blue-500/30'
          }`}
          title="Expandir Canvas Tools & Catálogo (clique para abrir para a direita)"
        >
          <ChevronRight className="w-5 h-5 text-blue-500" />
        </button>

        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          <Box className={`w-4 h-4 ${isLight ? 'text-slate-600' : 'text-slate-400'}`} />
          <span
            className={`text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${
              isLight ? 'text-slate-800' : 'text-slate-400'
            }`}
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Canvas Tools & Catálogo
          </span>
        </div>
      </aside>
    );
  }

  return (
    <aside id="sidebar-catalog" className={`w-80 border-r flex flex-col h-full z-20 shadow-xl select-none transition-colors ${
      isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-[#12141A] border-white/10 text-slate-300'
    }`}>
      {/* Quick Action Tools: Containers & Connector */}
      <div className={`p-3 border-b space-y-2 ${
        isLight ? 'border-slate-200 bg-slate-100/70' : 'border-white/10 bg-black/20'
      }`}>
        <div className="flex items-center justify-between px-1">
          <span className={`text-[10px] font-bold uppercase tracking-wider block ${
            isLight ? 'text-slate-900' : 'text-slate-500'
          }`}>
            Canvas Tools & Boundaries
          </span>
          <button
            onClick={() => setIsCollapsed(true)}
            className={`p-1.5 rounded-lg border transition-all ${
              isLight
                ? 'hover:bg-slate-200 text-slate-800 border-slate-300'
                : 'hover:bg-white/10 text-slate-300 border-white/10'
            }`}
            title="Recolher Canvas Tools para a esquerda"
          >
            <ChevronLeft className="w-4 h-4 text-blue-500" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            id="btn-toggle-connector"
            onClick={() => setIsConnectingMode(!isConnectingMode)}
            className={`flex items-center justify-center space-x-1.5 px-3 py-2 rounded-md text-xs font-semibold border transition-all ${
              isConnectingMode
                ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30'
                : isLight
                ? 'bg-white border-slate-300 hover:bg-slate-50 text-slate-900 font-bold'
                : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-amber-500" />
            <span>{isConnectingMode ? 'Connecting Mode' : 'Connect Nodes'}</span>
          </button>

          {/* VPC / VNet / VCN Boundary Selector Button with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              id="btn-add-vpc"
              title="Network"
              onClick={() => {
                if (selectedProvider === 'all' || selectedProvider === 'generic') {
                  setIsNetworkDropdownOpen(!isNetworkDropdownOpen);
                } else {
                  onAddContainer('vpc', selectedProvider);
                }
              }}
              className={`w-full flex items-center justify-between border px-2.5 py-2 rounded-md text-xs font-semibold transition-all ${
                isLight
                  ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-900'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-1.5 truncate">
                <Layers className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span className="truncate">{getVpcButtonText()}</span>
              </div>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-150 shrink-0 ${
                  isLight ? 'text-slate-700' : 'text-slate-400'
                } ${isNetworkDropdownOpen ? 'rotate-180' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsNetworkDropdownOpen(!isNetworkDropdownOpen);
                }}
              />
            </button>

            {/* Network Provider Dropdown Popover */}
            {isNetworkDropdownOpen && (
              <div className={`absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-2xl z-50 py-1 divide-y ${
                isLight ? 'bg-white border-slate-300 divide-slate-200' : 'bg-[#1A1D24] border-white/15 divide-white/5'
              }`}>
                <div className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${
                  isLight ? 'text-slate-800' : 'text-slate-400'
                }`}>
                  Selecione a Rede (Network Boundary)
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      onAddContainer('vpc', 'aws');
                      setIsNetworkDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between text-xs transition-colors ${
                      isLight ? 'hover:bg-slate-100 text-slate-900' : 'hover:bg-white/10 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                      <span className={`font-semibold ${isLight ? 'text-amber-950' : 'text-amber-300'}`}>AWS VPC</span>
                    </div>
                    <span className={`text-[10px] ${isLight ? 'text-slate-600 font-medium' : 'text-slate-500'}`}>Virtual Private Cloud</span>
                  </button>

                  <button
                    onClick={() => {
                      onAddContainer('vpc', 'azure');
                      setIsNetworkDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between text-xs transition-colors ${
                      isLight ? 'hover:bg-slate-100 text-slate-900' : 'hover:bg-white/10 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-sky-500 inline-block"></span>
                      <span className={`font-semibold ${isLight ? 'text-sky-950' : 'text-sky-300'}`}>Azure VNet</span>
                    </div>
                    <span className={`text-[10px] ${isLight ? 'text-slate-600 font-medium' : 'text-slate-500'}`}>Virtual Network</span>
                  </button>

                  <button
                    onClick={() => {
                      onAddContainer('vpc', 'gcp');
                      setIsNetworkDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between text-xs transition-colors ${
                      isLight ? 'hover:bg-slate-100 text-slate-900' : 'hover:bg-white/10 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                      <span className={`font-semibold ${isLight ? 'text-emerald-950' : 'text-emerald-300'}`}>GCP VPC</span>
                    </div>
                    <span className={`text-[10px] ${isLight ? 'text-slate-600 font-medium' : 'text-slate-500'}`}>Virtual Private Cloud</span>
                  </button>

                  <button
                    onClick={() => {
                      onAddContainer('vpc', 'oci');
                      setIsNetworkDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between text-xs transition-colors ${
                      isLight ? 'hover:bg-slate-100 text-slate-900' : 'hover:bg-white/10 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
                      <span className={`font-semibold ${isLight ? 'text-red-950' : 'text-red-300'}`}>OCI VCN</span>
                    </div>
                    <span className={`text-[10px] ${isLight ? 'text-slate-600 font-medium' : 'text-slate-500'}`}>Virtual Cloud Network</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-0.5 relative" ref={subnetDropdownRef}>
          <button
            id="btn-add-subnet"
            onClick={() => {
              if (selectedProvider === 'all' || selectedProvider === 'generic') {
                setIsSubnetDropdownOpen(!isSubnetDropdownOpen);
              } else {
                onAddContainer('subnet', selectedProvider);
              }
            }}
            className={`w-full flex items-center justify-between space-x-1 px-2 py-1.5 rounded-md text-xs font-semibold border transition-all ${
              isLight
                ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-900'
                : 'bg-white/5 hover:bg-white/10 border-white/5 text-slate-300'
            }`}
            title="Adicionar Subnet (AWS, Azure, GCP ou OCI)"
          >
            <div className="flex items-center space-x-1.5 truncate">
              <Box className={`w-3.5 h-3.5 shrink-0 ${
                selectedProvider === 'aws' ? 'text-amber-500' :
                selectedProvider === 'azure' ? 'text-sky-500' :
                selectedProvider === 'gcp' ? 'text-blue-500' :
                selectedProvider === 'oci' ? 'text-red-500' :
                'text-emerald-500'
              }`} />
              <span className="truncate">{getSubnetButtonText()}</span>
            </div>
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-150 shrink-0 ${
                isLight ? 'text-slate-700' : 'text-slate-400'
              } ${isSubnetDropdownOpen ? 'rotate-180' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsSubnetDropdownOpen(!isSubnetDropdownOpen);
              }}
            />
          </button>

          {/* Subnet Provider Options Dropdown Popover */}
          {isSubnetDropdownOpen && (
            <div
              className={`absolute top-full left-0 mt-1 w-64 border rounded-lg shadow-2xl z-50 py-1 divide-y max-h-80 overflow-y-auto ${
                isLight
                  ? 'bg-white border-slate-300 divide-slate-200 text-slate-900'
                  : 'bg-[#1A1D24] border-white/15 divide-white/5 text-slate-200'
              }`}
            >
              <div className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${
                isLight ? 'text-slate-800' : 'text-slate-400'
              }`}>
                Opções de Subnet por Nuvem
              </div>

              <div className="py-1">
                {/* Azure Subnet */}
                <button
                  id="btn-add-subnet-azure"
                  onClick={() => {
                    onAddContainer('subnet', 'azure');
                    setIsSubnetDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between text-xs transition-colors ${
                    isLight ? 'hover:bg-slate-100 text-slate-900' : 'hover:bg-white/10 text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-sky-500 inline-block shrink-0"></span>
                    <span className={`font-semibold ${isLight ? 'text-sky-950' : 'text-sky-300'}`}>Azure Subnet</span>
                  </div>
                  <span className={`text-[10px] ${isLight ? 'text-slate-600 font-medium' : 'text-slate-500'}`}>VNet Subnet</span>
                </button>

                {/* OCI Subnet */}
                <button
                  id="btn-add-subnet-oci"
                  onClick={() => {
                    onAddContainer('subnet', 'oci');
                    setIsSubnetDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between text-xs transition-colors ${
                    isLight ? 'hover:bg-slate-100 text-slate-900' : 'hover:bg-white/10 text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 inline-block shrink-0"></span>
                    <span className={`font-semibold ${isLight ? 'text-red-950' : 'text-red-300'}`}>OCI Subnet</span>
                  </div>
                  <span className={`text-[10px] ${isLight ? 'text-slate-600 font-medium' : 'text-slate-500'}`}>VCN Subnet</span>
                </button>

                {/* GCP Subnet */}
                <button
                  id="btn-add-subnet-gcp"
                  onClick={() => {
                    onAddContainer('subnet', 'gcp');
                    setIsSubnetDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between text-xs transition-colors ${
                    isLight ? 'hover:bg-slate-100 text-slate-900' : 'hover:bg-white/10 text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 inline-block shrink-0"></span>
                    <span className={`font-semibold ${isLight ? 'text-blue-950' : 'text-blue-300'}`}>GCP Subnet</span>
                  </div>
                  <span className={`text-[10px] ${isLight ? 'text-slate-600 font-medium' : 'text-slate-500'}`}>VPC Subnetwork</span>
                </button>

                {/* AWS Subnet */}
                <button
                  id="btn-add-subnet-aws"
                  onClick={() => {
                    onAddContainer('subnet', 'aws');
                    setIsSubnetDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between text-xs transition-colors ${
                    isLight ? 'hover:bg-slate-100 text-slate-900' : 'hover:bg-white/10 text-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 inline-block shrink-0"></span>
                    <span className={`font-semibold ${isLight ? 'text-amber-950' : 'text-amber-300'}`}>AWS Subnet</span>
                  </div>
                  <span className={`text-[10px] ${isLight ? 'text-slate-600 font-medium' : 'text-slate-500'}`}>VPC Subnet</span>
                </button>
              </div>
            </div>
          )}

          {/* Container Scopes / Groups List Dropdown (AWS Region, Azure Region, GCP Region, OCI Region, Compartment, ASG, etc.) */}
          <div className="relative" ref={containerDropdownRef}>
            {(() => {
              const currentContainerOption = (() => {
                if (selectedContainerOptionId) {
                  const found = CONTAINER_OPTIONS.find((o) => o.id === selectedContainerOptionId);
                  if (found) return found;
                }
                if (selectedProvider === 'aws') return CONTAINER_OPTIONS.find((o) => o.id === 'aws_region') || CONTAINER_OPTIONS[0];
                if (selectedProvider === 'azure') return CONTAINER_OPTIONS.find((o) => o.id === 'azure_region') || CONTAINER_OPTIONS[0];
                if (selectedProvider === 'gcp') return CONTAINER_OPTIONS.find((o) => o.id === 'gcp_region') || CONTAINER_OPTIONS[0];
                if (selectedProvider === 'oci') return CONTAINER_OPTIONS.find((o) => o.id === 'oci_region') || CONTAINER_OPTIONS[0];
                return CONTAINER_OPTIONS.find((o) => o.id === 'aws_region') || CONTAINER_OPTIONS[0];
              })();

              const regions = CONTAINER_OPTIONS.filter((o) => o.category === 'region');
              const scopes = CONTAINER_OPTIONS.filter((o) => o.category === 'scope');
              const subnets = CONTAINER_OPTIONS.filter((o) => o.category === 'subnet');
              const infra = CONTAINER_OPTIONS.filter((o) => o.category === 'infra');

              return (
                <>
                  <button
                    id="btn-add-compartment"
                    type="button"
                    onClick={() => setIsContainerListDropdownOpen(!isContainerListDropdownOpen)}
                    className={`w-full flex items-center justify-between space-x-1 px-2 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                      isLight
                        ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-900'
                        : 'bg-white/5 hover:bg-white/10 border-white/5 text-slate-300'
                    }`}
                    title="Groups (Regions, Accounts, Compartments, Clusters)"
                  >
                    <div className="flex items-center space-x-1.5 truncate">
                      <Boxes className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span className="truncate">Groups</span>
                    </div>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-150 shrink-0 ${
                        isLight ? 'text-slate-700' : 'text-slate-400'
                      } ${isContainerListDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown Menu List with all options categorized */}
                  {isContainerListDropdownOpen && (
                    <div
                      className={`absolute top-full right-0 mt-1 w-64 border rounded-lg shadow-2xl z-50 py-1.5 divide-y max-h-80 overflow-y-auto ${
                        isLight
                          ? 'bg-white border-slate-300 divide-slate-200 text-slate-900'
                          : 'bg-[#1A1D24] border-white/15 divide-white/5 text-slate-200'
                      }`}
                    >
                      <div className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                        <span>Regiões & Escopos Cloud</span>
                        <span className="text-[9px] font-mono font-semibold px-1 rounded bg-slate-500/10">{CONTAINER_OPTIONS.length} opções</span>
                      </div>

                      {/* Section 1: Regiões de Nuvem (Cloud Regions) */}
                      <div className="py-1">
                        <div className={`px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider flex items-center justify-between ${
                          isLight ? 'text-blue-900' : 'text-blue-400'
                        }`}>
                          <span>Regiões de Nuvem (Regions)</span>
                          <span className="text-[8px] font-mono bg-blue-500/10 px-1 rounded">4 clouds</span>
                        </div>
                        <div className="space-y-0.5 mt-0.5">
                          {regions.map((opt) => (
                            <button
                              key={opt.id}
                              id={opt.btnId}
                              type="button"
                              onClick={() => {
                                setSelectedContainerOptionId(opt.id);
                                onAddContainer(opt.type, opt.provider);
                                setIsContainerListDropdownOpen(false);
                              }}
                              className={`w-full text-left px-2.5 py-1.5 flex items-center justify-between text-xs transition-colors group ${
                                isLight ? 'hover:bg-slate-100' : 'hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-center space-x-2 truncate pr-1">
                                {opt.icon}
                                <div className="truncate">
                                  <div className="font-semibold text-xs truncate leading-tight group-hover:text-blue-500 transition-colors">
                                    {opt.label}
                                  </div>
                                  <div className={`text-[10px] truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                                    {opt.description}
                                  </div>
                                </div>
                              </div>
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${opt.badgeColor}`}>
                                {opt.badge}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Section 2: Escopos de Nuvem & Contas */}
                      <div className="py-1">
                        <div className={`px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                          isLight ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          Escopos de Nuvem & Grupos
                        </div>
                        <div className="space-y-0.5 mt-0.5">
                          {scopes.map((opt) => (
                            <button
                              key={opt.id}
                              id={opt.btnId}
                              type="button"
                              onClick={() => {
                                setSelectedContainerOptionId(opt.id);
                                onAddContainer(opt.type, opt.provider);
                                setIsContainerListDropdownOpen(false);
                              }}
                              className={`w-full text-left px-2.5 py-1.5 flex items-center justify-between text-xs transition-colors group ${
                                isLight ? 'hover:bg-slate-100' : 'hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-center space-x-2 truncate pr-1">
                                {opt.icon}
                                <div className="truncate">
                                  <div className="font-semibold text-xs truncate leading-tight group-hover:text-blue-500 transition-colors">
                                    {opt.label}
                                  </div>
                                  <div className={`text-[10px] truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                                    {opt.description}
                                  </div>
                                </div>
                              </div>
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${opt.badgeColor}`}>
                                {opt.badge}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Section 3: Sub-redes */}
                      <div className="py-1">
                        <div className={`px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                          isLight ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          Subnets por Nuvem
                        </div>
                        <div className="space-y-0.5 mt-0.5">
                          {subnets.map((opt) => (
                            <button
                              key={opt.id}
                              id={opt.btnId}
                              type="button"
                              onClick={() => {
                                setSelectedContainerOptionId(opt.id);
                                onAddContainer(opt.type, opt.provider);
                                setIsContainerListDropdownOpen(false);
                              }}
                              className={`w-full text-left px-2.5 py-1.5 flex items-center justify-between text-xs transition-colors group ${
                                isLight ? 'hover:bg-slate-100' : 'hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-center space-x-2 truncate pr-1">
                                {opt.icon}
                                <div className="truncate">
                                  <div className="font-semibold text-xs truncate leading-tight group-hover:text-blue-500 transition-colors">
                                    {opt.label}
                                  </div>
                                  <div className={`text-[10px] truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                                    {opt.description}
                                  </div>
                                </div>
                              </div>
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${opt.badgeColor}`}>
                                {opt.badge}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Section 4: Infraestrutura & Aplicações */}
                      <div className="py-1">
                        <div className={`px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                          isLight ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          Infraestrutura & Aplicações
                        </div>
                        <div className="space-y-0.5 mt-0.5">
                          {infra.map((opt) => (
                            <button
                              key={opt.id}
                              id={opt.btnId}
                              type="button"
                              onClick={() => {
                                setSelectedContainerOptionId(opt.id);
                                onAddContainer(opt.type, opt.provider);
                                setIsContainerListDropdownOpen(false);
                              }}
                              className={`w-full text-left px-2.5 py-1.5 flex items-center justify-between text-xs transition-colors group ${
                                isLight ? 'hover:bg-slate-100' : 'hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-center space-x-2 truncate pr-1">
                                {opt.icon}
                                <div className="truncate">
                                  <div className="font-semibold text-xs truncate leading-tight group-hover:text-blue-500 transition-colors">
                                    {opt.label}
                                  </div>
                                  <div className={`text-[10px] truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                                    {opt.description}
                                  </div>
                                </div>
                              </div>
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${opt.badgeColor}`}>
                                {opt.badge}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>

        {/* Cloud Group Containers Section (AWS, Azure, GCP, OCI) */}
        <div className={`pt-2 mt-1 border-t space-y-1.5 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
          <div className="flex items-center justify-between px-0.5">
            <span className={`text-[10px] font-bold uppercase tracking-wider block ${
              isLight ? 'text-slate-900' : 'text-slate-400'
            }`}>
              Grupo por Cloud
            </span>
            <span className={`text-[9px] font-semibold px-1.5 py-0.2 rounded ${
              isLight ? 'bg-blue-100 text-blue-800' : 'bg-blue-500/20 text-blue-300'
            }`}>
              Containers
            </span>
          </div>

          {/* Individual Cloud Group Buttons: AWS, Azure, GCP, OCI */}
          <div className="grid grid-cols-4 gap-1.5 pt-0.5">
            {/* AWS */}
            <button
              id="btn-group-aws"
              onClick={() => onGroupByCloud ? onGroupByCloud('aws') : onAddContainer('cloud_group', 'aws')}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md border text-center transition-all group ${
                isLight
                  ? 'bg-white hover:bg-amber-50 border-slate-300 hover:border-amber-500 text-slate-900 shadow-sm'
                  : 'bg-white/5 hover:bg-amber-500/10 border-white/10 hover:border-amber-500/50 text-slate-200'
              }`}
              title="Container AWS (com título e ícone no topo à esquerda)"
            >
              <div 
                className="w-4 h-4 mb-0.5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                dangerouslySetInnerHTML={{ __html: getCloudLogoSvg('aws') }}
              />
              <span className="text-[10px] font-extrabold text-[#FF9900]">AWS</span>
            </button>

            {/* Azure */}
            <button
              id="btn-group-azure"
              onClick={() => onGroupByCloud ? onGroupByCloud('azure') : onAddContainer('cloud_group', 'azure')}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md border text-center transition-all group ${
                isLight
                  ? 'bg-white hover:bg-sky-50 border-slate-300 hover:border-sky-500 text-slate-900 shadow-sm'
                  : 'bg-white/5 hover:bg-sky-500/10 border-white/10 hover:border-sky-500/50 text-slate-200'
              }`}
              title="Container Azure (com título e ícone no topo à esquerda)"
            >
              <div 
                className="w-4 h-4 mb-0.5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                dangerouslySetInnerHTML={{ __html: getCloudLogoSvg('azure') }}
              />
              <span className="text-[10px] font-extrabold text-[#0078D4]">Azure</span>
            </button>

            {/* GCP */}
            <button
              id="btn-group-gcp"
              onClick={() => onGroupByCloud ? onGroupByCloud('gcp') : onAddContainer('cloud_group', 'gcp')}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md border text-center transition-all group ${
                isLight
                  ? 'bg-white hover:bg-blue-50 border-slate-300 hover:border-blue-500 text-slate-900 shadow-sm'
                  : 'bg-white/5 hover:bg-blue-500/10 border-white/10 hover:border-blue-500/50 text-slate-200'
              }`}
              title="Container GCP (com título e ícone no topo à esquerda)"
            >
              <div 
                className="w-4 h-4 mb-0.5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                dangerouslySetInnerHTML={{ __html: getCloudLogoSvg('gcp') }}
              />
              <span className="text-[10px] font-extrabold text-[#4285F4]">GCP</span>
            </button>

            {/* OCI */}
            <button
              id="btn-group-oci"
              onClick={() => onGroupByCloud ? onGroupByCloud('oci') : onAddContainer('cloud_group', 'oci')}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-md border text-center transition-all group ${
                isLight
                  ? 'bg-white hover:bg-red-50 border-slate-300 hover:border-red-500 text-slate-900 shadow-sm'
                  : 'bg-white/5 hover:bg-red-500/10 border-white/10 hover:border-red-500/50 text-slate-200'
              }`}
              title="Container OCI (com título e ícone no topo à esquerda)"
            >
              <div 
                className="w-4 h-4 mb-0.5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                dangerouslySetInnerHTML={{ __html: getCloudLogoSvg('oci') }}
              />
              <span className="text-[10px] font-extrabold text-[#C74634]">OCI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cloud Provider Tabs */}
      <div className={`p-3 border-b ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#12141A]'}`}>
        <div className={`flex items-center justify-between space-x-0.5 p-1 rounded-md border overflow-x-auto ${
          isLight ? 'bg-slate-200/80 border-slate-300' : 'bg-black/40 border-white/5'
        }`}>
          {[
            { id: 'all', label: 'Todos' },
            { id: 'ai', label: 'IA', color: isLight ? 'text-purple-900' : 'text-purple-300' },
            { id: 'generic', label: 'Comuns', color: isLight ? 'text-purple-900' : 'text-purple-400' },
            { id: 'aws', label: 'AWS', color: isLight ? 'text-amber-900' : 'text-amber-400' },
            { id: 'azure', label: 'Azure', color: isLight ? 'text-sky-900' : 'text-sky-400' },
            { id: 'gcp', label: 'GCP', color: isLight ? 'text-emerald-900' : 'text-emerald-400' },
            { id: 'oci', label: 'OCI', color: isLight ? 'text-red-900' : 'text-red-400' },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`tab-provider-${tab.id}`}
              onClick={() => setSelectedProvider(tab.id as any)}
              className={`flex-1 py-1 px-1.5 text-[10px] font-bold rounded transition-all text-center whitespace-nowrap ${
                selectedProvider === tab.id
                  ? isLight
                    ? 'bg-white text-slate-950 shadow border border-slate-300'
                    : 'bg-white/10 text-white shadow-sm border border-white/10'
                  : isLight
                  ? 'text-slate-800 hover:text-slate-950 hover:bg-slate-200/80'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              <span className={tab.color || ''}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative mt-2.5">
          <Search className={`w-3.5 h-3.5 absolute left-3 top-2.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`} />
          <input
            ref={searchInputRef}
            id="input-search-icons"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar serviços (ex: OpenAI, Claude, Gemini, EC2)..."
            className={`w-full border rounded-md pl-8 pr-14 py-1.5 text-xs outline-none transition-colors ${
              isLight
                ? 'bg-white border-slate-300 focus:border-blue-600 text-slate-950 placeholder-slate-500 font-medium'
                : 'bg-black/40 border-white/10 focus:border-blue-500 text-slate-200 placeholder-slate-500'
            }`}
          />
          <div className="absolute right-2 top-2 flex items-center space-x-1 pointer-events-none">
            <kbd className={`text-[10px] font-mono px-1.5 py-0.5 rounded border leading-none ${
              isLight
                ? 'bg-slate-100 text-slate-500 border-slate-300 shadow-xs'
                : 'bg-white/10 text-slate-400 border-white/10'
            }`}>
              Ctrl+K
            </kbd>
          </div>
        </div>
      </div>

      {/* Service Category Quick Filter Pills with Left & Right Navigation Arrows */}
      <div className={`px-1.5 py-1.5 border-b flex items-center space-x-1 ${
        isLight ? 'border-slate-200 bg-slate-50/50' : 'border-white/5 bg-black/20'
      }`}>
        <button
          type="button"
          id="btn-category-scroll-left"
          onClick={() => scrollCategories('left')}
          disabled={!canScrollLeft}
          className={`p-1 rounded-md transition-all shrink-0 ${
            canScrollLeft
              ? isLight
                ? 'hover:bg-slate-200 text-slate-700 hover:text-slate-950 shadow-xs active:scale-95'
                : 'hover:bg-white/10 text-slate-300 hover:text-white active:scale-95'
              : 'opacity-30 cursor-default text-slate-400'
          }`}
          title="Rolar categorias para esquerda"
          aria-label="Rolar categorias para esquerda"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div
          ref={categoryScrollRef}
          className="flex-1 flex items-center space-x-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5"
        >
          {[
            { id: 'all', label: 'Todos' },
            { id: 'ai', label: 'IA' },
            { id: 'compute', label: 'Compute' },
            { id: 'storage', label: 'Storage' },
            { id: 'database', label: 'Database' },
            { id: 'analytics', label: 'Analytics' },
            { id: 'networking', label: 'Network' },
            { id: 'security', label: 'Security' },
            { id: 'devops', label: 'DevOps' },
            { id: 'container', label: 'Containers' }
          ].map((cat) => (
            <button
              key={cat.id}
              id={`tab-category-${cat.id}`}
              onClick={() => {
                setSelectedCategory(cat.id as any);
                const btn = document.getElementById(`tab-category-${cat.id}`);
                btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
              }}
              className={`whitespace-nowrap px-2.5 py-0.5 text-[10px] font-semibold rounded-full border transition-all ${
                selectedCategory === cat.id
                  ? isLight
                    ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-sm'
                    : 'bg-blue-600/30 border-blue-500/50 text-blue-300'
                  : isLight
                  ? 'bg-white border-slate-300 text-slate-800 font-medium hover:text-slate-950 hover:bg-slate-100'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          id="btn-category-scroll-right"
          onClick={() => scrollCategories('right')}
          disabled={!canScrollRight}
          className={`p-1 rounded-md transition-all shrink-0 ${
            canScrollRight
              ? isLight
                ? 'hover:bg-slate-200 text-slate-700 hover:text-slate-950 shadow-xs active:scale-95'
                : 'hover:bg-white/10 text-slate-300 hover:text-white active:scale-95'
              : 'opacity-30 cursor-default text-slate-400'
          }`}
          title="Rolar categorias para direita"
          aria-label="Rolar categorias para direita"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Icons Catalog Grid */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {filteredIcons.length === 0 ? (
          <div className={`text-center py-12 text-xs font-medium ${isLight ? 'text-slate-700' : 'text-slate-500'}`}>
            Nenhum serviço em nuvem ou modelo encontrado para "{searchTerm}"
          </div>
        ) : isAiView && groupedAiIcons && groupedAiIcons.length > 0 ? (
          /* AGRUPAMENTO DEDICADO PARA IA */
          <div className="space-y-4">
            {groupedAiIcons.map((group) => (
              <div key={group.name} className="space-y-1.5">
                <div className="flex items-center justify-between px-0.5 pt-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-3 rounded-full bg-purple-500"></span>
                    <span className={`text-[11px] font-bold tracking-tight uppercase ${
                      isLight ? 'text-purple-950' : 'text-purple-300'
                    }`}>
                      {group.name}
                    </span>
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${
                    isLight ? 'bg-purple-100 border-purple-200 text-purple-800' : 'bg-purple-500/20 border-purple-500/30 text-purple-300'
                  }`}>
                    {group.icons.length}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {group.icons.map((icon) => (
                    <div
                      key={icon.key}
                      id={`icon-card-${icon.key}`}
                      onClick={() => onAddNode(icon)}
                      draggable
                      onDragStart={(e) => handleDragStart(e, icon)}
                      onDragEnd={handleDragEnd}
                      className={`group relative border rounded-lg p-2.5 flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 ${
                        draggingIconKey === icon.key
                          ? 'opacity-40 border-dashed border-purple-500 scale-95 bg-purple-500/10 ring-2 ring-purple-500/30'
                          : isLight
                          ? 'bg-white border-slate-300 hover:border-purple-500 hover:bg-purple-50/40 text-slate-900 shadow-xs'
                          : 'bg-white/5 border-white/5 hover:border-purple-500/50 hover:bg-white/10 text-slate-200'
                      }`}
                    >
                      {/* Provider Badge */}
                      <span
                        className="absolute top-2 right-2 text-[9px] font-bold uppercase px-1.5 py-0.2 rounded opacity-90 group-hover:opacity-100"
                        style={{ backgroundColor: `${icon.brandColor}20`, color: icon.brandColor }}
                      >
                        {icon.provider === 'generic' && icon.category === 'ai' ? 'AI' : icon.provider}
                      </span>

                      {/* SVG Icon */}
                      <div
                        className="w-10 h-10 my-1 flex items-center justify-center p-1 rounded group-hover:scale-105 transition-transform"
                        dangerouslySetInnerHTML={{ __html: icon.svg }}
                      />

                      {/* Label */}
                      <div className="w-full mt-1">
                        <span className={`block text-xs font-bold truncate ${
                          isLight ? 'text-slate-950 group-hover:text-purple-700' : 'text-slate-200 group-hover:text-white'
                        }`}>
                          {icon.name}
                        </span>
                        <span className={`block text-[10px] truncate mt-0.5 ${
                          isLight ? 'text-slate-700 font-medium' : 'text-slate-500'
                        }`} title={icon.description}>
                          {icon.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
              {filteredIcons.map((icon) => (
                <div
                  key={icon.key}
                  id={`icon-card-${icon.key}`}
                  onClick={() => onAddNode(icon)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, icon)}
                  onDragEnd={handleDragEnd}
                  className={`group relative border rounded-lg p-2.5 flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 ${
                    draggingIconKey === icon.key
                      ? 'opacity-40 border-dashed border-blue-500 scale-95 bg-blue-500/10 ring-2 ring-blue-500/30'
                      : isLight
                      ? 'bg-white border-slate-300 hover:border-blue-500 hover:bg-blue-50/50 text-slate-900'
                      : 'bg-white/5 border-white/5 hover:border-blue-500/50 hover:bg-white/10 text-slate-200'
                  }`}
                >
                  {/* Provider Badge */}
                  <span
                    className="absolute top-2 right-2 text-[9px] font-bold uppercase px-1.5 py-0.2 rounded opacity-90 group-hover:opacity-100"
                    style={{ backgroundColor: `${icon.brandColor}20`, color: icon.brandColor }}
                  >
                    {icon.provider === 'generic' && icon.category === 'ai' ? 'AI' : icon.provider}
                  </span>

                  {/* SVG Icon */}
                  <div
                    className="w-10 h-10 my-1 flex items-center justify-center p-1 rounded group-hover:scale-105 transition-transform"
                    dangerouslySetInnerHTML={{ __html: icon.svg }}
                  />

                  {/* Label */}
                  <div className="w-full mt-1">
                    <span className={`block text-xs font-bold truncate ${
                      isLight ? 'text-slate-950 group-hover:text-blue-700' : 'text-slate-200 group-hover:text-white'
                    }`}>
                      {icon.name}
                    </span>
                    <span className={`block text-[10px] truncate mt-0.5 ${
                      isLight ? 'text-slate-700 font-medium' : 'text-slate-500'
                    }`} title={icon.description}>
                      {icon.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
        )}
      </div>

      {/* Footer Info */}
      <div className={`p-3 border-t text-[10px] flex items-center justify-between ${
        isLight ? 'bg-slate-100 border-slate-200 text-slate-800 font-medium' : 'bg-black/40 border-white/10 text-slate-500'
      }`}>
        <span>Click or Drag to canvas</span>
        <span className="text-blue-600 font-bold">{filteredIcons.length} Services</span>
      </div>
    </aside>
  );
};
