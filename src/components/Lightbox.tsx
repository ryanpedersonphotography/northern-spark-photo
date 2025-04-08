import React, { useEffect, useState, useRef } from 'react';
import generateImageUrl, { 
  generatePlaceholderUrl, 
  ImageQuality 
} from '../utils/cloudinary';
import type { Image } from '../interfaces/Image'; // Use type-only import

interface LightboxProps {
  images: Image[];
  currentImageIndex: number;
  lightboxOpen: boolean;
  closeLightbox: () => void;
  nextImage: () => void;
  prevImage: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentImageIndex,
  lightboxOpen,
  closeLightbox,
  nextImage,
  prevImage
}) => {
  // State for tracking image loading
  const [isLoading, setIsLoading] = useState(true);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  
  // Refs for preloaded images
  const preloadedImages = useRef<Record<number, HTMLImageElement>>({});
  const preloadAbortControllers = useRef<Record<number, AbortController>>({});

  // Split conditional return
  if (!lightboxOpen) return null; 
  if (!images || images.length === 0) return null;

  const currentImage = images[currentImageIndex];
  const isFirstImage = currentImageIndex === 0;
  const isLastImage = currentImageIndex === images.length - 1;

  // Reset loading state when image changes
  useEffect(() => {
    setIsLoading(true);
    setShowPlaceholder(true);
  }, [currentImageIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case 'ArrowLeft':
          if (!isFirstImage) prevImage();
          break;
        case 'ArrowRight':
          if (!isLastImage) nextImage();
          break;
        case 'Escape':
          closeLightbox();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, nextImage, prevImage, closeLightbox, isFirstImage, isLastImage]);

  // Handle touch navigation
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      // Minimum swipe distance (in px)
      const minSwipeDistance = 50;
      const distance = touchEndX - touchStartX;

      if (Math.abs(distance) < minSwipeDistance) return;

      if (distance > 0 && !isFirstImage) {
        // Swiped right -> show previous image
        prevImage();
      } else if (distance < 0 && !isLastImage) {
        // Swiped left -> show next image
        nextImage();
      }
    };

    if (lightboxOpen) {
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [lightboxOpen, nextImage, prevImage, isFirstImage, isLastImage]);

  // Preload adjacent images for smoother navigation with AbortController for cleanup
  useEffect(() => {
    if (lightboxOpen && images.length > 1) {
      // Cancel any previous preloads
      Object.values(preloadAbortControllers.current).forEach(controller => {
        controller.abort();
      });
      preloadAbortControllers.current = {};

      // Preload function
      const preloadImage = (index: number) => {
        if (index < 0 || index >= images.length || preloadedImages.current[index]) return;
        
        const img = new Image();
        const publicId = images[index].publicId;
        
        // Create an AbortController for this preload
        const controller = new AbortController();
        preloadAbortControllers.current[index] = controller;
        
        // Add event listeners
        img.onload = () => {
          if (!controller.signal.aborted) {
            preloadedImages.current[index] = img;
            delete preloadAbortControllers.current[index];
          }
        };
        
        img.onerror = () => {
          delete preloadAbortControllers.current[index];
          console.error(`Failed to preload image: ${publicId}`);
        };
        
        // Start loading
        img.src = generateImageUrl(publicId, 1600, undefined, ImageQuality.HIGH, true);
      };

      // Preload next and previous images
      if (currentImageIndex < images.length - 1) {
        preloadImage(currentImageIndex + 1);
      }
      
      if (currentImageIndex > 0) {
        preloadImage(currentImageIndex - 1);
      }

      // Cleanup function
      return () => {
        Object.values(preloadAbortControllers.current).forEach(controller => {
          controller.abort();
        });
      };
    }
  }, [currentImageIndex, images, lightboxOpen]);

  // Generate URLs for the current image
  const placeholderUrl = generatePlaceholderUrl(currentImage.publicId);
  const mainImageUrl = generateImageUrl(
    currentImage.publicId, 
    1920, 
    undefined, 
    ImageQuality.HIGH, 
    true // Enable HDR for lightbox view
  );

  // Handle case where URL generation fails
  if (!mainImageUrl) {
    console.error(`Failed to generate URL for main lightbox image: ${currentImage.publicId}`);
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center text-white">
        Error loading image.
      </div>
    );
  }

  // Handle main image load event
  const handleMainImageLoaded = () => {
    setIsLoading(false);
    // Hide placeholder after slight delay for smoother transition
    setTimeout(() => {
      setShowPlaceholder(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <button
        className="absolute top-5 right-5 text-white text-4xl bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center border border-white cursor-pointer z-50 hover:bg-opacity-70 shadow-lg"
        onClick={closeLightbox}
        aria-label="Close lightbox"
      >
        ×
      </button>

      {/* Image counter */}
      <div className="absolute top-5 left-5 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm z-40">
        {currentImageIndex + 1} / {images.length}
      </div>

      <div className="flex items-center justify-center h-screen w-full relative">
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="w-20 h-20 border-4 border-gray-400 border-t-white rounded-full animate-spin shadow-lg"></div>
          </div>
        )}

        {/* Blur placeholder image */}
        {showPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={placeholderUrl}
              alt={`Loading ${currentImage.alt}`}
              className="w-full h-full object-cover"
              style={{
                filter: 'blur(15px)',
                transform: 'scale(1.05)',
                transition: 'opacity 0.5s ease',
                opacity: isLoading ? 0.7 : 0
              }}
            />
          </div>
        )}

        {/* Main high quality image */}
        <img
          src={mainImageUrl}
          alt={currentImage.alt}
          className="transition-opacity duration-300"
          style={{
            width: '100vw',
            height: '100vh',
            objectFit: 'contain',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.5s ease'
          }}
          onLoad={handleMainImageLoaded}
          onError={(e) => {
            const errorSrc = currentImage.publicId || (e.target as HTMLImageElement).src;
            console.error('Image failed to load:', errorSrc);
            setIsLoading(false);
          }}
        />
      </div>

      {/* Navigation buttons with improved visibility */}
      {!isFirstImage && (
        <button
          className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center border border-white cursor-pointer shadow-lg"
          onClick={prevImage}
          aria-label="Previous image"
        >
          ←
        </button>
      )}

      {!isLastImage && (
        <button
          className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center border border-white cursor-pointer shadow-lg"
          onClick={nextImage}
          aria-label="Next image"
        >
          →
        </button>
      )}
    </div>
  );
};

export default Lightbox;
