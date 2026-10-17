import React, { useState, useEffect } from 'react';
import { DiagramState, DiagramNode } from '../types';
import { getIconByKey } from '../data/cloudIcons';
import { calculateNodeCost } from '../utils/costCalculator';
import {
  Presentation,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Sun,
  Moon,
  LogOut,
  Expand,
  Info,
  X,
  Layers,
  DollarSign,
  ArrowRight,
  HardDrive,
  Cpu,
  Globe,
  Tag
} from 'lucide-react';

interface PresentationHudProps {
  diagram: DiagramState;
  zoom: number;
  setZoom: (value: number | ((prev: number) => number)) => void;
  onFitToScreen: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onExitPresentation: () => void;
  selectedNode: DiagramNode | null;
  onCloseSelectedNode: () => void;
}

export const PresentationHud: React.FC<PresentationHudProps> = ({
  diagram,
  zoom,
  setZoom,
  onFitToScreen,
  theme,
  onToggleTheme,
  isFullscreen,
  onToggleFullscreen,
  onExitPresentation,
  selectedNode,
  onCloseSelectedNode
}) => {
  const isLight = theme === 'light';
  const [showHint, setShowHint] = useState<boolean>(true);

  // Auto-dismiss tip banner after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  const selectedNodeCost = selectedNode ? calculateNodeCost(selectedNode) : null;
  const selectedNodeIcon = selectedNode ? getIconByKey(selectedNode.iconKey) : null;

  // Active connections related to selected node
  const relatedLinks = selectedNode
    ? diagram.links.filter((l) => l.from === selectedNode.id || l.to === selectedNode.id)
    : [];

  return (
    <>
      {/* Top Floating Presentation Navigation Bar */}
      <header
        id="presentation-hud-header"
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center space-x-3 transition-all duration-200 select-none ${
          isLight
            ? 'bg-white/90 border-slate-300 text-slate-800 shadow-slate-300/50'
            : 'bg-[#12141A]/90 border-white/15 text-slate-100 shadow-black/60'
        }`}
      >
        {/* Left: Presentation Mode Badge & Architecture Title */}
        <div className="flex items-center space-x-2.5 pr-3 border-r border-slate-300/40 dark:border-white/10">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 font-bold text-xs">
            <Presentation className="w-4 h-4 animate-pulse" />
            <span className="hidden sm:inline tracking-wide uppercase text-[10px]">Apresentação</span>
          </div>

          <div className="flex flex-col max-w-[200px] md:max-w-[320px] truncate">
            <div className="flex items-center space-x-1.5 truncate">
              <span className="font-extrabold text-xs md:text-sm truncate">
                {diagram.title || 'Arquitetura MultiCloud'}
              </span>
              {diagram.version && (
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0">
                  {diagram.version}
                </span>
              )}
            </div>
            {diagram.metadata?.project && (
              <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                {diagram.metadata.project}
              </span>
            )}
          </div>
        </div>

        {/* Center: Zoom Controls & Fit */}
        <div className="flex items-center space-x-1">
          <button
            id="btn-pres-zoom-out"
            onClick={() => setZoom((z) => Math.max(0.3, Math.round((z - 0.1) * 10) / 10))}
            className={`p-1.5 rounded-lg transition-all ${
              isLight ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-white/10 text-slate-300'
            }`}
            title="Diminuir Zoom (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            id="btn-pres-zoom-reset"
            onClick={() => setZoom(1.0)}
            className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              isLight ? 'hover:bg-slate-200 text-slate-800' : 'hover:bg-white/10 text-slate-200'
            }`}
            title="Redefinir Zoom para 100%"
          >
            {Math.round(zoom * 100)}%
          </button>

          <button
            id="btn-pres-zoom-in"
            onClick={() => setZoom((z) => Math.min(2.5, Math.round((z + 0.1) * 10) / 10))}
            className={`p-1.5 rounded-lg transition-all ${
              isLight ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-white/10 text-slate-300'
            }`}
            title="Aumentar Zoom (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            id="btn-pres-fit"
            onClick={onFitToScreen}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              isLight
                ? 'bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-200'
                : 'bg-blue-500/15 hover:bg-blue-500/30 text-blue-300 border-blue-500/30'
            }`}
            title="Enquadrar e Centralizar Arquitetura na Tela (Atalho: 0)"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Enquadrar</span>
          </button>
        </div>

        {/* Separator */}
        <div className="w-[1px] h-5 bg-slate-300 dark:bg-white/10" />

        {/* Right: Theme Toggle, Fullscreen Toggle & Exit Presentation Button */}
        <div className="flex items-center space-x-1.5">
          <button
            id="btn-pres-theme"
            onClick={onToggleTheme}
            className={`p-1.5 rounded-lg transition-all ${
              isLight ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-white/10 text-amber-400'
            }`}
            title={isLight ? 'Mudar para Tema Escuro' : 'Mudar para Tema Claro'}
          >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button
            id="btn-pres-fullscreen"
            onClick={onToggleFullscreen}
            className={`p-1.5 rounded-lg transition-all ${
              isLight ? 'hover:bg-slate-200 text-slate-700' : 'hover:bg-white/10 text-slate-300'
            }`}
            title={isFullscreen ? 'Sair da Tela Cheia (F)' : 'Tela Cheia Completa (F)'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
          </button>

          {/* Exit Presentation Mode Button */}
          <button
            id="btn-exit-presentation"
            onClick={onExitPresentation}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all bg-red-600 hover:bg-red-500 text-white shadow-md hover:shadow-red-600/30 active:scale-95"
            title="Sair do Modo de Apresentação (Pressione Esc)"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
            <kbd className="hidden sm:inline bg-black/25 text-[10px] px-1.5 py-0.2 rounded text-white/90 font-mono">
              Esc
            </kbd>
          </button>
        </div>
      </header>

      {/* Floating Guidance / Tip Banner (Auto dismisses or user closes) */}
      {showHint && (
        <div
          id="presentation-hint-banner"
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full border backdrop-blur-md shadow-2xl flex items-center space-x-2 text-xs font-medium animate-fadeIn ${
            isLight
              ? 'bg-white/95 border-slate-300 text-slate-700 shadow-slate-400/40'
              : 'bg-[#12141A]/95 border-white/20 text-slate-300 shadow-black/80'
          }`}
        >
          <Info className="w-4 h-4 text-purple-400 shrink-0" />
          <span>
            <strong>Navegação Livre:</strong> Arraste para deslizar a tela • Roda do mouse para zoom • Clique em componentes para ver detalhes • Pressione <kbd className="font-mono bg-black/30 dark:bg-white/10 px-1.5 py-0.5 rounded text-[11px]">Esc</kbd> para sair
          </span>
          <button
            onClick={() => setShowHint(false)}
            className="p-1 hover:opacity-75 rounded-full"
            title="Dispensar dica"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Selected Node Read-Only Presentation Card */}
      {selectedNode && (
        <aside
          id="presentation-node-details"
          className={`fixed bottom-6 left-6 z-50 w-80 md:w-96 rounded-2xl border backdrop-blur-xl p-4 shadow-2xl animate-slideUp select-none ${
            isLight
              ? 'bg-white/95 border-slate-300 text-slate-800 shadow-slate-400/50'
              : 'bg-[#12141A]/95 border-white/20 text-slate-100 shadow-black/80'
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center p-1.5 border shrink-0"
                style={{
                  backgroundColor: `${selectedNodeIcon?.brandColor || '#3B82F6'}15`,
                  borderColor: `${selectedNodeIcon?.brandColor || '#3B82F6'}40`
                }}
                dangerouslySetInnerHTML={{ __html: selectedNodeIcon?.svg || '' }}
              />
              <div className="truncate">
                <h4 className="font-bold text-sm truncate leading-tight">
                  {selectedNode.name}
                </h4>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span
                    className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full"
                    style={{
                      backgroundColor: `${selectedNodeIcon?.brandColor || '#3B82F6'}20`,
                      color: selectedNodeIcon?.brandColor || (isLight ? '#1D4ED8' : '#60A5FA')
                    }}
                  >
                    {selectedNode.provider}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">
                    {selectedNode.category}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onCloseSelectedNode}
              className={`p-1 rounded-lg transition-colors ${
                isLight ? 'hover:bg-slate-200 text-slate-500' : 'hover:bg-white/10 text-slate-400'
              }`}
              title="Fechar detalhes"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Information */}
          <div className="py-3 space-y-2.5 text-xs">
            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-2">
              {selectedNode.specs.instanceType && (
                <div className={`p-2 rounded-xl border flex items-center space-x-2 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/5'
                }`}>
                  <Cpu className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-[9px] text-slate-500 uppercase font-bold block">Instância / Tipo</span>
                    <span className="font-mono font-bold truncate block">{selectedNode.specs.instanceType}</span>
                  </div>
                </div>
              )}

              {selectedNode.specs.storageGb ? (
                <div className={`p-2 rounded-xl border flex items-center space-x-2 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/5'
                }`}>
                  <HardDrive className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-[9px] text-slate-500 uppercase font-bold block">Armazenamento</span>
                    <span className="font-bold truncate block">{selectedNode.specs.storageGb} GB</span>
                  </div>
                </div>
              ) : null}

              {selectedNode.specs.region && (
                <div className={`p-2 rounded-xl border flex items-center space-x-2 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/5'
                }`}>
                  <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-[9px] text-slate-500 uppercase font-bold block">Região</span>
                    <span className="font-bold truncate block">{selectedNode.specs.region}</span>
                  </div>
                </div>
              )}

              {selectedNodeCost && (
                <div className={`p-2 rounded-xl border flex items-center space-x-2 ${
                  isLight ? 'bg-amber-50 border-amber-200 text-amber-950' : 'bg-amber-500/10 border-amber-500/25 text-amber-300'
                }`}>
                  <DollarSign className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <div className="truncate">
                    <span className="text-[9px] opacity-75 uppercase font-bold block">Custo Estimado</span>
                    <span className="font-bold font-mono truncate block">
                      ${selectedNodeCost.monthlyCost.toFixed(2)}/mês
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Notes */}
            {selectedNode.notes && (
              <div className={`p-2.5 rounded-xl border text-xs leading-relaxed ${
                isLight ? 'bg-blue-50/70 border-blue-200 text-blue-950' : 'bg-blue-500/10 border-blue-500/20 text-blue-200'
              }`}>
                <span className="font-bold block mb-0.5 text-[10px] uppercase text-blue-500">Observações de Arquitetura:</span>
                <p className="whitespace-pre-wrap">{selectedNode.notes}</p>
              </div>
            )}

            {/* Active Connected Services in diagram */}
            {relatedLinks.length > 0 && (
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block mb-1.5">
                  Conexões e Fluxo de Dados ({relatedLinks.length}):
                </span>
                <div className="max-h-28 overflow-y-auto custom-scrollbar space-y-1 pr-1">
                  {relatedLinks.map((link) => {
                    const isOutgoing = link.from === selectedNode.id;
                    const otherNodeId = isOutgoing ? link.to : link.from;
                    const otherNode = diagram.nodes.find((n) => n.id === otherNodeId);
                    return (
                      <div
                        key={link.id}
                        className={`flex items-center justify-between p-1.5 rounded-lg text-[11px] border ${
                          isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/20 border-white/5'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5 truncate">
                          <span className={`text-[10px] font-bold px-1 rounded ${
                            isOutgoing ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {isOutgoing ? 'SAÍDA' : 'ENTRADA'}
                          </span>
                          <span className="font-semibold truncate">{otherNode?.name || otherNodeId}</span>
                        </div>
                        {link.protocol && (
                          <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {link.protocol}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </aside>
      )}
    </>
  );
};
