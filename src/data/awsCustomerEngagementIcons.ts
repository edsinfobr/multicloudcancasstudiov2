import { CloudIconDefinition } from '../types';

export const AWS_CUSTOMER_ENGAGEMENT_ICONS: CloudIconDefinition[] = [
  // 1. Pinpoint Journey (from Res_Amazon-Pinpoint_Journey_48.png)
  {
    key: 'aws_pinpoint_journey',
    name: 'Pinpoint Journey',
    provider: 'aws',
    category: 'integration',
    brandColor: '#E7157B',
    defaultResourceType: 'aws_pinpoint_app',
    defaultSpecs: { count: 1 },
    description: 'Jornada de engajamento do cliente e fluxos de automação de campanhas multicanal no Amazon Pinpoint',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Target at bottom-left -->
      <path d="M 29.5 32.5 A 13.5 13.5 0 1 0 33.5 42" stroke="#E7157B" stroke-width="3" stroke-linecap="round"/>
      <circle cx="20" cy="42" r="5.5" stroke="#E7157B" stroke-width="3"/>
      <!-- Connecting line from target to central node -->
      <line x1="20" y1="42" x2="35" y2="27" stroke="#E7157B" stroke-width="3.2" stroke-linecap="round"/>
      <!-- Node 1 (Center) -->
      <circle cx="35" cy="27" r="4.5" stroke="#E7157B" stroke-width="3" fill="#ffffff"/>
      <!-- Branch to Node 2 (Top) -->
      <line x1="35" y1="27" x2="28" y2="12" stroke="#E7157B" stroke-width="3.2" stroke-linecap="round"/>
      <circle cx="28" cy="12" r="4.5" stroke="#E7157B" stroke-width="3" fill="#ffffff"/>
      <!-- Branch to Node 3 (Right) -->
      <line x1="35" y1="27" x2="52" y2="27" stroke="#E7157B" stroke-width="3.2" stroke-linecap="round"/>
      <circle cx="52" cy="27" r="4.5" stroke="#E7157B" stroke-width="3" fill="#ffffff"/>
      <!-- Branch to Node 4 (Bottom-Right) -->
      <line x1="52" y1="27" x2="46" y2="46" stroke="#E7157B" stroke-width="3.2" stroke-linecap="round"/>
      <circle cx="46" cy="46" r="4.5" stroke="#E7157B" stroke-width="3" fill="#ffffff"/>
    </svg>`
  },

  // 2. Simple Email Service Email (from Res_Amazon-Simple-Email-Service_Email_48.png)
  {
    key: 'aws_simple_email_service_email',
    name: 'Simple Email Service Email',
    provider: 'aws',
    category: 'integration',
    brandColor: '#E7157B',
    defaultResourceType: 'aws_ses_email_identity',
    defaultSpecs: { count: 1 },
    description: 'Envio e recebimento de e-mails transacionais e de marketing com alta entregabilidade via Amazon SES',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Envelope Outline -->
      <path d="M 23 21 H 57 V 55 H 7 V 30" stroke="#E7157B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- V-Flap -->
      <path d="M 18 26 L 32 38 L 57 21" stroke="#E7157B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Bottom Corner Folds -->
      <path d="M 7 55 L 26 38" stroke="#E7157B" stroke-width="3" stroke-linecap="round"/>
      <path d="M 57 55 L 38 38" stroke="#E7157B" stroke-width="3" stroke-linecap="round"/>
      <!-- @ Symbol at top left -->
      <ellipse cx="14" cy="15" rx="3" ry="3.5" stroke="#E7157B" stroke-width="2.5"/>
      <path d="M 17 13.5 V 16 C 17 18.5 15.5 20.5 13.5 20.5 C 9.8 20.5 7 17.8 7 14.5 C 7 10.5 10.2 7.5 14 7.5 C 18 7.5 21 10.5 21 14.5 V 19.5" stroke="#E7157B" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    </svg>`
  }
];
