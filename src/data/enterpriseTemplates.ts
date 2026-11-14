import { DiagramState } from '../types';

export const ENTERPRISE_TEMPLATES: DiagramState[] = [
  // ==========================================
  // C4 MODEL ENTERPRISE TEMPLATE
  // ==========================================
  {
    id: 'template_c4_banking_system',
    title: 'C4 Model - Internet Banking Platform (Context & Containers)',
    description: 'Arquitetura corporativa em modelo C4 (Simon Brown) abrangendo Nível 1: Contexto de Sistema (Clientes, Sistema Internet Banking e Sistemas Externos de Core Banking/E-mail) e Nível 2: Containers de Software (SPA, Mobile App, API Gateway, Microsserviços e Banco de Dados Relacional).',
    primaryProvider: 'c4',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activeFramework: 'c4',
    c4LevelFilter: 'all',
    containers: [
      {
        id: 'c4_bound_enterprise',
        name: 'Enterprise Boundary: Big Bank plc',
        provider: 'c4',
        type: 'c4_boundary_enterprise',
        x: 40,
        y: 40,
        width: 1060,
        height: 640,
        color: '#08427B',
        borderStyle: 'dashed'
      },
      {
        id: 'c4_bound_system',
        name: 'Software System Boundary: Internet Banking System [Level 2 Containers]',
        provider: 'c4',
        type: 'c4_boundary_system',
        x: 80,
        y: 190,
        width: 680,
        height: 460,
        color: '#1168BD',
        borderStyle: 'solid'
      }
    ],
    nodes: [
      // Level 1: Context actors & systems
      {
        id: 'c4_customer',
        name: 'Cliente Bancário Pessoal',
        provider: 'c4',
        category: 'compute',
        iconKey: 'c4_person',
        resourceType: 'c4_person',
        x: 80,
        y: 70,
        specs: { count: 1, c4Level: 'context', c4Type: 'person' },
        notes: 'Cliente correntista que visualiza extratos, faz transferências Pix e solicita crédito'
      },
      {
        id: 'c4_mainframe',
        name: 'Core Banking Mainframe',
        provider: 'c4',
        category: 'compute',
        iconKey: 'c4_external_system',
        resourceType: 'c4_external_system',
        x: 840,
        y: 220,
        specs: { count: 1, c4Level: 'context', c4Type: 'external_system' },
        notes: 'Sistema bancário legado central que armazena contas, lançamentos e limites'
      },
      {
        id: 'c4_email_system',
        name: 'E-mail Delivery Service',
        provider: 'c4',
        category: 'compute',
        iconKey: 'c4_external_system',
        resourceType: 'c4_external_system',
        x: 840,
        y: 400,
        specs: { count: 1, c4Level: 'context', c4Type: 'external_system' },
        notes: 'Serviço externo de entrega transacional de e-mails e notificações push'
      },

      // Level 2: Containers
      {
        id: 'c4_spa',
        name: 'Single-Page App (Web)',
        provider: 'c4',
        category: 'compute',
        iconKey: 'c4_container_spa',
        resourceType: 'c4_container_spa',
        containerId: 'c4_bound_system',
        x: 120,
        y: 260,
        specs: { count: 1, c4Level: 'container', c4Technology: 'React / TypeScript' },
        notes: 'Interface web responsiva entregue aos navegadores dos clientes via CDN'
      },
      {
        id: 'c4_mobile',
        name: 'Mobile App (iOS/Android)',
        provider: 'c4',
        category: 'compute',
        iconKey: 'c4_container_mobile',
        resourceType: 'c4_container_mobile',
        containerId: 'c4_bound_system',
        x: 120,
        y: 430,
        specs: { count: 1, c4Level: 'container', c4Technology: 'Flutter' },
        notes: 'Aplicativo móvel seguro com biometria nos smartphones dos clientes'
      },
      {
        id: 'c4_api',
        name: 'API Application (Backend)',
        provider: 'c4',
        category: 'compute',
        iconKey: 'c4_container_api',
        resourceType: 'c4_container_api',
        containerId: 'c4_bound_system',
        x: 370,
        y: 330,
        specs: { count: 1, c4Level: 'container', c4Technology: 'Node.js / Express' },
        notes: 'Fornece endpoints REST e GraphQL para transferências, extratos e autenticação'
      },
      {
        id: 'c4_database',
        name: 'Relational Database',
        provider: 'c4',
        category: 'database',
        iconKey: 'c4_container_db',
        resourceType: 'c4_container_db',
        containerId: 'c4_bound_system',
        x: 580,
        y: 250,
        specs: { count: 1, c4Level: 'container', c4Technology: 'PostgreSQL 16' },
        notes: 'Armazena credenciais criptografadas, perfis de usuários e logs de auditoria'
      },
      {
        id: 'c4_queue',
        name: 'Event Streaming Queue',
        provider: 'c4',
        category: 'integration',
        iconKey: 'c4_container_messagebus',
        resourceType: 'c4_container_messagebus',
        containerId: 'c4_bound_system',
        x: 580,
        y: 430,
        specs: { count: 1, c4Level: 'container', c4Technology: 'Apache Kafka' },
        notes: 'Tópicos de eventos de transações, notificações e conciliação bancária'
      }
    ],
    links: [
      {
        id: 'l_c4_1',
        from: 'c4_customer',
        to: 'c4_spa',
        label: 'Acessa via HTTPS',
        protocol: 'HTTPS',
        style: 'solid',
        arrowHead: 'end',
        color: '#08427B'
      },
      {
        id: 'l_c4_2',
        from: 'c4_customer',
        to: 'c4_mobile',
        label: 'Usa app nativo',
        protocol: 'Internal',
        style: 'solid',
        arrowHead: 'end',
        color: '#08427B'
      },
      {
        id: 'l_c4_3',
        from: 'c4_spa',
        to: 'c4_api',
        label: 'Requisições JSON/HTTPS',
        protocol: 'HTTPS',
        style: 'solid',
        arrowHead: 'end',
        color: '#1168BD'
      },
      {
        id: 'l_c4_4',
        from: 'c4_mobile',
        to: 'c4_api',
        label: 'Chamadas API REST/mTLS',
        protocol: 'HTTPS',
        style: 'solid',
        arrowHead: 'end',
        color: '#1168BD'
      },
      {
        id: 'l_c4_5',
        from: 'c4_api',
        to: 'c4_database',
        label: 'Leitura/Escrita SQL',
        protocol: 'SQL',
        style: 'solid',
        arrowHead: 'end',
        color: '#1168BD'
      },
      {
        id: 'l_c4_6',
        from: 'c4_api',
        to: 'c4_queue',
        label: 'Publica eventos Pix',
        protocol: 'Kafka',
        style: 'solid',
        arrowHead: 'end',
        color: '#1168BD'
      },
      {
        id: 'l_c4_7',
        from: 'c4_api',
        to: 'c4_mainframe',
        label: 'SNA / MQ Series',
        protocol: 'TCP',
        style: 'solid',
        arrowHead: 'end',
        color: '#475569'
      },
      {
        id: 'l_c4_8',
        from: 'c4_queue',
        to: 'c4_email_system',
        label: 'Dispara e-mail / push',
        protocol: 'HTTPS',
        style: 'dashed',
        arrowHead: 'end',
        color: '#475569'
      }
    ]
  },

  // ==========================================
  // ARCHIMATE 3.2 ENTERPRISE ARCHITECTURE TEMPLATE
  // ==========================================
  {
    id: 'template_archimate_enterprise',
    title: 'ArchiMate 3.2 - Enterprise Core Banking & Payments',
    description: 'Arquitetura corporativa multi-camada formalizada com ArchiMate 3.2 (The Open Group) integrando Camada de Motivação & Estratégia (Stakeholder, Metas, Capacidades), Camada de Negócio (Atores, Processos, Serviços), Camada de Aplicação (Componentes, APIs, Serviços) e Camada de Tecnologia (Nós, SGBD, Clusters).',
    primaryProvider: 'archimate',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activeFramework: 'archimate',
    containers: [
      {
        id: 'c_arch_strat',
        name: 'ArchiMate: Camada de Motivação & Estratégia (Strategy Layer)',
        provider: 'archimate',
        type: 'archimate_group',
        x: 40,
        y: 40,
        width: 980,
        height: 130,
        color: '#8B5CF6',
        borderStyle: 'solid'
      },
      {
        id: 'c_arch_biz',
        name: 'ArchiMate: Camada de Negócio (Business Layer)',
        provider: 'archimate',
        type: 'archimate_group',
        x: 40,
        y: 190,
        width: 980,
        height: 140,
        color: '#CA8A04',
        borderStyle: 'solid'
      },
      {
        id: 'c_arch_app',
        name: 'ArchiMate: Camada de Aplicação (Application Layer)',
        provider: 'archimate',
        type: 'archimate_group',
        x: 40,
        y: 350,
        width: 980,
        height: 140,
        color: '#0284C7',
        borderStyle: 'solid'
      },
      {
        id: 'c_arch_tech',
        name: 'ArchiMate: Camada de Tecnologia & Infraestrutura (Technology Layer)',
        provider: 'archimate',
        type: 'archimate_group',
        x: 40,
        y: 510,
        width: 980,
        height: 140,
        color: '#16A34A',
        borderStyle: 'solid'
      }
    ],
    nodes: [
      // Motivation & Strategy
      {
        id: 'arch_stakeholder',
        name: 'Diretoria de Inovação & Risco',
        provider: 'archimate',
        category: 'integration',
        iconKey: 'archimate_stakeholder',
        resourceType: 'archimate_stakeholder',
        containerId: 'c_arch_strat',
        x: 80,
        y: 75,
        specs: { count: 1, archimateLayer: 'motivation' }
      },
      {
        id: 'arch_goal',
        name: 'Pagamentos Instantâneos 24x7',
        provider: 'archimate',
        category: 'integration',
        iconKey: 'archimate_goal',
        resourceType: 'archimate_goal',
        containerId: 'c_arch_strat',
        x: 400,
        y: 75,
        specs: { count: 1, archimateLayer: 'motivation' }
      },
      {
        id: 'arch_capability',
        name: 'Capacidade: Liquidação Pix',
        provider: 'archimate',
        category: 'compute',
        iconKey: 'archimate_capability',
        resourceType: 'archimate_capability',
        containerId: 'c_arch_strat',
        x: 740,
        y: 75,
        specs: { count: 1, archimateLayer: 'strategy' }
      },

      // Business Layer
      {
        id: 'arch_actor',
        name: 'Cliente Pessoa Física',
        provider: 'archimate',
        category: 'compute',
        iconKey: 'archimate_business_actor',
        resourceType: 'archimate_business_actor',
        containerId: 'c_arch_biz',
        x: 80,
        y: 220,
        specs: { count: 1, archimateLayer: 'business' }
      },
      {
        id: 'arch_biz_proc',
        name: 'Processo: Transferência Pix',
        provider: 'archimate',
        category: 'compute',
        iconKey: 'archimate_business_process',
        resourceType: 'archimate_business_process',
        containerId: 'c_arch_biz',
        x: 400,
        y: 220,
        specs: { count: 1, archimateLayer: 'business' }
      },
      {
        id: 'arch_biz_srv',
        name: 'Serviço: Pagamento Digital',
        provider: 'archimate',
        category: 'compute',
        iconKey: 'archimate_business_service',
        resourceType: 'archimate_business_service',
        containerId: 'c_arch_biz',
        x: 740,
        y: 220,
        specs: { count: 1, archimateLayer: 'business' }
      },

      // Application Layer
      {
        id: 'arch_app_comp',
        name: 'Mobile Banking App',
        provider: 'archimate',
        category: 'compute',
        iconKey: 'archimate_app_component',
        resourceType: 'archimate_app_component',
        containerId: 'c_arch_app',
        x: 80,
        y: 380,
        specs: { count: 1, archimateLayer: 'application' }
      },
      {
        id: 'arch_app_srv',
        name: 'Payment Gateway API',
        provider: 'archimate',
        category: 'compute',
        iconKey: 'archimate_app_service',
        resourceType: 'archimate_app_service',
        containerId: 'c_arch_app',
        x: 400,
        y: 380,
        specs: { count: 1, archimateLayer: 'application' }
      },
      {
        id: 'arch_data_obj',
        name: 'Comprovante & Chave Pix',
        provider: 'archimate',
        category: 'database',
        iconKey: 'archimate_data_object',
        resourceType: 'archimate_data_object',
        containerId: 'c_arch_app',
        x: 740,
        y: 380,
        specs: { count: 1, archimateLayer: 'application' }
      },

      // Technology Layer
      {
        id: 'arch_tech_node',
        name: 'Kubernetes Cluster HA',
        provider: 'archimate',
        category: 'compute',
        iconKey: 'archimate_node',
        resourceType: 'archimate_node',
        containerId: 'c_arch_tech',
        x: 80,
        y: 540,
        specs: { count: 1, archimateLayer: 'technology' }
      },
      {
        id: 'arch_system_sw',
        name: 'PostgreSQL HA Cluster',
        provider: 'archimate',
        category: 'compute',
        iconKey: 'archimate_system_software',
        resourceType: 'archimate_system_software',
        containerId: 'c_arch_tech',
        x: 400,
        y: 540,
        specs: { count: 1, archimateLayer: 'technology' }
      },
      {
        id: 'arch_network',
        name: 'Rede SPB / BACEN Link',
        provider: 'archimate',
        category: 'networking',
        iconKey: 'archimate_comm_network',
        resourceType: 'archimate_comm_network',
        containerId: 'c_arch_tech',
        x: 740,
        y: 540,
        specs: { count: 1, archimateLayer: 'technology' }
      }
    ],
    links: [
      {
        id: 'l_arch_1',
        from: 'arch_stakeholder',
        to: 'arch_goal',
        label: 'Define Meta',
        relationshipType: 'association',
        style: 'solid',
        arrowHead: 'end',
        color: '#8B5CF6'
      },
      {
        id: 'l_arch_2',
        from: 'arch_capability',
        to: 'arch_goal',
        label: 'Realiza Meta',
        relationshipType: 'realization',
        style: 'dashed',
        arrowHead: 'end',
        color: '#8B5CF6'
      },
      {
        id: 'l_arch_3',
        from: 'arch_actor',
        to: 'arch_biz_proc',
        label: 'Inicia Processo',
        relationshipType: 'triggering',
        style: 'solid',
        arrowHead: 'end',
        color: '#CA8A04'
      },
      {
        id: 'l_arch_4',
        from: 'arch_biz_proc',
        to: 'arch_biz_srv',
        label: 'Expõe Serviço',
        relationshipType: 'serving',
        style: 'solid',
        arrowHead: 'end',
        color: '#CA8A04'
      },
      {
        id: 'l_arch_5',
        from: 'arch_app_srv',
        to: 'arch_biz_proc',
        label: 'Suporta Processo',
        relationshipType: 'serving',
        style: 'dashed',
        arrowHead: 'end',
        color: '#0284C7'
      },
      {
        id: 'l_arch_6',
        from: 'arch_app_comp',
        to: 'arch_app_srv',
        label: 'Chama API',
        relationshipType: 'flow',
        style: 'solid',
        arrowHead: 'end',
        color: '#0284C7'
      },
      {
        id: 'l_arch_7',
        from: 'arch_app_srv',
        to: 'arch_data_obj',
        label: 'Acessa Dados',
        relationshipType: 'access',
        style: 'dashed',
        arrowHead: 'end',
        color: '#0284C7'
      },
      {
        id: 'l_arch_8',
        from: 'arch_tech_node',
        to: 'arch_app_comp',
        label: 'Hospeda App',
        relationshipType: 'assignment',
        style: 'solid',
        arrowHead: 'end',
        color: '#16A34A'
      },
      {
        id: 'l_arch_9',
        from: 'arch_system_sw',
        to: 'arch_data_obj',
        label: 'Persiste Schema',
        relationshipType: 'realization',
        style: 'solid',
        arrowHead: 'end',
        color: '#16A34A'
      }
    ]
  },

  // ==========================================
  // TOGAF ADM ENTERPRISE BLUEPRINT TEMPLATE
  // ==========================================
  {
    id: 'template_togaf_adm_blueprint',
    title: 'TOGAF ADM - Enterprise Architecture Framework Blueprint',
    description: 'Ciclo completo do TOGAF ADM (Architecture Development Method) estruturado em fases: Fase A (Visão da Arquitetura), Fase B (Arquitetura de Negócio), Fase C (Sistemas de Informação e Dados), Fase D (Arquitetura de Tecnologia) e Governança de Contratos com Blocos de Construção de Arquitetura (ABB) e Solução (SBB).',
    primaryProvider: 'togaf',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    activeFramework: 'togaf',
    containers: [
      {
        id: 'c_togaf_a',
        name: 'TOGAF ADM Phase A: Architecture Vision & Governance',
        provider: 'togaf',
        type: 'togaf_adm_phase',
        x: 40,
        y: 40,
        width: 440,
        height: 250,
        color: '#8B5CF6',
        borderStyle: 'solid'
      },
      {
        id: 'c_togaf_b',
        name: 'TOGAF ADM Phase B: Business Architecture',
        provider: 'togaf',
        type: 'togaf_adm_phase',
        x: 520,
        y: 40,
        width: 440,
        height: 250,
        color: '#CA8A04',
        borderStyle: 'solid'
      },
      {
        id: 'c_togaf_c',
        name: 'TOGAF ADM Phase C: Information Systems (App & Data ABB)',
        provider: 'togaf',
        type: 'togaf_adm_phase',
        x: 40,
        y: 320,
        width: 440,
        height: 250,
        color: '#0284C7',
        borderStyle: 'solid'
      },
      {
        id: 'c_togaf_d',
        name: 'TOGAF ADM Phase D: Technology Architecture (Infrastructure SBB)',
        provider: 'togaf',
        type: 'togaf_adm_phase',
        x: 520,
        y: 320,
        width: 440,
        height: 250,
        color: '#16A34A',
        borderStyle: 'solid'
      }
    ],
    nodes: [
      // Phase A
      {
        id: 'togaf_n_vision',
        name: 'Architecture Vision (Escopo)',
        provider: 'togaf',
        category: 'integration',
        iconKey: 'togaf_phase_a',
        resourceType: 'togaf_phase_a',
        containerId: 'c_togaf_a',
        x: 80,
        y: 110,
        specs: { count: 1, togafPhase: 'A' }
      },
      {
        id: 'togaf_n_contract',
        name: 'Architecture Contract',
        provider: 'togaf',
        category: 'integration',
        iconKey: 'togaf_architecture_contract',
        resourceType: 'togaf_contract',
        containerId: 'c_togaf_a',
        x: 280,
        y: 110,
        specs: { count: 1, togafPhase: 'A' }
      },

      // Phase B
      {
        id: 'togaf_n_biz_arch',
        name: 'Business Processes & Roles',
        provider: 'togaf',
        category: 'compute',
        iconKey: 'togaf_phase_b',
        resourceType: 'togaf_phase_b',
        containerId: 'c_togaf_b',
        x: 560,
        y: 110,
        specs: { count: 1, togafPhase: 'B' }
      },
      {
        id: 'togaf_n_biz_abb',
        name: 'ABB: OmniChannel Sales',
        provider: 'togaf',
        category: 'compute',
        iconKey: 'togaf_abb',
        resourceType: 'togaf_abb',
        containerId: 'c_togaf_b',
        x: 760,
        y: 110,
        specs: { count: 1, togafBuildingBlock: 'ABB', togafPhase: 'B' }
      },

      // Phase C
      {
        id: 'togaf_n_app_data',
        name: 'Logical Data & App Services',
        provider: 'togaf',
        category: 'database',
        iconKey: 'togaf_phase_c',
        resourceType: 'togaf_phase_c',
        containerId: 'c_togaf_c',
        x: 80,
        y: 390,
        specs: { count: 1, togafPhase: 'C' }
      },
      {
        id: 'togaf_n_app_abb',
        name: 'ABB: Payment Engine Spec',
        provider: 'togaf',
        category: 'compute',
        iconKey: 'togaf_abb',
        resourceType: 'togaf_abb',
        containerId: 'c_togaf_c',
        x: 280,
        y: 390,
        specs: { count: 1, togafBuildingBlock: 'ABB', togafPhase: 'C' }
      },

      // Phase D
      {
        id: 'togaf_n_tech_arch',
        name: 'Platform Infrastructure SBB',
        provider: 'togaf',
        category: 'compute',
        iconKey: 'togaf_phase_d',
        resourceType: 'togaf_phase_d',
        containerId: 'c_togaf_d',
        x: 560,
        y: 390,
        specs: { count: 1, togafPhase: 'D' }
      },
      {
        id: 'togaf_n_cloud_sbb',
        name: 'SBB: Kubernetes + Cloud SQL',
        provider: 'togaf',
        category: 'compute',
        iconKey: 'togaf_sbb',
        resourceType: 'togaf_sbb',
        containerId: 'c_togaf_d',
        x: 760,
        y: 390,
        specs: { count: 1, togafBuildingBlock: 'SBB', togafPhase: 'D' }
      }
    ],
    links: [
      {
        id: 'l_togaf_1',
        from: 'togaf_n_vision',
        to: 'togaf_n_contract',
        label: 'Aprova Declaração',
        style: 'solid',
        arrowHead: 'end',
        color: '#8B5CF6'
      },
      {
        id: 'l_togaf_2',
        from: 'togaf_n_vision',
        to: 'togaf_n_biz_arch',
        label: 'Direciona Negócio',
        style: 'solid',
        arrowHead: 'end',
        color: '#8B5CF6'
      },
      {
        id: 'l_togaf_3',
        from: 'togaf_n_biz_arch',
        to: 'togaf_n_biz_abb',
        label: 'Identifica Requisitos',
        style: 'solid',
        arrowHead: 'end',
        color: '#CA8A04'
      },
      {
        id: 'l_togaf_4',
        from: 'togaf_n_biz_abb',
        to: 'togaf_n_app_data',
        label: 'Informa Sistemas',
        style: 'solid',
        arrowHead: 'end',
        color: '#0284C7'
      },
      {
        id: 'l_togaf_5',
        from: 'togaf_n_app_data',
        to: 'togaf_n_app_abb',
        label: 'Especifica ABB',
        style: 'solid',
        arrowHead: 'end',
        color: '#0284C7'
      },
      {
        id: 'l_togaf_6',
        from: 'togaf_n_app_abb',
        to: 'togaf_n_tech_arch',
        label: 'Demanda Plataforma',
        style: 'solid',
        arrowHead: 'end',
        color: '#16A34A'
      },
      {
        id: 'l_togaf_7',
        from: 'togaf_n_tech_arch',
        to: 'togaf_n_cloud_sbb',
        label: 'Implementa SBB Concreto',
        style: 'solid',
        arrowHead: 'end',
        color: '#16A34A'
      }
    ]
  }
];
