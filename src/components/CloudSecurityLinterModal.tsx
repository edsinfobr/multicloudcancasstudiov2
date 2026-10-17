import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  X,
  RefreshCw,
  ExternalLink,
  Lock,
  Server,
  Database,
  Network,
  HardDrive
} from 'lucide-react';
import { DiagramState } from '../types';
import { runCloudSecurityLinter, SecurityLinterReport, SecurityFinding, SecuritySeverity } from '../utils/cloudLinter';

interface CloudSecurityLinterModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagram: DiagramState;
  onSelectResource?: (resourceId: string) => void;
  theme?: 'dark' | 'light';
}

export const CloudSecurityLinterModal: React.FC<CloudSecurityLinterModalProps> = ({
  isOpen,
  onClose,
  diagram,
  onSelectResource,
  theme = 'dark'
}) => {
  const isLight = theme === 'light';
  const [selectedSeverity, setSelectedSeverity] = useState<SecuritySeverity | 'all'>('all');
  const [report, setReport] = useState<SecurityLinterReport>(() => runCloudSecurityLinter(diagram));

  if (!isOpen) return null;

  const handleRefresh = () => {
    setReport(runCloudSecurityLinter(diagram));
  };

  const filteredFindings = report.findings.filter((f) => {
    if (selectedSeverity === 'all') return true;
    return f.severity === selectedSeverity;
  });

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getSeverityBadge = (severity: SecuritySeverity) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded bg-rose-500/20 text-rose-500 border border-rose-500/30">
            Crítica
          </span>
        );
      case 'high':
        return (
          <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded bg-amber-500/20 text-amber-500 border border-amber-500/30">
            Alta
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded bg-yellow-500/20 text-yellow-500 border border-yellow-500/30">
            Média
          </span>
        );
      case 'low':
        return (
          <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded bg-blue-500/20 text-blue-500 border border-blue-500/30">
            Baixa
          </span>
        );
    }
  };

  const getCategoryIcon = (cat: SecurityFinding['category']) => {
    switch (cat) {
      case 'compute': return <Server className="w-4 h-4 text-blue-400" />;
      case 'database': return <Database className="w-4 h-4 text-amber-400" />;
      case 'network': return <Network className="w-4 h-4 text-emerald-400" />;
      case 'storage': return <HardDrive className="w-4 h-4 text-purple-400" />;
      default: return <Lock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div
        id="modal-cloud-security-linter"
        className={`w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#111318] border-white/10 text-slate-100'
        }`}
      >
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between ${
          isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl border ${
              report.criticalCount > 0
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
            }`}>
              {report.criticalCount > 0 ? (
                <ShieldAlert className="w-6 h-6" />
              ) : (
                <ShieldCheck className="w-6 h-6" />
              )}
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center space-x-2">
                <span>Linter de Segurança em Nuvem</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold border ${
                  report.criticalCount > 0
                    ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                    : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                }`}>
                  {report.totalFindings === 0 ? 'Conforme' : `${report.totalFindings} Apontamentos`}
                </span>
              </h2>
              <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Análise de conformidade e mitigação de vulnerabilidades (instâncias públicas, firewalls, bancos e tráfego)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                isLight ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700' : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
              }`}
              title="Recalcular auditoria"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reavaliar</span>
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg border transition-colors ${
                isLight ? 'hover:bg-slate-100 border-slate-300 text-slate-500' : 'hover:bg-white/10 border-white/10 text-slate-400'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Overview Metric Bar */}
        <div className={`grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 border-b ${
          isLight ? 'bg-slate-100/70 border-slate-200' : 'bg-black/20 border-white/10'
        }`}>
          <div className={`p-3 rounded-xl border flex flex-col items-center justify-center ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-white/5 border-white/5'
          }`}>
            <span className={`text-2xl font-black ${getScoreColor(report.overallScore)}`}>
              {report.overallScore}
              <span className="text-xs font-medium text-slate-400">/100</span>
            </span>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mt-1">Score Geral</span>
          </div>

          <button
            onClick={() => setSelectedSeverity(selectedSeverity === 'critical' ? 'all' : 'critical')}
            className={`p-3 rounded-xl border text-center transition-all ${
              selectedSeverity === 'critical' ? 'ring-2 ring-rose-500' : ''
            } ${isLight ? 'bg-white border-slate-200 hover:border-rose-300 shadow-sm' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
          >
            <span className="text-2xl font-black text-rose-500">{report.criticalCount}</span>
            <div className="text-[11px] font-bold text-rose-500 uppercase tracking-wide mt-1">Crítica</div>
          </button>

          <button
            onClick={() => setSelectedSeverity(selectedSeverity === 'high' ? 'all' : 'high')}
            className={`p-3 rounded-xl border text-center transition-all ${
              selectedSeverity === 'high' ? 'ring-2 ring-amber-500' : ''
            } ${isLight ? 'bg-white border-slate-200 hover:border-amber-300 shadow-sm' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
          >
            <span className="text-2xl font-black text-amber-500">{report.highCount}</span>
            <div className="text-[11px] font-bold text-amber-500 uppercase tracking-wide mt-1">Alta</div>
          </button>

          <button
            onClick={() => setSelectedSeverity(selectedSeverity === 'medium' ? 'all' : 'medium')}
            className={`p-3 rounded-xl border text-center transition-all ${
              selectedSeverity === 'medium' ? 'ring-2 ring-yellow-500' : ''
            } ${isLight ? 'bg-white border-slate-200 hover:border-yellow-300 shadow-sm' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
          >
            <span className="text-2xl font-black text-yellow-500">{report.mediumCount}</span>
            <div className="text-[11px] font-bold text-yellow-500 uppercase tracking-wide mt-1">Média</div>
          </button>

          <button
            onClick={() => setSelectedSeverity(selectedSeverity === 'low' ? 'all' : 'low')}
            className={`p-3 rounded-xl border text-center transition-all ${
              selectedSeverity === 'low' ? 'ring-2 ring-blue-500' : ''
            } ${isLight ? 'bg-white border-slate-200 hover:border-blue-300 shadow-sm' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
          >
            <span className="text-2xl font-black text-blue-500">{report.lowCount}</span>
            <div className="text-[11px] font-bold text-blue-500 uppercase tracking-wide mt-1">Baixa</div>
          </button>
        </div>

        {/* Filter Badges */}
        <div className={`px-5 py-2.5 border-b flex items-center justify-between text-xs ${
          isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-[#12141A]'
        }`}>
          <div className="flex items-center space-x-2">
            <span className="text-slate-500 font-semibold">Filtro:</span>
            {(['all', 'critical', 'high', 'medium', 'low'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  selectedSeverity === sev
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isLight
                    ? 'text-slate-600 hover:bg-slate-100'
                    : 'text-slate-400 hover:bg-white/5'
                }`}
              >
                {sev === 'all' ? 'Todos' : sev.charAt(0).toUpperCase() + sev.slice(1)}
              </button>
            ))}
          </div>
          <span className="text-slate-400 text-xs">
            Exibindo {filteredFindings.length} de {report.totalFindings} achados
          </span>
        </div>

        {/* Findings Body List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {filteredFindings.length === 0 ? (
            <div className="py-16 text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-sm font-bold">Nenhum apontamento de segurança nesta categoria!</h3>
              <p className={`text-xs max-w-md mx-auto mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                A topologia atual respeita as boas práticas avaliadas de conectividade e isolamento seguro.
              </p>
            </div>
          ) : (
            filteredFindings.map((finding) => (
              <div
                key={finding.id}
                className={`p-4 rounded-xl border transition-all ${
                  isLight
                    ? 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5 p-1.5 rounded-lg bg-white/5 border border-white/5">
                      {getCategoryIcon(finding.category)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        {getSeverityBadge(finding.severity)}
                        <h4 className="text-xs font-bold">{finding.title}</h4>
                      </div>
                      {finding.resourceName && (
                        <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center space-x-1">
                          <span>Recurso afetado:</span>
                          <span className="font-semibold text-blue-400">{finding.resourceName}</span>
                          {finding.resourceId && onSelectResource && (
                            <button
                              onClick={() => {
                                onSelectResource(finding.resourceId!);
                                onClose();
                              }}
                              className="ml-2 text-xs text-blue-500 hover:underline flex items-center space-x-0.5"
                            >
                              <span>Visualizar</span>
                              <ExternalLink className="w-3 h-3 inline" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <p className={`text-xs mt-2.5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  {finding.description}
                </p>

                {/* Recommendation Box */}
                <div className={`mt-3 p-3 rounded-lg border text-xs ${
                  isLight ? 'bg-blue-50/70 border-blue-200 text-blue-950' : 'bg-blue-950/20 border-blue-500/20 text-blue-200'
                }`}>
                  <div className="font-bold flex items-center space-x-1.5 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-blue-500" />
                    <span>Solução Recomendada:</span>
                  </div>
                  <p className="leading-relaxed">{finding.recommendation}</p>

                  {finding.remediationSnippet && (
                    <pre className={`mt-2 p-2.5 rounded text-[11px] font-mono overflow-x-auto border ${
                      isLight ? 'bg-slate-900 text-emerald-400 border-slate-800' : 'bg-black/60 text-emerald-400 border-white/10'
                    }`}>
                      {finding.remediationSnippet}
                    </pre>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex items-center justify-between text-xs ${
          isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#12141A]'
        }`}>
          <div className="flex items-center space-x-2 text-slate-500">
            <Info className="w-4 h-4 text-blue-500" />
            <span>Auditoria executada com base no CIS Benchmarks e Well-Architected Framework.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-colors shadow-sm"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
