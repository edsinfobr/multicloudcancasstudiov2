import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import {
  ActiveCloudSecrets,
  RealCloudProvider,
  deleteCloudSession,
  getCloudSession,
  listSanitizedCloudSessions,
  sanitizeConnectionForClient,
  upsertCloudSession,
} from "./server/cloudSessionStore";
import {
  controlCloudResource,
  discoverCloudResources,
  verifyCloudConnection,
} from "./server/cloudAuthVerifier";
import {
  getTerraformJob,
  getTerraformStatus,
  readTerraformState,
  startTerraformJob,
  syncWorkspaceFiles,
} from "./server/terraformEngine";

dotenv.config();

async function startServer() {
  const app = express();
  const portArgIndex = process.argv.indexOf("--port");
  const cliPort =
    portArgIndex !== -1 && process.argv[portArgIndex + 1]
      ? parseInt(process.argv[portArgIndex + 1], 10)
      : NaN;
  const PORT = !Number.isNaN(cliPort)
    ? cliPort
    : process.env.NODE_ENV === "production" && process.env.PORT
      ? parseInt(process.env.PORT, 10)
      : 3000;

  app.use(express.json({ limit: "10mb" }));

  // Lazy / Safe initialization helper for Gemini
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Google OAuth Client Config endpoint
  app.get("/api/auth/google/config", (req, res) => {
    let clientId =
      process.env.GOOGLE_CLIENT_ID ||
      process.env.VITE_GOOGLE_CLIENT_ID ||
      process.env.OAUTH_CLIENT_ID ||
      process.env.CLIENT_ID ||
      "";

    if (!clientId) {
      try {
        const configPath = path.join(process.cwd(), "firebase-applet-config.json");
        if (fs.existsSync(configPath)) {
          const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
          if (config.oAuthClientId) {
            clientId = config.oAuthClientId;
          }
        }
      } catch (e) {
        console.warn("Could not read oAuthClientId from firebase-applet-config.json", e);
      }
    }

    res.json({ clientId });
  });

  // AI Prompt -> Architecture Generator
  app.post("/api/ai/generate-architecture", async (req, res) => {
    try {
      const ai = getAiClient();
      if (!ai) {
        return res.status(400).json({
          error: "GEMINI_API_KEY environment variable is missing. Please configure it in Settings.",
        });
      }

      const { prompt } = req.body;
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Prompt string is required" });
      }

      const systemInstruction = `You are a Principal Cloud Architect expert in AWS, Azure, GCP, and OCI.
Convert the user's architectural request into a structured cloud diagram payload.
Supported cloud providers: "aws", "azure", "gcp", "oci".
Supported resource categories: "compute", "storage", "database", "networking", "security", "analytics", "ai".

Return a JSON object with:
1. "title": A descriptive title for the architecture diagram.
2. "provider": Primary cloud provider ("aws" | "azure" | "gcp" | "oci").
3. "description": A short executive overview of the design.
4. "containers": Array of logical boundaries (VPCs, VNets, VCNs, Subnets, Compartments, Resource Groups).
   Each container object:
   - "id": string (e.g. "c1")
   - "name": string (e.g. "VPC Public Subnet" or "Azure VNet Primary")
   - "provider": "aws" | "azure" | "gcp" | "oci"
   - "type": "vpc" | "subnet" | "resource_group" | "compartment"
   - "x": number (e.g. 100)
   - "y": number (e.g. 100)
   - "width": number (e.g. 600)
   - "height": number (e.g. 400)
5. "nodes": Array of resource node objects.
   Each node object:
   - "id": string (e.g. "n1")
   - "name": string (e.g. "App Load Balancer" or "App Server 1")
   - "provider": "aws" | "azure" | "gcp" | "oci"
   - "category": "compute" | "storage" | "database" | "networking" | "security" | "analytics" | "ai"
   - "iconKey": string (e.g. "alb", "ec2", "rds", "s3", "cloudfront", "vm", "aks", "blob", "cloud_run", "cloud_sql", "bigquery", "compute_instance", "autonomous_db", "vcn")
   - "resourceType": string (exact Terraform resource type like "aws_lb", "aws_instance", "aws_db_instance", "azurerm_linux_virtual_machine", "google_compute_instance", "oci_core_instance")
   - "containerId": string optional (matches container id)
   - "x": number position
   - "y": number position
   - "specs": object with sizing info like:
     - "instanceType": string (e.g., "t3.medium", "Standard_D2s_v3", "e2-standard-2", "VM.Standard2.1")
     - "count": number (default 1)
     - "storageGb": number (default 100)
     - "region": string (e.g., "us-east-1", "eastus", "us-central1", "us-ashburn-1")
6. "links": Array of connections between nodes.
   Each link object:
   - "id": string (e.g. "l1")
   - "from": string node id
   - "to": string node id
   - "label": string (e.g., "HTTP 80 / HTTPS 443", "SQL Connection", "Internal Peering")
   - "style": "solid" | "dashed"`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              provider: { type: Type.STRING },
              description: { type: Type.STRING },
              containers: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    provider: { type: Type.STRING },
                    type: { type: Type.STRING },
                    x: { type: Type.NUMBER },
                    y: { type: Type.NUMBER },
                    width: { type: Type.NUMBER },
                    height: { type: Type.NUMBER },
                  },
                  required: ["id", "name", "provider", "x", "y", "width", "height"],
                },
              },
              nodes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    provider: { type: Type.STRING },
                    category: { type: Type.STRING },
                    iconKey: { type: Type.STRING },
                    resourceType: { type: Type.STRING },
                    containerId: { type: Type.STRING },
                    x: { type: Type.NUMBER },
                    y: { type: Type.NUMBER },
                    specs: {
                      type: Type.OBJECT,
                      properties: {
                        instanceType: { type: Type.STRING },
                        count: { type: Type.NUMBER },
                        storageGb: { type: Type.NUMBER },
                        region: { type: Type.STRING },
                      },
                    },
                  },
                  required: ["id", "name", "provider", "category", "iconKey", "x", "y"],
                },
              },
              links: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    from: { type: Type.STRING },
                    to: { type: Type.STRING },
                    label: { type: Type.STRING },
                    style: { type: Type.STRING },
                  },
                  required: ["id", "from", "to"],
                },
              },
            },
            required: ["title", "provider", "description", "nodes", "links"],
          },
        },
      });

      const json = JSON.parse(response.text || "{}");
      res.json({ success: true, diagram: json });
    } catch (err: any) {
      console.error("AI Generation Error:", err);
      res.status(500).json({ error: err.message || "Failed to generate architecture" });
    }
  });

  // AI Architecture Security & Optimization Review
  app.post("/api/ai/review-architecture", async (req, res) => {
    try {
      const ai = getAiClient();
      if (!ai) {
        return res.status(400).json({
          error: "GEMINI_API_KEY environment variable is missing.",
        });
      }

      const { diagram } = req.body;
      if (!diagram) {
        return res.status(400).json({ error: "Diagram state is required" });
      }

      const systemInstruction = `You are a Senior Cloud Solutions Architect & Security Auditor.
Analyze the provided cloud architecture JSON. Provide a comprehensive audit report covering:
1. High Availability & Fault Tolerance rating (1-10) and evaluation.
2. Security & Compliance assessment (Public exposure, Encryption, IAM practices).
3. Cost Optimization recommendations.
4. Top 3 actionable improvement items.

Return JSON matching the schema.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: JSON.stringify(diagram),
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              haScore: { type: Type.NUMBER },
              securityScore: { type: Type.NUMBER },
              costScore: { type: Type.NUMBER },
              overallRating: { type: Type.STRING },
              summary: { type: Type.STRING },
              securityFindings: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              haRecommendations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              costSavingsTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              suggestedAdditions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: [
              "haScore",
              "securityScore",
              "costScore",
              "overallRating",
              "summary",
              "securityFindings",
              "haRecommendations",
              "costSavingsTips",
            ],
          },
        },
      });

      const audit = JSON.parse(response.text || "{}");
      res.json({ success: true, audit });
    } catch (err: any) {
      console.error("AI Audit Error:", err);
      res.status(500).json({ error: err.message || "Failed to review architecture" });
    }
  });

  // =========================================================================
  // MULTI-CLOUD CONNECTION, DISCOVERY & LIVE CONTROL API
  // =========================================================================

  app.get("/api/cloud/connections", (_req, res) => {
    res.json({ success: true, connections: listSanitizedCloudSessions() });
  });

  app.post("/api/cloud/connect", async (req, res) => {
    try {
      const body = req.body || {};
      const provider = body.provider as RealCloudProvider;
      if (!["aws", "gcp", "azure", "oci"].includes(provider)) {
        return res.status(400).json({ error: "Provedor inválido. Use aws, gcp, azure ou oci." });
      }

      const region = String(
        body.region ||
          (provider === "aws"
            ? "us-east-1"
            : provider === "azure"
            ? "eastus"
            : provider === "gcp"
            ? "us-central1"
            : "us-ashburn-1")
      ).trim();

      const secrets: ActiveCloudSecrets = {
        provider,
        region,
        awsAccessKeyId: body.awsAccessKeyId,
        awsSecretAccessKey: body.awsSecretAccessKey,
        awsSessionToken: body.awsSessionToken,
        gcpProjectId: body.gcpProjectId,
        gcpServiceAccountJson: body.gcpServiceAccountJson,
        azureTenantId: body.azureTenantId,
        azureClientId: body.azureClientId,
        azureClientSecret: body.azureClientSecret,
        azureSubscriptionId: body.azureSubscriptionId,
        ociTenancyOcid: body.ociTenancyOcid,
        ociUserOcid: body.ociUserOcid,
        ociFingerprint: body.ociFingerprint,
        ociPrivateKeyPem: body.ociPrivateKeyPem,
        ociCompartmentId: body.ociCompartmentId,
      };

      const verification = await verifyCloudConnection(secrets);
      const now = new Date().toISOString();
      const id =
        typeof body.id === "string" && body.id.trim()
          ? body.id.trim().replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 80)
          : `conn_${provider}_${Date.now()}`;

      const stored = upsertCloudSession({
        id,
        label: String(body.label || `${provider.toUpperCase()} (${region})`).slice(0, 100),
        provider,
        region,
        accountHint: verification.accountHint,
        status: "connected",
        lastTestedAt: now,
        createdAt: now,
        updatedAt: now,
        metadata: verification.metadata,
        secrets,
      });

      res.json({
        success: true,
        message: verification.message,
        connection: sanitizeConnectionForClient(stored),
      });
    } catch (err: any) {
      console.error("[/api/cloud/connect] Error:", err);
      res.status(400).json({
        success: false,
        error: err?.message || "Falha ao validar credenciais na nuvem.",
      });
    }
  });

  app.post("/api/cloud/test/:id", async (req, res) => {
    try {
      const session = getCloudSession(req.params.id);
      if (!session) {
        return res.status(404).json({
          success: false,
          error: "Sessão não encontrada em memória. Reinsira a chave secreta para reconectar.",
        });
      }
      const verification = await verifyCloudConnection(session.secrets);
      session.status = "connected";
      session.lastTestedAt = new Date().toISOString();
      session.updatedAt = session.lastTestedAt;
      session.accountHint = verification.accountHint;
      session.metadata = { ...session.metadata, ...verification.metadata };
      upsertCloudSession(session);

      res.json({
        success: true,
        message: verification.message,
        connection: sanitizeConnectionForClient(session),
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        error: err?.message || "Falha no teste de conexão.",
      });
    }
  });

  app.delete("/api/cloud/connections/:id", (req, res) => {
    const deleted = deleteCloudSession(req.params.id);
    res.json({ success: true, deleted });
  });

  app.get("/api/cloud/resources/:connectionId", async (req, res) => {
    try {
      const session = getCloudSession(req.params.connectionId);
      if (!session) {
        return res.status(404).json({
          success: false,
          error: "Sessão de credenciais não ativa. Reconecte a conta cloud primeiro.",
        });
      }
      const resources = await discoverCloudResources(session.secrets);
      res.json({ success: true, resources, region: session.region, provider: session.provider });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: err?.message || "Falha ao listar recursos da conta cloud.",
      });
    }
  });

  app.post("/api/cloud/control", async (req, res) => {
    try {
      const { connectionId, resourceId, resourceType, action } = req.body || {};
      if (!connectionId || !resourceId || !["start", "stop", "reboot"].includes(action)) {
        return res.status(400).json({
          success: false,
          error: "connectionId, resourceId e action (start|stop|reboot) são obrigatórios.",
        });
      }
      const session = getCloudSession(connectionId);
      if (!session) {
        return res.status(404).json({
          success: false,
          error: "Sessão da conta cloud não está ativa no servidor. Reconecte suas credenciais.",
        });
      }
      const result = await controlCloudResource(
        session.secrets,
        String(resourceId),
        String(resourceType || ""),
        action
      );
      res.json({ success: true, ...result });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        error: err?.message || "Falha ao executar comando no recurso cloud.",
      });
    }
  });

  // =========================================================================
  // REAL TERRAFORM EXECUTION ENGINE API
  // =========================================================================

  app.get("/api/terraform/status", async (_req, res) => {
    const status = await getTerraformStatus();
    res.json({ success: true, ...status });
  });

  app.post("/api/terraform/workspace", async (req, res) => {
    try {
      const { workspaceId, files, hclElementMap } = req.body || {};
      if (!workspaceId || !files || typeof files !== "object") {
        return res.status(400).json({ error: "workspaceId e files são obrigatórios." });
      }
      const result = syncWorkspaceFiles(String(workspaceId), files, hclElementMap);
      const tfStatus = await getTerraformStatus();
      res.json({ success: true, ...result, terraform: tfStatus });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err?.message || "Erro ao sincronizar workspace." });
    }
  });

  app.post("/api/terraform/run", (req, res) => {
    try {
      const { workspaceId, connectionId, action, targetAddress } = req.body || {};
      const validActions = [
        "init",
        "validate",
        "plan",
        "apply",
        "refresh",
        "destroy",
        "replace-target",
        "destroy-target",
      ];
      if (!workspaceId || !validActions.includes(action)) {
        return res.status(400).json({ error: "workspaceId e action válidos são obrigatórios." });
      }
      const job = startTerraformJob({
        workspaceId: String(workspaceId),
        connectionId: connectionId ? String(connectionId) : undefined,
        action,
        targetAddress: targetAddress ? String(targetAddress) : undefined,
      });
      res.json({ success: true, job });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err?.message || "Erro ao iniciar execução Terraform." });
    }
  });

  app.get("/api/terraform/jobs/:jobId", (req, res) => {
    const job = getTerraformJob(req.params.jobId);
    if (!job) {
      return res.status(404).json({ success: false, error: "Job Terraform não encontrado." });
    }
    res.json({ success: true, job });
  });

  app.get("/api/terraform/state/:workspaceId", async (req, res) => {
    try {
      const connectionId = req.query.connectionId ? String(req.query.connectionId) : undefined;
      const state = await readTerraformState(req.params.workspaceId, connectionId);
      res.json({ success: true, ...state });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err?.message || "Erro ao ler estado Terraform." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CloudCraft Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
