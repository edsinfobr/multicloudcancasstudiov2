import React, { useState, useRef, useEffect } from 'react';
import { DiagramState, DiagramNode, DiagramContainer, DiagramLink, LinkRoutingType, CloudProvider } from '../types';
import { getIconByKey } from '../data/cloudIcons';
import { getCloudLogoSvg, getCloudProviderMeta } from '../data/cloudLogos';
import { inferProtocolForLink } from '../utils/protocolInfer';
import { calculateLinkRoute, getNodeIntersection } from '../utils/linkRouting';
import { Trash2, Copy, Move, ZoomIn, ZoomOut, Maximize2, CheckSquare, Link as LinkIcon, Zap, X, ArrowRight, FolderPlus, FolderMinus, Boxes, Layers, FileSignature, Sparkles, Grid, Rows, Columns, Spline, CornerDownRight, Minus, Waypoints, Presentation, RotateCcw, Compass, Hand, MousePointer, Undo2, Redo2, Network, Server, AppWindow, Box, Shield, FolderKanban, Globe, CircleDot, Hash, LayoutGrid, Square, Check, Magnet, ChevronDown } from 'lucide-react';
import { PresentationHud } from './PresentationHud';
import { fitDiagramToContainer } from '../utils/canvasNavigation';
import { OrphanNodesModal } from './OrphanNodesModal';

export type GridPatternType = 'lines' | 'dots' | 'cross' | 'dense' | 'none';

export const GRID_OPTIONS: Array<{
  id: GridPatternType;
  label: string;
  desc: string;
  icon: React.ReactNode;
}> = [
  {
    id: 'lines',
    label: 'Quadriculado',
    desc: 'Grade técnica com linhas contínuas',
    icon: <Grid className="w-4 h-4 text-blue-500" />
  },
  {
    id: 'dots',
    label: 'Pontilhado',
    desc: 'Pontos discretos nas interseções',
    icon: <CircleDot className="w-4 h-4 text-purple-500" />
  },
  {
    id: 'cross',
    label: 'Cruzes',
    desc: 'Retículo com cruzes de precisão (+)',
    icon: <Hash className="w-4 h-4 text-emerald-500" />
  },
  {
    id: 'dense',
    label: 'Milimetrado',
    desc: 'Grade fina detalhada com subdivisões',
    icon: <LayoutGrid className="w-4 h-4 text-amber-500" />
  },
  {
    id: 'none',
    label: 'Em Branco (Liso)',
    desc: 'Fundo 100% limpo sem grade',
    icon: <Square className="w-4 h-4 text-slate-400" />
  }
];

interface CanvasProps {
  diagram: DiagramState;
  setDiagram: React.Dispatch<React.SetStateAction<DiagramState>>;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  selectedContainerId: string | null;
  setSelectedContainerId: (id: string | null) => void;
  selectedLinkId: string | null;
  setSelectedLinkId: (id: string | null) => void;
  isConnectingMode: boolean;
  setIsConnectingMode: (active: boolean) => void;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  onRecordHistory: () => void;
  onOpenMetadataModal?: () => void;
  theme?: 'dark' | 'light';
  isPresentationMode?: boolean;
  onExitPresentation?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  onToggleTheme?: () => void;
  onFitToScreen?: () => void;
  onEnterPresentationMode?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  diagram,
  setDiagram,
  selectedNodeId,
  setSelectedNodeId,
  selectedContainerId,
  setSelectedContainerId,
  selectedLinkId,
  setSelectedLinkId,
  isConnectingMode,
  setIsConnectingMode,
  zoom,
  setZoom,
  canvasRef,
  onRecordHistory,
  onOpenMetadataModal,
  theme = 'dark',
  isPresentationMode = false,
  onExitPresentation,
  isFullscreen = false,
  onToggleFullscreen,
  onToggleTheme,
  onFitToScreen,
  onEnterPresentationMode,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo
}) => {
  const isLight = theme === 'light';
  const [snapToGrid, setSnapToGrid] = useState<boolean>(true);
  const [gridType, setGridType] = useState<GridPatternType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('multicloud_canvas_grid_type');
      if (saved && ['lines', 'dots', 'cross', 'dense', 'none'].includes(saved)) {
        return saved as GridPatternType;
      }
    }
    return 'none'; // Default: lousa em branco
  });
  const [isGridMenuOpen, setIsGridMenuOpen] = useState(false);
  const gridMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('multicloud_canvas_grid_type', gridType);
    }
  }, [gridType]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (gridMenuRef.current && !gridMenuRef.current.contains(e.target as Node)) {
        setIsGridMenuOpen(false);
      }
    };
    if (isGridMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isGridMenuOpen]);

  const getCanvasBackgroundStyle = (): React.CSSProperties => {
    const baseBgColor = isLight ? '#FFFFFF' : '#0E1015';
    if (gridType === 'none') {
      return {
        backgroundColor: baseBgColor,
        backgroundImage: 'none'
      };
    }

    const gridSize = 24 * zoom;
    const posX = panOffset.x;
    const posY = panOffset.y;

    if (gridType === 'dots') {
      return {
        backgroundColor: baseBgColor,
        backgroundImage: isLight
          ? 'radial-gradient(circle, rgba(148, 163, 184, 0.6) 1.2px, transparent 1.2px)'
          : 'radial-gradient(circle, rgba(255, 255, 255, 0.25) 1.2px, transparent 1.2px)',
        backgroundPosition: `${posX}px ${posY}px`,
        backgroundSize: `${gridSize}px ${gridSize}px`
      };
    }

    if (gridType === 'lines') {
      return {
        backgroundColor: baseBgColor,
        backgroundImage: isLight
          ? 'linear-gradient(to right, rgba(203, 213, 225, 0.65) 1px, transparent 1px), linear-gradient(to bottom, rgba(203, 213, 225, 0.65) 1px, transparent 1px)'
          : 'linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
        backgroundPosition: `${posX}px ${posY}px`,
        backgroundSize: `${gridSize}px ${gridSize}px`
      };
    }

    if (gridType === 'cross') {
      const strokeColor = isLight ? '%2394A3B8' : '%23FFFFFF';
      const strokeOpacity = isLight ? '0.7' : '0.25';
      const crossSvg = `data:image/svg+xml;utf8,<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M 12 7 L 12 17 M 7 12 L 17 12" stroke="${strokeColor}" stroke-opacity="${strokeOpacity}" stroke-width="1.2"/></svg>`;
      return {
        backgroundColor: baseBgColor,
        backgroundImage: `url('${crossSvg}')`,
        backgroundPosition: `${posX}px ${posY}px`,
        backgroundSize: `${gridSize}px ${gridSize}px`
      };
    }

    if (gridType === 'dense') {
      const fineSize = 12 * zoom;
      const majorSize = 48 * zoom;
      return {
        backgroundColor: baseBgColor,
        backgroundImage: isLight
          ? 'linear-gradient(to right, rgba(226, 232, 240, 0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(226, 232, 240, 0.8) 1px, transparent 1px), linear-gradient(to right, rgba(148, 163, 184, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.5) 1px, transparent 1px)'
          : 'linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)',
        backgroundPosition: `${posX}px ${posY}px, ${posX}px ${posY}px, ${posX}px ${posY}px, ${posX}px ${posY}px`,
        backgroundSize: `${fineSize}px ${fineSize}px, ${fineSize}px ${fineSize}px, ${majorSize}px ${majorSize}px, ${majorSize}px ${majorSize}px`
      };
    }

    return {
      backgroundColor: baseBgColor
    };
  };
  const [preferredLineType, setPreferredLineType] = useState<LinkRoutingType>('curved');
  const [connectingSourceId, setConnectingSourceId] = useState<string | null>(null);
  const [mouseCanvasPos, setMouseCanvasPos] = useState<{ x: number; y: number } | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>('');
  const [editingCidr, setEditingCidr] = useState<string>('');

  type ResizeHandle = 'nw' | 'ne' | 'se' | 'sw' | 'n' | 's' | 'e' | 'w';

  // Multi-selection state
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [selectedContainerIds, setSelectedContainerIds] = useState<string[]>([]);

  // Node alignment helpers
  const handleAlignHorizontal = () => {
    if (selectedNodeIds.length < 2) return;
    onRecordHistory();
    const selectedNodes = diagram.nodes.filter((n) => selectedNodeIds.includes(n.id));
    if (selectedNodes.length === 0) return;

    // Calculate average Y position
    const avgY = selectedNodes.reduce((sum, n) => sum + n.y, 0) / selectedNodes.length;
    const targetY = snapToGrid ? Math.round(avgY / 20) * 20 : Math.round(avgY);

    setDiagram((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (selectedNodeIds.includes(n.id) ? { ...n, y: targetY } : n))
    }));
  };

  const handleAlignVertical = () => {
    if (selectedNodeIds.length < 2) return;
    onRecordHistory();
    const selectedNodes = diagram.nodes.filter((n) => selectedNodeIds.includes(n.id));
    if (selectedNodes.length === 0) return;

    // Calculate average X position
    const avgX = selectedNodes.reduce((sum, n) => sum + n.x, 0) / selectedNodes.length;
    const targetX = snapToGrid ? Math.round(avgX / 20) * 20 : Math.round(avgX);

    setDiagram((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (selectedNodeIds.includes(n.id) ? { ...n, x: targetX } : n))
    }));
  };

  const handleDistributeHorizontally = () => {
    if (selectedNodeIds.length < 3) return;
    onRecordHistory();
    const selectedNodes = [...diagram.nodes.filter((n) => selectedNodeIds.includes(n.id))].sort((a, b) => a.x - b.x);
    const minX = selectedNodes[0].x;
    const maxX = selectedNodes[selectedNodes.length - 1].x;
    const step = (maxX - minX) / (selectedNodes.length - 1);

    const newPositions = new Map<string, number>();
    selectedNodes.forEach((n, idx) => {
      let posX = minX + step * idx;
      if (snapToGrid) posX = Math.round(posX / 20) * 20;
      newPositions.set(n.id, Math.round(posX));
    });

    setDiagram((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (newPositions.has(n.id) ? { ...n, x: newPositions.get(n.id)! } : n))
    }));
  };

  const handleDistributeVertically = () => {
    if (selectedNodeIds.length < 3) return;
    onRecordHistory();
    const selectedNodes = [...diagram.nodes.filter((n) => selectedNodeIds.includes(n.id))].sort((a, b) => a.y - b.y);
    const minY = selectedNodes[0].y;
    const maxY = selectedNodes[selectedNodes.length - 1].y;
    const step = (maxY - minY) / (selectedNodes.length - 1);

    const newPositions = new Map<string, number>();
    selectedNodes.forEach((n, idx) => {
      let posY = minY + step * idx;
      if (snapToGrid) posY = Math.round(posY / 20) * 20;
      newPositions.set(n.id, Math.round(posY));
    });

    setDiagram((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => (newPositions.has(n.id) ? { ...n, y: newPositions.get(n.id)! } : n))
    }));
  };

  const handleApplyLineTypeToAll = (lineType: LinkRoutingType) => {
    onRecordHistory();
    setPreferredLineType(lineType);
    setDiagram((prev) => ({
      ...prev,
      links: prev.links.map((l) => ({ ...l, lineType }))
    }));
  };

  // Stamp Drag State
  const [stampDragState, setStampDragState] = useState<{
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
  } | null>(null);

  // Sync external single-selection state with multi-selection set
  useEffect(() => {
    if (selectedNodeId && !selectedNodeIds.includes(selectedNodeId)) {
      setSelectedNodeIds([selectedNodeId]);
    } else if (!selectedNodeId && selectedNodeIds.length === 1) {
      setSelectedNodeIds([]);
    }
  }, [selectedNodeId]);

  useEffect(() => {
    if (selectedContainerId && !selectedContainerIds.includes(selectedContainerId)) {
      setSelectedContainerIds([selectedContainerId]);
    } else if (!selectedContainerId && selectedContainerIds.length === 1) {
      setSelectedContainerIds([]);
    }
  }, [selectedContainerId]);

  const updateSelection = (nodeIds: string[], containerIds: string[], linkId: string | null = null) => {
    setSelectedNodeIds(nodeIds);
    setSelectedContainerIds(containerIds);
    setSelectedNodeId(nodeIds[0] || null);
    setSelectedContainerId(containerIds[0] || null);
    setSelectedLinkId(linkId);
  };

  // Listen for Escape key to cancel connecting mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setConnectingSourceId(null);
        setIsConnectingMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsConnectingMode]);

  // Marquee Rubberband Selection State
  const [marqueeState, setMarqueeState] = useState<{
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
  } | null>(null);

  // Multi-drag State
  const [multiDragState, setMultiDragState] = useState<{
    startX: number;
    startY: number;
    initialNodePositions: Map<string, { x: number; y: number }>;
    initialContainerPositions: Map<string, { x: number; y: number }>;
    initialLinkPositions?: Map<string, { x: number; y: number }>;
  } | null>(null);

  // Manual Link Repositioning Drag State
  const [linkDragState, setLinkDragState] = useState<{
    linkId: string;
    startX: number;
    startY: number;
    initialControlPoint: { x: number; y: number };
  } | null>(null);

  // Resize Container State
  const [resizeState, setResizeState] = useState<{
    containerId: string;
    handle: ResizeHandle;
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
    initialWidth: number;
    initialHeight: number;
  } | null>(null);

  const [dragOverPos, setDragOverPos] = useState<{ x: number; y: number } | null>(null);

  // Orphan Nodes Management Modal State
  const [orphanPrompt, setOrphanPrompt] = useState<{
    containerIds: string[];
    containerNames: string[];
    containedNodes: DiagramNode[];
  } | null>(null);

  // Canvas Hand Panning & Tool Mode State (Movimentação livre 360° em todos os eixos)
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [canvasTool, setCanvasTool] = useState<'select' | 'hand'>('select');
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  const [panState, setPanState] = useState<{
    startX: number;
    startY: number;
    initialPanX: number;
    initialPanY: number;
    isPanning: boolean;
  } | null>(null);

  // Start Connection from Node
  const handleStartConnection = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setConnectingSourceId(nodeId);
    setIsConnectingMode(true);
    updateSelection([nodeId], []);
  };

  // Drag Over & Drop from Sidebar
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = Math.round((e.clientX - rect.left - panOffset.x) / zoom - 48);
      const y = Math.round((e.clientY - rect.top - panOffset.y) / zoom - 48);
      setDragOverPos({ x, y });
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (e.currentTarget && e.relatedTarget && e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }
    setDragOverPos(null);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (connectingSourceId && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - panOffset.x) / zoom;
      const y = (e.clientY - rect.top - panOffset.y) / zoom;
      setMouseCanvasPos({ x, y });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverPos(null);
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    let x = Math.round((e.clientX - rect.left - panOffset.x) / zoom - 40);
    let y = Math.round((e.clientY - rect.top - panOffset.y) / zoom - 40);

    if (snapToGrid) {
      x = Math.round(x / 20) * 20;
      y = Math.round(y / 20) * 20;
    }

    const iconDataStr = e.dataTransfer.getData('application/json');
    if (!iconDataStr) return;

    try {
      const icon = JSON.parse(iconDataStr);
      onRecordHistory();

      const newNode: DiagramNode = {
        id: `node_${Date.now()}`,
        name: icon.name,
        provider: icon.provider,
        category: icon.category,
        iconKey: icon.key,
        resourceType: icon.defaultResourceType,
        x,
        y,
        specs: { ...icon.defaultSpecs }
      };

      setDiagram((prev) => ({
        ...prev,
        nodes: [...prev.nodes, newNode]
      }));
      updateSelection([newNode.id], []);
    } catch (err) {
      console.error('Failed to drop node:', err);
    }
  };

  // Canvas Mouse Down for Hand Panning & Marquee Selection
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    // Left click (0) or Middle mouse click / wheel click (1)
    if (e.button !== 0 && e.button !== 1) return;

    if (isPresentationMode) {
      // In presentation mode, clicking canvas background deselects any inspected node and begins smooth hand panning
      setSelectedNodeId(null);
      setSelectedContainerId(null);
      setSelectedLinkId(null);
      if (canvasRef.current) {
        setPanState({
          startX: e.clientX,
          startY: e.clientY,
          initialPanX: panOffset.x,
          initialPanY: panOffset.y,
          isPanning: false
        });
      }
      return;
    }

    // Middle click always initiates free canvas panning in any direction
    if (e.button === 1) {
      e.preventDefault();
      if (!canvasRef.current) return;
      setPanState({
        startX: e.clientX,
        startY: e.clientY,
        initialPanX: panOffset.x,
        initialPanY: panOffset.y,
        isPanning: false
      });
      return;
    }

    // Hand tool active or Space key held: always pan the canvas freely
    if (canvasTool === 'hand' || isSpacePressed) {
      e.preventDefault();
      if (!canvasRef.current) return;
      setPanState({
        startX: e.clientX,
        startY: e.clientY,
        initialPanX: panOffset.x,
        initialPanY: panOffset.y,
        isPanning: false
      });
      return;
    }

    const target = e.target as HTMLElement;
    const isBackgroundClick =
      target === canvasRef.current ||
      target.id === 'architecture-canvas-container' ||
      target.id === 'architecture-canvas-stage' ||
      target.classList.contains('canvas-background') ||
      target.tagName.toLowerCase() === 'svg';

    if (isBackgroundClick) {
      if (!canvasRef.current) return;

      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        // Shift / Ctrl + Drag: Marquee Selection Box
        const rect = canvasRef.current.getBoundingClientRect();
        const startX = (e.clientX - rect.left - panOffset.x) / zoom;
        const startY = (e.clientY - rect.top - panOffset.y) / zoom;

        setMarqueeState({
          startX,
          startY,
          currentX: startX,
          currentY: startY
        });

        updateSelection([], [], null);
      } else {
        // Direct Drag: Hand Panning Canvas freely in all directions (direita, esquerda, cima, baixo)
        setPanState({
          startX: e.clientX,
          startY: e.clientY,
          initialPanX: panOffset.x,
          initialPanY: panOffset.y,
          isPanning: false
        });
      }
    }
  };

  // Node Dragging Handlers
  const handleMouseDownNode = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();

    // If Hand tool is active or Space is held, click anywhere pans the canvas freely
    if (canvasTool === 'hand' || isSpacePressed) {
      if (canvasRef.current) {
        setPanState({
          startX: e.clientX,
          startY: e.clientY,
          initialPanX: panOffset.x,
          initialPanY: panOffset.y,
          isPanning: false
        });
      }
      return;
    }

    if (isPresentationMode) {
      // In presentation mode, clicking a node toggles read-only inspection card without moving the node
      setSelectedNodeId(selectedNodeId === nodeId ? null : nodeId);
      setSelectedContainerId(null);
      setSelectedLinkId(null);
      return;
    }

    if (isConnectingMode) {
      if (!connectingSourceId) {
        setConnectingSourceId(nodeId);
      } else if (connectingSourceId !== nodeId) {
        onRecordHistory();
        const fromNode = diagram.nodes.find((n) => n.id === connectingSourceId);
        const toNode = diagram.nodes.find((n) => n.id === nodeId);
        const inferred = inferProtocolForLink(fromNode, toNode);

        const newLink: DiagramLink = {
          id: `link_${Date.now()}`,
          from: connectingSourceId,
          to: nodeId,
          label: inferred.label,
          style: inferred.style,
          color: inferred.color,
          protocol: inferred.protocol,
          arrowHead: 'end',
          strokeWidth: 2,
          lineType: preferredLineType
        };
        setDiagram((prev) => ({
          ...prev,
          links: [...prev.links, newLink]
        }));
        setSelectedLinkId(newLink.id);
        setConnectingSourceId(null);
        setIsConnectingMode(false);
      }
      return;
    }

    let activeNodeIds = [...selectedNodeIds];
    let activeContainerIds = [...selectedContainerIds];

    if (e.shiftKey || e.ctrlKey || e.metaKey) {
      if (activeNodeIds.includes(nodeId)) {
        activeNodeIds = activeNodeIds.filter((id) => id !== nodeId);
      } else {
        activeNodeIds.push(nodeId);
      }
    } else {
      if (!activeNodeIds.includes(nodeId)) {
        activeNodeIds = [nodeId];
        activeContainerIds = [];
      }
    }

    updateSelection(activeNodeIds, activeContainerIds, null);

    const nodePositions = new Map<string, { x: number; y: number }>();
    activeNodeIds.forEach((id) => {
      const node = diagram.nodes.find((n) => n.id === id);
      if (node) nodePositions.set(id, { x: node.x, y: node.y });
    });

    const containerPositions = new Map<string, { x: number; y: number }>();
    activeContainerIds.forEach((id) => {
      const c = diagram.containers.find((c) => c.id === id);
      if (c) containerPositions.set(id, { x: c.x, y: c.y });
    });

    const linkPositions = new Map<string, { x: number; y: number }>();
    diagram.links.forEach((l) => {
      if (l.controlPoint) linkPositions.set(l.id, { ...l.controlPoint });
    });

    onRecordHistory();

    setMultiDragState({
      startX: e.clientX,
      startY: e.clientY,
      initialNodePositions: nodePositions,
      initialContainerPositions: containerPositions,
      initialLinkPositions: linkPositions
    });
  };

  // Container Dragging Handlers
  const handleMouseDownContainer = (e: React.MouseEvent, containerId: string) => {
    e.stopPropagation();

    // If Hand tool is active or Space is held, click anywhere pans the canvas freely
    if (canvasTool === 'hand' || isSpacePressed) {
      if (canvasRef.current) {
        setPanState({
          startX: e.clientX,
          startY: e.clientY,
          initialPanX: panOffset.x,
          initialPanY: panOffset.y,
          isPanning: false
        });
      }
      return;
    }

    if (isPresentationMode) {
      setSelectedContainerId(selectedContainerId === containerId ? null : containerId);
      setSelectedNodeId(null);
      setSelectedLinkId(null);
      if (canvasRef.current) {
        setPanState({
          startX: e.clientX,
          startY: e.clientY,
          initialPanX: panOffset.x,
          initialPanY: panOffset.y,
          isPanning: false
        });
      }
      return;
    }

    let activeNodeIds = [...selectedNodeIds];
    let activeContainerIds = [...selectedContainerIds];

    if (e.shiftKey || e.ctrlKey || e.metaKey) {
      if (activeContainerIds.includes(containerId)) {
        activeContainerIds = activeContainerIds.filter((id) => id !== containerId);
      } else {
        activeContainerIds.push(containerId);
      }
    } else {
      if (!activeContainerIds.includes(containerId)) {
        activeNodeIds = [];
        activeContainerIds = [containerId];
      }
    }

    updateSelection(activeNodeIds, activeContainerIds, null);

    const nodePositions = new Map<string, { x: number; y: number }>();
    activeNodeIds.forEach((id) => {
      const node = diagram.nodes.find((n) => n.id === id);
      if (node) nodePositions.set(id, { x: node.x, y: node.y });
    });

    // Automatically include nodes inside active containers so dragging a container moves its contents
    const activeContainers = diagram.containers.filter((c) => activeContainerIds.includes(c.id));
    diagram.nodes.forEach((node) => {
      const isInside = activeContainers.some(
        (c) =>
          node.x >= c.x - 10 &&
          node.x + 96 <= c.x + c.width + 10 &&
          node.y >= c.y - 10 &&
          node.y + 80 <= c.y + c.height + 10
      );
      if (isInside) {
        nodePositions.set(node.id, { x: node.x, y: node.y });
      }
    });

    const containerPositions = new Map<string, { x: number; y: number }>();
    activeContainerIds.forEach((id) => {
      const c = diagram.containers.find((c) => c.id === id);
      if (c) containerPositions.set(id, { x: c.x, y: c.y });
    });

    // Include nested child containers
    diagram.containers.forEach((childC) => {
      if (!activeContainerIds.includes(childC.id)) {
        const isChildInside = activeContainers.some(
          (parent) =>
            childC.x >= parent.x - 5 &&
            childC.x + childC.width <= parent.x + parent.width + 5 &&
            childC.y >= parent.y - 5 &&
            childC.y + childC.height <= parent.y + parent.height + 5
        );
        if (isChildInside) {
          containerPositions.set(childC.id, { x: childC.x, y: childC.y });
        }
      }
    });

    const linkPositions = new Map<string, { x: number; y: number }>();
    diagram.links.forEach((l) => {
      if (l.controlPoint) linkPositions.set(l.id, { ...l.controlPoint });
    });

    onRecordHistory();

    setMultiDragState({
      startX: e.clientX,
      startY: e.clientY,
      initialNodePositions: nodePositions,
      initialContainerPositions: containerPositions,
      initialLinkPositions: linkPositions
    });
  };

  // Manual Link Drag Handler
  const handleMouseDownLinkHandle = (e: React.MouseEvent, link: DiagramLink, defaultMid: { x: number; y: number }) => {
    e.stopPropagation();
    e.preventDefault();

    if (canvasTool === 'hand' || isSpacePressed) {
      if (canvasRef.current) {
        setPanState({
          startX: e.clientX,
          startY: e.clientY,
          initialPanX: panOffset.x,
          initialPanY: panOffset.y,
          isPanning: false
        });
      }
      return;
    }

    if (isPresentationMode) return;

    updateSelection([], [], link.id);

    const initialCp = link.controlPoint ? { ...link.controlPoint } : { x: defaultMid.x, y: defaultMid.y };

    setLinkDragState({
      linkId: link.id,
      startX: e.clientX,
      startY: e.clientY,
      initialControlPoint: initialCp
    });
  };

  const handleResetLinkRoute = (linkId: string) => {
    onRecordHistory();
    setDiagram((prev) => ({
      ...prev,
      links: prev.links.map((l) => (l.id === linkId ? { ...l, controlPoint: undefined } : l))
    }));
  };

  // Container Resizing Handler
  const handleMouseDownResize = (e: React.MouseEvent, containerId: string, handle: ResizeHandle) => {
    e.stopPropagation();
    e.preventDefault();

    if (canvasTool === 'hand' || isSpacePressed) {
      if (canvasRef.current) {
        setPanState({
          startX: e.clientX,
          startY: e.clientY,
          initialPanX: panOffset.x,
          initialPanY: panOffset.y,
          isPanning: false
        });
      }
      return;
    }

    updateSelection([], [containerId], null);

    const container = diagram.containers.find((c) => c.id === containerId);
    if (!container) return;

    onRecordHistory();

    setResizeState({
      containerId,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      initialX: container.x,
      initialY: container.y,
      initialWidth: container.width,
      initialHeight: container.height
    });
  };

  // Stamp Drag Handler
  const handleMouseDownStamp = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (canvasTool === 'hand' || isSpacePressed) {
      if (canvasRef.current) {
        setPanState({
          startX: e.clientX,
          startY: e.clientY,
          initialPanX: panOffset.x,
          initialPanY: panOffset.y,
          isPanning: false
        });
      }
      return;
    }

    if (isPresentationMode) {
      if (canvasRef.current) {
        setPanState({
          startX: e.clientX,
          startY: e.clientY,
          initialPanX: panOffset.x,
          initialPanY: panOffset.y,
          isPanning: false
        });
      }
      return;
    }
    const currentX = diagram.metadata?.x ?? 30;
    const currentY = diagram.metadata?.y ?? 30;
    onRecordHistory();
    setStampDragState({
      startX: e.clientX,
      startY: e.clientY,
      initialX: currentX,
      initialY: currentY
    });
  };

  // Global Pointer Move & Up
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (marqueeState && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const scrollLeft = canvasRef.current.scrollLeft;
        const scrollTop = canvasRef.current.scrollTop;

        const currentX = (e.clientX - rect.left + scrollLeft) / zoom;
        const currentY = (e.clientY - rect.top + scrollTop) / zoom;

        setMarqueeState((prev) => (prev ? { ...prev, currentX, currentY } : null));

        const minX = Math.min(marqueeState.startX, currentX);
        const maxX = Math.max(marqueeState.startX, currentX);
        const minY = Math.min(marqueeState.startY, currentY);
        const maxY = Math.max(marqueeState.startY, currentY);

        const matchedNodeIds = diagram.nodes
          .filter((node) => node.x + 96 >= minX && node.x <= maxX && node.y + 80 >= minY && node.y <= maxY)
          .map((node) => node.id);

        const matchedContainerIds = diagram.containers
          .filter((c) => c.x + c.width >= minX && c.x <= maxX && c.y + c.height >= minY && c.y <= maxY)
          .map((c) => c.id);

        updateSelection(matchedNodeIds, matchedContainerIds);
      } else if (multiDragState) {
        const deltaX = (e.clientX - multiDragState.startX) / zoom;
        const deltaY = (e.clientY - multiDragState.startY) / zoom;

        const gridSize = snapToGrid ? 20 : 1;
        const snappedDeltaX = Math.round(deltaX / gridSize) * gridSize;
        const snappedDeltaY = Math.round(deltaY / gridSize) * gridSize;

        setDiagram((prev) => ({
          ...prev,
          nodes: prev.nodes.map((n) => {
            const init = multiDragState.initialNodePositions.get(n.id);
            return init ? { ...n, x: init.x + snappedDeltaX, y: init.y + snappedDeltaY } : n;
          }),
          containers: prev.containers.map((c) => {
            const init = multiDragState.initialContainerPositions.get(c.id);
            return init ? { ...c, x: init.x + snappedDeltaX, y: init.y + snappedDeltaY } : c;
          }),
          links: prev.links.map((link) => {
            if (!link.controlPoint) return link;
            const fromMoved = multiDragState.initialNodePositions.has(link.from);
            const toMoved = multiDragState.initialNodePositions.has(link.to);
            if (fromMoved && toMoved) {
              const initCP = multiDragState.initialLinkPositions?.get(link.id);
              if (initCP) {
                return {
                  ...link,
                  controlPoint: {
                    x: initCP.x + snappedDeltaX,
                    y: initCP.y + snappedDeltaY
                  }
                };
              }
            }
            return link;
          })
        }));
      } else if (linkDragState && canvasRef.current) {
        const deltaX = (e.clientX - linkDragState.startX) / zoom;
        const deltaY = (e.clientY - linkDragState.startY) / zoom;

        const gridSize = snapToGrid ? 20 : 1;
        const newX = Math.round((linkDragState.initialControlPoint.x + deltaX) / gridSize) * gridSize;
        const newY = Math.round((linkDragState.initialControlPoint.y + deltaY) / gridSize) * gridSize;

        setDiagram((prev) => ({
          ...prev,
          links: prev.links.map((l) =>
            l.id === linkDragState.linkId
              ? { ...l, controlPoint: { x: newX, y: newY } }
              : l
          )
        }));
      } else if (resizeState) {
        const deltaX = (e.clientX - resizeState.startX) / zoom;
        const deltaY = (e.clientY - resizeState.startY) / zoom;

        const { handle, initialX, initialY, initialWidth, initialHeight, containerId } = resizeState;

        let newX = initialX;
        let newY = initialY;
        let newWidth = initialWidth;
        let newHeight = initialHeight;

        if (handle.includes('e')) newWidth = Math.max(120, Math.round((initialWidth + deltaX) / 10) * 10);
        if (handle.includes('s')) newHeight = Math.max(80, Math.round((initialHeight + deltaY) / 10) * 10);
        if (handle.includes('w')) {
          const calcWidth = Math.max(120, Math.round((initialWidth - deltaX) / 10) * 10);
          newX = initialX + (initialWidth - calcWidth);
          newWidth = calcWidth;
        }
        if (handle.includes('n')) {
          const calcHeight = Math.max(80, Math.round((initialHeight - deltaY) / 10) * 10);
          newY = initialY + (initialHeight - calcHeight);
          newHeight = calcHeight;
        }

        setDiagram((prev) => ({
          ...prev,
          containers: prev.containers.map((c) =>
            c.id === containerId ? { ...c, x: newX, y: newY, width: newWidth, height: newHeight } : c
          )
        }));
      } else if (stampDragState) {
        const deltaX = (e.clientX - stampDragState.startX) / zoom;
        const deltaY = (e.clientY - stampDragState.startY) / zoom;

        const newX = Math.max(0, Math.round(stampDragState.initialX + deltaX));
        const newY = Math.max(0, Math.round(stampDragState.initialY + deltaY));

        setDiagram((prev) => ({
          ...prev,
          metadata: {
            ...prev.metadata,
            x: newX,
            y: newY
          }
        }));
      } else if (panState && canvasRef.current) {
        const deltaX = e.clientX - panState.startX;
        const deltaY = e.clientY - panState.startY;

        if (!panState.isPanning && (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2)) {
          setPanState((prev) => (prev ? { ...prev, isPanning: true } : null));
        }

        setPanOffset({
          x: panState.initialPanX + deltaX,
          y: panState.initialPanY + deltaY
        });
      }
    };

    const handleMouseUp = () => {
      if (panState && !panState.isPanning) {
        // Simple click on background deselects items
        updateSelection([], [], null);
      }
      setMultiDragState(null);
      setResizeState(null);
      setMarqueeState(null);
      setStampDragState(null);
      setPanState(null);
      setLinkDragState(null);
    };

    if (marqueeState || multiDragState || resizeState || stampDragState || panState || linkDragState) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [marqueeState, multiDragState, resizeState, stampDragState, panState, linkDragState, zoom, snapToGrid, diagram, setDiagram, onRecordHistory, updateSelection]);

  // Spacebar toggle for temporary Hand Tool
  useEffect(() => {
    const handleSpaceDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT')) {
        return;
      }
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        setIsSpacePressed(true);
      }
    };

    const handleSpaceUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
      }
    };

    window.addEventListener('keydown', handleSpaceDown);
    window.addEventListener('keyup', handleSpaceUp);
    return () => {
      window.removeEventListener('keydown', handleSpaceDown);
      window.removeEventListener('keyup', handleSpaceUp);
    };
  }, []);

  // Wheel Zoom Listener over Canvas with Zoom Centering
  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = canvasEl.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const delta = e.deltaY;
      const step = 0.08;

      setZoom((prevZoom) => {
        const nextZoom = Math.min(2.5, Math.max(0.3, Math.round((delta < 0 ? prevZoom + step : prevZoom - step) * 100) / 100));

        setPanOffset((prevPan) => {
          const ratio = nextZoom / prevZoom;
          return {
            x: Math.round(mouseX - (mouseX - prevPan.x) * ratio),
            y: Math.round(mouseY - (mouseY - prevPan.y) * ratio)
          };
        });

        return nextZoom;
      });
    };

    canvasEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      canvasEl.removeEventListener('wheel', handleWheel);
    };
  }, [canvasRef, setZoom]);

  // Keyboard Shortcuts (Delete, Ctrl+D, Ctrl+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      // H -> Hand Tool (Mão Panorâmica)
      if (!e.ctrlKey && !e.metaKey && !e.altKey && (e.key === 'h' || e.key === 'H')) {
        setCanvasTool('hand');
        return;
      }

      // V -> Selection Tool (Seleção)
      if (!e.ctrlKey && !e.metaKey && !e.altKey && (e.key === 'v' || e.key === 'V')) {
        setCanvasTool('select');
        return;
      }

      // Ctrl+A / Cmd+A -> Select All
      if ((e.ctrlKey || e.metaKey) && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        handleSelectAll();
        return;
      }

      // Ctrl+D / Cmd+D -> Duplicate Selected
      if ((e.ctrlKey || e.metaKey) && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        handleDuplicateSelected();
        return;
      }

      // Ctrl+Z / Cmd+Z -> Undo, Ctrl+Y / Cmd+Y / Ctrl+Shift+Z -> Redo
      if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
        if (e.shiftKey) {
          e.preventDefault();
          if (onRedo) onRedo();
        } else {
          e.preventDefault();
          if (onUndo) onUndo();
        }
        return;
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'Y')) {
        e.preventDefault();
        if (onRedo) onRedo();
        return;
      }

      // Delete / Backspace -> Delete Selected
      if (e.key === 'Delete' || e.key === 'Backspace') {
        handleDeleteSelected();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeIds, selectedContainerIds, selectedLinkId, diagram]);

  // Duplication Logic
  const handleDuplicateSelected = () => {
    if (selectedNodeIds.length === 0 && selectedContainerIds.length === 0) return;

    onRecordHistory();

    const nodeIdMap = new Map<string, string>();
    const newNodes: DiagramNode[] = [];
    const newContainers: DiagramContainer[] = [];
    const newLinks: DiagramLink[] = [];
    const timestamp = Date.now();

    diagram.nodes.forEach((node, idx) => {
      if (selectedNodeIds.includes(node.id)) {
        const newId = `node_${timestamp}_${idx}`;
        nodeIdMap.set(node.id, newId);
        newNodes.push({
          ...node,
          id: newId,
          name: `${node.name} (Cópia)`,
          x: node.x + 30,
          y: node.y + 30,
          specs: { ...node.specs }
        });
      }
    });

    diagram.containers.forEach((container, idx) => {
      if (selectedContainerIds.includes(container.id)) {
        const newId = `c_${timestamp}_${idx}`;
        newContainers.push({
          ...container,
          id: newId,
          name: `${container.name} (Cópia)`,
          x: container.x + 30,
          y: container.y + 30
        });
      }
    });

    diagram.links.forEach((link, idx) => {
      const newFrom = nodeIdMap.get(link.from);
      const newTo = nodeIdMap.get(link.to);
      if (newFrom && newTo) {
        newLinks.push({
          ...link,
          id: `link_${timestamp}_${idx}`,
          from: newFrom,
          to: newTo
        });
      }
    });

    setDiagram((prev) => ({
      ...prev,
      nodes: [...prev.nodes, ...newNodes],
      containers: [...prev.containers, ...newContainers],
      links: [...prev.links, ...newLinks],
      updatedAt: new Date().toISOString()
    }));

    updateSelection(
      newNodes.map((n) => n.id),
      newContainers.map((c) => c.id)
    );
  };

  // Delete Selected Logic with Cascade Delete & Orphan Nodes Prevention
  const handleDeleteSelected = () => {
    if (selectedNodeIds.length === 0 && selectedContainerIds.length === 0 && !selectedLinkId) return;

    // Check if deleting any containers that currently hold child nodes
    if (selectedContainerIds.length > 0) {
      const containedNodes = diagram.nodes.filter(
        (n) => n.containerId && selectedContainerIds.includes(n.containerId)
      );

      if (containedNodes.length > 0) {
        const targetContainers = diagram.containers.filter((c) => selectedContainerIds.includes(c.id));
        setOrphanPrompt({
          containerIds: selectedContainerIds,
          containerNames: targetContainers.map((c) => c.name),
          containedNodes
        });
        return;
      }
    }

    executeDeletion(false);
  };

  const executeDeletion = (cascadeContainedNodes = false) => {
    onRecordHistory();

    const targetContainerIds = orphanPrompt ? orphanPrompt.containerIds : selectedContainerIds;
    const directNodeIds = selectedNodeIds;

    const nodesToDelete = new Set<string>(directNodeIds);
    if (cascadeContainedNodes && orphanPrompt) {
      orphanPrompt.containedNodes.forEach((n) => nodesToDelete.add(n.id));
    }

    setDiagram((prev) => {
      // Clean up orphaned containerIds: if not cascading, safely unbind child nodes
      const updatedNodes = prev.nodes
        .filter((n) => !nodesToDelete.has(n.id))
        .map((n) => {
          if (n.containerId && targetContainerIds.includes(n.containerId)) {
            return { ...n, containerId: undefined };
          }
          return n;
        });

      return {
        ...prev,
        nodes: updatedNodes,
        containers: prev.containers.filter((c) => !targetContainerIds.includes(c.id)),
        links: prev.links.filter(
          (l) =>
            l.id !== selectedLinkId &&
            !nodesToDelete.has(l.from) &&
            !nodesToDelete.has(l.to)
        ),
        updatedAt: new Date().toISOString()
      };
    });

    setOrphanPrompt(null);
    updateSelection([], [], null);
  };

  // Grouping capability
  const handleGroup = () => {
    const totalSelected = selectedNodeIds.length + selectedContainerIds.length;
    if (totalSelected < 1) return;

    onRecordHistory();

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    const targetNodes = diagram.nodes.filter((n) => selectedNodeIds.includes(n.id));
    const targetContainers = diagram.containers.filter((c) => selectedContainerIds.includes(c.id));

    targetNodes.forEach((node) => {
      minX = Math.min(minX, node.x);
      minY = Math.min(minY, node.y);
      maxX = Math.max(maxX, node.x + 96);
      maxY = Math.max(maxY, node.y + 80);
    });

    targetContainers.forEach((c) => {
      minX = Math.min(minX, c.x);
      minY = Math.min(minY, c.y);
      maxX = Math.max(maxX, c.x + c.width);
      maxY = Math.max(maxY, c.y + c.height);
    });

    if (minX === Infinity || !isFinite(minX)) return;

    const paddingX = 24;
    const paddingTop = 48;
    const paddingBottom = 24;

    const singleProvider = targetNodes.length > 0 && targetNodes.every((n) => n.provider === targetNodes[0]?.provider) 
      ? targetNodes[0]?.provider 
      : null;
    const isCloudGroup = singleProvider && ['aws', 'azure', 'gcp', 'oci'].includes(singleProvider);
    const cloudNames: Record<string, string> = { aws: 'AWS', azure: 'Azure', gcp: 'GCP', oci: 'OCI' };
    const brandColors: Record<string, string> = { aws: '#FF9900', azure: '#0078D4', gcp: '#4285F4', oci: '#F80000' };

    const groupProvider = singleProvider || targetNodes[0]?.provider || targetContainers[0]?.provider || diagram.primaryProvider || 'generic';
    const groupName = isCloudGroup 
      ? cloudNames[singleProvider] 
      : `Grupo (${targetNodes.length + targetContainers.length} componentes)`;

    const groupContainer: DiagramContainer = {
      id: isCloudGroup ? `cloud_group_${singleProvider}_${Date.now()}` : `group_${Date.now()}`,
      name: groupName,
      provider: groupProvider,
      type: isCloudGroup ? 'cloud_group' : 'custom',
      x: Math.max(10, Math.round((minX - paddingX) / 10) * 10),
      y: Math.max(10, Math.round((minY - paddingTop) / 10) * 10),
      width: Math.max(200, Math.round((maxX - minX + paddingX * 2) / 10) * 10),
      height: Math.max(130, Math.round((maxY - minY + paddingTop + paddingBottom) / 10) * 10),
      color: isCloudGroup ? brandColors[singleProvider] : '#6366F1',
      borderStyle: 'solid'
    };

    setDiagram((prev) => ({
      ...prev,
      containers: [...prev.containers, groupContainer]
    }));

    updateSelection([], [groupContainer.id], null);
  };

  // Ungrouping capability
  const handleUngroup = () => {
    if (selectedContainerIds.length === 0) return;

    onRecordHistory();

    const containersToRemove = diagram.containers.filter((c) => selectedContainerIds.includes(c.id));
    const nodesInside: string[] = [];

    diagram.nodes.forEach((node) => {
      containersToRemove.forEach((c) => {
        if (
          node.x >= c.x - 10 &&
          node.x + 96 <= c.x + c.width + 10 &&
          node.y >= c.y - 10 &&
          node.y + 80 <= c.y + c.height + 10
        ) {
          if (!nodesInside.includes(node.id)) {
            nodesInside.push(node.id);
          }
        }
      });
    });

    setDiagram((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) =>
        n.containerId && selectedContainerIds.includes(n.containerId)
          ? { ...n, containerId: undefined }
          : n
      ),
      containers: prev.containers.filter((c) => !selectedContainerIds.includes(c.id))
    }));

    updateSelection(nodesInside, [], null);
  };

  // Select All
  const handleSelectAll = () => {
    const allNodeIds = diagram.nodes.map((n) => n.id);
    const allContainerIds = diagram.containers.map((c) => c.id);
    updateSelection(allNodeIds, allContainerIds, null);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT')) {
        return;
      }

      if (e.key === 'Escape') {
        setConnectingSourceId(null);
        setIsConnectingMode(false);
      }

      // Group shortcut: Ctrl+G or Cmd+G
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'g' && !e.shiftKey) {
        e.preventDefault();
        handleGroup();
      }

      // Ungroup shortcut: Ctrl+Shift+G or Cmd+Shift+G
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'g' && e.shiftKey) {
        e.preventDefault();
        handleUngroup();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeIds, selectedContainerIds, diagram]);

  return (
    <div
      id="architecture-canvas-container"
      ref={canvasRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleCanvasMouseMove}
      data-presentation-mode={isPresentationMode ? 'true' : undefined}
      data-active-inspect={isPresentationMode && !!selectedNodeId ? 'true' : undefined}
      className={`relative flex-1 overflow-hidden select-none custom-scrollbar canvas-background transition-colors ${
        isConnectingMode || connectingSourceId
          ? 'cursor-crosshair'
          : panState?.isPanning
          ? 'cursor-grabbing'
          : canvasTool === 'hand' || isSpacePressed
          ? 'cursor-grab'
          : 'cursor-grab'
      } ${
        isLight ? 'bg-white' : 'bg-[#0E1015]'
      }`}
      style={getCanvasBackgroundStyle()}
    >
      {/* Presentation Mode Heads-Up Display & Navigation HUD */}
      {isPresentationMode && (
        <PresentationHud
          diagram={diagram}
          zoom={zoom}
          setZoom={setZoom}
          onFitToScreen={() => fitDiagramToContainer(diagram, canvasRef.current, setZoom, 60, setPanOffset)}
          theme={theme}
          onToggleTheme={onToggleTheme || (() => {})}
          isFullscreen={isFullscreen}
          onToggleFullscreen={onToggleFullscreen || (() => {})}
          onExitPresentation={onExitPresentation || (() => {})}
          selectedNode={diagram.nodes.find((n) => n.id === selectedNodeId) || null}
          onCloseSelectedNode={() => setSelectedNodeId(null)}
        />
      )}

      {/* Active Connection Banner */}
      {!isPresentationMode && (isConnectingMode || connectingSourceId) && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-blue-950/95 border border-blue-500/80 text-blue-200 px-4 py-2 rounded-xl shadow-2xl flex items-center space-x-3 backdrop-blur-md animate-bounce-short">
          <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs font-semibold">
            {connectingSourceId ? (
              <>
                Ligar a partir de <strong className="text-white font-bold">{diagram.nodes.find((n) => n.id === connectingSourceId)?.name}</strong>: Clique no componente de destino (ex: EC2, Banco de Dados).
              </>
            ) : (
              <>Clique no <strong>primeiro componente</strong> (ex: Load Balancer) para iniciar a ligação.</>
            )}
          </span>

          {/* Active Routing Selector for New Connection */}
          <div className="flex items-center space-x-1 pl-2 border-l border-blue-400/30">
            <span className="text-[10px] uppercase font-bold text-blue-300">Traçado:</span>
            {[
              { id: 'curved', label: 'Curva', icon: Spline },
              { id: 'orthogonal', label: 'Ortogonal', icon: CornerDownRight },
              { id: 'straight', label: 'Reta', icon: Minus },
              { id: 'arc', label: 'Arco', icon: Waypoints }
            ].map((m) => {
              const Icon = m.icon;
              const isAct = preferredLineType === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPreferredLineType(m.id as any)}
                  className={`flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                    isAct
                      ? 'bg-blue-500 text-white shadow-sm ring-1 ring-white/50'
                      : 'bg-white/10 hover:bg-white/20 text-blue-200'
                  }`}
                  title={`Definir traçado ${m.label}`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              setConnectingSourceId(null);
              setIsConnectingMode(false);
            }}
            className="ml-2 bg-white/10 hover:bg-white/20 p-1 px-2 rounded-md text-xs font-medium text-slate-200 flex items-center space-x-1 border border-white/10"
            title="Cancelar Conexão (Esc)"
          >
            <X className="w-3.5 h-3.5 text-red-400" />
            <span>Cancelar</span>
          </button>
        </div>
      )}

      {/* Floating Selection Toolbar */}
      {!isPresentationMode && (selectedNodeIds.length > 0 || selectedContainerIds.length > 0 || selectedLinkId) && (
        <div className={`absolute top-4 left-1/2 -translate-x-1/2 z-30 border backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-2xl flex items-center space-x-3 text-xs ${
          isLight
            ? 'bg-white/95 border-slate-300 text-slate-800'
            : 'bg-[#12141A]/95 border-white/20 text-slate-200'
        }`}>
          <div className={`flex items-center space-x-1.5 font-semibold border-r pr-3 ${
            isLight ? 'text-slate-700 border-slate-300' : 'text-slate-300 border-white/10'
          }`}>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>
              {selectedNodeIds.length + selectedContainerIds.length || (selectedLinkId ? 1 : 0)} selecionado(s)
            </span>
          </div>

          {/* Quick Connect Action when 1 node selected */}
          {selectedNodeIds.length === 1 && !connectingSourceId && (
            <button
              onClick={(e) => handleStartConnection(e, selectedNodeIds[0])}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-indigo-600/40 hover:bg-indigo-600/70 text-indigo-200 border border-indigo-500/50 transition-all font-semibold"
              title="Ligar este componente a outro"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Conectar a...</span>
            </button>
          )}

          {/* Grouping / Agrupar */}
          {(selectedNodeIds.length + selectedContainerIds.length >= 1) && (
            <button
              onClick={handleGroup}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/60 text-indigo-200 border border-indigo-500/40 transition-all font-semibold"
              title="Agrupar componentes selecionados em um novo container (Ctrl+G)"
            >
              <FolderPlus className="w-3.5 h-3.5 text-indigo-300" />
              <span>Agrupar</span>
              <span className="text-[10px] text-indigo-300/80 font-mono ml-1">Ctrl+G</span>
            </button>
          )}

          {/* Ungrouping / Desagrupar */}
          {selectedContainerIds.length >= 1 && (
            <button
              onClick={handleUngroup}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-600/20 hover:bg-amber-600/50 text-amber-200 border border-amber-500/40 transition-all font-semibold"
              title="Desagrupar container selecionado (Ctrl+Shift+G)"
            >
              <FolderMinus className="w-3.5 h-3.5 text-amber-300" />
              <span>Desagrupar</span>
              <span className="text-[10px] text-amber-300/80 font-mono ml-1">Ctrl+Shift+G</span>
            </button>
          )}

          {/* Auto-Align Nodes Horizontally & Vertically */}
          {selectedNodeIds.length >= 2 && (
            <div className={`flex items-center space-x-1 pl-1 border-l ${
              isLight ? 'border-slate-300' : 'border-white/10'
            }`}>
              <button
                type="button"
                id="btn-align-horizontal"
                onClick={handleAlignHorizontal}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg border transition-all text-xs font-semibold shadow-sm ${
                  isLight
                    ? 'bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200'
                    : 'bg-blue-500/15 hover:bg-blue-500/30 text-blue-300 border-blue-500/30'
                }`}
                title="Alinhar Nós Horizontalmente (Ajusta todos para o mesmo eixo Y)"
              >
                <Rows className="w-3.5 h-3.5 text-blue-400" />
                <span>Alinhar Horiz.</span>
              </button>

              <button
                type="button"
                id="btn-align-vertical"
                onClick={handleAlignVertical}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg border transition-all text-xs font-semibold shadow-sm ${
                  isLight
                    ? 'bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200'
                    : 'bg-blue-500/15 hover:bg-blue-500/30 text-blue-300 border-blue-500/30'
                }`}
                title="Alinhar Nós Verticalmente (Ajusta todos para o mesmo eixo X)"
              >
                <Columns className="w-3.5 h-3.5 text-blue-400" />
                <span>Alinhar Vert.</span>
              </button>

              {selectedNodeIds.length >= 3 && (
                <>
                  <button
                    type="button"
                    id="btn-distribute-horizontal"
                    onClick={handleDistributeHorizontally}
                    className={`px-2 py-1 rounded-lg border transition-all text-[11px] font-medium ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                    }`}
                    title="Espaçar Nós Horizontalmente com distâncias iguais"
                  >
                    Espaçar H
                  </button>
                  <button
                    type="button"
                    id="btn-distribute-vertical"
                    onClick={handleDistributeVertically}
                    className={`px-2 py-1 rounded-lg border transition-all text-[11px] font-medium ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                    }`}
                    title="Espaçar Nós Verticalmente com distâncias iguais"
                  >
                    Espaçar V
                  </button>
                </>
              )}
            </div>
          )}

          {/* Duplicar */}
          {(selectedNodeIds.length > 0 || selectedContainerIds.length > 0) && (
            <button
              onClick={handleDuplicateSelected}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/30 transition-all font-medium"
              title="Duplicar selecionados (Ctrl+D)"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Duplicar</span>
              <span className="text-[10px] text-blue-400/80 font-mono ml-1">Ctrl+D</span>
            </button>
          )}

          {/* Link Routing Type Quick Switcher when link is selected */}
          {selectedLinkId && (
            <div className={`flex items-center space-x-1 pl-1 border-l ${
              isLight ? 'border-slate-300' : 'border-white/10'
            }`}>
              <span className={`text-[11px] font-bold mr-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Traçado:
              </span>
              {[
                { id: 'curved', label: 'Curva', icon: Spline, title: 'Curva Suave (Bézier fluida)' },
                { id: 'orthogonal', label: 'Ortogonal', icon: CornerDownRight, title: 'Ortogonal 90° (Ângulos retos / Manhattan)' },
                { id: 'straight', label: 'Reta', icon: Minus, title: 'Reta Direta (Ponto a ponto)' },
                { id: 'arc', label: 'Arco', icon: Waypoints, title: 'Arco Suave (Curvatura arqueada)' }
              ].map((item) => {
                const Icon = item.icon;
                const currentLink = diagram.links.find((l) => l.id === selectedLinkId);
                const isCurrent = (currentLink?.lineType || 'curved') === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onRecordHistory();
                      setDiagram((prev) => ({
                        ...prev,
                        links: prev.links.map((l) => (l.id === selectedLinkId ? { ...l, lineType: item.id as any } : l))
                      }));
                    }}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-lg border text-xs font-bold transition-all shadow-sm ${
                      isCurrent
                        ? isLight
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-blue-500/30 border-blue-500/60 text-blue-200'
                        : isLight
                        ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
                    }`}
                    title={item.title}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {(() => {
                const currentLink = diagram.links.find((l) => l.id === selectedLinkId);
                if (currentLink?.controlPoint) {
                  return (
                    <button
                      type="button"
                      onClick={() => handleResetLinkRoute(selectedLinkId)}
                      className={`flex items-center space-x-1 px-2 py-1 rounded-lg border text-xs font-bold transition-all shadow-sm ${
                        isLight
                          ? 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
                          : 'bg-amber-500/20 border-amber-500/40 text-amber-200 hover:bg-amber-500/30'
                      }`}
                      title="Redefinir traçado manual para modo automático"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
                      <span>Redefinir</span>
                    </button>
                  );
                }
                return null;
              })()}

              <span className={`text-[10px] hidden md:inline ml-1 font-medium ${
                isLight ? 'text-amber-700' : 'text-amber-400'
              }`}>
                ✦ Arraste a alça amarela para reposicionar
              </span>
            </div>
          )}

          {/* Excluir */}
          <button
            onClick={handleDeleteSelected}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-red-300 border border-red-500/30 transition-all font-medium"
            title="Excluir selecionados (Delete)"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Excluir</span>
          </button>

          {/* Selecionar Todos */}
          <button
            onClick={handleSelectAll}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-all text-xs font-medium"
            title="Selecionar Todos (Ctrl+A)"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Todos</span>
            <span className="text-[10px] text-slate-500 font-mono ml-1">Ctrl+A</span>
          </button>
        </div>
      )}

      {/* Floating Zoom & Canvas Controls Overlay */}
      {!isPresentationMode && (
        <div
          id="canvas-zoom-toolbar"
          className={`absolute bottom-5 right-5 z-30 border backdrop-blur-md px-2.5 py-1.5 rounded-xl shadow-2xl flex items-center space-x-2 text-xs ${
            isLight
              ? 'bg-white/95 border-slate-300 text-slate-800'
              : 'bg-[#12141A]/90 border-white/15 text-slate-200'
          }`}
        >
          {/* 2 Botões: Desfazer e Refazer Alterações (Apenas setas) */}
          {(onUndo || onRedo) && (
            <>
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  id="canvas-btn-undo"
                  disabled={!canUndo}
                  onClick={onUndo}
                  title="Desfazer alterações (Ctrl+Z)"
                  aria-label="Desfazer alterações"
                  className={`p-1.5 rounded-lg border flex items-center justify-center transition-all ${
                    canUndo
                      ? isLight
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800 shadow-sm active:scale-95'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200 shadow-sm active:scale-95'
                      : 'opacity-30 cursor-not-allowed border-transparent text-slate-400'
                  }`}
                >
                  <Undo2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  id="canvas-btn-redo"
                  disabled={!canRedo}
                  onClick={onRedo}
                  title="Refazer alterações (Ctrl+Y ou Ctrl+Shift+Z)"
                  aria-label="Refazer alterações"
                  className={`p-1.5 rounded-lg border flex items-center justify-center transition-all ${
                    canRedo
                      ? isLight
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800 shadow-sm active:scale-95'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200 shadow-sm active:scale-95'
                      : 'opacity-30 cursor-not-allowed border-transparent text-slate-400'
                  }`}
                >
                  <Redo2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className={`w-[1px] h-4 my-auto ${isLight ? 'bg-slate-300' : 'bg-white/10'}`} />
            </>
          )}

          {/* Tool Mode: Selection (V) vs Hand Pan (H) */}
          <div className="flex items-center space-x-1">
            <button
              type="button"
              id="btn-tool-select"
              onClick={() => setCanvasTool('select')}
              className={`px-2 py-1 rounded-lg text-xs font-bold border flex items-center space-x-1 transition-all shadow-sm ${
                canvasTool === 'select' && !isSpacePressed
                  ? isLight
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-blue-500/30 text-blue-300 border-blue-500/60'
                  : isLight
                  ? 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
              }`}
              title="Ferramenta de Seleção (Atalho: V) - Selecionar e editar elementos"
            >
              <MousePointer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Seleção</span>
              <span className={`text-[9px] font-mono px-1 py-0.2 rounded ml-0.5 ${isLight ? 'bg-black/10' : 'bg-white/10'}`}>V</span>
            </button>

            <button
              type="button"
              id="btn-tool-hand"
              onClick={() => setCanvasTool('hand')}
              className={`px-2 py-1 rounded-lg text-xs font-bold border flex items-center space-x-1 transition-all shadow-sm ${
                canvasTool === 'hand' || isSpacePressed
                  ? isLight
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-emerald-500/30 text-emerald-300 border-emerald-500/60'
                  : isLight
                  ? 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
              }`}
              title="Ferramenta Mão Panorâmica (Atalho: H ou segurar Barra de Espaço) - Movimentar todo o desenho livremente para direita, esquerda, cima e baixo"
            >
              <Hand className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mão</span>
              <span className={`text-[9px] font-mono px-1 py-0.2 rounded ml-0.5 ${isLight ? 'bg-black/10' : 'bg-white/10'}`}>H</span>
            </button>
          </div>

          <div className={`w-[1px] h-4 my-auto ${isLight ? 'bg-slate-300' : 'bg-white/10'}`} />

          {/* Line Routing Selector Toolbar */}
          <div className="flex items-center space-x-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-1 ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Linhas:
            </span>
            {[
              { id: 'curved', label: 'Curva', icon: Spline, title: 'Curva Suave (Bézier fluida)' },
              { id: 'orthogonal', label: 'Ortogonal', icon: CornerDownRight, title: 'Ortogonal 90° (Ângulos retos / Manhattan)' },
              { id: 'straight', label: 'Reta', icon: Minus, title: 'Reta Direta (Ponto a ponto)' },
              { id: 'arc', label: 'Arco', icon: Waypoints, title: 'Arco Suave (Curvatura arqueada)' }
            ].map((item) => {
              const Icon = item.icon;
              const isAct = preferredLineType === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPreferredLineType(item.id as any)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold border flex items-center space-x-1 transition-all ${
                    isAct
                      ? isLight
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-blue-500/30 text-blue-300 border-blue-500/60 shadow-sm'
                      : isLight
                      ? 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
                      : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
                  }`}
                  title={`${item.title} (Clique para definir estilo padrão)`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}

            {diagram.links.length > 0 && (
              <button
                type="button"
                onClick={() => handleApplyLineTypeToAll(preferredLineType)}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                  isLight
                    ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 shadow-sm'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30 shadow-sm'
                }`}
                title={`Aplicar estilo ${preferredLineType} a todas as ${diagram.links.length} ligações do diagrama`}
              >
                <span>Aplicar a Todas</span>
              </button>
            )}
          </div>

          <div className={`w-[1px] h-4 my-auto ${isLight ? 'bg-slate-300' : 'bg-white/10'}`} />

          <button
            type="button"
            id="btn-toggle-snap-grid"
            onClick={() => setIsGridMenuOpen(!isGridMenuOpen)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center space-x-1.5 transition-all shadow-sm ${
              gridType !== 'none'
                ? isLight
                  ? 'bg-blue-600 text-white border-blue-600 shadow-blue-500/20'
                  : 'bg-blue-500/25 text-blue-300 border-blue-500/50'
                : isLight
                ? 'bg-slate-100 text-slate-700 border-slate-300 hover:text-slate-900 hover:bg-slate-200'
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
            }`}
            title="Opções de Grade da Lousa (Quadriculado, Pontilhado, Cruzes, Milimetrado, Em Branco)"
          >
            <Grid className={`w-3.5 h-3.5 ${gridType !== 'none' ? (isLight ? 'text-white' : 'text-blue-400') : 'text-slate-400'}`} />
            <span>Grade: {gridType === 'none' ? 'OFF' : GRID_OPTIONS.find((o) => o.id === gridType)?.label || 'ON'}</span>
            <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${isGridMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Grid Options Popover Menu */}
          {isGridMenuOpen && (
            <div
              ref={gridMenuRef}
              className={`absolute bottom-full right-24 mb-3 w-60 p-2 rounded-xl border shadow-2xl z-50 transition-all ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-800 shadow-slate-900/20'
                  : 'bg-[#161922] border-white/20 text-slate-200 shadow-black/70'
              }`}
            >
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-200 dark:border-white/10">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                  Estilos de Grade da Lousa
                </span>
                <span className={`text-[9px] font-mono px-1 rounded ${isLight ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-slate-400'}`}>
                  24px
                </span>
              </div>

              <div className="space-y-1">
                {GRID_OPTIONS.map((opt) => {
                  const isSelected = gridType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setGridType(opt.id);
                        if (opt.id !== 'none' && !snapToGrid) {
                          setSnapToGrid(true);
                        }
                        setIsGridMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-semibold transition-all text-left ${
                        isSelected
                          ? isLight
                            ? 'bg-blue-50 text-blue-800 border border-blue-200 font-bold'
                            : 'bg-blue-600/20 text-blue-300 border border-blue-500/40 font-bold'
                          : isLight
                          ? 'hover:bg-slate-100 text-slate-700 border border-transparent'
                          : 'hover:bg-white/10 text-slate-300 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate pr-1">
                        {opt.icon}
                        <div className="truncate">
                          <span className="block text-xs leading-none">{opt.label}</span>
                          <span className={`text-[9px] block mt-0.5 truncate ${
                            isLight ? 'text-slate-500' : 'text-slate-400'
                          }`}>
                            {opt.desc}
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Snap to grid checkbox / toggle */}
              <div className="pt-2 mt-1.5 border-t border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setSnapToGrid(!snapToGrid)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    snapToGrid
                      ? isLight
                        ? 'bg-amber-50 text-amber-900 border border-amber-200'
                        : 'bg-amber-500/20 text-amber-200 border border-amber-500/40'
                      : isLight
                      ? 'bg-slate-100 text-slate-600 border border-slate-200'
                      : 'bg-white/5 text-slate-400 border border-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-1.5">
                    <Magnet className={`w-3.5 h-3.5 ${snapToGrid ? 'text-amber-500' : 'text-slate-400'}`} />
                    <span>Atrair para Grade (Snap)</span>
                  </div>
                  <span className="text-[10px] font-bold font-mono px-1 rounded bg-black/10 dark:bg-white/10">
                    {snapToGrid ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>
            </div>
          )}

          <div className={`w-[1px] h-4 my-auto ${isLight ? 'bg-slate-300' : 'bg-white/10'}`} />

          <button
            onClick={() => setZoom((z) => Math.max(0.3, Math.round((z - 0.1) * 10) / 10))}
            className={`p-1 rounded-md transition-colors font-bold ${
              isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/10 text-slate-300'
            }`}
            title="Diminuir Zoom (Mouse wheel)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setZoom(1.0);
              setPanOffset({ x: 0, y: 0 });
            }}
            className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
              isLight ? 'hover:bg-slate-100 text-amber-600' : 'hover:bg-white/10 text-amber-400'
            }`}
            title="Resetar Zoom (100%) e Posição Inicial"
          >
            {Math.round(zoom * 100)}%
          </button>

          <button
            onClick={() => setZoom((z) => Math.min(2.5, Math.round((z + 0.1) * 10) / 10))}
            className={`p-1 rounded-md transition-colors font-bold ${
              isLight ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-white/10 text-slate-300'
            }`}
            title="Aumentar Zoom (Mouse wheel)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className={`w-[1px] h-4 my-auto ${isLight ? 'bg-slate-300' : 'bg-white/10'}`} />

          <button
            onClick={() => fitDiagramToContainer(diagram, canvasRef.current, setZoom, 60, setPanOffset)}
            className={`p-1 rounded-md transition-colors text-[10px] uppercase font-semibold flex items-center space-x-1 ${
              isLight ? 'hover:bg-slate-100 text-slate-600 hover:text-slate-900' : 'hover:bg-white/10 text-slate-400 hover:text-slate-200'
            }`}
            title="Ajustar e Centralizar Desenho à Tela"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {onEnterPresentationMode && (
            <>
              <div className={`w-[1px] h-4 my-auto ${isLight ? 'bg-slate-300' : 'bg-white/10'}`} />
              <button
                type="button"
                id="btn-canvas-presentation"
                onClick={onEnterPresentationMode}
                className={`px-2.5 py-1 rounded-lg transition-all text-xs font-bold flex items-center space-x-1.5 shadow-sm border ${
                  isLight
                    ? 'bg-purple-50 hover:bg-purple-100 text-purple-900 border-purple-300'
                    : 'bg-purple-500/15 hover:bg-purple-500/25 text-purple-200 border-purple-500/40'
                }`}
                title="Modo Apresentação em Tela Cheia (Foco exclusivo na arquitetura)"
              >
                <Presentation className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden sm:inline">Apresentação</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* Zoom & Pan Canvas Stage Wrapper */}
      <div
        id="architecture-canvas-stage"
        className="relative origin-top-left canvas-background"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
          transition: panState?.isPanning ? 'none' : 'transform 75ms ease-out',
          width: '3600px',
          height: '2400px',
          backgroundColor: 'transparent',
          backgroundImage: 'none'
        }}
      >
        {/* Marquee Selection Rectangle Box */}
        {marqueeState && (
          <div
            className="marquee-box absolute border-2 border-blue-400 bg-blue-500/20 rounded-lg pointer-events-none z-40 transition-none"
            style={{
              left: `${Math.min(marqueeState.startX, marqueeState.currentX)}px`,
              top: `${Math.min(marqueeState.startY, marqueeState.currentY)}px`,
              width: `${Math.abs(marqueeState.currentX - marqueeState.startX)}px`,
              height: `${Math.abs(marqueeState.currentY - marqueeState.startY)}px`
            }}
          />
        )}

        {/* SVG Overlay for Connections */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          style={{ zIndex: 12 }}
        >
          {/* Live Line Preview while connecting */}
          {connectingSourceId && mouseCanvasPos && (() => {
            const srcNode = diagram.nodes.find((n) => n.id === connectingSourceId);
            if (!srcNode) return null;
            const dummyTarget = { x: mouseCanvasPos.x - 4, y: mouseCanvasPos.y - 4, width: 8, height: 8 };
            const route = calculateLinkRoute(srcNode, dummyTarget, preferredLineType);
            return (
              <g className="pointer-events-none">
                <path
                  d={route.pathD}
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  fill="none"
                />
                <polygon
                  points="-11,-5.5 0,0 -11,5.5 -8.5,0"
                  transform={`translate(${route.x2}, ${route.y2}) rotate(${route.angleEnd})`}
                  fill="#38BDF8"
                  stroke="#38BDF8"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
                <circle cx={route.x2} cy={route.y2} r="6" fill="#38BDF8" className="animate-ping" opacity="0.75" />
                <circle cx={route.x2} cy={route.y2} r="4" fill="#38BDF8" />
              </g>
            );
          })()}

          {/* Render Links / Connectors */}
          {diagram.links.map((link) => {
            const fromNode = diagram.nodes.find((n) => n.id === link.from);
            const toNode = diagram.nodes.find((n) => n.id === link.to);
            if (!fromNode || !toNode) return null;

            const isSelected = selectedLinkId === link.id;
            const route = calculateLinkRoute(fromNode, toNode, link.lineType || preferredLineType || 'curved', 3, link.controlPoint);
            const { pathD, x1, y1, x2, y2, angleStart, angleEnd, midX, midY } = route;

            const strokeColor = isSelected ? '#F59E0B' : (link.color || '#38BDF8');
            const baseWidth = link.strokeWidth || 2;
            const strokeWidth = isSelected ? baseWidth + 1 : baseWidth;

            const dashArray = 
              link.style === 'dashed' ? '6 6' :
              link.style === 'dotted' ? '2 4' : undefined;

            const arrowMode = link.arrowHead || 'end';
            const showEndArrow = arrowMode === 'end' || arrowMode === 'both';
            const showStartArrow = arrowMode === 'start' || arrowMode === 'both';

            // Scaled arrowhead proportions matching stroke thickness
            const arrowSize = strokeWidth <= 1 ? 10 : strokeWidth <= 2 ? 11.5 : 13.5;
            const arrowWidth = strokeWidth <= 1 ? 4.5 : strokeWidth <= 2 ? 5.5 : 6.5;
            const notch = arrowSize * 0.75;
            const arrowPoints = `-${arrowSize},-${arrowWidth} 0,0 -${arrowSize},${arrowWidth} -${notch},0`;

            const labelWidth = link.label ? Math.max(76, Math.min(180, link.label.length * 7 + 16)) : 0;

            return (
              <g
                key={link.id}
                className="pointer-events-auto cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  updateSelection([], [], link.id);
                }}
              >
                {/* Selection Halo Glow */}
                {isSelected && (
                  <path
                    d={pathD}
                    stroke="#F59E0B"
                    strokeWidth={strokeWidth + 8}
                    strokeOpacity="0.25"
                    fill="none"
                  />
                )}

                {/* Wider transparent hit-area for effortless clicking and dragging */}
                <path
                  d={pathD}
                  stroke="transparent"
                  strokeWidth="20"
                  fill="none"
                  onMouseDown={(e) => {
                    if (isSelected) {
                      handleMouseDownLinkHandle(e, link, { x: midX, y: midY });
                    }
                  }}
                />
                
                {/* Visible Connection Line */}
                <path
                  d={pathD}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={dashArray}
                  fill="none"
                  className="transition-all group-hover:stroke-amber-400"
                />

                {/* Destination Arrow Head (Pointing into target component) */}
                {showEndArrow && (
                  <polygon
                    points={arrowPoints}
                    transform={`translate(${x2}, ${y2}) rotate(${angleEnd})`}
                    fill={strokeColor}
                    stroke={strokeColor}
                    strokeWidth="1"
                    strokeLinejoin="round"
                    className="transition-colors group-hover:fill-amber-400 group-hover:stroke-amber-400"
                  />
                )}

                {/* Source Arrow Head (Pointing into source component, when bidirectional or start mode) */}
                {showStartArrow && (
                  <polygon
                    points={arrowPoints}
                    transform={`translate(${x1}, ${y1}) rotate(${angleStart})`}
                    fill={strokeColor}
                    stroke={strokeColor}
                    strokeWidth="1"
                    strokeLinejoin="round"
                    className="transition-colors group-hover:fill-amber-400 group-hover:stroke-amber-400"
                  />
                )}

                {/* Connection Protocol / Label Badge */}
                {link.label && (
                  <g transform={`translate(${midX}, ${midY})`}>
                    <rect
                      className="link-label-bg"
                      x={-labelWidth / 2}
                      y="-11"
                      width={labelWidth}
                      height="22"
                      rx="6"
                      fill={isLight ? '#FFFFFF' : '#0F172A'}
                      stroke={isSelected ? '#F59E0B' : (link.color || (isLight ? '#94A3B8' : '#334155'))}
                      strokeWidth="1.5"
                    />
                    <text
                      className="link-label-text"
                      x="0"
                      y="3.5"
                      fill={isLight ? '#0F172A' : '#E2E8F0'}
                      fontSize="9.5"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {link.label}
                    </text>
                  </g>
                )}

                {/* Interactive Reposition Handle on Selected Link */}
                {isSelected && !isPresentationMode && (
                  <g
                    className="pointer-events-auto cursor-grab active:cursor-grabbing select-none"
                    onMouseDown={(e) => handleMouseDownLinkHandle(e, link, { x: midX, y: midY })}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      handleResetLinkRoute(link.id);
                    }}
                  >
                    {/* Outer pulsing ring */}
                    <circle
                      cx={midX}
                      cy={midY}
                      r="16"
                      fill="#F59E0B"
                      fillOpacity="0.22"
                      className="animate-pulse pointer-events-none"
                    />
                    {/* Central handle knob */}
                    <circle
                      cx={midX}
                      cy={midY}
                      r="10"
                      fill={isLight ? '#FFFFFF' : '#1E293B'}
                      stroke="#F59E0B"
                      strokeWidth="2.5"
                      className="filter drop-shadow-md hover:scale-125 transition-transform"
                    />
                    {/* Directional 4-way arrows inside knob */}
                    <path
                      d={`M ${midX} ${midY - 5} L ${midX} ${midY + 5} M ${midX - 5} ${midY} L ${midX + 5} ${midY}`}
                      stroke="#F59E0B"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      className="pointer-events-none"
                    />
                    <path
                      d={`M ${midX - 2} ${midY - 3} L ${midX} ${midY - 5} L ${midX + 2} ${midY - 3}
                         M ${midX - 2} ${midY + 3} L ${midX} ${midY + 5} L ${midX + 2} ${midY + 3}
                         M ${midX - 3} ${midY - 2} L ${midX - 5} ${midY} L ${midX - 3} ${midY + 2}
                         M ${midX + 3} ${midY - 2} L ${midX + 5} ${midY} L ${midX + 3} ${midY + 2}`}
                      stroke="#F59E0B"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      className="pointer-events-none"
                    />

                    {/* Reset button badge if controlPoint is set */}
                    {link.controlPoint && (
                      <g
                        className="cursor-pointer group/reset"
                        transform={`translate(${midX + 13}, ${midY - 13})`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResetLinkRoute(link.id);
                        }}
                      >
                        <rect
                          x="-6"
                          y="-6"
                          width="14"
                          height="14"
                          rx="7"
                          fill={isLight ? '#EF4444' : '#DC2626'}
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                          className="filter drop-shadow group-hover/reset:scale-110 transition-transform"
                        />
                        <path
                          d="M -1.5 -1.5 L 4.5 4.5 M 4.5 -1.5 L -1.5 4.5"
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </g>
                    )}
                  </g>
                )}

                {/* Drag Visual Aids when actively dragging this link */}
                {linkDragState?.linkId === link.id && (
                  <g className="pointer-events-none">
                    {/* Faint reference alignment lines to node centers */}
                    <line
                      x1={fromNode.x + (fromNode.width || 96) / 2}
                      y1={fromNode.y + (fromNode.height || 88) / 2}
                      x2={midX}
                      y2={midY}
                      stroke="#F59E0B"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.65"
                    />
                    <line
                      x1={midX}
                      y1={midY}
                      x2={toNode.x + (toNode.width || 96) / 2}
                      y2={toNode.y + (toNode.height || 88) / 2}
                      stroke="#F59E0B"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      opacity="0.65"
                    />

                    {/* Live coordinate badge */}
                    <g transform={`translate(${midX}, ${midY - 26})`}>
                      <rect
                        x="-42"
                        y="-11"
                        width="84"
                        height="22"
                        rx="6"
                        fill={isLight ? '#0F172A' : '#FFFFFF'}
                        opacity="0.9"
                        className="filter drop-shadow-md"
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fill={isLight ? '#FFFFFF' : '#0F172A'}
                        fontSize="10"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {Math.round(midX)}, {Math.round(midY)}
                      </text>
                    </g>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Render Containers (VPCs / Subnets / Compartments) */}
        {diagram.containers.map((c) => {
          const isSelected = selectedContainerIds.includes(c.id);
          const isEditing = editingId === c.id;

          const handleSaveContainerInfo = () => {
            onRecordHistory();
            setDiagram((prev) => ({
              ...prev,
              containers: prev.containers.map((item) =>
                item.id === c.id
                  ? {
                      ...item,
                      name: editingName.trim() || item.name,
                      cidrBlock: (c.type === 'vpc' || c.type === 'subnet' || item.cidrBlock !== undefined)
                        ? (editingCidr.trim() || undefined)
                        : item.cidrBlock
                    }
                  : item
              )
            }));
            setEditingId(null);
          };

          return (
            <div
              key={c.id}
              id={`container-${c.id}`}
              onMouseDown={(e) => handleMouseDownContainer(e, c.id)}
              onDoubleClick={(e) => {
                if (isPresentationMode) return;
                e.stopPropagation();
                setEditingId(c.id);
                setEditingName(c.name);
                setEditingCidr(c.cidrBlock || (c.type === 'vpc' ? '10.0.0.0/16' : c.type === 'subnet' ? '10.0.1.0/24' : ''));
              }}
              style={{
                left: `${c.x}px`,
                top: `${c.y}px`,
                width: `${c.width}px`,
                height: `${c.height}px`,
                borderColor: c.color || '#3B82F6',
                backgroundColor: c.color 
                  ? `${c.color}${isLight ? '12' : '15'}` 
                  : (isLight ? 'rgba(255, 255, 255, 0.7)' : 'rgba(18, 20, 26, 0.3)')
              }}
              className={`container-box absolute rounded-xl border-2 transition-all p-3 z-0 ${
                c.borderStyle === 'solid' ? 'border-solid' : c.borderStyle === 'dotted' ? 'border-dotted' : 'border-dashed'
              } ${
                isSelected 
                  ? 'ring-2 ring-amber-400 shadow-2xl z-10 ' + (isLight ? 'bg-white/90' : 'bg-[#12141A]/70')
                  : (isLight ? 'hover:border-blue-500 shadow-sm' : 'hover:border-slate-300')
              }`}
            >
              {/* Container Label Header with Cloud Icon and Title at Top-Left */}
              {(() => {
                const normName = (c.name || '').trim().toLowerCase();
                const matchedProvider = ['aws', 'azure', 'gcp', 'oci'].includes(normName)
                  ? (normName as CloudProvider)
                  : c.provider;
                const cloudMeta = getCloudProviderMeta(matchedProvider) || getCloudProviderMeta(c.name);
                const cloudSvg = cloudMeta?.svg || getCloudLogoSvg(c.provider);
                const isCloudGroup = c.type === 'cloud_group' || ['aws', 'azure', 'gcp', 'oci'].includes(normName);
                const displayName = isCloudGroup
                  ? (matchedProvider === 'aws' ? 'AWS' : matchedProvider === 'azure' ? 'Azure' : matchedProvider === 'gcp' ? 'GCP' : matchedProvider === 'oci' ? 'OCI' : (cloudMeta?.name || c.name))
                  : c.name;

                return (
                  <div
                    className={`container-label flex items-center space-x-2 px-2.5 py-1.5 rounded-lg border text-xs w-max shadow-sm select-none transition-all ${
                      isLight
                        ? 'bg-white/95 border-slate-300 text-slate-950 backdrop-blur-sm shadow-sm'
                        : 'bg-[#12141A]/95 border-white/10 text-slate-100 backdrop-blur-sm'
                    }`}
                    style={{
                      borderColor: `${c.color || cloudMeta?.brandColor || '#3B82F6'}75`,
                      boxShadow: isSelected ? `0 0 12px ${c.color || cloudMeta?.brandColor || '#3B82F6'}35` : undefined
                    }}
                  >
                    {/* Cloud or Container Icon on Top-Left */}
                    {cloudSvg ? (
                      <div
                        className="w-5 h-5 flex items-center justify-center shrink-0 rounded overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: cloudSvg }}
                        title={`${displayName} Cloud Provider`}
                      />
                    ) : (
                      <div className="w-5 h-5 flex items-center justify-center shrink-0">
                        {c.type === 'region' && <Globe className="w-4 h-4 text-emerald-400" />}
                        {c.type === 'ai_stack' && <Sparkles className="w-4 h-4 text-purple-400" />}
                        {c.type === 'on_premise' && <Server className="w-4 h-4 text-slate-400" />}
                        {c.type === 'cluster' && <Boxes className="w-4 h-4 text-blue-400" />}
                        {c.type === 'app' && <AppWindow className="w-4 h-4 text-purple-400" />}
                        {c.type === 'generic' && <Box className="w-4 h-4 text-teal-400" />}
                        {c.type === 'asg' && <Zap className="w-4 h-4 text-amber-500" />}
                        {c.type === 'aws_account' && <Shield className="w-4 h-4 text-orange-400" />}
                        {c.type === 'azure_subscription' && <Shield className="w-4 h-4 text-cyan-400" />}
                        {c.type === 'resource_group' && <FolderKanban className="w-4 h-4 text-sky-400" />}
                        {c.type === 'compartment' && <Network className="w-4 h-4 text-red-500" />}
                        {!['region', 'ai_stack', 'on_premise', 'cluster', 'app', 'generic', 'asg', 'aws_account', 'azure_subscription', 'resource_group', 'compartment'].includes(c.type) && (
                          <Box className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    )}

                    {/* Title & Type */}
                    {isEditing ? (
                      <div className="flex items-center space-x-1.5" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          autoFocus
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveContainerInfo();
                            if (e.key === 'Escape') setEditingId(null);
                          }}
                          className={`border rounded px-1.5 py-0.5 text-xs outline-none w-28 ${
                            isLight ? 'bg-slate-100 border-blue-500 text-slate-950' : 'bg-black/60 border-blue-500 text-slate-100'
                          }`}
                          title="Nome do Container"
                        />
                        {(c.type === 'vpc' || c.type === 'subnet' || c.cidrBlock !== undefined) && (
                          <input
                            type="text"
                            value={editingCidr}
                            onChange={(e) => setEditingCidr(e.target.value)}
                            placeholder={c.type === 'vpc' ? '10.0.0.0/16' : '10.0.1.0/24'}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveContainerInfo();
                              if (e.key === 'Escape') setEditingId(null);
                            }}
                            className={`border rounded px-1.5 py-0.5 text-[11px] font-mono font-bold outline-none w-28 ${
                              isLight ? 'bg-slate-100 border-blue-500 text-blue-900' : 'bg-black/60 border-blue-500 text-emerald-400'
                            }`}
                            title="Range IP (CIDR)"
                          />
                        )}
                        <button
                          type="button"
                          onClick={handleSaveContainerInfo}
                          className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer shadow-xs"
                        >
                          Salvar
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1.5">
                        <span
                          className="font-normal text-[13px] tracking-wide"
                          style={{ color: c.color || cloudMeta?.brandColor || (isLight ? '#0F172A' : '#F8FAFC') }}
                        >
                          {displayName}
                        </span>
                        {!isCloudGroup && (
                          <span className={`uppercase text-[9px] tracking-wider font-semibold px-1.5 py-0.5 rounded ${
                            isLight ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-slate-400'
                          }`}>
                            {c.type === 'region'
                              ? 'REGION'
                              : c.type === 'ai_stack'
                              ? 'AI STACK'
                              : c.type === 'on_premise'
                              ? 'ON-PREMISE'
                              : c.type === 'resource_group'
                              ? 'RESOURCE GROUP'
                              : c.type === 'azure_subscription'
                              ? 'AZURE SUBSCRIPTION'
                              : c.type === 'aws_account'
                              ? 'AWS ACCOUNT'
                              : c.type === 'asg'
                              ? 'ASG'
                              : c.type === 'generic'
                              ? 'GENÉRICO'
                              : c.type.replace(/_/g, ' ')}
                          </span>
                        )}
                        {/* Range IP / CIDR Block badge on Canvas Container */}
                        {(c.type === 'vpc' || c.type === 'subnet' || c.cidrBlock) && (
                          <div
                            onClick={(e) => {
                              if (isPresentationMode) return;
                              e.stopPropagation();
                              setEditingId(c.id);
                              setEditingName(c.name);
                              setEditingCidr(c.cidrBlock || (c.type === 'vpc' ? '10.0.0.0/16' : c.type === 'subnet' ? '10.0.1.0/24' : ''));
                            }}
                            className={`flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10.5px] font-mono font-bold border transition-all cursor-pointer hover:scale-105 ml-1 ${
                              isLight
                                ? 'bg-blue-50/90 border-blue-300 text-blue-800 hover:bg-blue-100 shadow-xs'
                                : 'bg-blue-950/40 border-blue-500/30 text-sky-300 hover:bg-blue-900/50 shadow-xs'
                            }`}
                            title="Range IP (CIDR) - Clique duplo ou clique aqui para editar"
                          >
                            <Network className="w-3 h-3 text-sky-500 shrink-0" />
                            <span>{c.cidrBlock || (c.type === 'vpc' ? '10.0.0.0/16' : c.type === 'subnet' ? '10.0.1.0/24' : '')}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Quick Ungroup Action Button on Selected Container */}
              {isSelected && !isPresentationMode && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUngroup();
                  }}
                  className="absolute top-2 right-2 z-20 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-500/40 flex items-center space-x-1 shadow-md transition-all hover:scale-105"
                  title="Desagrupar este container (Ctrl+Shift+G)"
                >
                  <FolderMinus className="w-3 h-3 text-amber-300" />
                  <span>Desagrupar</span>
                </button>
              )}

              {/* Resize Handles for Selected Container */}
              {isSelected && !isPresentationMode && (
                <>
                  <div
                    onMouseDown={(e) => handleMouseDownResize(e, c.id, 'nw')}
                    className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-amber-400 border-2 border-[#12141A] rounded-full cursor-nwse-resize z-20 hover:scale-125 transition-transform shadow-md"
                    title="Redimensionar Canto Superior Esquerdo"
                  />
                  <div
                    onMouseDown={(e) => handleMouseDownResize(e, c.id, 'ne')}
                    className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-amber-400 border-2 border-[#12141A] rounded-full cursor-nesw-resize z-20 hover:scale-125 transition-transform shadow-md"
                    title="Redimensionar Canto Superior Direito"
                  />
                  <div
                    onMouseDown={(e) => handleMouseDownResize(e, c.id, 'se')}
                    className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-amber-400 border-2 border-[#12141A] rounded-full cursor-nwse-resize z-20 hover:scale-125 transition-transform shadow-md"
                    title="Redimensionar Canto Inferior Direito"
                  />
                  <div
                    onMouseDown={(e) => handleMouseDownResize(e, c.id, 'sw')}
                    className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-amber-400 border-2 border-[#12141A] rounded-full cursor-nesw-resize z-20 hover:scale-125 transition-transform shadow-md"
                    title="Redimensionar Canto Inferior Esquerdo"
                  />
                  <div
                    onMouseDown={(e) => handleMouseDownResize(e, c.id, 'n')}
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-amber-400 border-2 border-[#12141A] rounded-full cursor-ns-resize z-20 hover:scale-125 transition-transform shadow-md"
                    title="Redimensionar Altura Superior"
                  />
                  <div
                    onMouseDown={(e) => handleMouseDownResize(e, c.id, 's')}
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-amber-400 border-2 border-[#12141A] rounded-full cursor-ns-resize z-20 hover:scale-125 transition-transform shadow-md"
                    title="Redimensionar Altura Inferior"
                  />
                  <div
                    onMouseDown={(e) => handleMouseDownResize(e, c.id, 'w')}
                    className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3.5 h-3.5 bg-amber-400 border-2 border-[#12141A] rounded-full cursor-ew-resize z-20 hover:scale-125 transition-transform shadow-md"
                    title="Redimensionar Largura Esquerda"
                  />
                  <div
                    onMouseDown={(e) => handleMouseDownResize(e, c.id, 'e')}
                    className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3.5 h-3.5 bg-amber-400 border-2 border-[#12141A] rounded-full cursor-ew-resize z-20 hover:scale-125 transition-transform shadow-md"
                    title="Redimensionar Largura Direita"
                  />
                </>
              )}
            </div>
          );
        })}

        {/* Render Resource Nodes */}
        {diagram.nodes.map((node) => {
          const iconDef = getIconByKey(node.iconKey);
          const isSelected = selectedNodeIds.includes(node.id);
          const isConnectingSource = connectingSourceId === node.id;
          const isEditing = editingId === node.id;

          const handleSaveNodeName = () => {
            if (editingName.trim()) {
              onRecordHistory();
              setDiagram((prev) => ({
                ...prev,
                nodes: prev.nodes.map((item) => (item.id === node.id ? { ...item, name: editingName.trim() } : item))
              }));
            }
            setEditingId(null);
          };

          return (
            <div
              key={node.id}
              id={`node-${node.id}`}
              onMouseDown={(e) => handleMouseDownNode(e, node.id)}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              onDoubleClick={(e) => {
                if (isPresentationMode) return;
                e.stopPropagation();
                setEditingId(node.id);
                setEditingName(node.name);
              }}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`
              }}
              className={`node-card absolute w-24 flex flex-col items-center justify-center p-2 rounded-xl border cursor-grab active:cursor-grabbing transition-all duration-150 z-20 shadow-lg group ${
                isConnectingSource
                  ? 'ring-4 ring-blue-500 border-blue-400 scale-105'
                  : isSelected
                  ? 'ring-2 ring-amber-400 border-amber-400 shadow-amber-500/20 ' + (isLight ? 'bg-amber-50' : 'bg-[#1a1d26]')
                  : isLight
                  ? 'bg-white border-slate-300 hover:border-blue-500 hover:shadow-xl hover:scale-105 text-slate-900'
                  : 'bg-[#12141A] border-white/10 hover:border-blue-500/80 hover:bg-[#1a1d26] hover:scale-105 text-slate-100'
              }`}
            >
              {/* Provider Badge Pill */}
              <span
                className="text-[8px] font-bold uppercase px-1.5 py-0.2 rounded-full mb-1"
                style={{
                  backgroundColor: `${iconDef?.brandColor || '#3B82F6'}20`,
                  color: iconDef?.brandColor || (isLight ? '#1D4ED8' : '#60A5FA')
                }}
              >
                {node.provider}
              </span>

              {/* Icon SVG */}
              <div
                className="w-10 h-10 flex items-center justify-center p-1"
                dangerouslySetInnerHTML={{ __html: iconDef?.svg || '' }}
              />

              {/* Node Title & Specs Badge */}
              {isEditing ? (
                <input
                  type="text"
                  autoFocus
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={handleSaveNodeName}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveNodeName();
                    if (e.key === 'Escape') setEditingId(null);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className={`border rounded px-1 text-xs text-center outline-none w-full mt-1 ${
                    isLight ? 'bg-slate-100 border-blue-500 text-slate-950 font-bold' : 'bg-black/60 border-blue-500 text-slate-100'
                  }`}
                />
              ) : (
                <span className={`text-xs font-bold text-center leading-tight mt-1 line-clamp-2 w-full break-words ${
                  isLight ? 'text-slate-950' : 'text-slate-100'
                }`}>
                  {node.name}
                </span>
              )}

              {node.specs.instanceType && (
                <span className={`instance-badge text-[9px] font-mono font-bold mt-0.5 px-1 py-0.2 rounded ${
                  isLight ? 'bg-slate-100 text-slate-900 border border-slate-300' : 'bg-black/40 text-slate-400'
                }`}>
                  {node.specs.instanceType}
                </span>
              )}

              {/* Selection Indicator */}
              {isSelected && !isPresentationMode && (
                <div className="selection-indicator absolute -top-2 -right-2 bg-amber-400 text-slate-950 p-1 rounded-full shadow-md">
                  <Move className="w-3 h-3" />
                </div>
              )}

              {/* Quick Connection Action Button (shown when hovered or selected) */}
              {!isPresentationMode && (isSelected || hoveredNodeId === node.id || isConnectingSource) && !isConnectingSource && (
                <button
                  type="button"
                  onClick={(e) => handleStartConnection(e, node.id)}
                  className="interactive-control absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-30 px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-600 hover:bg-blue-500 text-white border border-blue-300 shadow-lg flex items-center space-x-1 transition-transform hover:scale-110 whitespace-nowrap"
                  title="Criar conexão a partir deste componente"
                >
                  <Zap className="w-2.5 h-2.5 text-amber-300 fill-amber-300" />
                  <span>Ligar</span>
                </button>
              )}

              {/* Target Highlight Overlay when connecting */}
              {connectingSourceId && connectingSourceId !== node.id && hoveredNodeId === node.id && (
                <div className="connection-target-overlay absolute inset-0 rounded-xl ring-4 ring-emerald-400 bg-emerald-500/25 flex flex-col items-center justify-center z-30 backdrop-blur-[1px] animate-pulse">
                  <span className="bg-emerald-600 text-white font-bold text-[9px] px-2 py-0.5 rounded shadow-md flex items-center space-x-1 whitespace-nowrap">
                    <ArrowRight className="w-3 h-3" />
                    <span>Ligar Aqui</span>
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* Visual Drag-and-Drop Ghosting Node Preview on Canvas */}
        {dragOverPos && (
          <div
            style={{
              left: `${dragOverPos.x}px`,
              top: `${dragOverPos.y}px`
            }}
            className={`drag-ghost-preview absolute w-24 h-24 flex flex-col items-center justify-center p-2 rounded-xl border-2 border-dashed border-blue-500 bg-blue-500/15 backdrop-blur-md z-30 pointer-events-none shadow-2xl transition-transform animate-pulse ${
              isLight ? 'text-blue-900 border-blue-600 bg-blue-500/20' : 'text-blue-300'
            }`}
          >
            <div className="w-8 h-8 rounded-full border border-blue-400/60 bg-blue-500/20 flex items-center justify-center mb-1">
              <Sparkles className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-blue-400 text-center">
              Soltar para Adicionar
            </span>
            <span className="text-[8px] font-mono text-blue-300/80 mt-0.5">
              X: {dragOverPos.x} Y: {dragOverPos.y}
            </span>
          </div>
        )}

        {/* Render Diagram Metadata Stamp Block */}
        {diagram.metadata?.showOnCanvas === true && (
          <div
            id="diagram-metadata-stamp"
            onMouseDown={handleMouseDownStamp}
            onDoubleClick={() => {
              if (isPresentationMode) return;
              onOpenMetadataModal && onOpenMetadataModal();
            }}
            style={{
              left: `${diagram.metadata?.x ?? 30}px`,
              top: `${diagram.metadata?.y ?? 30}px`
            }}
            className={`metadata-stamp absolute z-20 min-w-[280px] border-2 rounded-xl p-3.5 shadow-2xl backdrop-blur-md cursor-grab active:cursor-grabbing transition-all group select-none ${
              isLight
                ? 'bg-white/95 border-blue-500/50 hover:border-blue-600 text-slate-800 hover:shadow-blue-500/10'
                : 'bg-[#12141A]/95 border-blue-500/40 hover:border-blue-400 text-slate-200 hover:shadow-blue-500/10'
            }`}
          >
            <div className={`flex items-center justify-between pb-2 mb-2 border-b ${
              isLight ? 'border-slate-200' : 'border-white/10'
            }`}>
              <div className="flex items-center space-x-2">
                <div className={`p-1 rounded border ${
                  isLight ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-blue-600/30 text-blue-400 border-blue-500/30'
                }`}>
                  <FileSignature className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  isLight ? 'text-blue-700' : 'text-blue-400'
                }`}>
                  Carimbo do Diagrama
                </span>
              </div>
              {!isPresentationMode && onOpenMetadataModal && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenMetadataModal();
                  }}
                  className={`interactive-control text-[10px] font-semibold px-2 py-0.5 rounded border transition-all ${
                    isLight
                      ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-300'
                      : 'opacity-80 group-hover:opacity-100 bg-blue-600/20 hover:bg-blue-600/50 text-blue-300 border border-blue-500/30'
                  }`}
                  title="Editar Dados (Autor, Cargo, Data, Projeto)"
                >
                  Editar
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div className={`col-span-2 pb-1 border-b ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
                <span className={`block text-[9px] uppercase font-bold tracking-wider ${isLight ? 'text-slate-800' : 'text-slate-400'}`}>Projeto</span>
                <span className={`font-bold truncate block ${isLight ? 'text-slate-950' : 'text-white'}`}>
                  {diagram.metadata?.project || diagram.title || 'Projeto Cloud'}
                </span>
              </div>

              <div>
                <span className={`block text-[9px] uppercase font-bold tracking-wider ${isLight ? 'text-slate-800' : 'text-slate-400'}`}>Autor</span>
                <span className={`font-bold truncate block ${isLight ? 'text-slate-950' : 'text-slate-200'}`}>
                  {diagram.metadata?.author || '—'}
                </span>
              </div>

              <div>
                <span className={`block text-[9px] uppercase font-bold tracking-wider ${isLight ? 'text-slate-800' : 'text-slate-400'}`}>Cargo</span>
                <span className={`font-bold truncate block ${isLight ? 'text-slate-950' : 'text-slate-200'}`}>
                  {diagram.metadata?.role || '—'}
                </span>
              </div>

              {diagram.metadata?.company && (
                <div className={`col-span-2 pt-1 border-t ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
                  <span className={`block text-[9px] uppercase font-bold tracking-wider ${isLight ? 'text-slate-800' : 'text-slate-400'}`}>Organização</span>
                  <span className={`font-bold truncate block ${isLight ? 'text-slate-950' : 'text-slate-200'}`}>
                    {diagram.metadata.company}
                  </span>
                </div>
              )}

              <div className={`col-span-2 pt-1 border-t ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
                <span className={`block text-[9px] uppercase font-bold tracking-wider ${isLight ? 'text-slate-800' : 'text-slate-400'}`}>Data</span>
                <span className={`font-bold truncate block ${isLight ? 'text-slate-950' : 'text-slate-300'}`}>
                  {diagram.metadata?.date || new Date().toLocaleDateString('pt-BR')}
                </span>
              </div>

              {diagram.metadata?.tags && diagram.metadata.tags.length > 0 && (
                <div className={`col-span-2 pt-1.5 border-t flex flex-wrap gap-1 ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
                  {diagram.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-0.5 rounded-md text-[9px] font-bold border ${
                        isLight
                          ? 'bg-blue-50 border-blue-200 text-blue-800'
                          : 'bg-blue-500/15 border-blue-500/30 text-blue-300'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Orphan Nodes Management & Cascade Delete Confirmation Modal */}
        <OrphanNodesModal
          isOpen={Boolean(orphanPrompt)}
          containerNames={orphanPrompt?.containerNames || []}
          containedNodesCount={orphanPrompt?.containedNodes.length || 0}
          onUnbindAndKeepNodes={() => executeDeletion(false)}
          onCascadeDelete={() => executeDeletion(true)}
          onCancel={() => setOrphanPrompt(null)}
          theme={theme}
        />
      </div>
    </div>
  );
};
