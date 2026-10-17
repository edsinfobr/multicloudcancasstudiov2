import React, { useState } from 'react';
import {
  X,
  DollarSign,
  Download,
  TrendingDown,
  RefreshCw,
  Coins,
  FileText,
  Code2,
  Layers,
  Scale,
  Server,
  Database,
  HardDrive,
  Network,
  Cpu,
  Search,
  CheckCircle2,
  Sparkles,
  Info,
  Building2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award,
  AlertCircle
} from 'lucide-react';
import { DiagramState, DiagramNode, CloudProvider } from '../types';
import { calculateTotalCost } from '../utils/costCalculator';

interface CostModalProps {
  diagram: DiagramState;
  setDiagram?: React.Dispatch<React.SetStateAction<DiagramState>>;
  onClose: () => void;
  onExportPdf?: (exchangeRate?: number) => void;
  theme?: 'dark' | 'light';
}

export const CostModal: React.FC<CostModalProps> = ({ diagram, onClose, onExportPdf, theme }) => {
  const isLight = theme === 'light';
  const [viewMode, setViewMode] = useState<'current' | 'comparison'>('current');
  const [currency, setCurrency] = useState<'USD' | 'BRL'>('BRL');
  const [exchangeRate, setExchangeRate] = useState<number>(5.60);

  // Filters for current architecture items
  const [resourceSearch, setResourceSearch] = useState('');
  const [providerFilter, setProviderFilter] = useState<'all' | CloudProvider>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const costReport = calculateTotalCost(diagram.nodes);

  const formatCost = (usdAmount: number): string => {
    const amount = currency === 'BRL' ? usdAmount * exchangeRate : usdAmount;
    if (currency === 'BRL') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getProviderBadge = (provider: string) => {
    switch (provider) {
      case 'aws':
        return { label: 'AWS', bg: isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-amber-500/20 text-amber-300 border-amber-500/30', border: 'border-amber-500' };
      case 'azure':
        return { label: 'Azure', bg: isLight ? 'bg-sky-100 text-sky-900 border-sky-300' : 'bg-sky-500/20 text-sky-300 border-sky-500/30', border: 'border-sky-500' };
      case 'gcp':
        return { label: 'GCP', bg: isLight ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', border: 'border-emerald-500' };
      case 'oci':
        return { label: 'OCI', bg: isLight ? 'bg-red-100 text-red-900 border-red-300' : 'bg-red-500/20 text-red-300 border-red-500/30', border: 'border-red-500' };
      default:
        return { label: 'Genérico', bg: isLight ? 'bg-slate-100 text-slate-800 border-slate-300' : 'bg-slate-800 text-slate-300 border-slate-700', border: 'border-slate-500' };
    }
  };

  // Filter items for current architecture
  const filteredItems = costReport.items.filter((item) => {
    if (providerFilter !== 'all' && item.provider !== providerFilter) return false;
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (resourceSearch.trim()) {
      const q = resourceSearch.toLowerCase();
      return (
        item.nodeName.toLowerCase().includes(q) ||
        item.details.toLowerCase().includes(q) ||
        item.serviceType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredTotalMonthly = filteredItems.reduce((acc, it) => acc + it.monthlyCost, 0);
  const filteredTotalAnnual = filteredTotalMonthly * 12;

  const handleExportCsv = () => {
    const rate = currency === 'BRL' ? exchangeRate : 1;
    let csv = '';

    if (viewMode === 'current') {
      csv += `REPOSITÓRIO DE CUSTOS - ARQUITETURA ATUAL (${diagram.title || 'Untitled'})\n`;
      csv += `Moeda: ${currency} (Câmbio 1 USD = R$ ${exchangeRate.toFixed(2)})\n\n`;
      csv += `Node ID,Node Name,Provider,Category,Service Type,Monthly Cost (${currency}),Annual Cost (${currency}),Details\n`;
      costReport.items.forEach((item) => {
        const mCost = (item.monthlyCost * rate).toFixed(2);
        const aCost = (item.annualCost * rate).toFixed(2);
        csv += `"${item.nodeId}","${item.nodeName}","${item.provider}","${item.category}","${item.serviceType}",${mCost},${aCost},"${item.details}"\n`;
      });
      const totM = (costReport.totalMonthly * rate).toFixed(2);
      const totA = (costReport.totalAnnual * rate).toFixed(2);
      csv += `\nTotal Monthly (${currency}),,,,,${totM},${totA},\n`;
    } else {
      csv += `COMPARATIVO DE PROVEDORES DE NUVEM - MULTI-CLOUD BENCHMARK (${diagram.title || 'Untitled'})\n`;
      csv += `Moeda: ${currency} (Câmbio 1 USD = R$ ${exchangeRate.toFixed(2)})\n\n`;
      csv += `Provedor,Classificação,Mensal On-Demand (${currency}),Anual On-Demand (${currency}),1 Ano Reservado (${currency}/mês),3 Anos Reservado (${currency}/mês),Diferença vs Atual (%)\n`;
      costReport.providerComparisons.forEach((p) => {
        const mCost = (p.monthlyCost * rate).toFixed(2);
        const aCost = (p.annualCost * rate).toFixed(2);
        const c1 = (p.commitment1YrMonthly * rate).toFixed(2);
        const c3 = (p.commitment3YrMonthly * rate).toFixed(2);
        csv += `"${p.name}","${p.badge}",${mCost},${aCost},${c1},${c3},"${p.diffPercentage > 0 ? '+' : ''}${p.diffPercentage}%"\n`;
      });

      csv += `\nBENCHMARK POR CATEGORIA DE SERVIÇO\n`;
      csv += `Categoria,Arquitetura Atual (${currency}),AWS (${currency}),Azure (${currency}),GCP (${currency}),OCI (${currency})\n`;
      costReport.categoryComparisons.forEach((c) => {
        csv += `"${c.label}",${(c.currentCost * rate).toFixed(2)},${(c.awsCost * rate).toFixed(2)},${(c.azureCost * rate).toFixed(2)},${(c.gcpCost * rate).toFixed(2)},${(c.ociCost * rate).toFixed(2)}\n`;
      });
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(diagram.title || 'architecture').toLowerCase().replace(/\s+/g, '-')}-${viewMode}-cost-report-${currency.toLowerCase()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJson = () => {
    const rate = currency === 'BRL' ? exchangeRate : 1;
    const jsonSummary = {
      viewExported: viewMode,
      architecture: {
        id: diagram.id,
        title: diagram.title || 'Untitled Architecture',
        exportedAt: new Date().toISOString(),
        currency: currency,
        exchangeRateApplied: currency === 'BRL' ? exchangeRate : 1.0,
        resourceCount: diagram.nodes.length,
        isMultiCloud: costReport.isMultiCloud,
        dominantProvider: costReport.dominantProvider,
        metadata: diagram.metadata || null
      },
      currentArchitectureCost: {
        totalMonthlyCostUSD: costReport.totalMonthly,
        totalAnnualCostUSD: costReport.totalAnnual,
        totalMonthlyCostSelectedCurrency: Math.round((costReport.totalMonthly * rate) * 100) / 100,
        totalAnnualCostSelectedCurrency: Math.round((costReport.totalAnnual * rate) * 100) / 100,
        formattedMonthlyCost: formatCost(costReport.totalMonthly),
        formattedAnnualCost: formatCost(costReport.totalAnnual),
        distributionByProvider: costReport.byProvider,
        distributionByCategory: costReport.byCategory,
        resources: costReport.items.map((item) => ({
          nodeId: item.nodeId,
          nodeName: item.nodeName,
          provider: item.provider,
          category: item.category,
          serviceType: item.serviceType,
          details: item.details,
          monthlyCostUSD: item.monthlyCost,
          annualCostUSD: item.annualCost,
          monthlyCostSelectedCurrency: Math.round((item.monthlyCost * rate) * 100) / 100,
          annualCostSelectedCurrency: Math.round((item.annualCost * rate) * 100) / 100,
          formattedMonthlyCost: formatCost(item.monthlyCost),
          formattedAnnualCost: formatCost(item.annualCost)
        }))
      },
      multiCloudComparison: {
        awsMonthlyCostUSD: costReport.multiCloudComparison.awsMonthly,
        azureMonthlyCostUSD: costReport.multiCloudComparison.azureMonthly,
        gcpMonthlyCostUSD: costReport.multiCloudComparison.gcpMonthly,
        ociMonthlyCostUSD: costReport.multiCloudComparison.ociMonthly,
        cheapestProvider: costReport.cheapestProvider.name,
        maxSavingsMonthlySelectedCurrency: Math.round((costReport.maxSavingsMonthly * rate) * 100) / 100,
        maxSavingsAnnualSelectedCurrency: Math.round((costReport.maxSavingsAnnual * rate) * 100) / 100,
        providers: costReport.providerComparisons.map((p) => ({
          providerKey: p.provider,
          name: p.name,
          badge: p.badge,
          bestFor: p.bestFor,
          monthlyCostUSD: p.monthlyCost,
          annualCostUSD: p.annualCost,
          monthlyCostSelectedCurrency: Math.round((p.monthlyCost * rate) * 100) / 100,
          annualCostSelectedCurrency: Math.round((p.annualCost * rate) * 100) / 100,
          formattedMonthlyCost: formatCost(p.monthlyCost),
          formattedAnnualCost: formatCost(p.annualCost),
          commitment1YrMonthlySelectedCurrency: Math.round((p.commitment1YrMonthly * rate) * 100) / 100,
          commitment3YrMonthlySelectedCurrency: Math.round((p.commitment3YrMonthly * rate) * 100) / 100,
          diffPercentageVsCurrent: p.diffPercentage,
          highlights: p.highlights
        })),
        categoryComparison: costReport.categoryComparisons
      }
    };

    const blob = new Blob([JSON.stringify(jsonSummary, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeTitle = (diagram.title || 'architecture').toLowerCase().replace(/\s+/g, '-');
    link.download = `${safeTitle}-${viewMode}-cost-summary-${currency.toLowerCase()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Find max monthly value for comparative bar scaling
  const maxComparisonVal = Math.max(
    costReport.totalMonthly,
    ...costReport.providerComparisons.map((p) => p.monthlyCost),
    1
  );

  return (
    <div className={`fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none ${
      isLight ? 'bg-slate-900/60' : 'bg-black/80'
    }`}>
      <div className={`border rounded-2xl w-full max-w-6xl h-[88vh] flex flex-col shadow-2xl overflow-hidden transition-colors ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#12141A] border-white/10 text-slate-200'
      }`}>
        {/* Modal Header */}
        <div className={`px-6 py-4 border-b flex flex-wrap items-center justify-between gap-3 ${
          isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-black/20'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl ${
              isLight ? 'bg-amber-100 text-amber-700' : 'bg-amber-500/20 text-amber-400'
            }`}>
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className={`text-base font-bold ${isLight ? 'text-slate-950' : 'text-slate-100'}`}>
                  Calculadora de Custos de Nuvem
                </h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  viewMode === 'current'
                    ? isLight ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                    : isLight ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                }`}>
                  {viewMode === 'current' ? 'Modo Normal' : 'Modo Comparativo'}
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
                <span>
                  {viewMode === 'current'
                    ? 'Exibindo exclusivamente os custos dos recursos da arquitetura atual.'
                    : 'Comparativo de preços e dimensionamento equivalente entre AWS, Azure, GCP e OCI.'}
                </span>
                <span className={`flex items-center gap-1.5 text-[11px] mt-1 ${isLight ? 'text-amber-800 font-semibold' : 'text-amber-400 font-medium'}`}>
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-amber-500" />
                  <span>Essa é uma estimativa e não representa o custo final. Taxas, impostos e a conversão do dólar podem influenciar no custo final.</span>
                </span>
              </p>
            </div>
          </div>

          {/* Center Tabs: Arquitetura Atual vs Comparativo de Provedores */}
          <div className={`inline-flex p-1 rounded-xl border ${
            isLight ? 'bg-slate-200/80 border-slate-300' : 'bg-white/5 border-white/10'
          }`}>
            <button
              type="button"
              onClick={() => setViewMode('current')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'current'
                  ? isLight
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'bg-blue-600/30 text-blue-300 border border-blue-500/40 shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Arquitetura Atual</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                viewMode === 'current'
                  ? isLight ? 'bg-blue-100 text-blue-800' : 'bg-blue-500/30 text-blue-200'
                  : isLight ? 'bg-slate-300/70 text-slate-700' : 'bg-white/10 text-slate-400'
              }`}>
                {diagram.nodes.length} nós
              </span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('comparison')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'comparison'
                  ? isLight
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>Comparativo de Provedores</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                viewMode === 'comparison'
                  ? isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-500/30 text-emerald-200'
                  : isLight ? 'bg-slate-300/70 text-slate-700' : 'bg-white/10 text-slate-400'
              }`}>
                4 Nuvem
              </span>
            </button>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center space-x-2.5">
            {/* Currency Switcher */}
            <div className={`flex items-center border p-0.5 rounded-xl space-x-1 ${
              isLight ? 'bg-slate-200/80 border-slate-300' : 'bg-white/5 border-white/10'
            }`}>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                  currency === 'USD'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : isLight
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-300/60 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <span>USD ($)</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrency('BRL')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                  currency === 'BRL'
                    ? isLight
                      ? 'bg-emerald-600 text-white shadow-sm font-bold'
                      : 'bg-emerald-500 text-slate-950 shadow-sm'
                    : isLight
                    ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-300/60 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <span>BRL (R$)</span>
              </button>
            </div>

            {/* Exchange Rate Adjustment Input when BRL selected */}
            {currency === 'BRL' && (
              <div className={`flex items-center space-x-1 border px-2 py-1 rounded-xl text-xs ${
                isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold' : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
              }`}>
                <Coins className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`} />
                <span className={`text-[10px] font-semibold ${isLight ? 'text-emerald-900' : 'text-emerald-200/80'}`}>R$</span>
                <input
                  type="number"
                  step="0.05"
                  min="1.0"
                  max="20.0"
                  value={exchangeRate}
                  onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 5.60)}
                  className={`w-12 border rounded px-1 py-0.5 text-xs font-bold outline-none text-center ${
                    isLight ? 'bg-white border-emerald-400 text-emerald-950' : 'bg-black/60 border-emerald-500/40 text-emerald-300 focus:border-emerald-400'
                  }`}
                  title="Ajuste a cotação do Dólar para Real"
                />
              </div>
            )}

            {onExportPdf && (
              <button
                onClick={() => onExportPdf(exchangeRate)}
                className={`flex items-center space-x-1.5 border px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                  isLight
                    ? 'bg-red-50 hover:bg-red-100 border-red-300 text-red-700'
                    : 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-300'
                }`}
                title="Gerar e baixar relatório de custos da arquitetura atual em PDF (sem provedores externos)"
              >
                <FileText className={`w-3.5 h-3.5 ${isLight ? 'text-red-600' : 'text-red-400'}`} />
                <span>Report PDF</span>
              </button>
            )}

            <button
              onClick={handleExportCsv}
              className={`flex items-center space-x-1.5 border px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
              }`}
              title="Exportar dados em CSV"
            >
              <Download className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
              <span>CSV</span>
            </button>

            <button
              id="btn-export-cost-json"
              onClick={handleExportJson}
              className={`flex items-center space-x-1.5 border px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                isLight
                  ? 'bg-blue-50 hover:bg-blue-100 border-blue-300 text-blue-800'
                  : 'bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30 text-blue-300'
              }`}
              title="Exportar dados estruturados em JSON"
            >
              <Code2 className={`w-3.5 h-3.5 ${isLight ? 'text-blue-600' : 'text-blue-400'}`} />
              <span>JSON</span>
            </button>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors ${
                isLight ? 'hover:bg-slate-200 text-slate-600 hover:text-slate-900' : 'hover:bg-white/10 text-slate-400 hover:text-slate-200'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            OPTION 1: ARQUITETURA ATUAL (NORMAL)
           ========================================================================= */}
        {viewMode === 'current' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Executive Cost Summary Cards for Current Architecture */}
            <div className={`p-5 border-b grid grid-cols-4 gap-4 ${
              isLight ? 'bg-slate-100/70 border-slate-200' : 'bg-black/30 border-white/10'
            }`}>
              <div className={`border rounded-xl p-3.5 ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-white/5 border-white/10'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    isLight ? 'text-slate-700' : 'text-slate-400'
                  }`}>
                    {currency === 'BRL' ? 'Custo Mensal da Arquitetura' : 'Monthly Cost (Architecture)'}
                  </span>
                  <div className={`p-1 rounded ${isLight ? 'bg-amber-100 text-amber-700' : 'bg-amber-500/20 text-amber-400'}`}>
                    <DollarSign className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className={`text-2xl font-black mt-1 block ${
                  isLight ? 'text-amber-600' : 'text-amber-400'
                }`}>
                  {formatCost(costReport.totalMonthly)}
                </span>
                <span className={`text-[10px] block mt-0.5 ${
                  isLight ? 'text-slate-600 font-medium' : 'text-slate-500'
                }`}>
                  {currency === 'BRL' ? `Base 730h/mês (Câmbio R$ ${exchangeRate.toFixed(2)})` : 'Based on 730 hrs/month baseline'}
                </span>
              </div>

              <div className={`border rounded-xl p-3.5 ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-white/5 border-white/10'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    isLight ? 'text-slate-700' : 'text-slate-400'
                  }`}>
                    {currency === 'BRL' ? 'Projeção Anual' : 'Annual Projection'}
                  </span>
                  <div className={`p-1 rounded ${isLight ? 'bg-blue-100 text-blue-700' : 'bg-blue-500/20 text-blue-400'}`}>
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className={`text-2xl font-black mt-1 block ${
                  isLight ? 'text-slate-950' : 'text-slate-100'
                }`}>
                  {formatCost(costReport.totalAnnual)}
                </span>
                <span className={`text-[10px] block mt-0.5 ${
                  isLight ? 'text-slate-600 font-medium' : 'text-slate-500'
                }`}>
                  Estimativa de 12 meses acumulados
                </span>
              </div>

              <div className={`border rounded-xl p-3.5 ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-white/5 border-white/10'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    isLight ? 'text-slate-700' : 'text-slate-400'
                  }`}>
                    Recursos Ativos
                  </span>
                  <div className={`p-1 rounded ${isLight ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    <Server className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className={`text-2xl font-black mt-1 block ${
                  isLight ? 'text-emerald-700' : 'text-emerald-400'
                }`}>
                  {diagram.nodes.length} nós
                </span>
                <span className={`text-[10px] block mt-0.5 ${
                  isLight ? 'text-slate-600 font-medium' : 'text-slate-500'
                }`}>
                  {diagram.nodes.length - costReport.zeroCostCount} com custo • {costReport.zeroCostCount} gratuitos (IAM/VPC)
                </span>
              </div>

              <div className={`border rounded-xl p-3.5 ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-white/5 border-white/10'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    isLight ? 'text-slate-700' : 'text-slate-400'
                  }`}>
                    Estrutura de Nuvem
                  </span>
                  <div className={`p-1 rounded ${isLight ? 'bg-purple-100 text-purple-700' : 'bg-purple-500/20 text-purple-400'}`}>
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className={`text-lg font-black mt-1 block truncate ${
                  isLight ? 'text-purple-700' : 'text-purple-300'
                }`}>
                  {costReport.isMultiCloud ? 'Multi-Cloud Híbrida' : `Nuvem ${costReport.dominantProvider.toUpperCase()}`}
                </span>
                <span className={`text-[10px] block mt-0.5 ${
                  isLight ? 'text-slate-600 font-medium' : 'text-slate-500'
                }`}>
                  {costReport.isMultiCloud
                    ? 'Recursos distribuídos entre múltiplos provedores'
                    : `Cargas concentradas em ${costReport.dominantProvider.toUpperCase()}`}
                </span>
              </div>
            </div>

            {/* Scrollable Body: Breakdown Panels & Itemized Table */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {/* Distribution Cards: By Provider & By Category in Current Architecture */}
              <div className="grid grid-cols-2 gap-5">
                {/* Panel 1: Custos por Provedor na Arquitetura Atual */}
                <div className={`border rounded-2xl p-4.5 ${
                  isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-black/20 border-white/10'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Building2 className={`w-4 h-4 ${isLight ? 'text-blue-600' : 'text-blue-400'}`} />
                      <h3 className={`text-xs font-bold uppercase tracking-wider ${
                        isLight ? 'text-slate-900' : 'text-slate-200'
                      }`}>
                        Custos por Provedor na Arquitetura
                      </h3>
                    </div>
                    <span className={`text-[10px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Fatia do Orçamento Atual
                    </span>
                  </div>

                  <div className="space-y-3">
                    {['aws', 'azure', 'gcp', 'oci', 'generic'].map((prov) => {
                      const cost = costReport.byProvider[prov] || 0;
                      const count = costReport.byProviderCount[prov] || 0;
                      if (count === 0 && cost === 0) return null;
                      const pct = costReport.totalMonthly > 0
                        ? Math.round((cost / costReport.totalMonthly) * 100)
                        : 0;
                      const badge = getProviderBadge(prov);

                      return (
                        <div key={prov} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badge.bg}`}>
                                {badge.label}
                              </span>
                              <span className={`text-[11px] font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                                {count} {count === 1 ? 'recurso' : 'recursos'}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                                {formatCost(cost)}/mês
                              </span>
                              <span className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                                ({pct}%)
                              </span>
                            </div>
                          </div>
                          <div className={`w-full h-2 rounded-full overflow-hidden ${
                            isLight ? 'bg-slate-200' : 'bg-white/10'
                          }`}>
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                prov === 'aws' ? 'bg-amber-500' :
                                prov === 'azure' ? 'bg-sky-500' :
                                prov === 'gcp' ? 'bg-emerald-500' :
                                prov === 'oci' ? 'bg-red-500' : 'bg-purple-500'
                              }`}
                              style={{ width: `${Math.max(pct, cost > 0 ? 3 : 0)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}

                    {diagram.nodes.length === 0 && (
                      <p className={`text-xs text-center py-3 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Nenhum recurso adicionado ao diagrama ainda.
                      </p>
                    )}
                  </div>
                </div>

                {/* Panel 2: Custos por Categoria de Serviço */}
                <div className={`border rounded-2xl p-4.5 ${
                  isLight ? 'bg-slate-50/80 border-slate-200' : 'bg-black/20 border-white/10'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Cpu className={`w-4 h-4 ${isLight ? 'text-purple-600' : 'text-purple-400'}`} />
                      <h3 className={`text-xs font-bold uppercase tracking-wider ${
                        isLight ? 'text-slate-900' : 'text-slate-200'
                      }`}>
                        Custos por Categoria de Serviço
                      </h3>
                    </div>
                    <span className={`text-[10px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Camadas da Aplicação
                    </span>
                  </div>

                  <div className="space-y-3">
                    {Object.keys(costReport.byCategory).map((cat) => {
                      const cost = costReport.byCategory[cat] || 0;
                      const count = costReport.byCategoryCount[cat] || 0;
                      const pct = costReport.totalMonthly > 0
                        ? Math.round((cost / costReport.totalMonthly) * 100)
                        : 0;

                      return (
                        <div key={cat} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <span className={`text-xs font-bold capitalize ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                                {cat === 'compute' ? 'Computação' :
                                 cat === 'database' ? 'Bancos de Dados' :
                                 cat === 'storage' ? 'Armazenamento' :
                                 cat === 'networking' ? 'Rede & CDN' :
                                 cat === 'ai' ? 'Inteligência Artificial' :
                                 cat === 'security' ? 'Segurança' :
                                 cat === 'analytics' ? 'Analytics / Dados' : cat}
                              </span>
                              <span className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                                ({count} nós)
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                                {formatCost(cost)}/mês
                              </span>
                              <span className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                                ({pct}%)
                              </span>
                            </div>
                          </div>
                          <div className={`w-full h-2 rounded-full overflow-hidden ${
                            isLight ? 'bg-slate-200' : 'bg-white/10'
                          }`}>
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                              style={{ width: `${Math.max(pct, cost > 0 ? 3 : 0)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}

                    {Object.keys(costReport.byCategory).length === 0 && (
                      <p className={`text-xs text-center py-3 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Nenhuma categoria computada.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Itemized Resource Table for Current Architecture */}
              <div className={`border rounded-2xl p-5 ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-black/20 border-white/10'
              }`}>
                {/* Table Header & Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className={`text-xs font-bold uppercase tracking-wider ${
                      isLight ? 'text-slate-950' : 'text-slate-200'
                    }`}>
                      Detalhamento de Recursos e Custos da Arquitetura
                    </h3>
                    <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Listagem individual de todos os nós presentes no canvas ({filteredItems.length} de {costReport.items.length} itens)
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Search */}
                    <div className={`flex items-center space-x-1.5 border px-2.5 py-1 rounded-lg text-xs ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-white/5 border-white/10 text-slate-200'
                    }`}>
                      <Search className={`w-3.5 h-3.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`} />
                      <input
                        type="text"
                        placeholder="Buscar recurso..."
                        value={resourceSearch}
                        onChange={(e) => setResourceSearch(e.target.value)}
                        className="bg-transparent outline-none text-xs w-32 placeholder:text-slate-400"
                      />
                      {resourceSearch && (
                        <button onClick={() => setResourceSearch('')} className="text-slate-400 hover:text-slate-200">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Filter Provider */}
                    <select
                      value={providerFilter}
                      onChange={(e) => setProviderFilter(e.target.value as any)}
                      className={`border rounded-lg px-2.5 py-1 text-xs outline-none font-semibold ${
                        isLight ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-[#1a1d24] border-white/10 text-slate-200'
                      }`}
                    >
                      <option value="all">Todos Provedores</option>
                      <option value="aws">AWS</option>
                      <option value="azure">Azure</option>
                      <option value="gcp">GCP</option>
                      <option value="oci">OCI</option>
                      <option value="generic">Genérico</option>
                    </select>

                    {/* Filter Category */}
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className={`border rounded-lg px-2.5 py-1 text-xs outline-none font-semibold ${
                        isLight ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-[#1a1d24] border-white/10 text-slate-200'
                      }`}
                    >
                      <option value="all">Todas Categorias</option>
                      <option value="compute">Computação</option>
                      <option value="database">Bancos de Dados</option>
                      <option value="storage">Armazenamento</option>
                      <option value="networking">Rede</option>
                      <option value="ai">IA</option>
                      <option value="security">Segurança</option>
                      <option value="analytics">Analytics</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className={`w-full text-left text-xs ${
                    isLight ? 'text-slate-800' : 'text-slate-300'
                  }`}>
                    <thead className={`font-bold uppercase text-[10px] border-b ${
                      isLight ? 'bg-slate-100 text-slate-800 border-slate-200' : 'bg-white/5 text-slate-400 border-white/10'
                    }`}>
                      <tr>
                        <th className="p-3">Recurso</th>
                        <th className="p-3">Provedor</th>
                        <th className="p-3">Categoria</th>
                        <th className="p-3">Especificações & Dimensionamento</th>
                        <th className="p-3 text-right">Custo Mensal ({currency})</th>
                        <th className="p-3 text-right">Custo Anual ({currency})</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${
                      isLight ? 'divide-slate-200' : 'divide-white/5'
                    }`}>
                      {filteredItems.map((item) => {
                        const badge = getProviderBadge(item.provider);
                        return (
                          <tr key={item.nodeId} className={isLight ? 'hover:bg-slate-50' : 'hover:bg-white/5'}>
                            <td className="p-3 font-semibold">
                              <div className="flex items-center space-x-2">
                                <span className={isLight ? 'text-slate-950 font-bold' : 'text-slate-100'}>
                                  {item.nodeName}
                                </span>
                              </div>
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${badge.bg}`}>
                                {item.provider}
                              </span>
                            </td>
                            <td className="p-3 uppercase text-[10px] font-semibold">
                              <span className={isLight ? 'text-slate-700' : 'text-slate-400'}>
                                {item.category}
                              </span>
                            </td>
                            <td className={`p-3 font-mono text-[11px] ${isLight ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
                              {item.details}
                            </td>
                            <td className={`p-3 font-bold text-right ${
                              item.monthlyCost === 0
                                ? isLight ? 'text-slate-400 font-normal' : 'text-slate-500 font-normal'
                                : isLight ? 'text-amber-700 font-black' : 'text-amber-400 font-bold'
                            }`}>
                              {item.monthlyCost === 0 ? 'R$ 0,00' : formatCost(item.monthlyCost)}
                            </td>
                            <td className={`p-3 text-right ${
                              item.annualCost === 0
                                ? isLight ? 'text-slate-400' : 'text-slate-500'
                                : isLight ? 'text-slate-800 font-semibold' : 'text-slate-300'
                            }`}>
                              {item.annualCost === 0 ? 'R$ 0,00' : formatCost(item.annualCost)}
                            </td>
                          </tr>
                        );
                      })}

                      {filteredItems.length === 0 && (
                        <tr>
                          <td colSpan={6} className={`text-center py-8 text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                            Nenhum recurso encontrado com os filtros aplicados.
                          </td>
                        </tr>
                      )}
                    </tbody>
                    {filteredItems.length > 0 && (
                      <tfoot className={`font-bold border-t ${
                        isLight ? 'bg-slate-100/90 border-slate-300 text-slate-900' : 'bg-white/5 border-white/10 text-slate-100'
                      }`}>
                        <tr>
                          <td colSpan={4} className="p-3 text-right uppercase text-[11px]">
                            Subtotal Itens Visíveis ({filteredItems.length}):
                          </td>
                          <td className={`p-3 text-right font-black text-sm ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>
                            {formatCost(filteredTotalMonthly)}
                          </td>
                          <td className="p-3 text-right font-bold text-sm">
                            {formatCost(filteredTotalAnnual)}
                          </td>
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>

                {/* Footnote on methodology */}
                <div className={`mt-3 pt-3 border-t flex items-center space-x-2 text-[11px] ${
                  isLight ? 'border-slate-200 text-slate-500' : 'border-white/5 text-slate-500'
                }`}>
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    Custos calculados com base On-Demand para 730 horas/mês contínuas. Recursos lógicos (ex: IAM Roles, VPC Peering, Subnets e Simuladores Locais) são calculados com custo zero.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            OPTION 2: COMPARATIVO DE PROVEDORES (MULTI-CLOUD BENCHMARK)
           ========================================================================= */}
        {viewMode === 'comparison' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Executive KPI Cards for Benchmark */}
            <div className={`p-5 border-b grid grid-cols-4 gap-4 ${
              isLight ? 'bg-slate-100/70 border-slate-200' : 'bg-black/30 border-white/10'
            }`}>
              {/* Campeão de Economia */}
              <div className={`border rounded-xl p-3.5 ${
                isLight ? 'bg-emerald-50/60 border-emerald-200 shadow-sm' : 'bg-emerald-950/20 border-emerald-500/30'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    isLight ? 'text-emerald-900' : 'text-emerald-400'
                  }`}>
                    🏆 Provedor Mais Econômico
                  </span>
                  <div className={`p-1 rounded ${isLight ? 'bg-emerald-200 text-emerald-800' : 'bg-emerald-500/20 text-emerald-300'}`}>
                    <Award className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className={`text-xl font-black mt-1 block truncate ${
                  isLight ? 'text-emerald-800' : 'text-emerald-300'
                }`}>
                  {costReport.cheapestProvider.name}
                </span>
                <span className={`text-[10px] block mt-0.5 font-bold ${
                  isLight ? 'text-emerald-700' : 'text-emerald-400'
                }`}>
                  {formatCost(costReport.cheapestProvider.monthlyCost)}/mês (~24% menor que a média)
                </span>
              </div>

              {/* Melhor Custo-Benefício p/ IA & Cloud Native */}
              <div className={`border rounded-xl p-3.5 ${
                isLight ? 'bg-blue-50/60 border-blue-200 shadow-sm' : 'bg-blue-950/20 border-blue-500/30'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    isLight ? 'text-blue-900' : 'text-blue-400'
                  }`}>
                    ⚡ Melhor p/ IA & Modern Apps
                  </span>
                  <div className={`p-1 rounded ${isLight ? 'bg-blue-200 text-blue-800' : 'bg-blue-500/20 text-blue-300'}`}>
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className={`text-xl font-black mt-1 block truncate ${
                  isLight ? 'text-blue-800' : 'text-blue-300'
                }`}>
                  Google Cloud Platform (GCP)
                </span>
                <span className={`text-[10px] block mt-0.5 ${
                  isLight ? 'text-blue-700' : 'text-blue-400'
                }`}>
                  {formatCost(costReport.multiCloudComparison.gcpMonthly)}/mês • Scale-to-Zero & Gemini
                </span>
              </div>

              {/* Economia Potencial Máxima */}
              <div className={`border rounded-xl p-3.5 ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-white/5 border-white/10'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    isLight ? 'text-slate-700' : 'text-slate-400'
                  }`}>
                    Economia Potencial Máxima
                  </span>
                  <div className={`p-1 rounded ${isLight ? 'bg-purple-100 text-purple-700' : 'bg-purple-500/20 text-purple-400'}`}>
                    <TrendingDown className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className={`text-2xl font-black mt-1 block ${
                  isLight ? 'text-purple-700' : 'text-purple-400'
                }`}>
                  {formatCost(costReport.maxSavingsMonthly)}/mês
                </span>
                <span className={`text-[10px] block mt-0.5 ${
                  isLight ? 'text-slate-600 font-medium' : 'text-slate-500'
                }`}>
                  Até {formatCost(costReport.maxSavingsAnnual)} de economia por ano
                </span>
              </div>

              {/* Média de Mercado */}
              <div className={`border rounded-xl p-3.5 ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-white/5 border-white/10'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    isLight ? 'text-slate-700' : 'text-slate-400'
                  }`}>
                    Média de Mercado
                  </span>
                  <div className={`p-1 rounded ${isLight ? 'bg-slate-100 text-slate-700' : 'bg-white/10 text-slate-300'}`}>
                    <Scale className="w-3.5 h-3.5" />
                  </div>
                </div>
                <span className={`text-2xl font-black mt-1 block ${
                  isLight ? 'text-slate-900' : 'text-slate-100'
                }`}>
                  {formatCost(
                    Math.round(
                      ((costReport.multiCloudComparison.awsMonthly +
                        costReport.multiCloudComparison.azureMonthly +
                        costReport.multiCloudComparison.gcpMonthly +
                        costReport.multiCloudComparison.ociMonthly) /
                        4) *
                        100
                    ) / 100
                  )}
                </span>
                <span className={`text-[10px] block mt-0.5 ${
                  isLight ? 'text-slate-600 font-medium' : 'text-slate-500'
                }`}>
                  Custo médio das 4 clouds para este porte
                </span>
              </div>
            </div>

            {/* Scrollable Body: Comparison Cards, Visual Bar Chart, Category Comparison, Commitments */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {/* Context Banner */}
              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                isLight ? 'bg-blue-50/70 border-blue-200 text-blue-900' : 'bg-blue-950/30 border-blue-500/20 text-blue-300'
              }`}>
                <div className="flex items-center space-x-3">
                  <Info className="w-5 h-5 shrink-0" />
                  <p className="text-xs leading-relaxed">
                    <strong>Simulação de Carga Equivalente:</strong> Comparamos o custo de provisionar a mesma especificação (vCPUs, memória, discos, bancos e redes) da sua arquitetura em cada provedor. O valor da sua <strong>Arquitetura Atual é de {formatCost(costReport.totalMonthly)}/mês</strong>.
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold shrink-0 border ml-3 ${
                  isLight ? 'bg-white text-blue-800 border-blue-300' : 'bg-black/40 text-blue-200 border-blue-500/30'
                }`}>
                  Benchmark 100% Automatizado
                </span>
              </div>

              {/* 4 Provider Comparison Cards Side by Side */}
              <div className="grid grid-cols-4 gap-4">
                {costReport.providerComparisons.map((p) => {
                  const isCheapest = p.provider === costReport.cheapestProvider.provider;
                  const borderClass =
                    p.provider === 'aws'
                      ? 'border-amber-500'
                      : p.provider === 'azure'
                      ? 'border-sky-500'
                      : p.provider === 'gcp'
                      ? 'border-emerald-500'
                      : 'border-red-500';

                  const badgeBg =
                    p.provider === 'aws'
                      ? isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : p.provider === 'azure'
                      ? isLight ? 'bg-sky-100 text-sky-900 border-sky-300' : 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                      : p.provider === 'gcp'
                      ? isLight ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : isLight ? 'bg-red-100 text-red-900 border-red-300' : 'bg-red-500/20 text-red-300 border-red-500/30';

                  return (
                    <div
                      key={p.provider}
                      className={`border-t-4 ${borderClass} border-x border-b rounded-2xl p-4 flex flex-col justify-between ${
                        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-black/25 border-white/10'
                      }`}
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className={`text-sm font-bold ${isLight ? 'text-slate-950' : 'text-slate-100'}`}>
                              {p.name.split(' ')[0]}
                            </h4>
                            <span className={`text-[10px] font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                              {p.name}
                            </span>
                          </div>
                          {isCheapest && (
                            <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.5 rounded shadow">
                              ECONÔMICO
                            </span>
                          )}
                        </div>

                        {/* Badge / Subtitle */}
                        <div className="mt-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border inline-block ${badgeBg}`}>
                            {p.badge}
                          </span>
                        </div>

                        {/* Main Pricing */}
                        <div className="mt-3.5 pt-3 border-t border-slate-200/60 dark:border-white/10">
                          <span className={`text-[10px] uppercase font-bold tracking-wider block ${
                            isLight ? 'text-slate-500' : 'text-slate-400'
                          }`}>
                            Mensal On-Demand
                          </span>
                          <span className={`text-2xl font-black mt-0.5 block ${
                            p.provider === 'aws' ? (isLight ? 'text-amber-700' : 'text-amber-400') :
                            p.provider === 'azure' ? (isLight ? 'text-sky-700' : 'text-sky-400') :
                            p.provider === 'gcp' ? (isLight ? 'text-emerald-700' : 'text-emerald-400') :
                            (isLight ? 'text-red-700' : 'text-red-400')
                          }`}>
                            {formatCost(p.monthlyCost)}
                          </span>
                          <span className={`text-[10px] block ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                            {formatCost(p.annualCost)} / ano
                          </span>
                        </div>

                        {/* Comparison with Current Architecture */}
                        <div className={`mt-2.5 px-2.5 py-1.5 rounded-lg text-[11px] flex items-center justify-between ${
                          p.diffPercentage < 0
                            ? isLight ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/20'
                            : p.diffPercentage > 0
                            ? isLight ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-amber-950/40 text-amber-300 border border-amber-500/20'
                            : isLight ? 'bg-slate-100 text-slate-700' : 'bg-white/5 text-slate-300'
                        }`}>
                          <span className="font-medium">vs Arquitetura Atual:</span>
                          <span className="font-bold">
                            {p.diffPercentage === 0 ? 'Equivalente' : `${p.diffPercentage > 0 ? '+' : ''}${p.diffPercentage}%`}
                          </span>
                        </div>

                        {/* Highlights */}
                        <div className="mt-3 space-y-1.5">
                          <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                            isLight ? 'text-slate-600' : 'text-slate-400'
                          }`}>
                            Diferenciais:
                          </span>
                          {p.highlights.map((h, idx) => (
                            <div key={idx} className="flex items-start space-x-1.5 text-[11px] leading-tight">
                              <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                p.provider === 'aws' ? 'text-amber-500' :
                                p.provider === 'azure' ? 'text-sky-500' :
                                p.provider === 'gcp' ? 'text-emerald-500' : 'text-red-500'
                              }`} />
                              <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>
                                {h}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Best for footer */}
                      <div className={`mt-4 pt-3 border-t text-[11px] rounded-lg p-2 ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-white/5 border-white/10 text-slate-400'
                      }`}>
                        <span className="font-bold block text-[10px] uppercase text-slate-400">Ideal Para:</span>
                        <span className="line-clamp-2">{p.bestFor}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Visual Comparative Bar Chart */}
              <div className={`border rounded-2xl p-5 ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-black/20 border-white/10'
              }`}>
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingDown className={`w-4 h-4 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                  <h3 className={`text-xs font-bold uppercase tracking-wider ${
                    isLight ? 'text-slate-900' : 'text-slate-200'
                  }`}>
                    Comparativo Visual de Preço Mensal (Proporcional)
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {/* Current Architecture Row */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-bold flex items-center space-x-1.5 ${
                        isLight ? 'text-slate-900' : 'text-slate-100'
                      }`}>
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                        <span>Arquitetura Atual (Configurada no Canvas)</span>
                      </span>
                      <span className={`font-black ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>
                        {formatCost(costReport.totalMonthly)} / mês
                      </span>
                    </div>
                    <div className={`w-full h-3 rounded-full overflow-hidden ${
                      isLight ? 'bg-slate-100' : 'bg-white/5'
                    }`}>
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, Math.max(5, (costReport.totalMonthly / maxComparisonVal) * 100))}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Provider rows */}
                  {costReport.providerComparisons.map((p) => {
                    const pct = Math.min(100, Math.max(5, (p.monthlyCost / maxComparisonVal) * 100));
                    const barColor =
                      p.provider === 'aws'
                        ? 'bg-amber-500'
                        : p.provider === 'azure'
                        ? 'bg-sky-500'
                        : p.provider === 'gcp'
                        ? 'bg-emerald-500'
                        : 'bg-red-500';

                    return (
                      <div key={p.provider} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-bold flex items-center space-x-1.5 ${
                            isLight ? 'text-slate-800' : 'text-slate-200'
                          }`}>
                            <span className={`w-2.5 h-2.5 rounded-full ${barColor} inline-block`}></span>
                            <span>{p.name}</span>
                          </span>
                          <span className={`font-black ${
                            p.provider === 'aws' ? (isLight ? 'text-amber-700' : 'text-amber-400') :
                            p.provider === 'azure' ? (isLight ? 'text-sky-700' : 'text-sky-400') :
                            p.provider === 'gcp' ? (isLight ? 'text-emerald-700' : 'text-emerald-400') :
                            (isLight ? 'text-red-700' : 'text-red-400')
                          }`}>
                            {formatCost(p.monthlyCost)} / mês
                          </span>
                        </div>
                        <div className={`w-full h-3 rounded-full overflow-hidden ${
                          isLight ? 'bg-slate-100' : 'bg-white/5'
                        }`}>
                          <div
                            className={`h-full ${barColor} rounded-full transition-all duration-500`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category-by-Category Benchmark Table */}
              <div className={`border rounded-2xl p-5 ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-black/20 border-white/10'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className={`text-xs font-bold uppercase tracking-wider ${
                      isLight ? 'text-slate-950' : 'text-slate-200'
                    }`}>
                      Benchmark Categoria a Categoria
                    </h3>
                    <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Estimativa de custo por tipo de serviço comparando os provedores
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className={`w-full text-left text-xs ${
                    isLight ? 'text-slate-800' : 'text-slate-300'
                  }`}>
                    <thead className={`font-bold uppercase text-[10px] border-b ${
                      isLight ? 'bg-slate-100 text-slate-800 border-slate-200' : 'bg-white/5 text-slate-400 border-white/10'
                    }`}>
                      <tr>
                        <th className="p-3">Categoria de Serviço</th>
                        <th className="p-3 text-right">Atual ({currency})</th>
                        <th className="p-3 text-right text-amber-600">AWS ({currency})</th>
                        <th className="p-3 text-right text-sky-600">Azure ({currency})</th>
                        <th className="p-3 text-right text-emerald-600">GCP ({currency})</th>
                        <th className="p-3 text-right text-red-600">OCI ({currency})</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${
                      isLight ? 'divide-slate-200' : 'divide-white/5'
                    }`}>
                      {costReport.categoryComparisons.map((c) => (
                        <tr key={c.category} className={isLight ? 'hover:bg-slate-50' : 'hover:bg-white/5'}>
                          <td className={`p-3 font-semibold ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                            {c.label}
                          </td>
                          <td className="p-3 text-right font-mono font-bold">
                            {formatCost(c.currentCost)}
                          </td>
                          <td className="p-3 text-right font-mono text-amber-600 font-semibold">
                            {formatCost(c.awsCost)}
                          </td>
                          <td className="p-3 text-right font-mono text-sky-600 font-semibold">
                            {formatCost(c.azureCost)}
                          </td>
                          <td className="p-3 text-right font-mono text-emerald-600 font-semibold">
                            {formatCost(c.gcpCost)}
                          </td>
                          <td className="p-3 text-right font-mono text-red-600 font-bold">
                            {formatCost(c.ociCost)}
                          </td>
                        </tr>
                      ))}

                      {costReport.categoryComparisons.length === 0 && (
                        <tr>
                          <td colSpan={6} className={`text-center py-6 text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                            Adicione recursos no diagrama para gerar o benchmark por categoria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot className={`font-bold border-t ${
                      isLight ? 'bg-slate-100 text-slate-900 border-slate-300' : 'bg-white/5 text-slate-100 border-white/10'
                    }`}>
                      <tr>
                        <td className="p-3 uppercase text-[11px]">Total Mensal Estimado:</td>
                        <td className="p-3 text-right font-black">{formatCost(costReport.totalMonthly)}</td>
                        <td className="p-3 text-right font-black text-amber-600">{formatCost(costReport.multiCloudComparison.awsMonthly)}</td>
                        <td className="p-3 text-right font-black text-sky-600">{formatCost(costReport.multiCloudComparison.azureMonthly)}</td>
                        <td className="p-3 text-right font-black text-emerald-600">{formatCost(costReport.multiCloudComparison.gcpMonthly)}</td>
                        <td className="p-3 text-right font-black text-red-600">{formatCost(costReport.multiCloudComparison.ociMonthly)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* TCO Commitments Table (Savings Plans / Reserved Instances) */}
              <div className={`border rounded-2xl p-5 ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-black/20 border-white/10'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  <ShieldCheck className={`w-4 h-4 ${isLight ? 'text-blue-600' : 'text-blue-400'}`} />
                  <h3 className={`text-xs font-bold uppercase tracking-wider ${
                    isLight ? 'text-slate-900' : 'text-slate-200'
                  }`}>
                    Simulação de Compromissos de Longo Prazo (Savings Plans & Reserved Instances)
                  </h3>
                </div>
                <p className={`text-[11px] mb-4 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Economia obtida ao assumir compromissos contratuais de 1 ou 3 anos com cada provedor
                </p>

                <div className="grid grid-cols-4 gap-4">
                  {costReport.providerComparisons.map((p) => (
                    <div
                      key={p.provider}
                      className={`border rounded-xl p-3.5 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className={`text-xs font-bold block ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                        {p.name.split(' ')[0]}
                      </span>

                      <div className="mt-2.5 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>On-Demand:</span>
                          <span className="font-bold">{formatCost(p.monthlyCost)}</span>
                        </div>
                        <div className="flex justify-between text-emerald-600 font-bold">
                          <span>1 Ano (~30% desc):</span>
                          <span>{formatCost(p.commitment1YrMonthly)}</span>
                        </div>
                        <div className="flex justify-between text-emerald-700 font-black">
                          <span>3 Anos (~55% desc):</span>
                          <span>{formatCost(p.commitment3YrMonthly)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
