# 📖 Documentação Oficial — MultiCloud Canvas Studio

Bem-vindo à documentação oficial do **MultiCloud Canvas Studio**, a plataforma web moderna e especializada em **desenho, planejamento, governança FinOps e geração de código para arquiteturas de nuvem multi-cloud**.

---

## 📑 Sumário

1. [Visão Geral & Proposta de Valor](#1-visão-geral--proposta-de-valor)
2. [Guia de Início Rápido (Quickstart)](#2-guia-de-início-rápido-quickstart)
3. [Provedores & Catálogo de Serviços](#3-provedores--catálogo-de-serviços)
4. [Contêineres de Rede & Conexões Inteligentes](#4-contêineres-de-rede--conexões-inteligentes)
5. [Inteligência Artificial (Google Gemini)](#5-inteligência-artificial-google-gemini)
6. [FinOps & Calculadora de Custos Multi-Cloud](#6-finops--calculadora-de-custos-multi-cloud)
7. [Infraestrutura como Código (Terraform IaC)](#7-infraestrutura-como-código-terraform-iac)
8. [Gerador de Propostas Comerciais em Word (.docx)](#8-gerador-de-propostas-comerciais-em-word-docx)
9. [Linter de Segurança & Melhores Práticas](#9-linter-de-segurança--melhores-práticas)
10. [Sistema de Versionamento de Arquiteturas](#10-sistema-de-versionamento-de-arquiteturas)
11. [Persistência em Nuvem & Google Workspace](#11-persistência-em-nuvem--google-workspace)
12. [Atalhos de Teclado (Cheat Sheet)](#12-atalhos-de-teclado-cheat-sheet)
13. [Perguntas Frequentes (FAQ)](#13-perguntas-frequentes-faq)

---

## 1. Visão Geral & Proposta de Valor

O **MultiCloud Canvas Studio** foi concebido para atender arquitetos de soluções, engenheiros de nuvem, consultores técnicos e líderes de tecnologia (CTOs/Tech Leads) que precisam modelar sistemas complexos com rapidez, precisão visual e rigor técnico.

### Principais Diferenciais:
- **Abordagem Real Multi-Cloud**: Trabalhe simultaneamente com **AWS, Microsoft Azure, Google Cloud (GCP), Oracle Cloud (OCI)** e **Kubernetes** no mesmo diagrama.
- **Além do Desenho Estático**: O diagrama é um modelo computacional vivo. Cada nó possui metadados de computação, rede, custo mensal e tipos de recursos compatíveis com Terraform.
- **Inteligência Artificial Nativa**: Assistente de IA acoplado com modelos Google Gemini para desenhar arquiteturas por prompts textuais e auditar pontos cegos.
- **Orientado a Negócios & Vendas**: Gere propostas técnicas e comerciais formatadas para Microsoft Word (`.docx`) em segundos, acelerando ciclos de venda de consultoria e aprovações internas.

---

## 2. Guia de Início Rápido (Quickstart)

### 2.1 Modos de Acesso
Ao acessar a plataforma, você pode:
- **Entrar com E-mail e Senha**: Para salvar suas arquiteturas na nuvem e acessá-las de qualquer navegador.
- **Continuar com o Google**: Login instantâneo com autenticação federada (Google SSO).
- **Acessar como Convidado (Modo Offline)**: Comece a desenhar imediatamente sem necessidade de cadastro prévio.

### 2.2 Navegando no Canvas
- **Adicionar Nós**: Abra o catálogo na barra lateral esquerda (`SidebarCatalog`), selecione o provedor desejado e arraste o serviço para a grade.
- **Mover e Posicionar**: Clique e arraste nós individualmente ou faça uma caixa de seleção para mover múltiplos componentes.
- **Zoom & Pan**:
  - Zoom: Utilize a roda do mouse (*Scroll*) ou os botões `+` e `-` na barra superior.
  - Pan (Arrastar Tela): Segure a tecla `Espaço` e arraste com o mouse, ou clique com o botão do meio do mouse.
  - Ajustar à Tela (*Fit*): Clique no botão de centralização na Navbar para enquadrar todos os elementos perfeitamente.
- **Painel de Propriedades**: Selecione qualquer nó para inspecionar nome, tipo de instância, vCPU, memória, portas e custo estimado no painel direito.

---

## 3. Provedores & Catálogo de Serviços

A plataforma conta com mais de **200+ serviços oficiais categorizados**:

| Provedor | Cores Oficiais | Principais Serviços Suportados |
| :--- | :--- | :--- |
| **AWS** | Laranja (`#FF9900`) | EC2, Lambda, ECS, EKS, S3, RDS, DynamoDB, VPC, ALB/NLB, CloudFront, Route53, SQS, SNS, WAF |
| **Azure** | Azul (`#0078D4`) | Virtual Machines, App Service, Functions, AKS, Blob Storage, Azure SQL, Cosmos DB, VNet, App Gateway |
| **GCP** | Azul/Amarelo (`#4285F4`) | Compute Engine, Cloud Run, Cloud Functions, GKE, Cloud Storage, Cloud SQL, BigQuery, VPC, Cloud Armor |
| **OCI** | Vermelho/Bronze (`#C74634`) | Compute Instances, OKE, Autonomous Database, Exadata, Object Storage, VCN, MySQL HeatWave, Vault |
| **Kubernetes** | Azul Marinho (`#326CE5`) | Pod, Deployment, StatefulSet, DaemonSet, Ingress, ClusterIP/NodePort/LoadBalancer, ConfigMap, PVC |

---

## 4. Contêineres de Rede & Conexões Inteligentes

### 4.1 Limites de Rede (Network Enclosures)
Estruture sua topologia criando zonas lógicas isoladas:
- **VPC / VNet / VCN**: Redes virtuais de nuvem com definição de blocos CIDR (ex: `10.0.0.0/16`).
- **Subredes Públicas (DMZ)**: Zonas com acesso à Internet para Load Balancers, NAT Gateways e APIs públicas.
- **Subredes Privadas**: Zonas isoladas para microsserviços, workers e bancos de dados.
- **Resource Groups & Compartimentos**: Agrupamentos corporativos para governança e faturamento.

### 4.2 Conexões Inteligentes & Protocolos
Ao ligar dois serviços por uma linha conectora, o estúdio infere automaticamente o protocolo e a porta de rede mais provável:
- **Web/API**: `HTTPS (443)` ou `HTTP (80)`
- **Microsserviços Modernos**: `gRPC / HTTP/2 (50051)`
- **Bancos de Dados Relacionais**: `PostgreSQL (5432)`, `MySQL (3306)`, `Oracle SQL (1521)`, `SQL Server (1433)`
- **Caches & Mensageria**: `Redis (6379)`, `Kafka / AMQP (9092 / 5672)`
- **Roteamento Interno**: Roteamento ortogonal, reto, curvo ou em arco com controle de estilo e espessura.

---

## 5. Inteligência Artificial (Google Gemini)

O estúdio integra a API oficial `@google/genai` (executada em proxy backend seguro no servidor Express) para elevar a produtividade técnica:

### 5.1 Geração de Arquitetura por Prompt
Descreva sua necessidade em linguagem natural:
> *"Crie uma arquitetura na AWS altamente disponível para e-commerce com ALB, Auto Scaling de instâncias em 2 zonas, RDS PostgreSQL Multi-AZ, Redis para cache e S3 com CloudFront."*

A IA interpreta a solicitação, calcula o posicionamento espacial relativo, organiza as subredes e conecta os serviços com os protocolos corretos.

### 5.2 Auditoria Arquitetural Automatizada
A IA analisa o diagrama desenhado e fornece:
- **Nota de Alta Disponibilidade (HA)**: Avaliação de redundância e zonas de disponibilidade.
- **Nota de Segurança**: Exposição pública de portas sensíveis e falta de firewalls/WAF.
- **Nota FinOps**: Recomendações de escalabilidade e economia de custos.
- **Plano de Melhorias**: Ações sugeridas em formato de checklist de engenharia.

---

## 6. FinOps & Calculadora de Custos Multi-Cloud

Compreenda o impacto financeiro das decisões arquiteturais antes de subir um único recurso:
- **Cálculo Automático**: Toda instância, banco gerenciado, volume de disco e nó de container possui métricas de custo baseadas nas tabelas de preços públicas de cada provedor.
- **Comparador Multi-Cloud Instantâneo**: Veja quanto a arquitetura desenhada em AWS custaria se fosse migrada para Azure, Google Cloud ou OCI.
- **Exportação de Custos**:
  - **Planilha CSV**: Detalhamento item a item para importação no Excel ou Google Sheets.
  - **Relatório PDF de Custos**: Documento formal executivo com gráficos de distribuição por categoria (Compute, Storage, Database, Network).

---

## 7. Infraestrutura como Código (Terraform IaC)

O MultiCloud Canvas Studio não é apenas uma ferramenta gráfica, ele é um compilador de topologia:
- **Geração Automática**: Clique em **Terraform (.tf)** na barra de navegação para gerar a especificação completa em HashiCorp HCL.
- **Estruturação Padrão**:
  - Declaração de `terraform {}` e `required_providers`.
  - Configuração do `provider "aws"`, `provider "azurerm"`, `provider "google"` ou `provider "oci"`.
  - Declaração de recursos de rede (`vpc`, `subnets`, `security_groups`) e recursos de computação com IDs lógicos limpos.
- **Download e Cópia**: Baixe o arquivo `main.tf` diretamente para o seu diretório de projeto ou copie para sua IDE.

---

## 8. Gerador de Propostas Comerciais em Word (.docx)

Uma das ferramentas mais poderosas para pré-vendas e consultoria:
- **Formato Nativo Word (`.docx`)**: Arquivo perfeitamente editável, sem dependências externas, compatível com Microsoft Word, LibreOffice e Google Docs.
- **Dois Modos Especializados**:
  1. **Proposta de Nova Implementação**: Focada em soluções Green-field, modernização de microsserviços, PoCs e MVPs.
  2. **Proposta de Migração para a Nuvem**: Baseada no framework de **7 Rs da AWS/Gartner** (*Rehost, Replatform, Refactor, Repurchase, Retain, Retire, Relocate*), com plano de cutover e mitigação de riscos de indisponibilidade.
- **Conteúdo Gerado Automaticamente**:
  - Capa executiva com paleta corporativa elegante.
  - Sumário Executivo contextualizado com a volumetria do diagrama.
  - Inventário completo de serviços organizados em tabelas de especificação.
  - Snapshot visual em alta resolução da arquitetura inserido diretamente no documento.
  - Estimativa de custos operacionais e cronograma sugerido em semanas.

---

## 9. Linter de Segurança & Melhores Práticas

Localizado no menu **Linter**, este módulo executa uma bateria de verificações automáticas:
- ❌ **Single Point of Failure (SPOF)**: Identifica bancos de dados ou servidores essenciais sem réplica ou zonas secundárias.
- ❌ **Portas de Gestão Abertas**: Alerta caso portas sensíveis (`SSH 22`, `RDP 3389`, `Telnet 23`, `Banco 5432/3306`) estejam ligadas a redes públicas.
- ⚠️ **Falta de WAF / Proteção de Borda**: Avisa caso APIs públicas não possuam Cloud Armor, AWS WAF ou Application Gateway.
- ⚠️ **Ausência de HTTPS**: Detecta links de front-end operando em texto plano HTTP.

---

## 10. Sistema de Versionamento de Arquiteturas

No rodapé inferior do estúdio encontra-se a barra de **Abas de Versão (`VersionTabsBar`)**:
- **Criação de Versões**: Inicie com a `v1.0 (Atual)` e crie novas versões para planejar a fase seguinte (`v1.1`, `v2.0`).
- **Ramificação & Duplicação**: Duplique a versão ativa com 1 clique para testar um cenário alternativo (ex: *"Cenário Serveless vs Cenário Kubernetes"*).
- **Isolamento de Histórico**: Cada aba mantém seu próprio conjunto de nós, links, contêineres e custos, permitindo comparações instantâneas durante reuniões com clientes.

---

## 11. Persistência em Nuvem & Google Workspace

### 11.1 Cloud Firestore
- Projetos vinculados à sua conta de usuário são salvos automaticamente no Firestore.
- Gerencie seus diagramas salvos no modal **"Minhas Arquiteturas Salvas"** com busca, data de alteração e prévia.
- Isolamento criptográfico estrito por UID de usuário garantido por `firestore.rules`.

### 11.2 Google Drive & Gmail
- **Google Drive**: Salve o diagrama diretamente no seu Drive pessoal ou abra arquivos `.json` salvos anteriormente.
- **Gmail**: Envie um e-mail formatado com sumário da arquitetura, métricas de FinOps e link do projeto para stakeholders em um clique.

### 11.3 Preferências do Perfil de Usuário & Carimbo Padrão
Acesse o menu do usuário na barra superior e clique em **"Preferências do Perfil"** para configurar preferências persistentes na nuvem:
- **Tema Visual**: Escolha entre Modo Escuro (*Dark Mode*) ou Modo Claro (*Light Mode*). Sua escolha é salva no Firestore e restaurada em qualquer dispositivo ou navegador logado.
- **Menus Laterais**: Defina se o Catálogo de Serviços (lado esquerdo) e/ou o Painel de Propriedades (lado direito) devem iniciar recolhidos (*collapsed*) ou expandidos. Toggles feitos no canvas também sincronizam com o perfil automaticamente.
- **Carimbo Padrão do Diagrama**: Defina os dados oficiais de assinatura (Nome do Autor, Cargo/Posição, Empresa/Organização e flag de exibição no Canvas). Novos desenhos criados herdam automaticamente este carimbo, e diagramas existentes podem receber o carimbo padrão com um único clique.

---

## 12. Atalhos de Teclado (Cheat Sheet)

| Atalho | Ação |
| :--- | :--- |
| `Ctrl + Z` / `Cmd + Z` | Desfazer última alteração (Undo) |
| `Ctrl + Y` / `Cmd + Y` | Refazer alteração (Redo) |
| `Delete` / `Backspace` | Remover nó, link ou contêiner selecionado |
| `Espaço + Arrastar` | Modo Pan (Navegação livre pelo canvas) |
| `Roda do Mouse` | Controle dinâmico de Zoom |
| `Ctrl + S` | Salvar arquitetura no Firestore / Nuvem |
| `F` | Ajustar diagrama à tela (*Fit to screen*) |
| `Esc` | Limpar seleções e fechar modais ativos |

---

## 13. Perguntas Frequentes (FAQ)

### P: Meus dados e diagramas são compartilhados publicamente?
**R:** Não. Todas as regras de segurança do banco de dados Firestore garantem que apenas a sua conta autenticada tem permissão de leitura, alteração e exclusão sobre os seus diagramas. Se você utilizar o modo Convidado, os dados ficam apenas na memória local do seu navegador.

### P: Os ícones e serviços são oficiais?
**R:** Sim. Todos os ícones, nomes e códigos de serviços seguem rigorosamente os padrões visuais e especificações de arquitetura das empresas provedoras (AWS, Microsoft Azure, Google Cloud, Oracle e Cloud Native Computing Foundation / Kubernetes).

### P: Posso editar o código Terraform gerado?
**R:** Sim! O código gerado é padrão HashiCorp HCL. Você pode copiá-lo diretamente para seus repositórios Git, integrar em pipelines CI/CD de GitLab/GitHub Actions ou rodar `terraform init` e `terraform plan` no seu terminal.

### P: Como posso enviar sugestões ou reportar problemas?
**R:** Basta clicar no link de **Feedback** no rodapé ou na barra superior. Seus comentários são enviados diretamente para a equipe técnica responsável (`edsinfobr@gmail.com`).
