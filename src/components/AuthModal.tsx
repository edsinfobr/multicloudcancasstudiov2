import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  Cloud,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  HelpCircle,
  Globe,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'dark' | 'light';
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  theme = 'dark',
  initialMode = 'login',
}) => {
  const isLight = theme === 'light';
  const { t } = useLanguage();
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

  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [localMessage, setLocalMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

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
      setLocalMessage({ type: 'error', text: t.auth.fillEmailError });
      return;
    }

    if (mode === 'reset') {
      try {
        setSubmitting(true);
        await sendPasswordReset(email.trim());
        setLocalMessage({
          type: 'success',
          text: t.auth.resetSuccess,
        });
      } catch (err: any) {
        setLocalMessage({ type: 'error', text: err.message || t.auth.authError });
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (!password) {
      setLocalMessage({ type: 'error', text: t.auth.fillPassError });
      return;
    }

    if (mode === 'signup') {
      if (password.length < 6) {
        setLocalMessage({ type: 'error', text: t.auth.passMinError });
        return;
      }
      if (password !== confirmPassword) {
        setLocalMessage({ type: 'error', text: t.auth.passMismatchError });
        return;
      }
    }

    try {
      setSubmitting(true);
      if (mode === 'login') {
        await signInWithEmail(email.trim(), password);
        onClose();
      } else {
        await signUpWithEmail(email.trim(), password, displayName.trim());
        setLocalMessage({
          type: 'success',
          text: t.auth.accountCreatedSuccess,
        });
        setTimeout(() => {
          onClose();
        }, 1200);
      }
    } catch (err: any) {
      setLocalMessage({ type: 'error', text: err.message || t.auth.authError });
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
      onClose();
    } catch (err: any) {
      setLocalMessage({ type: 'error', text: err.message || t.auth.authError });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      id="auth-modal-overlay"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md transition-all ${
        isLight ? 'bg-slate-900/60' : 'bg-black/80'
      }`}
    >
      <div
        id="auth-modal-container"
        className={`relative w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden transition-all ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#12151D] border-white/10 text-slate-100'
        }`}
      >
        {/* Decorative Top Gradient */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

        {/* Header */}
        <div className="relative px-6 pt-5 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1.5 text-xs font-semibold opacity-75">
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>{t.auth.langSelectorTitle}</span>
            </div>
            <div className="flex items-center space-x-2">
              <LanguageSelector variant="pill" theme={theme} />
              <button
                onClick={onClose}
                className={`p-1.5 rounded-lg transition-colors ${
                  isLight
                    ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3 mb-1.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">
                {mode === 'login' && t.auth.welcomeBack}
                {mode === 'signup' && t.auth.createYourAccount}
                {mode === 'reset' && t.auth.resetPasswordTitle}
              </h2>
              <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {t.auth.appName}
              </p>
            </div>
          </div>

          <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            {mode === 'login' && t.auth.appDescription}
            {mode === 'signup' && t.auth.guestHint}
            {mode === 'reset' && t.auth.resetSubtitle}
          </p>
        </div>

        {/* Mode Tab Switcher */}
        {mode !== 'reset' && (
          <div className="px-6 pb-2">
            <div
              className={`grid grid-cols-2 p-1 rounded-xl border text-xs font-semibold ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/10'
              }`}
            >
              <button
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
                {t.auth.loginTab}
              </button>
              <button
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
                {t.auth.signupTab}
              </button>
            </div>
          </div>
        )}

        {/* Error or Success Alert */}
        <div className="px-6">
          {(authErrorCode === 'auth/operation-not-allowed' || (authError && authError.includes('Sign-in method'))) ? (
            <div
              className={`p-3.5 rounded-xl mb-3 border text-xs ${
                isLight
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
              }`}
            >
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Ativar E-mail no Firebase</span>
                    <span className="text-[10px] font-mono opacity-80">{firebaseProjectId}</span>
                  </div>
                  <p className="text-[11px] leading-snug">
                    O provedor <strong>E-mail/senha</strong> precisa ser ativado no console do Firebase:
                  </p>
                  <ol className="text-[11px] list-decimal list-inside space-y-0.5 font-medium">
                    <li>Abra a guia <strong>Sign-in method</strong> no console.</li>
                    <li>Clique no provedor <strong>E-mail/senha</strong>.</li>
                    <li>Ative a opção <strong>Habilitar</strong> e salve.</li>
                  </ol>
                  <div className="pt-1 flex items-center space-x-2">
                    <a
                      href={`https://console.firebase.google.com/project/${firebaseProjectId || 'gen-lang-client-0483065225'}/authentication/providers`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px] transition-colors"
                    >
                      <span>Abrir Firebase Console</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (localMessage || authError) ? (
            <div
              className={`p-3 rounded-xl mb-3 flex items-start space-x-2.5 text-xs ${
                (localMessage?.type === 'success')
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
          ) : null}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label
                className={`block text-xs font-semibold mb-1.5 ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                {t.auth.displayNameLabel}
              </label>
              <div className="relative">
                <UserIcon
                  className={`w-4 h-4 absolute left-3 top-3 ${
                    isLight ? 'text-slate-400' : 'text-slate-500'
                  }`}
                />
                <input
                  id="auth-input-name"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder={t.auth.displayNamePlaceholder}
                  className={`w-full pl-9 pr-3.5 py-2 rounded-xl text-xs border outline-none transition-all ${
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
              {t.auth.emailLabel}
            </label>
            <div className="relative">
              <Mail
                className={`w-4 h-4 absolute left-3 top-3 ${
                  isLight ? 'text-slate-400' : 'text-slate-500'
                }`}
              />
              <input
                id="auth-input-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.auth.emailPlaceholder}
                className={`w-full pl-9 pr-3.5 py-2 rounded-xl text-xs border outline-none transition-all ${
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
                  {t.auth.passwordLabel}
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => handleModeChange('reset')}
                    className="text-[11px] text-blue-500 hover:text-blue-400 font-medium transition-colors"
                  >
                    {t.auth.forgotPassword}
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
                  id="auth-input-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? t.auth.passMinError : t.auth.passwordPlaceholder}
                  className={`w-full pl-9 pr-10 py-2 rounded-xl text-xs border outline-none transition-all ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 focus:border-blue-500 focus:bg-white'
                      : 'bg-white/5 border-white/10 focus:border-blue-500 focus:bg-black/30'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-2.5 p-0.5 rounded transition-colors ${
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
                {t.auth.confirmPasswordLabel}
              </label>
              <div className="relative">
                <Lock
                  className={`w-4 h-4 absolute left-3 top-3 ${
                    isLight ? 'text-slate-400' : 'text-slate-500'
                  }`}
                />
                <input
                  id="auth-input-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t.auth.confirmPasswordPlaceholder}
                  className={`w-full pl-9 pr-3.5 py-2 rounded-xl text-xs border outline-none transition-all ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 focus:border-blue-500 focus:bg-white'
                      : 'bg-white/5 border-white/10 focus:border-blue-500 focus:bg-black/30'
                  }`}
                />
              </div>
            </div>
          )}

          {/* Primary Action Button */}
          <button
            id="btn-auth-submit"
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all disabled:opacity-50"
          >
            {submitting ? (
              <span className="inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <span>
                  {mode === 'login' && t.auth.enterBtn}
                  {mode === 'signup' && t.auth.createBtn}
                  {mode === 'reset' && t.auth.sendResetBtn}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {mode === 'reset' && (
            <button
              type="button"
              onClick={() => handleModeChange('login')}
              className="w-full text-center text-xs text-blue-500 hover:underline pt-1"
            >
              {t.auth.backToLogin}
            </button>
          )}

          {/* Google SSO Alternative */}
          {mode !== 'reset' && (
            <>
              <div className="flex items-center my-3">
                <div className={`flex-1 border-t ${isLight ? 'border-slate-200' : 'border-white/10'}`} />
                <span className={`px-3 text-[11px] uppercase tracking-wider font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  {t.auth.orDivider}
                </span>
                <div className={`flex-1 border-t ${isLight ? 'border-slate-200' : 'border-white/10'}`} />
              </div>

              <button
                id="btn-google-auth"
                type="button"
                onClick={handleGoogleLogin}
                disabled={submitting}
                className={`w-full flex items-center justify-center space-x-2.5 py-2 px-4 rounded-xl border text-xs font-semibold transition-all disabled:opacity-50 ${
                  isLight
                    ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                }`}
              >
                {/* Official Google Vector Logo */}
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
                <span>{t.auth.continueWithGoogle}</span>
              </button>
            </>
          )}

          {/* Privacy & Cloud sync guarantee */}
          <div
            className={`mt-4 pt-3 border-t flex items-center space-x-2 text-[11px] ${
              isLight ? 'border-slate-100 text-slate-500' : 'border-white/5 text-slate-400'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
            <span>
              Projetos e metadados salvos de forma privada no Firestore com regras isoladas por usuário.
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
