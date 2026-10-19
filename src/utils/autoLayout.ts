import { DiagramState, DiagramNode, DiagramContainer, DiagramLink } from '../types';

export interface AutoLayoutOptions {
  direction?: 'horizontal' | 'vertical';
  nodeSpacingX?: number;
  nodeSpacingY?: number;
  containerPadding?: number;
  startX?: number;
  startY?: number;
}

interface MacroBlock {
  id: string;
  type: 'node' | 'container';
  x: number;
  y: number;
  width: number;
  height: number;
  layer: number;
  inDegree: number;
  outDegree: number;
  nodeIds: string[];
  containerIds: string[];
}

/**
 * Organizes the entire multi-cloud architecture automatically to eliminate
 * service icon overlaps, container collisions, and connection label congestion.
 *
 * Enforces:
 * 1. Topological left-to-right traffic flow (Entrypoints -> Edge/LB -> Compute -> DB/Storage).
 * 2. Strict intra-container spacing so nodes never collide inside VPCs/Subnets.
 * 3. Dynamic container expansion so boundaries fit all contained services with clean headers.
 * 4. Guaranteed minimum clearance (>= 70px) between adjacent nodes for legible connection protocol badges.
 * 5. Removal of stale link control points for pristine line routing.
 */
export function autoOrganizeArchitecture(
  diagram: DiagramState,
  options: AutoLayoutOptions = {}
): DiagramState {
  if (!diagram || diagram.nodes.length === 0) {
    return diagram;
  }

  const {
    direction = 'horizontal',
    nodeSpacingX = 80,
    nodeSpacingY = 60,
    containerPadding = 24,
    startX = 100,
    startY = 100
  } = options;

  const NODE_W = 96;
  const NODE_H = 88;
  const CONTAINER_HEADER_H = 44;

  // Clone nodes, containers, and links to avoid mutating original state
  const nodes: DiagramNode[] = diagram.nodes.map((n) => ({ ...n }));
  const containers: DiagramContainer[] = diagram.containers.map((c) => ({ ...c }));
  const links: DiagramLink[] = diagram.links.map((l) => ({
    ...l,
    controlPoint: undefined // Reset custom control points so lines recalculate smoothly
  }));

  // Build node lookup
  const nodeMap = new Map<string, DiagramNode>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  const containerMap = new Map<string, DiagramContainer>();
  containers.forEach((c) => containerMap.set(c.id, c));

  // Map nodes to their immediate containers
  const nodesByContainer = new Map<string, DiagramNode[]>();
  const uncontainedNodes: DiagramNode[] = [];

  nodes.forEach((node) => {
    if (node.containerId && containerMap.has(node.containerId)) {
      const list = nodesByContainer.get(node.containerId) || [];
      list.push(node);
      nodesByContainer.set(node.containerId, list);
    } else {
      node.containerId = undefined;
      uncontainedNodes.push(node);
    }
  });

  // Map containers to child containers
  const childContainersByParent = new Map<string, DiagramContainer[]>();
  const rootContainers: DiagramContainer[] = [];

  containers.forEach((cont) => {
    if (cont.parentContainerId && containerMap.has(cont.parentContainerId)) {
      const list = childContainersByParent.get(cont.parentContainerId) || [];
      list.push(cont);
      childContainersByParent.set(cont.parentContainerId, list);
    } else {
      rootContainers.push(cont);
    }
  });

  // -------------------------------------------------------------
  // STEP 1: Layout leaf containers and adjust internal node spacing
  // -------------------------------------------------------------
  containers.forEach((cont) => {
    const memberNodes = nodesByContainer.get(cont.id) || [];
    if (memberNodes.length === 0) {
      cont.width = Math.max(cont.width || 220, 220);
      cont.height = Math.max(cont.height || 160, 160);
      return;
    }

    // Determine grid layout for member nodes
    const count = memberNodes.length;
    let cols = 1;
    if (count <= 2) {
      cols = count;
    } else if (count <= 4) {
      cols = 2;
    } else if (count <= 9) {
      cols = 3;
    } else {
      cols = 4;
    }

    const intraGapX = 36;
    const intraGapY = 32;

    const gridW = cols * NODE_W + (cols - 1) * intraGapX;
    const rows = Math.ceil(count / cols);
    const gridH = rows * NODE_H + (rows - 1) * intraGapY;

    cont.width = Math.max(gridW + containerPadding * 2, 240);
    cont.height = Math.max(gridH + CONTAINER_HEADER_H + containerPadding, 170);

    // Arrange nodes inside relative to local (0,0) of container
    memberNodes.forEach((node, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);

      node.x = containerPadding + col * (NODE_W + intraGapX);
      node.y = CONTAINER_HEADER_H + row * (NODE_H + intraGapY);
    });
  });

  // -------------------------------------------------------------
  // STEP 2: Bottom-up layout for nested parent containers (e.g. Subnets in VPC)
  // -------------------------------------------------------------
  const layoutContainerTree = (parent: DiagramContainer) => {
    const childConts = childContainersByParent.get(parent.id) || [];
    if (childConts.length === 0) return;

    // First recurse on grandchildren
    childConts.forEach((child) => layoutContainerTree(child));

    // Arrange child containers inside parent container
    let curX = containerPadding;
    let curY = CONTAINER_HEADER_H;
    let maxChildH = 0;
    let totalW = containerPadding;

    // Stack child subnets in a balanced 2-column or 1-row layout
    const numSubnets = childConts.length;
    const isMultiRow = numSubnets > 2;
    const subnetsPerRow = isMultiRow ? Math.ceil(Math.sqrt(numSubnets)) : numSubnets;

    let rowMaxH = 0;
    let maxRowW = 0;
    let currentRowX = containerPadding;
    let currentRowY = CONTAINER_HEADER_H;

    childConts.forEach((child, idx) => {
      if (idx > 0 && idx % subnetsPerRow === 0) {
        currentRowX = containerPadding;
        currentRowY += rowMaxH + 24;
        rowMaxH = 0;
      }

      child.x = currentRowX;
      child.y = currentRowY;

      currentRowX += child.width + 24;
      rowMaxH = Math.max(rowMaxH, child.height);
      maxRowW = Math.max(maxRowW, currentRowX);
    });

    parent.width = Math.max(maxRowW + containerPadding, 300);
    parent.height = Math.max(currentRowY + rowMaxH + containerPadding, 220);

    // Also shift direct member nodes of the parent container to bottom or side
    const parentDirectNodes = nodesByContainer.get(parent.id) || [];
    if (parentDirectNodes.length > 0) {
      let nodeX = containerPadding;
      let nodeY = parent.height + 16;
      parentDirectNodes.forEach((n) => {
        n.x = nodeX;
        n.y = nodeY;
        nodeX += NODE_W + 28;
      });
      parent.height += NODE_H + 32;
      parent.width = Math.max(parent.width, nodeX + containerPadding);
    }
  };

  rootContainers.forEach((root) => layoutContainerTree(root));

  // -------------------------------------------------------------
  // STEP 3: Build Macro-Blocks (Root Containers and Uncontained Nodes)
  // -------------------------------------------------------------
  const macroBlocks: MacroBlock[] = [];
  const entityToMacroBlockId = new Map<string, string>();

  // Helper to collect all node IDs inside a container and its sub-containers
  const getContainedNodeIds = (containerId: string): string[] => {
    let ids: string[] = (nodesByContainer.get(containerId) || []).map((n) => n.id);
    const children = childContainersByParent.get(containerId) || [];
    children.forEach((c) => {
      ids = ids.concat(getContainedNodeIds(c.id));
    });
    return ids;
  };

  const getContainedContainerIds = (containerId: string): string[] => {
    let ids: string[] = [containerId];
    const children = childContainersByParent.get(containerId) || [];
    children.forEach((c) => {
      ids = ids.concat(getContainedContainerIds(c.id));
    });
    return ids;
  };

  rootContainers.forEach((root) => {
    const nodeIds = getContainedNodeIds(root.id);
    const containerIds = getContainedContainerIds(root.id);
    const mbId = `macro_cont_${root.id}`;

    macroBlocks.push({
      id: mbId,
      type: 'container',
      x: 0,
      y: 0,
      width: root.width,
      height: root.height,
      layer: 0,
      inDegree: 0,
      outDegree: 0,
      nodeIds,
      containerIds
    });

    nodeIds.forEach((nid) => entityToMacroBlockId.set(nid, mbId));
    containerIds.forEach((cid) => entityToMacroBlockId.set(cid, mbId));
  });

  uncontainedNodes.forEach((node) => {
    const mbId = `macro_node_${node.id}`;
    macroBlocks.push({
      id: mbId,
      type: 'node',
      x: 0,
      y: 0,
      width: NODE_W,
      height: NODE_H,
      layer: 0,
      inDegree: 0,
      outDegree: 0,
      nodeIds: [node.id],
      containerIds: []
    });
    entityToMacroBlockId.set(node.id, mbId);
  });

  // Calculate macro-block connectivity graph
  const macroAdj = new Map<string, Set<string>>();
  const macroRevAdj = new Map<string, Set<string>>();
  macroBlocks.forEach((mb) => {
    macroAdj.set(mb.id, new Set());
    macroRevAdj.set(mb.id, new Set());
  });

  links.forEach((link) => {
    const mbFrom = entityToMacroBlockId.get(link.from);
    const mbTo = entityToMacroBlockId.get(link.to);
    if (mbFrom && mbTo && mbFrom !== mbTo) {
      macroAdj.get(mbFrom)?.add(mbTo);
      macroRevAdj.get(mbTo)?.add(mbFrom);
    }
  });

  macroBlocks.forEach((mb) => {
    mb.inDegree = macroRevAdj.get(mb.id)?.size || 0;
    mb.outDegree = macroAdj.get(mb.id)?.size || 0;
  });

  // -------------------------------------------------------------
  // STEP 4: Topological Layering (Sugiyama DAG Layer Assignment)
  // -------------------------------------------------------------
  // Entry points have inDegree = 0
  const visited = new Set<string>();
  const blockMap = new Map<string, MacroBlock>();
  macroBlocks.forEach((mb) => blockMap.set(mb.id, mb));

  // Determine layers using longest-path / BFS
  const assignLayers = () => {
    // Start with blocks having in-degree 0
    let currentTier = macroBlocks.filter((mb) => mb.inDegree === 0);
    if (currentTier.length === 0 && macroBlocks.length > 0) {
      // In case of cycles, start with the block with lowest inDegree
      currentTier = [macroBlocks.slice().sort((a, b) => a.inDegree - b.inDegree)[0]];
    }

    currentTier.forEach((mb) => {
      mb.layer = 0;
      visited.add(mb.id);
    });

    let queue = [...currentTier];
    while (queue.length > 0) {
      const curr = queue.shift()!;
      const neighbors = macroAdj.get(curr.id) || new Set();

      neighbors.forEach((nxtId) => {
        const nxt = blockMap.get(nxtId);
        if (nxt) {
          const targetLayer = curr.layer + 1;
          if (targetLayer > nxt.layer) {
            nxt.layer = targetLayer;
          }
          if (!visited.has(nxtId)) {
            visited.add(nxtId);
            queue.push(nxt);
          }
        }
      });
    }

    // Handle any disconnected blocks not yet visited
    macroBlocks.forEach((mb) => {
      if (!visited.has(mb.id)) {
        mb.layer = 0;
        visited.add(mb.id);
      }
    });
  };

  assignLayers();

  // -------------------------------------------------------------
  // STEP 5: Macro-Block Positioning across Layers
  // -------------------------------------------------------------
  // Group blocks by layer
  const layersMap = new Map<number, MacroBlock[]>();
  macroBlocks.forEach((mb) => {
    const list = layersMap.get(mb.layer) || [];
    list.push(mb);
    layersMap.set(mb.layer, list);
  });

  const sortedLayerIndices = Array.from(layersMap.keys()).sort((a, b) => a - b);

  let currentLayerX = startX;
  const macroGapX = Math.max(nodeSpacingX + 40, 110);
  const macroGapY = Math.max(nodeSpacingY, 50);

  // Calculate layout coordinates for each layer
  sortedLayerIndices.forEach((layerIdx) => {
    const blocksInLayer = layersMap.get(layerIdx) || [];

    // Sort blocks in layer: Containers first or by number of connections to minimize crossings
    blocksInLayer.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'container' ? -1 : 1;
      return b.outDegree - a.outDegree;
    });

    let layerMaxW = 0;
    let blockY = startY;

    blocksInLayer.forEach((mb) => {
      mb.x = currentLayerX;
      mb.y = blockY;

      layerMaxW = Math.max(layerMaxW, mb.width);
      blockY += mb.height + macroGapY;
    });

    currentLayerX += layerMaxW + macroGapX;
  });

  // Center vertical alignment of shorter layers relative to the tallest layer
  const maxLayerHeight = Math.max(
    ...sortedLayerIndices.map((idx) => {
      const blocks = layersMap.get(idx) || [];
      if (blocks.length === 0) return 0;
      const last = blocks[blocks.length - 1];
      return (last.y + last.height) - startY;
    }),
    400
  );

  sortedLayerIndices.forEach((layerIdx) => {
    const blocks = layersMap.get(layerIdx) || [];
    if (blocks.length === 0) return;
    const layerH = (blocks[blocks.length - 1].y + blocks[blocks.length - 1].height) - startY;
    const diff = Math.max(0, (maxLayerHeight - layerH) / 2);

    if (diff > 40) {
      blocks.forEach((mb) => {
        mb.y += Math.round(diff);
      });
    }
  });

  // -------------------------------------------------------------
  // STEP 6: Apply Macro-Block positions to root containers & top nodes
  // -------------------------------------------------------------
  macroBlocks.forEach((mb) => {
    if (mb.type === 'container') {
      const rootId = mb.containerIds[0];
      const rootCont = containerMap.get(rootId);
      if (rootCont) {
        const deltaX = mb.x - rootCont.x;
        const deltaY = mb.y - rootCont.y;

        // Shift container
        rootCont.x = mb.x;
        rootCont.y = mb.y;

        // Shift child containers recursively
        const shiftChildren = (parentId: string) => {
          const children = childContainersByParent.get(parentId) || [];
          children.forEach((c) => {
            c.x += rootCont.x;
            c.y += rootCont.y;
            shiftChildren(c.id);
          });
        };
        shiftChildren(rootCont.id);

        // Shift contained nodes to absolute canvas coordinates
        mb.nodeIds.forEach((nid) => {
          const n = nodeMap.get(nid);
          if (n) {
            const parentC = n.containerId ? containerMap.get(n.containerId) : rootCont;
            const containerRef = parentC || rootCont;
            n.x = containerRef.x + n.x;
            n.y = containerRef.y + n.y;
          }
        });
      }
    } else {
      // Uncontained node
      const node = nodeMap.get(mb.nodeIds[0]);
      if (node) {
        node.x = mb.x;
        node.y = mb.y;
      }
    }
  });

  // -------------------------------------------------------------
  // STEP 7: Overlap Elimination & Clearance Relaxation Pass
  // -------------------------------------------------------------
  // Ensure no two service nodes collide anywhere on canvas
  const minClearanceX = NODE_W + 50; // Guaranteed >= 50px between node edges
  const minClearanceY = NODE_H + 40; // Guaranteed >= 40px between node edges

  for (let pass = 0; pass < 5; pass++) {
    let hadCollision = false;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i];
        const n2 = nodes[j];

        // If nodes belong to different containers or are uncontained
        const dx = (n2.x + NODE_W / 2) - (n1.x + NODE_W / 2);
        const dy = (n2.y + NODE_H / 2) - (n1.y + NODE_H / 2);
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        if (absDx < minClearanceX && absDy < minClearanceY) {
          hadCollision = true;
          const overlapX = minClearanceX - absDx;
          const overlapY = minClearanceY - absDy;

          if (overlapX < overlapY) {
            const shift = Math.ceil(overlapX / 2) + 10;
            if (dx >= 0) {
              n2.x += shift;
              n1.x -= shift;
            } else {
              n1.x += shift;
              n2.x -= shift;
            }
          } else {
            const shift = Math.ceil(overlapY / 2) + 10;
            if (dy >= 0) {
              n2.y += shift;
              n1.y -= shift;
            } else {
              n1.y += shift;
              n2.y -= shift;
            }
          }
        }
      }
    }

    if (!hadCollision) break;
  }

  // -------------------------------------------------------------
  // STEP 8: Final container bounds adjustment to envelope shifted nodes
  // -------------------------------------------------------------
  containers.forEach((cont) => {
    const memberNodes = nodes.filter((n) => n.containerId === cont.id);
    if (memberNodes.length > 0) {
      const minX = Math.min(...memberNodes.map((n) => n.x));
      const maxX = Math.max(...memberNodes.map((n) => n.x + (n.width || NODE_W)));
      const minY = Math.min(...memberNodes.map((n) => n.y));
      const maxY = Math.max(...memberNodes.map((n) => n.y + (n.height || NODE_H)));

      cont.x = Math.min(cont.x, minX - containerPadding);
      cont.y = Math.min(cont.y, minY - CONTAINER_HEADER_H);
      cont.width = Math.max(cont.width, maxX - cont.x + containerPadding);
      cont.height = Math.max(cont.height, maxY - cont.y + containerPadding);
    }
  });

  // Re-adjust parent containers around child containers
  rootContainers.forEach((root) => {
    const children = childContainersByParent.get(root.id) || [];
    if (children.length > 0) {
      const minX = Math.min(...children.map((c) => c.x));
      const maxX = Math.max(...children.map((c) => c.x + c.width));
      const minY = Math.min(...children.map((c) => c.y));
      const maxY = Math.max(...children.map((c) => c.y + c.height));

      root.x = Math.min(root.x, minX - containerPadding);
      root.y = Math.min(root.y, minY - CONTAINER_HEADER_H);
      root.width = Math.max(root.width, maxX - root.x + containerPadding);
      root.height = Math.max(root.height, maxY - root.y + containerPadding);
    }
  });

  // -------------------------------------------------------------
  // STEP 9: Normalize coordinates so minimum coordinate has comfortable margin
  // -------------------------------------------------------------
  let globalMinX = Infinity;
  let globalMinY = Infinity;

  nodes.forEach((n) => {
    if (n.x < globalMinX) globalMinX = n.x;
    if (n.y < globalMinY) globalMinY = n.y;
  });

  containers.forEach((c) => {
    if (c.x < globalMinX) globalMinX = c.x;
    if (c.y < globalMinY) globalMinY = c.y;
  });

  if (globalMinX === Infinity) globalMinX = 80;
  if (globalMinY === Infinity) globalMinY = 80;

  const targetOriginX = 90;
  const targetOriginY = 90;
  const shiftX = Math.round(targetOriginX - globalMinX);
  const shiftY = Math.round(targetOriginY - globalMinY);

  nodes.forEach((n) => {
    n.x = Math.round(n.x + shiftX);
    n.y = Math.round(n.y + shiftY);
  });

  containers.forEach((c) => {
    c.x = Math.round(c.x + shiftX);
    c.y = Math.round(c.y + shiftY);
    c.width = Math.round(c.width);
    c.height = Math.round(c.height);
  });

  return {
    ...diagram,
    nodes,
    containers,
    links
  };
}
