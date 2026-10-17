import { CloudIconDefinition } from '../types';

export const AWS_DATABASE_NOSQL_ICONS: CloudIconDefinition[] = [
  // 1. Amazon DynamoDB Accelerator (DAX)
  {
    key: 'aws_dynamodb_dax',
    name: 'DynamoDB Accelerator (DAX)',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_dax_cluster',
    defaultSpecs: { nodeType: 'dax.r5.large', count: 3 },
    description: 'Cache em memória totalmente gerenciado e altamente disponível para leituras com latência de microssegundos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Database Cylinder -->
      <g transform="translate(10, 8)">
        <ellipse cx="17" cy="8" rx="14" ry="5.5" stroke="#C925D1" stroke-width="3" fill="none" />
        <path d="M3 8v30c0 3 6.3 5.5 14 5.5s14-2.5 14-5.5V8" stroke="#C925D1" stroke-width="3" fill="none" />
      </g>
      <!-- Acceleration Lines (- + -) on left -->
      <line x1="6" y1="28" x2="19" y2="28" stroke="#C925D1" stroke-width="3" stroke-linecap="round" />
      <path d="M25 24v8M21 28h8" stroke="#C925D1" stroke-width="3" stroke-linecap="round" />
      <line x1="10" y1="36" x2="23" y2="36" stroke="#C925D1" stroke-width="3" stroke-linecap="round" />
      <!-- Lightning Bolt on right -->
      <path d="M42 20l-8 14h8l-5 16 15-20h-8l8-10z" fill="#C925D1" stroke="#C925D1" stroke-width="1.5" stroke-linejoin="round" />
    </svg>`,
  },

  // 2. Amazon DynamoDB Stream
  {
    key: 'aws_dynamodb_stream',
    name: 'DynamoDB Stream',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_dynamodb_kinesis_streaming_destination',
    defaultSpecs: { count: 1 },
    description: 'Fluxo contínuo e ordenado no tempo de modificações de nível de item em tabelas DynamoDB',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Top Rail -->
      <line x1="6" y1="10" x2="58" y2="10" stroke="#C925D1" stroke-width="3.5" stroke-linecap="round" />
      <!-- Bottom Rail -->
      <line x1="6" y1="54" x2="58" y2="54" stroke="#C925D1" stroke-width="3.5" stroke-linecap="round" />
      <!-- Stream Blocks / Log Records -->
      <rect x="8" y="16" width="11" height="32" rx="1.5" stroke="#C925D1" stroke-width="3" fill="none" />
      <rect x="23" y="16" width="11" height="32" rx="1.5" stroke="#C925D1" stroke-width="3" fill="none" />
      <!-- Tilted Record -->
      <g transform="translate(42, 16) rotate(14)">
        <rect x="0" y="0" width="11" height="31" rx="1.5" stroke="#C925D1" stroke-width="3" fill="none" />
      </g>
    </svg>`,
  },

  // 3. Amazon DynamoDB Table
  {
    key: 'aws_dynamodb_table',
    name: 'DynamoDB Table',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_dynamodb_table',
    defaultSpecs: { count: 1 },
    description: 'Tabela NoSQL do Amazon DynamoDB totalmente gerenciada com particionamento automático',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 4 Rows of Key box + Value bar -->
      <!-- Row 1 -->
      <rect x="6" y="6" width="12" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <rect x="22" y="6" width="36" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <!-- Row 2 -->
      <rect x="6" y="20" width="12" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <rect x="22" y="20" width="36" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <!-- Row 3 -->
      <rect x="6" y="34" width="12" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <rect x="22" y="34" width="36" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <!-- Row 4 -->
      <rect x="6" y="48" width="12" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <rect x="22" y="48" width="36" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
    </svg>`,
  },

  // 4. Amazon DynamoDB Standard Table Class
  {
    key: 'aws_dynamodb_standard_table',
    name: 'DynamoDB Standard Table Class',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_dynamodb_table',
    defaultSpecs: { count: 1 },
    description: 'Classe de tabela padrão otimizada para cargas de trabalho com acesso frequente e alto volume de I/O',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Database Cylinder -->
      <g transform="translate(13, 8)">
        <ellipse cx="17" cy="8" rx="14" ry="5.5" stroke="#C925D1" stroke-width="3" fill="none" />
        <path d="M3 8v32c0 3 6.3 5.5 14 5.5s14-2.5 14-5.5V8" stroke="#C925D1" stroke-width="3" fill="none" />
      </g>
      <!-- Vertical double arrow on left -->
      <path d="M9 22v16m-3-12l3-4 3 4m-6 8l3 4 3-4" stroke="#C925D1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Lightning bolt on right -->
      <path d="M44 20l-7 14h7l-5 16 15-20h-8l7-10z" fill="#C925D1" stroke="#C925D1" stroke-width="1.5" stroke-linejoin="round" />
    </svg>`,
  },

  // 5. Amazon DynamoDB Standard-Infrequent Access Table Class
  {
    key: 'aws_dynamodb_standard_ia_table',
    name: 'DynamoDB Standard-IA Table Class',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_dynamodb_table',
    defaultSpecs: { count: 1 },
    description: 'Classe Standard-IA otimizada para tabelas que armazenam dados com acesso infrequente reduzindo custos até 60%',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Database Cylinder -->
      <g transform="translate(13, 8)">
        <ellipse cx="17" cy="8" rx="14" ry="5.5" stroke="#C925D1" stroke-width="3" fill="none" />
        <path d="M3 8v32c0 3 6.3 5.5 14 5.5s14-2.5 14-5.5V8" stroke="#C925D1" stroke-width="3" fill="none" />
      </g>
      <!-- Vertical double arrow on left -->
      <path d="M9 22v16m-3-12l3-4 3 4m-6 8l3 4 3-4" stroke="#C925D1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Lightning bolt on right -->
      <path d="M44 20l-7 14h7l-5 16 15-20h-8l7-10z" fill="#C925D1" stroke="#C925D1" stroke-width="1.5" stroke-linejoin="round" />
    </svg>`,
  },

  // 6. Amazon DynamoDB Global Secondary Index (GSI)
  {
    key: 'aws_dynamodb_gsi',
    name: 'DynamoDB Global Secondary Index',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_dynamodb_table',
    defaultSpecs: { count: 1 },
    description: 'Índice secundário global contendo chave de partição e classificação diferentes das da tabela base',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 4 Rows with 3 columns: small square, small square, long bar -->
      <!-- Row 1 -->
      <rect x="6" y="6" width="9" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <rect x="18" y="6" width="9" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <rect x="30" y="6" width="28" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <!-- Row 2 -->
      <rect x="6" y="20" width="9" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <rect x="18" y="20" width="9" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <rect x="30" y="20" width="28" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <!-- Row 3 -->
      <rect x="6" y="34" width="9" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <rect x="18" y="34" width="9" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <rect x="30" y="34" width="28" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <!-- Row 4 -->
      <rect x="6" y="48" width="9" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <rect x="18" y="48" width="9" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <rect x="30" y="48" width="28" height="10" stroke="#C925D1" stroke-width="2.5" fill="none" />
    </svg>`,
  },

  // 7. Amazon DynamoDB Attribute
  {
    key: 'aws_dynamodb_attribute',
    name: 'DynamoDB Attribute',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_dynamodb_table',
    defaultSpecs: { count: 1 },
    description: 'Elemento de dados fundamental único (chave-valor) em um item do DynamoDB',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 2x2 Grid -->
      <!-- Top Left: with Circle inside -->
      <rect x="6" y="6" width="24" height="24" stroke="#C925D1" stroke-width="3" fill="none" />
      <circle cx="18" cy="18" r="7.5" stroke="#C925D1" stroke-width="3" fill="none" />
      <!-- Top Right: empty -->
      <rect x="34" y="6" width="24" height="24" stroke="#C925D1" stroke-width="3" fill="none" />
      <!-- Bottom Left: empty -->
      <rect x="6" y="34" width="24" height="24" stroke="#C925D1" stroke-width="3" fill="none" />
      <!-- Bottom Right: empty -->
      <rect x="34" y="34" width="24" height="24" stroke="#C925D1" stroke-width="3" fill="none" />
    </svg>`,
  },

  // 8. Amazon DynamoDB Attributes
  {
    key: 'aws_dynamodb_attributes',
    name: 'DynamoDB Attributes',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_dynamodb_table',
    defaultSpecs: { count: 1 },
    description: 'Conjunto de atributos de chave e dados estruturados em uma partição NoSQL',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 3 Rows x 2 Columns: Left cells have circles -->
      <!-- Row 1 -->
      <rect x="6" y="6" width="24" height="14" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <circle cx="18" cy="13" r="4.5" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <rect x="34" y="6" width="24" height="14" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <!-- Row 2 -->
      <rect x="6" y="25" width="24" height="14" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <circle cx="18" cy="32" r="4.5" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <rect x="34" y="25" width="24" height="14" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <!-- Row 3 -->
      <rect x="6" y="44" width="24" height="14" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <circle cx="18" cy="51" r="4.5" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <rect x="34" y="44" width="24" height="14" stroke="#C925D1" stroke-width="2.5" fill="none" />
    </svg>`,
  },

  // 9. Amazon DynamoDB Item
  {
    key: 'aws_dynamodb_item',
    name: 'DynamoDB Item',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_dynamodb_table_item',
    defaultSpecs: { count: 1 },
    description: 'Registro de dados individual do DynamoDB contendo atributos identificados por chave primária',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 2x2 Grid -->
      <!-- Top Left: empty -->
      <rect x="6" y="6" width="24" height="24" stroke="#C925D1" stroke-width="3" fill="none" />
      <!-- Top Right: with Circle inside -->
      <rect x="34" y="6" width="24" height="24" stroke="#C925D1" stroke-width="3" fill="none" />
      <circle cx="46" cy="18" r="7.5" stroke="#C925D1" stroke-width="3" fill="none" />
      <!-- Bottom Left: empty -->
      <rect x="6" y="34" width="24" height="24" stroke="#C925D1" stroke-width="3" fill="none" />
      <!-- Bottom Right: empty -->
      <rect x="34" y="34" width="24" height="24" stroke="#C925D1" stroke-width="3" fill="none" />
    </svg>`,
  },

  // 10. Amazon DynamoDB Items
  {
    key: 'aws_dynamodb_items',
    name: 'DynamoDB Items',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_dynamodb_table',
    defaultSpecs: { count: 1 },
    description: 'Coleção de múltiplos itens / registros armazenados em uma partição ou tabela DynamoDB',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 3 Rows x 2 Columns: Right cells have circles -->
      <!-- Row 1 -->
      <rect x="6" y="6" width="24" height="14" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <rect x="34" y="6" width="24" height="14" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <circle cx="46" cy="13" r="4.5" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <!-- Row 2 -->
      <rect x="6" y="25" width="24" height="14" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <rect x="34" y="25" width="24" height="14" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <circle cx="46" cy="32" r="4.5" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <!-- Row 3 -->
      <rect x="6" y="44" width="24" height="14" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <rect x="34" y="44" width="24" height="14" stroke="#C925D1" stroke-width="2.5" fill="none" />
      <circle cx="46" cy="51" r="4.5" stroke="#C925D1" stroke-width="2.5" fill="none" />
    </svg>`,
  },

  // 11. Amazon ElastiCache for Redis
  {
    key: 'aws_elasticache_redis',
    name: 'ElastiCache for Redis',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_elasticache_cluster',
    defaultSpecs: { nodeType: 'cache.r6g.large', engine: 'redis', count: 2 },
    description: 'Armazenamento de dados em memória compatível com Redis ultrarrápido para cache e sessões',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- RAM Module in background -->
      <g transform="translate(4, 7)">
        <rect x="1" y="2" width="54" height="28" rx="3" stroke="#C925D1" stroke-width="2.8" fill="none" />
        <rect x="7" y="6" width="8" height="14" stroke="#C925D1" stroke-width="2" fill="none" />
        <rect x="19" y="6" width="8" height="14" stroke="#C925D1" stroke-width="2" fill="none" />
        <rect x="39" y="6" width="8" height="14" stroke="#C925D1" stroke-width="2" fill="none" />
        <rect x="51" y="6" width="3" height="14" stroke="#C925D1" stroke-width="1.5" fill="none" />
      </g>
      <!-- Cylinder in foreground with 'R' -->
      <g transform="translate(18, 20)">
        <ellipse cx="14" cy="8" rx="13" ry="5.5" stroke="#C925D1" stroke-width="3" fill="white" />
        <path d="M1 8v24c0 3 5.8 5.5 13 5.5s13-2.5 13-5.5V8" stroke="#C925D1" stroke-width="3" fill="white" />
        <path d="M1 16c0 3 5.8 5.5 13 5.5s13-2.5 13-5.5" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M1 24c0 3 5.8 5.5 13 5.5s13-2.5 13-5.5" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <text x="9" y="26" fill="#C925D1" font-size="14" font-family="Arial, sans-serif" font-weight="bold">R</text>
      </g>
    </svg>`,
  },

  // 12. Amazon ElastiCache for Valkey
  {
    key: 'aws_elasticache_valkey',
    name: 'ElastiCache for Valkey',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_elasticache_cluster',
    defaultSpecs: { nodeType: 'cache.r7g.large', engine: 'valkey', count: 2 },
    description: 'Armazenamento em memória compatível com o fork open-source Valkey com otimização de custo de 33%',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- RAM Module in background -->
      <g transform="translate(4, 7)">
        <rect x="1" y="2" width="54" height="28" rx="3" stroke="#C925D1" stroke-width="2.8" fill="none" />
        <rect x="7" y="6" width="8" height="14" stroke="#C925D1" stroke-width="2" fill="none" />
        <rect x="19" y="6" width="8" height="14" stroke="#C925D1" stroke-width="2" fill="none" />
        <rect x="39" y="6" width="8" height="14" stroke="#C925D1" stroke-width="2" fill="none" />
        <rect x="51" y="6" width="3" height="14" stroke="#C925D1" stroke-width="1.5" fill="none" />
      </g>
      <!-- Cylinder in foreground with 'V' -->
      <g transform="translate(18, 20)">
        <ellipse cx="14" cy="8" rx="13" ry="5.5" stroke="#C925D1" stroke-width="3" fill="white" />
        <path d="M1 8v24c0 3 5.8 5.5 13 5.5s13-2.5 13-5.5V8" stroke="#C925D1" stroke-width="3" fill="white" />
        <path d="M1 16c0 3 5.8 5.5 13 5.5s13-2.5 13-5.5" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M1 24c0 3 5.8 5.5 13 5.5s13-2.5 13-5.5" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <text x="9" y="26" fill="#C925D1" font-size="14" font-family="Arial, sans-serif" font-weight="bold">V</text>
      </g>
    </svg>`,
  },

  // 13. Amazon ElastiCache for Memcached
  {
    key: 'aws_elasticache_memcached',
    name: 'ElastiCache for Memcached',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_elasticache_cluster',
    defaultSpecs: { nodeType: 'cache.r6g.large', engine: 'memcached', count: 2 },
    description: 'Serviço de cache de objetos em memória simples e escalável compatível com Memcached',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- RAM Module in background -->
      <g transform="translate(4, 7)">
        <rect x="1" y="2" width="54" height="28" rx="3" stroke="#C925D1" stroke-width="2.8" fill="none" />
        <rect x="7" y="6" width="8" height="14" stroke="#C925D1" stroke-width="2" fill="none" />
        <rect x="19" y="6" width="8" height="14" stroke="#C925D1" stroke-width="2" fill="none" />
        <rect x="39" y="6" width="8" height="14" stroke="#C925D1" stroke-width="2" fill="none" />
        <rect x="51" y="6" width="3" height="14" stroke="#C925D1" stroke-width="1.5" fill="none" />
      </g>
      <!-- Cylinder in foreground with 'M' -->
      <g transform="translate(18, 20)">
        <ellipse cx="14" cy="8" rx="13" ry="5.5" stroke="#C925D1" stroke-width="3" fill="white" />
        <path d="M1 8v24c0 3 5.8 5.5 13 5.5s13-2.5 13-5.5V8" stroke="#C925D1" stroke-width="3" fill="white" />
        <path d="M1 16c0 3 5.8 5.5 13 5.5s13-2.5 13-5.5" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M1 24c0 3 5.8 5.5 13 5.5s13-2.5 13-5.5" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <text x="7.5" y="25" fill="#C925D1" font-size="12" font-family="Arial, sans-serif" font-weight="bold">M</text>
      </g>
    </svg>`,
  },

  // 14. Amazon ElastiCache Cache Node
  {
    key: 'aws_elasticache_cache_node',
    name: 'ElastiCache Cache Node',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_elasticache_cluster',
    defaultSpecs: { nodeType: 'cache.t4g.medium', count: 1 },
    description: 'Nó de computação e armazenamento em memória individual dentro de um cluster ElastiCache',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="#C925D1" stroke-width="3.5" fill="none" />
      <text x="10" y="23" fill="#C925D1" font-size="9" font-family="Arial, sans-serif" font-weight="bold">CACHE</text>
    </svg>`,
  },

  // 15. Amazon DocumentDB Elastic Clusters
  {
    key: 'aws_documentdb_elastic_clusters',
    name: 'DocumentDB Elastic Clusters',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_docdbelastic_cluster',
    defaultSpecs: { count: 1 },
    description: 'Cluster compatível com MongoDB elástico que escala capacidade de computação e armazenamento automaticamente',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Dashed outer boundary -->
      <rect x="6" y="6" width="52" height="52" stroke="#C925D1" stroke-width="3" stroke-dasharray="6 4" fill="none" />
      <!-- Expand arrows at opposite corners -->
      <path d="M47 11l6 6m0-6h-6m6 0v6" stroke="#C925D1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M17 53l-6-6m0 6h6m-6 0v-6" stroke="#C925D1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Center Cylinder -->
      <g transform="translate(18, 14)">
        <ellipse cx="14" cy="7" rx="12" ry="5" stroke="#C925D1" stroke-width="2.8" fill="none" />
        <path d="M2 7v22c0 2.8 5.4 5 12 5s12-2.2 12-5V7" stroke="#C925D1" stroke-width="2.8" fill="none" />
        <path d="M2 14c0 2.8 5.4 5 12 5s12-2.2 12-5" stroke="#C925D1" stroke-width="2.8" fill="none" />
        <path d="M2 21c0 2.8 5.4 5 12 5s12-2.2 12-5" stroke="#C925D1" stroke-width="2.8" fill="none" />
      </g>
    </svg>`,
  },

  // 16. AWS Database Migration Service (DMS) Workflow or Job
  {
    key: 'aws_dms_workflow_job',
    name: 'DMS Migration Workflow',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_dms_replication_task',
    defaultSpecs: { count: 1 },
    description: 'Tarefa de replicação e migração contínua de dados homogênea ou heterogênea com mínimo downtime',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Database Cylinder -->
      <g transform="translate(12, 6)">
        <ellipse cx="20" cy="8" rx="17" ry="6" stroke="#C925D1" stroke-width="3" fill="none" />
        <path d="M3 8v24c0 3.3 7.6 6 17 6s17-2.7 17-6V8" stroke="#C925D1" stroke-width="3" fill="none" />
        <path d="M3 16c0 3.3 7.6 6 17 6s17-2.7 17-6" stroke="#C925D1" stroke-width="3" fill="none" />
        <path d="M3 24c0 3.3 7.6 6 17 6s17-2.7 17-6" stroke="#C925D1" stroke-width="3" fill="none" />
      </g>
      <!-- Base Stand / Migration Rig -->
      <g transform="translate(12, 38)">
        <!-- Vertical legs -->
        <line x1="3" y1="0" x2="3" y2="20" stroke="#C925D1" stroke-width="3" stroke-linecap="round" />
        <line x1="37" y1="0" x2="37" y2="20" stroke="#C925D1" stroke-width="3" stroke-linecap="round" />
        <line x1="15" y1="0" x2="15" y2="15" stroke="#C925D1" stroke-width="2.5" stroke-linecap="round" />
        <line x1="25" y1="0" x2="25" y2="15" stroke="#C925D1" stroke-width="2.5" stroke-linecap="round" />
        <!-- Horizontal struts -->
        <path d="M3 15c0 3 7.6 5 17 5s17-2 17-5" stroke="#C925D1" stroke-width="3" fill="none" />
      </g>
    </svg>`,
  },
];
