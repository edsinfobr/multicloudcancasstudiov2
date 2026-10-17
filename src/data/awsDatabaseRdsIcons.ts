import { CloudIconDefinition } from '../types';

export const AWS_DATABASE_RDS_ICONS: CloudIconDefinition[] = [
  // 1. Amazon RDS Instance
  {
    key: 'aws_rds_instance',
    name: 'RDS Instance',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_db_instance',
    defaultSpecs: { instanceType: 'db.r6g.xlarge', storageGb: 100, engine: 'postgres', count: 1 },
    description: 'Instância de banco de dados gerenciada Amazon RDS para alta disponibilidade e escalabilidade',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Container -->
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="#C925D1" stroke-width="3" fill="none" />
      <!-- Text Amazon RDS -->
      <text x="11" y="21" fill="#C925D1" font-size="8.5" font-family="Arial, sans-serif" font-weight="bold">Amazon</text>
      <text x="11" y="32" fill="#C925D1" font-size="10.5" font-family="Arial, sans-serif" font-weight="bold">RDS</text>
      <!-- Mini Cylinder on bottom-right -->
      <g transform="translate(36, 26)">
        <ellipse cx="11" cy="6" rx="9" ry="4" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 6v17c0 2.2 4 4 9 4s9-1.8 9-4V6" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 12c0 2.2 4 4 9 4s9-1.8 9-4" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 18c0 2.2 4 4 9 4s9-1.8 9-4" stroke="#C925D1" stroke-width="2.5" fill="none" />
      </g>
    </svg>`,
  },

  // 2. Amazon RDS Instance (Alternate)
  {
    key: 'aws_rds_instance_alt',
    name: 'RDS Instance Alternate',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_db_instance',
    defaultSpecs: { instanceType: 'db.t4g.medium', storageGb: 50, count: 1 },
    description: 'Instância Amazon RDS em notação compacta/alternativa para diagramas simplificados',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="#C925D1" stroke-width="3.5" fill="none" />
      <text x="10" y="24" fill="#C925D1" font-size="9" font-family="Arial, sans-serif" font-weight="bold">Amazon</text>
      <text x="10" y="38" fill="#C925D1" font-size="12" font-family="Arial, sans-serif" font-weight="bold">RDS</text>
    </svg>`,
  },

  // 3. Amazon Aurora Instance
  {
    key: 'aws_aurora_instance',
    name: 'Aurora Instance',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_rds_cluster_instance',
    defaultSpecs: { instanceType: 'db.r6g.large', engine: 'aurora-postgresql', count: 1 },
    description: 'Nó de processamento do Amazon Aurora de alta performance compatível com MySQL e PostgreSQL',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Container -->
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="#C925D1" stroke-width="3" fill="none" />
      <!-- Text Amazon Aurora -->
      <text x="10" y="20" fill="#C925D1" font-size="8" font-family="Arial, sans-serif" font-weight="bold">Amazon</text>
      <text x="10" y="30" fill="#C925D1" font-size="8" font-family="Arial, sans-serif" font-weight="bold">Aurora</text>
      <!-- Cylinder -->
      <g transform="translate(36, 26)">
        <ellipse cx="11" cy="6" rx="9" ry="4" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 6v17c0 2.2 4 4 9 4s9-1.8 9-4V6" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 12c0 2.2 4 4 9 4s9-1.8 9-4" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 18c0 2.2 4 4 9 4s9-1.8 9-4" stroke="#C925D1" stroke-width="2.5" fill="none" />
      </g>
    </svg>`,
  },

  // 4. Amazon Aurora Instance (Alternate)
  {
    key: 'aws_aurora_instance_alt',
    name: 'Aurora Instance Alternate',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_rds_cluster_instance',
    defaultSpecs: { instanceType: 'db.r6g.large', count: 1 },
    description: 'Instância Amazon Aurora em notação compacta/alternativa para diagramas simplificados',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="#C925D1" stroke-width="3.5" fill="none" />
      <text x="10" y="24" fill="#C925D1" font-size="8.5" font-family="Arial, sans-serif" font-weight="bold">Amazon</text>
      <text x="10" y="37" fill="#C925D1" font-size="8.5" font-family="Arial, sans-serif" font-weight="bold">Aurora</text>
    </svg>`,
  },

  // 5. Amazon Aurora MySQL Instance
  {
    key: 'aws_aurora_mysql_instance',
    name: 'Aurora MySQL Instance',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_rds_cluster_instance',
    defaultSpecs: { instanceType: 'db.r6g.large', engine: 'aurora-mysql', count: 1 },
    description: 'Instância Amazon Aurora compatível com MySQL com throughput até 5x maior',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="#C925D1" stroke-width="3" fill="none" />
      <text x="10" y="24" fill="#C925D1" font-size="9" font-family="Arial, sans-serif" font-weight="bold">MySQL</text>
      <g transform="translate(36, 26)">
        <ellipse cx="11" cy="6" rx="9" ry="4" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 6v17c0 2.2 4 4 9 4s9-1.8 9-4V6" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 12c0 2.2 4 4 9 4s9-1.8 9-4" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 18c0 2.2 4 4 9 4s9-1.8 9-4" stroke="#C925D1" stroke-width="2.5" fill="none" />
      </g>
    </svg>`,
  },

  // 6. Amazon Aurora MySQL Instance (Alternate)
  {
    key: 'aws_aurora_mysql_instance_alt',
    name: 'Aurora MySQL Instance Alternate',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_rds_cluster_instance',
    defaultSpecs: { instanceType: 'db.t4g.medium', engine: 'aurora-mysql', count: 1 },
    description: 'Instância MySQL em notação de caixa compacta/alternativa',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="#C925D1" stroke-width="3.5" fill="none" />
      <text x="10" y="25" fill="#C925D1" font-size="10.5" font-family="Arial, sans-serif" font-weight="bold">MySQL</text>
    </svg>`,
  },

  // 7. Amazon Aurora PIOPS Instance
  {
    key: 'aws_aurora_piops_instance',
    name: 'Aurora PIOPS Instance',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_rds_cluster_instance',
    defaultSpecs: { instanceType: 'db.r6g.2xlarge', count: 1 },
    description: 'Instância de banco de dados provisionada com IOPS Provisionado (PIOPS) para latência ultra-baixa',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="#C925D1" stroke-width="3.5" fill="none" />
      <text x="18" y="47" fill="#C925D1" font-size="11" font-family="Arial, sans-serif" font-weight="bold">PIOPS</text>
    </svg>`,
  },

  // 8. Amazon RDS MariaDB Instance
  {
    key: 'aws_rds_mariadb_instance',
    name: 'RDS MariaDB Instance',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_db_instance',
    defaultSpecs: { instanceType: 'db.m6g.large', storageGb: 100, engine: 'mariadb', count: 1 },
    description: 'Instância de banco de dados relacional MariaDB totalmente gerenciada pelo RDS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="#C925D1" stroke-width="3" fill="none" />
      <text x="9" y="24" fill="#C925D1" font-size="9" font-family="Arial, sans-serif" font-weight="bold">MariaDB</text>
      <g transform="translate(36, 26)">
        <ellipse cx="11" cy="6" rx="9" ry="4" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 6v17c0 2.2 4 4 9 4s9-1.8 9-4V6" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 12c0 2.2 4 4 9 4s9-1.8 9-4" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 18c0 2.2 4 4 9 4s9-1.8 9-4" stroke="#C925D1" stroke-width="2.5" fill="none" />
      </g>
    </svg>`,
  },

  // 9. Amazon RDS MariaDB Instance (Alternate)
  {
    key: 'aws_rds_mariadb_instance_alt',
    name: 'RDS MariaDB Instance Alternate',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_db_instance',
    defaultSpecs: { instanceType: 'db.t4g.medium', storageGb: 50, engine: 'mariadb', count: 1 },
    description: 'Instância MariaDB em notação compacta/alternativa',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="#C925D1" stroke-width="3.5" fill="none" />
      <text x="9" y="25" fill="#C925D1" font-size="9.5" font-family="Arial, sans-serif" font-weight="bold">MariaDB</text>
    </svg>`,
  },

  // 10. Amazon RDS Oracle Instance
  {
    key: 'aws_rds_oracle_instance',
    name: 'RDS Oracle Instance',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_db_instance',
    defaultSpecs: { instanceType: 'db.m6i.xlarge', storageGb: 200, engine: 'oracle-ee', count: 1 },
    description: 'Instância de banco de dados Oracle Database Enterprise / Standard gerenciada no AWS RDS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="#C925D1" stroke-width="3" fill="none" />
      <text x="9" y="24" fill="#C925D1" font-size="9.5" font-family="Arial, sans-serif" font-weight="bold">Oracle</text>
      <g transform="translate(36, 26)">
        <ellipse cx="11" cy="6" rx="9" ry="4" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 6v17c0 2.2 4 4 9 4s9-1.8 9-4V6" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 12c0 2.2 4 4 9 4s9-1.8 9-4" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 18c0 2.2 4 4 9 4s9-1.8 9-4" stroke="#C925D1" stroke-width="2.5" fill="none" />
      </g>
    </svg>`,
  },

  // 11. Amazon RDS Oracle Instance (Alternate)
  {
    key: 'aws_rds_oracle_instance_alt',
    name: 'RDS Oracle Instance Alternate',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_db_instance',
    defaultSpecs: { instanceType: 'db.m6i.large', storageGb: 100, engine: 'oracle-se2', count: 1 },
    description: 'Instância Oracle Database em notação compacta/alternativa',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="#C925D1" stroke-width="3.5" fill="none" />
      <text x="9" y="25" fill="#C925D1" font-size="10.5" font-family="Arial, sans-serif" font-weight="bold">Oracle</text>
    </svg>`,
  },

  // 12. Amazon RDS PostgreSQL Instance
  {
    key: 'aws_rds_postgresql_instance',
    name: 'RDS PostgreSQL Instance',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_db_instance',
    defaultSpecs: { instanceType: 'db.m6g.xlarge', storageGb: 100, engine: 'postgres', count: 1 },
    description: 'Instância do PostgreSQL totalmente gerenciada no RDS com suporte a extensões e réplicas',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="#C925D1" stroke-width="3" fill="none" />
      <text x="7.5" y="23" fill="#C925D1" font-size="7.5" font-family="Arial, sans-serif" font-weight="bold">PostgreSQL</text>
      <g transform="translate(36, 26)">
        <ellipse cx="11" cy="6" rx="9" ry="4" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 6v17c0 2.2 4 4 9 4s9-1.8 9-4V6" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 12c0 2.2 4 4 9 4s9-1.8 9-4" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 18c0 2.2 4 4 9 4s9-1.8 9-4" stroke="#C925D1" stroke-width="2.5" fill="none" />
      </g>
    </svg>`,
  },

  // 13. Amazon RDS PostgreSQL Instance (Alternate)
  {
    key: 'aws_rds_postgresql_instance_alt',
    name: 'RDS PostgreSQL Instance Alternate',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_db_instance',
    defaultSpecs: { instanceType: 'db.t4g.medium', storageGb: 50, engine: 'postgres', count: 1 },
    description: 'Instância PostgreSQL em notação compacta/alternativa',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="#C925D1" stroke-width="3.5" fill="none" />
      <text x="7" y="24" fill="#C925D1" font-size="8" font-family="Arial, sans-serif" font-weight="bold">PostgreSQL</text>
    </svg>`,
  },

  // 14. Amazon RDS SQL Server Instance
  {
    key: 'aws_rds_sqlserver_instance',
    name: 'RDS SQL Server Instance',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_db_instance',
    defaultSpecs: { instanceType: 'db.m6i.xlarge', storageGb: 200, engine: 'sqlserver-ex', count: 1 },
    description: 'Instância Microsoft SQL Server gerenciada no AWS RDS com backup automatizado e alta disponibilidade',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="#C925D1" stroke-width="3" fill="none" />
      <text x="7.5" y="23" fill="#C925D1" font-size="7.5" font-family="Arial, sans-serif" font-weight="bold">SQL Server</text>
      <g transform="translate(36, 26)">
        <ellipse cx="11" cy="6" rx="9" ry="4" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 6v17c0 2.2 4 4 9 4s9-1.8 9-4V6" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 12c0 2.2 4 4 9 4s9-1.8 9-4" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 18c0 2.2 4 4 9 4s9-1.8 9-4" stroke="#C925D1" stroke-width="2.5" fill="none" />
      </g>
    </svg>`,
  },

  // 15. Amazon RDS SQL Server Instance (Alternate)
  {
    key: 'aws_rds_sqlserver_instance_alt',
    name: 'RDS SQL Server Instance Alternate',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_db_instance',
    defaultSpecs: { instanceType: 'db.m6i.large', storageGb: 100, engine: 'sqlserver-web', count: 1 },
    description: 'Instância SQL Server em notação compacta/alternativa',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="#C925D1" stroke-width="3.5" fill="none" />
      <text x="7" y="24" fill="#C925D1" font-size="8" font-family="Arial, sans-serif" font-weight="bold">SQL Server</text>
    </svg>`,
  },

  // 16. Amazon RDS Proxy Instance
  {
    key: 'aws_rds_proxy_instance',
    name: 'RDS Proxy Instance',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_db_proxy',
    defaultSpecs: { count: 1 },
    description: 'Proxy de banco de dados totalmente gerenciado para pooling de conexões e resiliência a failovers',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="#C925D1" stroke-width="3" fill="none" />
      <text x="9" y="19" fill="#C925D1" font-size="7.5" font-family="Arial, sans-serif" font-weight="bold">RDS Proxy</text>
      <g transform="translate(36, 26)">
        <ellipse cx="11" cy="6" rx="9" ry="4" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 6v17c0 2.2 4 4 9 4s9-1.8 9-4V6" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 12c0 2.2 4 4 9 4s9-1.8 9-4" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 18c0 2.2 4 4 9 4s9-1.8 9-4" stroke="#C925D1" stroke-width="2.5" fill="none" />
      </g>
    </svg>`,
  },

  // 17. Amazon RDS Proxy Instance (Alternate)
  {
    key: 'aws_rds_proxy_instance_alt',
    name: 'RDS Proxy Instance Alternate',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_db_proxy',
    defaultSpecs: { count: 1 },
    description: 'Proxy de conexões do RDS em notação compacta/alternativa',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="52" height="52" rx="10" stroke="#C925D1" stroke-width="3.5" fill="none" />
      <text x="10" y="24" fill="#C925D1" font-size="9" font-family="Arial, sans-serif" font-weight="bold">RDS</text>
      <text x="10" y="37" fill="#C925D1" font-size="9" font-family="Arial, sans-serif" font-weight="bold">Proxy</text>
    </svg>`,
  },

  // 18. Amazon RDS Blue/Green Deployments
  {
    key: 'aws_rds_blue_green_deployments',
    name: 'RDS Blue/Green Deployments',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_db_instance',
    defaultSpecs: { count: 1 },
    description: 'Atualizações seguras e sem downtime do banco de dados com replicação Blue/Green gerenciada',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Left Cylinder (Blue) -->
      <g transform="translate(6, 12)">
        <ellipse cx="10" cy="7" rx="8" ry="4" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 7v24c0 2.2 3.6 4 8 4s8-1.8 8-4V7" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 15c0 2.2 3.6 4 8 4s8-1.8 8-4" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 23c0 2.2 3.6 4 8 4s8-1.8 8-4" stroke="#C925D1" stroke-width="2.5" fill="none" />
      </g>
      <!-- Center Arrow -->
      <path d="M27 32h10m-3-4l4 4-4 4" stroke="#C925D1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Right Cylinder (Green / Upgraded with Chevrons) -->
      <g transform="translate(38, 12)">
        <ellipse cx="10" cy="7" rx="8" ry="4" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M2 7v24c0 2.2 3.6 4 8 4s8-1.8 8-4V7" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <!-- Chevrons inside -->
        <path d="M6 25l4-4 4 4" stroke="#C925D1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M6 19l4-4 4 4" stroke="#C925D1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </svg>`,
  },

  // 19. Amazon RDS Multi-AZ
  {
    key: 'aws_rds_multi_az',
    name: 'RDS Multi-AZ',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_db_instance',
    defaultSpecs: { count: 2 },
    description: 'Replicação síncrona primária e standby em diferentes Zonas de Disponibilidade para alta resiliência',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Primary Cylinder (Left, Larger) -->
      <g transform="translate(8, 10)">
        <ellipse cx="13" cy="8" rx="11" ry="5" stroke="#C925D1" stroke-width="2.8" fill="none" />
        <path d="M2 8v30c0 2.8 5 5 11 5s11-2.2 11-5V8" stroke="#C925D1" stroke-width="2.8" fill="none" />
        <path d="M2 18c0 2.8 5 5 11 5s11-2.2 11-5" stroke="#C925D1" stroke-width="2.8" fill="none" />
        <path d="M2 28c0 2.8 5 5 11 5s11-2.2 11-5" stroke="#C925D1" stroke-width="2.8" fill="none" />
      </g>
      <!-- Horizontal Link -->
      <line x1="32" y1="32" x2="44" y2="32" stroke="#C925D1" stroke-width="2.5" />
      <!-- Standby Cylinder (Right, Smaller) -->
      <g transform="translate(42, 18)">
        <ellipse cx="9" cy="6" rx="7.5" ry="3.5" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M1.5 6v18c0 2 3.4 3.5 7.5 3.5s7.5-1.5 7.5-3.5V6" stroke="#C925D1" stroke-width="2.5" fill="none" />
        <path d="M1.5 12c0 2 3.4 3.5 7.5 3.5s7.5-1.5 7.5-3.5" stroke="#C925D1" stroke-width="2.5" fill="none" />
      </g>
    </svg>`,
  },

  // 20. Amazon RDS Multi-AZ DB Cluster
  {
    key: 'aws_rds_multi_az_db_cluster',
    name: 'RDS Multi-AZ DB Cluster',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_rds_cluster',
    defaultSpecs: { count: 3 },
    description: 'Cluster com 1 nó de escrita e 2 nós de leitura legíveis em diferentes AZs para failovers em < 35s',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Primary Cylinder (Left) -->
      <g transform="translate(6, 12)">
        <ellipse cx="12" cy="7" rx="10" ry="4.5" stroke="#C925D1" stroke-width="2.8" fill="none" />
        <path d="M2 7v28c0 2.5 4.5 4.5 10 4.5s10-2 10-4.5V7" stroke="#C925D1" stroke-width="2.8" fill="none" />
        <path d="M2 16c0 2.5 4.5 4.5 10 4.5s10-2 10-4.5" stroke="#C925D1" stroke-width="2.8" fill="none" />
        <path d="M2 25c0 2.5 4.5 4.5 10 4.5s10-2 10-4.5" stroke="#C925D1" stroke-width="2.8" fill="none" />
      </g>
      <!-- Branch Lines -->
      <path d="M26 31l16-12" stroke="#C925D1" stroke-width="2.5" />
      <path d="M26 33l16 12" stroke="#C925D1" stroke-width="2.5" />
      <!-- Top Replica -->
      <g transform="translate(42, 6)">
        <ellipse cx="8" cy="5" rx="7" ry="3" stroke="#C925D1" stroke-width="2.2" fill="none" />
        <path d="M1 5v14c0 1.7 3.1 3 7 3s7-1.3 7-3V5" stroke="#C925D1" stroke-width="2.2" fill="none" />
        <path d="M1 10c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="#C925D1" stroke-width="2.2" fill="none" />
      </g>
      <!-- Bottom Replica -->
      <g transform="translate(42, 38)">
        <ellipse cx="8" cy="5" rx="7" ry="3" stroke="#C925D1" stroke-width="2.2" fill="none" />
        <path d="M1 5v14c0 1.7 3.1 3 7 3s7-1.3 7-3V5" stroke="#C925D1" stroke-width="2.2" fill="none" />
        <path d="M1 10c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="#C925D1" stroke-width="2.2" fill="none" />
      </g>
    </svg>`,
  },

  // 21. Amazon RDS Optimized Writes
  {
    key: 'aws_rds_optimized_writes',
    name: 'RDS Optimized Writes',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_db_instance',
    defaultSpecs: { count: 1 },
    description: 'Até 2x de taxa de transferência de escrita em instâncias MySQL, MariaDB e PostgreSQL',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Database Cylinder -->
      <g transform="translate(8, 8)">
        <ellipse cx="17" cy="9" rx="15" ry="6" stroke="#C925D1" stroke-width="2.8" fill="none" />
        <path d="M2 9v36c0 3.3 6.7 6 15 6s15-2.7 15-6V9" stroke="#C925D1" stroke-width="2.8" fill="none" />
        <!-- Data lines -->
        <path d="M10 25h14M10 32h14M10 39h10" stroke="#C925D1" stroke-width="2.5" stroke-linecap="round" />
      </g>
      <!-- Pencil / Pen Icon -->
      <g transform="translate(37, 24) rotate(25)">
        <path d="M2 2h6l2 16-5 4-5-4 2-16z" stroke="#C925D1" stroke-width="2.5" stroke-linejoin="round" fill="white" />
        <line x1="2" y1="6" x2="8" y2="6" stroke="#C925D1" stroke-width="2" />
        <path d="M4 22l1 3 1-3" stroke="#C925D1" stroke-width="1.8" />
      </g>
    </svg>`,
  },

  // 22. Amazon RDS Trusted Language Extensions for PostgreSQL
  {
    key: 'aws_rds_tle_postgresql',
    name: 'RDS TLE for PostgreSQL',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_db_instance',
    defaultSpecs: { count: 1 },
    description: 'Kit de desenvolvimento para criação e execução segura de extensões PostgreSQL personalizadas no RDS',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Document outline with dogear -->
      <path d="M14 8h24l12 12v36H14V8z" stroke="#C925D1" stroke-width="3.5" stroke-linejoin="round" fill="none" />
      <!-- Fold corner -->
      <path d="M38 8v12h12" stroke="#C925D1" stroke-width="3" stroke-linejoin="round" fill="none" />
      <!-- pg_ text -->
      <text x="17" y="41" fill="#C925D1" font-size="16" font-family="Arial, sans-serif" font-weight="bold">pg_</text>
    </svg>`,
  },

  // 23. Amazon Aurora Trusted Language Extensions for PostgreSQL
  {
    key: 'aws_aurora_tle_postgresql',
    name: 'Aurora TLE for PostgreSQL',
    provider: 'aws',
    category: 'database',
    brandColor: '#C925D1',
    defaultResourceType: 'aws_rds_cluster',
    defaultSpecs: { count: 1 },
    description: 'Execução de extensões seguras de linguagem confiável no Amazon Aurora PostgreSQL',
    svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Document outline with dogear -->
      <path d="M14 8h24l12 12v36H14V8z" stroke="#C925D1" stroke-width="3.5" stroke-linejoin="round" fill="none" />
      <!-- Fold corner -->
      <path d="M38 8v12h12" stroke="#C925D1" stroke-width="3" stroke-linejoin="round" fill="none" />
      <!-- pg_ text -->
      <text x="17" y="41" fill="#C925D1" font-size="16" font-family="Arial, sans-serif" font-weight="bold">pg_</text>
    </svg>`,
  },
];
