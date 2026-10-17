import { CloudIconDefinition } from '../types';

export const AWS_MEDIA_ICONS: CloudIconDefinition[] = [
  // 1. Cloud Digital Interface (from Res_AWS-Cloud-Digital-Interface_48.png)
  {
    key: 'aws_cloud_digital_interface',
    name: 'Cloud Digital Interface',
    provider: 'aws',
    category: 'integration',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_media_flow',
    defaultSpecs: { count: 1 },
    description: 'Transporte de vídeo ao vivo sem compactação e com latência ultra-baixa na nuvem (AWS CDI)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Central Hexagon -->
      <polygon points="32,16 46,24 46,40 32,48 18,40 18,24" stroke="#ED7100" stroke-width="3" stroke-linejoin="round" fill="#ffffff"/>
      <!-- Play Triangle -->
      <polygon points="28,26 38,32 28,38" stroke="#ED7100" stroke-width="2.5" stroke-linejoin="round" fill="#ED7100" fill-opacity="0.2"/>
      <!-- Upper Orbital Stream Arc -->
      <path d="M 6 32 C 6 18 17 6 32 6 C 40 6 47 9 52 15" stroke="#ED7100" stroke-width="3" stroke-linecap="round"/>
      <circle cx="51.5" cy="20.5" r="4.2" stroke="#ED7100" stroke-width="3" fill="#ffffff"/>
      <!-- Lower Orbital Stream Arc -->
      <path d="M 58 32 C 58 46 47 58 32 58 C 24 58 17 55 12 49" stroke="#ED7100" stroke-width="3" stroke-linecap="round"/>
      <circle cx="12.5" cy="43.5" r="4.2" stroke="#ED7100" stroke-width="3" fill="#ffffff"/>
    </svg>`
  },

  // 2. Elemental MediaConnect Gateway (from Res_AWS-Elemental-MediaConnect_MediaConnect-Gateway_48.png)
  {
    key: 'aws_elemental_mediaconnect_gateway',
    name: 'Elemental MediaConnect Gateway',
    provider: 'aws',
    category: 'integration',
    brandColor: '#ED7100',
    defaultResourceType: 'aws_media_connect_gateway',
    defaultSpecs: { count: 1 },
    description: 'Gateway de ingestão, ponte de rede e distribuição segura de transmissões de vídeo ao vivo em tempo real',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Radial Spokes to 6 nodes -->
      <line x1="32" y1="32" x2="10" y2="32" stroke="#ED7100" stroke-width="3" stroke-linecap="round"/>
      <line x1="32" y1="32" x2="54" y2="32" stroke="#ED7100" stroke-width="3" stroke-linecap="round"/>
      <line x1="32" y1="32" x2="20" y2="13" stroke="#ED7100" stroke-width="3" stroke-linecap="round"/>
      <line x1="32" y1="32" x2="44" y2="13" stroke="#ED7100" stroke-width="3" stroke-linecap="round"/>
      <line x1="32" y1="32" x2="20" y2="51" stroke="#ED7100" stroke-width="3" stroke-linecap="round"/>
      <line x1="32" y1="32" x2="44" y2="51" stroke="#ED7100" stroke-width="3" stroke-linecap="round"/>
      
      <!-- 6 Outer Distribution Nodes -->
      <circle cx="10" cy="32" r="4" stroke="#ED7100" stroke-width="3" fill="#ffffff"/>
      <circle cx="54" cy="32" r="4" stroke="#ED7100" stroke-width="3" fill="#ffffff"/>
      <circle cx="20" cy="13" r="4" stroke="#ED7100" stroke-width="3" fill="#ffffff"/>
      <circle cx="44" cy="13" r="4" stroke="#ED7100" stroke-width="3" fill="#ffffff"/>
      <circle cx="20" cy="51" r="4" stroke="#ED7100" stroke-width="3" fill="#ffffff"/>
      <circle cx="44" cy="51" r="4" stroke="#ED7100" stroke-width="3" fill="#ffffff"/>

      <!-- Central Hexagon Core -->
      <polygon points="32,17 45,24.5 45,39.5 32,47 19,39.5 19,24.5" stroke="#ED7100" stroke-width="3" stroke-linejoin="round" fill="#ffffff"/>
      <!-- Play Triangle -->
      <polygon points="28,26 38,32 28,38" stroke="#ED7100" stroke-width="2.5" stroke-linejoin="round" fill="#ED7100" fill-opacity="0.2"/>
    </svg>`
  }
];
