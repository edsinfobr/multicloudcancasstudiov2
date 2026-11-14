import { CloudIconDefinition } from '../types';

export const ARCHIMATE_ICONS: CloudIconDefinition[] = [
  // ==========================================
  // 1. MOTIVATION & STRATEGY LAYER (Violet / Purple #8B5CF6 / #A855F7)
  // ==========================================
  {
    key: 'archimate_stakeholder',
    name: 'Stakeholder',
    provider: 'archimate',
    category: 'integration',
    brandColor: '#8B5CF6',
    defaultResourceType: 'archimate_stakeholder',
    defaultSpecs: { count: 1, role: 'Stakeholder' },
    description: 'ArchiMate Motivation: Papel ou indivíduo interessado nos resultados da arquitetura',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#8B5CF6" fill-opacity="0.14" stroke="#8B5CF6" stroke-width="2"/>
      <!-- ArchiMate Stakeholder symbol: Person figure -->
      <circle cx="32" cy="22" r="7" stroke="#8B5CF6" stroke-width="2.2" fill="#8B5CF6" fill-opacity="0.25"/>
      <path d="M19 46C19 38 24.5 34 32 34C39.5 34 45 38 45 46" stroke="#8B5CF6" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="20" y1="46" x2="44" y2="46" stroke="#8B5CF6" stroke-width="2.2" stroke-linecap="round"/>
      <!-- ArchiMate miniature corner badge -->
      <path d="M50 14H58V22" stroke="#8B5CF6" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'archimate_driver',
    name: 'Driver (Motivador)',
    provider: 'archimate',
    category: 'integration',
    brandColor: '#8B5CF6',
    defaultResourceType: 'archimate_driver',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Motivation: Condição externa ou interna que motiva uma mudança organizacional',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#8B5CF6" fill-opacity="0.14" stroke="#8B5CF6" stroke-width="2"/>
      <!-- Steering wheel icon for Driver -->
      <circle cx="32" cy="32" r="14" stroke="#8B5CF6" stroke-width="2.2" fill="#8B5CF6" fill-opacity="0.2"/>
      <circle cx="32" cy="32" r="4" fill="#8B5CF6"/>
      <line x1="32" y1="18" x2="32" y2="28" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round"/>
      <line x1="18" y1="32" x2="28" y2="32" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round"/>
      <line x1="36" y1="32" x2="46" y2="32" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="42" x2="30" y2="35" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="42" x2="34" y2="35" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'archimate_goal',
    name: 'Goal (Meta / Objetivo)',
    provider: 'archimate',
    category: 'integration',
    brandColor: '#8B5CF6',
    defaultResourceType: 'archimate_goal',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Motivation: Declaração de intenção de alto nível que a organização deseja alcançar',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#8B5CF6" fill-opacity="0.14" stroke="#8B5CF6" stroke-width="2"/>
      <!-- Target / Bullseye symbol for Goal -->
      <circle cx="32" cy="32" r="15" stroke="#8B5CF6" stroke-width="2" fill="none"/>
      <circle cx="32" cy="32" r="9" stroke="#8B5CF6" stroke-width="2" fill="#8B5CF6" fill-opacity="0.25"/>
      <circle cx="32" cy="32" r="3.5" fill="#8B5CF6"/>
      <path d="M42 22L48 16M48 16H43M48 16V21" stroke="#8B5CF6" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    key: 'archimate_principle',
    name: 'Principle (Princípio)',
    provider: 'archimate',
    category: 'integration',
    brandColor: '#8B5CF6',
    defaultResourceType: 'archimate_principle',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Motivation: Regra qualitativa ou diretriz orientadora para o desenho arquitetural',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#8B5CF6" fill-opacity="0.14" stroke="#8B5CF6" stroke-width="2"/>
      <!-- Compass / Guide star for Principle -->
      <path d="M32 14L36 28L50 32L36 36L32 50L28 36L14 32L28 28L32 14Z" fill="#8B5CF6" fill-opacity="0.3" stroke="#8B5CF6" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="32" cy="32" r="3" fill="#8B5CF6"/>
    </svg>`
  },
  {
    key: 'archimate_requirement',
    name: 'Requirement (Requisito)',
    provider: 'archimate',
    category: 'integration',
    brandColor: '#8B5CF6',
    defaultResourceType: 'archimate_requirement',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Motivation: Declaração de necessidade que o sistema ou arquitetura deve satisfazer',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#8B5CF6" fill-opacity="0.14" stroke="#8B5CF6" stroke-width="2"/>
      <!-- Checklist / Checkbox for Requirement -->
      <rect x="18" y="16" width="28" height="32" rx="4" stroke="#8B5CF6" stroke-width="2" fill="#8B5CF6" fill-opacity="0.2"/>
      <path d="M24 26L28 30L38 20" stroke="#8B5CF6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="24" y1="36" x2="38" y2="36" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="42" x2="34" y2="42" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'archimate_capability',
    name: 'Capability (Capacidade)',
    provider: 'archimate',
    category: 'compute',
    brandColor: '#A855F7',
    defaultResourceType: 'archimate_capability',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Strategy: Habilidade ou capacidade que uma organização possui para executar negócios',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#A855F7" fill-opacity="0.14" stroke="#A855F7" stroke-width="2"/>
      <!-- Capability Matrix blocks -->
      <rect x="16" y="18" width="14" height="12" rx="2" stroke="#A855F7" stroke-width="1.8" fill="#A855F7" fill-opacity="0.3"/>
      <rect x="34" y="18" width="14" height="12" rx="2" stroke="#A855F7" stroke-width="1.8" fill="#A855F7" fill-opacity="0.3"/>
      <rect x="16" y="34" width="14" height="12" rx="2" stroke="#A855F7" stroke-width="1.8" fill="#A855F7" fill-opacity="0.3"/>
      <rect x="34" y="34" width="14" height="12" rx="2" stroke="#A855F7" stroke-width="1.8" fill="#A855F7" fill-opacity="0.6"/>
    </svg>`
  },
  {
    key: 'archimate_value_stream',
    name: 'Value Stream (Fluxo de Valor)',
    provider: 'archimate',
    category: 'compute',
    brandColor: '#A855F7',
    defaultResourceType: 'archimate_value_stream',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Strategy: Sequência de estágios que agregam valor para o cliente ou stakeholder',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#A855F7" fill-opacity="0.14" stroke="#A855F7" stroke-width="2"/>
      <!-- Chevron arrow pipeline -->
      <path d="M14 22H32L38 32L32 42H14L20 32L14 22Z" fill="#A855F7" fill-opacity="0.3" stroke="#A855F7" stroke-width="1.8"/>
      <path d="M32 22H46L52 32L46 42H32L38 32L32 22Z" fill="#A855F7" fill-opacity="0.5" stroke="#A855F7" stroke-width="1.8"/>
    </svg>`
  },

  // ==========================================
  // 2. BUSINESS LAYER (Yellow / Amber #FACC15 / #CA8A04)
  // ==========================================
  {
    key: 'archimate_business_actor',
    name: 'Business Actor (Ator de Negócio)',
    provider: 'archimate',
    category: 'compute',
    brandColor: '#CA8A04',
    defaultResourceType: 'archimate_business_actor',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Business: Entidade organizacional capaz de realizar comportamentos (ex: Cliente, Banco, Gerente)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#FEF08A" fill-opacity="0.25" stroke="#CA8A04" stroke-width="2"/>
      <!-- ArchiMate Business Actor icon: Stick figure -->
      <circle cx="32" cy="20" r="6" stroke="#CA8A04" stroke-width="2.2" fill="#FEF08A"/>
      <line x1="32" y1="26" x2="32" y2="40" stroke="#CA8A04" stroke-width="2.2"/>
      <line x1="20" y1="32" x2="44" y2="32" stroke="#CA8A04" stroke-width="2.2"/>
      <line x1="32" y1="40" x2="22" y2="52" stroke="#CA8A04" stroke-width="2.2"/>
      <line x1="32" y1="40" x2="42" y2="52" stroke="#CA8A04" stroke-width="2.2"/>
    </svg>`
  },
  {
    key: 'archimate_business_role',
    name: 'Business Role (Papel de Negócio)',
    provider: 'archimate',
    category: 'compute',
    brandColor: '#CA8A04',
    defaultResourceType: 'archimate_business_role',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Business: Responsabilidade de executar um comportamento específico (ex: Aprovador, Auditor)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#FEF08A" fill-opacity="0.25" stroke="#CA8A04" stroke-width="2"/>
      <!-- Role badge / User badge with star -->
      <path d="M20 44C20 37 25 33 32 33C39 33 44 37 44 44" stroke="#CA8A04" stroke-width="2" stroke-linecap="round"/>
      <circle cx="32" cy="23" r="6" stroke="#CA8A04" stroke-width="2" fill="#FEF08A"/>
      <circle cx="44" cy="20" r="5" fill="#EAB308" stroke="#CA8A04" stroke-width="1.5"/>
      <path d="M44 18V22M42 20H46" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'archimate_business_process',
    name: 'Business Process (Processo de Negócio)',
    provider: 'archimate',
    category: 'compute',
    brandColor: '#CA8A04',
    defaultResourceType: 'archimate_business_process',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Business: Sequência estruturada de atividades que produz um resultado específico de negócio',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#FEF08A" fill-opacity="0.25" stroke="#CA8A04" stroke-width="2"/>
      <!-- ArchiMate standard Business Process symbol: Arrow chevron sequence -->
      <path d="M16 24H32L38 32L32 40H16L22 32L16 24Z" fill="#EAB308" stroke="#CA8A04" stroke-width="2" stroke-linejoin="round"/>
      <path d="M34 24H44L50 32L44 40H34L40 32L34 24Z" fill="#FACC15" stroke="#CA8A04" stroke-width="2" stroke-linejoin="round"/>
    </svg>`
  },
  {
    key: 'archimate_business_service',
    name: 'Business Service (Serviço de Negócio)',
    provider: 'archimate',
    category: 'compute',
    brandColor: '#CA8A04',
    defaultResourceType: 'archimate_business_service',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Business: Funcionalidade de negócio explicitamente definida exposta para o ambiente (ex: Pagamento)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#FEF08A" fill-opacity="0.25" stroke="#CA8A04" stroke-width="2"/>
      <!-- Rounded capsule with interface loop -->
      <rect x="16" y="24" width="32" height="16" rx="8" fill="#FEF08A" stroke="#CA8A04" stroke-width="2.2"/>
      <circle cx="32" cy="32" r="3.5" fill="#CA8A04"/>
    </svg>`
  },
  {
    key: 'archimate_business_object',
    name: 'Business Object (Objeto de Negócio)',
    provider: 'archimate',
    category: 'database',
    brandColor: '#CA8A04',
    defaultResourceType: 'archimate_business_object',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Business: Conceito passivo de negócio relevante para a organização (ex: Conta, Pedido, Fatura)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#FEF08A" fill-opacity="0.25" stroke="#CA8A04" stroke-width="2"/>
      <!-- Business document sheet with folded corner -->
      <path d="M22 16H38L46 24V48H22V16Z" fill="#FEF08A" stroke="#CA8A04" stroke-width="2" stroke-linejoin="round"/>
      <path d="M38 16V24H46" stroke="#CA8A04" stroke-width="2" stroke-linejoin="round"/>
      <line x1="26" y1="30" x2="38" y2="30" stroke="#CA8A04" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="26" y1="36" x2="42" y2="36" stroke="#CA8A04" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="26" y1="42" x2="36" y2="42" stroke="#CA8A04" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`
  },

  // ==========================================
  // 3. APPLICATION LAYER (Cyan / Light Blue #38BDF8 / #0284C7)
  // ==========================================
  {
    key: 'archimate_app_component',
    name: 'Application Component',
    provider: 'archimate',
    category: 'compute',
    brandColor: '#0284C7',
    defaultResourceType: 'archimate_app_component',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Application: Módulo autônomo e implantável de funcionalidade de software (ex: CRM, ERP, Portal)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#BAE6FD" fill-opacity="0.25" stroke="#0284C7" stroke-width="2"/>
      <!-- ArchiMate Component shape: box with 2 protruding connector tabs -->
      <rect x="20" y="16" width="30" height="32" rx="3" fill="#BAE6FD" stroke="#0284C7" stroke-width="2"/>
      <rect x="14" y="22" width="12" height="6" rx="1.5" fill="#38BDF8" stroke="#0284C7" stroke-width="1.8"/>
      <rect x="14" y="34" width="12" height="6" rx="1.5" fill="#38BDF8" stroke="#0284C7" stroke-width="1.8"/>
    </svg>`
  },
  {
    key: 'archimate_app_interface',
    name: 'Application Interface (API)',
    provider: 'archimate',
    category: 'networking',
    brandColor: '#0284C7',
    defaultResourceType: 'archimate_app_interface',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Application: Ponto de acesso onde os serviços de aplicação são expostos (REST API, GraphQL, GUI)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#BAE6FD" fill-opacity="0.25" stroke="#0284C7" stroke-width="2"/>
      <!-- Lollipop / Interface symbol -->
      <line x1="16" y1="32" x2="34" y2="32" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="42" cy="32" r="8" fill="#BAE6FD" stroke="#0284C7" stroke-width="2.5"/>
      <circle cx="42" cy="32" r="3" fill="#0284C7"/>
    </svg>`
  },
  {
    key: 'archimate_app_service',
    name: 'Application Service',
    provider: 'archimate',
    category: 'compute',
    brandColor: '#0284C7',
    defaultResourceType: 'archimate_app_service',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Application: Serviço automatizado exposto por componentes de aplicação para o negócio',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#BAE6FD" fill-opacity="0.25" stroke="#0284C7" stroke-width="2"/>
      <!-- Service capsule -->
      <rect x="16" y="24" width="32" height="16" rx="8" fill="#BAE6FD" stroke="#0284C7" stroke-width="2.2"/>
      <path d="M28 32H36" stroke="#0284C7" stroke-width="2" stroke-linecap="round"/>
      <circle cx="28" cy="32" r="2" fill="#0284C7"/>
      <circle cx="36" cy="32" r="2" fill="#0284C7"/>
    </svg>`
  },
  {
    key: 'archimate_data_object',
    name: 'Data Object (Objeto de Dados)',
    provider: 'archimate',
    category: 'database',
    brandColor: '#0284C7',
    defaultResourceType: 'archimate_data_object',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Application: Elemento de dado estruturado em nível de aplicação (Schema, Tabela, Mensagem, DTO)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#BAE6FD" fill-opacity="0.25" stroke="#0284C7" stroke-width="2"/>
      <!-- Sheet with data rows and cylinder cue -->
      <path d="M20 16H44V48H20V16Z" fill="#BAE6FD" stroke="#0284C7" stroke-width="2" rx="2"/>
      <line x1="20" y1="24" x2="44" y2="24" stroke="#0284C7" stroke-width="1.8"/>
      <circle cx="26" cy="20" r="1.5" fill="#0284C7"/>
      <line x1="24" y1="31" x2="40" y2="31" stroke="#0284C7" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="24" y1="37" x2="36" y2="37" stroke="#0284C7" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="24" y1="43" x2="38" y2="43" stroke="#0284C7" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`
  },

  // ==========================================
  // 4. TECHNOLOGY LAYER (Green #4ADE80 / #16A34A)
  // ==========================================
  {
    key: 'archimate_node',
    name: 'Technology Node (Nó)',
    provider: 'archimate',
    category: 'compute',
    brandColor: '#16A34A',
    defaultResourceType: 'archimate_node',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Technology: Recurso computacional capaz de executar ou hospedar artefatos de software',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#BBF7D0" fill-opacity="0.25" stroke="#16A34A" stroke-width="2"/>
      <!-- 3D Isometric cube representing an Infrastructure Node -->
      <path d="M32 14L48 22V38L32 46L16 38V22L32 14Z" fill="#BBF7D0" stroke="#16A34A" stroke-width="2" stroke-linejoin="round"/>
      <path d="M32 14V46M32 30L48 22M32 30L16 22" stroke="#16A34A" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`
  },
  {
    key: 'archimate_device',
    name: 'Device (Dispositivo Físico/HW)',
    provider: 'archimate',
    category: 'compute',
    brandColor: '#16A34A',
    defaultResourceType: 'archimate_device',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Technology: Recurso físico de hardware com poder de processamento e armazenamento',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#BBF7D0" fill-opacity="0.25" stroke="#16A34A" stroke-width="2"/>
      <!-- Server chassis -->
      <rect x="14" y="20" width="36" height="11" rx="2" fill="#BBF7D0" stroke="#16A34A" stroke-width="1.8"/>
      <rect x="14" y="33" width="36" height="11" rx="2" fill="#BBF7D0" stroke="#16A34A" stroke-width="1.8"/>
      <circle cx="20" cy="25.5" r="1.5" fill="#16A34A"/>
      <circle cx="20" cy="38.5" r="1.5" fill="#16A34A"/>
      <line x1="26" y1="25.5" x2="44" y2="25.5" stroke="#16A34A" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="26" y1="38.5" x2="44" y2="38.5" stroke="#16A34A" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'archimate_system_software',
    name: 'System Software (SO / Middleware)',
    provider: 'archimate',
    category: 'compute',
    brandColor: '#16A34A',
    defaultResourceType: 'archimate_system_software',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Technology: Software que provê ambiente de execução para aplicações (SO, JVM, DBMS, K8s)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#BBF7D0" fill-opacity="0.25" stroke="#16A34A" stroke-width="2"/>
      <!-- Gear / System wheel -->
      <circle cx="32" cy="32" r="8" fill="#BBF7D0" stroke="#16A34A" stroke-width="2"/>
      <path d="M32 16V20M32 44V48M16 32H20M44 32H48M21 21L24 24M40 40L43 43M21 43L24 40M40 24L43 21" stroke="#16A34A" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="32" cy="32" r="3" fill="#16A34A"/>
    </svg>`
  },
  {
    key: 'archimate_artifact',
    name: 'Artifact (Artefato / Pacote)',
    provider: 'archimate',
    category: 'storage',
    brandColor: '#16A34A',
    defaultResourceType: 'archimate_artifact',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Technology: Pedaço concreto de software ou dado (Docker Image, JAR, WAR, Script)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#BBF7D0" fill-opacity="0.25" stroke="#16A34A" stroke-width="2"/>
      <!-- Artifact box with top fold -->
      <path d="M20 18H44L48 26V46H16V26L20 18Z" fill="#BBF7D0" stroke="#16A34A" stroke-width="2" stroke-linejoin="round"/>
      <line x1="16" y1="26" x2="48" y2="26" stroke="#16A34A" stroke-width="2"/>
      <line x1="32" y1="26" x2="32" y2="46" stroke="#16A34A" stroke-width="2"/>
    </svg>`
  },
  {
    key: 'archimate_comm_network',
    name: 'Communication Network (Rede)',
    provider: 'archimate',
    category: 'networking',
    brandColor: '#16A34A',
    defaultResourceType: 'archimate_comm_network',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Technology: Conjunto de estruturas que permite conectar e comunicar nós',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#BBF7D0" fill-opacity="0.25" stroke="#16A34A" stroke-width="2"/>
      <!-- Network bus with connected nodes -->
      <circle cx="20" cy="22" r="4.5" fill="#BBF7D0" stroke="#16A34A" stroke-width="2"/>
      <circle cx="44" cy="22" r="4.5" fill="#BBF7D0" stroke="#16A34A" stroke-width="2"/>
      <circle cx="32" cy="42" r="4.5" fill="#BBF7D0" stroke="#16A34A" stroke-width="2"/>
      <path d="M20 27V34H44V27M32 34V37" stroke="#16A34A" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },

  // ==========================================
  // 5. IMPLEMENTATION & MIGRATION LAYER (#F472B6 / #DB2777)
  // ==========================================
  {
    key: 'archimate_work_package',
    name: 'Work Package (Projeto / Sprint)',
    provider: 'archimate',
    category: 'devops',
    brandColor: '#DB2777',
    defaultResourceType: 'archimate_work_package',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Implementation: Série de ações planejadas e executadas para alcançar uma meta de transição',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#FCE7F3" fill-opacity="0.25" stroke="#DB2777" stroke-width="2"/>
      <!-- Work package crate with ribbon / sprint box -->
      <rect x="18" y="20" width="28" height="26" rx="3" fill="#FCE7F3" stroke="#DB2777" stroke-width="2"/>
      <line x1="18" y1="33" x2="46" y2="33" stroke="#DB2777" stroke-width="2"/>
      <line x1="32" y1="20" x2="32" y2="46" stroke="#DB2777" stroke-width="2"/>
      <path d="M26 15C26 15 28 20 32 20C36 20 38 15 38 15" stroke="#DB2777" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'archimate_plateau',
    name: 'Plateau (Estado Arquitetural)',
    provider: 'archimate',
    category: 'devops',
    brandColor: '#DB2777',
    defaultResourceType: 'archimate_plateau',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Implementation: Estado relativamente estável da arquitetura (Baseline, Transition, Target)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#FCE7F3" fill-opacity="0.25" stroke="#DB2777" stroke-width="2"/>
      <!-- Stepped transition plateau -->
      <path d="M14 44H26V34H38V24H50" stroke="#DB2777" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="26" cy="34" r="3" fill="#DB2777"/>
      <circle cx="38" cy="24" r="3" fill="#DB2777"/>
    </svg>`
  },
  {
    key: 'archimate_gap',
    name: 'Gap (Lacuna Arquitetural)',
    provider: 'archimate',
    category: 'devops',
    brandColor: '#DB2777',
    defaultResourceType: 'archimate_gap',
    defaultSpecs: { count: 1 },
    description: 'ArchiMate Implementation: Diferença entre duas situações arquiteturais (Baseline vs Target)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#FCE7F3" fill-opacity="0.25" stroke="#DB2777" stroke-width="2"/>
      <!-- Gap bridge opening -->
      <path d="M14 26H24V38H14M40 26H50V38H40" stroke="#DB2777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M26 32H38" stroke="#DB2777" stroke-width="2" stroke-dasharray="3 3"/>
      <path d="M29 28L25 32L29 36M35 28L39 32L35 36" stroke="#DB2777" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  }
];
