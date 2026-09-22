import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ChevronRight,
  Star,
  Plus,
  Minus,
  MessageCircle,
  FileText,
  ShieldCheck,
  Truck,
  Users,
  Maximize2,
  Heart,
  Play,
  ArrowRight,
  Gem,
  Sparkles,
  Layers,
  Home as HomeIcon,
  Shield,
  TrendingUp,
  Check,
  ChevronDown,
  ChevronUp,
  Calculator,
  Camera,
  ScanLine,
} from 'lucide-react';
import { CATALOG_PRODUCTS, RELATED_SLABS } from '../../data/mockData';
import { ActiveView, Product } from '../../types';
import { SlabPriceEstimator } from './SlabPriceEstimator';
import { Product360Viewer } from './Product360Viewer';
import { Product360Badge } from '../common/Product360Badge';
import { ARSurfaceVisualizerModal } from './ARSurfaceVisualizerModal';
import { RotateCcw } from 'lucide-react';
import { ArchitecturalProductCard } from '../common/ArchitecturalProductCard';

interface ProductDetailPageProps {
  product?: Product;
  setActiveView: (view: ActiveView) => void;
  onAddToCart: (product: Product, quantity?: number, thickness?: string) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  onOpenQuoteModal: () => void;
  onOpenSampleModal: (productName?: string) => void;
  onOpen360Modal?: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product = CATALOG_PRODUCTS[1], // Default to Verona Calacotta Gold
  setActiveView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onOpenQuoteModal,
  onOpenSampleModal,
  onOpen360Modal,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [is360Active, setIs360Active] = useState(false);
  const [isARVisualizerOpen, setIsARVisualizerOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedThickness, setSelectedThickness] = useState('18 mm');
  const [activeAccordion, setActiveAccordion] = useState<string | null>('details');
  const [showZoomModal, setShowZoomModal] = useState(false);

  const isWishlisted = wishlistIds.includes(product.id);

  const galleryImages = product.gallery || [
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
  ];

  const toggleAccordion = (name: string) => {
    setActiveAccordion((prev) => (prev === name ? null : name));
  };

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent(
      `Hello Saleem Traders, I am interested in inquiring about ${product.name} (${selectedThickness} thickness, ${quantity} slab(s)). Could you please provide project pricing and availability?`
    );
    window.open(`https://wa.me/923111333786?text=${text}`, '_blank');
  };

  return (
    <div className="w-full bg-[#faf9f6]">
      {/* 1. BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3">
        <nav className="flex items-center text-xs text-stone-500 space-x-2">
          <button onClick={() => setActiveView('home')} className="hover:text-stone-900 transition-colors">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <button onClick={() => setActiveView('catalog')} className="hover:text-stone-900 transition-colors">
            Slabs
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <button onClick={() => setActiveView('catalog')} className="hover:text-stone-900 transition-colors">
            Marble
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-800 font-medium">{product.name}</span>
        </nav>
      </div>

      {/* 2. MAIN PRODUCT OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: MULTI-IMAGE GALLERY WITH 360° INTERACTIVE REVIEW */}
          <div className="lg:col-span-7 space-y-4">
            {/* View Mode Toggle: High-Res Photos vs 360° Studio Review vs AR Floor/Wall */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex p-1 bg-stone-200/80 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setIs360Active(false)}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    !is360Active
                      ? 'bg-white text-stone-950 shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  High-Res Photos ({galleryImages.length})
                </button>
                <button
                  onClick={() => setIs360Active(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                    is360Active
                      ? 'bg-[#886d4b] text-white shadow-xs font-medium'
                      : 'text-stone-700 hover:text-stone-950'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>360° Interactive Review</span>
                </button>
                <button
                  onClick={() => setIsARVisualizerOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-stone-700 hover:text-stone-950 transition-all font-medium hover:bg-white/60"
                  title="Visualize this slab on your floor or wall with live camera"
                >
                  <Camera className="w-3.5 h-3.5 text-[#886d4b]" />
                  <span>AR View</span>
                  <span className="px-1.5 py-0.2 bg-[#886d4b] text-white text-[9px] rounded font-mono uppercase">
                    3D
                  </span>
                </button>
              </div>

              {is360Active && (
                <button
                  onClick={() => setIs360Active(false)}
                  className="text-xs text-[#886d4b] hover:underline font-medium flex items-center gap-1"
                >
                  &larr; Back to Photo Gallery
                </button>
              )}
            </div>

            {/* Main Stage: Either 360 Viewer or Photo Stage */}
            {is360Active ? (
              <Product360Viewer
                product={product}
                onRequestQuote={onOpenQuoteModal}
                showReviewDrawer={false}
                className="w-full aspect-[4/3]"
              />
            ) : (
              <div className="relative rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 aspect-[4/3] group shadow-sm">
                <img
                  src={galleryImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded bg-[#d5c1a4] text-stone-950 font-medium text-[10px] tracking-widest uppercase shadow-xs">
                    {product.badge || 'Premium Collection'}
                  </span>
                </div>

                {/* 360 Review Floating Trigger On Image */}
                <Product360Badge
                  product={product}
                  onOpen360={() => setIs360Active(true)}
                  variant="floating"
                />

                {/* Action Buttons Top Right */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <button
                    onClick={() => setIsARVisualizerOpen(true)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#886d4b] backdrop-blur-xs text-white hover:bg-[#73593b] border border-[#d5c1a4]/50 shadow-md text-[11px] font-medium transition-all hover:scale-105"
                    title="Launch AR Floor & Wall Visualizer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>AR View</span>
                  </button>
                  <button
                    onClick={() => setIs360Active(true)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-stone-900/85 backdrop-blur-xs text-[#d5c1a4] hover:text-white hover:bg-stone-900 border border-stone-700 shadow-sm text-[11px] font-medium transition-colors"
                    title="Switch to 360° Interactive View"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>360°</span>
                  </button>
                  <button
                    onClick={() => setShowZoomModal(true)}
                    className="p-2 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:text-stone-950 hover:bg-white shadow-sm transition-colors"
                    title="Expand High-Res Zoom"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className="p-2 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:text-stone-950 hover:bg-white shadow-sm transition-colors"
                    title="Save to Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                    />
                  </button>
                </div>

                {/* Carousel Next / Prev Controls on Bottom Right */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-mono">
                  <button
                    onClick={() =>
                      setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))
                    }
                    className="hover:text-[#d5c1a4] transition-colors"
                  >
                    &larr;
                  </button>
                  <span>
                    {String(selectedImageIndex + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
                  </span>
                  <button
                    onClick={() =>
                      setSelectedImageIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))
                    }
                    className="hover:text-[#d5c1a4] transition-colors"
                  >
                    &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Thumbnail Strip (5 images + 1 dedicated 360 Review tile + 1 AR View tile) */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {galleryImages.map((img, idx) => {
                const isVideo = idx === 4;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setIs360Active(false);
                      setSelectedImageIndex(idx);
                    }}
                    className={`relative rounded-lg overflow-hidden aspect-[4/3] border-2 transition-all ${
                      !is360Active && selectedImageIndex === idx
                        ? 'border-[#886d4b] ring-2 ring-[#886d4b]/30'
                        : 'border-stone-200 hover:border-stone-400 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    {isVideo && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                        <div className="w-6 h-6 rounded-full bg-white/30 backdrop-blur-xs flex items-center justify-center">
                          <Play className="w-3 h-3 fill-white text-white ml-0.5" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}

              {/* Dedicated 360° Interactive Review Thumbnail Tile */}
              <button
                onClick={() => setIs360Active(true)}
                className={`relative rounded-lg overflow-hidden aspect-[4/3] border-2 transition-all flex flex-col items-center justify-center bg-stone-900 text-stone-300 p-1.5 ${
                  is360Active
                    ? 'border-[#d5c1a4] ring-2 ring-[#d5c1a4]/40 text-[#d5c1a4]'
                    : 'border-stone-700 hover:border-[#d5c1a4] hover:text-white'
                }`}
                title="Launch 360° Studio Review"
              >
                <RotateCcw className="w-4 h-4 animate-spin mb-1 text-[#d5c1a4]" />
                <span className="text-[9px] font-mono font-medium leading-tight uppercase">360° Review</span>
              </button>

              {/* Dedicated AR View Camera Thumbnail Tile */}
              <button
                onClick={() => setIsARVisualizerOpen(true)}
                className="relative rounded-lg overflow-hidden aspect-[4/3] border-2 border-stone-700 hover:border-[#d5c1a4] transition-all flex flex-col items-center justify-center bg-gradient-to-br from-stone-900 to-[#221c15] text-[#d5c1a4] hover:text-white p-1.5 shadow-xs"
                title="Launch AR Camera View on Floor & Wall"
              >
                <Camera className="w-4 h-4 mb-1 text-[#d5c1a4]" />
                <span className="text-[9px] font-mono font-medium leading-tight uppercase">AR View</span>
              </button>
            </div>
          </div>

          {/* RIGHT: SPECIFICATIONS & QUOTE ACTIONS */}
          <div className="lg:col-span-5 space-y-5">
            {/* Category tag */}
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded bg-[#886d4b]/10 text-[#886d4b] text-[10px] font-medium tracking-[0.2em] uppercase border border-[#886d4b]/30">
                Marble Collection
              </span>
            </div>

            {/* Product Title */}
            <h1 className="font-editorial text-3xl sm:text-4xl text-stone-900 font-normal tracking-[-0.015em] leading-tight">
              {product.name}
            </h1>

            {/* Reviews */}
            <div className="flex items-center space-x-2 text-xs text-stone-600">
              <div className="flex items-center text-[#886d4b]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#886d4b] text-[#886d4b]" />
                ))}
              </div>
              <span className="font-medium text-stone-900">4.8</span>
              <span className="text-stone-400 font-light">(36 verified projects)</span>
              <span className="text-stone-300">|</span>
              <button
                onClick={() => alert('Review submitted for moderation.')}
                className="hover:text-[#886d4b] transition-colors"
              >
                Inquire Specifications
              </button>
            </div>

            {/* Narrative description */}
            <p className="text-xs text-stone-600 leading-relaxed font-light">
              {product.description ||
                'A luxurious Italian marble renowned for its elegant golden veining on a crisp white background. Verona Calacotta Gold brings timeless beauty and sophistication to any space.'}
            </p>

            {/* Price block */}
            <div className="pt-2 pb-1 border-y border-stone-200">
              <div className="flex items-baseline space-x-3">
                <span className="font-editorial text-3xl font-normal text-stone-900 tracking-[-0.01em]">
                  {product.currency} {product.price.toLocaleString()}
                </span>
                <span className="text-xs text-stone-500 font-light">/ per sq. ft.</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-medium tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  QUARRY IMPORT READY
                </span>
              </div>
              <p className="text-[10px] text-stone-400 mt-1 font-light">
                Price finalized based on batch calibration, thickness, and vein consistency.
              </p>
              <div className="pt-2">
                <a
                  href="#slab-price-estimator"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#fbf8f3] text-[#886d4b] border border-[#886d4b]/30 text-[11px] font-medium hover:bg-[#886d4b] hover:text-white transition-colors"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Estimate Project Cost by Slab Dimensions &darr;</span>
                </a>
              </div>
            </div>

            {/* Specifications Matrix Table */}
            <div className="text-xs border border-stone-200 rounded-lg overflow-hidden bg-white shadow-2xs divide-y divide-stone-100">
              <div className="grid grid-cols-3 p-2.5">
                <span className="text-stone-500 font-light">Finish</span>
                <span className="col-span-2 font-medium text-stone-800">Polished (High Gloss)</span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="text-stone-500 font-light">Available Sizes</span>
                <span className="col-span-2 font-medium text-stone-800">Custom Slab (Avg. 9–11 ft x 5–6 ft)</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 items-center">
                <span className="text-stone-500 font-light">Thickness</span>
                <div className="col-span-2 flex items-center space-x-1.5">
                  {['18 mm', '20 mm', '30 mm'].map((th) => (
                    <button
                      key={th}
                      onClick={() => setSelectedThickness(th)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium border transition-colors ${
                        selectedThickness === th
                          ? 'border-[#886d4b] bg-[#fbf8f3] text-[#886d4b]'
                          : 'border-stone-200 text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      {th}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="text-stone-500 font-light">Surface Look</span>
                <span className="col-span-2 font-medium text-stone-800">White with Bold Golden Veins</span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="text-stone-500 font-light">Application</span>
                <span className="col-span-2 font-medium text-stone-800">Indoor (Walls, Flooring, Countertops)</span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="text-stone-500 font-light">Edges</span>
                <span className="col-span-2 font-medium text-stone-800">Straight, Bevel, Mitre (Custom)</span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="text-stone-500 font-light">Coverage</span>
                <span className="col-span-2 font-medium text-stone-800">Approx. 15.5 sq. ft. per 18mm slab</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs text-stone-700">
                <span className="font-medium">Quantity (Slabs)</span>
                <span className="text-[11px] text-stone-400 font-light">Specify required slab quantity for layout batching.</span>
              </div>
              <div className="flex items-center border border-stone-300 rounded w-32 bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-stone-500 hover:text-stone-800 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="flex-1 text-center text-xs font-mono font-medium text-stone-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-stone-500 hover:text-stone-800 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 pt-2">
              {/* High-Impact AR View Camera Action Button */}
              <button
                onClick={() => setIsARVisualizerOpen(true)}
                className="w-full py-3.5 bg-gradient-to-r from-stone-900 via-[#1f1b16] to-stone-900 hover:from-[#2a241d] hover:to-stone-850 text-white text-xs font-medium rounded flex items-center justify-between px-4 border border-[#886d4b]/60 hover:border-[#d5c1a4] shadow-sm transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#886d4b]/30 border border-[#d5c1a4] flex items-center justify-center text-[#d5c1a4] group-hover:scale-110 transition-transform shadow-xs">
                    <Camera className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium flex items-center gap-1.5 text-stone-100">
                      <span>AR View: See on Floor or Wall</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#886d4b] text-white text-[9px] font-mono font-medium uppercase tracking-wider">
                        Live 3D
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-400 font-light">
                      Point device camera to visualize real-scale slab in your room
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-[#d5c1a4] text-xs font-medium gap-1 group-hover:translate-x-0.5 transition-transform">
                  <ScanLine className="w-4 h-4" />
                </div>
              </button>

              <button
                onClick={() => onAddToCart(product, quantity, selectedThickness)}
                className="w-full py-3.5 bg-[#886d4b] hover:bg-[#73593b] text-white text-xs font-medium tracking-wider uppercase rounded flex items-center justify-center gap-2 shadow-md transition-all group"
              >
                <FileText className="w-4 h-4 text-[#d5c1a4]" />
                <span>Add to Specification Quote</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleWhatsAppChat}
                className="w-full py-3 bg-white hover:bg-stone-50 border border-stone-300 hover:border-stone-500 text-stone-800 text-xs font-medium rounded flex items-center justify-center gap-2 transition-all shadow-2xs"
              >
                <div className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[9px] font-bold">
                  W
                </div>
                <span>Direct Architectural Concierge</span>
                <span className="text-stone-400 font-normal">|</span>
                <span className="text-stone-600 font-light">Instant WhatsApp Specs &rarr;</span>
              </button>
            </div>

            {/* 3 Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-stone-600 border-t border-stone-200">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#886d4b] shrink-0" />
                <span className="font-light">100% Verified Import</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#886d4b] shrink-0" />
                <span className="font-light">A-Frame Freight</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#886d4b] shrink-0" />
                <span className="font-light">Architectural Support</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-stone-200 divide-y divide-stone-200 pt-2 text-xs">
              {/* Product Details */}
              <div>
                <button
                  onClick={() => toggleAccordion('details')}
                  className="w-full py-3 flex items-center justify-between font-medium text-stone-800 text-left"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#886d4b]" />
                    Product Details & Physical Properties
                  </span>
                  {activeAccordion === 'details' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {activeAccordion === 'details' && (
                  <div className="pb-3 text-stone-600 text-xs leading-relaxed space-y-1 font-light">
                    <p>Origin: Carrara & Verona Quarries, Italy.</p>
                    <p>Water Absorption: &lt; 0.15% (Extremely low porosity).</p>
                    <p>Density: 2,720 kg/m³ with high compressive load capacity.</p>
                    <p>Recommended Sealing: Dual-coat penetrating stone impregnator prior to grouting.</p>
                  </div>
                )}
              </div>

              {/* Delivery Information */}
              <div>
                <button
                  onClick={() => toggleAccordion('delivery')}
                  className="w-full py-3 flex items-center justify-between font-medium text-stone-800 text-left"
                >
                  <span className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-[#886d4b]" />
                    Delivery Logistics & Crane Unloading
                  </span>
                  {activeAccordion === 'delivery' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {activeAccordion === 'delivery' && (
                  <div className="pb-3 text-stone-600 text-xs leading-relaxed space-y-1 font-light">
                    <p>Specialized hydraulic A-frame crane delivery across Pakistan.</p>
                    <p>Dispatch lead time: 24–48 hours for stock slabs.</p>
                    <p>Site inspection and offloading assistance available on request.</p>
                  </div>
                )}
              </div>

              {/* Showroom & Support */}
              <div>
                <button
                  onClick={() => toggleAccordion('showroom')}
                  className="w-full py-3 flex items-center justify-between font-medium text-stone-800 text-left"
                >
                  <span className="flex items-center gap-2">
                    <HomeIcon className="w-3.5 h-3.5 text-[#886d4b]" />
                    Showroom Inspection & Direct Support
                  </span>
                  {activeAccordion === 'showroom' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {activeAccordion === 'showroom' && (
                  <div className="pb-3 text-stone-600 text-xs leading-relaxed space-y-1 font-light">
                    <p>Experience physical bookmatched full-scale displays at our flagship Lahore & Islamabad galleries.</p>
                    <p>Consultations with our in-house stone architects: 03 111 333 786.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2B. DYNAMIC SLAB PRICE & COVERAGE ESTIMATOR COMPONENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <SlabPriceEstimator
          product={product}
          currentThickness={selectedThickness}
          onApplyToQuote={(configured) => {
            onAddToCart(configured.product, configured.quantity, configured.thickness);
          }}
        />
      </section>

      {/* 3. STATEMENT IN STONE BANNER */}
      <section className="bg-white border-y border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-4 bg-[#886d4b]" />
                <span className="text-[10px] font-medium tracking-[0.24em] text-[#886d4b] uppercase font-sans">
                  A Statement in Stone
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal tracking-tight leading-tight">
                Timeless Elegance <br />
                for Extraordinary Spaces.
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 max-w-lg leading-relaxed font-light">
                Verona Calacotta Gold transforms interiors with its bold character and natural artistry. Ideal for luxury homes, commercial spaces and statement installations.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onOpenSampleModal(product.name)}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 hover:border-stone-900 text-stone-900 text-xs font-medium tracking-wider uppercase rounded hover:bg-stone-900 hover:text-white transition-colors"
                >
                  <span>Request a Swatch Sample</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-lg overflow-hidden border border-stone-200 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
                  alt="Marble Texture Detail"
                  className="w-full h-72 object-cover"
                />
                <div className="p-3 bg-stone-50 text-right">
                  <span className="text-[11px] font-serif italic text-stone-500">
                    Natural Beauty. Lasting Impressions.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TECHNICAL FEATURES */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 gap-2">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight">Technical Features</h2>
            <p className="text-xs text-stone-500 mt-1 font-light">Exceptional performance. Calibrated for contemporary architecture.</p>
          </div>
          <span className="text-xs font-medium tracking-wider uppercase text-stone-500 font-sans">Why Specify Verona Calacotta Gold?</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {[
            {
              icon: Gem,
              title: 'Natural Stone',
              desc: 'Each slab is unique with one-of-a-kind veining.',
            },
            {
              icon: Sparkles,
              title: 'Elegant Aesthetics',
              desc: 'Luxurious white surface with golden veining.',
            },
            {
              icon: Layers,
              title: 'Durable & Long-Lasting',
              desc: 'High compressive strength for enduring beauty.',
            },
            {
              icon: HomeIcon,
              title: 'Versatile Applications',
              desc: 'Perfect for floors, walls, countertops and vanities.',
            },
            {
              icon: Shield,
              title: 'Low Maintenance',
              desc: 'Easy to clean and maintain with proper care.',
            },
            {
              icon: TrendingUp,
              title: 'Adds Property Value',
              desc: 'A premium choice for high-end interiors.',
            },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-800 mb-3">
                <item.icon className="w-4 h-4 text-[#886d4b]" />
              </div>
              <h3 className="text-xs font-medium text-stone-900 font-sans">{item.title}</h3>
              <p className="text-[11px] text-stone-500 mt-1 leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. RELATED PRODUCTS */}
      <section className="py-14 bg-stone-50/70 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal tracking-tight">Related Products</h2>
              <p className="text-xs text-stone-500 mt-0.5 font-light">Curated pairings from our Italian stone warehouse.</p>
            </div>
            <button
              onClick={() => setActiveView('catalog')}
              className="flex items-center gap-1 text-xs font-medium text-stone-700 hover:text-[#886d4b] transition-colors"
            >
              <span>View All Slabs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {RELATED_SLABS.map((slab, idx) => (
              <ArchitecturalProductCard
                key={slab.id}
                product={slab}
                index={idx}
                isWishlisted={wishlistIds.includes(slab.id)}
                onSelectProduct={(p) => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setActiveView('product');
                }}
                onAddToCart={(p) => onAddToCart(p)}
                onToggleWishlist={onToggleWishlist}
                onOpen360Review={onOpen360Modal}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </section>

      {/* High Res Zoom Modal */}
      {showZoomModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setShowZoomModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-stone-300 text-sm font-semibold"
            >
              ✕ Close
            </button>
            <img
              src={galleryImages[selectedImageIndex]}
              alt="Zoomed Slab"
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
      {/* AR Surface Floor & Wall Visualizer Modal */}
      <ARSurfaceVisualizerModal
        isOpen={isARVisualizerOpen}
        onClose={() => setIsARVisualizerOpen(false)}
        product={product}
        onOpenQuoteModal={onOpenQuoteModal}
      />
    </div>
  );
};
