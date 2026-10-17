import { CloudIconDefinition } from '../types';

export const AWS_MIGRATION_ICONS: CloudIconDefinition[] = [
  // 1. Application Discovery Service Agentless Collector
  {
    key: 'aws_discovery_agentless_collector',
    name: 'Discovery Service Agentless Collector',
    provider: 'aws',
    category: 'integration',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_discovery_collector',
    defaultSpecs: { count: 1 },
    description: 'Coleta de inventário de máquinas virtuais VMware sem necessidade de instalar agentes nos hosts',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Left Panel -->
      <rect x="6" y="6" width="22" height="42" rx="2" stroke="#00A4A6" stroke-width="3" fill="#00A4A6" fill-opacity="0.06"/>
      <line x1="11" y1="15" x2="23" y2="15" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="11" y1="23" x2="23" y2="23" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Right Panel -->
      <rect x="36" y="6" width="22" height="42" rx="2" stroke="#00A4A6" stroke-width="3" fill="#00A4A6" fill-opacity="0.06"/>
      <line x1="41" y1="15" x2="53" y2="15" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="41" y1="23" x2="53" y2="23" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Central Magnifying Glass -->
      <circle cx="34" cy="35" r="14" stroke="#00A4A6" stroke-width="3.5" fill="#ffffff"/>
      <circle cx="34" cy="35" r="9" stroke="#00A4A6" stroke-width="2" stroke-opacity="0.4" fill="#00A4A6" fill-opacity="0.08"/>
      <line x1="44" y1="45" x2="57" y2="58" stroke="#00A4A6" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  },

  // 2. Migration Evaluator Collector
  {
    key: 'aws_migration_evaluator_collector',
    name: 'Migration Evaluator Collector',
    provider: 'aws',
    category: 'integration',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_migration_evaluator',
    defaultSpecs: { count: 1 },
    description: 'Avaliação de custos, provisionamento otimizado e modelagem de TCO para migração para a nuvem AWS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Target Cloud with Upload Arrow -->
      <path d="M 12 28 C 8 28 5 25 5 21 C 5 17 8 14 12 14 C 13 9 18 6 24 6 C 30 6 35 10 36 15 C 40 15 43 18 43 22 C 43 26 40 28 36 28 Z" stroke="#00A4A6" stroke-width="2.8" stroke-linejoin="round" fill="#00A4A6" fill-opacity="0.06"/>
      <path d="M 24 23 V 11 M 19 16 L 24 11 L 29 16" stroke="#00A4A6" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Evaluation Magnifying Glass -->
      <circle cx="35" cy="36" r="13" stroke="#00A4A6" stroke-width="3.5" fill="#ffffff"/>
      <circle cx="35" cy="36" r="8.5" stroke="#00A4A6" stroke-width="2" stroke-opacity="0.3" fill="#00A4A6" fill-opacity="0.06"/>
      <line x1="44" y1="46" x2="57" y2="58" stroke="#00A4A6" stroke-width="4.2" stroke-linecap="round"/>
    </svg>`
  },

  // 3. DataSync Agent
  {
    key: 'aws_datasync_agent',
    name: 'DataSync Agent',
    provider: 'aws',
    category: 'integration',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_datasync_agent',
    defaultSpecs: { count: 1 },
    description: 'Agente on-premises para aceleração e transferência de dados entre sistemas locais e o armazenamento AWS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer Enclosure -->
      <rect x="6" y="6" width="52" height="52" rx="12" stroke="#00A4A6" stroke-width="3" fill="#00A4A6" fill-opacity="0.05"/>
      <!-- Forward Arrow (Right) -->
      <path d="M 14 24 H 46 M 38 16 L 46 24 L 38 32" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Backward Arrow (Left) -->
      <path d="M 50 40 H 18 M 26 32 L 18 40 L 26 48" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Dash Highlights -->
      <line x1="17" y1="18" x2="26" y2="18" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="38" y1="46" x2="47" y2="46" stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // 4. DataSync Discovery
  {
    key: 'aws_datasync_discovery',
    name: 'DataSync Discovery',
    provider: 'aws',
    category: 'integration',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_datasync_discovery',
    defaultSpecs: { count: 1 },
    description: 'Descoberta automática de desempenho e análise de capacidade de sistemas de arquivos locais',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- File Document -->
      <path d="M 18 10 H 32 L 42 20 V 46 H 18 Z" stroke="#00A4A6" stroke-width="2.8" stroke-linejoin="round" fill="#00A4A6" fill-opacity="0.06"/>
      <path d="M 32 10 V 20 H 42" stroke="#00A4A6" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Fast Stream Scan Lines -->
      <line x1="42" y1="14" x2="57" y2="14" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round"/>
      <line x1="47" y1="20" x2="57" y2="20" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round"/>
      <line x1="42" y1="26" x2="57" y2="26" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round"/>
      <!-- Magnifying Glass -->
      <circle cx="30" cy="35" r="14" stroke="#00A4A6" stroke-width="3.5" fill="#ffffff"/>
      <circle cx="30" cy="35" r="8" stroke="#00A4A6" stroke-width="2" stroke-opacity="0.3" fill="#00A4A6" fill-opacity="0.06"/>
      <line x1="40" y1="45" x2="55" y2="58" stroke="#00A4A6" stroke-width="4.2" stroke-linecap="round"/>
    </svg>`
  },

  // 5. Mainframe Modernization Analyzer
  {
    key: 'aws_mainframe_analyzer',
    name: 'Mainframe Modernization Analyzer',
    provider: 'aws',
    category: 'devops',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_m2_analyzer',
    defaultSpecs: { count: 1 },
    description: 'Análise de código legado COBOL, dependências e modelagem de arquitetura para modernização',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Scanned Code Lines -->
      <line x1="39" y1="12" x2="52" y2="12" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round"/>
      <line x1="40" y1="20" x2="58" y2="20" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round"/>
      <line x1="36" y1="28" x2="58" y2="28" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round"/>
      <line x1="16" y1="36" x2="48" y2="36" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round"/>
      <line x1="16" y1="44" x2="36" y2="44" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round"/>
      <!-- Base Document Tray -->
      <path d="M 8 48 L 15 56 H 49 L 56 48" stroke="#00A4A6" stroke-width="3" stroke-linejoin="round" fill="#00A4A6" fill-opacity="0.06"/>
      <!-- Top Left Magnifying Lens -->
      <circle cx="23" cy="18" r="9" stroke="#00A4A6" stroke-width="3" fill="#ffffff"/>
      <line x1="19" y1="18" x2="27" y2="18" stroke="#00A4A6" stroke-width="2.4" stroke-linecap="round"/>
      <line x1="17" y1="25" x2="9" y2="33" stroke="#00A4A6" stroke-width="3.5" stroke-linecap="round"/>
    </svg>`
  },

  // 6. Mainframe Modernization Converter
  {
    key: 'aws_mainframe_converter',
    name: 'Mainframe Modernization Converter',
    provider: 'aws',
    category: 'devops',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_m2_converter',
    defaultSpecs: { count: 1 },
    description: 'Transformação automatizada de programas legados em componentes Java e microsserviços modernos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Top Hexagon Bracket -->
      <polygon points="12,12 44,12 56,19 44,26 12,26 4,19" stroke="#00A4A6" stroke-width="3" stroke-linejoin="round" fill="#00A4A6" fill-opacity="0.06"/>
      <!-- Bottom Hexagon Bracket -->
      <polygon points="12,38 44,38 56,45 44,52 12,52 4,45" stroke="#00A4A6" stroke-width="3" stroke-linejoin="round" fill="#00A4A6" fill-opacity="0.06"/>
      <!-- Central Connection Channel -->
      <line x1="30" y1="19" x2="30" y2="45" stroke="#00A4A6" stroke-width="3.5"/>
      <!-- Top Square Node -->
      <rect x="25" y="14" width="10" height="10" rx="1" stroke="#00A4A6" stroke-width="2.5" fill="#ffffff"/>
      <!-- Bottom Circle Node -->
      <circle cx="30" cy="45" r="5" stroke="#00A4A6" stroke-width="2.5" fill="#ffffff"/>
    </svg>`
  },

  // 7. Mainframe Modernization Runtime
  {
    key: 'aws_mainframe_runtime',
    name: 'Mainframe Modernization Runtime',
    provider: 'aws',
    category: 'compute',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_m2_environment',
    defaultSpecs: { engine: 'microfocus', count: 1 },
    description: 'Ambiente de execução em nuvem totalmente gerenciado para aplicações modernizadas de mainframe',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Top Fast Hexagon -->
      <polygon points="26,14 50,14 58,20 50,26 26,26 18,20" stroke="#00A4A6" stroke-width="3" stroke-linejoin="round" fill="#00A4A6" fill-opacity="0.08"/>
      <line x1="6" y1="16" x2="16" y2="16" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round"/>
      <line x1="11" y1="23" x2="21" y2="23" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round"/>
      <!-- Bottom Fast Hexagon -->
      <polygon points="26,38 50,38 58,44 50,50 26,50 18,44" stroke="#00A4A6" stroke-width="3" stroke-linejoin="round" fill="#00A4A6" fill-opacity="0.08"/>
      <line x1="11" y1="40" x2="21" y2="40" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round"/>
      <line x1="6" y1="47" x2="16" y2="47" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round"/>
    </svg>`
  },

  // 8. Refactor Spaces Applications
  {
    key: 'aws_refactor_spaces_applications',
    name: 'Refactor Spaces Applications',
    provider: 'aws',
    category: 'integration',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_migrationhubrefactorspaces_application',
    defaultSpecs: { count: 1 },
    description: 'Roteamento progressivo de requisições entre monolito e microsserviços modernos com Refactor Spaces',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer Boundary Box -->
      <rect x="6" y="6" width="52" height="52" rx="3" stroke="#00A4A6" stroke-width="3" fill="#00A4A6" fill-opacity="0.04"/>
      <!-- Upper Service Core -->
      <rect x="23" y="12" width="18" height="18" rx="2" stroke="#00A4A6" stroke-width="2.8" fill="#ffffff"/>
      <path d="M 27 24 L 32 19 L 37 24 M 27 28 L 32 23 L 37 28" stroke="#00A4A6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Stem Network -->
      <line x1="32" y1="30" x2="32" y2="46" stroke="#00A4A6" stroke-width="2.8"/>
      <path d="M 18 36 C 18 42 24 42 32 42 C 40 42 46 42 46 36" stroke="#00A4A6" stroke-width="2.6" fill="none"/>
      <!-- Nodes -->
      <circle cx="32" cy="46" r="4.5" stroke="#00A4A6" stroke-width="2.5" fill="#ffffff"/>
      <circle cx="18" cy="36" r="4.5" stroke="#00A4A6" stroke-width="2.5" fill="#ffffff"/>
      <circle cx="46" cy="36" r="4.5" stroke="#00A4A6" stroke-width="2.5" fill="#ffffff"/>
    </svg>`
  },

  // 9. Refactor Spaces Services
  {
    key: 'aws_refactor_spaces_services',
    name: 'Refactor Spaces Services',
    provider: 'aws',
    category: 'integration',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_migrationhubrefactorspaces_service',
    defaultSpecs: { count: 1 },
    description: 'Registro e descoberta operacional de serviços modulares desacoplados no Migration Hub',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Service Cogwheel -->
      <path d="M 32 10 L 35 14 L 40 13 L 42 17 L 47 18 L 47 23 L 51 26 L 49 30 L 51 35 L 47 38 L 47 43 L 42 44 L 40 48 L 35 47 L 32 51 L 29 47 L 24 48 L 22 44 L 17 43 L 17 38 L 13 35 L 15 30 L 13 26 L 17 23 L 17 18 L 22 17 L 24 13 L 29 14 Z" stroke="#00A4A6" stroke-width="3" stroke-linejoin="round" fill="#00A4A6" fill-opacity="0.06"/>
      <!-- Center Chevrons Ring -->
      <circle cx="32" cy="30.5" r="10.5" stroke="#00A4A6" stroke-width="2.5" fill="#ffffff"/>
      <path d="M 28 32 L 32 28 L 36 32 M 28 27 L 32 23 L 36 27" stroke="#00A4A6" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Service Pointer Handle -->
      <line x1="20" y1="44" x2="8" y2="56" stroke="#00A4A6" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  },

  // 10. Transfer Family AS2
  {
    key: 'aws_transfer_as2',
    name: 'Transfer Family AS2',
    provider: 'aws',
    category: 'integration',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_transfer_server',
    defaultSpecs: { count: 1 },
    description: 'Transferência B2B segura de mensagens de negócios EDI utilizando o protocolo AS2',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Folder Body -->
      <path d="M 8 16 H 24 L 30 22 H 54 V 54 H 8 Z" stroke="#00A4A6" stroke-width="3" stroke-linejoin="round" fill="#00A4A6" fill-opacity="0.05"/>
      <!-- Transfer Arrows -->
      <path d="M 40 28 V 8 M 35 14 L 40 8 L 45 14" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 28 20 V 38 M 23 32 L 28 38 L 33 32" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Protocol Label -->
      <text x="32" y="50" fill="#00A4A6" font-size="12" font-weight="900" font-family="sans-serif">AS2</text>
    </svg>`
  },

  // 11. Transfer Family FTP
  {
    key: 'aws_transfer_ftp',
    name: 'Transfer Family FTP',
    provider: 'aws',
    category: 'integration',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_transfer_server',
    defaultSpecs: { count: 1 },
    description: 'Servidor gerenciado para conexões legadas de protocolo FTP com suporte a S3 e EFS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Folder Body -->
      <path d="M 8 16 H 24 L 30 22 H 54 V 54 H 8 Z" stroke="#00A4A6" stroke-width="3" stroke-linejoin="round" fill="#00A4A6" fill-opacity="0.05"/>
      <!-- Transfer Arrows -->
      <path d="M 40 28 V 8 M 35 14 L 40 8 L 45 14" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 28 20 V 38 M 23 32 L 28 38 L 33 32" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Protocol Label -->
      <text x="30" y="50" fill="#00A4A6" font-size="12" font-weight="900" font-family="sans-serif">FTP</text>
    </svg>`
  },

  // 12. Transfer Family FTPS
  {
    key: 'aws_transfer_ftps',
    name: 'Transfer Family FTPS',
    provider: 'aws',
    category: 'integration',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_transfer_server',
    defaultSpecs: { count: 1 },
    description: 'Transferência de dados com criptografia TLS/SSL integrada para conformidade e segurança',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Folder Body -->
      <path d="M 8 16 H 24 L 30 22 H 54 V 54 H 8 Z" stroke="#00A4A6" stroke-width="3" stroke-linejoin="round" fill="#00A4A6" fill-opacity="0.05"/>
      <!-- Transfer Arrows -->
      <path d="M 40 28 V 8 M 35 14 L 40 8 L 45 14" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 28 20 V 38 M 23 32 L 28 38 L 33 32" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Protocol Label -->
      <text x="27" y="50" fill="#00A4A6" font-size="11.5" font-weight="900" font-family="sans-serif">FTPS</text>
    </svg>`
  },

  // 13. Transfer Family SFTP
  {
    key: 'aws_transfer_sftp',
    name: 'Transfer Family SFTP',
    provider: 'aws',
    category: 'integration',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_transfer_server',
    defaultSpecs: { count: 1 },
    description: 'Transferência de arquivos corporativa segura via SSH File Transfer Protocol (SFTP)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Folder Body -->
      <path d="M 8 16 H 24 L 30 22 H 54 V 54 H 8 Z" stroke="#00A4A6" stroke-width="3" stroke-linejoin="round" fill="#00A4A6" fill-opacity="0.05"/>
      <!-- Transfer Arrows -->
      <path d="M 40 28 V 8 M 35 14 L 40 8 L 45 14" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 28 20 V 38 M 23 32 L 28 38 L 33 32" stroke="#00A4A6" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Protocol Label -->
      <text x="27" y="50" fill="#00A4A6" font-size="11.5" font-weight="900" font-family="sans-serif">SFTP</text>
    </svg>`
  },

  // 14. Application Discovery Service Discovery Agent
  {
    key: 'aws_discovery_agent',
    name: 'Discovery Service Agent',
    provider: 'aws',
    category: 'integration',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_discovery_agent',
    defaultSpecs: { count: 1 },
    description: 'Agente residente para coleta aprofundada de utilização de CPU, memória, disco e conexões de rede',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Upper Right Cloud -->
      <path d="M 38 32 C 34 32 31 29 31 25 C 31 21 34 18 38 18 C 39 13 44 10 50 10 C 56 10 61 14 62 19 C 66 19 69 22 69 26 C 69 30 66 32 62 32 Z" stroke="#00A4A6" stroke-width="2.8" stroke-linejoin="round" fill="#00A4A6" fill-opacity="0.06"/>
      <!-- Lower Left Cloud -->
      <path d="M 12 54 C 8 54 5 51 5 47 C 5 43 8 40 12 40 C 13 35 18 32 24 32 C 30 32 35 36 36 41 C 40 41 43 44 43 48 C 43 52 40 54 36 54 Z" stroke="#00A4A6" stroke-width="2.8" stroke-linejoin="round" fill="#00A4A6" fill-opacity="0.06"/>
      <!-- Bidirectional Data Transfer Arrows -->
      <path d="M 28 16 H 6 M 12 11 L 6 16 L 12 21" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 36 48 H 58 M 52 43 L 58 48 L 52 53" stroke="#00A4A6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 15. Mainframe Modernization Compiler
  {
    key: 'aws_mainframe_compiler',
    name: 'Mainframe Modernization Compiler',
    provider: 'aws',
    category: 'devops',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_m2_compiler',
    defaultSpecs: { count: 1 },
    description: 'Compilação automatizada de código-fonte de mainframe para bytecode JVM e artefatos de nuvem',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Upper Compiler Cogwheel -->
      <path d="M 32 8 L 35 12 L 40 11 L 42 15 L 47 16 L 47 21 L 51 24 L 49 28 L 51 33 L 47 36 L 47 41 L 42 42 L 40 46 L 35 45 L 32 49 L 29 45 L 24 46 L 22 42 L 17 41 L 17 36 L 13 33 L 15 28 L 13 24 L 17 21 L 17 16 L 22 15 L 24 11 L 29 12 Z" stroke="#00A4A6" stroke-width="2.8" stroke-linejoin="round" fill="#00A4A6" fill-opacity="0.06"/>
      <!-- Code Brackets in Core -->
      <path d="M 26 31 L 21 26 L 26 21 M 38 31 L 43 26 L 38 21 M 34 19 L 30 33" stroke="#00A4A6" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Platform Base -->
      <path d="M 8 54 L 20 44 H 44 L 56 54 Z" stroke="#00A4A6" stroke-width="3" stroke-linejoin="round" fill="#00A4A6" fill-opacity="0.06"/>
    </svg>`
  },

  // 16. Mainframe Modernization Developer
  {
    key: 'aws_mainframe_developer',
    name: 'Mainframe Modernization Developer',
    provider: 'aws',
    category: 'devops',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_m2_dev_environment',
    defaultSpecs: { count: 1 },
    description: 'Ambiente de desenvolvimento e depuração interativa para migração e refatoração de código',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- IDE Window -->
      <rect x="10" y="8" width="44" height="34" rx="3" stroke="#00A4A6" stroke-width="3" fill="#ffffff"/>
      <!-- Window Controls -->
      <line x1="10" y1="18" x2="54" y2="18" stroke="#00A4A6" stroke-width="2"/>
      <circle cx="16" cy="13" r="1.5" fill="#00A4A6"/>
      <circle cx="21" cy="13" r="1.5" fill="#00A4A6"/>
      <circle cx="26" cy="13" r="1.5" fill="#00A4A6"/>
      <!-- Code Brackets -->
      <path d="M 26 31 L 21 26 L 26 21 M 38 31 L 43 26 L 38 21 M 34 20 L 30 32" stroke="#00A4A6" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Workstation Stand Base -->
      <path d="M 8 54 L 22 42 H 42 L 56 54 Z" stroke="#00A4A6" stroke-width="3" stroke-linejoin="round" fill="#00A4A6" fill-opacity="0.06"/>
    </svg>`
  },

  // 17. Refactor Spaces Environments
  {
    key: 'aws_refactor_spaces_environments',
    name: 'Refactor Spaces Environments',
    provider: 'aws',
    category: 'integration',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_migrationhubrefactorspaces_environment',
    defaultSpecs: { count: 1 },
    description: 'Ambiente multi-conta isolado para orquestração de transição gradual entre serviços legados e novos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer Enclosure -->
      <rect x="6" y="6" width="52" height="52" rx="3" stroke="#00A4A6" stroke-width="3" fill="#00A4A6" fill-opacity="0.04"/>
      <!-- Rear Space Tile -->
      <rect x="14" y="14" width="22" height="22" rx="2" stroke="#00A4A6" stroke-width="2.8" fill="#ffffff"/>
      <path d="M 19 28 L 25 21 L 31 28 M 19 33 L 25 26 L 31 33" stroke="#00A4A6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Front Space Tile -->
      <rect x="28" y="28" width="22" height="22" rx="2" stroke="#00A4A6" stroke-width="2.8" fill="#ffffff"/>
      <path d="M 33 42 L 39 35 L 45 42 M 33 47 L 39 40 L 45 47" stroke="#00A4A6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  }
];
