# 🚀 Guia de Deploy na AWS: multicloudcanvasstudio.com.br

Este guia detalha o processo completo para implantar o **MultiCloud Canvas Studio** na **AWS** sob o domínio personalizado **`multicloudcanvasstudio.com.br`**.

---

## 🏗️ 1. Entendendo a Arquitetura da Aplicação

A aplicação possui a seguinte estrutura de execução:
- **Frontend**: React 19 SPA (Vite + Tailwind CSS + Lucide Icons) empacotado no diretório `dist/`.
- **Backend**: Servidor Node.js / Express (`dist/server.cjs`) que atende:
  - Rotas de IA (`/api/ai/generate-architecture` e `/api/ai/review-architecture`) via Google GenAI SDK.
  - Rota de verificação de integridade (`/api/health`).
  - Configuração OAuth Google Workspace (`/api/auth/google/config`).
  - Servir os arquivos estáticos e rotas do SPA em produção (`*` -> `dist/index.html`).
- **Banco de Dados & Autenticação**: Cloud Firestore e Firebase Authentication (`firebase-applet-config.json`).
- **Porta padrão**: `3000` (configurável via `PORT`).

---

## 🎯 2. As Opções Recomendadas na AWS

### Opção A (Mais recomendada e moderna): AWS App Runner
* **Por que escolher**: Totalmente gerenciado, sem necessidade de configurar VPC, Nginx ou gerenciar Linux. Suporta containers Docker diretamente, escalabilidade automática (inclusive até zero se configurado), e possui gerenciamento nativo de certificados SSL com renovação automática para domínios personalizados.
* **Custo estimado**: ~$5 a $15/mês (conforme uso de CPU/RAM).

### Opção B: AWS ECS Fargate + Application Load Balancer (ALB)
* **Por que escolher**: Ideal para arquiteturas corporativas com VPC privada, integração com WAF (Web Application Firewall) e esteiras CI/CD complexas via AWS CodePipeline ou GitHub Actions.

### Opção C (Mais econômica e simples para início): AWS Lightsail
* **Por que escolher**: Uma instância VPS gerenciada com custo fixo a partir de $5 ou $10/mês. Você pode rodar o container Docker ou o Node.js com PM2 e Nginx.

---

## 📋 3. Passo a Passo Completo (Via AWS App Runner + Route 53)

### Passo 1: Construir a Imagem Docker e Enviar para o Amazon ECR
No seu terminal local com o AWS CLI autenticado:

```bash
# 1. Autenticar no Amazon ECR (substitua pela sua região e ID de conta AWS)
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <SUA_CONTA_AWS>.dkr.ecr.us-east-1.amazonaws.com

# 2. Criar o repositório ECR caso não exista
aws ecr create-repository --repository-name multicloud-canvas-studio --region us-east-1

# 3. Gerar o build da imagem Docker
docker build -t multicloud-canvas-studio:latest .

# 4. Criar a tag para o ECR
docker tag multicloud-canvas-studio:latest <SUA_CONTA_AWS>.dkr.ecr.us-east-1.amazonaws.com/multicloud-canvas-studio:latest

# 5. Fazer o push da imagem
docker push <SUA_CONTA_AWS>.dkr.ecr.us-east-1.amazonaws.com/multicloud-canvas-studio:latest
```

---

### Passo 2: Criar o Serviço no AWS App Runner
1. Acesse o console da **AWS** e vá para **AWS App Runner**.
2. Clique em **Create service**:
   - **Source**: Container registry -> Amazon ECR.
   - Selecione a imagem: `multicloud-canvas-studio:latest`.
   - **Deployment trigger**: *Automatic* (faz deploy automático sempre que você der push em uma nova tag) ou *Manual*.
3. **Configure service**:
   - **Service name**: `multicloud-canvas-studio`
   - **Port**: `3000`
   - **vCPU & Memory**: 1 vCPU e 2 GB de memória (recomendado para renderizações e compilações).
4. **Environment variables (Variáveis de Ambiente)**:
   - `NODE_ENV`: `production`
   - `PORT`: `3000`
   - `GEMINI_API_KEY`: *(Sua chave da API Gemini do Google AI Studio)*
   - `GOOGLE_CLIENT_ID`: *(Opcional, se utilizar autenticação Google Workspace)*
5. Clique em **Create & deploy**. Em cerca de 3 a 5 minutos o serviço estará ativo com uma URL HTTPS gerada pela AWS.

---

### Passo 3: Configurar o Domínio `multicloudcanvasstudio.com.br`

Como o seu domínio termina em `.br`, ele é gerenciado pelo **Registro.br**.

#### A. Criar Zona Hospedada no AWS Route 53:
1. No console da AWS, acesse o **Route 53**.
2. Clique em **Hosted zones** -> **Create hosted zone**.
3. **Domain name**: `multicloudcanvasstudio.com.br`.
4. Tipo: **Public hosted zone**.
5. O Route 53 fornecerá **4 servidores DNS (Name Servers)**, por exemplo:
   - `ns-xxx.awsdns-xx.com`
   - `ns-xxx.awsdns-xx.net`
   - `ns-xxx.awsdns-xx.org`
   - `ns-xxx.awsdns-xx.co.uk`

#### B. Atualizar os servidores DNS no Registro.br:
1. Faça login no [Registro.br](https://registro.br).
2. Clique no domínio `multicloudcanvasstudio.com.br`.
3. Na seção **DNS**, selecione **Alterar servidores DNS**.
4. Insira os servidores de nomes (Name Servers) informados pelo Route 53.
5. Salve as alterações. *(A propagação de DNS no Registro.br costuma levar entre 30 minutos e 2 horas)*.

#### C. Vincular o Domínio no AWS App Runner:
1. No console do **App Runner**, abra seu serviço `multicloud-canvas-studio`.
2. Vá na aba **Custom domains** e clique em **Link domain**.
3. Digite: `multicloudcanvasstudio.com.br` (e marque a opção para incluir `www.multicloudcanvasstudio.com.br`).
4. O App Runner gerará registros **CNAME** para validação do certificado SSL (ACM) e apontamento de tráfego.
5. Vá no **Route 53** e crie os registros DNS correspondentes fornecidos pelo App Runner.
6. A AWS emitirá e instalará o certificado SSL (HTTPS) automaticamente.

---

## 🔒 4. Configurações Críticas de Segurança e Integrações

Após o domínio estar configurado, você precisa autorizar a nova URL nas plataformas externas:

### 1. Firebase Console (Autenticação e Firestore)
1. Acesse o [Firebase Console](https://console.firebase.google.com/).
2. Selecione o projeto `ai-studio-multicloudcanvas-...`.
3. Vá em **Authentication** -> aba **Settings** (Configurações) -> **Authorized domains** (Domínios autorizados).
4. Clique em **Add domain** e adicione:
   - `multicloudcanvasstudio.com.br`
   - `www.multicloudcanvasstudio.com.br`
5. *Sem este passo, o login por e-mail/senha ou Google SSO será bloqueado pelo Firebase por motivos de segurança.*

### 2. Google Cloud Console (Para Google Workspace / OAuth)
Se você utiliza integração com Google Drive/Docs ou login Google:
1. Acesse o [Google Cloud Console](https://console.cloud.google.com/).
2. Vá em **APIs & Services** -> **Credentials** -> Selecione seu **OAuth 2.0 Client ID**.
3. Em **Authorized JavaScript origins**, adicione:
   - `https://multicloudcanvasstudio.com.br`
   - `https://www.multicloudcanvasstudio.com.br`
4. Em **Authorized redirect URIs**, adicione:
   - `https://multicloudcanvasstudio.com.br`
   - `https://www.multicloudcanvasstudio.com.br`
5. Salve as alterações.

### 3. Google AI Studio (Chave de API Gemini)
- Garanta que a variável `GEMINI_API_KEY` esteja preenchida no serviço da AWS. Caso sua chave possua restrição de IP ou HTTP referrers, atualize com seu novo domínio.

---

## 💰 5. Resumo de Custos Estimados na AWS

| Recurso | Função | Custo Estimado |
| :--- | :--- | :--- |
| **AWS App Runner** (1 vCPU, 2GB) | Hospedagem do container e tráfego | ~$5 a $15 / mês (pago por segundo de uso) |
| **AWS Route 53** | Hosted Zone DNS do domínio `.br` | $0.50 / mês |
| **AWS Certificate Manager (ACM)** | Certificado SSL HTTPS | **Gratuito** |
| **Amazon ECR** | Armazenamento da imagem Docker (< 500MB) | ~$0.10 / mês |
| **Total Estimado na AWS** | | **~$6 a $16 / mês** |
