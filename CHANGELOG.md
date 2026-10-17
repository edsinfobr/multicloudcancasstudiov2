# 📝 Registro de Mudanças (Changelog) - MultiCloud Canvas Studio

Todas as alterações notáveis, adições de recursos, correções e melhorias arquiteturais do **MultiCloud Canvas Studio** estão documentadas neste arquivo.

O formato segue as diretrizes do [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## 📌 Sumário das Versões

- [v1.10.0 (2026-10-06)](#v1100---2026-10-06) - *Calculadora de Custos com Modos Separados (Arquitetura Atual & Comparativo de Provedores)*
- [v1.9.0 (2026-09-13)](#v190---2026-09-13) - *Novos Escopos e Grupos de Container (On-Premise, Cluster, App, Genérico, ASG, AWS Account & Azure RG)*
- [v1.8.0 (2026-09-10)](#v180---2026-09-10) - *Preferências do Perfil de Usuário, Carimbo Padrão & Sincronização de Menus*
- [v1.7.0 (2026-09-07)](#v170---2026-09-07) - *Autenticação Inicial Obrigatória & Assistente Firebase Console*
- [v1.6.0 (2026-09-06)](#v160---2026-09-06) - *Persistência em Nuvem no Firestore & Autenticação de Usuários*
- [v1.5.0 (2026-09-04)](#v150---2026-09-04) - *Integração Google Workspace & Central de Feedback*
- [v1.4.0 (2026-09-02)](#v140---2026-09-02) - *Propostas Comerciais (Word/Docx & PDF) & Abas de Versões*
- [v1.3.0 (2026-08-28)](#v130---2026-08-28) - *Assistente IA Gemini & Linter de Segurança Cloud*
- [v1.2.0 (2026-08-20)](#v120---2026-08-20) - *Suporte OCI (Oracle Cloud) & Biblioteca de Templates Oficiais*
- [v1.1.0 (2026-08-10)](#v110---2026-08-10) - *Calculadora FinOps Multicloud & Gerador Terraform IaC*
- [v1.0.0 (2026-08-01)](#v100---2026-08-01) - *Lançamento Inicial da Plataforma*

---

## [v1.10.0] - 2026-10-06

### 🌟 Destaque
Divisão estruturada da **Calculadora de Custos de Nuvem** em duas visões dedicadas e independentes: modo **Arquitetura Atual (Normal)** (exclusivo para o custo dos recursos desenhados no canvas) e modo **Comparativo de Provedores** (simulação e benchmark multi-cloud simultâneo entre AWS, Microsoft Azure, Google Cloud e Oracle Cloud).

### ✨ Adicionado
- **Seletor por Abas / Segmentado no Topo da Calculadora**:
  - Alternância com um clique entre `Arquitetura Atual` e `Comparativo de Provedores`.
  - Badges dinâmicos indicando a quantidade de recursos no diagrama e a comparação de 4 nuvens.
- **Visão 1: Arquitetura Atual (Normal)**:
  - Foco 100% nos componentes ativos no canvas.
  - Painel de **Distribuição por Provedor no Diagrama** com barras de progresso percentuais e custos por provedor.
  - Painel de **Distribuição por Categoria de Serviço** (computação, banco de dados, storage, redes, IA, segurança).
  - Tabela itemizada de recursos com busca textual instantânea e filtros por Provedor e Categoria.
- **Visão 2: Comparativo de Provedores (Benchmark Multi-Cloud)**:
  - Cards detalhados lado a lado para **AWS**, **Microsoft Azure**, **Google Cloud (GCP)** e **Oracle Cloud (OCI)**.
  - Identificação automática do **Provedor Mais Econômico** (com badge de campeão e percentual de economia frente à média).
  - Destaque do **Melhor Custo-Benefício para Cloud Native e IA** (GCP com Cloud Run scale-to-zero e APIs Gemini).
  - Gráfico comparativo de barras horizontal proporcional de preços mensais.
  - Benchmark categoria a categoria (computação equivalente, banco de dados equivalente, armazenamento e rede).
  - Matriz de TCO com compromissos de longo prazo (Savings Plans e Instâncias Reservadas para 1 ano e 3 anos).
- **Exportação Contextualizada (PDF, CSV e JSON)**:
  - **Relatório PDF Oficial**: Atualizado para considerar estritamente a arquitetura atual modelada no canvas, removendo caixas de outros provedores de nuvem (ex: OCI mais econômico e comparativo com AWS/Azure/GCP/OCI) e exibindo a distribuição real de categorias e recursos tarifados/gratuitos da sua arquitetura.
  - Suporte completo às visões com valores em USD e BRL com taxa de câmbio personalizável.

---

## [v1.9.0] - 2026-09-13

### 🌟 Destaque
Expansão dos recursos de agrupamento e delimitação arquitetural com a adição de **8 novos tipos de containers** no catálogo lateral, posicionados em menu suspenso em lista na posição de Compartment: **Azure Subscription**, **Azure Resource Group**, **AWS Account**, **Auto Scaling Group**, **On-Premise**, **Cluster**, **App** e **Genérico**.

### ✨ Adicionado
- **Menu Suspenso em Lista na Posição de Compartment**:
  - Posicionado estrategicamente no grid do catálogo lateral (`SidebarCatalog`).
  - Lista com 9 opções estruturadas contendo ícone temático, descrição e tags de provedor/ambiente.
- **Container Azure Subscription**:
  - Delimitação arquitetural de Assinatura Microsoft Azure para isolamento de custos, faturamento corporativo, políticas de governança e segregação de ambientes (Dev, Homolog, Prod).
- **Container Azure Resource Group**:
  - Agrupamento nativo de recursos do Azure com herança para Terraform `azurerm_resource_group`.
- **Container AWS Account**:
  - Delimitação de conta mestre, membros ou Unidade Organizacional (OU) na arquitetura.
- **Container Auto Scaling Group (ASG)**:
  - Delimitação visual para grupos elásticos AWS EC2 com geração automática de recurso `aws_autoscaling_group` no código Terraform.
- **Container On-Premise**:
  - Demarcação visual de redes locais, data centers corporativos e ambientes físicos com suporte a bloco CIDR privado.
- **Container Cluster**:
  - Fronteira para agrupamento de pods, nós e serviços Kubernetes (K8s, EKS, AKS, GKE) ou Amazon ECS.
- **Container App (Application Scope)**:
  - Fronteira lógica de escopo de aplicação, agrupando microsserviços, backends e frontends.
- **Container Genérico**:
  - Caixa de container livre e flexível para qualquer finalidade conceitual no diagrama.
- **Integração no Painel de Propriedades (`PropertyPanel`)**:
  - Seletor de Tipo de Container atualizado com todas as novas opções para alternância rápida.
- **Renderização Visual no Canvas (`Canvas`)**:
  - Ícones específicos para cada tipo de container na ausência de logotipo de cloud e badges estilizados no cabeçalho.

### 🔄 Modificado
- O botão de Compartment agora atua como seletor dinâmico em lista com memória da última opção selecionada.
- Código Terraform atualizado com suporte e blocos IaC para os novos tipos de container.

---

## [v1.8.0] - 2026-09-10

### 🌟 Destaque
Lançamento da central de **Preferências do Perfil de Usuário** com persistência em nuvem no Cloud Firestore, introduzindo **Carimbo Padrão do Diagrama**, **Sincronização de Estado dos Menus Laterais** e **Tema Pessoal Persistente**.

### ✨ Adicionado
- **Modal de Preferências do Perfil (`ProfilePreferencesModal`)**:
  - Acessível diretamente pelo menu do usuário na barra superior (*"Preferências do Perfil"*).
  - Abas intuitivas de configuração: **Carimbo Padrão**, **Tema Visual** e **Menus Laterais**.
  - Persistência instantânea no documento do usuário em `users/{userId}` no Firestore.
- **Carimbo Padrão do Diagrama (Stamp Identity)**:
  - Campos persistentes para **Autor Padrão**, **Cargo / Posição**, **Empresa / Organização** e opção de visibilidade inicial no canvas (`showOnCanvas`).
  - **Herança Automática**: ao criar uma nova arquitetura (*"Novo Projeto"*), o desenho já inicia com o carimbo do arquiteto devidamente preenchido e formatado.
  - Pré-visualização em tempo real de como o carimbo é renderizado no canvas.
  - Ações rápidas: *"Aplicar no Diagrama Atual Agora"* e *"Copiar do Diagrama Atual"*.
  - Sincronização rápida adicionada ao modal de metadados (`MetadataModal`): botões *"Usar Padrão do Perfil"* e *"Definir como Padrão do Perfil"*.
- **Configuração de Abertura dos Menus Laterais**:
  - Preferências para iniciar o Catálogo de Serviços (lado esquerdo) e o Painel de Propriedades/IaC (lado direito) como contraídos (*collapsed*) ou expandidos por padrão.
  - Botões de recolher e expandir (`onToggleCollapse`) sincronizam automaticamente o novo estado com o Firestore quando o usuário estiver autenticado.
- **Campo Corporativo "Empresa / Organização"**:
  - Adicionado campo dedicado para identificação institucional nos metadados do projeto, no painel lateral de propriedades e na legenda flutuante do canvas.

### 🔄 Modificado
- **Tema Visual Sincronizado**:
  - A seleção de Modo Claro (*Light Mode*) ou Modo Escuro (*Dark Mode*) é gravada na nuvem e aplicada automaticamente em qualquer dispositivo logado.
- **Menu de Usuário na Barra de Navegação (`Navbar`)**:
  - Adicionada opção *"Preferências do Perfil"* com atalho e ícone indicativo.
- **Exportações e Visualização**:
  - O carimbo do canvas agora exibe o nome da Empresa/Organização quando configurado.

### 🛡️ Segurança
- **Regras Firestore Atualizadas (`firestore.rules`)**:
  - Validação estrita de tipos e limites de caracteres para `defaultStamp` (author, role, company), `theme` ('dark' | 'light'), `leftSidebarCollapsed` (bool) e `rightSidebarCollapsed` (bool).

---

## [v1.7.0] - 2026-09-07

### 🌟 Destaque
Introdução da **Tela Inicial de Autenticação Obrigatória** (`AuthScreen`) antes de liberar o acesso ao estúdio de diagramação, acompanhada de assistente interativo de configuração de provedores do Firebase.

### ✨ Adicionado
- **Tela de Autenticação Inicial (`AuthScreen`)**:
  - Primeira tela renderizada na inicialização quando não houver usuário conectado.
  - Apresentação visual da identidade MultiCloud com logos oficiais de AWS, Azure, GCP, OCI e Kubernetes.
  - Abas para **Entrar**, **Cadastrar-se** (com validação de senha segura e confirmação) e **Redefinir Senha**.
  - Login rápido integrado com **Google SSO**.
  - Modo alternativo **"Acessar como Convidado (Modo Offline)"** para testes imediatos sem login obrigatório.
  - Alternador de tema Claro/Escuro diretamente no cabeçalho da tela de login.
- **Assistente Interativo de Erro `auth/operation-not-allowed`**:
  - Detecção inteligente quando o método E-mail/Senha ainda não foi ativado no Firebase Console do projeto.
  - Exibição de card orientativo com passo a passo ilustrado em 3 etapas.
  - Botão de atalho direto para o painel de *Sign-in method* do Firebase Console (`gen-lang-client-0483065225`).
  - Botão retrátil de ajuda *"Como ativar E-mail no Firebase?"* para consulta rápida.
- **Splash de Carregamento**:
  - Tela de pré-carregamento com animação suave e ícone do MultiCloud durante a verificação inicial do estado da sessão Firebase.

### 🔄 Modificado
- **Desconexão de Sessão (`btn-logout`)**:
  - O fluxo de logout agora desconecta o usuário no Firebase Auth e o redireciona imediatamente para a tela de autenticação inicial.
- **Barra de Navegação (`Navbar`)**:
  - Exibição do distintivo *"Modo Convidado"* quando navegando sem login.
  - Botão *"Cadastrar / Entrar"* adaptado para retornar à tela de login ou abrir o modal de autenticação.
- **Contexto de Autenticação (`AuthContext`)**:
  - Exposição de `authErrorCode` e `firebaseProjectId` para mensagens de ajuda contextualizadas.

---

## [v1.6.0] - 2026-09-06

### 🌟 Destaque
Integração nativa com **Firebase Authentication** e banco de dados em nuvem **Cloud Firestore** para persistência e sincronização de diagramas e preferências do arquiteto.

### ✨ Adicionado
- **Autenticação Firebase Nativa**:
  - Criação de contas com e-mail e senha, com persistência de perfil (`displayName`, `email`).
  - Login social seguro com Google Identity Services.
  - Recuperação de credenciais via envio de e-mail de redefinição de senha (`sendPasswordResetEmail`).
- **Persistência de Arquiteturas no Cloud Firestore**:
  - Coleção `userArchitectures` isolada por ID de usuário (`userId`).
  - Salvamento de arquiteturas com título, descrição, nós, contêineres, links, tags de versão e metadados.
  - Modal **"Minhas Arquiteturas Salvas"** (`SavedArchitecturesModal`) com listagem, busca, data de atualização, visualização e exclusão.
- **Sincronização de Preferências do Usuário**:
  - Armazenamento de tema padrão (`dark` ou `light`) e provedor primário (`aws`, `azure`, `gcp`, `oci`) no documento do usuário em `users/{userId}/profile`.
- **Regras de Segurança Firestore (`firestore.rules`)**:
  - Políticas de controle de acesso estritas garantindo que cada usuário só pode ler, gravar e excluir seus próprios diagramas (`request.auth.uid == resource.data.userId`).

### 🔄 Modificado
- Menu suspenso de perfil de usuário na `Navbar` com status de conexão em tempo real e atalhos rápidos.
- Suporte a fallback seguro para armazenamento local (`localStorage`) caso o usuário esteja offline ou sem rede.

---

## [v1.5.0] - 2026-09-04

### 🌟 Destaque
Integração com **Google Workspace (Drive e Gmail)** e central de feedback com relatórios estruturados.

### ✨ Adicionado
- **Integração com Google Drive**:
  - Salvamento de arquivos de arquitetura `.json` diretamente na pasta do Google Drive do usuário.
  - Modal de busca e abertura de arquivos do Drive diretamente para o canvas.
  - Gestão de tokens de acesso OAuth com escopo `drive.file`.
- **Compartilhamento por Gmail**:
  - Envio de links de projetos e resumo arquitetural formatado diretamente via Gmail.
- **Central de Feedback do Usuário (`FeedbackModal`)**:
  - Formulário categorizado para reporte de bugs, sugestões de novos recursos/ícones, dicas de UX e elogios.
  - Destinatário oficial configurado para `edsinfobr@gmail.com`.
  - Inclusão automática opcional de diagnóstico técnico (versão do app, nós no canvas, provedor ativo, resolução de tela).

---

## [v1.4.0] - 2026-09-02

### 🌟 Destaque
Geração automatizada de **Propostas Técnicas e Comerciais em Microsoft Word (`.docx`)** e sistema de **Abas de Versionamento de Arquitetura**.

### ✨ Adicionado
- **Gerador de Propostas Comerciais (`ProposalModal` / `docxGenerator`)**:
  - Exportação de documentos `.docx` profissionais e formatados com cabeçalho, tabelas e identidade visual corporativa.
  - **Tipos de Proposta Suportados**:
    1. *Proposta de Implementação de Nova Arquitetura*.
    2. *Proposta de Migração para Nuvem* (Estratégias 7Rs: Rehost, Replatform, Refactor, Híbrida).
  - Seções automáticas: Sumário Executivo, Escopo Técnico, Inventário de Serviços, Estimativa Orçamentária em BRL, SLA corporativo e Prazos em Semanas.
  - Incorporação do print visual do diagrama em alta resolução diretamente dentro do arquivo Word.
- **Barra de Abas de Versões (`VersionTabsBar`)**:
  - Localizada no rodapé inferior do canvas.
  - Permite criar versões incrementais (`v1.0`, `v1.1`, `v1.2`, etc.) para o mesmo projeto.
  - Suporte a duplicação rápida da versão ativa para testes de hipóteses de arquitetura.
  - Exclusão e alternância instantânea entre versões com preservação de histórico.

---

## [v1.3.0] - 2026-08-28

### 🌟 Destaque
Capacidades de **Inteligência Artificial Generativa com Google Gemini** e **Linter de Segurança Cloud**.

### ✨ Adicionado
- **Assistente de IA Google Gemini (`@google/genai`)**:
  - Servidor Express backend (`server.ts`) atuando como proxy seguro para proteger a chave de API `GEMINI_API_KEY`.
  - **Geração de Arquitetura por Prompt**: Criação de diagramas completos a partir de descrições em linguagem natural.
  - **Auditoria Arquitetural Inteligente**: Análise automatizada do diagrama com pontuação de Alta Disponibilidade (HA), Segurança e Redução de Custos (FinOps).
- **Linter de Segurança Cloud (`CloudSecurityLinterModal`)**:
  - Verificação automatizada de vulnerabilidades em tempo real.
  - Detecção de Single Points of Failure (SPOF).
  - Alerta de portas inseguras expostas publicamente (ex: SSH 22, RDP 3389, HTTP 80 sem HTTPS).
  - Checagem de zonas de disponibilidade (Multi-AZ) e ausência de Web Application Firewall (WAF).
- **Carimbo de Identificação Técnica (`MetadataModal`)**:
  - Selo visual no canvas contendo Projeto, Autor, Cargo/Papel e Data.
  - Ativação ou ocultação sob demanda para exportações formais.

---

## [v1.2.0] - 2026-08-20

### 🌟 Destaque
Expansão do catálogo para **Oracle Cloud Infrastructure (OCI)** e biblioteca com **12+ Templates Empresariais Prontos**.

### ✨ Adicionado
- **Suporte Oficial a Oracle Cloud Infrastructure (OCI)**:
  - Adição de ícones e definições de serviços: VCN, Compute Shapes, FastConnect, Autonomous Database, Exadata Cloud, OCI Kubernetes Engine (OKE), MySQL HeatWave, Vault e Object Storage.
  - Definição de cores de marca e tipos de recursos Terraform específicos de OCI (`oci_core_instance`, `oci_core_vcn`, etc.).
- **Biblioteca de Templates de Arquitetura (`templates.ts`)**:
  - **AWS**: High Availability 3-Tier Web App (IaaS), Serverless Microservices (PaaS), EKS DevOps & GitOps CI/CD.
  - **Azure**: PaaS Web App & Microservices, Enterprise IaaS Landing Zone & Hybrid Network.
  - **GCP**: Modern Microservices & Vertex AI Pipeline, Real-Time Streaming & BigQuery Analytics, GKE Native DevOps.
  - **OCI**: Enterprise High-Performance IaaS Network, Cloud-Native PaaS & Microservices Stack, DevOps CI/CD & OKE GitOps.
  - **Multi-Cloud**: Enterprise Setup integrado com AWS, Azure, GCP e OCI.

---

## [v1.1.0] - 2026-08-10

### 🌟 Destaque
Calculadora **FinOps em Tempo Real** e gerador de código **Terraform (Infrastructure as Code)**.

### ✨ Adicionado
- **Calculadora de Custos FinOps**:
  - Cálculo instantâneo do custo mensal e anual dos serviços presentes no canvas.
  - Suporte a instâncias computacionais, armazenamento de blocos, bancos de dados gerenciados e transferência de dados.
  - **Comparador Multi-Cloud**: Estimativa aproximada de custo caso a mesma arquitetura fosse executada em AWS, Azure, GCP ou OCI.
  - Exportação de tabela orçamentária em planilha **CSV** e **Relatório PDF de Custos**.
- **Gerador de Código Terraform (`TerraformModal` / `iacGenerator`)**:
  - Conversão automática dos nós e contêineres do canvas em código HCL Terraform `.tf`.
  - Separação em blocos `provider`, `resource` e tags de ambiente.
  - Botão para copiar código ou baixar arquivo `.tf` compilado.
- **Ergonomia de Interface**:
  - Painel lateral esquerdo retrátil (Catálogo de Ícones).
  - Painel lateral direito retrátil (Property Inspector).
  - Detecção automática de preferência de tema do sistema operacional (`dark` / `light`).

---

## [v1.0.0] - 2026-08-01

### 🌟 Destaque
Lançamento inicial do **MultiCloud Canvas Studio** como estúdio interativo web para desenho de arquiteturas de nuvem.

### ✨ Adicionado
- **Canvas Vetorial Interativo**:
  - Motor de desenho em SVG/HTML5 com suporte a arrastar e soltar (Drag & Drop).
  - Zoom de 25% a 200%, Pan suave com arrasto do mouse e alinhamento por grade (Grid snapping).
  - Função "Ajustar à Tela" (*Fit to Screen*).
- **Contêineres de Rede & Grupos**:
  - Criação de limites de VPC, Subredes Públicas e Privadas com cálculo de CIDR, Resource Groups e Compartimentos.
- **Conexões Inteligentes de Rede**:
  - Criação de links direcionais entre serviços.
  - Inferência automática de protocolo (HTTPS, gRPC, TCP, UDP, JDBC, Redis, AMQP, S3).
  - Estilização de linhas: retas, curvas, ortogonais e em arco, com controle de espessura e cores.
- **Exportação Multiformato**:
  - Download de diagramas em **PNG**, **JPG** transparente, **SVG** vetorial e **PDF**.
  - Exportação e importação nativa em formato aberto **JSON**.
- **Mecanismo de Desfazer/Refazer (Undo/Redo)**:
  - Pilha completa de histórico para reversão de ações com atalhos de teclado (Ctrl+Z / Ctrl+Y).
