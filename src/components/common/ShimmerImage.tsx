import React, { useState, useEffect, useRef } from 'react';
import { Layers } from 'lucide-react';

interface ShimmerImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onLoad?: () => void;
  priority?: boolean;
  blurDataUrl?: string;
}

/**
 * ShimmerImage
 * Renders a high-resolution image with a blurred stone-palette placeholder,
 * GPU-accelerated shimmer sweep effect, and smooth blur/scale crossfade transition.
 */
export const ShimmerImage: React.FC<ShimmerImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  aspectRatio = 'aspect-[4/3]',
  onClick,
  onLoad,
  priority = false,
  blurDataUrl,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Re-check loading state if src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);

    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <div
      onClick={onClick}
      className={`relative ${aspectRatio} overflow-hidden bg-[#f3efe8] select-none ${containerClassName}`}
    >
      {/* 1. BLURRED SHIMMER SKELETON LAYER */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-700 ease-in-out ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Ambient Warm Neutral Blurred Backdrop */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#f2eee7] via-[#eae4d9] to-[#dfd7c9] filter blur-xs scale-105"
          style={{
            backgroundImage: blurDataUrl
              ? `url("${blurDataUrl}")`
              : 'radial-gradient(circle at 30% 30%, #f7f4ed 0%, #ece5d8 60%, #e2d9ca 100%)',
            backgroundSize: 'cover',
          }}
        />

        {/* Subtle veining watermark graphic */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <Layers className="w-8 h-8 text-stone-600 stroke-[1.2]" />
        </div>

        {/* Shimmer Light-Ray Sweep */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="w-full h-full animate-shimmer-sweep"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 45%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.45) 55%, rgba(255,255,255,0) 100%)',
            }}
          />
        </div>
      </div>

      {/* 2. REAL IMAGE WITH BLUR-TO-SHARP TRANSITION */}
      {!hasError ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`${className} transition-all duration-700 ease-out ${
            isLoaded
              ? 'opacity-100 blur-0 scale-100'
              : 'opacity-0 blur-md scale-105 filter'
          }`}
        />
      ) : (
        /* Fallback on network error */
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
          <Layers className="w-6 h-6 mb-1 text-stone-400" />
          <span className="text-[11px] font-medium text-stone-500">{alt}</span>
          <span className="text-[9px] text-stone-400 mt-0.5">Surface preview</span>
        </div>
      )}
    </div>
  );
};
