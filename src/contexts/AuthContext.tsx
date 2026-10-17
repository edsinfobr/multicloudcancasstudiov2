import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import firebaseConfig from '../../firebase-applet-config.json';
import {
  getUserPreferences,
  saveUserPreferences,
  UserPreferences,
} from '../services/cloudStorageService';

interface AuthContextType {
  currentUser: User | null;
  userPreferences: UserPreferences | null;
  loading: boolean;
  signUpWithEmail: (email: string, pass: string, name?: string) => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  updatePreferences: (prefs: Partial<UserPreferences>) => Promise<void>;
  authError: string | null;
  authErrorCode: string | null;
  clearAuthError: () => void;
  firebaseProjectId: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(() => {
    try {
      const cached = localStorage.getItem('multicloud_user_preferences');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      console.warn('Failed to parse cached user preferences:', e);
    }
    return null;
  });
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authErrorCode, setAuthErrorCode] = useState<string | null>(null);

  const clearAuthError = () => {
    setAuthError(null);
    setAuthErrorCode(null);
  };

  const translateFirebaseError = (error: any): string => {
    const code = error?.code || '';
    setAuthErrorCode(code);
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Este endereço de e-mail já está em uso. Faça login ou use outro e-mail.';
      case 'auth/invalid-email':
        return 'Endereço de e-mail inválido.';
      case 'auth/operation-not-allowed':
        return 'O login por e-mail e senha precisa ser ativado no Firebase Console (Authentication > Sign-in method).';
      case 'auth/weak-password':
        return 'A senha é muito fraca. Utilize pelo menos 6 caracteres com números ou símbolos.';
      case 'auth/user-disabled':
        return 'Esta conta de usuário foi desativada.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'E-mail ou senha incorretos.';
      case 'auth/popup-closed-by-user':
        return 'A janela de autenticação foi fechada antes de concluir o login.';
      case 'auth/popup-blocked':
        return 'O pop-up de login foi bloqueado pelo navegador. Permita pop-ups para este site.';
      case 'auth/too-many-requests':
        return 'Muitas tentativas sem sucesso. Aguarde alguns instantes antes de tentar novamente.';
      default:
        return error?.message || 'Ocorreu um erro durante a autenticação.';
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const prefs = await getUserPreferences(user.uid);
          if (prefs) {
            setUserPreferences(prefs);
            try {
              localStorage.setItem('multicloud_user_preferences', JSON.stringify(prefs));
            } catch {}
          } else {
            // First time login - read existing local preferences to migrate them
            let localCache: Partial<UserPreferences> = {};
            try {
              const raw = localStorage.getItem('multicloud_user_preferences');
              if (raw) localCache = JSON.parse(raw);
            } catch {}

            const initialPrefs: UserPreferences = {
              userId: user.uid,
              email: user.email || '',
              displayName: user.displayName || localCache.displayName || user.email?.split('@')[0] || 'Arquiteto Cloud',
              theme: localCache.theme || 'light',
              defaultCloud: localCache.defaultCloud || 'all',
              autoSave: localCache.autoSave ?? true,
              leftSidebarCollapsed: localCache.leftSidebarCollapsed ?? false,
              rightSidebarCollapsed: localCache.rightSidebarCollapsed ?? false,
              defaultStamp: {
                author: localCache.defaultStamp?.author || user.displayName || user.email?.split('@')[0] || 'Arquiteto Cloud',
                role: localCache.defaultStamp?.role || 'Arquiteto de Soluções Cloud',
                company: localCache.defaultStamp?.company || '',
                showOnCanvas: localCache.defaultStamp?.showOnCanvas ?? true,
              },
            };
            await saveUserPreferences(user.uid, user.email || '', initialPrefs);
            setUserPreferences(initialPrefs);
            try {
              localStorage.setItem('multicloud_user_preferences', JSON.stringify(initialPrefs));
            } catch {}
          }
        } catch (err) {
          console.error('Error fetching user preferences on auth change:', err);
        }
      } else {
        // Fall back to local preferences when user signs out or is guest
        try {
          const cached = localStorage.getItem('multicloud_user_preferences');
          if (cached) {
            setUserPreferences(JSON.parse(cached));
          }
        } catch {}
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUpWithEmail = async (email: string, pass: string, name?: string) => {
    setAuthError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      if (name && name.trim() && cred.user) {
        await updateProfile(cred.user, { displayName: name.trim() });
      }
      const initialPrefs: UserPreferences = {
        userId: cred.user.uid,
        email: cred.user.email || email.trim(),
        displayName: name?.trim() || email.trim().split('@')[0],
        theme: 'dark',
        defaultCloud: 'all',
        autoSave: true,
        leftSidebarCollapsed: false,
        rightSidebarCollapsed: false,
        defaultStamp: {
          author: name?.trim() || email.trim().split('@')[0],
          role: 'Arquiteto de Soluções Cloud',
          company: '',
          showOnCanvas: true,
        },
      };
      await saveUserPreferences(cred.user.uid, cred.user.email || email.trim(), initialPrefs);
      setUserPreferences(initialPrefs);
    } catch (error: any) {
      const msg = translateFirebaseError(error);
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
      const prefs = await getUserPreferences(cred.user.uid);
      if (prefs) {
        setUserPreferences(prefs);
      }
    } catch (error: any) {
      const msg = translateFirebaseError(error);
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const cred = await signInWithPopup(auth, provider);
      if (cred.user) {
        const existing = await getUserPreferences(cred.user.uid);
        if (!existing) {
          const initialPrefs: UserPreferences = {
            userId: cred.user.uid,
            email: cred.user.email || '',
            displayName: cred.user.displayName || cred.user.email?.split('@')[0] || 'Arquiteto Cloud',
            theme: 'dark',
            defaultCloud: 'all',
            autoSave: true,
            leftSidebarCollapsed: false,
            rightSidebarCollapsed: false,
            defaultStamp: {
              author: cred.user.displayName || cred.user.email?.split('@')[0] || 'Arquiteto Cloud',
              role: 'Arquiteto de Soluções Cloud',
              company: '',
              showOnCanvas: true,
            },
          };
          await saveUserPreferences(cred.user.uid, cred.user.email || '', initialPrefs);
          setUserPreferences(initialPrefs);
        } else {
          setUserPreferences(existing);
        }
      }
    } catch (error: any) {
      const msg = translateFirebaseError(error);
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const sendPasswordReset = async (email: string) => {
    setAuthError(null);
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (error: any) {
      const msg = translateFirebaseError(error);
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const logout = async () => {
    setAuthError(null);
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserPreferences(null);
    } catch (error: any) {
      const msg = translateFirebaseError(error);
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const updatePreferences = async (prefs: Partial<UserPreferences>) => {
    // 1. Immediately update local state and localStorage for instant responsiveness & guest support
    setUserPreferences((prev) => {
      const updated: UserPreferences = {
        userId: currentUser?.uid || prev?.userId || 'guest',
        email: currentUser?.email || prev?.email || '',
        displayName: prefs.displayName ?? prev?.displayName ?? (currentUser?.email ? currentUser.email.split('@')[0] : 'Arquiteto Cloud'),
        theme: prefs.theme ?? prev?.theme ?? 'light',
        defaultCloud: prefs.defaultCloud ?? prev?.defaultCloud ?? 'all',
        autoSave: prefs.autoSave ?? prev?.autoSave ?? true,
        leftSidebarCollapsed: prefs.leftSidebarCollapsed ?? prev?.leftSidebarCollapsed ?? false,
        rightSidebarCollapsed: prefs.rightSidebarCollapsed ?? prev?.rightSidebarCollapsed ?? false,
        defaultStamp: {
          author: prefs.defaultStamp?.author ?? prev?.defaultStamp?.author ?? '',
          role: prefs.defaultStamp?.role ?? prev?.defaultStamp?.role ?? 'Arquiteto de Soluções Cloud',
          company: prefs.defaultStamp?.company ?? prev?.defaultStamp?.company ?? '',
          showOnCanvas: prefs.defaultStamp?.showOnCanvas ?? prev?.defaultStamp?.showOnCanvas ?? true,
        },
        createdAt: prev?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      try {
        localStorage.setItem('multicloud_user_preferences', JSON.stringify(updated));
      } catch (err) {
        console.warn('Could not cache user preferences to localStorage:', err);
      }
      return updated;
    });

    // 2. If authenticated, persist to Firestore cloud profile
    if (currentUser) {
      try {
        await saveUserPreferences(currentUser.uid, currentUser.email || '', prefs);
      } catch (error: any) {
        console.error('Failed to update preferences in Firestore:', error);
        throw error;
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userPreferences,
        loading,
        signUpWithEmail,
        signInWithEmail,
        signInWithGoogle,
        sendPasswordReset,
        logout,
        updatePreferences,
        authError,
        authErrorCode,
        clearAuthError,
        firebaseProjectId: firebaseConfig.projectId || 'gen-lang-client-0483065225',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
