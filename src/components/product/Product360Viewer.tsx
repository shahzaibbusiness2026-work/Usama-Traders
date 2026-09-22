import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  RotateCcw,
  Play,
  Pause,
  Sun,
  Lightbulb,
  Sparkles,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Info,
  ShieldCheck,
  CheckCircle2,
  Layers,
  ChevronRight,
  Eye,
  Star,
} from 'lucide-react';
import { Product } from '../../types';

interface Product360ViewerProps {
  product: Product;
  className?: string;
  onCloseFullscreen?: () => void;
  onRequestQuote?: () => void;
  showReviewDrawer?: boolean;
}

export const Product360Viewer: React.FC<Product360ViewerProps> = ({
  product,
  className = '',
  onRequestQuote,
  showReviewDrawer = true,
}) => {
  // 360 rotation angle (0 to 360 degrees)
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startAngle, setStartAngle] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [lightingMode, setLightingMode] = useState<'gallery' | 'daylight' | 'warm'>('gallery');
  const [finishType, setFinishType] = useState<'polished' | 'honed'>('polished');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotation loop
  useEffect(() => {
    if (!isAutoRotating || isDragging) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.6) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isAutoRotating, isDragging]);

  // Drag handlers for mouse and touch
  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    setStartX(clientX);
    setStartAngle(rotationAngle);
  };

  const handlePointerMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;
      const deltaX = clientX - startX;
      // 1px drag = ~0.65 degrees rotation
      const newAngle = (startAngle - deltaX * 0.65) % 360;
      setRotationAngle(newAngle < 0 ? 360 + newAngle : newAngle);
    },
    [isDragging, startAngle, startX]
  );

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => handlePointerMove(e.clientX);
    const onUp = () => handlePointerUp();
    if (isDragging) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isDragging, handlePointerMove]);

  // Current view phase description based on angle
  const getViewPhase = (angle: number) => {
    const norm = Math.round(angle) % 360;
    if (norm >= 335 || norm < 25) {
      return { title: 'Face Inspection (0°)', desc: 'Full surface bookmatched veining & specular polish' };
    } else if (norm >= 25 && norm < 70) {
      return { title: 'Isometric Angle (45°)', desc: 'Vein depth under directional raking light' };
    } else if (norm >= 70 && norm < 115) {
      return { title: 'Edge Profile (90°)', desc: '18/20mm Calibrated slab edge & bevel finish' };
    } else if (norm >= 115 && norm < 160) {
      return { title: 'Rear Quarter (135°)', desc: 'Edge transitions and structural substrate' };
    } else if (norm >= 160 && norm < 205) {
      return { title: 'Back Substrate (180°)', desc: 'Reinforced fiberglass mesh & quarry stamp' };
    } else if (norm >= 205 && norm < 250) {
      return { title: 'Mitre Inspection (225°)', desc: 'Edge squareness & seamless joint capability' };
    } else if (norm >= 250 && norm < 295) {
      return { title: 'Opposite Edge (270°)', desc: 'Dual-edge calibration & bullnose suitability' };
    } else {
      return { title: 'Returning to Face (315°)', desc: 'Light reflection bounce & gloss verification' };
    }
  };

  const currentPhase = getViewPhase(rotationAngle);

  // Hotspots positioned along the 360 review
  const hotspots = [
    {
      id: 1,
      angle: 15,
      x: '38%',
      y: '35%',
      title: 'Golden Metamorphic Veining',
      desc: 'Distinctive caramel and gold veining interwoven with soft grey ribbons. 100% natural calcite composition.',
      badge: 'Natural Artistry',
    },
    {
      id: 2,
      angle: 90,
      x: '50%',
      y: '48%',
      title: 'Calibrated Thickness Profile',
      desc: 'Precision diamond-calibrated to ±0.5mm tolerance. Ideal for mitred waterfall edges and bullnose detailing.',
      badge: 'Structural Precision',
    },
    {
      id: 3,
      angle: 180,
      x: '62%',
      y: '55%',
      title: 'Anti-Fracture Mesh Backing',
      desc: 'High-tensile epoxy fiberglass backing mesh prevents shipping fractures and simplifies cantilever installations.',
      badge: 'Reinforced Substrate',
    },
    {
      id: 4,
      angle: 300,
      x: '28%',
      y: '65%',
      title: 'High-Gloss Optical Polish',
      desc: 'Multi-stage Italian resin polishing achieves >92 GU specular sheen with zero orange-peel haze.',
      badge: 'Optical Sheen',
    },
  ];

  // Dynamic specular lighting position calculation based on angle
  const lightPositionX = 50 + Math.sin((rotationAngle * Math.PI) / 180) * 45;
  const lightPositionY = 40 + Math.cos((rotationAngle * Math.PI) / 180) * 30;

  // Jump to specific angle
  const jumpToAngle = (target: number) => {
    setIsAutoRotating(false);
    setRotationAngle(target % 360);
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-[#161412] text-white rounded-xl overflow-hidden border border-stone-800 shadow-2xl flex flex-col select-none ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-2xl' : className
      }`}
    >
      {/* 1. TOP 360 VIEWER TOOLBAR */}
      <div className="bg-stone-950/80 backdrop-blur-md border-b border-stone-800/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3 z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#856a42]/20 border border-[#856a42] flex items-center justify-center text-[#c5a880] animate-pulse">
            <RotateCcw className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-serif tracking-wider text-white uppercase">
                360° Interactive Product Review
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-bold uppercase tracking-wider">
                Certified 3D Model
              </span>
            </div>
            <p className="text-[11px] text-stone-400 font-light truncate max-w-xs sm:max-w-md">
              {product.name} • {product.finish} Finish • {product.dimensions}
            </p>
          </div>
        </div>

        {/* Right Tools: Lighting & Fullscreen */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Lighting Mode Selector */}
          <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setLightingMode('gallery')}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] transition-colors ${
                lightingMode === 'gallery'
                  ? 'bg-[#856a42] text-white font-medium shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
              title="Gallery Luxury Light (3200K Specular Glint)"
            >
              <Lightbulb className="w-3 h-3" />
              <span className="hidden sm:inline">Gallery</span>
            </button>
            <button
              onClick={() => setLightingMode('daylight')}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] transition-colors ${
                lightingMode === 'daylight'
                  ? 'bg-[#856a42] text-white font-medium shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
              title="True Daylight (5500K Color Neutral)"
            >
              <Sun className="w-3 h-3" />
              <span className="hidden sm:inline">Daylight</span>
            </button>
            <button
              onClick={() => setLightingMode('warm')}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] transition-colors ${
                lightingMode === 'warm'
                  ? 'bg-[#856a42] text-white font-medium shadow-xs'
                  : 'text-stone-400 hover:text-white'
              }`}
              title="Warm Interior (2700K Architectural Glow)"
            >
              <Sparkles className="w-3 h-3" />
              <span className="hidden sm:inline">Warm</span>
            </button>
          </div>

          {/* Fullscreen toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. 3D INTERACTIVE STAGE */}
      <div
        className="relative flex-1 min-h-[380px] sm:min-h-[440px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => handlePointerDown(e.clientX)}
        onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
        onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
        onTouchEnd={handlePointerUp}
      >
        {/* Environmental Lighting Backdrop */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
            lightingMode === 'gallery'
              ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-800/40 via-stone-950/80 to-[#100e0c]'
              : lightingMode === 'daylight'
              ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-950/20 via-stone-950/90 to-[#0e1013]'
              : 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/25 via-stone-950/90 to-[#120f0d]'
          }`}
        />

        {/* Dynamic Specular Sheen Layer that sweeps across as product turns */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 transition-transform duration-75 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${lightPositionX}% ${lightPositionY}%, rgba(255,255,255,0.7) 0%, rgba(255,220,180,0.15) 30%, transparent 60%)`,
          }}
        />

        {/* 3D ROTATABLE PRODUCT OBJECT */}
        <div
          className="relative transition-transform duration-75 ease-out"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
          }}
        >
          {/* Slab / Product Container with 3D Depth & Shadow */}
          <div
            className="relative w-72 sm:w-96 lg:w-[420px] aspect-[4/3] rounded-lg shadow-2xl transition-all duration-75"
            style={{
              transform: `perspective(1000px) rotateY(${rotationAngle}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front Surface Face */}
            <div className="absolute inset-0 rounded-lg overflow-hidden border border-stone-700/60 shadow-2xl bg-stone-900 backface-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />

              {/* Dynamic Gloss / Satin Reflection Map */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-150 ${
                  finishType === 'polished'
                    ? 'mix-blend-overlay opacity-60 bg-gradient-to-tr from-transparent via-white/40 to-transparent'
                    : 'mix-blend-soft-light opacity-30 bg-white/20'
                }`}
                style={{
                  transform: `translateX(${(rotationAngle % 180) - 90}%)`,
                }}
              />

              {/* 360 Watermark Stamp */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-stone-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Original Slab Match: ST-SLAB-{(product.id || '99').toUpperCase()}</span>
              </div>
            </div>

            {/* Back Surface (Mesh & Quarry Stamp at 180deg) */}
            <div
              className="absolute inset-0 rounded-lg overflow-hidden border border-stone-700/60 shadow-2xl bg-stone-950 p-6 flex flex-col justify-between"
              style={{
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                backgroundImage:
                  'radial-gradient(#3a332c 1.5px, transparent 1.5px), linear-gradient(135deg, #1c1916 0%, #0d0b0a 100%)',
                backgroundSize: '12px 12px, 100% 100%',
              }}
            >
              <div className="flex justify-between items-start">
                <div className="p-2 bg-stone-900/90 border border-stone-700 rounded text-left">
                  <div className="text-[9px] font-mono uppercase text-[#c5a880]">QUARRY SPECIFICATION</div>
                  <div className="text-xs font-serif font-bold text-white mt-0.5">CARRARA - ITALY</div>
                  <div className="text-[10px] text-stone-400 mt-0.5">Block #482 • Sieve A1 Grade</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-stone-800 border border-stone-600 text-[10px] font-mono text-stone-300">
                  REAR MESH SUBSTRATE
                </span>
              </div>

              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto rounded-full border border-stone-700 bg-stone-900/80 flex items-center justify-center text-[#c5a880] font-serif text-2xl font-bold">
                  ST
                </div>
                <div className="font-serif text-sm tracking-wider font-semibold text-stone-200 mt-2">
                  SALEEM TRADERS
                </div>
                <div className="text-[10px] text-stone-500 font-mono tracking-widest mt-0.5">
                  VERIFIED GENUINE NATURAL STONE
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] text-stone-400 border-t border-stone-800 pt-3">
                <span>Thickness: 18mm ±0.5mm</span>
                <span>Fiberglass Reinforced</span>
                <span>Batch: PK-2024-V360</span>
              </div>
            </div>

            {/* Edge Slab Thickness Simulation (Lateral extrusion visible at 90 and 270 deg) */}
            <div
              className="absolute top-0 bottom-0 right-0 w-5 bg-gradient-to-r from-stone-800 via-stone-700 to-stone-900 border-y border-r border-stone-600 shadow-lg"
              style={{
                transform: 'rotateY(90deg) translateZ(10px)',
                display:
                  (rotationAngle >= 45 && rotationAngle <= 135) ||
                  (rotationAngle >= 225 && rotationAngle <= 315)
                    ? 'block'
                    : 'none',
              }}
            >
              <div className="h-full flex items-center justify-center">
                <span className="text-[8px] font-mono text-stone-300 rotate-90 whitespace-nowrap">
                  18mm CALIBRATED EDGE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE HOTSPOTS OVERLAY */}
        {hotspots.map((spot) => {
          // Show hotspot only when the current angle is near its view angle (+- 45 deg)
          const diff = Math.abs((rotationAngle % 360) - spot.angle);
          const isVisible = diff <= 45 || diff >= 315;
          if (!isVisible) return null;

          const isActive = activeHotspot === spot.id;

          return (
            <div
              key={spot.id}
              className="absolute z-30 transition-all duration-300 pointer-events-auto"
              style={{ left: spot.x, top: spot.y }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(isActive ? null : spot.id);
                  jumpToAngle(spot.angle);
                }}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-[#c5a880] text-stone-950 scale-125 ring-4 ring-[#c5a880]/40'
                    : 'bg-stone-950/85 text-[#c5a880] border border-[#c5a880] hover:scale-110 hover:bg-[#856a42] hover:text-white'
                }`}
                title={spot.title}
              >
                <Info className="w-3.5 h-3.5" />
              </button>

              {/* Hotspot detail card popover */}
              {isActive && (
                <div
                  className="absolute left-8 top-1/2 -translate-y-1/2 w-64 p-3 bg-stone-900/95 backdrop-blur-md rounded-lg border border-[#856a42] shadow-2xl text-left z-40 animate-in fade-in zoom-in-95"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#c5a880]">
                      {spot.badge}
                    </span>
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="text-stone-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <h4 className="font-serif text-xs font-bold text-white mt-1">{spot.title}</h4>
                  <p className="text-[11px] text-stone-300 font-light mt-1 leading-relaxed">
                    {spot.desc}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Center Drag Guidance Overlay (Fades out when interacting) */}
        {!isDragging && (
          <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-950/70 border border-stone-800 text-stone-300 text-xs backdrop-blur-md">
            <RotateCcw className="w-3 h-3 text-[#c5a880] animate-spin" />
            <span>Click & Drag or Swipe to Rotate 360°</span>
          </div>
        )}

        {/* Current Angle Dial Badge */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2.5 bg-stone-950/80 border border-stone-800 px-3.5 py-1.5 rounded-full backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-[#c5a880] animate-ping" />
          <div className="text-xs font-mono font-bold text-[#c5a880]">
            {Math.round(rotationAngle)}°
          </div>
          <span className="text-stone-400 text-xs hidden sm:inline">|</span>
          <span className="text-[11px] text-stone-300 font-medium hidden sm:inline">
            {currentPhase.title}
          </span>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-stone-950/80 border border-stone-800 p-1 rounded-full backdrop-blur-md">
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono text-stone-300 px-1">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(2.2, z + 0.2))}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. 360 SCRUBBER BAR & VIEWPOINT QUICK JUMPS */}
      <div className="bg-stone-950 border-t border-stone-800 px-4 py-3 space-y-3 z-20">
        {/* Scrubber slider */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`p-2 rounded-full border transition-all ${
              isAutoRotating
                ? 'bg-[#856a42] border-[#c5a880] text-white shadow-xs'
                : 'bg-stone-900 border-stone-700 text-stone-300 hover:text-white'
            }`}
            title={isAutoRotating ? 'Pause Auto-Spin' : 'Start Auto-Spin'}
          >
            {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Scrub input */}
          <div className="flex-1 relative flex items-center">
            <input
              type="range"
              min="0"
              max="359"
              value={Math.round(rotationAngle)}
              onChange={(e) => {
                setIsAutoRotating(false);
                setRotationAngle(Number(e.target.value));
              }}
              className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#c5a880]"
            />
          </div>

          <button
            onClick={() => jumpToAngle(0)}
            className="px-2.5 py-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-700 text-[11px] text-stone-300 transition-colors"
            title="Reset to 0° Front View"
          >
            Reset
          </button>
        </div>

        {/* 4 Quick Perspective Jumps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {[
            { label: 'Front Face (0°)', angle: 0, icon: Eye },
            { label: 'Edge & Bullnose (90°)', angle: 90, icon: Layers },
            { label: 'Mesh Backing (180°)', angle: 180, icon: ShieldCheck },
            { label: 'Mitre Cut (270°)', angle: 270, icon: Sparkles },
          ].map((view) => {
            const isNear = Math.abs((rotationAngle % 360) - view.angle) < 25;
            const Icon = view.icon;
            return (
              <button
                key={view.angle}
                onClick={() => jumpToAngle(view.angle)}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md border text-[11px] font-medium transition-all ${
                  isNear
                    ? 'bg-[#856a42]/30 border-[#c5a880] text-[#c5a880]'
                    : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="truncate">{view.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. EXPERT 360° PRODUCT REVIEW & QUALITY SCORES (If enabled) */}
      {showReviewDrawer && (
        <div className="bg-[#12100e] border-t border-stone-800/90 p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-serif uppercase tracking-wider text-[#c5a880]">
                  360° Architectural Quality Verdict
                </span>
                <span className="text-[10px] text-stone-500 font-mono">LAB TESTED #ST-2024</span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5 font-light">
                Verified by Saleem Traders Chief Stone Specialist & Materials Engineering Lab
              </p>
            </div>

            {/* Score pill */}
            <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-lg shrink-0">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-white font-serif">4.9 / 5.0</span>
            </div>
          </div>

          {/* 4 Architectural Inspection Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                label: 'Vein Symmetry & Bookmatch',
                score: '99%',
                grade: 'Exceptional',
                detail: 'Mirror-aligned continuous ribbons',
              },
              {
                label: 'Specular Surface Polish',
                score: '98%',
                grade: 'High Gloss',
                detail: '>92 GU mirror reflectivity',
              },
              {
                label: 'Compressive & Flexural Load',
                score: '96%',
                grade: 'Heavy Duty',
                detail: '142 MPa compressive strength',
              },
              {
                label: 'Edge Milling & Mitre Accuracy',
                score: '97%',
                grade: 'Precision Calibrated',
                detail: 'Zero edge chipping under waterjet',
              },
            ].map((metric) => (
              <div
                key={metric.label}
                className="bg-stone-900/70 border border-stone-800/80 rounded-lg p-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#c5a880] font-bold">{metric.score}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">
                      {metric.grade}
                    </span>
                  </div>
                  <h5 className="text-[11px] font-semibold text-stone-200 mt-1">{metric.label}</h5>
                  <p className="text-[10px] text-stone-500 mt-0.5 font-light">{metric.detail}</p>
                </div>
                {/* Progress bar */}
                <div className="w-full h-1 bg-stone-800 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#856a42] to-[#c5a880] rounded-full"
                    style={{ width: metric.score }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Specialist Summary & CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-stone-800/70 text-xs">
            <p className="text-stone-400 font-light text-[11px] leading-relaxed max-w-xl">
              <strong className="text-stone-200">Specialist Recommendation:</strong> Ideal for luxury kitchen islands, primary bath bookmatched wall features, and high-traffic hotel lobbies. Pairs seamlessly with brushed brass or matte black tapware.
            </p>

            {onRequestQuote && (
              <button
                onClick={onRequestQuote}
                className="px-4 py-2 bg-[#856a42] hover:bg-[#735a34] text-white text-xs font-semibold rounded-md shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>Request Project Quotation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
