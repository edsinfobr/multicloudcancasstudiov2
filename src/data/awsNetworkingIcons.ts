import { CloudIconDefinition } from '../types';

export const AWS_NETWORKING_ICONS: CloudIconDefinition[] = [
  // 1. API Gateway Endpoint
  {
    key: 'aws_api_gateway_endpoint',
    name: 'API Gateway Endpoint',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_api_gateway_rest_api',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Ponto de extremidade privado para APIs REST/HTTP via AWS API Gateway',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="21,10 43,10 54,21 54,43 43,54 21,54 10,43 10,21" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <path d="M25 18H20V46H25" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M39 18H44V46H39" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="28" cy="32" r="2" fill="#8C4FFF"/>
      <circle cx="32" cy="32" r="2" fill="#8C4FFF"/>
      <circle cx="36" cy="32" r="2" fill="#8C4FFF"/>
    </svg>`
  },

  // 2. CloudFront Download Distribution
  {
    key: 'aws_cloudfront_download_distribution',
    name: 'CloudFront Download Distribution',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_cloudfront_distribution',
    defaultSpecs: { transferGb: 500 },
    description: 'Distribuição CloudFront para entrega acelerada de conteúdo e downloads estáticos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="23" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <line x1="32" y1="16" x2="32" y2="40" stroke="#8C4FFF" stroke-width="3" stroke-dasharray="3 3"/>
      <path d="M26 34L32 41L38 34" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="20" cy="32" r="2.2" fill="#8C4FFF"/>
      <circle cx="44" cy="32" r="2.2" fill="#8C4FFF"/>
    </svg>`
  },

  // 3. CloudFront Edge Location
  {
    key: 'aws_cloudfront_edge_location',
    name: 'CloudFront Edge Location',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_cloudfront_distribution',
    defaultSpecs: { count: 1 },
    description: 'Ponto de presença de borda (PoP) global para cache com baixa latência',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="11" y="11" width="42" height="42" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <path d="M11 38C21 33 43 33 53 38" stroke="#8C4FFF" stroke-width="3"/>
      <rect x="24" y="24" width="16" height="16" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.25"/>
    </svg>`
  },

  // 4. CloudFront Functions
  {
    key: 'aws_cloudfront_functions',
    name: 'CloudFront Functions',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_cloudfront_function',
    defaultSpecs: { count: 1 },
    description: 'Computação leve em JavaScript executada diretamente na borda do CloudFront',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28 11H36L38 16L43 18L48 15L53 20L50 25L52 30L57 32V40L52 42L50 47L53 52L48 57L43 54L38 56L36 61H28L26 56L21 54L16 57L11 52L14 47L12 42L7 40V32L12 30L14 25L11 20L16 15L21 18L26 16L28 11Z" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <circle cx="32" cy="24" r="3" fill="#8C4FFF"/>
      <circle cx="23" cy="38" r="3" fill="#8C4FFF"/>
      <circle cx="41" cy="40" r="3" fill="#8C4FFF"/>
      <path d="M30 26C26 30 25 34 24 35M34 26C38 30 40 35 41 37M25 39C30 38 35 39 39 40" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // 5. CloudFront Streaming Distribution
  {
    key: 'aws_cloudfront_streaming_distribution',
    name: 'CloudFront Streaming Distribution',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_cloudfront_distribution',
    defaultSpecs: { transferGb: 1000 },
    description: 'Streaming de vídeo sob demanda e ao vivo com cache e otimização RTMP/HLS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="23" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <line x1="32" y1="16" x2="32" y2="42" stroke="#8C4FFF" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M23 34L32 43L41 34" stroke="#8C4FFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 6. Route 53 Readiness Checks
  {
    key: 'aws_route53_readiness_checks',
    name: 'Route 53 Readiness Checks',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_route53recoveryreadiness_readiness_check',
    defaultSpecs: { count: 1 },
    description: 'Verificação contínua de prontidão para recuperação de desastres (Recovery Controller)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 18C14 18 22 14 32 14C42 14 50 18 50 18V33C50 43 32 50 32 50C32 50 14 43 14 33V18Z" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <path d="M24 33L29 38L40 27" stroke="#8C4FFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 7. Route 53 Resolver
  {
    key: 'aws_route53_resolver',
    name: 'Route 53 Resolver',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_route53_resolver_endpoint',
    defaultSpecs: { count: 1 },
    description: 'Servidor DNS recursivo integrado para tráfego entre VPCs e redes híbridas on-premise',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 18C14 18 22 14 32 14C42 14 50 18 50 18V33C50 43 32 50 32 50C32 50 14 43 14 33V18Z" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <circle cx="32" cy="25" r="4" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="23" cy="38" r="4" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="41" cy="38" r="4" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M30 28L25 35M34 28L39 35" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // 8. Route 53 Resolver DNS Firewall
  {
    key: 'aws_route53_resolver_dns_firewall',
    name: 'Route 53 Resolver DNS Firewall',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_route53_resolver_firewall_rule_group',
    defaultSpecs: { count: 1 },
    description: 'Firewall de filtragem para consultas DNS de saída bloqueando domínios maliciosos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 18C14 18 22 14 32 14C42 14 50 18 50 18V33C50 43 32 50 32 50C32 50 14 43 14 33V18Z" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <path d="M32 23C30 26 27 28 27 33C27 37 30 40 33 40C36 40 39 37 39 33C39 28 35 25 35 22C33 24 32 25 32 26" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.25" stroke-linejoin="round"/>
    </svg>`
  },

  // 9. Route 53 Resolver Query Logging
  {
    key: 'aws_route53_resolver_query_logging',
    name: 'Route 53 Resolver Query Logging',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_route53_resolver_query_log_config',
    defaultSpecs: { count: 1 },
    description: 'Auditoria e registro de logs de consultas DNS para análise no CloudWatch/S3',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 18C14 18 22 14 32 14C42 14 50 18 50 18V33C50 43 32 50 32 50C32 50 14 43 14 33V18Z" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <rect x="25" y="24" width="14" height="18" rx="1.5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <line x1="28" y1="29" x2="36" y2="29" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
      <line x1="28" y1="33" x2="36" y2="33" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
      <line x1="28" y1="37" x2="33" y2="37" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },

  // 10. Route 53 Route Table
  {
    key: 'aws_route53_route_table',
    name: 'Route 53 Route Table',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_route_table',
    defaultSpecs: { count: 1 },
    description: 'Tabela de rotas e mapeamento de endereços CIDR de rede para domínios',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="11" y="12" width="42" height="11" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <rect x="11" y="26" width="42" height="11" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <rect x="11" y="40" width="42" height="11" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <text x="32" y="20" font-size="7" font-family="monospace" font-weight="bold" fill="#8C4FFF" text-anchor="middle">172.16.0.0</text>
      <text x="32" y="34" font-size="7" font-family="monospace" font-weight="bold" fill="#8C4FFF" text-anchor="middle">172.16.1.0</text>
      <text x="32" y="48" font-size="7" font-family="monospace" font-weight="bold" fill="#8C4FFF" text-anchor="middle">172.16.2.0</text>
    </svg>`
  },

  // 11. Route 53 Routing Controls
  {
    key: 'aws_route53_routing_controls',
    name: 'Route 53 Routing Controls',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_route53recoverycontrolconfig_routing_control',
    defaultSpecs: { count: 1 },
    description: 'Chaves de controle de failover sob demanda para desvio manual ou automatizado de tráfego',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 18C14 18 22 14 32 14C42 14 50 18 50 18V33C50 43 32 50 32 50C32 50 14 43 14 33V18Z" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <line x1="20" y1="26" x2="44" y2="26" stroke="#8C4FFF" stroke-width="2.5"/>
      <circle cx="28" cy="26" r="3.5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF"/>
      <line x1="20" y1="33" x2="44" y2="33" stroke="#8C4FFF" stroke-width="2.5"/>
      <circle cx="38" cy="33" r="3.5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF"/>
      <line x1="20" y1="40" x2="44" y2="40" stroke="#8C4FFF" stroke-width="2.5"/>
      <circle cx="32" cy="40" r="3.5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF"/>
    </svg>`
  },

  // 12. Route 53 Hosted Zone
  {
    key: 'aws_route53_hosted_zone',
    name: 'Route 53 Hosted Zone',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_route53_zone',
    defaultSpecs: { count: 1 },
    description: 'Zona hospedada pública ou privada contendo registros de DNS (A, CNAME, TXT, MX)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 18C14 18 22 14 32 14C42 14 50 18 50 18V33C50 43 32 50 32 50C32 50 14 43 14 33V18Z" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <path d="M20 22C20 22 25 19 32 19C39 19 44 22 44 22V32C44 39 32 44 32 44C32 44 20 39 20 32V22Z" stroke="#8C4FFF" stroke-width="2" fill="none"/>
    </svg>`
  },

  // 13. VPC Carrier Gateway
  {
    key: 'aws_vpc_carrier_gateway',
    name: 'VPC Carrier Gateway',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_ec2_carrier_gateway',
    defaultSpecs: { count: 1 },
    description: 'Conectividade direta de saída para redes de operadoras de telecomunicações (AWS Wavelength)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="23" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <circle cx="32" cy="32" r="4" fill="#8C4FFF"/>
      <path d="M24 24C22 28 22 36 24 40M40 24C42 28 42 36 40 40" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M32 24V16M29 19L32 16L35 19M32 40V48M29 45L32 48L35 45" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 14. VPC Customer Gateway
  {
    key: 'aws_vpc_customer_gateway',
    name: 'VPC Customer Gateway',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_customer_gateway',
    defaultSpecs: { count: 1 },
    description: 'Representação e roteamento para o dispositivo físico ou virtual do cliente em conexões VPN',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="23" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <path d="M32 16V48M16 32H48" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round"/>
      <path d="M28 20L32 16L36 20M28 44L32 48L36 44M20 28L16 32L20 36M44 28L48 32L44 36" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 15. VPC Elastic Network Adapter
  {
    key: 'aws_vpc_elastic_network_adapter',
    name: 'VPC Elastic Network Adapter',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_network_interface',
    defaultSpecs: { count: 1 },
    description: 'Adaptador de rede com suporte a ENA (Enhanced Networking) até 100+ Gbps',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 18H44L56 32L44 46H12V18Z" stroke="#8C4FFF" stroke-width="3" stroke-linejoin="round" fill="#8C4FFF" fill-opacity="0.1"/>
      <rect x="20" y="24" width="18" height="16" rx="2" stroke="#8C4FFF" stroke-width="2.5"/>
      <rect x="24" y="28" width="4" height="4" fill="#8C4FFF"/>
      <rect x="30" y="28" width="4" height="4" fill="#8C4FFF"/>
      <line x1="16" y1="24" x2="16" y2="40" stroke="#8C4FFF" stroke-width="2.5"/>
    </svg>`
  },

  // 16. VPC Elastic Network Interface
  {
    key: 'aws_vpc_elastic_network_interface',
    name: 'VPC Elastic Network Interface',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_network_interface',
    defaultSpecs: { count: 1 },
    description: 'Interface de rede virtual (ENI) conectável com IP privado, IP público e MAC dedicado',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="23" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <rect x="22" y="22" width="22" height="20" rx="2" stroke="#8C4FFF" stroke-width="2.5"/>
      <rect x="27" y="27" width="5" height="5" fill="#8C4FFF"/>
      <rect x="34" y="27" width="5" height="5" fill="#8C4FFF"/>
      <path d="M18 22V42" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // 17. VPC Endpoints
  {
    key: 'aws_vpc_endpoints',
    name: 'VPC Endpoints',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_vpc_endpoint',
    defaultSpecs: { count: 1, endpointType: 'Interface', serviceName: 'com.amazonaws.us-east-1.s3' },
    description: 'Pontos de extremidade de VPC para conexão privada a serviços AWS via AWS PrivateLink',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 25V19.5C22 18 23 17 24.5 16.5L36 13L47.5 16.5C49 17 50 18 50 19.5V35C50 42.5 43.5 47.5 36 50.5C28.5 47.5 22 42.5 22 39" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#8C4FFF" fill-opacity="0.1"/>
      <path d="M27.5 25.5V21.5C27.5 20.5 28.2 19.8 29.2 19.5L36 17.5L42.8 19.5C43.8 19.8 44.5 20.5 44.5 21.5V34C44.5 39.5 39.5 43.5 36 45.5C32.5 43.5 27.5 39.5 27.5 38.5" stroke="#8C4FFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 32H34M28 26L34 32L28 38" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 18. VPC Flow Logs
  {
    key: 'aws_vpc_flow_logs',
    name: 'VPC Flow Logs',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_flow_log',
    defaultSpecs: { count: 1 },
    description: 'Captura contínua de metadados de tráfego IP de entrada e saída na VPC',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="23" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <rect x="21" y="19" width="18" height="24" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.15"/>
      <line x1="25" y1="25" x2="35" y2="25" stroke="#8C4FFF" stroke-width="2"/>
      <line x1="25" y1="29" x2="35" y2="29" stroke="#8C4FFF" stroke-width="2"/>
      <line x1="25" y1="33" x2="31" y2="33" stroke="#8C4FFF" stroke-width="2"/>
      <line x1="12" y1="32" x2="48" y2="32" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round"/>
      <path d="M43 27L48 32L43 37" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 19. VPC Internet Gateway
  {
    key: 'aws_vpc_internet_gateway',
    name: 'VPC Internet Gateway',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_internet_gateway',
    defaultSpecs: { count: 1 },
    description: 'Gateway altamente disponível e redundante que permite comunicação bidirecional com a Internet',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="23" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <path d="M22 44V27C22 21.5 26.5 17 32 17C37.5 17 42 21.5 42 27V44" stroke="#8C4FFF" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M28 44V30C28 27.8 29.8 26 32 26C34.2 26 36 27.8 36 30V44" stroke="#8C4FFF" stroke-width="2.5"/>
    </svg>`
  },

  // 20. VPC NAT Gateway
  {
    key: 'aws_vpc_nat_gateway_res',
    name: 'VPC NAT Gateway',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_nat_gateway',
    defaultSpecs: { count: 1 },
    description: 'Servidor gerenciado para permitir saída segura à internet em sub-redes privadas',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="23" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <polygon points="18,22 24,25 18,28" fill="#8C4FFF"/>
      <polygon points="18,30 24,33 18,36" fill="#8C4FFF"/>
      <polygon points="18,38 24,41 18,44" fill="#8C4FFF"/>
      <path d="M24 25H32V33M24 41H32V33M32 33H46" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M41 28L46 33L41 38" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 21. VPC Network Access Analyzer
  {
    key: 'aws_vpc_network_access_analyzer',
    name: 'VPC Network Access Analyzer',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_networkmanager_global_network',
    defaultSpecs: { count: 1 },
    description: 'Identificação e análise de conformidade para acessos de rede e segmentação na nuvem',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 36C11 36 9 33 9 30C9 27 11 25 14 25C15 19 20 15 27 15C32 15 37 18 38 22C40 21 42 21 44 22C47 24 48 27 48 30C51 30 53 33 53 36C53 39 50 42 47 42H16C13 42 11 40 11 38" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.08"/>
      <path d="M28 24V34M23 29H33" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="34" y="32" width="18" height="22" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M38 39L40 41L45 36M38 46L40 48L45 43" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 22. VPC Network Access Control List
  {
    key: 'aws_vpc_network_access_control_list',
    name: 'VPC Network Access Control List',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_network_acl',
    defaultSpecs: { count: 1 },
    description: 'Lista de controle de acesso stateless para proteção e filtragem no nível da sub-rede',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="23" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <line x1="20" y1="18" x2="20" y2="46" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round"/>
      <line x1="44" y1="18" x2="44" y2="46" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round"/>
      <rect x="26" y="28" width="12" height="12" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.3"/>
      <path d="M28 28V24C28 22 30 20 32 20C34 20 36 22 36 24V28" stroke="#8C4FFF" stroke-width="2.5"/>
      <path d="M14 32L17 32M47 32L50 32" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // 23. VPC Peering Connection
  {
    key: 'aws_vpc_peering_connection',
    name: 'VPC Peering Connection',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_vpc_peering_connection',
    defaultSpecs: { count: 1 },
    description: 'Conexão de emparelhamento direto entre duas VPCs permitindo comunicação com IPs privados',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="23" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <path d="M26 33C24 33 23 31 23 29C23 27 24 26 26 26C27 22 30 19 35 19C38 19 41 21 42 24C43 23 44 23 45 24C47 25 48 27 48 29C49 29 50 31 50 33C50 35 48 37 46 37H27C25 37 23 35 23 33" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.15"/>
      <path d="M32 15V11M29 13L32 10L35 13M32 49V53M29 51L32 54L35 51M15 32H11M13 29L10 32L13 35M49 32H53M51 29L54 32L51 35" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 24. VPC Reachability Analyzer
  {
    key: 'aws_vpc_reachability_analyzer',
    name: 'VPC Reachability Analyzer',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_ec2_network_insights_path',
    defaultSpecs: { count: 1 },
    description: 'Ferramenta analítica formal para testar alcance e caminhos de conectividade entre recursos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="20" r="4" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF"/>
      <circle cx="32" cy="32" r="4" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF"/>
      <circle cx="48" cy="44" r="4" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF"/>
      <path d="M20 20H36C42 20 44 26 44 32C44 38 42 44 36 44H26C20 44 18 38 18 32C18 26 20 20 26 20" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },

  // 25. VPC Router
  {
    key: 'aws_vpc_router',
    name: 'VPC Router',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_route_table',
    defaultSpecs: { count: 1 },
    description: 'Roteador lógico da VPC para direcionamento de pacotes entre sub-redes e gateways',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="23" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <path d="M32 18V28M32 36V46M18 32H28M36 32H46" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round"/>
      <path d="M29 21L32 18L35 21M29 43L32 46L35 43M21 29L18 32L21 35M43 29L46 32L43 35" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 26. VPC Traffic Mirroring
  {
    key: 'aws_vpc_traffic_mirroring',
    name: 'VPC Traffic Mirroring',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_ec2_traffic_mirror_session',
    defaultSpecs: { count: 1 },
    description: 'Espelhamento de tráfego de rede para inspeção de segurança e monitoramento de ameaças',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="23" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <path d="M26 16V48M26 28L18 20" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round"/>
      <path d="M15 20L18 20L18 23" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M38 16V48M38 28L46 20" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="3 3"/>
      <path d="M43 20L46 20L46 23" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 27. Virtual Private Cloud VPC
  {
    key: 'aws_vpc_virtual_private_cloud',
    name: 'Virtual Private Cloud VPC',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_vpc',
    defaultSpecs: { count: 1 },
    description: 'Rede virtual logicamente isolada na nuvem AWS dedicada à conta do cliente',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 38C10 38 8 35 8 32C8 29 10 27 13 27C14 21 19 17 26 17C31 17 35 20 37 24C39 23 41 23 43 24C46 26 47 29 47 32C50 32 52 35 52 38C52 41 49 44 46 44H15C12 44 10 42 10 40" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.08"/>
      <path d="M33 26C33 26 39 23 44 23C49 23 55 26 55 26V36C55 44 44 49 44 49C44 49 33 44 33 36V26Z" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.25"/>
    </svg>`
  },

  // 28. VPC VPN Connection
  {
    key: 'aws_vpc_vpn_connection',
    name: 'VPC VPN Connection',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_vpn_connection',
    defaultSpecs: { count: 1 },
    description: 'Túnel VPN IPSec criptografado conectando a VPC ao datacenter ou filial',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="27" width="20" height="20" rx="3" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M26 27V21C26 17.5 28.5 15 32 15C35.5 15 38 17.5 38 21V27" stroke="#8C4FFF" stroke-width="3"/>
      <line x1="12" y1="21" x2="52" y2="21" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M16 17L12 21L16 25M48 17L52 21L48 25" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="32" cy="35" r="2" fill="#8C4FFF"/>
      <line x1="32" y1="37" x2="32" y2="42" stroke="#8C4FFF" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },

  // 29. VPC VPN Gateway
  {
    key: 'aws_vpc_vpn_gateway',
    name: 'VPC VPN Gateway',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_vpn_gateway',
    defaultSpecs: { count: 1 },
    description: 'Concentrador VPN virtual gerenciado pela AWS acoplado à VPC (VGW)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="26" width="24" height="22" rx="3" stroke="#8C4FFF" stroke-width="3.5" fill="#8C4FFF" fill-opacity="0.15"/>
      <path d="M26 26V20C26 16.5 28.5 14 32 14C35.5 14 38 16.5 38 20V26" stroke="#8C4FFF" stroke-width="3.5"/>
      <circle cx="32" cy="34" r="2.5" fill="#8C4FFF"/>
      <line x1="32" y1="36.5" x2="32" y2="41" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // 30. App Mesh Mesh
  {
    key: 'aws_app_mesh_mesh',
    name: 'App Mesh Mesh',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_appmesh_mesh',
    defaultSpecs: { count: 1 },
    description: 'Malha lógica de serviços para controle de tráfego, observabilidade e segurança de microsserviços',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="18" r="4.5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="16" cy="30" r="4.5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="32" cy="34" r="4.5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="48" cy="30" r="4.5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="32" cy="50" r="4.5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M32 22.5V29.5M19.5 30H27.5M36.5 30H43.5M32 38.5V45.5" stroke="#8C4FFF" stroke-width="2.5"/>
    </svg>`
  },

  // 31. App Mesh Virtual Gateway
  {
    key: 'aws_app_mesh_virtual_gateway',
    name: 'App Mesh Virtual Gateway',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_appmesh_virtual_gateway',
    defaultSpecs: { count: 1 },
    description: 'Gateway de entrada que roteia tráfego externo para dentro da malha App Mesh',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 16H18V48H14" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M50 16H46V48H50" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="32" cy="19" r="4" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="23" cy="32" r="4" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="41" cy="32" r="4" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="32" cy="45" r="4" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M30 22L25 29M34 22L39 29M25 35L30 42M39 35L34 42" stroke="#8C4FFF" stroke-width="2"/>
    </svg>`
  },

  // 32. App Mesh Virtual Node
  {
    key: 'aws_app_mesh_virtual_node',
    name: 'App Mesh Virtual Node',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_appmesh_virtual_node',
    defaultSpecs: { count: 1 },
    description: 'Ponteiro para um serviço específico (como ECS task ou Deployment Kubernetes)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="11" y="11" width="42" height="42" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <circle cx="32" cy="20" r="4" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="23" cy="33" r="4" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="41" cy="33" r="4" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="32" cy="44" r="4" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M30 23L25 30M34 23L39 30M25 36L30 41M39 36L34 41" stroke="#8C4FFF" stroke-width="2"/>
    </svg>`
  },

  // 33. App Mesh Virtual Router
  {
    key: 'aws_app_mesh_virtual_router',
    name: 'App Mesh Virtual Router',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_appmesh_virtual_router',
    defaultSpecs: { count: 1 },
    description: 'Distribuidor de tráfego dentro da malha com suporte a divisão de porcentagem (canary deploy)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="23" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <circle cx="32" cy="20" r="4" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="23" cy="33" r="4" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="41" cy="33" r="4" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="32" cy="44" r="4" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M30 23L25 30M34 23L39 30M25 36L30 41M39 36L34 41" stroke="#8C4FFF" stroke-width="2"/>
    </svg>`
  },

  // 34. App Mesh Virtual Service
  {
    key: 'aws_app_mesh_virtual_service',
    name: 'App Mesh Virtual Service',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_appmesh_virtual_service',
    defaultSpecs: { count: 1 },
    description: 'Abstração de um serviço real fornecido por um roteador ou nó virtual',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="14" width="28" height="34" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <rect x="14" y="18" width="28" height="34" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="36" cy="28" r="3.5" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF"/>
      <circle cx="26" cy="38" r="3.5" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF"/>
      <circle cx="42" cy="44" r="3.5" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF"/>
      <path d="M34 31L28 35M38 31L41 41" stroke="#8C4FFF" stroke-width="2"/>
    </svg>`
  },

  // 35. Cloud Map Namespace
  {
    key: 'aws_cloud_map_namespace',
    name: 'Cloud Map Namespace',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_service_discovery_private_dns_namespace',
    defaultSpecs: { count: 1 },
    description: 'Espaço de nomes de descoberta de serviços privado para microsserviços e contêineres',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 18C14 18 22 14 32 14C42 14 50 18 50 18V33C50 43 32 50 32 50C32 50 14 43 14 33V18Z" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <line x1="25" y1="20" x2="25" y2="44" stroke="#8C4FFF" stroke-width="2.5"/>
      <line x1="33" y1="20" x2="33" y2="44" stroke="#8C4FFF" stroke-width="2.5"/>
      <line x1="16" y1="28" x2="48" y2="28" stroke="#8C4FFF" stroke-width="2.5"/>
      <path d="M41 24C41 22 39 20 37 20C35 20 33 22 33 24C33 27 37 31 37 31C37 31 41 27 41 24Z" fill="#8C4FFF"/>
    </svg>`
  },

  // 36. Cloud Map Resource
  {
    key: 'aws_cloud_map_resource',
    name: 'Cloud Map Resource',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_service_discovery_instance',
    defaultSpecs: { count: 1 },
    description: 'Instância de recurso dinâmica registrada com atributos personalizados e verificação de integridade',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 38C10 38 8 35 8 32C8 29 10 27 13 27C14 21 19 17 26 17C31 17 35 20 37 24C39 23 41 23 43 24C46 26 47 29 47 32C50 32 52 35 52 38C52 41 49 44 46 44H15C12 44 10 42 10 40" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.08"/>
      <circle cx="28" cy="27" r="3" fill="#8C4FFF"/>
      <circle cx="22" cy="36" r="3" fill="#8C4FFF"/>
      <circle cx="34" cy="36" r="3" fill="#8C4FFF"/>
      <circle cx="42" cy="30" r="3" fill="#8C4FFF"/>
      <path d="M26 29L23 34M30 29L33 34M31 28L40 30" stroke="#8C4FFF" stroke-width="2"/>
    </svg>`
  },

  // 37. Cloud Map Service
  {
    key: 'aws_cloud_map_service',
    name: 'Cloud Map Service',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_service_discovery_service',
    defaultSpecs: { count: 1 },
    description: 'Serviço de descoberta com DNS dinâmico e monitoramento de integridade automático',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="14" width="30" height="36" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.1"/>
      <path d="M28 42C26 42 25 40 25 38C25 36 26 35 28 35C29 32 32 30 35 30C38 30 40 32 41 34C43 35 44 37 44 38C46 39 46 40 46 42H28Z" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M42 34C42 32 40 30 38 30C36 30 34 32 34 34C34 36.5 38 40 38 40C38 40 42 36.5 42 34Z" fill="#8C4FFF"/>
    </svg>`
  },

  // 38. Cloud WAN Core Network Edge
  {
    key: 'aws_cloud_wan_core_network_edge',
    name: 'Cloud WAN Core Network Edge',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_networkmanager_core_network',
    defaultSpecs: { count: 1 },
    description: 'Ponto de conexão regional (Core Network Edge - CNE) de rede global Cloud WAN',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="23" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <circle cx="32" cy="32" r="8" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="32" cy="14" r="3.5" fill="#8C4FFF"/>
      <circle cx="32" cy="50" r="3.5" fill="#8C4FFF"/>
      <circle cx="14" cy="32" r="3.5" fill="#8C4FFF"/>
      <circle cx="50" cy="32" r="3.5" fill="#8C4FFF"/>
      <line x1="32" y1="18" x2="32" y2="24" stroke="#8C4FFF" stroke-width="2.5"/>
      <line x1="32" y1="40" x2="32" y2="46" stroke="#8C4FFF" stroke-width="2.5"/>
      <line x1="18" y1="32" x2="24" y2="32" stroke="#8C4FFF" stroke-width="2.5"/>
      <line x1="40" y1="32" x2="46" y2="32" stroke="#8C4FFF" stroke-width="2.5"/>
    </svg>`
  },

  // 39. Cloud WAN Segment Network
  {
    key: 'aws_cloud_wan_segment_network',
    name: 'Cloud WAN Segment Network',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_networkmanager_core_network',
    defaultSpecs: { count: 1 },
    description: 'Segmentação e isolamento de tráfego de rede (ex: Dev, Prod, Shared) na AWS Cloud WAN',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 9C44.7 9 55 19.3 55 32" stroke="#8C4FFF" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M55 32C55 44.7 44.7 55 32 55" stroke="#8C4FFF" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M32 55C19.3 55 9 44.7 9 32" stroke="#8C4FFF" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M9 32C9 19.3 19.3 9 32 9" stroke="#8C4FFF" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="0 8 20 8"/>
    </svg>`
  },

  // 40. Cloud WAN Transit Gateway Route Table Attachment
  {
    key: 'aws_cloud_wan_transit_gateway_route_table_attachment',
    name: 'Cloud WAN Transit Gateway Route Table Attachment',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_networkmanager_transit_gateway_route_table_attachment',
    defaultSpecs: { count: 1 },
    description: 'Anexo de tabela de rotas de Transit Gateway para integração à Core Network da Cloud WAN',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="16" width="28" height="8" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.15"/>
      <rect x="18" y="28" width="28" height="8" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.15"/>
      <rect x="18" y="40" width="28" height="8" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.15"/>
      <circle cx="10" cy="32" r="3.5" fill="#8C4FFF"/>
      <circle cx="54" cy="32" r="3.5" fill="#8C4FFF"/>
      <circle cx="32" cy="9" r="3.5" fill="#8C4FFF"/>
      <circle cx="32" cy="55" r="3.5" fill="#8C4FFF"/>
      <line x1="14" y1="32" x2="18" y2="32" stroke="#8C4FFF" stroke-width="2.5"/>
      <line x1="46" y1="32" x2="50" y2="32" stroke="#8C4FFF" stroke-width="2.5"/>
      <line x1="32" y1="12" x2="32" y2="16" stroke="#8C4FFF" stroke-width="2.5"/>
      <line x1="32" y1="48" x2="32" y2="52" stroke="#8C4FFF" stroke-width="2.5"/>
    </svg>`
  },

  // 41. Direct Connect Gateway
  {
    key: 'aws_direct_connect_gateway',
    name: 'Direct Connect Gateway',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_dx_gateway',
    defaultSpecs: { count: 1 },
    description: 'Gateway global para conectar conexões dedicadas AWS Direct Connect a múltiplas VPCs',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="32,9 55,32 32,55 9,32" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <path d="M32 17V47M17 32H47" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M29 20L32 17L35 20M29 44L32 47L35 44M20 29L17 32L20 35M44 29L47 32L44 35" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 42. Transit Gateway Attachment
  {
    key: 'aws_transit_gateway_attachment',
    name: 'Transit Gateway Attachment',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_ec2_transit_gateway_vpc_attachment',
    defaultSpecs: { count: 1 },
    description: 'Anexo de conexão entre uma VPC, VPN ou Direct Connect Gateway ao AWS Transit Gateway',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="23" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <circle cx="21" cy="32" r="5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF"/>
      <circle cx="43" cy="32" r="5" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF"/>
      <line x1="26" y1="32" x2="38" y2="32" stroke="#8C4FFF" stroke-width="3.5"/>
    </svg>`
  },

  // 43. Application Load Balancer
  {
    key: 'aws_application_load_balancer',
    name: 'Application Load Balancer',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_lb',
    defaultSpecs: { count: 1, isPublic: true },
    description: 'Balanceamento de carga inteligente na camada 7 (HTTP/HTTPS) com roteamento baseado em conteúdo',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="24" y="12" width="16" height="12" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="14" y="38" width="10" height="10" rx="1.5" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="27" y="38" width="10" height="10" rx="1.5" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="40" y="38" width="10" height="10" rx="1.5" stroke="#8C4FFF" stroke-width="2" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M32 24V31M19 38V31H45V38" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="32" y1="31" x2="32" y2="38" stroke="#8C4FFF" stroke-width="2"/>
    </svg>`
  },

  // 44. Classic Load Balancer
  {
    key: 'aws_classic_load_balancer',
    name: 'Classic Load Balancer',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_elb',
    defaultSpecs: { count: 1 },
    description: 'Balanceamento de carga tradicional em camada 4 e camada 7 para instâncias EC2 legadas',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="12" width="36" height="40" rx="3" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.1"/>
      <circle cx="32" cy="32" r="10" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <circle cx="28" cy="30" r="2" fill="#8C4FFF"/>
      <circle cx="36" cy="30" r="2" fill="#8C4FFF"/>
      <circle cx="32" cy="36" r="2" fill="#8C4FFF"/>
      <path d="M28 30L32 36L36 30" stroke="#8C4FFF" stroke-width="1.8"/>
    </svg>`
  },

  // 45. Gateway Load Balancer
  {
    key: 'aws_gateway_load_balancer',
    name: 'Gateway Load Balancer',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_lb',
    defaultSpecs: { count: 1 },
    description: 'Balanceamento e escalabilidade para appliances de segurança de terceiros (firewalls virtuais)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="32" x2="26" y2="32" stroke="#8C4FFF" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M22 27L27 32L22 37" stroke="#8C4FFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="32" y1="16" x2="32" y2="48" stroke="#8C4FFF" stroke-width="4" stroke-linecap="round"/>
      <path d="M28 20L32 16L36 20M28 44L32 48L36 44" stroke="#8C4FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M32 22H46M32 32H46M32 42H46" stroke="#8C4FFF" stroke-width="3"/>
      <path d="M42 19L46 22L42 25M42 29L46 32L42 35M42 39L46 42L42 45" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 46. Network Load Balancer
  {
    key: 'aws_network_load_balancer',
    name: 'Network Load Balancer',
    provider: 'aws',
    category: 'networking',
    brandColor: '#8C4FFF',
    defaultResourceType: 'aws_lb',
    defaultSpecs: { count: 1 },
    description: 'Balanceamento de altíssima performance em camada 4 (TCP/UDP/TLS) com latências em milissegundos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="24" width="16" height="16" rx="2" stroke="#8C4FFF" stroke-width="3" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="42" y="12" width="12" height="10" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="42" y="27" width="12" height="10" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <rect x="42" y="42" width="12" height="10" rx="2" stroke="#8C4FFF" stroke-width="2.5" fill="#8C4FFF" fill-opacity="0.2"/>
      <path d="M26 29L38 18M26 32H38M26 35L38 46" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M34 16L39 17L38 22M35 30L39 32L35 34M34 48L39 47L38 42" stroke="#8C4FFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  }
];
