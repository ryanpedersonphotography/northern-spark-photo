import React, { useState, useCallback, memo, useMemo, useEffect } from 'react';
import { imagePresets } from '../src/utils/cloudinary';

interface OptimizedImageProps {
  src: string;
  alt: string;
  preset?: 'thumbnail' | 'grid' | 'lightbox' | 'preview' | 'custom';
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: 'auto' | 'high' | 'low';
  sizes?: string;
  placeholderColor?: string;
  onClick?: () => void;
  onLoad?: () => void;
  customOptions?: {
    width?: number;
    height?: number;
    quality?: 'auto' | 'eco' | 'good' | 'best' | 'low';
    effects?: string[];
    dpr?: string;
  };
  disablePlaceholder?: boolean;
  orientation?: 'landscape' | 'portrait';
}

/**
 * A reusable optimized image component with lazy loading and blur-in effect
 * Enhanced for mobile performance with advanced loading strategies
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  preset = 'grid',
  className = '',
  style = {},
  width,
  height,
  loading = 'lazy',
  priority = 'auto',
  sizes,
  placeholderColor = '#f0f0f0',
  onClick,
  onLoad,
  customOptions,
  disablePlaceholder = false,
  orientation = 'landscape'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = React.useRef<HTMLDivElement>(null);
  
  // Detect if we're on a low-end device or slow connection
  const isLowEndDevice = useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    const connection = (navigator as any)?.connection;
    if (connection && (connection.saveData || connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g')) {
      return true;
    }
    // Check for low memory devices (needs proper type)
    return (navigator as any).deviceMemory && (navigator as any).deviceMemory <= 2;
  }, []);
  
  // Adjust image quality based on device capabilities
  const deviceBasedOptions = useMemo(() => {
    if (isLowEndDevice) {
      return {
        quality: 'good' as const, // Lower quality for low-end devices
        width: width ? Math.min(width, 600) : 600, // Cap size for low-end devices
      };
    }
    return {};
  }, [isLowEndDevice, width]);
  
  // Compute placeholder URL - using smaller blur for mobile to save bandwidth
  const placeholderUrl = useMemo(() => {
    if (disablePlaceholder) return '';
    return imagePresets.gridPlaceholder(src);
  }, [src, disablePlaceholder]);
  
  // Get optimized URL based on preset and device capabilities
  const optimizedUrl = useMemo(() => {
    if (!src) return '';
    
    if (preset === 'custom' && customOptions) {
      // Merge device-based options with custom options
      return imagePresets.custom(src, {
        ...deviceBasedOptions,
        ...customOptions
      });
    }
    
    switch (preset) {
      case 'thumbnail':
        return imagePresets.thumbnail(src);
      case 'lightbox':
        return imagePresets.lightbox(src);
      case 'preview':
        return imagePresets.previewImage(src);
      case 'grid':
      default:
        return imagePresets.grid(src);
    }
  }, [src, preset, customOptions, deviceBasedOptions]);
  
  // Handle image load completion
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  }, [onLoad]);
  
  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (!imageRef.current || loading === 'eager' || priority === 'high') {
      setIsVisible(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px 0px', // Load when within 200px of viewport
        threshold: 0.01
      }
    );
    
    observer.observe(imageRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [loading, priority]);
  
  // Generate proper aspect ratio based on orientation
  const aspectRatio = useMemo(() => {
    return orientation === 'landscape' ? '3/2' : '2/3';
  }, [orientation]);
  
  return (
    <div
      ref={imageRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: placeholderColor,
        aspectRatio,
        ...style,
      }}
      onClick={onClick}
    >
      {/* Low-res placeholder */}
      {!disablePlaceholder && placeholderUrl && (
        <img
          src={placeholderUrl}
          alt=""
          width={20}
          height={orientation === 'landscape' ? 12 : 30}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'blur(15px)' }}
          aria-hidden="true"
          loading="eager" // Always load placeholder immediately
        />
      )}
      
      {/* Main image - only load when visible or high priority */}
      {(isVisible || loading === 'eager' || priority === 'high') && (
        <img
          src={optimizedUrl}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          fetchPriority={priority}
          sizes={sizes}
          className={`w-full h-full object-cover transition-opacity duration-300 ease-in relative z-10 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          style={{
            transition: 'transform 0.3s ease-out, opacity 0.3s ease-in',
          }}
          onMouseOver={(e) => {
            // Apply hover effect only on non-touch devices
            if (window.matchMedia('(hover: hover)').matches) {
              e.currentTarget.style.transform = 'scale(1.02)';
            }
          }}
          onMouseOut={(e) => {
            if (window.matchMedia('(hover: hover)').matches) {
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        />
      )}
    </div>
  );
};

export default memo(OptimizedImage);