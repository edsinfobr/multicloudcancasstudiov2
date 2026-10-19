import { CloudIconDefinition } from '../types';

export const AWS_MANAGEMENT_ICONS: CloudIconDefinition[] = [
  // =========================================================================
  // GROUP 1: AMAZON CLOUDWATCH (11 icons) - Brand Color: #CC2264
  // =========================================================================
  {
    key: 'aws_cloudwatch_alarm',
    name: 'CloudWatch Alarm',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_cloudwatch_metric_alarm',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Alarme de métricas do CloudWatch que monitora métricas e envia notificações ou executa ações automáticas',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="32" width="10" height="22" rx="2" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.15"/>
      <rect x="27" y="24" width="10" height="30" rx="2" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.15"/>
      <rect x="44" y="16" width="10" height="38" rx="2" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.15"/>
      <line x1="6" y1="56" x2="58" y2="56" stroke="#CC2264" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="49" cy="10" r="5" stroke="#CC2264" stroke-width="3" fill="white"/>
      <line x1="49" y1="3" x2="49" y2="5" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'aws_cloudwatch_cross_account_observability',
    name: 'CloudWatch Cross-Account Observability',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_oam_sink',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Centraliza e agrega telemetria de métricas, logs e traces entre múltiplas contas AWS e regiões',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Source Account Node Left -->
      <circle cx="20" cy="20" r="5" stroke="#CC2264" stroke-width="2.5" fill="#CC2264" fill-opacity="0.2"/>
      <path d="M12 33C12 28.5 15.5 27 20 27C24.5 27 28 28.5 28 33" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Source Account Node Top Right -->
      <circle cx="40" cy="16" r="4.5" stroke="#CC2264" stroke-width="2.5" fill="#CC2264" fill-opacity="0.2"/>
      <path d="M33 27C33 23.5 36 22 40 22C44 22 47 23.5 47 27" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Sink Monitoring Hub Bottom Right -->
      <circle cx="44" cy="44" r="9" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.15"/>
      <circle cx="44" cy="44" r="3.5" stroke="#CC2264" stroke-width="2.5" fill="#CC2264"/>
      <!-- Connecting Observability Stream Links -->
      <path d="M20 34L37 42" stroke="#CC2264" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 1"/>
      <circle cx="16" cy="48" r="4" stroke="#CC2264" stroke-width="2.5" fill="#CC2264"/>
      <line x1="19" y1="47" x2="36" y2="44" stroke="#CC2264" stroke-width="2.8" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'aws_cloudwatch_data_protection',
    name: 'CloudWatch Data Protection',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_cloudwatch_log_data_protection_policy',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Políticas de auditoria e mascaramento automático de dados confidenciais e PII em streams de logs',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Data log lines left -->
      <line x1="8" y1="18" x2="26" y2="18" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
      <line x1="8" y1="28" x2="22" y2="28" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
      <line x1="8" y1="38" x2="24" y2="38" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
      <line x1="8" y1="48" x2="20" y2="48" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
      <!-- Protection Padlock Right -->
      <rect x="28" y="24" width="26" height="26" rx="4" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.15"/>
      <path d="M34 24V17C34 13.1 37.1 10 41 10C44.9 10 48 13.1 48 17V24" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
      <circle cx="41" cy="35" r="3" fill="#CC2264"/>
      <line x1="41" y1="38" x2="41" y2="42" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'aws_cloudwatch_event_event_based',
    name: 'CloudWatch Event (Event-Based)',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_cloudwatch_event_rule',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Regra orientada a eventos disparada por mudanças de estado de serviços AWS ou eventos customizados',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="32" width="10" height="22" rx="2" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.15"/>
      <rect x="27" y="24" width="10" height="30" rx="2" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.15"/>
      <rect x="44" y="16" width="10" height="38" rx="2" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.15"/>
      <line x1="6" y1="56" x2="58" y2="56" stroke="#CC2264" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Dynamic Event Lightning / Node -->
      <circle cx="49" cy="8" r="4.5" stroke="#CC2264" stroke-width="2.5" fill="white"/>
      <path d="M49 14L49 16" stroke="#CC2264" stroke-width="2.5"/>
    </svg>`
  },
  {
    key: 'aws_cloudwatch_event_time_based',
    name: 'CloudWatch Event (Time-Based / Cron)',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_cloudwatch_event_rule',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Regra agendada do CloudWatch / EventBridge executada periodicamente com cron ou rate expressions',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="32" width="10" height="22" rx="2" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.15"/>
      <rect x="27" y="24" width="10" height="30" rx="2" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.15"/>
      <rect x="44" y="22" width="10" height="32" rx="2" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.15"/>
      <line x1="6" y1="56" x2="58" y2="56" stroke="#CC2264" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Scheduled Clock Indicator -->
      <circle cx="49" cy="11" r="7.5" stroke="#CC2264" stroke-width="2.5" fill="white"/>
      <path d="M49 7.5V11.5L52 13" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'aws_cloudwatch_evidently',
    name: 'CloudWatch Evidently',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_evidently_project',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Plataforma para experimentação, testes A/B e gerenciamento de feature flags com análise estatística',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Test Tube 1 -->
      <path d="M16 28V46C16 49.3 18.7 52 22 52C25.3 52 28 49.3 28 46V28H16Z" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.15"/>
      <line x1="14" y1="28" x2="30" y2="28" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
      <!-- Test Tube 2 -->
      <path d="M36 20V46C36 49.3 38.7 52 42 52C45.3 52 48 49.3 48 46V20H36Z" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.2"/>
      <line x1="34" y1="20" x2="50" y2="20" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
      <!-- Experiment Trend Line connecting nodes -->
      <circle cx="22" cy="18" r="3.5" stroke="#CC2264" stroke-width="2.5" fill="white"/>
      <circle cx="42" cy="10" r="3.5" stroke="#CC2264" stroke-width="2.5" fill="white"/>
      <line x1="25.5" y1="16.5" x2="38.5" y2="11.5" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'aws_cloudwatch_logs',
    name: 'CloudWatch Logs',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_cloudwatch_log_group',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Armazena, monitora e analisa dados de logs de instâncias EC2, AWS Lambda, CloudTrail e aplicações',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="18" x2="36" y2="18" stroke="#CC2264" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="10" y1="28" x2="28" y2="28" stroke="#CC2264" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="10" y1="38" x2="32" y2="38" stroke="#CC2264" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="10" y1="48" x2="24" y2="48" stroke="#CC2264" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Inspection Magnifier -->
      <circle cx="41" cy="35" r="9" stroke="#CC2264" stroke-width="3.5" fill="#CC2264" fill-opacity="0.15"/>
      <line x1="47.5" y1="41.5" x2="56" y2="50" stroke="#CC2264" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'aws_cloudwatch_metrics_insights',
    name: 'CloudWatch Metrics Insights',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_cloudwatch_metric_alarm',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Mecanismo de consulta SQL veloz e flexível para isolar padrões e anomalias de métricas em tempo real',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Monitor Frame -->
      <rect x="8" y="12" width="48" height="34" rx="3" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1"/>
      <path d="M22 46L18 52H46L42 46" stroke="#CC2264" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Database cylinder inside -->
      <ellipse cx="22" cy="24" rx="6" ry="2.5" stroke="#CC2264" stroke-width="2"/>
      <path d="M16 24V32C16 33.4 18.7 34.5 22 34.5C25.3 34.5 28 33.4 28 32V24" stroke="#CC2264" stroke-width="2"/>
      <!-- Query Line Graph -->
      <circle cx="34" cy="30" r="2.5" fill="#CC2264"/>
      <circle cx="44" cy="20" r="2.5" fill="#CC2264"/>
      <line x1="26" y1="34" x2="34" y2="30" stroke="#CC2264" stroke-width="2.5"/>
      <line x1="34" y1="30" x2="44" y2="20" stroke="#CC2264" stroke-width="2.5"/>
    </svg>`
  },
  {
    key: 'aws_cloudwatch_rule',
    name: 'CloudWatch Event Rule',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_cloudwatch_event_rule',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Regra de correspondência de padrões de eventos que despacha dados para targets como Lambda e SQS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Rule Card 1 -->
      <path d="M10 12H44L52 18V24H10V12Z" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1"/>
      <path d="M43 16L48 21M48 16L43 21" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Rule Card 2 -->
      <path d="M10 26H44L52 32V38H10V26Z" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1"/>
      <path d="M42 32L45 35L50 30" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Rule Card 3 -->
      <path d="M10 40H44L52 46V52H10V40Z" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1"/>
      <path d="M42 46L45 49L50 44" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    key: 'aws_cloudwatch_rum',
    name: 'CloudWatch Real User Monitoring (RUM)',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_rum_app_monitor',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Coleta e analisa dados sobre o desempenho de aplicações web do lado do cliente e a experiência de usuários',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- User Head & Shoulders -->
      <circle cx="26" cy="22" r="7" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.15"/>
      <path d="M12 40C12 33 18 31 26 31C30 31 34 32 37 34" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
      <!-- Pie Chart Analytics -->
      <circle cx="44" cy="42" r="12" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1"/>
      <path d="M44 42L44 30C50.6 30 56 35.4 56 42H44Z" fill="#CC2264"/>
      <path d="M44 42L35.5 50.5" stroke="#CC2264" stroke-width="2.5"/>
    </svg>`
  },
  {
    key: 'aws_cloudwatch_synthetics',
    name: 'CloudWatch Synthetics Canaries',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_synthetics_canary',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Canários automatizados que executam testes sintéticos 24/7 para verificar endpoints e fluxos de usuário',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Robot Canary Dome & Antenna -->
      <circle cx="32" cy="11" r="2.5" fill="#CC2264"/>
      <line x1="32" y1="13" x2="32" y2="18" stroke="#CC2264" stroke-width="2.5"/>
      <!-- Robot Head Outline -->
      <path d="M14 36V28C14 20.3 22.1 18 32 18C41.9 18 50 20.3 50 28V36C50 43.7 41.9 46 32 46C22.1 46 14 43.7 14 36Z" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.15"/>
      <!-- Side ears / sensors -->
      <rect x="8" y="28" width="6" height="8" rx="2" fill="#CC2264"/>
      <rect x="50" y="28" width="6" height="8" rx="2" fill="#CC2264"/>
      <!-- Synthetics Heartbeat Waveform inside visor -->
      <path d="M20 32H25L28 26L31 38L35 30L38 34L40 32H44" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // =========================================================================
  // GROUP 2: AWS SYSTEMS MANAGER (16 icons) - Brand Color: #CC2264
  // =========================================================================
  {
    key: 'aws_ssm_application_manager',
    name: 'Systems Manager Application Manager',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_ssm_document',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Investiga e corrige problemas operacionais agregando recursos por contexto de aplicação',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Cloud Outline Top -->
      <path d="M22 28C22 23 26 18 32 18C37 18 41 22 41 27C44.5 27 47 29.5 47 33C47 36.5 44 39 40 39H20C16 39 13 36 13 32C13 28.5 16 26 19 26" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1" stroke-linecap="round"/>
      <!-- Magnifier left -->
      <circle cx="23" cy="46" r="6.5" stroke="#CC2264" stroke-width="3"/>
      <line x1="28" y1="51" x2="33" y2="56" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
      <!-- Wrench right -->
      <path d="M43 43L37 49M39 41C38 39.5 38.5 37.5 40 36.5C41.5 35.5 43.5 36 44.5 37.5L46 36L48 38L46.5 39.5C48 40.5 48.5 42.5 47.5 44C46.5 45.5 44.5 46 43 45L37 51C36 52 34 52 33 51C32 50 32 48 33 47L39 41Z" stroke="#CC2264" stroke-width="2.5" stroke-linejoin="round" fill="#CC2264" fill-opacity="0.2"/>
    </svg>`
  },
  {
    key: 'aws_ssm_automation',
    name: 'Systems Manager Automation',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_ssm_document',
    defaultSpecs: { documentType: 'Automation', region: 'us-east-1' },
    description: 'Automatiza tarefas rotineiras de manutenção, patching e remediação usando runbooks declarativos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer Gear -->
      <path d="M28 8H36V13C37.5 13.5 39 14.2 40.5 15L44.5 11.5L50 17L46.5 21C47.3 22.5 48 24 48.5 25.5H53.5V33.5H48.5C48 35 47.3 36.5 46.5 38L50 42L44.5 47.5L40.5 44C39 44.8 37.5 45.5 36 46V51H28V46C26.5 45.5 25 44.8 23.5 44L19.5 47.5L14 42L17.5 38C16.7 36.5 16 35 15.5 33.5H10.5V25.5H15.5C16 24 16.7 22.5 17.5 21L14 17L19.5 11.5L23.5 15C25 14.2 26.5 13.5 28 13V8Z" stroke="#CC2264" stroke-width="3" stroke-linejoin="round" fill="#CC2264" fill-opacity="0.1"/>
      <!-- Inner circular refresh arrows -->
      <path d="M24 26C26 23.5 29 22 32.5 22C37.5 22 41.5 26 41.5 31" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
      <path d="M40 22L42.5 22L42.5 25" stroke="#CC2264" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M40 34C38 36.5 35 38 31.5 38C26.5 38 22.5 34 22.5 29" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
      <path d="M24 38L21.5 38L21.5 35" stroke="#CC2264" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    key: 'aws_ssm_change_calendar',
    name: 'Systems Manager Change Calendar',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_ssm_document',
    defaultSpecs: { documentType: 'ChangeCalendar', region: 'us-east-1' },
    description: 'Define períodos seguros ou janelas de congelamento (freeze) de alterações no ambiente AWS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Surrounding circular refresh arrows -->
      <path d="M12 32C12 21 21 12 32 12C37 12 41.5 14 45 17" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
      <path d="M44 11L46 17L40 18" stroke="#CC2264" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M52 32C52 43 43 52 32 52C27 52 22.5 50 19 47" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
      <path d="M20 53L18 47L24 46" stroke="#CC2264" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Calendar Grid Inside -->
      <rect x="20" y="20" width="24" height="24" rx="2" stroke="#CC2264" stroke-width="2.5" fill="white"/>
      <line x1="20" y1="27" x2="44" y2="27" stroke="#CC2264" stroke-width="2"/>
      <circle cx="26" cy="33" r="1.5" fill="#CC2264"/>
      <circle cx="32" cy="33" r="1.5" fill="#CC2264"/>
      <circle cx="38" cy="33" r="1.5" fill="#CC2264"/>
      <circle cx="26" cy="39" r="1.5" fill="#CC2264"/>
      <circle cx="32" cy="39" r="1.5" fill="#CC2264"/>
      <circle cx="38" cy="39" r="1.5" fill="#CC2264"/>
    </svg>`
  },
  {
    key: 'aws_ssm_change_manager',
    name: 'Systems Manager Change Manager',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_ssm_document',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Estrutura corporativa de aprovação e auditoria de solicitações de mudanças de infraestrutura',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Large Gear -->
      <path d="M26 12H38V16C40 17 42 18 44 19.5L47.5 16.5L54 23L51 26.5C52 28.5 53 30.5 54 32.5H58V44.5H54C53 46.5 52 48.5 51 50.5L54 54L47.5 60.5L44 57.5C42 59 40 60 38 61V65H26V61C24 60 22 59 20 57.5L16.5 60.5L10 54L13 50.5C12 48.5 11 46.5 10 44.5H6V32.5H10C11 30.5 12 28.5 13 26.5L10 23L16.5 16.5L20 19.5C22 18 24 17 26 16V12Z" stroke="#CC2264" stroke-width="3" stroke-linejoin="round" fill="#CC2264" fill-opacity="0.1"/>
      <!-- Inner approval checklist lines -->
      <circle cx="32" cy="38.5" r="13" stroke="#CC2264" stroke-width="2.5" fill="white"/>
      <line x1="26" y1="34" x2="38" y2="34" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="26" y1="38.5" x2="38" y2="38.5" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="26" y1="43" x2="35" y2="43" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'aws_ssm_compliance',
    name: 'Systems Manager Compliance',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_ssm_patch_baseline',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Audita e monitora a conformidade de instâncias gerenciadas em relação a patches e configurações',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Clipboard Document -->
      <rect x="14" y="14" width="30" height="42" rx="3" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1"/>
      <path d="M22 14V11C22 9.9 22.9 9 24 9H34C35.1 9 36 9.9 36 11V14" stroke="#CC2264" stroke-width="2.5"/>
      <line x1="20" y1="24" x2="36" y2="24" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="20" y1="32" x2="32" y2="32" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Compliance Rosette Seal Badge Bottom Right -->
      <circle cx="44" cy="42" r="10" stroke="#CC2264" stroke-width="3" fill="white"/>
      <path d="M38 42L42 46L50 38" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M40 52L44 47L48 52" stroke="#CC2264" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    key: 'aws_ssm_distributor',
    name: 'Systems Manager Distributor',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_ssm_document',
    defaultSpecs: { documentType: 'Package', region: 'us-east-1' },
    description: 'Empacota e publica agentes de software e dependências para distribuição em instâncias da frota',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Package Box -->
      <path d="M12 26L32 16L52 26L32 36L12 26Z" stroke="#CC2264" stroke-width="3" stroke-linejoin="round" fill="#CC2264" fill-opacity="0.2"/>
      <path d="M12 26V46L32 56V36" stroke="#CC2264" stroke-width="3" stroke-linejoin="round" fill="#CC2264" fill-opacity="0.1"/>
      <path d="M52 26V46L32 56" stroke="#CC2264" stroke-width="3" stroke-linejoin="round" fill="#CC2264" fill-opacity="0.15"/>
      <!-- Downward distribution arrow into slot -->
      <path d="M32 10V22M32 22L28 18M32 22L36 18" stroke="#CC2264" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="26" y1="36" x2="38" y2="36" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'aws_ssm_documents',
    name: 'Systems Manager Documents (SSM Docs)',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_ssm_document',
    defaultSpecs: { documentType: 'Command', region: 'us-east-1' },
    description: 'Documentos JSON/YAML declarativos que especificam ações de configuração, script ou automação',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Rear Document -->
      <path d="M22 10H46L54 18V48H22V10Z" stroke="#CC2264" stroke-width="2.5" fill="#CC2264" fill-opacity="0.05"/>
      <!-- Mid Document -->
      <path d="M16 16H40L48 24V54H16V16Z" stroke="#CC2264" stroke-width="2.5" fill="#CC2264" fill-opacity="0.1"/>
      <!-- Front Document -->
      <path d="M10 22H34L42 30V60H10V22Z" stroke="#CC2264" stroke-width="3" fill="white"/>
      <path d="M34 22V30H42" stroke="#CC2264" stroke-width="3"/>
      <line x1="16" y1="36" x2="36" y2="36" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="16" y1="44" x2="34" y2="44" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="16" y1="52" x2="28" y2="52" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'aws_ssm_incident_manager',
    name: 'Systems Manager Incident Manager',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_ssm_document',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Coordena planos de resposta a incidentes críticos com escalonamento automático e post-mortems',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Alert Cloud Top -->
      <path d="M20 28C20 22 24 17 31 17C37 17 41 21 41 26C45 26 48 29 48 33C48 37 45 40 40 40H18C14 40 10 36 10 32C10 28 13 25 17 25" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1" stroke-linecap="round"/>
      <!-- Radar Warning Waves -->
      <path d="M22 24C24 21 27 19 31 19" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M19 21C22 17 26 15 31 15" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Alarm Bell Center -->
      <path d="M32 30C28 30 25 33 25 38V45H39V38C39 33 36 30 32 30Z" stroke="#CC2264" stroke-width="3" fill="white"/>
      <line x1="22" y1="45" x2="42" y2="45" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
      <circle cx="32" cy="49" r="2.5" fill="#CC2264"/>
    </svg>`
  },
  {
    key: 'aws_ssm_inventory',
    name: 'Systems Manager Inventory',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_ssm_document',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Coleta metadados de software instalado, configurações de SO e hardware de instâncias gerenciadas',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- House / Warehouse rack outline -->
      <path d="M10 28L32 10L54 28V54H10V28Z" stroke="#CC2264" stroke-width="3" stroke-linejoin="round" fill="#CC2264" fill-opacity="0.1"/>
      <!-- Inventory Grid / matrix of tiles inside -->
      <rect x="20" y="24" width="6" height="6" rx="1" fill="#CC2264"/>
      <rect x="29" y="24" width="6" height="6" rx="1" fill="#CC2264"/>
      <rect x="38" y="24" width="6" height="6" rx="1" fill="#CC2264"/>
      <rect x="20" y="33" width="6" height="6" rx="1" fill="#CC2264"/>
      <rect x="29" y="33" width="6" height="6" rx="1" fill="#CC2264"/>
      <rect x="38" y="33" width="6" height="6" rx="1" fill="#CC2264"/>
      <rect x="20" y="42" width="6" height="6" rx="1" fill="#CC2264"/>
      <rect x="29" y="42" width="6" height="6" rx="1" fill="#CC2264"/>
      <rect x="38" y="42" width="6" height="6" rx="1" fill="#CC2264"/>
    </svg>`
  },
  {
    key: 'aws_ssm_maintenance_windows',
    name: 'Systems Manager Maintenance Windows',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_ssm_maintenance_window',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Define agendamentos restritos para executar tarefas com potencial de impacto em instâncias da frota',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Gear Outer Teeth -->
      <path d="M28 8H36V13C37.5 13.5 39 14.2 40.5 15L44.5 11.5L50 17L46.5 21C47.3 22.5 48 24 48.5 25.5H53.5V33.5H48.5C48 35 47.3 36.5 46.5 38L50 42L44.5 47.5L40.5 44C39 44.8 37.5 45.5 36 46V51H28V46C26.5 45.5 25 44.8 23.5 44L19.5 47.5L14 42L17.5 38C16.7 36.5 16 35 15.5 33.5H10.5V25.5H15.5C16 24 16.7 22.5 17.5 21L14 17L19.5 11.5L23.5 15C25 14.2 26.5 13.5 28 13V8Z" stroke="#CC2264" stroke-width="3" stroke-linejoin="round" fill="#CC2264" fill-opacity="0.1"/>
      <!-- Center Clock Face -->
      <circle cx="32" cy="29.5" r="11" stroke="#CC2264" stroke-width="2.8" fill="white"/>
      <path d="M32 23V30H37" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'aws_ssm_opscenter',
    name: 'Systems Manager OpsCenter',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_ssm_document',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Ponto focal para operadores visualizarem, investigarem e resolverem OpsItems relacionados a recursos AWS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Circular Dashboard Target with Magnifier -->
      <circle cx="28" cy="28" r="18" stroke="#CC2264" stroke-width="3" stroke-dasharray="4 2" fill="#CC2264" fill-opacity="0.1"/>
      <circle cx="28" cy="28" r="10" stroke="#CC2264" stroke-width="2.5" fill="white"/>
      <!-- Clock needle -->
      <path d="M28 22V28L32 31" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Inspection Arm Handle -->
      <line x1="42" y1="42" x2="54" y2="54" stroke="#CC2264" stroke-width="4.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'aws_ssm_parameter_store',
    name: 'Systems Manager Parameter Store',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_ssm_parameter',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Armazenamento hierárquico seguro para dados de configuração e segredos criptografados por KMS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Container / Vault Box -->
      <path d="M12 24L32 14L52 24V54H12V24Z" stroke="#CC2264" stroke-width="3" stroke-linejoin="round" fill="#CC2264" fill-opacity="0.1"/>
      <rect x="22" y="30" width="14" height="18" stroke="#CC2264" stroke-width="2" fill="white"/>
      <line x1="25" y1="35" x2="33" y2="35" stroke="#CC2264" stroke-width="2"/>
      <line x1="25" y1="39" x2="33" y2="39" stroke="#CC2264" stroke-width="2"/>
      <line x1="25" y1="43" x2="31" y2="43" stroke="#CC2264" stroke-width="2"/>
      <!-- KMS Lock on bottom right -->
      <rect x="36" y="36" width="18" height="18" rx="3" stroke="#CC2264" stroke-width="2.5" fill="white"/>
      <path d="M40 36V32C40 29.5 42 27.5 45 27.5C48 27.5 50 29.5 50 32V36" stroke="#CC2264" stroke-width="2.5"/>
      <circle cx="45" cy="44" r="2" fill="#CC2264"/>
    </svg>`
  },
  {
    key: 'aws_ssm_patch_manager',
    name: 'Systems Manager Patch Manager',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_ssm_patch_baseline',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Automatiza o processo de aplicação e verificação de patches de segurança e SO em instâncias',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Interlocking Patch Bandages Ring -->
      <g stroke="#CC2264" stroke-width="3" stroke-linecap="round">
        <line x1="24" y1="16" x2="40" y2="16"/>
        <line x1="20" y1="22" x2="44" y2="22"/>
        <line x1="16" y1="28" x2="48" y2="28"/>
        <line x1="48" y1="24" x2="48" y2="40"/>
        <line x1="42" y1="20" x2="42" y2="44"/>
        <line x1="36" y1="16" x2="36" y2="48"/>
        <line x1="40" y1="48" x2="24" y2="48"/>
        <line x1="44" y1="42" x2="20" y2="42"/>
        <line x1="16" y1="40" x2="16" y2="24"/>
        <line x1="22" y1="44" x2="22" y2="20"/>
      </g>
    </svg>`
  },
  {
    key: 'aws_ssm_run_command',
    name: 'Systems Manager Run Command',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_ssm_association',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Permite gerenciar a configuração e executar scripts de forma segura em escala sem necessidade de portas SSH abertas',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Speed motion lines on left -->
      <line x1="6" y1="22" x2="18" y2="22" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
      <line x1="6" y1="32" x2="16" y2="32" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
      <line x1="6" y1="42" x2="18" y2="42" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
      <!-- Slanted execution terminal packet -->
      <path d="M26 14H52L46 54H20L26 14Z" stroke="#CC2264" stroke-width="3" stroke-linejoin="round" fill="#CC2264" fill-opacity="0.15"/>
      <path d="M29 28H44" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M27 36H41" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'aws_ssm_session_manager',
    name: 'Systems Manager Session Manager',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_ssm_document',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Acesso seguro a shells de instâncias EC2 pelo navegador sem portas abertas ou bastions',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Server Rack Top Right -->
      <rect x="34" y="10" width="22" height="18" rx="2" stroke="#CC2264" stroke-width="2.8" fill="#CC2264" fill-opacity="0.1"/>
      <line x1="34" y1="19" x2="56" y2="19" stroke="#CC2264" stroke-width="2"/>
      <circle cx="38" cy="14.5" r="1.5" fill="#CC2264"/>
      <circle cx="38" cy="23.5" r="1.5" fill="#CC2264"/>
      <!-- Client Desktop Monitor Bottom Left -->
      <rect x="10" y="34" width="24" height="18" rx="2" stroke="#CC2264" stroke-width="2.8" fill="#CC2264" fill-opacity="0.1"/>
      <path d="M16 52L14 56H30L28 52" stroke="#CC2264" stroke-width="2.5" stroke-linejoin="round"/>
      <!-- Cloud Secure Interconnection -->
      <path d="M22 28C22 24 25 21 29 21C32 21 34 23 35 25C37 25 39 27 39 29C39 31 37 33 35 33H23C21 33 19 31 19 29" stroke="#CC2264" stroke-width="2.5" fill="white"/>
    </svg>`
  },
  {
    key: 'aws_ssm_state_manager',
    name: 'Systems Manager State Manager',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_ssm_association',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Aplica e garante continuamente o estado de configuração desejado (DSC) em instâncias e servidores',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Browser window outline -->
      <rect x="10" y="12" width="44" height="42" rx="4" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1"/>
      <line x1="10" y1="24" x2="54" y2="24" stroke="#CC2264" stroke-width="2.5"/>
      <circle cx="16" cy="18" r="1.5" fill="#CC2264"/>
      <circle cx="21" cy="18" r="1.5" fill="#CC2264"/>
      <circle cx="26" cy="18" r="1.5" fill="#CC2264"/>
      <!-- Desired state shapes inside: Bar + Shapes -->
      <rect x="16" y="36" width="8" height="14" stroke="#CC2264" stroke-width="2" fill="white"/>
      <circle cx="20" cy="31" r="3" stroke="#CC2264" stroke-width="2" fill="white"/>
      <rect x="29" y="28" width="8" height="22" stroke="#CC2264" stroke-width="2" fill="white"/>
      <path d="M33 32L36 37H30L33 32Z" stroke="#CC2264" stroke-width="1.8" fill="white"/>
      <rect x="42" y="32" width="8" height="18" stroke="#CC2264" stroke-width="2" fill="white"/>
      <rect x="44" y="37" width="4" height="4" stroke="#CC2264" stroke-width="1.8" fill="white"/>
    </svg>`
  },

  // =========================================================================
  // GROUP 3: AWS CLOUDFORMATION (3 icons) - Brand Color: #CC2264
  // =========================================================================
  {
    key: 'aws_cloudformation_change_set',
    name: 'CloudFormation Change Set',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_cloudformation_stack',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Visualização prévia das alterações que serão efetuadas em uma pilha de infraestrutura antes da execução',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Sheet outline -->
      <rect x="14" y="10" width="36" height="46" rx="2" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1"/>
      <!-- Row 1: Square -> Triangle -->
      <rect x="20" y="17" width="6" height="6" stroke="#CC2264" stroke-width="2"/>
      <path d="M30 20H34M34 20L32 18M34 20L32 22" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
      <path d="M41 17L44 23H38L41 17Z" stroke="#CC2264" stroke-width="2"/>
      <!-- Row 2: Circle -> Oval -->
      <circle cx="23" cy="32" r="3.5" stroke="#CC2264" stroke-width="2"/>
      <path d="M30 32H34M34 32L32 30M34 32L32 34" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="41" cy="32" rx="4.5" ry="3" stroke="#CC2264" stroke-width="2"/>
      <!-- Row 3: Circle -> X -->
      <circle cx="23" cy="44" r="3.5" stroke="#CC2264" stroke-width="2"/>
      <path d="M30 44H34M34 44L32 42M34 44L32 46" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
      <path d="M39 42L43 46M43 42L39 46" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'aws_cloudformation_stack',
    name: 'CloudFormation Stack',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_cloudformation_stack',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Pilha gerenciada de recursos AWS provisionados e atualizados como uma unidade única e declarativa',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Top Single Block -->
      <rect x="10" y="12" width="44" height="10" rx="1" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.2"/>
      <!-- Middle 2 Blocks -->
      <rect x="10" y="26" width="20" height="10" rx="1" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.15"/>
      <rect x="34" y="26" width="20" height="10" rx="1" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.15"/>
      <!-- Bottom 3 Blocks -->
      <rect x="10" y="40" width="12" height="10" rx="1" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1"/>
      <rect x="26" y="40" width="12" height="10" rx="1" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1"/>
      <rect x="42" y="40" width="12" height="10" rx="1" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1"/>
    </svg>`
  },
  {
    key: 'aws_cloudformation_template',
    name: 'CloudFormation Template',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_cloudformation_stack',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Arquivo de modelo JSON/YAML declarativo especificando a arquitetura completa da infraestrutura',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Blueprint Page -->
      <rect x="14" y="10" width="36" height="46" rx="2" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1"/>
      <!-- Architectural shapes on template blueprint -->
      <rect x="20" y="22" width="10" height="10" stroke="#CC2264" stroke-width="2.5" fill="white"/>
      <path d="M38 18L44 28H32L38 18Z" stroke="#CC2264" stroke-width="2.5" fill="white"/>
      <circle cx="34" cy="42" r="6" stroke="#CC2264" stroke-width="2.5" fill="white"/>
    </svg>`
  },

  // =========================================================================
  // GROUP 4: AWS CLOUDTRAIL LAKE (1 icon) - Brand Color: #CC2264
  // =========================================================================
  {
    key: 'aws_cloudtrail_lake',
    name: 'CloudTrail Lake',
    provider: 'aws',
    category: 'security',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_cloudtrail_event_data_store',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Data lake gerenciado para agregação, retenção imutável e consultas SQL avançadas de eventos de auditoria',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Cloud Trail Audit Cloud -->
      <path d="M22 28C22 23 26 19 32 19C37 19 41 22 41 27C45 27 48 30 48 34C48 38 45 41 40 41H18C14 41 10 38 10 33C10 29 13 26 17 26" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.15" stroke-linecap="round"/>
      <!-- Ingestion Funnel in Cloud Center -->
      <path d="M28 20L36 20L33 26V30L31 30V26L28 20Z" stroke="#CC2264" stroke-width="2.5" stroke-linejoin="round" fill="white"/>
      <!-- Lake Water Waves Bottom -->
      <path d="M8 44C12 44 14 42 18 42C22 42 24 44 28 44C32 44 34 42 38 42C42 42 44 44 48 44C52 44 54 42 58 42" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
      <path d="M8 50C12 50 14 48 18 48C22 48 24 50 28 50C32 50 34 48 38 48C42 48 44 50 48 50C52 50 54 48 58 48" stroke="#CC2264" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },

  // =========================================================================
  // GROUP 5: AWS LICENSE MANAGER (2 icons) - Brand Color: #CC2264
  // =========================================================================
  {
    key: 'aws_license_manager_application_discovery',
    name: 'License Manager Application Discovery',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_licensemanager_license_configuration',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Descoberta e inventário automatizado de licenças de software em ambientes híbridos e na nuvem',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- License Tag Top Left -->
      <path d="M12 28L28 12H40V24L24 40L12 28Z" stroke="#CC2264" stroke-width="3" stroke-linejoin="round" fill="#CC2264" fill-opacity="0.15"/>
      <circle cx="34" cy="18" r="2.5" fill="#CC2264"/>
      <!-- Discovery Magnifier over License Tag -->
      <circle cx="36" cy="36" r="11" stroke="#CC2264" stroke-width="3.5" fill="white"/>
      <line x1="44" y1="44" x2="56" y2="56" stroke="#CC2264" stroke-width="4.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'aws_license_manager_license_blending',
    name: 'License Manager License Blending',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_licensemanager_license_configuration',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Otimização e transição contínua entre licenças incluídas da AWS e licenças próprias (BYOL)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- License Certificate Document -->
      <path d="M16 12H40L48 20V52H16V12Z" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1"/>
      <!-- Badge on Document -->
      <circle cx="26" cy="38" r="6" stroke="#CC2264" stroke-width="2.5" fill="white"/>
      <path d="M23 44L26 42L29 44" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
      <!-- Circular Blending / Conversion Arrows Right -->
      <path d="M42 26C45 28 47 31 47 35C47 37 46 39 44 41" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M43 24L48 25L45 29" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M38 46C35 44 33 41 33 37C33 35 34 33 36 31" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M37 48L32 47L35 43" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // =========================================================================
  // GROUP 6: AWS ORGANIZATIONS (3 icons) - Brand Color: #CC2264
  // =========================================================================
  {
    key: 'aws_organizations_account',
    name: 'Organizations Member Account',
    provider: 'aws',
    category: 'security',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_organizations_account',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Conta membro governada centralmente sob políticas organizacionais SCP e faturamento consolidado',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Account Enclosing Boundary -->
      <rect x="10" y="10" width="44" height="44" rx="2" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.08"/>
      <!-- Geometric Resources inside Member Account -->
      <rect x="18" y="24" width="12" height="12" stroke="#CC2264" stroke-width="2.8" fill="white"/>
      <path d="M40 18L47 30H33L40 18Z" stroke="#CC2264" stroke-width="2.8" fill="white"/>
      <circle cx="36" cy="42" r="6" stroke="#CC2264" stroke-width="2.8" fill="white"/>
    </svg>`
  },
  {
    key: 'aws_organizations_management_account',
    name: 'Organizations Management Account',
    provider: 'aws',
    category: 'security',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_organizations_organization',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Conta raiz de gerenciamento da AWS Organization que controla Service Control Policies (SCPs)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Boundary with top-left control gear cutout -->
      <path d="M10 26V54H54V10H26" stroke="#CC2264" stroke-width="3" stroke-linecap="round" fill="#CC2264" fill-opacity="0.08"/>
      <!-- Management Gear in Top-Left Corner -->
      <circle cx="18" cy="18" r="6" stroke="#CC2264" stroke-width="2.8" fill="white"/>
      <path d="M18 10V13M18 23V26M10 18H13M23 18H26" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Governed Member Shapes Inside -->
      <rect x="22" y="34" width="10" height="10" stroke="#CC2264" stroke-width="2.8" fill="white"/>
      <path d="M42 20L48 30H36L42 20Z" stroke="#CC2264" stroke-width="2.8" fill="white"/>
      <circle cx="41" cy="42" r="5" stroke="#CC2264" stroke-width="2.8" fill="white"/>
    </svg>`
  },
  {
    key: 'aws_organizations_organizational_unit',
    name: 'Organizations Organizational Unit (OU)',
    provider: 'aws',
    category: 'security',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_organizations_organizational_unit',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Unidade Organizacional (OU) para agrupar contas e aplicar políticas de controle de serviço hierárquicas',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Rear Nested Parent Container -->
      <path d="M18 10H54V46" stroke="#CC2264" stroke-width="3" stroke-linecap="round" fill="none"/>
      <!-- Front Active OU Container -->
      <rect x="10" y="18" width="40" height="40" rx="2" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.08"/>
      <!-- Account Resource Shapes inside OU -->
      <rect x="18" y="32" width="10" height="10" stroke="#CC2264" stroke-width="2.5" fill="white"/>
      <path d="M38 24L44 34H32L38 24Z" stroke="#CC2264" stroke-width="2.5" fill="white"/>
      <circle cx="36" cy="46" r="5" stroke="#CC2264" stroke-width="2.5" fill="white"/>
    </svg>`
  },

  // =========================================================================
  // GROUP 7: AWS TRUSTED ADVISOR (5 icons) - Brand Color: #CC2264
  // =========================================================================
  {
    key: 'aws_trusted_advisor_checklist',
    name: 'Trusted Advisor Checklist Geral',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_trusted_advisor_checklist',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Checklist geral de recomendações em tempo real seguindo os pilares do AWS Well-Architected Framework',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Checklist Document -->
      <rect x="12" y="10" width="40" height="48" rx="2" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1"/>
      <!-- Checkbox Row 1 -->
      <path d="M18 20L22 24L28 17" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="32" y1="21" x2="44" y2="21" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Checkbox Row 2 -->
      <path d="M18 32L22 36L28 29" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="32" y1="33" x2="44" y2="33" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Checkbox Row 3 -->
      <path d="M18 44L22 48L28 41" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="32" y1="45" x2="44" y2="45" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    key: 'aws_trusted_advisor_checklist_cost',
    name: 'Trusted Advisor Checklist de Otimização de Custos',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_trusted_advisor_checklist',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Verificações de otimização de custo para eliminar recursos subutilizados e reduzir faturas',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Checklist Document -->
      <rect x="10" y="10" width="34" height="46" rx="2" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1"/>
      <path d="M15 18L18 21L23 16" stroke="#CC2264" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="26" y1="19" x2="38" y2="19" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
      <path d="M15 28L18 31L23 26" stroke="#CC2264" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="26" y1="29" x2="38" y2="29" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
      <path d="M15 38L18 41L23 36" stroke="#CC2264" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="26" y1="39" x2="38" y2="39" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
      <!-- Price / Discount Tag Badge on Right -->
      <path d="M34 40L46 28H56V38L44 50L34 40Z" stroke="#CC2264" stroke-width="3" stroke-linejoin="round" fill="white"/>
      <circle cx="51" cy="33" r="2.5" fill="#CC2264"/>
    </svg>`
  },
  {
    key: 'aws_trusted_advisor_checklist_fault_tolerant',
    name: 'Trusted Advisor Checklist de Tolerância a Falhas',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_trusted_advisor_checklist',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Verificações de resiliência e alta disponibilidade incluindo backups, redundância e limites de serviço',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Checklist Document -->
      <rect x="10" y="10" width="34" height="46" rx="2" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1"/>
      <path d="M15 18L18 21L23 16" stroke="#CC2264" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="26" y1="19" x2="38" y2="19" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
      <path d="M15 28L18 31L23 26" stroke="#CC2264" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="26" y1="29" x2="38" y2="29" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
      <path d="M15 38L18 41L23 36" stroke="#CC2264" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="26" y1="39" x2="38" y2="39" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
      <!-- Fault Tolerant Warning Triangle Badge -->
      <path d="M46 32L58 52H34L46 32Z" stroke="#CC2264" stroke-width="3" stroke-linejoin="round" fill="white"/>
      <line x1="46" y1="40" x2="46" y2="45" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="46" cy="48.5" r="1.5" fill="#CC2264"/>
    </svg>`
  },
  {
    key: 'aws_trusted_advisor_checklist_performance',
    name: 'Trusted Advisor Checklist de Performance',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_trusted_advisor_checklist',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Verificações de performance para garantir dimensionamento ideal e eliminar gargalos de throughput',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Checklist Document -->
      <rect x="10" y="10" width="34" height="46" rx="2" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1"/>
      <path d="M15 18L18 21L23 16" stroke="#CC2264" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="26" y1="19" x2="38" y2="19" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
      <path d="M15 28L18 31L23 26" stroke="#CC2264" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="26" y1="29" x2="38" y2="29" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
      <path d="M15 38L18 41L23 36" stroke="#CC2264" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="26" y1="39" x2="38" y2="39" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
      <!-- Performance Rising Trend Graph Badge -->
      <rect x="34" y="32" width="22" height="20" rx="2" stroke="#CC2264" stroke-width="2.8" fill="white"/>
      <line x1="39" y1="46" x2="39" y2="43" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
      <line x1="44" y1="46" x2="44" y2="39" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
      <line x1="49" y1="46" x2="49" y2="36" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
      <path d="M38 43L44 38L50 35M50 35H46M50 35V39" stroke="#CC2264" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    key: 'aws_trusted_advisor_checklist_security',
    name: 'Trusted Advisor Checklist de Segurança',
    provider: 'aws',
    category: 'security',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_trusted_advisor_checklist',
    defaultSpecs: { region: 'us-east-1' },
    description: 'Verificações vitais de segurança, identificando permissões abertas no S3, falta de MFA e grupos de segurança vulneráveis',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Checklist Document -->
      <rect x="10" y="10" width="34" height="46" rx="2" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.1"/>
      <path d="M15 18L18 21L23 16" stroke="#CC2264" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="26" y1="19" x2="38" y2="19" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
      <path d="M15 28L18 31L23 26" stroke="#CC2264" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="26" y1="29" x2="38" y2="29" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
      <path d="M15 38L18 41L23 36" stroke="#CC2264" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="26" y1="39" x2="38" y2="39" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
      <!-- Security Padlock Badge -->
      <rect x="36" y="35" width="20" height="17" rx="3" stroke="#CC2264" stroke-width="2.8" fill="white"/>
      <path d="M41 35V30C41 27 43 25 46 25C49 25 51 27 51 30V35" stroke="#CC2264" stroke-width="2.5"/>
      <circle cx="46" cy="42" r="2" fill="#CC2264"/>
      <line x1="46" y1="44" x2="46" y2="47" stroke="#CC2264" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },

  // AWS Control Tower (Landing Zone, Multi-Account Governance & Guardrails)
  {
    key: 'aws_control_tower',
    name: 'AWS Control Tower',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_controltower_control',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Governança automatizada e orquestração de ambiente multi-conta seguro (Landing Zone) com guardrails preventivos e detectivos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#CC2264" fill-opacity="0.12" stroke="#CC2264" stroke-width="1.5"/>
      <!-- Concentric Radar/Governance Signal Arcs -->
      <path d="M18 18C13.5 22.5 13.5 31.5 18 36" stroke="#CC2264" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M46 18C50.5 22.5 50.5 31.5 46 36" stroke="#CC2264" stroke-width="2" stroke-linecap="round" fill="none"/>
      <!-- Outer Guardrail Circle -->
      <circle cx="32" cy="27" r="19" stroke="#CC2264" stroke-width="1.5" stroke-dasharray="3 3" fill="none"/>
      <!-- Observation Tower Core -->
      <path d="M24 52L28 38H36L40 52" stroke="#CC2264" stroke-width="2.5" stroke-linejoin="round" fill="#CC2264" fill-opacity="0.15"/>
      <line x1="26" y1="45" x2="38" y2="45" stroke="#CC2264" stroke-width="2"/>
      <rect x="23" y="27" width="18" height="11" rx="2" stroke="#CC2264" stroke-width="2.5" fill="white"/>
      <line x1="27" y1="32.5" x2="37" y2="32.5" stroke="#CC2264" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Antenna Mast & Beacon -->
      <line x1="32" y1="14" x2="32" y2="27" stroke="#CC2264" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="32" cy="12" r="3" fill="#CC2264"/>
      <!-- Multi-Account Node Satellites -->
      <circle cx="12" cy="44" r="3.5" stroke="#CC2264" stroke-width="2" fill="white"/>
      <line x1="15.5" y1="43" x2="24" y2="42" stroke="#CC2264" stroke-width="1.5" stroke-dasharray="1 1"/>
      <circle cx="52" cy="44" r="3.5" stroke="#CC2264" stroke-width="2" fill="white"/>
      <line x1="48.5" y1="43" x2="40" y2="42" stroke="#CC2264" stroke-width="1.5" stroke-dasharray="1 1"/>
    </svg>`
  },

  // AWS Config (Resource Inventory, Compliance Rules & History Recorder)
  {
    key: 'aws_config',
    name: 'AWS Config',
    provider: 'aws',
    category: 'devops',
    brandColor: '#CC2264',
    defaultResourceType: 'aws_config_configuration_recorder',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Auditoria contínua, histórico detalhado de alterações, inventário de recursos e avaliação automática de conformidade contra regras',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#CC2264" fill-opacity="0.12" stroke="#CC2264" stroke-width="1.5"/>
      <!-- Central Configuration Gear -->
      <circle cx="32" cy="32" r="14" stroke="#CC2264" stroke-width="3" fill="#CC2264" fill-opacity="0.15"/>
      <!-- Gear Teeth around perimeter -->
      <rect x="30" y="14" width="4" height="5" rx="1" fill="#CC2264"/>
      <rect x="30" y="45" width="4" height="5" rx="1" fill="#CC2264"/>
      <rect x="14" y="30" width="5" height="4" rx="1" fill="#CC2264"/>
      <rect x="45" y="30" width="5" height="4" rx="1" fill="#CC2264"/>
      <rect x="19.5" y="19.5" width="4.5" height="4.5" rx="1" transform="rotate(45 21.7 21.7)" fill="#CC2264"/>
      <rect x="40" y="40" width="4.5" height="4.5" rx="1" transform="rotate(45 42.2 42.2)" fill="#CC2264"/>
      <rect x="40" y="19.5" width="4.5" height="4.5" rx="1" transform="rotate(-45 42.2 21.7)" fill="#CC2264"/>
      <rect x="19.5" y="40" width="4.5" height="4.5" rx="1" transform="rotate(-45 21.7 42.2)" fill="#CC2264"/>
      <!-- Inner Compliance Checklist & Checkmark Badge -->
      <circle cx="32" cy="32" r="8" fill="white" stroke="#CC2264" stroke-width="2"/>
      <path d="M28 32L31 35L36 29" stroke="#CC2264" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Timeline Tracking Points -->
      <circle cx="12" cy="14" r="2.5" fill="#CC2264"/>
      <line x1="15" y1="14" x2="26" y2="14" stroke="#CC2264" stroke-width="1.8" stroke-dasharray="1.5 1.5"/>
      <circle cx="52" cy="50" r="2.5" fill="#CC2264"/>
      <line x1="49" y1="50" x2="38" y2="50" stroke="#CC2264" stroke-width="1.8" stroke-dasharray="1.5 1.5"/>
    </svg>`
  }
];
