import { CloudIconDefinition } from '../types';

export const TOGAF_ICONS: CloudIconDefinition[] = [
  // ==========================================
  // TOGAF METAMODEL BUILDING BLOCKS (ABB & SBB)
  // ==========================================
  {
    key: 'togaf_abb',
    name: 'ABB (Architecture Building Block)',
    provider: 'togaf',
    category: 'compute',
    brandColor: '#0D9488',
    defaultResourceType: 'togaf_abb',
    defaultSpecs: { count: 1, togafBuildingBlock: 'ABB' },
    description: 'TOGAF ABB: Bloco de construção arquitetural conceitual agnóstico de fornecedor que descreve capacidade e requisitos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#0D9488" fill-opacity="0.14" stroke="#0D9488" stroke-width="2"/>
      <!-- Conceptual Lego-like Architecture block with dashed boundary -->
      <path d="M18 20H46V46H18V20Z" stroke="#0D9488" stroke-width="2.2" stroke-dasharray="4 3" fill="#0D9488" fill-opacity="0.2"/>
      <rect x="24" y="14" width="6" height="6" rx="1" fill="#0D9488"/>
      <rect x="34" y="14" width="6" height="6" rx="1" fill="#0D9488"/>
      <!-- ABB Text Stamp inside -->
      <text x="32" y="36" fill="#0D9488" font-size="10" font-weight="900" font-family="sans-serif" text-anchor="middle">ABB</text>
    </svg>`
  },
  {
    key: 'togaf_sbb',
    name: 'SBB (Solution Building Block)',
    provider: 'togaf',
    category: 'compute',
    brandColor: '#0284C7',
    defaultResourceType: 'togaf_sbb',
    defaultSpecs: { count: 1, togafBuildingBlock: 'SBB' },
    description: 'TOGAF SBB: Bloco de construção de solução física/concreta (produto, fornecedor ou componente implantável)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#0284C7" fill-opacity="0.14" stroke="#0284C7" stroke-width="2"/>
      <!-- Solid Concrete Block -->
      <path d="M18 20H46V46H18V20Z" stroke="#0284C7" stroke-width="2.5" fill="#0284C7" fill-opacity="0.3"/>
      <rect x="24" y="14" width="6" height="6" rx="1" fill="#0284C7"/>
      <rect x="34" y="14" width="6" height="6" rx="1" fill="#0284C7"/>
      <circle cx="23" cy="25" r="1.5" fill="#FFFFFF"/>
      <text x="32" y="36" fill="#0284C7" font-size="10" font-weight="900" font-family="sans-serif" text-anchor="middle">SBB</text>
    </svg>`
  },

  // ==========================================
  // TOGAF ADM PHASES (Architecture Development Method)
  // ==========================================
  {
    key: 'togaf_phase_a',
    name: 'Phase A: Architecture Vision',
    provider: 'togaf',
    category: 'integration',
    brandColor: '#8B5CF6',
    defaultResourceType: 'togaf_phase_a',
    defaultSpecs: { count: 1, togafPhase: 'A' },
    description: 'TOGAF ADM Phase A: Visão da Arquitetura, escopo do projeto, identificação de stakeholders e aprovação da declaração de trabalho',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#8B5CF6" fill-opacity="0.14" stroke="#8B5CF6" stroke-width="2"/>
      <!-- Telescope / Eye / Vision symbol -->
      <path d="M16 32C16 32 22 20 32 20C42 20 48 32 48 32C48 32 42 44 32 44C22 44 16 32 16 32Z" stroke="#8B5CF6" stroke-width="2.2" fill="#8B5CF6" fill-opacity="0.2"/>
      <circle cx="32" cy="32" r="6" stroke="#8B5CF6" stroke-width="2" fill="#8B5CF6"/>
      <circle cx="34" cy="30" r="2" fill="#FFFFFF"/>
      <rect x="22" y="48" width="20" height="7" rx="3.5" fill="#8B5CF6"/>
      <text x="32" y="53.5" fill="#FFFFFF" font-size="6.5" font-weight="900" text-anchor="middle">PHASE A</text>
    </svg>`
  },
  {
    key: 'togaf_phase_b',
    name: 'Phase B: Business Architecture',
    provider: 'togaf',
    category: 'compute',
    brandColor: '#CA8A04',
    defaultResourceType: 'togaf_phase_b',
    defaultSpecs: { count: 1, togafPhase: 'B' },
    description: 'TOGAF ADM Phase B: Arquitetura de Negócio (processos, organização, estratégia e governança empresarial)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#FEF08A" fill-opacity="0.25" stroke="#CA8A04" stroke-width="2"/>
      <!-- Business enterprise building -->
      <path d="M22 44V22L32 16L42 22V44H22Z" stroke="#CA8A04" stroke-width="2" fill="#FEF08A"/>
      <rect x="26" y="24" width="3" height="3" fill="#CA8A04"/>
      <rect x="35" y="24" width="3" height="3" fill="#CA8A04"/>
      <rect x="26" y="30" width="3" height="3" fill="#CA8A04"/>
      <rect x="35" y="30" width="3" height="3" fill="#CA8A04"/>
      <rect x="30" y="37" width="4" height="7" fill="#CA8A04"/>
      <rect x="22" y="48" width="20" height="7" rx="3.5" fill="#CA8A04"/>
      <text x="32" y="53.5" fill="#FFFFFF" font-size="6.5" font-weight="900" text-anchor="middle">PHASE B</text>
    </svg>`
  },
  {
    key: 'togaf_phase_c',
    name: 'Phase C: Information Systems (App & Data)',
    provider: 'togaf',
    category: 'database',
    brandColor: '#0284C7',
    defaultResourceType: 'togaf_phase_c',
    defaultSpecs: { count: 1, togafPhase: 'C' },
    description: 'TOGAF ADM Phase C: Arquitetura de Sistemas de Informação (Arquitetura de Dados e Arquitetura de Aplicações)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#BAE6FD" fill-opacity="0.25" stroke="#0284C7" stroke-width="2"/>
      <!-- Database cylinder + App window -->
      <ellipse cx="26" cy="22" rx="9" ry="4" stroke="#0284C7" stroke-width="1.8" fill="#BAE6FD"/>
      <path d="M17 22V36C17 38.2 21 40 26 40C31 40 35 38.2 35 36V22" stroke="#0284C7" stroke-width="1.8"/>
      <path d="M17 29C17 31.2 21 33 26 33C31 33 35 31.2 35 29" stroke="#0284C7" stroke-width="1.8"/>
      <rect x="33" y="24" width="16" height="18" rx="2" stroke="#0284C7" stroke-width="1.8" fill="#38BDF8" fill-opacity="0.3"/>
      <line x1="33" y1="28" x2="49" y2="28" stroke="#0284C7" stroke-width="1.8"/>
      <rect x="22" y="48" width="20" height="7" rx="3.5" fill="#0284C7"/>
      <text x="32" y="53.5" fill="#FFFFFF" font-size="6.5" font-weight="900" text-anchor="middle">PHASE C</text>
    </svg>`
  },
  {
    key: 'togaf_phase_d',
    name: 'Phase D: Technology Architecture',
    provider: 'togaf',
    category: 'compute',
    brandColor: '#16A34A',
    defaultResourceType: 'togaf_phase_d',
    defaultSpecs: { count: 1, togafPhase: 'D' },
    description: 'TOGAF ADM Phase D: Arquitetura de Tecnologia (Infraestrutura, servidores, redes, plataformas e nuvem)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#BBF7D0" fill-opacity="0.25" stroke="#16A34A" stroke-width="2"/>
      <!-- Server rack with chips and cloud bridge -->
      <rect x="18" y="16" width="28" height="26" rx="3" stroke="#16A34A" stroke-width="2" fill="#BBF7D0"/>
      <line x1="18" y1="24" x2="46" y2="24" stroke="#16A34A" stroke-width="1.5"/>
      <line x1="18" y1="32" x2="46" y2="32" stroke="#16A34A" stroke-width="1.5"/>
      <circle cx="23" cy="20" r="1.5" fill="#16A34A"/>
      <circle cx="23" cy="28" r="1.5" fill="#16A34A"/>
      <circle cx="23" cy="36" r="1.5" fill="#16A34A"/>
      <rect x="22" y="48" width="20" height="7" rx="3.5" fill="#16A34A"/>
      <text x="32" y="53.5" fill="#FFFFFF" font-size="6.5" font-weight="900" text-anchor="middle">PHASE D</text>
    </svg>`
  },
  {
    key: 'togaf_phase_e_f',
    name: 'Phase E/F: Opportunities & Migration',
    provider: 'togaf',
    category: 'devops',
    brandColor: '#EA580C',
    defaultResourceType: 'togaf_phase_e_f',
    defaultSpecs: { count: 1, togafPhase: 'E' },
    description: 'TOGAF ADM Phase E & F: Oportunidades & Soluções e Planejamento de Migração (Roadmap e Transições)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#FFEDD5" fill-opacity="0.3" stroke="#EA580C" stroke-width="2"/>
      <!-- Migration arrow road -->
      <path d="M16 34L26 22H36L46 34" stroke="#EA580C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="16" cy="34" r="3" fill="#EA580C"/>
      <circle cx="31" cy="22" r="3" fill="#EA580C"/>
      <circle cx="46" cy="34" r="3" fill="#EA580C"/>
      <rect x="20" y="48" width="24" height="7" rx="3.5" fill="#EA580C"/>
      <text x="32" y="53.5" fill="#FFFFFF" font-size="6" font-weight="900" text-anchor="middle">PHASE E/F</text>
    </svg>`
  },
  {
    key: 'togaf_phase_g_h',
    name: 'Phase G/H: Governance & Change Management',
    provider: 'togaf',
    category: 'security',
    brandColor: '#DC2626',
    defaultResourceType: 'togaf_phase_g_h',
    defaultSpecs: { count: 1, togafPhase: 'G' },
    description: 'TOGAF ADM Phase G & H: Governança de Implementação e Gestão de Mudanças da Arquitetura',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#FEE2E2" fill-opacity="0.3" stroke="#DC2626" stroke-width="2"/>
      <!-- Shield with governance refresh cycle -->
      <path d="M32 16L44 21V31C44 38 39 43 32 46C25 43 20 38 20 31V21L32 16Z" stroke="#DC2626" stroke-width="2" fill="#DC2626" fill-opacity="0.2"/>
      <path d="M32 23V31L37 34" stroke="#DC2626" stroke-width="2" stroke-linecap="round"/>
      <rect x="20" y="48" width="24" height="7" rx="3.5" fill="#DC2626"/>
      <text x="32" y="53.5" fill="#FFFFFF" font-size="6" font-weight="900" text-anchor="middle">PHASE G/H</text>
    </svg>`
  },
  {
    key: 'togaf_architecture_contract',
    name: 'Architecture Contract (Contrato)',
    provider: 'togaf',
    category: 'integration',
    brandColor: '#0D9488',
    defaultResourceType: 'togaf_contract',
    defaultSpecs: { count: 1 },
    description: 'TOGAF Governança: Acordo entre parceiros de desenvolvimento e patrocinadores garantindo conformidade',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="8" fill="#0D9488" fill-opacity="0.14" stroke="#0D9488" stroke-width="2"/>
      <!-- Document with wax seal -->
      <rect x="18" y="16" width="28" height="34" rx="3" stroke="#0D9488" stroke-width="2" fill="#CCFBF1"/>
      <line x1="24" y1="23" x2="36" y2="23" stroke="#0D9488" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="24" y1="29" x2="40" y2="29" stroke="#0D9488" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="24" y1="35" x2="34" y2="35" stroke="#0D9488" stroke-width="1.8" stroke-linecap="round"/>
      <!-- Seal -->
      <circle cx="38" cy="42" r="5" fill="#0D9488"/>
      <path d="M38 47L36 51M38 47L40 51" stroke="#0D9488" stroke-width="1.5"/>
    </svg>`
  }
];
