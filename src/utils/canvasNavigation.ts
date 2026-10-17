import { DiagramState } from '../types';
import { calculateArchitectureBounds } from './exportUtils';

export const fitDiagramToContainer = (
  diagram: DiagramState,
  container: HTMLElement | null,
  setZoom: (value: number | ((prev: number) => number)) => void,
  padding = 60,
  setPanOffset?: (offset: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => void
) => {
  if (!container) return;

  const bounds = calculateArchitectureBounds(diagram, null, padding);
  const containerW = container.clientWidth;
  const containerH = container.clientHeight;

  if (containerW > 100 && containerH > 100 && bounds.cropWidth > 0 && bounds.cropHeight > 0) {
    const scaleX = (containerW - 80) / bounds.cropWidth;
    const scaleY = (containerH - 80) / bounds.cropHeight;
    const optimalScale = Math.min(1.4, Math.max(0.35, Math.min(scaleX, scaleY)));
    const finalZoom = Number(optimalScale.toFixed(2));
    setZoom(finalZoom);

    // Center diagram on architecture
    const stageCenterX = ((bounds.minX + bounds.maxX) / 2) * finalZoom;
    const stageCenterY = ((bounds.minY + bounds.maxY) / 2) * finalZoom;

    if (setPanOffset) {
      setPanOffset({
        x: Math.round(containerW / 2 - stageCenterX),
        y: Math.round(containerH / 2 - stageCenterY)
      });
    } else {
      setTimeout(() => {
        if (container) {
          container.scrollTo({
            left: Math.max(0, stageCenterX - containerW / 2),
            top: Math.max(0, stageCenterY - containerH / 2),
            behavior: 'smooth'
          });
        }
      }, 60);
    }
  } else {
    setZoom(1.0);
    if (setPanOffset) {
      setPanOffset({ x: 0, y: 0 });
    }
  }
};
