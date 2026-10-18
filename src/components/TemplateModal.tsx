import React, { useState, useMemo } from 'react';
import { 
  X, 
  LayoutTemplate, 
  ArrowRight, 
  Sparkles, 
  Search, 
  Cpu, 
  Cloud, 
  Layers, 
  Bot, 
  CheckCircle2 
} from 'lucide-react';
import { DiagramState } from '../types';
import { STARTER_TEMPLATES } from '../data/templates';

interface TemplateModalProps {
  setDiagram: React.Dispatch<React.SetStateAction<DiagramState>>;
  onClose: () => void;
  onRecordHistory: () => void;
  theme?: 'dark' | 'light';
}

type CategoryTab = 'all' | 'ai' | 'aws' | 'azure' | 'gcp' | 'oci' | 'multicloud';

export const TemplateModal: React.FC<TemplateModalProps> = ({
  setDiagram,
  onClose,
  onRecordHistory,
  theme
}) => {
  const isLight = theme === 'light';
  const [activeCategory, setActiveCategory] = useState<CategoryTab>('ai');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectTemplate = (template: DiagramState) => {
    onRecordHistory();
    setDiagram((prev) => ({
      ...template,
      id: prev?.id || `diag_${Date.now()}`,
      version: prev?.version || 'v1.0',
      updatedAt: new Date().toISOString()
    }));
    onClose();
  };

  const isAiTemplate = (t: DiagramState): boolean => {
    return (
      t.id.startsWith('template_ai_') ||
      t.nodes.some((n) => n.category === 'ai' || n.iconKey.startsWith('ai_'))
    );
  };

  const filteredTemplates = useMemo(() => {
    return STARTER_TEMPLATES.filter((tmpl) => {
      // Category filter
      if (activeCategory === 'ai') {
        if (!isAiTemplate(tmpl)) return false;
      } else if (activeCategory === 'aws') {
        if (tmpl.primaryProvider !== 'aws' || isAiTemplate(tmpl)) return false;
      } else if (activeCategory === 'azure') {
        if (tmpl.primaryProvider !== 'azure') return false;
      } else if (activeCategory === 'gcp') {
        if (tmpl.primaryProvider !== 'gcp' || isAiTemplate(tmpl)) return false;
      } else if (activeCategory === 'oci') {
        if (tmpl.primaryProvider !== 'oci') return false;
      } else if (activeCategory === 'multicloud') {
        if (!tmpl.id.includes('multicloud') && tmpl.containers.length < 3) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = tmpl.title.toLowerCase().includes(query);
        const matchesDesc = tmpl.description.toLowerCase().includes(query);
        const matchesNodes = tmpl.nodes.some((n) => n.name.toLowerCase().includes(query) || n.iconKey.toLowerCase().includes(query));
        return matchesTitle || matchesDesc || matchesNodes;
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  const aiTemplatesCount = useMemo(() => {
    return STARTER_TEMPLATES.filter(isAiTemplate).length;
  }, []);

  const getAiBadge = (tmplId: string) => {
    if (tmplId.includes('openai')) {
      return {
        label: 'OpenAI GPT-4o & Assistants',
        color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
      };
    }
    if (tmplId.includes('claude')) {
      return {
        label: 'Anthropic Claude 3.5 & 3.7',
        color: 'bg-amber-500/15 text-amber-400 border-amber-500/30'
      };
    }
    if (tmplId.includes('gemini')) {
      return {
        label: 'Google Gemini 2.0 & Vertex AI',
        color: 'bg-blue-500/15 text-blue-400 border-blue-500/30'
      };
    }
    if (tmplId.includes('meta')) {
      return {
        label: 'Meta Llama 3.3 (70B & 405B)',
        color: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
      };
    }
    if (tmplId.includes('multimodel')) {
      return {
        label: 'OpenAI + Claude + Gemini + Meta',
        color: 'bg-purple-500/15 text-purple-400 border-purple-500/30'
      };
    }
    return null;
  };

  return (
    <div className={`fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-4 ${
      isLight ? 'bg-slate-900/60' : 'bg-black/80'
    } animate-fade-in`}>
      <div className={`border rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden transition-colors ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#12141A] border-white/10 text-slate-200'
      }`}>
        {/* Modal Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-black/30'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl ${
              isLight ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white' : 'bg-gradient-to-tr from-blue-500 to-indigo-500 text-white'
            } shadow-md`}>
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className={`text-base font-bold ${isLight ? 'text-slate-950' : 'text-slate-100'}`}>
                  Catálogo de Templates Arquiteturais
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>GenAI & Cloud</span>
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
                Selecione modelos completos para OpenAI, Claude, Gemini, Meta Llama, AWS, Azure, GCP e Multi-Cloud
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isLight ? 'hover:bg-slate-200 text-slate-600 hover:text-slate-900' : 'hover:bg-white/10 text-slate-400 hover:text-slate-200'
            }`}
            title="Fechar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters & Search Toolbar */}
        <div className={`px-6 py-3 border-b flex flex-wrap items-center justify-between gap-3 ${
          isLight ? 'border-slate-200 bg-slate-50/60' : 'border-white/5 bg-[#0f1118]'
        }`}>
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              id="filter-tab-ai"
              onClick={() => setActiveCategory('ai')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activeCategory === 'ai'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-md shadow-blue-500/20'
                  : isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span>Soluções de IA (OpenAI, Claude, Gemini, Meta)</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeCategory === 'ai' ? 'bg-white/20 text-white' : 'bg-blue-500/20 text-blue-400'
              }`}>
                {aiTemplatesCount}
              </span>
            </button>

            <button
              id="filter-tab-all"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activeCategory === 'all'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                  : isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
              }`}
            >
              Todos ({STARTER_TEMPLATES.length})
            </button>

            <button
              id="filter-tab-aws"
              onClick={() => setActiveCategory('aws')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activeCategory === 'aws'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-500/20'
                  : isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
              }`}
            >
              AWS
            </button>

            <button
              id="filter-tab-azure"
              onClick={() => setActiveCategory('azure')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activeCategory === 'azure'
                  ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-500/20'
                  : isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
              }`}
            >
              Azure
            </button>

            <button
              id="filter-tab-gcp"
              onClick={() => setActiveCategory('gcp')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activeCategory === 'gcp'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20'
                  : isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
              }`}
            >
              Google Cloud
            </button>

            <button
              id="filter-tab-multicloud"
              onClick={() => setActiveCategory('multicloud')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activeCategory === 'multicloud'
                  ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/20'
                  : isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
              }`}
            >
              Multi-Cloud
            </button>
          </div>

          {/* Quick Search Input */}
          <div className="relative min-w-[220px]">
            <Search className={`w-3.5 h-3.5 absolute left-3 top-2.5 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
            <input
              id="input-search-templates"
              type="text"
              placeholder="Buscar por IA, modelo, serviço..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border outline-none transition-all ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                  : 'bg-black/30 border-white/10 text-slate-100 focus:border-blue-500'
              }`}
            />
          </div>
        </div>

        {/* Gallery Content */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 custom-scrollbar flex-1">
          {filteredTemplates.length === 0 ? (
            <div className="col-span-2 py-12 flex flex-col items-center justify-center text-center">
              <Bot className="w-12 h-12 text-slate-500/50 mb-3" />
              <p className="text-sm font-bold">Nenhum template encontrado</p>
              <p className="text-xs text-slate-500 mt-1">
                Tente ajustar a busca ou alternar a categoria acima.
              </p>
            </div>
          ) : (
            filteredTemplates.map((tmpl) => {
              const aiBadge = getAiBadge(tmpl.id);
              const isAi = isAiTemplate(tmpl);

              return (
                <div
                  key={tmpl.id}
                  id={`btn-load-template-${tmpl.id}`}
                  onClick={() => handleSelectTemplate(tmpl)}
                  className={`border rounded-2xl p-5 cursor-pointer transition-all hover:shadow-xl group flex flex-col justify-between relative overflow-hidden ${
                    isAi
                      ? isLight
                        ? 'bg-gradient-to-br from-slate-50 to-blue-50/40 hover:from-white hover:to-blue-50 border-blue-200 hover:border-blue-500 shadow-sm'
                        : 'bg-gradient-to-br from-[#121520] to-[#161a29] hover:from-[#171b2a] hover:to-[#1e2338] border-white/10 hover:border-blue-500/60 shadow-lg'
                      : isLight
                      ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-blue-500'
                      : 'bg-black/40 hover:bg-white/5 border-white/10 hover:border-blue-500/80'
                  }`}
                >
                  <div>
                    {/* Header Badges */}
                    <div className="flex items-center justify-between mb-2.5 gap-2">
                      <div className="flex items-center space-x-1.5 flex-wrap">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                            tmpl.primaryProvider === 'aws'
                              ? 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                              : tmpl.primaryProvider === 'azure'
                              ? 'bg-sky-500/15 text-sky-500 border-sky-500/30'
                              : tmpl.primaryProvider === 'gcp'
                              ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30'
                              : 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
                          }`}
                        >
                          {tmpl.primaryProvider}
                        </span>

                        {aiBadge && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center space-x-1 ${aiBadge.color}`}>
                            <Sparkles className="w-2.5 h-2.5 shrink-0" />
                            <span>{aiBadge.label}</span>
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] font-mono text-slate-500 shrink-0">
                        {tmpl.nodes.length} nós • {tmpl.containers.length} containers
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-sm font-bold group-hover:text-blue-500 transition-colors leading-snug ${
                      isLight ? 'text-slate-950' : 'text-slate-100'
                    }`}>
                      {tmpl.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-xs mt-1.5 leading-relaxed line-clamp-3 ${
                      isLight ? 'text-slate-600 font-medium' : 'text-slate-400'
                    }`}>
                      {tmpl.description}
                    </p>

                    {/* Key components preview tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {tmpl.nodes.slice(0, 4).map((node) => (
                        <span
                          key={node.id}
                          className={`text-[9px] font-semibold px-2 py-0.5 rounded-md border truncate max-w-[140px] ${
                            isLight
                              ? 'bg-white border-slate-200 text-slate-700'
                              : 'bg-white/5 border-white/10 text-slate-300'
                          }`}
                        >
                          {node.name}
                        </span>
                      ))}
                      {tmpl.nodes.length > 4 && (
                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md ${
                          isLight ? 'text-slate-500' : 'text-slate-400'
                        }`}>
                          +{tmpl.nodes.length - 4} mais
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-bold ${
                    isLight ? 'border-slate-200 text-blue-600 group-hover:text-blue-700' : 'border-white/10 text-blue-400 group-hover:text-blue-300'
                  }`}>
                    <span>Carregar Arquitetura no Canvas</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
