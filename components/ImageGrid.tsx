import React, { useState, useCallback, memo } from 'react';
import Masonry from 'react-masonry-css';
import { imagePresets } from '../src/utils/cloudinary';

interface Image {
  src: string;
  alt: string;
  orientation: string;
}

interface ImageGridProps {
  images: Image[];
  windowWidth: number;
  openLightbox: (index: number) => void;
}

/**
 * Optimized Image component with loading state and lazy loading
 */
const GridImage = memo(({ 
  image, 
  index, 
  handleClick
}: { 
  image: Image; 
  index: number;
  handleClick: () => void;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isLandscape = image.orientation === 'landscape';
  
  // Precompute image urls
  const placeholderUrl = imagePresets.gridPlaceholder(image.src);
  const fullImageUrl = imagePresets.grid(image.src);
  
  // Handle image load completion
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div 
      className="masonry-item" 
      style={{
        cursor: 'pointer',
        aspectRatio: isLandscape ? '3/2' : '2/3',
        position: 'relative',
        overflow: 'hidden'
      }} 
      onClick={handleClick}
    >
      {/* Placeholder */}
      <img
        src={placeholderUrl}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'blur(10px)' }}
        aria-hidden="true"
      />
      
      {/* Main image */}
      <img
        src={fullImageUrl}
        alt={image.alt}
        className={`w-full h-full object-cover absolute inset-0 z-10 transition-opacity duration-300 ease-in ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={index < 6 ? "eager" : "lazy"}
        fetchPriority={index < 6 ? "high" : "auto"}
        onLoad={handleLoad}
        style={{
          transition: 'transform 0.3s ease, opacity 0.3s ease',
        }}
        onMouseOver={(e) => {
          // Apply hover effect only on non-touch devices
          if (window.matchMedia('(hover: hover)').matches) {
            e.currentTarget.style.transform = 'scale(1.03)';
          }
        }}
        onMouseOut={(e) => {
          if (window.matchMedia('(hover: hover)').matches) {
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
      />
    </div>
  );
});

GridImage.displayName = 'GridImage';

const ImageGrid: React.FC<ImageGridProps> = ({ images, windowWidth, openLightbox }) => {
  // Configure responsive columns for Masonry layout
  const breakpointColumns = {
    default: 3,   // Desktop (default)
    1024: 3,      // Large tablets/small laptops
    768: 2,       // Tablets
    640: 1        // Mobile phones
  };
  
  // Optimize by memoizing the click handler for each image
  const getClickHandler = useCallback(
    (index: number) => () => openLightbox(index),
    [openLightbox]
  );

  return (
    <div className="p-4">
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {images.map((image, index) => (
          <div key={`${image.src}-${index}`} className="mb-4">
            <GridImage 
              image={image} 
              index={index} 
              handleClick={getClickHandler(index)} 
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default memo(ImageGrid);