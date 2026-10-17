import { DiagramState, DiagramNode, DiagramContainer, DiagramLink, CloudProvider } from '../types';

/**
 * Result of the schema validation and sanitization.
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  sanitizedData?: DiagramState;
}

const FORBIDDEN_PROPERTIES = new Set(['__proto__', 'constructor', 'prototype']);
const VALID_PROVIDERS = new Set<string>(['aws', 'azure', 'gcp', 'oci', 'generic']);
const VALID_CONTAINER_TYPES = new Set<string>([
  'vpc',
  'subnet',
  'resource_group',
  'compartment',
  'cloud_group',
  'on_premise',
  'cluster',
  'app',
  'generic',
  'asg',
  'aws_account',
  'azure_subscription',
  'custom'
]);

/**
 * Deeply sanitizes an object to protect against Prototype Pollution attacks.
 * Strips out `__proto__`, `constructor`, and `prototype` keys recursively.
 */
export const stripPrototypePollution = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(stripPrototypePollution);
  }

  const cleanObj: Record<string, any> = Object.create(null);
  for (const key of Object.keys(obj)) {
    if (FORBIDDEN_PROPERTIES.has(key)) {
      continue; // Block and strip malicious prototype keys
    }
    cleanObj[key] = stripPrototypePollution(obj[key]);
  }
  return cleanObj;
};

/**
 * Parses JSON safely with Prototype Pollution defenses and reviver checks.
 */
export const safeJsonParse = (jsonString: string): any => {
  if (typeof jsonString !== 'string') {
    throw new Error('Expected a string for JSON parsing');
  }

  // Quick heuristic check for prototype pollution attempt
  if (/"(?:__proto__|constructor|prototype)"\s*:/i.test(jsonString)) {
    console.warn('[Security] Prototype pollution pattern detected in incoming JSON payload. Neutralizing.');
  }

  const parsed = JSON.parse(jsonString, (key, value) => {
    if (FORBIDDEN_PROPERTIES.has(key)) {
      return undefined; // Remove property
    }
    return value;
  });

  return stripPrototypePollution(parsed);
};

/**
 * Detects circular dependency chains / infinite loops in diagram links.
 */
export const detectCircularLinks = (links: DiagramLink[]): { hasCycles: boolean; cyclePaths: string[] } => {
  const adjacency = new Map<string, string[]>();
  links.forEach((l) => {
    if (!l.from || !l.to) return;
    if (!adjacency.has(l.from)) adjacency.set(l.from, []);
    adjacency.get(l.from)!.push(l.to);
  });

  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  const cyclePaths: string[] = [];

  const dfs = (node: string, path: string[]): boolean => {
    visited.add(node);
    recursionStack.add(node);
    path.push(node);

    const neighbors = adjacency.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, [...path])) return true;
      } else if (recursionStack.has(neighbor)) {
        cyclePaths.push([...path, neighbor].join(' -> '));
        return true;
      }
    }

    recursionStack.delete(node);
    return false;
  };

  for (const startNode of adjacency.keys()) {
    if (!visited.has(startNode)) {
      dfs(startNode, []);
    }
  }

  return {
    hasCycles: cyclePaths.length > 0,
    cyclePaths
  };
};

/**
 * Validates and sanitizes a DiagramState JSON payload against strict schema rules.
 */
export const validateAndSanitizeDiagramSchema = (rawInput: any): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!rawInput || typeof rawInput !== 'object' || Array.isArray(rawInput)) {
    return {
      isValid: false,
      errors: ['O arquivo de projeto fornecido não é um objeto JSON válido.'],
      warnings: []
    };
  }

  // Neutralize prototype pollution
  const cleanInput = stripPrototypePollution(rawInput);

  // 1. Validate basic meta properties
  const title = typeof cleanInput.title === 'string' && cleanInput.title.trim().length > 0
    ? cleanInput.title.trim().slice(0, 120)
    : 'Arquitetura MultiCloud';

  const description = typeof cleanInput.description === 'string'
    ? cleanInput.description.trim().slice(0, 1000)
    : 'Projeto importado no MultiCloud Canvas Studio';

  const primaryProvider: CloudProvider = VALID_PROVIDERS.has(cleanInput.primaryProvider)
    ? (cleanInput.primaryProvider as CloudProvider)
    : 'aws';

  // 2. Validate Nodes
  if (!Array.isArray(cleanInput.nodes)) {
    errors.push('Campo "nodes" ausente ou inválido no projeto.');
  }

  const sanitizedNodes: DiagramNode[] = [];
  const nodeIds = new Set<string>();

  if (Array.isArray(cleanInput.nodes)) {
    cleanInput.nodes.forEach((n: any, index: number) => {
      if (!n || typeof n !== 'object') {
        warnings.push(`Nó no índice ${index} ignorado por estar corrompido.`);
        return;
      }

      // Safe ID
      let id = typeof n.id === 'string' && n.id.trim() ? n.id.trim().slice(0, 80) : `node_${Date.now()}_${index}`;
      if (nodeIds.has(id)) {
        id = `${id}_${index}`;
      }
      nodeIds.add(id);

      // Safe Name
      const name = typeof n.name === 'string' && n.name.trim() ? n.name.trim().slice(0, 80) : `Componente ${index + 1}`;

      // Provider
      const provider: CloudProvider = VALID_PROVIDERS.has(n.provider) ? n.provider : 'generic';

      // Category
      const category = typeof n.category === 'string' ? n.category.slice(0, 40) : 'compute';

      // Coordinates
      const x = typeof n.x === 'number' && isFinite(n.x) ? Math.max(0, Math.min(20000, n.x)) : 100 + (index % 5) * 120;
      const y = typeof n.y === 'number' && isFinite(n.y) ? Math.max(0, Math.min(20000, n.y)) : 100 + Math.floor(index / 5) * 120;
      const width = typeof n.width === 'number' && isFinite(n.width) ? Math.max(48, Math.min(600, n.width)) : 96;
      const height = typeof n.height === 'number' && isFinite(n.height) ? Math.max(48, Math.min(600, n.height)) : 100;

      // Safe Specs
      const specs: Record<string, any> = {};
      if (n.specs && typeof n.specs === 'object' && !Array.isArray(n.specs)) {
        for (const [key, val] of Object.entries(n.specs)) {
          if (!FORBIDDEN_PROPERTIES.has(key)) {
            if (typeof val === 'string') specs[key] = val.slice(0, 255);
            else if (typeof val === 'number' && isFinite(val)) specs[key] = val;
            else if (typeof val === 'boolean') specs[key] = val;
          }
        }
      }

      sanitizedNodes.push({
        id,
        name,
        provider,
        category: category as any,
        iconKey: typeof n.iconKey === 'string' ? n.iconKey.slice(0, 80) : 'generic_server',
        resourceType: typeof n.resourceType === 'string' ? n.resourceType.slice(0, 80) : undefined,
        x,
        y,
        width,
        height,
        containerId: typeof n.containerId === 'string' ? n.containerId.slice(0, 80) : undefined,
        specs,
        notes: typeof n.notes === 'string' ? n.notes.slice(0, 500) : undefined
      });
    });
  }

  // 3. Validate Containers
  const sanitizedContainers: DiagramContainer[] = [];
  const containerIds = new Set<string>();

  if (Array.isArray(cleanInput.containers)) {
    cleanInput.containers.forEach((c: any, index: number) => {
      if (!c || typeof c !== 'object') {
        warnings.push(`Container no índice ${index} ignorado por estar corrompido.`);
        return;
      }

      let id = typeof c.id === 'string' && c.id.trim() ? c.id.trim().slice(0, 80) : `container_${Date.now()}_${index}`;
      if (containerIds.has(id)) {
        id = `${id}_${index}`;
      }
      containerIds.add(id);

      const name = typeof c.name === 'string' && c.name.trim() ? c.name.trim().slice(0, 80) : `VPC / Grupo ${index + 1}`;
      const provider: CloudProvider = VALID_PROVIDERS.has(c.provider) ? c.provider : 'aws';
      const type = VALID_CONTAINER_TYPES.has(c.type) ? c.type : 'vpc';

      const x = typeof c.x === 'number' && isFinite(c.x) ? Math.max(0, Math.min(20000, c.x)) : 50;
      const y = typeof c.y === 'number' && isFinite(c.y) ? Math.max(0, Math.min(20000, c.y)) : 50;
      const width = typeof c.width === 'number' && isFinite(c.width) ? Math.max(120, Math.min(5000, c.width)) : 400;
      const height = typeof c.height === 'number' && isFinite(c.height) ? Math.max(100, Math.min(5000, c.height)) : 300;

      sanitizedContainers.push({
        id,
        name,
        provider,
        type: type as any,
        x,
        y,
        width,
        height,
        color: typeof c.color === 'string' ? c.color.slice(0, 30) : undefined,
        borderStyle: c.borderStyle === 'dashed' ? 'dashed' : 'solid',
        cidrBlock: typeof c.cidrBlock === 'string' ? c.cidrBlock.slice(0, 30) : undefined,
        isPublicSubnet: Boolean(c.isPublicSubnet),
        parentContainerId: typeof c.parentContainerId === 'string' ? c.parentContainerId.slice(0, 80) : undefined
      });
    });
  }

  // Resolve orphaned container references inside nodes
  sanitizedNodes.forEach((node) => {
    if (node.containerId && !containerIds.has(node.containerId)) {
      warnings.push(`Nó "${node.name}" continha referência a container inexistente (${node.containerId}). Vínculo desassociado.`);
      node.containerId = undefined;
    }
  });

  // 4. Validate Links
  const sanitizedLinks: DiagramLink[] = [];
  if (Array.isArray(cleanInput.links)) {
    cleanInput.links.forEach((l: any, index: number) => {
      if (!l || typeof l !== 'object') return;
      if (!nodeIds.has(l.from) || !nodeIds.has(l.to)) {
        warnings.push(`Conexão ignorada por apontar para nó inexistente (from: ${l.from}, to: ${l.to}).`);
        return;
      }
      // Direct self-loop check
      if (l.from === l.to) {
        warnings.push(`Conexão circular em si mesmo (${l.from}) removida por segurança.`);
        return;
      }

      sanitizedLinks.push({
        id: typeof l.id === 'string' && l.id.trim() ? l.id.trim().slice(0, 80) : `link_${Date.now()}_${index}`,
        from: l.from,
        to: l.to,
        label: typeof l.label === 'string' ? l.label.slice(0, 60) : undefined,
        style: ['solid', 'dashed', 'dotted'].includes(l.style) ? l.style : 'solid',
        color: typeof l.color === 'string' ? l.color.slice(0, 30) : undefined,
        protocol: typeof l.protocol === 'string' ? (l.protocol as any) : undefined,
        port: typeof l.port === 'string' || typeof l.port === 'number' ? String(l.port).slice(0, 20) : undefined,
        arrowHead: ['end', 'both', 'start', 'none'].includes(l.arrowHead)
          ? l.arrowHead
          : l.direction === 'bidirectional'
          ? 'both'
          : 'end',
        lineType: ['orthogonal', 'straight', 'curved', 'arc'].includes(l.lineType || l.routing)
          ? (l.lineType || l.routing)
          : 'orthogonal'
      });
    });
  }

  // Check for circular dependency loops
  const cycleCheck = detectCircularLinks(sanitizedLinks);
  if (cycleCheck.hasCycles) {
    warnings.push(`Detectado ciclo/loop em conexões de rede: ${cycleCheck.cyclePaths.slice(0, 3).join('; ')}`);
  }

  // 5. Metadata stamp validation
  const metadata = cleanInput.metadata && typeof cleanInput.metadata === 'object'
    ? {
        projectName: typeof cleanInput.metadata.projectName === 'string' ? cleanInput.metadata.projectName.slice(0, 100) : title,
        author: typeof cleanInput.metadata.author === 'string' ? cleanInput.metadata.author.slice(0, 100) : 'Arquiteto de Soluções',
        role: typeof cleanInput.metadata.role === 'string' ? cleanInput.metadata.role.slice(0, 100) : 'Cloud Architect',
        date: typeof cleanInput.metadata.date === 'string' ? cleanInput.metadata.date.slice(0, 30) : new Date().toLocaleDateString('pt-BR'),
        x: typeof cleanInput.metadata.x === 'number' && isFinite(cleanInput.metadata.x) ? cleanInput.metadata.x : 40,
        y: typeof cleanInput.metadata.y === 'number' && isFinite(cleanInput.metadata.y) ? cleanInput.metadata.y : 40,
        showOnCanvas: Boolean(cleanInput.metadata.showOnCanvas),
        notes: typeof cleanInput.metadata.notes === 'string' ? cleanInput.metadata.notes.slice(0, 500) : undefined
      }
    : undefined;

  const sanitizedData: DiagramState = {
    id: typeof cleanInput.id === 'string' && cleanInput.id.trim() ? cleanInput.id.trim().slice(0, 80) : `diag_${Date.now()}`,
    title,
    description,
    primaryProvider,
    nodes: sanitizedNodes,
    containers: sanitizedContainers,
    links: sanitizedLinks,
    metadata,
    createdAt: typeof cleanInput.createdAt === 'string' ? cleanInput.createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    sanitizedData
  };
};
