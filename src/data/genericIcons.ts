import { CloudIconDefinition } from '../types';

export const GENERIC_ICONS: CloudIconDefinition[] = [
  // 1. Alert (from Res_Alert_48_Light.png)
  {
    key: 'generic_res_alert',
    name: 'Alerta / Monitoramento',
    provider: 'generic',
    category: 'analytics',
    brandColor: '#E11D48',
    defaultResourceType: 'aws_cloudwatch_metric_alarm',
    defaultSpecs: { count: 1, severity: 'High', region: 'us-east-1' },
    description: 'Notificação de alarme de sistema, gatilho de métrica crítica e monitoramento de integridade operacional',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8L56 50H8L32 8Z" stroke="#E11D48" stroke-width="3" stroke-linejoin="round" fill="#E11D48" fill-opacity="0.15"/>
      <line x1="32" y1="23" x2="32" y2="36" stroke="#E11D48" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="32" cy="43" r="2.2" fill="#E11D48"/>
    </svg>`,
  },

  // 2. Authenticated User (from Res_Authenticated-User_48_Light.png)
  {
    key: 'generic_res_authenticated_user',
    name: 'Usuário Autenticado',
    provider: 'generic',
    category: 'security',
    brandColor: '#8B5CF6',
    defaultResourceType: 'aws_cognito_user_pool',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Entidade de usuário validada com credenciais verificadas por Provedor de Identidade (IdP) ou MFA',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="22" r="10" stroke="#8B5CF6" stroke-width="3" fill="#8B5CF6" fill-opacity="0.15"/>
      <path d="M12 50C12 40 19 36 28 36C33 36 38 38 41 41" stroke="#8B5CF6" stroke-width="3" stroke-linecap="round"/>
      <circle cx="46" cy="44" r="11" fill="#10B981"/>
      <path d="M41 44L44.5 47.5L51 40.5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },

  // 3. AWS Management Console (from Res_AWS-Management-Console_48_Light.png)
  {
    key: 'generic_res_management_console',
    name: 'Console de Gerenciamento',
    provider: 'generic',
    category: 'devops',
    brandColor: '#2563EB',
    defaultResourceType: 'aws_iam_account_alias',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Portal de administração Web e interface visual de gerenciamento de recursos em nuvem',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="10" width="48" height="44" rx="4" stroke="#2563EB" stroke-width="3" fill="#2563EB" fill-opacity="0.1"/>
      <line x1="8" y1="22" x2="56" y2="22" stroke="#2563EB" stroke-width="2.5"/>
      <circle cx="15" cy="16" r="2" fill="#2563EB"/>
      <circle cx="22" cy="16" r="2" fill="#2563EB"/>
      <circle cx="29" cy="16" r="2" fill="#2563EB"/>
      <rect x="14" y="28" width="16" height="10" rx="2" stroke="#2563EB" stroke-width="2" fill="none"/>
      <rect x="34" y="28" width="16" height="18" rx="2" stroke="#2563EB" stroke-width="2" fill="none"/>
      <line x1="14" y1="44" x2="26" y2="44" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },

  // 4. Camera (from Res_Camera_48_Light.png)
  {
    key: 'generic_res_camera',
    name: 'Câmera / Sensor de Vídeo',
    provider: 'generic',
    category: 'integration',
    brandColor: '#6366F1',
    defaultResourceType: 'aws_kinesis_video_stream',
    defaultSpecs: { count: 1, resolution: '1080p', region: 'us-east-1' },
    description: 'Dispositivo de captura de vídeo em tempo real, visão computacional ou sensor óptico de vigilância IoT',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 22C10 19.8 11.8 18 14 18H22L25 12H39L42 18H50C52.2 18 54 19.8 54 22V48C54 50.2 52.2 52 50 52H14C11.8 52 10 50.2 10 48V22Z" stroke="#6366F1" stroke-width="3" fill="#6366F1" fill-opacity="0.12"/>
      <circle cx="32" cy="35" r="10" stroke="#6366F1" stroke-width="3" fill="none"/>
      <circle cx="32" cy="35" r="4" fill="#6366F1"/>
      <circle cx="47" cy="24" r="1.8" fill="#6366F1"/>
    </svg>`,
  },

  // 5. Certificate (from Res_Certificate_48_Light.png)
  {
    key: 'generic_res_certificate',
    name: 'Certificado Digital / PKI',
    provider: 'generic',
    category: 'security',
    brandColor: '#059669',
    defaultResourceType: 'aws_acm_certificate',
    defaultSpecs: { domain: 'example.com', region: 'us-east-1' },
    description: 'Certificado X.509 de infraestrutura de chave pública (PKI) e validação de identidade criptográfica',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="8" width="44" height="42" rx="3" stroke="#059669" stroke-width="3" fill="#059669" fill-opacity="0.1"/>
      <line x1="18" y1="18" x2="38" y2="18" stroke="#059669" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="18" y1="26" x2="46" y2="26" stroke="#059669" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="18" y1="34" x2="32" y2="34" stroke="#059669" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="44" cy="46" r="8" stroke="#059669" stroke-width="2.5" fill="#059669" fill-opacity="0.2"/>
      <path d="M41 53L39 60L44 57L49 60L47 53" stroke="#059669" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="#059669"/>
    </svg>`,
  },

  // 6. Chat (from Res_Chat_48_Light.png)
  {
    key: 'generic_res_chat',
    name: 'Chat / Mensageria Interativa',
    provider: 'generic',
    category: 'integration',
    brandColor: '#0284C7',
    defaultResourceType: 'aws_connect_instance',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Canal de suporte por chat em tempo real, assistentes virtuais conversacionais ou chatbots integrados',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 16C10 12.7 12.7 10 16 10H44C47.3 10 50 12.7 50 16V34C50 37.3 47.3 40 44 40H24L14 48V40H16C12.7 40 10 37.3 10 34V16Z" stroke="#0284C7" stroke-width="3" stroke-linejoin="round" fill="#0284C7" fill-opacity="0.12"/>
      <circle cx="22" cy="25" r="2.5" fill="#0284C7"/>
      <circle cx="30" cy="25" r="2.5" fill="#0284C7"/>
      <circle cx="38" cy="25" r="2.5" fill="#0284C7"/>
    </svg>`,
  },

  // 7. Checkmark (from Res_Checkmark_48_Light.png)
  {
    key: 'generic_res_checkmark',
    name: 'Conformidade / Status Aprovado',
    provider: 'generic',
    category: 'devops',
    brandColor: '#16A34A',
    defaultResourceType: 'aws_config_config_rule',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Validação de conformidade contínua, governança e checagem de aprovação de postura de segurança',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="22" stroke="#16A34A" stroke-width="3.5" fill="#16A34A" fill-opacity="0.15"/>
      <path d="M22 32L29 39L43 23" stroke="#16A34A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },

  // 8. Client (from Res_Client_48_Light.png)
  {
    key: 'generic_res_client',
    name: 'Cliente Desktop / Workstation',
    provider: 'generic',
    category: 'compute',
    brandColor: '#475569',
    defaultResourceType: 'aws_workspaces_workspace',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Computador cliente corporativo, desktop virtual (VDI) ou aplicação cliente em execução em estação local',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="12" width="44" height="32" rx="3" stroke="#475569" stroke-width="3" fill="#475569" fill-opacity="0.12"/>
      <line x1="10" y1="36" x2="54" y2="36" stroke="#475569" stroke-width="2"/>
      <path d="M26 44L24 52H40L38 44" stroke="#475569" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="20" y1="52" x2="44" y2="52" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
      <circle cx="32" cy="40" r="1.5" fill="#475569"/>
    </svg>`,
  },

  // 9. Cold Storage (from Res_Cold-Storage_48_Light.png)
  {
    key: 'generic_res_cold_storage',
    name: 'Armazenamento Frio (Cold Storage)',
    provider: 'generic',
    category: 'storage',
    brandColor: '#0284C7',
    defaultResourceType: 'aws_glacier_vault',
    defaultSpecs: { storageGb: 1000, region: 'us-east-1' },
    description: 'Cofre de arquivamento de dados de longo prazo de alta durabilidade para retenção histórica e compliance',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="44" height="44" rx="6" stroke="#0284C7" stroke-width="3" fill="#0284C7" fill-opacity="0.1"/>
      <line x1="32" y1="18" x2="32" y2="46" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="18" y1="32" x2="46" y2="32" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="22" y1="22" x2="42" y2="42" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="42" y1="22" x2="22" y2="42" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="32" cy="32" r="4" fill="#0284C7"/>
    </svg>`,
  },

  // 10. Corporate Data Center (from Res_Corporate-Data-Center_48_Light.png)
  {
    key: 'generic_res_corporate_data_center',
    name: 'Data Center Corporativo',
    provider: 'generic',
    category: 'compute',
    brandColor: '#334155',
    defaultResourceType: 'aws_customer_gateway',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Instalação on-premises corporativa com racks de servidores, conectividade dedicada e infraestrutura legada',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="14" width="36" height="42" rx="2" stroke="#334155" stroke-width="3" fill="#334155" fill-opacity="0.12"/>
      <line x1="20" y1="22" x2="44" y2="22" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="20" y1="30" x2="44" y2="30" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="20" y1="38" x2="44" y2="38" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="20" y1="46" x2="44" y2="46" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="32" y1="6" x2="32" y2="14" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="32" cy="6" r="2.5" fill="#334155"/>
    </svg>`,
  },

  // 11. Credentials (from Res_Credentials_48_Light.png)
  {
    key: 'generic_res_credentials',
    name: 'Credenciais & Chaves Secretas',
    provider: 'generic',
    category: 'security',
    brandColor: '#D97706',
    defaultResourceType: 'aws_secretsmanager_secret',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Chaves de API, senhas, tokens de acesso ou credenciais criptografadas gerenciadas de forma segura',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="16" width="40" height="34" rx="4" stroke="#D97706" stroke-width="3" fill="#D97706" fill-opacity="0.12"/>
      <rect x="18" y="24" width="10" height="12" rx="1.5" stroke="#D97706" stroke-width="2" fill="none"/>
      <line x1="33" y1="25" x2="44" y2="25" stroke="#D97706" stroke-width="2" stroke-linecap="round"/>
      <line x1="33" y1="31" x2="44" y2="31" stroke="#D97706" stroke-width="2" stroke-linecap="round"/>
      <line x1="33" y1="37" x2="41" y2="37" stroke="#D97706" stroke-width="2" stroke-linecap="round"/>
      <path d="M26 16V10H38V16" stroke="#D97706" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    </svg>`,
  },

  // 12. Database (from Res_Database_48_Light.png)
  {
    key: 'generic_res_database',
    name: 'Banco de Dados',
    provider: 'generic',
    category: 'database',
    brandColor: '#2563EB',
    defaultResourceType: 'aws_db_instance',
    defaultSpecs: { instanceType: 'db.t3.medium', storageGb: 100, region: 'us-east-1' },
    description: 'Sistema gerenciador de banco de dados (SGBD) relacional ou multimodelo de alta performance',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="16" rx="20" ry="7" stroke="#2563EB" stroke-width="3" fill="#2563EB" fill-opacity="0.2"/>
      <path d="M12 16V48C12 51.9 21 55 32 55C43 55 52 51.9 52 48V16" stroke="#2563EB" stroke-width="3"/>
      <path d="M12 27C12 30.9 21 34 32 34C43 34 52 30.9 52 27" stroke="#2563EB" stroke-width="2.5"/>
      <path d="M12 38C12 41.9 21 45 32 45C43 45 52 41.9 52 38" stroke="#2563EB" stroke-width="2.5"/>
    </svg>`,
  },

  // 13. Disk (from Res_Disk_48_Light.png)
  {
    key: 'generic_res_disk',
    name: 'Volume de Disco / Bloco',
    provider: 'generic',
    category: 'storage',
    brandColor: '#4F46E5',
    defaultResourceType: 'aws_ebs_volume',
    defaultSpecs: { storageGb: 100, volumeType: 'gp3', region: 'us-east-1' },
    description: 'Volume de armazenamento em bloco persistente conectado a servidores virtuais ou físicos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="10" width="40" height="44" rx="4" stroke="#4F46E5" stroke-width="3" fill="#4F46E5" fill-opacity="0.12"/>
      <circle cx="32" cy="28" r="12" stroke="#4F46E5" stroke-width="2.5" fill="none"/>
      <circle cx="32" cy="28" r="4" fill="#4F46E5"/>
      <line x1="32" y1="28" x2="41" y2="35" stroke="#4F46E5" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="20" cy="46" r="2" fill="#4F46E5"/>
      <circle cx="28" cy="46" r="2" fill="#4F46E5"/>
    </svg>`,
  },

  // 14. Document (from Res_Document_48_Light.png)
  {
    key: 'generic_res_document',
    name: 'Documento / Arquivo Único',
    provider: 'generic',
    category: 'storage',
    brandColor: '#0284C7',
    defaultResourceType: 'aws_s3_object',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Arquivo de documento, payload estruturado, arquivo de configuração ou objeto de armazenamento',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 10C14 8.9 14.9 8 16 8H38L50 20V54C50 55.1 49.1 56 48 56H16C14.9 56 14 55.1 14 54V10Z" stroke="#0284C7" stroke-width="3" stroke-linejoin="round" fill="#0284C7" fill-opacity="0.12"/>
      <path d="M38 8V20H50" stroke="#0284C7" stroke-width="2.5" stroke-linejoin="round"/>
      <line x1="22" y1="28" x2="42" y2="28" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="22" y1="36" x2="42" y2="36" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="22" y1="44" x2="34" y2="44" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },

  // 15. Documents (from Res_Documents_48_Light.png)
  {
    key: 'generic_res_documents',
    name: 'Conjunto de Documentos',
    provider: 'generic',
    category: 'storage',
    brandColor: '#0369A1',
    defaultResourceType: 'aws_s3_bucket',
    defaultSpecs: { storageGb: 50, region: 'us-east-1' },
    description: 'Coleção de documentos, biblioteca digital de conteúdo ou repositório documental em massa',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 16H36L44 24V48H10V16Z" stroke="#0369A1" stroke-width="2.5" fill="#0369A1" fill-opacity="0.1"/>
      <path d="M16 10H42L50 18V44" stroke="#0369A1" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M18 24C18 22.9 18.9 22 20 22H46L54 30V56C54 57.1 53.1 58 52 58H20C18.9 58 18 57.1 18 56V24Z" stroke="#0369A1" stroke-width="3" fill="#0369A1" fill-opacity="0.2"/>
      <line x1="26" y1="36" x2="46" y2="36" stroke="#0369A1" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="26" y1="44" x2="46" y2="44" stroke="#0369A1" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },

  // 16. Email (from Res_Email_48_Light.png)
  {
    key: 'generic_res_email',
    name: 'E-mail / Correio Eletrônico',
    provider: 'generic',
    category: 'integration',
    brandColor: '#E11D48',
    defaultResourceType: 'aws_ses_email_identity',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Notificação por correio eletrônico, entrega de mensagens transacionais e marketing via SMTP',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="14" width="48" height="36" rx="4" stroke="#E11D48" stroke-width="3" fill="#E11D48" fill-opacity="0.12"/>
      <path d="M8 18L32 34L56 18" stroke="#E11D48" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },

  // 17. Firewall (from Res_Firewall_48_Light.png)
  {
    key: 'generic_res_firewall',
    name: 'Firewall de Rede',
    provider: 'generic',
    category: 'security',
    brandColor: '#DC2626',
    defaultResourceType: 'aws_networkfirewall_firewall',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Filtro perimetral de pacotes de rede, inspeção de estado e regras de controle de tráfego de entrada e saída',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="12" width="44" height="40" rx="3" stroke="#DC2626" stroke-width="3" fill="#DC2626" fill-opacity="0.12"/>
      <line x1="10" y1="24" x2="54" y2="24" stroke="#DC2626" stroke-width="2.5"/>
      <line x1="10" y1="38" x2="54" y2="38" stroke="#DC2626" stroke-width="2.5"/>
      <line x1="24" y1="12" x2="24" y2="24" stroke="#DC2626" stroke-width="2"/>
      <line x1="40" y1="12" x2="40" y2="24" stroke="#DC2626" stroke-width="2"/>
      <line x1="17" y1="24" x2="17" y2="38" stroke="#DC2626" stroke-width="2"/>
      <line x1="32" y1="24" x2="32" y2="38" stroke="#DC2626" stroke-width="2"/>
      <line x1="47" y1="24" x2="47" y2="38" stroke="#DC2626" stroke-width="2"/>
      <line x1="24" y1="38" x2="24" y2="52" stroke="#DC2626" stroke-width="2"/>
      <line x1="40" y1="38" x2="40" y2="52" stroke="#DC2626" stroke-width="2"/>
    </svg>`,
  },

  // 18. Folder (from Res_Folder_48_Light.png)
  {
    key: 'generic_res_folder',
    name: 'Pasta / Diretório',
    provider: 'generic',
    category: 'storage',
    brandColor: '#F59E0B',
    defaultResourceType: 'aws_s3_object',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Prefixo de diretório de arquivos, organização hierárquica em sistema de armazenamento de objetos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 18C8 15.8 9.8 14 12 14H24L30 20H52C54.2 20 56 21.8 56 24V48C56 50.2 54.2 52 52 52H12C9.8 52 8 50.2 8 48V18Z" stroke="#F59E0B" stroke-width="3" stroke-linejoin="round" fill="#F59E0B" fill-opacity="0.15"/>
      <line x1="8" y1="28" x2="56" y2="28" stroke="#F59E0B" stroke-width="2"/>
    </svg>`,
  },

  // 19. Folders (from Res_Folders_48_Light.png)
  {
    key: 'generic_res_folders',
    name: 'Múltiplas Pastas',
    provider: 'generic',
    category: 'storage',
    brandColor: '#D97706',
    defaultResourceType: 'aws_s3_bucket',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Múltiplas pastas estruturadas ou partição lógica em sistema de arquivos distribuído',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 14H26L31 19H48C49.1 19 50 19.9 50 21V25" stroke="#D97706" stroke-width="2.5" fill="#D97706" fill-opacity="0.1"/>
      <path d="M16 20H30L35 25H52C53.1 25 54 25.9 54 27V31" stroke="#D97706" stroke-width="2.5" fill="#D97706" fill-opacity="0.1"/>
      <path d="M10 26C10 24.9 10.9 24 12 24H24L30 30H54C55.1 30 56 30.9 56 32V52C56 53.1 55.1 54 54 54H12C10.9 54 10 53.1 10 52V26Z" stroke="#D97706" stroke-width="3" stroke-linejoin="round" fill="#D97706" fill-opacity="0.2"/>
    </svg>`,
  },

  // 20. Forums (from Res_Forums_48_Light.png)
  {
    key: 'generic_res_forums',
    name: 'Fóruns & Comunidade',
    provider: 'generic',
    category: 'integration',
    brandColor: '#8B5CF6',
    defaultResourceType: 'aws_sns_topic',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Tópicos de discussão colaborativa, fóruns públicos e comunidades de suporte de usuários',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 14H40C42.2 14 44 15.8 44 18V32C44 34.2 42.2 36 40 36H24L16 42V36H12C9.8 36 8 34.2 8 32V18C8 15.8 9.8 14 12 14Z" stroke="#8B5CF6" stroke-width="2.5" fill="#8B5CF6" fill-opacity="0.12"/>
      <path d="M24 24H52C54.2 24 56 25.8 56 28V42C56 44.2 54.2 46 52 46H48V52L40 46H24C21.8 46 20 44.2 20 42V40" stroke="#8B5CF6" stroke-width="3" stroke-linejoin="round" fill="#8B5CF6" fill-opacity="0.2"/>
    </svg>`,
  },

  // 21. Gear (from Res_Gear_48_Light.png)
  {
    key: 'generic_res_gear',
    name: 'Configuração / Parâmetro',
    provider: 'generic',
    category: 'devops',
    brandColor: '#475569',
    defaultResourceType: 'aws_ssm_parameter',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Parâmetro de configuração do sistema, chave de ambiente ou ajuste de comportamento operacional',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="8" stroke="#475569" stroke-width="3" fill="#475569" fill-opacity="0.2"/>
      <path d="M29 10H35V16H29V10ZM29 48H35V54H29V48ZM10 29H16V35H10V29ZM48 29H54V35H48V29ZM17.5 14.5L21.7 18.7L17.5 22.9L13.3 18.7L17.5 14.5ZM46.5 43.5L50.7 47.7L46.5 51.9L42.3 47.7L46.5 43.5ZM17.5 49.5L13.3 45.3L17.5 41.1L21.7 45.3L17.5 49.5ZM46.5 20.5L42.3 16.3L46.5 12.1L50.7 16.3L46.5 20.5Z" fill="#475569"/>
      <circle cx="32" cy="32" r="18" stroke="#475569" stroke-width="3" fill="none"/>
    </svg>`,
  },

  // 22. Generic Database (from Res_Generic-Database_48_Light.png)
  {
    key: 'generic_res_generic_database',
    name: 'Banco de Dados Genérico',
    provider: 'generic',
    category: 'database',
    brandColor: '#3B82F6',
    defaultResourceType: 'aws_dynamodb_table',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Repositório de dados agnóstico a fabricante para persistência transacional e analítica',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="10" width="40" height="44" rx="4" stroke="#3B82F6" stroke-width="3" fill="#3B82F6" fill-opacity="0.12"/>
      <line x1="12" y1="24" x2="52" y2="24" stroke="#3B82F6" stroke-width="2.5"/>
      <line x1="12" y1="38" x2="52" y2="38" stroke="#3B82F6" stroke-width="2.5"/>
      <circle cx="20" cy="17" r="2.5" fill="#3B82F6"/>
      <circle cx="20" cy="31" r="2.5" fill="#3B82F6"/>
      <circle cx="20" cy="45" r="2.5" fill="#3B82F6"/>
      <line x1="28" y1="17" x2="44" y2="17" stroke="#3B82F6" stroke-width="2" stroke-linecap="round"/>
      <line x1="28" y1="31" x2="44" y2="31" stroke="#3B82F6" stroke-width="2" stroke-linecap="round"/>
      <line x1="28" y1="45" x2="44" y2="45" stroke="#3B82F6" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
  },

  // 23. Globe (from Res_Globe_48_Light.png)
  {
    key: 'generic_res_globe',
    name: 'Rede Global / Internet',
    provider: 'generic',
    category: 'networking',
    brandColor: '#0EA5E9',
    defaultResourceType: 'aws_route53_zone',
    defaultSpecs: { count: 1, region: 'global' },
    description: 'Topologia global de rede internacional, borda Anycast e tráfego de usuários ao redor do mundo',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="22" stroke="#0EA5E9" stroke-width="3" fill="#0EA5E9" fill-opacity="0.12"/>
      <ellipse cx="32" cy="32" rx="11" ry="22" stroke="#0EA5E9" stroke-width="2.5" fill="none"/>
      <line x1="10" y1="32" x2="54" y2="32" stroke="#0EA5E9" stroke-width="2.5"/>
      <line x1="14" y1="21" x2="50" y2="21" stroke="#0EA5E9" stroke-width="2"/>
      <line x1="14" y1="43" x2="50" y2="43" stroke="#0EA5E9" stroke-width="2"/>
    </svg>`,
  },

  // 24. Internet (from Res_Internet_48_Light.png)
  {
    key: 'generic_res_internet',
    name: 'Internet Pública',
    provider: 'generic',
    category: 'networking',
    brandColor: '#0284C7',
    defaultResourceType: 'aws_internet_gateway',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Zona de internet pública externa com tráfego não confiável e acesso aberto a serviços da nuvem',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 46H44C49.5 46 54 41.5 54 36C54 30.9 50.1 26.8 45.2 26.1C44.4 18.8 38.3 13 30.8 13C23.9 13 18.2 18 16.8 24.6C11.9 25.6 8 30 8 35.2C8 41.2 12.8 46 18.8 46" stroke="#0284C7" stroke-width="3" stroke-linecap="round" fill="#0284C7" fill-opacity="0.15"/>
      <line x1="32" y1="46" x2="32" y2="56" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/>
      <line x1="24" y1="56" x2="40" y2="56" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },

  // 25. Internet Gateway (from Res_Internet-Gateway_48_Light.png)
  {
    key: 'generic_res_internet_gateway',
    name: 'Internet Gateway (IGW)',
    provider: 'generic',
    category: 'networking',
    brandColor: '#2563EB',
    defaultResourceType: 'aws_internet_gateway',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Componente de borda VPC que permite comunicação bidirecional entre recursos em sub-redes públicas e a internet',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="14" width="48" height="36" rx="4" stroke="#2563EB" stroke-width="3" fill="#2563EB" fill-opacity="0.12"/>
      <path d="M16 32H48M48 32L40 24M48 32L40 40" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M48 32H16M16 32L24 24M16 32L24 40" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },

  // 26. Laptop (from Res_Laptop_48_Light.png)
  {
    key: 'generic_res_laptop',
    name: 'Notebook / Computador Portátil',
    provider: 'generic',
    category: 'compute',
    brandColor: '#475569',
    defaultResourceType: 'aws_workspaces_workspace',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Dispositivo portátil de desenvolvedor ou usuário final acessando a arquitetura via navegador ou VPN',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="14" width="36" height="26" rx="3" stroke="#475569" stroke-width="3" fill="#475569" fill-opacity="0.12"/>
      <line x1="14" y1="34" x2="50" y2="34" stroke="#475569" stroke-width="2"/>
      <path d="M6 46H58L54 50H10L6 46Z" stroke="#475569" stroke-width="3" stroke-linejoin="round" fill="#475569" fill-opacity="0.3"/>
      <rect x="28" y="46" width="8" height="2" rx="1" fill="white"/>
    </svg>`,
  },

  // 27. Lock (from Res_Lock_48_Light.png)
  {
    key: 'generic_res_lock',
    name: 'Criptografia / Chave de Segurança',
    provider: 'generic',
    category: 'security',
    brandColor: '#D97706',
    defaultResourceType: 'aws_kms_key',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Mecanismo de trava de segurança, cifragem de dados em repouso e restrição de acesso por privilégios',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="24" width="36" height="30" rx="4" stroke="#D97706" stroke-width="3" fill="#D97706" fill-opacity="0.15"/>
      <path d="M22 24V16C22 10.5 26.5 6 32 6C37.5 6 42 10.5 42 16V24" stroke="#D97706" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="32" cy="37" r="3" fill="#D97706"/>
      <line x1="32" y1="40" x2="32" y2="45" stroke="#D97706" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },

  // 28. Magnifying Glass (from Res_Magnifying-Glass_48_Light.png)
  {
    key: 'generic_res_magnifying_glass',
    name: 'Busca & Auditoria',
    provider: 'generic',
    category: 'analytics',
    brandColor: '#4F46E5',
    defaultResourceType: 'aws_cloudwatch_log_metric_filter',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Motor de indexação, pesquisa full-text de logs, auditoria contínua e rastreamento forense de eventos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="16" stroke="#4F46E5" stroke-width="3.5" fill="#4F46E5" fill-opacity="0.12"/>
      <line x1="40" y1="40" x2="54" y2="54" stroke="#4F46E5" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="24" cy="24" r="5" stroke="#4F46E5" stroke-width="2" fill="none"/>
    </svg>`,
  },

  // 29. Marketplace (from Res_Marketplace_48_Light.png)
  {
    key: 'generic_res_marketplace',
    name: 'Marketplace de Soluções',
    provider: 'generic',
    category: 'devops',
    brandColor: '#EC4899',
    defaultResourceType: 'aws_ami_copy',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Catálogo de soluções de terceiros, imagens prontas pré-configuradas e produtos de software comercial',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 22L12 10H52L56 22V24C56 26.2 54.2 28 52 28C49.8 28 48 26.2 48 24C48 26.2 46.2 28 44 28C41.8 28 40 26.2 40 24C40 26.2 38.2 28 36 28C33.8 28 32 26.2 32 24C32 26.2 30.2 28 28 28C25.8 28 24 26.2 24 24C24 26.2 22.2 28 20 28C17.8 28 16 26.2 16 24C16 26.2 14.2 28 12 28C9.8 28 8 26.2 8 24V22Z" stroke="#EC4899" stroke-width="3" stroke-linejoin="round" fill="#EC4899" fill-opacity="0.15"/>
      <rect x="12" y="28" width="40" height="26" stroke="#EC4899" stroke-width="3" fill="none"/>
      <rect x="26" y="38" width="12" height="16" stroke="#EC4899" stroke-width="2.5" fill="#EC4899" fill-opacity="0.2"/>
    </svg>`,
  },

  // 30. Mobile Client (from Res_Mobile-Client_48_Light.png)
  {
    key: 'generic_res_mobile_client',
    name: 'Cliente Mobile (App)',
    provider: 'generic',
    category: 'compute',
    brandColor: '#06B6D4',
    defaultResourceType: 'aws_amplify_app',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Dispositivo móvel (smartphone/tablet) executando aplicativo iOS, Android ou Web PWA',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="8" width="28" height="48" rx="5" stroke="#06B6D4" stroke-width="3" fill="#06B6D4" fill-opacity="0.12"/>
      <line x1="28" y1="13" x2="36" y2="13" stroke="#06B6D4" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="32" cy="50" r="2.5" fill="#06B6D4"/>
      <line x1="18" y1="44" x2="46" y2="44" stroke="#06B6D4" stroke-width="2"/>
      <line x1="18" y1="16" x2="46" y2="16" stroke="#06B6D4" stroke-width="2"/>
    </svg>`,
  },

  // 31. Multimedia (from Res_Multimedia_48_Light.png)
  {
    key: 'generic_res_multimedia',
    name: 'Multimídia & Streaming',
    provider: 'generic',
    category: 'integration',
    brandColor: '#A855F7',
    defaultResourceType: 'aws_mediaconvert_queue',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Processamento, transcodificação e distribuição de áudio, vídeo sob demanda (VOD) e transmissões ao vivo',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="12" width="48" height="40" rx="6" stroke="#A855F7" stroke-width="3" fill="#A855F7" fill-opacity="0.12"/>
      <path d="M26 24L42 32L26 40V24Z" stroke="#A855F7" stroke-width="3" stroke-linejoin="round" fill="#A855F7"/>
    </svg>`,
  },

  // 32. Office Building (from Res_Office-Building_48_Light.png)
  {
    key: 'generic_res_office_building',
    name: 'Edifício Corporativo / Escritório',
    provider: 'generic',
    category: 'networking',
    brandColor: '#334155',
    defaultResourceType: 'aws_vpn_connection',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Sede da empresa, filial ou prédio corporativo com conexão segura via VPN ou Direct Connect',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="10" width="32" height="46" rx="2" stroke="#334155" stroke-width="3" fill="#334155" fill-opacity="0.12"/>
      <rect x="22" y="16" width="6" height="6" rx="1" fill="#334155"/>
      <rect x="36" y="16" width="6" height="6" rx="1" fill="#334155"/>
      <rect x="22" y="26" width="6" height="6" rx="1" fill="#334155"/>
      <rect x="36" y="26" width="6" height="6" rx="1" fill="#334155"/>
      <rect x="22" y="36" width="6" height="6" rx="1" fill="#334155"/>
      <rect x="36" y="36" width="6" height="6" rx="1" fill="#334155"/>
      <rect x="28" y="46" width="8" height="10" stroke="#334155" stroke-width="2" fill="none"/>
    </svg>`,
  },

  // 33. Pipeline (from Res_Pipeline_48_Light.png)
  {
    key: 'generic_res_pipeline',
    name: 'Pipeline CI/CD',
    provider: 'generic',
    category: 'devops',
    brandColor: '#059669',
    defaultResourceType: 'aws_codepipeline',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Esteira de integração e entrega contínua com etapas automatizadas de compilação, testes e deploy',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="32" r="7" stroke="#059669" stroke-width="3" fill="#059669" fill-opacity="0.2"/>
      <circle cx="32" cy="32" r="7" stroke="#059669" stroke-width="3" fill="#059669" fill-opacity="0.2"/>
      <circle cx="48" cy="32" r="7" stroke="#059669" stroke-width="3" fill="#059669" fill-opacity="0.2"/>
      <line x1="23" y1="32" x2="25" y2="32" stroke="#059669" stroke-width="3"/>
      <line x1="39" y1="32" x2="41" y2="32" stroke="#059669" stroke-width="3"/>
      <path d="M16 20V12H48V20" stroke="#059669" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M16 44V52H48V44" stroke="#059669" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },

  // 34. Programming Language (from Res_Programming-Language_48_Light.png)
  {
    key: 'generic_res_programming_language',
    name: 'Linguagem / Runtime de Código',
    provider: 'generic',
    category: 'devops',
    brandColor: '#EA580C',
    defaultResourceType: 'aws_lambda_layer_version',
    defaultSpecs: { runtime: 'nodejs20.x', region: 'us-east-1' },
    description: 'Ambiente de execução de código (Node.js, Python, Go, Java, Rust) para microsserviços e funções',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 20L10 32L22 44" stroke="#EA580C" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M42 20L54 32L42 44" stroke="#EA580C" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="36" y1="14" x2="28" y2="50" stroke="#EA580C" stroke-width="3.5" stroke-linecap="round"/>
    </svg>`,
  },

  // 35. Question (from Res_Question_48_Light.png)
  {
    key: 'generic_res_question',
    name: 'Dúvidas & Ajuda',
    provider: 'generic',
    category: 'integration',
    brandColor: '#6366F1',
    defaultResourceType: 'aws_ssm_document',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Central de ajuda, base de conhecimento, suporte técnico e documentação de perguntas frequentes (FAQ)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="22" stroke="#6366F1" stroke-width="3.5" fill="#6366F1" fill-opacity="0.12"/>
      <path d="M26 24C26 20.7 28.7 18 32 18C35.3 18 38 20.7 38 24C38 27.3 35.3 29 32 31V37" stroke="#6366F1" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="32" cy="44" r="2.5" fill="#6366F1"/>
    </svg>`,
  },

  // 36. Recover (from Res_Recover_48_Light.png)
  {
    key: 'generic_res_recover',
    name: 'Recuperação de Desastres (DR)',
    provider: 'generic',
    category: 'storage',
    brandColor: '#10B981',
    defaultResourceType: 'aws_backup_vault',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Estratégia de Disaster Recovery (DR), restauração a partir de réplicas e failover geográfico',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 32C16 23.2 23.2 16 32 16C39.5 16 45.8 21.2 47.5 28" stroke="#10B981" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M48 32C48 40.8 40.8 48 32 48C24.5 48 18.2 42.8 16.5 36" stroke="#10B981" stroke-width="3.5" stroke-linecap="round"/>
      <polyline points="42 28 48 28 48 22" stroke="#10B981" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="22 36 16 36 16 42" stroke="#10B981" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="32" cy="32" r="5" fill="#10B981"/>
    </svg>`,
  },

  // 37. Router (from Res_Router_48_Light.png)
  {
    key: 'generic_res_router',
    name: 'Roteador de Rede / Gateway',
    provider: 'generic',
    category: 'networking',
    brandColor: '#2563EB',
    defaultResourceType: 'aws_ec2_transit_gateway',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Equipamento de roteamento L3, comutação de pacotes e interconexão de redes locais e nuvens privadas',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="22" width="48" height="20" rx="3" stroke="#2563EB" stroke-width="3" fill="#2563EB" fill-opacity="0.15"/>
      <line x1="16" y1="22" x2="16" y2="12" stroke="#2563EB" stroke-width="3" stroke-linecap="round"/>
      <line x1="48" y1="22" x2="48" y2="12" stroke="#2563EB" stroke-width="3" stroke-linecap="round"/>
      <circle cx="16" cy="12" r="2" fill="#2563EB"/>
      <circle cx="48" cy="12" r="2" fill="#2563EB"/>
      <circle cx="20" cy="32" r="2" fill="#2563EB"/>
      <circle cx="28" cy="32" r="2" fill="#2563EB"/>
      <circle cx="36" cy="32" r="2" fill="#2563EB"/>
      <circle cx="44" cy="32" r="2" fill="#2563EB"/>
    </svg>`,
  },

  // 38. SAML Token (from Res_Saml-Token_48_Light.png)
  {
    key: 'generic_res_saml_token',
    name: 'Token SAML / SSO',
    provider: 'generic',
    category: 'security',
    brandColor: '#7C3AED',
    defaultResourceType: 'aws_iam_saml_provider',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Asserção de segurança SAML 2.0 para federação de identidades corporativas e Single Sign-On (SSO)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 18L32 8L52 18V36C52 46 43 54 32 58C21 54 12 46 12 36V18Z" stroke="#7C3AED" stroke-width="3" stroke-linejoin="round" fill="#7C3AED" fill-opacity="0.12"/>
      <text x="32" y="37" text-anchor="middle" font-size="11" font-weight="900" fill="#7C3AED" font-family="sans-serif">SAML</text>
    </svg>`,
  },

  // 39. Server (from Res_Server_48_Light.png)
  {
    key: 'generic_res_server',
    name: 'Servidor Físico / Host Dedicado',
    provider: 'generic',
    category: 'compute',
    brandColor: '#334155',
    defaultResourceType: 'aws_instance',
    defaultSpecs: { count: 1, instanceType: 'm6i.large', region: 'us-east-1' },
    description: 'Servidor individual bare-metal ou unidade de computação dedicada montada em rack',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="44" height="24" rx="3" stroke="#334155" stroke-width="3" fill="#334155" fill-opacity="0.15"/>
      <line x1="10" y1="32" x2="54" y2="32" stroke="#334155" stroke-width="2"/>
      <circle cx="18" cy="26" r="2" fill="#10B981"/>
      <circle cx="26" cy="26" r="2" fill="#334155"/>
      <line x1="34" y1="26" x2="48" y2="26" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="18" cy="38" r="2" fill="#10B981"/>
      <circle cx="26" cy="38" r="2" fill="#334155"/>
      <line x1="34" y1="38" x2="48" y2="38" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },

  // 40. Servers (from Res_Servers_48_Light.png)
  {
    key: 'generic_res_servers',
    name: 'Cluster de Servidores (Rack)',
    provider: 'generic',
    category: 'compute',
    brandColor: '#1E293B',
    defaultResourceType: 'aws_autoscaling_group',
    defaultSpecs: { count: 3, desiredCapacity: 3, region: 'us-east-1' },
    description: 'Frota agregada de servidores redundantes em cluster com balanceamento e tolerância a falhas',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="10" width="40" height="12" rx="2" stroke="#1E293B" stroke-width="2.5" fill="#1E293B" fill-opacity="0.12"/>
      <circle cx="18" cy="16" r="1.5" fill="#10B981"/>
      <line x1="26" y1="16" x2="44" y2="16" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
      <rect x="12" y="26" width="40" height="12" rx="2" stroke="#1E293B" stroke-width="2.5" fill="#1E293B" fill-opacity="0.12"/>
      <circle cx="18" cy="32" r="1.5" fill="#10B981"/>
      <line x1="26" y1="32" x2="44" y2="32" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
      <rect x="12" y="42" width="40" height="12" rx="2" stroke="#1E293B" stroke-width="2.5" fill="#1E293B" fill-opacity="0.12"/>
      <circle cx="18" cy="48" r="1.5" fill="#10B981"/>
      <line x1="26" y1="48" x2="44" y2="48" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
  },

  // 41. Shield (from Res_Shield_48_Light.png)
  {
    key: 'generic_res_shield',
    name: 'Proteção Anti-DDoS / Shield',
    provider: 'generic',
    category: 'security',
    brandColor: '#E11D48',
    defaultResourceType: 'aws_shield_protection',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Mitigação gerenciada contra ataques de negação de serviço distribuído (DDoS) nas camadas L3/L4/L7',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8L50 16V32C50 43 42.5 51 32 56C21.5 51 14 43 14 32V16L32 8Z" stroke="#E11D48" stroke-width="3" stroke-linejoin="round" fill="#E11D48" fill-opacity="0.15"/>
      <path d="M32 18V45" stroke="#E11D48" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M22 28L32 36L42 28" stroke="#E11D48" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },

  // 42. Source Code (from Res_Source-Code_48_Light.png)
  {
    key: 'generic_res_source_code',
    name: 'Repositório de Código / Git',
    provider: 'generic',
    category: 'devops',
    brandColor: '#F97316',
    defaultResourceType: 'aws_codecommit_repository',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Repositório Git versionado, rastreamento de branches, pull requests e histórico de commits de software',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="18" r="5" stroke="#F97316" stroke-width="3" fill="#F97316" fill-opacity="0.2"/>
      <circle cx="22" cy="46" r="5" stroke="#F97316" stroke-width="3" fill="#F97316" fill-opacity="0.2"/>
      <circle cx="44" cy="30" r="5" stroke="#F97316" stroke-width="3" fill="#F97316" fill-opacity="0.2"/>
      <line x1="22" y1="23" x2="22" y2="41" stroke="#F97316" stroke-width="3"/>
      <path d="M22 36C30 36 36 34 40 32" stroke="#F97316" stroke-width="3" fill="none"/>
    </svg>`,
  },

  // 43. SSL Padlock (from Res_SSL-Padlock_48_Light.png)
  {
    key: 'generic_res_ssl_padlock',
    name: 'Cadeado SSL / TLS Seguro',
    provider: 'generic',
    category: 'security',
    brandColor: '#16A34A',
    defaultResourceType: 'aws_acm_certificate',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Criptografia em trânsito de ponta a ponta via certificados seguros HTTPS, TLS e mTLS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="26" width="36" height="28" rx="5" stroke="#16A34A" stroke-width="3" fill="#16A34A" fill-opacity="0.15"/>
      <path d="M22 26V18C22 12.5 26.5 8 32 8C37.5 8 42 12.5 42 18V26" stroke="#16A34A" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M26 40L30 44L38 36" stroke="#16A34A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },

  // 44. Tape Storage (from Res_Tape-Storage_48_Light.png)
  {
    key: 'generic_res_tape_storage',
    name: 'Fita Magnética (Tape Storage)',
    provider: 'generic',
    category: 'storage',
    brandColor: '#475569',
    defaultResourceType: 'aws_storagegateway_gateway',
    defaultSpecs: { storageGb: 2000, region: 'us-east-1' },
    description: 'Armazenamento físico ou virtual em fita magnética para custódia imutável (WORM) e compliance legal',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="14" width="44" height="36" rx="4" stroke="#475569" stroke-width="3" fill="#475569" fill-opacity="0.15"/>
      <circle cx="22" cy="32" r="6" stroke="#475569" stroke-width="2.5" fill="none"/>
      <circle cx="22" cy="32" r="2.5" fill="#475569"/>
      <circle cx="42" cy="32" r="6" stroke="#475569" stroke-width="2.5" fill="none"/>
      <circle cx="42" cy="32" r="2.5" fill="#475569"/>
      <line x1="22" y1="38" x2="42" y2="38" stroke="#475569" stroke-width="2"/>
    </svg>`,
  },

  // 45. Terminal (from Res_Terminal_48_Light.png)
  {
    key: 'generic_res_terminal',
    name: 'Terminal CLI / Shell',
    provider: 'generic',
    category: 'devops',
    brandColor: '#0F172A',
    defaultResourceType: 'aws_ssm_activation',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Interface de linha de comando (CLI), sessão interativa de terminal Bash/PowerShell e execução remota',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="12" width="48" height="40" rx="4" stroke="#0F172A" stroke-width="3" fill="#0F172A" fill-opacity="0.15"/>
      <path d="M16 24L24 32L16 40" stroke="#0F172A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="28" y1="40" x2="38" y2="40" stroke="#0F172A" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },

  // 46. Toolkit (from Res_Toolkit_48_Light.png)
  {
    key: 'generic_res_toolkit',
    name: 'Kit de Ferramentas / SDK',
    provider: 'generic',
    category: 'devops',
    brandColor: '#7C3AED',
    defaultResourceType: 'aws_cloudformation_stack',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Kit de desenvolvimento (SDK), utilitários de provisionamento automatizado e bibliotecas de suporte',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="44" height="34" rx="4" stroke="#7C3AED" stroke-width="3" fill="#7C3AED" fill-opacity="0.15"/>
      <path d="M24 20V12C24 10.9 24.9 10 26 10H38C39.1 10 40 10.9 40 12V20" stroke="#7C3AED" stroke-width="3"/>
      <line x1="10" y1="32" x2="54" y2="32" stroke="#7C3AED" stroke-width="2.5"/>
      <rect x="28" y="30" width="8" height="6" rx="1" fill="#7C3AED"/>
    </svg>`,
  },

  // 47. Traditional Server (from Res_Traditional-Server_48_Light.png)
  {
    key: 'generic_res_traditional_server',
    name: 'Servidor Torre Tradicional',
    provider: 'generic',
    category: 'compute',
    brandColor: '#334155',
    defaultResourceType: 'aws_opsworks_custom_layer',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Gabinete de servidor torre tradicional de computação local para sistemas operacionais legados',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="10" width="32" height="46" rx="3" stroke="#334155" stroke-width="3" fill="#334155" fill-opacity="0.15"/>
      <line x1="22" y1="18" x2="42" y2="18" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="22" y1="24" x2="42" y2="24" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="24" cy="46" r="2" fill="#10B981"/>
      <circle cx="32" cy="46" r="2" fill="#334155"/>
      <circle cx="40" cy="46" r="2" fill="#334155"/>
    </svg>`,
  },

  // 48. Users (from Res_Users_48_Light.png)
  {
    key: 'generic_res_users',
    name: 'Grupo de Usuários / Clientes',
    provider: 'generic',
    category: 'security',
    brandColor: '#8B5CF6',
    defaultResourceType: 'aws_iam_group',
    defaultSpecs: { count: 5, region: 'us-east-1' },
    description: 'Audiência de usuários finais, grupo de permissões IAM ou público-alvo de acessos concorrentes',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="22" r="7" stroke="#8B5CF6" stroke-width="2.5" fill="#8B5CF6" fill-opacity="0.2"/>
      <path d="M10 44C10 36 15 33 24 33C33 33 38 36 38 44" stroke="#8B5CF6" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="42" cy="20" r="6" stroke="#8B5CF6" stroke-width="2" fill="#8B5CF6" fill-opacity="0.15"/>
      <path d="M33 39C35 34 38 32 44 32C50 32 54 35 54 41" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
  }
];
