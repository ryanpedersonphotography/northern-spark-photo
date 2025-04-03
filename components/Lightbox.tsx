import React, { useEffect, useRef, useState } from 'react';

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && !isLastImage) {
      nextImage();
    } else if (isRightSwipe && !isFirstImage) {
      prevImage();
    }
    
    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Preload next and previous images for smoother transitions
  useEffect(() => {
    if (lightboxOpen && images && images.length > 0) {
      // Preload current image
      setIsLoading(true);
      
      // Preload adjacent images
      if (currentImageIndex < images.length - 1) {
        const nextImg = new Image();
        nextImg.src = images[currentImageIndex + 1].src.replace('/upload/f_auto,q_auto', '/upload/f_auto,q_auto:best,w_1600');
      }
      
      if (currentImageIndex > 0) {
        const prevImg = new Image();
        prevImg.src = images[currentImageIndex - 1].src.replace('/upload/f_auto,q_auto', '/upload/f_auto,q_auto:best,w_1600');
      }
    }
  }, [currentImageIndex, lightboxOpen, images]);

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
      <button 
        className="absolute top-5 right-5 text-black text-2xl bg-transparent border-none cursor-pointer z-50 opacity-60 hover:opacity-100"
        onClick={closeLightbox}
        aria-label="Close lightbox"
      >
        ×
      </button>
      
      <div className="absolute top-5 left-5 text-black text-sm opacity-60">
        {currentImageIndex + 1} / {images.length}
      </div>
      
      <div className="flex items-center justify-center h-screen w-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          ref={imageRef}
          // Enhanced quality for lightbox view to showcase HDR images
          src={currentImage.src.replace('/upload/f_auto,q_auto', '/upload/f_auto,q_auto:best,w_1600')}
          alt={currentImage.alt}
          onLoad={handleImageLoad}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease'
          }}
        />
      </div>
      
      {/* Alt text is still used for accessibility in the img tag, but not displayed visually here */}
      
      {!isFirstImage && (
        <button 
          className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer text-2xl text-black p-5 opacity-60 hover:opacity-100 md:block hidden"
          onClick={prevImage}
          aria-label="Previous image"
        >
          ←
        </button>
      )}
      
      {!isLastImage && (
        <button 
          className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer text-2xl text-black p-5 opacity-60 hover:opacity-100 md:block hidden"
          onClick={nextImage}
          aria-label="Next image"
        >
          →
        </button>
      )}
      
      <div className="absolute bottom-5 left-0 right-0 text-center text-gray-500 text-sm md:hidden">
        Swipe left or right to navigate
      </div>
    </div>
  );
};

export default Lightbox;
