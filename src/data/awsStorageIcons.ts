import { CloudIconDefinition } from '../types';

export const AWS_STORAGE_ICONS: CloudIconDefinition[] = [
  // =========================================================================
  // GROUP 1: AMAZON S3 - CORE & ACCESS (12 icons)
  // =========================================================================
  // 1. Amazon S3 Bucket
  {
    key: 'aws_s3_bucket',
    name: 'S3 Bucket',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3_bucket',
    defaultSpecs: { storageGb: 500, transferGb: 100, region: 'us-east-1' },
    description: 'Bucket de armazenamento de objetos escalável, altamente durável e seguro na nuvem',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 20C14 15 22 12 32 12C42 12 50 15 50 20M14 20V44C14 49 22 52 32 52C42 52 50 49 50 44V20M14 20C14 25 22 28 32 28C42 28 50 25 50 20" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.12"/>
      <path d="M14 32C14 37 22 40 32 40C42 40 50 37 50 32" stroke="#3F8624" stroke-width="2.5"/>
    </svg>`,
  },

  // 2. Amazon S3 Bucket with Objects
  {
    key: 'aws_s3_bucket_with_objects',
    name: 'S3 Bucket com Objetos',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3_bucket',
    defaultSpecs: { storageGb: 1500, count: 1, region: 'us-east-1' },
    description: 'Bucket S3 populado com arquivos, mídias estruturadas ou datasets de data lake',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C12 17 21 14 32 14C43 14 52 17 52 22M12 22V46C12 51 21 54 32 54C43 54 52 51 52 46V22" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.1"/>
      <rect x="23" y="24" width="8" height="10" rx="1.5" stroke="#3F8624" stroke-width="2" fill="white"/>
      <rect x="33" y="27" width="8" height="10" rx="1.5" stroke="#3F8624" stroke-width="2" fill="white"/>
      <rect x="28" y="37" width="8" height="10" rx="1.5" stroke="#3F8624" stroke-width="2" fill="white"/>
    </svg>`,
  },

  // 3. Amazon S3 Object
  {
    key: 'aws_s3_object',
    name: 'S3 Objeto Individual',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3_object',
    defaultSpecs: { count: 1, storageGb: 10, region: 'us-east-1' },
    description: 'Objeto atômico no S3 contendo dados brutos, chave de identificação e metadados',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 10H38L48 20V54H18V10Z" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.12"/>
      <path d="M38 10V20H48" stroke="#3F8624" stroke-width="3"/>
      <line x1="24" y1="28" x2="40" y2="28" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="24" y1="36" x2="42" y2="36" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="24" y1="44" x2="36" y2="44" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },

  // 4. Amazon S3 Access Points
  {
    key: 'aws_s3_access_points',
    name: 'S3 Access Point',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3_access_point',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Pontos de acesso com nomes de host exclusivos e políticas dedicadas para compartilhamento do bucket',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="22" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.1"/>
      <circle cx="32" cy="32" r="7" stroke="#3F8624" stroke-width="3" fill="white"/>
      <line x1="32" y1="10" x2="32" y2="25" stroke="#3F8624" stroke-width="3" stroke-linecap="round"/>
      <line x1="32" y1="39" x2="32" y2="54" stroke="#3F8624" stroke-width="3" stroke-linecap="round"/>
      <line x1="10" y1="32" x2="25" y2="32" stroke="#3F8624" stroke-width="3" stroke-linecap="round"/>
      <line x1="39" y1="32" x2="54" y2="32" stroke="#3F8624" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },

  // 5. Amazon S3 Multi-Region Access Points
  {
    key: 'aws_s3_multi_region_access_points',
    name: 'S3 Multi-Region Access Point',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3control_multi_region_access_point',
    defaultSpecs: { count: 1, region: 'global' },
    description: 'Endpoint global único roteando requisições ao bucket S3 mais próximo via AWS Global Accelerator',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="22" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.12"/>
      <ellipse cx="32" cy="32" rx="10" ry="22" stroke="#3F8624" stroke-width="2.5"/>
      <line x1="10" y1="32" x2="54" y2="32" stroke="#3F8624" stroke-width="2.5"/>
      <circle cx="32" cy="20" r="3" fill="#3F8624"/>
      <circle cx="32" cy="44" r="3" fill="#3F8624"/>
    </svg>`,
  },

  // 6. Amazon S3 Object Lambda
  {
    key: 'aws_s3_object_lambda',
    name: 'S3 Object Lambda',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3control_object_lambda_access_point',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Processamento e transformação dinâmica de dados em tempo real quando lidos do S3 via código Lambda',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="12" width="48" height="40" rx="6" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.1"/>
      <path d="M22 42L30 18H36L44 42" stroke="#3F8624" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="25" y1="34" x2="41" y2="34" stroke="#3F8624" stroke-width="3"/>
    </svg>`,
  },

  // 7. Amazon S3 Object Lambda Access Points
  {
    key: 'aws_s3_object_lambda_access_points',
    name: 'S3 Object Lambda Access Point',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3control_object_lambda_access_point_policy',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Ponto de extremidade dedicado que canaliza consultas GET S3 diretamente para funções Lambda',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="23" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.1"/>
      <path d="M26 39L33 22H37L44 39" stroke="#3F8624" stroke-width="3" stroke-linecap="round"/>
      <circle cx="16" cy="32" r="3" fill="#3F8624"/>
      <circle cx="48" cy="32" r="3" fill="#3F8624"/>
    </svg>`,
  },

  // 8. Amazon S3 Batch Operations
  {
    key: 'aws_s3_batch_operations',
    name: 'S3 Batch Operations',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3control_bucket_lifecycle_configuration',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Execução automatizada em lote de bilhões de objetos no S3 (cópia, criptografia, tag e retenção)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="18" height="18" rx="3" stroke="#3F8624" stroke-width="2.5" fill="#3F8624" fill-opacity="0.15"/>
      <rect x="36" y="10" width="18" height="18" rx="3" stroke="#3F8624" stroke-width="2.5" fill="#3F8624" fill-opacity="0.15"/>
      <rect x="10" y="36" width="18" height="18" rx="3" stroke="#3F8624" stroke-width="2.5" fill="#3F8624" fill-opacity="0.15"/>
      <rect x="36" y="36" width="18" height="18" rx="3" stroke="#3F8624" stroke-width="2.5" fill="#3F8624" fill-opacity="0.15"/>
      <path d="M28 19H36M19 28V36M45 28V36M28 45H36" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },

  // 9. Amazon S3 Storage Lens
  {
    key: 'aws_s3_storage_lens',
    name: 'S3 Storage Lens',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3control_storage_lens_configuration',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Análise de métricas de armazenamento em toda a organização com recomendações de otimização de custo',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="16" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.15"/>
      <line x1="40" y1="40" x2="54" y2="54" stroke="#3F8624" stroke-width="4" stroke-linecap="round"/>
      <path d="M22 30L26 24L31 28L36 20" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },

  // 10. Amazon S3 Replication
  {
    key: 'aws_s3_replication',
    name: 'S3 Replicação Automática',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3_bucket_replication_configuration',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Replicação elástica e contínua de objetos S3 entre regiões (CRR) ou na mesma região (SRR)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="22" rx="10" ry="6" stroke="#3F8624" stroke-width="2.5" fill="#3F8624" fill-opacity="0.15"/>
      <path d="M10 22V36C10 39.3 14.5 42 20 42C25.5 42 30 39.3 30 36V22" stroke="#3F8624" stroke-width="2.5"/>
      <ellipse cx="44" cy="22" rx="10" ry="6" stroke="#3F8624" stroke-width="2.5" fill="#3F8624" fill-opacity="0.15"/>
      <path d="M34 22V36C34 39.3 38.5 42 44 42C49.5 42 54 39.3 54 36V22" stroke="#3F8624" stroke-width="2.5"/>
      <path d="M26 48C30 52 34 52 38 48" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M37 47L40 50L36 53" stroke="#3F8624" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },

  // 11. Amazon S3 Storage Class Analysis
  {
    key: 'aws_s3_storage_class_analysis',
    name: 'S3 Storage Class Analysis',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3_bucket_analytics_configuration',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Monitoramento de padrões de acesso aos dados para transição econômica de classes no S3',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="10" width="48" height="44" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.1"/>
      <rect x="15" y="34" width="6" height="12" fill="#3F8624"/>
      <rect x="25" y="26" width="6" height="20" fill="#3F8624"/>
      <rect x="35" y="20" width="6" height="26" fill="#3F8624"/>
      <rect x="45" y="30" width="6" height="16" fill="#3F8624"/>
    </svg>`,
  },

  // 12. Amazon S3 on Outposts Bucket
  {
    key: 'aws_s3_outposts_bucket',
    name: 'S3 on Outposts',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3control_bucket',
    defaultSpecs: { storageGb: 1000, region: 'us-east-1' },
    description: 'Armazenamento de objetos S3 local em infraestrutura física on-premises AWS Outposts',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="36" width="44" height="20" rx="3" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.15"/>
      <ellipse cx="32" cy="18" rx="14" ry="7" stroke="#3F8624" stroke-width="2.5"/>
      <path d="M18 18V28C18 31.8 24.3 35 32 35C39.7 35 46 31.8 46 28V18" stroke="#3F8624" stroke-width="2.5"/>
      <circle cx="18" cy="46" r="2.5" fill="#3F8624"/>
      <circle cx="26" cy="46" r="2.5" fill="#3F8624"/>
    </svg>`,
  },

  // =========================================================================
  // GROUP 2: AMAZON S3 STORAGE CLASSES (8 icons)
  // =========================================================================
  // 13. Amazon S3 Standard
  {
    key: 'aws_s3_standard',
    name: 'S3 Standard',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3_bucket',
    defaultSpecs: { storageGb: 500, region: 'us-east-1' },
    description: 'Armazenamento de objetos de uso geral para dados acessados com frequência com alta disponibilidade',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="18" rx="18" ry="8" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.15"/>
      <path d="M14 18V46C14 50.4 22 54 32 54C42 54 50 50.4 50 46V18" stroke="#3F8624" stroke-width="3"/>
      <path d="M24 33H40M24 39H34" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },

  // 14. Amazon S3 Intelligent-Tiering
  {
    key: 'aws_s3_intelligent_tiering',
    name: 'S3 Intelligent-Tiering',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3_bucket_intelligent_tiering_configuration',
    defaultSpecs: { storageGb: 2000, region: 'us-east-1' },
    description: 'Otimização automática de custos movendo dados entre camadas de acesso frequente e infrequente',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="16" rx="16" ry="6" stroke="#3F8624" stroke-width="2.5"/>
      <path d="M16 16V44C16 47.3 23.2 50 32 50C40.8 50 48 47.3 48 44V16" stroke="#3F8624" stroke-width="2.5"/>
      <path d="M26 28L32 22L38 28" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M38 36L32 42L26 36" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },

  // 15. Amazon S3 Standard-IA
  {
    key: 'aws_s3_standard_ia',
    name: 'S3 Standard-IA (Infrequent Access)',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3_bucket_lifecycle_configuration',
    defaultSpecs: { storageGb: 1000, region: 'us-east-1' },
    description: 'Armazenamento econômico para dados que necessitam de recuperação imediata em milissegundos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 18C14 14 22 11 32 11C42 11 50 14 50 18M14 18V44C14 48 22 51 32 51C42 51 50 48 50 44V18" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.1"/>
      <text x="32" y="37" font-family="sans-serif" font-size="13" font-weight="900" fill="#3F8624" text-anchor="middle">IA</text>
    </svg>`,
  },

  // 16. Amazon S3 One Zone-IA
  {
    key: 'aws_s3_one_zone_ia',
    name: 'S3 One Zone-IA',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3_bucket_lifecycle_configuration',
    defaultSpecs: { storageGb: 1000, region: 'us-east-1' },
    description: 'Classe de acesso infrequente de baixo custo armazenada em uma única Zona de Disponibilidade (AZ)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="23" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.1"/>
      <text x="32" y="38" font-family="sans-serif" font-size="16" font-weight="900" fill="#3F8624" text-anchor="middle">1-Z</text>
    </svg>`,
  },

  // 17. Amazon S3 Glacier Instant Retrieval
  {
    key: 'aws_s3_glacier_instant_retrieval',
    name: 'S3 Glacier Instant Retrieval',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3_bucket_lifecycle_configuration',
    defaultSpecs: { storageGb: 5000, region: 'us-east-1' },
    description: 'Arquivo de longo prazo com o menor custo de armazenamento e recuperação instantânea em milissegundos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 48L32 12L52 48H12Z" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.15"/>
      <path d="M32 26V36M32 40L36 34" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },

  // 18. Amazon S3 Glacier Flexible Retrieval
  {
    key: 'aws_s3_glacier_flexible_retrieval',
    name: 'S3 Glacier Flexible Retrieval',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3_bucket_lifecycle_configuration',
    defaultSpecs: { storageGb: 10000, region: 'us-east-1' },
    description: 'Armazenamento de arquivo seguro para dados frios acessados de 1 a 2 vezes por ano (retirada 1-5h)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 50L24 20L36 34L44 24L56 50H8Z" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.15"/>
      <line x1="16" y1="50" x2="48" y2="50" stroke="#3F8624" stroke-width="2"/>
    </svg>`,
  },

  // 19. Amazon S3 Glacier Deep Archive
  {
    key: 'aws_s3_glacier_deep_archive',
    name: 'S3 Glacier Deep Archive',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3_bucket_lifecycle_configuration',
    defaultSpecs: { storageGb: 50000, region: 'us-east-1' },
    description: 'Classe de menor custo em nuvem para retenção legal e conformidade normativa regulatória (7-10 anos)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="44" height="44" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.12"/>
      <line x1="10" y1="24" x2="54" y2="24" stroke="#3F8624" stroke-width="2.5"/>
      <line x1="10" y1="38" x2="54" y2="38" stroke="#3F8624" stroke-width="2.5"/>
      <circle cx="32" cy="17" r="2.5" fill="#3F8624"/>
      <circle cx="32" cy="31" r="2.5" fill="#3F8624"/>
      <circle cx="32" cy="45" r="2.5" fill="#3F8624"/>
    </svg>`,
  },

  // 20. Amazon S3 Express One Zone
  {
    key: 'aws_s3_express_one_zone',
    name: 'S3 Express One Zone',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3_directory_bucket',
    defaultSpecs: { storageGb: 500, region: 'us-east-1' },
    description: 'Armazenamento S3 de altíssimo desempenho com latência consistente de milissegundos de um dígito',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="12" width="44" height="40" rx="6" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.1"/>
      <path d="M35 18L23 34H33L27 48L43 30H33L35 18Z" fill="#3F8624"/>
    </svg>`,
  },

  // =========================================================================
  // GROUP 3: S3 GLACIER VAULT & ARCHIVE (4 icons)
  // =========================================================================
  // 21. Amazon S3 Glacier Vault
  {
    key: 'aws_s3_glacier_vault',
    name: 'Glacier Vault',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_glacier_vault',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Cofre seguro gerenciado para arquivamento e custódia imutável de blocos de dados',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="22" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.12"/>
      <circle cx="32" cy="32" r="9" stroke="#3F8624" stroke-width="3"/>
      <line x1="32" y1="14" x2="32" y2="23" stroke="#3F8624" stroke-width="3" stroke-linecap="round"/>
      <line x1="32" y1="41" x2="32" y2="50" stroke="#3F8624" stroke-width="3" stroke-linecap="round"/>
      <line x1="14" y1="32" x2="23" y2="32" stroke="#3F8624" stroke-width="3" stroke-linecap="round"/>
      <line x1="41" y1="32" x2="50" y2="32" stroke="#3F8624" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },

  // 22. Amazon S3 Glacier Archive
  {
    key: 'aws_s3_glacier_archive',
    name: 'Glacier Archive (Arquivo Bruto)',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_glacier_vault_lock',
    defaultSpecs: { count: 1, storageGb: 1000, region: 'us-east-1' },
    description: 'Pacote de arquivo comprimido armazenado no cofre Glacier com hash de integridade SHA-256',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="14" width="40" height="36" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.15"/>
      <path d="M22 24L32 14L42 24" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="32" cy="34" r="5" fill="#3F8624"/>
    </svg>`,
  },

  // 23. Amazon S3 Glacier Vault Lock
  {
    key: 'aws_s3_glacier_vault_lock',
    name: 'Glacier Vault Lock (WORM)',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_glacier_vault_lock',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Política imutável WORM (Write Once, Read Many) protegendo arquivos contra deleção prematura',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="24" width="36" height="30" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.15"/>
      <path d="M22 24V16C22 10.5 26.5 6 32 6C37.5 6 42 10.5 42 16V24" stroke="#3F8624" stroke-width="3"/>
      <circle cx="32" cy="37" r="3.5" fill="#3F8624"/>
      <line x1="32" y1="40" x2="32" y2="46" stroke="#3F8624" stroke-width="2.5"/>
    </svg>`,
  },

  // 24. Amazon S3 Glacier Provisioned Capacity
  {
    key: 'aws_s3_glacier_provisioned_capacity',
    name: 'Glacier Provisioned Capacity',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_glacier_vault',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Capacidade provisionada garantindo throughput de resgate acelerado mesmo em horários de pico',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="16" width="44" height="32" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.1"/>
      <line x1="10" y1="26" x2="54" y2="26" stroke="#3F8624" stroke-width="2"/>
      <path d="M20 37H44M20 42H36" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },

  // =========================================================================
  // GROUP 4: S3 SECURITY & CONFIGURATION POLICIES (5 icons)
  // =========================================================================
  // 25. Amazon S3 Bucket Policy
  {
    key: 'aws_s3_bucket_policy',
    name: 'S3 Bucket Policy (IAM)',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3_bucket_policy',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Política em formato JSON definindo permissões granulares de acesso a recursos e ações no bucket',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 14L32 6L52 14V32C52 46 32 56 32 56C32 56 12 46 12 32V14Z" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.12"/>
      <ellipse cx="32" cy="27" rx="8" ry="4" stroke="#3F8624" stroke-width="2"/>
      <path d="M24 27V37C24 39.2 27.6 41 32 41C36.4 41 40 39.2 40 37V27" stroke="#3F8624" stroke-width="2"/>
    </svg>`,
  },

  // 26. Amazon S3 CORS Configuration
  {
    key: 'aws_s3_cors_configuration',
    name: 'S3 CORS Configuration',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3_bucket_cors_configuration',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Cross-Origin Resource Sharing permitindo requisições web externas diretas aos objetos S3',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="22" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.1"/>
      <path d="M18 24H42M42 24L36 18M42 24L36 30" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M46 40H22M22 40L28 34M22 40L28 46" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },

  // 27. Amazon S3 Versioning
  {
    key: 'aws_s3_bucket_versioning',
    name: 'S3 Versionamento de Objetos',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3_bucket_versioning',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Manutenção de múltiplas versões históricas para recuperação de exclusões acidentais',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="10" width="30" height="34" rx="3" stroke="#3F8624" stroke-width="2" fill="none"/>
      <rect x="14" y="16" width="30" height="34" rx="3" stroke="#3F8624" stroke-width="2" fill="none"/>
      <rect x="8" y="22" width="30" height="34" rx="3" stroke="#3F8624" stroke-width="2.5" fill="#3F8624" fill-opacity="0.15"/>
      <circle cx="23" cy="39" r="3" fill="#3F8624"/>
    </svg>`,
  },

  // 28. Amazon S3 Object Lock
  {
    key: 'aws_s3_object_lock',
    name: 'S3 Object Lock',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3_bucket_object_lock_configuration',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Proteção WORM contra sobrescrita ou exclusão por um período de retenção fixo ou legal hold',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="18" rx="14" ry="6" stroke="#3F8624" stroke-width="2.5"/>
      <path d="M18 18V38C18 41 24 43 32 43C40 43 46 41 46 38V18" stroke="#3F8624" stroke-width="2.5"/>
      <rect x="34" y="32" width="18" height="18" rx="3" fill="#3F8624"/>
      <path d="M38 32V28C38 25.5 40 23.5 43 23.5C46 23.5 48 25.5 48 28V32" stroke="#3F8624" stroke-width="2.5"/>
    </svg>`,
  },

  // 29. Amazon S3 Inventory
  {
    key: 'aws_s3_inventory',
    name: 'S3 Inventário Programado',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_s3_bucket_inventory',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Relatório diário/semanal em CSV/ORC/Parquet de todos os objetos e status de criptografia do bucket',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="10" width="40" height="44" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.1"/>
      <line x1="20" y1="20" x2="44" y2="20" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="20" y1="28" x2="44" y2="28" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="20" y1="36" x2="36" y2="36" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M38 44L41 47L48 40" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },

  // =========================================================================
  // GROUP 5: AMAZON EFS (ELASTIC FILE SYSTEM) (9 icons)
  // =========================================================================
  // 30. Amazon EFS File System
  {
    key: 'aws_efs_file_system',
    name: 'EFS File System',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_efs_file_system',
    defaultSpecs: { storageGb: 500, count: 1, region: 'us-east-1' },
    description: 'Sistema de arquivos elástico e compartilhado via protocolo NFSv4 para milhares de instâncias EC2',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="12" width="44" height="40" rx="5" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.12"/>
      <line x1="10" y1="25" x2="54" y2="25" stroke="#3F8624" stroke-width="2.5"/>
      <line x1="10" y1="38" x2="54" y2="38" stroke="#3F8624" stroke-width="2.5"/>
      <circle cx="18" cy="18" r="2" fill="#3F8624"/>
      <circle cx="18" cy="31" r="2" fill="#3F8624"/>
      <circle cx="18" cy="44" r="2" fill="#3F8624"/>
      <line x1="28" y1="18" x2="46" y2="18" stroke="#3F8624" stroke-width="2"/>
      <line x1="28" y1="31" x2="46" y2="31" stroke="#3F8624" stroke-width="2"/>
      <line x1="28" y1="44" x2="46" y2="44" stroke="#3F8624" stroke-width="2"/>
    </svg>`,
  },

  // 31. Amazon EFS Standard Storage Class
  {
    key: 'aws_efs_standard_storage_class',
    name: 'EFS Standard Storage Class',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_efs_file_system',
    defaultSpecs: { storageGb: 250, region: 'us-east-1' },
    description: 'Camada de armazenamento multizona para dados de arquivos acessados ativamente',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="14" width="40" height="36" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.15"/>
      <path d="M22 26L32 36L42 26" stroke="#3F8624" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },

  // 32. Amazon EFS Infrequent Access Class
  {
    key: 'aws_efs_infrequent_access_class',
    name: 'EFS Infrequent Access (IA)',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_efs_file_system_policy',
    defaultSpecs: { storageGb: 800, region: 'us-east-1' },
    description: 'Camada EFS com redução de até 92% nos custos para arquivos não consultados diariamente',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="12" width="44" height="40" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.1"/>
      <text x="32" y="37" font-family="sans-serif" font-size="14" font-weight="bold" fill="#3F8624" text-anchor="middle">EFS-IA</text>
    </svg>`,
  },

  // 33. Amazon EFS Archive Storage Class
  {
    key: 'aws_efs_archive_class',
    name: 'EFS Archive Storage Class',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_efs_lifecycle_policy',
    defaultSpecs: { storageGb: 3000, region: 'us-east-1' },
    description: 'Camada de arquivamento para dados raramente acessados mantendo acesso NFS contínuo',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="12" width="40" height="40" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.15"/>
      <line x1="12" y1="26" x2="52" y2="26" stroke="#3F8624" stroke-width="2.5"/>
      <circle cx="32" cy="38" r="4" fill="#3F8624"/>
    </svg>`,
  },

  // 34. Amazon EFS One Zone
  {
    key: 'aws_efs_one_zone_storage',
    name: 'EFS One Zone Storage',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_efs_file_system',
    defaultSpecs: { storageGb: 400, region: 'us-east-1' },
    description: 'Sistema de arquivos EFS de baixo custo contido em uma única Zona de Disponibilidade',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="23" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.1"/>
      <path d="M26 44V20L38 28V44" stroke="#3F8624" stroke-width="3" stroke-linejoin="round"/>
    </svg>`,
  },

  // 35. Amazon EFS One Zone-IA
  {
    key: 'aws_efs_one_zone_ia',
    name: 'EFS One Zone-IA',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_efs_file_system',
    defaultSpecs: { storageGb: 600, region: 'us-east-1' },
    description: 'Camada infrequente de custo reduzido combinada com topologia de AZ única',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="14" width="40" height="36" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.1"/>
      <text x="32" y="36" font-family="sans-serif" font-size="12" font-weight="900" fill="#3F8624" text-anchor="middle">1Z-IA</text>
    </svg>`,
  },

  // 36. Amazon EFS Access Point
  {
    key: 'aws_efs_access_point',
    name: 'EFS Access Point',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_efs_access_point',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Ponto de montagem de aplicação seguro com usuário POSIX e diretório raiz forçado',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="22" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.15"/>
      <circle cx="32" cy="32" r="6" fill="#3F8624"/>
      <line x1="32" y1="10" x2="32" y2="22" stroke="#3F8624" stroke-width="3" stroke-linecap="round"/>
      <line x1="32" y1="42" x2="32" y2="54" stroke="#3F8624" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },

  // 37. Amazon EFS Mount Target
  {
    key: 'aws_efs_mount_target',
    name: 'EFS Mount Target (Alvo de Montagem)',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_efs_mount_target',
    defaultSpecs: { count: 3, region: 'us-east-1' },
    description: 'Interface de rede IP na subnet que viabiliza montagem do volume NFS por instâncias locais',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="14" width="48" height="36" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.1"/>
      <circle cx="32" cy="32" r="8" stroke="#3F8624" stroke-width="2.5"/>
      <circle cx="32" cy="32" r="3" fill="#3F8624"/>
    </svg>`,
  },

  // 38. Amazon EFS Replication
  {
    key: 'aws_efs_replication',
    name: 'EFS Replicação Automática',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_efs_replication_configuration',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Sincronização contínua de arquivos para outro sistema EFS na mesma ou outra região',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="16" width="22" height="32" rx="3" stroke="#3F8624" stroke-width="2.5" fill="#3F8624" fill-opacity="0.15"/>
      <rect x="34" y="16" width="22" height="32" rx="3" stroke="#3F8624" stroke-width="2.5" fill="#3F8624" fill-opacity="0.15"/>
      <path d="M22 32H38M34 28L38 32L34 36" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },

  // =========================================================================
  // GROUP 6: AMAZON EBS (ELASTIC BLOCK STORE) (7 icons)
  // =========================================================================
  // 39. Amazon EBS Volume
  {
    key: 'aws_ebs_volume',
    name: 'EBS Volume',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_ebs_volume',
    defaultSpecs: { storageGb: 100, volumeType: 'gp3', region: 'us-east-1' },
    description: 'Volume de armazenamento em bloco persistente acoplado diretamente a instâncias EC2',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="10" width="36" height="44" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.12"/>
      <circle cx="32" cy="28" r="9" stroke="#3F8624" stroke-width="2.5"/>
      <circle cx="32" cy="28" r="3" fill="#3F8624"/>
      <line x1="22" y1="44" x2="42" y2="44" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },

  // 40. Amazon EBS Snapshot
  {
    key: 'aws_ebs_snapshot',
    name: 'EBS Snapshot',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_ebs_snapshot',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Cópia de backup pontual incremental de um volume EBS preservada com segurança no Amazon S3',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 22C14 18.7 22 16 32 16C42 16 50 18.7 50 22V42C50 45.3 42 48 32 48C22 48 14 45.3 14 42V22Z" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.15"/>
      <path d="M26 30L32 36L42 24" stroke="#3F8624" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },

  // 41. Amazon EBS Multiple Volumes
  {
    key: 'aws_ebs_multiple_volumes',
    name: 'EBS Múltiplos Volumes',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_ebs_volume',
    defaultSpecs: { count: 4, storageGb: 200, region: 'us-east-1' },
    description: 'Conjunto de volumes EBS distribuídos ou configurados em matrizes RAID para alto throughput',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="10" width="28" height="34" rx="3" stroke="#3F8624" stroke-width="2" fill="none"/>
      <rect x="14" y="18" width="28" height="34" rx="3" stroke="#3F8624" stroke-width="2.5" fill="#3F8624" fill-opacity="0.15"/>
      <circle cx="28" cy="35" r="5" stroke="#3F8624" stroke-width="2"/>
    </svg>`,
  },

  // 42. Amazon EBS Fast Snapshot Restore
  {
    key: 'aws_ebs_fast_snapshot_restore',
    name: 'EBS Fast Snapshot Restore (FSR)',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_ebs_snapshot_copy',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Restauração imediata com 100% de desempenho e IOPS provisionados sem necessidade de inicialização',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="22" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.1"/>
      <path d="M35 18L24 33H33L29 46L42 30H33L35 18Z" fill="#3F8624"/>
    </svg>`,
  },

  // 43. Amazon EBS gp3 Volume
  {
    key: 'aws_ebs_volume_gp3',
    name: 'EBS Volume gp3 SSD',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_ebs_volume',
    defaultSpecs: { storageGb: 200, volumeType: 'gp3', region: 'us-east-1' },
    description: 'Volume SSD de uso geral de última geração com controle independente de IOPS e throughput',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="14" width="40" height="36" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.15"/>
      <text x="32" y="37" font-family="sans-serif" font-size="13" font-weight="900" fill="#3F8624" text-anchor="middle">GP3</text>
    </svg>`,
  },

  // 44. Amazon EBS io2 Block Express
  {
    key: 'aws_ebs_volume_io2',
    name: 'EBS Volume io2 Block Express',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_ebs_volume',
    defaultSpecs: { storageGb: 500, volumeType: 'io2', region: 'us-east-1' },
    description: 'Armazenamento SAN em nuvem para cargas críticas corporativas com durabilidade de 99,999%',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="14" width="40" height="36" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.15"/>
      <text x="32" y="37" font-family="sans-serif" font-size="13" font-weight="900" fill="#3F8624" text-anchor="middle">IO2</text>
    </svg>`,
  },

  // 45. Amazon EBS Default Encryption
  {
    key: 'aws_ebs_default_encryption',
    name: 'EBS Criptografia Padronizada',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_ebs_encryption_by_default',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Imposição de criptografia AES-256 obrigatória para todos os novos volumes e snapshots criados na conta',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="24" width="32" height="28" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.15"/>
      <path d="M23 24V17C23 12 27 8 32 8C37 8 41 12 41 17V24" stroke="#3F8624" stroke-width="3"/>
      <circle cx="32" cy="38" r="3.5" fill="#3F8624"/>
    </svg>`,
  },

  // =========================================================================
  // GROUP 7: AMAZON FSx MANAGED FILE SYSTEMS (8 icons)
  // =========================================================================
  // 46. Amazon FSx File System
  {
    key: 'aws_fsx_file_system',
    name: 'Amazon FSx File System',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_fsx_lustre_file_system',
    defaultSpecs: { storageGb: 1200, region: 'us-east-1' },
    description: 'Sistemas de arquivos comerciais totalmente gerenciados e otimizados para alta performance em nuvem',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="32,8 54,20 54,44 32,56 10,44 10,20" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.12"/>
      <text x="32" y="38" font-family="sans-serif" font-size="13" font-weight="900" fill="#3F8624" text-anchor="middle">FSx</text>
    </svg>`,
  },

  // 47. Amazon FSx for Lustre
  {
    key: 'aws_fsx_lustre',
    name: 'FSx for Lustre (HPC)',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_fsx_lustre_file_system',
    defaultSpecs: { storageGb: 2400, region: 'us-east-1' },
    description: 'Sistema de arquivos de alta velocidade e baixa latência para HPC, machine learning e renderização',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="14" width="48" height="36" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.1"/>
      <path d="M18 38L28 24L36 34L46 20" stroke="#3F8624" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },

  // 48. Amazon FSx for NetApp ONTAP
  {
    key: 'aws_fsx_netapp_ontap',
    name: 'FSx for NetApp ONTAP',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_fsx_ontap_file_system',
    defaultSpecs: { storageGb: 1024, region: 'us-east-1' },
    description: 'Armazenamento multiprotocolo unificado (NFS, SMB, iSCSI) com recursos nativos do ecossistema ONTAP',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="12" width="44" height="40" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.15"/>
      <text x="32" y="37" font-family="sans-serif" font-size="11" font-weight="900" fill="#3F8624" text-anchor="middle">ONTAP</text>
    </svg>`,
  },

  // 49. Amazon FSx for OpenZFS
  {
    key: 'aws_fsx_openzfs',
    name: 'FSx for OpenZFS',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_fsx_openzfs_file_system',
    defaultSpecs: { storageGb: 1000, region: 'us-east-1' },
    description: 'Armazenamento de arquivos baseado em ZFS com snapshots pontuais imediatos e compressão de dados',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="12" width="44" height="40" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.15"/>
      <text x="32" y="37" font-family="sans-serif" font-size="12" font-weight="900" fill="#3F8624" text-anchor="middle">ZFS</text>
    </svg>`,
  },

  // 50. Amazon FSx for Windows File Server
  {
    key: 'aws_fsx_windows_file_server',
    name: 'FSx for Windows File Server',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_fsx_windows_file_system',
    defaultSpecs: { storageGb: 500, region: 'us-east-1' },
    description: 'Armazenamento nativo Windows totalmente compatível com protocolo SMB, Active Directory e DFS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="12" width="44" height="40" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.12"/>
      <line x1="32" y1="12" x2="32" y2="52" stroke="#3F8624" stroke-width="2.5"/>
      <line x1="10" y1="32" x2="54" y2="32" stroke="#3F8624" stroke-width="2.5"/>
    </svg>`,
  },

  // 51. Amazon FSx ONTAP Volume
  {
    key: 'aws_fsx_ontap_volume',
    name: 'FSx ONTAP Volume',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_fsx_ontap_volume',
    defaultSpecs: { storageGb: 500, region: 'us-east-1' },
    description: 'Volume flexível lógico hospedado em sistema de arquivos FSx NetApp ONTAP',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="16" width="40" height="32" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.1"/>
      <path d="M20 32H44M20 38H36" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },

  // 52. Amazon FSx OpenZFS Volume
  {
    key: 'aws_fsx_openzfs_volume',
    name: 'FSx OpenZFS Volume',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_fsx_openzfs_volume',
    defaultSpecs: { storageGb: 500, region: 'us-east-1' },
    description: 'Volume ZFS isolado com cotas individuais de armazenamento, clonagem e políticas de compressão',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="16" width="36" height="32" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.15"/>
      <line x1="22" y1="24" x2="42" y2="24" stroke="#3F8624" stroke-width="2.5"/>
      <line x1="22" y1="32" x2="34" y2="32" stroke="#3F8624" stroke-width="2.5"/>
    </svg>`,
  },

  // 53. Amazon FSx Backup
  {
    key: 'aws_fsx_backup',
    name: 'FSx Backup Automático',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_fsx_backup',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Ponto de backup consistente armazenado com segurança no S3 para recuperação rápida do FSx',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="22" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.12"/>
      <path d="M22 32L30 40L42 24" stroke="#3F8624" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },

  // =========================================================================
  // GROUP 8: AWS BACKUP (10 icons)
  // =========================================================================
  // 54. AWS Backup Plan
  {
    key: 'aws_backup_plan',
    name: 'AWS Backup Plan',
    provider: 'aws',
    category: 'storage',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_backup_plan',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Plano centralizado de proteção com agendamento cron, retenção em camadas e ciclo de vida automatizado',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="10" width="40" height="44" rx="5" stroke="#C925D1" stroke-width="3" fill="#C925D1" fill-opacity="0.12"/>
      <path d="M22 22L28 28L42 16" stroke="#C925D1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="20" y1="36" x2="44" y2="36" stroke="#C925D1" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="20" y1="44" x2="36" y2="44" stroke="#C925D1" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },

  // 55. AWS Backup Vault
  {
    key: 'aws_backup_vault',
    name: 'AWS Backup Vault',
    provider: 'aws',
    category: 'storage',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_backup_vault',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Cofre criptografado com chave KMS para armazenamento unificado de pontos de recuperação',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="22" stroke="#C925D1" stroke-width="3" fill="#C925D1" fill-opacity="0.12"/>
      <circle cx="32" cy="32" r="8" stroke="#C925D1" stroke-width="2.5"/>
      <path d="M32 10V18M32 46V54M10 32H18M46 32H54" stroke="#C925D1" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },

  // 56. AWS Backup Vault Lock
  {
    key: 'aws_backup_vault_lock',
    name: 'AWS Backup Vault Lock',
    provider: 'aws',
    category: 'storage',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_backup_vault_lock_configuration',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Imutabilidade WORM para backups contra exclusões inadvertidas, ataques ransomware ou agentes maliciosos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="24" width="32" height="28" rx="4" stroke="#C925D1" stroke-width="3" fill="#C925D1" fill-opacity="0.15"/>
      <path d="M23 24V16C23 11 27 7 32 7C37 7 41 11 41 16V24" stroke="#C925D1" stroke-width="3"/>
      <circle cx="32" cy="38" r="3.5" fill="#C925D1"/>
    </svg>`,
  },

  // 57. AWS Backup Recovery Point
  {
    key: 'aws_backup_recovery_point',
    name: 'AWS Backup Recovery Point',
    provider: 'aws',
    category: 'storage',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_backup_selection',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Ponto de restauração específico contendo cópia íntegra e versionada de um recurso AWS protegido',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="22" stroke="#C925D1" stroke-width="3" fill="#C925D1" fill-opacity="0.1"/>
      <polyline points="32,20 32,32 40,36" stroke="#C925D1" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },

  // 58. AWS Backup Audit Manager
  {
    key: 'aws_backup_audit_manager',
    name: 'AWS Backup Audit Manager',
    provider: 'aws',
    category: 'storage',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_backup_framework',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Auditoria contínua e emissão de relatórios de conformidade automatizada de proteção de dados',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="22" stroke="#C925D1" stroke-width="3" fill="#C925D1" fill-opacity="0.12"/>
      <path d="M22 33L28 39L42 25" stroke="#C925D1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="32" cy="32" r="14" stroke="#C925D1" stroke-width="1.5" stroke-dasharray="3 3"/>
    </svg>`,
  },

  // 59. AWS Backup Legal Hold
  {
    key: 'aws_backup_legal_hold',
    name: 'AWS Backup Legal Hold',
    provider: 'aws',
    category: 'storage',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_backup_report_plan',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Retenção jurídica obrigatória bloqueando expiração de backups até conclusão de litígios',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 20L32 10L50 20V32C50 45 32 54 32 54C32 54 14 45 14 32V20Z" stroke="#C925D1" stroke-width="3" fill="#C925D1" fill-opacity="0.15"/>
      <line x1="25" y1="30" x2="39" y2="30" stroke="#C925D1" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="32" y1="24" x2="32" y2="38" stroke="#C925D1" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },

  // 60. AWS Backup Restore Testing
  {
    key: 'aws_backup_restore_testing',
    name: 'AWS Backup Restore Testing',
    provider: 'aws',
    category: 'storage',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_backup_plan',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Validação e simulação periódica automatizada de planos de restauração de desastres',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="12" width="40" height="40" rx="6" stroke="#C925D1" stroke-width="3" fill="#C925D1" fill-opacity="0.1"/>
      <path d="M22 32A10 10 0 1 1 32 42" stroke="#C925D1" stroke-width="3" stroke-linecap="round"/>
      <path d="M22 26V32H28" stroke="#C925D1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },

  // 61. AWS Backup Gateway
  {
    key: 'aws_backup_gateway',
    name: 'AWS Backup Gateway',
    provider: 'aws',
    category: 'storage',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_backup_gateway',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Software appliance conectando máquinas virtuais VMware on-premises diretamente ao AWS Backup',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="18" width="48" height="28" rx="4" stroke="#C925D1" stroke-width="3" fill="#C925D1" fill-opacity="0.12"/>
      <circle cx="18" cy="32" r="3" fill="#C925D1"/>
      <circle cx="28" cy="32" r="3" fill="#C925D1"/>
      <path d="M38 32H48" stroke="#C925D1" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },

  // 62. AWS Backup Report Plan
  {
    key: 'aws_backup_report_plan',
    name: 'AWS Backup Report Plan',
    provider: 'aws',
    category: 'storage',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_backup_report_plan',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Exportação periódica de relatórios detalhados de jobs de backup, cópias e restaurações para o S3',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="8" width="40" height="48" rx="4" stroke="#C925D1" stroke-width="3" fill="#C925D1" fill-opacity="0.1"/>
      <line x1="20" y1="18" x2="44" y2="18" stroke="#C925D1" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="20" y1="26" x2="44" y2="26" stroke="#C925D1" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="20" y1="34" x2="34" y2="34" stroke="#C925D1" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },

  // 63. AWS Backup Selection
  {
    key: 'aws_backup_selection',
    name: 'AWS Backup Selection',
    provider: 'aws',
    category: 'storage',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_backup_selection',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Atribuição de recursos AWS protegidos por tags, IDs ou tipos ao respectivo Backup Plan',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="44" height="44" rx="6" stroke="#C925D1" stroke-width="3" fill="#C925D1" fill-opacity="0.1"/>
      <circle cx="24" cy="24" r="5" stroke="#C925D1" stroke-width="2.5"/>
      <circle cx="40" cy="40" r="5" stroke="#C925D1" stroke-width="2.5"/>
      <line x1="28" y1="28" x2="36" y2="36" stroke="#C925D1" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },

  // =========================================================================
  // GROUP 9: AWS STORAGE GATEWAY (8 icons)
  // =========================================================================
  // 64. AWS Storage Gateway File Gateway
  {
    key: 'aws_storagegateway_file_gateway',
    name: 'Storage Gateway File Gateway',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_storagegateway_gateway',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Appliance híbrido conectando compartilhamentos de arquivos NFS/SMB locais diretamente ao S3',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="16" width="44" height="32" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.12"/>
      <path d="M18 32H46M32 22V42" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },

  // 65. AWS Storage Gateway Volume Gateway
  {
    key: 'aws_storagegateway_volume_gateway',
    name: 'Storage Gateway Volume Gateway',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_storagegateway_gateway',
    defaultSpecs: { storageGb: 1000, region: 'us-east-1' },
    description: 'Volumes de bloco iSCSI para servidores locais com replicação assíncrona para o Amazon S3',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="14" width="44" height="36" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.12"/>
      <circle cx="22" cy="32" r="5" stroke="#3F8624" stroke-width="2"/>
      <circle cx="42" cy="32" r="5" stroke="#3F8624" stroke-width="2"/>
    </svg>`,
  },

  // 66. AWS Storage Gateway Tape Gateway
  {
    key: 'aws_storagegateway_tape_gateway',
    name: 'Storage Gateway Tape Gateway',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_storagegateway_gateway',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Substituição moderna de fitas físicas LTO por fitas virtuais (VTL) econômicas no S3 Glacier',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="16" width="48" height="32" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.12"/>
      <circle cx="22" cy="32" r="6" stroke="#3F8624" stroke-width="2.5"/>
      <circle cx="42" cy="32" r="6" stroke="#3F8624" stroke-width="2.5"/>
      <line x1="22" y1="38" x2="42" y2="38" stroke="#3F8624" stroke-width="2"/>
    </svg>`,
  },

  // 67. AWS Storage Gateway S3 File Share
  {
    key: 'aws_storagegateway_s3_file_share',
    name: 'Storage Gateway S3 File Share',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_storagegateway_nfs_file_share',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Compartilhamento NFS montável expondo objetos S3 como arquivos para usuários e aplicações locais',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 16H26L32 22H52V48H12V16Z" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.15"/>
      <circle cx="32" cy="36" r="4" fill="#3F8624"/>
    </svg>`,
  },

  // 68. AWS Storage Gateway SMB File Share
  {
    key: 'aws_storagegateway_smb_file_share',
    name: 'Storage Gateway SMB File Share',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_storagegateway_smb_file_share',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Compartilhamento de arquivos Windows SMB integrado ao Active Directory com backend no Amazon S3',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 16H26L32 22H52V48H12V16Z" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.12"/>
      <text x="32" y="39" font-family="sans-serif" font-size="10" font-weight="bold" fill="#3F8624" text-anchor="middle">SMB</text>
    </svg>`,
  },

  // 69. AWS Storage Gateway Cached Volume
  {
    key: 'aws_storagegateway_cached_volume',
    name: 'Storage Gateway Cached Volume',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_storagegateway_cached_iscsi_volume',
    defaultSpecs: { storageGb: 1000, region: 'us-east-1' },
    description: 'Volume primário mantido no Amazon S3 com dados frequentemente acessados mantidos em cache local',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="14" width="40" height="36" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.1"/>
      <path d="M22 32C22 26.5 26.5 22 32 22C36 22 39.5 24.5 41 28" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M42 32C42 37.5 37.5 42 32 42C28 42 24.5 39.5 23 36" stroke="#3F8624" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },

  // 70. AWS Storage Gateway Stored Volume
  {
    key: 'aws_storagegateway_stored_volume',
    name: 'Storage Gateway Stored Volume',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_storagegateway_stored_iscsi_volume',
    defaultSpecs: { storageGb: 2000, region: 'us-east-1' },
    description: 'Armazenamento de dados local primário completo com backups assíncronos de snapshots para o AWS S3',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="12" width="36" height="40" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.15"/>
      <line x1="14" y1="24" x2="50" y2="24" stroke="#3F8624" stroke-width="2.5"/>
      <circle cx="32" cy="38" r="4" fill="#3F8624"/>
    </svg>`,
  },

  // 71. AWS Storage Gateway Virtual Tape Library (VTL)
  {
    key: 'aws_storagegateway_virtual_tape_library',
    name: 'Storage Gateway VTL (Virtual Tape)',
    provider: 'aws',
    category: 'storage',
    brandColor: '#3F8624',
    defaultResourceType: 'aws_storagegateway_gateway',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Biblioteca virtual de fitas magnéticas compatível com softwares legados de backup (Veeam, Commvault)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="12" width="48" height="40" rx="4" stroke="#3F8624" stroke-width="3" fill="#3F8624" fill-opacity="0.12"/>
      <line x1="8" y1="24" x2="56" y2="24" stroke="#3F8624" stroke-width="2.5"/>
      <circle cx="22" cy="36" r="4" stroke="#3F8624" stroke-width="2"/>
      <circle cx="42" cy="36" r="4" stroke="#3F8624" stroke-width="2"/>
      <line x1="26" y1="36" x2="38" y2="36" stroke="#3F8624" stroke-width="2"/>
    </svg>`,
  }
];
