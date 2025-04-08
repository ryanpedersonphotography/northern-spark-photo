import React from 'react';
import generateImageUrl from '../utils/cloudinary.ts'; // Import from consolidated utility
import { Image } from '../types'; // Corrected import path for types

interface ImageGridProps {
  images: Image[];
  windowWidth: number;
  openLightbox: (index: number) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, windowWidth, openLightbox }) => {
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

  return (
    <div style={getGridStyle()}>
      {images.map((image, index) => {
        // Use the helper function to generate the URL
        const imageUrl = generateImageUrl(image.publicId, 1200); // Pass publicId and desired width
        
        // Check if imageUrl is valid before rendering
        if (!imageUrl) {
          console.error(`Failed to generate URL for image with publicId: ${image.publicId}`);
          return null; // Skip rendering this image if URL generation failed
        }

        return (
          <div
          key={index}
          style={{
            overflow: 'hidden',
            cursor: 'pointer',
            margin: 0,
            padding: 0,
            gridRow: image.orientation === 'portrait' ? 'span 2' : 'span 1',
            // Add aspect-ratio to reserve space and prevent layout shift
            aspectRatio: image.orientation === 'portrait' ? '2 / 3' : '3 / 2'
          }}
          onClick={() => openLightbox(index)}
        >
          <img
            // Use the generated SDK URL
            src={imageUrl}
            alt={image.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              // Ensure image fills the aspect-ratio container
              display: 'block'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            // Eager load the first few images (likely above the fold), lazy load the rest
            loading={index < 3 ? "eager" : "lazy"}
            // Removed fetchPriority due to conflicting warnings/types
          />
        </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;
