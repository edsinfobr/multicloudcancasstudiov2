import { CloudIconDefinition } from '../types';

export const AWS_COMPUTE_ICONS: CloudIconDefinition[] = [
  // 1. Amazon EC2 AMI (Amazon Machine Image)
  {
    key: 'aws_ec2_ami',
    name: 'EC2 AMI',
    provider: 'aws',
    category: 'compute',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_ami',
    defaultSpecs: { architecture: 'x86_64', virtualizationType: 'hvm', rootDeviceType: 'ebs', region: 'us-east-1' },
    description: 'Amazon Machine Image (AMI) com modelo pré-configurado de sistema operacional e software para EC2',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Moldura Externa com Cantos Arredondados -->
      <rect x="7" y="7" width="50" height="50" rx="9" stroke="#ED7100" stroke-width="3.5" fill="none" />
      <!-- Grade Superior (3 blocos) -->
      <rect x="13" y="13.5" width="10" height="15" rx="1.5" stroke="#ED7100" stroke-width="3" fill="none" />
      <rect x="27" y="13.5" width="10" height="15" rx="1.5" stroke="#ED7100" stroke-width="3" fill="none" />
      <rect x="41" y="13.5" width="10" height="15" rx="1.5" stroke="#ED7100" stroke-width="3" fill="none" />
      <!-- Grade Inferior (3 blocos) -->
      <rect x="13" y="35.5" width="10" height="15" rx="1.5" stroke="#ED7100" stroke-width="3" fill="none" />
      <rect x="27" y="35.5" width="10" height="15" rx="1.5" stroke="#ED7100" stroke-width="3" fill="none" />
      <rect x="41" y="35.5" width="10" height="15" rx="1.5" stroke="#ED7100" stroke-width="3" fill="none" />
    </svg>`,
  },

  // 2. Amazon EC2 Auto Scaling
  {
    key: 'aws_ec2_auto_scaling',
    name: 'EC2 Auto Scaling',
    provider: 'aws',
    category: 'compute',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_autoscaling_group',
    defaultSpecs: { minSize: 1, maxSize: 6, desiredCapacity: 2, region: 'us-east-1' },
    description: 'Ajuste automático de capacidade computacional das instâncias EC2 sob demanda de tráfego',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Chip Central com pinos serrilhados -->
      <rect x="24" y="24" width="16" height="16" rx="2" stroke="#ED7100" stroke-width="3" fill="none" />
      <!-- Pinos no Chip -->
      <path d="M27 21v3M32 21v3M37 21v3M27 40v3M32 40v3M37 40v3M21 27h3M21 32h3M21 37h3M40 27h3M40 32h3M40 37h3" stroke="#ED7100" stroke-width="2" stroke-linecap="round" />
      <!-- Seta Superior (apontando para cima / expansão) -->
      <path d="M32 18V6M26 12l6-6 6 6" stroke="#ED7100" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Seta Inferior (apontando para baixo / expansão) -->
      <path d="M32 46v12M26 52l6 6 6-6" stroke="#ED7100" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Seta Esquerda (apontando para direita / compressão) -->
      <path d="M6 32h12M12 26l6 6-6 6" stroke="#ED7100" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Seta Direita (apontando para esquerda / compressão) -->
      <path d="M58 32H46M52 26l-6 6 6 6" stroke="#ED7100" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`,
  },

  // 3. AWS Microservice Extractor for .NET
  {
    key: 'aws_ec2_microservice_extractor',
    name: 'Microservice Extractor for .NET',
    provider: 'aws',
    category: 'compute',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_ec2_microservice_extractor',
    defaultSpecs: { targetFramework: '.NET 8', extractionMode: 'assisted', region: 'us-east-1' },
    description: 'Ferramenta de decomposição guiada e refatoração de monólitos .NET em microsserviços modernos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Cubo Isométrico Superior -->
      <path d="M32 7L51 17L32 27L13 17Z" stroke="#ED7100" stroke-width="3" stroke-linejoin="round" fill="none" />
      <path d="M13 17V26" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <path d="M32 27V36" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <path d="M51 17V26" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <!-- 3 Setas para Baixo -->
      <path d="M13 26v8M9 30l4 4 4-4" stroke="#ED7100" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M32 36v8M28 40l4 4 4-4" stroke="#ED7100" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M51 26v8M47 30l4 4 4-4" stroke="#ED7100" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Linhas Conectoras entre os Microsserviços -->
      <line x1="18" y1="49" x2="26" y2="54" stroke="#ED7100" stroke-width="2.5" />
      <line x1="38" y1="54" x2="46" y2="49" stroke="#ED7100" stroke-width="2.5" />
      <!-- 3 Círculos de Microsserviços Extraídos -->
      <circle cx="13" cy="46" r="6" stroke="#ED7100" stroke-width="3" fill="none" />
      <circle cx="32" cy="56" r="6" stroke="#ED7100" stroke-width="3" fill="none" />
      <circle cx="51" cy="46" r="6" stroke="#ED7100" stroke-width="3" fill="none" />
    </svg>`,
  },

  // 4. Amazon EC2 DB Instance
  {
    key: 'aws_ec2_db_instance',
    name: 'EC2 DB Instance',
    provider: 'aws',
    category: 'compute',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_instance',
    defaultSpecs: { instanceType: 'r6i.xlarge', engine: 'mysql-custom', storageGb: 250, region: 'us-east-1' },
    description: 'Instância de computação EC2 configurada e dimensionada para execução de banco de dados autogerenciado',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Chip EC2 no lado superior esquerdo -->
      <rect x="10" y="10" width="28" height="28" rx="2" stroke="#ED7100" stroke-width="3" fill="none" />
      <!-- Pinos no Topo -->
      <path d="M15 5v5M21 5v5M27 5v5M33 5v5" stroke="#ED7100" stroke-width="2.5" stroke-linecap="round" />
      <!-- Pinos à Esquerda -->
      <path d="M5 15h5M5 21h5M5 27h5M5 33h5" stroke="#ED7100" stroke-width="2.5" stroke-linecap="round" />
      <!-- Pinos à Direita (cima) -->
      <path d="M38 15h5M38 21h5M38 27h5" stroke="#ED7100" stroke-width="2.5" stroke-linecap="round" />
      <!-- Cilindro de Banco de Dados no canto inferior direito -->
      <g transform="translate(32, 28)">
        <ellipse cx="12" cy="6" rx="9" ry="4" stroke="#ED7100" stroke-width="3" fill="none" />
        <path d="M3 6v21c0 2.2 4 4 9 4s9-1.8 9-4V6" stroke="#ED7100" stroke-width="3" fill="none" />
        <path d="M3 13c0 2.2 4 4 9 4s9-1.8 9-4" stroke="#ED7100" stroke-width="2.5" fill="none" />
      </g>
    </svg>`,
  },

  // 5. Amazon EC2 Elastic IP Address
  {
    key: 'aws_ec2_elastic_ip',
    name: 'EC2 Elastic IP',
    provider: 'aws',
    category: 'compute',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_eip',
    defaultSpecs: { domain: 'vpc', region: 'us-east-1' },
    description: 'Endereço IPv4 público estático gerenciado pela AWS e associado a instâncias ou ENIs',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Círculo de Origem -->
      <circle cx="20" cy="32" r="11" stroke="#ED7100" stroke-width="3.5" fill="none" />
      <!-- Haste Horizontal para a Direita -->
      <line x1="31" y1="32" x2="52" y2="32" stroke="#ED7100" stroke-width="3.5" stroke-linecap="round" />
      <!-- Ponta da Seta -->
      <polyline points="43,23 53,32 43,41" stroke="#ED7100" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`,
  },

  // 6. Amazon EC2 Instance
  {
    key: 'aws_ec2_instance_resource',
    name: 'EC2 Instance',
    provider: 'aws',
    category: 'compute',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_instance',
    defaultSpecs: { instanceType: 'm6i.large', count: 1, ami: 'ami-0c55b159cbfafe1f0', region: 'us-east-1' },
    description: 'Instância básica de máquina virtual Amazon Elastic Compute Cloud (EC2)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Corpo Quadrado Central -->
      <rect x="15" y="15" width="34" height="34" rx="3" stroke="#ED7100" stroke-width="3.5" fill="none" />
      <!-- Pinos Superiores -->
      <path d="M21 7v8M28 7v8M36 7v8M43 7v8" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <!-- Pinos Inferiores -->
      <path d="M21 49v8M28 49v8M36 49v8M43 49v8" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <!-- Pinos Esquerdos -->
      <path d="M7 21h8M7 28h8M7 36h8M7 43h8" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <!-- Pinos Direitos -->
      <path d="M49 21h8M49 28h8M49 36h8M49 43h8" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
    </svg>`,
  },

  // 7. Amazon EC2 Instances (Multiple/Group)
  {
    key: 'aws_ec2_instances_group',
    name: 'EC2 Instances Cluster',
    provider: 'aws',
    category: 'compute',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_instance',
    defaultSpecs: { instanceType: 't3.large', count: 3, region: 'us-east-1' },
    description: 'Cluster ou conjunto de múltiplas instâncias EC2 trabalhando em grupo',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Quadrado Traseiro (Superior Esquerdo) -->
      <rect x="8" y="8" width="28" height="28" rx="4" stroke="#ED7100" stroke-width="3.5" fill="none" />
      <!-- Quadrado Intermediário -->
      <rect x="19" y="19" width="28" height="28" rx="4" stroke="#ED7100" stroke-width="3.5" fill="none" />
      <!-- Quadrado Frontal (Inferior Direito) -->
      <rect x="30" y="30" width="26" height="26" rx="4" stroke="#ED7100" stroke-width="3.5" fill="none" />
    </svg>`,
  },

  // 8. Amazon EC2 Instance with CloudWatch
  {
    key: 'aws_ec2_instance_cloudwatch',
    name: 'EC2 with CloudWatch',
    provider: 'aws',
    category: 'compute',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_instance',
    defaultSpecs: { instanceType: 'c6i.xlarge', monitoring: true, region: 'us-east-1' },
    description: 'Instância Amazon EC2 com telemetria detalhada e alarmes habilitados no Amazon CloudWatch',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Nuvem de Monitoramento CloudWatch -->
      <path d="M19 46C13.5 46 9 41.5 9 36C9 31 12.8 26.8 17.7 26.2C19.5 18 26.6 12 35 12C44.4 12 52.2 19.3 52.9 28.5C57 29.8 60 33.6 60 38.2C60 43.6 55.6 48 50.2 48" stroke="#ED7100" stroke-width="3.5" stroke-linecap="round" fill="none" />
      <!-- Lupa de Inspeção / Métricas -->
      <circle cx="36" cy="38" r="9" stroke="#ED7100" stroke-width="3.5" fill="none" />
      <path d="M43 45L54 55" stroke="#ED7100" stroke-width="4" stroke-linecap="round" />
    </svg>`,
  },

  // 9. Amazon EC2 Rescue
  {
    key: 'aws_ec2_rescue',
    name: 'EC2 Rescue',
    provider: 'aws',
    category: 'compute',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_ec2_rescue',
    defaultSpecs: { diagnosticProfile: 'offline-disk-analysis', region: 'us-east-1' },
    description: 'Ferramenta de socorro e diagnóstico para recuperação de volumes e instâncias EC2 inacessíveis',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Boia Salva-vidas Externa -->
      <circle cx="32" cy="32" r="24" stroke="#ED7100" stroke-width="3.5" fill="none" />
      <!-- Círculo Interno da Boia -->
      <circle cx="32" cy="32" r="10" stroke="#ED7100" stroke-width="3.5" fill="none" />
      <!-- 4 Faixas Reforçadas da Boia -->
      <rect x="27" y="5" width="10" height="7" rx="1" stroke="#ED7100" stroke-width="3" fill="none" />
      <rect x="27" y="52" width="10" height="7" rx="1" stroke="#ED7100" stroke-width="3" fill="none" />
      <rect x="5" y="27" width="7" height="10" rx="1" stroke="#ED7100" stroke-width="3" fill="none" />
      <rect x="52" y="27" width="7" height="10" rx="1" stroke="#ED7100" stroke-width="3" fill="none" />
    </svg>`,
  },

  // 10. Amazon EC2 Spot Instance
  {
    key: 'aws_ec2_spot_instance',
    name: 'EC2 Spot Instance',
    provider: 'aws',
    category: 'compute',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_spot_instance_request',
    defaultSpecs: { instanceType: 'c6g.xlarge', spotPrice: '0.042', allocationStrategy: 'capacity-optimized', region: 'us-east-1' },
    description: 'Instância Spot aproveitando capacidade não utilizada da AWS com até 90% de desconto',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Retículo Circular Externo -->
      <circle cx="32" cy="32" r="23" stroke="#ED7100" stroke-width="3.5" stroke-dasharray="28 8" fill="none" />
      <!-- Linhas de Mira / Crosshairs diagonais -->
      <line x1="12" y1="12" x2="20" y2="20" stroke="#ED7100" stroke-width="3.5" stroke-linecap="round" />
      <line x1="52" y1="12" x2="44" y2="20" stroke="#ED7100" stroke-width="3.5" stroke-linecap="round" />
      <line x1="12" y1="52" x2="20" y2="44" stroke="#ED7100" stroke-width="3.5" stroke-linecap="round" />
      <line x1="52" y1="52" x2="44" y2="44" stroke="#ED7100" stroke-width="3.5" stroke-linecap="round" />
      <!-- Quadrados Centrais Sobrepostos (Instâncias no alvo) -->
      <rect x="18" y="22" width="16" height="16" rx="2" stroke="#ED7100" stroke-width="3" fill="none" />
      <rect x="25" y="24" width="16" height="16" rx="2" stroke="#ED7100" stroke-width="3" fill="none" />
      <rect x="32" y="26" width="14" height="14" rx="2" stroke="#ED7100" stroke-width="3" fill="none" />
    </svg>`,
  },

  // 11. AWS Elastic Beanstalk Application
  {
    key: 'aws_elastic_beanstalk_application',
    name: 'Elastic Beanstalk Application',
    provider: 'aws',
    category: 'compute',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_elastic_beanstalk_application',
    defaultSpecs: { platform: 'Node.js 20', environmentTier: 'WebServer', region: 'us-east-1' },
    description: 'Aplicação gerenciada Elastic Beanstalk para implantação automática de código e infraestrutura',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Caule / Haste da Folha -->
      <path d="M19 56V38C19 28 28 10 47 8C47 27 34 38 19 38" stroke="#ED7100" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <!-- Nervura Central da Folha -->
      <path d="M19 38C26 31 37 20 47 8" stroke="#ED7100" stroke-width="2.5" stroke-linecap="round" />
    </svg>`,
  },

  // 12. AWS Elastic Beanstalk Deployment
  {
    key: 'aws_elastic_beanstalk_deployment',
    name: 'Elastic Beanstalk Deployment',
    provider: 'aws',
    category: 'compute',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_elastic_beanstalk_environment',
    defaultSpecs: { deploymentPolicy: 'RollingWithAdditionalBatch', versionLabel: 'v2.1.0', region: 'us-east-1' },
    description: 'Operação de implantação contínua e atualização de versão em ambiente Elastic Beanstalk',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Círculo e Seta de Upgrade / Deployment no Canto Superior Esquerdo -->
      <circle cx="23" cy="18" r="10" stroke="#ED7100" stroke-width="3" fill="none" />
      <path d="M23 23V13M19 17l4-4 4 4" stroke="#ED7100" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Caule e Folha do Beanstalk -->
      <path d="M26 56V44C26 36 34 22 51 17C51 32 40 42 26 42" stroke="#ED7100" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <!-- Nervura Central da Folha -->
      <path d="M26 42C33 35 43 25 51 17" stroke="#ED7100" stroke-width="2.5" stroke-linecap="round" />
    </svg>`,
  },

  // 13. AWS Lambda Function
  {
    key: 'aws_lambda_function_resource',
    name: 'Lambda Function',
    provider: 'aws',
    category: 'compute',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_lambda_function',
    defaultSpecs: { runtime: 'nodejs20.x', memoryMb: 512, timeout: 30, count: 1, region: 'us-east-1' },
    description: 'Função serverless desacoplada AWS Lambda disparada por eventos e invocações síncronas/assíncronas',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Círculo Externo -->
      <circle cx="32" cy="32" r="26" stroke="#ED7100" stroke-width="3.5" fill="none" />
      <!-- Símbolo Lambda (λ) Oficial AWS -->
      <path d="M42 16L46 20L37.5 35L42 47H36L32.5 39.5L28 47H22L29.5 33L38 16H42Z" stroke="#ED7100" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" fill="none" />
    </svg>`,
  },
];
