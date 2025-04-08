import React, { useState } from 'react';
import generateImageUrl, { 
  generatePlaceholderUrl, 
  generateSrcSet, 
  ImageQuality 
} from '../utils/cloudinary.ts'; 
import { Image } from '../types.ts';

interface ImageGridProps {
  images: Image[];
  windowWidth: number;
  openLightbox: (index: number) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, windowWidth, openLightbox }) => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  // Determine number of columns based on screen width
  const getGridStyle = () => {
    // Explicit grid layout based on window width
    if (windowWidth < 640) {
      return {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1rem'
      };
    } else if (windowWidth < 1024) {
      return {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
      };
    } else {
      return {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '1rem'
      };
    }
  };

  // Handle image load completion
  const handleImageLoaded = (publicId: string) => {
    setLoadedImages(prevState => ({
      ...prevState,
      [publicId]: true
    }));
  };

  return (
    <div style={getGridStyle()}>
      {images.map((image, index) => {
        // Generate image URLs
        const placeholderUrl = generatePlaceholderUrl(image.publicId);
        const imageUrl = generateImageUrl(image.publicId, 1200);
        const srcSet = generateSrcSet(image.publicId, [400, 800, 1200, 1600, 2000]);
        const isLoaded = loadedImages[image.publicId] || false;
        
        // Check if imageUrl is valid before rendering
        if (!imageUrl) {
          console.error(`Failed to generate URL for image with publicId: ${image.publicId}`);
          return null; // Skip rendering this image if URL generation failed
        }

        return (
          <div
            key={index}
            className="overflow-hidden cursor-pointer relative"
            style={{
              margin: 0,
              padding: 0,
              gridRow: image.orientation === 'portrait' ? 'span 2' : 'span 1',
              // Add aspect-ratio to reserve space and prevent layout shift
              aspectRatio: image.orientation === 'portrait' ? '2 / 3' : '3 / 2'
            }}
            onClick={() => openLightbox(index)}
          >
            {/* Blur-up placeholder (very small, low quality image) */}
            {!isLoaded && (
              <img
                src={placeholderUrl}
                alt={image.alt}
                className="w-full h-full object-cover absolute inset-0"
                style={{
                  filter: 'blur(10px)',
                  transform: 'scale(1.1)', // Slightly larger to cover blur edges
                  transition: 'opacity 0.2s ease',
                  opacity: isLoaded ? 0 : 1
                }}
              />
            )}
            
            {/* Main image with srcSet for responsive loading */}
            <img
              src={imageUrl}
              srcSet={srcSet}
              sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`}
              alt={image.alt}
              className="w-full h-full object-cover block"
              style={{
                transition: 'transform 0.5s ease, opacity 0.3s ease',
                transform: isLoaded ? 'scale(1)' : 'scale(0.95)',
                opacity: isLoaded ? 1 : 0
              }}
              onMouseOver={(e) => {
                if (isLoaded) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              onMouseOut={(e) => {
                if (isLoaded) {
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
              onLoad={() => handleImageLoaded(image.publicId)}
              loading={index < 6 ? "eager" : "lazy"} // Eagerly load first 6 images
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;