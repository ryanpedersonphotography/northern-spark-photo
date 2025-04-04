import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import { imagePresets } from '../src/utils/cloudinary';

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
 * Optimized lightbox component with lazy loading and touch swipe support
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
  
  // Required min distance for a swipe (in px)
  const minSwipeDistance = 50;
  
  // Memoize event handlers to prevent unnecessary re-renders
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);
  
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);
  
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
  }, [touchStart, touchEnd, currentImageIndex, images, nextImage, prevImage]);
  
  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);
  
  // Reset loading state when image changes
  useEffect(() => {
    if (lightboxOpen) {
      setIsLoading(true);
    }
  }, [currentImageIndex, lightboxOpen]);
  
  // Preload adjacent images for smoother navigation
  useEffect(() => {
    if (lightboxOpen && images?.length > 0) {
      // Preload next image if available
      if (currentImageIndex < images.length - 1) {
        const nextImg = new Image();
        nextImg.src = imagePresets.lightbox(images[currentImageIndex + 1].src);
      }
      
      // Preload previous image if available
      if (currentImageIndex > 0) {
        const prevImg = new Image();
        prevImg.src = imagePresets.lightbox(images[currentImageIndex - 1].src);
      }
    }
  }, [currentImageIndex, lightboxOpen, images]);
  
  // Return null if lightbox is closed or no images
  if (!lightboxOpen || !images || images.length === 0) return null;
  
  const currentImage = images[currentImageIndex];
  const isFirstImage = currentImageIndex === 0;
  const isLastImage = currentImageIndex === images.length - 1;
  
  // Get optimized lightbox image URL
  const lightboxImageUrl = imagePresets.lightbox(currentImage.src);
  
  return (
    <div 
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button 
        className="absolute top-5 right-5 text-black text-2xl bg-transparent border-none cursor-pointer z-50 p-2 
                  opacity-60 hover:opacity-100 transition-opacity"
        onClick={closeLightbox}
        aria-label="Close lightbox"
      >
        ×
      </button>
      
      {/* Image counter */}
      <div className="absolute top-5 left-5 text-black text-sm opacity-60">
        {currentImageIndex + 1} / {images.length}
      </div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-gray-800 border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Image container */}
      <div className="flex items-center justify-center h-screen w-full">
        <img
          ref={imageRef}
          src={lightboxImageUrl}
          alt={currentImage.alt}
          onLoad={handleImageLoad}
          className="max-w-full max-h-full object-contain transition-opacity duration-300"
          style={{ opacity: isLoading ? 0 : 1 }}
        />
      </div>
      
      {/* Navigation buttons - only shown on larger screens */}
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
      
      {/* Mobile swipe hint */}
      <div className="absolute bottom-5 left-0 right-0 text-center text-gray-500 text-sm md:hidden">
        Swipe left or right to navigate
      </div>
    </div>
  );
};

export default memo(Lightbox);