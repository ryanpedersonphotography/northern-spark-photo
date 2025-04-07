import React from 'react';
import cld from '../src/utils/cloudinary-instance'; // Corrected import path
import { fill } from "@cloudinary/url-gen/actions/resize";
import { quality } from "@cloudinary/url-gen/actions/delivery";
import { format } from "@cloudinary/url-gen/actions/delivery";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity"; // If needed for fill

import { Image } from '../src/types'; // Corrected import path for types

// Remove old interface definition
// interface Image {
//   src: string;
//   alt: string;
//   orientation: string;
// }
// Removed stray closing brace

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

  // Removed getPublicIdFromUrl helper function

  return (
    <div style={getGridStyle()}>
      {images.map((image, index) => {
        // Use image.publicId directly
        const imageUrl = cld.image(image.publicId)
            .resize(fill().width(1200).gravity(autoGravity())) // Use fill crop, specify width, auto-gravity
            .delivery(quality('auto:best')) // Set quality
            .delivery(format('auto')) // Set format
            .toURL();
        // No need for fallback or warning if publicId is guaranteed by the data structure
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
