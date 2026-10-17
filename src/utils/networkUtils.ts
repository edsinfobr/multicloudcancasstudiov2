import { DiagramContainer } from '../types';

/**
 * Calculates the next sequential CIDR block for subnets.
 * Default starting subnet: 10.0.1.0/24
 * Subsequent subnets follow: 10.0.2.0/24, 10.0.3.0/24, etc.
 */
export function getNextSubnetCidr(containers: DiagramContainer[] = []): string {
  const subnetContainers = containers.filter((c) => c.type === 'subnet');
  if (subnetContainers.length === 0) {
    return '10.0.1.0/24';
  }

  let maxOctet = 0;
  for (const c of subnetContainers) {
    const cidr = (c.cidrBlock || '').trim();
    let match = cidr.match(/^10\.0\.(\d+)\.0\/24$/);
    if (!match) {
      // Also check if CIDR pattern exists in container name (e.g. from pre-existing templates)
      match = (c.name || '').match(/10\.0\.(\d+)\.0\/24/);
    }
    if (match) {
      const octet = parseInt(match[1], 10);
      if (!isNaN(octet) && octet > maxOctet) {
        maxOctet = octet;
      }
    }
  }

  if (maxOctet >= 1) {
    return `10.0.${maxOctet + 1}.0/24`;
  }

  return `10.0.${subnetContainers.length + 1}.0/24`;
}
