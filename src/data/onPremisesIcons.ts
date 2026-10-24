import { CloudIconDefinition } from '../types';

export const ON_PREMISES_ICONS: CloudIconDefinition[] = [
  // ==========================================
  // 1. Hypervisores & Soluções de Virtualização (Virtualization & HCI)
  // ==========================================
  {
    key: 'onprem_vmware_vsphere',
    name: 'VMware vSphere / ESXi',
    provider: 'onprem',
    category: 'compute',
    brandColor: '#0095D3',
    defaultResourceType: 'vsphere_virtual_machine',
    defaultSpecs: { count: 1, cpu: 4, memory: 16, hoursPerMonth: 730 },
    description: 'Hipervisor bare-metal corporativo VMware ESXi e plataforma de virtualização vSphere para datacenters',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#0095D3" fill-opacity="0.12" stroke="#0095D3" stroke-width="2"/>
      <!-- VMware stacked hypervisor cubes -->
      <path d="M22 18L32 12L42 18L32 24L22 18Z" fill="#0095D3" stroke="#0095D3" stroke-width="1.5"/>
      <path d="M22 18V28L32 34V24L22 18Z" fill="#0077A8" stroke="#0095D3" stroke-width="1.5"/>
      <path d="M42 18V28L32 34V24L42 18Z" fill="#005B82" stroke="#0095D3" stroke-width="1.5"/>
      <path d="M12 30L22 24L32 30L22 36L12 30Z" fill="#38BDF8" stroke="#0095D3" stroke-width="1.5"/>
      <path d="M12 30V40L22 46V36L12 30Z" fill="#0284C7" stroke="#0095D3" stroke-width="1.5"/>
      <path d="M32 30V40L22 46V36L32 30Z" fill="#0369A1" stroke="#0095D3" stroke-width="1.5"/>
      <path d="M32 30L42 24L52 30L42 36L32 30Z" fill="#38BDF8" stroke="#0095D3" stroke-width="1.5"/>
      <path d="M32 30V40L42 46V36L32 30Z" fill="#0284C7" stroke="#0095D3" stroke-width="1.5"/>
      <path d="M52 30V40L42 46V36L52 30Z" fill="#0369A1" stroke="#0095D3" stroke-width="1.5"/>
      <!-- Hardware Base Line -->
      <rect x="10" y="49" width="44" height="5" rx="1.5" fill="#0095D3"/>
      <circle cx="16" cy="51.5" r="1" fill="white"/>
      <circle cx="21" cy="51.5" r="1" fill="#34D399"/>
    </svg>`,
  },
  {
    key: 'onprem_vmware_vcenter',
    name: 'VMware vCenter Server',
    provider: 'onprem',
    category: 'devops',
    brandColor: '#0095D3',
    defaultResourceType: 'vsphere_vcenter',
    defaultSpecs: { count: 1 },
    description: 'Gerenciador centralizado de clusters vSphere, vMotion, DRS, High Availability (HA) e inventário virtual',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#0095D3" fill-opacity="0.12" stroke="#0095D3" stroke-width="2"/>
      <!-- Central Management Sphere -->
      <circle cx="32" cy="24" r="11" fill="#0095D3"/>
      <circle cx="32" cy="24" r="7" stroke="white" stroke-width="2" fill="none"/>
      <circle cx="32" cy="24" r="2.5" fill="white"/>
      <!-- Connecting Bus -->
      <path d="M32 35V42M20 42H44M20 42V48M44 42V48" stroke="#0095D3" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Managed Node 1 -->
      <rect x="14" y="48" width="12" height="7" rx="1.5" fill="#0284C7"/>
      <circle cx="17" cy="51.5" r="0.8" fill="#34D399"/>
      <!-- Managed Node 2 -->
      <rect x="38" y="48" width="12" height="7" rx="1.5" fill="#0284C7"/>
      <circle cx="41" cy="51.5" r="0.8" fill="#34D399"/>
    </svg>`,
  },
  {
    key: 'onprem_nutanix_ahv',
    name: 'Nutanix AHV & Prism',
    provider: 'onprem',
    category: 'compute',
    brandColor: '#024DA1',
    defaultResourceType: 'nutanix_virtual_machine',
    defaultSpecs: { count: 1, cpu: 4, memory: 16 },
    description: 'Infraestrutura Hiperconvergente (HCI) corporativa com Nutanix Acropolis Hypervisor e gestão Prism',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#024DA1" fill-opacity="0.12" stroke="#024DA1" stroke-width="2"/>
      <!-- Nutanix iconic dual-cube nodes -->
      <path d="M16 26L32 17L48 26L32 35L16 26Z" fill="#00A4E4" stroke="#024DA1" stroke-width="1.8"/>
      <path d="M16 26V37L32 46V35L16 26Z" fill="#024DA1" stroke="#024DA1" stroke-width="1.8"/>
      <path d="M48 26V37L32 46V35L48 26Z" fill="#01336D" stroke="#024DA1" stroke-width="1.8"/>
      <!-- Inner core geometric highlight -->
      <circle cx="32" cy="26" r="3.5" fill="white"/>
      <!-- Storage/Compute HCI Indicators -->
      <rect x="18" y="50" width="28" height="4" rx="1" fill="#00A4E4"/>
      <circle cx="22" cy="52" r="0.8" fill="white"/>
      <circle cx="26" cy="52" r="0.8" fill="#34D399"/>
    </svg>`,
  },
  {
    key: 'onprem_hyperv',
    name: 'Microsoft Hyper-V',
    provider: 'onprem',
    category: 'compute',
    brandColor: '#0078D4',
    defaultResourceType: 'hyperv_machine_instance',
    defaultSpecs: { count: 1, cpu: 4, memory: 16 },
    description: 'Hipervisor nativo Microsoft Windows Server para virtualização corporativa, Live Migration e clustering',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#0078D4" fill-opacity="0.12" stroke="#0078D4" stroke-width="2"/>
      <!-- Windows Hyper-V 4-pane virtualization grid -->
      <rect x="14" y="14" width="16" height="15" rx="2" fill="#0078D4"/>
      <rect x="34" y="14" width="16" height="15" rx="2" fill="#2892DF"/>
      <rect x="14" y="33" width="16" height="15" rx="2" fill="#005A9E"/>
      <rect x="34" y="33" width="16" height="15" rx="2" fill="#0078D4"/>
      <!-- Virtual Machine Layers inside panes -->
      <line x1="17" y1="21" x2="27" y2="21" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="37" y1="21" x2="47" y2="21" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="17" y1="40" x2="27" y2="40" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="37" y1="40" x2="47" y2="40" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      <!-- Hypervisor Base Bar -->
      <rect x="14" y="51" width="36" height="3" rx="1" fill="#10B981"/>
    </svg>`,
  },
  {
    key: 'onprem_proxmox_ve',
    name: 'Proxmox VE (KVM / LXC)',
    provider: 'onprem',
    category: 'compute',
    brandColor: '#E57000',
    defaultResourceType: 'proxmox_vm_qemu',
    defaultSpecs: { count: 1, cpu: 4, memory: 8 },
    description: 'Plataforma open-source completa de virtualização empresarial com hipervisor KVM e containers LXC',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#E57000" fill-opacity="0.12" stroke="#E57000" stroke-width="2"/>
      <!-- Proxmox dual shield & cluster nodes -->
      <path d="M32 12L48 20V34C48 44 32 52 32 52C32 52 16 44 16 34V20L32 12Z" fill="#E57000" stroke="#B85900" stroke-width="1.5"/>
      <path d="M32 18L43 23V33C43 40 32 46 32 46C32 46 21 40 21 33V23L32 18Z" fill="white" fill-opacity="0.2"/>
      <path d="M26 27L32 33L38 27M32 33V41" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="32" cy="24" r="2.5" fill="white"/>
    </svg>`,
  },
  {
    key: 'onprem_openstack_kvm',
    name: 'OpenStack / KVM',
    provider: 'onprem',
    category: 'compute',
    brandColor: '#ED1944',
    defaultResourceType: 'openstack_compute_instance_v2',
    defaultSpecs: { count: 1, cpu: 4, memory: 16 },
    description: 'Computação em nuvem privada corporativa, orquestração Nova, Neutron, Cinder e hipervisor KVM',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#ED1944" fill-opacity="0.12" stroke="#ED1944" stroke-width="2"/>
      <!-- OpenStack Red Block Logo -->
      <path d="M18 18H46V28H18V18Z" fill="#ED1944"/>
      <path d="M18 31H30V46H18V31Z" fill="#ED1944"/>
      <path d="M34 31H46V46H34V31Z" fill="#ED1944"/>
      <circle cx="24" cy="23" r="1.5" fill="white"/>
      <circle cx="32" cy="23" r="1.5" fill="white"/>
      <circle cx="40" cy="23" r="1.5" fill="white"/>
      <circle cx="24" cy="38" r="1.5" fill="white"/>
      <circle cx="40" cy="38" r="1.5" fill="white"/>
    </svg>`,
  },
  {
    key: 'onprem_citrix_hypervisor',
    name: 'Citrix Hypervisor (XenServer)',
    provider: 'onprem',
    category: 'compute',
    brandColor: '#002D62',
    defaultResourceType: 'citrix_xenserver_vm',
    defaultSpecs: { count: 1, cpu: 4, memory: 16 },
    description: 'Plataforma de virtualização empresarial XenServer otimizada para VDI, Citrix DaaS e workloads intensivos',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#002D62" fill-opacity="0.12" stroke="#002D62" stroke-width="2"/>
      <!-- Citrix X Geometric Ring -->
      <circle cx="32" cy="32" r="18" stroke="#002D62" stroke-width="3" fill="#002D62" fill-opacity="0.1"/>
      <path d="M22 22L42 42M42 22L22 42" stroke="#0072CE" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="32" cy="32" r="4.5" fill="white"/>
    </svg>`,
  },

  // ==========================================
  // 2. Toda a Stack de Servidores (Server Stack: Web, App, DB, Storage, etc.)
  // ==========================================
  {
    key: 'onprem_bare_metal_rack',
    name: 'Servidor Físico (Bare Metal Rack)',
    provider: 'onprem',
    category: 'compute',
    brandColor: '#475569',
    defaultResourceType: 'onprem_bare_metal_server',
    defaultSpecs: { count: 1, cpu: 16, memory: 64, storageGb: 1000 },
    description: 'Servidor físico rack 1U/2U (Dell PowerEdge, HPE ProLiant, Lenovo ThinkSystem) com IPMI/iDRAC/iLO',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#475569" fill-opacity="0.12" stroke="#475569" stroke-width="2"/>
      <!-- Rack Server Chassis 1 -->
      <rect x="10" y="16" width="44" height="13" rx="2" fill="#334155" stroke="#475569" stroke-width="1.5"/>
      <rect x="13" y="19" width="16" height="7" rx="1" fill="#1E293B"/>
      <circle cx="16" cy="22.5" r="1.2" fill="#38BDF8"/>
      <circle cx="20" cy="22.5" r="1.2" fill="#34D399"/>
      <circle cx="24" cy="22.5" r="1.2" fill="#FBBF24"/>
      <rect x="32" y="19" width="18" height="7" rx="1" fill="#1E293B"/>
      <line x1="35" y1="22.5" x2="47" y2="22.5" stroke="#64748B" stroke-width="2" stroke-linecap="round"/>
      <!-- Rack Server Chassis 2 -->
      <rect x="10" y="33" width="44" height="13" rx="2" fill="#334155" stroke="#475569" stroke-width="1.5"/>
      <rect x="13" y="36" width="16" height="7" rx="1" fill="#1E293B"/>
      <circle cx="16" cy="39.5" r="1.2" fill="#38BDF8"/>
      <circle cx="20" cy="39.5" r="1.2" fill="#34D399"/>
      <circle cx="24" cy="39.5" r="1.2" fill="#FBBF24"/>
      <rect x="32" y="36" width="18" height="7" rx="1" fill="#1E293B"/>
      <line x1="35" y1="39.5" x2="47" y2="39.5" stroke="#64748B" stroke-width="2" stroke-linecap="round"/>
      <!-- Rack Ears -->
      <rect x="7" y="18" width="3" height="9" rx="0.5" fill="#64748B"/>
      <rect x="54" y="18" width="3" height="9" rx="0.5" fill="#64748B"/>
      <rect x="7" y="35" width="3" height="9" rx="0.5" fill="#64748B"/>
      <rect x="54" y="35" width="3" height="9" rx="0.5" fill="#64748B"/>
    </svg>`,
  },
  {
    key: 'onprem_web_server',
    name: 'Servidor Web (Nginx / Apache / IIS)',
    provider: 'onprem',
    category: 'compute',
    brandColor: '#009639',
    defaultResourceType: 'onprem_web_server',
    defaultSpecs: { count: 1, containerPort: 443, memory: 4 },
    description: 'Servidor HTTP/HTTPS, terminação SSL/TLS, roteamento de tráfego web e proxy reverso local (Nginx/Apache/IIS)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#009639" fill-opacity="0.12" stroke="#009639" stroke-width="2"/>
      <!-- Server Unit -->
      <rect x="12" y="36" width="40" height="15" rx="3" fill="#1E293B" stroke="#009639" stroke-width="1.8"/>
      <circle cx="18" cy="43.5" r="1.8" fill="#34D399"/>
      <circle cx="24" cy="43.5" r="1.8" fill="#38BDF8"/>
      <line x1="32" y1="43.5" x2="46" y2="43.5" stroke="#009639" stroke-width="2" stroke-linecap="round"/>
      <!-- Web Globe / Browser Header -->
      <circle cx="32" cy="22" r="10" stroke="#009639" stroke-width="2.5" fill="#009639" fill-opacity="0.15"/>
      <ellipse cx="32" cy="22" rx="4.5" ry="10" stroke="#009639" stroke-width="1.8"/>
      <line x1="22" y1="22" x2="42" y2="22" stroke="#009639" stroke-width="1.8"/>
      <!-- Connection link -->
      <line x1="32" y1="32" x2="32" y2="36" stroke="#009639" stroke-width="2" stroke-dasharray="2 2"/>
    </svg>`,
  },
  {
    key: 'onprem_app_server',
    name: 'Servidor de Aplicação (Tomcat / Java / .NET)',
    provider: 'onprem',
    category: 'compute',
    brandColor: '#F97316',
    defaultResourceType: 'onprem_application_server',
    defaultSpecs: { count: 1, memory: 8, cpu: 4 },
    description: 'Servidor de backend para execução de APIs, microsserviços e sistemas corporativos em Java, .NET, Node ou Python',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#F97316" fill-opacity="0.12" stroke="#F97316" stroke-width="2"/>
      <!-- Server Box -->
      <rect x="12" y="34" width="40" height="18" rx="3" fill="#1E293B" stroke="#F97316" stroke-width="1.8"/>
      <circle cx="18" cy="43" r="1.8" fill="#F97316"/>
      <circle cx="24" cy="43" r="1.8" fill="#34D399"/>
      <line x1="32" y1="43" x2="46" y2="43" stroke="#F97316" stroke-width="2" stroke-linecap="round"/>
      <!-- Application Engine Gears / Code symbol -->
      <path d="M22 20L16 24L22 28M42 20L48 24L42 28M35 15L29 32" stroke="#F97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    key: 'onprem_database_sql',
    name: 'Servidor de Banco de Dados (SQL / Oracle / Postgres)',
    provider: 'onprem',
    category: 'database',
    brandColor: '#2563EB',
    defaultResourceType: 'onprem_sql_database_server',
    defaultSpecs: { count: 1, engine: 'sqlserver', storageGb: 500, memory: 32 },
    description: 'Servidor de banco de dados relacional on-premises com alta disponibilidade (Always On, RAC, Streaming Replication)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#2563EB" fill-opacity="0.12" stroke="#2563EB" stroke-width="2"/>
      <!-- Top Cylinder -->
      <ellipse cx="32" cy="18" rx="16" ry="6" fill="#3B82F6" stroke="#2563EB" stroke-width="2"/>
      <!-- Middle Cylinder -->
      <path d="M16 18V28C16 31.3 23.2 34 32 34C40.8 34 48 31.3 48 28V18" fill="#2563EB" fill-opacity="0.25" stroke="#2563EB" stroke-width="2"/>
      <!-- Bottom Cylinder -->
      <path d="M16 28V38C16 41.3 23.2 44 32 44C40.8 44 48 41.3 48 38V28" fill="#2563EB" fill-opacity="0.5" stroke="#2563EB" stroke-width="2"/>
      <!-- Base Layer Plate -->
      <path d="M16 38V48C16 51.3 23.2 54 32 54C40.8 54 48 51.3 48 48V38" fill="#1D4ED8" stroke="#2563EB" stroke-width="2"/>
      <!-- Indicator lights -->
      <circle cx="22" cy="46" r="1.5" fill="#34D399"/>
      <circle cx="27" cy="46" r="1.5" fill="#60A5FA"/>
    </svg>`,
  },
  {
    key: 'onprem_database_nosql',
    name: 'Servidor NoSQL / Cache (Redis / MongoDB On-Prem)',
    provider: 'onprem',
    category: 'database',
    brandColor: '#DC2626',
    defaultResourceType: 'onprem_nosql_cluster',
    defaultSpecs: { count: 1, memory: 16 },
    description: 'Instância local de banco NoSQL de documentos ou cache em memória (Redis, MongoDB, Cassandra)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DC2626" fill-opacity="0.12" stroke="#DC2626" stroke-width="2"/>
      <!-- Document Stack -->
      <rect x="16" y="16" width="32" height="10" rx="2" fill="#DC2626"/>
      <circle cx="21" cy="21" r="1.5" fill="white"/>
      <rect x="16" y="29" width="32" height="10" rx="2" fill="#EF4444"/>
      <circle cx="21" cy="34" r="1.5" fill="white"/>
      <rect x="16" y="42" width="32" height="10" rx="2" fill="#B91C1C"/>
      <circle cx="21" cy="47" r="1.5" fill="white"/>
      <!-- Lightning Key Symbol -->
      <path d="M38 20L32 32H38L32 44" stroke="#FDE047" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    key: 'onprem_storage_nas_san',
    name: 'Storage NAS / SAN (Dell EMC / NetApp)',
    provider: 'onprem',
    category: 'storage',
    brandColor: '#0284C7',
    defaultResourceType: 'onprem_storage_volume',
    defaultSpecs: { count: 1, storageGb: 5000 },
    description: 'Storage corporativo de rede (SAN/NAS) com suporte a Fibre Channel (FC), iSCSI, NFS e replicação de snapshots',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#0284C7" fill-opacity="0.12" stroke="#0284C7" stroke-width="2"/>
      <!-- Storage Bay Enclosure -->
      <rect x="10" y="14" width="44" height="36" rx="3" fill="#1E293B" stroke="#0284C7" stroke-width="2"/>
      <!-- Hard Drive Trays -->
      <rect x="14" y="18" width="6" height="28" rx="1" fill="#0284C7" fill-opacity="0.7"/>
      <circle cx="17" cy="42" r="1" fill="#34D399"/>
      <rect x="23" y="18" width="6" height="28" rx="1" fill="#0284C7" fill-opacity="0.7"/>
      <circle cx="26" cy="42" r="1" fill="#34D399"/>
      <rect x="32" y="18" width="6" height="28" rx="1" fill="#0284C7" fill-opacity="0.7"/>
      <circle cx="35" cy="42" r="1" fill="#34D399"/>
      <rect x="41" y="18" width="6" height="28" rx="1" fill="#0284C7" fill-opacity="0.7"/>
      <circle cx="44" cy="42" r="1" fill="#34D399"/>
      <!-- SAN Controller status line -->
      <rect x="14" y="47" width="36" height="2" fill="#38BDF8"/>
    </svg>`,
  },
  {
    key: 'onprem_backup_server',
    name: 'Servidor de Backup (Veeam / Commvault)',
    provider: 'onprem',
    category: 'storage',
    brandColor: '#00B336',
    defaultResourceType: 'onprem_backup_job',
    defaultSpecs: { count: 1, storageGb: 2000 },
    description: 'Servidor de cópia de segurança, imutabilidade de dados, replicação de VMs e repositório de desastre (Veeam/Commvault)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#00B336" fill-opacity="0.12" stroke="#00B336" stroke-width="2"/>
      <!-- Safe Storage Vault -->
      <circle cx="32" cy="30" r="14" stroke="#00B336" stroke-width="2.5" fill="#00B336" fill-opacity="0.15"/>
      <!-- Circular Backup / Sync Arrows -->
      <path d="M32 19C37.5 19 42 23.5 42 29" stroke="#00B336" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M42 25V29H38" stroke="#00B336" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M32 41C26.5 41 22 36.5 22 31" stroke="#00B336" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M22 35V31H26" stroke="#00B336" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Secure Checkpoint badge -->
      <circle cx="32" cy="30" r="4.5" fill="#00B336"/>
      <path d="M30 30L31.5 31.5L34 29" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Base Tape/Disk Chassis -->
      <rect x="12" y="47" width="40" height="6" rx="1.5" fill="#1E293B" stroke="#00B336" stroke-width="1.5"/>
      <circle cx="16" cy="50" r="1" fill="#34D399"/>
    </svg>`,
  },
  {
    key: 'onprem_active_directory',
    name: 'Active Directory (AD DS / Domain Controller)',
    provider: 'onprem',
    category: 'security',
    brandColor: '#0078D4',
    defaultResourceType: 'onprem_active_directory_domain',
    defaultSpecs: { count: 1 },
    description: 'Controlador de Domínio Windows Server (DC), autenticação centralizada Kerberos/LDAP, DNS integrado e GPO',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#0078D4" fill-opacity="0.12" stroke="#0078D4" stroke-width="2"/>
      <!-- Root Domain Tree Node -->
      <rect x="25" y="12" width="14" height="10" rx="2" fill="#0078D4"/>
      <path d="M32 15L35 18L32 21L29 18L32 15Z" fill="white"/>
      <!-- Hierarchy Branches -->
      <path d="M32 22V29M18 29H46M18 29V36M46 29V36" stroke="#0078D4" stroke-width="2"/>
      <!-- Leaf Organizational Units / Computers -->
      <rect x="11" y="36" width="14" height="10" rx="2" fill="#0284C7"/>
      <circle cx="18" cy="41" r="2" fill="white"/>
      <rect x="39" y="36" width="14" height="10" rx="2" fill="#0284C7"/>
      <circle cx="46" cy="41" r="2" fill="white"/>
      <!-- Domain Security Key Base -->
      <rect x="14" y="50" width="36" height="4" rx="1" fill="#0078D4"/>
    </svg>`,
  },
  {
    key: 'onprem_dns_dhcp',
    name: 'Servidor DNS & DHCP Local',
    provider: 'onprem',
    category: 'networking',
    brandColor: '#6366F1',
    defaultResourceType: 'onprem_dns_server',
    defaultSpecs: { count: 1 },
    description: 'Serviço de resolução de nomes corporativo (Forward & Reverse DNS) e distribuição dinâmica de IPs (DHCP Scope)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#6366F1" fill-opacity="0.12" stroke="#6366F1" stroke-width="2"/>
      <!-- DNS Globe & IP Tag -->
      <circle cx="32" cy="26" r="12" stroke="#6366F1" stroke-width="2.5" fill="#6366F1" fill-opacity="0.15"/>
      <ellipse cx="32" cy="26" rx="5" ry="12" stroke="#6366F1" stroke-width="1.8"/>
      <line x1="20" y1="26" x2="44" y2="26" stroke="#6366F1" stroke-width="1.8"/>
      <!-- Dynamic IP address badge -->
      <rect x="14" y="44" width="36" height="9" rx="2" fill="#1E293B" stroke="#6366F1" stroke-width="1.5"/>
      <text x="32" y="50.5" fill="#818CF8" font-size="6.5" font-family="monospace" font-weight="bold" text-anchor="middle">192.168.1.1</text>
    </svg>`,
  },
  {
    key: 'onprem_messaging_broker',
    name: 'Message Broker (RabbitMQ / Kafka On-Prem)',
    provider: 'onprem',
    category: 'integration',
    brandColor: '#F59E0B',
    defaultResourceType: 'onprem_message_broker',
    defaultSpecs: { count: 1 },
    description: 'Servidor de enfileiramento de mensagens e barramento assíncrono de eventos (RabbitMQ AMQP / Apache Kafka local)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#F59E0B" fill-opacity="0.12" stroke="#F59E0B" stroke-width="2"/>
      <!-- Message Queue Pipe -->
      <rect x="12" y="24" width="40" height="18" rx="4" fill="#1E293B" stroke="#F59E0B" stroke-width="2"/>
      <!-- Enqueued Packets -->
      <rect x="17" y="28" width="6" height="10" rx="1.5" fill="#F59E0B"/>
      <rect x="26" y="28" width="6" height="10" rx="1.5" fill="#FBBF24"/>
      <rect x="35" y="28" width="6" height="10" rx="1.5" fill="#FDE047"/>
      <!-- Flow Arrow -->
      <path d="M43 33H48M48 33L45 30M48 33L45 36" stroke="#34D399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="20" cy="48" r="1.5" fill="#F59E0B"/>
      <circle cx="44" cy="48" r="1.5" fill="#F59E0B"/>
    </svg>`,
  },
  {
    key: 'onprem_cicd_server',
    name: 'Servidor CI/CD (Jenkins / GitLab Runner)',
    provider: 'onprem',
    category: 'devops',
    brandColor: '#D97706',
    defaultResourceType: 'onprem_cicd_agent',
    defaultSpecs: { count: 1 },
    description: 'Servidor e runners de automação de compilação, testes automatizados e deploy contínuo em ambiente local',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#D97706" fill-opacity="0.12" stroke="#D97706" stroke-width="2"/>
      <!-- Pipeline Gear & Flow -->
      <circle cx="24" cy="28" r="8" stroke="#D97706" stroke-width="2.5" fill="#D97706" fill-opacity="0.2"/>
      <circle cx="24" cy="28" r="3" fill="#D97706"/>
      <circle cx="42" cy="28" r="6" stroke="#F59E0B" stroke-width="2.5" fill="#F59E0B" fill-opacity="0.2"/>
      <circle cx="42" cy="28" r="2" fill="#F59E0B"/>
      <!-- Connect Flow -->
      <path d="M32 28H36" stroke="#D97706" stroke-width="2"/>
      <!-- Pipeline Status Bar -->
      <rect x="14" y="44" width="36" height="8" rx="2" fill="#1E293B" stroke="#D97706" stroke-width="1.5"/>
      <rect x="18" y="47" width="8" height="2" rx="1" fill="#10B981"/>
      <rect x="28" y="47" width="8" height="2" rx="1" fill="#10B981"/>
      <rect x="38" y="47" width="8" height="2" rx="1" fill="#38BDF8"/>
    </svg>`,
  },
  {
    key: 'onprem_monitoring_zabbix',
    name: 'Monitoramento & Métricas (Zabbix / Prometheus)',
    provider: 'onprem',
    category: 'analytics',
    brandColor: '#D32F2F',
    defaultResourceType: 'onprem_monitoring_host',
    defaultSpecs: { count: 1 },
    description: 'Servidor de telemetria, coleta de métricas via SNMP/Agente, alertas operacionais e painel NOC (Zabbix/Prometheus/Grafana)',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#D32F2F" fill-opacity="0.12" stroke="#D32F2F" stroke-width="2"/>
      <!-- Monitor Screen -->
      <rect x="12" y="14" width="40" height="28" rx="3" fill="#1E293B" stroke="#D32F2F" stroke-width="2"/>
      <!-- Telemetry ECG Graph -->
      <path d="M16 28H23L26 20L31 36L35 24L38 28H48" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Monitor Stand -->
      <path d="M28 42L25 50H39L36 42" stroke="#D32F2F" stroke-width="2" fill="#D32F2F" fill-opacity="0.3"/>
    </svg>`,
  },

  // ==========================================
  // 3. Redes e Segurança On-Premises (Networking & Security)
  // ==========================================
  {
    key: 'onprem_firewall_appliance',
    name: 'Firewall Corporativo (FortiGate / Palo Alto / pfSense)',
    provider: 'onprem',
    category: 'security',
    brandColor: '#DC2626',
    defaultResourceType: 'onprem_firewall_appliance',
    defaultSpecs: { count: 1, isPublic: true },
    description: 'Next-Generation Firewall (NGFW) físico de borda com inspeção profunda de pacotes (DPI), IPS/IDS e filtragem de pacotes',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#DC2626" fill-opacity="0.12" stroke="#DC2626" stroke-width="2"/>
      <!-- Brick Firewall Wall -->
      <rect x="12" y="16" width="40" height="32" rx="3" fill="#DC2626" fill-opacity="0.8" stroke="#B91C1C" stroke-width="2"/>
      <!-- Brick Pattern Lines -->
      <line x1="12" y1="24" x2="52" y2="24" stroke="white" stroke-width="1.5"/>
      <line x1="12" y1="32" x2="52" y2="32" stroke="white" stroke-width="1.5"/>
      <line x1="12" y1="40" x2="52" y2="40" stroke="white" stroke-width="1.5"/>
      <!-- Vertical Brick Joints -->
      <line x1="22" y1="16" x2="22" y2="24" stroke="white" stroke-width="1.5"/>
      <line x1="36" y1="16" x2="36" y2="24" stroke="white" stroke-width="1.5"/>
      <line x1="17" y1="24" x2="17" y2="32" stroke="white" stroke-width="1.5"/>
      <line x1="30" y1="24" x2="30" y2="32" stroke="white" stroke-width="1.5"/>
      <line x1="44" y1="24" x2="44" y2="32" stroke="white" stroke-width="1.5"/>
      <line x1="24" y1="32" x2="24" y2="40" stroke="white" stroke-width="1.5"/>
      <line x1="38" y1="32" x2="38" y2="40" stroke="white" stroke-width="1.5"/>
      <!-- Center Shield & Flame -->
      <circle cx="32" cy="32" r="9" fill="#1E293B" stroke="white" stroke-width="1.5"/>
      <path d="M32 26V38M26 32H38" stroke="#FBBF24" stroke-width="2.2" stroke-linecap="round"/>
      <circle cx="32" cy="32" r="2" fill="#DC2626"/>
    </svg>`,
  },
  {
    key: 'onprem_core_switch',
    name: 'Switch Core / Roteador (Cisco / Juniper)',
    provider: 'onprem',
    category: 'networking',
    brandColor: '#0284C7',
    defaultResourceType: 'onprem_network_switch',
    defaultSpecs: { count: 1 },
    description: 'Equipamento de rede física L2/L3 com suporte a VLANs 802.1Q, agregação de portas (LACP) e roteamento estático/dinâmico',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#0284C7" fill-opacity="0.12" stroke="#0284C7" stroke-width="2"/>
      <!-- Switch Chassis -->
      <rect x="10" y="20" width="44" height="24" rx="3" fill="#1E293B" stroke="#0284C7" stroke-width="2"/>
      <!-- RJ45 Port Bays (8 ports) -->
      <rect x="14" y="24" width="4" height="5" rx="0.5" fill="#38BDF8"/>
      <rect x="20" y="24" width="4" height="5" rx="0.5" fill="#38BDF8"/>
      <rect x="26" y="24" width="4" height="5" rx="0.5" fill="#38BDF8"/>
      <rect x="32" y="24" width="4" height="5" rx="0.5" fill="#38BDF8"/>
      <rect x="38" y="24" width="4" height="5" rx="0.5" fill="#34D399"/>
      <rect x="44" y="24" width="4" height="5" rx="0.5" fill="#34D399"/>
      <!-- Cross Routing Arrows -->
      <path d="M18 36L30 36M30 36L26 33M30 36L26 39" stroke="#38BDF8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M46 36L34 36M34 36L38 33M34 36L38 39" stroke="#34D399" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    key: 'onprem_load_balancer',
    name: 'Load Balancer (F5 BIG-IP / HAProxy)',
    provider: 'onprem',
    category: 'networking',
    brandColor: '#E11D48',
    defaultResourceType: 'onprem_load_balancer_appliance',
    defaultSpecs: { count: 1 },
    description: 'Controlador de entrega de aplicações (ADC), balanceamento de carga L4/L7, descarregamento SSL e alta disponibilidade',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#E11D48" fill-opacity="0.12" stroke="#E11D48" stroke-width="2"/>
      <!-- Inbound traffic node -->
      <circle cx="16" cy="32" r="5" fill="#E11D48"/>
      <!-- Outbound distributed targets -->
      <circle cx="48" cy="18" r="4" fill="#38BDF8"/>
      <circle cx="48" cy="32" r="4" fill="#34D399"/>
      <circle cx="48" cy="46" r="4" fill="#FBBF24"/>
      <!-- Fork Distribution Lines -->
      <path d="M21 32H30M30 32L44 18M30 32H44M30 32L44 46" stroke="#E11D48" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    key: 'onprem_vpn_gateway',
    name: 'Gateway VPN IPsec / SSL (Site-to-Site)',
    provider: 'onprem',
    category: 'networking',
    brandColor: '#8B5CF6',
    defaultResourceType: 'onprem_vpn_gateway_tunnel',
    defaultSpecs: { count: 1 },
    description: 'Equipamento concentrador de túneis VPN IPsec para interconexão híbrida segura com AWS Direct Connect e Azure ExpressRoute',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#8B5CF6" fill-opacity="0.12" stroke="#8B5CF6" stroke-width="2"/>
      <!-- VPN Tunnel Pipe -->
      <path d="M12 32H52" stroke="#8B5CF6" stroke-width="6" stroke-linecap="round"/>
      <!-- Inner encrypted core -->
      <path d="M12 32H52" stroke="#C4B5FD" stroke-width="2" stroke-dasharray="3 3"/>
      <!-- Lock Shackle & Body -->
      <rect x="25" y="27" width="14" height="12" rx="2" fill="#7C3AED" stroke="white" stroke-width="1.5"/>
      <path d="M28 27V23C28 20.8 29.8 19 32 19C34.2 19 36 20.8 36 23V27" stroke="white" stroke-width="2" stroke-linecap="round"/>
      <circle cx="32" cy="33" r="1.5" fill="white"/>
    </svg>`,
  },
  {
    key: 'onprem_kubernetes_cluster',
    name: 'Kubernetes On-Premises (OpenShift / Rancher)',
    provider: 'onprem',
    category: 'container',
    brandColor: '#326CE5',
    defaultResourceType: 'onprem_k8s_cluster',
    defaultSpecs: { count: 3, memory: 16 },
    description: 'Cluster Kubernetes instalado em servidores locais ou VMs com Red Hat OpenShift, Rancher ou RKE2',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#326CE5" fill-opacity="0.12" stroke="#326CE5" stroke-width="2"/>
      <!-- Kubernetes 7-spoke Helm Wheel -->
      <circle cx="32" cy="32" r="14" stroke="#326CE5" stroke-width="2.5" fill="#326CE5" fill-opacity="0.15"/>
      <circle cx="32" cy="32" r="5" fill="#326CE5"/>
      <path d="M32 18V27M32 37V46M18 32H27M37 32H46M22 22L28 28M36 36L42 42M42 22L36 28M28 36L22 42" stroke="#326CE5" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
  },
  {
    key: 'onprem_ups_power',
    name: 'Nobreak / UPS & PDU de Rack',
    provider: 'onprem',
    category: 'compute',
    brandColor: '#EAB308',
    defaultResourceType: 'onprem_ups_power_unit',
    defaultSpecs: { count: 1 },
    description: 'Sistema de alimentação ininterrupta (UPS/Nobreak) e régua de distribuição inteligente (PDU) para infraestrutura de datacenter',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#EAB308" fill-opacity="0.12" stroke="#EAB308" stroke-width="2"/>
      <!-- UPS Chassis -->
      <rect x="12" y="20" width="40" height="24" rx="3" fill="#1E293B" stroke="#EAB308" stroke-width="2"/>
      <!-- Battery Status Gauge -->
      <rect x="18" y="26" width="14" height="12" rx="2" stroke="#EAB308" stroke-width="1.5" fill="none"/>
      <rect x="32" y="30" width="2" height="4" rx="0.5" fill="#EAB308"/>
      <!-- Battery Cells -->
      <rect x="21" y="29" width="2.5" height="6" fill="#10B981"/>
      <rect x="25" y="29" width="2.5" height="6" fill="#10B981"/>
      <rect x="29" y="29" width="2.5" height="6" fill="#10B981"/>
      <!-- Lightning Power Symbol -->
      <path d="M42 24L37 32H42L38 40" stroke="#FDE047" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  }
];
