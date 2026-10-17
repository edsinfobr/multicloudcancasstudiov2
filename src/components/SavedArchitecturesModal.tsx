import React, { useEffect, useState } from 'react';
import {
  FolderOpen,
  Trash2,
  Calendar,
  HardDrive,
  Plus,
  X,
  ArrowRight,
  Layers,
  Cloud,
  CloudUpload,
  RefreshCw,
  LogIn,
  CheckCircle,
} from 'lucide-react';
import { DiagramState } from '../types';
import {
  getSavedArchitectures,
  deleteSavedArchitecture,
  SavedArchitectureItem,
} from '../utils/storageUtils';
import {
  getCloudArchitectures,
  deleteCloudArchitecture,
  saveArchitectureToCloud,
} from '../services/cloudStorageService';
import { useAuth } from '../contexts/AuthContext';

interface SavedArchitecturesModalProps {
  onLoadDiagram: (diagram: DiagramState) => void;
  onNewDiagram: () => void;
  onClose: () => void;
  onOpenAuthModal?: () => void;
  theme?: 'dark' | 'light';
}

interface EnrichedArchitectureItem extends SavedArchitectureItem {
  source: 'cloud' | 'local';
}

export const SavedArchitecturesModal: React.FC<SavedArchitecturesModalProps> = ({
  onLoadDiagram,
  onNewDiagram,
  onClose,
  onOpenAuthModal,
  theme,
}) => {
  const isLight = theme === 'light';
  const { currentUser } = useAuth();
  const [items, setItems] = useState<EnrichedArchitectureItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'cloud' | 'local'>('all');
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadArchitectures = async () => {
    setLoading(true);
    try {
      const localList = getSavedArchitectures().map((item) => ({
        ...item,
        source: 'local' as const,
      }));

      if (currentUser) {
        const cloudList = await getCloudArchitectures(currentUser.uid);
        const enrichedCloud = cloudList.map((item) => ({
          ...item,
          source: 'cloud' as const,
        }));

        // Merge, avoiding duplicate IDs by preferring cloud
        const cloudIds = new Set(enrichedCloud.map((c) => c.id));
        const nonDuplicateLocal = localList.filter((l) => !cloudIds.has(l.id));

        const combined = [...enrichedCloud, ...nonDuplicateLocal].sort(
          (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        setItems(combined);
      } else {
        setItems(localList);
      }
    } catch (err) {
      console.error('Failed to load architectures:', err);
      // Fallback to local
      setItems(getSavedArchitectures().map((i) => ({ ...i, source: 'local' })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArchitectures();
  }, [currentUser]);

  const handleDelete = async (e: React.MouseEvent, item: EnrichedArchitectureItem) => {
    e.stopPropagation();
    if (!confirm(`Deseja realmente excluir "${item.title}"?`)) return;

    try {
      if (item.source === 'cloud' && currentUser) {
        await deleteCloudArchitecture(currentUser.uid, item.id);
      }
      deleteSavedArchitecture(item.id);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      setFeedback('Arquitetura excluída com sucesso.');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error('Failed to delete architecture:', err);
      alert('Não foi possível excluir o item.');
    }
  };

  const handleSyncToCloud = async (e: React.MouseEvent, item: EnrichedArchitectureItem) => {
    e.stopPropagation();
    if (!currentUser) {
      onOpenAuthModal?.();
      return;
    }

    try {
      await saveArchitectureToCloud(currentUser.uid, item.diagram, {
        title: item.title,
        description: item.description,
      });
      setFeedback(`"${item.title}" sincronizado com a nuvem Firestore!`);
      setTimeout(() => setFeedback(null), 3000);
      await loadArchitectures();
    } catch (err: any) {
      alert(`Falha ao sincronizar: ${err?.message || 'Erro desconhecido'}`);
    }
  };

  const handleSelect = (item: EnrichedArchitectureItem) => {
    onLoadDiagram(item.diagram);
    onClose();
  };

  const displayedItems = items.filter((item) => {
    if (filter === 'cloud') return item.source === 'cloud';
    if (filter === 'local') return item.source === 'local';
    return true;
  });

  return (
    <div
      id="saved-architectures-modal-overlay"
      className={`fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-4 ${
        isLight ? 'bg-slate-900/60' : 'bg-black/80'
      }`}
    >
      <div
        id="saved-architectures-modal-container"
        className={`border rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden transition-colors ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#12141A] border-white/10 text-slate-200'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-black/20'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${
                isLight ? 'bg-blue-100 text-blue-700' : 'bg-blue-600/20 text-blue-400'
              }`}
            >
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className={`text-sm font-bold tracking-wide ${isLight ? 'text-slate-950' : 'text-white'}`}>
                  Minhas Arquiteturas Salvas
                </h2>
                {currentUser && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center space-x-1">
                    <Cloud className="w-3 h-3" />
                    <span>Nuvem Conectada</span>
                  </span>
                )}
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
                {currentUser
                  ? `Sincronizadas com a conta ${currentUser.email}`
                  : 'Gerencie e recarregue seus projetos de arquitetura'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={loadArchitectures}
              title="Atualizar lista"
              className={`p-1.5 rounded-md border transition-colors ${
                isLight
                  ? 'border-slate-200 hover:bg-slate-100 text-slate-600'
                  : 'border-white/10 hover:bg-white/5 text-slate-400'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={() => {
                onNewDiagram();
                onClose();
              }}
              className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Nova Arquitetura</span>
            </button>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-md transition-colors ${
                isLight ? 'hover:bg-slate-200 text-slate-600 hover:text-slate-900' : 'hover:bg-white/10 text-slate-400 hover:text-slate-200'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Guest Banner if not logged in */}
        {!currentUser && (
          <div
            className={`px-6 py-2.5 border-b flex items-center justify-between text-xs ${
              isLight
                ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                : 'bg-amber-950/20 border-amber-500/20 text-amber-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Cloud className="w-4 h-4 shrink-0 text-amber-500" />
              <span>
                Cadastre-se com e-mail e senha para salvar suas arquiteturas na nuvem e acessá-las de qualquer computador.
              </span>
            </div>
            {onOpenAuthModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAuthModal();
                }}
                className="shrink-0 ml-3 flex items-center space-x-1 px-2.5 py-1 rounded-md bg-amber-600 hover:bg-amber-500 text-white font-semibold text-[11px] shadow-sm transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Entrar / Cadastrar</span>
              </button>
            )}
          </div>
        )}

        {/* Filter Bar & Feedback */}
        <div className={`px-6 py-2 border-b flex items-center justify-between text-xs ${
          isLight ? 'border-slate-100 bg-white' : 'border-white/5 bg-white/[0.02]'
        }`}>
          <div className="flex items-center space-x-1.5">
            <span className={`text-[11px] font-semibold ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>Filtrar:</span>
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                filter === 'all'
                  ? isLight ? 'bg-slate-200 text-slate-900' : 'bg-white/15 text-white'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
              }`}
            >
              Todas ({items.length})
            </button>
            <button
              onClick={() => setFilter('cloud')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                filter === 'cloud'
                  ? isLight ? 'bg-blue-100 text-blue-700' : 'bg-blue-600/30 text-blue-300 border border-blue-500/30'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
              }`}
            >
              Nuvem Firestore ({items.filter((i) => i.source === 'cloud').length})
            </button>
            <button
              onClick={() => setFilter('local')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                filter === 'local'
                  ? isLight ? 'bg-slate-200 text-slate-900' : 'bg-white/15 text-white'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
              }`}
            >
              Local ({items.filter((i) => i.source === 'local').length})
            </button>
          </div>

          {feedback && (
            <div className="flex items-center space-x-1 text-emerald-400 text-xs font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{feedback}</span>
            </div>
          )}
        </div>

        {/* List Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
          {displayedItems.length === 0 ? (
            <div className={`py-16 text-center space-y-3 ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
              <HardDrive className={`w-10 h-10 mx-auto ${isLight ? 'text-slate-400' : 'text-slate-600'}`} />
              <p className={`text-xs font-medium ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                Nenhuma arquitetura encontrada neste filtro.
              </p>
              <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-600'}`}>
                Clique no menu "Salvar Arquitetura" na barra superior para salvar seu projeto atual.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {displayedItems.map((item) => (
                <div
                  key={`${item.source}_${item.id}`}
                  onClick={() => handleSelect(item)}
                  className={`border rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg group flex flex-col justify-between ${
                    isLight
                      ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-blue-500'
                      : 'bg-black/40 hover:bg-white/5 border-white/10 hover:border-blue-500/80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-1.5">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border flex items-center space-x-1 ${
                            item.source === 'cloud'
                              ? isLight
                                ? 'bg-blue-100 text-blue-800 border-blue-200'
                                : 'text-blue-400 bg-blue-500/10 border-blue-500/20'
                              : isLight
                              ? 'bg-slate-200 text-slate-700 border-slate-300'
                              : 'text-slate-400 bg-white/5 border-white/10'
                          }`}
                        >
                          {item.source === 'cloud' ? (
                            <>
                              <Cloud className="w-3 h-3 text-blue-500" />
                              <span>Nuvem</span>
                            </>
                          ) : (
                            <>
                              <HardDrive className="w-3 h-3 text-slate-400" />
                              <span>Local</span>
                            </>
                          )}
                        </span>

                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border flex items-center space-x-1 ${
                            isLight
                              ? 'bg-slate-100 text-slate-800 border-slate-200'
                              : 'text-slate-300 bg-white/5 border-white/10'
                          }`}
                        >
                          <Layers className="w-3 h-3" />
                          <span>{item.nodeCount} Recursos</span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-1">
                        {item.source === 'local' && currentUser && (
                          <button
                            onClick={(e) => handleSyncToCloud(e, item)}
                            title="Sincronizar com a Nuvem Firestore"
                            className={`p-1 rounded transition-colors ${
                              isLight
                                ? 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
                                : 'text-slate-500 hover:text-blue-400 hover:bg-blue-500/10'
                            }`}
                          >
                            <CloudUpload className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={(e) => handleDelete(e, item)}
                          title="Excluir Arquitetura"
                          className={`p-1 rounded transition-colors ${
                            isLight
                              ? 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                              : 'text-slate-500 hover:text-red-400 hover:bg-red-500/10'
                          }`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3
                      className={`text-sm font-bold group-hover:text-blue-500 transition-colors truncate ${
                        isLight ? 'text-slate-950' : 'text-slate-100'
                      }`}
                    >
                      {item.title}
                    </h3>

                    {item.description && (
                      <p
                        className={`text-xs mt-1 line-clamp-2 ${
                          isLight ? 'text-slate-600 font-medium' : 'text-slate-400'
                        }`}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div
                    className={`mt-4 pt-2.5 border-t flex items-center justify-between text-[11px] ${
                      isLight ? 'border-slate-200 text-slate-500' : 'border-white/5 text-slate-500'
                    }`}
                  >
                    <span className="flex items-center space-x-1">
                      <Calendar className={`w-3 h-3 ${isLight ? 'text-slate-500' : 'text-slate-600'}`} />
                      <span>
                        {new Date(item.updatedAt).toLocaleDateString()}{' '}
                        {new Date(item.updatedAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </span>

                    <span
                      className={`font-semibold flex items-center space-x-1 ${
                        isLight
                          ? 'text-blue-600 group-hover:text-blue-700'
                          : 'text-blue-400 group-hover:text-blue-300'
                      }`}
                    >
                      <span>Abrir</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

