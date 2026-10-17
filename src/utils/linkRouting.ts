import { LinkRoutingType } from '../types';

export interface RoutePoint {
  x: number;
  y: number;
}

export interface RouteResult {
  pathD: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  angleStart: number;
  angleEnd: number;
  midX: number;
  midY: number;
}

export interface NodeBounds {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

/**
 * Calculates where a ray from `center` toward `target` intersects a node's bounding rectangle
 */
export function getNodeIntersection(
  center: RoutePoint,
  target: RoutePoint,
  width: number = 96,
  height: number = 88,
  padding: number = 3
): RoutePoint {
  const dx = target.x - center.x;
  const dy = target.y - center.y;
  if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
    return { x: center.x, y: center.y };
  }

  const halfW = width / 2 + padding;
  const halfH = height / 2 + padding;

  const scaleX = Math.abs(dx) > 0.001 ? halfW / Math.abs(dx) : Infinity;
  const scaleY = Math.abs(dy) > 0.001 ? halfH / Math.abs(dy) : Infinity;
  const t = Math.min(scaleX, scaleY);

  return {
    x: center.x + dx * t,
    y: center.y + dy * t
  };
}

/**
 * Computes SVG path, border contact points, arrow rotations, and label position
 * based on selected routing line type and optional manual control point.
 */
export function calculateLinkRoute(
  fromNode: NodeBounds,
  toNode: NodeBounds,
  lineType: LinkRoutingType = 'curved',
  padding: number = 3,
  controlPoint?: RoutePoint
): RouteResult {
  const w1 = fromNode.width || 96;
  const h1 = fromNode.height || 88;
  const c1 = { x: fromNode.x + w1 / 2, y: fromNode.y + h1 / 2 };

  const w2 = toNode.width || 96;
  const h2 = toNode.height || 88;
  const c2 = { x: toNode.x + w2 / 2, y: toNode.y + h2 / 2 };

  const dx = c2.x - c1.x;
  const dy = c2.y - c1.y;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  // Helper for determining anchor point on node boundary
  const getAnchor = (
    node: NodeBounds,
    target: RoutePoint
  ): { point: RoutePoint; face: 'left' | 'right' | 'top' | 'bottom' } => {
    const nw = node.width || 96;
    const nh = node.height || 88;
    const ncx = node.x + nw / 2;
    const ncy = node.y + nh / 2;
    const tdx = target.x - ncx;
    const tdy = target.y - ncy;

    if (Math.abs(tdx) * (nh / nw) >= Math.abs(tdy)) {
      if (tdx >= 0) {
        return { point: { x: node.x + nw + padding, y: ncy }, face: 'right' };
      } else {
        return { point: { x: node.x - padding, y: ncy }, face: 'left' };
      }
    } else {
      if (tdy >= 0) {
        return { point: { x: ncx, y: node.y + nh + padding }, face: 'bottom' };
      } else {
        return { point: { x: ncx, y: node.y - padding }, face: 'top' };
      }
    }
  };

  // --- 1. ORTHOGONAL ROUTING (90° Stepped with rounded corners) ---
  if (lineType === 'orthogonal') {
    if (controlPoint) {
      // Manual control point / waypoint routing
      const startAnchor = getAnchor(fromNode, controlPoint);
      const endAnchor = getAnchor(toNode, controlPoint);
      const x1 = startAnchor.point.x;
      const y1 = startAnchor.point.y;
      const x2 = endAnchor.point.x;
      const y2 = endAnchor.point.y;
      const cp = controlPoint;

      const points: RoutePoint[] = [{ x: x1, y: y1 }];

      // Waypoints from start to cp
      if (startAnchor.face === 'left' || startAnchor.face === 'right') {
        points.push({ x: cp.x, y: y1 });
        points.push({ x: cp.x, y: cp.y });
      } else {
        points.push({ x: x1, y: cp.y });
        points.push({ x: cp.x, y: cp.y });
      }

      // Waypoints from cp to end
      if (endAnchor.face === 'left' || endAnchor.face === 'right') {
        points.push({ x: cp.x, y: y2 });
        points.push({ x: x2, y: y2 });
      } else {
        points.push({ x: x2, y: cp.y });
        points.push({ x: x2, y: y2 });
      }

      const pathD = buildRoundedOrthogonalPath(points, 10);

      // Start angle pointing along first segment
      const firstSeg = points[1] || cp;
      const angleStart = Math.atan2(y1 - firstSeg.y, x1 - firstSeg.x) * (180 / Math.PI);

      // End angle pointing into target
      const penultimate = points[points.length - 2] || cp;
      const angleEnd = Math.atan2(y2 - penultimate.y, x2 - penultimate.x) * (180 / Math.PI);

      return {
        pathD,
        x1,
        y1,
        x2,
        y2,
        angleStart,
        angleEnd,
        midX: cp.x,
        midY: cp.y
      };
    }

    // Default automatic orthogonal routing
    let x1: number, y1: number, x2: number, y2: number;
    let pathD = '';
    let angleStart = 0;
    let angleEnd = 0;
    let midX = 0;
    let midY = 0;

    if (absDx >= absDy) {
      // Horizontal dominant flow (Left <-> Right)
      const isRight = dx >= 0;
      x1 = isRight ? fromNode.x + w1 + padding : fromNode.x - padding;
      y1 = c1.y;
      x2 = isRight ? toNode.x - padding : toNode.x + w2 + padding;
      y2 = c2.y;

      angleStart = isRight ? 180 : 0;
      angleEnd = isRight ? 0 : 180;

      const midSegX = (x1 + x2) / 2;
      midX = midSegX;
      midY = (y1 + y2) / 2;

      // Check if straight horizontal line suffices
      if (Math.abs(y2 - y1) < 4) {
        pathD = `M ${x1} ${y1} L ${x2} ${y2}`;
      } else {
        const deltaY = y2 - y1;
        const dirY = deltaY > 0 ? 1 : -1;
        const cornerRadius = Math.min(12, Math.abs(midSegX - x1) * 0.8, Math.abs(deltaY) / 2);

        if (isRight) {
          pathD = `M ${x1} ${y1} ` +
            `L ${midSegX - cornerRadius} ${y1} ` +
            `Q ${midSegX} ${y1}, ${midSegX} ${y1 + cornerRadius * dirY} ` +
            `L ${midSegX} ${y2 - cornerRadius * dirY} ` +
            `Q ${midSegX} ${y2}, ${midSegX + cornerRadius} ${y2} ` +
            `L ${x2} ${y2}`;
        } else {
          pathD = `M ${x1} ${y1} ` +
            `L ${midSegX + cornerRadius} ${y1} ` +
            `Q ${midSegX} ${y1}, ${midSegX} ${y1 + cornerRadius * dirY} ` +
            `L ${midSegX} ${y2 - cornerRadius * dirY} ` +
            `Q ${midSegX} ${y2}, ${midSegX - cornerRadius} ${y2} ` +
            `L ${x2} ${y2}`;
        }
      }
    } else {
      // Vertical dominant flow (Top <-> Bottom)
      const isDown = dy >= 0;
      x1 = c1.x;
      y1 = isDown ? fromNode.y + h1 + padding : fromNode.y - padding;
      x2 = c2.x;
      y2 = isDown ? toNode.y - padding : toNode.y + h2 + padding;

      angleStart = isDown ? -90 : 90;
      angleEnd = isDown ? 90 : -90;

      const midSegY = (y1 + y2) / 2;
      midX = (x1 + x2) / 2;
      midY = midSegY;

      // Check if straight vertical line suffices
      if (Math.abs(x2 - x1) < 4) {
        pathD = `M ${x1} ${y1} L ${x2} ${y2}`;
      } else {
        const deltaX = x2 - x1;
        const dirX = deltaX > 0 ? 1 : -1;
        const cornerRadius = Math.min(12, Math.abs(midSegY - y1) * 0.8, Math.abs(deltaX) / 2);

        if (isDown) {
          pathD = `M ${x1} ${y1} ` +
            `L ${x1} ${midSegY - cornerRadius} ` +
            `Q ${x1} ${midSegY}, ${x1 + cornerRadius * dirX} ${midSegY} ` +
            `L ${x2 - cornerRadius * dirX} ${midSegY} ` +
            `Q ${x2} ${midSegY}, ${x2} ${midSegY + cornerRadius} ` +
            `L ${x2} ${y2}`;
        } else {
          pathD = `M ${x1} ${y1} ` +
            `L ${x1} ${midSegY + cornerRadius} ` +
            `Q ${x1} ${midSegY}, ${x1 + cornerRadius * dirX} ${midSegY} ` +
            `L ${x2 - cornerRadius * dirX} ${midSegY} ` +
            `Q ${x2} ${midSegY}, ${x2} ${midSegY - cornerRadius} ` +
            `L ${x2} ${y2}`;
        }
      }
    }

    return { pathD, x1, y1, x2, y2, angleStart, angleEnd, midX, midY };
  }

  // Calculate default contact points on component borders
  const startPt = getNodeIntersection(c1, controlPoint || c2, w1, h1, padding);
  const endPt = getNodeIntersection(c2, controlPoint || c1, w2, h2, padding);
  const x1 = startPt.x;
  const y1 = startPt.y;
  const x2 = endPt.x;
  const y2 = endPt.y;

  const segDx = x2 - x1;
  const segDy = y2 - y1;
  const dist = Math.hypot(segDx, segDy);

  // --- 2. STRAIGHT LINE ROUTING (Linha Reta Direta) ---
  if (lineType === 'straight') {
    if (controlPoint) {
      const pathD = `M ${x1} ${y1} L ${controlPoint.x} ${controlPoint.y} L ${x2} ${y2}`;
      const angleStart = Math.atan2(y1 - controlPoint.y, x1 - controlPoint.x) * (180 / Math.PI);
      const angleEnd = Math.atan2(y2 - controlPoint.y, x2 - controlPoint.x) * (180 / Math.PI);
      return {
        pathD,
        x1,
        y1,
        x2,
        y2,
        angleStart,
        angleEnd,
        midX: controlPoint.x,
        midY: controlPoint.y
      };
    }

    const directAngle = Math.atan2(segDy, segDx) * (180 / Math.PI);
    return {
      pathD: `M ${x1} ${y1} L ${x2} ${y2}`,
      x1,
      y1,
      x2,
      y2,
      angleStart: directAngle + 180,
      angleEnd: directAngle,
      midX: (x1 + x2) / 2,
      midY: (y1 + y2) / 2
    };
  }

  // --- 3. ARC ROUTING (Curva em Arco Suave) ---
  if (lineType === 'arc') {
    if (controlPoint) {
      const cx = 2 * controlPoint.x - 0.5 * (x1 + x2);
      const cy = 2 * controlPoint.y - 0.5 * (y1 + y2);
      const pathD = `M ${x1} ${y1} Q ${cx} ${cy}, ${x2} ${y2}`;
      const angleEnd = Math.atan2(y2 - cy, x2 - cx) * (180 / Math.PI);
      const angleStart = Math.atan2(y1 - cy, x1 - cx) * (180 / Math.PI);
      return {
        pathD,
        x1,
        y1,
        x2,
        y2,
        angleStart,
        angleEnd,
        midX: controlPoint.x,
        midY: controlPoint.y
      };
    }

    if (dist < 16) {
      const angle = Math.atan2(segDy, segDx) * (180 / Math.PI);
      return {
        pathD: `M ${x1} ${y1} L ${x2} ${y2}`,
        x1,
        y1,
        x2,
        y2,
        angleStart: angle + 180,
        angleEnd: angle,
        midX: (x1 + x2) / 2,
        midY: (y1 + y2) / 2
      };
    }

    // Normal perpendicular vector to the line
    const nx = -segDy / dist;
    const ny = segDx / dist;
    const bowHeight = Math.min(50, Math.max(22, dist * 0.18));
    const cx = (x1 + x2) / 2 + nx * bowHeight;
    const cy = (y1 + y2) / 2 + ny * bowHeight;

    const pathD = `M ${x1} ${y1} Q ${cx} ${cy}, ${x2} ${y2}`;
    const endVx = x2 - cx;
    const endVy = y2 - cy;
    const angleEnd = Math.atan2(endVy, endVx) * (180 / Math.PI);

    const startVx = cx - x1;
    const startVy = cy - y1;
    const angleStart = Math.atan2(-startVy, -startVx) * (180 / Math.PI);

    const midX = 0.25 * x1 + 0.5 * cx + 0.25 * x2;
    const midY = 0.25 * y1 + 0.5 * cy + 0.25 * y2;

    return { pathD, x1, y1, x2, y2, angleStart, angleEnd, midX, midY };
  }

  // --- 4. SMOOTH CURVE / CUBIC BÉZIER (Default) ---
  if (controlPoint) {
    // When manually adjusted, smooth quadratic Bézier passing through controlPoint at t=0.5
    const cx = 2 * controlPoint.x - 0.5 * (x1 + x2);
    const cy = 2 * controlPoint.y - 0.5 * (y1 + y2);
    const pathD = `M ${x1} ${y1} Q ${cx} ${cy}, ${x2} ${y2}`;
    const angleEnd = Math.atan2(y2 - cy, x2 - cx) * (180 / Math.PI);
    const angleStart = Math.atan2(y1 - cy, x1 - cx) * (180 / Math.PI);

    return {
      pathD,
      x1,
      y1,
      x2,
      y2,
      angleStart,
      angleEnd,
      midX: controlPoint.x,
      midY: controlPoint.y
    };
  }

  let pathD: string;
  let angleEnd: number;
  let angleStart: number;

  if (dist < 24) {
    pathD = `M ${x1} ${y1} L ${x2} ${y2}`;
    angleEnd = Math.atan2(segDy, segDx) * (180 / Math.PI);
    angleStart = angleEnd + 180;
  } else if (absDx >= absDy) {
    // Horizontal flow
    const offset = Math.max(32, Math.min(absDx * 0.5, 140));
    const dir = segDx >= 0 ? 1 : -1;
    const cx1 = x1 + offset * dir;
    const cy1 = y1;
    const cx2 = x2 - offset * dir;
    const cy2 = y2;
    pathD = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
    angleEnd = segDx >= 0 ? 0 : 180;
    angleStart = segDx >= 0 ? 180 : 0;
  } else {
    // Vertical flow
    const offset = Math.max(32, Math.min(absDy * 0.5, 140));
    const dir = segDy >= 0 ? 1 : -1;
    const cx1 = x1;
    const cy1 = y1 + offset * dir;
    const cx2 = x2;
    const cy2 = y2 - offset * dir;
    pathD = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
    angleEnd = segDy >= 0 ? 90 : -90;
    angleStart = segDy >= 0 ? -90 : 90;
  }

  return {
    pathD,
    x1,
    y1,
    x2,
    y2,
    angleStart,
    angleEnd,
    midX: (x1 + x2) / 2,
    midY: (y1 + y2) / 2
  };
}

/**
 * Builds a rounded SVG path connecting an array of orthogonal points.
 */
export function buildRoundedOrthogonalPath(points: RoutePoint[], maxRadius: number = 10): string {
  if (points.length < 2) return '';
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }

  // Filter out redundant/consecutive duplicates
  const cleanPoints: RoutePoint[] = [points[0]];
  for (let i = 1; i < points.length; i++) {
    const prev = cleanPoints[cleanPoints.length - 1];
    const curr = points[i];
    if (Math.hypot(curr.x - prev.x, curr.y - prev.y) > 1.5) {
      cleanPoints.push(curr);
    }
  }

  // Remove intermediate collinear points
  const simplified: RoutePoint[] = [cleanPoints[0]];
  for (let i = 1; i < cleanPoints.length - 1; i++) {
    const prev = simplified[simplified.length - 1];
    const curr = cleanPoints[i];
    const next = cleanPoints[i + 1];

    const isCollinearX = Math.abs(prev.x - curr.x) < 1 && Math.abs(curr.x - next.x) < 1;
    const isCollinearY = Math.abs(prev.y - curr.y) < 1 && Math.abs(curr.y - next.y) < 1;

    if (!isCollinearX && !isCollinearY) {
      simplified.push(curr);
    }
  }
  if (cleanPoints.length > 1) {
    simplified.push(cleanPoints[cleanPoints.length - 1]);
  }

  if (simplified.length <= 2) {
    return `M ${simplified[0].x} ${simplified[0].y} L ${simplified[simplified.length - 1].x} ${simplified[simplified.length - 1].y}`;
  }

  let d = `M ${simplified[0].x} ${simplified[0].y}`;

  for (let i = 1; i < simplified.length - 1; i++) {
    const pPrev = simplified[i - 1];
    const pCurr = simplified[i];
    const pNext = simplified[i + 1];

    const dPrev = Math.hypot(pCurr.x - pPrev.x, pCurr.y - pPrev.y);
    const dNext = Math.hypot(pNext.x - pCurr.x, pNext.y - pCurr.y);

    const r = Math.min(maxRadius, dPrev / 2, dNext / 2);

    if (r < 2) {
      d += ` L ${pCurr.x} ${pCurr.y}`;
      continue;
    }

    const vPrevX = (pCurr.x - pPrev.x) / dPrev;
    const vPrevY = (pCurr.y - pPrev.y) / dPrev;
    const vNextX = (pNext.x - pCurr.x) / dNext;
    const vNextY = (pNext.y - pCurr.y) / dNext;

    const startX = pCurr.x - vPrevX * r;
    const startY = pCurr.y - vPrevY * r;
    const endX = pCurr.x + vNextX * r;
    const endY = pCurr.y + vNextY * r;

    d += ` L ${startX} ${startY} Q ${pCurr.x} ${pCurr.y}, ${endX} ${endY}`;
  }

  const last = simplified[simplified.length - 1];
  d += ` L ${last.x} ${last.y}`;

  return d;
}
