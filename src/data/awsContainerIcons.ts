import { CloudIconDefinition } from '../types';

export const AWS_CONTAINER_ICONS: CloudIconDefinition[] = [
  // 1. Amazon Elastic Container Registry (ECR) - Image
  {
    key: 'aws_ecr_image',
    name: 'ECR Image',
    provider: 'aws',
    category: 'container',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_ecr_repository',
    defaultSpecs: { imageTag: 'latest', scanOnPush: true, region: 'us-east-1' },
    description: 'Imagem de contêiner OCI/Docker armazenada e versionada no Amazon Elastic Container Registry',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Moldura Externa da Imagem de Contêiner -->
      <rect x="7" y="7" width="50" height="50" rx="3" stroke="#ED7100" stroke-width="3.5" fill="none" />
      <!-- Sol / Tag da Imagem -->
      <circle cx="27" cy="24" r="5" stroke="#ED7100" stroke-width="3" fill="none" />
      <!-- Silhueta da Montanha Esquerda -->
      <path d="M7 43L21 29L33 41" stroke="#ED7100" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Silhueta da Montanha Direita -->
      <path d="M25 33L39 19L57 37" stroke="#ED7100" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`,
  },

  // 2. Amazon Elastic Container Registry (ECR) - Registry
  {
    key: 'aws_ecr_registry',
    name: 'ECR Registry',
    provider: 'aws',
    category: 'container',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_ecr_registry_scanning_configuration',
    defaultSpecs: { registryType: 'private', replication: true, region: 'us-east-1' },
    description: 'Registro privado e altamente disponível do Amazon ECR com replicação e verificação de vulnerabilidades',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Moldura Externa Arredondada do Registry -->
      <rect x="8" y="5" width="48" height="54" rx="8" stroke="#ED7100" stroke-width="3.5" fill="none" />
      <!-- Linha 1: Bloco Esquerdo -->
      <rect x="14" y="11" width="16" height="11" rx="2" stroke="#ED7100" stroke-width="2.5" fill="none" />
      <line x1="19" y1="14" x2="19" y2="19" stroke="#ED7100" stroke-width="2" stroke-linecap="round" />
      <line x1="25" y1="14" x2="25" y2="19" stroke="#ED7100" stroke-width="2" stroke-linecap="round" />
      <!-- Linha 1: Bloco Direito -->
      <rect x="34" y="11" width="16" height="11" rx="2" stroke="#ED7100" stroke-width="2.5" fill="none" />
      <line x1="39" y1="14" x2="39" y2="19" stroke="#ED7100" stroke-width="2" stroke-linecap="round" />
      <line x1="45" y1="14" x2="45" y2="19" stroke="#ED7100" stroke-width="2" stroke-linecap="round" />
      <!-- Linha 2: Bloco Esquerdo -->
      <rect x="14" y="26" width="16" height="11" rx="2" stroke="#ED7100" stroke-width="2.5" fill="none" />
      <line x1="19" y1="29" x2="19" y2="34" stroke="#ED7100" stroke-width="2" stroke-linecap="round" />
      <line x1="25" y1="29" x2="25" y2="34" stroke="#ED7100" stroke-width="2" stroke-linecap="round" />
      <!-- Linha 2: Bloco Direito -->
      <rect x="34" y="26" width="16" height="11" rx="2" stroke="#ED7100" stroke-width="2.5" fill="none" />
      <line x1="39" y1="29" x2="39" y2="34" stroke="#ED7100" stroke-width="2" stroke-linecap="round" />
      <line x1="45" y1="29" x2="45" y2="34" stroke="#ED7100" stroke-width="2" stroke-linecap="round" />
      <!-- Linha 3: Bloco Esquerdo -->
      <rect x="14" y="41" width="16" height="11" rx="2" stroke="#ED7100" stroke-width="2.5" fill="none" />
      <line x1="19" y1="44" x2="19" y2="49" stroke="#ED7100" stroke-width="2" stroke-linecap="round" />
      <line x1="25" y1="44" x2="25" y2="49" stroke="#ED7100" stroke-width="2" stroke-linecap="round" />
      <!-- Linha 3: Bloco Direito -->
      <rect x="34" y="41" width="16" height="11" rx="2" stroke="#ED7100" stroke-width="2.5" fill="none" />
      <line x1="39" y1="44" x2="39" y2="49" stroke="#ED7100" stroke-width="2" stroke-linecap="round" />
      <line x1="45" y1="44" x2="45" y2="49" stroke="#ED7100" stroke-width="2" stroke-linecap="round" />
    </svg>`,
  },

  // 3. Amazon Elastic Container Service (ECS) - Container 1
  {
    key: 'aws_ecs_container_1',
    name: 'ECS Container 1',
    provider: 'aws',
    category: 'container',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_ecs_task_definition',
    defaultSpecs: { containerPort: 80, memory: 512, cpu: 256, region: 'us-east-1' },
    description: 'Contêiner de carga padrão do Amazon ECS para execução de serviços de aplicação',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Moldura Externa do Contêiner de Carga -->
      <rect x="7" y="14" width="50" height="36" rx="2.5" stroke="#ED7100" stroke-width="3.5" fill="none" />
      <!-- Frisos Verticais do Contêiner -->
      <line x1="14" y1="19" x2="14" y2="45" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <line x1="21" y1="19" x2="21" y2="45" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <line x1="28" y1="19" x2="28" y2="45" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <line x1="36" y1="19" x2="36" y2="45" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <line x1="43" y1="19" x2="43" y2="45" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <line x1="50" y1="19" x2="50" y2="45" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
    </svg>`,
  },

  // 4. Amazon Elastic Container Service (ECS) - Container 2 (Compute)
  {
    key: 'aws_ecs_container_2',
    name: 'ECS Container 2',
    provider: 'aws',
    category: 'container',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_ecs_task_definition',
    defaultSpecs: { containerPort: 8080, memory: 1024, cpu: 512, region: 'us-east-1' },
    description: 'Contêiner do Amazon ECS com processamento e computação dedicada otimizada',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Moldura Externa do Contêiner -->
      <rect x="7" y="14" width="50" height="36" rx="2.5" stroke="#ED7100" stroke-width="3.5" fill="none" />
      <!-- Frisos à Esquerda -->
      <line x1="14" y1="19" x2="14" y2="45" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <line x1="20" y1="19" x2="20" y2="45" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <!-- Frisos à Direita -->
      <line x1="44" y1="19" x2="44" y2="45" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <line x1="50" y1="19" x2="50" y2="45" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <!-- Chip / Processador no Centro -->
      <rect x="25" y="25" width="14" height="14" rx="1.5" stroke="#ED7100" stroke-width="2.5" fill="none" />
      <!-- Pinos do Chip -->
      <path d="M28 22V25M32 22V25M36 22V25" stroke="#ED7100" stroke-width="2" stroke-linecap="round" />
      <path d="M28 39V42M32 39V42M36 39V42" stroke="#ED7100" stroke-width="2" stroke-linecap="round" />
      <path d="M22 28H25M22 32H25M22 36H25" stroke="#ED7100" stroke-width="2" stroke-linecap="round" />
      <path d="M39 28H42M39 32H42M39 36H42" stroke="#ED7100" stroke-width="2" stroke-linecap="round" />
    </svg>`,
  },

  // 5. Amazon Elastic Container Service (ECS) - Container 3 (Host / GUI)
  {
    key: 'aws_ecs_container_3',
    name: 'ECS Container 3',
    provider: 'aws',
    category: 'container',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_ecs_task_definition',
    defaultSpecs: { containerPort: 3000, memory: 2048, cpu: 1024, region: 'us-east-1' },
    description: 'Contêiner do Amazon ECS executando ambiente de desktop, frontend ou aplicação web com interface',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Moldura Externa do Contêiner -->
      <rect x="7" y="14" width="50" height="36" rx="2.5" stroke="#ED7100" stroke-width="3.5" fill="none" />
      <!-- Frisos à Esquerda -->
      <line x1="14" y1="19" x2="14" y2="45" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <line x1="20" y1="19" x2="20" y2="45" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <!-- Frisos à Direita -->
      <line x1="44" y1="19" x2="44" y2="45" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <line x1="50" y1="19" x2="50" y2="45" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <!-- Monitor de Computador no Centro -->
      <rect x="25" y="21" width="14" height="11" rx="1.5" stroke="#ED7100" stroke-width="2.5" fill="none" />
      <!-- Haste do Monitor -->
      <line x1="32" y1="32" x2="32" y2="37" stroke="#ED7100" stroke-width="2.5" stroke-linecap="round" />
      <!-- Gabinete / Base do Computador -->
      <rect x="27" y="37" width="10" height="4" rx="1" stroke="#ED7100" stroke-width="2" fill="none" />
    </svg>`,
  },

  // 6. AWS Copilot CLI
  {
    key: 'aws_ecs_copilot_cli',
    name: 'AWS Copilot CLI',
    provider: 'aws',
    category: 'container',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_ecs_service',
    defaultSpecs: { appName: 'copilot-svc', environment: 'prod', region: 'us-east-1' },
    description: 'Interface de linha de comando oficial da AWS para construir, lançar e operar serviços no ECS e Fargate',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Folha com Canto Dobrado e Borda Superior com Traço Aberto -->
      <path d="M12 21V53C12 54.1 12.9 55 14 55H50C51.1 55 52 54.1 52 53V26L38 12H21" stroke="#ED7100" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <line x1="12" y1="12" x2="16" y2="12" stroke="#ED7100" stroke-width="3.5" stroke-linecap="round" />
      <!-- Dobra do Canto Superior Direito -->
      <path d="M38 12V26H52" stroke="#ED7100" stroke-width="3.5" stroke-linejoin="round" fill="none" />
      <!-- Prompt de Comando: Chevron '>' -->
      <path d="M19 28L29 37L19 46" stroke="#ED7100" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Cursor Sublinhado '_' -->
      <line x1="34" y1="46" x2="45" y2="46" stroke="#ED7100" stroke-width="3.5" stroke-linecap="round" />
    </svg>`,
  },

  // 7. Amazon Elastic Container Service (ECS) - Service Connect
  {
    key: 'aws_ecs_service_connect',
    name: 'ECS Service Connect',
    provider: 'aws',
    category: 'container',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_service_discovery_http_namespace',
    defaultSpecs: { namespace: 'production.local', dnsTtl: 60, region: 'us-east-1' },
    description: 'Comunicação direta de serviço para serviço, roteamento de tráfego e descoberta no Amazon ECS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Folha Traseira -->
      <path d="M11 11H34V32" stroke="#ED7100" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <!-- Folha Frontal Principal de Tarefas -->
      <rect x="17" y="16" width="24" height="40" rx="2" stroke="#ED7100" stroke-width="3" fill="none" />
      <!-- Checklists no Documento -->
      <rect x="21" y="23" width="5" height="5" stroke="#ED7100" stroke-width="2" fill="none" />
      <line x1="29" y1="25.5" x2="36" y2="25.5" stroke="#ED7100" stroke-width="2.5" stroke-linecap="round" />
      <rect x="21" y="33" width="5" height="5" stroke="#ED7100" stroke-width="2" fill="none" />
      <line x1="29" y1="35.5" x2="36" y2="35.5" stroke="#ED7100" stroke-width="2.5" stroke-linecap="round" />
      <rect x="21" y="43" width="5" height="5" stroke="#ED7100" stroke-width="2" fill="none" />
      <line x1="29" y1="45.5" x2="36" y2="45.5" stroke="#ED7100" stroke-width="2.5" stroke-linecap="round" />
      <!-- Rede de Descoberta / Service Connect à Direita -->
      <!-- Linhas de Conexão -->
      <path d="M41 36H48M48 36L55 24M48 36H55M48 36L55 48" stroke="#ED7100" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Nós Conectados -->
      <circle cx="56" cy="24" r="3" stroke="#ED7100" stroke-width="2.5" fill="#ED7100" />
      <circle cx="56" cy="36" r="3" stroke="#ED7100" stroke-width="2.5" fill="#ED7100" />
      <circle cx="56" cy="48" r="3" stroke="#ED7100" stroke-width="2.5" fill="#ED7100" />
    </svg>`,
  },

  // 8. Amazon Elastic Container Service (ECS) - Service
  {
    key: 'aws_ecs_service_resource',
    name: 'ECS Service',
    provider: 'aws',
    category: 'container',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_ecs_service',
    defaultSpecs: { desiredCount: 2, launchType: 'FARGATE', region: 'us-east-1' },
    description: 'Serviço do Amazon ECS para gerenciar e manter simultaneamente o número desejado de tarefas ativas',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Folha 1 (Fundo) -->
      <path d="M12 9H42V20" stroke="#ED7100" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <!-- Folha 2 (Meio) -->
      <path d="M18 15H48V26" stroke="#ED7100" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <!-- Folha 3 (Frente) -->
      <rect x="24" y="21" width="30" height="37" rx="2" stroke="#ED7100" stroke-width="3" fill="none" />
      <!-- Lista de Verificação / Tasks do Serviço -->
      <rect x="28" y="27" width="5" height="5" stroke="#ED7100" stroke-width="2" fill="none" />
      <line x1="36" y1="29.5" x2="48" y2="29.5" stroke="#ED7100" stroke-width="2.5" stroke-linecap="round" />
      <rect x="28" y="37" width="5" height="5" stroke="#ED7100" stroke-width="2" fill="none" />
      <line x1="36" y1="39.5" x2="48" y2="39.5" stroke="#ED7100" stroke-width="2.5" stroke-linecap="round" />
      <rect x="28" y="47" width="5" height="5" stroke="#ED7100" stroke-width="2" fill="none" />
      <line x1="36" y1="49.5" x2="48" y2="49.5" stroke="#ED7100" stroke-width="2.5" stroke-linecap="round" />
    </svg>`,
  },

  // 9. Amazon Elastic Container Service (ECS) - Task
  {
    key: 'aws_ecs_task_resource',
    name: 'ECS Task',
    provider: 'aws',
    category: 'container',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_ecs_task_definition',
    defaultSpecs: { launchType: 'FARGATE', cpu: 256, memory: 512, region: 'us-east-1' },
    description: 'Instanciação de execução única de uma definição de tarefa contendo um ou mais contêineres no Amazon ECS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Folha Única de Tarefa -->
      <rect x="15" y="7" width="34" height="50" rx="3" stroke="#ED7100" stroke-width="3.5" fill="none" />
      <!-- Linha 1 de Tarefa -->
      <rect x="20" y="16" width="6" height="6" rx="1" stroke="#ED7100" stroke-width="2.5" fill="none" />
      <line x1="30" y1="19" x2="43" y2="19" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <!-- Linha 2 de Tarefa -->
      <rect x="20" y="29" width="6" height="6" rx="1" stroke="#ED7100" stroke-width="2.5" fill="none" />
      <line x1="30" y1="32" x2="43" y2="32" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
      <!-- Linha 3 de Tarefa -->
      <rect x="20" y="42" width="6" height="6" rx="1" stroke="#ED7100" stroke-width="2.5" fill="none" />
      <line x1="30" y1="45" x2="43" y2="45" stroke="#ED7100" stroke-width="3" stroke-linecap="round" />
    </svg>`,
  },

  // 10. Amazon Elastic Kubernetes Service (EKS) - EKS on AWS Outposts
  {
    key: 'aws_eks_outposts',
    name: 'EKS on Outposts',
    provider: 'aws',
    category: 'container',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_eks_cluster',
    defaultSpecs: { outpostArn: 'arn:aws:outposts:us-east-1:123456789012:outpost/op-1234567890', clusterVersion: '1.30', region: 'us-east-1' },
    description: 'Amazon EKS executado localmente em hardware do AWS Outposts para baixa latência e soberania de dados',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Hexágono Externo EKS -->
      <path d="M30 6L11 17V39L30 50L35 47" stroke="#ED7100" stroke-width="3.5" stroke-linejoin="round" fill="none" />
      <path d="M30 6L49 17V26" stroke="#ED7100" stroke-width="3.5" stroke-linejoin="round" fill="none" />
      <!-- Hexágono Interno com 'K' de Kubernetes -->
      <path d="M30 14L18 21V35L30 42L33 40" stroke="#ED7100" stroke-width="2.5" stroke-linejoin="round" fill="none" />
      <path d="M30 14L42 21V25" stroke="#ED7100" stroke-width="2.5" stroke-linejoin="round" fill="none" />
      <!-- Letra 'K' no Centro -->
      <path d="M25 24V37M35 24L25 31L35 37" stroke="#ED7100" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Edifício Outposts On-Premises no Canto Inferior Direito -->
      <!-- Nuvem Local em Segundo Plano -->
      <path d="M39 42C37.5 42 36.5 40.5 37 39C37.5 37 39.5 36 41.5 36.5C42.5 35 44.5 34 46.5 34.5C48.5 35 49.5 36.5 50 38C51.5 38 53 39.5 53 41C53 43 51.5 44 50 44" stroke="#ED7100" stroke-width="2" stroke-linecap="round" fill="none" />
      <!-- Prédio / Rack de Datacenter do Outposts -->
      <rect x="40" y="42" width="16" height="17" rx="1" stroke="#ED7100" stroke-width="3" fill="none" />
      <!-- Janelas / Baias do Prédio -->
      <circle cx="44" cy="46" r="1" fill="#ED7100" />
      <circle cx="48" cy="46" r="1" fill="#ED7100" />
      <circle cx="52" cy="46" r="1" fill="#ED7100" />
      <circle cx="44" cy="50" r="1" fill="#ED7100" />
      <circle cx="48" cy="50" r="1" fill="#ED7100" />
      <circle cx="52" cy="50" r="1" fill="#ED7100" />
      <rect x="46" y="54" width="4" height="5" stroke="#ED7100" stroke-width="1.5" fill="none" />
    </svg>`,
  },
];
