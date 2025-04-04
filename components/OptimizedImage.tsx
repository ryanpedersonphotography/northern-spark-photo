import React, { useState, useCallback, memo } from 'react';
import { imagePresets } from '../src/utils/cloudinary';

interface OptimizedImageProps {
  src: string;
  alt: string;
  preset: 'thumbnail' | 'grid' | 'lightbox' | 'preview';
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
}

/**
 * A reusable optimized image component with lazy loading and blur-in effect
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  preset,
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
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Precompute image urls based on preset
  const placeholderUrl = imagePresets.gridPlaceholder(src);
  
  // Get optimized URL based on preset
  let optimizedUrl;
  switch (preset) {
    case 'thumbnail':
      optimizedUrl = imagePresets.thumbnail(src);
      break;
    case 'grid':
      optimizedUrl = imagePresets.grid(src);
      break;
    case 'lightbox':
      optimizedUrl = imagePresets.lightbox(src);
      break;
    case 'preview':
      optimizedUrl = imagePresets.previewImage(src);
      break;
    default:
      optimizedUrl = src;
  }
  
  // Handle image load completion
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  }, [onLoad]);
  
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: placeholderColor,
        ...style,
      }}
      onClick={onClick}
    >
      {/* Low-res placeholder */}
      <img
        src={placeholderUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover blur-xl"
        style={{ filter: 'blur(20px)' }}
        aria-hidden="true"
      />
      
      {/* Main image */}
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
      />
    </div>
  );
};

export default memo(OptimizedImage);