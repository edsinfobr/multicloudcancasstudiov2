import React, { useState } from 'react';
import {
  X,
  History,
  Tag,
  Calendar,
  Sparkles,
  PlusCircle,
  RefreshCw,
  ShieldCheck,
  Search,
  ChevronRight,
  Download,
  FileText
} from 'lucide-react';
import { CHANGELOG_DATA, ChangelogEntry, LATEST_APP_VERSION } from '../data/changelogData';

interface ChangelogModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'dark' | 'light';
}

export const ChangelogModal: React.FC<ChangelogModalProps> = ({
  isOpen,
  onClose,
  theme = 'dark'
}) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVersion, setSelectedVersion] = useState<string>(LATEST_APP_VERSION);

  const filteredEntries = CHANGELOG_DATA.filter(entry => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      entry.version.toLowerCase().includes(q) ||
      entry.title.toLowerCase().includes(q) ||
      entry.highlight.toLowerCase().includes(q) ||
      entry.added.some(item => item.toLowerCase().includes(q)) ||
      entry.changed.some(item => item.toLowerCase().includes(q))
    );
  });

  const activeEntry = CHANGELOG_DATA.find(e => e.version === selectedVersion) || filteredEntries[0] || CHANGELOG_DATA[0];

  const handleDownloadChangelog = () => {
    const markdownContent = CHANGELOG_DATA.map(e => `## [${e.version}] - ${e.date}\n### ${e.title}\n*${e.highlight}*\n\n#### ✨ Adicionado:\n${e.added.map(a => `- ${a}`).join('\n')}\n\n#### 🔄 Modificado:\n${e.changed.map(c => `- ${c}`).join('\n')}${e.security ? `\n\n#### 🛡️ Segurança:\n${e.security.map(s => `- ${s}`).join('\n')}` : ''}`).join('\n\n---\n\n');
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'CHANGELOG-MultiCloud-Canvas.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      id="modal-changelog"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn select-none"
    >
      <div
        className={`w-full max-w-4xl h-[85vh] max-h-[750px] rounded-2xl border shadow-2xl flex flex-col overflow-hidden transition-all ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900 shadow-slate-300/40'
            : 'bg-[#0F1117] border-white/10 text-slate-100 shadow-black/60'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between shrink-0 ${
            isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/[0.02]'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <History className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-base tracking-tight">Registro de Mudanças & Versões</h3>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  CHANGELOG.md
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Histórico detalhado de todas as alterações, novos recursos e melhorias desde a v1.0.0
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="btn-download-changelog-md"
              onClick={handleDownloadChangelog}
              title="Baixar arquivo CHANGELOG.md"
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-blue-500" />
              <span className="hidden sm:inline">Baixar .md</span>
            </button>

            <button
              id="btn-close-changelog"
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isLight ? 'hover:bg-slate-200 text-slate-500' : 'hover:bg-white/10 text-slate-400'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search and Navigation Bar */}
        <div
          className={`px-6 py-2.5 border-b flex items-center justify-between gap-4 shrink-0 ${
            isLight ? 'border-slate-100 bg-slate-50/50' : 'border-white/5 bg-white/[0.01]'
          }`}
        >
          <div className="relative flex-1 max-w-sm">
            <Search className={`w-4 h-4 absolute left-3 top-2.5 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por recurso, versão ou termo..."
              className={`w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border focus:outline-none transition-all ${
                isLight
                  ? 'bg-white border-slate-200 focus:border-blue-500 text-slate-800'
                  : 'bg-white/5 border-white/10 focus:border-blue-500 text-slate-200'
              }`}
            />
          </div>

          <div className="text-xs text-slate-400 flex items-center space-x-2">
            <span>Total de Versões:</span>
            <span className="font-bold text-blue-500 font-mono">{CHANGELOG_DATA.length} releases</span>
          </div>
        </div>

        {/* Main Content Layout: Left list of versions, Right detail viewer */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Column: Version Navigation */}
          <div
            className={`w-64 border-r overflow-y-auto shrink-0 p-3 space-y-1.5 ${
              isLight ? 'border-slate-200 bg-slate-50/30' : 'border-white/5 bg-white/[0.01]'
            }`}
          >
            {filteredEntries.map(entry => {
              const isSelected = entry.version === activeEntry?.version;
              return (
                <button
                  key={entry.version}
                  id={`btn-changelog-ver-${entry.version}`}
                  onClick={() => setSelectedVersion(entry.version)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start justify-between ${
                    isSelected
                      ? isLight
                        ? 'bg-blue-50/80 border-blue-400 text-blue-950 shadow-sm'
                        : 'bg-blue-600/20 border-blue-500/50 text-blue-100 shadow-sm'
                      : isLight
                      ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                      : 'bg-white/5 hover:bg-white/10 border-white/5 text-slate-300'
                  }`}
                >
                  <div className="space-y-1 pr-1 overflow-hidden">
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected
                          ? isLight ? 'bg-blue-200 text-blue-900' : 'bg-blue-500/40 text-blue-200'
                          : isLight ? 'bg-slate-200 text-slate-800' : 'bg-white/10 text-slate-300'
                      }`}>
                        {entry.version}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {entry.date}
                      </span>
                    </div>
                    <p className="text-xs font-semibold truncate">
                      {entry.title}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                    isSelected ? 'text-blue-500 translate-x-0.5' : 'text-slate-500 opacity-40'
                  }`} />
                </button>
              );
            })}

            {filteredEntries.length === 0 && (
              <div className="p-4 text-center text-xs text-slate-400">
                Nenhuma versão encontrada para "{searchQuery}".
              </div>
            )}
          </div>

          {/* Right Column: Version Details */}
          {activeEntry ? (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Header Box */}
              <div className={`p-4 rounded-xl border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2.5">
                    <span className="px-2.5 py-1 rounded-lg text-sm font-bold font-mono bg-blue-600 text-white shadow-sm">
                      {activeEntry.version}
                    </span>
                    <h2 className="text-base font-bold tracking-tight">
                      {activeEntry.title}
                    </h2>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{activeEntry.date}</span>
                  </div>
                </div>

                <div className="mt-3 text-xs leading-relaxed text-slate-400 flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className={isLight ? 'text-slate-700 font-medium' : 'text-slate-200 font-medium'}>
                    {activeEntry.highlight}
                  </span>
                </div>
              </div>

              {/* Added Section */}
              {activeEntry.added && activeEntry.added.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-500">
                    <PlusCircle className="w-4 h-4" />
                    <span>Recursos Adicionados ({activeEntry.added.length})</span>
                  </div>
                  <div className={`rounded-xl border overflow-hidden divide-y ${
                    isLight ? 'border-slate-200 divide-slate-100 bg-white' : 'border-white/10 divide-white/5 bg-white/[0.01]'
                  }`}>
                    {activeEntry.added.map((item, idx) => (
                      <div key={idx} className="p-3 text-xs flex items-start space-x-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                        <span className={`leading-relaxed ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Changed Section */}
              {activeEntry.changed && activeEntry.changed.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-500">
                    <RefreshCw className="w-4 h-4" />
                    <span>Modificações & Melhorias ({activeEntry.changed.length})</span>
                  </div>
                  <div className={`rounded-xl border overflow-hidden divide-y ${
                    isLight ? 'border-slate-200 divide-slate-100 bg-white' : 'border-white/10 divide-white/5 bg-white/[0.01]'
                  }`}>
                    {activeEntry.changed.map((item, idx) => (
                      <div key={idx} className="p-3 text-xs flex items-start space-x-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                        <span className={`leading-relaxed ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Section */}
              {activeEntry.security && activeEntry.security.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-purple-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Segurança & Governança ({activeEntry.security.length})</span>
                  </div>
                  <div className={`rounded-xl border overflow-hidden divide-y ${
                    isLight ? 'border-slate-200 divide-slate-100 bg-white' : 'border-white/10 divide-white/5 bg-white/[0.01]'
                  }`}>
                    {activeEntry.security.map((item, idx) => (
                      <div key={idx} className="p-3 text-xs flex items-start space-x-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                        <span className={`leading-relaxed ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400 text-xs">
              Selecione uma versão ao lado para visualizar os detalhes.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          className={`px-6 py-3 border-t flex items-center justify-between text-xs shrink-0 ${
            isLight ? 'border-slate-200 bg-slate-50 text-slate-600' : 'border-white/10 bg-white/[0.02] text-slate-400'
          }`}
        >
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-blue-500" />
            <span>Arquivo fonte: <strong>/CHANGELOG.md</strong> na raiz do projeto</span>
          </div>

          <button
            id="btn-close-changelog-footer"
            onClick={onClose}
            className={`px-4 py-1.5 rounded-lg border font-semibold text-xs transition-all ${
              isLight
                ? 'bg-slate-200 hover:bg-slate-300 border-slate-300 text-slate-800'
                : 'bg-white/10 hover:bg-white/20 border-white/10 text-white'
            }`}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
