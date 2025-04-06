import React from 'react';

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
  if (!lightboxOpen || !images || images.length === 0) return null;
  
  const currentImage = images[currentImageIndex];
  const isFirstImage = currentImageIndex === 0;
  const isLastImage = currentImageIndex === images.length - 1;
  
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <button 
        className="absolute top-5 right-5 text-black text-2xl bg-transparent border-none cursor-pointer z-50 opacity-60 hover:opacity-100"
        onClick={closeLightbox}
      >
        ×
      </button>
      
      {/* Image counter removed per client request */}
      
      <div className="flex items-center justify-center h-screen w-full">
        <img
          // Using Cloudinary's intelligent cropping with auto-gravity
          src={currentImage.src.replace(
            /\/upload\/.*?\/v(\d+)\//,
            '/upload/c_fill,g_auto,w_auto,dpr_auto,f_auto,q_auto/v$1/'
          )}
          alt={currentImage.alt}
          className="lightbox-image"
          style={{
            width: '100vw',
            height: '100vh',
            objectFit: 'cover'
          }}
        />
      </div>
      
      {/* Alt text is still used for accessibility in the img tag, but not displayed visually here */}
      
      {!isFirstImage && (
        <button 
          className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer text-2xl text-black p-5 opacity-60 hover:opacity-100"
          onClick={prevImage}
        >
          ←
        </button>
      )}
      
      {!isLastImage && (
        <button 
          className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer text-2xl text-black p-5 opacity-60 hover:opacity-100"
          onClick={nextImage}
        >
          →
        </button>
      )}
    </div>
  );
};

export default Lightbox;
