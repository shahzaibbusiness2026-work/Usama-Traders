import React from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowRight, FileText, Scale } from 'lucide-react';
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
  isCompared?: boolean;
  onToggleCompare?: (product: Product) => void;
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
  isCompared = false,
  onToggleCompare,
  variant = 'grid',
}) => {
  // Determine badge color tone with refined architectural bronze palette
  const getBadgeStyle = (badge?: string) => {
    switch (badge?.toUpperCase()) {
      case 'FEATURED':
        return 'bg-[#7E6348] text-white font-semibold';
      case 'BESTSELLER':
        return 'bg-stone-900 text-white font-semibold';
      case 'NEW':
        return 'bg-stone-900 text-stone-100 font-semibold';
      case 'PREMIUM':
      case 'PREMIUM COLLECTION':
        return 'bg-[#F5F1EA] text-[#7E6348] border border-[#7E6348]/40 font-semibold';
      case 'TRENDING':
        return 'bg-stone-800 text-stone-100 font-semibold';
      case 'EXCLUSIVE':
        return 'bg-[#5c4a35] text-stone-100 font-semibold';
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
      className="group bg-white rounded border border-[#E5DFD5] hover:border-[#7E6348]/60 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
    >
      {/* Visual Image Box - aspect-[4/3] constraint */}
      <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          onClick={() => onSelectProduct(product)}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 cursor-pointer"
        />

        {/* Top-left Badge */}
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

        {/* Top-Right Quick Action Icons: Compare & Wishlist */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
          {onToggleCompare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(product);
              }}
              className={`w-7 h-7 rounded-full border shadow-2xs flex items-center justify-center transition-all ${
                isCompared
                  ? 'bg-[#7E6348] text-white border-[#7E6348]'
                  : 'bg-white/95 hover:bg-white text-stone-600 hover:text-stone-950 border-stone-200'
              }`}
              title={isCompared ? 'Remove from comparison' : 'Add to side-by-side comparison'}
              aria-label="Compare product"
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="w-7 h-7 rounded-full bg-white/95 hover:bg-white text-stone-600 hover:text-stone-950 border border-stone-200 shadow-2xs flex items-center justify-center transition-all"
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
      </div>

      {/* Card Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand/Category Tag with standardized tracking */}
          <div className="tracking-[0.25em] text-xs font-semibold text-amber-800 uppercase font-sans mb-1.5">
            {product.category || 'PORCELAIN & TILES'}
          </div>

          {/* Product Title in refined Cormorant serif */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="font-serif text-lg font-normal text-zinc-900 group-hover:text-amber-800 cursor-pointer transition-colors leading-snug line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Technical Specs & Subtext */}
          <p className="text-xs text-zinc-500 font-normal mt-1 line-clamp-1">
            {product.subtitle || product.material || product.type}
          </p>

          <p className="text-xs text-zinc-500 font-normal mt-0.5 line-clamp-1">
            {product.dimensions}
            {product.finish && !product.dimensions?.includes(product.finish)
              ? ` • ${product.finish}`
              : ''}
          </p>
        </div>

        {/* Pricing & Bronze Action Buttons */}
        <div className="mt-4 pt-3.5 border-t border-stone-100">
          <div className="mb-3 flex items-baseline justify-between">
            <div>
              <span className="font-sans text-base font-semibold text-stone-900 tracking-tight">
                {product.currency} {product.price.toLocaleString()}
              </span>
              {product.priceUnit && (
                <span className="text-xs text-stone-600 font-normal ml-1 font-sans">
                  {product.priceUnit}
                </span>
              )}
            </div>

            {product.inStock && (
              <span className="text-[10px] tracking-wide uppercase font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                In Stock
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectProduct(product)}
              className="py-2.5 px-2.5 bg-[#7E6348] hover:bg-[#A38A6B] text-white text-xs font-medium tracking-[0.1em] uppercase rounded-none flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button
              onClick={() => onAddToCart(product)}
              className="py-2.5 px-2 bg-transparent hover:bg-[#F5F1EA] border border-stone-300 hover:border-[#7E6348] text-stone-800 text-xs font-medium tracking-[0.06em] uppercase rounded-none flex items-center justify-center gap-1.5 transition-colors"
            >
              <FileText className="w-3 h-3 text-[#7E6348]" />
              <span>Quote</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

