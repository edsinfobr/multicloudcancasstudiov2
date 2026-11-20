import { DiagramContainer, DiagramNode, DiagramState } from '../types';

const NODE_WIDTH = 104;
const NODE_HEIGHT = 118;
const CONTAINER_PADDING = 24;
const SIBLING_GAP = 24;

/**
 * Computes the vertical clearance required at the top of a container so that
 * its top-left label header (icon + name + type badge + optional stacked CIDR badge)
 * never overlaps child containers or child nodes.
 */
function getContainerHeaderClearance(c: DiagramContainer): number {
  const hasCidrHeader = c.type === 'vpc' || c.type === 'subnet' || Boolean(c.cidrBlock);
  // Two-line header (name + CIDR below): ~12px padding + ~62px label box + ~20px margin = 94px
  // Single-line header: ~12px padding + ~36px label box + ~18px margin = 66px
  return hasCidrHeader ? 94 : 66;
}

function rectsOverlapX(ax: number, aw: number, bx: number, bw: number): boolean {
  return ax < bx + bw - 4 && ax + aw > bx + 4;
}

/**
 * Normalizes template container and node coordinates so that:
 * 1. Child containers and nodes never overlap their parent container's header
 *    (including stacked VPC/Subnet names + CIDR badges).
 * 2. Expanded sibling containers push down sibling containers positioned below them
 *    without overlapping.
 * 3. Root nodes placed above a container do not overlap the container's top border/header.
 * 4. Every container comfortably encloses all of its descendant containers and nodes.
 */
export function normalizeTemplateLayout(template: DiagramState): DiagramState {
  if (!template.containers || template.containers.length === 0) {
    return template;
  }

  const containers: DiagramContainer[] = template.containers.map((c) => ({ ...c }));
  const nodes: DiagramNode[] = template.nodes.map((n) => ({ ...n }));

  const origContainers = new Map<string, DiagramContainer>();
  containers.forEach((c) => origContainers.set(c.id, { ...c }));

  const containerById = new Map<string, DiagramContainer>();
  containers.forEach((c) => containerById.set(c.id, c));

  // 1. Determine parent-child nesting for containers (smallest enclosing container)
  const parentContainerOf = new Map<string, string | null>();
  const childContainersOf = new Map<string, string[]>();
  containers.forEach((c) => childContainersOf.set(c.id, []));

  for (const child of containers) {
    const cx = child.x + child.width / 2;
    const cy = child.y + child.height / 2;
    const childArea = child.width * child.height;

    let bestParent: DiagramContainer | null = null;
    let bestArea = Infinity;

    for (const candidate of containers) {
      if (candidate.id === child.id) continue;
      const candArea = candidate.width * candidate.height;
      if (candArea <= childArea) continue;

      const insideX = cx >= candidate.x && cx <= candidate.x + candidate.width;
      const insideY = cy >= candidate.y && cy <= candidate.y + candidate.height;
      if (insideX && insideY && candArea < bestArea) {
        bestArea = candArea;
        bestParent = candidate;
      }
    }

    if (bestParent) {
      parentContainerOf.set(child.id, bestParent.id);
      childContainersOf.get(bestParent.id)!.push(child.id);
    } else {
      parentContainerOf.set(child.id, null);
    }
  }

  // 2. Associate each node with its deepest enclosing container
  const directNodesOf = new Map<string, DiagramNode[]>();
  containers.forEach((c) => directNodesOf.set(c.id, []));
  const rootNodes: DiagramNode[] = [];

  for (const node of nodes) {
    const nx = node.x + NODE_WIDTH / 2;
    const ny = node.y + NODE_HEIGHT / 2;

    // Prefer geometrically smallest enclosing container (respecting node.y >= candidate.y - 12
    // so root nodes placed above a VPC aren't mistakenly swallowed by it).
    let bestContainer: DiagramContainer | null = null;
    let bestArea = Infinity;

    for (const candidate of containers) {
      const insideX = nx >= candidate.x && nx <= candidate.x + candidate.width;
      const insideY = ny >= candidate.y && ny <= candidate.y + candidate.height && node.y >= candidate.y - 12;
      const area = candidate.width * candidate.height;
      if (insideX && insideY && area < bestArea) {
        bestArea = area;
        bestContainer = candidate;
      }
    }

    // Fallback to explicit node.containerId if geometric check didn't match
    if (!bestContainer && node.containerId && containerById.has(node.containerId)) {
      bestContainer = containerById.get(node.containerId)!;
    }

    if (bestContainer) {
      directNodesOf.get(bestContainer.id)!.push(node);
    } else {
      rootNodes.push(node);
    }
  }

  // Helper: shift a container and all its nested containers and nodes vertically
  const shiftContainerSubtreeY = (containerId: string, dy: number) => {
    if (dy <= 0) return;
    const c = containerById.get(containerId);
    if (!c) return;
    c.y += dy;
    for (const n of directNodesOf.get(containerId) || []) {
      n.y += dy;
    }
    for (const childId of childContainersOf.get(containerId) || []) {
      shiftContainerSubtreeY(childId, dy);
    }
  };

  // Recursive top-down clearance + sibling collision + bottom-up sizing
  const layoutContainer = (containerId: string) => {
    const parent = containerById.get(containerId);
    if (!parent) return;

    const childIds = [...(childContainersOf.get(containerId) || [])];
    const dNodes = directNodesOf.get(containerId) || [];
    const minContentTop = parent.y + getContainerHeaderClearance(parent);

    // Ensure direct child containers clear the parent's header (shift whole group uniformly if needed)
    if (childIds.length > 0) {
      const minChildY = Math.min(...childIds.map((id) => containerById.get(id)!.y));
      if (minChildY < minContentTop) {
        const dy = minContentTop - minChildY;
        for (const cid of childIds) {
          shiftContainerSubtreeY(cid, dy);
        }
        // Also shift direct nodes that were aligned vertically with or below those child containers
        for (const n of dNodes) {
          if (n.y < minContentTop) {
            n.y += dy;
          }
        }
      }
    }

    // Ensure direct child nodes clear the parent's header
    if (dNodes.length > 0) {
      const minNodeY = Math.min(...dNodes.map((n) => n.y));
      if (minNodeY < minContentTop) {
        const dy = minContentTop - minNodeY;
        for (const n of dNodes) {
          n.y += dy;
        }
      }
    }

    // Sort child containers by original Y ascending so top siblings expand before bottom siblings
    childIds.sort((a, b) => origContainers.get(a)!.y - origContainers.get(b)!.y);

    const laidOutSiblings: string[] = [];
    for (const cid of childIds) {
      const child = containerById.get(cid)!;
      const origChild = origContainers.get(cid)!;

      // Push down if any direct node of parent was originally above this child container and overlaps horizontally
      let requiredTop = child.y;
      for (const n of dNodes) {
        if (
          rectsOverlapX(n.x, NODE_WIDTH, child.x, child.width) &&
          n.y < origChild.y &&
          n.y + NODE_HEIGHT + SIBLING_GAP > requiredTop
        ) {
          requiredTop = n.y + NODE_HEIGHT + SIBLING_GAP;
        }
      }

      // Push down if any earlier sibling that was originally above now overlaps vertically
      for (const prevId of laidOutSiblings) {
        const prev = containerById.get(prevId)!;
        const origPrev = origContainers.get(prevId)!;
        const wasAbove = origPrev.y + origPrev.height <= origChild.y + 12;
        if (wasAbove && rectsOverlapX(prev.x, prev.width, child.x, child.width)) {
          const minAfterPrev = prev.y + prev.height + SIBLING_GAP;
          if (minAfterPrev > requiredTop) {
            requiredTop = minAfterPrev;
          }
        }
      }

      if (requiredTop > child.y) {
        shiftContainerSubtreeY(cid, requiredTop - child.y);
      }

      layoutContainer(cid);
      laidOutSiblings.push(cid);
    }

    // Gently separate any direct sibling nodes in the same column that overlap vertically
    if (dNodes.length > 1) {
      const sortedNodes = [...dNodes].sort((a, b) => a.y - b.y);
      for (let i = 1; i < sortedNodes.length; i++) {
        const curr = sortedNodes[i];
        for (let j = 0; j < i; j++) {
          const prev = sortedNodes[j];
          if (rectsOverlapX(prev.x, NODE_WIDTH, curr.x, NODE_WIDTH) && curr.y < prev.y + NODE_HEIGHT + 16) {
            curr.y = prev.y + NODE_HEIGHT + 16;
          }
        }
      }
    }

    // Push down any direct node that was originally strictly below a child container if that container grew
    for (const n of dNodes) {
      for (const cid of laidOutSiblings) {
        const child = containerById.get(cid)!;
        const origChild = origContainers.get(cid)!;
        if (
          rectsOverlapX(child.x, child.width, n.x, NODE_WIDTH) &&
          n.y >= origChild.y + origChild.height - 12 &&
          n.y < child.y + child.height + SIBLING_GAP
        ) {
          n.y = child.y + child.height + SIBLING_GAP;
        }
      }
    }

    // Bottom-up sizing: make sure parent comfortably encloses all child containers & direct nodes
    let maxBottom = parent.y + parent.height;
    let maxRight = parent.x + parent.width;

    for (const cid of childIds) {
      const child = containerById.get(cid)!;
      maxBottom = Math.max(maxBottom, child.y + child.height + CONTAINER_PADDING);
      maxRight = Math.max(maxRight, child.x + child.width + CONTAINER_PADDING);
    }

    for (const n of dNodes) {
      maxBottom = Math.max(maxBottom, n.y + NODE_HEIGHT + CONTAINER_PADDING);
      maxRight = Math.max(maxRight, n.x + NODE_WIDTH + CONTAINER_PADDING);
    }

    parent.height = Math.max(parent.height, maxBottom - parent.y);
    parent.width = Math.max(parent.width, maxRight - parent.x);
  };

  // Process root containers in ascending original Y order
  const rootContainerIds = containers
    .filter((c) => parentContainerOf.get(c.id) === null)
    .sort((a, b) => origContainers.get(a.id)!.y - origContainers.get(b.id)!.y)
    .map((c) => c.id);

  const laidOutRoots: string[] = [];
  for (const rid of rootContainerIds) {
    const root = containerById.get(rid)!;
    const origRoot = origContainers.get(rid)!;

    let requiredTop = root.y;

    // Clear any root node positioned directly above this root container
    for (const rn of rootNodes) {
      if (
        rectsOverlapX(rn.x, NODE_WIDTH, root.x, root.width) &&
        rn.y < origRoot.y &&
        rn.y + NODE_HEIGHT + SIBLING_GAP > requiredTop
      ) {
        requiredTop = rn.y + NODE_HEIGHT + SIBLING_GAP;
      }
    }

    // Clear any earlier root container originally strictly above this one
    for (const prevId of laidOutRoots) {
      const prev = containerById.get(prevId)!;
      const origPrev = origContainers.get(prevId)!;
      const wasAbove = origPrev.y + origPrev.height <= origRoot.y + 12;
      if (wasAbove && rectsOverlapX(prev.x, prev.width, root.x, root.width)) {
        const minAfterPrev = prev.y + prev.height + SIBLING_GAP;
        if (minAfterPrev > requiredTop) {
          requiredTop = minAfterPrev;
        }
      }
    }

    if (requiredTop > root.y) {
      shiftContainerSubtreeY(rid, requiredTop - root.y);
    }

    layoutContainer(rid);
    laidOutRoots.push(rid);
  }

  return {
    ...template,
    containers,
    nodes
  };
}
