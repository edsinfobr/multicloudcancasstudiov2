import { DiagramState } from '../types';

export const MGC_TEMPLATES: DiagramState[] = [
  // ==========================================
  // 1. MGC CLOUD-NATIVE MICROSERVICES (MKS + REGISTRY + DBAAS)
  // ==========================================
  {
    id: 'template_mgc_kubernetes_microservices',
    title: 'MGC Cloud-Native Microservices (MKS + Container Registry + DBaaS)',
    description: 'Arquitetura moderna de microsserviços em produção na MGC (br-se1) com VPC segmentada em sub-redes pública e privada, cluster Kubernetes gerenciado (MKS), Container Registry privado, PostgreSQL DBaaS e Object Storage S3.',
    primaryProvider: 'magalu',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    containers: [
      {
        id: 'c_mgc_k8s_region',
        name: 'MGC Region (br-se1)',
        provider: 'magalu',
        type: 'region',
        borderStyle: 'solid',
        x: 40,
        y: 40,
        width: 1065,
        height: 600,
        color: '#0086FF'
      },
      {
        id: 'c_mgc_k8s_vpc',
        name: 'MGC VPC',
        provider: 'magalu',
        type: 'vpc',
        cidrBlock: '10.10.0.0/16',
        borderStyle: 'dashed',
        x: 245,
        y: 95,
        width: 830,
        height: 515,
        color: '#0086FF'
      },
      {
        id: 'c_mgc_k8s_pub',
        name: 'MGC Public Subnet',
        provider: 'magalu',
        type: 'subnet',
        cidrBlock: '10.10.1.0/24',
        isPublicSubnet: true,
        borderStyle: 'dashed',
        x: 275,
        y: 155,
        width: 270,
        height: 425,
        color: '#38BDF8'
      },
      {
        id: 'c_mgc_k8s_priv',
        name: 'MGC Private Subnet',
        provider: 'magalu',
        type: 'subnet',
        cidrBlock: '10.10.2.0/24',
        isPublicSubnet: false,
        borderStyle: 'dashed',
        x: 570,
        y: 155,
        width: 475,
        height: 425,
        color: '#10B981'
      }
    ],
    nodes: [
      {
        id: 'n_mgc_k8s_users',
        name: 'Usuários Web & Mobile',
        provider: 'generic',
        category: 'networking',
        iconKey: 'generic_user',
        resourceType: 'generic_user',
        x: 70,
        y: 215,
        containerId: 'c_mgc_k8s_region',
        specs: { count: 1 }
      },
      {
        id: 'n_mgc_k8s_cicd',
        name: 'Pipeline CI/CD (GitOps)',
        provider: 'generic',
        category: 'devops',
        iconKey: 'generic_cicd',
        resourceType: 'generic_cicd',
        x: 70,
        y: 415,
        containerId: 'c_mgc_k8s_region',
        specs: { count: 1 }
      },
      {
        id: 'n_mgc_k8s_vpc_gw',
        name: 'MGC VPC Edge Gateway',
        provider: 'magalu',
        category: 'networking',
        iconKey: 'magalu_vpc',
        resourceType: 'mgc_network_vpcs',
        x: 345,
        y: 215,
        containerId: 'c_mgc_k8s_pub',
        specs: { count: 1, region: 'br-se1', cidrBlock: '10.10.0.0/16' }
      },
      {
        id: 'n_mgc_k8s_lb',
        name: 'Ingress Load Balancer',
        provider: 'generic',
        category: 'networking',
        iconKey: 'generic_load_balancer',
        resourceType: 'generic_load_balancer',
        x: 345,
        y: 415,
        containerId: 'c_mgc_k8s_pub',
        specs: { count: 1, isPublic: true }
      },
      {
        id: 'n_mgc_k8s_mks',
        name: 'MGC Kubernetes (MKS)',
        provider: 'magalu',
        category: 'container',
        iconKey: 'magalu_kubernetes',
        resourceType: 'mgc_kubernetes_cluster',
        x: 615,
        y: 215,
        containerId: 'c_mgc_k8s_priv',
        specs: { instanceType: 'cloud-k8s.gp1.medium', count: 3, region: 'br-se1', clusterVersion: 'v1.30.2', hoursPerMonth: 730 }
      },
      {
        id: 'n_mgc_k8s_cr',
        name: 'MGC Container Registry',
        provider: 'magalu',
        category: 'container',
        iconKey: 'magalu_container_registry',
        resourceType: 'mgc_container_registry',
        x: 615,
        y: 415,
        containerId: 'c_mgc_k8s_priv',
        specs: { count: 1, storageGb: 150, region: 'br-se1', registryType: 'Private' }
      },
      {
        id: 'n_mgc_k8s_db',
        name: 'MGC DBaaS PostgreSQL',
        provider: 'magalu',
        category: 'database',
        iconKey: 'magalu_databases',
        resourceType: 'mgc_dbaas_instances',
        x: 850,
        y: 215,
        containerId: 'c_mgc_k8s_priv',
        specs: { instanceType: 'DP2-4-40', engine: 'postgresql', count: 1, storageGb: 200, region: 'br-se1', hoursPerMonth: 730 }
      },
      {
        id: 'n_mgc_k8s_obj',
        name: 'MGC Object Storage',
        provider: 'magalu',
        category: 'storage',
        iconKey: 'magalu_object_storage',
        resourceType: 'mgc_object_storage_buckets',
        x: 850,
        y: 415,
        containerId: 'c_mgc_k8s_priv',
        specs: { count: 1, storageGb: 500, transferGb: 120, region: 'br-se1' }
      }
    ],
    links: [
      { id: 'mgc_k8s_l1', from: 'n_mgc_k8s_users', to: 'n_mgc_k8s_vpc_gw', label: 'HTTPS:443', style: 'solid', protocol: 'HTTPS' },
      { id: 'mgc_k8s_l2', from: 'n_mgc_k8s_vpc_gw', to: 'n_mgc_k8s_lb', label: 'Roteamento Público', style: 'solid', protocol: 'HTTPS' },
      { id: 'mgc_k8s_l3', from: 'n_mgc_k8s_lb', to: 'n_mgc_k8s_mks', label: 'Ingress HTTP/gRPC', style: 'solid', protocol: 'HTTP' },
      { id: 'mgc_k8s_l4', from: 'n_mgc_k8s_cicd', to: 'n_mgc_k8s_cr', label: 'OCI Push Image', style: 'dashed', protocol: 'HTTPS' },
      { id: 'mgc_k8s_l5', from: 'n_mgc_k8s_cr', to: 'n_mgc_k8s_mks', label: 'Pull Privado', style: 'dashed', protocol: 'Internal' },
      { id: 'mgc_k8s_l6', from: 'n_mgc_k8s_mks', to: 'n_mgc_k8s_db', label: 'PostgreSQL 5432', style: 'solid', protocol: 'SQL' },
      { id: 'mgc_k8s_l7', from: 'n_mgc_k8s_mks', to: 'n_mgc_k8s_obj', label: 'S3 API Assets/Logs', style: 'solid', protocol: 'HTTPS' }
    ]
  },

  // ==========================================
  // 2. MGC 3-TIER WEB APP ALTA DISPONIBILIDADE (VMs + BLOCK STORAGE + DBAAS)
  // ==========================================
  {
    id: 'template_mgc_iaas_web_ha',
    title: 'MGC 3-Tier Web App Alta Disponibilidade (VMs + NVMe + DBaaS)',
    description: 'Arquitetura tradicional de 3 camadas na MGC com sub-redes pública, aplicação e dados dentro de uma MGC VPC, Virtual Machines redundantes, volumes NVMe Block Storage, DBaaS gerenciado e Object Storage para mídia e backups.',
    primaryProvider: 'magalu',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    containers: [
      {
        id: 'c_mgc_web_region',
        name: 'MGC Region (br-se1)',
        provider: 'magalu',
        type: 'region',
        borderStyle: 'solid',
        x: 40,
        y: 40,
        width: 1060,
        height: 625,
        color: '#0086FF'
      },
      {
        id: 'c_mgc_web_vpc',
        name: 'MGC VPC Produção',
        provider: 'magalu',
        type: 'vpc',
        cidrBlock: '10.20.0.0/16',
        borderStyle: 'dashed',
        x: 235,
        y: 95,
        width: 835,
        height: 540,
        color: '#0086FF'
      },
      {
        id: 'c_mgc_web_pub',
        name: 'Public Subnet',
        provider: 'magalu',
        type: 'subnet',
        cidrBlock: '10.20.1.0/24',
        isPublicSubnet: true,
        borderStyle: 'dashed',
        x: 265,
        y: 150,
        width: 235,
        height: 455,
        color: '#38BDF8'
      },
      {
        id: 'c_mgc_web_app',
        name: 'App Subnet',
        provider: 'magalu',
        type: 'subnet',
        cidrBlock: '10.20.2.0/24',
        isPublicSubnet: false,
        borderStyle: 'dashed',
        x: 525,
        y: 150,
        width: 245,
        height: 455,
        color: '#0086FF'
      },
      {
        id: 'c_mgc_web_data',
        name: 'Data Subnet',
        provider: 'magalu',
        type: 'subnet',
        cidrBlock: '10.20.3.0/24',
        isPublicSubnet: false,
        borderStyle: 'dashed',
        x: 795,
        y: 150,
        width: 245,
        height: 455,
        color: '#10B981'
      }
    ],
    nodes: [
      {
        id: 'n_mgc_web_users',
        name: 'Clientes Internet',
        provider: 'generic',
        category: 'networking',
        iconKey: 'generic_user',
        resourceType: 'generic_user',
        x: 70,
        y: 285,
        containerId: 'c_mgc_web_region',
        specs: { count: 1 }
      },
      {
        id: 'n_mgc_web_waf',
        name: 'WAF / Firewall Borda',
        provider: 'generic',
        category: 'security',
        iconKey: 'generic_waf',
        resourceType: 'generic_waf',
        x: 310,
        y: 205,
        containerId: 'c_mgc_web_pub',
        specs: { count: 1 }
      },
      {
        id: 'n_mgc_web_lb',
        name: 'Load Balancer HTTPS',
        provider: 'generic',
        category: 'networking',
        iconKey: 'generic_load_balancer',
        resourceType: 'generic_load_balancer',
        x: 310,
        y: 405,
        containerId: 'c_mgc_web_pub',
        specs: { count: 1, isPublic: true }
      },
      {
        id: 'n_mgc_web_vm1',
        name: 'Web/API VM Cluster #1',
        provider: 'magalu',
        category: 'compute',
        iconKey: 'magalu_vm',
        resourceType: 'mgc_virtual_machine_instances',
        x: 575,
        y: 205,
        containerId: 'c_mgc_web_app',
        specs: { instanceType: 'BV4-8-40', count: 2, storageGb: 80, region: 'br-se1', hoursPerMonth: 730 }
      },
      {
        id: 'n_mgc_web_vm2',
        name: 'Worker VM Cluster #2',
        provider: 'magalu',
        category: 'compute',
        iconKey: 'magalu_vm',
        resourceType: 'mgc_virtual_machine_instances',
        x: 575,
        y: 405,
        containerId: 'c_mgc_web_app',
        specs: { instanceType: 'BV2-4-20', count: 2, storageGb: 50, region: 'br-se1', hoursPerMonth: 730 }
      },
      {
        id: 'n_mgc_web_db',
        name: 'MGC DBaaS Primário',
        provider: 'magalu',
        category: 'database',
        iconKey: 'magalu_databases',
        resourceType: 'mgc_dbaas_instances',
        x: 845,
        y: 195,
        containerId: 'c_mgc_web_data',
        specs: { instanceType: 'DP2-4-40', engine: 'postgresql', count: 1, storageGb: 300, region: 'br-se1', hoursPerMonth: 730 }
      },
      {
        id: 'n_mgc_web_bs',
        name: 'MGC Block Storage NVMe',
        provider: 'magalu',
        category: 'storage',
        iconKey: 'magalu_block_storage',
        resourceType: 'mgc_block_storage_volumes',
        x: 845,
        y: 340,
        containerId: 'c_mgc_web_data',
        specs: { count: 2, storageGb: 500, volumeType: 'cloud_nvme1k', region: 'br-se1' }
      },
      {
        id: 'n_mgc_web_obj',
        name: 'MGC Object Storage',
        provider: 'magalu',
        category: 'storage',
        iconKey: 'magalu_object_storage',
        resourceType: 'mgc_object_storage_buckets',
        x: 845,
        y: 485,
        containerId: 'c_mgc_web_data',
        specs: { count: 1, storageGb: 1000, transferGb: 200, region: 'br-se1' }
      }
    ],
    links: [
      { id: 'mgc_web_l1', from: 'n_mgc_web_users', to: 'n_mgc_web_waf', label: 'HTTPS:443', style: 'solid', protocol: 'HTTPS' },
      { id: 'mgc_web_l2', from: 'n_mgc_web_waf', to: 'n_mgc_web_lb', label: 'Tráfego Filtrado', style: 'solid', protocol: 'HTTPS' },
      { id: 'mgc_web_l3', from: 'n_mgc_web_lb', to: 'n_mgc_web_vm1', label: 'HTTP:8080', style: 'solid', protocol: 'HTTP' },
      { id: 'mgc_web_l4', from: 'n_mgc_web_lb', to: 'n_mgc_web_vm2', label: 'Async Jobs', style: 'solid', protocol: 'HTTP' },
      { id: 'mgc_web_l5', from: 'n_mgc_web_vm1', to: 'n_mgc_web_db', label: 'SQL Pool 5432', style: 'solid', protocol: 'SQL' },
      { id: 'mgc_web_l6', from: 'n_mgc_web_vm2', to: 'n_mgc_web_bs', label: 'Mount NVMe', style: 'dashed', protocol: 'Internal' },
      { id: 'mgc_web_l7', from: 'n_mgc_web_vm2', to: 'n_mgc_web_obj', label: 'S3 Media & Backups', style: 'solid', protocol: 'HTTPS' }
    ]
  },

  // ==========================================
  // 3. MGC DATA LAKE, ANALYTICS & DR MULTI-REGIÃO (br-se1 -> br-ne1)
  // ==========================================
  {
    id: 'template_mgc_datalake_dr',
    title: 'MGC Data Lake & Disaster Recovery Multi-Região (br-se1 → br-ne1)',
    description: 'Pipeline analítico e Data Lake S3 na região Sudeste (br-se1) com ingestão via VMs, processamento ETL em Kubernetes (MKS), discos NVMe Block Storage e replicação de Disaster Recovery para a região Nordeste (br-ne1).',
    primaryProvider: 'magalu',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    containers: [
      {
        id: 'c_mgc_dl_se1',
        name: 'MGC Region Sudeste (br-se1)',
        provider: 'magalu',
        type: 'region',
        borderStyle: 'solid',
        x: 40,
        y: 40,
        width: 710,
        height: 550,
        color: '#0086FF'
      },
      {
        id: 'c_mgc_dl_vpc',
        name: 'MGC VPC Analytics',
        provider: 'magalu',
        type: 'vpc',
        cidrBlock: '10.30.0.0/16',
        borderStyle: 'dashed',
        x: 70,
        y: 105,
        width: 650,
        height: 455,
        color: '#38BDF8'
      },
      {
        id: 'c_mgc_dl_ne1',
        name: 'MGC Region Nordeste — DR (br-ne1)',
        provider: 'magalu',
        type: 'region',
        borderStyle: 'solid',
        x: 790,
        y: 40,
        width: 300,
        height: 550,
        color: '#0EA5E9'
      }
    ],
    nodes: [
      {
        id: 'n_mgc_dl_ingest',
        name: 'Ingestion VMs (CDC)',
        provider: 'magalu',
        category: 'compute',
        iconKey: 'magalu_vm',
        resourceType: 'mgc_virtual_machine_instances',
        x: 110,
        y: 185,
        containerId: 'c_mgc_dl_vpc',
        specs: { instanceType: 'BV4-8-40', count: 2, storageGb: 100, region: 'br-se1', hoursPerMonth: 730 }
      },
      {
        id: 'n_mgc_dl_raw',
        name: 'Object Storage (Bronze)',
        provider: 'magalu',
        category: 'storage',
        iconKey: 'magalu_object_storage',
        resourceType: 'mgc_object_storage_buckets',
        x: 110,
        y: 385,
        containerId: 'c_mgc_dl_vpc',
        specs: { count: 1, storageGb: 2000, transferGb: 300, region: 'br-se1' }
      },
      {
        id: 'n_mgc_dl_k8s',
        name: 'ETL & Spark on MKS',
        provider: 'magalu',
        category: 'container',
        iconKey: 'magalu_kubernetes',
        resourceType: 'mgc_kubernetes_cluster',
        x: 335,
        y: 185,
        containerId: 'c_mgc_dl_vpc',
        specs: { instanceType: 'cloud-k8s.gp1.medium', count: 4, region: 'br-se1', clusterVersion: 'v1.30.2', hoursPerMonth: 730 }
      },
      {
        id: 'n_mgc_dl_bs',
        name: 'Block Storage Scratch',
        provider: 'magalu',
        category: 'storage',
        iconKey: 'magalu_block_storage',
        resourceType: 'mgc_block_storage_volumes',
        x: 335,
        y: 385,
        containerId: 'c_mgc_dl_vpc',
        specs: { count: 2, storageGb: 1000, volumeType: 'cloud_nvme1k', region: 'br-se1' }
      },
      {
        id: 'n_mgc_dl_db',
        name: 'Analytical DBaaS',
        provider: 'magalu',
        category: 'database',
        iconKey: 'magalu_databases',
        resourceType: 'mgc_dbaas_instances',
        x: 550,
        y: 185,
        containerId: 'c_mgc_dl_vpc',
        specs: { instanceType: 'DP2-4-40', engine: 'postgresql', count: 1, storageGb: 500, region: 'br-se1', hoursPerMonth: 730 }
      },
      {
        id: 'n_mgc_dl_gold',
        name: 'Object Storage (Gold)',
        provider: 'magalu',
        category: 'storage',
        iconKey: 'magalu_object_storage',
        resourceType: 'mgc_object_storage_buckets',
        x: 550,
        y: 385,
        containerId: 'c_mgc_dl_vpc',
        specs: { count: 1, storageGb: 1500, transferGb: 250, region: 'br-se1' }
      },
      {
        id: 'n_mgc_dl_dr_db',
        name: 'Standby DBaaS (br-ne1)',
        provider: 'magalu',
        category: 'database',
        iconKey: 'magalu_databases',
        resourceType: 'mgc_dbaas_instances',
        x: 865,
        y: 185,
        containerId: 'c_mgc_dl_ne1',
        specs: { instanceType: 'DP2-4-40', engine: 'postgresql', count: 1, storageGb: 500, region: 'br-ne1', hoursPerMonth: 730 }
      },
      {
        id: 'n_mgc_dl_dr_obj',
        name: 'DR Vault S3 (br-ne1)',
        provider: 'magalu',
        category: 'storage',
        iconKey: 'magalu_object_storage',
        resourceType: 'mgc_object_storage_buckets',
        x: 865,
        y: 385,
        containerId: 'c_mgc_dl_ne1',
        specs: { count: 1, storageGb: 2000, transferGb: 150, region: 'br-ne1' }
      }
    ],
    links: [
      { id: 'mgc_dl_l1', from: 'n_mgc_dl_ingest', to: 'n_mgc_dl_raw', label: 'Stream Raw Parquet', style: 'solid', protocol: 'HTTPS' },
      { id: 'mgc_dl_l2', from: 'n_mgc_dl_raw', to: 'n_mgc_dl_k8s', label: 'Leitura S3 Batch', style: 'solid', protocol: 'HTTPS' },
      { id: 'mgc_dl_l3', from: 'n_mgc_dl_k8s', to: 'n_mgc_dl_bs', label: 'PVC NVMe Shuffle', style: 'dashed', protocol: 'Internal' },
      { id: 'mgc_dl_l4', from: 'n_mgc_dl_k8s', to: 'n_mgc_dl_db', label: 'Carga BI SQL', style: 'solid', protocol: 'SQL' },
      { id: 'mgc_dl_l5', from: 'n_mgc_dl_k8s', to: 'n_mgc_dl_gold', label: 'Camada Curada', style: 'solid', protocol: 'HTTPS' },
      { id: 'mgc_dl_l6', from: 'n_mgc_dl_db', to: 'n_mgc_dl_dr_db', label: 'Replicação Async DR', style: 'dashed', protocol: 'SQL' },
      { id: 'mgc_dl_l7', from: 'n_mgc_dl_gold', to: 'n_mgc_dl_dr_obj', label: 'Cross-Region Sync', style: 'dashed', protocol: 'HTTPS' }
    ]
  },

  // ==========================================
  // 4. MGC + AWS MULTI-CLOUD SOBERANIA DE DADOS (LGPD BRASIL)
  // ==========================================
  {
    id: 'template_mgc_multicloud_lgpd',
    title: 'MGC + AWS Multi-Cloud Soberania de Dados (LGPD Brasil)',
    description: 'Arquitetura híbrida Multi-Cloud mantendo dados sensíveis (LGPD), DBaaS, Object Storage e APIs principais na MGC no Brasil (br-se1), integrados à borda global da AWS (CloudFront, WAF e Analytics anonimizados).',
    primaryProvider: 'magalu',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    containers: [
      {
        id: 'c_mgc_mc_mgc',
        name: 'MGC',
        provider: 'magalu',
        type: 'cloud_group',
        borderStyle: 'dashed',
        x: 40,
        y: 45,
        width: 530,
        height: 545,
        color: '#0086FF'
      },
      {
        id: 'c_mgc_mc_vpc',
        name: 'MGC VPC LGPD',
        provider: 'magalu',
        type: 'vpc',
        cidrBlock: '10.40.0.0/16',
        borderStyle: 'dashed',
        x: 70,
        y: 110,
        width: 470,
        height: 450,
        color: '#0086FF'
      },
      {
        id: 'c_mgc_mc_aws',
        name: 'AWS',
        provider: 'aws',
        type: 'cloud_group',
        borderStyle: 'dashed',
        x: 615,
        y: 45,
        width: 455,
        height: 545,
        color: '#FF9900'
      }
    ],
    nodes: [
      {
        id: 'n_mgc_mc_mks',
        name: 'Core APIs (MKS)',
        provider: 'magalu',
        category: 'container',
        iconKey: 'magalu_kubernetes',
        resourceType: 'mgc_kubernetes_cluster',
        x: 110,
        y: 180,
        containerId: 'c_mgc_mc_vpc',
        specs: { instanceType: 'cloud-k8s.gp1.medium', count: 3, region: 'br-se1', clusterVersion: 'v1.30.2', hoursPerMonth: 730 }
      },
      {
        id: 'n_mgc_mc_cr',
        name: 'MGC Container Registry',
        provider: 'magalu',
        category: 'container',
        iconKey: 'magalu_container_registry',
        resourceType: 'mgc_container_registry',
        x: 110,
        y: 385,
        containerId: 'c_mgc_mc_vpc',
        specs: { count: 1, storageGb: 100, region: 'br-se1', registryType: 'Private' }
      },
      {
        id: 'n_mgc_mc_db',
        name: 'DBaaS Dados LGPD',
        provider: 'magalu',
        category: 'database',
        iconKey: 'magalu_databases',
        resourceType: 'mgc_dbaas_instances',
        x: 345,
        y: 180,
        containerId: 'c_mgc_mc_vpc',
        specs: { instanceType: 'DP2-4-40', engine: 'postgresql', count: 1, storageGb: 250, region: 'br-se1', hoursPerMonth: 730 }
      },
      {
        id: 'n_mgc_mc_obj',
        name: 'Cofre S3 Soberano',
        provider: 'magalu',
        category: 'storage',
        iconKey: 'magalu_object_storage',
        resourceType: 'mgc_object_storage_buckets',
        x: 345,
        y: 385,
        containerId: 'c_mgc_mc_vpc',
        specs: { count: 1, storageGb: 1000, transferGb: 150, region: 'br-se1' }
      },
      {
        id: 'n_mgc_mc_cf',
        name: 'Amazon CloudFront CDN',
        provider: 'aws',
        category: 'networking',
        iconKey: 'aws_cloudfront',
        resourceType: 'aws_cloudfront_distribution',
        x: 660,
        y: 180,
        containerId: 'c_mgc_mc_aws',
        specs: { count: 1, transferGb: 300 }
      },
      {
        id: 'n_mgc_mc_waf',
        name: 'AWS WAF Global',
        provider: 'aws',
        category: 'security',
        iconKey: 'aws_waf',
        resourceType: 'aws_wafv2_web_acl',
        x: 875,
        y: 180,
        containerId: 'c_mgc_mc_aws',
        specs: { count: 1 }
      },
      {
        id: 'n_mgc_mc_s3',
        name: 'S3 Analytics Anonimizado',
        provider: 'aws',
        category: 'storage',
        iconKey: 'aws_s3',
        resourceType: 'aws_s3_bucket',
        x: 660,
        y: 385,
        containerId: 'c_mgc_mc_aws',
        specs: { storageGb: 800, transferGb: 100 }
      },
      {
        id: 'n_mgc_mc_eks',
        name: 'Global Services (EKS)',
        provider: 'aws',
        category: 'container',
        iconKey: 'aws_eks',
        resourceType: 'aws_eks_cluster',
        x: 875,
        y: 385,
        containerId: 'c_mgc_mc_aws',
        specs: { instanceType: 't3.large', count: 2, hoursPerMonth: 730 }
      }
    ],
    links: [
      { id: 'mgc_mc_l1', from: 'n_mgc_mc_waf', to: 'n_mgc_mc_cf', label: 'Edge Protection', style: 'solid', protocol: 'HTTPS' },
      { id: 'mgc_mc_l2', from: 'n_mgc_mc_cf', to: 'n_mgc_mc_mks', label: 'Origin API (mTLS)', style: 'solid', protocol: 'HTTPS' },
      { id: 'mgc_mc_l3', from: 'n_mgc_mc_cr', to: 'n_mgc_mc_mks', label: 'Deploy OCI', style: 'dashed', protocol: 'Internal' },
      { id: 'mgc_mc_l4', from: 'n_mgc_mc_mks', to: 'n_mgc_mc_db', label: 'PII / LGPD SQL', style: 'solid', protocol: 'SQL' },
      { id: 'mgc_mc_l5', from: 'n_mgc_mc_mks', to: 'n_mgc_mc_obj', label: 'S3 Documentos BR', style: 'solid', protocol: 'HTTPS' },
      { id: 'mgc_mc_l6', from: 'n_mgc_mc_obj', to: 'n_mgc_mc_s3', label: 'Sync Anonimizado', style: 'dashed', protocol: 'HTTPS' },
      { id: 'mgc_mc_l7', from: 'n_mgc_mc_s3', to: 'n_mgc_mc_eks', label: 'BI & ML Global', style: 'solid', protocol: 'HTTPS' }
    ]
  }
];
