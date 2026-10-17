import { DiagramState, DiagramNode, DiagramContainer, DiagramLink } from '../types';
import { detectCircularLinks } from './schemaValidator';

export type SecuritySeverity = 'critical' | 'high' | 'medium' | 'low';

export interface SecurityFinding {
  id: string;
  title: string;
  description: string;
  severity: SecuritySeverity;
  category: 'network' | 'iam' | 'compute' | 'storage' | 'database';
  resourceId?: string;
  resourceName?: string;
  recommendation: string;
  remediationSnippet?: string;
}

export interface SecurityLinterReport {
  overallScore: number; // 0 to 100
  totalFindings: number;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  findings: SecurityFinding[];
  evaluatedAt: string;
}

export const runCloudSecurityLinter = (diagram: DiagramState): SecurityLinterReport => {
  const findings: SecurityFinding[] = [];
  const nodes = diagram.nodes || [];
  const containers = diagram.containers || [];
  const links = diagram.links || [];

  // Map containers by ID for quick lookup
  const containerMap = new Map<string, DiagramContainer>();
  containers.forEach((c) => containerMap.set(c.id, c));

  // Set of nodes that are firewall/WAF/security tools
  const isSecurityService = (n: DiagramNode): boolean => {
    const key = (n.iconKey || '').toLowerCase();
    const name = (n.name || '').toLowerCase();
    return (
      n.category === 'security' ||
      key.includes('waf') ||
      key.includes('shield') ||
      key.includes('firewall') ||
      key.includes('security_group') ||
      key.includes('nsg') ||
      name.includes('waf') ||
      name.includes('firewall') ||
      name.includes('security group')
    );
  };

  // Connected node IDs
  const connectedNodeIds = new Set<string>();
  links.forEach((l) => {
    connectedNodeIds.add(l.from);
    connectedNodeIds.add(l.to);
  });

  // Rule 1: Public Compute Instance without Security Group / Firewall
  nodes.forEach((node) => {
    const isCompute = node.category === 'compute' || (node.iconKey || '').includes('ec2') || (node.iconKey || '').includes('vm');
    if (!isCompute) return;

    const parentContainer = node.containerId ? containerMap.get(node.containerId) : undefined;
    const isPublicSubnet = parentContainer?.type === 'subnet' && parentContainer.isPublicSubnet;

    if (isPublicSubnet) {
      // Check if directly linked to a security service (WAF / SG / Firewall)
      const hasSecurityLink = links.some((l) => {
        const otherId = l.from === node.id ? l.to : l.to === node.id ? l.from : null;
        if (!otherId) return false;
        const otherNode = nodes.find((n) => n.id === otherId);
        return otherNode ? isSecurityService(otherNode) : false;
      });

      if (!hasSecurityLink) {
        findings.push({
          id: `sec_pub_instance_${node.id}`,
          title: `Instância de computação pública sem Firewall/Security Group dedicado`,
          description: `O recurso "${node.name}" está alocado em uma sub-rede pública (${parentContainer?.name || 'Subnet Pública'}), porém não possui conexão direta com Security Group, Firewall ou WAF.`,
          severity: 'critical',
          category: 'compute',
          resourceId: node.id,
          resourceName: node.name,
          recommendation: 'Associe um Security Group ou Firewall restritivo permitindo apenas portas estritamente necessárias e bloqueando tráfego de entrada irrestrito (0.0.0.0/0).',
          remediationSnippet: `# Exemplo de Security Group restritivo\nresource "aws_security_group" "sg_app" {\n  name        = "app-firewall"\n  description = "Acesso seguro"\n  vpc_id      = aws_vpc.main.id\n}`
        });
      }
    }
  });

  // Rule 2: Database in Public Subnet
  nodes.forEach((node) => {
    const isDb = node.category === 'database' || (node.iconKey || '').includes('rds') || (node.iconKey || '').includes('database') || (node.iconKey || '').includes('sql');
    if (!isDb) return;

    const parentContainer = node.containerId ? containerMap.get(node.containerId) : undefined;
    const isPublicSubnet = parentContainer?.type === 'subnet' && parentContainer.isPublicSubnet;

    if (isPublicSubnet) {
      findings.push({
        id: `sec_pub_db_${node.id}`,
        title: `Banco de dados exposto em Sub-rede Pública`,
        description: `O banco de dados relacional "${node.name}" está alocado dentro da sub-rede pública "${parentContainer?.name}". Bancos de dados nunca devem ter interfaces voltadas diretamente à Internet.`,
        severity: 'critical',
        category: 'database',
        resourceId: node.id,
        resourceName: node.name,
        recommendation: 'Mova a instância de banco de dados para uma Subnet Privada sem atribuição de IP público e utilize um Bastion Host ou Private Endpoints para manutenção.',
        remediationSnippet: `# Alocar na subnet privada\nresource "aws_db_subnet_group" "private_dbs" {\n  name       = "db-private-subnets"\n  subnet_ids = [aws_subnet.private_1.id, aws_subnet.private_2.id]\n}`
      });
    }
  });

  // Rule 3: Unrestricted Administrative Ports (22/SSH or 3389/RDP)
  links.forEach((link) => {
    const port = String(link.port || link.label || '');
    if (port.includes('22') || port.includes('3389')) {
      const src = nodes.find((n) => n.id === link.from);
      const tgt = nodes.find((n) => n.id === link.to);
      const isInternetSource = !src?.containerId || (src?.iconKey || '').includes('internet') || (src?.name || '').toLowerCase().includes('internet');

      if (isInternetSource) {
        findings.push({
          id: `sec_admin_port_${link.id}`,
          title: `Porta administrativa (${port.includes('22') ? 'SSH 22' : 'RDP 3389'}) exposta externamente`,
          description: `A conexão entre "${src?.name || link.from}" e "${tgt?.name || link.to}" permite acesso direto em porta de gerenciamento sem intermediário seguro.`,
          severity: 'high',
          category: 'network',
          resourceId: link.to,
          resourceName: tgt?.name,
          recommendation: 'Restrinja o acesso administrativo utilizando AWS SSM Session Manager, Azure Bastion, Cloud IAP ou VPN corporativa em vez de expor a porta 22/3389.'
        });
      }
    }
  });

  // Rule 4: Unencrypted or Public Cloud Storage
  nodes.forEach((node) => {
    const isStorage = node.category === 'storage' || (node.iconKey || '').includes('s3') || (node.iconKey || '').includes('storage');
    if (!isStorage) return;

    if (node.specs && (node.specs.isPublic === true || node.specs.encryption === false)) {
      findings.push({
        id: `sec_storage_${node.id}`,
        title: `Armazenamento com criptografia desativada ou acesso público`,
        description: `O bucket/storage "${node.name}" não possui criptografia em repouso garantida (SSE-KMS/AES-256) ou permite leitura pública.`,
        severity: 'high',
        category: 'storage',
        resourceId: node.id,
        resourceName: node.name,
        recommendation: 'Habilite criptografia gerenciada por KMS (SSE-KMS) e ative a regra de bloqueio total de acesso público (Block Public Access).'
      });
    }
  });

  // Rule 5: Disconnected Critical Services
  nodes.forEach((node) => {
    const isCritical = ['database', 'compute'].includes(node.category);
    if (isCritical && !connectedNodeIds.has(node.id) && nodes.length > 2) {
      findings.push({
        id: `sec_orphan_${node.id}`,
        title: `Serviço crítico isolado sem conexões de rede mapeadas`,
        description: `O componente "${node.name}" (${node.provider.toUpperCase()} ${node.category}) não possui rotas ou conexões de rede ativas no diagrama.`,
        severity: 'medium',
        category: 'network',
        resourceId: node.id,
        resourceName: node.name,
        recommendation: 'Conecte este componente aos balanceadores de carga, clusters ou bancos de dados correspondentes para garantir rastreabilidade na IaC.'
      });
    }
  });

  // Rule 6: Circular Network Links
  const cycleResult = detectCircularLinks(links);
  if (cycleResult.hasCycles) {
    findings.push({
      id: `sec_circular_loop`,
      title: `Loop de conexão circular infinito detectado`,
      description: `Foram identificados loops circulares entre os nós: ${cycleResult.cyclePaths.slice(0, 2).join(' | ')}. Loops não balanceados podem gerar tempestades de pacotes ou deadlocks de orquestração.`,
      severity: 'medium',
      category: 'network',
      recommendation: 'Revise os fluxos direcionais de tráfego para que sigam arquitetura em camadas (ex.: Client -> WAF -> ALB -> App -> DB).'
    });
  }

  // Rule 7: Unencrypted Cross-Cloud Traffic
  links.forEach((link) => {
    const src = nodes.find((n) => n.id === link.from);
    const tgt = nodes.find((n) => n.id === link.to);
    if (src && tgt && src.provider !== tgt.provider && src.provider !== 'generic' && tgt.provider !== 'generic') {
      const proto = (link.protocol || '').toUpperCase();
      if (proto === 'HTTP' || proto === 'TCP' && link.port === '80') {
        findings.push({
          id: `sec_cross_cloud_cleartext_${link.id}`,
          title: `Tráfego Multi-Cloud em texto claro sem TLS (${src.provider.toUpperCase()} <-> ${tgt.provider.toUpperCase()})`,
          description: `A conexão entre "${src.name}" e "${tgt.name}" utiliza protocolo ${proto} não criptografado através da rede pública inter-cloud.`,
          severity: 'high',
          category: 'network',
          recommendation: 'Encapsule o tráfego em túnel VPN IPsec (Site-to-Site) ou garanta TLS 1.3 (HTTPS/mTLS) para qualquer comunicação cross-cloud.'
        });
      }
    }
  });

  // Calculate score (100 is pristine)
  let penalty = 0;
  findings.forEach((f) => {
    if (f.severity === 'critical') penalty += 25;
    else if (f.severity === 'high') penalty += 15;
    else if (f.severity === 'medium') penalty += 8;
    else penalty += 3;
  });

  const overallScore = Math.max(10, Math.min(100, 100 - penalty));

  return {
    overallScore,
    totalFindings: findings.length,
    criticalCount: findings.filter((f) => f.severity === 'critical').length,
    highCount: findings.filter((f) => f.severity === 'high').length,
    mediumCount: findings.filter((f) => f.severity === 'medium').length,
    lowCount: findings.filter((f) => f.severity === 'low').length,
    findings,
    evaluatedAt: new Date().toISOString()
  };
};
