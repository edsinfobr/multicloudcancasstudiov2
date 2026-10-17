import { CloudIconDefinition } from '../types';

export const AWS_FRONTEND_LOCATION_ICONS: CloudIconDefinition[] = [
  // 1. Location Service Geofence (from Res_Amazon-Location-Service_Geofence_48.png)
  {
    key: 'aws_location_geofence',
    name: 'Location Service Geofence',
    provider: 'aws',
    category: 'integration',
    brandColor: '#DE1D43',
    defaultResourceType: 'aws_location_geofence_collection',
    defaultSpecs: { count: 1 },
    description: 'Gerenciamento de cercas virtuais (geofences) e alertas de proximidade geográfica no Amazon Location Service',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Back square geofence -->
      <polygon points="27,6 59,4 56,33 24,35" stroke="#DE1D43" stroke-width="3" stroke-linejoin="round" fill="#DE1D43" fill-opacity="0.06"/>
      <!-- Front pentagonal geofence -->
      <polygon points="8,20 38,16 45,43 26,60 5,54" stroke="#DE1D43" stroke-width="3" stroke-linejoin="round" fill="#DE1D43" fill-opacity="0.08"/>
    </svg>`
  },

  // 2. Location Service Map (from Res_Amazon-Location-Service_Map _48.png)
  {
    key: 'aws_location_map',
    name: 'Location Service Map',
    provider: 'aws',
    category: 'integration',
    brandColor: '#DE1D43',
    defaultResourceType: 'aws_location_map',
    defaultSpecs: { count: 1 },
    description: 'Renderização de mapas geoespaciais digitais e camadas de navegação no Amazon Location Service',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 3 folded panels outline -->
      <path d="M 6 8 L 23 13 L 41 8 L 58 13 V 56 L 41 51 L 23 56 L 6 51 Z" stroke="#DE1D43" stroke-width="3" stroke-linejoin="round" fill="#DE1D43" fill-opacity="0.06"/>
      <!-- Vertical Creases -->
      <line x1="23" y1="13" x2="23" y2="56" stroke="#DE1D43" stroke-width="2.8"/>
      <line x1="41" y1="8" x2="41" y2="51" stroke="#DE1D43" stroke-width="2.8"/>
      <!-- Horizontal Fold Line -->
      <path d="M 6 30 L 23 35 L 41 30 L 58 35" stroke="#DE1D43" stroke-width="2.5" stroke-linejoin="round"/>
    </svg>`
  },

  // 3. Location Service Place (from Res_Amazon-Location-Service_Place_48.png)
  {
    key: 'aws_location_place',
    name: 'Location Service Place',
    provider: 'aws',
    category: 'integration',
    brandColor: '#DE1D43',
    defaultResourceType: 'aws_location_place_index',
    defaultSpecs: { count: 1 },
    description: 'Geocodificação direta e reversa, busca de endereços e pontos de interesse (POI) no Amazon Location Service',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Map Marker Pin Outline -->
      <path d="M 32 58 C 32 58 12 36 12 22 C 12 11 21 2 32 2 C 43 2 52 11 52 22 C 52 36 32 58 32 58 Z" stroke="#DE1D43" stroke-width="3.2" stroke-linejoin="round" fill="#DE1D43" fill-opacity="0.06"/>
      <!-- Center Hole -->
      <circle cx="32" cy="22" r="7.5" stroke="#DE1D43" stroke-width="3" fill="#ffffff"/>
    </svg>`
  },

  // 4. Location Service Routes (from Res_Amazon-Location-Service_Routes_48.png)
  {
    key: 'aws_location_routes',
    name: 'Location Service Routes',
    provider: 'aws',
    category: 'integration',
    brandColor: '#DE1D43',
    defaultResourceType: 'aws_location_route_calculator',
    defaultSpecs: { count: 1 },
    description: 'Cálculo de itinerários, estimativa de distâncias e planejamento de rotas no Amazon Location Service',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Dashed Route Path -->
      <path d="M 9 9 H 32 L 53 27 L 38 43 L 28 34 L 9 53" stroke="#DE1D43" stroke-width="3" stroke-dasharray="4 4" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- 3 Node Rings -->
      <circle cx="9" cy="9" r="4.5" stroke="#DE1D43" stroke-width="3" fill="#ffffff"/>
      <circle cx="53" cy="27" r="4.5" stroke="#DE1D43" stroke-width="3" fill="#ffffff"/>
      <circle cx="9" cy="53" r="4.5" stroke="#DE1D43" stroke-width="3" fill="#ffffff"/>
    </svg>`
  },

  // 5. Location Service Track (from Res_Amazon-Location-Service_Track _48.png)
  {
    key: 'aws_location_track',
    name: 'Location Service Track',
    provider: 'aws',
    category: 'integration',
    brandColor: '#DE1D43',
    defaultResourceType: 'aws_location_tracker',
    defaultSpecs: { count: 1 },
    description: 'Rastreamento contínuo de dispositivos móveis e telemetria de frota no Amazon Location Service',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Solid Tracking Path -->
      <path d="M 9 9 H 33 L 53 27 L 38 44 L 28 33 L 9 53" stroke="#DE1D43" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- 6 Waypoint Nodes -->
      <circle cx="9" cy="9" r="4.5" stroke="#DE1D43" stroke-width="3" fill="#ffffff"/>
      <circle cx="33" cy="9" r="4.5" stroke="#DE1D43" stroke-width="3" fill="#ffffff"/>
      <circle cx="53" cy="27" r="4.5" stroke="#DE1D43" stroke-width="3" fill="#ffffff"/>
      <circle cx="38" cy="44" r="4.5" stroke="#DE1D43" stroke-width="3" fill="#ffffff"/>
      <circle cx="28" cy="33" r="4.5" stroke="#DE1D43" stroke-width="3" fill="#ffffff"/>
      <circle cx="9" cy="53" r="4.5" stroke="#DE1D43" stroke-width="3" fill="#ffffff"/>
    </svg>`
  },

  // 6. Amplify Studio (from Res_AWS-Amplify_AWS-Amplify-Studio_48.png)
  {
    key: 'aws_amplify_studio',
    name: 'Amplify Studio',
    provider: 'aws',
    category: 'devops',
    brandColor: '#DE1D43',
    defaultResourceType: 'aws_amplify_app',
    defaultSpecs: { count: 1 },
    description: 'Interface visual para criação rápida de aplicativos web e mobile com AWS Amplify',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Top UI Window Bar -->
      <rect x="4" y="6" width="56" height="15" rx="2" stroke="#DE1D43" stroke-width="3" fill="#DE1D43" fill-opacity="0.06"/>
      <line x1="9" y1="13.5" x2="38" y2="13.5" stroke="#DE1D43" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="44" y1="13.5" x2="52" y2="13.5" stroke="#DE1D43" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Interacting Hand Pointer -->
      <path d="M 23 18 L 16 28 C 14.5 30 15 33 17 35 L 21 39 L 29 48 C 31.5 51 35.5 51.5 38.5 49 L 48 41 C 51 38.5 51.5 34.5 49 31.5 L 43 24 C 41 21.5 37.5 21 35 23 L 30 27 L 23 18 Z" stroke="#DE1D43" stroke-width="3" stroke-linejoin="round" fill="#ffffff"/>
      <path d="M 33 29 L 40 24 M 36 33 L 43 28 M 39 37 L 46 32" stroke="#DE1D43" stroke-width="2.2" stroke-linecap="round"/>
    </svg>`
  }
];
