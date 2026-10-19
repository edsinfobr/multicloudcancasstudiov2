import { CloudIconDefinition } from '../types';

export const AWS_SECURITY_ICONS: CloudIconDefinition[] = [
  // 1. Amazon Inspector Agent
  {
    key: 'aws_inspector_agent',
    name: 'Amazon Inspector Agent',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_inspector2_enabler',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Agente e varredura automatizada contínua de vulnerabilidades de software e exposição em instâncias e imagens',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Outer Magnifying Glass Ring -->
      <circle cx="28" cy="27" r="17" stroke="#DD344C" stroke-width="3" fill="none"/>
      <!-- Inner Ring -->
      <circle cx="28" cy="27" r="13.5" stroke="#DD344C" stroke-width="1.5" fill="none"/>
      <!-- Handle -->
      <path d="M40 39L53 52" stroke="#DD344C" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Bug Core inside lens -->
      <circle cx="28" cy="27" r="5" stroke="#DD344C" stroke-width="2" fill="none"/>
      <!-- Bug legs & antennae -->
      <line x1="28" y1="18" x2="28" y2="22" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="20" x2="24.5" y2="23" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
      <line x1="19" y1="29" x2="23" y2="28" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
      <line x1="37" y1="26" x2="33" y2="27" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
      <line x1="34" y1="33" x2="31.5" y2="30.5" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="33" x2="24.5" y2="30.5" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },

  // 2. AWS Certificate Manager Certificate Authority
  {
    key: 'aws_acm_certificate_authority',
    name: 'ACM Certificate Authority',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_acmpca_certificate_authority',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Autoridade de Certificação privada gerenciada (AWS Private CA) para emissão de certificados X.509',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Browser/Certificate Frame -->
      <rect x="10" y="12" width="44" height="40" rx="3" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <line x1="10" y1="20" x2="54" y2="20" stroke="#DD344C" stroke-width="2"/>
      <circle cx="15" cy="16" r="1.5" fill="#DD344C"/>
      <circle cx="20" cy="16" r="1.5" fill="#DD344C"/>
      <circle cx="25" cy="16" r="1.5" fill="#DD344C"/>
      <!-- Seal Ribbon Badge -->
      <circle cx="32" cy="33" r="8.5" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <!-- Checkmark -->
      <path d="M28.5 33L31 35.5L36 30" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Ribbon Tails below badge -->
      <path d="M28 41.5V47L32 44.5L36 47V41.5" stroke="#DD344C" stroke-width="2" stroke-linejoin="round" fill="none"/>
    </svg>`
  },

  // 3. AWS Directory Service AD Connector
  {
    key: 'aws_directory_service_ad_connector',
    name: 'AWS AD Connector',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_directory_service_directory',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Gateway proxy para conectar serviços e instâncias da nuvem AWS ao Active Directory corporativo on-premises',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Triangle -->
      <path d="M26 12L7 45H32" stroke="#DD344C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M26 12L39 34" stroke="#DD344C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <!-- Horizontal Connecting Line -->
      <line x1="20" y1="39" x2="42" y2="39" stroke="#DD344C" stroke-width="3"/>
      <!-- Plug Connector Circle -->
      <circle cx="45" cy="39" r="10" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <!-- Plug Shape -->
      <path d="M42 35V43H46V35H42Z" stroke="#DD344C" stroke-width="2" fill="#DD344C"/>
      <line x1="49" y1="36.5" x2="52" y2="36.5" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
      <line x1="49" y1="41.5" x2="52" y2="41.5" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },

  // 4. AWS Directory Service AWS Managed Microsoft AD
  {
    key: 'aws_directory_service_microsoft_ad',
    name: 'AWS Managed Microsoft AD',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_directory_service_directory',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Serviço de Active Directory corporativo Microsoft real totalmente gerenciado e com suporte a relações de confiança',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Triangle on left -->
      <path d="M27 12L8 46H32" stroke="#DD344C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M27 12L38 31" stroke="#DD344C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <!-- Database Cylinder on right -->
      <rect x="34" y="32" width="20" height="20" rx="10" fill="#12141A" fill-opacity="0.9"/>
      <ellipse cx="44" cy="32" rx="10" ry="4.5" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <path d="M34 32V47C34 49.5 38.5 51.5 44 51.5C49.5 51.5 54 49.5 54 47V32" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <!-- Text MS -->
      <text x="44" y="44" fill="#DD344C" font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle" dominant-baseline="middle">MS</text>
    </svg>`
  },

  // 5. AWS Directory Service Simple AD
  {
    key: 'aws_directory_service_simple_ad',
    name: 'AWS Simple AD',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_directory_service_directory',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Diretório gerenciado leve compatível com Samba 4 para autenticação e gerenciamento de domínios básicos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Triangle on left -->
      <path d="M27 12L8 46H32" stroke="#DD344C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M27 12L38 31" stroke="#DD344C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <!-- Database Cylinder on right -->
      <rect x="34" y="32" width="20" height="20" rx="10" fill="#12141A" fill-opacity="0.9"/>
      <ellipse cx="44" cy="32" rx="10" ry="4.5" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <path d="M34 32V47C34 49.5 38.5 51.5 44 51.5C49.5 51.5 54 49.5 54 47V32" stroke="#DD344C" stroke-width="2.5" fill="none"/>
    </svg>`
  },

  // 6. AWS IAM Add-on
  {
    key: 'aws_iam_addon',
    name: 'IAM Add-on',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_iam_policy',
    defaultSpecs: { count: 1 },
    description: 'Extensões de autorização, chaves e políticas adicionais de controle de acesso IAM',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Key Ring -->
      <circle cx="21" cy="32" r="9" stroke="#DD344C" stroke-width="3" fill="none"/>
      <circle cx="21" cy="32" r="3.5" stroke="#DD344C" stroke-width="2" fill="none"/>
      <!-- Key Shaft -->
      <path d="M30 32H51" stroke="#DD344C" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Key Teeth -->
      <path d="M43 32V38M49 32V39" stroke="#DD344C" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },

  // 7. AWS Identity and Access Management AWS STS
  {
    key: 'aws_iam_sts',
    name: 'AWS STS',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'data.aws_caller_identity',
    defaultSpecs: { count: 1 },
    description: 'Security Token Service para concessão de credenciais temporárias de segurança e delegação de funções',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Badge Card Border -->
      <rect x="15" y="11" width="34" height="42" rx="4" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <!-- Clock at top -->
      <circle cx="32" cy="22" r="6.5" stroke="#DD344C" stroke-width="2" fill="none"/>
      <path d="M32 18.5V22H35" stroke="#DD344C" stroke-width="1.8" stroke-linecap="round"/>
      <!-- STS Text -->
      <text x="32" y="42" fill="#DD344C" font-family="sans-serif" font-size="10.5" font-weight="bold" text-anchor="middle" letter-spacing="1">STS</text>
    </svg>`
  },

  // 8. AWS Identity and Access Management AWS STS Alternate
  {
    key: 'aws_iam_sts_alternate',
    name: 'AWS STS Alternate',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_iam_session_token',
    defaultSpecs: { count: 1 },
    description: 'Credencial tokenizada temporária de autenticação e assunção de papéis federados no STS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Horizontal Card Frame -->
      <rect x="9" y="16" width="46" height="32" rx="3" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <!-- Key inside frame -->
      <circle cx="23" cy="32" r="6" stroke="#DD344C" stroke-width="2" fill="none"/>
      <circle cx="23" cy="32" r="2.5" stroke="#DD344C" stroke-width="1.5" fill="none"/>
      <line x1="29" y1="32" x2="44" y2="32" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="37" y1="32" x2="37" y2="36" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
      <line x1="42" y1="32" x2="42" y2="37" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },

  // 9. AWS Identity and Access Management Data Encryption Key
  {
    key: 'aws_iam_data_encryption_key',
    name: 'Data Encryption Key (DEK)',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_kms_key',
    defaultSpecs: { count: 1 },
    description: 'Chave de criptografia de dados simétrica para envelopes de segurança criptográficos (Envelope Encryption)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Card Container -->
      <rect x="14" y="11" width="36" height="42" rx="3" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <!-- Top Key -->
      <circle cx="25" cy="23" r="4.5" stroke="#DD344C" stroke-width="2" fill="none"/>
      <line x1="25" y1="27.5" x2="25" y2="36" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
      <line x1="25" y1="32" x2="28" y2="32" stroke="#DD344C" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="25" y1="35" x2="28" y2="35" stroke="#DD344C" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Padlock on bottom right -->
      <rect x="30" y="32" width="13" height="11" rx="2" stroke="#DD344C" stroke-width="2" fill="none"/>
      <path d="M33.5 32V29C33.5 27.5 35 26.5 36.5 26.5C38 26.5 39.5 27.5 39.5 29V32" stroke="#DD344C" stroke-width="2"/>
      <circle cx="36.5" cy="37" r="1.2" fill="#DD344C"/>
    </svg>`
  },

  // 10. AWS Identity and Access Management Encrypted Data
  {
    key: 'aws_iam_encrypted_data',
    name: 'IAM Encrypted Data',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_s3_bucket_server_side_encryption_configuration',
    defaultSpecs: { count: 1 },
    description: 'Documento e dados confidenciais protegidos por criptografia de dados em repouso e políticas IAM',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Document with corner fold -->
      <path d="M16 11H38L48 21V51C48 52.5 46.5 54 45 54H16C14.5 54 13 52.5 13 51V14C13 12.5 14.5 11 16 11Z" 
            stroke="#DD344C" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
      <path d="M38 11V21H48" stroke="#DD344C" stroke-width="2" stroke-linejoin="round"/>
      <!-- Padlock in center -->
      <rect x="23" y="30" width="18" height="15" rx="2" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <path d="M27.5 30V25C27.5 22.5 29.5 20.5 32 20.5C34.5 20.5 36.5 22.5 36.5 25V30" stroke="#DD344C" stroke-width="2.5"/>
      <circle cx="32" cy="37" r="1.8" fill="#DD344C"/>
    </svg>`
  },

  // 11. AWS Identity and Access Management IAM Access Analyzer
  {
    key: 'aws_iam_access_analyzer',
    name: 'IAM Access Analyzer',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_accessanalyzer_analyzer',
    defaultSpecs: { count: 1 },
    description: 'Análise automatizada de políticas e verificação matemática de acessos externos e de privilégio mínimo',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Square Node on Left -->
      <rect x="8" y="27" width="12" height="12" stroke="#DD344C" stroke-width="3" fill="none"/>
      <!-- Dashed Horizontal Connection -->
      <line x1="24" y1="33" x2="38" y2="33" stroke="#DD344C" stroke-width="3" stroke-dasharray="3 3"/>
      <!-- Triangle Node in Center -->
      <path d="M49 26L42 39H56L49 26Z" stroke="#DD344C" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
      <!-- Branch Lines Up and Down -->
      <path d="M14 27V15H46" stroke="#DD344C" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="50" cy="15" r="4" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <path d="M14 39V51H46" stroke="#DD344C" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="50" cy="51" r="4" stroke="#DD344C" stroke-width="2.5" fill="none"/>
    </svg>`
  },

  // 12. AWS Identity and Access Management IAM Roles Anywhere
  {
    key: 'aws_iam_roles_anywhere',
    name: 'IAM Roles Anywhere',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_rolesanywhere_profile',
    defaultSpecs: { count: 1 },
    description: 'Extensão de credenciais temporárias do IAM para servidores e workloads corporativos fora da nuvem AWS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Facility Building on Left -->
      <path d="M11 53V13H36V35" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <!-- Windows on Building -->
      <rect x="17" y="19" width="5" height="5" stroke="#DD344C" stroke-width="2" fill="none"/>
      <rect x="26" y="19" width="5" height="5" stroke="#DD344C" stroke-width="2" fill="none"/>
      <rect x="17" y="28" width="5" height="5" stroke="#DD344C" stroke-width="2" fill="none"/>
      <rect x="26" y="28" width="5" height="5" stroke="#DD344C" stroke-width="2" fill="none"/>
      <!-- Opaque Backdrop for Hat -->
      <path d="M21 46C21 37 32 35 44 35C53 35 57 41 57 46V53H21V46Z" fill="#12141A" fill-opacity="0.9"/>
      <!-- Safety Hard Hat on Right Foreground -->
      <path d="M23 48C24 40 33 36 43 36C52 36 55 42 55 48" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M18 51C20 48 27 48 30 48H52C55 48 57 51 57 51" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // 13. AWS Identity and Access Management Long-Term Security Credential
  {
    key: 'aws_iam_long_term_credential',
    name: 'Long-Term Security Credential',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_iam_access_key',
    defaultSpecs: { count: 1 },
    description: 'Chaves permanentes de acesso estático para usuários e chamadas diretas de CLI/SDKs',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Top Key -->
      <circle cx="21" cy="22" r="5" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <circle cx="21" cy="22" r="2" stroke="#DD344C" stroke-width="1.5" fill="none"/>
      <line x1="26" y1="22" x2="49" y2="22" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="39" y1="22" x2="39" y2="26" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
      <line x1="45" y1="22" x2="45" y2="27" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
      <!-- Bottom Key -->
      <circle cx="15" cy="38" r="5" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <circle cx="15" cy="38" r="2" stroke="#DD344C" stroke-width="1.5" fill="none"/>
      <line x1="20" y1="38" x2="43" y2="38" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="33" y1="38" x2="33" y2="42" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
      <line x1="39" y1="38" x2="39" y2="43" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
      <!-- Base Shelf/Tray -->
      <path d="M10 47H54V52" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </svg>`
  },

  // 14. AWS Identity and Access Management MFA Token
  {
    key: 'aws_iam_mfa_token',
    name: 'IAM MFA Token',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_iam_virtual_mfa_device',
    defaultSpecs: { count: 1 },
    description: 'Dispositivo e token de autenticação multifator (MFA) para proteção reforçada de credenciais',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Outer Ring Token -->
      <circle cx="32" cy="32" r="22" stroke="#DD344C" stroke-width="3" fill="none"/>
      <!-- Text MFA -->
      <text x="32" y="36" fill="#DD344C" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" letter-spacing="1">MFA</text>
    </svg>`
  },

  // 15. AWS Identity and Access Management Permissions
  {
    key: 'aws_iam_permissions',
    name: 'IAM Permissions',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_iam_policy',
    defaultSpecs: { count: 1 },
    description: 'Declarações e permissões explícitas de concessão e negação de acesso (Allow/Deny)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Checklist Sheet Frame -->
      <rect x="15" y="11" width="34" height="42" rx="3" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <!-- First Checkmark -->
      <path d="M22 21L27 26L38 18" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Second Checkmark -->
      <path d="M22 33L27 38L38 30" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Cross / Deny mark -->
      <path d="M24 44L34 50M34 44L24 50" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // 16. AWS Identity and Access Management Role
  {
    key: 'aws_iam_role_badge',
    name: 'IAM Role',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_iam_role',
    defaultSpecs: { count: 1 },
    description: 'Função e identidade IAM com permissões associadas que pode ser assumida temporariamente por entidades confiáveis',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Hard Hat Dome -->
      <path d="M14 42C15 26 28 20 42 20C55 20 58 29 58 42" stroke="#DD344C" stroke-width="3" stroke-linecap="round" fill="none"/>
      <!-- Helmet Visor / Rim -->
      <path d="M9 46C14 41 22 41 28 41H54C58 41 61 46 61 46" stroke="#DD344C" stroke-width="3" stroke-linecap="round"/>
      <!-- Helmet Badge / Lamp fixture -->
      <rect x="46" y="34" width="7" height="4" rx="1" stroke="#DD344C" stroke-width="2" fill="none"/>
    </svg>`
  },

  // 17. AWS Identity and Access Management Temporary Security Credential
  {
    key: 'aws_iam_temporary_credential',
    name: 'Temporary Security Credential',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_iam_session_token',
    defaultSpecs: { count: 1 },
    description: 'Chaves temporárias efêmeras com tempo de expiração determinado via AWS STS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Top Key -->
      <circle cx="21" cy="20" r="5" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <circle cx="21" cy="20" r="2" stroke="#DD344C" stroke-width="1.5" fill="none"/>
      <line x1="26" y1="20" x2="49" y2="20" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="39" y1="20" x2="39" y2="24" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
      <line x1="45" y1="20" x2="45" y2="25" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
      <!-- Bottom Key -->
      <circle cx="15" cy="35" r="5" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <circle cx="15" cy="35" r="2" stroke="#DD344C" stroke-width="1.5" fill="none"/>
      <line x1="20" y1="35" x2="35" y2="35" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Tray -->
      <path d="M10 44H32" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Clock Icon on Bottom Right -->
      <circle cx="45" cy="42" r="9" stroke="#DD344C" stroke-width="2.5" fill="#12141A" fill-opacity="0.9"/>
      <path d="M45 37.5V42H48" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },

  // 18. AWS Key Management Service External Key Store
  {
    key: 'aws_kms_external_key_store',
    name: 'KMS External Key Store',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_kms_custom_key_store',
    defaultSpecs: { count: 1 },
    description: 'Armazenamento externo e integração de chaves KMS com HSMs on-premises fora da nuvem AWS (XKS)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Key on Left -->
      <circle cx="21" cy="23" r="8" stroke="#DD344C" stroke-width="3" fill="none"/>
      <circle cx="21" cy="23" r="3.5" stroke="#DD344C" stroke-width="2" fill="none"/>
      <path d="M18 31V49" stroke="#DD344C" stroke-width="3" stroke-linecap="round"/>
      <path d="M18 40H23M18 46H23" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
      <!-- 3-tier Server Rack on Right -->
      <rect x="33" y="20" width="22" height="7" rx="1.5" stroke="#DD344C" stroke-width="2" fill="none"/>
      <line x1="37" y1="23.5" x2="45" y2="23.5" stroke="#DD344C" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="50" cy="23.5" r="1" fill="#DD344C"/>
      
      <rect x="33" y="30" width="22" height="7" rx="1.5" stroke="#DD344C" stroke-width="2" fill="none"/>
      <line x1="37" y1="33.5" x2="45" y2="33.5" stroke="#DD344C" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="50" cy="33.5" r="1" fill="#DD344C"/>

      <rect x="33" y="40" width="22" height="7" rx="1.5" stroke="#DD344C" stroke-width="2" fill="none"/>
      <line x1="37" y1="43.5" x2="45" y2="43.5" stroke="#DD344C" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="50" cy="43.5" r="1" fill="#DD344C"/>
    </svg>`
  },

  // 19. AWS Network Firewall Endpoints
  {
    key: 'aws_network_firewall_endpoints',
    name: 'Network Firewall Endpoints',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_networkfirewall_firewall',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Pontos de extremidade de inspeção de pacotes com monitoramento de tráfego de entrada e saída na VPC',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Outer Circle Arc -->
      <path d="M12 26C14 17 22 10 32 10C42 10 50 17 52 26" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M12 38C14 47 22 54 32 54C42 54 50 47 52 38" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <!-- Arrows -->
      <path d="M14 32H7M11 29L7 32L11 35" stroke="#DD344C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M50 32H57M53 29L57 32L53 35" stroke="#DD344C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Firewall Brick Wall -->
      <rect x="20" y="27" width="24" height="15" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <line x1="20" y1="34" x2="44" y2="34" stroke="#DD344C" stroke-width="2"/>
      <line x1="32" y1="27" x2="32" y2="34" stroke="#DD344C" stroke-width="2"/>
      <line x1="26" y1="34" x2="26" y2="42" stroke="#DD344C" stroke-width="2"/>
      <line x1="38" y1="34" x2="38" y2="42" stroke="#DD344C" stroke-width="2"/>
      <!-- Flames on top -->
      <path d="M23 27C23 22 26 21 28 23C29 20 32 17 34 21C36 18 39 19 39 27" stroke="#DD344C" stroke-width="2" stroke-linecap="round" fill="none"/>
    </svg>`
  },

  // 20. AWS Security Hub Finding
  {
    key: 'aws_security_hub_finding',
    name: 'Security Hub Finding',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_securityhub_finding_aggregator',
    defaultSpecs: { count: 1 },
    description: 'Descobertas e alertas padronizados de conformidade e postura de segurança multi-contas no formato ASFF',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Shield Outer -->
      <path d="M30 11L14 17V33C14 43 21 50 30 54C32 53 34 52 36 50.5" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M30 11L46 17V30" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <!-- Shield Inner Border -->
      <path d="M30 16L18 21V33C18 41 23 46 30 49.5" stroke="#DD344C" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <path d="M30 16L42 21V28" stroke="#DD344C" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <!-- Center Vertical Divider -->
      <line x1="30" y1="16" x2="30" y2="49" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Exclamation Warning Badge at Bottom-Right -->
      <circle cx="45" cy="42" r="10" stroke="#DD344C" stroke-width="2.5" fill="#12141A" fill-opacity="0.9"/>
      <line x1="45" y1="36" x2="45" y2="42" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="45" cy="46" r="1.3" fill="#DD344C"/>
    </svg>`
  },

  // 21. AWS Shield AWS Shield Advanced
  {
    key: 'aws_shield_advanced',
    name: 'AWS Shield Advanced',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_shield_protection',
    defaultSpecs: { count: 1 },
    description: 'Proteção avançada contra ataques DDoS sofisticados nas camadas 3, 4 e 7 com suporte de resposta 24/7 (SRT)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Shield Outer -->
      <path d="M30 11L14 17V33C14 43 21 50 30 54C32 53 34 52 36 50.5" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M30 11L46 17V30" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <!-- Shield Inner Border -->
      <path d="M30 16L18 21V33C18 41 23 46 30 49.5" stroke="#DD344C" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <path d="M30 16L42 21V28" stroke="#DD344C" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <!-- Center Vertical Divider -->
      <line x1="30" y1="16" x2="30" y2="49" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Plus Badge at Bottom-Right -->
      <circle cx="45" cy="42" r="10" stroke="#DD344C" stroke-width="2.5" fill="#12141A" fill-opacity="0.9"/>
      <line x1="45" y1="37" x2="45" y2="47" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="40" y1="42" x2="50" y2="42" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // 22. AWS WAF Bad Bot
  {
    key: 'aws_waf_bad_bot',
    name: 'AWS WAF Bad Bot',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_wafv2_web_acl',
    defaultSpecs: { count: 1 },
    description: 'Detecção de scrapers, crawlers maliciosos e automações não autorizadas com mitigação no WAF',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Antenna -->
      <circle cx="32" cy="14" r="2.5" fill="#DD344C"/>
      <line x1="32" y1="16.5" x2="32" y2="23" stroke="#DD344C" stroke-width="2"/>
      <!-- Spider Bot Body -->
      <circle cx="32" cy="35" r="12" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <circle cx="32" cy="35" r="7" stroke="#DD344C" stroke-width="2" fill="none"/>
      <line x1="20" y1="35" x2="44" y2="35" stroke="#DD344C" stroke-width="2"/>
      <!-- Spider Legs (Left) -->
      <path d="M22 28L12 25H5" stroke="#DD344C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20 35H6" stroke="#DD344C" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M22 42L12 45H5" stroke="#DD344C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Spider Legs (Right) -->
      <path d="M42 28L52 25H59" stroke="#DD344C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M44 35H58" stroke="#DD344C" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M42 42L52 45H59" stroke="#DD344C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 23. AWS WAF Bot
  {
    key: 'aws_waf_bot',
    name: 'AWS WAF Bot',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_wafv2_web_acl',
    defaultSpecs: { count: 1 },
    description: 'Identificação de clientes automatizados, bots de mecanismos de busca e tráfego programático',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Antenna -->
      <circle cx="32" cy="13" r="3" fill="#DD344C"/>
      <line x1="32" y1="16" x2="32" y2="24" stroke="#DD344C" stroke-width="2.5"/>
      <path d="M26 24C26 20 38 20 38 24" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Robot Head Box -->
      <rect x="11" y="24" width="42" height="26" rx="4" stroke="#DD344C" stroke-width="3" fill="none"/>
      <!-- Robot Eyes -->
      <circle cx="23" cy="37" r="5" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <circle cx="41" cy="37" r="5" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <!-- Neck / Feet -->
      <line x1="22" y1="50" x2="22" y2="54" stroke="#DD344C" stroke-width="3" stroke-linecap="round"/>
      <line x1="42" y1="50" x2="42" y2="54" stroke="#DD344C" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },

  // 24. AWS WAF Bot Control
  {
    key: 'aws_waf_bot_control',
    name: 'AWS WAF Bot Control',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_wafv2_rule_group',
    defaultSpecs: { count: 1 },
    description: 'Conjunto gerenciado de regras Bot Control para proteção contra fraudes, account takeover e bots volumétricos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Targeting Reticle Crosshairs -->
      <circle cx="32" cy="32" r="23" stroke="#DD344C" stroke-width="2" stroke-dasharray="8 6" fill="none"/>
      <line x1="32" y1="5" x2="32" y2="12" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="32" y1="52" x2="32" y2="59" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="5" y1="32" x2="12" y2="32" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="52" y1="32" x2="59" y2="32" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Robot in Crosshairs -->
      <circle cx="32" cy="20" r="2" fill="#DD344C"/>
      <line x1="32" y1="22" x2="32" y2="26" stroke="#DD344C" stroke-width="2"/>
      <rect x="18" y="26" width="28" height="18" rx="3" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <circle cx="26" cy="35" r="3.5" stroke="#DD344C" stroke-width="2" fill="none"/>
      <circle cx="38" cy="35" r="3.5" stroke="#DD344C" stroke-width="2" fill="none"/>
      <line x1="25" y1="44" x2="25" y2="47" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
      <line x1="39" y1="44" x2="39" y2="47" stroke="#DD344C" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },

  // 25. AWS WAF Filtering Rule
  {
    key: 'aws_waf_filtering_rule',
    name: 'AWS WAF Filtering Rule',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_wafv2_rule_group',
    defaultSpecs: { count: 1 },
    description: 'Regra de filtragem de requisições web baseada em cabeçalhos HTTP, strings, IPs e padrões URI',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Funnel Top Rim -->
      <ellipse cx="32" cy="16" rx="17" ry="5" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <!-- Funnel Body & Stem -->
      <path d="M15 16L29 36V50L35 53V36L49 16" stroke="#DD344C" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
    </svg>`
  },

  // 26. AWS WAF Labels
  {
    key: 'aws_waf_labels',
    name: 'AWS WAF Labels',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_wafv2_web_acl',
    defaultSpecs: { count: 1 },
    description: 'Rótulos e tags de contexto inseridos em requisições para avaliação e tomada de decisão encadeada',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Tag / Label Outline -->
      <path d="M22 10H42V48C42 49.5 40.5 51 39 51H22C20.5 51 19 49.5 19 48V13C19 11.5 20.5 10 22 10Z" 
            stroke="#DD344C" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
      <path d="M19 20L11 28V48C11 49.5 12.5 51 14 51H19" stroke="#DD344C" stroke-width="2" fill="none"/>
      <circle cx="30" cy="18" r="2.5" fill="#DD344C"/>
      <!-- Horizontal Label Content Lines -->
      <line x1="26" y1="28" x2="53" y2="28" stroke="#DD344C" stroke-width="2.8" stroke-linecap="round"/>
      <line x1="26" y1="39" x2="53" y2="39" stroke="#DD344C" stroke-width="2.8" stroke-linecap="round"/>
    </svg>`
  },

  // 27. AWS WAF Managed Rule
  {
    key: 'aws_waf_managed_rule',
    name: 'AWS WAF Managed Rule',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_wafv2_web_acl',
    defaultSpecs: { count: 1 },
    description: 'Regras pré-configuradas e mantidas pela AWS e parceiros contra vulnerabilidades OWASP Top 10 e CVEs',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Cog / Gear on Left -->
      <circle cx="18" cy="24" r="5" stroke="#DD344C" stroke-width="2" fill="none"/>
      <path d="M18 15V17M18 31V33M9 24H11M25 24H27M12 18L13.5 19.5M22.5 28.5L24 30M12 30L13.5 28.5M22.5 19.5L24 18" 
            stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Rule Checklist on Right -->
      <rect x="29" y="11" width="26" height="42" rx="3" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <line x1="29" y1="25" x2="55" y2="25" stroke="#DD344C" stroke-width="2"/>
      <line x1="29" y1="39" x2="55" y2="39" stroke="#DD344C" stroke-width="2"/>
      <!-- Check 1 -->
      <path d="M37 19L41 22L48 16" stroke="#DD344C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Check 2 -->
      <path d="M37 33L41 36L48 30" stroke="#DD344C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Cross 3 -->
      <path d="M39 44L47 50M47 44L39 50" stroke="#DD344C" stroke-width="2.2" stroke-linecap="round"/>
    </svg>`
  },

  // 28. AWS WAF Rule
  {
    key: 'aws_waf_rule_group_rule',
    name: 'AWS WAF Rule',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_wafv2_rule_group',
    defaultSpecs: { count: 1 },
    description: 'Regra de inspeção personalizada do WAF definindo critérios de match, limites de taxa e ações (Allow, Block, Count)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- 3-row Rule Container -->
      <rect x="13" y="11" width="38" height="42" rx="3" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <line x1="13" y1="25" x2="51" y2="25" stroke="#DD344C" stroke-width="2"/>
      <line x1="13" y1="39" x2="51" y2="39" stroke="#DD344C" stroke-width="2"/>
      <!-- Checkmark 1 -->
      <path d="M35 19L39 22L46 16" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Checkmark 2 -->
      <path d="M35 33L39 36L46 30" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Cross Mark 3 -->
      <path d="M37 44L45 50M45 44L37 50" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // 29. AWS IAM Identity Center (Successor to AWS Single Sign-On / AWS SSO)
  {
    key: 'aws_iam_identity_center',
    name: 'IAM Identity Center',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_ssoadmin_permission_set',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Gerenciamento centralizado de identidades, logon único (SSO), federação SAML 2.0 / OIDC e permissões de acesso multi-conta na AWS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- ID Badge / Security Card Frame -->
      <rect x="18" y="14" width="28" height="38" rx="4" stroke="#DD344C" stroke-width="2.5" fill="none"/>
      <!-- Badge Lanyard Holder -->
      <rect x="27" y="10" width="10" height="4" rx="1.5" stroke="#DD344C" stroke-width="2" fill="white"/>
      <circle cx="32" cy="12" r="1" fill="#DD344C"/>
      <!-- User Head & Shoulders -->
      <circle cx="32" cy="23" r="5" fill="#DD344C"/>
      <path d="M23 35C23 31 27 29.5 32 29.5C37 29.5 41 31 41 35" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Keyhole / Single Sign-On Portal -->
      <circle cx="32" cy="41" r="2.5" stroke="#DD344C" stroke-width="1.8" fill="white"/>
      <path d="M31 43.5L30.5 47H33.5L33 43.5" stroke="#DD344C" stroke-width="1.5" stroke-linejoin="round" fill="#DD344C"/>
      <!-- Radiating Multi-Account Federation Rays -->
      <path d="M12 32H16M14 29L11 32L14 35" stroke="#DD344C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M52 32H48M50 29L53 32L50 35" stroke="#DD344C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="9" cy="32" r="2" fill="#DD344C"/>
      <circle cx="55" cy="32" r="2" fill="#DD344C"/>
    </svg>`
  },

  // 30. Amazon GuardDuty (Intelligent Threat Detection)
  {
    key: 'aws_guardduty',
    name: 'GuardDuty',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_guardduty_detector',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Detecção inteligente e contínua de ameaças e anomalias com Machine Learning analisando DNS, VPC Flow Logs, CloudTrail e EKS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- GuardDuty Shield -->
      <path d="M32 10L49 17V30C49 42 41 49.5 32 54C23 49.5 15 42 15 30V17L32 10Z" stroke="#DD344C" stroke-width="3" fill="#DD344C" fill-opacity="0.12" stroke-linejoin="round"/>
      <!-- Radar Target Scanner Rings -->
      <circle cx="32" cy="31" r="12" stroke="#DD344C" stroke-width="2" fill="none"/>
      <circle cx="32" cy="31" r="6" stroke="#DD344C" stroke-width="1.5" fill="none"/>
      <!-- Radar Crosshairs -->
      <line x1="32" y1="17" x2="32" y2="45" stroke="#DD344C" stroke-width="1.8" stroke-dasharray="2 2"/>
      <line x1="18" y1="31" x2="46" y2="31" stroke="#DD344C" stroke-width="1.8" stroke-dasharray="2 2"/>
      <!-- Threat Detection Lock-on Beacon -->
      <circle cx="37" cy="26" r="3.2" fill="#DD344C"/>
      <circle cx="37" cy="26" r="5.5" stroke="#DD344C" stroke-width="1.2" stroke-dasharray="1.5 1.5"/>
    </svg>`
  },

  // 31. AWS Network Firewall (Full Managed Network Firewall & IPS)
  {
    key: 'aws_network_firewall',
    name: 'AWS Network Firewall',
    provider: 'aws',
    category: 'security',
    brandColor: '#DD344C',
    defaultResourceType: 'aws_networkfirewall_firewall',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Firewall de rede gerenciado com inspeção profunda de pacotes (DPI), prevenção contra invasões (IPS) com regras Suricata na VPC',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DD344C" fill-opacity="0.12" stroke="#DD344C" stroke-width="1.5"/>
      <!-- Perimeter Arcs -->
      <path d="M12 24C14 15 22 10 32 10C42 10 50 15 52 24" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M12 40C14 49 22 54 32 54C42 54 50 49 52 40" stroke="#DD344C" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Firewall Brick Wall Core -->
      <rect x="18" y="27" width="28" height="17" rx="2" stroke="#DD344C" stroke-width="2.5" fill="#DD344C" fill-opacity="0.2"/>
      <line x1="18" y1="32.5" x2="46" y2="32.5" stroke="#DD344C" stroke-width="1.8"/>
      <line x1="18" y1="38.5" x2="46" y2="38.5" stroke="#DD344C" stroke-width="1.8"/>
      <line x1="32" y1="27" x2="32" y2="32.5" stroke="#DD344C" stroke-width="1.8"/>
      <line x1="25" y1="32.5" x2="25" y2="38.5" stroke="#DD344C" stroke-width="1.8"/>
      <line x1="39" y1="32.5" x2="39" y2="38.5" stroke="#DD344C" stroke-width="1.8"/>
      <line x1="32" y1="38.5" x2="32" y2="44" stroke="#DD344C" stroke-width="1.8"/>
      <!-- Protection Flames rising above the wall -->
      <path d="M22 27C22 23 24 21 26 17C28 21 29 22 29 27" stroke="#DD344C" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M30 27C30 21 33 19 35 15C37 20 38 22 38 27" stroke="#DD344C" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M38 27C38 23 40 21 42 18C44 21 45 23 45 27" stroke="#DD344C" stroke-width="2" stroke-linecap="round" fill="none"/>
      <!-- Inbound / Outbound Packet Inspection Arrows -->
      <path d="M7 35.5H14M11 32.5L14 35.5L11 38.5" stroke="#DD344C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M50 35.5H57M54 32.5L57 35.5L54 38.5" stroke="#DD344C" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  }
];
