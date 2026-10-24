import { DiagramNode, CostItem, MultiCloudCostComparison } from '../types';

// Baseline hourly prices for standard instances / services (USD)
const BASE_PRICING: Record<string, number> = {
  // AWS
  't3.small': 0.0208,
  't3.medium': 0.0416,
  't3.large': 0.0832,
  'c6i.xlarge': 0.17,
  'db.r6g.xlarge': 0.48,
  'aws_lambda': 0.0000002, // per invocation
  'aws_s3_gb': 0.023, // monthly per GB
  'aws_alb_hr': 0.0225,
  'aws_cloudfront_gb': 0.085,

  // Azure
  'Standard_B2s': 0.0416,
  'Standard_D2s_v3': 0.096,
  'Standard_D4s_v3': 0.192,
  'azure_sql_dtu': 0.02,
  'azure_blob_gb': 0.018,

  // GCP
  'e2-micro': 0.0084,
  'e2-standard-2': 0.067,
  'e2-standard-4': 0.134,
  'gcp_cloud_sql': 0.11,
  'gcp_gcs_gb': 0.02,

  // OCI
  'VM.Standard2.1': 0.0638,
  'VM.Standard.E4.Flex': 0.048,
  'oci_autonomous_db': 0.33,
  'oci_object_gb': 0.0255
};

export const calculateNodeCost = (node: DiagramNode): CostItem => {
  const hours = node.specs.hoursPerMonth || 730;
  const count = node.specs.count || 1;
  const storageGb = node.specs.storageGb || 0;
  const transferGb = node.specs.transferGb || 0;
  const instanceType = node.specs.instanceType || '';

  let unitCostHr = 0;
  let monthlyCost = 0;
  let details = '';

  if (BASE_PRICING[instanceType]) {
    unitCostHr = BASE_PRICING[instanceType];
    monthlyCost = unitCostHr * hours * count;
    details = `${count}x ${instanceType} @ $${unitCostHr.toFixed(4)}/hr (${hours} hrs/mo)`;
  } else if (node.iconKey === 'aws_braket_chandelier') {
    monthlyCost = 500 * count;
    details = `${count}x Dedicated Quantum Cryogenic Dilution Hardware Allocation`;
  } else if (node.iconKey === 'aws_braket_qpu') {
    monthlyCost = 120 * count;
    details = `${count}x Braket Quantum Processing Unit (QPU Task Execution & Shots)`;
  } else if (node.iconKey === 'aws_braket_tensor_network') {
    monthlyCost = 82.50 * count;
    details = `${count}x Braket TN1 Tensor Network Simulator (~$0.275/min runtime)`;
  } else if (node.iconKey === 'aws_braket_state_vector' || node.iconKey === 'aws_braket_noise_simulator') {
    monthlyCost = 45 * count;
    details = `${count}x Braket On-Demand Quantum Simulator (SV1/DM1 @ ~$0.075/min)`;
  } else if (node.iconKey === 'aws_braket_embedded_simulator') {
    monthlyCost = 0;
    details = `Braket Embedded Local Simulator (In-memory execution / No charge)`;
  } else if (node.iconKey?.startsWith('aws_braket')) {
    monthlyCost = 25 * count;
    details = `${count}x Braket Quantum Algorithm Tasks & Simulator Workload`;
  } else if (node.iconKey?.startsWith('aws_workspaces')) {
    monthlyCost = 35 * count;
    details = `${count}x WorkSpaces Desktop/Browser User @ ~$35/mo`;
  } else if (node.iconKey === 'aws_shield_advanced') {
    monthlyCost = 3000;
    details = `AWS Shield Advanced Enterprise DDoS Base ($3,000/mo)`;
  } else if (node.iconKey === 'aws_acm_certificate_authority') {
    monthlyCost = 400 * count;
    details = `${count}x Private Certificate Authority ($400/mo/CA)`;
  } else if (node.iconKey === 'aws_network_firewall' || node.iconKey === 'aws_network_firewall_endpoints') {
    monthlyCost = (47.50 + (transferGb * 0.065)) * count;
    details = `${count}x AWS Network Firewall Endpoints (~$47.50/mês + DPI traffic)`;
  } else if (node.iconKey === 'aws_guardduty') {
    monthlyCost = 32 * count;
    details = `GuardDuty Análise Inteligente de DNS, Flow Logs e CloudTrail (~$32/mês/conta)`;
  } else if (node.iconKey === 'aws_config') {
    monthlyCost = 14 * count;
    details = `AWS Config gravação contínua de CI e avaliações de regras (~$14/mês)`;
  } else if (node.iconKey === 'aws_control_tower') {
    monthlyCost = 0;
    details = `AWS Control Tower (Sem custo adicional direto; paga pelos recursos subjacentes)`;
  } else if (node.iconKey === 'aws_iam_identity_center') {
    monthlyCost = 0;
    details = `IAM Identity Center (Incluso no AWS Organizations sem custo adicional)`;
  } else if (node.iconKey === 'aws_central_log_archive_s3') {
    const pricePerGb = 0.023;
    monthlyCost = (storageGb * pricePerGb) + (transferGb * 0.05);
    details = `Central Log Archive S3 (${storageGb} GB com Object Lock & KMS CMK)`;
  } else if (node.iconKey?.startsWith('aws_directory_service')) {
    monthlyCost = 45 * count;
    details = `${count}x Directory Service Controller/Connector (~$45/mo)`;
  } else if (node.iconKey?.startsWith('aws_waf')) {
    monthlyCost = 5 + (3 * count);
    details = `WAF Web ACL ($5/mo) + Rule Groups Evaluation`;
  } else if (node.iconKey?.startsWith('aws_iam')) {
    monthlyCost = 0;
    details = `IAM Core Identity & Access Governance (Free tier / No charge)`;
  } else if (node.category === 'security') {
    monthlyCost = 10 * count;
    details = `${count}x Security & Compliance Service Assessment`;
  } else if (node.category === 'compute') {
    unitCostHr = 0.08;
    monthlyCost = unitCostHr * hours * count;
    details = `${count}x Compute Node @ ~$${unitCostHr}/hr`;
  } else if (node.category === 'storage') {
    const pricePerGb = BASE_PRICING[`${node.provider}_s3_gb`] || 0.023;
    monthlyCost = storageGb * pricePerGb + transferGb * 0.08;
    details = `${storageGb} GB Storage @ $${pricePerGb}/GB + ${transferGb} GB Outbound`;
  } else if (node.category === 'database') {
    unitCostHr = 0.25;
    monthlyCost = unitCostHr * hours * count + storageGb * 0.11;
    details = `${count}x DB Instance @ ~$${unitCostHr}/hr + ${storageGb} GB Storage`;
  } else if (node.iconKey === 'generic_user' || node.resourceType === 'generic_user' || node.name === 'Clients & Frontend' || node.iconKey === 'generic_internet') {
    monthlyCost = 0;
    unitCostHr = 0;
    details = `Clientes / Usuários Externos (Tráfego de cliente / Sem custo de infraestrutura)`;
  } else if (node.category === 'networking') {
    unitCostHr = 0.025;
    monthlyCost = unitCostHr * hours * count + transferGb * 0.085;
    details = `Load Balancer/CDN Base + Data Transfer`;
  } else if (node.category === 'container') {
    unitCostHr = 0.10;
    monthlyCost = unitCostHr * hours * count;
    details = `${count} Node K8s Cluster`;
  } else if (node.category === 'ai') {
    monthlyCost = 150 * count;
    details = `AI Endpoint Base Allocation`;
  } else if (node.category === 'analytics') {
    unitCostHr = 0.15;
    monthlyCost = unitCostHr * hours * count + (storageGb * 0.08);
    details = `${count}x Analytics/ETL Worker @ ~$${unitCostHr}/hr`;
  } else if (node.provider === 'onprem') {
    monthlyCost = 0;
    unitCostHr = 0;
    details = `${count}x On-Premise Asset (Infraestrutura Local / CapEx - Sem cobrança de nuvem)`;
  } else {
    monthlyCost = 15.0;
    details = `Standard Base Charge`;
  }

  // Storage cost addition
  if (storageGb > 0 && node.category === 'compute') {
    monthlyCost += storageGb * 0.10;
    details += ` + ${storageGb}GB EBS Disk`;
  }

  return {
    nodeId: node.id,
    nodeName: node.name,
    provider: node.provider,
    category: node.category,
    serviceType: instanceType || node.iconKey,
    unitCostHr,
    monthlyCost: Math.round(monthlyCost * 100) / 100,
    annualCost: Math.round(monthlyCost * 12 * 100) / 100,
    details
  };
};

export interface ProviderComparisonDetail {
  provider: 'aws' | 'azure' | 'gcp' | 'oci';
  name: string;
  monthlyCost: number;
  annualCost: number;
  diffFromCurrent: number;
  diffPercentage: number;
  badge: string;
  brandColor: string;
  bestFor: string;
  highlights: string[];
  commitment1YrMonthly: number;
  commitment3YrMonthly: number;
}

export interface CategoryComparisonItem {
  category: string;
  label: string;
  currentCost: number;
  awsCost: number;
  azureCost: number;
  gcpCost: number;
  ociCost: number;
}

export interface TotalCostReport {
  items: CostItem[];
  totalMonthly: number;
  totalAnnual: number;
  byProvider: Record<string, number>;
  byProviderCount: Record<string, number>;
  byCategory: Record<string, number>;
  byCategoryCount: Record<string, number>;
  zeroCostCount: number;
  dominantProvider: string;
  isMultiCloud: boolean;
  multiCloudComparison: MultiCloudCostComparison;
  providerComparisons: ProviderComparisonDetail[];
  categoryComparisons: CategoryComparisonItem[];
  cheapestProvider: ProviderComparisonDetail;
  maxSavingsMonthly: number;
  maxSavingsAnnual: number;
}

export const calculateTotalCost = (nodes: DiagramNode[]): TotalCostReport => {
  const items = nodes.map(calculateNodeCost);
  const totalMonthly = Math.round(items.reduce((acc, item) => acc + item.monthlyCost, 0) * 100) / 100;
  const totalAnnual = Math.round(totalMonthly * 12 * 100) / 100;

  const byProvider: Record<string, number> = { aws: 0, azure: 0, gcp: 0, oci: 0, generic: 0 };
  const byProviderCount: Record<string, number> = { aws: 0, azure: 0, gcp: 0, oci: 0, generic: 0 };
  const byCategory: Record<string, number> = {};
  const byCategoryCount: Record<string, number> = {};
  let zeroCostCount = 0;

  items.forEach((item) => {
    byProvider[item.provider] = Math.round(((byProvider[item.provider] || 0) + item.monthlyCost) * 100) / 100;
    byProviderCount[item.provider] = (byProviderCount[item.provider] || 0) + 1;

    byCategory[item.category] = Math.round(((byCategory[item.category] || 0) + item.monthlyCost) * 100) / 100;
    byCategoryCount[item.category] = (byCategoryCount[item.category] || 0) + 1;

    if (item.monthlyCost === 0) {
      zeroCostCount++;
    }
  });

  // Determine dominant provider and if multi-cloud
  const activeProviders = Object.keys(byProviderCount).filter(
    (p) => p !== 'generic' && (byProviderCount[p] || 0) > 0
  );
  const isMultiCloud = activeProviders.length > 1;
  let dominantProvider = 'aws';
  let maxCount = -1;
  activeProviders.forEach((p) => {
    if ((byProviderCount[p] || 0) > maxCount) {
      maxCount = byProviderCount[p];
      dominantProvider = p;
    }
  });

  // Calculate estimated equivalent multi-cloud totals
  const baseVal = totalMonthly > 0 ? totalMonthly : (nodes.length > 0 ? 50 : 0);
  const awsMonthly = Math.round(baseVal * 1.0 * 100) / 100;
  const azureMonthly = Math.round(baseVal * 0.94 * 100) / 100;
  const gcpMonthly = Math.round(baseVal * 0.88 * 100) / 100;
  const ociMonthly = Math.round(baseVal * 0.76 * 100) / 100;

  const multiCloudComparison: MultiCloudCostComparison = {
    awsMonthly,
    azureMonthly,
    gcpMonthly,
    ociMonthly
  };

  const createProviderDetail = (
    provider: 'aws' | 'azure' | 'gcp' | 'oci',
    name: string,
    monthlyCost: number,
    badge: string,
    brandColor: string,
    bestFor: string,
    highlights: string[],
    savingsRate1Yr: number,
    savingsRate3Yr: number
  ): ProviderComparisonDetail => {
    const annualCost = Math.round(monthlyCost * 12 * 100) / 100;
    const diffFromCurrent = totalMonthly > 0 ? Math.round((monthlyCost - totalMonthly) * 100) / 100 : 0;
    const diffPercentage = totalMonthly > 0 ? Math.round(((monthlyCost - totalMonthly) / totalMonthly) * 100) : 0;

    return {
      provider,
      name,
      monthlyCost,
      annualCost,
      diffFromCurrent,
      diffPercentage,
      badge,
      brandColor,
      bestFor,
      highlights,
      commitment1YrMonthly: Math.round(monthlyCost * (1 - savingsRate1Yr) * 100) / 100,
      commitment3YrMonthly: Math.round(monthlyCost * (1 - savingsRate3Yr) * 100) / 100
    };
  };

  const providerComparisons: ProviderComparisonDetail[] = [
    createProviderDetail(
      'aws',
      'AWS (Amazon Web Services)',
      awsMonthly,
      'Líder de Mercado & Ecossistema',
      '#FF9900',
      'Aplicações complexas, máxima variedade de serviços e parcerias globais',
      [
        'Maior catálogo de serviços gerenciados (+240 serviços nativos)',
        'Instâncias EC2 Graviton (ARM) com até 20% de economia de custo/performance',
        'Suporte a Savings Plans flexíveis e instâncias Spot para cargas tolerantes a falhas'
      ],
      0.28,
      0.52
    ),
    createProviderDetail(
      'azure',
      'Microsoft Azure',
      azureMonthly,
      'Sinergia Corporativa & Windows',
      '#0089D6',
      'Empresas com licenciamento Microsoft, Active Directory e ambientes corporativos híbridos',
      [
        'Azure Hybrid Benefit: economia de até 40% reutilizando licenças Windows Server e SQL Server',
        'Integração nativa de identidade e segurança com Microsoft Entra ID (Azure AD) e M365',
        'Instâncias Reservadas de 1 e 3 anos com grande flexibilidade de troca de famílias'
      ],
      0.30,
      0.54
    ),
    createProviderDetail(
      'gcp',
      'Google Cloud Platform (GCP)',
      gcpMonthly,
      'Melhor p/ Cloud Native, IA & Serverless',
      '#4285F4',
      'Aplicações modernas em containers, microsserviços, inteligência artificial Gemini e dados',
      [
        'Cloud Run scale-to-zero: zero cobrança de computação quando não houver requisições',
        'Descontos por Uso Sustentado (SUD) automáticos sem necessidade de contratação antecipada',
        'Latência ultra-baixa com Cloud Firestore, Firebase e rede global de fibra ótica própria'
      ],
      0.32,
      0.57
    ),
    createProviderDetail(
      'oci',
      'Oracle Cloud Infrastructure (OCI)',
      ociMonthly,
      '🏆 Campeão de Economia & Compute Flex',
      '#F80000',
      'Bancos de dados Oracle, alto tráfego de rede (egress) e computação bruta de baixo custo',
      [
        'Computação Flexível: alocação sob medida de vCPUs e GBs de memória sem desperdício',
        'Primeiros 10 TB/mês de transferência de saída de dados (egress) totalmente gratuitos',
        'Armazenamento em bloco de altíssimo desempenho com custo fixo e previsível'
      ],
      0.30,
      0.55
    )
  ];

  // Cheapest provider
  const cheapestProvider = providerComparisons.reduce((prev, curr) =>
    curr.monthlyCost < prev.monthlyCost ? curr : prev
  , providerComparisons[0]);

  const mostExpensiveProvider = providerComparisons.reduce((prev, curr) =>
    curr.monthlyCost > prev.monthlyCost ? curr : prev
  , providerComparisons[0]);

  const maxSavingsMonthly = Math.round((mostExpensiveProvider.monthlyCost - cheapestProvider.monthlyCost) * 100) / 100;
  const maxSavingsAnnual = Math.round(maxSavingsMonthly * 12 * 100) / 100;

  // Category comparison
  const categoryLabels: Record<string, string> = {
    compute: 'Computação (VMs, Clusters, Containers)',
    database: 'Bancos de Dados & Caches Gerenciados',
    storage: 'Armazenamento em Objeto, Blocos & Arquivos',
    networking: 'Rede, Load Balancers & CDNs',
    ai: 'Inteligência Artificial & Machine Learning',
    security: 'Segurança, WAF & Conformidade',
    analytics: 'Analytics, Mensageria & Big Data'
  };

  const categoryComparisons: CategoryComparisonItem[] = Object.keys(byCategory).map((cat) => {
    const cost = byCategory[cat];
    return {
      category: cat,
      label: categoryLabels[cat] || cat.toUpperCase(),
      currentCost: cost,
      awsCost: Math.round(cost * 1.0 * 100) / 100,
      azureCost: Math.round(cost * 0.94 * 100) / 100,
      gcpCost: Math.round(cost * 0.88 * 100) / 100,
      ociCost: Math.round(cost * 0.76 * 100) / 100
    };
  });

  return {
    items,
    totalMonthly,
    totalAnnual,
    byProvider,
    byProviderCount,
    byCategory,
    byCategoryCount,
    zeroCostCount,
    dominantProvider,
    isMultiCloud,
    multiCloudComparison,
    providerComparisons,
    cheapestProvider,
    maxSavingsMonthly,
    maxSavingsAnnual,
    categoryComparisons
  };
};
