import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppLanguage, translations, SUPPORTED_LANGUAGES, LanguageInfo } from './translations';
import { useAuth } from '../contexts/AuthContext';

interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => Promise<void>;
  t: typeof translations['pt'];
  supportedLanguages: LanguageInfo[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'multicloud_app_language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { userPreferences, updatePreferences, currentUser } = useAuth();

  // Detect initial language: localStorage -> userPreferences -> navigator -> 'pt' default
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as AppLanguage | null;
      if (stored && (stored === 'pt' || stored === 'en' || stored === 'es')) {
        return stored;
      }
      const cachedPrefs = localStorage.getItem('multicloud_user_preferences');
      if (cachedPrefs) {
        const parsed = JSON.parse(cachedPrefs);
        if (parsed?.language && ['pt', 'en', 'es'].includes(parsed.language)) {
          return parsed.language;
        }
      }
      if (typeof navigator !== 'undefined' && navigator.language) {
        const navLang = navigator.language.toLowerCase();
        if (navLang.startsWith('es')) return 'es';
        if (navLang.startsWith('en')) return 'en';
        if (navLang.startsWith('pt')) return 'pt';
      }
    } catch (e) {
      console.warn('Could not read stored language preference:', e);
    }
    return 'pt';
  });

  // Sync if userPreferences has a different language loaded from Firestore
  useEffect(() => {
    if (userPreferences?.language && ['pt', 'en', 'es'].includes(userPreferences.language)) {
      if (userPreferences.language !== language) {
        setLanguageState(userPreferences.language as AppLanguage);
        try {
          localStorage.setItem(STORAGE_KEY, userPreferences.language);
        } catch {
          // ignore
        }
      }
    }
  }, [userPreferences?.language]);

  const setLanguage = async (newLang: AppLanguage) => {
    if (!['pt', 'en', 'es'].includes(newLang)) return;
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch (err) {
      console.warn('Failed to save language to localStorage:', err);
    }

    // Persist to user preferences (local + Firestore if logged in)
    try {
      await updatePreferences({ language: newLang });
    } catch (e) {
      console.warn('Failed to sync language to user preferences:', e);
    }
  };

  const currentTranslations = translations[language] || translations.pt;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: currentTranslations,
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
