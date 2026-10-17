import React, { useState } from 'react';
import {
  Cloud,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Cpu,
  DollarSign,
  FileCode2,
  Layers,
  Sun,
  Moon,
  Sparkles,
  ArrowLeft,
  KeyRound,
  ExternalLink,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LATEST_APP_VERSION } from '../data/changelogData';

interface AuthScreenProps {
  onContinueAsGuest?: () => void;
  theme: 'dark' | 'light';
  onToggleTheme?: () => void;
  onOpenChangelog?: () => void;
  onOpenDocumentation?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onContinueAsGuest,
  theme,
  onToggleTheme,
  onOpenChangelog,
  onOpenDocumentation,
}) => {
  const isLight = theme === 'light';
  const {
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    sendPasswordReset,
    authError,
    authErrorCode,
    clearAuthError,
    firebaseProjectId,
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [localMessage, setLocalMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showFirebaseHelp, setShowFirebaseHelp] = useState(false);

  const firebaseConsoleUrl = `https://console.firebase.google.com/project/${firebaseProjectId || 'gen-lang-client-0483065225'}/authentication/providers`;
  const isOperationNotAllowed =
    authErrorCode === 'auth/operation-not-allowed' ||
    (authError && authError.includes('Sign-in method'));

  const handleModeChange = (newMode: 'login' | 'signup' | 'reset') => {
    setMode(newMode);
    clearAuthError();
    setLocalMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalMessage(null);
    clearAuthError();

    if (!email.trim()) {
      setLocalMessage({ type: 'error', text: 'Por favor, informe seu endereço de e-mail.' });
      return;
    }

    if (mode === 'reset') {
      try {
        setSubmitting(true);
        await sendPasswordReset(email.trim());
        setLocalMessage({
          type: 'success',
          text: 'E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada.',
        });
      } catch (err: any) {
        setLocalMessage({ type: 'error', text: err.message || 'Falha ao enviar e-mail de recuperação.' });
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (!password) {
      setLocalMessage({ type: 'error', text: 'Por favor, insira sua senha.' });
      return;
    }

    if (mode === 'signup') {
      if (password.length < 6) {
        setLocalMessage({ type: 'error', text: 'A senha deve conter no mínimo 6 caracteres.' });
        return;
      }
      if (password !== confirmPassword) {
        setLocalMessage({ type: 'error', text: 'As senhas informadas não coincidem.' });
        return;
      }
    }

    try {
      setSubmitting(true);
      if (mode === 'login') {
        await signInWithEmail(email.trim(), password);
      } else {
        await signUpWithEmail(email.trim(), password, displayName.trim());
        setLocalMessage({
          type: 'success',
          text: 'Conta criada com sucesso! Redirecionando para o estúdio...',
        });
      }
    } catch (err: any) {
      setLocalMessage({ type: 'error', text: err.message || 'Erro ao processar autenticação.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLocalMessage(null);
    clearAuthError();
    try {
      setSubmitting(true);
      await signInWithGoogle();
    } catch (err: any) {
      setLocalMessage({ type: 'error', text: err.message || 'Erro ao autenticar com o Google.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      id="auth-screen-container"
      className={`min-h-screen w-screen flex flex-col font-sans transition-colors relative overflow-x-hidden ${
        isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#090B10] text-slate-100'
      }`}
    >
      {/* Background Decorative Grid & Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: isLight
              ? 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/3 -right-40 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: isLight
              ? 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: isLight
              ? 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Top Header Bar */}
      <header
        className={`w-full h-16 px-6 lg:px-12 flex items-center justify-between border-b shrink-0 z-10 backdrop-blur-md ${
          isLight ? 'bg-white/80 border-slate-200/80' : 'bg-[#0E1118]/80 border-white/10'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold tracking-tight text-sm sm:text-base">
                MultiCloud Canvas Studio
              </span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                v2.4 Cloud
              </span>
            </div>
            <p className={`text-[11px] hidden sm:block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Modelagem de Arquitetura MultiCloud e Documentação de Sistemas
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Cloud Provider Badges */}
          <div
            className={`hidden md:flex items-center space-x-1 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase ${
              isLight ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-white/5 border-white/10 text-slate-300'
            }`}
          >
            <span className="text-amber-500 font-bold">AWS</span>
            <span className="opacity-30">•</span>
            <span className="text-sky-500 font-bold">AZURE</span>
            <span className="opacity-30">•</span>
            <span className="text-emerald-500 font-bold">GCP</span>
            <span className="opacity-30">•</span>
            <span className="text-red-500 font-bold">OCI</span>
          </div>

          {/* Documentation Button */}
          {onOpenDocumentation && (
            <button
              id="btn-auth-open-docs"
              type="button"
              onClick={onOpenDocumentation}
              title="Manual e Documentação do Produto"
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                isLight
                  ? 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800'
                  : 'bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30 text-blue-300'
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span className="hidden sm:inline">Documentação</span>
            </button>
          )}

          {/* Theme Toggle Button */}
          {onToggleTheme && (
            <button
              id="btn-auth-theme-toggle"
              type="button"
              onClick={onToggleTheme}
              title={isLight ? 'Mudar para Modo Escuro' : 'Mudar para Modo Claro'}
              className={`p-2 rounded-xl border transition-all ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
              }`}
            >
              {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          )}
        </div>
      </header>

      {/* Main Hero & Auth Split Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 z-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & Cloud Capabilities */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Plataforma Corporativa de Arquitetura</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                Modele e projete sistemas com precisão{' '}
                <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                  MultiCloud
                </span>
              </h1>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Acesse suas arquiteturas salvas na nuvem com autenticação segura. Projete diagramas para AWS, Azure, Google Cloud e Oracle Cloud com estimativa de custos e geração de IaC.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  isLight ? 'bg-white/90 border-slate-200 shadow-sm' : 'bg-white/[0.03] border-white/10'
                }`}
              >
                <div className="flex items-center space-x-2.5 text-blue-500 font-bold text-xs">
                  <Layers className="w-4 h-4 shrink-0" />
                  <span>Diagramas MultiCloud</span>
                </div>
                <p className={`text-[11px] mt-1 leading-snug ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Centenas de ícones oficiais categorizados por provedor com agrupamento inteligente.
                </p>
              </div>

              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  isLight ? 'bg-white/90 border-slate-200 shadow-sm' : 'bg-white/[0.03] border-white/10'
                }`}
              >
                <div className="flex items-center space-x-2.5 text-amber-500 font-bold text-xs">
                  <DollarSign className="w-4 h-4 shrink-0" />
                  <span>Calculadora FinOps</span>
                </div>
                <p className={`text-[11px] mt-1 leading-snug ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Estimativa automática de custos mensais em tempo real conforme a topologia desenhada.
                </p>
              </div>

              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  isLight ? 'bg-white/90 border-slate-200 shadow-sm' : 'bg-white/[0.03] border-white/10'
                }`}
              >
                <div className="flex items-center space-x-2.5 text-indigo-500 font-bold text-xs">
                  <FileCode2 className="w-4 h-4 shrink-0" />
                  <span>Exportação IaC & Docs</span>
                </div>
                <p className={`text-[11px] mt-1 leading-snug ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Geração instantânea de scripts Terraform (.tf) e propostas técnicas em Word (.docx).
                </p>
              </div>

              <div
                className={`p-3.5 rounded-xl border transition-all ${
                  isLight ? 'bg-white/90 border-slate-200 shadow-sm' : 'bg-white/[0.03] border-white/10'
                }`}
              >
                <div className="flex items-center space-x-2.5 text-emerald-500 font-bold text-xs">
                  <Cloud className="w-4 h-4 shrink-0" />
                  <span>Sincronização Firestore</span>
                </div>
                <p className={`text-[11px] mt-1 leading-snug ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Seus diagramas, versões e preferências salvos na sua conta e acessíveis de qualquer lugar.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Card */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto">
            <div
              id="auth-card"
              className={`rounded-2xl border shadow-2xl overflow-hidden transition-all relative ${
                isLight
                  ? 'bg-white border-slate-200/90 text-slate-900 shadow-slate-300/40'
                  : 'bg-[#11141D] border-white/10 text-slate-100 shadow-black/60'
              }`}
            >
              {/* Decorative Accent Top Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

              <div className="p-6 sm:p-8 space-y-5">
                {/* Header Titles */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-xl font-bold tracking-tight">
                      {mode === 'login' && 'Entrar na sua Conta'}
                      {mode === 'signup' && 'Criar Nova Conta'}
                      {mode === 'reset' && 'Redefinir Senha'}
                    </h2>
                    {mode === 'reset' && (
                      <button
                        type="button"
                        onClick={() => handleModeChange('login')}
                        className="text-xs text-blue-500 hover:text-blue-400 flex items-center space-x-1 font-medium"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Voltar</span>
                      </button>
                    )}
                  </div>
                  <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {mode === 'login' && 'Digite suas credenciais para acessar o estúdio e seus diagramas.'}
                    {mode === 'signup' && 'Crie sua conta para sincronizar projetos na nuvem Firestore.'}
                    {mode === 'reset' && 'Informe seu e-mail cadastrado para receber o link de redefinição.'}
                  </p>
                </div>

                {/* Mode Selector Tabs */}
                {mode !== 'reset' && (
                  <div className="space-y-1.5">
                    <div
                      className={`grid grid-cols-2 p-1 rounded-xl border text-xs font-semibold ${
                        isLight ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <button
                        id="tab-auth-login"
                        type="button"
                        onClick={() => handleModeChange('login')}
                        className={`py-2 rounded-lg transition-all ${
                          mode === 'login'
                            ? isLight
                              ? 'bg-white text-blue-600 shadow-sm font-bold'
                              : 'bg-blue-600 text-white shadow-sm font-bold'
                            : isLight
                            ? 'text-slate-600 hover:text-slate-900'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Entrar
                      </button>
                      <button
                        id="tab-auth-signup"
                        type="button"
                        onClick={() => handleModeChange('signup')}
                        className={`py-2 rounded-lg transition-all ${
                          mode === 'signup'
                            ? isLight
                              ? 'bg-white text-blue-600 shadow-sm font-bold'
                              : 'bg-blue-600 text-white shadow-sm font-bold'
                            : isLight
                            ? 'text-slate-600 hover:text-slate-900'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Cadastrar-se
                      </button>
                    </div>

                    <div className="flex justify-end pr-0.5">
                      <button
                        type="button"
                        onClick={() => setShowFirebaseHelp(!showFirebaseHelp)}
                        className={`text-[10px] flex items-center space-x-1 font-medium transition-colors ${
                          isLight ? 'text-slate-500 hover:text-blue-600' : 'text-slate-400 hover:text-blue-400'
                        }`}
                      >
                        <HelpCircle className="w-3 h-3" />
                        <span>Como ativar E-mail no Firebase?</span>
                        {showFirebaseHelp ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Dedicated Firebase Console Provider Activation Box */}
                {(isOperationNotAllowed || showFirebaseHelp) && (
                  <div
                    id="firebase-provider-help-box"
                    className={`p-4 rounded-xl border transition-all text-xs ${
                      isLight
                        ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-sm'
                        : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                    }`}
                  >
                    <div className="flex items-start space-x-2.5">
                      <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs">
                            Ativar Login por E-mail no Firebase Console
                          </h4>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                            isLight ? 'bg-amber-100 text-amber-800' : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {firebaseProjectId}
                          </span>
                        </div>
                        <p className={`text-[11px] leading-relaxed ${isLight ? 'text-amber-900' : 'text-amber-200/90'}`}>
                          No Firebase, o método <strong>E-mail/senha</strong> vem desabilitado inicialmente por padrão. Siga os 3 passos para ativá-lo:
                        </p>
                        <ol className={`text-[11px] list-decimal list-inside space-y-1 ${isLight ? 'text-amber-950 font-medium' : 'text-amber-200'}`}>
                          <li>Clique no botão abaixo para abrir a tela de <strong>Sign-in method</strong>.</li>
                          <li>Clique sobre a linha do provedor <strong>E-mail/senha (Email/Password)</strong>.</li>
                          <li>Ative a primeira opção <strong>Habilitar (Enable)</strong> e clique em <strong>Salvar</strong>.</li>
                        </ol>
                        <div className="pt-1.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                          <a
                            id="btn-open-firebase-console"
                            href={firebaseConsoleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-sm transition-colors"
                          >
                            <span>Abrir Firebase Console</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className={`inline-flex items-center justify-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                              isLight
                                ? 'bg-white hover:bg-amber-100/60 border-amber-300 text-amber-950'
                                : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                            }`}
                          >
                            <span>Ou Entrar com Google</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Status Messages (if not showing operation-not-allowed) */}
                {(localMessage || (authError && !isOperationNotAllowed)) && (
                  <div
                    className={`p-3 rounded-xl flex items-start space-x-2.5 text-xs ${
                      localMessage?.type === 'success'
                        ? isLight
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/50'
                        : isLight
                        ? 'bg-rose-50 text-rose-800 border border-rose-200'
                        : 'bg-rose-950/40 text-rose-300 border border-rose-800/50'
                    }`}
                  >
                    {localMessage?.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <span className="flex-1 leading-snug">
                      {localMessage?.text || authError}
                    </span>
                  </div>
                )}

                {/* Form Elements */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {mode === 'signup' && (
                    <div>
                      <label
                        className={`block text-xs font-semibold mb-1.5 ${
                          isLight ? 'text-slate-700' : 'text-slate-300'
                        }`}
                      >
                        Nome Completo ou Apelido
                      </label>
                      <div className="relative">
                        <UserIcon
                          className={`w-4 h-4 absolute left-3 top-3 ${
                            isLight ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        />
                        <input
                          id="input-auth-name"
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="Ex: Arquiteto Cloud"
                          className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs border outline-none transition-all ${
                            isLight
                              ? 'bg-slate-50 border-slate-200 focus:border-blue-500 focus:bg-white'
                              : 'bg-white/5 border-white/10 focus:border-blue-500 focus:bg-black/30'
                          }`}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label
                      className={`block text-xs font-semibold mb-1.5 ${
                        isLight ? 'text-slate-700' : 'text-slate-300'
                      }`}
                    >
                      Endereço de E-mail
                    </label>
                    <div className="relative">
                      <Mail
                        className={`w-4 h-4 absolute left-3 top-3 ${
                          isLight ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      />
                      <input
                        id="input-auth-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu.email@empresa.com"
                        className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs border outline-none transition-all ${
                          isLight
                            ? 'bg-slate-50 border-slate-200 focus:border-blue-500 focus:bg-white'
                            : 'bg-white/5 border-white/10 focus:border-blue-500 focus:bg-black/30'
                        }`}
                      />
                    </div>
                  </div>

                  {mode !== 'reset' && (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          className={`block text-xs font-semibold ${
                            isLight ? 'text-slate-700' : 'text-slate-300'
                          }`}
                        >
                          Senha
                        </label>
                        {mode === 'login' && (
                          <button
                            type="button"
                            onClick={() => handleModeChange('reset')}
                            className="text-[11px] text-blue-500 hover:text-blue-400 font-medium transition-colors"
                          >
                            Esqueceu a senha?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock
                          className={`w-4 h-4 absolute left-3 top-3 ${
                            isLight ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        />
                        <input
                          id="input-auth-password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder={mode === 'signup' ? 'Mínimo de 6 caracteres' : 'Sua senha'}
                          className={`w-full pl-9 pr-10 py-2.5 rounded-xl text-xs border outline-none transition-all ${
                            isLight
                              ? 'bg-slate-50 border-slate-200 focus:border-blue-500 focus:bg-white'
                              : 'bg-white/5 border-white/10 focus:border-blue-500 focus:bg-black/30'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute right-3 top-3 p-0.5 rounded transition-colors ${
                            isLight ? 'text-slate-400 hover:text-slate-600' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {mode === 'signup' && (
                    <div>
                      <label
                        className={`block text-xs font-semibold mb-1.5 ${
                          isLight ? 'text-slate-700' : 'text-slate-300'
                        }`}
                      >
                        Confirmar Senha
                      </label>
                      <div className="relative">
                        <Lock
                          className={`w-4 h-4 absolute left-3 top-3 ${
                            isLight ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        />
                        <input
                          id="input-auth-confirm-password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Repita a mesma senha"
                          className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl text-xs border outline-none transition-all ${
                            isLight
                              ? 'bg-slate-50 border-slate-200 focus:border-blue-500 focus:bg-white'
                              : 'bg-white/5 border-white/10 focus:border-blue-500 focus:bg-black/30'
                          }`}
                        />
                      </div>
                    </div>
                  )}

                  {/* Primary Submit Button */}
                  <button
                    id="btn-auth-screen-submit"
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50 active:scale-[0.99]"
                  >
                    {submitting ? (
                      <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <span>
                          {mode === 'login' && 'Entrar no Studio'}
                          {mode === 'signup' && 'Criar Conta e Acessar'}
                          {mode === 'reset' && 'Enviar Link de Redefinição'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Google SSO Login */}
                  {mode !== 'reset' && (
                    <>
                      <div className="flex items-center my-3">
                        <div className={`flex-1 border-t ${isLight ? 'border-slate-200' : 'border-white/10'}`} />
                        <span className={`px-3 text-[11px] uppercase tracking-wider font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          Ou continue com
                        </span>
                        <div className={`flex-1 border-t ${isLight ? 'border-slate-200' : 'border-white/10'}`} />
                      </div>

                      <button
                        id="btn-auth-screen-google"
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={submitting}
                        className={`w-full flex items-center justify-center space-x-2.5 py-2.5 px-4 rounded-xl border text-xs font-bold transition-all disabled:opacity-50 ${
                          isLight
                            ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-sm'
                            : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                        }`}
                      >
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                        <span>Continuar com o Google</span>
                      </button>
                    </>
                  )}
                </form>

                {/* Secondary Option: Guest / Offline Mode */}
                {onContinueAsGuest && mode !== 'reset' && (
                  <div className="pt-2 border-t border-slate-200/60 dark:border-white/5 text-center">
                    <button
                      id="btn-auth-guest-mode"
                      type="button"
                      onClick={onContinueAsGuest}
                      className={`text-xs font-semibold py-1.5 px-3 rounded-lg transition-colors ${
                        isLight
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      Acessar como Convidado (Modo Offline / Sem Nuvem) →
                    </button>
                  </div>
                )}

                {/* Security Guarantee Badge */}
                <div
                  className={`pt-3 flex items-center justify-center space-x-2 text-[11px] text-center ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>Autenticação Firebase & Dados Privados no Firestore</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer
        className={`w-full py-4 px-6 text-center text-xs border-t shrink-0 ${
          isLight ? 'border-slate-200 text-slate-500 bg-white/50' : 'border-white/5 text-slate-500 bg-[#0A0C12]'
        }`}
      >
        <p className="flex items-center justify-center space-x-2 flex-wrap gap-y-1">
          <span>MultiCloud Canvas Studio • Modelagem Arquitetural AWS, Azure, GCP, OCI & Kubernetes</span>
          {onOpenChangelog && (
            <>
              <span className="opacity-40">•</span>
              <button
                id="btn-auth-open-changelog"
                type="button"
                onClick={onOpenChangelog}
                className={`font-semibold hover:underline transition-colors ${
                  isLight ? 'text-blue-600 hover:text-blue-800' : 'text-blue-400 hover:text-blue-300'
                }`}
              >
                Histórico ({LATEST_APP_VERSION})
              </button>
            </>
          )}
          {onOpenDocumentation && (
            <>
              <span className="opacity-40">•</span>
              <button
                id="btn-auth-open-doc-footer"
                type="button"
                onClick={onOpenDocumentation}
                className={`font-semibold hover:underline transition-colors flex items-center space-x-1 ${
                  isLight ? 'text-indigo-600 hover:text-indigo-800' : 'text-indigo-400 hover:text-indigo-300'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 inline" />
                <span>Documentação do Produto</span>
              </button>
            </>
          )}
        </p>
      </footer>
    </div>
  );
};
