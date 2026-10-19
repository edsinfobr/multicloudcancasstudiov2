export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  highlight: string;
  added: string[];
  changed: string[];
  security?: string[];
}

export const CHANGELOG_DATA: ChangelogEntry[] = [
  {
    version: 'v1.12.0',
    date: '19/10/2026',
    title: 'Novos Ícones AWS: Landing Zone, Governança & Segurança (Control Tower, IAM Identity Center, GuardDuty, Config, S3 Log Archive & Network Firewall)',
    highlight: 'Adição dos 6 serviços essenciais para arquiteturas multi-conta e AWS Security Reference Architecture (AWS SRA), com suporte a Terraform IaC, cálculo FinOps e novo template corporativo.',
    added: [
      'AWS Control Tower: setup automatizado de Landing Zone multi-conta com guardrails preventivos/detectivos e governança de contas',
      'IAM Identity Center: autenticação unificada, Single Sign-On (SSO) corporativo e federação SAML 2.0 / OIDC multi-conta',
      'Central Log Archive (S3): bucket S3 imutável com Object Lock e criptografia KMS CMK dedicado à auditoria e retenção segura de logs',
      'Amazon GuardDuty: detecção inteligente contínua de ameaças e anomalias com ML em DNS, VPC Flow Logs, CloudTrail e EKS',
      'AWS Config: inventário contínuo de recursos, histórico detalhado de mudanças e avaliação de conformidade de regras',
      'AWS Network Firewall: firewall com inspeção profunda de pacotes (DPI) e prevenção contra invasões (IPS) com regras Suricata na VPC',
      'Novo Template Oficial: AWS Landing Zone & Security Architecture (SRA) demonstrando a integração completa dos novos serviços',
      'Geração de IaC Terraform: suporte a declaração de recursos para todos os novos serviços com configurações recomendadas',
      'Cálculo de Custos FinOps: estimativas precisas de custo mensal para cada serviço no canvas',
      'Auto-Layout Inteligente de Arquitetura: novo botão com 1 clique no canvas e na navbar que organiza toda a arquitetura, eliminando sobreposições de ícones e contêineres',
      'Rótulos de Conexão Orientados & Compactos: rótulos de protocolo/porta acompanham dinamicamente o fluxo horizontal ou vertical das linhas com tipografia compacta e legível'
    ],
    changed: [
      'Catálogo lateral e busca em tempo real atualizados com tags de governança e segurança corporativa AWS',
      'Espaçamento otimizado entre nós para desobstruir crachás de protocolos e linhas de fluxo'
    ]
  },
  {
    version: 'v1.11.0',
    date: '17/10/2026',
    title: 'Templates Corporativos de IA: OpenAI, Anthropic Claude, Google Gemini e Meta Llama',
    highlight: 'Adição de templates prontos de arquitetura para as soluções de IA generativa mais famosas do mundo (OpenAI, Claude, Gemini e Meta), com busca rápida e filtro por abas no catálogo de templates.',
    added: [
      'Template OpenAI Enterprise Platform: arquitetura completa com GPT-4o, Assistants API, Pinecone Vector DB para RAG, LangChain, cache semântico Redis e S3',
      'Template Anthropic Claude Agentic Swarm: enxame de agentes autônomos com Claude 3.5 & 3.7 Sonnet no AWS Bedrock, orquestração CrewAI, Qdrant e DynamoDB',
      'Template Google Gemini Multimodal AI: processamento de áudio, vídeo 4K e 1M+ tokens de contexto com Gemini 2.0 Flash e 1.5 Pro, Vertex AI Search e BigQuery',
      'Template Meta Llama 3.3 Private Cloud: inferência soberana e privada de Llama 3.3 (70B/405B) com cluster GPU NVIDIA H100 vLLM, ChromaDB e Llama Guard',
      'Template Multi-LLM Enterprise Gateway: roteador central unificado com failover automático e balanceamento de custos/latência integrando OpenAI, Claude, Gemini e Meta',
      'Aba de Filtro "Soluções de IA" e Campo de Busca em Tempo Real no modal de seleção de templates arquiteturais'
    ],
    changed: [
      'Galeria de templates aprimorada com badges coloridos por provedor de IA e tags de componentes-chave'
    ]
  },
  {
    version: 'v1.10.0',
    date: '06/10/2026',
    title: 'Calculadora de Custos com Modos Separados: Arquitetura Atual & Comparativo de Provedores',
    highlight: 'Divisão formal da calculadora de custos em duas visões dedicadas: modo Normal (apenas os custos da arquitetura atual no canvas) e modo Comparativo de Provedores (benchmark multi-cloud entre AWS, Azure, GCP e OCI).',
    added: [
      'Seletor por abas no topo da calculadora: alternância instantânea entre "Arquitetura Atual (Normal)" e "Comparativo de Provedores"',
      'Modo Normal (Arquitetura Atual): painéis visuais de distribuição por provedor ativo na arquitetura e por categoria de serviço',
      'Modo Normal: busca em tempo real e filtros avançados por Provedor e Categoria na tabela de recursos',
      'Modo Comparativo de Provedores: benchmark multi-cloud simultâneo para AWS, Microsoft Azure, Google Cloud (GCP) e Oracle Cloud (OCI)',
      'Modo Comparativo: cálculo automático do Provedor Mais Econômico com percentual de economia frente à média',
      'Modo Comparativo: destaque do Melhor Custo-Benefício para Cloud Native e IA (Google Cloud com Cloud Run scale-to-zero e Gemini)',
      'Modo Comparativo: gráfico de barras visual proporcional de custos mensais',
      'Modo Comparativo: benchmark categoria a categoria (computação, banco de dados, storage, rede e IA)',
      'Modo Comparativo: simulação de compromissos de longo prazo (Savings Plans e Instâncias Reservadas para 1 ano e 3 anos)',
      'Suporte completo a temas (Claro e Escuro) no menu e modal de integração do Google Drive, harmonizando a interface com o tema ativo do MultiCloud Canvas Studio',
      'Aviso legal financeiro adicionado na calculadora e relatório PDF: "Essa é uma estimativa e não representa o custo final. Taxas, impostos e a conversão do dólar podem influenciar no custo final."',
      'Opções dedicadas de Subnets multi-cloud: adição de Subnets para Azure (VNet Subnet), OCI (VCN Subnet) e GCP (VPC Subnetwork), com menu seletor rápido no botão de Subnet, identificação visual por nuvem e código Terraform correspondente',
      'Novas opções de Regiões de Nuvem (Cloud Regions): AWS Region (us-east-1), Azure Region (East US), GCP Region (us-central1) e OCI Region (us-ashburn-1), com seletor integrado, categorização visual por nuvem, dimensões amplas para encapsular VPCs/Subnets e exportação Terraform',
      'Novo Catálogo e Ícones de Inteligência Artificial: adição dos principais serviços e modelos de IA do mercado (OpenAI GPT-4o, Anthropic Claude 3.5/3.7, Google Gemini 2.0/1.5, DeepSeek R1/V3, Meta Llama 3.3, Mistral AI, Cohere, Perplexity AI, Groq LPU, Hugging Face, Midjourney, Stability AI, ElevenLabs, Pinecone, Qdrant, Chroma DB, Ollama, CrewAI, LangChain e NVIDIA NIM) com agrupamento estruturado por categorias funcionais de IA e novo container delimitador AI / GenAI Stack'
    ],
    changed: [
      'Relatório PDF de Custos atualizado para considerar estritamente a arquitetura atual: remoção de menções a provedores externos (ex: OCI alternativo e matriz comparativa multi-cloud), exibindo apenas os recursos, custos e categorias presentes no diagrama',
      'Exportação CSV e JSON atualizada para gerar relatórios contextualizados tanto da arquitetura atual quanto do benchmark multi-cloud',
      'Cálculo de TCO aprimorado no utilitário de FinOps com métricas de economia anual máxima e distinção de recursos sem custo direto (ex: IAM e simuladores)'
    ]
  },
  {
    version: 'v1.9.0',
    date: '13/09/2026',
    title: 'Novos Escopos e Grupos de Container: On-Premise, Cluster, App, Genérico, ASG, AWS Account, Azure RG & Azure Subscription',
    highlight: 'Adição de novos tipos de containers de isolamento e agrupamento visual no catálogo lateral, no canvas e no painel de propriedades com geração IaC Terraform.',
    added: [
      'Menu suspenso em lista no catálogo na posição de Compartment com 9 opções estruturadas',
      'Container Azure Subscription: delimitação formal de assinatura Microsoft Azure para faturamento, RBAC e segregação de recursos',
      'Container On-Premise: representação de redes locais e datacenters físicos com suporte a CIDR privado (ex: 192.168.0.0/16)',
      'Container Cluster: fronteira para clusters Kubernetes (K8s, EKS, AKS, GKE) ou ECS',
      'Container App: fronteira lógica de escopo de aplicação e serviços acoplados',
      'Container Genérico: agrupador visual livre totalmente customizável para qualquer cenário de arquitetura',
      'Container Auto Scaling Group (ASG): grupo de escalabilidade elástica com geração automática de recurso aws_autoscaling_group em Terraform',
      'Container AWS Account: fronteira delimitadora de conta ou Unidade Organizacional (OU)',
      'Container Azure Resource Group: grupo de recursos gerenciados no ecossistema Microsoft Azure',
      'Opções de tipos de container estendidas no seletor do Painel de Propriedades (PropertyPanel)',
      'Renderização de ícones e badges com tipografia aprimorada no cabeçalho dos containers no Canvas'
    ],
    changed: [
      'O botão de Compartment agora funciona como um seletor dinâmico em lista exibindo os 9 escopos com badges e descrições detalhadas',
      'Gerador de código Terraform atualizado para gerar blocos de ASG, Clusters, redes On-Premise e fronteiras de conta/assinatura'
    ]
  },
  {
    version: 'v1.8.0',
    date: '10/09/2026',
    title: 'Preferências do Perfil, Carimbo Padrão & Sincronização de Menus',
    highlight: 'Central de preferências em nuvem com carimbo de identificação padrão do arquiteto, tema pessoal e sincronização do estado dos menus laterais.',
    added: [
      'Modal de Preferências do Perfil (ProfilePreferencesModal) acessível diretamente pela barra superior',
      'Configuração persistente do Carimbo Padrão do Diagrama (Autor, Cargo, Empresa e exibição inicial)',
      'Herança automática do carimbo ao criar uma nova arquitetura no estúdio ("Novo Projeto")',
      'Prévia em tempo real do carimbo de arquitetura no painel de preferências',
      'Botões de sincronização rápida no modal de metadados ("Usar Padrão do Perfil" e "Definir como Padrão")',
      'Configuração do comportamento de abertura dos menus laterais (Catálogo e Inspetor recolhidos ou expandidos)',
      'Novo campo corporativo "Empresa / Organização" nos metadados e no carimbo do canvas'
    ],
    changed: [
      'Alternância dos menus laterais no canvas agora sincroniza dinamicamente com o perfil do usuário no Firestore',
      'Tema Claro/Escuro salvo na nuvem com restauração em qualquer dispositivo ou navegador logado',
      'Menu de usuário na barra superior expandido com atalho para preferências do perfil'
    ],
    security: [
      'Regras Firestore atualizadas com validação estrita de tipos e sanitização de dados do perfil'
    ]
  },
  {
    version: 'v1.7.0',
    date: '07/09/2026',
    title: 'Autenticação Inicial Obrigatória & Assistente Firebase Console',
    highlight: 'Introdução da Tela de Autenticação como primeiro acesso obrigatório antes do estúdio e auto-recuperação do erro auth/operation-not-allowed do Firebase.',
    added: [
      'Tela de Autenticação Inicial (AuthScreen) exibida obrigatoriamente antes do canvas',
      'Abas de Entrar, Cadastrar-se com senha segura e Redefinir Senha por e-mail',
      'Login social rápido com Google SSO',
      'Modo Convidado ("Continuar como Convidado") para acesso offline imediato',
      'Card orientativo e atalho direto para o Firebase Console quando o método E-mail/senha não estiver ativado',
      'Alternador de tema Claro e Escuro diretamente na tela de login',
      'Tela de Splash animada de verificação de sessão Firebase'
    ],
    changed: [
      'Desconexão de conta (logout) redireciona imediatamente para a tela de autenticação',
      'Barra superior agora exibe distintivo "Modo Convidado" quando não conectado',
      'Sincronização imediata de preferências do arquiteto no Firestore'
    ]
  },
  {
    version: 'v1.6.0',
    date: '06/09/2026',
    title: 'Persistência em Nuvem no Firestore & Autenticação de Usuários',
    highlight: 'Integração completa com Firebase Authentication e Cloud Firestore para salvar projetos na nuvem e sincronizar em qualquer dispositivo.',
    added: [
      'Autenticação de usuários via Firebase Auth (E-mail/Senha e Google SSO)',
      'Salvamento e sincronização em tempo real de arquiteturas no Cloud Firestore',
      'Modal "Minhas Arquiteturas Salvas" para gerenciar projetos salvos na nuvem',
      'Auto-save a cada 30 segundos com indicador de última sincronização',
      'Sincronização das preferências do arquiteto (tema e cloud padrão)'
    ],
    changed: [
      'Menu de perfil de usuário na barra superior com status de nuvem ativa',
      'Fallback transparente para armazenamento local em caso de instabilidade'
    ],
    security: [
      'Regras de segurança firestore.rules isolando dados estritamente por UID do usuário autenticado'
    ]
  },
  {
    version: 'v1.5.0',
    date: '04/09/2026',
    title: 'Integração Google Workspace & Central de Feedback',
    highlight: 'Conectividade direta com Google Drive para salvar/abrir projetos e envio formatado de feedbacks técnicos.',
    added: [
      'Integração com Google Drive para salvar e abrir arquivos de arquitetura .json',
      'Compartilhamento de resumos de arquitetura diretamente via Gmail',
      'Central de Feedback interativa com suporte a relato de bugs, sugestões e elogios para edsinfobr@gmail.com',
      'Diagnóstico técnico automatizado anexado aos chamados de suporte'
    ],
    changed: [
      'Gerenciamento seguro de tokens OAuth com escopo drive.file'
    ]
  },
  {
    version: 'v1.4.0',
    date: '02/09/2026',
    title: 'Propostas Comerciais (Word/Docx & PDF) & Abas de Versões',
    highlight: 'Geração automatizada de propostas executivas para Microsoft Word (.docx) e controle de versões de arquitetura no canvas.',
    added: [
      'Gerador de Propostas Técnicas em Word (.docx) com cabeçalhos corporativos, tabelas e snapshot do diagrama',
      'Suporte a propostas de Nova Implementação e Migração Cloud (Rehost, Replatform, Refactor)',
      'Cálculo de orçamento estimado em BRL, SLA corporativo e cronograma em semanas',
      'Barra de Abas de Versões (VersionTabsBar) no rodapé para criar v1.0, v1.1 e ramificar cenários',
      'Duplicação de versões ativas com 1 clique para comparação de arquiteturas'
    ],
    changed: [
      'Exportação de documentos formatados com paleta de cores corporativa'
    ]
  },
  {
    version: 'v1.3.0',
    date: '28/08/2026',
    title: 'Assistente IA Gemini & Linter de Segurança Cloud',
    highlight: 'Geração e auditoria de arquiteturas com Inteligência Artificial Google Gemini e auditor de segurança em tempo real.',
    added: [
      'Assistente de IA Google Gemini via backend seguro Express para geração a partir de linguagem natural',
      'Auditoria arquitetural por IA com notas de Alta Disponibilidade, Segurança e FinOps',
      'Cloud Security & Best Practice Linter modal com validações instantâneas (SPOF, portas públicas, Multi-AZ)',
      'Carimbo de Metadados / Selo de Arquitetura no canvas (Projeto, Autor, Cargo, Data)'
    ],
    changed: [
      'Proxy seguro no backend Node.js para isolamento da chave GEMINI_API_KEY'
    ]
  },
  {
    version: 'v1.2.0',
    date: '20/08/2026',
    title: 'Suporte OCI (Oracle Cloud) & Biblioteca de Templates Oficiais',
    highlight: 'Expansão do catálogo para Oracle Cloud Infrastructure (OCI) e biblioteca com mais de 12 templates prontos de nível empresarial.',
    added: [
      'Catálogo oficial de serviços Oracle Cloud (OCI): VCN, Compute Shapes, FastConnect, Autonomous DB, Exadata, OKE, HeatWave',
      '12+ Templates prontos para AWS, Azure, GCP e OCI (3-Tier IaaS, Microservices PaaS, DevOps GitOps)',
      'Template Multi-Cloud Enterprise distribuído integrando as 4 principais nuvens',
      'Modal de navegação e instanciação de templates com pré-visualização'
    ],
    changed: [
      'Classificação por cores e identificadores Terraform nativos de OCI'
    ]
  },
  {
    version: 'v1.1.0',
    date: '10/08/2026',
    title: 'Calculadora FinOps Multicloud & Gerador Terraform IaC',
    highlight: 'Estimativas orçamentárias mensais/anuais em tempo real e exportação de código Infrastructure as Code em HCL.',
    added: [
      'Calculadora FinOps em tempo real para AWS, Azure, GCP e OCI com estimativas mensais e anuais',
      'Comparador de custos Multi-Cloud direto no painel de propriedades',
      'Exportação de planilha financeira em CSV e Relatório de Custos em PDF',
      'Gerador de código Terraform (.tf) pronto para execução em AWS, Azure e GCP',
      'Painéis retráteis ergonômicos (Catálogo e Inspector) com atalhos de minimização',
      'Suporte automático à preferência de tema escuro/claro do sistema operacional'
    ],
    changed: [
      'Otimização de layout para telas de alta resolução'
    ]
  },
  {
    version: 'v1.0.0',
    date: '01/08/2026',
    title: 'Lançamento Inicial da Plataforma',
    highlight: 'Primeira versão do MultiCloud Canvas Studio com motor vetorial e suporte a AWS, Azure e GCP.',
    added: [
      'Canvas vetorial interativo com arrastar e soltar (Drag & Drop), zoom e pan suave',
      'Contêineres de rede: VPC, Subredes Públicas/Privadas com cálculo de CIDR, Resource Groups e Compartimentos',
      'Conexões inteligentes com inferência automática de protocolo (HTTPS, gRPC, TCP, JDBC, Redis, AMQP)',
      'Exportação de diagramas em PNG, JPG transparente, SVG e PDF',
      'Importação e exportação de projetos em JSON',
      'Mecanismo de Desfazer e Refazer (Undo/Redo) com histórico completo'
    ],
    changed: [
      'Estrutura modular em React 18, TypeScript e Tailwind CSS'
    ]
  }
];

export const LATEST_APP_VERSION = CHANGELOG_DATA[0]?.version || 'v1.10.0';
