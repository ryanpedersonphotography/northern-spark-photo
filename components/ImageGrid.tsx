import React, { useState, useCallback, memo, useEffect, useMemo } from 'react';
import Masonry from 'react-masonry-css';
import { imagePresets } from '../src/utils/cloudinary';
import OptimizedImage from './OptimizedImage';

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
 * Mobile-optimized image component with progressive loading strategy
 */
const GridImage = memo(({ 
  image, 
  index, 
  handleClick,
  isVisible,
  priority
}: { 
  image: Image; 
  index: number;
  handleClick: () => void;
  isVisible: boolean;
  priority: boolean;
}) => {
  const isLandscape = image.orientation === 'landscape';
  
  // Calculate image size based on screen width - much smaller for mobile
  const imageSize = useMemo(() => {
    // 400px for mobile, 800px for tablet, 1200px for desktop
    return window.innerWidth < 640 ? 400 : window.innerWidth < 1024 ? 800 : 1200;
  }, []);

  return (
    <div 
      className="masonry-item" 
      style={{
        cursor: 'pointer',
        width: '100%',
      }} 
    >
      <OptimizedImage
        src={image.src}
        alt={image.alt}
        preset="grid"
        orientation={isLandscape ? 'landscape' : 'portrait'}
        width={imageSize}
        height={isLandscape ? Math.round(imageSize * 0.66) : Math.round(imageSize * 1.5)}
        loading={priority ? 'eager' : 'lazy'}
        priority={priority ? 'high' : 'low'}
        onClick={handleClick}
        customOptions={{
          width: imageSize,
          quality: window.innerWidth < 640 ? 'good' : 'auto',
          effects: ['auto_color']
        }}
      />
    </div>
  );
});

GridImage.displayName = 'GridImage';

/**
 * Mobile-optimized masonry grid with intersection observer
 * for loading only visible images
 */
const ImageGrid: React.FC<ImageGridProps> = ({ images, windowWidth, openLightbox }) => {
  // Track visible elements for lazy loading
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  
  // Configure responsive columns for Masonry layout - fewer columns on mobile
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
  
  // Set up intersection observer for lazy loading
  useEffect(() => {
    // Create intersection observer to load images only when they're near viewport
    const options = {
      root: null, // viewport
      rootMargin: '200px 0px', // 200px margin above and below viewport
      threshold: 0.01 // Trigger as soon as 1% of element is visible
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          setVisibleItems(prev => new Set([...prev, index]));
          // Stop observing once visible
          observer.unobserve(entry.target);
        }
      });
    }, options);
    
    // Start observing all image containers
    const containers = document.querySelectorAll('.image-container');
    containers.forEach(container => {
      observer.observe(container);
    });
    
    return () => {
      // Clean up on unmount
      observer.disconnect();
    };
  }, [images.length]);

  return (
    <div className="p-4">
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {images.map((image, index) => (
          <div 
            key={`${image.src}-${index}`} 
            className="mb-4 image-container" 
            data-index={index}
          >
            <GridImage 
              image={image} 
              index={index} 
              handleClick={getClickHandler(index)}
              isVisible={visibleItems.has(index)}
              priority={index < 4} // Only the first 4 images are high priority
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default memo(ImageGrid);