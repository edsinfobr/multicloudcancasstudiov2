import { jsPDF } from 'jspdf';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import { DiagramState } from '../types';
import { calculateTotalCost } from './costCalculator';

export interface CleanExportOptions {
  format?: 'png' | 'jpeg';
  quality?: number;
  pixelRatio?: number;
  padding?: number;
  lightTheme?: boolean;
}

export const calculateArchitectureBounds = (
  diagram?: DiagramState,
  stageElement?: HTMLElement | null,
  padding = 40
) => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  if (diagram?.nodes && diagram.nodes.length > 0) {
    diagram.nodes.forEach((n) => {
      const w = n.width || 96;
      const h = n.height || 100;
      minX = Math.min(minX, n.x);
      minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + w);
      maxY = Math.max(maxY, n.y + h);
    });
  }

  if (diagram?.containers && diagram.containers.length > 0) {
    diagram.containers.forEach((c) => {
      minX = Math.min(minX, c.x);
      minY = Math.min(minY, c.y);
      maxX = Math.max(maxX, c.x + c.width);
      maxY = Math.max(maxY, c.y + c.height);
    });
  }

  if (diagram?.metadata?.showOnCanvas && diagram.metadata?.x !== undefined && diagram.metadata?.y !== undefined) {
    minX = Math.min(minX, diagram.metadata.x);
    minY = Math.min(minY, diagram.metadata.y);
    maxX = Math.max(maxX, diagram.metadata.x + 320);
    maxY = Math.max(maxY, diagram.metadata.y + 150);
  }

  // Fallback: examine rendered DOM elements inside stage
  if (!isFinite(minX) || !isFinite(minY) || !isFinite(maxX) || !isFinite(maxY)) {
    if (stageElement) {
      const elements = stageElement.querySelectorAll('.node-card, .container-box, .metadata-stamp');
      elements.forEach((el) => {
        const html = el as HTMLElement;
        const left = html.offsetLeft || 0;
        const top = html.offsetTop || 0;
        const w = html.offsetWidth || 100;
        const h = html.offsetHeight || 100;
        minX = Math.min(minX, left);
        minY = Math.min(minY, top);
        maxX = Math.max(maxX, left + w);
        maxY = Math.max(maxY, top + h);
      });
    }
  }

  if (!isFinite(minX) || !isFinite(minY) || !isFinite(maxX) || !isFinite(maxY)) {
    minX = 100;
    minY = 100;
    maxX = 900;
    maxY = 600;
  }

  const cropX = Math.max(0, minX - padding);
  const cropY = Math.max(0, minY - padding);
  const cropWidth = Math.max(120, (maxX - minX) + padding * 2);
  const cropHeight = Math.max(90, (maxY - minY) + padding * 2);

  return { minX, minY, maxX, maxY, cropX, cropY, cropWidth, cropHeight };
};

export const exportDomFilter = (domNode: HTMLElement): boolean => {
  if (domNode.tagName === 'BUTTON') return false;
  if (domNode.getAttribute && domNode.getAttribute('role') === 'button') return false;
  if (domNode.id === 'floating-selection-toolbar') return false;
  if (domNode.id === 'btn-toggle-snap-grid') return false;
  if (domNode.id === 'active-connection-banner') return false;
  if (domNode.classList) {
    if (
      domNode.classList.contains('interactive-control') ||
      domNode.classList.contains('resize-handle') ||
      domNode.classList.contains('selection-indicator') ||
      domNode.classList.contains('connection-target-overlay') ||
      domNode.classList.contains('drag-ghost-preview') ||
      domNode.classList.contains('marquee-box') ||
      domNode.classList.contains('cursor-crosshair') ||
      domNode.classList.contains('canvas-toolbar')
    ) {
      return false;
    }
    if (
      domNode.classList.contains('pointer-events-none') &&
      domNode.classList.contains('border-blue-400')
    ) {
      return false;
    }
  }
  if (domNode.className && typeof domNode.className === 'string') {
    if (domNode.className.includes('resize') || domNode.className.includes('cursor-nwse') || domNode.className.includes('cursor-nesw')) {
      return false;
    }
  }
  return true;
};

export const getCleanArchitectureImage = async (
  canvasElement: HTMLElement,
  diagram?: DiagramState,
  options: CleanExportOptions = {}
): Promise<{ dataUrl: string; width: number; height: number; cropWidth: number; cropHeight: number } | null> => {
  const {
    format = 'png',
    quality = 0.98,
    pixelRatio = 2,
    padding = 40,
    lightTheme = false
  } = options;

  const stageElement = (canvasElement.querySelector('#architecture-canvas-stage') as HTMLElement) || canvasElement;
  const bounds = calculateArchitectureBounds(diagram, stageElement, padding);

  try {
    stageElement.setAttribute('data-clean-export', 'true');
    canvasElement.setAttribute('data-clean-export', 'true');
    if (lightTheme) {
      stageElement.setAttribute('data-light-export', 'true');
      canvasElement.setAttribute('data-light-export', 'true');
    }

    const fullPng = await toPng(stageElement, {
      quality,
      pixelRatio,
      backgroundColor: undefined,
      style: {
        background: 'transparent',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        boxShadow: 'none',
        transform: 'none',
        transformOrigin: 'top left'
      },
      filter: exportDomFilter
    });

    return await new Promise<{ dataUrl: string; width: number; height: number; cropWidth: number; cropHeight: number } | null>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const offscreen = document.createElement('canvas');
          offscreen.width = Math.round(bounds.cropWidth * pixelRatio);
          offscreen.height = Math.round(bounds.cropHeight * pixelRatio);
          const ctx = offscreen.getContext('2d');
          if (!ctx) {
            resolve(null);
            return;
          }

          if (format === 'jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, offscreen.width, offscreen.height);
          } else {
            ctx.clearRect(0, 0, offscreen.width, offscreen.height);
          }

          ctx.drawImage(
            img,
            bounds.cropX * pixelRatio,
            bounds.cropY * pixelRatio,
            bounds.cropWidth * pixelRatio,
            bounds.cropHeight * pixelRatio,
            0,
            0,
            offscreen.width,
            offscreen.height
          );

          const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
          const croppedDataUrl = offscreen.toDataURL(mimeType, quality);
          resolve({
            dataUrl: croppedDataUrl,
            width: offscreen.width,
            height: offscreen.height,
            cropWidth: bounds.cropWidth,
            cropHeight: bounds.cropHeight
          });
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = (e) => reject(e);
      img.src = fullPng;
    });
  } catch (err) {
    console.error('Failed to capture clean architecture image:', err);
    return null;
  } finally {
    stageElement.removeAttribute('data-clean-export');
    canvasElement.removeAttribute('data-clean-export');
    if (lightTheme) {
      stageElement.removeAttribute('data-light-export');
      canvasElement.removeAttribute('data-light-export');
    }
  }
};

export const exportCanvasToBlob = async (canvasElement: HTMLElement, diagram?: DiagramState): Promise<Blob | null> => {
  try {
    const result = await getCleanArchitectureImage(canvasElement, diagram, { format: 'png', pixelRatio: 2, padding: 40 });
    if (!result) return null;
    const res = await fetch(result.dataUrl);
    return await res.blob();
  } catch (err) {
    console.error('Blob conversion failed:', err);
    return null;
  }
};

export const exportCanvasToPng = async (
  canvasElement: HTMLElement,
  filename = 'cloud-architecture.png',
  diagram?: DiagramState
) => {
  try {
    const result = await getCleanArchitectureImage(canvasElement, diagram, { format: 'png', pixelRatio: 2, padding: 40 });
    if (!result) throw new Error('Não foi possível gerar a imagem da arquitetura');
    const link = document.createElement('a');
    link.download = filename;
    link.href = result.dataUrl;
    link.click();
  } catch (err) {
    console.error('PNG export failed:', err);
    throw err;
  }
};

export const exportCanvasToJpg = async (
  canvasElement: HTMLElement,
  filename = 'cloud-architecture.jpg',
  diagram?: DiagramState
) => {
  try {
    const result = await getCleanArchitectureImage(canvasElement, diagram, { format: 'jpeg', pixelRatio: 2, padding: 40 });
    if (!result) throw new Error('Não foi possível gerar a imagem da arquitetura');
    const link = document.createElement('a');
    link.download = filename;
    link.href = result.dataUrl;
    link.click();
  } catch (err) {
    console.error('JPG export failed:', err);
    throw err;
  }
};

export const exportCanvasToSvg = async (
  canvasElement: HTMLElement,
  filename = 'cloud-architecture.svg',
  diagram?: DiagramState
) => {
  const stageElement = (canvasElement.querySelector('#architecture-canvas-stage') as HTMLElement) || canvasElement;
  const bounds = calculateArchitectureBounds(diagram, stageElement, 40);

  try {
    stageElement.setAttribute('data-clean-export', 'true');
    canvasElement.setAttribute('data-clean-export', 'true');

    const rawSvgDataUrl = await toSvg(stageElement, {
      style: {
        background: 'transparent',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        boxShadow: 'none',
        transform: 'none',
        transformOrigin: 'top left'
      },
      filter: exportDomFilter
    });

    const svgContent = decodeURIComponent(rawSvgDataUrl.replace(/^data:image\/svg\+xml;charset=utf-8,/, ''));
    const updatedSvg = svgContent.replace(/<svg([^>]*?)>/i, (_, attrs) => {
      const cleanAttrs = attrs
        .replace(/\s*(width|height|viewBox)="[^"]*"/gi, '')
        .trim();
      return `<svg ${cleanAttrs} width="${bounds.cropWidth}" height="${bounds.cropHeight}" viewBox="${bounds.cropX} ${bounds.cropY} ${bounds.cropWidth} ${bounds.cropHeight}">`;
    });

    const croppedSvgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(updatedSvg);
    const link = document.createElement('a');
    link.download = filename;
    link.href = croppedSvgDataUrl;
    link.click();
  } catch (err) {
    console.error('SVG export failed:', err);
    throw err;
  } finally {
    stageElement.removeAttribute('data-clean-export');
    canvasElement.removeAttribute('data-clean-export');
  }
};

export const exportProjectToJson = (diagram: DiagramState) => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(diagram, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', `${diagram.title.toLowerCase().replace(/\s+/g, '-')}-project.json`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const exportArchitecturePdf = async (
  canvasElement: HTMLElement,
  diagram: DiagramState,
  exchangeRate = 5.60
) => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

    const costData = calculateTotalCost(diagram.nodes);

    // Formatters
    const formatUsd = (val: number) => `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const formatBrl = (val: number) => `R$ ${(val * exchangeRate).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Helper to draw top page headers in clean light theme
    const drawPageHeader = (title: string, subtitle?: string) => {
      // Clean light header background
      pdf.setFillColor(248, 250, 252); // Light slate #F8FAFC
      pdf.rect(0, 0, pageWidth, 22, 'F');
      pdf.setDrawColor(226, 232, 240); // Subtle border #E2E8F0
      pdf.line(0, 22, pageWidth, 22);

      // Subtle top accent line in primary blue
      pdf.setFillColor(37, 99, 235); // Blue #2563EB
      pdf.rect(0, 0, pageWidth, 1.8, 'F');

      pdf.setTextColor(15, 23, 42); // Dark slate #0F172A
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(title, 14, 11.5);

      pdf.setFontSize(7.5);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 116, 139); // Slate #64748B
      const sub = subtitle || `MultiCloud Canvas Studio | Data: ${diagram.metadata?.date || new Date().toLocaleDateString('pt-BR')} | Provedor Principal: ${diagram.primaryProvider.toUpperCase()}`;
      pdf.text(sub, 14, 17.5);
    };

    // Helper to draw footers on all pages in light theme
    const addFooters = () => {
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFillColor(248, 250, 252);
        pdf.rect(0, pageHeight - 10, pageWidth, 10, 'F');
        pdf.setDrawColor(226, 232, 240);
        pdf.line(0, pageHeight - 10, pageWidth, pageHeight - 10);

        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(100, 116, 139);
        pdf.text('EdsInfoBR - Consultoria End-to-End em Nuvem & IA (www.edsinfobr.com.br) | Criado e mantido por @edsinfobr', 14, pageHeight - 4);
        pdf.text(`Página ${i} de ${pageCount}`, pageWidth - 14, pageHeight - 4, { align: 'right' });
      }
    };

    // -------------------------------------------------------------
    // PAGE 1: COVER & ARCHITECTURE CANVAS DIAGRAM (NO BACKGROUND)
    // -------------------------------------------------------------
    drawPageHeader(
      diagram.metadata?.project || diagram.title || 'Relatório de Arquitetura de Nuvem',
      `Projeto: ${diagram.metadata?.project || diagram.title} | Autor: ${diagram.metadata?.author || 'N/A'}${diagram.metadata?.role ? ` (${diagram.metadata.role})` : ''} | Data: ${diagram.metadata?.date || new Date().toLocaleDateString('pt-BR')}`
    );

    // Capture clean architecture image cropped tightly to components with NO background and NO buttons
    const cleanCapture = await getCleanArchitectureImage(canvasElement, diagram, {
      format: 'png',
      quality: 0.98,
      pixelRatio: 2,
      padding: 35,
      lightTheme: true
    });

    const canvasPng = cleanCapture?.dataUrl || '';
    const cropWidth = cleanCapture?.cropWidth || 800;
    const cropHeight = cleanCapture?.cropHeight || 500;

    let startY = 27;

    // Architecture diagram placement: completely transparent, NO background rectangle or fill
    if (canvasPng) {
      const availWidth = pageWidth - 28; // 182mm
      const maxDiagramH = 106; // mm
      const aspectRatio = cropWidth / cropHeight;

      let renderW = availWidth;
      let renderH = renderW / aspectRatio;
      if (renderH > maxDiagramH) {
        renderH = maxDiagramH;
        renderW = renderH * aspectRatio;
      }
      const renderX = 14 + (availWidth - renderW) / 2;

      // Render image directly without background - only the resources and services
      pdf.addImage(canvasPng, 'PNG', renderX, startY, renderW, renderH);
      startY += renderH + 7;
    }

    // Key Architectural KPIs / Executive Cards (clean light theme)
    pdf.setFillColor(248, 250, 252);
    pdf.roundedRect(14, startY, pageWidth - 28, 22, 2, 2, 'F');
    pdf.setDrawColor(226, 232, 240);
    pdf.roundedRect(14, startY, pageWidth - 28, 22, 2, 2, 'S');

    const cardW = (pageWidth - 28) / 4;
    // Card 1: Total Nodes
    pdf.setFontSize(7.5);
    pdf.setTextColor(100, 116, 139);
    pdf.setFont('helvetica', 'bold');
    pdf.text('RECURSOS/NÓS', 18, startY + 6);
    pdf.setFontSize(11);
    pdf.setTextColor(15, 23, 42);
    pdf.text(`${diagram.nodes.length} Componentes`, 18, startY + 14);

    // Card 2: Containers
    pdf.setFontSize(7.5);
    pdf.setTextColor(100, 116, 139);
    pdf.text('GRUPOS/CONTAINERS', 18 + cardW, startY + 6);
    pdf.setFontSize(11);
    pdf.setTextColor(15, 23, 42);
    pdf.text(`${diagram.containers.length} Redes/VPCs`, 18 + cardW, startY + 14);

    // Card 3: Monthly Cost (USD)
    pdf.setFontSize(7.5);
    pdf.setTextColor(100, 116, 139);
    pdf.text('CUSTO MENSAL (USD)', 18 + cardW * 2, startY + 6);
    pdf.setFontSize(11);
    pdf.setTextColor(180, 83, 9); // Amber
    pdf.text(formatUsd(costData.totalMonthly), 18 + cardW * 2, startY + 14);

    // Card 4: Monthly Cost (BRL)
    pdf.setFontSize(7.5);
    pdf.setTextColor(100, 116, 139);
    pdf.text(`CUSTO MENSAL (BRL @ ${exchangeRate})`, 18 + cardW * 3, startY + 6);
    pdf.setFontSize(11);
    pdf.setTextColor(4, 120, 87); // Emerald
    pdf.text(formatBrl(costData.totalMonthly), 18 + cardW * 3, startY + 14);

    startY += 28;

    // Executive Description Section
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(15, 23, 42);
    pdf.text('Resumo Executivo da Arquitetura', 14, startY);
    startY += 6;

    pdf.setFontSize(8.5);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(51, 65, 85);
    const descText = diagram.description || 'Esta arquitetura foi projetada e modelada no MultiCloud Canvas Studio, especificando os serviços em nuvem, interconexões de rede e estimativas operacionais de investimento.';
    const splitDesc = pdf.splitTextToSize(descText, pageWidth - 28);
    pdf.text(splitDesc, 14, startY);
    startY += splitDesc.length * 4.5 + 6;

    // Links summary
    if (diagram.links.length > 0 && startY < pageHeight - 35) {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(15, 23, 42);
      pdf.text(`Topologia de Conexões de Rede (${diagram.links.length} Links Ativos)`, 14, startY);
      startY += 5.5;

      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(71, 85, 105);
      const linkSummary = diagram.links.slice(0, 6).map((link) => {
        const src = diagram.nodes.find(n => n.id === link.from)?.name || link.from;
        const tgt = diagram.nodes.find(n => n.id === link.to)?.name || link.to;
        const proto = link.protocol || 'TCP';
        const label = link.label ? ` (${link.label})` : '';
        return `• ${src} ──[ ${proto}${label} ]──> ${tgt}`;
      });
      linkSummary.forEach((line) => {
        if (startY < pageHeight - 20) {
          pdf.text(line, 16, startY);
          startY += 4;
        }
      });
      if (diagram.links.length > 6 && startY < pageHeight - 16) {
        pdf.setFont('helvetica', 'italic');
        pdf.text(`... e mais ${diagram.links.length - 6} conexões mapeadas na topologia.`, 16, startY);
      }
    }

    // -------------------------------------------------------------
    // PAGE 2: DETAILED COMPONENT SPECIFICATIONS
    // -------------------------------------------------------------
    pdf.addPage();
    drawPageHeader('1. Detalhamento dos Componentes da Arquitetura');

    let currY = 30;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(15, 23, 42);
    pdf.text(`Inventário de Serviços e Recursos (${diagram.nodes.length} Componentes)`, 14, currY);
    currY += 8;

    // Table Header for Components (Light Theme)
    const colX = [14, 58, 82, 112, 160];
    const colW = [42, 22, 28, 46, 36];

    pdf.setFillColor(241, 245, 249); // Light header #F1F5F9
    pdf.rect(14, currY, pageWidth - 28, 7.5, 'F');
    pdf.setDrawColor(203, 213, 225); // Border #CBD5E1
    pdf.rect(14, currY, pageWidth - 28, 7.5, 'S');

    pdf.setFontSize(7.5);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(15, 23, 42); // Dark slate #0F172A
    pdf.text('COMPONENTE / NÓ', colX[0] + 2, currY + 5);
    pdf.text('PROVEDOR', colX[1] + 2, currY + 5);
    pdf.text('CATEGORIA', colX[2] + 2, currY + 5);
    pdf.text('ESPECIFICAÇÕES / SIZING', colX[3] + 2, currY + 5);
    pdf.text('CONEXÕES / NOTAS', colX[4] + 2, currY + 5);

    currY += 7.5;

    diagram.nodes.forEach((node, idx) => {
      // Check if page end reached
      if (currY > pageHeight - 25) {
        pdf.addPage();
        drawPageHeader('1. Detalhamento dos Componentes da Arquitetura (Cont.)');
        currY = 30;

        // Repeat Table Header in Light Theme
        pdf.setFillColor(241, 245, 249);
        pdf.rect(14, currY, pageWidth - 28, 7.5, 'F');
        pdf.setDrawColor(203, 213, 225);
        pdf.rect(14, currY, pageWidth - 28, 7.5, 'S');
        pdf.setFontSize(7.5);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(15, 23, 42);
        pdf.text('COMPONENTE / NÓ', colX[0] + 2, currY + 5);
        pdf.text('PROVEDOR', colX[1] + 2, currY + 5);
        pdf.text('CATEGORIA', colX[2] + 2, currY + 5);
        pdf.text('ESPECIFICAÇÕES / SIZING', colX[3] + 2, currY + 5);
        pdf.text('CONEXÕES / NOTAS', colX[4] + 2, currY + 5);
        currY += 7.5;
      }

      // Format specs text
      const specList: string[] = [];
      if (node.specs.instanceType) specList.push(`Tipo: ${node.specs.instanceType}`);
      if (node.specs.count && node.specs.count > 1) specList.push(`Qtd: ${node.specs.count}`);
      if (node.specs.storageGb) specList.push(`Disco: ${node.specs.storageGb}GB`);
      if (node.specs.engine) specList.push(`Engine: ${node.specs.engine}`);
      if (node.specs.tier) specList.push(`Tier: ${node.specs.tier}`);
      if (node.specs.region) specList.push(`Região: ${node.specs.region}`);
      const specString = specList.length > 0 ? specList.join(', ') : 'Padrão Cloud';

      // Format connections
      const connectedLinks = diagram.links.filter(l => l.from === node.id || l.to === node.id);
      const connTargets = connectedLinks.map(l => {
        const otherId = l.from === node.id ? l.to : l.from;
        const otherNode = diagram.nodes.find(n => n.id === otherId);
        return otherNode ? otherNode.name : otherId;
      });
      const connText = connTargets.length > 0 ? `${connTargets.slice(0, 2).join(', ')}${connTargets.length > 2 ? '...' : ''}` : node.notes || 'Sem links';

      // Row background
      if (idx % 2 === 0) {
        pdf.setFillColor(248, 250, 252);
      } else {
        pdf.setFillColor(255, 255, 255);
      }
      
      const rowHeight = 10;
      pdf.rect(14, currY, pageWidth - 28, rowHeight, 'F');
      pdf.setDrawColor(226, 232, 240);
      pdf.line(14, currY + rowHeight, pageWidth - 14, currY + rowHeight);

      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(15, 23, 42);
      pdf.text(node.name, colX[0] + 2, currY + 6);

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.setTextColor(
        node.provider === 'aws' ? 217 : node.provider === 'azure' ? 2 : node.provider === 'gcp' ? 16 : 180,
        node.provider === 'aws' ? 119 : node.provider === 'azure' ? 132 : node.provider === 'gcp' ? 185 : 40,
        node.provider === 'aws' ? 6 : node.provider === 'azure' ? 199 : node.provider === 'gcp' ? 129 : 40
      );
      pdf.text(node.provider.toUpperCase(), colX[1] + 2, currY + 6);

      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(71, 85, 105);
      pdf.text(node.category.toUpperCase(), colX[2] + 2, currY + 6);

      const splitSpec = pdf.splitTextToSize(specString, colW[3] - 2);
      pdf.text(splitSpec[0] || '', colX[3] + 2, currY + 6);

      const splitConn = pdf.splitTextToSize(connText, colW[4] - 2);
      pdf.text(splitConn[0] || '', colX[4] + 2, currY + 6);

      currY += rowHeight;
    });

    // Containers section on Page 2 if containers exist
    if (diagram.containers.length > 0 && currY < pageHeight - 45) {
      currY += 10;
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(15, 23, 42);
      pdf.text(`Estruturas de Rede e Agrupamentos (${diagram.containers.length} Containers/VPCs)`, 14, currY);
      currY += 6;

      diagram.containers.forEach((c) => {
        if (currY < pageHeight - 20) {
          pdf.setFillColor(241, 245, 249);
          pdf.roundedRect(14, currY, pageWidth - 28, 12, 1, 1, 'F');
          pdf.setDrawColor(203, 213, 225);
          pdf.roundedRect(14, currY, pageWidth - 28, 12, 1, 1, 'S');

          pdf.setFontSize(8.5);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(15, 23, 42);
          pdf.text(`Container: ${c.name}`, 18, currY + 5);

          pdf.setFontSize(7.5);
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(71, 85, 105);
          const nodesInside = diagram.nodes.filter(n => n.containerId === c.id).map(n => n.name).join(', ') || 'Nenhum nó vinculado diretamente';
          pdf.text(`Tipo: ${c.type.toUpperCase()} | Provedor: ${c.provider.toUpperCase()} | Componentes: ${nodesInside}`, 18, currY + 9.5);

          currY += 15;
        }
      });
    }

    // -------------------------------------------------------------
    // PAGE 3: COST ESTIMATION & FINANCIAL ANALYSIS
    // -------------------------------------------------------------
    pdf.addPage();
    drawPageHeader('2. Estimativa de Custos e Análise Financeira');

    let costY = 30;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(15, 23, 42);
    pdf.text('Resumo Financeiro da Arquitetura', 14, costY);
    costY += 8;

    // Cost Summary Box
    pdf.setFillColor(248, 250, 252);
    pdf.roundedRect(14, costY, pageWidth - 28, 30, 2, 2, 'F');
    pdf.setDrawColor(226, 232, 240);
    pdf.roundedRect(14, costY, pageWidth - 28, 30, 2, 2, 'S');

    const colBoxW = (pageWidth - 28) / 3;

    // Col 1: Monthly Cost
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(100, 116, 139);
    pdf.text('ESTIMATIVA MENSAL TOTAL', 18, costY + 7);

    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(180, 83, 9);
    pdf.text(formatUsd(costData.totalMonthly), 18, costY + 15);

    pdf.setFontSize(10);
    pdf.setTextColor(4, 120, 87);
    pdf.text(formatBrl(costData.totalMonthly), 18, costY + 23);

    // Col 2: Annual Cost
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(100, 116, 139);
    pdf.text('PROJEÇÃO ANUAL (12 MESES)', 18 + colBoxW, costY + 7);

    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(15, 23, 42);
    pdf.text(formatUsd(costData.totalAnnual), 18 + colBoxW, costY + 15);

    pdf.setFontSize(10);
    pdf.setTextColor(71, 85, 105);
    pdf.text(formatBrl(costData.totalAnnual), 18 + colBoxW, costY + 23);

    // Col 3: Total Resources of Current Architecture
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(100, 116, 139);
    pdf.text('RECURSOS NA ARQUITETURA', 18 + colBoxW * 2, costY + 7);

    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(37, 99, 235);
    pdf.text(`${costData.items.length} Componentes`, 18 + colBoxW * 2, costY + 15);

    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 116, 139);
    const paidItems = costData.items.filter(i => i.monthlyCost > 0).length;
    const freeItems = costData.items.length - paidItems;
    pdf.text(`${paidItems} tarifados | ${freeItems} sem cobrança`, 18 + colBoxW * 2, costY + 23);

    costY += 38;

    // Itemized Cost Breakdown Table
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(15, 23, 42);
    pdf.text('Detalhamento de Custos da Arquitetura Atual', 14, costY);
    costY += 8;

    const costColX = [14, 60, 84, 130, 160];

    pdf.setFillColor(241, 245, 249); // Light header #F1F5F9
    pdf.rect(14, costY, pageWidth - 28, 7.5, 'F');
    pdf.setDrawColor(203, 213, 225); // Border #CBD5E1
    pdf.rect(14, costY, pageWidth - 28, 7.5, 'S');

    pdf.setFontSize(7.5);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(15, 23, 42); // Dark slate #0F172A
    pdf.text('RECURSO', costColX[0] + 2, costY + 5);
    pdf.text('PROVEDOR', costColX[1] + 2, costY + 5);
    pdf.text('ESPECIFICAÇÃO', costColX[2] + 2, costY + 5);
    pdf.text('CUSTO USD/MÊS', costColX[3] + 2, costY + 5);
    pdf.text('CUSTO BRL/MÊS', costColX[4] + 2, costY + 5);

    costY += 7.5;

    costData.items.forEach((item, idx) => {
      if (costY > pageHeight - 30) {
        pdf.addPage();
        drawPageHeader('2. Estimativa de Custos e Análise Financeira (Cont.)');
        costY = 30;

        pdf.setFillColor(241, 245, 249);
        pdf.rect(14, costY, pageWidth - 28, 7.5, 'F');
        pdf.setDrawColor(203, 213, 225);
        pdf.rect(14, costY, pageWidth - 28, 7.5, 'S');
        pdf.setFontSize(7.5);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(15, 23, 42);
        pdf.text('RECURSO', costColX[0] + 2, costY + 5);
        pdf.text('PROVEDOR', costColX[1] + 2, costY + 5);
        pdf.text('ESPECIFICAÇÃO', costColX[2] + 2, costY + 5);
        pdf.text('CUSTO USD/MÊS', costColX[3] + 2, costY + 5);
        pdf.text('CUSTO BRL/MÊS', costColX[4] + 2, costY + 5);
        costY += 7.5;
      }

      if (idx % 2 === 0) {
        pdf.setFillColor(248, 250, 252);
      } else {
        pdf.setFillColor(255, 255, 255);
      }

      const rH = 9;
      pdf.rect(14, costY, pageWidth - 28, rH, 'F');
      pdf.setDrawColor(226, 232, 240);
      pdf.line(14, costY + rH, pageWidth - 14, costY + rH);

      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(15, 23, 42);
      pdf.text(item.nodeName, costColX[0] + 2, costY + 6);

      pdf.setFontSize(7.5);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(71, 85, 105);
      pdf.text(item.provider.toUpperCase(), costColX[1] + 2, costY + 6);

      const splitDet = pdf.splitTextToSize(item.details, 42);
      pdf.text(splitDet[0] || '', costColX[2] + 2, costY + 6);

      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(180, 83, 9);
      pdf.text(formatUsd(item.monthlyCost), costColX[3] + 2, costY + 6);

      pdf.setTextColor(4, 120, 87);
      pdf.text(formatBrl(item.monthlyCost), costColX[4] + 2, costY + 6);

      costY += rH;
    });

    // Category Distribution Table (Current Architecture Only)
    if (costY < pageHeight - 50) {
      costY += 10;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(15, 23, 42);
      pdf.text('Distribuição de Custos por Categoria (Arquitetura Atual)', 14, costY);
      costY += 8;

      const activeCategories = Object.keys(costData.byCategory).filter(
        (cat) => (costData.byCategory[cat] || 0) > 0
      );

      if (activeCategories.length > 0) {
        const catLabels: Record<string, string> = {
          compute: 'Computação',
          database: 'Banco de Dados',
          storage: 'Armazenamento',
          networking: 'Rede & CDN',
          ai: 'Inteligência Artificial',
          security: 'Segurança',
          analytics: 'Analytics'
        };

        const numBoxes = Math.min(activeCategories.length, 4);
        const catBoxW = (pageWidth - 28) / numBoxes;

        activeCategories.slice(0, 4).forEach((cat, cIdx) => {
          const cX = 14 + cIdx * catBoxW;
          const val = costData.byCategory[cat] || 0;
          const pct = costData.totalMonthly > 0 ? Math.round((val / costData.totalMonthly) * 100) : 0;

          pdf.setFillColor(248, 250, 252);
          pdf.roundedRect(cX, costY, catBoxW - 2, 21, 1.5, 1.5, 'F');
          pdf.setDrawColor(203, 213, 225);
          pdf.roundedRect(cX, costY, catBoxW - 2, 21, 1.5, 1.5, 'S');

          pdf.setFontSize(7.5);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(15, 23, 42);
          pdf.text(catLabels[cat] || cat.toUpperCase(), cX + 3, costY + 5.5);

          pdf.setFontSize(9.5);
          pdf.setTextColor(180, 83, 9);
          pdf.text(formatUsd(val), cX + 3, costY + 11.5);

          pdf.setFontSize(7.5);
          pdf.setTextColor(71, 85, 105);
          pdf.text(`${formatBrl(val)} (${pct}%)`, cX + 3, costY + 17);
        });

        costY += 26;
      }
    }

    // Footnote stating report is exclusively based on current architecture and cost disclaimer
    if (costY < pageHeight - 18) {
      pdf.setFontSize(7);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(100, 116, 139);
      pdf.text(
        '* Relatório de custos gerado exclusivamente com base nos componentes modelados na arquitetura atual (base 730h/mês On-Demand). Nenhum provedor de nuvem externo ou alternativo foi considerado nesta análise.',
        14,
        costY + 5
      );
      pdf.setTextColor(180, 83, 9);
      pdf.text(
        '* Essa é uma estimativa e não representa o custo final. Taxas, impostos e a conversão do dólar podem influenciar no custo final.',
        14,
        costY + 9
      );
    }

    // Add page numbers and footers
    addFooters();

    // Save PDF
    pdf.save(`${(diagram.title || 'cloud-architecture').toLowerCase().replace(/\s+/g, '-')}-report.pdf`);
  } catch (err) {
    console.error('PDF export failed:', err);
    throw err;
  }
};
