import React from 'react';
import { AlertTriangle, Unlink, Trash2, X } from 'lucide-react';

export interface OrphanNodesModalProps {
  isOpen: boolean;
  containerNames: string[];
  containedNodesCount: number;
  onUnbindAndKeepNodes: () => void;
  onCascadeDelete: () => void;
  onCancel: () => void;
  theme?: 'dark' | 'light';
}

export const OrphanNodesModal: React.FC<OrphanNodesModalProps> = ({
  isOpen,
  containerNames,
  containedNodesCount,
  onUnbindAndKeepNodes,
  onCascadeDelete,
  onCancel,
  theme = 'dark'
}) => {
  if (!isOpen) return null;
  const isLight = theme === 'light';

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        id="modal-orphan-nodes-management"
        className={`w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#12141A] border-white/10 text-slate-100'
        }`}
      >
        {/* Header */}
        <div className={`p-4 border-b flex items-center justify-between ${
          isLight ? 'bg-amber-50 border-slate-200' : 'bg-amber-500/10 border-white/10'
        }`}>
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-500">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Gestão de Nós e Containers</h3>
              <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                Prevenção de nós órfãos e integridade lógica
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className={`p-1.5 rounded-lg transition-colors ${
              isLight ? 'hover:bg-slate-200 text-slate-500' : 'hover:bg-white/10 text-slate-400'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <p className="text-xs leading-relaxed">
            O container <strong className="text-blue-500 font-bold">{containerNames.join(', ')}</strong> contém{' '}
            <strong className="text-amber-500 font-bold">{containedNodesCount} recurso(s)</strong> vinculado(s).
          </p>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'} leading-relaxed`}>
            Como deseja prosseguir com a exclusão para garantir a consistência da topologia?
          </p>

          <div className="pt-2 space-y-2.5">
            {/* Unbind Button */}
            <button
              id="btn-unbind-nodes"
              onClick={onUnbindAndKeepNodes}
              className={`w-full p-3 rounded-xl border flex items-start space-x-3 text-left transition-all ${
                isLight
                  ? 'bg-blue-50/80 hover:bg-blue-100 border-blue-200 text-slate-800'
                  : 'bg-blue-950/30 hover:bg-blue-900/40 border-blue-500/30 text-slate-200'
              }`}
            >
              <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-500 mt-0.5">
                <Unlink className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  Desvincular e Manter Recursos
                </div>
                <div className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Remove apenas o container. Os recursos permanecem no canvas e suas referências são desvinculadas com segurança.
                </div>
              </div>
            </button>

            {/* Cascade Delete Button */}
            <button
              id="btn-cascade-delete-nodes"
              onClick={onCascadeDelete}
              className={`w-full p-3 rounded-xl border flex items-start space-x-3 text-left transition-all ${
                isLight
                  ? 'bg-rose-50/80 hover:bg-rose-100 border-rose-200 text-slate-800'
                  : 'bg-rose-950/30 hover:bg-rose-900/40 border-rose-500/30 text-slate-200'
              }`}
            >
              <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-500 mt-0.5">
                <Trash2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-rose-600 dark:text-rose-400">
                  Excluir em Cascata (Cascade Delete)
                </div>
                <div className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Exclui o container e todos os {containedNodesCount} recursos e conexões que estavam dentro dele.
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-3.5 border-t flex justify-end ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/20 border-white/10'
        }`}>
          <button
            onClick={onCancel}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              isLight
                ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
            }`}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
