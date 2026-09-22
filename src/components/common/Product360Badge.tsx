import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Product } from '../../types';

interface Product360BadgeProps {
  product: Product;
  onOpen360: (product: Product) => void;
  variant?: 'floating' | 'button' | 'compact';
  className?: string;
}

export const Product360Badge: React.FC<Product360BadgeProps> = ({
  product,
  onOpen360,
  variant = 'floating',
  className = '',
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen360(product);
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleClick}
        className={`p-1.5 rounded-full bg-stone-900/90 backdrop-blur-md text-[#d5c1a4] hover:text-white hover:bg-stone-850 border border-stone-750 shadow-md transition-all group ${className}`}
        title="Open 360° Product Review"
        aria-label="360 Product Review"
      >
        <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
      </button>
    );
  }

  if (variant === 'button') {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-stone-900/90 hover:bg-stone-950 text-[#d5c1a4] hover:text-stone-100 border border-[#886d4b]/60 text-[11px] font-medium tracking-wider uppercase font-sans shadow-xs transition-all group ${className}`}
      >
        <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
        <span>360° Review</span>
      </button>
    );
  }

  // Default 'floating' on product image card
  return (
    <button
      onClick={handleClick}
      className={`absolute bottom-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-950/90 hover:bg-stone-900 backdrop-blur-md text-stone-200 hover:text-white border border-[#886d4b]/60 hover:border-[#d5c1a4] text-[10px] font-medium tracking-widest uppercase font-sans shadow-md transition-all group duration-200 ${className}`}
      title="Inspect in 360° with interactive rotation"
    >
      <div className="w-3 h-3 rounded-full bg-[#886d4b]/30 flex items-center justify-center">
        <RotateCcw className="w-2.5 h-2.5 text-[#d5c1a4] group-hover:rotate-180 transition-transform duration-500" />
      </div>
      <span>360° Review</span>
    </button>
  );
};
