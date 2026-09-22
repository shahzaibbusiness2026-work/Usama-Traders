import React from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowRight, FileText } from 'lucide-react';
import { Product } from '../../types';
import { Product360Badge } from './Product360Badge';

interface ArchitecturalProductCardProps {
  product: Product;
  index?: number;
  isWishlisted: boolean;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  onOpen360Review?: (product: Product) => void;
  variant?: 'grid' | 'featured' | 'compact';
}

export const ArchitecturalProductCard: React.FC<ArchitecturalProductCardProps> = ({
  product,
  index = 0,
  isWishlisted,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  onOpen360Review,
  variant = 'grid',
}) => {
  // Determine badge color tone matching Image 2
  const getBadgeStyle = (badge?: string) => {
    switch (badge?.toUpperCase()) {
      case 'FEATURED':
        return 'bg-[#d5b282] text-stone-950 font-bold';
      case 'BESTSELLER':
        return 'bg-[#886d4b] text-white font-bold';
      case 'NEW':
        return 'bg-stone-900 text-white font-bold';
      case 'PREMIUM':
        return 'bg-[#2a2d32] text-[#d5b282] border border-[#d5b282]/30 font-bold';
      case 'TRENDING':
        return 'bg-stone-800 text-stone-100 font-bold';
      case 'EXCLUSIVE':
        return 'bg-[#5c4a35] text-stone-100 font-bold';
      default:
        return 'bg-stone-900 text-white font-medium';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.45,
        delay: Math.min((index % 6) * 0.05, 0.25),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group bg-white rounded border border-stone-200/90 hover:border-[#886d4b]/60 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
    >
      {/* Visual Image Box */}
      <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          onClick={() => onSelectProduct(product)}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 cursor-pointer"
        />

        {/* Top-left Badge matching Image 2 */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span
              className={`text-[9px] uppercase tracking-[0.16em] px-2.5 py-1 rounded shadow-2xs ${getBadgeStyle(
                product.badge
              )}`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* 360 Review Floating Badge */}
        <Product360Badge
          product={product}
          onOpen360={(p) => {
            if (onOpen360Review) {
              onOpen360Review(p);
            } else {
              onSelectProduct(p);
            }
          }}
          variant="floating"
        />

        {/* Wishlist Heart Icon matching Image 2 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/95 hover:bg-white text-stone-600 hover:text-stone-950 border border-stone-200 shadow-2xs flex items-center justify-center transition-all z-10"
          title="Save specification"
          aria-label="Wishlist item"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-transform ${
              isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : ''
            }`}
          />
        </button>
      </div>

      {/* Card Content Details matching Image 2 */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category in gold/tan uppercase font */}
          <div className="text-[10px] uppercase tracking-[0.18em] text-[#886d4b] font-semibold font-sans mb-1">
            {product.category || 'PORCELAIN & TILES'}
          </div>

          {/* Product Name in elegant serif */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="font-editorial text-base sm:text-lg font-normal text-stone-900 hover:text-[#886d4b] cursor-pointer transition-colors leading-snug line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Subtitle Line 1 (e.g. "Premium Italian Marble") */}
          <p className="text-xs text-stone-600 font-normal mt-0.5 line-clamp-1">
            {product.subtitle || product.material || product.type}
          </p>

          {/* Subtitle Line 2 (e.g. "3050 x 1850 x 20 mm | Polished Finish") */}
          <p className="text-[11px] text-stone-500 font-light mt-0.5 line-clamp-1">
            {product.dimensions}
            {product.finish && !product.dimensions?.includes(product.finish)
              ? ` | ${product.finish}`
              : ''}
          </p>
        </div>

        {/* Pricing & 2 Buttons row matching Image 2 */}
        <div className="mt-4 pt-3 border-t border-stone-100">
          <div className="mb-3">
            <span className="text-sm sm:text-base font-semibold text-stone-900 font-sans tracking-tight">
              {product.currency} {product.price.toLocaleString()}
            </span>
            {product.priceUnit && (
              <span className="text-xs text-stone-500 font-light ml-1">
                {product.priceUnit}
              </span>
            )}
          </div>

          {/* Two Action Buttons from Image 2 */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectProduct(product)}
              className="py-2 px-3 bg-stone-950 hover:bg-stone-850 text-white text-[11px] font-medium tracking-[0.06em] rounded flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View product</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button
              onClick={() => onAddToCart(product)}
              className="py-2 px-2 bg-white hover:bg-stone-50 border border-stone-300 hover:border-stone-400 text-stone-800 text-[11px] font-medium tracking-[0.04em] rounded flex items-center justify-center gap-1.5 transition-colors"
            >
              <FileText className="w-3 h-3 text-stone-500" />
              <span>Add to quote</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
