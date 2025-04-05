import React, { useEffect, useRef, useState, useCallback, memo, useMemo } from 'react';
import { imagePresets } from '../src/utils/cloudinary';
import OptimizedImage from './OptimizedImage';

interface Image {
  src: string;
  alt: string;
  orientation: string;
}

interface LightboxProps {
  images: Image[];
  currentImageIndex: number;
  lightboxOpen: boolean;
  closeLightbox: () => void;
  nextImage: () => void;
  prevImage: () => void;
}

/**
 * Optimized lightbox component with mobile-first loading strategies
 */
const Lightbox: React.FC<LightboxProps> = ({ 
  images, 
  currentImageIndex, 
  lightboxOpen, 
  closeLightbox, 
  nextImage, 
  prevImage 
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Required min distance for a swipe (in px) - shorter distance on mobile
  const minSwipeDistance = window.innerWidth < 640 ? 30 : 50;
  
  // Determine if we should preload the next and previous images
  const isMobile = useMemo(() => window.innerWidth < 640, []);
  
  // Memoize event handlers to prevent unnecessary re-renders
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Prevent default behavior only on mobile
    if (isMobile) e.preventDefault();
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, [isMobile]);
  
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    // Prevent default behavior only on mobile
    if (isMobile) e.preventDefault();
    setTouchEnd(e.targetTouches[0].clientX);
  }, [isMobile]);
  
  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    // Only allow swiping if there are more images
    if (isLeftSwipe && currentImageIndex < images.length - 1) {
      nextImage();
    } else if (isRightSwipe && currentImageIndex > 0) {
      prevImage();
    }
    
    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, currentImageIndex, images.length, minSwipeDistance, nextImage, prevImage]);
  
  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);
  
  // Reset loading state when image changes
  useEffect(() => {
    if (lightboxOpen) {
      setIsLoading(true);
    }
  }, [currentImageIndex, lightboxOpen]);
  
  // Calculate optimal image size based on viewport
  const optimizedImageUrl = useMemo(() => {
    if (!lightboxOpen || !images || images.length === 0) return '';
    
    const currentImage = images[currentImageIndex];
    // Use smaller images on mobile to improve load time
    return imagePresets.lightbox(currentImage.src);
  }, [lightboxOpen, images, currentImageIndex]);
  
  // Preload adjacent images for smoother navigation
  // Only preload on non-mobile or high-bandwidth environments
  useEffect(() => {
    if (lightboxOpen && images?.length > 0 && !isMobile) {
      // Limited preloading on mobile
      const preloadCount = isMobile ? 1 : 2;
      
      // Preload next images if available
      for (let i = 1; i <= preloadCount; i++) {
        if (currentImageIndex + i < images.length) {
          const img = new Image();
          img.src = imagePresets.lightbox(images[currentImageIndex + i].src);
        }
      }
      
      // Preload previous images if available
      for (let i = 1; i <= preloadCount; i++) {
        if (currentImageIndex - i >= 0) {
          const img = new Image();
          img.src = imagePresets.lightbox(images[currentImageIndex - i].src);
        }
      }
    }
  }, [currentImageIndex, lightboxOpen, images, isMobile]);
  
  // Return null if lightbox is closed or no images
  if (!lightboxOpen || !images || images.length === 0) return null;
  
  const currentImage = images[currentImageIndex];
  const isFirstImage = currentImageIndex === 0;
  const isLastImage = currentImageIndex === images.length - 1;
  
  return (
    <div 
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button - larger target area on mobile */}
      <button 
        className="absolute top-4 right-4 text-black text-3xl bg-transparent border-none cursor-pointer z-50 p-3
                  opacity-60 hover:opacity-100 transition-opacity"
        onClick={closeLightbox}
        aria-label="Close lightbox"
        style={{ touchAction: 'manipulation' }} // Improve touch response
      >
        ×
      </button>
      
      {/* Image counter - more visible on mobile */}
      <div className="absolute top-5 left-5 text-black text-sm md:text-xs opacity-60 font-medium">
        {currentImageIndex + 1} / {images.length}
      </div>
      
      {/* Loading indicator - visible while image loads */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-gray-800 border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Image container - fills viewport better on mobile */}
      <div className="flex items-center justify-center h-screen w-full">
        <div 
          ref={imageRef}
          className="max-w-full max-h-full"
          style={{ touchAction: 'none' }}
        >
          <OptimizedImage
            src={currentImage.src}
            alt={currentImage.alt}
            preset="lightbox"
            onLoad={handleImageLoad}
            className="max-w-full max-h-full object-contain transition-opacity duration-300"
            style={{ 
              opacity: isLoading ? 0 : 1,
              touchAction: 'none', // Prevent browser handling of touch events
              maxHeight: '85vh'
            }}
            loading="eager"
            priority="high"
            orientation={currentImage.orientation === 'portrait' ? 'portrait' : 'landscape'}
            customOptions={{
              width: window.innerWidth < 640 ? 800 : 1600,
              quality: 'auto',
              effects: ['auto_color']
            }}
          />
        </div>
      </div>
      
      {/* Navigation buttons - hidden on small screens, rely on swipe instead */}
      {!isFirstImage && (
        <button 
          className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer
                    text-2xl text-black p-5 opacity-60 hover:opacity-100 transition-opacity md:block hidden"
          onClick={prevImage}
          aria-label="Previous image"
        >
          ←
        </button>
      )}
      
      {!isLastImage && (
        <button 
          className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer
                    text-2xl text-black p-5 opacity-60 hover:opacity-100 transition-opacity md:block hidden"
          onClick={nextImage}
          aria-label="Next image"
        >
          →
        </button>
      )}
      
      {/* Mobile swipe hint - more visible on mobile */}
      <div className="absolute bottom-5 left-0 right-0 text-center text-gray-500 text-sm md:hidden font-medium">
        Swipe left or right to navigate
      </div>
    </div>
  );
};

export default memo(Lightbox);