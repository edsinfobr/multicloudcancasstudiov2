import { CloudIconDefinition } from '../types';

export const AI_ICONS: CloudIconDefinition[] = [
  // =========================================================================
  // 1. MODELOS FUNDACIONAIS & LLMs (OpenAI, Claude, Gemini, DeepSeek, etc.)
  // =========================================================================
  {
    key: 'ai_openai',
    name: 'OpenAI (GPT-4o)',
    provider: 'generic',
    category: 'ai',
    aiGroup: 'Modelos Fundacionais & LLMs',
    brandColor: '#10A37F',
    defaultResourceType: 'openai_chat_completion',
    defaultSpecs: { model: 'gpt-4o', contextWindow: '128k', maxTokens: 4096, count: 1 },
    description: 'OpenAI GPT-4o, GPT-4o-mini, o1 Reasoning & Whisper APIs para geração de texto, código e visão multimodal',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#10A37F" fill-opacity="0.12" stroke="#10A37F" stroke-width="2"/>
      <g transform="translate(14, 14) scale(0.75)" stroke="#10A37F" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M43.3 26.5C44.4 22.9 43.6 18.9 41.2 16C37.8 11.9 31.8 10.9 27.2 13.5L25.8 14.3V9.8C25.8 5.4 22.6 1.7 18.2 1C12.1 0.1 6.6 4.3 5.7 10.4C5.4 12.5 5.8 14.6 6.8 16.5C5.7 20.1 6.5 24.1 8.9 27C12.3 31.1 18.3 32.1 22.9 29.5L24.3 28.7V33.2C24.3 37.6 27.5 41.3 31.9 42C38 42.9 43.5 38.7 44.4 32.6C44.7 30.5 44.3 28.4 43.3 26.5Z"/>
        <path d="M24 16.5L34 22.5L24 28.5L14 22.5Z" fill="#10A37F" fill-opacity="0.25"/>
        <path d="M24 16.5V28.5M34 22.5L14 22.5"/>
      </g>
    </svg>`,
  },
  {
    key: 'ai_claude',
    name: 'Anthropic Claude (3.5 / 3.7)',
    provider: 'generic',
    category: 'ai',
    aiGroup: 'Modelos Fundacionais & LLMs',
    brandColor: '#D97706',
    defaultResourceType: 'anthropic_claude_messages',
    defaultSpecs: { model: 'claude-3-5-sonnet', contextWindow: '200k', maxTokens: 8192, count: 1 },
    description: 'Anthropic Claude 3.5 & 3.7 Sonnet, Opus e Haiku para raciocínio complexo, coding avançado e agentes autônomos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#D97706" fill-opacity="0.12" stroke="#D97706" stroke-width="2"/>
      <g transform="translate(32, 32)">
        <!-- Anthropic Terracotta Asterisk / Spark -->
        <path d="M0 -20L0 20M-20 0L20 0M-14 -14L14 14M-14 14L14 -14" stroke="#D97706" stroke-width="5" stroke-linecap="round"/>
        <circle cx="0" cy="0" r="4.5" fill="#CC785C"/>
        <!-- Accent facets -->
        <circle cx="-14" cy="-14" r="2" fill="#D97706"/>
        <circle cx="14" cy="14" r="2" fill="#D97706"/>
        <circle cx="14" cy="-14" r="2" fill="#D97706"/>
        <circle cx="-14" cy="14" r="2" fill="#D97706"/>
      </g>
    </svg>`,
  },
  {
    key: 'ai_gemini',
    name: 'Google Gemini (2.0 / 1.5)',
    provider: 'gcp',
    category: 'ai',
    aiGroup: 'Modelos Fundacionais & LLMs',
    brandColor: '#1A73E8',
    defaultResourceType: 'google_gemini_generate_content',
    defaultSpecs: { model: 'gemini-2.0-flash', contextWindow: '1M', count: 1 },
    description: 'Google Gemini 2.0 Flash & 1.5 Pro com janela de contexto de 1 milhão de tokens, raciocínio nativo e multimodalidade',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gemini-sparkle" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stop-color="#4285F4"/>
          <stop offset="50%" stop-color="#9B72CB"/>
          <stop offset="100%" stop-color="#D96570"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#1A73E8" fill-opacity="0.12" stroke="#1A73E8" stroke-width="2"/>
      <!-- Official 4-pointed celestial star -->
      <path d="M32 10C32 22 22 32 10 32C22 32 32 42 32 54C32 42 42 32 54 32C42 32 32 22 32 10Z" fill="url(#gemini-sparkle)"/>
      <circle cx="47" cy="17" r="2.5" fill="#4285F4"/>
      <circle cx="17" cy="47" r="1.8" fill="#9B72CB"/>
    </svg>`,
  },
  {
    key: 'ai_deepseek',
    name: 'DeepSeek (R1 / V3)',
    provider: 'generic',
    category: 'ai',
    aiGroup: 'Modelos Fundacionais & LLMs',
    brandColor: '#1E88E5',
    defaultResourceType: 'deepseek_chat_completion',
    defaultSpecs: { model: 'deepseek-r1', architecture: 'MoE-671B', count: 1 },
    description: 'DeepSeek R1 para raciocínio matemático e lógico profundo e DeepSeek V3 com arquitetura Mixture of Experts (MoE)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#1E88E5" fill-opacity="0.12" stroke="#1E88E5" stroke-width="2"/>
      <!-- DeepSeek Blue Whale / Fin Emblem -->
      <g transform="translate(12, 14)">
        <path d="M5 26C10 24 18 16 26 10C34 4 40 7 38 15C36 21 28 26 21 28C14 30 8 32 2 35C0.5 35.5 0 34 1 33C2.5 31 4 28 5 26Z" fill="#1E88E5"/>
        <path d="M21 28C27 28 35 24 38 18C41 12 37 6 30 9C23 12 17 19 14 26" stroke="#64B5F6" stroke-width="2" stroke-linecap="round"/>
        <circle cx="31" cy="14" r="2.5" fill="white"/>
        <path d="M8 28C13 31 19 33 26 33C33 33 38 31 40 29" stroke="#1E88E5" stroke-width="2.5" stroke-linecap="round"/>
      </g>
    </svg>`,
  },
  {
    key: 'ai_meta_llama',
    name: 'Meta Llama (Llama 3.3)',
    provider: 'generic',
    category: 'ai',
    aiGroup: 'Modelos Fundacionais & LLMs',
    brandColor: '#0468D7',
    defaultResourceType: 'meta_llama_inference',
    defaultSpecs: { model: 'llama-3.3-70b-instruct', openWeights: true, count: 1 },
    description: 'Meta Llama 3.3 70B & 405B modelos abertos de alta performance para inferência em nuvem privada e data centers',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="meta-llama-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0468D7"/>
          <stop offset="100%" stop-color="#00A9FF"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#0468D7" fill-opacity="0.12" stroke="#0468D7" stroke-width="2"/>
      <!-- Meta Infinity AI Loop -->
      <path d="M22 24C17.5 24 14 27.5 14 32C14 36.5 17.5 40 22 40C27.5 40 30.5 35 32 32C33.5 29 36.5 24 42 24C46.5 24 50 27.5 50 32C50 36.5 46.5 40 42 40C36.5 40 33.5 35 32 32C30.5 29 27.5 24 22 24Z" stroke="url(#meta-llama-grad)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <!-- Llama Ears / AI Crown Accent -->
      <path d="M26 18L28 23M38 18L36 23" stroke="#0468D7" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },
  {
    key: 'ai_mistral',
    name: 'Mistral AI (Large / Codestral)',
    provider: 'generic',
    category: 'ai',
    aiGroup: 'Modelos Fundacionais & LLMs',
    brandColor: '#FF7000',
    defaultResourceType: 'mistral_chat_completion',
    defaultSpecs: { model: 'mistral-large-2', count: 1 },
    description: 'Mistral Large 2, Codestral para programação e Pixtral multimodal da pioneira europeia em IA de fronteira',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#FF7000" fill-opacity="0.12" stroke="#FF7000" stroke-width="2"/>
      <!-- Mistral Pixel Chevron Layers -->
      <g transform="translate(13, 14)">
        <rect x="0" y="0" width="7" height="7" rx="1.5" fill="#FF7000"/>
        <rect x="31" y="0" width="7" height="7" rx="1.5" fill="#FF7000"/>
        
        <rect x="0" y="9" width="7" height="7" rx="1.5" fill="#FF7000"/>
        <rect x="8" y="9" width="7" height="7" rx="1.5" fill="#FD3A00"/>
        <rect x="23" y="9" width="7" height="7" rx="1.5" fill="#FD3A00"/>
        <rect x="31" y="9" width="7" height="7" rx="1.5" fill="#FF7000"/>

        <rect x="0" y="18" width="7" height="7" rx="1.5" fill="#FF7000"/>
        <rect x="8" y="18" width="7" height="7" rx="1.5" fill="#FD3A00"/>
        <rect x="15.5" y="18" width="7" height="7" rx="1.5" fill="#FA1900"/>
        <rect x="23" y="18" width="7" height="7" rx="1.5" fill="#FD3A00"/>
        <rect x="31" y="18" width="7" height="7" rx="1.5" fill="#FF7000"/>

        <rect x="0" y="27" width="7" height="7" rx="1.5" fill="#FF7000"/>
        <rect x="31" y="27" width="7" height="7" rx="1.5" fill="#FF7000"/>
      </g>
    </svg>`,
  },
  {
    key: 'ai_cohere',
    name: 'Cohere (Command R+)',
    provider: 'generic',
    category: 'ai',
    aiGroup: 'Modelos Fundacionais & LLMs',
    brandColor: '#D1583A',
    defaultResourceType: 'cohere_command_generation',
    defaultSpecs: { model: 'command-r-plus', count: 1 },
    description: 'Cohere Command R+, Embed v3 e Rerank para fluxos corporativos de RAG com controle e citação precisa de fontes',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#D1583A" fill-opacity="0.12" stroke="#D1583A" stroke-width="2"/>
      <g transform="translate(15, 14)">
        <path d="M17 3C9 3 3 9 3 17C3 25 9 31 17 31C25 31 31 25 31 17C31 9 25 3 17 3Z" fill="#D1583A" fill-opacity="0.2"/>
        <path d="M22 8C15 8 9 14 9 21C9 28 15 34 22 34C29 34 35 28 35 21C35 14 29 8 22 8Z" fill="#39594D" fill-opacity="0.3"/>
        <circle cx="17" cy="17" r="7" fill="#D1583A"/>
        <circle cx="24" cy="22" r="5" fill="#39594D"/>
      </g>
    </svg>`,
  },

  // =========================================================================
  // 2. ACELERAÇÃO & INFERÊNCIA (Groq, NVIDIA NIM, Ollama)
  // =========================================================================
  {
    key: 'ai_groq',
    name: 'Groq LPU (Ultra-Fast)',
    provider: 'generic',
    category: 'ai',
    aiGroup: 'Aceleração & Inferência',
    brandColor: '#F55036',
    defaultResourceType: 'groq_lpu_inference_engine',
    defaultSpecs: { chip: 'Groq LPU', speedTokensPerSec: 500, count: 1 },
    description: 'Groq LPUs (Language Processing Units) oferecendo velocidades superiores a 500 tokens/s para inferência em tempo real',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#F55036" fill-opacity="0.12" stroke="#F55036" stroke-width="2"/>
      <!-- Groq Blazing Fast Chip -->
      <rect x="18" y="18" width="28" height="28" rx="5" stroke="#F55036" stroke-width="3" fill="#F55036" fill-opacity="0.2"/>
      <!-- Fast Acceleration Rays -->
      <path d="M26 32L34 24L32 31L38 31L30 40L32 33L26 33" fill="#F55036"/>
      <line x1="14" y1="24" x2="18" y2="24" stroke="#F55036" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="14" y1="32" x2="18" y2="32" stroke="#F55036" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="14" y1="40" x2="18" y2="40" stroke="#F55036" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="46" y1="24" x2="50" y2="24" stroke="#F55036" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="46" y1="32" x2="50" y2="32" stroke="#F55036" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="46" y1="40" x2="50" y2="40" stroke="#F55036" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`,
  },
  {
    key: 'ai_nvidia_nim',
    name: 'NVIDIA NIM (Microservices)',
    provider: 'generic',
    category: 'ai',
    aiGroup: 'Aceleração & Inferência',
    brandColor: '#76B900',
    defaultResourceType: 'nvidia_nim_container',
    defaultSpecs: { gpuType: 'H100-80GB', precision: 'FP8', count: 1 },
    description: 'Microsserviços de inferência acelerados NVIDIA NIM para implantação corporativa de LLMs em GPUs Tensor Core',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#76B900" fill-opacity="0.12" stroke="#76B900" stroke-width="2"/>
      <!-- NVIDIA Eye Shape -->
      <path d="M12 32C12 32 20 20 32 20C44 20 52 32 52 32C52 32 44 44 32 44C20 44 12 32 12 32Z" stroke="#76B900" stroke-width="3.5" fill="none"/>
      <circle cx="32" cy="32" r="7" fill="#76B900"/>
      <circle cx="34" cy="30" r="2.5" fill="white"/>
    </svg>`,
  },
  {
    key: 'ai_ollama',
    name: 'Ollama (Local LLM Runner)',
    provider: 'generic',
    category: 'ai',
    aiGroup: 'Aceleração & Inferência',
    brandColor: '#475569',
    defaultResourceType: 'ollama_local_service',
    defaultSpecs: { quant: 'Q4_K_M', contextSize: 8192, count: 1 },
    description: 'Servidor local e leve para empacotar e executar Llama, DeepSeek, Mistral e Gemma em servidores on-premise ou Docker',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#475569" fill-opacity="0.12" stroke="#475569" stroke-width="2"/>
      <!-- Ollama Llama Silhouette -->
      <g transform="translate(18, 14)">
        <path d="M7 6L9 1M17 6L15 1M6 10C6 7 9 6 12 6C15 6 18 7 18 10V22C18 26 15 29 12 29C9 29 6 26 6 22V10Z" stroke="#475569" stroke-width="3" stroke-linecap="round" fill="none"/>
        <circle cx="9.5" cy="12" r="1.5" fill="#475569"/>
        <circle cx="14.5" cy="12" r="1.5" fill="#475569"/>
        <path d="M10 18C11 19 13 19 14 18" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
        <rect x="4" y="27" width="16" height="8" rx="3" stroke="#475569" stroke-width="2.5" fill="#475569" fill-opacity="0.2"/>
      </g>
    </svg>`,
  },

  // =========================================================================
  // 3. BANCOS VETORIAIS & RAG (Pinecone, Qdrant, Chroma)
  // =========================================================================
  {
    key: 'ai_pinecone',
    name: 'Pinecone Vector DB',
    provider: 'generic',
    category: 'ai',
    aiGroup: 'Bancos Vetoriais & RAG',
    brandColor: '#0EA5E9',
    defaultResourceType: 'pinecone_index',
    defaultSpecs: { dimension: 1536, metric: 'cosine', podType: 'serverless', count: 1 },
    description: 'Banco de dados vetorial serverless de alta escala para busca semântica, memória de longo prazo e RAG',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#0EA5E9" fill-opacity="0.12" stroke="#0EA5E9" stroke-width="2"/>
      <!-- Pinecone Faceted Pattern -->
      <g transform="translate(16, 14)" stroke="#0EA5E9" stroke-width="2.5" stroke-linejoin="round">
        <polygon points="16,2 8,12 24,12" fill="#0EA5E9" fill-opacity="0.4"/>
        <polygon points="8,12 2,24 16,24" fill="#0EA5E9" fill-opacity="0.25"/>
        <polygon points="24,12 16,24 30,24" fill="#0EA5E9" fill-opacity="0.25"/>
        <polygon points="16,24 8,34 24,34" fill="#0EA5E9" fill-opacity="0.5"/>
        <line x1="16" y1="34" x2="16" y2="38" stroke-width="3" stroke-linecap="round"/>
      </g>
    </svg>`,
  },
  {
    key: 'ai_qdrant',
    name: 'Qdrant Vector Engine',
    provider: 'generic',
    category: 'ai',
    aiGroup: 'Bancos Vetoriais & RAG',
    brandColor: '#DC2626',
    defaultResourceType: 'qdrant_collection',
    defaultSpecs: { vectors: '1536', distance: 'Cosine', count: 1 },
    description: 'Mecanismo de busca de similaridade vetorial escrito em Rust com filtros avançados e suporte nativo a gRPC',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#DC2626" fill-opacity="0.12" stroke="#DC2626" stroke-width="2"/>
      <!-- Qdrant 3D Isometric Cube -->
      <g transform="translate(16, 14)">
        <polygon points="16,2 30,10 16,18 2,10" fill="#EF4444" stroke="#DC2626" stroke-width="2"/>
        <polygon points="2,10 16,18 16,34 2,26" fill="#DC2626" stroke="#991B1B" stroke-width="2"/>
        <polygon points="30,10 16,18 16,34 30,26" fill="#B91C1C" stroke="#991B1B" stroke-width="2"/>
        <circle cx="16" cy="18" r="3.5" fill="white"/>
      </g>
    </svg>`,
  },
  {
    key: 'ai_chromadb',
    name: 'Chroma DB (Embeddings)',
    provider: 'generic',
    category: 'ai',
    aiGroup: 'Bancos Vetoriais & RAG',
    brandColor: '#8B5CF6',
    defaultResourceType: 'chroma_collection',
    defaultSpecs: { persistDirectory: '/chroma/data', count: 1 },
    description: 'Banco de embeddings open-source focado em simplicidade para prototipagem rápida e aplicações GenAI com Python/JS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#8B5CF6" fill-opacity="0.12" stroke="#8B5CF6" stroke-width="2"/>
      <!-- Chroma Color Circles Array -->
      <circle cx="24" cy="24" r="8" fill="#EC4899" fill-opacity="0.8"/>
      <circle cx="40" cy="24" r="8" fill="#8B5CF6" fill-opacity="0.8"/>
      <circle cx="24" cy="40" r="8" fill="#3B82F6" fill-opacity="0.8"/>
      <circle cx="40" cy="40" r="8" fill="#10B981" fill-opacity="0.8"/>
      <circle cx="32" cy="32" r="4" fill="white"/>
    </svg>`,
  },

  // =========================================================================
  // 4. AGENTES & ORQUESTRAÇÃO (LangChain, CrewAI)
  // =========================================================================
  {
    key: 'ai_langchain',
    name: 'LangChain / LangSmith',
    provider: 'generic',
    category: 'ai',
    aiGroup: 'Agentes & Orquestração',
    brandColor: '#00A67E',
    defaultResourceType: 'langchain_runnable_chain',
    defaultSpecs: { tracing: true, framework: 'LangChain-v0.3', count: 1 },
    description: 'Framework líder para construir agentes autônomos, cadeias RAG com memória e rastreamento de execuções com LangSmith',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#00A67E" fill-opacity="0.12" stroke="#00A67E" stroke-width="2"/>
      <!-- LangChain Parrot & Chains -->
      <g transform="translate(14, 14)">
        <!-- Parrot Face -->
        <path d="M12 8C12 4 16 2 20 2C24 2 28 5 28 10C28 15 25 20 20 20C16 20 12 16 12 12V8Z" fill="#00A67E"/>
        <path d="M28 10L35 12L28 16" fill="#F59E0B"/>
        <circle cx="22" cy="7" r="2" fill="white"/>
        <circle cx="23" cy="7" r="1" fill="#1E293B"/>
        <!-- Interlocking Chains -->
        <rect x="4" y="22" width="14" height="8" rx="4" stroke="#00A67E" stroke-width="3" fill="none"/>
        <rect x="14" y="22" width="14" height="8" rx="4" stroke="#00A67E" stroke-width="3" fill="none"/>
      </g>
    </svg>`,
  },
  {
    key: 'ai_crewai',
    name: 'CrewAI (Multi-Agents)',
    provider: 'generic',
    category: 'ai',
    aiGroup: 'Agentes & Orquestração',
    brandColor: '#EA580C',
    defaultResourceType: 'crewai_multi_agent_system',
    defaultSpecs: { process: 'hierarchical', agentsCount: 4, count: 1 },
    description: 'Orquestração de equipes multiagentes com divisão de papéis, tarefas colaborativas e ferramentas compartilhadas',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#EA580C" fill-opacity="0.12" stroke="#EA580C" stroke-width="2"/>
      <!-- 3 Autonomous Agent Nodes Connected -->
      <circle cx="32" cy="20" r="7" fill="#EA580C"/>
      <circle cx="20" cy="42" r="6" fill="#EA580C" fill-opacity="0.8"/>
      <circle cx="44" cy="42" r="6" fill="#EA580C" fill-opacity="0.8"/>
      <line x1="32" y1="27" x2="20" y2="36" stroke="#EA580C" stroke-width="2.5"/>
      <line x1="32" y1="27" x2="44" y2="36" stroke="#EA580C" stroke-width="2.5"/>
      <line x1="26" y1="42" x2="38" y2="42" stroke="#EA580C" stroke-width="2" stroke-dasharray="2 2"/>
    </svg>`,
  },

  // =========================================================================
  // 5. PESQUISA & PLATAFORMAS (Perplexity, Hugging Face)
  // =========================================================================
  {
    key: 'ai_perplexity',
    name: 'Perplexity AI (Sonar / Search)',
    provider: 'generic',
    category: 'ai',
    aiGroup: 'Pesquisa & Plataformas',
    brandColor: '#20B2AA',
    defaultResourceType: 'perplexity_sonar_search',
    defaultSpecs: { model: 'sonar-pro', onlineSearch: true, count: 1 },
    description: 'Perplexity Sonar Pro para busca inteligente online em tempo real com citações verificadas e fundamentação na web',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#20B2AA" fill-opacity="0.12" stroke="#20B2AA" stroke-width="2"/>
      <!-- Perplexity Interconnected Weave -->
      <g transform="translate(16, 16)" stroke="#20B2AA" stroke-width="3" stroke-linecap="round">
        <line x1="16" y1="0" x2="16" y2="32"/>
        <line x1="0" y1="16" x2="32" y2="16"/>
        <path d="M5 5L27 27M5 27L27 5"/>
        <circle cx="16" cy="16" r="3.5" fill="#20B2AA"/>
      </g>
    </svg>`,
  },
  {
    key: 'ai_huggingface',
    name: 'Hugging Face (Hub & Inference)',
    provider: 'generic',
    category: 'ai',
    aiGroup: 'Pesquisa & Plataformas',
    brandColor: '#FFD21E',
    defaultResourceType: 'huggingface_inference_endpoint',
    defaultSpecs: { framework: 'PyTorch/Transformers', count: 1 },
    description: 'Maior hub global da comunidade open-source para modelos, datasets, Spaces e Endpoints gerenciados de inferência',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#FFD21E" fill-opacity="0.15" stroke="#FFA000" stroke-width="2"/>
      <!-- Hugging Face 🤗 Mascot -->
      <circle cx="32" cy="32" r="18" fill="#FFD21E" stroke="#E69500" stroke-width="2"/>
      <!-- Eyes -->
      <circle cx="26" cy="28" r="2.5" fill="#2D3748"/>
      <circle cx="38" cy="28" r="2.5" fill="#2D3748"/>
      <!-- Rosy Cheeks -->
      <ellipse cx="23" cy="34" rx="3" ry="1.8" fill="#FF8A80"/>
      <ellipse cx="41" cy="34" rx="3" ry="1.8" fill="#FF8A80"/>
      <!-- Smile -->
      <path d="M26 35C28 38 36 38 38 35" stroke="#2D3748" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Hugging Hands -->
      <path d="M12 38C15 34 20 37 20 40C20 43 15 45 12 41Z" fill="#FFA000"/>
      <path d="M52 38C49 34 44 37 44 40C44 43 49 45 52 41Z" fill="#FFA000"/>
    </svg>`,
  },

  // =========================================================================
  // 6. MULTIMODAL & GERAÇÃO (Midjourney, Stability AI, ElevenLabs)
  // =========================================================================
  {
    key: 'ai_midjourney',
    name: 'Midjourney (Image Gen)',
    provider: 'generic',
    category: 'ai',
    aiGroup: 'Multimodal & Geração',
    brandColor: '#0284C7',
    defaultResourceType: 'midjourney_image_task',
    defaultSpecs: { version: 'v6.1', mode: 'fast', count: 1 },
    description: 'Geração fotorrealista e artística de imagens de alta resolução com composição estética e fidelidade visual líderes',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#0284C7" fill-opacity="0.12" stroke="#0284C7" stroke-width="2"/>
      <!-- Midjourney Origami Boat -->
      <g transform="translate(15, 14)">
        <polygon points="17,3 4,23 30,23" fill="#0284C7" fill-opacity="0.8"/>
        <polygon points="17,8 17,23 27,23" fill="#38BDF8"/>
        <polygon points="2,25 32,25 28,33 6,33" fill="#0369A1"/>
        <line x1="2" y1="36" x2="32" y2="36" stroke="#38BDF8" stroke-width="2" stroke-linecap="round"/>
      </g>
    </svg>`,
  },
  {
    key: 'ai_stability',
    name: 'Stability AI (SDXL / Turbo)',
    provider: 'generic',
    category: 'ai',
    aiGroup: 'Multimodal & Geração',
    brandColor: '#7C3AED',
    defaultResourceType: 'stability_diffusion_pipeline',
    defaultSpecs: { model: 'sdxl-turbo', steps: 30, count: 1 },
    description: 'Stable Diffusion 3, SDXL e Stable Video Diffusion para geração rápida de mídia aberta e flexível',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#7C3AED" fill-opacity="0.12" stroke="#7C3AED" stroke-width="2"/>
      <!-- Stability Radial Blast Pattern -->
      <g transform="translate(32, 32)">
        <circle cx="0" cy="0" r="5" fill="#7C3AED"/>
        <circle cx="0" cy="-14" r="3.5" fill="#9333EA"/>
        <circle cx="10" cy="-10" r="3" fill="#A855F7"/>
        <circle cx="14" cy="0" r="3.5" fill="#9333EA"/>
        <circle cx="10" cy="10" r="3" fill="#A855F7"/>
        <circle cx="0" cy="14" r="3.5" fill="#9333EA"/>
        <circle cx="-10" cy="10" r="3" fill="#A855F7"/>
        <circle cx="-14" cy="0" r="3.5" fill="#9333EA"/>
        <circle cx="-10" cy="-10" r="3" fill="#A855F7"/>
      </g>
    </svg>`,
  },
  {
    key: 'ai_elevenlabs',
    name: 'ElevenLabs (Voice & Audio)',
    provider: 'generic',
    category: 'ai',
    aiGroup: 'Multimodal & Geração',
    brandColor: '#2563EB',
    defaultResourceType: 'elevenlabs_voice_synthesis',
    defaultSpecs: { voiceModel: 'eleven_multilingual_v2', count: 1 },
    description: 'Síntese de voz hiper-realista, clonagem de voz, text-to-speech expressivo e efeitos sonoros gerados por IA',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#2563EB" fill-opacity="0.12" stroke="#2563EB" stroke-width="2"/>
      <!-- ElevenLabs Dual Waveform Bars (11) -->
      <rect x="23" y="16" width="6" height="32" rx="3" fill="#2563EB"/>
      <rect x="35" y="16" width="6" height="32" rx="3" fill="#2563EB"/>
      <circle cx="26" cy="12" r="2" fill="#60A5FA"/>
      <circle cx="38" cy="12" r="2" fill="#60A5FA"/>
    </svg>`,
  },
];
