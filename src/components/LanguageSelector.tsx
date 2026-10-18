import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { AppLanguage } from '../i18n/translations';
import { Globe, Check, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'pill' | 'compact' | 'detailed';
  theme?: 'dark' | 'light';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'compact',
  theme = 'dark',
  className = '',
}) => {
  const { language, setLanguage, supportedLanguages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isLight = theme === 'light';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentLangInfo = supportedLanguages.find((l) => l.code === language) || supportedLanguages[0];

  // Pill variant: horizontal toggle buttons
  if (variant === 'pill') {
    return (
      <div
        className={`inline-flex items-center p-1 rounded-xl border backdrop-blur-md ${
          isLight
            ? 'bg-slate-100 border-slate-300/80 shadow-sm'
            : 'bg-[#12141A]/90 border-white/10 shadow-inner'
        } ${className}`}
        role="group"
        aria-label={t.auth.langSelectorTitle}
      >
        {supportedLanguages.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? isLight
                    ? 'bg-white text-blue-600 shadow-sm font-bold border border-slate-200'
                    : 'bg-blue-600 text-white shadow-md font-bold'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              title={lang.nativeName}
            >
              <span className="text-sm">{lang.flag}</span>
              <span className="uppercase tracking-wider">{lang.code}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Detailed variant: rich card options with full names, flags and descriptions (ideal for Preferences Modal)
  if (variant === 'detailed') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${className}`}>
        {supportedLanguages.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={`relative flex flex-col items-start p-3.5 rounded-xl border text-left transition-all ${
                isActive
                  ? isLight
                    ? 'bg-blue-50/80 border-blue-500 shadow-md ring-1 ring-blue-500/30'
                    : 'bg-blue-500/10 border-blue-500 shadow-md ring-1 ring-blue-500/30'
                  : isLight
                  ? 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
                  : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <span className="text-2xl" role="img" aria-label={lang.name}>
                  {lang.flag}
                </span>
                {isActive && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
              <span className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {lang.nativeName}
              </span>
              <span className={`text-[10px] uppercase font-semibold tracking-wider mt-0.5 ${
                isActive ? 'text-blue-500' : isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {lang.code === 'pt' ? 'Português (Brasil)' : lang.code === 'en' ? 'English (US)' : 'Español (Latam)'}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // Compact variant: dropdown button for navbar or compact headers
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        id="btn-language-selector"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900'
            : 'bg-[#181B24] border-white/10 text-slate-300 hover:bg-[#202430] hover:text-white'
        }`}
        title={t.nav.language}
      >
        <span className="text-sm">{currentLangInfo.flag}</span>
        <span className="uppercase font-bold text-[11px]">{currentLangInfo.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-1.5 w-44 rounded-xl border shadow-2xl py-1.5 z-50 animate-fade-in ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900 shadow-slate-300/50'
              : 'bg-[#161820] border-white/10 text-slate-100 shadow-black/80'
          }`}
        >
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider opacity-50 border-b border-inherit">
            {t.nav.language}
          </div>
          {supportedLanguages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                  isSelected
                    ? isLight
                      ? 'bg-blue-50 text-blue-600 font-bold'
                      : 'bg-blue-500/15 text-blue-400 font-bold'
                    : isLight
                    ? 'hover:bg-slate-100 text-slate-700'
                    : 'hover:bg-white/5 text-slate-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-blue-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
