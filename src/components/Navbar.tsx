import React, { useState } from 'react';
import { 
  Sparkles, 
  Code, 
  DollarSign, 
  Download, 
  Upload, 
  FileText, 
  LayoutTemplate, 
  Undo2, 
  Redo2, 
  Trash2, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  ShieldCheck,
  ShieldAlert,
  Plus,
  Save,
  FolderOpen,
  ChevronDown,
  Image,
  Layers,
  HardDrive,
  LogIn,
  LogOut,
  Cloud,
  UserCheck,
  FileSignature,
  Sun,
  Moon,
  MessageSquarePlus,
  GitBranch,
  Tag,
  Mail,
  Presentation,
  Rocket,
  ArrowRightLeft,
  Briefcase,
  History,
  BookOpen,
  HelpCircle,
  Share2,
  SlidersHorizontal
} from 'lucide-react';
import { DiagramState, CloudProvider, ProposalType } from '../types';
import { exportCanvasToPng, exportCanvasToJpg, exportCanvasToSvg, exportArchitecturePdf, exportProjectToJson } from '../utils/exportUtils';
import { GoogleUser } from '../services/googleDrive';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { MultiCloudLogo } from './MultiCloudLogo';

interface NavbarProps {
  diagram: DiagramState;
  setDiagram: React.Dispatch<React.SetStateAction<DiagramState>>;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  onOpenAiModal: () => void;
  onOpenAuditModal: () => void;
  onOpenSecurityLinter?: () => void;
  onOpenTerraformModal: () => void;
  onOpenCostModal: () => void;
  onOpenTemplateModal: () => void;
  onOpenMetadataModal: () => void;
  onOpenProfilePreferencesModal?: () => void;
  onNewArchitecture: () => void;
  onSaveArchitecture: () => void;
  onOpenSavedModal: () => void;
  onOpenAuthModal?: () => void;
  isGuestMode?: boolean;
  onReturnToAuth?: () => void;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  onResetZoom: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onClearCanvas: () => void;
  onImportJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
  googleUser: GoogleUser | null;
  onOpenGoogleDriveModal: () => void;
  onOpenGmailModal?: () => void;
  onOpenFeedbackModal?: () => void;
  onOpenChangelogModal?: () => void;
  onOpenDocumentationModal?: () => void;
  lastAutoSavedAt?: Date | null;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  onEnterPresentationMode?: () => void;
  onOpenProposalModal?: (type?: ProposalType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  diagram,
  setDiagram,
  canvasRef,
  onOpenAiModal,
  onOpenAuditModal,
  onOpenSecurityLinter,
  onOpenTerraformModal,
  onOpenCostModal,
  onOpenTemplateModal,
  onOpenMetadataModal,
  onOpenProfilePreferencesModal,
  onNewArchitecture,
  onSaveArchitecture,
  onOpenSavedModal,
  onOpenAuthModal,
  isGuestMode = false,
  onReturnToAuth,
  zoom,
  setZoom,
  onResetZoom,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onClearCanvas,
  onImportJson,
  googleUser,
  onOpenGoogleDriveModal,
  onOpenGmailModal,
  onOpenFeedbackModal,
  onOpenChangelogModal,
  onOpenDocumentationModal,
  lastAutoSavedAt,
  theme = 'dark',
  onToggleTheme,
  onEnterPresentationMode,
  onOpenProposalModal
}) => {
  const { currentUser, logout, userPreferences } = useAuth();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSecurityMenuOpen, setIsSecurityMenuOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiagram((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleVersionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiagram((prev) => ({ ...prev, version: e.target.value }));
  };

  const handleExportPng = async () => {
    setIsMenuOpen(false);
    setIsExportOpen(false);
    if (canvasRef.current) {
      await exportCanvasToPng(canvasRef.current, `${diagram.title.toLowerCase().replace(/\s+/g, '-')}.png`, diagram);
    }
  };

  const handleExportJpg = async () => {
    setIsMenuOpen(false);
    setIsExportOpen(false);
    if (canvasRef.current) {
      await exportCanvasToJpg(canvasRef.current, `${diagram.title.toLowerCase().replace(/\s+/g, '-')}.jpg`, diagram);
    }
  };

  const handleExportSvg = async () => {
    setIsMenuOpen(false);
    setIsExportOpen(false);
    if (canvasRef.current) {
      await exportCanvasToSvg(canvasRef.current, `${diagram.title.toLowerCase().replace(/\s+/g, '-')}.svg`, diagram);
    }
  };

  const handleExportPdf = async () => {
    setIsMenuOpen(false);
    setIsExportOpen(false);
    if (canvasRef.current) {
      await exportArchitecturePdf(canvasRef.current, diagram);
    }
  };

  const handleExportJson = () => {
    setIsMenuOpen(false);
    setIsExportOpen(false);
    exportProjectToJson(diagram);
  };

  return (
    <header id="main-navbar" className={`border-b z-30 select-none shadow-md transition-colors ${
      theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#12141A] border-white/10 text-slate-200'
    }`}>
      {/* ROW 1: TOP BRAND HEADER (App Name & Logo prominently positioned above buttons) */}
      <div className={`px-4 py-2 border-b flex items-center justify-between gap-4 ${
        theme === 'light' ? 'border-slate-200 bg-slate-50/60' : 'border-white/5 bg-[#0e1017]'
      }`}>
        {/* Left: App Logo & Prominent App Title */}
        <div className="flex items-center space-x-3">
          {/* Custom MultiCloud Canvas Studio Logo */}
          <div className="relative group flex items-center justify-center shrink-0">
            <div className={`absolute -inset-1 rounded-2xl opacity-70 blur-sm transition duration-500 group-hover:opacity-100 ${
              theme === 'light' 
                ? 'bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400' 
                : 'bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500'
            }`} />
            <div className="relative transition-transform duration-200 group-hover:scale-105 filter drop-shadow-md cursor-pointer">
              <MultiCloudLogo className="w-9 h-9" />
            </div>
          </div>

          {/* App Name Highlighted ("Em Destaque") */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <h1 className={`text-base md:text-lg font-black tracking-tight ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent'
              }`}>
                MultiCloud Canvas Studio
              </h1>
            </div>
            <span className={`text-[10px] font-medium hidden lg:inline ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
              Modelador de Arquitetura Multi-Nuvem, Estimativas de Custos e IaC Terraform
            </span>
          </div>
        </div>

        {/* Center: Architecture Title & Version Badge (Centered on top row with App Name) */}
        <div className="flex-1 flex items-center justify-center max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-2">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-xl border transition-all ${
            theme === 'light'
              ? 'bg-white/90 border-slate-300 shadow-sm hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-400/20'
              : 'bg-[#181c28] border-white/15 shadow-inner hover:border-blue-500/50 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/20'
          }`}>
            <Tag className={`w-3.5 h-3.5 shrink-0 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />

            {/* Architecture Title Input */}
            <input
              id="top-center-architecture-title"
              type="text"
              value={diagram.title || ''}
              onChange={handleTitleChange}
              className={`text-xs sm:text-sm font-bold bg-transparent border-none outline-none text-center w-28 sm:w-48 md:w-60 lg:w-72 truncate ${
                theme === 'light'
                  ? 'text-slate-900 placeholder-slate-400'
                  : 'text-white placeholder-slate-500'
              }`}
              placeholder="Nome da Arquitetura"
              title="Clique para editar o nome da arquitetura"
            />

            <span className={`text-xs ${theme === 'light' ? 'text-slate-300' : 'text-white/20'}`}>|</span>

            {/* Version Badge & Input */}
            <div className="flex items-center space-x-1 shrink-0" title="Versão atual da arquitetura">
              <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
              <input
                id="top-center-architecture-version"
                type="text"
                value={diagram.version || 'v1.0'}
                onChange={handleVersionChange}
                className={`text-xs font-mono font-black px-2 py-0.5 rounded-md outline-none border transition-colors w-16 text-center ${
                  theme === 'light'
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-900 focus:border-indigo-500'
                    : 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300 focus:border-indigo-400'
                }`}
                placeholder="v1.0"
                title="Clique para alterar a versão (ex: v1.0, v2.0)"
              />
            </div>
          </div>
        </div>

        {/* Right: Auto-Save Status, Drive, Help/Docs, Theme & User Account */}
        <div className="flex items-center space-x-2 shrink-0">
          {lastAutoSavedAt && (
            <div
              id="autosave-status-badge"
              className={`flex items-center space-x-1.5 text-[10px] font-semibold whitespace-nowrap px-2.5 py-1 rounded-full border transition-all ${
                theme === 'light'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              }`}
              title="Salvo automaticamente a cada 30 segundos no armazenamento local"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden xl:inline">
                Auto-salvo {lastAutoSavedAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
              <span className="xl:hidden">Auto-salvo</span>
            </div>
          )}

          {/* Google Drive Integration Shortcut */}
          <button
            id="btn-google-drive"
            onClick={onOpenGoogleDriveModal}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold shadow-sm transition-all border ${
              googleUser
                ? theme === 'light' ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-950' : 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                : theme === 'light' ? 'bg-blue-50 hover:bg-blue-100 border-blue-300 text-blue-950' : 'bg-blue-600/20 hover:bg-blue-600/30 border-blue-500/40 text-blue-300'
            }`}
            title={googleUser ? `Google Drive Conectado (${googleUser.email})` : 'Conectar e Salvar no Google Drive'}
          >
            {googleUser?.picture ? (
              <img src={googleUser.picture} alt={googleUser.name} className="w-4 h-4 rounded-full border border-emerald-500" />
            ) : (
              <HardDrive className="w-3.5 h-3.5 text-blue-500" />
            )}
            <span className="hidden lg:inline">
              {googleUser ? 'Google Drive' : 'Drive'}
            </span>
          </button>

          {/* Central de Ajuda & Documentação Dropdown */}
          <div className="relative">
            <button
              id="btn-help-dropdown"
              onClick={() => {
                setIsHelpOpen((prev) => !prev);
                setIsUserMenuOpen(false);
                setIsMenuOpen(false);
                setIsSecurityMenuOpen(false);
                setIsExportOpen(false);
              }}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border transition-all ${
                theme === 'light'
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
              }`}
              title="Central de Ajuda, Documentação do Produto, Changelog e Feedback"
            >
              <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden md:inline">Ajuda</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isHelpOpen ? 'rotate-180' : ''}`} />
            </button>

            {isHelpOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/0 cursor-default"
                  onClick={() => setIsHelpOpen(false)}
                />
                <div
                  className={`absolute right-0 mt-2 w-64 border rounded-xl shadow-2xl z-50 overflow-hidden py-1.5 transition-all ${
                    theme === 'light' ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#181B24] border-white/10 text-slate-100'
                  }`}
                >
                  <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-white/5 mb-1">
                    Recursos & Suporte
                  </div>

                  {onOpenDocumentationModal && (
                    <button
                      id="menu-btn-help-docs"
                      onClick={() => {
                        setIsHelpOpen(false);
                        onOpenDocumentationModal();
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center space-x-2.5 transition-colors ${
                        theme === 'light' ? 'hover:bg-blue-50/70 text-slate-800' : 'hover:bg-white/5 text-slate-200'
                      }`}
                    >
                      <div className="p-1.5 rounded-md bg-blue-500/15 text-blue-500">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs">Documentação do Produto</div>
                        <div className="text-[10px] text-slate-500">Manual, catálogo de serviços e FinOps</div>
                      </div>
                    </button>
                  )}

                  {onOpenChangelogModal && (
                    <button
                      id="menu-btn-help-changelog"
                      onClick={() => {
                        setIsHelpOpen(false);
                        onOpenChangelogModal();
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center space-x-2.5 transition-colors ${
                        theme === 'light' ? 'hover:bg-indigo-50/70 text-slate-800' : 'hover:bg-white/5 text-slate-200'
                      }`}
                    >
                      <div className="p-1.5 rounded-md bg-indigo-500/15 text-indigo-500">
                        <History className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs">Histórico de Versões</div>
                        <div className="text-[10px] text-slate-500">Changelog v2.4.0 e atualizações</div>
                      </div>
                    </button>
                  )}

                  {onOpenFeedbackModal && (
                    <button
                      id="menu-btn-help-feedback"
                      onClick={() => {
                        setIsHelpOpen(false);
                        onOpenFeedbackModal();
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center space-x-2.5 transition-colors ${
                        theme === 'light' ? 'hover:bg-pink-50/70 text-slate-800' : 'hover:bg-white/5 text-slate-200'
                      }`}
                    >
                      <div className="p-1.5 rounded-md bg-pink-500/15 text-pink-500">
                        <MessageSquarePlus className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs">Enviar Feedback</div>
                        <div className="text-[10px] text-slate-500">Sugestões de melhoria ou reporte de erro</div>
                      </div>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Language Selector */}
          <LanguageSelector variant="compact" theme={theme} />

          {/* Theme Mode Switcher */}
          {onToggleTheme && (
            <button
              id="btn-toggle-theme"
              onClick={onToggleTheme}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border transition-all ${
                theme === 'light'
                  ? 'bg-amber-100 hover:bg-amber-200 border-amber-400 text-amber-950 shadow-sm'
                  : 'bg-indigo-950/40 hover:bg-indigo-900/60 border-indigo-500/40 text-indigo-300'
              }`}
              title={theme === 'light' ? t.nav.darkTheme : t.nav.lightTheme}
            >
              {theme === 'light' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden xl:inline">{t.nav.lightTheme}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden xl:inline">{t.nav.darkTheme}</span>
                </>
              )}
            </button>
          )}

          <div className={`h-4 w-px mx-0.5 ${theme === 'light' ? 'bg-slate-300' : 'bg-white/10'}`} />

          {/* User Account / Authentication in Row 1 */}
          {currentUser ? (
            <div className="relative">
              <button
                id="btn-user-profile"
                onClick={() => {
                  setIsUserMenuOpen(!isUserMenuOpen);
                  setIsHelpOpen(false);
                }}
                className={`flex items-center space-x-2 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
                  theme === 'light'
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-900'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                  {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                </div>
                <div className="hidden sm:flex flex-col items-start text-left leading-none">
                  <span className="text-[11px] font-bold max-w-[90px] md:max-w-[120px] truncate">
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </span>
                  <span className="text-[9px] text-emerald-400 font-medium flex items-center space-x-0.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    <span>Nuvem</span>
                  </span>
                </div>
                <ChevronDown className={`w-3 h-3 text-slate-400 transform transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 bg-black/0 cursor-default"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div
                    className={`absolute right-0 mt-2 w-64 border rounded-xl shadow-2xl z-50 overflow-hidden py-1.5 transition-all ${
                      theme === 'light' ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#12141A] border-white/10 text-slate-100'
                    }`}
                  >
                    {/* User Info Header */}
                    <div className={`px-4 py-3 border-b ${theme === 'light' ? 'border-slate-100 bg-slate-50' : 'border-white/5 bg-white/[0.02]'}`}>
                      <p className="text-xs font-bold truncate">
                        {currentUser.displayName || 'Arquiteto Cloud'}
                      </p>
                      <p className={`text-[11px] truncate mt-0.5 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                        {currentUser.email}
                      </p>
                      <div className="mt-2 flex items-center space-x-1.5 text-[10px] text-emerald-500 font-semibold">
                        <Cloud className="w-3 h-3" />
                        <span>Sincronização Firestore Ativa</span>
                      </div>
                    </div>

                    {/* Menu Options */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onOpenSavedModal();
                        }}
                        className={`w-full text-left px-4 py-2 text-xs flex items-center space-x-2.5 font-medium transition-colors ${
                          theme === 'light' ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/5 text-slate-300'
                        }`}
                      >
                        <FolderOpen className="w-4 h-4 text-blue-500" />
                        <span>Minhas Arquiteturas Salvas</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onSaveArchitecture();
                        }}
                        className={`w-full text-left px-4 py-2 text-xs flex items-center space-x-2.5 font-medium transition-colors ${
                          theme === 'light' ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/5 text-slate-300'
                        }`}
                      >
                        <Save className="w-4 h-4 text-emerald-500" />
                        <span>Salvar Arquitetura na Nuvem</span>
                      </button>

                      {onOpenProfilePreferencesModal && (
                        <button
                          id="btn-user-menu-preferences"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            onOpenProfilePreferencesModal();
                          }}
                          className={`w-full text-left px-4 py-2 text-xs flex items-center space-x-2.5 font-medium transition-colors ${
                            theme === 'light' ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/5 text-slate-300'
                          }`}
                        >
                          <SlidersHorizontal className="w-4 h-4 text-purple-500" />
                          <div className="flex flex-col">
                            <span className="font-semibold">Preferências do Perfil</span>
                            <span className={`text-[10px] ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                              Tema, Menus & Carimbo Padrão
                            </span>
                          </div>
                        </button>
                      )}

                      {onOpenDocumentationModal && (
                        <button
                          id="btn-user-menu-docs"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            onOpenDocumentationModal();
                          }}
                          className={`w-full text-left px-4 py-2 text-xs flex items-center space-x-2.5 font-medium transition-colors ${
                            theme === 'light' ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/5 text-slate-300'
                          }`}
                        >
                          <BookOpen className="w-4 h-4 text-blue-500" />
                          <span>Documentação do Produto</span>
                        </button>
                      )}

                      {onOpenChangelogModal && (
                        <button
                          id="btn-user-menu-changelog"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            onOpenChangelogModal();
                          }}
                          className={`w-full text-left px-4 py-2 text-xs flex items-center space-x-2.5 font-medium transition-colors ${
                            theme === 'light' ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/5 text-slate-300'
                          }`}
                        >
                          <History className="w-4 h-4 text-indigo-500" />
                          <span>Histórico de Mudanças</span>
                        </button>
                      )}
                    </div>

                    <div className={`h-px my-1 ${theme === 'light' ? 'bg-slate-100' : 'border-white/5'}`} />

                    {/* Logout Option */}
                    <div className="px-1.5 pb-1">
                      <button
                        id="btn-logout"
                        onClick={async () => {
                          setIsUserMenuOpen(false);
                          await logout();
                          if (onReturnToAuth) {
                            onReturnToAuth();
                          }
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center space-x-2 font-semibold text-rose-500 transition-colors ${
                          theme === 'light' ? 'hover:bg-rose-50' : 'hover:bg-rose-500/10'
                        }`}
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Desconectar Conta</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              {isGuestMode && (
                <span className={`hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${
                  theme === 'light' ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                }`}>
                  Convidado
                </span>
              )}
              <button
                id="btn-navbar-auth"
                onClick={onReturnToAuth || onOpenAuthModal}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-bold shadow-sm transition-all border ${
                  theme === 'light'
                    ? 'bg-blue-600 hover:bg-blue-500 text-white border-blue-600 shadow-blue-500/20'
                    : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500/30 shadow-blue-500/20'
                }`}
                title="Cadastrar ou Entrar para sincronizar suas arquiteturas na nuvem"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cadastrar / Entrar</span>
                <span className="sm:hidden">Entrar</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ROW 2: CONTROLS & ACTION BUTTONS TOOLBAR */}
      <div className="px-4 py-1.5 flex items-center justify-between gap-3 min-h-[42px] relative z-30">
        {/* Left Section: Architecture Dropdown, Undo/Redo & Provider Badges */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Main Architecture Dropdown Menu */}
          <div className="relative">
            <button
              id="btn-architecture-menu"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsSecurityMenuOpen(false);
                setIsExportOpen(false);
                setIsHelpOpen(false);
                setIsUserMenuOpen(false);
              }}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all border ${
                theme === 'light'
                  ? 'bg-blue-50 hover:bg-blue-100 border-blue-300 text-blue-900'
                  : 'bg-blue-600/20 hover:bg-blue-600/30 border-blue-500/30 text-blue-300'
              }`}
            >
              <Layers className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-blue-700' : 'text-blue-400'}`} />
              <span>{t.nav.architecture}</span>
              <ChevronDown className={`w-3 h-3 transform transition-transform ${isMenuOpen ? 'rotate-180' : ''} ${theme === 'light' ? 'text-blue-700' : 'text-blue-400'}`} />
            </button>

            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/0 cursor-default"
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className={`absolute left-0 mt-2 w-60 border rounded-xl shadow-2xl z-50 overflow-hidden py-1.5 ${
                  theme === 'light' ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#181B24] border-white/10 text-slate-100'
                }`}>
                  <button
                    id="menu-btn-new-arch"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onNewArchitecture();
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center space-x-2.5 group transition-colors ${
                      theme === 'light' ? 'text-slate-900 hover:bg-slate-100' : 'text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <Plus className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="font-semibold block">{t.nav.newDiagram}</span>
                      <span className="text-[10px] text-slate-500">Limpar e criar novo diagrama</span>
                    </div>
                  </button>

                  <button
                    id="menu-btn-save-arch"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onSaveArchitecture();
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center space-x-2.5 group transition-colors ${
                      theme === 'light' ? 'text-slate-900 hover:bg-slate-100' : 'text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <Save className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="font-semibold block">{t.nav.saveCloud}</span>
                      <span className="text-[10px] text-slate-500">
                        {currentUser ? t.nav.cloudSaved : t.nav.localSaved}
                      </span>
                    </div>
                  </button>

                  <button
                    id="menu-btn-saved-list"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenSavedModal();
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center space-x-2.5 group transition-colors ${
                      theme === 'light' ? 'text-slate-900 hover:bg-slate-100' : 'text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <FolderOpen className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="font-semibold block">{t.nav.savedArchitectures}</span>
                      <span className="text-[10px] text-slate-500">Projetos salvos e versões</span>
                    </div>
                  </button>

                  <button
                    id="menu-btn-metadata-stamp"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenMetadataModal();
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center space-x-2.5 group transition-colors ${
                      theme === 'light' ? 'text-slate-900 hover:bg-slate-100' : 'text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <FileSignature className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="font-semibold block">{t.nav.metadataStamp}</span>
                      <span className="text-[10px] text-slate-500">Autor, Data, Cargo e Empresa</span>
                    </div>
                  </button>

                  {onOpenProfilePreferencesModal && (
                    <button
                      id="menu-btn-profile-preferences"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenProfilePreferencesModal();
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center space-x-2.5 group transition-colors ${
                        theme === 'light' ? 'text-slate-900 hover:bg-slate-100' : 'text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <SlidersHorizontal className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                      <div>
                        <span className="font-semibold block">{t.nav.preferences}</span>
                        <span className="text-[10px] text-slate-500">Tema, Menus & Carimbo Padrão</span>
                      </div>
                    </button>
                  )}

                  <div className={`h-px my-1 ${theme === 'light' ? 'bg-slate-100' : 'bg-white/10'}`} />

                  <button
                    id="menu-btn-import-json"
                    onClick={() => {
                      setIsMenuOpen(false);
                      fileInputRef.current?.click();
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center space-x-2.5 group transition-colors ${
                      theme === 'light' ? 'text-slate-900 hover:bg-slate-100' : 'text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <Upload className="w-4 h-4 text-sky-500 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="font-semibold block">{t.nav.importJson}</span>
                      <span className="text-[10px] text-slate-500">Carregar arquivo .json</span>
                    </div>
                  </button>

                  <button
                    id="menu-btn-export-json"
                    onClick={handleExportJson}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center space-x-2.5 group transition-colors ${
                      theme === 'light' ? 'text-slate-900 hover:bg-slate-100' : 'text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <Download className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="font-semibold block">{t.nav.exportJson}</span>
                      <span className="text-[10px] text-slate-500">Backup offline do projeto</span>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Botões Desfazer e Refazer */}
          <div className={`flex items-center rounded-lg p-0.5 border shadow-sm ${
            theme === 'light' ? 'bg-white border-slate-300' : 'bg-[#181c28] border-white/15'
          }`}>
            <button
              id="btn-undo"
              type="button"
              disabled={!canUndo}
              onClick={onUndo}
              title="Desfazer alterações (Ctrl+Z)"
              aria-label="Desfazer alterações"
              className={`p-1.5 rounded-md transition-all flex items-center justify-center ${
                canUndo
                  ? theme === 'light'
                    ? 'hover:bg-slate-100 active:bg-slate-200 text-slate-800'
                    : 'hover:bg-white/10 active:bg-white/20 text-slate-200'
                  : 'opacity-30 cursor-not-allowed text-slate-400'
              }`}
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              id="btn-redo"
              type="button"
              disabled={!canRedo}
              onClick={onRedo}
              title="Refazer alterações (Ctrl+Y ou Ctrl+Shift+Z)"
              aria-label="Refazer alterações"
              className={`p-1.5 rounded-md transition-all flex items-center justify-center ${
                canRedo
                  ? theme === 'light'
                    ? 'hover:bg-slate-100 active:bg-slate-200 text-slate-800'
                    : 'hover:bg-white/10 active:bg-white/20 text-slate-200'
                  : 'opacity-30 cursor-not-allowed text-slate-400'
              }`}
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Cloud Provider Badges */}
          <div className={`hidden 2xl:flex items-center space-x-1 p-0.5 rounded-md border ${
            theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-black/40 border-white/5'
          }`}>
            {(['aws', 'azure', 'gcp', 'oci'] as CloudProvider[]).map((p) => {
              const active = diagram.nodes.some((n) => n.provider === p);
              return (
                <span
                  key={p}
                  className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded transition-all ${
                    active
                      ? p === 'aws'
                        ? theme === 'light' ? 'bg-amber-100 text-amber-950 border border-amber-300' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : p === 'azure'
                        ? theme === 'light' ? 'bg-sky-100 text-sky-950 border border-sky-300' : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        : p === 'gcp'
                        ? theme === 'light' ? 'bg-emerald-100 text-emerald-950 border border-emerald-300' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : theme === 'light' ? 'bg-red-100 text-red-950 border border-red-300' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : theme === 'light' ? 'text-slate-400 font-medium' : 'text-slate-600'
                  }`}
                >
                  {p}
                </span>
              );
            })}
          </div>
        </div>

        {/* Center Section: Core Tools (AI, Templates, Security, FinOps, Export) */}
        <div className="flex items-center space-x-1.5 shrink-0">
          {/* AI Generator Button */}
          <button
            id="btn-ai-prompt"
            onClick={onOpenAiModal}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-2.5 py-1.5 rounded-md text-xs font-bold shadow-sm transition-all active:scale-95"
            title="Gerador de Arquitetura por Inteligência Artificial"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>AI Generator</span>
          </button>

          {/* Templates Button */}
          <button
            id="btn-templates"
            onClick={onOpenTemplateModal}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all border ${
              theme === 'light'
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-900'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
            }`}
            title="Modelos e Padrões Arquiteturais Prontos"
          >
            <LayoutTemplate className="w-3.5 h-3.5 text-sky-500" />
            <span className="hidden sm:inline">{t.nav.templates}</span>
          </button>

          {/* Segurança & Auditoria Dropdown */}
          <div className="relative">
            <button
              id="btn-security-menu"
              onClick={() => {
                setIsSecurityMenuOpen(!isSecurityMenuOpen);
                setIsMenuOpen(false);
                setIsExportOpen(false);
                setIsHelpOpen(false);
                setIsUserMenuOpen(false);
              }}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all border ${
                theme === 'light'
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-900'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
              }`}
              title="Auditoria de Segurança, Alta Disponibilidade e Linter de Topologia"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden md:inline">{t.nav.securityLinter}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isSecurityMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isSecurityMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/0 cursor-default"
                  onClick={() => setIsSecurityMenuOpen(false)}
                />
                <div className={`absolute left-0 mt-2 w-64 border rounded-xl shadow-2xl z-50 overflow-hidden py-1.5 transition-all ${
                  theme === 'light' ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#181B24] border-white/10 text-slate-100'
                }`}>
                  <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-white/5 mb-1">
                    Análise & Governança
                  </div>

                  <button
                    id="btn-ai-audit"
                    onClick={() => {
                      setIsSecurityMenuOpen(false);
                      onOpenAuditModal();
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center space-x-2.5 transition-colors ${
                      theme === 'light' ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-white/5 text-slate-200'
                    }`}
                  >
                    <div className="p-1.5 rounded-md bg-emerald-500/15 text-emerald-500">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs">Auditoria de Segurança & HA</div>
                      <div className="text-[10px] text-slate-500">Well-Architected, Resiliência e SLA</div>
                    </div>
                  </button>

                  {onOpenSecurityLinter && (
                    <button
                      id="btn-cloud-security-linter"
                      onClick={() => {
                        setIsSecurityMenuOpen(false);
                        onOpenSecurityLinter();
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center space-x-2.5 transition-colors ${
                        theme === 'light' ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-white/5 text-slate-200'
                      }`}
                    >
                      <div className="p-1.5 rounded-md bg-rose-500/15 text-rose-500">
                        <ShieldAlert className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs">Cloud Security Linter</div>
                        <div className="text-[10px] text-slate-500">Vulnerabilidades e mitigações ativas</div>
                      </div>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Calculadora de Custos */}
          <button
            id="btn-cost-calculator"
            onClick={onOpenCostModal}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all border ${
              theme === 'light'
                ? 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-950 font-bold'
                : 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-300'
            }`}
            title="Calculadora de Custos Mensais FinOps Multi-Cloud"
          >
            <DollarSign className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-amber-700' : 'text-amber-400'}`} />
            <span className="hidden sm:inline">{t.nav.costs}</span>
          </button>

          {/* Hub Unificado de Exportação & Propostas */}
          <div className="relative">
            <button
              id="btn-export-dropdown"
              onClick={() => {
                setIsExportOpen(!isExportOpen);
                setIsMenuOpen(false);
                setIsSecurityMenuOpen(false);
                setIsHelpOpen(false);
                setIsUserMenuOpen(false);
              }}
              className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-md text-xs font-bold shadow-sm transition-all"
              title="Central de Exportação: Propostas Word, PDF, Terraform IaC e Imagens"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.nav.export}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isExportOpen ? 'rotate-180' : ''}`} />
            </button>

            {isExportOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/0 cursor-default"
                  onClick={() => setIsExportOpen(false)}
                />
                <div className={`absolute right-0 mt-2 w-72 border rounded-xl shadow-2xl z-50 overflow-hidden py-1.5 transition-all ${
                  theme === 'light' ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#181B24] border-white/10 text-slate-100'
                }`}>
                  {/* Seção 1: Documentos & Propostas */}
                  <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-white/5 mb-1 flex items-center justify-between">
                    <span>Documentos & Propostas</span>
                    <span className="text-[9px] bg-blue-500/15 text-blue-500 px-1.5 py-0.5 rounded font-bold">Word / PDF</span>
                  </div>

                  {onOpenProposalModal && (
                    <>
                      <button
                        id="btn-opt-proposta-implementacao"
                        onClick={() => {
                          setIsExportOpen(false);
                          onOpenProposalModal('implementation');
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center space-x-2.5 transition-colors ${
                          theme === 'light' ? 'hover:bg-blue-50/70 text-slate-800' : 'hover:bg-white/5 text-slate-200'
                        }`}
                      >
                        <div className="p-1.5 rounded-md bg-blue-500/15 text-blue-500 shrink-0">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs">Proposta de Implementação (.docx)</div>
                          <div className="text-[10px] text-slate-500">Greenfield, escopo e Landing Zone</div>
                        </div>
                      </button>

                      <button
                        id="btn-opt-proposta-migracao"
                        onClick={() => {
                          setIsExportOpen(false);
                          onOpenProposalModal('migration');
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center space-x-2.5 transition-colors ${
                          theme === 'light' ? 'hover:bg-indigo-50/70 text-slate-800' : 'hover:bg-white/5 text-slate-200'
                        }`}
                      >
                        <div className="p-1.5 rounded-md bg-indigo-500/15 text-indigo-500 shrink-0">
                          <Rocket className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs">Proposta de Migração (.docx)</div>
                          <div className="text-[10px] text-slate-500">Framework 7 Rs e cutover seguro</div>
                        </div>
                      </button>
                    </>
                  )}

                  <button
                    id="btn-report-pdf"
                    onClick={handleExportPdf}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center space-x-2.5 transition-colors ${
                      theme === 'light' ? 'hover:bg-red-50/70 text-slate-800' : 'hover:bg-white/5 text-slate-200'
                    }`}
                  >
                    <div className="p-1.5 rounded-md bg-red-500/15 text-red-500 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs">Relatório Arquitetural (PDF)</div>
                      <div className="text-[10px] text-slate-500">Topologia com carimbo e inventário</div>
                    </div>
                  </button>

                  <button
                    id="btn-terraform-iac"
                    onClick={() => {
                      setIsExportOpen(false);
                      onOpenTerraformModal();
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center space-x-2.5 transition-colors ${
                      theme === 'light' ? 'hover:bg-emerald-50/70 text-slate-800' : 'hover:bg-white/5 text-slate-200'
                    }`}
                  >
                    <div className="p-1.5 rounded-md bg-emerald-500/15 text-emerald-500 shrink-0">
                      <Code className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs">Infraestrutura como Código (Terraform)</div>
                      <div className="text-[10px] text-slate-500">Código HCL (.tf) para provisionamento</div>
                    </div>
                  </button>

                  {/* Seção 2: Imagens & Vetores */}
                  <div className={`h-px my-1 ${theme === 'light' ? 'bg-slate-100' : 'bg-white/10'}`} />
                  <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Formatos Gráficos
                  </div>

                  <div className="grid grid-cols-3 gap-1 px-2 py-1">
                    <button
                      id="btn-export-png"
                      onClick={handleExportPng}
                      className={`px-2 py-1.5 text-xs rounded-md border text-center font-medium transition-colors ${
                        theme === 'light' ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800' : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                      }`}
                    >
                      <Image className="w-3.5 h-3.5 mx-auto mb-0.5 text-blue-500" />
                      <span>PNG</span>
                    </button>
                    <button
                      id="btn-export-jpg"
                      onClick={handleExportJpg}
                      className={`px-2 py-1.5 text-xs rounded-md border text-center font-medium transition-colors ${
                        theme === 'light' ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800' : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                      }`}
                    >
                      <Image className="w-3.5 h-3.5 mx-auto mb-0.5 text-emerald-500" />
                      <span>JPG</span>
                    </button>
                    <button
                      id="btn-export-svg"
                      onClick={handleExportSvg}
                      className={`px-2 py-1.5 text-xs rounded-md border text-center font-medium transition-colors ${
                        theme === 'light' ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800' : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5 mx-auto mb-0.5 text-purple-500" />
                      <span>SVG</span>
                    </button>
                  </div>

                  {/* Seção 3: Nuvem & Integrações */}
                  <div className={`h-px my-1 ${theme === 'light' ? 'bg-slate-100' : 'bg-white/10'}`} />
                  <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Sincronização
                  </div>

                  <button
                    id="btn-export-google-drive"
                    onClick={() => {
                      setIsExportOpen(false);
                      onOpenGoogleDriveModal();
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs flex items-center space-x-2 transition-colors ${
                      theme === 'light' ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-white/5 text-slate-200'
                    }`}
                  >
                    <HardDrive className="w-3.5 h-3.5 text-blue-500" />
                    <span>Salvar no Google Drive</span>
                  </button>

                  {onOpenGmailModal && (
                    <button
                      id="btn-export-gmail"
                      onClick={() => {
                        setIsExportOpen(false);
                        onOpenGmailModal();
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs flex items-center space-x-2 transition-colors ${
                        theme === 'light' ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-white/5 text-slate-200'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5 text-rose-500" />
                      <span>Enviar por Gmail</span>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Section: Presentation Mode, Zoom Controls & Clear Canvas */}
        <div className="flex items-center space-x-2 shrink-0">
          {onEnterPresentationMode && (
            <button
              id="btn-presentation-mode"
              onClick={onEnterPresentationMode}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all border shadow-sm ${
                theme === 'light'
                  ? 'bg-purple-50 hover:bg-purple-100 border-purple-300 text-purple-950 font-bold'
                  : 'bg-purple-500/15 hover:bg-purple-500/25 border-purple-500/30 text-purple-300'
              }`}
              title="Modo de Apresentação em Tela Cheia (Navegação limpa para reuniões e clientes)"
            >
              <Presentation className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-purple-700' : 'text-purple-400'}`} />
              <span className="hidden sm:inline">Apresentação</span>
            </button>
          )}

          {/* Zoom Controls */}
          <div className={`flex items-center rounded-md p-0.5 border text-xs ${
            theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-black/40 border-white/5'
          }`}>
            <button
              id="btn-zoom-out"
              onClick={() => setZoom((z) => Math.max(0.4, z - 0.1))}
              className={`p-1.5 rounded ${theme === 'light' ? 'hover:bg-slate-200 text-slate-800' : 'hover:bg-white/10 text-slate-300'}`}
              title="Diminuir Zoom"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className={`px-1.5 font-mono text-[11px] min-w-[2.2rem] text-center font-bold ${
              theme === 'light' ? 'text-slate-950' : 'text-white'
            }`}>
              {Math.round(zoom * 100)}%
            </span>
            <button
              id="btn-zoom-in"
              onClick={() => setZoom((z) => Math.min(2.0, z + 0.1))}
              className={`p-1.5 rounded ${theme === 'light' ? 'hover:bg-slate-200 text-slate-800' : 'hover:bg-white/10 text-slate-300'}`}
              title="Aumentar Zoom"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              id="btn-reset-zoom"
              onClick={onResetZoom}
              title="Ajustar à Tela"
              className={`p-1.5 rounded ${theme === 'light' ? 'hover:bg-slate-200 text-slate-800' : 'hover:bg-white/10 text-slate-300'}`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Limpar Canvas Button */}
          <button
            id="btn-clear-canvas"
            onClick={onClearCanvas}
            title="Limpar Canvas (Remover todos os componentes)"
            aria-label="Limpar Canvas"
            className={`p-1.5 rounded-md border text-xs transition-colors flex items-center justify-center ${
              theme === 'light'
                ? 'bg-slate-100 border-slate-200 hover:bg-red-50 hover:border-red-200 text-red-600'
                : 'bg-black/40 border-white/5 hover:bg-red-500/20 text-red-400'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Hidden File Input for JSON Import */}
          <input
            id="input-import-json"
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={onImportJson}
            className="hidden"
          />
        </div>
      </div>
    </header>
  );
};

