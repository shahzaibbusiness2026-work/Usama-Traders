import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Star,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  FileText,
  RotateCcw,
  Sparkles,
  Award,
  ThumbsUp,
  MapPin,
  Calendar,
} from 'lucide-react';
import { Product } from '../../types';
import { Product360Viewer } from '../product/Product360Viewer';

interface Product360ReviewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product) => void;
  onOpenQuote?: (productName: string) => void;
}

export const Product360ReviewModal: React.FC<Product360ReviewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onOpenQuote,
}) => {
  const [activeTab, setActiveTab] = useState<'360' | 'reviews' | 'specs'>('360');

  if (!isOpen || !product) return null;

  // Mock verified customer installation reviews
  const reviews = [
    {
      author: 'Ar. Tariq Mansoor',
      role: 'Principal Architect, Studio Bauhaus Lahore',
      rating: 5,
      date: 'March 14, 2026',
      project: 'DHA Phase 6 Villa Master Bath',
      comment:
        'The 360 inspection was completely accurate to the actual slab delivered. Bookmatched veins aligned to within 2mm. Outstanding density and mirror polish.',
      verified: true,
      helpfulCount: 24,
    },
    {
      author: 'Engr. Kamran Siddiqui',
      role: 'Project Director, Paragon Commercial Heights',
      rating: 5,
      date: 'February 28, 2026',
      project: 'Executive Boardroom & Reception Lobby',
      comment:
        'Inspected 14 slabs using Saleem Traders 360 degree tool before dispatching to site. Zero hairline fractures, calibrated thickness was spot-on.',
      verified: true,
      helpfulCount: 19,
    },
    {
      author: 'Fatima Al-Hassan',
      role: 'Interior Designer, Islamabad',
      rating: 5,
      date: 'January 19, 2026',
      project: 'Open-Plan Kitchen Waterfall Island',
      comment:
        'The subtle golden veining under warm 3000K lighting looks even more stunning in person than the digital preview. Highly recommend Saleem Traders!',
      verified: true,
      helpfulCount: 15,
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="bg-stone-950 px-6 py-4 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#856a42]/20 border border-[#856a42] flex items-center justify-center text-[#c5a880]">
                <RotateCcw className="w-4 h-4 animate-spin" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                    {product.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#856a42]/20 text-[#c5a880] border border-[#856a42]/40 text-[9px] font-mono uppercase tracking-wider font-bold">
                    360° Studio Review
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                  {product.category} • {product.finish} • {product.dimensions} • Origin: Italy
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-900 border border-stone-700 text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="bg-stone-950/60 border-b border-stone-800 px-6 flex gap-6 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('360')}
              className={`py-3 border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === '360'
                  ? 'border-[#c5a880] text-[#c5a880]'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>360° Interactive Inspection</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-3 border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'reviews'
                  ? 'border-[#c5a880] text-[#c5a880]'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Architect & Client Reviews (36)</span>
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`py-3 border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'specs'
                  ? 'border-[#c5a880] text-[#c5a880]'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Technical Data Sheet</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#141210]">
            {activeTab === '360' && (
              <div className="space-y-6">
                {/* 360 Viewer */}
                <Product360Viewer
                  product={product}
                  onRequestQuote={() => {
                    onClose();
                    onOpenQuote?.(product.name);
                  }}
                  showReviewDrawer={true}
                />
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6 max-w-3xl mx-auto">
                {/* Score Banner */}
                <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-serif font-bold text-white">4.9</div>
                    <div>
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-stone-400 mt-1">
                        Based on 36 verified project installations across Pakistan
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>100% Verified Deliveries</span>
                    </div>
                  </div>
                </div>

                {/* Review Cards */}
                <div className="space-y-4">
                  {reviews.map((rev, i) => (
                    <div
                      key={i}
                      className="bg-stone-900/80 border border-stone-800/80 rounded-xl p-5 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{rev.author}</span>
                            {rev.verified && (
                              <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Verified Architect</span>
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#c5a880] mt-0.5">{rev.role}</p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-stone-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{rev.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-stone-300">
                        <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                        <span>Project: {rev.project}</span>
                      </div>

                      <p className="text-xs text-stone-300 font-light leading-relaxed">
                        "{rev.comment}"
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-stone-800/60 text-xs text-stone-400">
                        <div className="flex items-center text-amber-400">
                          {[...Array(rev.rating)].map((_, idx) => (
                            <Star key={idx} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                        <button className="flex items-center gap-1 hover:text-white transition-colors">
                          <ThumbsUp className="w-3 h-3" />
                          <span>Helpful ({rev.helpfulCount})</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-4">
                  <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                    Laboratory Certified Technical Attributes
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[
                      { label: 'Geological Classification', val: 'Metamorphic Calcite Marble' },
                      { label: 'Quarry Origin', val: 'Carrara Region, Italy' },
                      { label: 'Bulk Density', val: '2,710 kg/m³' },
                      { label: 'Water Absorption (DIN 52103)', val: '0.12% by weight' },
                      { label: 'Compressive Breaking Load', val: '142 MPa' },
                      { label: 'Flexural Tensile Strength', val: '18.4 MPa' },
                      { label: 'Abrasion Resistance', val: 'Class 4 (Commercial Grade)' },
                      { label: 'Surface Gloss Sheen', val: '>92 GU Mirror Polish' },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2.5 bg-stone-950/60 rounded border border-stone-800"
                      >
                        <span className="text-stone-400">{row.label}</span>
                        <span className="font-semibold text-white">{row.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="bg-stone-950 px-6 py-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div>
                <span className="text-[10px] text-stone-400 uppercase">Commercial Pricing</span>
                <div className="text-base font-bold text-white">
                  {product.currency} {product.price.toLocaleString()}{' '}
                  <span className="text-xs text-stone-400 font-normal">{product.priceUnit}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {onAddToCart && (
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="px-4 py-2.5 rounded-lg border border-stone-700 hover:border-stone-500 bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-semibold transition-colors"
                >
                  Add to Cart
                </button>
              )}

              <button
                onClick={() => {
                  onClose();
                  onOpenQuote?.(product.name);
                }}
                className="px-5 py-2.5 rounded-lg bg-[#856a42] hover:bg-[#735a34] text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2"
              >
                <span>Request Project Quote</span>
                <FileText className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
