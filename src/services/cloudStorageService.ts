import {
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { DiagramState, DefaultStampPreferences } from '../types';
import { SavedArchitectureItem } from '../utils/storageUtils';

export interface UserPreferences {
  userId: string;
  email: string;
  displayName?: string;
  theme?: 'dark' | 'light';
  defaultCloud?: 'aws' | 'azure' | 'gcp' | 'oci' | 'all';
  autoSave?: boolean;
  leftSidebarCollapsed?: boolean;
  rightSidebarCollapsed?: boolean;
  defaultStamp?: DefaultStampPreferences;
  createdAt?: string;
  updatedAt?: string;
}

export interface CloudArchitectureDoc {
  id: string;
  userId: string;
  name: string;
  description?: string;
  nodesCount: number;
  containersCount: number;
  linksCount: number;
  diagram: DiagramState;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Save or update user profile & editor preferences in Firestore
 */
export async function saveUserPreferences(
  userId: string,
  email: string,
  prefs: Partial<UserPreferences>
): Promise<void> {
  const path = `users/${userId}`;
  try {
    const userRef = doc(db, 'users', userId);
    const now = new Date().toISOString();
    
    // Fetch existing if present to preserve createdAt and existing values
    let existingData: any = null;
    try {
      const existingSnap = await getDoc(userRef);
      if (existingSnap.exists()) {
        existingData = existingSnap.data();
      }
    } catch (readErr) {
      console.warn('Could not read existing user preferences, will proceed to write:', readErr);
    }

    const safeEmail = (email || existingData?.email || '').slice(0, 150);
    const safeDisplayName = (prefs.displayName ?? existingData?.displayName ?? (safeEmail ? safeEmail.split('@')[0] : 'Arquiteto Cloud')).slice(0, 100);

    const safeAuthor = (prefs.defaultStamp?.author ?? existingData?.defaultStamp?.author ?? safeDisplayName).slice(0, 100);
    const safeRole = (prefs.defaultStamp?.role ?? existingData?.defaultStamp?.role ?? 'Arquiteto de Soluções Cloud').slice(0, 100);
    const safeCompany = (prefs.defaultStamp?.company ?? existingData?.defaultStamp?.company ?? '').slice(0, 100);
    const safeShowOnCanvas = prefs.defaultStamp?.showOnCanvas ?? existingData?.defaultStamp?.showOnCanvas ?? true;

    const payload: UserPreferences = {
      userId,
      email: safeEmail,
      displayName: safeDisplayName,
      theme: prefs.theme ?? existingData?.theme ?? 'light',
      defaultCloud: prefs.defaultCloud ?? existingData?.defaultCloud ?? 'all',
      autoSave: prefs.autoSave ?? existingData?.autoSave ?? true,
      leftSidebarCollapsed: prefs.leftSidebarCollapsed ?? existingData?.leftSidebarCollapsed ?? false,
      rightSidebarCollapsed: prefs.rightSidebarCollapsed ?? existingData?.rightSidebarCollapsed ?? false,
      defaultStamp: {
        author: safeAuthor,
        role: safeRole,
        company: safeCompany,
        showOnCanvas: safeShowOnCanvas,
      },
      createdAt: existingData?.createdAt ?? now,
      updatedAt: now,
    };

    await setDoc(userRef, payload, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Retrieve user profile & editor preferences from Firestore
 */
export async function getUserPreferences(userId: string): Promise<UserPreferences | null> {
  const path = `users/${userId}`;
  try {
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    if (!snap.exists()) return null;
    return snap.data() as UserPreferences;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

/**
 * Save an architecture diagram to Firestore under user's private subcollection
 */
export async function saveArchitectureToCloud(
  userId: string,
  diagram: DiagramState,
  options?: {
    title?: string;
    description?: string;
    tags?: string[];
  }
): Promise<SavedArchitectureItem> {
  const archId = diagram.id && diagram.id.length <= 128 ? diagram.id : `diag_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const path = `users/${userId}/architectures/${archId}`;

  try {
    const archRef = doc(db, 'users', userId, 'architectures', archId);
    const now = new Date().toISOString();

    const existingSnap = await getDoc(archRef);
    const existingData = existingSnap.exists() ? existingSnap.data() : null;

    const name = (options?.title || diagram.title || 'Arquitetura Sem Título').slice(0, 150);
    const description = (options?.description || diagram.description || '').slice(0, 2000);

    const fullDiagram: DiagramState = {
      ...diagram,
      id: archId,
      title: name,
      description,
      updatedAt: now,
    };

    const docPayload: CloudArchitectureDoc = {
      id: archId,
      userId,
      name,
      description,
      nodesCount: diagram.nodes?.length || 0,
      containersCount: diagram.containers?.length || 0,
      linksCount: diagram.links?.length || 0,
      diagram: fullDiagram,
      tags: options?.tags || diagram.metadata?.tags || [],
      createdAt: existingData?.createdAt ?? now,
      updatedAt: now,
    };

    await setDoc(archRef, docPayload);

    return {
      id: archId,
      title: name,
      description,
      updatedAt: now,
      nodeCount: diagram.nodes?.length || 0,
      diagram: fullDiagram,
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * List all saved architectures from Firestore for a given user
 */
export async function getCloudArchitectures(userId: string): Promise<SavedArchitectureItem[]> {
  const path = `users/${userId}/architectures`;
  try {
    const colRef = collection(db, 'users', userId, 'architectures');
    const q = query(colRef, orderBy('updatedAt', 'desc'));
    const snapshot = await getDocs(q);

    const items: SavedArchitectureItem[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as CloudArchitectureDoc;
      items.push({
        id: data.id,
        title: data.name,
        description: data.description,
        updatedAt: data.updatedAt,
        nodeCount: data.nodesCount ?? data.diagram?.nodes?.length ?? 0,
        diagram: data.diagram,
      });
    });

    return items;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

/**
 * Delete a saved architecture from Firestore
 */
export async function deleteCloudArchitecture(userId: string, architectureId: string): Promise<void> {
  const path = `users/${userId}/architectures/${architectureId}`;
  try {
    const archRef = doc(db, 'users', userId, 'architectures', architectureId);
    await deleteDoc(archRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
