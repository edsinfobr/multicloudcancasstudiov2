import { CloudIconDefinition } from '../types';

export const AWS_ANALYTICS_ICONS: CloudIconDefinition[] = [
  // 1. Amazon Athena Data Source Connectors
  {
    key: 'aws_athena_data_source_connectors',
    name: 'Athena Data Source Connectors',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_athena_data_catalog',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Conectores federados do Athena para consultar fontes de dados heterogêneas e bancos externos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="38" cy="12" rx="5" ry="3" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.15"/>
      <path d="M33 12V17C33 18.6 35.2 20 38 20C40.8 20 43 18.6 43 17V12" stroke="#8C4FFF" stroke-width="2.5"/>
      <ellipse cx="38" cy="46" rx="5" ry="3" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.15"/>
      <path d="M33 46V51C33 52.6 35.2 54 38 54C40.8 54 43 52.6 43 51V46" stroke="#8C4FFF" stroke-width="2.5"/>
      <circle cx="36" cy="32" r="11" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <line x1="44" y1="40" x2="56" y2="52" stroke="#8C4FFF" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M12 36C10 36 8 34 8 32C8 30 10 28 12 28C12.5 25 15 23 18 24C19 21 22 21 24 23C26 23 27 25 27 27" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
      <path d="M26 18C23 20 20 23 18 27" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 3"/>
      <path d="M18 37C20 41 23 44 26 46" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 3"/>
    </svg>`
  },

  // 2. Amazon CloudSearch Search Documents
  {
    key: 'aws_cloudsearch_search_documents',
    name: 'CloudSearch Search Documents',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_cloudsearch_domain',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Indexação e consulta de documentos em texto completo via Amazon CloudSearch gerenciado',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="8" width="34" height="48" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <line x1="22" y1="16" x2="42" y2="16" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="21" x2="42" y2="21" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="26" x2="42" y2="26" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="31" x2="42" y2="31" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="36" x2="42" y2="36" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="41" x2="42" y2="41" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="46" x2="35" y2="46" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 20L7 24L12 28Z" fill="#8C4FFF"/>
      <path d="M52 20L57 24L52 28Z" fill="#8C4FFF"/>
    </svg>`
  },

  // 3. Amazon OpenSearch Service Cluster Administrator Node
  {
    key: 'aws_opensearch_cluster_administrator_node',
    name: 'OpenSearch Cluster Admin Node',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_opensearch_domain',
    defaultSpecs: { count: 3, instanceType: 'm6g.large.search' },
    description: 'Nó mestre gerenciador de cluster OpenSearch dedicado para tarefas de coordenação e integridade',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="48" height="48" rx="8" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <circle cx="42" cy="42" r="11" stroke="#8C4FFF" stroke-width="2" fill="white"/>
      <circle cx="42" cy="42" r="5" stroke="#8C4FFF" stroke-width="2"/>
      <path d="M42 29V32M42 52V55M29 42H32M52 42H55M33 33L35 35M49 49L51 51M33 51L35 49M49 35L51 33" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // 4. Amazon OpenSearch Service OpenSearch Dashboards
  {
    key: 'aws_opensearch_dashboards',
    name: 'OpenSearch Dashboards',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_opensearch_domain',
    defaultSpecs: { count: 1 },
    description: 'Interface visual para exploração interativa, gráficos e painéis de telemetria no OpenSearch',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="10" width="48" height="44" rx="4" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <line x1="8" y1="20" x2="56" y2="20" stroke="#8C4FFF" stroke-width="2"/>
      <circle cx="14" cy="15" r="1.5" fill="#8C4FFF"/>
      <circle cx="19" cy="15" r="1.5" fill="#8C4FFF"/>
      <circle cx="24" cy="15" r="1.5" fill="#8C4FFF"/>
      <rect x="14" y="36" width="4" height="12" fill="#8C4FFF"/>
      <rect x="21" y="28" width="4" height="20" fill="#8C4FFF"/>
      <rect x="28" y="32" width="4" height="16" fill="#8C4FFF"/>
      <path d="M35 48L44 32L51 48" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="#8C4FFF" fill-opacity="0.2"/>
    </svg>`
  },

  // 5. Amazon OpenSearch Service OpenSearch Ingestion
  {
    key: 'aws_opensearch_ingestion',
    name: 'OpenSearch Ingestion Pipeline',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_opensearch_ingestion_pipeline',
    defaultSpecs: { count: 1, minOcu: 2, maxOcu: 4 },
    description: 'Pipeline gerenciado sem servidor para ingestão, filtragem e enriquecimento de dados e logs',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 8H20C32 8 36 28 44 28H48" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M8 56H20C32 56 36 36 44 36H48" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="10" y="14" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="18" y="26" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="10" y="40" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <line x1="32" y1="30" x2="40" y2="30" stroke="#8C4FFF" stroke-width="2.5"/>
      <polygon points="40,27 44,30 40,33" fill="#8C4FFF"/>
      <circle cx="52" cy="30" r="4.5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M48 18L54 20M48 42L54 40" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },

  // 6. Amazon DataZone Business Data Catalog
  {
    key: 'aws_datazone_business_data_catalog',
    name: 'DataZone Business Data Catalog',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_datazone_domain',
    defaultSpecs: { count: 1 },
    description: 'Catálogo de governança e metadados de negócios para organizar ativos de dados na organização',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 10H10V54H12" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="18" y="10" width="36" height="44" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <line x1="24" y1="16" x2="48" y2="16" stroke="#8C4FFF" stroke-width="2"/>
      <line x1="24" y1="20" x2="48" y2="20" stroke="#8C4FFF" stroke-width="2"/>
      <circle cx="36" cy="27" r="2.5" stroke="#8C4FFF" stroke-width="2" fill="white"/>
      <line x1="36" y1="29.5" x2="36" y2="34" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="28" y1="34" x2="44" y2="34" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="28" y1="34" x2="28" y2="38" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="36" y1="34" x2="36" y2="38" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="44" y1="34" x2="44" y2="38" stroke="#8C4FFF" stroke-width="1.8"/>
      <circle cx="28" cy="40" r="2" stroke="#8C4FFF" stroke-width="1.8" fill="white"/>
      <circle cx="36" cy="40" r="2" stroke="#8C4FFF" stroke-width="1.8" fill="white"/>
      <circle cx="44" cy="40" r="2" stroke="#8C4FFF" stroke-width="1.8" fill="white"/>
      <line x1="24" y1="46" x2="48" y2="46" stroke="#8C4FFF" stroke-width="2"/>
      <line x1="24" y1="50" x2="48" y2="50" stroke="#8C4FFF" stroke-width="2"/>
    </svg>`
  },

  // 7. Amazon DataZone Data Portal
  {
    key: 'aws_datazone_data_portal',
    name: 'DataZone Data Portal',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_datazone_domain',
    defaultSpecs: { count: 1 },
    description: 'Portal colaborativo para descoberta, publicação e governança de dados self-service',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="16" width="46" height="40" rx="3" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <line x1="8" y1="24" x2="54" y2="24" stroke="#8C4FFF" stroke-width="2"/>
      <line x1="18" y1="24" x2="18" y2="56" stroke="#8C4FFF" stroke-width="2"/>
      <rect x="24" y="30" width="6" height="6" fill="#8C4FFF" fill-opacity="0.3"/>
      <rect x="36" y="30" width="6" height="6" fill="#8C4FFF" fill-opacity="0.3"/>
      <rect x="24" y="42" width="6" height="6" fill="#8C4FFF" fill-opacity="0.3"/>
      <rect x="36" y="42" width="6" height="6" fill="#8C4FFF" fill-opacity="0.3"/>
      <path d="M42 12C42 10.3 43.3 9 45 9C46.7 9 48 10.3 48 12" stroke="#8C4FFF" stroke-width="2"/>
      <path d="M49 12C49 10.3 50.3 9 52 9C53.7 9 55 10.3 55 12" stroke="#8C4FFF" stroke-width="2"/>
      <circle cx="45" cy="8" r="2" stroke="#8C4FFF" stroke-width="1.8"/>
      <circle cx="52" cy="8" r="2" stroke="#8C4FFF" stroke-width="1.8"/>
      <path d="M26 10H32M29 7V13" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },

  // 8. Amazon DataZone Data Projects
  {
    key: 'aws_datazone_data_projects',
    name: 'DataZone Data Projects',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_datazone_project',
    defaultSpecs: { count: 1 },
    description: 'Projetos seguros do DataZone para agrupamento de pessoas, fontes de dados e análises analíticas',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="8" width="34" height="46" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <path d="M12 56H48" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M12 48V56" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="28" cy="20" r="3" stroke="#8C4FFF" stroke-width="2"/>
      <circle cx="18" cy="32" r="3" stroke="#8C4FFF" stroke-width="2"/>
      <path d="M24 28C24 25.8 25.8 24 28 24C30.2 24 32 25.8 32 28" stroke="#8C4FFF" stroke-width="2"/>
      <path d="M14 40C14 37.8 15.8 36 18 36C20.2 36 22 37.8 22 40" stroke="#8C4FFF" stroke-width="2"/>
      <rect x="36" y="32" width="3" height="14" fill="#8C4FFF"/>
      <rect x="41" y="24" width="3" height="22" fill="#8C4FFF"/>
      <rect x="46" y="28" width="3" height="18" fill="#8C4FFF"/>
    </svg>`
  },

  // 9. Amazon EMR Cluster
  {
    key: 'aws_emr_cluster',
    name: 'EMR Cluster',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_emr_cluster',
    defaultSpecs: { count: 3, instanceType: 'm5.xlarge', releaseLabel: 'emr-6.10.0' },
    description: 'Cluster distribuído de big data para Apache Spark, Presto, Hive e ecossistema Hadoop',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="18" cy="22" rx="9" ry="4" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M9 22V42C9 44.5 13 46 18 46C23 46 27 44.5 27 42V22" stroke="#8C4FFF" stroke-width="2.5"/>
      <path d="M9 32C9 34.5 13 36 18 36C23 36 27 34.5 27 32" stroke="#8C4FFF" stroke-width="2.5"/>
      <rect x="34" y="10" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="48" y="18" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="36" y="44" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="50" y="34" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <line x1="27" y1="28" x2="34" y2="16" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="27" y1="32" x2="48" y2="22" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="27" y1="36" x2="50" y2="38" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="27" y1="40" x2="36" y2="46" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="42" y1="16" x2="48" y2="20" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="44" y1="46" x2="50" y2="40" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="52" y1="26" x2="54" y2="34" stroke="#8C4FFF" stroke-width="1.8"/>
    </svg>`
  },

  // 10. Amazon EMR Engine
  {
    key: 'aws_emr_engine',
    name: 'EMR Engine',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_emr_cluster',
    defaultSpecs: { count: 1 },
    description: 'Mecanismo central de execução e processamento otimizado de queries e jobs analíticos EMR',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 24H10V40H12" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M12 24V40H22L26 44H38V40H48V36L54 36V28L48 28V24H38V20H26L22 24H12Z" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1" stroke-linejoin="round"/>
      <line x1="26" y1="14" x2="26" y2="20" stroke="#8C4FFF" stroke-width="2.5"/>
      <line x1="22" y1="14" x2="30" y2="14" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="34" cy="32" r="4" stroke="#8C4FFF" stroke-width="2"/>
    </svg>`
  },

  // 11. Amazon EMR HDFS Cluster
  {
    key: 'aws_emr_hdfs_cluster',
    name: 'EMR HDFS Cluster',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_emr_cluster',
    defaultSpecs: { count: 3, storageGb: 1000 },
    description: 'Sistema de arquivos distribuído Hadoop (HDFS) provisionado sobre nós de computação EMR',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="22" width="16" height="18" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="36" y="8" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="48" y="16" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="38" y="44" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="50" y="34" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <line x1="24" y1="28" x2="36" y2="14" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="24" y1="30" x2="48" y2="20" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="24" y1="34" x2="50" y2="36" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="24" y1="38" x2="38" y2="46" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="44" y1="14" x2="48" y2="18" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="52" y1="24" x2="54" y2="34" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="46" y1="46" x2="50" y2="40" stroke="#8C4FFF" stroke-width="1.8"/>
    </svg>`
  },

  // 12. Amazon MSK Amazon MSK Connect
  {
    key: 'aws_msk_connect',
    name: 'Amazon MSK Connect',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_mskconnect_connector',
    defaultSpecs: { count: 1, capacity: 2 },
    description: 'Conectores gerenciados Kafka Connect para ingestão e streaming de tópicos no Apache Kafka',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="12" r="3.5" stroke="#8C4FFF" stroke-width="2.5" fill="white"/>
      <circle cx="12" cy="46" r="3.5" stroke="#8C4FFF" stroke-width="2.5" fill="white"/>
      <circle cx="52" cy="46" r="3.5" stroke="#8C4FFF" stroke-width="2.5" fill="white"/>
      <circle cx="32" cy="32" r="3.5" stroke="#8C4FFF" stroke-width="2.5" fill="white"/>
      <line x1="32" y1="16" x2="32" y2="28" stroke="#8C4FFF" stroke-width="2.5"/>
      <polygon points="32,26 29,22 35,22" fill="#8C4FFF"/>
      <line x1="30" y1="35" x2="16" y2="44" stroke="#8C4FFF" stroke-width="2.5"/>
      <polygon points="18,44 22,41 24,46" fill="#8C4FFF"/>
      <line x1="34" y1="35" x2="48" y2="44" stroke="#8C4FFF" stroke-width="2.5"/>
      <polygon points="46,44 40,46 42,41" fill="#8C4FFF"/>
      <line x1="16" y1="46" x2="48" y2="46" stroke="#8C4FFF" stroke-width="2" stroke-dasharray="2 3"/>
      <path d="M15 44L32 15L49 44" stroke="#8C4FFF" stroke-width="1.8" stroke-dasharray="2 3"/>
    </svg>`
  },

  // 13. Amazon OpenSearch Service Data Node
  {
    key: 'aws_opensearch_data_node',
    name: 'OpenSearch Data Node',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_opensearch_domain',
    defaultSpecs: { count: 3, instanceType: 'r6g.large.search', storageGb: 200 },
    description: 'Nó dedicado de armazenamento e computação de shards de dados no cluster OpenSearch',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="48" height="48" rx="8" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <circle cx="36" cy="34" r="10" stroke="#8C4FFF" stroke-width="2.5" fill="white"/>
      <line x1="43" y1="41" x2="52" y2="50" stroke="#8C4FFF" stroke-width="3.5" stroke-linecap="round"/>
    </svg>`
  },

  // 14. Amazon OpenSearch Service Index
  {
    key: 'aws_opensearch_index',
    name: 'OpenSearch Index',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_opensearch_domain',
    defaultSpecs: { count: 1 },
    description: 'Coleção lógica e particionada de documentos JSON indexados e pesquisáveis no OpenSearch',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="14" width="14" height="12" rx="1" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.15"/>
      <rect x="34" y="10" width="16" height="16" rx="1" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.15"/>
      <rect x="10" y="24" width="44" height="28" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <rect x="26" y="34" width="12" height="5" rx="1" fill="#8C4FFF"/>
    </svg>`
  },

  // 15. Amazon OpenSearch Service Observability
  {
    key: 'aws_opensearch_observability',
    name: 'OpenSearch Observability',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_opensearch_domain',
    defaultSpecs: { count: 1 },
    description: 'Visão unificada de logs, métricas e rastreamentos para monitoramento e observabilidade contínua',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="14" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <line x1="42" y1="42" x2="52" y2="52" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round"/>
      <rect x="25" y="32" width="3" height="8" fill="#8C4FFF"/>
      <rect x="31" y="26" width="3" height="14" fill="#8C4FFF"/>
      <rect x="37" y="29" width="3" height="11" fill="#8C4FFF"/>
      <path d="M48 20C45 14 39 10 32 10C24 10 16 16 14 24" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
      <polygon points="46,14 50,20 44,21" fill="#8C4FFF"/>
      <path d="M16 44C19 50 25 54 32 54C40 54 48 48 50 40" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
      <polygon points="18,50 14,44 20,43" fill="#8C4FFF"/>
    </svg>`
  },

  // 16. Amazon OpenSearch Service Traces
  {
    key: 'aws_opensearch_traces',
    name: 'OpenSearch Traces',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_opensearch_domain',
    defaultSpecs: { count: 1 },
    description: 'Análise detalhada de rastreamento distribuído (APM) para depuração de microsserviços',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="16" height="16" rx="1" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <line x1="26" y1="18" x2="36" y2="18" stroke="#8C4FFF" stroke-width="2.5"/>
      <line x1="36" y1="18" x2="36" y2="48" stroke="#8C4FFF" stroke-width="2.5"/>
      <line x1="36" y1="18" x2="44" y2="18" stroke="#8C4FFF" stroke-width="2.5"/>
      <line x1="36" y1="33" x2="44" y2="33" stroke="#8C4FFF" stroke-width="2.5"/>
      <line x1="36" y1="48" x2="44" y2="48" stroke="#8C4FFF" stroke-width="2.5"/>
      <circle cx="48" cy="18" r="4" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="48" cy="33" r="4" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="48" cy="48" r="4" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
    </svg>`
  },

  // 17. Amazon OpenSearch Service UltraWarm Node
  {
    key: 'aws_opensearch_ultrawarm_node',
    name: 'OpenSearch UltraWarm Node',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_opensearch_domain',
    defaultSpecs: { count: 2, instanceType: 'ultrawarm1.medium.search' },
    description: 'Camada de armazenamento warm de baixo custo baseada em S3 para retenção prolongada no OpenSearch',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="48" height="48" rx="8" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <ellipse cx="38" cy="28" rx="9" ry="3.5" stroke="#8C4FFF" stroke-width="2" fill="white"/>
      <path d="M29 28L32 46C32 47.5 34.5 49 38 49C41.5 49 44 47.5 44 46L47 28" stroke="#8C4FFF" stroke-width="2"/>
      <path d="M30 36L46 32" stroke="#8C4FFF" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`
  },

  // 18. Amazon QuickSight Paginated Reports
  {
    key: 'aws_quicksight_paginated_reports',
    name: 'QuickSight Paginated Reports',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_quicksight_analysis',
    defaultSpecs: { count: 1 },
    description: 'Relatórios analíticos paginados e operacionais em formato PDF ou CSV via Amazon QuickSight',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 16H28V52H12Z" stroke="#8C4FFF" stroke-width="2" stroke-linejoin="round" fill="#8C4FFF" fill-opacity="0.05"/>
      <path d="M20 8H44L52 16V56H20V8Z" stroke="#8C4FFF" stroke-width="2.5" stroke-linejoin="round" fill="#8C4FFF" fill-opacity="0.15"/>
      <polygon points="44,8 52,16 44,16" fill="#8C4FFF"/>
      <rect x="26" y="22" width="20" height="26" rx="1" stroke="#8C4FFF" stroke-width="2"/>
      <line x1="30" y1="28" x2="34" y2="28" stroke="#8C4FFF" stroke-width="2"/>
      <line x1="38" y1="28" x2="42" y2="28" stroke="#8C4FFF" stroke-width="2"/>
      <line x1="30" y1="34" x2="34" y2="34" stroke="#8C4FFF" stroke-width="2"/>
      <line x1="38" y1="34" x2="42" y2="34" stroke="#8C4FFF" stroke-width="2"/>
      <line x1="30" y1="40" x2="34" y2="40" stroke="#8C4FFF" stroke-width="2"/>
      <line x1="38" y1="40" x2="42" y2="40" stroke="#8C4FFF" stroke-width="2"/>
    </svg>`
  },

  // 19. Amazon Redshift Auto-copy
  {
    key: 'aws_redshift_auto_copy',
    name: 'Redshift Auto-copy',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_redshift_cluster',
    defaultSpecs: { count: 1 },
    description: 'Ingestão contínua e automatizada de dados diretamente do Amazon S3 para tabelas Redshift',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="18" cy="38" rx="7" ry="3" stroke="#8C4FFF" stroke-width="2" fill="white"/>
      <path d="M11 38L13 50C13 51.5 15 52.5 18 52.5C21 52.5 23 51.5 23 50L25 38" stroke="#8C4FFF" stroke-width="2"/>
      <ellipse cx="44" cy="18" rx="11" ry="4.5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M33 18V44C33 46.5 38 48.5 44 48.5C50 48.5 55 46.5 55 44V18" stroke="#8C4FFF" stroke-width="2.5"/>
      <circle cx="38" cy="27" r="2" fill="#8C4FFF"/>
      <circle cx="48" cy="33" r="2" fill="#8C4FFF"/>
      <line x1="38" y1="27" x2="48" y2="33" stroke="#8C4FFF" stroke-width="1.8"/>
      <path d="M18 34C18 24 24 24 33 24" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 3"/>
      <polygon points="31,21 36,24 31,27" fill="#8C4FFF"/>
    </svg>`
  },

  // 20. Amazon Redshift Data Sharing Governance
  {
    key: 'aws_redshift_data_sharing_governance',
    name: 'Redshift Data Sharing Governance',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_redshift_data_share_consumer_association',
    defaultSpecs: { count: 1 },
    description: 'Compartilhamento seguro de dados cross-cluster, cross-account e governança no data warehouse Redshift',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="44" cy="16" rx="12" ry="5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M32 16V46C32 48.8 37.4 51 44 51C50.6 51 56 48.8 56 46V16" stroke="#8C4FFF" stroke-width="2.5"/>
      <circle cx="38" cy="26" r="2.5" fill="#8C4FFF"/>
      <circle cx="48" cy="32" r="2.5" fill="#8C4FFF"/>
      <line x1="38" y1="26" x2="48" y2="32" stroke="#8C4FFF" stroke-width="2"/>
      <path d="M8 34C10 32 13 32 15 34C17 36 20 36 22 34C24 32 27 32 29 34" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
      <path d="M8 41C10 39 13 39 15 41C17 43 20 43 22 41C24 39 27 39 29 41" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
      <path d="M8 48C10 46 13 46 15 48C17 50 20 50 22 48C24 46 27 46 29 48" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },

  // 21. Amazon Redshift Dense Compute Node
  {
    key: 'aws_redshift_dense_compute_node',
    name: 'Redshift Dense Compute Node',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_redshift_cluster',
    defaultSpecs: { count: 2, nodeType: 'dc2.large' },
    description: 'Nó otimizado para alta computação com SSD de performance ultrarrápida (DC2) no Redshift',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="20" width="22" height="18" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.15"/>
      <text x="12" y="34" font-family="sans-serif" font-size="11" font-weight="bold" fill="#8C4FFF">DC</text>
      <rect x="38" y="8" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="50" y="16" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="40" y="44" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="52" y="34" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <line x1="30" y1="26" x2="38" y2="14" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="30" y1="28" x2="50" y2="20" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="30" y1="32" x2="52" y2="36" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="30" y1="36" x2="40" y2="46" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="46" y1="14" x2="50" y2="18" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="54" y1="24" x2="56" y2="34" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="48" y1="46" x2="52" y2="40" stroke="#8C4FFF" stroke-width="1.8"/>
    </svg>`
  },

  // 22. Amazon Redshift Dense Storage Node
  {
    key: 'aws_redshift_dense_storage_node',
    name: 'Redshift Dense Storage Node',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_redshift_cluster',
    defaultSpecs: { count: 2, nodeType: 'ds2.xlarge' },
    description: 'Nó Redshift focado em grande capacidade de armazenamento magnético para data warehouses massivos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="20" width="22" height="18" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.15"/>
      <text x="12" y="34" font-family="sans-serif" font-size="11" font-weight="bold" fill="#8C4FFF">DS</text>
      <rect x="38" y="8" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="50" y="16" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="40" y="44" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="52" y="34" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <line x1="30" y1="26" x2="38" y2="14" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="30" y1="28" x2="50" y2="20" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="30" y1="32" x2="52" y2="36" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="30" y1="36" x2="40" y2="46" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="46" y1="14" x2="50" y2="18" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="54" y1="24" x2="56" y2="34" stroke="#8C4FFF" stroke-width="1.8"/>
      <line x1="48" y1="46" x2="52" y2="40" stroke="#8C4FFF" stroke-width="1.8"/>
    </svg>`
  },

  // 23. Amazon Redshift ML
  {
    key: 'aws_redshift_ml',
    name: 'Redshift ML',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_redshift_cluster',
    defaultSpecs: { count: 1 },
    description: 'Criação, treinamento e inferência de modelos de Machine Learning usando comandos SQL familiares no Redshift',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="44" cy="18" rx="11" ry="4.5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M33 18V44C33 46.5 38 48.5 44 48.5C50 48.5 55 46.5 55 44V18" stroke="#8C4FFF" stroke-width="2.5"/>
      <circle cx="38" cy="27" r="2" fill="#8C4FFF"/>
      <circle cx="48" cy="33" r="2" fill="#8C4FFF"/>
      <line x1="38" y1="27" x2="48" y2="33" stroke="#8C4FFF" stroke-width="1.8"/>
      <circle cx="18" cy="40" r="8" stroke="#8C4FFF" stroke-width="2" fill="white"/>
      <line x1="18" y1="32" x2="18" y2="48" stroke="#8C4FFF" stroke-width="2"/>
      <path d="M12 36C10 38 10 42 12 44" stroke="#8C4FFF" stroke-width="2"/>
      <path d="M24 36C26 38 26 42 24 44" stroke="#8C4FFF" stroke-width="2"/>
      <line x1="26" y1="38" x2="36" y2="32" stroke="#8C4FFF" stroke-width="2"/>
    </svg>`
  },

  // 24. Amazon Redshift Query Editor v2.0
  {
    key: 'aws_redshift_query_editor_v2',
    name: 'Redshift Query Editor v2.0',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_redshiftserverless_workgroup',
    defaultSpecs: { count: 1 },
    description: 'Interface web avançada para edição, visualização e compartilhamento de consultas SQL no Redshift',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="26" cy="18" rx="12" ry="5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M14 18V44C14 46.8 19.4 49 26 49C32.6 49 38 46.8 38 44V18" stroke="#8C4FFF" stroke-width="2.5"/>
      <circle cx="42" cy="38" r="10" stroke="#8C4FFF" stroke-width="2.5" fill="white"/>
      <line x1="49" y1="45" x2="56" y2="52" stroke="#8C4FFF" stroke-width="3.5" stroke-linecap="round"/>
    </svg>`
  },

  // 25. Amazon Redshift RA3
  {
    key: 'aws_redshift_ra3',
    name: 'Redshift RA3 Node',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_redshift_cluster',
    defaultSpecs: { count: 2, nodeType: 'ra3.xlplus' },
    description: 'Nó Redshift moderno RA3 com separação independente de computação e armazenamento gerenciado',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="42" rx="14" ry="5.5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M18 42V51C18 54 24.3 56.5 32 56.5C39.7 56.5 46 54 46 51V42" stroke="#8C4FFF" stroke-width="2.5"/>
      <text x="23" y="52" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#8C4FFF">RA3</text>
      <line x1="32" y1="36" x2="32" y2="24" stroke="#8C4FFF" stroke-width="2.5"/>
      <line x1="18" y1="18" x2="32" y2="24" stroke="#8C4FFF" stroke-width="2"/>
      <line x1="32" y1="12" x2="32" y2="24" stroke="#8C4FFF" stroke-width="2"/>
      <line x1="46" y1="18" x2="32" y2="24" stroke="#8C4FFF" stroke-width="2"/>
      <rect x="14" y="14" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="28" y="8" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="42" y="14" width="8" height="8" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
    </svg>`
  },

  // 26. Amazon Redshift Streaming Ingestion
  {
    key: 'aws_redshift_streaming_ingestion',
    name: 'Redshift Streaming Ingestion',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_redshift_cluster',
    defaultSpecs: { count: 1 },
    description: 'Ingestão em streaming de baixa latência a partir do Amazon Kinesis ou Amazon MSK direto no Redshift',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="38" cy="24" rx="11" ry="4.5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M27 24V48C27 50.5 32 52.5 38 52.5C44 52.5 49 50.5 49 48V24" stroke="#8C4FFF" stroke-width="2.5"/>
      <circle cx="24" cy="48" r="2.5" fill="#8C4FFF"/>
      <circle cx="34" cy="43" r="2.5" fill="#8C4FFF"/>
      <line x1="24" y1="48" x2="34" y2="43" stroke="#8C4FFF" stroke-width="2"/>
      <path d="M10 14H14M18 14H38V22" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="44" y1="8" x2="52" y2="8" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="56" cy="8" r="1.5" fill="#8C4FFF"/>
      <circle cx="60" cy="8" r="1.5" fill="#8C4FFF"/>
    </svg>`
  },

  // 27. AWS Data Exchange for APIs
  {
    key: 'aws_data_exchange_for_apis',
    name: 'AWS Data Exchange for APIs',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_dataexchange_data_set',
    defaultSpecs: { count: 1 },
    description: 'Assinatura, consumo e monetização unificada de APIs de terceiros na nuvem AWS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="14" x2="52" y2="14" stroke="#8C4FFF" stroke-width="2.5"/>
      <polygon points="12,14 18,10 18,18" fill="#8C4FFF"/>
      <rect x="20" y="22" width="24" height="20" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <path d="M34 27L28 32L34 37" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="12" y1="50" x2="52" y2="50" stroke="#8C4FFF" stroke-width="2.5"/>
      <polygon points="52,50 46,46 46,54" fill="#8C4FFF"/>
    </svg>`
  },

  // 28. AWS Glue AWS Glue for Ray
  {
    key: 'aws_glue_for_ray',
    name: 'AWS Glue for Ray',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_glue_job',
    defaultSpecs: { count: 1, glueVersion: '4.0', workerType: 'Ray' },
    description: 'Execução de workloads analíticos e tarefas de machine learning escaláveis em Python usando Ray no AWS Glue',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="30" r="11" stroke="#8C4FFF" stroke-width="2" fill="white"/>
      <circle cx="26" cy="30" r="5" stroke="#8C4FFF" stroke-width="1.8"/>
      <path d="M26 17V20M26 40V43M13 30H16M36 30H39M17 21L19 23M33 37L35 39M17 39L19 37M33 23L35 21" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
      <path d="M24 30H28M26 28V32" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
      <line x1="36" y1="36" x2="46" y2="44" stroke="#8C4FFF" stroke-width="2"/>
      <circle cx="48" cy="46" r="3.5" stroke="#8C4FFF" stroke-width="2" fill="white"/>
      <line x1="37" y1="26" x2="48" y2="24" stroke="#8C4FFF" stroke-width="2"/>
      <circle cx="51" cy="24" r="3" stroke="#8C4FFF" stroke-width="2" fill="white"/>
      <line x1="26" y1="41" x2="30" y2="51" stroke="#8C4FFF" stroke-width="2"/>
      <circle cx="31" cy="53" r="3" stroke="#8C4FFF" stroke-width="2" fill="white"/>
    </svg>`
  },

  // 29. AWS Glue Crawler
  {
    key: 'aws_glue_crawler',
    name: 'AWS Glue Crawler',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_glue_crawler',
    defaultSpecs: { count: 1 },
    description: 'Varredura automática e inferência de esquemas de dados em buckets S3 e bancos para o Glue Data Catalog',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="10" width="34" height="28" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <line x1="8" y1="18" x2="42" y2="18" stroke="#8C4FFF" stroke-width="2"/>
      <line x1="8" y1="26" x2="42" y2="26" stroke="#8C4FFF" stroke-width="2"/>
      <line x1="20" y1="10" x2="20" y2="38" stroke="#8C4FFF" stroke-width="2"/>
      <circle cx="44" cy="42" r="7" stroke="#8C4FFF" stroke-width="2" fill="white"/>
      <path d="M44 35V49M37 42H51" stroke="#8C4FFF" stroke-width="1.8"/>
      <path d="M38 36L34 32M50 36L54 32" stroke="#8C4FFF" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M37 42L32 42M51 42L56 42" stroke="#8C4FFF" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M38 48L34 52M50 48L54 52" stroke="#8C4FFF" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`
  },

  // 30. AWS Glue Data Catalog
  {
    key: 'aws_glue_data_catalog',
    name: 'AWS Glue Data Catalog',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_glue_catalog_database',
    defaultSpecs: { count: 1 },
    description: 'Repositório centralizado de metadados, esquemas e tabelas de governança para data lakes AWS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 10H10V54H12" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="18" y="10" width="36" height="44" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <line x1="24" y1="16" x2="48" y2="16" stroke="#8C4FFF" stroke-width="2"/>
      <line x1="24" y1="20" x2="48" y2="20" stroke="#8C4FFF" stroke-width="2"/>
      <polygon points="26,26 46,26 38,36 38,44 34,44 34,36" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <line x1="24" y1="48" x2="48" y2="48" stroke="#8C4FFF" stroke-width="2"/>
      <line x1="24" y1="51" x2="48" y2="51" stroke="#8C4FFF" stroke-width="2"/>
    </svg>`
  },

  // 31. AWS Glue Data Quality
  {
    key: 'aws_glue_data_quality',
    name: 'AWS Glue Data Quality',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_glue_data_quality_ruleset',
    defaultSpecs: { count: 1 },
    description: 'Medição, monitoramento e regras automatizadas de qualidade e conformidade de dados no Glue',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="26" cy="18" rx="12" ry="5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M14 18V44C14 46.8 19.4 49 26 49C32.6 49 38 46.8 38 44V18" stroke="#8C4FFF" stroke-width="2.5"/>
      <circle cx="42" cy="38" r="10" stroke="#8C4FFF" stroke-width="2.5" fill="white"/>
      <path d="M38 38L41 41L47 35" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="49" y1="45" x2="56" y2="52" stroke="#8C4FFF" stroke-width="3.5" stroke-linecap="round"/>
    </svg>`
  },

  // 32. AWS Lake Formation Data Lake
  {
    key: 'aws_lake_formation_data_lake',
    name: 'Lake Formation Data Lake',
    provider: 'aws',
    category: 'analytics',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_lakeformation_resource',
    defaultSpecs: { count: 1 },
    description: 'Criação, governança de acesso em nível de coluna/linha e proteção centralizada de Data Lakes no S3',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="38" cy="18" rx="12" ry="5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M26 18V46C26 48.8 31.4 51 38 51C44.6 51 50 48.8 50 46V18" stroke="#8C4FFF" stroke-width="2.5"/>
      <path d="M8 32C10 30 13 30 15 32C17 34 20 34 22 32C24 30 27 30 29 32" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
      <path d="M8 39C10 37 13 37 15 39C17 41 20 41 22 39C24 37 27 37 29 39" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
      <path d="M8 46C10 44 13 44 15 46C17 48 20 48 22 46C24 44 27 44 29 46" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  }
];
