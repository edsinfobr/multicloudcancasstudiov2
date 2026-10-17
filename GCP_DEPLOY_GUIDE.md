# 🌐 Guia de Deploy no Google Cloud Platform (GCP): multicloudcanvasstudio.com.br

Este guia detalha o processo para implantar o **MultiCloud Canvas Studio** no **Google Cloud Platform (GCP)** com o domínio personalizado **`multicloudcanvasstudio.com.br`**.

---

## 💡 Por Que a GCP é o Ambiente Mais Natural Para Esta Aplicação?

Esta aplicação foi desenvolvida com base no ecossistema Google:
1. **Firebase Authentication e Cloud Firestore**: Já residem na infraestrutura GCP. Colocar a aplicação na GCP garante latência mínima (Google Global Backbone).
2. **Google Gemini AI (`@google/genai`)**: Acesso direto e otimizado às APIs de inteligência artificial.
3. **Escala até Zero (Zero Cost quando inativa)**: O Google Cloud Run desliga os containers quando não há acessos, custando **R$ 0** em períodos ociosos.
4. **Free Tier Generoso**: O Cloud Run inclui gratuitamente todo mês até **2 milhões de requisições**, 360.000 vCPU-segundos e 180.000 GiB-segundos de memória.

---

## 🏆 Opção Recomendada: Google Cloud Run

O **Cloud Run** é o padrão moderno da Google para rodar containers serverless sem gerenciar servidores Linux nem clusters Kubernetes.

### Comparativo de Opções na GCP:

| Serviço | Complexidade | Custo Médio | Por que escolher? |
| :--- | :--- | :--- | :--- |
| **Google Cloud Run** *(Recomendado)* | **Muito Baixa** | **$0 a $5 / mês** | Serverless, escala até zero, SSL automático gratuito, deploy em 1 comando. |
| **Firebase App Hosting** | Baixa | $0 a $10 / mês | Focado em frameworks modernos integrados ao Firebase. |
| **Google Compute Engine (VM)** | Média | ~$10 a $25 / mês | Máquina virtual dedicada tradicional (e2-micro / e2-small). |

---

## 🚀 Passo a Passo de Deploy no Google Cloud Run

Você pode subir a aplicação de **duas maneiras**: diretamente pelo código-fonte com o Cloud Build (sem precisar ter Docker na máquina) ou gerando a imagem Docker.

### Método 1: Deploy Direto via Google Cloud SDK (Mais Rápido)

Com o `gcloud` CLI instalado e autenticado:

```bash
# 1. Definir o projeto GCP
gcloud config set project SEU_PROJECT_ID

# 2. Habilitar os serviços necessários na GCP
gcloud services enable run.googleapis.com cloudbuild.googleapis.com secretmanager.googleapis.com

# 3. Executar o deploy a partir do código-fonte (o Cloud Build compila e cria o container automaticamente)
gcloud run deploy multicloud-canvas-studio \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars="NODE_ENV=production,GEMINI_API_KEY=SUA_CHAVE_GEMINI"
```

---

### Método 2: Build com Docker e Google Artifact Registry

```bash
# 1. Criar repositório no Artifact Registry
gcloud artifacts repositories create app-repo \
  --repository-format=docker \
  --location=us-central1 \
  --description="MultiCloud Canvas Studio Docker Repository"

# 2. Autenticar o Docker local no Artifact Registry
gcloud auth configure-docker us-central1-docker.pkg.dev

# 3. Construir e enviar a imagem
docker build -t us-central1-docker.pkg.dev/SEU_PROJECT_ID/app-repo/multicloud-canvas:latest .
docker push us-central1-docker.pkg.dev/SEU_PROJECT_ID/app-repo/multicloud-canvas:latest

# 4. Fazer o deploy no Cloud Run
gcloud run deploy multicloud-canvas-studio \
  --image us-central1-docker.pkg.dev/SEU_PROJECT_ID/app-repo/multicloud-canvas:latest \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars="NODE_ENV=production,GEMINI_API_KEY=SUA_CHAVE_GEMINI"
```

---

## 🌐 Mapeamento do Domínio: `multicloudcanvasstudio.com.br`

### 1. Vincular o Domínio no Google Cloud Run
1. No console da Google Cloud, vá em **Cloud Run**.
2. Clique no menu superior ou lateral em **Manage custom domains** (Gerenciar domínios personalizados).
3. Clique em **Add mapping** (Adicionar mapeamento):
   - Selecione o serviço: `multicloud-canvas-studio`.
   - Selecione ou digite o domínio: `multicloudcanvasstudio.com.br` (e adicione também `www.multicloudcanvasstudio.com.br`).
4. A Google solicitará a verificação de propriedade do domínio via registro DNS **TXT** no Registro.br.

### 2. Configurar o DNS no Registro.br

Você tem duas opções para o DNS:

#### Alternativa A: Gerenciar o DNS diretamente no Registro.br (Mais simples)
1. Acesse o [Registro.br](https://registro.br).
2. Abra `multicloudcanvasstudio.com.br` -> Seção **DNS** -> **Editar Zona**.
3. Adicione os registros fornecidos pelo Cloud Run:
   - Registro **TXT** de validação da Google (ex: `google-site-verification=...`).
   - Registros **A** e **AAAA** apontando para os IPs Anycast da Google (fornecidos na tela do Cloud Run).
   - Registro **CNAME** para `www` apontando para `ghs.googlehosted.com`.
4. Salve a zona.

#### Alternativa B: Usar o Google Cloud DNS
1. Crie uma zona pública no **Google Cloud DNS**:
   - `gcloud dns managed-zones create multicloud-zone --dns-name="multicloudcanvasstudio.com.br." --description="Zona DNS do Studio"`
2. A Google fornecerá os 4 servidores NS (ex: `ns-cloud-a1.googledomains.com`).
3. No painel do Registro.br, altere os servidores DNS para os servidores informados pela GCP.

---

## 🔒 Configurações de Segurança e Integrações

### 1. Adicionar o Domínio no Firebase Authentication
Como o Firebase faz parte do mesmo projeto Google:
1. Acesse o [Firebase Console](https://console.firebase.google.com/).
2. Vá em **Authentication** -> **Settings** -> **Authorized domains**.
3. Adicione:
   - `multicloudcanvasstudio.com.br`
   - `www.multicloudcanvasstudio.com.br`
   - *(A URL do Cloud Run `*.run.app` também deve estar aqui).*

### 2. Google OAuth (Login Social & Workspace)
1. No [Google Cloud Console](https://console.cloud.google.com/), vá em **APIs & Services** > **Credentials**.
2. No seu **OAuth 2.0 Client ID**, adicione:
   - **Origens JavaScript autorizadas**: `https://multicloudcanvasstudio.com.br`
   - **URIs de redirecionamento autorizadas**: `https://multicloudcanvasstudio.com.br`

---

## 💰 Comparativo de Custo: GCP vs AWS

| Item | AWS (App Runner + Route 53) | GCP (Cloud Run + Cloud DNS) |
| :--- | :--- | :--- |
| **Compute Base** | ~$5 a $15 / mês | **$0 / mês** (dentro do Free Tier de 2M req) |
| **Escala até Zero** | Não (instância mínima ativa mantida) | **Sim (desliga totalmente sem tráfego)** |
| **Certificado SSL** | Gratuito (ACM) | **Gratuito (Google Trust Services)** |
| **DNS** | $0.50 / mês (Route 53) | Grátis no Registro.br ou $0.20 no Cloud DNS |
| **Latência com Firestore/Gemini** | Externa (internet pública AWS -> GCP) | **Interna (mesma rede Google)** |
| **Total Estimado Inicial** | **~$6 a $16 / mês** | **$0 a $3 / mês** |
