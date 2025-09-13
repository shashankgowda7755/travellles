import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  quality = 85,
  placeholder = 'empty',
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, isInView]);

  // Generate optimized image URLs
  const getOptimizedSrc = (originalSrc: string, format: 'webp' | 'original' = 'original') => {
    // If it's an external URL (Unsplash, etc.), add optimization parameters
    if (originalSrc.includes('unsplash.com')) {
      const url = new URL(originalSrc);
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      url.searchParams.set('q', quality.toString());
      if (width) url.searchParams.set('w', width.toString());
      if (height) url.searchParams.set('h', height.toString());
      if (format === 'webp') url.searchParams.set('fm', 'webp');
      return url.toString();
    }
    
    // For local images, return as-is (Vite will handle optimization)
    return originalSrc;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Don't render anything if not in view and not priority
  if (!isInView && !priority) {
    return (
      <div
        ref={imgRef}
        className={cn(
          'bg-gray-200 animate-pulse',
          className
        )}
        style={{ width, height }}
        aria-label={`Loading ${alt}`}
      />
    );
  }

  if (hasError) {
    return (
      <div
        className={cn(
          'bg-gray-200 flex items-center justify-center text-gray-500 text-sm',
          className
        )}
        style={{ width, height }}
        aria-label={`Failed to load ${alt}`}
      >
        Image unavailable
      </div>
    );
  }

  return (
    <picture className={cn('block', className)}>
      {/* WebP source for modern browsers */}
      <source
        srcSet={getOptimizedSrc(src, 'webp')}
        type="image/webp"
      />
      
      {/* Fallback for older browsers */}
      <img
        ref={imgRef}
        src={getOptimizedSrc(src)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          {
            'opacity-0': !isLoaded && placeholder === 'blur',
            'opacity-100': isLoaded || placeholder === 'empty',
          },
          className
        )}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined,
        }}
      />
    </picture>
  );
};

export default OptimizedImage;