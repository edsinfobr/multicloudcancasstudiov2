import { CloudIconDefinition } from '../types';

export const AWS_WORKSPACES_ICONS: CloudIconDefinition[] = [
  // 1. Amazon WorkSpaces
  {
    key: 'aws_workspaces',
    name: 'Amazon WorkSpaces',
    provider: 'aws',
    category: 'compute',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_workspaces_workspace',
    defaultSpecs: { count: 1, instanceType: 'STANDARD', region: 'us-east-1' },
    description: 'Serviço de Desktop como Serviço (DaaS) seguro e totalmente gerenciado na nuvem AWS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#00A4A6" fill-opacity="0.12" stroke="#00A4A6" stroke-width="1.5"/>
      <!-- Detached slice on the left -->
      <path d="M7 17L17 11L24 15L14 21L7 17Z" stroke="#00A4A6" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
      <path d="M7 17V33L14 37V21" stroke="#00A4A6" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M24 15V22" stroke="#00A4A6" stroke-width="2.5" stroke-linejoin="round"/>
      
      <!-- Main Cube -->
      <!-- Top Face Outer Edges -->
      <path d="M28 23L40 16L56 25L44 32L36 27L28 32" stroke="#00A4A6" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
      <!-- Right Face -->
      <path d="M56 25V43L40 52V34" stroke="#00A4A6" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Left Face -->
      <path d="M28 32V50L40 57V52" stroke="#00A4A6" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Front Vertical Center Edge -->
      <path d="M40 34V52" stroke="#00A4A6" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Dashed Section / Cut Line Indicators -->
      <path d="M30 29L36 33L42 29" stroke="#00A4A6" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 3"/>
      <path d="M44 38L52 43" stroke="#00A4A6" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 3"/>
    </svg>`
  },

  // 2. Amazon WorkSpaces Core
  {
    key: 'aws_workspaces_core',
    name: 'Amazon WorkSpaces Core',
    provider: 'aws',
    category: 'compute',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_workspaces_directory',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Infraestrutura de desktop virtual totalmente gerenciada acessível por APIs para soluções VDI de terceiros',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#00A4A6" fill-opacity="0.12" stroke="#00A4A6" stroke-width="1.5"/>
      <!-- Cloud Outline in Background -->
      <path d="M12 36C8.5 35 7 31 8.5 27.5C10 24 13.5 23.5 15.5 24C16.5 19 21.5 14 27.5 14.5C31.5 14.8 35 17.5 36.5 20.5C39 18 43.5 17.5 47 19.5C51 22 52.5 26.5 51.5 30.5C55 31.5 57 35.5 55.5 39C54 42.5 50.5 44 47 43.5" 
            stroke="#00A4A6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      
      <!-- Opaque Backdrop for Foreground Cube -->
      <path d="M19 32L32 24L45 32V48L32 56L19 48Z" fill="#12141A" fill-opacity="0.9"/>
      
      <!-- Foreground Isometric Cube -->
      <!-- Top Face -->
      <path d="M32 24L45 32L32 40L19 32Z" stroke="#00A4A6" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
      <!-- Left Face -->
      <path d="M19 32V48L32 56V40Z" stroke="#00A4A6" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
      <!-- Right Face -->
      <path d="M45 32V48L32 56" stroke="#00A4A6" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
    </svg>`
  },

  // 3. Amazon WorkSpaces Secure Browser
  {
    key: 'aws_workspaces_secure_browser',
    name: 'Amazon WorkSpaces Secure Browser',
    provider: 'aws',
    category: 'compute',
    brandColor: '#00A4A6',
    defaultResourceType: 'aws_workspacesweb_portal',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Navegador corporativo seguro totalmente gerenciado na nuvem para acesso a aplicações web e SaaS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#00A4A6" fill-opacity="0.12" stroke="#00A4A6" stroke-width="1.5"/>
      <!-- Browser Window Frame in Background -->
      <rect x="7" y="11" width="50" height="37" rx="3" stroke="#00A4A6" stroke-width="2.5" fill="none"/>
      <!-- Toolbar divider -->
      <line x1="7" y1="18.5" x2="57" y2="18.5" stroke="#00A4A6" stroke-width="2.5"/>
      <!-- 3 Toolbar Dots -->
      <circle cx="12" cy="14.8" r="1.2" fill="#00A4A6"/>
      <circle cx="16.5" cy="14.8" r="1.2" fill="#00A4A6"/>
      <circle cx="21" cy="14.8" r="1.2" fill="#00A4A6"/>
      <!-- Scrollbar track on the right -->
      <line x1="51.5" y1="24" x2="51.5" y2="38" stroke="#00A4A6" stroke-width="2" stroke-linecap="round"/>
      
      <!-- Opaque Backdrop for Foreground Cube -->
      <path d="M19 32L32 24L45 32V48L32 56L19 48Z" fill="#12141A" fill-opacity="0.9"/>
      
      <!-- Foreground Isometric Cube -->
      <!-- Top Face -->
      <path d="M32 24L45 32L32 40L19 32Z" stroke="#00A4A6" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
      <!-- Left Face -->
      <path d="M19 32V48L32 56V40Z" stroke="#00A4A6" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
      <!-- Right Face -->
      <path d="M45 32V48L32 56" stroke="#00A4A6" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
    </svg>`
  }
];
