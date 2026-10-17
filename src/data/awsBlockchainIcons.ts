import { CloudIconDefinition } from '../types';

export const AWS_BLOCKCHAIN_ICONS: CloudIconDefinition[] = [
  // 1. Amazon Managed Blockchain / Blockchain
  {
    key: 'aws_managed_blockchain',
    name: 'Amazon Managed Blockchain',
    provider: 'aws',
    category: 'database',
    brandColor: '#E05200',
    defaultResourceType: 'aws_managedblockchain_network',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Rede blockchain e nós de livro-razão distribuído gerenciados (Hyperledger Fabric e Ethereum)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#E05200" fill-opacity="0.12" stroke="#E05200" stroke-width="1.5"/>
      <!-- Left Chain Link -->
      <rect x="5" y="21" width="16" height="22" rx="3" stroke="#E05200" stroke-width="3" fill="none"/>
      <rect x="9.5" y="26.5" width="7" height="11" rx="1.5" stroke="#E05200" stroke-width="3" fill="none"/>
      <!-- Middle Chain Link -->
      <rect x="24" y="21" width="16" height="22" rx="3" stroke="#E05200" stroke-width="3" fill="none"/>
      <rect x="28.5" y="26.5" width="7" height="11" rx="1.5" stroke="#E05200" stroke-width="3" fill="none"/>
      <!-- Right Chain Link -->
      <rect x="43" y="21" width="16" height="22" rx="3" stroke="#E05200" stroke-width="3" fill="none"/>
      <rect x="47.5" y="26.5" width="7" height="11" rx="1.5" stroke="#E05200" stroke-width="3" fill="none"/>
      <!-- Left-to-Center Horizontal Connector Bars -->
      <line x1="21" y1="26.5" x2="24" y2="26.5" stroke="#E05200" stroke-width="3"/>
      <line x1="21" y1="37.5" x2="24" y2="37.5" stroke="#E05200" stroke-width="3"/>
      <!-- Center-to-Right Horizontal Connector Bars -->
      <line x1="40" y1="26.5" x2="43" y2="26.5" stroke="#E05200" stroke-width="3"/>
      <line x1="40" y1="37.5" x2="43" y2="37.5" stroke="#E05200" stroke-width="3"/>
    </svg>`
  },
  {
    key: 'aws_managed_blockchain_blockchain',
    name: 'Managed Blockchain Node',
    provider: 'aws',
    category: 'database',
    brandColor: '#E05200',
    defaultResourceType: 'aws_managedblockchain_node',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Nó ponto a ponto de rede blockchain gerenciado para transações descentralizadas e contratos inteligentes',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#E05200" fill-opacity="0.12" stroke="#E05200" stroke-width="1.5"/>
      <!-- Left Chain Link -->
      <rect x="5" y="21" width="16" height="22" rx="3" stroke="#E05200" stroke-width="3" fill="none"/>
      <rect x="9.5" y="26.5" width="7" height="11" rx="1.5" stroke="#E05200" stroke-width="3" fill="none"/>
      <!-- Middle Chain Link -->
      <rect x="24" y="21" width="16" height="22" rx="3" stroke="#E05200" stroke-width="3" fill="none"/>
      <rect x="28.5" y="26.5" width="7" height="11" rx="1.5" stroke="#E05200" stroke-width="3" fill="none"/>
      <!-- Right Chain Link -->
      <rect x="43" y="21" width="16" height="22" rx="3" stroke="#E05200" stroke-width="3" fill="none"/>
      <rect x="47.5" y="26.5" width="7" height="11" rx="1.5" stroke="#E05200" stroke-width="3" fill="none"/>
      <!-- Connectors -->
      <line x1="21" y1="26.5" x2="24" y2="26.5" stroke="#E05200" stroke-width="3"/>
      <line x1="21" y1="37.5" x2="24" y2="37.5" stroke="#E05200" stroke-width="3"/>
      <line x1="40" y1="26.5" x2="43" y2="26.5" stroke="#E05200" stroke-width="3"/>
      <line x1="40" y1="37.5" x2="43" y2="37.5" stroke="#E05200" stroke-width="3"/>
    </svg>`
  }
];
