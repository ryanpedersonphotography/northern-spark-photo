import React from 'react';

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

const ImageGrid: React.FC<ImageGridProps> = ({ images, windowWidth, openLightbox }) => {
  // Determine number of columns based on screen width
  const getGridStyle = () => {
    // VSCO-style layout with completely uniform spacing
    const uniformGap = '8px'; // Uniform gap for all directions
    
    if (windowWidth < 640) {
      return {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: uniformGap, // Same gap for row and column
        padding: uniformGap, // Same padding on all sides
        boxSizing: 'border-box' as 'border-box',
        width: '100%'
      };
    } else if (windowWidth < 1024) {
      return {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: uniformGap, // Same gap for row and column
        padding: uniformGap, // Same padding on all sides
        boxSizing: 'border-box' as 'border-box',
        width: '100%'
      };
    } else {
      return {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: uniformGap, // Same gap for row and column
        padding: uniformGap, // Same padding on all sides
        boxSizing: 'border-box' as 'border-box',
        width: '100%'
      };
    }
  };

  return (
    <div style={getGridStyle()}>
      {images.map((image, index) => (
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
            // No border radius or shadow for VSCO-like clean look
          }}
          onClick={() => openLightbox(index)}
        >
          <div className="w-full h-full bg-gray-200 relative">
            {/* Low quality image placeholder */}
            <img
              src={image.src.replace('/upload/f_auto,q_auto', '/upload/f_auto,q_auto:low,w_20,e_blur:1000')}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-lg"
              aria-hidden="true"
            />
            {/* Main image */}
            <img
              // Use w_1200 and q_auto:best for grid thumbnails to enhance HDR quality with reasonable performance
              src={image.src.replace('/upload/f_auto,q_auto', '/upload/f_auto,q_auto:best,w_1200')}
              alt={image.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease, opacity 0.3s ease',
                // Ensure image fills the aspect-ratio container
                display: 'block',
                position: 'relative',
                zIndex: 1
              }}
              onMouseOver={(e) => {
                // Only apply hover effect on non-touch devices
                if (window.matchMedia('(hover: hover)').matches) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              onMouseOut={(e) => {
                if (window.matchMedia('(hover: hover)').matches) {
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
              onLoad={(e) => e.currentTarget.style.opacity = '1'} 
              // Better touch feedback for mobile devices
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.opacity = '0.9';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.opacity = '1';
              }}
              onTouchCancel={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.opacity = '1';
              }}
              // Start with opacity 0 and reveal when loaded
              className="opacity-0"
              // Eager load the first few images (likely above the fold), lazy load the rest
              loading={index < 3 ? "eager" : "lazy"}
              fetchPriority={index < 3 ? "high" : "auto"}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
