import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Search,
  Download,
  Terminal,
  Cloud,
  Layers,
  Sparkles,
  DollarSign,
  FileCode2,
  FileText,
  ShieldCheck,
  GitBranch,
  KeyRound,
  HelpCircle,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  Zap,
  Network,
  Cpu,
  Database,
  Lock,
  Boxes,
  ArrowRight,
  Info
} from 'lucide-react';

import { LATEST_APP_VERSION } from '../data/changelogData';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'dark' | 'light';
  onOpenChangelog?: () => void;
  onOpenFeedback?: () => void;
}

type DocSectionId =
  | 'overview'
  | 'quickstart'
  | 'providers'
  | 'network'
  | 'ai'
  | 'finops'
  | 'terraform'
  | 'proposals'
  | 'security'
  | 'versioning'
  | 'cloud-auth'
  | 'shortcuts'
  | 'faq';

interface DocNavCategory {
  title: string;
  items: {
    id: DocSectionId;
    label: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

const NAV_CATEGORIES: DocNavCategory[] = [
  {
    title: 'Visão Geral',
    items: [
      { id: 'overview', label: 'Sobre a Plataforma', icon: BookOpen },
      { id: 'quickstart', label: 'Primeiros Passos', icon: Zap, badge: 'Início' }
    ]
  },
  {
    title: 'Arquitetura & Redes',
    items: [
      { id: 'providers', label: 'Provedores & Ícones', icon: Cloud },
      { id: 'network', label: 'Redes & Conexões', icon: Network }
    ]
  },
  {
    title: 'Recursos Avançados',
    items: [
      { id: 'ai', label: 'Inteligência Artificial', icon: Sparkles, badge: 'Gemini' },
      { id: 'finops', label: 'FinOps & Custos', icon: DollarSign },
      { id: 'terraform', label: 'Terraform IaC', icon: FileCode2 },
      { id: 'proposals', label: 'Propostas Word (.docx)', icon: FileText, badge: 'Novo' },
      { id: 'security', label: 'Linter de Segurança', icon: ShieldCheck },
      { id: 'versioning', label: 'Abas de Versões', icon: GitBranch }
    ]
  },
  {
    title: 'Acesso & Referência',
    items: [
      { id: 'cloud-auth', label: 'Nuvem, Auth & Drive', icon: KeyRound },
      { id: 'shortcuts', label: 'Atalhos de Teclado', icon: Terminal },
      { id: 'faq', label: 'Perguntas Frequentes', icon: HelpCircle }
    ]
  }
];

export const DocumentationModal: React.FC<DocumentationModalProps> = ({
  isOpen,
  onClose,
  theme = 'dark',
  onOpenChangelog,
  onOpenFeedback
}) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';
  const [activeSection, setActiveSection] = useState<DocSectionId>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDownloadDoc = () => {
    // Fetches the DOCUMENTACAO.md file or builds the markdown directly
    const element = document.createElement('a');
    element.setAttribute('href', '/DOCUMENTACAO.md');
    element.setAttribute('download', 'DOCUMENTACAO-MultiCloud-Canvas.md');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const matchesSearch = (text: string) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <div
      id="modal-documentation"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none"
    >
      <div
        className={`w-full max-w-5xl h-[90vh] max-h-[820px] rounded-2xl border shadow-2xl flex flex-col overflow-hidden transition-all ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900 shadow-slate-300/50'
            : 'bg-[#0E1118] border-white/10 text-slate-100 shadow-black/70'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between shrink-0 ${
            isLight ? 'border-slate-200 bg-slate-50/80' : 'border-white/10 bg-white/[0.02]'
          }`}
        >
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <h3 className="font-bold text-base tracking-tight">Manual do Produto & Documentação</h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  {LATEST_APP_VERSION}
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Aprenda a criar diagramas, gerar Terraform, propostas Word e governança FinOps
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="btn-download-doc-md"
              type="button"
              onClick={handleDownloadDoc}
              title="Baixar documentação completa em Markdown (.md)"
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-blue-500" />
              <span className="hidden sm:inline">Baixar .md</span>
            </button>

            <button
              id="btn-close-doc"
              type="button"
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isLight ? 'hover:bg-slate-200 text-slate-500' : 'hover:bg-white/10 text-slate-400'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Subheader with Search */}
        <div
          className={`px-6 py-2.5 border-b flex items-center justify-between gap-4 shrink-0 ${
            isLight ? 'border-slate-100 bg-slate-50/40' : 'border-white/5 bg-white/[0.01]'
          }`}
        >
          <div className="relative flex-1 max-w-md">
            <Search className={`w-4 h-4 absolute left-3 top-2.5 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Pesquisar em tópicos da documentação..."
              className={`w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border focus:outline-none transition-all ${
                isLight
                  ? 'bg-white border-slate-200 focus:border-blue-500 text-slate-800'
                  : 'bg-white/5 border-white/10 focus:border-blue-500 text-slate-200'
              }`}
            />
          </div>

          <div className="flex items-center space-x-2 text-xs">
            {onOpenChangelog && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenChangelog();
                }}
                className="text-indigo-400 hover:underline font-semibold flex items-center space-x-1"
              >
                <span>Ver Changelog</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Content Layout: Left Nav + Right Article */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Navigation */}
          <aside
            className={`w-64 border-r overflow-y-auto shrink-0 p-3 space-y-4 ${
              isLight ? 'border-slate-200 bg-slate-50/50' : 'border-white/5 bg-white/[0.01]'
            }`}
          >
            {NAV_CATEGORIES.map(category => (
              <div key={category.title} className="space-y-1">
                <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {category.title}
                </div>
                {category.items.map(item => {
                  const Icon = item.icon;
                  const isSelected = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`doc-nav-${item.id}`}
                      type="button"
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between group ${
                        isSelected
                          ? isLight
                            ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200 shadow-sm'
                            : 'bg-blue-600/20 text-blue-300 font-bold border border-blue-500/30 shadow-sm'
                          : isLight
                          ? 'hover:bg-slate-200/60 text-slate-700'
                          : 'hover:bg-white/5 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                          isSelected ? 'text-blue-500' : 'text-slate-500 group-hover:text-slate-300'
                        }`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                          isSelected
                            ? 'bg-blue-500 text-white'
                            : isLight ? 'bg-slate-200 text-slate-600' : 'bg-white/10 text-slate-400'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </aside>

          {/* Right Main Article */}
          <main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {activeSection === 'overview' && matchesSearch('visão geral proposta valor benefícios diferenciais') && (
              <section className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Plataforma Profissional de Arquitetura de Nuvem</span>
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight">O que é o MultiCloud Canvas Studio?</h1>
                  <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    O <strong>MultiCloud Canvas Studio</strong> é um estúdio de engenharia visual desenhado especificamente para arquitetos de soluções, consultores técnicos e equipes de infraestrutura modelarem sistemas em nuvem com rigor técnico, orçamentário e de governança.
                  </p>
                </div>

                {/* Grid of Key Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm mb-1.5">
                      <Cloud className="w-4 h-4" />
                      <span>Multi-Cloud Genuíno</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Combine serviços de <strong>AWS, Azure, Google Cloud, Oracle Cloud (OCI)</strong> e <strong>Kubernetes</strong> em uma única topologia híbrida ou multi-cloud sem atritos.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-1.5">
                      <DollarSign className="w-4 h-4" />
                      <span>FinOps em Tempo Real</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Veja o custo mensal e anual estimado instantaneamente. Compare o custo da mesma arquitetura entre diferentes provedores e exporte relatórios em PDF e planilhas CSV.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm mb-1.5">
                      <FileCode2 className="w-4 h-4" />
                      <span>Infraestrutura como Código (Terraform)</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      O diagrama não é uma imagem estática: compile todos os nós, redes e portas em código HCL Terraform (.tf) pronto para execução em pipelines CI/CD.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm mb-1.5">
                      <FileText className="w-4 h-4" />
                      <span>Propostas Comerciais em Word (.docx)</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Gere propostas executivas completas com sumário, escopo técnico, tabela de inventário de serviços, estimativa orçamentária e diagrama em alta resolução.
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${isLight ? 'bg-blue-50/50 border-blue-200' : 'bg-blue-950/20 border-blue-500/20'}`}>
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Info className="w-4 h-4" />
                    <span>Para quem este produto foi construído?</span>
                  </h4>
                  <ul className={`text-xs space-y-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    <li>• <strong>Arquitetos de Soluções & Cloud Engineers</strong> que precisam desenhar e aprovar arquiteturas rapidamente.</li>
                    <li>• <strong>Consultorias de Tecnologia & Parceiros Cloud</strong> que criam propostas comerciais e estimativas orçamentárias.</li>
                    <li>• <strong>Líderes Técnicos & CTOs</strong> que necessitam de visibilidade de custos (FinOps) e auditoria de segurança (SPOF/Portas).</li>
                  </ul>
                </div>
              </section>
            )}

            {activeSection === 'quickstart' && (
              <section className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold tracking-tight">Primeiros Passos: Criando sua Primeira Arquitetura</h2>
                  <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Siga o roteiro passo a passo para desenhar uma topologia completa em menos de 5 minutos.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border space-y-2 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <div className="flex items-center space-x-2 text-xs font-bold text-blue-500">
                      <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[11px]">1</span>
                      <span>Escolha o Provedor no Catálogo Lateral</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      Clique no botão do catálogo lateral esquerdo (ou pressione o ícone de pasta). Selecione entre as abas <strong>AWS, Azure, GCP, OCI</strong> ou <strong>Kubernetes</strong>.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border space-y-2 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <div className="flex items-center space-x-2 text-blue-500 font-bold text-xs">
                      <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[11px]">2</span>
                      <span>Arraste Contêineres de Rede (VPC / Subredes)</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      No menu superior do canvas, clique em <strong>Adicionar VPC</strong> ou <strong>Subrede Pública / Privada</strong>. Redimensione a caixa para delimitar a zona de isolamento da sua rede.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border space-y-2 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <div className="flex items-center space-x-2 text-blue-500 font-bold text-xs">
                      <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[11px]">3</span>
                      <span>Adicione Serviços e Faça as Conexões</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      Arraste instâncias (EC2, VMs, Compute), bancos de dados (RDS, Cloud SQL, Autonomous DB) ou Load Balancers. Passe o mouse sobre as âncoras circulares dos nós e arraste uma linha até o nó de destino. O estúdio detectará a porta e o protocolo recomendados automaticamente.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border space-y-2 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <div className="flex items-center space-x-2 text-blue-500 font-bold text-xs">
                      <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[11px]">4</span>
                      <span>Audite com IA e Exporte em Word, PDF ou Terraform</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      Clique em <strong>Auditar com IA</strong> para encontrar falhas de segurança e, em seguida, exporte a proposta formal em Word (.docx) ou baixe o código Terraform (.tf).
                    </p>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'providers' && (
              <section className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold tracking-tight">Provedores & Ícones Oficiais</h2>
                  <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Mais de 200 ícones vetorizados e padronizados de acordo com as diretrizes oficiais de cada cloud:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border border-amber-500/30 ${isLight ? 'bg-amber-50/40' : 'bg-amber-950/20'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-amber-500">Amazon Web Services (AWS)</span>
                      <span className="text-[10px] font-mono bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">#FF9900</span>
                    </div>
                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      EC2, Lambda, S3, RDS, DynamoDB, VPC, ECS, EKS, CloudFront, Route53, SQS, SNS, WAF, Secrets Manager, etc.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border border-blue-500/30 ${isLight ? 'bg-blue-50/40' : 'bg-blue-950/20'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-blue-500">Microsoft Azure</span>
                      <span className="text-[10px] font-mono bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">#0078D4</span>
                    </div>
                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Virtual Machines, App Service, Azure Functions, AKS, Blob Storage, Azure SQL, Cosmos DB, VNet, App Gateway.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border border-emerald-500/30 ${isLight ? 'bg-emerald-50/40' : 'bg-emerald-950/20'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-emerald-500">Google Cloud Platform (GCP)</span>
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">#4285F4</span>
                    </div>
                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Compute Engine, Cloud Run, Cloud Functions, GKE, Cloud Storage, Cloud SQL, BigQuery, VPC, Cloud Armor, Pub/Sub.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border border-red-500/30 ${isLight ? 'bg-red-50/40' : 'bg-red-950/20'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-red-500">Oracle Cloud (OCI)</span>
                      <span className="text-[10px] font-mono bg-red-500/20 text-red-400 px-2 py-0.5 rounded">#C74634</span>
                    </div>
                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Compute Shapes, FastConnect, Autonomous Database, Exadata, OCI Kubernetes (OKE), MySQL HeatWave, Vault, VCN.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'network' && (
              <section className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold tracking-tight">Redes & Conexões Inteligentes</h2>
                  <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Organize o tráfego com blocos CIDR e conexões que compreendem protocolos reais de infraestrutura:
                  </p>
                </div>

                <div className="space-y-3">
                  <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <h4 className="font-bold text-xs text-indigo-400 uppercase tracking-wider mb-1">Contêineres de Rede (Enclosures)</h4>
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      Crie delimitações de rede com cálculo e exibição de bloco CIDR (ex: <code>10.0.0.0/16</code> para VPC e <code>10.0.1.0/24</code> para sub-redes). Arrastar o contêiner move todos os nós contidos nele conjuntamente.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <h4 className="font-bold text-xs text-indigo-400 uppercase tracking-wider mb-1">Inferência Automática de Portas</h4>
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      Ao interligar dois componentes, o sistema detecta os papéis dos nós e sugere o protocolo correto:
                    </p>
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                      <div className="p-2 rounded bg-black/20 border border-white/5">HTTPS: 443</div>
                      <div className="p-2 rounded bg-black/20 border border-white/5">gRPC: 50051</div>
                      <div className="p-2 rounded bg-black/20 border border-white/5">PostgreSQL: 5432</div>
                      <div className="p-2 rounded bg-black/20 border border-white/5">Redis: 6379</div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'ai' && (
              <section className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Google Gemini 2.5/3.8 Flash SDK</span>
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Inteligência Artificial Integrada</h2>
                  <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Use modelos avançados de IA para gerar ou aprimorar diagramas de arquitetura com precisão:
                  </p>
                </div>

                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border ${isLight ? 'bg-indigo-50/50 border-indigo-200' : 'bg-indigo-950/20 border-indigo-500/30'}`}>
                    <h4 className="font-bold text-xs text-indigo-400 mb-1">1. Geração por Prompt em Linguagem Natural</h4>
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Clique no botão <strong>Gerar com IA</strong> na barra superior. Escreva o que precisa em português ou inglês e o modelo construirá os nós, contêineres e conexões automaticamente no canvas.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border ${isLight ? 'bg-indigo-50/50 border-indigo-200' : 'bg-indigo-950/20 border-indigo-500/30'}`}>
                    <h4 className="font-bold text-xs text-indigo-400 mb-1">2. Auditoria e Scoring Arquitetural</h4>
                    <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      A IA analisa seu diagrama segundo os pilares do <em>Well-Architected Framework</em>, gerando notas numéricas (0-100) para:
                    </p>
                    <ul className={`mt-2 text-xs space-y-1 list-disc list-inside ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      <li><strong>Alta Disponibilidade (HA)</strong>: Redundância multi-zona, balanceadores e autoscaling.</li>
                      <li><strong>Segurança</strong>: Isolamento em subredes privadas e firewalls.</li>
                      <li><strong>Eficiência de Custos (FinOps)</strong>: Uso de instâncias adequadas e serviços serverless.</li>
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'finops' && (
              <section className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold tracking-tight">FinOps & Calculadora de Custos Multi-Cloud</h2>
                  <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Governança financeira de nuvem integrada diretamente ao processo de desenho:
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className={`p-3.5 rounded-xl border text-center ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                      <div className="text-xs text-slate-400 font-medium">Custo Mensal Estimado</div>
                      <div className="text-lg font-bold text-emerald-500 font-mono mt-1">$ USD / R$ BRL</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Calculado em tempo real</div>
                    </div>
                    <div className={`p-3.5 rounded-xl border text-center ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                      <div className="text-xs text-slate-400 font-medium">Comparativo de Nuvens</div>
                      <div className="text-lg font-bold text-blue-500 font-mono mt-1">AWS vs Azure vs GCP</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Estimativa cruzada</div>
                    </div>
                    <div className={`p-3.5 rounded-xl border text-center ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                      <div className="text-xs text-slate-400 font-medium">Exportações</div>
                      <div className="text-lg font-bold text-purple-500 font-mono mt-1">CSV & PDF</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Relatórios formais</div>
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Clique no botão <strong>Custos</strong> na barra de ferramentas superior para abrir a tabela detalhada por serviço, categoria de gasto e recomendações de economia.
                  </p>
                </div>
              </section>
            )}

            {activeSection === 'terraform' && (
              <section className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold tracking-tight">Gerador de Infraestrutura como Código (Terraform)</h2>
                  <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Transforme topologias visuais em código HCL compilável com um clique:
                  </p>
                </div>

                <div className={`p-4 rounded-xl border space-y-3 font-mono text-xs ${isLight ? 'bg-slate-900 text-slate-100' : 'bg-black/50 text-slate-200 border-white/10'}`}>
                  <div className="text-slate-400 text-[11px] font-sans">Exemplo de saída automática gerada pelo estúdio:</div>
                  <pre className="overflow-x-auto p-2 bg-black/40 rounded border border-white/5 text-[11px]">
{`terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags = { Name = "Production-VPC" }
}`}
                  </pre>
                </div>

                <div className="text-xs text-slate-400">
                  Compatível com <strong>AWS</strong> (<code>aws_*</code>), <strong>Azure</strong> (<code>azurerm_*</code>), <strong>GCP</strong> (<code>google_*</code>) e <strong>OCI</strong> (<code>oci_*</code>).
                </div>
              </section>
            )}

            {activeSection === 'proposals' && (
              <section className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[11px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Recurso de Pré-Vendas & Consultoria</span>
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Propostas Técnicas e Comerciais em Word (.docx)</h2>
                  <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Crie documentos corporativos editáveis e visualmente impecáveis para apresentar a diretores ou clientes:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <h4 className="font-bold text-xs text-blue-400 mb-1">1. Proposta de Nova Implementação</h4>
                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Voltada para novos projetos em nuvem, modernização de microsserviços e PoCs. Inclui sumário de arquitetura, tabela de inventário de recursos, SLA e cronograma em semanas.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <h4 className="font-bold text-xs text-purple-400 mb-1">2. Proposta de Migração para a Nuvem</h4>
                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Estruturada segundo as estratégias de migração <strong>7 Rs da AWS/Gartner</strong> (Rehost, Replatform, Refactor, Repurchase, etc.), plano de cutover e mitigação de riscos.
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border flex items-start space-x-3 ${isLight ? 'bg-emerald-50/60 border-emerald-200' : 'bg-emerald-950/20 border-emerald-500/20'}`}>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <strong className="text-emerald-500">Snapshot Visual Embutido:</strong>
                    <p className={isLight ? 'text-slate-700' : 'text-slate-300'}>
                      O print do canvas em alta definição é renderizado e incorporado nativamente dentro do arquivo .docx, dispensando edições manuais posteriores.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'security' && (
              <section className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold tracking-tight">Linter de Segurança & Boas Práticas</h2>
                  <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Verificação automatizada e contínua de vulnerabilidades da arquitetura:
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/10 flex items-start space-x-2.5 text-xs">
                    <Lock className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-red-400">Detecção de Ponto Único de Falha (SPOF):</strong>
                      <p className="text-slate-300 mt-0.5">Identifica bancos de dados ou servidores essenciais sem nós redundantes ou zonas de backup.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-start space-x-2.5 text-xs">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-400">Portas Administrativas Abertas na Internet:</strong>
                      <p className="text-slate-300 mt-0.5">Avisa se portas sensíveis como SSH (22), RDP (3389) ou bancos de dados estiverem expostas publicamente.</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-blue-500/30 bg-blue-500/10 flex items-start space-x-2.5 text-xs">
                    <Network className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-blue-400">Verificação de Multi-AZ & Zonas de Disponibilidade:</strong>
                      <p className="text-slate-300 mt-0.5">Garante conformidade com as diretrizes do Well-Architected Framework para produção.</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'versioning' && (
              <section className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold tracking-tight">Sistema de Versionamento de Arquiteturas</h2>
                  <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Controle de versões e ramificações diretamente no rodapé do estúdio (VersionTabsBar):
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <h4 className="font-bold text-indigo-400 mb-1">Criação de Versões Sucessivas</h4>
                    <p className={isLight ? 'text-slate-600' : 'text-slate-300'}>
                      Mantenha a <code>v1.0 (Atual)</code> intacta enquanto projeta a <code>v1.1 (Planejada)</code> ou <code>v2.0 (Fase Futura)</code>.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <h4 className="font-bold text-indigo-400 mb-1">Duplicação Rápida de Cenários (A/B)</h4>
                    <p className={isLight ? 'text-slate-600' : 'text-slate-300'}>
                      Clique no botão de duplicar versão para comparar hipóteses técnicas (ex: "Cenário Serverless com Lambda" vs "Cenário com Kubernetes EKS") sem perder o trabalho original.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'cloud-auth' && (
              <section className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold tracking-tight">Nuvem, Autenticação & Google Workspace</h2>
                  <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Armazenamento seguro e integrações corporativas:
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <div className="font-bold text-blue-400 mb-1">Cloud Firestore & Firebase Auth</div>
                    <p className={isLight ? 'text-slate-600' : 'text-slate-300'}>
                      Seus projetos são persistidos em tempo real na nuvem do Google Firestore. Acesso isolado por ID criptográfico do usuário (UID) com regras estritas de <code>firestore.rules</code>.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <div className="font-bold text-emerald-400 mb-1">Google Drive & Gmail</div>
                    <p className={isLight ? 'text-slate-600' : 'text-slate-300'}>
                      Salve e abra diagramas diretamente na sua conta do Google Drive via OAuth seguro, ou dispare um e-mail com o sumário técnico pelo Gmail.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <div className="font-bold text-amber-400 mb-1">Modo Convidado (Offline)</div>
                    <p className={isLight ? 'text-slate-600' : 'text-slate-300'}>
                      Caso prefira desenhar sem criar uma conta, utilize o Modo Convidado. O diagrama é armazenado localmente no seu navegador via <code>localStorage</code>.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'shortcuts' && (
              <section className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold tracking-tight">Atalhos de Teclado (Cheat Sheet)</h2>
                  <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Acelere sua produtividade utilizando os atalhos nativos:
                  </p>
                </div>

                <div className={`rounded-xl border overflow-hidden ${isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-white/[0.01]'}`}>
                  <table className="w-full text-xs text-left">
                    <thead className={`border-b font-semibold ${isLight ? 'bg-slate-100 text-slate-700' : 'bg-white/5 text-slate-300'}`}>
                      <tr>
                        <th className="p-3">Atalho</th>
                        <th className="p-3">Ação</th>
                        <th className="p-3">Descrição</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isLight ? 'divide-slate-200 text-slate-700' : 'divide-white/5 text-slate-300'}`}>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-500">Ctrl + Z / ⌘ + Z</td>
                        <td className="p-3 font-semibold">Desfazer (Undo)</td>
                        <td className="p-3 text-slate-400">Reverte a última ação no canvas</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-500">Ctrl + Y / ⌘ + Y</td>
                        <td className="p-3 font-semibold">Refazer (Redo)</td>
                        <td className="p-3 text-slate-400">Reaplica a ação desfeita</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-500">Delete / Backspace</td>
                        <td className="p-3 font-semibold">Excluir Selecionados</td>
                        <td className="p-3 text-slate-400">Remove nós, conexões ou contêineres ativos</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-500">Espaço + Arrastar</td>
                        <td className="p-3 font-semibold">Pan (Navegar)</td>
                        <td className="p-3 text-slate-400">Move livremente a visualização do canvas</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-500">Roda do Mouse</td>
                        <td className="p-3 font-semibold">Zoom In / Out</td>
                        <td className="p-3 text-slate-400">Aumenta ou reduz o campo de visão (25% - 200%)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-500">F</td>
                        <td className="p-3 font-semibold">Ajustar à Tela (Fit)</td>
                        <td className="p-3 text-slate-400">Enquadra todos os elementos no centro da tela</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-500">Ctrl + S</td>
                        <td className="p-3 font-semibold">Salvar na Nuvem</td>
                        <td className="p-3 text-slate-400">Força salvamento imediato no Firestore</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-500">Esc</td>
                        <td className="p-3 font-semibold">Cancelar / Fechar</td>
                        <td className="p-3 text-slate-400">Desmarca seleções e fecha caixas de diálogo</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {activeSection === 'faq' && (
              <section className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold tracking-tight">Perguntas Frequentes (FAQ)</h2>
                  <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Dúvidas comuns sobre o uso da plataforma:
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <h4 className="font-bold text-blue-400 mb-1">Meus dados e diagramas são compartilhados com outros usuários?</h4>
                    <p className={`leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      Não. O MultiCloud Canvas Studio utiliza regras de segurança restritas no Cloud Firestore (<code>firestore.rules</code>). Cada usuário só possui autorização de leitura e escrita sobre os projetos vinculados ao seu próprio UID autenticado.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <h4 className="font-bold text-blue-400 mb-1">Posso usar o código Terraform diretamente em produção?</h4>
                    <p className={`leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      Sim! O código gerado é padrão HashiCorp HCL válido. Ele declara os provedores, VPCs, subredes e recursos essenciais. Você pode versioná-lo em seu repositório Git e estender com variáveis de ambiente conforme necessário.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'}`}>
                    <h4 className="font-bold text-blue-400 mb-1">Como enviar sugestões ou reportar problemas?</h4>
                    <p className={`leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      Você pode usar o botão <strong>Feedback</strong> disponível tanto no rodapé do estúdio quanto no menu de usuário. Os relatórios são enviados diretamente para a equipe de desenvolvimento (<code>edsinfobr@gmail.com</code>).
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Bottom sequential navigation */}
            <div className={`pt-6 border-t flex items-center justify-between text-xs ${
              isLight ? 'border-slate-200 text-slate-600' : 'border-white/10 text-slate-400'
            }`}>
              <div className="flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <span>Documentação oficial do MultiCloud Canvas Studio</span>
              </div>

              {onOpenFeedback && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenFeedback();
                  }}
                  className="text-pink-500 hover:underline font-semibold"
                >
                  Ficou com alguma dúvida? Envie um feedback
                </button>
              )}
            </div>
          </main>
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-3 border-t flex items-center justify-between text-xs shrink-0 ${
            isLight ? 'border-slate-200 bg-slate-50 text-slate-600' : 'border-white/10 bg-white/[0.02] text-slate-400'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-blue-500" />
            <span>Arquivo fonte completo: <strong>/DOCUMENTACAO.md</strong> na raiz do projeto</span>
          </div>

          <button
            id="btn-close-doc-footer"
            type="button"
            onClick={onClose}
            className={`px-4 py-1.5 rounded-lg border font-semibold text-xs transition-all ${
              isLight
                ? 'bg-slate-200 hover:bg-slate-300 border-slate-300 text-slate-800'
                : 'bg-white/10 hover:bg-white/20 border-white/10 text-white'
            }`}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
