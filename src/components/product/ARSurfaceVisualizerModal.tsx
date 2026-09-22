import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Camera,
  Layers,
  RotateCcw,
  RotateCw,
  Sparkles,
  Download,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sliders,
  RefreshCw,
  Maximize2,
  FileText,
  ScanLine,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  Compass,
  ChevronDown,
  ChevronUp,
  Move,
} from 'lucide-react';
import { Product } from '../../types';

interface ARSurfaceVisualizerModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal?: (productName: string) => void;
}

// Preset architectural rooms for fallback or testing
const PRESET_ROOMS = [
  {
    id: 'living',
    name: 'Modern Living Room',
    type: 'floor',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
    defaultPerspective: { pitch: 58, scale: 1.1, yOffset: 35 },
  },
  {
    id: 'kitchen',
    name: 'Kitchen Island & Wall',
    type: 'wall',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80',
    defaultPerspective: { pitch: 12, scale: 0.95, yOffset: 10 },
  },
  {
    id: 'bathroom',
    name: 'Master Bath Feature Wall',
    type: 'wall',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
    defaultPerspective: { pitch: 5, scale: 1.05, yOffset: 5 },
  },
  {
    id: 'hallway',
    name: 'Grand Foyer Floor',
    type: 'floor',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    defaultPerspective: { pitch: 62, scale: 1.25, yOffset: 45 },
  },
];

export const ARSurfaceVisualizerModal: React.FC<ARSurfaceVisualizerModalProps> = ({
  product,
  isOpen,
  onClose,
  onOpenQuoteModal,
}) => {
  // Surface Target: 'floor' or 'wall'
  const [surfaceMode, setSurfaceMode] = useState<'floor' | 'wall'>('floor');
  
  // Camera state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [activePresetRoomIndex, setActivePresetRoomIndex] = useState(0);

  // AR Projection Controls
  const [tilePattern, setTilePattern] = useState<'single' | 'bookmatch' | 'grid'>('grid');
  const [scale, setScale] = useState(1.1);
  const [rotation, setRotation] = useState(0);
  const [pitchAngle, setPitchAngle] = useState(62); // 62° for floor perspective, 0° for flat wall
  const [opacity, setOpacity] = useState(0.92);
  const [blendMode, setBlendMode] = useState<'normal' | 'multiply' | 'overlay'>('normal');
  const [groutWidth, setGroutWidth] = useState<'none' | '1mm' | '2mm'>('1mm');
  const [groutColor, setGroutColor] = useState<'light' | 'sand' | 'dark'>('sand');
  const [showWireframe, setShowWireframe] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [snapshotTaken, setSnapshotTaken] = useState(false);
  const [isOnScreenControlsOpen, setIsOnScreenControlsOpen] = useState(true);
  const [activeOnScreenTab, setActiveOnScreenTab] = useState<'scale' | 'rotation' | 'angle'>('scale');

  // Position drag state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Start Camera Stream
  const startCamera = async () => {
    try {
      setCameraError(null);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API is not supported in this browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.warn('Camera access unavailable:', err.message || err);
      setIsCameraActive(false);
      setCameraError(
        'Live camera permission was not granted or is unavailable in preview mode. Using photorealistic architectural room simulator.'
      );
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Initialize or cleanup camera when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  // Handle Preset Room Switch
  const handleSelectPreset = (idx: number) => {
    stopCamera();
    setActivePresetRoomIndex(idx);
    const room = PRESET_ROOMS[idx];
    setSurfaceMode(room.type as 'floor' | 'wall');
    setPosition({ x: 0, y: 0 });
    setScale(room.defaultPerspective.scale);
    setPitchAngle(room.defaultPerspective.pitch);
  };

  // Surface mode switch helper (sets natural starting angle for floor vs wall)
  const handleSurfaceModeChange = (mode: 'floor' | 'wall') => {
    setSurfaceMode(mode);
    setPitchAngle(mode === 'floor' ? 62 : 0);
    if (mode === 'floor' && scale < 1.0) setScale(1.1);
  };

  // Toggle Camera Facing
  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Gesture refs for pinch-to-scale and twist-to-rotate
  const initialPinchDistRef = useRef<number | null>(null);
  const initialScaleRef = useRef<number>(1.1);
  const initialPinchAngleRef = useRef<number | null>(null);
  const initialRotationRef = useRef<number>(0);

  // Drag handlers for placing tile on floor/wall
  const handlePointerDown = (clientX: number, clientY: number) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: clientX - position.x,
      y: clientY - position.y,
    };
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    setPosition({
      x: clientX - dragStartRef.current.x,
      y: clientY - dragStartRef.current.y,
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Multi-touch pinch & twist handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
      const angle = Math.atan2(touch2.clientY - touch1.clientY, touch2.clientX - touch1.clientX) * (180 / Math.PI);
      initialPinchDistRef.current = dist;
      initialScaleRef.current = scale;
      initialPinchAngleRef.current = angle;
      initialRotationRef.current = rotation;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    } else if (e.touches.length === 2 && initialPinchDistRef.current && initialPinchAngleRef.current !== null) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDist = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
      const currentAngle = Math.atan2(touch2.clientY - touch1.clientY, touch2.clientX - touch1.clientX) * (180 / Math.PI);

      // Multi-touch Pinch Scale
      const scaleFactor = currentDist / initialPinchDistRef.current;
      const newScale = Math.max(0.4, Math.min(2.2, parseFloat((initialScaleRef.current * scaleFactor).toFixed(2))));
      setScale(newScale);

      // Multi-touch Twist Rotation
      const deltaAngle = currentAngle - initialPinchAngleRef.current;
      let newRot = Math.round(initialRotationRef.current + deltaAngle);
      if (newRot > 180) newRot -= 360;
      if (newRot < -180) newRot += 360;
      setRotation(newRot);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    initialPinchDistRef.current = null;
    initialPinchAngleRef.current = null;
  };

  // Mouse wheel zoom on desktop
  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY < 0 ? 0.05 : -0.05;
    setScale((prev) => Math.max(0.4, Math.min(2.2, parseFloat((prev + delta).toFixed(2)))));
  };

  // Precision helpers for on-screen controls
  const adjustScale = (delta: number) => {
    setScale((prev) => Math.max(0.4, Math.min(2.2, parseFloat((prev + delta).toFixed(2)))));
  };

  const adjustRotation = (delta: number) => {
    setRotation((prev) => {
      let next = prev + delta;
      if (next > 180) next -= 360;
      if (next < -180) next += 360;
      return next;
    });
  };

  const setExactRotation = (deg: number) => {
    setRotation(deg);
  };

  const adjustPitch = (delta: number) => {
    setPitchAngle((prev) => Math.max(0, Math.min(85, prev + delta)));
  };

  // Reset positioning and calibration
  const handleReset = () => {
    setPosition({ x: 0, y: 0 });
    setScale(surfaceMode === 'floor' ? 1.1 : 1.0);
    setRotation(0);
    setPitchAngle(surfaceMode === 'floor' ? 62 : 0);
    setOpacity(0.92);
  };

  // Capture AR Snapshot
  const handleCaptureSnapshot = () => {
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 2500);

    // If canvas available, create downloadable render
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 1280;
      canvas.height = 720;

      // Draw background
      ctx.fillStyle = '#161412';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (isCameraActive && videoRef.current) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      } else {
        const bgImg = new Image();
        bgImg.crossOrigin = 'anonymous';
        bgImg.src = PRESET_ROOMS[activePresetRoomIndex].image;
        bgImg.onload = () => {
          ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
          renderOverlay(ctx, canvas);
        };
        return;
      }

      renderOverlay(ctx, canvas);
    } catch (e) {
      console.error('Snapshot failed:', e);
    }
  };

  const renderOverlay = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Watermark & Product Meta Card on Snapshot
    ctx.fillStyle = 'rgba(18, 16, 14, 0.85)';
    ctx.fillRect(30, canvas.height - 110, 520, 80);
    ctx.strokeStyle = '#856a42';
    ctx.lineWidth = 1;
    ctx.strokeRect(30, canvas.height - 110, 520, 80);

    ctx.fillStyle = '#c5a880';
    ctx.font = 'bold 12px serif';
    ctx.fillText('SALEEM TRADERS • AR SURFACE VISUALIZATION', 50, canvas.height - 85);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px serif';
    ctx.fillText(product.name, 50, canvas.height - 60);

    ctx.fillStyle = '#a8a29e';
    ctx.font = '12px sans-serif';
    ctx.fillText(`${product.finish} • ${product.dimensions} • ${surfaceMode.toUpperCase()} (${Math.round(scale * 100)}% Scale, ${rotation}° Rotation, ${pitchAngle}° Tilt)`, 50, canvas.height - 40);

    // Trigger download
    const link = document.createElement('a');
    link.download = `SaleemTraders-AR-${product.name.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (!isOpen) return null;

  // Grout styling
  const getGroutClass = () => {
    if (groutWidth === 'none') return 'gap-0';
    if (groutWidth === '1mm') return 'gap-0.5';
    return 'gap-1';
  };

  const getGroutBg = () => {
    if (groutColor === 'light') return 'bg-stone-200';
    if (groutColor === 'sand') return 'bg-[#c2b29f]';
    return 'bg-stone-800';
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/90 backdrop-blur-md"
        />

        {/* AR Visualizer Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full sm:h-[92vh] max-w-6xl bg-stone-950 sm:rounded-2xl border border-stone-800 shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* 1. TOP AR HUD BAR */}
          <div className="bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 px-4 py-3 flex items-center justify-between gap-3 z-30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#856a42]/30 border border-[#c5a880] flex items-center justify-center text-[#c5a880] animate-pulse">
                <ScanLine className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-serif font-bold text-white uppercase tracking-wider">
                    AR Surface Visualizer
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#856a42]/30 text-[#c5a880] border border-[#856a42]/50 text-[9px] font-mono font-bold">
                    {surfaceMode === 'floor' ? 'Floor Plane' : 'Wall Elevation'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 font-light truncate max-w-xs sm:max-w-md">
                  {product.name} • {product.dimensions} • {product.finish} Finish
                </p>
              </div>
            </div>

            {/* Top Surface Mode & Camera Controls */}
            <div className="flex items-center gap-2">
              {/* Floor vs Wall Toggle */}
              <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg p-0.5 text-xs">
                <button
                  onClick={() => handleSurfaceModeChange('floor')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-semibold transition-all ${
                    surfaceMode === 'floor'
                      ? 'bg-[#856a42] text-white shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Floor</span>
                </button>
                <button
                  onClick={() => handleSurfaceModeChange('wall')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-semibold transition-all ${
                    surfaceMode === 'wall'
                      ? 'bg-[#856a42] text-white shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Wall</span>
                </button>
              </div>

              {/* Camera / Room Toggle Button */}
              <button
                onClick={() => {
                  if (isCameraActive) {
                    stopCamera();
                  } else {
                    startCamera();
                  }
                }}
                className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  isCameraActive
                    ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                    : 'bg-stone-900 border-stone-700 text-stone-300 hover:text-white'
                }`}
                title={isCameraActive ? 'Switch to Preset Room' : 'Start Camera'}
              >
                <Camera className="w-4 h-4" />
                <span className="hidden md:inline">{isCameraActive ? 'Camera Active' : 'Use Camera'}</span>
              </button>

              {isCameraActive && (
                <button
                  onClick={toggleFacingMode}
                  className="p-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-300 hover:text-white transition-colors"
                  title="Flip Front / Rear Camera"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}

              {/* Close Modal Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors ml-1"
                title="Close AR Visualizer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. AR VIEWPORT STAGE */}
          <div
            className="relative flex-1 w-full bg-black overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none"
            onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
            onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
            onMouseUp={handlePointerUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
          >
            {/* Background Feed: Video Camera or Preset Room Image */}
            {isCameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            ) : (
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <img
                  src={PRESET_ROOMS[activePresetRoomIndex].image}
                  alt={PRESET_ROOMS[activePresetRoomIndex].name}
                  className="w-full h-full object-cover brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-stone-950/40" />
              </div>
            )}

            {/* Hidden canvas for snapshot rendering */}
            <canvas ref={canvasRef} className="hidden" />

            {/* AR Plane Alignment Grid / Reticle */}
            {showWireframe && (
              <div className="absolute inset-0 pointer-events-none opacity-35 bg-[linear-gradient(to_right,#c5a880_1px,transparent_1px),linear-gradient(to_bottom,#c5a880_1px,transparent_1px)] bg-[size:40px_40px]" />
            )}

            {/* TILE OVERLAY LAYER */}
            {!isComparing && (
              <div
                className="relative transition-transform duration-75 pointer-events-none"
                style={{
                  transform: `translate3d(${position.x}px, ${position.y}px, 0px) rotate(${rotation}deg) scale(${scale})`,
                }}
              >
                {/* 3D Perspective Plane for Floor or Wall */}
                <div
                  className="relative transition-all duration-300"
                  style={{
                    perspective: '1000px',
                  }}
                >
                  <div
                    className={`relative rounded-lg shadow-2xl transition-all duration-300 overflow-hidden ${
                      blendMode === 'multiply'
                        ? 'mix-blend-multiply'
                        : blendMode === 'overlay'
                        ? 'mix-blend-overlay'
                        : ''
                    }`}
                    style={{
                      transform: `rotateX(${pitchAngle}deg) scaleY(${1 + (pitchAngle / 90) * 0.35}) translateZ(0)`,
                      opacity: opacity,
                      boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    {/* Pattern Renderer */}
                    {tilePattern === 'single' && (
                      <div className="w-72 sm:w-96 aspect-[4/3] rounded overflow-hidden border border-stone-400/40">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {tilePattern === 'bookmatch' && (
                      <div className={`grid grid-cols-2 ${getGroutClass()} ${getGroutBg()} p-1 rounded w-80 sm:w-[460px] aspect-[4/3]`}>
                        {/* 4 Bookmatched Tiles with Mirror Transforms */}
                        <div className="overflow-hidden bg-stone-900">
                          <img src={product.image} alt="Tile 1" className="w-full h-full object-cover" />
                        </div>
                        <div className="overflow-hidden bg-stone-900">
                          <img
                            src={product.image}
                            alt="Tile 2"
                            className="w-full h-full object-cover"
                            style={{ transform: 'scaleX(-1)' }}
                          />
                        </div>
                        <div className="overflow-hidden bg-stone-900">
                          <img
                            src={product.image}
                            alt="Tile 3"
                            className="w-full h-full object-cover"
                            style={{ transform: 'scaleY(-1)' }}
                          />
                        </div>
                        <div className="overflow-hidden bg-stone-900">
                          <img
                            src={product.image}
                            alt="Tile 4"
                            className="w-full h-full object-cover"
                            style={{ transform: 'scale(-1, -1)' }}
                          />
                        </div>
                      </div>
                    )}

                    {tilePattern === 'grid' && (
                      <div className={`grid grid-cols-3 ${getGroutClass()} ${getGroutBg()} p-1 rounded w-80 sm:w-[540px] aspect-[4/3]`}>
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="overflow-hidden bg-stone-900 aspect-[4/3]">
                            <img
                              src={product.image}
                              alt={`Tile ${i}`}
                              className="w-full h-full object-cover"
                              style={{
                                transform: i % 2 === 1 ? 'scaleX(-1)' : 'none',
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Specular Glint Sheen Simulation */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-60 mix-blend-overlay" />
                  </div>
                </div>
              </div>
            )}

            {/* Center Drag & Orientation Reticle */}
            <div className="absolute pointer-events-none flex flex-col items-center gap-1.5 opacity-60">
              <div className="w-12 h-12 rounded-full border border-dashed border-[#c5a880] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#c5a880]" />
              </div>
              <span className="text-[10px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                Drag to Move • Pinch/Slider to Scale
              </span>
            </div>

            {/* Compare Button (Hold to preview original room without tile) */}
            <div className="absolute top-4 left-4 z-20">
              <button
                onMouseDown={() => setIsComparing(true)}
                onMouseUp={() => setIsComparing(false)}
                onTouchStart={() => setIsComparing(true)}
                onTouchEnd={() => setIsComparing(false)}
                className={`px-3 py-1.5 rounded-full border text-xs font-semibold backdrop-blur-md transition-all ${
                  isComparing
                    ? 'bg-[#856a42] border-[#c5a880] text-white shadow-lg'
                    : 'bg-stone-950/75 border-stone-700 text-stone-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isComparing ? 'Showing Original Room' : 'Hold to Compare'}</span>
                </div>
              </button>
            </div>

            {/* Room Selector Pills (if camera is inactive) */}
            {!isCameraActive && (
              <div className="absolute top-4 right-4 z-20 flex flex-wrap gap-1.5 max-w-xs justify-end">
                {PRESET_ROOMS.map((room, idx) => (
                  <button
                    key={room.id}
                    onClick={() => handleSelectPreset(idx)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-medium border backdrop-blur-md transition-all ${
                      activePresetRoomIndex === idx
                        ? 'bg-[#856a42] border-[#c5a880] text-white shadow-xs'
                        : 'bg-stone-950/80 border-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    {room.name}
                  </button>
                ))}
              </div>
            )}

            {/* Camera Fallback Notice banner */}
            {cameraError && (
              <div className="absolute bottom-20 left-4 right-4 max-w-lg mx-auto bg-stone-900/90 border border-[#856a42] p-2.5 rounded-lg shadow-xl backdrop-blur-md text-xs text-stone-200 flex items-start gap-2 z-20">
                <AlertCircle className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-[11px] leading-relaxed text-stone-300">{cameraError}</p>
                </div>
                <button
                  onClick={() => setCameraError(null)}
                  className="text-stone-400 hover:text-white text-xs px-1"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Snapshot Confirmation Pill */}
            {snapshotTaken && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                <div className="bg-stone-950/95 border border-emerald-500 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-white animate-in zoom-in-95">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h4 className="text-xs font-bold font-serif">AR Snapshot Saved!</h4>
                    <p className="text-[11px] text-stone-300 font-light">
                      High-resolution visualizer photo downloaded to your device.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ON-SCREEN FLOATING CONTROLS DOCK (Precision Scale, Rotation & Angle Studio) */}
            <div
              className="absolute bottom-4 right-4 z-20 select-none pointer-events-auto"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              {isOnScreenControlsOpen ? (
                <div className="bg-stone-950/90 border border-stone-700/80 backdrop-blur-md rounded-xl p-3 shadow-2xl w-72 sm:w-80 text-white space-y-2.5 animate-in fade-in zoom-in-95 duration-150">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-1.5 border-b border-stone-800">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-200">
                      <Compass className="w-3.5 h-3.5 text-[#c5a880]" />
                      <span>On-Screen Calibration</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={handleReset}
                        className="text-[10px] text-stone-400 hover:text-white px-1.5 py-0.5 rounded bg-stone-850 hover:bg-stone-800 transition-colors"
                        title="Reset scale, rotation, and angle"
                      >
                        Reset
                      </button>
                      <button
                        onClick={() => setIsOnScreenControlsOpen(false)}
                        className="text-stone-400 hover:text-white p-1 rounded hover:bg-stone-800 transition-colors"
                        title="Minimize controls"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Section Selector Tabs */}
                  <div className="grid grid-cols-3 gap-1 bg-stone-900/90 p-0.5 rounded-lg text-[10px] font-medium text-stone-400">
                    <button
                      onClick={() => setActiveOnScreenTab('scale')}
                      className={`py-1 rounded transition-colors ${
                        activeOnScreenTab === 'scale'
                          ? 'bg-[#856a42] text-white font-semibold shadow-xs'
                          : 'hover:text-white'
                      }`}
                    >
                      Scale ({Math.round(scale * 100)}%)
                    </button>
                    <button
                      onClick={() => setActiveOnScreenTab('rotation')}
                      className={`py-1 rounded transition-colors ${
                        activeOnScreenTab === 'rotation'
                          ? 'bg-[#856a42] text-white font-semibold shadow-xs'
                          : 'hover:text-white'
                      }`}
                    >
                      Rot ({rotation}°)
                    </button>
                    <button
                      onClick={() => setActiveOnScreenTab('angle')}
                      className={`py-1 rounded transition-colors ${
                        activeOnScreenTab === 'angle'
                          ? 'bg-[#856a42] text-white font-semibold shadow-xs'
                          : 'hover:text-white'
                      }`}
                    >
                      Tilt ({pitchAngle}°)
                    </button>
                  </div>

                  {/* Tab 1: Scale */}
                  {activeOnScreenTab === 'scale' && (
                    <div className="space-y-2 pt-0.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-stone-400">Tile Scale</span>
                        <span className="font-mono font-bold text-[#c5a880] text-xs">
                          {Math.round(scale * 100)}%
                        </span>
                      </div>

                      {/* Steppers & Preset chips */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => adjustScale(-0.05)}
                          className="px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-xs font-bold flex items-center gap-1 transition-colors"
                          title="Scale down 5%"
                        >
                          <ZoomOut className="w-3 h-3 text-[#c5a880]" />
                          <span>-5%</span>
                        </button>
                        <div className="flex-1 flex items-center justify-center gap-1">
                          {[0.75, 1.0, 1.25, 1.5].map((preset) => (
                            <button
                              key={preset}
                              onClick={() => setScale(preset)}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                                Math.abs(scale - preset) < 0.03
                                  ? 'bg-[#856a42] text-white font-bold'
                                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                              }`}
                            >
                              {Math.round(preset * 100)}%
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => adjustScale(0.05)}
                          className="px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-xs font-bold flex items-center gap-1 transition-colors"
                          title="Scale up 5%"
                        >
                          <ZoomIn className="w-3 h-3 text-[#c5a880]" />
                          <span>+5%</span>
                        </button>
                      </div>

                      {/* Continuous Scale Slider */}
                      <input
                        type="range"
                        min="0.4"
                        max="2.2"
                        step="0.05"
                        value={scale}
                        onChange={(e) => setScale(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#c5a880]"
                      />
                      <div className="flex justify-between text-[9px] text-stone-500 font-mono">
                        <span>40% Compact</span>
                        <span>100% Native</span>
                        <span>220% Large</span>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Rotation */}
                  {activeOnScreenTab === 'rotation' && (
                    <div className="space-y-2 pt-0.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-stone-400">Texture Orientation</span>
                        <span className="font-mono font-bold text-[#c5a880] text-xs">{rotation}°</span>
                      </div>

                      {/* Snap Alignment Presets */}
                      <div className="grid grid-cols-4 gap-1 text-[10px]">
                        {[
                          { label: '0° Straight', deg: 0 },
                          { label: '45° Diamond', deg: 45 },
                          { label: '90° Cross', deg: 90 },
                          { label: '-45° Diag', deg: -45 },
                        ].map((item) => (
                          <button
                            key={item.deg}
                            onClick={() => setExactRotation(item.deg)}
                            className={`py-1 px-1 rounded text-center truncate transition-colors ${
                              rotation === item.deg
                                ? 'bg-[#856a42] text-white font-bold'
                                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-white'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>

                      {/* Nudge Stepper buttons */}
                      <div className="flex items-center justify-between gap-1.5 pt-0.5">
                        <button
                          onClick={() => adjustRotation(-15)}
                          className="flex-1 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-[10px] font-medium flex items-center justify-center gap-1 transition-colors"
                          title="Rotate -15°"
                        >
                          <RotateCcw className="w-2.5 h-2.5 text-[#c5a880]" />
                          <span>-15°</span>
                        </button>
                        <button
                          onClick={() => adjustRotation(-5)}
                          className="px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-[10px] font-medium transition-colors"
                          title="Nudge -5°"
                        >
                          -5°
                        </button>
                        <button
                          onClick={() => setExactRotation(0)}
                          className="px-2 py-1 bg-stone-900 border border-stone-700 text-stone-300 rounded text-[10px] font-mono hover:text-white transition-colors"
                          title="Center 0°"
                        >
                          0°
                        </button>
                        <button
                          onClick={() => adjustRotation(5)}
                          className="px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-[10px] font-medium transition-colors"
                          title="Nudge +5°"
                        >
                          +5°
                        </button>
                        <button
                          onClick={() => adjustRotation(15)}
                          className="flex-1 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-[10px] font-medium flex items-center justify-center gap-1 transition-colors"
                          title="Rotate +15°"
                        >
                          <span>+15°</span>
                          <RotateCw className="w-2.5 h-2.5 text-[#c5a880]" />
                        </button>
                      </div>

                      {/* Continuous Rotation Slider */}
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        step="5"
                        value={rotation}
                        onChange={(e) => setRotation(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#c5a880]"
                      />
                      <div className="flex justify-between text-[9px] text-stone-500 font-mono">
                        <span>-180°</span>
                        <span>0° Standard</span>
                        <span>+180°</span>
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Perspective Pitch Angle (for wall/floor angles) */}
                  {activeOnScreenTab === 'angle' && (
                    <div className="space-y-2 pt-0.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-stone-400">Surface Pitch Angle</span>
                        <span className="font-mono font-bold text-[#c5a880] text-xs">{pitchAngle}°</span>
                      </div>

                      {/* Surface Angle Presets */}
                      <div className="grid grid-cols-3 gap-1 text-[10px]">
                        {[
                          { label: '0° Wall', angle: 0 },
                          { label: '30° Slanted', angle: 30 },
                          { label: '45° Ramp', angle: 45 },
                          { label: '62° Floor', angle: 62 },
                          { label: '75° Corridor', angle: 75 },
                          { label: '82° Ground', angle: 82 },
                        ].map((item) => (
                          <button
                            key={item.angle}
                            onClick={() => setPitchAngle(item.angle)}
                            className={`py-1 px-1 rounded text-center truncate transition-colors ${
                              Math.abs(pitchAngle - item.angle) <= 2
                                ? 'bg-[#856a42] text-white font-bold'
                                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-white'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>

                      {/* Pitch Steppers & Slider */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => adjustPitch(-5)}
                          className="px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-[10px] font-medium"
                          title="Decrease tilt (-5°)"
                        >
                          -5°
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="85"
                          step="1"
                          value={pitchAngle}
                          onChange={(e) => setPitchAngle(parseInt(e.target.value))}
                          className="flex-1 h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#c5a880]"
                        />
                        <button
                          onClick={() => adjustPitch(5)}
                          className="px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded text-[10px] font-medium"
                          title="Increase tilt (+5°)"
                        >
                          +5°
                        </button>
                      </div>
                      <div className="flex justify-between text-[9px] text-stone-500 font-mono">
                        <span>0° (Vertical Wall)</span>
                        <span>45° (Ramp)</span>
                        <span>85° (Steep Floor)</span>
                      </div>
                    </div>
                  )}

                  {/* Micro Hint Footer */}
                  <div className="pt-1.5 border-t border-stone-800/80 flex items-center justify-between text-[9px] text-stone-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Move className="w-2.5 h-2.5 text-[#c5a880]" />
                      <span>Drag • Mouse wheel zoom</span>
                    </span>
                    <span className="text-stone-500">2-finger pinch/twist</span>
                  </div>
                </div>
              ) : (
                /* Minimized Collapsed Pill */
                <button
                  onClick={() => setIsOnScreenControlsOpen(true)}
                  className="bg-stone-950/85 hover:bg-stone-900 border border-stone-700/80 backdrop-blur-md px-3 py-2 rounded-xl text-xs font-semibold text-white shadow-xl flex items-center gap-2 transition-all hover:border-[#c5a880] group"
                  title="Open On-Screen Calibration Controls"
                >
                  <Compass className="w-4 h-4 text-[#c5a880] group-hover:rotate-45 transition-transform" />
                  <span>On-Screen Controls</span>
                  <span className="px-1.5 py-0.5 rounded bg-stone-800 text-[10px] font-mono text-[#c5a880]">
                    {Math.round(scale * 100)}% • {rotation}° • {pitchAngle}°
                  </span>
                  <ChevronUp className="w-3.5 h-3.5 text-stone-400" />
                </button>
              )}
            </div>

            {/* ON-SCREEN FLOATING QUICK ACTION PILL (Bottom-Left) */}
            <div
              className="absolute bottom-4 left-4 z-20 select-none pointer-events-auto hidden sm:flex items-center gap-1.5 bg-stone-950/85 backdrop-blur-md border border-stone-700/80 rounded-full px-2.5 py-1.5 shadow-xl"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => adjustScale(-0.05)}
                className="p-1 rounded-full text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                title="Scale Down (-5%)"
              >
                <ZoomOut className="w-3.5 h-3.5 text-stone-300" />
              </button>
              <span className="text-[10px] font-mono font-semibold text-[#c5a880] px-1">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => adjustScale(0.05)}
                className="p-1 rounded-full text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                title="Scale Up (+5%)"
              >
                <ZoomIn className="w-3.5 h-3.5 text-stone-300" />
              </button>

              <div className="h-3 w-[1px] bg-stone-700 mx-0.5" />

              <button
                onClick={() => adjustRotation(-15)}
                className="p-1 rounded-full text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                title="Rotate Left (-15°)"
              >
                <RotateCcw className="w-3.5 h-3.5 text-stone-300" />
              </button>
              <span className="text-[10px] font-mono font-semibold text-[#c5a880] px-1">
                {rotation}°
              </span>
              <button
                onClick={() => adjustRotation(15)}
                className="p-1 rounded-full text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                title="Rotate Right (+15°)"
              >
                <RotateCw className="w-3.5 h-3.5 text-stone-300" />
              </button>

              <div className="h-3 w-[1px] bg-stone-700 mx-0.5" />

              <span className="text-[9px] font-mono text-stone-400 pl-0.5">
                {pitchAngle}° Tilt
              </span>
            </div>
          </div>

          {/* 3. AR CONTROL TRAY (Bottom HUD) */}
          <div className="bg-[#141210] border-t border-stone-800 px-4 py-3 sm:py-4 space-y-3 z-30">
            {/* Quick Adjustments Row: Layout, Grout, Scale, Rotate & Tilt */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-xs">
              {/* Pattern Layout */}
              <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-2 flex flex-col justify-between">
                <span className="text-[10px] text-stone-400 uppercase font-mono">Tile Layout</span>
                <div className="grid grid-cols-3 gap-1 mt-1">
                  {(['single', 'bookmatch', 'grid'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setTilePattern(p)}
                      className={`py-1 rounded text-[10px] font-semibold capitalize transition-colors ${
                        tilePattern === p
                          ? 'bg-[#856a42] text-white'
                          : 'bg-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      {p === 'bookmatch' ? '2×2' : p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grout Line Width */}
              <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-2 flex flex-col justify-between">
                <span className="text-[10px] text-stone-400 uppercase font-mono">Grout Seam</span>
                <div className="grid grid-cols-3 gap-1 mt-1">
                  {(['none', '1mm', '2mm'] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGroutWidth(g)}
                      className={`py-1 rounded text-[10px] font-semibold transition-colors ${
                        groutWidth === g
                          ? 'bg-[#856a42] text-white'
                          : 'bg-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Surface Blend Mode */}
              <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-2 flex flex-col justify-between">
                <span className="text-[10px] text-stone-400 uppercase font-mono">Light Blend</span>
                <div className="grid grid-cols-3 gap-1 mt-1">
                  {(['normal', 'multiply', 'overlay'] as const).map((b) => (
                    <button
                      key={b}
                      onClick={() => setBlendMode(b)}
                      className={`py-1 rounded text-[10px] font-semibold capitalize transition-colors ${
                        blendMode === b
                          ? 'bg-[#856a42] text-white'
                          : 'bg-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      {b === 'multiply' ? 'Shadow' : b === 'overlay' ? 'Ambient' : 'Vivid'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scale Slider */}
              <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-2 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
                  <span>SCALE</span>
                  <span className="text-[#c5a880]">{Math.round(scale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="2.2"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full h-1 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#c5a880] mt-2"
                />
              </div>

              {/* Rotation Slider */}
              <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-2 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
                  <span>ROTATION</span>
                  <span className="text-[#c5a880]">{rotation}°</span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="5"
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="w-full h-1 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#c5a880] mt-2"
                />
              </div>

              {/* Angle / Tilt Slider */}
              <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-2 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
                  <span>PITCH TILT</span>
                  <span className="text-[#c5a880]">{pitchAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="85"
                  step="1"
                  value={pitchAngle}
                  onChange={(e) => setPitchAngle(parseInt(e.target.value))}
                  className="w-full h-1 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#c5a880] mt-2"
                />
              </div>

              {/* Opacity Slider */}
              <div className="bg-stone-900/90 border border-stone-800 rounded-lg p-2 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
                  <span>OPACITY</span>
                  <span className="text-[#c5a880]">{Math.round(opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="1.0"
                  step="0.05"
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="w-full h-1 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#c5a880] mt-2"
                />
              </div>
            </div>

            {/* Action Bar: Reset, Snapshot, Add to Quote */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-800/80">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors"
                  title="Reset Position and Scaling"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Calibration</span>
                </button>

                <button
                  onClick={() => setShowWireframe(!showWireframe)}
                  className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
                    showWireframe
                      ? 'bg-[#856a42]/30 border-[#c5a880] text-[#c5a880]'
                      : 'bg-stone-900 border-stone-700 text-stone-400 hover:text-white'
                  }`}
                  title="Toggle Perspective Wireframe Guide"
                >
                  <ScanLine className="w-3.5 h-3.5" />
                  <span>Grid Guide</span>
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleCaptureSnapshot}
                  className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save AR Photo</span>
                </button>

                {onOpenQuoteModal && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenQuoteModal(product.name);
                    }}
                    className="px-4 py-2 rounded-lg bg-[#856a42] hover:bg-[#735a34] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Quote This Specification</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
