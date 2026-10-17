import { CloudIconDefinition } from '../types';

export const AWS_BRAKET_ICONS: CloudIconDefinition[] = [
  // 1. Amazon Braket Chandelier (Dilution Refrigerator)
  {
    key: 'aws_braket_chandelier',
    name: 'Amazon Braket Chandelier',
    provider: 'aws',
    category: 'compute',
    brandColor: '#E76200',
    defaultResourceType: 'aws_braket_quantum_task',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Refrigerador criogênico de diluição (Chandelier) para processamento quântico de hardware supercondutor',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#E76200" fill-opacity="0.12" stroke="#E76200" stroke-width="1.5"/>
      <!-- Top Support Brackets -->
      <path d="M16 11V17H20" stroke="#E76200" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M48 11V17H44" stroke="#E76200" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Top Stage Tubes -->
      <line x1="24" y1="12" x2="24" y2="23" stroke="#E76200" stroke-width="3" stroke-linecap="round"/>
      <line x1="29.5" y1="12" x2="29.5" y2="23" stroke="#E76200" stroke-width="3" stroke-linecap="round"/>
      <line x1="34.5" y1="12" x2="34.5" y2="23" stroke="#E76200" stroke-width="3" stroke-linecap="round"/>
      <line x1="40" y1="12" x2="40" y2="23" stroke="#E76200" stroke-width="3" stroke-linecap="round"/>
      <!-- First Flange / Horizontal Plate -->
      <line x1="21" y1="24" x2="43" y2="24" stroke="#E76200" stroke-width="3" stroke-linecap="round"/>
      <!-- Middle Stage Tubes -->
      <line x1="24" y1="28" x2="24" y2="39" stroke="#E76200" stroke-width="3" stroke-linecap="round"/>
      <line x1="29.5" y1="28" x2="29.5" y2="39" stroke="#E76200" stroke-width="3" stroke-linecap="round"/>
      <line x1="34.5" y1="28" x2="34.5" y2="39" stroke="#E76200" stroke-width="3" stroke-linecap="round"/>
      <line x1="40" y1="28" x2="40" y2="39" stroke="#E76200" stroke-width="3" stroke-linecap="round"/>
      <!-- Second Flange / Horizontal Plate -->
      <line x1="21" y1="40" x2="43" y2="40" stroke="#E76200" stroke-width="3" stroke-linecap="round"/>
      <!-- Bottom Stage Stem -->
      <line x1="29" y1="44" x2="29" y2="48" stroke="#E76200" stroke-width="3" stroke-linecap="round"/>
      <line x1="35" y1="44" x2="35" y2="48" stroke="#E76200" stroke-width="3" stroke-linecap="round"/>
      <!-- Quantum Mixing Chamber / Chip Base -->
      <rect x="28" y="50" width="8" height="6" rx="1.5" stroke="#E76200" stroke-width="2.5" fill="none"/>
    </svg>`
  },

  // 2. Amazon Braket Chip
  {
    key: 'aws_braket_chip',
    name: 'Amazon Braket Quantum Chip',
    provider: 'aws',
    category: 'compute',
    brandColor: '#E76200',
    defaultResourceType: 'aws_braket_quantum_task',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Processador e circuito integrado quântico com barramento de acoplamento e qubits integrados',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#E76200" fill-opacity="0.12" stroke="#E76200" stroke-width="1.5"/>
      <!-- Bottom-Right Chip L-Frame -->
      <path d="M49 22V49H22" stroke="#E76200" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Inner Chip Core L-Frame -->
      <path d="M42 29V42H29" stroke="#E76200" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Pins Bottom -->
      <line x1="25" y1="49" x2="25" y2="54" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="30" y1="49" x2="30" y2="54" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="35" y1="49" x2="35" y2="54" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="49" x2="40" y2="54" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="45" y1="49" x2="45" y2="54" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <!-- Pins Right -->
      <line x1="49" y1="25" x2="54" y2="25" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="49" y1="30" x2="54" y2="30" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="49" y1="35" x2="54" y2="35" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="49" y1="40" x2="54" y2="40" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="49" y1="45" x2="54" y2="45" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <!-- Top-Left Pins -->
      <line x1="21" y1="14" x2="21" y2="19" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="27" y1="14" x2="27" y2="19" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="14" y1="21" x2="19" y2="21" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="14" y1="27" x2="19" y2="27" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <!-- Diagonal Qubit Bus with interconnected nodes -->
      <path d="M17 52C14 47 16 38 21 34L40 15C45 10 52 12 55 16" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <!-- Qubit Nodes -->
      <circle cx="17" cy="40" r="3.5" stroke="#E76200" stroke-width="2" fill="#FFF3EB"/>
      <circle cx="27" cy="30" r="3.5" stroke="#E76200" stroke-width="2" fill="#FFF3EB"/>
      <circle cx="40" cy="17" r="3.5" stroke="#E76200" stroke-width="2" fill="#FFF3EB"/>
    </svg>`
  },

  // 3. Amazon Braket Embedded Simulator
  {
    key: 'aws_braket_embedded_simulator',
    name: 'Amazon Braket Embedded Simulator',
    provider: 'aws',
    category: 'compute',
    brandColor: '#E76200',
    defaultResourceType: 'aws_braket_quantum_task',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Simulador quântico embutido e local executado em memória no ambiente de código ou notebook',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#E76200" fill-opacity="0.12" stroke="#E76200" stroke-width="1.5"/>
      <!-- Outer Chip Frame -->
      <rect x="18" y="18" width="28" height="28" rx="3" stroke="#E76200" stroke-width="2.5" fill="none"/>
      <!-- Top Pins -->
      <line x1="24" y1="12" x2="24" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="29" y1="12" x2="29" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="35" y1="12" x2="35" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="12" x2="40" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <!-- Bottom Pins -->
      <line x1="24" y1="46" x2="24" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="29" y1="46" x2="29" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="35" y1="46" x2="35" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="46" x2="40" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <!-- Left Pins -->
      <line x1="12" y1="24" x2="18" y2="24" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="29" x2="18" y2="29" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="35" x2="18" y2="35" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="40" x2="18" y2="40" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <!-- Right Pins -->
      <line x1="46" y1="24" x2="52" y2="24" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="29" x2="52" y2="29" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="35" x2="52" y2="35" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="40" x2="52" y2="40" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <!-- Embedded Virtual/Dashed Inner Boundary -->
      <rect x="25" y="25" width="14" height="14" rx="2" stroke="#E76200" stroke-width="2.5" stroke-dasharray="3.5 3" fill="none"/>
    </svg>`
  },

  // 4. Amazon Braket Managed Simulator
  {
    key: 'aws_braket_managed_simulator',
    name: 'Amazon Braket Managed Simulator',
    provider: 'aws',
    category: 'compute',
    brandColor: '#E76200',
    defaultResourceType: 'aws_braket_quantum_task',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Simulador quântico totalmente gerenciado na AWS para execução escalável de circuitos na nuvem',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#E76200" fill-opacity="0.12" stroke="#E76200" stroke-width="1.5"/>
      <!-- Outer Chip Frame -->
      <rect x="18" y="18" width="28" height="28" rx="3" stroke="#E76200" stroke-width="2.5" fill="none"/>
      <!-- Pins Top, Bottom, Left, Right -->
      <line x1="24" y1="12" x2="24" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="29" y1="12" x2="29" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="35" y1="12" x2="35" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="12" x2="40" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="46" x2="24" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="29" y1="46" x2="29" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="35" y1="46" x2="35" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="46" x2="40" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="24" x2="18" y2="24" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="29" x2="18" y2="29" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="35" x2="18" y2="35" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="40" x2="18" y2="40" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="24" x2="52" y2="24" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="29" x2="52" y2="29" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="35" x2="52" y2="35" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="40" x2="52" y2="40" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <!-- Inner Managed Gear/Cogwheel -->
      <path d="M30 25H34V27.2C35 27.5 35.8 28 36.6 28.7L38.4 27.2L40.8 29.6L39.3 31.4C40 32.2 40.5 33 40.8 34H43V38H40.8C40.5 39 40 39.8 39.3 40.6L40.8 42.4L38.4 44.8L36.6 43.3C35.8 44 35 44.5 34 44.8V47H30V44.8C29 44.5 28.2 44 27.4 43.3L25.6 44.8L23.2 42.4L24.7 40.6C24 39.8 23.5 39 23.2 38H21V34H23.2C23.5 33 24 32.2 24.7 31.4L23.2 29.6L25.6 27.2L27.4 28.7C28.2 28 29 27.5 30 27.2V25Z" stroke="#E76200" stroke-width="2" stroke-linejoin="round" fill="none"/>
      <circle cx="32" cy="36" r="3.5" stroke="#E76200" stroke-width="2" fill="#FFF3EB"/>
    </svg>`
  },

  // 5. Amazon Braket Noise Simulator (DM1)
  {
    key: 'aws_braket_noise_simulator',
    name: 'Amazon Braket Noise Simulator (DM1)',
    provider: 'aws',
    category: 'compute',
    brandColor: '#E76200',
    defaultResourceType: 'aws_braket_quantum_task',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Simulador quântico de matriz de densidade (DM1) para modelagem de ruído quântico e decoerência',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#E76200" fill-opacity="0.12" stroke="#E76200" stroke-width="1.5"/>
      <!-- Greek Rho (ρ) Symbol representing density matrix / noise -->
      <path d="M17 14V46" stroke="#E76200" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M17 21C17 16 32 16 32 27C32 37 17 37 17 33" stroke="#E76200" stroke-width="3" stroke-linecap="round" fill="none"/>
      <!-- Quantum Atom / Qubit Orbitals (Bottom Right) -->
      <g transform="translate(44, 43)">
        <!-- Core -->
        <circle cx="0" cy="0" r="2.5" fill="#E76200"/>
        <!-- Orbit 1 Horizontal -->
        <ellipse cx="0" cy="0" rx="11" ry="4.5" stroke="#E76200" stroke-width="2" fill="none"/>
        <!-- Orbit 2 Rotated 60deg -->
        <ellipse cx="0" cy="0" rx="11" ry="4.5" stroke="#E76200" stroke-width="2" fill="none" transform="rotate(60)"/>
        <!-- Orbit 3 Rotated -60deg -->
        <ellipse cx="0" cy="0" rx="11" ry="4.5" stroke="#E76200" stroke-width="2" fill="none" transform="rotate(-60)"/>
      </g>
    </svg>`
  },

  // 6. Amazon Braket QPU (Quantum Processing Unit)
  {
    key: 'aws_braket_qpu',
    name: 'Amazon Braket QPU',
    provider: 'aws',
    category: 'compute',
    brandColor: '#E76200',
    defaultResourceType: 'aws_braket_quantum_task',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Unidade de processamento quântico física real (hardware IonQ, Rigetti, QuEra, OQC, IQM)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#E76200" fill-opacity="0.12" stroke="#E76200" stroke-width="1.5"/>
      <!-- Top and Left Chip Frame with Pins -->
      <path d="M48 16H18V48" stroke="#E76200" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M41 23H25V39" stroke="#E76200" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Top Pins -->
      <line x1="22" y1="10" x2="22" y2="16" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="28" y1="10" x2="28" y2="16" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="34" y1="10" x2="34" y2="16" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="10" x2="40" y2="16" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <!-- Left Pins -->
      <line x1="12" y1="22" x2="18" y2="22" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="28" x2="18" y2="28" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="34" x2="18" y2="34" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="40" x2="18" y2="40" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <!-- QPU Quantum Atom in Bottom-Right -->
      <g transform="translate(43, 43)">
        <circle cx="0" cy="0" r="2.5" fill="#E76200"/>
        <ellipse cx="0" cy="0" rx="11" ry="4.5" stroke="#E76200" stroke-width="2" fill="none"/>
        <ellipse cx="0" cy="0" rx="11" ry="4.5" stroke="#E76200" stroke-width="2" fill="none" transform="rotate(60)"/>
        <ellipse cx="0" cy="0" rx="11" ry="4.5" stroke="#E76200" stroke-width="2" fill="none" transform="rotate(-60)"/>
      </g>
    </svg>`
  },

  // 7. Amazon Braket Simulator (Console / Web Interface)
  {
    key: 'aws_braket_simulator',
    name: 'Amazon Braket Simulator',
    provider: 'aws',
    category: 'compute',
    brandColor: '#E76200',
    defaultResourceType: 'aws_braket_quantum_task',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Interface web e console gerenciado para simulação quântica interativa e notebooks Jupyter',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#E76200" fill-opacity="0.12" stroke="#E76200" stroke-width="1.5"/>
      <!-- Window Outline -->
      <rect x="14" y="14" width="36" height="32" rx="3" stroke="#E76200" stroke-width="2.5" fill="none"/>
      <!-- Window Header Bar -->
      <line x1="14" y1="23" x2="50" y2="23" stroke="#E76200" stroke-width="2"/>
      <!-- Window Header Dots -->
      <circle cx="19" cy="18.5" r="1.5" fill="#E76200"/>
      <circle cx="24" cy="18.5" r="1.5" fill="#E76200"/>
      <circle cx="29" cy="18.5" r="1.5" fill="#E76200"/>
      <!-- Quantum Atom Symbol (Bottom Right Overlay) -->
      <g transform="translate(44, 43)">
        <circle cx="0" cy="0" r="2.5" fill="#E76200"/>
        <ellipse cx="0" cy="0" rx="11" ry="4.5" stroke="#E76200" stroke-width="2" fill="none"/>
        <ellipse cx="0" cy="0" rx="11" ry="4.5" stroke="#E76200" stroke-width="2" fill="none" transform="rotate(60)"/>
        <ellipse cx="0" cy="0" rx="11" ry="4.5" stroke="#E76200" stroke-width="2" fill="none" transform="rotate(-60)"/>
      </g>
    </svg>`
  },

  // 8. Amazon Braket Simulator 1 (Quantum Gate Chip)
  {
    key: 'aws_braket_simulator_1',
    name: 'Amazon Braket Simulator 1',
    provider: 'aws',
    category: 'compute',
    brandColor: '#E76200',
    defaultResourceType: 'aws_braket_quantum_task',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Simulador de circuitos quânticos baseado em chip com portas de superposição e entrelaçamento',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#E76200" fill-opacity="0.12" stroke="#E76200" stroke-width="1.5"/>
      <!-- Outer Chip Frame -->
      <rect x="18" y="18" width="28" height="28" rx="3" stroke="#E76200" stroke-width="2.5" fill="none"/>
      <!-- Pins -->
      <line x1="24" y1="12" x2="24" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="29" y1="12" x2="29" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="35" y1="12" x2="35" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="12" x2="40" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="46" x2="24" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="29" y1="46" x2="29" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="35" y1="46" x2="35" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="46" x2="40" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="24" x2="18" y2="24" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="29" x2="18" y2="29" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="35" x2="18" y2="35" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="40" x2="18" y2="40" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="24" x2="52" y2="24" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="29" x2="52" y2="29" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="35" x2="52" y2="35" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="40" x2="52" y2="40" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <!-- Inner Quantum Atom Orbitals -->
      <g transform="translate(32, 32)">
        <circle cx="0" cy="0" r="2.5" fill="#E76200"/>
        <ellipse cx="0" cy="0" rx="9" ry="3.5" stroke="#E76200" stroke-width="1.8" fill="none"/>
        <ellipse cx="0" cy="0" rx="9" ry="3.5" stroke="#E76200" stroke-width="1.8" fill="none" transform="rotate(60)"/>
        <ellipse cx="0" cy="0" rx="9" ry="3.5" stroke="#E76200" stroke-width="1.8" fill="none" transform="rotate(-60)"/>
      </g>
    </svg>`
  },

  // 9. Amazon Braket Simulator 2 (Multi-Qubit Entanglement)
  {
    key: 'aws_braket_simulator_2',
    name: 'Amazon Braket Simulator 2',
    provider: 'aws',
    category: 'compute',
    brandColor: '#E76200',
    defaultResourceType: 'aws_braket_quantum_task',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Simulador quântico de estados de entrelaçamento multi-qubit com nós circulares coordenados',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#E76200" fill-opacity="0.12" stroke="#E76200" stroke-width="1.5"/>
      <!-- Outer Chip Frame -->
      <rect x="18" y="18" width="28" height="28" rx="3" stroke="#E76200" stroke-width="2.5" fill="none"/>
      <!-- Pins -->
      <line x1="24" y1="12" x2="24" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="29" y1="12" x2="29" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="35" y1="12" x2="35" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="12" x2="40" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="46" x2="24" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="29" y1="46" x2="29" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="35" y1="46" x2="35" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="46" x2="40" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="24" x2="18" y2="24" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="29" x2="18" y2="29" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="35" x2="18" y2="35" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="40" x2="18" y2="40" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="24" x2="52" y2="24" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="29" x2="52" y2="29" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="35" x2="52" y2="35" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="40" x2="52" y2="40" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <!-- Inner Orbit Ring -->
      <circle cx="32" cy="32" r="7.5" stroke="#E76200" stroke-width="1.8" fill="none"/>
      <!-- Center Qubit Nucleus -->
      <circle cx="32" cy="32" r="2" fill="#E76200"/>
      <!-- 3 Orbiting Qubit Dots -->
      <circle cx="27" cy="27" r="2.5" stroke="#E76200" stroke-width="1.5" fill="#FFF3EB"/>
      <circle cx="38" cy="29" r="2.5" stroke="#E76200" stroke-width="1.5" fill="#FFF3EB"/>
      <circle cx="30" cy="38" r="2.5" stroke="#E76200" stroke-width="1.5" fill="#FFF3EB"/>
    </svg>`
  },

  // 10. Amazon Braket Simulator 3 (Analog Hamiltonian Simulation / AHS)
  {
    key: 'aws_braket_simulator_3',
    name: 'Amazon Braket Simulator 3 (AHS)',
    provider: 'aws',
    category: 'compute',
    brandColor: '#E76200',
    defaultResourceType: 'aws_braket_quantum_task',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Simulador de simulação analógica hamiltoniana (AHS) e dinâmica contínua de matrizes atômicas',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#E76200" fill-opacity="0.12" stroke="#E76200" stroke-width="1.5"/>
      <!-- Outer Chip Frame -->
      <rect x="18" y="18" width="28" height="28" rx="3" stroke="#E76200" stroke-width="2.5" fill="none"/>
      <!-- Pins -->
      <line x1="24" y1="12" x2="24" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="29" y1="12" x2="29" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="35" y1="12" x2="35" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="12" x2="40" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="46" x2="24" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="29" y1="46" x2="29" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="35" y1="46" x2="35" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="46" x2="40" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="24" x2="18" y2="24" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="29" x2="18" y2="29" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="35" x2="18" y2="35" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="40" x2="18" y2="40" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="24" x2="52" y2="24" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="29" x2="52" y2="29" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="35" x2="52" y2="35" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="40" x2="52" y2="40" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <!-- Inner Continuous Hamiltonian Wave Curve -->
      <path d="M23 27C24.5 27 28 41 32 41C36 41 39.5 27 41 27" stroke="#E76200" stroke-width="3" stroke-linecap="round" fill="none"/>
    </svg>`
  },

  // 11. Amazon Braket Simulator 4 (Pulse Control / Cross-Resonance)
  {
    key: 'aws_braket_simulator_4',
    name: 'Amazon Braket Simulator 4 (Pulse)',
    provider: 'aws',
    category: 'compute',
    brandColor: '#E76200',
    defaultResourceType: 'aws_braket_quantum_task',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Simulador de controle em nível de pulso analógico e calibração de micro-ondas em portas quânticas',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#E76200" fill-opacity="0.12" stroke="#E76200" stroke-width="1.5"/>
      <!-- Outer Chip Frame -->
      <rect x="18" y="18" width="28" height="28" rx="3" stroke="#E76200" stroke-width="2.5" fill="none"/>
      <!-- Pins -->
      <line x1="24" y1="12" x2="24" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="29" y1="12" x2="29" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="35" y1="12" x2="35" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="12" x2="40" y2="18" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="24" y1="46" x2="24" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="29" y1="46" x2="29" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="35" y1="46" x2="35" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="46" x2="40" y2="52" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="24" x2="18" y2="24" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="29" x2="18" y2="29" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="35" x2="18" y2="35" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="12" y1="40" x2="18" y2="40" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="24" x2="52" y2="24" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="29" x2="52" y2="29" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="35" x2="52" y2="35" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <line x1="46" y1="40" x2="52" y2="40" stroke="#E76200" stroke-width="2" stroke-linecap="round"/>
      <!-- Inner Pulse Line with Crossing Star -->
      <line x1="23" y1="32" x2="41" y2="32" stroke="#E76200" stroke-width="3" stroke-linecap="round"/>
      <line x1="27" y1="25" x2="37" y2="39" stroke="#E76200" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="27" y1="39" x2="37" y2="25" stroke="#E76200" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // 12. Amazon Braket State Vector Simulator (SV1)
  {
    key: 'aws_braket_state_vector',
    name: 'Amazon Braket State Vector (SV1)',
    provider: 'aws',
    category: 'compute',
    brandColor: '#E76200',
    defaultResourceType: 'aws_braket_quantum_task',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Simulador quântico de vetor de estado universal (SV1) para simulação de até 34 qubits exatos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#E76200" fill-opacity="0.12" stroke="#E76200" stroke-width="1.5"/>
      <!-- Greek Psi (Ψ) Wavefunction Symbol -->
      <!-- Center Stem -->
      <line x1="25" y1="13" x2="25" y2="46" stroke="#E76200" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Outer Fork -->
      <path d="M16 16V28C16 35 34 35 34 28V16" stroke="#E76200" stroke-width="3" stroke-linecap="round" fill="none"/>
      <!-- Quantum Atom Symbol (Bottom Right) -->
      <g transform="translate(44, 43)">
        <circle cx="0" cy="0" r="2.5" fill="#E76200"/>
        <ellipse cx="0" cy="0" rx="11" ry="4.5" stroke="#E76200" stroke-width="2" fill="none"/>
        <ellipse cx="0" cy="0" rx="11" ry="4.5" stroke="#E76200" stroke-width="2" fill="none" transform="rotate(60)"/>
        <ellipse cx="0" cy="0" rx="11" ry="4.5" stroke="#E76200" stroke-width="2" fill="none" transform="rotate(-60)"/>
      </g>
    </svg>`
  },

  // 13. Amazon Braket Tensor Network Simulator (TN1)
  {
    key: 'aws_braket_tensor_network',
    name: 'Amazon Braket Tensor Network (TN1)',
    provider: 'aws',
    category: 'compute',
    brandColor: '#E76200',
    defaultResourceType: 'aws_braket_quantum_task',
    defaultSpecs: { count: 1, region: 'us-east-1' },
    description: 'Simulador quântico de redes tensoriais (TN1) para circuitos estruturados e até 50 qubits',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#E76200" fill-opacity="0.12" stroke="#E76200" stroke-width="1.5"/>
      <!-- Tensor Network Graph on Top-Left -->
      <!-- Tensor Connections -->
      <line x1="16" y1="17" x2="23" y2="27" stroke="#E76200" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="23" y1="27" x2="33" y2="17" stroke="#E76200" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="23" y1="27" x2="23" y2="39" stroke="#E76200" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="23" y1="39" x2="16" y2="44" stroke="#E76200" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="23" y1="39" x2="31" y2="39" stroke="#E76200" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="31" y1="39" x2="35" y2="47" stroke="#E76200" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Separate right branch -->
      <line x1="47" y1="17" x2="43" y2="25" stroke="#E76200" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Tensor Nodes (Square Quarks/Tensors) -->
      <rect x="14" y="14" width="4.5" height="4.5" rx="1" stroke="#E76200" stroke-width="2" fill="#FFF3EB"/>
      <rect x="31" y="14" width="4.5" height="4.5" rx="1" stroke="#E76200" stroke-width="2" fill="#FFF3EB"/>
      <rect x="45" y="14" width="4.5" height="4.5" rx="1" stroke="#E76200" stroke-width="2" fill="#FFF3EB"/>
      <rect x="21" y="25" width="4.5" height="4.5" rx="1" stroke="#E76200" stroke-width="2" fill="#FFF3EB"/>
      <rect x="21" y="37" width="4.5" height="4.5" rx="1" stroke="#E76200" stroke-width="2" fill="#FFF3EB"/>
      <rect x="14" y="42" width="4.5" height="4.5" rx="1" stroke="#E76200" stroke-width="2" fill="#FFF3EB"/>
      <rect x="33" y="45" width="4.5" height="4.5" rx="1" stroke="#E76200" stroke-width="2" fill="#FFF3EB"/>
      <!-- Quantum Atom Symbol (Bottom Right) -->
      <g transform="translate(44, 43)">
        <circle cx="0" cy="0" r="2.5" fill="#E76200"/>
        <ellipse cx="0" cy="0" rx="11" ry="4.5" stroke="#E76200" stroke-width="2" fill="none"/>
        <ellipse cx="0" cy="0" rx="11" ry="4.5" stroke="#E76200" stroke-width="2" fill="none" transform="rotate(60)"/>
        <ellipse cx="0" cy="0" rx="11" ry="4.5" stroke="#E76200" stroke-width="2" fill="none" transform="rotate(-60)"/>
      </g>
    </svg>`
  }
];
