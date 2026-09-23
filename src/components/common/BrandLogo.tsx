import React from 'react';

interface BrandLogoProps {
  variant?: 'dark' | 'light'; // 'dark' text for light backgrounds, 'light' text for dark backgrounds
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  tagline?: string;
  hideTaglineOnMobile?: boolean;
  className?: string;
  isDashboard?: boolean;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = false,
  tagline = '',
  hideTaglineOnMobile = false,
  className = '',
  isDashboard = false,
  onClick,
}) => {
  const isLight = variant === 'light';

  // Dimension scaling
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const titleSizes = {
    sm: 'text-[17px] sm:text-[18px]',
    md: 'text-[21px] sm:text-[23px]',
    lg: 'text-[26px] sm:text-[28px]',
  };

  const taglineSizes = {
    sm: 'text-[8.5px] tracking-[0.24em]',
    md: 'text-[10px] tracking-[0.24em]',
    lg: 'text-[11px] tracking-[0.25em]',
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 select-none group transition-all ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {isDashboard ? (
        /* Geometric Gold Quatrefoil Emblem for Dashboard */
        <div className="w-8 h-8 shrink-0 flex items-center justify-center text-[#d4af37]">
          <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8">
            <circle cx="14" cy="14" r="7" stroke="#d5b282" strokeWidth="1.7" />
            <circle cx="22" cy="14" r="7" stroke="#d5b282" strokeWidth="1.7" />
            <circle cx="14" cy="22" r="7" stroke="#d5b282" strokeWidth="1.7" />
            <circle cx="22" cy="22" r="7" stroke="#d5b282" strokeWidth="1.7" />
            <circle cx="18" cy="18" r="3" fill="#d5b282" />
          </svg>
        </div>
      ) : (
        /* Iconic Golden Square "ST" Monogram */
        <div
          className={`${iconSizes[size]} shrink-0 rounded-[4px] bg-zinc-900 border border-[#c5a880]/70 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-2xs`}
          style={{
            background: 'linear-gradient(145deg, #18181b 0%, #27272a 100%)',
          }}
        >
          <span className="font-serif text-[#d5b282] font-semibold text-xs sm:text-sm tracking-tight select-none">
            ST
          </span>
        </div>
      )}

      {/* Brand Wordmark */}
      <div className="flex flex-col justify-center">
        <span
          className={`font-serif ${titleSizes[size]} font-medium leading-none tracking-tight transition-colors ${
            isLight
              ? 'text-white group-hover:text-amber-400'
              : 'text-zinc-900 group-hover:text-amber-800'
          }`}
        >
          Saleem Traders
        </span>
      </div>
    </div>
  );
};
