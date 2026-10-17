import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  X,
  Check,
  Building2,
  User,
  Calendar,
  DollarSign,
  Clock,
  Layers,
  Rocket,
  ShieldCheck,
  Cpu,
  ArrowRightLeft,
  Sparkles,
  Info,
  CheckCircle2,
  Image as ImageIcon,
  RefreshCw,
  Palette
} from 'lucide-react';
import { DiagramState, ProposalType, ProposalConfig } from '../types';
import { generateProposalDocx, downloadBlob } from '../utils/proposalDocxGenerator';
import { calculateTotalCost } from '../utils/costCalculator';
import { getCleanArchitectureImage } from '../utils/exportUtils';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  diagram: DiagramState;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
  initialType?: ProposalType;
  theme?: 'dark' | 'light';
  showToast?: (msg: string) => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({
  isOpen,
  onClose,
  diagram,
  canvasRef,
  initialType = 'implementation',
  theme = 'dark',
  showToast
}) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';

  // Proposal State
  const [proposalType, setProposalType] = useState<ProposalType>(initialType);
  const [clientCompany, setClientCompany] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientRole, setClientRole] = useState('Diretor de Tecnologia / CTO');
  const [consultantName, setConsultantName] = useState(
    diagram.metadata?.author || 'Especialista em Cloud Architecture'
  );
  const [consultantCompany, setConsultantCompany] = useState('EdsInfoBR Consultoria em Nuvem & IA');
  const [consultantRole, setConsultantRole] = useState(
    diagram.metadata?.role || 'Arquiteto de Soluções MultiCloud'
  );
  const [projectTitle, setProjectTitle] = useState(
    diagram.metadata?.project || diagram.title || 'Arquitetura MultiCloud'
  );
  const [estimatedWeeks, setEstimatedWeeks] = useState<number>(initialType === 'migration' ? 8 : 6);
  const [projectBudgetBrl, setProjectBudgetBrl] = useState<number>(initialType === 'migration' ? 48500 : 38000);
  const [monthlySupportBudgetBrl, setMonthlySupportBudgetBrl] = useState<number>(initialType === 'migration' ? 6500 : 4900);
  const [slaTarget, setSlaTarget] = useState('99.95% de Alta Disponibilidade');
  const [migrationStrategy, setMigrationStrategy] = useState<'rehost' | 'replatform' | 'refactor' | 'hybrid'>('replatform');
  const [isGenerating, setIsGenerating] = useState(false);

  // Architecture Image (clean, transparent background, components only)
  const [architectureImage, setArchitectureImage] = useState<{
    dataUrl: string;
    width: number;
    height: number;
    cropWidth: number;
    cropHeight: number;
  } | null>(null);
  const [isCapturingImage, setIsCapturingImage] = useState<boolean>(false);
  const [diagramImageTheme, setDiagramImageTheme] = useState<'light' | 'dark'>('light');

  // Capture clean architecture image with transparent background (components only)
  const captureArchitectureDiagram = async (lightTheme: boolean = diagramImageTheme === 'light') => {
    try {
      setIsCapturingImage(true);
      const canvasEl =
        canvasRef?.current ||
        (document.getElementById('architecture-canvas-stage') as HTMLElement) ||
        (document.getElementById('architecture-canvas-container') as HTMLElement);

      if (!canvasEl) {
        console.warn('Canvas element not found for proposal image capture');
        return null;
      }

      const result = await getCleanArchitectureImage(canvasEl, diagram, {
        format: 'png',
        pixelRatio: 2,
        padding: 30,
        lightTheme
      });

      if (result) {
        setArchitectureImage(result);
        return result;
      }
      return null;
    } catch (err) {
      console.warn('Failed to capture architecture drawing for proposal:', err);
      return null;
    } finally {
      setIsCapturingImage(false);
    }
  };

  // Auto capture on mount or theme change
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        captureArchitectureDiagram(diagramImageTheme === 'light');
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, diagramImageTheme]);

  // Sync defaults when switching proposal type
  const handleTypeChange = (newType: ProposalType) => {
    setProposalType(newType);
    if (newType === 'migration') {
      if (estimatedWeeks === 6) setEstimatedWeeks(8);
      if (projectBudgetBrl === 38000) setProjectBudgetBrl(48500);
      if (monthlySupportBudgetBrl === 4900) setMonthlySupportBudgetBrl(6500);
    } else {
      if (estimatedWeeks === 8) setEstimatedWeeks(6);
      if (projectBudgetBrl === 48500) setProjectBudgetBrl(38000);
      if (monthlySupportBudgetBrl === 6500) setMonthlySupportBudgetBrl(4900);
    }
  };

  // Cloud cost calculation from current diagram
  const costReport = calculateTotalCost(diagram.nodes);
  const totalMonthlyUSD = costReport.totalMonthly;
  const totalMonthlyBRL = totalMonthlyUSD * 5.65;

  const activeProviders = Array.from(new Set(diagram.nodes.map((n) => n.provider.toUpperCase())));
  const providerDisplay = activeProviders.length > 0 ? activeProviders.join(', ') : 'Multi-Cloud';

  const handleDownloadDocx = async () => {
    try {
      setIsGenerating(true);

      // Ensure clean architecture drawing (without background) is ready
      let imgToUse = architectureImage;
      if (!imgToUse) {
        imgToUse = await captureArchitectureDiagram(diagramImageTheme === 'light');
      }

      const config: ProposalConfig = {
        type: proposalType,
        clientCompany: clientCompany.trim() || 'Empresa Contratante',
        clientName: clientName.trim() || 'Gestor Responsável',
        clientRole: clientRole.trim() || 'Liderança Técnica',
        consultantCompany: consultantCompany.trim() || 'EdsInfoBR Consultoria',
        consultantName: consultantName.trim() || 'Consultor Especialista',
        consultantRole: consultantRole.trim() || 'Arquiteto Cloud',
        projectTitle: projectTitle.trim() || diagram.title || 'Arquitetura Cloud',
        estimatedWeeks,
        projectBudgetBrl,
        monthlySupportBudgetBrl,
        slaTarget,
        migrationStrategy,
        architectureImage: imgToUse ? { dataUrl: imgToUse.dataUrl, width: imgToUse.width, height: imgToUse.height } : undefined
      };

      const blob = await generateProposalDocx(
        diagram,
        config,
        imgToUse ? { dataUrl: imgToUse.dataUrl, width: imgToUse.width, height: imgToUse.height } : null
      );
      const sanitizedTitle = (diagram.title || 'arquitetura')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-');
      const filename = `Proposta-${proposalType === 'migration' ? 'Migracao' : 'Implementacao'}-${sanitizedTitle}.docx`;

      downloadBlob(blob, filename);

      if (showToast) {
        showToast(`Proposta gerada com sucesso: ${filename}`);
      }
      onClose();
    } catch (err) {
      console.error('Erro ao gerar arquivo docx da proposta:', err);
      if (showToast) {
        showToast('Falha ao gerar proposta docx. Verifique os dados e tente novamente.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div
        className={`w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col my-6 transition-all ${
          isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#12141A] border-white/10 text-slate-100'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#181B24] border-white/10'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center space-x-2">
                <span>Gerar Proposta Comercial & Técnica</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  .DOCX Word
                </span>
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Gere um documento Word formal, 100% editável, com escopo técnico e financeiro completo.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isLight ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-white/10 text-slate-400'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-x-0 space-y-6 max-h-[78vh] overflow-y-auto">
          {/* Step 1: Scenario Selector */}
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-2.5 ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}>
              1. Selecione o Tipo de Proposta
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Option A: Implementação */}
              <button
                type="button"
                onClick={() => handleTypeChange('implementation')}
                className={`p-4 rounded-xl border text-left transition-all relative cursor-pointer ${
                  proposalType === 'implementation'
                    ? isLight
                      ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500 shadow-md'
                      : 'border-blue-500 bg-blue-600/15 ring-2 ring-blue-500/80 shadow-md shadow-blue-500/10'
                    : isLight
                    ? 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5 mb-1.5">
                    <div className={`p-2 rounded-lg ${
                      proposalType === 'implementation'
                        ? 'bg-blue-600 text-white'
                        : isLight ? 'bg-slate-200 text-slate-700' : 'bg-white/10 text-slate-300'
                    }`}>
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">Proposta de Implementação</h3>
                      <span className={`text-[11px] font-semibold ${
                        proposalType === 'implementation' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
                      }`}>
                        Greenfield / Nova Infraestrutura Cloud
                      </span>
                    </div>
                  </div>
                  {proposalType === 'implementation' && (
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className={`text-xs mt-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Foco na criação do zero: Landing Zone segura, provisionamento 100% via Terraform, pipelines CI/CD, banco de dados gerenciado e observabilidade desde o Dia 1.
                </p>
              </button>

              {/* Option B: Migração */}
              <button
                type="button"
                onClick={() => handleTypeChange('migration')}
                className={`p-4 rounded-xl border text-left transition-all relative cursor-pointer ${
                  proposalType === 'migration'
                    ? isLight
                      ? 'border-indigo-600 bg-indigo-50/80 ring-2 ring-indigo-500 shadow-md'
                      : 'border-indigo-500 bg-indigo-600/15 ring-2 ring-indigo-500/80 shadow-md shadow-indigo-500/10'
                    : isLight
                    ? 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5 mb-1.5">
                    <div className={`p-2 rounded-lg ${
                      proposalType === 'migration'
                        ? 'bg-indigo-600 text-white'
                        : isLight ? 'bg-slate-200 text-slate-700' : 'bg-white/10 text-slate-300'
                    }`}>
                      <Rocket className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">Proposta de Migração</h3>
                      <span className={`text-[11px] font-semibold ${
                        proposalType === 'migration' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'
                      }`}>
                        Migração On-Premise ou Multi-Cloud
                      </span>
                    </div>
                  </div>
                  {proposalType === 'migration' && (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className={`text-xs mt-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Foco na transição com segurança: Discovery detalhado com framework 7 Rs, migração em ondas (wave-based), replicação de banco de dados e cutover com near-zero downtime.
                </p>
              </button>
            </div>
          </div>

          {/* Step 2: Form Configuration (Client & Proposal Parameters) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Client & Project Info */}
            <div className={`p-4 rounded-xl border ${
              isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-white/[0.02] border-white/10'
            }`}>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center space-x-1.5 text-blue-500">
                <Building2 className="w-3.5 h-3.5" />
                <span>Dados do Cliente & Escopo</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Empresa do Cliente
                  </label>
                  <input
                    type="text"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    placeholder="Ex: Empresa Exemplo S.A."
                    className={`w-full px-3 py-1.5 rounded-lg border outline-none text-xs ${
                      isLight ? 'bg-white border-slate-300 focus:border-blue-500' : 'bg-[#181B24] border-white/10 focus:border-blue-400'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Nome do Contato
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ex: Carlos Mendes"
                      className={`w-full px-3 py-1.5 rounded-lg border outline-none text-xs ${
                        isLight ? 'bg-white border-slate-300 focus:border-blue-500' : 'bg-[#181B24] border-white/10 focus:border-blue-400'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Cargo do Contato
                    </label>
                    <input
                      type="text"
                      value={clientRole}
                      onChange={(e) => setClientRole(e.target.value)}
                      placeholder="Ex: CTO / Tech Lead"
                      className={`w-full px-3 py-1.5 rounded-lg border outline-none text-xs ${
                        isLight ? 'bg-white border-slate-300 focus:border-blue-500' : 'bg-[#181B24] border-white/10 focus:border-blue-400'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Título do Projeto
                  </label>
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="Ex: Arquitetura Core E-commerce"
                    className={`w-full px-3 py-1.5 rounded-lg border outline-none text-xs ${
                      isLight ? 'bg-white border-slate-300 focus:border-blue-500' : 'bg-[#181B24] border-white/10 focus:border-blue-400'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Prazo em Semanas
                    </label>
                    <input
                      type="number"
                      min={2}
                      max={52}
                      value={estimatedWeeks}
                      onChange={(e) => setEstimatedWeeks(Number(e.target.value))}
                      className={`w-full px-3 py-1.5 rounded-lg border outline-none text-xs ${
                        isLight ? 'bg-white border-slate-300 focus:border-blue-500' : 'bg-[#181B24] border-white/10 focus:border-blue-400'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Meta de SLA
                    </label>
                    <input
                      type="text"
                      value={slaTarget}
                      onChange={(e) => setSlaTarget(e.target.value)}
                      placeholder="Ex: 99.95%"
                      className={`w-full px-3 py-1.5 rounded-lg border outline-none text-xs ${
                        isLight ? 'bg-white border-slate-300 focus:border-blue-500' : 'bg-[#181B24] border-white/10 focus:border-blue-400'
                      }`}
                    />
                  </div>
                </div>

                {proposalType === 'migration' && (
                  <div>
                    <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Estratégia Predominante (7 Rs)
                    </label>
                    <select
                      value={migrationStrategy}
                      onChange={(e) => setMigrationStrategy(e.target.value as any)}
                      className={`w-full px-3 py-1.5 rounded-lg border outline-none text-xs ${
                        isLight ? 'bg-white border-slate-300 focus:border-blue-500' : 'bg-[#181B24] border-white/10 focus:border-blue-400'
                      }`}
                    >
                      <option value="replatform">Replatform (Lift, Tinker & Shift - Otimizações Gerenciadas)</option>
                      <option value="rehost">Rehost (Lift & Shift Puro - Transição Direta de VMs)</option>
                      <option value="refactor">Refactor / Re-architect (Modernização Serverless/Containers)</option>
                      <option value="hybrid">Híbrido (Coexistência On-Premise + Cloud)</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Commercial & Cloud Financials */}
            <div className={`p-4 rounded-xl border ${
              isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-white/[0.02] border-white/10'
            }`}>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center space-x-1.5 text-emerald-500">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Condições Comerciais & Investimento</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Investimento em Serviços de Consultoria (R$)
                  </label>
                  <input
                    type="number"
                    step="500"
                    value={projectBudgetBrl}
                    onChange={(e) => setProjectBudgetBrl(Number(e.target.value))}
                    className={`w-full px-3 py-1.5 rounded-lg border outline-none text-xs font-bold ${
                      isLight ? 'bg-white border-slate-300 text-blue-700' : 'bg-[#181B24] border-white/10 text-blue-400'
                    }`}
                  />
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Valor total de consultoria (Landing Zone, Terraform, Testes e Operação Assistida).
                  </span>
                </div>

                <div>
                  <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Sustentação Mensal / FinOps Opcional (R$/mês)
                  </label>
                  <input
                    type="number"
                    step="100"
                    value={monthlySupportBudgetBrl}
                    onChange={(e) => setMonthlySupportBudgetBrl(Number(e.target.value))}
                    className={`w-full px-3 py-1.5 rounded-lg border outline-none text-xs ${
                      isLight ? 'bg-white border-slate-300 text-emerald-700' : 'bg-[#181B24] border-white/10 text-emerald-400'
                    }`}
                  />
                </div>

                <div className={`p-3 rounded-lg border mt-3 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-black/30 border-white/5'
                }`}>
                  <span className="font-bold text-[11px] block text-slate-400 uppercase tracking-wider mb-1.5">
                    Estimativa de Consumo de Nuvem (OPEX)
                  </span>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block">Mensal Estimado</span>
                      <span className="text-sm font-extrabold text-emerald-500">
                        ~ US$ {totalMonthlyUSD.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">Equivalente em Reais</span>
                      <span className="text-xs font-bold text-slate-400">
                        R$ {totalMonthlyBRL.toFixed(2)}/mês
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Calculado com base nos {diagram.nodes.length} nós e serviços em {providerDisplay}.
                  </span>
                </div>

                <div>
                  <label className={`block font-semibold mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Consultor Responsável (EdsInfoBR)
                  </label>
                  <input
                    type="text"
                    value={consultantName}
                    onChange={(e) => setConsultantName(e.target.value)}
                    className={`w-full px-3 py-1.5 rounded-lg border outline-none text-xs ${
                      isLight ? 'bg-white border-slate-300 focus:border-blue-500' : 'bg-[#181B24] border-white/10 focus:border-blue-400'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Architecture Reference Diagram Section (Clean, Transparent Background) */}
          <div className={`p-4 rounded-xl border ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#181B24] border-white/10'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <div>
                <h4 className="text-xs font-bold flex items-center space-x-1.5 text-blue-500">
                  <ImageIcon className="w-4 h-4" />
                  <span>Desenho de Arquitetura de Referência (Incluso sem fundo)</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Somente os componentes do desenho, camadas e conexões com fundo transparente para integração no Word.
                </p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                {/* Style selector for Word document */}
                <div className={`flex items-center space-x-1 p-0.5 rounded-lg border text-[11px] font-medium ${
                  isLight ? 'bg-white border-slate-300' : 'bg-black/30 border-white/10'
                }`}>
                  <button
                    type="button"
                    onClick={() => setDiagramImageTheme('light')}
                    className={`px-2 py-0.5 rounded transition-all flex items-center space-x-1 cursor-pointer ${
                      diagramImageTheme === 'light'
                        ? 'bg-blue-600 text-white font-semibold shadow-xs'
                        : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="Estilo com cards claros e bordas nítidas (ideal para Word)"
                  >
                    <Palette className="w-3 h-3" />
                    <span>Cards Claros</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiagramImageTheme('dark')}
                    className={`px-2 py-0.5 rounded transition-all flex items-center space-x-1 cursor-pointer ${
                      diagramImageTheme === 'dark'
                        ? 'bg-blue-600 text-white font-semibold shadow-xs'
                        : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title="Estilo original com cards escuros"
                  >
                    <Layers className="w-3 h-3" />
                    <span>Cards Escuros</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => captureArchitectureDiagram(diagramImageTheme === 'light')}
                  disabled={isCapturingImage}
                  className={`px-2.5 py-1 rounded-lg border text-xs transition-all flex items-center space-x-1 cursor-pointer ${
                    isLight
                      ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                  }`}
                  title="Recapturar componentes da arquitetura"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isCapturingImage ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Recapturar</span>
                </button>
              </div>
            </div>

            {/* Visual Preview Box with transparency pattern */}
            <div
              className={`relative w-full rounded-xl border overflow-hidden flex items-center justify-center p-3 min-h-[130px] max-h-[220px] transition-all ${
                isLight ? 'border-slate-300 bg-white/40' : 'border-white/10 bg-black/40'
              }`}
              style={{
                backgroundImage: isLight
                  ? 'linear-gradient(45deg, #f1f5f9 25%, transparent 25%), linear-gradient(-45deg, #f1f5f9 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f1f5f9 75%), linear-gradient(-45deg, transparent 75%, #f1f5f9 75%)'
                  : 'linear-gradient(45deg, #161922 25%, transparent 25%), linear-gradient(-45deg, #161922 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #161922 75%), linear-gradient(-45deg, transparent 75%, #161922 75%)',
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px'
              }}
            >
              {isCapturingImage ? (
                <div className="flex flex-col items-center space-y-2 py-6 text-slate-400">
                  <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />
                  <span className="text-xs font-semibold">Capturando componentes com transparência...</span>
                </div>
              ) : architectureImage?.dataUrl ? (
                <div className="relative group max-h-[190px] w-full flex items-center justify-center">
                  <img
                    src={architectureImage.dataUrl}
                    alt="Desenho da Arquitetura de Referência sem fundo"
                    className="max-h-[190px] object-contain drop-shadow-md"
                  />
                  <div className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1.5 border border-white/20 pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Fundo transparente • {architectureImage.cropWidth}x{architectureImage.cropHeight}px</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-1 py-4 text-slate-400">
                  <ImageIcon className="w-6 h-6 text-slate-500" />
                  <span className="text-xs">Diagrama pronto para ser embutido na Seção 2 da proposta.</span>
                </div>
              )}
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-1 text-[11px] text-slate-500">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>O documento Word (.docx) conterá esta topologia em alta resolução sem fundo.</span>
              </span>
              <span className="font-mono text-[10px] text-slate-400">
                {diagram.nodes.length} nós • {diagram.containers.length} sub-redes • {diagram.links.length} fluxos
              </span>
            </div>
          </div>

          {/* Document Content Checklist / Summary */}
          <div className={`p-4 rounded-xl border ${
            isLight ? 'bg-blue-50/50 border-blue-200' : 'bg-blue-950/20 border-blue-500/20'
          }`}>
            <h4 className="text-xs font-bold flex items-center space-x-1.5 text-blue-500 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Estrutura do Documento Word (.docx) que será gerado:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Capa Executiva e Metadados</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Sumário e KPIs Estratégicos</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Desenho da Arquitetura (Sem Fundo)</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Inventário ({diagram.nodes.length} Componentes)</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Matriz de Conexões e Portas</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Roadmap em 5 Fases ({estimatedWeeks} semanas)</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Investimento e Faturamento</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Matriz RACI de Responsabilidade</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Premissas & Termos Legais</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Campos Formais de Assinatura</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`px-6 py-4 border-t flex items-center justify-between ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#181B24] border-white/10'
          }`}
        >
          <div className="text-xs text-slate-500">
            <span>Formato: Microsoft Word (.docx) • 100% Editável</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isGenerating}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isLight ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700' : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
              }`}
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleDownloadDocx}
              disabled={isGenerating}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 flex items-center space-x-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Gerando Word (.docx)...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Baixar Proposta em Word (.docx)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
