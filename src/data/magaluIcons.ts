import { CloudIconDefinition } from '../types';

export const MAGALU_ICONS: CloudIconDefinition[] = [
  {
    key: 'magalu_vm',
    name: 'Virtual Machines',
    provider: 'magalu',
    category: 'compute',
    brandColor: '#0086FF',
    defaultResourceType: 'mgc_virtual_machine_instances',
    defaultSpecs: {
      instanceType: 'BV2-4-20',
      count: 1,
      storageGb: 50,
      region: 'br-se1',
      hoursPerMonth: 730,
    },
    description: 'MGC Virtual Machines — instâncias computacionais elásticas de alta performance no Brasil (br-se1 / br-ne1)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#0086FF" fill-opacity="0.12" stroke="#0086FF" stroke-width="2"/>
      <!-- VM Outer Chassis -->
      <rect x="13" y="14" width="38" height="28" rx="4" fill="#0086FF" fill-opacity="0.16" stroke="#0086FF" stroke-width="2"/>
      <!-- CPU Core inside VM -->
      <rect x="24" y="21" width="16" height="14" rx="2.5" fill="#0086FF"/>
      <rect x="28" y="25" width="8" height="6" rx="1" fill="#E0F2FE"/>
      <!-- CPU Pins -->
      <line x1="28" y1="17" x2="28" y2="21" stroke="#0086FF" stroke-width="2" stroke-linecap="round"/>
      <line x1="36" y1="17" x2="36" y2="21" stroke="#0086FF" stroke-width="2" stroke-linecap="round"/>
      <line x1="28" y1="35" x2="28" y2="39" stroke="#0086FF" stroke-width="2" stroke-linecap="round"/>
      <line x1="36" y1="35" x2="36" y2="39" stroke="#0086FF" stroke-width="2" stroke-linecap="round"/>
      <line x1="20" y1="26" x2="24" y2="26" stroke="#0086FF" stroke-width="2" stroke-linecap="round"/>
      <line x1="20" y1="31" x2="24" y2="31" stroke="#0086FF" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="26" x2="44" y2="26" stroke="#0086FF" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="31" x2="44" y2="31" stroke="#0086FF" stroke-width="2" stroke-linecap="round"/>
      <!-- Base Stand / Status Bar -->
      <rect x="20" y="46" width="24" height="5" rx="2.5" fill="#0086FF"/>
      <circle cx="25" cy="48.5" r="1.2" fill="#34D399"/>
      <line x1="30" y1="48.5" x2="40" y2="48.5" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
  },
  {
    key: 'magalu_kubernetes',
    name: 'Kubernetes (MKS)',
    provider: 'magalu',
    category: 'container',
    brandColor: '#0086FF',
    defaultResourceType: 'mgc_kubernetes_cluster',
    defaultSpecs: {
      instanceType: 'cloud-k8s.gp1.medium',
      count: 3,
      region: 'br-se1',
      clusterVersion: 'v1.30.2',
      hoursPerMonth: 730,
    },
    description: 'MGC Kubernetes Service (MKS) — clusters Kubernetes gerenciados com escalonamento automático de node pools',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#0086FF" fill-opacity="0.12" stroke="#0086FF" stroke-width="2"/>
      <!-- Outer Heptagon / Cluster Shield -->
      <polygon points="32,10 49,19 52,37 41,52 23,52 12,37 15,19" fill="#0086FF" fill-opacity="0.16" stroke="#0086FF" stroke-width="2.2" stroke-linejoin="round"/>
      <!-- Inner Wheel -->
      <circle cx="32" cy="32" r="10" stroke="#0086FF" stroke-width="2.2" fill="#0086FF" fill-opacity="0.22"/>
      <circle cx="32" cy="32" r="4" fill="#0086FF"/>
      <!-- Spokes -->
      <line x1="32" y1="15" x2="32" y2="22" stroke="#0086FF" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="46" y1="24" x2="40" y2="28" stroke="#0086FF" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="44" y1="43" x2="39" y2="38" stroke="#0086FF" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="20" y1="43" x2="25" y2="38" stroke="#0086FF" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="18" y1="24" x2="24" y2="28" stroke="#0086FF" stroke-width="2.2" stroke-linecap="round"/>
    </svg>`,
  },
  {
    key: 'magalu_container_registry',
    name: 'Container Registry',
    provider: 'magalu',
    category: 'container',
    brandColor: '#0086FF',
    defaultResourceType: 'mgc_container_registry',
    defaultSpecs: {
      count: 1,
      storageGb: 100,
      region: 'br-se1',
      registryType: 'Private',
    },
    description: 'MGC Container Registry — registro privado compatível com OCI/Docker para armazenamento e distribuição de imagens',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#0086FF" fill-opacity="0.12" stroke="#0086FF" stroke-width="2"/>
      <!-- Stacked Container Crates -->
      <rect x="13" y="29" width="12" height="10" rx="2" fill="#0086FF"/>
      <rect x="26" y="29" width="12" height="10" rx="2" fill="#0284C7"/>
      <rect x="39" y="29" width="12" height="10" rx="2" fill="#0086FF"/>
      <rect x="19" y="17" width="12" height="10" rx="2" fill="#38BDF8" stroke="#0086FF" stroke-width="1.5"/>
      <rect x="33" y="17" width="12" height="10" rx="2" fill="#0086FF"/>
      <!-- Registry Shelf Base -->
      <path d="M11 43H53L49 51H15L11 43Z" fill="#0052CC"/>
      <circle cx="20" cy="47" r="1.4" fill="#38BDF8"/>
      <circle cx="26" cy="47" r="1.4" fill="#34D399"/>
      <line x1="33" y1="47" x2="45" y2="47" stroke="#E0F2FE" stroke-width="1.6" stroke-linecap="round"/>
    </svg>`,
  },
  {
    key: 'magalu_block_storage',
    name: 'Block Storage',
    provider: 'magalu',
    category: 'storage',
    brandColor: '#0086FF',
    defaultResourceType: 'mgc_block_storage_volumes',
    defaultSpecs: {
      count: 1,
      storageGb: 200,
      volumeType: 'cloud_nvme1k',
      region: 'br-se1',
    },
    description: 'MGC Block Storage — volumes NVMe/SSD de baixa latência e alta disponibilidade acopláveis a VMs e Kubernetes',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#0086FF" fill-opacity="0.12" stroke="#0086FF" stroke-width="2"/>
      <!-- Isometric Block Volume Cubes -->
      <path d="M32 12L49 21V43L32 52L15 43V21L32 12Z" fill="#0086FF" fill-opacity="0.16" stroke="#0086FF" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M32 12L49 21L32 30L15 21L32 12Z" fill="#38BDF8" fill-opacity="0.55" stroke="#0086FF" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M32 30V52" stroke="#0086FF" stroke-width="2"/>
      <!-- Block Partition Lines -->
      <path d="M15 32L32 41L49 32" stroke="#0086FF" stroke-width="1.8" stroke-dasharray="3 2"/>
      <circle cx="23.5" cy="36.5" r="2" fill="#0086FF"/>
      <circle cx="40.5" cy="36.5" r="2" fill="#0052CC"/>
    </svg>`,
  },
  {
    key: 'magalu_object_storage',
    name: 'Object Storage',
    provider: 'magalu',
    category: 'storage',
    brandColor: '#0086FF',
    defaultResourceType: 'mgc_object_storage_buckets',
    defaultSpecs: {
      count: 1,
      storageGb: 500,
      transferGb: 100,
      region: 'br-se1',
    },
    description: 'MGC Object Storage — armazenamento de objetos compatível com API S3, escalável, durável e com versionamento',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#0086FF" fill-opacity="0.12" stroke="#0086FF" stroke-width="2"/>
      <!-- Bucket Rim -->
      <ellipse cx="32" cy="19" rx="16" ry="5.5" fill="#38BDF8" fill-opacity="0.5" stroke="#0086FF" stroke-width="2.2"/>
      <!-- Bucket Body -->
      <path d="M16 19L20 46C20 49.5 25.4 52 32 52C38.6 52 44 49.5 44 46L48 19" fill="#0086FF" fill-opacity="0.2" stroke="#0086FF" stroke-width="2.2" stroke-linejoin="round"/>
      <!-- Bucket Handle -->
      <path d="M22 16C24 11 40 11 42 16" stroke="#0052CC" stroke-width="2" stroke-linecap="round"/>
      <!-- Stored Objects -->
      <rect x="24" y="30" width="6.5" height="6.5" rx="1.5" fill="#0086FF"/>
      <rect x="33.5" y="30" width="6.5" height="6.5" rx="1.5" fill="#0052CC"/>
      <rect x="28.75" y="39" width="6.5" height="6.5" rx="1.5" fill="#38BDF8"/>
    </svg>`,
  },
  {
    key: 'magalu_vpc',
    name: 'VPC (Virtual Private Cloud)',
    provider: 'magalu',
    category: 'networking',
    brandColor: '#0086FF',
    defaultResourceType: 'mgc_network_vpcs',
    defaultSpecs: {
      count: 1,
      region: 'br-se1',
      cidrBlock: '10.0.0.0/16',
    },
    description: 'MGC VPC — rede virtual privada isolada com sub-redes, security groups, IPs públicos e roteamento avançado',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#0086FF" fill-opacity="0.12" stroke="#0086FF" stroke-width="2"/>
      <!-- Cloud Perimeter -->
      <path d="M20 44H45C50 44 53 40.5 53 36C53 31.8 49.9 28.4 45.8 28C44.5 21.5 38.8 17 32 17C26.2 17 21.3 20.6 19.5 25.8C14.7 26.5 11 30.5 11 35.5C11 40.2 15 44 20 44Z" fill="#0086FF" fill-opacity="0.18" stroke="#0086FF" stroke-width="2.2" stroke-linejoin="round"/>
      <!-- Internal VPC Nodes & Mesh -->
      <line x1="23" y1="35" x2="32" y2="27" stroke="#0052CC" stroke-width="2"/>
      <line x1="41" y1="35" x2="32" y2="27" stroke="#0052CC" stroke-width="2"/>
      <line x1="23" y1="35" x2="41" y2="35" stroke="#0052CC" stroke-width="2"/>
      <circle cx="32" cy="27" r="3.5" fill="#0086FF"/>
      <circle cx="23" cy="35" r="3.5" fill="#0052CC"/>
      <circle cx="41" cy="35" r="3.5" fill="#38BDF8" stroke="#0086FF" stroke-width="1.5"/>
    </svg>`,
  },
  {
    key: 'magalu_databases',
    name: 'Databases (DBaaS)',
    provider: 'magalu',
    category: 'database',
    brandColor: '#0086FF',
    defaultResourceType: 'mgc_dbaas_instances',
    defaultSpecs: {
      instanceType: 'DP2-4-40',
      engine: 'postgresql',
      count: 1,
      storageGb: 100,
      region: 'br-se1',
      hoursPerMonth: 730,
    },
    description: 'MGC Databases (DBaaS) — bancos de dados relacionais gerenciados (PostgreSQL, MySQL) com backup automático e alta disponibilidade',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#0086FF" fill-opacity="0.12" stroke="#0086FF" stroke-width="2"/>
      <!-- Database Cylinder -->
      <ellipse cx="32" cy="18" rx="16" ry="6" fill="#38BDF8" fill-opacity="0.55" stroke="#0086FF" stroke-width="2.2"/>
      <path d="M16 18V46C16 49.3 23.2 52 32 52C40.8 52 48 49.3 48 46V18" fill="#0086FF" fill-opacity="0.18" stroke="#0086FF" stroke-width="2.2"/>
      <path d="M16 28C16 31.3 23.2 34 32 34C40.8 34 48 31.3 48 28" stroke="#0086FF" stroke-width="2"/>
      <path d="M16 38C16 41.3 23.2 44 32 44C40.8 44 48 41.3 48 38" stroke="#0086FF" stroke-width="2"/>
      <!-- Active Status Dots -->
      <circle cx="24" cy="24" r="1.6" fill="#0052CC"/>
      <circle cx="24" cy="34" r="1.6" fill="#0052CC"/>
      <circle cx="24" cy="44" r="1.6" fill="#34D399"/>
    </svg>`,
  },
];
