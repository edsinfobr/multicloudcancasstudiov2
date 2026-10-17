import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  FileSignature,
  User,
  Briefcase,
  Building2,
  Eye,
  EyeOff,
  Save,
  CheckCircle2,
  Cloud,
  Sparkles,
  SlidersHorizontal,
  RotateCcw,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { DiagramState, DefaultStampPreferences } from '../types';

interface ProfilePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagram: DiagramState;
  setDiagram: React.Dispatch<React.SetStateAction<DiagramState>>;
  currentTheme?: 'dark' | 'light';
  theme?: 'dark' | 'light';
  onSetTheme?: (theme: 'dark' | 'light') => void;
  onThemeChange?: (theme: 'dark' | 'light') => void;
  leftSidebarCollapsed?: boolean;
  setLeftSidebarCollapsed?: (collapsed: boolean) => void;
  rightSidebarCollapsed?: boolean;
  setRightSidebarCollapsed?: (collapsed: boolean) => void;
  onRecordHistory?: () => void;
  showToast?: (message: string) => void;
}

export const ProfilePreferencesModal: React.FC<ProfilePreferencesModalProps> = ({
  isOpen,
  onClose,
  diagram,
  setDiagram,
  currentTheme,
  theme,
  onSetTheme,
  onThemeChange,
  leftSidebarCollapsed = false,
  setLeftSidebarCollapsed,
  rightSidebarCollapsed = false,
  setRightSidebarCollapsed,
  onRecordHistory,
  showToast
}) => {
  const { currentUser, userPreferences, updatePreferences } = useAuth();
  const effectiveTheme: 'dark' | 'light' = currentTheme || theme || 'light';
  const isLight = effectiveTheme === 'light';

  // Active section tab
  const [activeTab, setActiveTab] = useState<'theme' | 'sidebars' | 'stamp'>('stamp');

  // Form states initialized from userPreferences or sensible defaults
  const [prefTheme, setPrefTheme] = useState<'dark' | 'light'>(effectiveTheme);
  const [prefLeftCollapsed, setPrefLeftCollapsed] = useState(leftSidebarCollapsed);
  const [prefRightCollapsed, setPrefRightCollapsed] = useState(rightSidebarCollapsed);
  
  // Default Stamp state
  const [stampAuthor, setStampAuthor] = useState('');
  const [stampRole, setStampRole] = useState('');
  const [stampCompany, setStampCompany] = useState('');
  const [stampShowOnCanvas, setStampShowOnCanvas] = useState(true);

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state when modal opens or userPreferences change
  useEffect(() => {
    if (isOpen) {
      setPrefTheme(userPreferences?.theme || effectiveTheme);
      setPrefLeftCollapsed(userPreferences?.leftSidebarCollapsed ?? leftSidebarCollapsed ?? false);
      setPrefRightCollapsed(userPreferences?.rightSidebarCollapsed ?? rightSidebarCollapsed ?? false);

      const existingStamp = userPreferences?.defaultStamp;
      setStampAuthor(
        existingStamp?.author ??
        userPreferences?.displayName ??
        currentUser?.displayName ??
        currentUser?.email?.split('@')[0] ??
        ''
      );
      setStampRole(existingStamp?.role ?? 'Arquiteto de Soluções Cloud');
      setStampCompany(existingStamp?.company ?? '');
      setStampShowOnCanvas(existingStamp?.showOnCanvas ?? true);
      setSaveSuccess(false);
    }
  }, [isOpen, userPreferences, effectiveTheme, leftSidebarCollapsed, rightSidebarCollapsed, currentUser]);

  if (!isOpen) return null;

  const handleSavePreferences = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const updatedStamp: DefaultStampPreferences = {
        author: stampAuthor.trim(),
        role: stampRole.trim(),
        company: stampCompany.trim(),
        showOnCanvas: stampShowOnCanvas
      };

      // 1. Update Profile in LocalStorage and in Firestore (if logged in)
      await updatePreferences({
        theme: prefTheme,
        leftSidebarCollapsed: prefLeftCollapsed,
        rightSidebarCollapsed: prefRightCollapsed,
        defaultStamp: updatedStamp
      });

      // 2. Safely apply theme & sidebar states to current live session
      if (typeof onSetTheme === 'function') {
        onSetTheme(prefTheme);
      } else if (typeof onThemeChange === 'function') {
        onThemeChange(prefTheme);
      }

      if (typeof setLeftSidebarCollapsed === 'function') {
        setLeftSidebarCollapsed(prefLeftCollapsed);
      }

      if (typeof setRightSidebarCollapsed === 'function') {
        setRightSidebarCollapsed(prefRightCollapsed);
      }

      setSaveSuccess(true);
      if (showToast) {
        showToast(
          currentUser
            ? 'Preferências salvas e sincronizadas na nuvem!'
            : 'Preferências salvas com sucesso no seu navegador!'
        );
      }

      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (err: any) {
      console.error('Failed to save preferences:', err);
      if (showToast) {
        showToast(`Erro ao salvar preferências: ${err?.message || 'Verifique sua conexão.'}`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Quick Action: Apply current default stamp to the active diagram
  const handleApplyStampToCurrentDiagram = () => {
    if (typeof onRecordHistory === 'function') {
      onRecordHistory();
    }
    setDiagram((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        author: stampAuthor.trim() || prev.metadata?.author || '',
        role: stampRole.trim() || prev.metadata?.role || '',
        company: stampCompany.trim() || prev.metadata?.company || '',
        showOnCanvas: stampShowOnCanvas,
        date: prev.metadata?.date || new Date().toLocaleDateString('pt-BR'),
        project: prev.metadata?.project || prev.title,
        x: prev.metadata?.x ?? 30,
        y: prev.metadata?.y ?? 30,
        tags: prev.metadata?.tags || []
      }
    }));

    if (showToast) {
      showToast('Carimbo padrão aplicado na arquitetura atual!');
    }
  };

  // Quick Action: Capture data from current diagram metadata into the default stamp form
  const handleCaptureFromCurrentDiagram = () => {
    if (diagram.metadata) {
      if (diagram.metadata.author) setStampAuthor(diagram.metadata.author);
      if (diagram.metadata.role) setStampRole(diagram.metadata.role);
      if (diagram.metadata.company) setStampCompany(diagram.metadata.company);
      if (diagram.metadata.showOnCanvas !== undefined) setStampShowOnCanvas(diagram.metadata.showOnCanvas);
      if (showToast) {
        showToast('Dados do diagrama atual importados para o formulário!');
      }
    } else {
      if (showToast) {
        showToast('O diagrama atual não possui dados de carimbo.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#12141A] border-white/10 text-slate-100'
        }`}
      >
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between ${
          isLight ? 'border-slate-200 bg-slate-50/80' : 'border-white/5 bg-[#0e1017]'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold tracking-tight">Preferências do Perfil</h2>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border flex items-center space-x-1 ${
                  currentUser
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-500'
                    : 'bg-amber-500/15 border-amber-500/30 text-amber-500'
                }`}>
                  <Cloud className="w-2.5 h-2.5" />
                  <span>{currentUser ? 'Perfil Conectado' : 'Modo Convidado'}</span>
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {currentUser ? `${currentUser.email} • Salvo na nuvem MultiCloud Canvas` : 'Faça login para sincronizar suas preferências em qualquer dispositivo'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isLight ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-200' : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            title="Fechar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className={`px-5 pt-3 border-b flex space-x-2 ${
          isLight ? 'border-slate-200 bg-slate-50/50' : 'border-white/5 bg-[#0e1017]/50'
        }`}>
          <button
            id="tab-btn-pref-stamp"
            onClick={() => setActiveTab('stamp')}
            className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'stamp'
                ? 'border-blue-500 text-blue-500'
                : isLight
                ? 'border-transparent text-slate-500 hover:text-slate-900'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FileSignature className="w-4 h-4" />
            <span>Carimbo do Diagrama Padrão</span>
          </button>

          <button
            id="tab-btn-pref-theme"
            onClick={() => setActiveTab('theme')}
            className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'theme'
                ? 'border-blue-500 text-blue-500'
                : isLight
                ? 'border-transparent text-slate-500 hover:text-slate-900'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {prefTheme === 'dark' ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <span>Tema (Claro / Escuro)</span>
          </button>

          <button
            id="tab-btn-pref-sidebars"
            onClick={() => setActiveTab('sidebars')}
            className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'sidebars'
                ? 'border-blue-500 text-blue-500'
                : isLight
                ? 'border-transparent text-slate-500 hover:text-slate-900'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Menus Laterais</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-5">
          {/* TAB 1: CARIMBO PADRÃO */}
          {activeTab === 'stamp' && (
            <div className="space-y-4 animate-fade-in">
              <div className={`p-3.5 rounded-xl border flex items-start space-x-3 ${
                isLight ? 'bg-blue-50/70 border-blue-200 text-blue-900' : 'bg-blue-500/10 border-blue-500/20 text-blue-200'
              }`}>
                <Sparkles className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <p className="font-bold">Padronização Automática para Todos os Desenhos</p>
                  <p className="opacity-90 mt-0.5">
                    Os dados definidos abaixo serão aplicados automaticamente sempre que você criar uma nova arquitetura ou desenho no MultiCloud Canvas Studio.
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Autor Padrão */}
                <div className="space-y-1">
                  <label className={`block text-xs font-semibold flex items-center space-x-1.5 ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}>
                    <User className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Autor Padrão</span>
                  </label>
                  <input
                    id="input-pref-stamp-author"
                    type="text"
                    value={stampAuthor}
                    onChange={(e) => setStampAuthor(e.target.value)}
                    placeholder="Ex: Edson Silva"
                    maxLength={100}
                    className={`w-full border rounded-xl px-3 py-2 text-xs outline-none transition-colors ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500 focus:bg-white'
                        : 'bg-black/40 border-white/10 text-slate-100 focus:border-blue-500'
                    }`}
                  />
                  <p className="text-[10px] text-slate-500">Nome exibido na assinatura técnica dos diagramas</p>
                </div>

                {/* Cargo Padrão */}
                <div className="space-y-1">
                  <label className={`block text-xs font-semibold flex items-center space-x-1.5 ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}>
                    <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                    <span>Cargo / Especialidade Padrão</span>
                  </label>
                  <input
                    id="input-pref-stamp-role"
                    type="text"
                    value={stampRole}
                    onChange={(e) => setStampRole(e.target.value)}
                    placeholder="Ex: Arquiteto de Soluções Multi-Cloud"
                    maxLength={100}
                    className={`w-full border rounded-xl px-3 py-2 text-xs outline-none transition-colors ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500 focus:bg-white'
                        : 'bg-black/40 border-white/10 text-slate-100 focus:border-blue-500'
                    }`}
                  />
                  <p className="text-[10px] text-slate-500">Ex: Arquiteto Cloud, Tech Lead, DevOps Engineer</p>
                </div>

                {/* Empresa / Organização Padrão */}
                <div className="space-y-1 md:col-span-2">
                  <label className={`block text-xs font-semibold flex items-center space-x-1.5 ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}>
                    <Building2 className="w-3.5 h-3.5 text-purple-500" />
                    <span>Empresa / Organização Padrão</span>
                  </label>
                  <input
                    id="input-pref-stamp-company"
                    type="text"
                    value={stampCompany}
                    onChange={(e) => setStampCompany(e.target.value)}
                    placeholder="Ex: EdsInfoBR - Consultoria Cloud & IA"
                    maxLength={100}
                    className={`w-full border rounded-xl px-3 py-2 text-xs outline-none transition-colors ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500 focus:bg-white'
                        : 'bg-black/40 border-white/10 text-slate-100 focus:border-blue-500'
                    }`}
                  />
                  <p className="text-[10px] text-slate-500">Nome da consultoria, empresa ou departamento padrão</p>
                </div>
              </div>

              {/* Visibilidade do Carimbo por padrão */}
              <div className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    stampShowOnCanvas
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : isLight ? 'bg-slate-200 text-slate-600' : 'bg-white/10 text-slate-400'
                  }`}>
                    {stampShowOnCanvas ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">Exibir Carimbo no Canvas por Padrão</h4>
                    <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Se ativo, os novos desenhos já serão criados com a caixa de identificação visível no canto do diagrama
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  id="toggle-pref-stamp-show-canvas"
                  onClick={() => setStampShowOnCanvas(!stampShowOnCanvas)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    stampShowOnCanvas ? 'bg-blue-600' : isLight ? 'bg-slate-300' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      stampShowOnCanvas ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Stamp Live Preview Card */}
              <div className="space-y-1.5">
                <span className={`text-[11px] font-bold uppercase tracking-wider ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Prévia do Carimbo Padronizado:
                </span>
                <div className={`p-4 rounded-xl border shadow-md flex flex-col space-y-2 ${
                  isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#181c28] border-white/15 text-slate-100'
                }`}>
                  <div className="flex items-center justify-between pb-1.5 border-b border-blue-500/20">
                    <span className="text-[10px] font-bold uppercase text-blue-500 flex items-center space-x-1">
                      <FileSignature className="w-3 h-3" />
                      <span>Carimbo Oficial do Diagrama</span>
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-semibold">
                      {stampShowOnCanvas ? 'Visível no Canvas' : 'Oculto por padrão'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="block text-[9px] uppercase text-slate-500 font-bold">Autor</span>
                      <span className="font-bold truncate">{stampAuthor || '— (Defina o autor)'}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-slate-500 font-bold">Cargo</span>
                      <span className="font-bold truncate">{stampRole || '— (Defina o cargo)'}</span>
                    </div>
                    {stampCompany && (
                      <div className="col-span-2 pt-1 border-t border-white/5">
                        <span className="block text-[9px] uppercase text-slate-500 font-bold">Organização</span>
                        <span className="font-bold truncate">{stampCompany}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Diagram Context Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  id="btn-apply-stamp-current"
                  onClick={handleApplyStampToCurrentDiagram}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    isLight
                      ? 'bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-300'
                      : 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border-blue-500/40'
                  }`}
                  title="Aplica estes dados diretamente nos metadados da arquitetura em edição"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Aplicar no Diagrama Atual Agora</span>
                </button>

                <button
                  type="button"
                  id="btn-capture-stamp-current"
                  onClick={handleCaptureFromCurrentDiagram}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                  }`}
                  title="Copia autor e cargo da arquitetura atualmente aberta no canvas"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Copiar do Diagrama Atual</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: TEMA CLARO OU ESCURO */}
          {activeTab === 'theme' && (
            <div className="space-y-4 animate-fade-in">
              <div className={`p-3.5 rounded-xl border flex items-start space-x-3 ${
                isLight ? 'bg-amber-50/70 border-amber-200 text-amber-950' : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-200'
              }`}>
                {prefTheme === 'dark' ? (
                  <Moon className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                ) : (
                  <Sun className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                )}
                <div className="text-xs leading-relaxed">
                  <p className="font-bold">Preferência Pessoal de Interface</p>
                  <p className="opacity-90 mt-0.5">
                    Escolha se deseja trabalhar prioritariamente com o modo escuro de alto contraste ou o modo claro profissional. Sua escolha será lembrada sempre que fizer login.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Opção Modo Escuro */}
                <div
                  id="option-theme-dark"
                  onClick={() => setPrefTheme('dark')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    prefTheme === 'dark'
                      ? 'border-indigo-500 bg-indigo-950/40 shadow-lg shadow-indigo-500/10'
                      : isLight
                      ? 'border-slate-200 bg-slate-50 hover:border-slate-300'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-lg bg-indigo-900/60 text-indigo-300">
                          <Moon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-white">Modo Escuro (Dark)</span>
                      </div>
                      {prefTheme === 'dark' && (
                        <span className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    {/* Visual Mockup Dark */}
                    <div className="w-full h-20 rounded-lg bg-[#0e1017] border border-white/15 p-2 flex flex-col justify-between">
                      <div className="h-2.5 w-1/3 bg-blue-500/40 rounded" />
                      <div className="flex space-x-2">
                        <div className="h-9 w-12 bg-white/10 rounded border border-white/10" />
                        <div className="h-9 flex-1 bg-white/5 rounded border border-white/10" />
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-3">
                    Recomendado para ambientes com pouca luz e longas jornadas de modelagem técnica.
                  </p>
                </div>

                {/* Opção Modo Claro */}
                <div
                  id="option-theme-light"
                  onClick={() => setPrefTheme('light')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    prefTheme === 'light'
                      ? 'border-amber-500 bg-amber-50 shadow-lg shadow-amber-500/10 text-slate-900'
                      : isLight
                      ? 'border-slate-200 bg-slate-50 hover:border-slate-300'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                          <Sun className="w-4 h-4" />
                        </div>
                        <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                          Modo Claro (Light)
                        </span>
                      </div>
                      {prefTheme === 'light' && (
                        <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    {/* Visual Mockup Light */}
                    <div className="w-full h-20 rounded-lg bg-white border border-slate-300 p-2 flex flex-col justify-between shadow-sm">
                      <div className="h-2.5 w-1/3 bg-blue-600 rounded" />
                      <div className="flex space-x-2">
                        <div className="h-9 w-12 bg-slate-100 rounded border border-slate-300" />
                        <div className="h-9 flex-1 bg-slate-50 rounded border border-slate-300" />
                      </div>
                    </div>
                  </div>
                  <p className={`text-[11px] mt-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Ideal para apresentações para clientes, exportações de relatórios e luz natural.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MENUS LATERAIS CONTRAÍDOS OU EXPANDIDOS */}
          {activeTab === 'sidebars' && (
            <div className="space-y-4 animate-fade-in">
              <div className={`p-3.5 rounded-xl border flex items-start space-x-3 ${
                isLight ? 'bg-purple-50/70 border-purple-200 text-purple-900' : 'bg-purple-500/10 border-purple-500/20 text-purple-200'
              }`}>
                <Layers className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <p className="font-bold">Comportamento Inicial do Espaço de Trabalho</p>
                  <p className="opacity-90 mt-0.5">
                    Configure se as barras laterais devem iniciar abertas (expandidas) para acesso imediato às ferramentas ou recolhidas (contraídas) para dar máxima área útil ao canvas.
                  </p>
                </div>
              </div>

              {/* Menu Lateral Esquerdo */}
              <div className={`p-4 rounded-xl border transition-all ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-lg ${
                      prefLeftCollapsed
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {prefLeftCollapsed ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold flex items-center space-x-2">
                        <span>Menu Lateral Esquerdo (Catálogo de Recursos & Provedores)</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                          prefLeftCollapsed
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                            : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                        }`}>
                          {prefLeftCollapsed ? 'Contraído por Padrão' : 'Expandido por Padrão'}
                        </span>
                      </h4>
                      <p className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Contém a paleta de serviços da AWS, Azure, GCP e OCI, além dos containers de rede VPC e Subnets.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    id="toggle-pref-left-sidebar"
                    onClick={() => setPrefLeftCollapsed(!prefLeftCollapsed)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      prefLeftCollapsed ? 'bg-amber-500' : isLight ? 'bg-blue-600' : 'bg-blue-600'
                    }`}
                    title={prefLeftCollapsed ? 'Alternar para Expandido' : 'Alternar para Contraído'}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        prefLeftCollapsed ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Menu Lateral Direito */}
              <div className={`p-4 rounded-xl border transition-all ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-lg ${
                      prefRightCollapsed
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-indigo-500/20 text-indigo-400'
                    }`}>
                      {prefRightCollapsed ? <PanelRightClose className="w-5 h-5" /> : <PanelRightOpen className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold flex items-center space-x-2">
                        <span>Menu Lateral Direito (Inspetor de Propriedades & IaC)</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                          prefRightCollapsed
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                            : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                        }`}>
                          {prefRightCollapsed ? 'Contraído por Padrão' : 'Expandido por Padrão'}
                        </span>
                      </h4>
                      <p className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Exibe o painel de especificações de nós, instâncias, protocolos de rede e tags de recursos.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    id="toggle-pref-right-sidebar"
                    onClick={() => setPrefRightCollapsed(!prefRightCollapsed)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      prefRightCollapsed ? 'bg-amber-500' : isLight ? 'bg-indigo-600' : 'bg-indigo-600'
                    }`}
                    title={prefRightCollapsed ? 'Alternar para Expandido' : 'Alternar para Contraído'}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        prefRightCollapsed ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Save Action */}
        <div className={`p-4 border-t flex items-center justify-between gap-3 ${
          isLight ? 'border-slate-200 bg-slate-50' : 'border-white/5 bg-[#0e1017]'
        }`}>
          <div className="flex items-center space-x-2">
            {saveSuccess ? (
              <span className="flex items-center space-x-1.5 text-xs text-emerald-500 font-semibold animate-pulse">
                <CheckCircle2 className="w-4 h-4" />
                <span>Salvo e sincronizado no Firestore!</span>
              </span>
            ) : (
              <span className="text-[11px] text-slate-500">
                Alterações salvas ficam vinculadas à sua conta de usuário.
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                isLight ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              Cancelar
            </button>

            <button
              type="button"
              id="btn-save-profile-preferences"
              onClick={handleSavePreferences}
              disabled={isSaving}
              className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-95 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Salvando na Nuvem...' : 'Salvar Preferências'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
