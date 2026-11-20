# ☁️ MultiCloud Canvas Studio

Uma plataforma web interativa para modelagem, documentação, estimativa de custos, geração de código **Terraform (IaC)** e **deploy/controle de infraestrutura real em nuvem** (**AWS, Azure, GCP, OCI, Magalu Cloud (MGC), On-Premises, IA e Frameworks Corporativos**).

🌐 **Acesse online:** [https://multicloudcanvas.com](https://multicloudcanvas.com)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.x-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8.svg)
![Terraform](https://img.shields.io/badge/IaC-Terraform%20CLI-7B42BC.svg)
![MGC](https://img.shields.io/badge/Cloud-Magalu%20Cloud%20(MGC)-0086FF.svg)
![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-4285f4.svg)
![Firebase](https://img.shields.io/badge/Cloud-Firebase%20%26%20Firestore-FFCA28.svg)

---

## 🚀 Visão Geral

O **MultiCloud Canvas Studio** permite que arquitetos de soluções, engenheiros DevOps e desenvolvedores desenhem diagramas de arquitetura completos, validem segurança e resiliência, calculem custos comparativos entre provedores, gerem código **Terraform** pronto para produção e executem **provisionamento e controle real** (**Start / Stop / Reboot**) diretamente em contas **AWS, GCP, Azure e OCI**.

A ferramenta também conta com **Assistente de IA integrado (Google Gemini)**, geração de **Propostas Técnicas em DOCX**, versionamento de diagramas e integração com **Firebase**, **Google Drive** e **Gmail**.

---

## ⭐ Tabela de Recursos em Destaque

| Categoria | Recurso | Descrição e Capacidades |
| :--- | :--- | :--- |
| 🎨 **Canvas & Modelagem** | **Editor Visual Drag & Drop** | Canvas interativo com zoom, pan, minimapa, grade magnética (*snap-to-grid*), *Auto-Layout*, Undo/Redo, painéis retráteis e carimbo técnico de projeto (*Metadata Stamp*). |
| 🧩 **Catálogo Multi-Cloud** | **AWS, Azure, GCP, OCI & MGC** | Biblioteca extensa de serviços de Compute, Containers, Storage, Bancos de Dados, Redes, Segurança, Analytics e DevOps para os grandes provedores globais e a **Magalu Cloud (MGC)**. |
| 🇧🇷 **Magalu Cloud (MGC)** | **Serviços, Templates & Terraform** | Suporte nativo à nuvem brasileira (**Virtual Machines**, **Kubernetes MKS**, **Container Registry**, **Block Storage**, **Object Storage**, **VPC** e **Databases DBaaS**), 4 templates prontos, regiões `br-se1`/`br-ne1` e geração de código **Terraform (`magalucloud/mgc`)**. |
| 🏢 **On-Premises & Híbrido** | **Datacenter & Virtualização** | Ícones dedicados para **VMware (vSphere/vCenter)**, **Nutanix AHV**, **Hyper-V**, servidores Web, Aplicação, Banco de Dados, Firewalls e redes locais. |
| 📐 **Enterprise Architecture** | **C4 Model, ArchiMate & TOGAF** | Suporte nativo a fronteiras, elementos e templates corporativos para modelagem **C4 (Context/Container/Component)**, **ArchiMate 3.2** e **TOGAF ADM**. |
| 🔗 **Conexões Inteligentes** | **Protocolos & Animação de Fluxo** | Inferência automática de protocolos (HTTPS, gRPC, SQL, Redis, Kafka, AMQP, Peering), múltiplos roteamentos, detector de nós órfãos e animação de fluxo nas setas. |
| 🚀 **Cloud Deploy (Live)** | **Conexão Real AWS / GCP / Azure / OCI** | Autenticação real via API oficial (credenciais mantidas apenas em RAM no servidor), descoberta e importação de recursos existentes e controle direto **Start / Stop / Reboot**. |
| ⚙️ **Motor Terraform CLI** | **Execução Real de IaC** | Execução assíncrona de `init`, `validate`, `plan` (com resumo visual de mudanças), `apply`, `refresh`, `destroy` e ações por recurso com status ao vivo nos nós do canvas. |
| 🏗️ **Gerador Terraform** | **Exportação `.tf` & `.tfvars`** | Geração automática de `main.tf`, `variables.tf`, `terraform.tfvars` e `outputs.tf` para **AWS, Azure, GCP, OCI e MGC (`magalucloud/mgc`)** sincronizados com o diagrama. |
| 🤖 **IA com Google Gemini** | **Geração & Auditoria por Prompt** | Criação de arquiteturas completas a partir de texto em linguagem natural e auditoria automática com notas para Alta Disponibilidade (HA), Segurança e Custos. |
| 🛡️ **Segurança & Qualidade** | **Cloud Security Linter** | Inspeção automatizada do diagrama para identificar exposição pública indevida, portas críticas, ausência de redundância (*SPOF*) e boas práticas. |
| 💰 **FinOps & Custos** | **Estimador & Comparador Multi-Cloud** | Cálculo mensal/anual em tempo real por nó (incluindo recursos **MGC**), comparativo de custos entre **AWS, Azure, GCP e OCI** e exportação de planilhas **CSV** e relatórios **PDF**. |
| 📄 **Documentação & Propostas** | **Exportação DOCX, PDF & SVG/PNG** | Geração de propostas técnicas/comerciais editáveis em **DOCX**, documentação arquitetural, exportação visual em **PNG, JPG, SVG, PDF, JSON** e envio por **Gmail**. |
| 💾 **Nuvem & Versionamento** | **Firebase, Google Drive & Versões** | Autenticação e persistência no **Firestore**, abas de **versionamento** no mesmo projeto, histórico local automático e salvamento no **Google Drive**. |
| 🎭 **Experiência & Idiomas** | **Apresentação, Temas & i18n** | **Modo Apresentação** em tela cheia (HUD), biblioteca de **Templates prontos** (com normalização automática anti-sobreposição), tema **Dark / Light** automático e interface em **PT-BR, EN e ES**. |

---

## ✨ Funcionalidades e Recursos Detalhados

### 🎨 Canvas Interativo & Catálogo Multicloud
- **Arrastar e Soltar (Drag & Drop):** Adicione nós e serviços das principais nuvens (**AWS, Azure, GCP, OCI e Magalu Cloud / MGC**), On-Premises, IA e genéricos de infraestrutura/redes.
- **Serviços Magalu Cloud (MGC):** Catálogo dedicado com identidade visual oficial da MGC incluindo **Virtual Machines** (`mgc_virtual_machine_instances`), **Kubernetes MKS** (`mgc_kubernetes_cluster`), **Container Registry** (`mgc_container_registry`), **Block Storage** (`mgc_block_storage_volumes`), **Object Storage** (`mgc_object_storage_buckets`), **VPC** (`mgc_network_vpcs`) e **Databases DBaaS** (`mgc_dbaas_instances`).
- **Grupos & Camadas de Rede (Boundaries):** Agrupe componentes em VPCs, Subredes públicas/privadas (com campo CIDR dedicado exibido abaixo do nome), Regiões (incluindo `br-se1` e `br-ne1` da MGC), Clusters e Zonas de Disponibilidade.
- **Conexões Inteligentes:** Crie links direcionais entre serviços com inferência automática de protocolo (HTTPS, gRPC, JDBC, PostgreSQL, Redis, AMQP, S3/Object Storage, etc.).
- **Modo Grade e Alinhamento:** Canvas com navegação suave (Zoom, Pan, Minimapa) e grade de alinhamento configurável.

### 📐 Templates Prontos de Arquitetura (AWS, Azure, GCP, OCI, MGC)
- **AWS:**
  - **AWS High Availability 3-Tier Web App (IaaS):** Web app de 3 camadas em Multi-AZ com ALB, EC2 Auto Scaling e Multi-AZ RDS PostgreSQL.
  - **AWS Serverless & Event-Driven Microservices (PaaS):** Arquitetura orientada a eventos com Route 53, CloudFront, API Gateway, Lambda, DynamoDB, EventBridge, SQS e SNS.
  - **AWS EKS Container DevOps & GitOps CI/CD:** Pipeline de DevOps completo com GitHub, CodePipeline, SonarQube, ECR, EKS Cluster e ArgoCD GitOps.
- **Azure:**
  - **Azure PaaS Web Application & Microservices:** Stack PaaS gerenciada com Front Door CDN, App Gateway (WAF), App Service, Azure Functions, Cosmos DB e Key Vault.
  - **Azure Enterprise IaaS Landing Zone & Hybrid Network:** Rede híbrida com ExpressRoute, Hub-and-Spoke VNet, Azure Firewall, Load Balancers e Azure SQL.
- **GCP (Google Cloud):**
  - **GCP Modern Microservices & Vertex AI Pipeline (PaaS):** Cloud Run, GKE, Vertex AI endpoints, Cloud SQL PostgreSQL e BigQuery.
  - **GCP Real-Time Streaming & BigQuery Analytics (PaaS):** Ingestão streaming com Cloud Pub/Sub, Dataflow, Cloud Storage, BigQuery ML e Vertex AI.
  - **GCP GKE Native DevOps & GitOps CI/CD:** Pipeline de entrega contínua com Cloud Build, Artifact Registry, GKE Cluster, ArgoCD e Cloud Logging.
- **OCI (Oracle Cloud Infrastructure):**
  - **OCI Enterprise High-Performance IaaS Network:** Conexão FastConnect, VCN, Load Balancer, instâncias de Compute com Block Volumes e Exadata DB.
  - **OCI Cloud-Native PaaS & Microservices Stack:** OCI API Gateway, OCI Functions, OCI OKE (Kubernetes), MySQL HeatWave, Streaming e Vault.
  - **OCI DevOps CI/CD & OKE GitOps Pipeline:** Pipeline de CI/CD automatizado no OCI com Repositórios de Código, Build Pipelines, Artifact Registry e OKE.
- **MGC (Magalu Cloud):**
  - **MGC Cloud-Native Microservices (MKS + Container Registry + DBaaS):** Arquitetura em produção na região `br-se1` com MGC VPC segmentada em sub-redes pública e privada, Ingress Load Balancer, Kubernetes gerenciado (MKS), Container Registry privado com CI/CD, PostgreSQL DBaaS e Object Storage S3.
  - **MGC 3-Tier Web App Alta Disponibilidade (VMs + NVMe + DBaaS):** Topologia tradicional de 3 camadas (Public, App e Data Subnets) com WAF, Load Balancer, clusters de Virtual Machines (`BV4-8-40` e `BV2-4-20`), volumes NVMe Block Storage, DBaaS gerenciado e Object Storage.
  - **MGC Data Lake & Disaster Recovery Multi-Região (`br-se1` → `br-ne1`):** Pipeline analítico com ingestão via VMs, Data Lake S3 (camadas Bronze/Gold), processamento ETL em MKS com Block Storage NVMe e replicação de Disaster Recovery para `br-ne1`.
  - **MGC + AWS Multi-Cloud Soberania de Dados (LGPD Brasil):** Arquitetura híbrida mantendo dados sensíveis, DBaaS, Object Storage e APIs principais na MGC no Brasil (`br-se1`) integrados à borda global e analytics anonimizados na AWS (CloudFront, WAF, S3 e EKS).
- **Multi-Cloud:**
  - **Multi-Cloud Enterprise Setup:** Arquitetura distribuída combinando AWS (Edge & Compute), Azure (OpenAI), GCP (BigQuery AI) e OCI (Autonomous Database).

### 📐 Painéis Retráteis Ergonômicos
- **Canvas Tools & Catálogo (Esquerda):** Painel dobrável para a esquerda para maximizar a área útil do canvas.
- **Inspector de Propriedades e Recursos (Direita):** Detalhes e especificações do nó selecionado, dobrável para a direita com 1 clique.

### 🌓 Suporte Automático ao Tema do Sistema (Dark / Light)
- Detecta e segue automaticamente a preferência de cor (Dark Mode / Light Mode) do Sistema Operacional do usuário (`prefers-color-scheme`).
- Alternância manual disponível diretamente na barra de navegação.

### 📄 Carimbo de Arquitetura (Metadata Stamp)
- Suporte a carimbo de identificação técnica contendo **Projeto**, **Autor**, **Papel/Cargo** e **Data**.
- Ativável sob demanda no painel de detalhes (desativado por padrão no canvas para manter o visual limpo).

### 🤖 Assistente de IA com Google Gemini
- **Gerador de Arquitetura por Prompt:** Descreva um cenário (ex: *"Arquitetura serverless microsserviços AWS com Lambda, DynamoDB e API Gateway"*) e receba o diagrama montado automaticamente.
- **Análise & Auditoria de Arquitetura:** Avaliação automática do diagrama quanto a Single Points of Failure (SPOF), melhores práticas de segurança e oportunidades de redução de custos.

### 💰 Estimador de Custos em Tempo Real
- Cálculo financeiro mensal dinâmico baseado nos nós selecionados no diagrama.
- **Exportação Financeira:** Baixe a planilha de custos em **CSV** ou gere um **Relatório PDF de Custos** detalhado.

### 🏗️ Gerador de Código Infrastructure as Code (Terraform)
- Transforma visualmente seu diagrama em código **Terraform (`.tf`)** limpo e estruturado para **AWS, Azure, GCP, OCI e Magalu Cloud (MGC — provider `magalucloud/mgc`)**.
- Copie o código gerado ou faça o download direto dos arquivos `main.tf`, `variables.tf`, `terraform.tfvars` e `outputs.tf`.

### 💾 Armazenamento & Nuvem
- **Salvar & Carregar Localmente:** Persistência no armazenamento do navegador (`localStorage`).
- **Integração com Google Drive:** Salve, abra e gerencie arquivos de arquitetura `.json` diretamente na sua conta do Google Drive.
- **Exportação Visual de Alta Resolução:** Exporte seu diagrama em **PNG**, **SVG** e **PDF**.

---

## 🛠️ Arquitetura do Projeto & Tecnologias

A aplicação utiliza uma estrutura full-stack moderna com React no frontend e Express no backend para proxear chamadas seguras à API do Google Gemini.

```
                    ┌─────────────────────────────────────────┐
                    │               Navegador                 │
                    │   React 18 + TypeScript + Tailwind CSS   │
                    └────────────────────┬────────────────────┘
                                         │
                                   HTTP / REST
                                         │
                    ┌────────────────────▼────────────────────┐
                    │            Servidor Node.js             │
                    │         (Express.js + Vite App)         │
                    └────────────────────┬────────────────────┘
                                         │
                                   @google/genai
                                         │
                    ┌────────────────────▼────────────────────┐
                    │           Google Gemini API             │
                    └─────────────────────────────────────────┘
```

### Principais Bibliotecas Utilizadas
- **React 18 & TypeScript:** Framework de interface e tipagem estática rigorosa.
- **Tailwind CSS 4:** Estilização utilitária e design responsivo.
- **Lucide React:** Conjunto completo de ícones minimalistas.
- **html2canvas & jsPDF:** Renderização e geração de relatórios técnicos em PDF.
- **@google/genai:** SDK oficial do Google Gemini para chamadas de IA generativa no backend.

---

## 📁 Estrutura de Pastas

```
├── public/                 # Assets estáticos
├── src/
│   ├── components/         # Componentes React
│   │   ├── Canvas.tsx              # Área de desenho interativa
│   │   ├── PropertyPanel.tsx       # Inspector de detalhes do recurso (Direita)
│   │   ├── SidebarCatalog.tsx      # Catálogo de componentes & Canvas Tools (Esquerda)
│   │   ├── Navbar.tsx              # Barra superior de navegação e ações
│   │   ├── CostModal.tsx           # Modal de estimativa e exportação de custos
│   │   ├── TerraformModal.tsx      # Modal do gerador de código Terraform
│   │   ├── AiPromptModal.tsx       # Interface do assistente de IA Gemini
│   │   └── ...
│   ├── data/               # Ícones de nuvem e templates padrão
│   │   ├── cloudIcons.ts
│   │   ├── cloudLogos.ts
│   │   ├── magaluIcons.ts          # Serviços e ícones Magalu Cloud (MGC)
│   │   ├── mgcTemplates.ts         # Templates arquiteturais prontos para MGC
│   │   └── templates.ts
│   ├── utils/              # Funções utilitárias, PDF, IaC, layout e storage
│   │   ├── costCalculator.ts
│   │   ├── exportUtils.ts
│   │   ├── terraformGenerator.ts
│   │   ├── templateLayout.ts       # Normalização anti-sobreposição de templates
│   │   ├── protocolInfer.ts
│   │   └── storageUtils.ts
│   ├── types.ts            # Definições de tipos TypeScript do projeto
│   ├── App.tsx             # Componente raiz da aplicação
│   └── main.tsx            # Ponto de entrada React
├── server.ts               # Servidor Express para Proxy da API Gemini
├── .env.example            # Exemplo de variáveis de ambiente
├── package.json            # Dependências e scripts do projeto
└── tsconfig.json           # Configuração do TypeScript
```

---

## 📦 Como Executar o Projeto Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** ou **bun**

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/edsinfobr/multicloudcancasstudiov2.git
   cd multicloudcancasstudiov2
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Configurar as Variáveis de Ambiente:**
   Crie um arquivo `.env` baseado no `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Adicione sua chave de API do Google Gemini no arquivo `.env`:
   ```env
   GEMINI_API_KEY=sua_chave_aqui
   ```

4. **Iniciar o Servidor de Desenvolvimento:**
   ```bash
   npm run dev
   ```
   Abra o seu navegador e acesse `http://localhost:3000`.

---

## ⚡ Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento Express + Vite.
- `npm run build`: Compila o código frontend e o backend em pacotes para produção (`dist/`).
- `npm run start`: Executa o servidor compilado em modo de produção.
- `npm run lint`: Executa a verificação estática de tipos com o TypeScript (`tsc --noEmit`).

---

## 💬 Feedback, Sugestões e Suporte

Sua opinião e colaboração são muito importantes para o aprimoramento contínuo do **CloudCraft**!

Se você encontrou algum erro (bug), tem ideias de novas funcionalidades, dicas de melhoria de usabilidade ou gostaria de enviar um elogio:

- **E-mail de Contato Directo:** [`edsinfobr@gmail.com`](mailto:edsinfobr@gmail.com)
- **Atalho no App:** Clique no botão **"Feedback"** na barra superior (Navbar) ou no link de rodapé da aplicação para abrir a janela interativa de envio formatado com opções para:
  - 🐛 **Reportar Erros e Bugs**
  - 💡 **Sugerir Novas Funcionalidades e Ícones**
  - 🧠 **Compartilhar Dicas de UX e Produtividade**
  - ❤️ **Enviar Elogios e Avaliações Gerais**

---

## 👨‍💻 Autor e Mantenedor

Desenvolvido e mantido com 💙 por [**@edsinfobr**](https://github.com/edsinfobr).

---

## 📄 Licença

Este projeto está licenciado sob a Licença **MIT**. Sinta-se à vontade para modificar e distribuir conforme necessário.
