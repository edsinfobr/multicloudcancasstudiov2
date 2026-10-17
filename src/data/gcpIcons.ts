import { CloudIconDefinition } from '../types';

export const GCP_OFFICIAL_ICONS: CloudIconDefinition[] = [
  // 1. AlloyDB-512-color.png -> AlloyDB
  {
    key: 'gcp_alloydb',
    name: 'AlloyDB',
    provider: 'gcp',
    category: 'database',
    brandColor: '#4285F4',
    defaultResourceType: 'google_alloydb_instance',
    defaultSpecs: { instanceType: 'alloydb-standard-4', count: 1, region: 'us-central1' },
    description: 'Fully managed, PostgreSQL-compatible database service for demanding enterprise workloads',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Top isometric rim -->
      <path d="M 32 6 L 8 19.8 L 32 33.6" stroke="#FBBC04" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 32 6 L 56 19.8 L 32 33.6" stroke="#EA4335" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Inner floating diamond -->
      <polygon points="32,12.5 43,19.8 32,27 21,19.8" fill="#4285F4"/>
      <!-- Left and right vertical legs -->
      <line x1="8" y1="20" x2="8" y2="56" stroke="#34A853" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="56" y1="20" x2="56" y2="56" stroke="#4285F4" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Front connecting beam -->
      <path d="M 8 32 L 32 45.8" stroke="#34A853" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 32 45.8 L 56 32" stroke="#4285F4" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 2. Anthos-512-color.png -> Anthos
  {
    key: 'gcp_anthos',
    name: 'Anthos',
    provider: 'gcp',
    category: 'container',
    brandColor: '#4285F4',
    defaultResourceType: 'google_gke_hub_membership',
    defaultSpecs: { count: 1, region: 'global' },
    description: 'Modern application management platform for hybrid and multi-cloud Kubernetes environments',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer triangular loop -->
      <path d="M 12 52 L 32 10" stroke="#FBBC04" stroke-width="4.8" stroke-linecap="round"/>
      <path d="M 32 10 L 52 52" stroke="#EA4335" stroke-width="4.8" stroke-linecap="round"/>
      <line x1="12" y1="52" x2="32" y2="52" stroke="#34A853" stroke-width="4.8" stroke-linecap="round"/>
      <line x1="32" y1="52" x2="52" y2="52" stroke="#4285F4" stroke-width="4.8" stroke-linecap="round"/>
      <!-- Inner chevron ribbons -->
      <path d="M 21 46 L 32 29" stroke="#FBBC04" stroke-width="4.2" stroke-linecap="round"/>
      <path d="M 32 29 L 43 46" stroke="#EA4335" stroke-width="4.2" stroke-linecap="round"/>
      <path d="M 22 49 L 32 41" stroke="#34A853" stroke-width="3.8" stroke-linecap="round"/>
      <path d="M 32 41 L 42 49" stroke="#4285F4" stroke-width="3.8" stroke-linecap="round"/>
    </svg>`
  },

  // 3. BigQuery-512-color.png -> BigQuery
  {
    key: 'gcp_bigquery',
    name: 'BigQuery',
    provider: 'gcp',
    category: 'analytics',
    brandColor: '#4285F4',
    defaultResourceType: 'google_bigquery_dataset',
    defaultSpecs: { storageGb: 1000, region: 'us-central1' },
    description: 'Serverless, highly scalable, cost-effective enterprise data warehouse designed for business agility',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Magnifying Glass Lens Outer Ring (4 colors) -->
      <!-- Red top-right arc -->
      <path d="M 31 7 C 38 7 45 11 48 18" stroke="#EA4335" stroke-width="5" stroke-linecap="round"/>
      <!-- Yellow left/bottom arc -->
      <path d="M 31 7 C 17 7 7 18 7 31 C 7 42 14 51 25 54 C 33 56 42 53 47 46" stroke="#FBBC04" stroke-width="5" stroke-linecap="round"/>
      <!-- Blue right arc and diagonal handle -->
      <path d="M 48 18 C 53 23 54 31 52 38" stroke="#4285F4" stroke-width="5" stroke-linecap="round"/>
      <line x1="43" y1="44" x2="56" y2="56" stroke="#4285F4" stroke-width="5.5" stroke-linecap="round"/>
      <!-- 3 Vertical Bar Chart Bars in Green -->
      <line x1="20" y1="28" x2="20" y2="47" stroke="#34A853" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="29" y1="20" x2="29" y2="47" stroke="#34A853" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="38" y1="33" x2="38" y2="47" stroke="#34A853" stroke-width="4.5" stroke-linecap="round"/>
    </svg>`
  },

  // 4. CloudRun-512-color-rgb.png -> CloudRun
  {
    key: 'gcp_cloudrun',
    name: 'CloudRun',
    provider: 'gcp',
    category: 'compute',
    brandColor: '#4285F4',
    defaultResourceType: 'google_cloud_run_v2_service',
    defaultSpecs: { count: 1, memory: 1024, cpu: 1, region: 'us-central1' },
    description: 'Fully managed serverless platform for deploying and scaling containerized applications quickly',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Left chevron stem -->
      <line x1="11" y1="10" x2="19" y2="32" stroke="#FBBC04" stroke-width="5" stroke-linecap="round"/>
      <line x1="19" y1="32" x2="11" y2="54" stroke="#34A853" stroke-width="5" stroke-linecap="round"/>
      <!-- Right large hollow arrowhead -->
      <path d="M 24 10 L 55 32 L 31 32" stroke="#EA4335" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 31 32 L 55 32 L 24 54" stroke="#4285F4" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 5. CloudSQL-512-color.png -> CloudSQL
  {
    key: 'gcp_cloudsql',
    name: 'CloudSQL',
    provider: 'gcp',
    category: 'database',
    brandColor: '#EA4335',
    defaultResourceType: 'google_sql_database_instance',
    defaultSpecs: { instanceType: 'db-custom-2-7680', count: 1, storageGb: 100, engine: 'POSTGRES_15', region: 'us-central1' },
    description: 'Fully managed relational database service for MySQL, PostgreSQL, and SQL Server',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Top isometric diamond layer -->
      <path d="M 32 9 L 12 18 L 32 27" stroke="#FBBC04" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 32 9 L 52 18 L 32 27" stroke="#EA4335" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Layer 2 (Green left, Blue right) -->
      <line x1="12" y1="27" x2="32" y2="35" stroke="#34A853" stroke-width="4.6" stroke-linecap="round"/>
      <line x1="32" y1="35" x2="52" y2="27" stroke="#4285F4" stroke-width="4.6" stroke-linecap="round"/>
      <!-- Layer 3 (Green left, Blue right) -->
      <line x1="12" y1="36" x2="32" y2="44" stroke="#34A853" stroke-width="4.6" stroke-linecap="round"/>
      <line x1="32" y1="44" x2="52" y2="36" stroke="#4285F4" stroke-width="4.6" stroke-linecap="round"/>
      <!-- Layer 4 (Green left, Blue right) -->
      <line x1="12" y1="45" x2="32" y2="53" stroke="#34A853" stroke-width="4.6" stroke-linecap="round"/>
      <line x1="32" y1="53" x2="52" y2="45" stroke="#4285F4" stroke-width="4.6" stroke-linecap="round"/>
    </svg>`
  },

  // 6. Hyperdisk-512-color.png -> Hyperdisk
  {
    key: 'gcp_hyperdisk',
    name: 'Hyperdisk',
    provider: 'gcp',
    category: 'storage',
    brandColor: '#4285F4',
    defaultResourceType: 'google_compute_disk',
    defaultSpecs: { storageGb: 500, type: 'hyperdisk-balanced', region: 'us-central1' },
    description: 'Next-generation block storage for Google Cloud with dynamic IOPS and throughput tuning',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Hexagonal outer path -->
      <path d="M 23 9 L 9 32 L 23 55" stroke="#4285F4" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 23 9 L 41 9 L 55 32" stroke="#EA4335" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 55 32 L 41 55 L 23 55" stroke="#FBBC04" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Inner green chevron stripes -->
      <path d="M 21 23 L 28 32 L 21 41" stroke="#34A853" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 37 32 L 25 49" stroke="#34A853" stroke-width="4.6" stroke-linecap="round"/>
    </svg>`
  },

  // 7. Looker-512-color.png -> Looker
  {
    key: 'gcp_looker',
    name: 'Looker',
    provider: 'gcp',
    category: 'analytics',
    brandColor: '#4285F4',
    defaultResourceType: 'google_looker_instance',
    defaultSpecs: { edition: 'ENTERPRISE', region: 'us-central1' },
    description: 'Enterprise platform for business intelligence, data applications, and embedded analytics',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Top Red Node and Link -->
      <circle cx="39" cy="11" r="6" stroke="#EA4335" stroke-width="4.2"/>
      <line x1="34" y1="15" x2="25" y2="24" stroke="#EA4335" stroke-width="4.2" stroke-linecap="round"/>
      <!-- Middle Yellow Node and Green Link -->
      <circle cx="20" cy="28" r="7.5" stroke="#FBBC04" stroke-width="4.2"/>
      <line x1="25" y1="33" x2="33" y2="40" stroke="#34A853" stroke-width="4.2" stroke-linecap="round"/>
      <!-- Bottom Connected Split Node (Green & Blue) -->
      <path d="M 29 44 C 33 37 42 36 49 41 C 52 44 54 48 53 52" stroke="#34A853" stroke-width="4.2" stroke-linecap="round"/>
      <path d="M 53 52 C 51 58 44 61 38 60 C 31 58 27 51 29 44" stroke="#4285F4" stroke-width="4.2" stroke-linecap="round"/>
    </svg>`
  },

  // 8. SecurityCommandCenter-512-color.png -> SecurityCommandCenter
  {
    key: 'gcp_securitycommandcenter',
    name: 'SecurityCommandCenter',
    provider: 'gcp',
    category: 'security',
    brandColor: '#34A853',
    defaultResourceType: 'google_scc_source',
    defaultSpecs: { count: 1, tier: 'STANDARD' },
    description: 'Centralized security and risk management platform for Google Cloud assets and vulnerabilities',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Shield Outer Outline (4 segments) -->
      <path d="M 12 11 L 32 11" stroke="#EA4335" stroke-width="4.6" stroke-linecap="round"/>
      <path d="M 12 11 L 12 32" stroke="#EA4335" stroke-width="4.6" stroke-linecap="round"/>
      <path d="M 32 11 L 52 11 L 52 32" stroke="#4285F4" stroke-width="4.6" stroke-linecap="round"/>
      <path d="M 12 32 C 12 45 22 53 32 57" stroke="#FBBC04" stroke-width="4.6" stroke-linecap="round"/>
      <path d="M 52 32 C 52 45 42 53 32 57" stroke="#34A853" stroke-width="4.6" stroke-linecap="round"/>
      <!-- Center Bullseye / Crosshair Ring -->
      <circle cx="32" cy="32" r="7" stroke="#EA4335" stroke-width="3.8"/>
      <!-- Inner Crosshair lines -->
      <line x1="32" y1="12" x2="32" y2="24" stroke="#EA4335" stroke-width="3.8" stroke-linecap="round"/>
      <line x1="32" y1="40" x2="32" y2="52" stroke="#4285F4" stroke-width="3.8" stroke-linecap="round"/>
      <line x1="13" y1="32" x2="24" y2="32" stroke="#FBBC04" stroke-width="3.8" stroke-linecap="round"/>
      <line x1="40" y1="32" x2="51" y2="32" stroke="#34A853" stroke-width="3.8" stroke-linecap="round"/>
    </svg>`
  },

  // 9. AIHypercomputer-512-color.png -> AIHypercomputer
  {
    key: 'gcp_aihypercomputer',
    name: 'AIHypercomputer',
    provider: 'gcp',
    category: 'compute',
    brandColor: '#4285F4',
    defaultResourceType: 'google_compute_instance_group',
    defaultSpecs: { count: 8, acceleratorType: 'nvidia-h100-80gb', region: 'us-central1' },
    description: 'Supercomputing architecture optimized for AI training and inference with TPUs, GPUs, and high-speed networking',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Left vertical elongated pill: Top Red, Bottom Blue -->
      <path d="M 23 10 C 27 10 27 15 27 20 L 27 34 L 17 34 L 17 20 C 17 15 17 10 23 10 Z" fill="#EA4335"/>
      <path d="M 17 34 L 27 34 L 27 46 C 27 52 25 56 22 56 C 18 56 17 52 17 46 Z" fill="#4285F4"/>
      <!-- Right vertical elongated pill: Top Blue, Bottom Green -->
      <path d="M 42 10 C 47 10 47 15 47 20 L 47 34 L 37 34 L 37 20 C 37 15 37 10 42 10 Z" fill="#4285F4"/>
      <path d="M 37 34 L 47 34 L 47 46 C 47 52 45 56 42 56 C 38 56 37 52 37 46 Z" fill="#34A853"/>
      <!-- Center horizontal stadium ring linking both -->
      <rect x="8" y="23" width="48" height="18" rx="9" stroke="#FBBC04" stroke-width="4.8" fill="none"/>
    </svg>`
  },

  // 10. Apigee-512-color.png -> Apigee
  {
    key: 'gcp_apigee',
    name: 'Apigee',
    provider: 'gcp',
    category: 'integration',
    brandColor: '#4285F4',
    defaultResourceType: 'google_apigee_organization',
    defaultSpecs: { count: 1, analyticsRegion: 'us-central1' },
    description: 'Leading API management platform to design, secure, analyze, and scale APIs anywhere',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 4-Leaf continuous infinity petal loop -->
      <!-- Top Red Leaf -->
      <path d="M 24 24 C 20 16 23 8 32 8 C 41 8 44 16 40 24" stroke="#EA4335" stroke-width="4.8" stroke-linecap="round"/>
      <!-- Right Blue Leaf -->
      <path d="M 40 24 C 48 20 56 23 56 32 C 56 41 48 44 40 40" stroke="#4285F4" stroke-width="4.8" stroke-linecap="round"/>
      <!-- Bottom Green Leaf -->
      <path d="M 40 40 C 44 48 41 56 32 56 C 23 56 20 48 24 40" stroke="#34A853" stroke-width="4.8" stroke-linecap="round"/>
      <!-- Left Yellow Leaf -->
      <path d="M 24 40 C 16 44 8 41 8 32 C 8 23 16 20 24 24" stroke="#FBBC04" stroke-width="4.8" stroke-linecap="round"/>
      <!-- Center circular opening -->
      <circle cx="32" cy="32" r="6" stroke="#4285F4" stroke-width="3" opacity="0.3"/>
    </svg>`
  },

  // 11. Cloud_Storage-512-color.png -> Cloud_Storage
  {
    key: 'gcp_cloud_storage',
    name: 'Cloud_Storage',
    provider: 'gcp',
    category: 'storage',
    brandColor: '#34A853',
    defaultResourceType: 'google_storage_bucket',
    defaultSpecs: { storageGb: 500, storageClass: 'STANDARD', region: 'us-central1' },
    description: 'Worldwide, highly durable, secure object storage for unstructured data and backups',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Top Storage Drawer -->
      <rect x="8" y="8" width="48" height="22" rx="3.5" stroke="#EA4335" stroke-width="4.2" fill="none"/>
      <path d="M 8 12 L 8 28 L 22 28 L 22 12 Z" fill="#FBBC04"/>
      <line x1="22" y1="8" x2="22" y2="30" stroke="#FBBC04" stroke-width="3"/>
      <line x1="8" y1="28" x2="52" y2="28" stroke="#FBBC04" stroke-width="3"/>
      <circle cx="43" cy="19" r="4.5" fill="#EA4335"/>
      <!-- Bottom Storage Drawer -->
      <rect x="8" y="34" width="48" height="22" rx="3.5" stroke="#4285F4" stroke-width="4.2" fill="none"/>
      <path d="M 8 38 L 8 54 L 22 54 L 22 38 Z" fill="#34A853"/>
      <line x1="22" y1="34" x2="22" y2="56" stroke="#34A853" stroke-width="3"/>
      <line x1="8" y1="54" x2="52" y2="54" stroke="#34A853" stroke-width="3"/>
      <circle cx="43" cy="45" r="4.5" fill="#4285F4"/>
    </svg>`
  },

  // 12. CloudSpanner-512-color.png -> CloudSpanner
  {
    key: 'gcp_cloudspanner',
    name: 'CloudSpanner',
    provider: 'gcp',
    category: 'database',
    brandColor: '#EA4335',
    defaultResourceType: 'google_spanner_instance',
    defaultSpecs: { count: 1, processingUnits: 1000, region: 'us-central1' },
    description: 'Fully managed relational database with unlimited scale, strong consistency, and 99.999% availability',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Center Hub in Blue -->
      <circle cx="32" cy="34" r="5" fill="#4285F4"/>
      <line x1="32" y1="34" x2="32" y2="23" stroke="#4285F4" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="32" y1="34" x2="24" y2="40" stroke="#4285F4" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="32" y1="34" x2="40" y2="40" stroke="#4285F4" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Top Yellow Fork -->
      <path d="M 23 8 L 23 18 L 32 23 L 41 18 L 41 8" stroke="#FBBC04" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Bottom-Left Green Fork -->
      <path d="M 12 43 L 20 38 L 24 40 L 24 51 L 15 54" stroke="#34A853" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Bottom-Right Red Fork -->
      <path d="M 52 43 L 44 38 L 40 40 L 40 51 L 49 54" stroke="#EA4335" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 13. ComputeEngine-512-color.png -> ComputeEngine
  {
    key: 'gcp_computeengine',
    name: 'ComputeEngine',
    provider: 'gcp',
    category: 'compute',
    brandColor: '#4285F4',
    defaultResourceType: 'google_compute_instance',
    defaultSpecs: { instanceType: 'e2-standard-2', count: 2, storageGb: 100, region: 'us-central1' },
    description: 'Secure, customizable virtual machine instances running in Google data centers',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer chip pins & border -->
      <!-- Top edge & pins -->
      <line x1="20" y1="7" x2="20" y2="18" stroke="#FBBC04" stroke-width="4" stroke-linecap="round"/>
      <line x1="31" y1="7" x2="31" y2="18" stroke="#EA4335" stroke-width="4" stroke-linecap="round"/>
      <line x1="43" y1="7" x2="43" y2="18" stroke="#EA4335" stroke-width="4" stroke-linecap="round"/>
      <path d="M 18 18 L 30 18" stroke="#FBBC04" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 30 18 L 46 18" stroke="#EA4335" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Left edge & pins -->
      <line x1="7" y1="20" x2="18" y2="20" stroke="#FBBC04" stroke-width="4" stroke-linecap="round"/>
      <line x1="7" y1="31" x2="18" y2="31" stroke="#FBBC04" stroke-width="4" stroke-linecap="round"/>
      <line x1="7" y1="43" x2="18" y2="43" stroke="#FBBC04" stroke-width="4" stroke-linecap="round"/>
      <line x1="18" y1="18" x2="18" y2="46" stroke="#FBBC04" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Right edge & pins -->
      <line x1="46" y1="20" x2="57" y2="20" stroke="#EA4335" stroke-width="4" stroke-linecap="round"/>
      <line x1="46" y1="31" x2="57" y2="31" stroke="#EA4335" stroke-width="4" stroke-linecap="round"/>
      <line x1="46" y1="43" x2="57" y2="43" stroke="#4285F4" stroke-width="4" stroke-linecap="round"/>
      <line x1="46" y1="18" x2="46" y2="42" stroke="#EA4335" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Bottom edge & pins -->
      <line x1="20" y1="46" x2="20" y2="57" stroke="#4285F4" stroke-width="4" stroke-linecap="round"/>
      <line x1="31" y1="46" x2="31" y2="57" stroke="#4285F4" stroke-width="4" stroke-linecap="round"/>
      <line x1="43" y1="46" x2="43" y2="57" stroke="#4285F4" stroke-width="4" stroke-linecap="round"/>
      <line x1="18" y1="46" x2="46" y2="46" stroke="#4285F4" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Center Green Die Frame -->
      <rect x="23" y="23" width="18" height="18" rx="2" stroke="#34A853" stroke-width="4.5" fill="none"/>
    </svg>`
  },

  // 14. DistributedCloud-512-color.png -> DistributedCloud
  {
    key: 'gcp_distributedcloud',
    name: 'DistributedCloud',
    provider: 'gcp',
    category: 'compute',
    brandColor: '#4285F4',
    defaultResourceType: 'google_edgenetwork_network',
    defaultSpecs: { count: 1, region: 'us-central1' },
    description: 'Extends Google Cloud infrastructure and services to edge, data center, and air-gapped locations',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Rounded square container frame -->
      <path d="M 12 52 L 12 16 C 12 11 16 11 20 11 L 52 11" stroke="#EA4335" stroke-width="4.8" stroke-linecap="round"/>
      <path d="M 52 11 L 52 48 C 52 52 48 52 44 52 L 12 52" stroke="#FBBC04" stroke-width="4.8" stroke-linecap="round"/>
      <!-- Green Cloud outline inside -->
      <path d="M 21 34 C 18 34 16 31 17 28 C 16 23 20 20 25 20 C 27 16 35 16 38 20 C 42 19 46 22 46 26 C 47 28 47 31 45 34 Z" stroke="#34A853" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <!-- Blue horizontal pill beneath cloud -->
      <line x1="18" y1="45" x2="46" y2="45" stroke="#4285F4" stroke-width="4.8" stroke-linecap="round"/>
    </svg>`
  },

  // 15. GKE-512-color.png -> GKE
  {
    key: 'gcp_gke',
    name: 'GKE',
    provider: 'gcp',
    category: 'container',
    brandColor: '#4285F4',
    defaultResourceType: 'google_container_cluster',
    defaultSpecs: { instanceType: 'e2-standard-4', count: 3, region: 'us-central1' },
    description: 'Enterprise Kubernetes service for automated deployment, scaling, and operational management of containerized apps',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer isometric cube outline -->
      <path d="M 32 7 L 14 17 L 14 43 L 32 55" stroke="#FBBC04" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 32 7 L 50 17 L 50 43 L 32 55" stroke="#EA4335" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Bottom base green/blue -->
      <path d="M 14 43 L 32 55" stroke="#34A853" stroke-width="4.6" stroke-linecap="round"/>
      <path d="M 32 55 L 50 43" stroke="#4285F4" stroke-width="4.6" stroke-linecap="round"/>
      <!-- Inner cube facets -->
      <polygon points="32,23 42,29 32,35 22,29" fill="#EA4335"/>
      <polygon points="22,29 32,35 32,47 22,41" fill="#FBBC04"/>
      <polygon points="32,35 42,29 42,41 32,47" fill="#4285F4"/>
    </svg>`
  },

  // 16. Mandiant-512-color.png -> Mandiant
  {
    key: 'gcp_mandiant',
    name: 'Mandiant',
    provider: 'gcp',
    category: 'security',
    brandColor: '#EA4335',
    defaultResourceType: 'google_mandiant_defense',
    defaultSpecs: { count: 1, tier: 'ADVANCED' },
    description: 'Cyber threat intelligence, incident response, and proactive security services against advanced threats',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Left upper red stem and apex -->
      <path d="M 11 32 L 11 12 C 11 9 14 8 16 10 L 32 26" stroke="#EA4335" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Center right descending to bottom -->
      <path d="M 32 26 L 48 10 C 50 8 53 9 53 12 L 53 32" stroke="#EA4335" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Bottom-left blue shield loop -->
      <path d="M 11 32 C 11 44 20 53 32 56" stroke="#4285F4" stroke-width="4.8" stroke-linecap="round"/>
      <!-- Bottom-right yellow and green stem -->
      <path d="M 32 56 C 44 53 53 44 53 32" stroke="#FBBC04" stroke-width="4.8" stroke-linecap="round"/>
      <line x1="53" y1="22" x2="53" y2="32" stroke="#34A853" stroke-width="4.8" stroke-linecap="round"/>
    </svg>`
  },

  // 17. SecOps-512-color-rgb.png -> SecOps
  {
    key: 'gcp_secops',
    name: 'SecOps',
    provider: 'gcp',
    category: 'security',
    brandColor: '#4285F4',
    defaultResourceType: 'google_chronicle_instance',
    defaultSpecs: { count: 1, region: 'us-central1' },
    description: 'Cloud-native Security Operations platform (Chronicle SIEM & SOAR) for threat detection, investigation, and response',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer Shield: Blue top/left, Green right/bottom -->
      <path d="M 32 8 L 12 8 L 12 30 C 12 44 22 53 32 57" stroke="#4285F4" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 32 8 L 52 8 L 52 30 C 52 44 42 53 32 57" stroke="#34A853" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Inner Shield: Yellow left, Red right -->
      <path d="M 32 18 L 22 18 L 22 30 C 22 38 27 43 32 46" stroke="#FBBC04" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 32 18 L 42 18 L 42 30 C 42 38 37 43 32 46" stroke="#EA4335" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },

  // 18. ThreatIntelligence-512-color.png -> ThreatIntelligence
  {
    key: 'gcp_threatintelligence',
    name: 'ThreatIntelligence',
    provider: 'gcp',
    category: 'security',
    brandColor: '#EA4335',
    defaultResourceType: 'google_threat_intelligence',
    defaultSpecs: { count: 1 },
    description: 'Actionable threat intelligence powered by frontline expertise, VirusTotal telemetry, and Google visibility',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Concentric Radar Rings in 4 quadrants -->
      <!-- Top-right Yellow arcs -->
      <path d="M 32 8 A 24 24 0 0 1 56 32" stroke="#FBBC04" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 32 16 A 16 16 0 0 1 48 32" stroke="#FBBC04" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 32 24 A 8 8 0 0 1 40 32" stroke="#FBBC04" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Bottom-right Blue arcs -->
      <path d="M 56 32 A 24 24 0 0 1 32 56" stroke="#4285F4" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Bottom-left Green arcs -->
      <path d="M 32 56 A 24 24 0 0 1 8 32" stroke="#34A853" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 32 48 A 16 16 0 0 1 16 32" stroke="#34A853" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 32 40 A 8 8 0 0 1 24 32" stroke="#34A853" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Top-left Red arcs -->
      <path d="M 8 32 A 24 24 0 0 1 32 8" stroke="#EA4335" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Diagonal Radar Sweeping Arm in Red -->
      <line x1="32" y1="32" x2="8" y2="8" stroke="#EA4335" stroke-width="5" stroke-linecap="round"/>
    </svg>`
  },

  // 19. VertexAI-512-color.png -> VertexAI
  {
    key: 'gcp_vertexai',
    name: 'VertexAI',
    provider: 'gcp',
    category: 'ai',
    brandColor: '#EA4335',
    defaultResourceType: 'google_vertex_ai_endpoint',
    defaultSpecs: { count: 1, machineType: 'n1-standard-4', acceleratorType: 'NVIDIA_TESLA_T4', region: 'us-central1' },
    description: 'Unified enterprise machine learning and generative AI platform to build, deploy, and scale models',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Bottom Yellow V chevron -->
      <path d="M 9 41 L 32 57 L 55 41" stroke="#FBBC04" stroke-width="5.2" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Column 1 (Left - Red) -->
      <circle cx="16" cy="8" r="2.5" fill="#EA4335"/>
      <line x1="16" y1="15" x2="16" y2="30" stroke="#EA4335" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="16" cy="36" r="2.5" fill="#EA4335"/>
      <!-- Column 2 (Center-Left - Yellow) -->
      <line x1="24" y1="12" x2="24" y2="27" stroke="#FBBC04" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="24" cy="33" r="2.5" fill="#FBBC04"/>
      <circle cx="24" cy="40" r="2.5" fill="#FBBC04"/>
      <!-- Column 3 (Center - Green) -->
      <circle cx="32" cy="22" r="2.5" fill="#34A853"/>
      <circle cx="32" cy="29" r="2.5" fill="#34A853"/>
      <line x1="32" y1="36" x2="32" y2="47" stroke="#34A853" stroke-width="4.5" stroke-linecap="round"/>
      <!-- Column 4 (Center-Right - Yellow) -->
      <line x1="40" y1="12" x2="40" y2="27" stroke="#FBBC04" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="40" cy="33" r="2.5" fill="#FBBC04"/>
      <circle cx="40" cy="40" r="2.5" fill="#FBBC04"/>
      <!-- Column 5 (Right - Blue) -->
      <circle cx="48" cy="8" r="2.5" fill="#4285F4"/>
      <circle cx="48" cy="15" r="2.5" fill="#4285F4"/>
      <line x1="48" y1="22" x2="48" y2="37" stroke="#4285F4" stroke-width="4.5" stroke-linecap="round"/>
    </svg>`
  }
];
