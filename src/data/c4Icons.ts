import { CloudIconDefinition } from '../types';

export const C4_ICONS: CloudIconDefinition[] = [
  // ==========================================
  // LEVEL 1: SYSTEM CONTEXT
  // ==========================================
  {
    key: 'c4_person',
    name: 'Person (Usuário / Ator)',
    provider: 'c4',
    category: 'compute',
    brandColor: '#08427B',
    defaultResourceType: 'c4_person',
    defaultSpecs: { count: 1, c4Level: 'context', c4Type: 'person' },
    description: 'C4 Level 1 Context: Um usuário humano, cliente, ator ou operador que interage com o sistema de software',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#08427B" fill-opacity="0.15" stroke="#08427B" stroke-width="2"/>
      <!-- C4 Person Silhouette with round head & shoulders -->
      <circle cx="32" cy="20" r="8" fill="#08427B"/>
      <path d="M16 48C16 38 23 34 32 34C41 34 48 38 48 48" fill="#08427B"/>
      <!-- C4 Stereotype Label -->
      <rect x="18" y="50" width="28" height="8" rx="2" fill="#08427B"/>
      <text x="32" y="56" fill="#FFFFFF" font-size="6" font-weight="bold" text-anchor="middle">[Person]</text>
    </svg>`
  },
  {
    key: 'c4_software_system',
    name: 'Software System (Sistema)',
    provider: 'c4',
    category: 'compute',
    brandColor: '#1168BD',
    defaultResourceType: 'c4_software_system',
    defaultSpecs: { count: 1, c4Level: 'context', c4Type: 'software_system' },
    description: 'C4 Level 1 Context: O sistema de software de mais alto nível sob escopo que entrega valor aos usuários',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#1168BD" fill-opacity="0.2" stroke="#1168BD" stroke-width="2"/>
      <rect x="12" y="16" width="40" height="32" rx="4" fill="#1168BD" stroke="#0B4884" stroke-width="1.5"/>
      <rect x="16" y="22" width="32" height="12" rx="2" fill="#FFFFFF" fill-opacity="0.2"/>
      <line x1="20" y1="28" x2="36" y2="28" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      <text x="32" y="42" fill="#FFFFFF" font-size="5.5" font-weight="900" text-anchor="middle">[Software System]</text>
    </svg>`
  },
  {
    key: 'c4_external_system',
    name: 'External System (Sistema Externo)',
    provider: 'c4',
    category: 'compute',
    brandColor: '#64748B',
    defaultResourceType: 'c4_external_system',
    defaultSpecs: { count: 1, c4Level: 'context', c4Type: 'external_system' },
    description: 'C4 Level 1 Context: Sistema de software externo existente fora dos limites de governança ou propriedade da organização',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#64748B" fill-opacity="0.2" stroke="#64748B" stroke-width="2"/>
      <rect x="12" y="16" width="40" height="32" rx="4" fill="#475569" stroke="#334155" stroke-width="1.5"/>
      <rect x="16" y="22" width="32" height="12" rx="2" fill="#FFFFFF" fill-opacity="0.15"/>
      <line x1="20" y1="28" x2="34" y2="28" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      <text x="32" y="42" fill="#FFFFFF" font-size="5" font-weight="900" text-anchor="middle">[External System]</text>
    </svg>`
  },

  // ==========================================
  // LEVEL 2: CONTAINER
  // ==========================================
  {
    key: 'c4_container_spa',
    name: 'Single-Page Application (SPA)',
    provider: 'c4',
    category: 'compute',
    brandColor: '#438DD5',
    defaultResourceType: 'c4_container_spa',
    defaultSpecs: { count: 1, c4Level: 'container', c4Technology: 'React / TypeScript' },
    description: 'C4 Level 2 Container: Aplicação frontend executada no navegador do cliente (React, Angular, Vue, Next.js)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#438DD5" fill-opacity="0.2" stroke="#438DD5" stroke-width="2"/>
      <!-- Browser window -->
      <rect x="12" y="16" width="40" height="32" rx="4" fill="#2E6295" stroke="#1D4266" stroke-width="1.5"/>
      <rect x="12" y="16" width="40" height="8" rx="4" fill="#1D4266"/>
      <circle cx="17" cy="20" r="1.5" fill="#EF4444"/>
      <circle cx="22" cy="20" r="1.5" fill="#F59E0B"/>
      <circle cx="27" cy="20" r="1.5" fill="#10B981"/>
      <text x="32" y="36" fill="#FFFFFF" font-size="7" font-weight="900" text-anchor="middle">SPA</text>
      <text x="32" y="44" fill="#93C5FD" font-size="5" font-weight="bold" text-anchor="middle">[Container: Web]</text>
    </svg>`
  },
  {
    key: 'c4_container_mobile',
    name: 'Mobile App (iOS / Android)',
    provider: 'c4',
    category: 'compute',
    brandColor: '#438DD5',
    defaultResourceType: 'c4_container_mobile',
    defaultSpecs: { count: 1, c4Level: 'container', c4Technology: 'Flutter / Swift / Kotlin' },
    description: 'C4 Level 2 Container: Aplicativo móvel nativo ou híbrido instalado no dispositivo do usuário',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#438DD5" fill-opacity="0.2" stroke="#438DD5" stroke-width="2"/>
      <!-- Mobile device -->
      <rect x="20" y="12" width="24" height="40" rx="4" fill="#2E6295" stroke="#1D4266" stroke-width="1.8"/>
      <rect x="23" y="17" width="18" height="28" rx="1.5" fill="#FFFFFF" fill-opacity="0.15"/>
      <circle cx="32" cy="48" r="1.5" fill="#FFFFFF"/>
      <line x1="28" y1="14.5" x2="36" y2="14.5" stroke="#93C5FD" stroke-width="1.2" stroke-linecap="round"/>
      <text x="32" y="32" fill="#FFFFFF" font-size="6" font-weight="bold" text-anchor="middle">[Mobile]</text>
    </svg>`
  },
  {
    key: 'c4_container_api',
    name: 'API Application (Backend)',
    provider: 'c4',
    category: 'compute',
    brandColor: '#438DD5',
    defaultResourceType: 'c4_container_api',
    defaultSpecs: { count: 1, c4Level: 'container', c4Technology: 'Node.js / Express / Go' },
    description: 'C4 Level 2 Container: Aplicação de backend que provê serviços e APIs via REST, GraphQL ou gRPC',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#438DD5" fill-opacity="0.2" stroke="#438DD5" stroke-width="2"/>
      <!-- API Server Box -->
      <rect x="14" y="16" width="36" height="32" rx="4" fill="#2E6295" stroke="#1D4266" stroke-width="1.5"/>
      <text x="32" y="30" fill="#FFFFFF" font-size="9" font-weight="900" text-anchor="middle">API</text>
      <text x="32" y="42" fill="#93C5FD" font-size="5" font-weight="bold" text-anchor="middle">[Container: REST]</text>
    </svg>`
  },
  {
    key: 'c4_container_db',
    name: 'Database Container',
    provider: 'c4',
    category: 'database',
    brandColor: '#438DD5',
    defaultResourceType: 'c4_container_db',
    defaultSpecs: { count: 1, c4Level: 'container', c4Technology: 'PostgreSQL / Oracle / MySQL' },
    description: 'C4 Level 2 Container: Banco de dados relacional que armazena dados estruturados e transacionais do sistema',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#438DD5" fill-opacity="0.2" stroke="#438DD5" stroke-width="2"/>
      <!-- Database cylinder -->
      <path d="M18 22V42C18 46.5 24 50 32 50C40 50 46 46.5 46 42V22" fill="#2E6295" stroke="#1D4266" stroke-width="1.8"/>
      <ellipse cx="32" cy="22" rx="14" ry="6" fill="#438DD5" stroke="#1D4266" stroke-width="1.8"/>
      <ellipse cx="32" cy="31" rx="14" ry="4" stroke="#1D4266" stroke-width="1.5" fill="none"/>
      <text x="32" y="43" fill="#FFFFFF" font-size="5" font-weight="bold" text-anchor="middle">[Database]</text>
    </svg>`
  },
  {
    key: 'c4_container_messagebus',
    name: 'Message Bus (Fila / Mensageria)',
    provider: 'c4',
    category: 'integration',
    brandColor: '#438DD5',
    defaultResourceType: 'c4_container_messagebus',
    defaultSpecs: { count: 1, c4Level: 'container', c4Technology: 'Apache Kafka / RabbitMQ' },
    description: 'C4 Level 2 Container: Barramento de mensageria assíncrona ou broker de streaming de eventos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#438DD5" fill-opacity="0.2" stroke="#438DD5" stroke-width="2"/>
      <!-- Queue pipe with message packets -->
      <rect x="14" y="24" width="36" height="16" rx="8" fill="#2E6295" stroke="#1D4266" stroke-width="1.8"/>
      <circle cx="23" cy="32" r="3" fill="#93C5FD"/>
      <circle cx="32" cy="32" r="3" fill="#93C5FD"/>
      <circle cx="41" cy="32" r="3" fill="#93C5FD"/>
      <text x="32" y="49" fill="#93C5FD" font-size="5" font-weight="bold" text-anchor="middle">[Message Bus]</text>
    </svg>`
  },

  // ==========================================
  // LEVEL 3: COMPONENT
  // ==========================================
  {
    key: 'c4_component_controller',
    name: 'Controller / Endpoint',
    provider: 'c4',
    category: 'compute',
    brandColor: '#85BBF0',
    defaultResourceType: 'c4_component_controller',
    defaultSpecs: { count: 1, c4Level: 'component', c4Technology: 'Spring / Express Controller' },
    description: 'C4 Level 3 Component: Controlador que recebe requisições HTTP/REST, valida parâmetros e despacha para serviços',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#85BBF0" fill-opacity="0.2" stroke="#85BBF0" stroke-width="2"/>
      <rect x="14" y="16" width="36" height="32" rx="4" fill="#5A96D8" stroke="#3168A6" stroke-width="1.5"/>
      <path d="M22 28L28 32L22 36M30 36H38" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="32" y="44" fill="#FFFFFF" font-size="5" font-weight="900" text-anchor="middle">[Controller]</text>
    </svg>`
  },
  {
    key: 'c4_component_service',
    name: 'Domain Service (Regras de Negócio)',
    provider: 'c4',
    category: 'compute',
    brandColor: '#85BBF0',
    defaultResourceType: 'c4_component_service',
    defaultSpecs: { count: 1, c4Level: 'component', c4Technology: 'Core Business Service' },
    description: 'C4 Level 3 Component: Componente que encapsula regras de negócio, cálculos, validações de domínio e fluxos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#85BBF0" fill-opacity="0.2" stroke="#85BBF0" stroke-width="2"/>
      <rect x="14" y="16" width="36" height="32" rx="4" fill="#5A96D8" stroke="#3168A6" stroke-width="1.5"/>
      <circle cx="32" cy="28" r="5" stroke="#FFFFFF" stroke-width="1.8"/>
      <path d="M32 20V23M32 33V36M24 28H27M37 28H40" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
      <text x="32" y="44" fill="#FFFFFF" font-size="5" font-weight="900" text-anchor="middle">[Service]</text>
    </svg>`
  },
  {
    key: 'c4_component_repository',
    name: 'Repository (Acesso a Dados)',
    provider: 'c4',
    category: 'database',
    brandColor: '#85BBF0',
    defaultResourceType: 'c4_component_repository',
    defaultSpecs: { count: 1, c4Level: 'component', c4Technology: 'JPA / Prisma / Drizzle' },
    description: 'C4 Level 3 Component: Componente de repositório responsável pela persistência, queries e mapeamento objeto-relacional',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#85BBF0" fill-opacity="0.2" stroke="#85BBF0" stroke-width="2"/>
      <rect x="14" y="16" width="36" height="32" rx="4" fill="#5A96D8" stroke="#3168A6" stroke-width="1.5"/>
      <ellipse cx="32" cy="26" rx="8" ry="3" stroke="#FFFFFF" stroke-width="1.5" fill="none"/>
      <path d="M24 26V32C24 33.7 27.6 35 32 35C36.4 35 40 33.7 40 32V26" stroke="#FFFFFF" stroke-width="1.5"/>
      <text x="32" y="44" fill="#FFFFFF" font-size="5" font-weight="900" text-anchor="middle">[Repository]</text>
    </svg>`
  },
  {
    key: 'c4_component_security',
    name: 'Security / Auth Interceptor',
    provider: 'c4',
    category: 'security',
    brandColor: '#85BBF0',
    defaultResourceType: 'c4_component_security',
    defaultSpecs: { count: 1, c4Level: 'component', c4Technology: 'JWT / OAuth2 / OIDC' },
    description: 'C4 Level 3 Component: Filtro ou interceptor de autenticação, autorização RBAC e verificação de tokens criptográficos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#85BBF0" fill-opacity="0.2" stroke="#85BBF0" stroke-width="2"/>
      <rect x="14" y="16" width="36" height="32" rx="4" fill="#5A96D8" stroke="#3168A6" stroke-width="1.5"/>
      <path d="M32 23L38 26V30C38 34 35.5 36.5 32 38C28.5 36.5 26 34 26 30V26L32 23Z" fill="#FFFFFF" fill-opacity="0.2" stroke="#FFFFFF" stroke-width="1.5"/>
      <text x="32" y="44" fill="#FFFFFF" font-size="5" font-weight="900" text-anchor="middle">[Security]</text>
    </svg>`
  },

  // ==========================================
  // LEVEL 4: CODE
  // ==========================================
  {
    key: 'c4_code_interface',
    name: 'Code Interface (Contrato)',
    provider: 'c4',
    category: 'devops',
    brandColor: '#BAE6FD',
    defaultResourceType: 'c4_code_interface',
    defaultSpecs: { count: 1, c4Level: 'code' },
    description: 'C4 Level 4 Code: Interface de código tipada ou contrato de protocolo (TypeScript interface, Java interface)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#BAE6FD" fill-opacity="0.2" stroke="#0284C7" stroke-width="2"/>
      <rect x="14" y="16" width="36" height="32" rx="4" fill="#0284C7" stroke="#0369A1" stroke-width="1.5"/>
      <text x="32" y="27" fill="#BAE6FD" font-size="5.5" font-style="italic" text-anchor="middle">«interface»</text>
      <text x="32" y="37" fill="#FFFFFF" font-size="7" font-weight="900" text-anchor="middle">IContract</text>
      <line x1="16" y1="41" x2="48" y2="41" stroke="#BAE6FD" stroke-width="1"/>
    </svg>`
  },
  {
    key: 'c4_code_class',
    name: 'Code Class (Classe / Entidade)',
    provider: 'c4',
    category: 'devops',
    brandColor: '#BAE6FD',
    defaultResourceType: 'c4_code_class',
    defaultSpecs: { count: 1, c4Level: 'code' },
    description: 'C4 Level 4 Code: Classe de implementação, entidade de domínio ou estrutura de dados em nível de código',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#BAE6FD" fill-opacity="0.2" stroke="#0284C7" stroke-width="2"/>
      <rect x="14" y="16" width="36" height="32" rx="4" fill="#0284C7" stroke="#0369A1" stroke-width="1.5"/>
      <text x="32" y="27" fill="#BAE6FD" font-size="5.5" text-anchor="middle">class</text>
      <text x="32" y="37" fill="#FFFFFF" font-size="7" font-weight="900" text-anchor="middle">Entity</text>
      <line x1="16" y1="41" x2="48" y2="41" stroke="#BAE6FD" stroke-width="1"/>
    </svg>`
  }
];
