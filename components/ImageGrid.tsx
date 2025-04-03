import React from 'react';
import Masonry from 'react-masonry-css';

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
  // Define uniform spacing size
  const spacing = 16; // 16px spacing in all directions (doubled from 8px)
  
  // Configure Masonry breakpoints for responsive columns
  const breakpointColumns = {
    default: 3, // Default 3 columns for desktop
    1024: 3,    // 3 columns for large screens
    768: 2,     // 2 columns for tablets
    640: 1      // 1 column for mobile
  };

  // Add custom styles for masonry grid with perfectly uniform spacing
  const masonryStyles = `
    /* Custom masonry styles */
    .masonry-grid {
      display: flex;
      width: calc(100% + ${spacing}px); /* Compensate for gutter */
      margin-left: -${spacing}px; /* Negative margin to align grid */
      padding: ${spacing}px;
      box-sizing: border-box;
    }
    
    .masonry-grid-column {
      padding-left: ${spacing}px; /* gutter size */
      background-clip: padding-box;
    }
    
    /* Item styling */
    .masonry-item {
      margin-bottom: ${spacing}px;
      overflow: hidden;
      background-color: #f0f0f0;
      position: relative;
    }

    /* Container styling to maintain exact spacing */
    .masonry-container {
      padding: ${spacing}px;
      box-sizing: border-box;
    }
  `;

  return (
    <div className="masonry-container" style={{ backgroundColor: 'white' }}>
      <style>{masonryStyles}</style>
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {images.map((image, index) => (
          <div 
            key={index}
            className="masonry-item"
            style={{
              cursor: 'pointer',
              borderRadius: 0, // No border radius for clean look
              // Set natural aspect ratio based on orientation
              // Portrait images will be taller
              aspectRatio: image.orientation === 'portrait' ? '2/3' : '3/2',
              display: 'block'
            }}
            onClick={() => openLightbox(index)}
          >
            {/* Low quality image placeholder */}
            <div className="w-full h-full relative">
              <img
                src={image.src.replace('/upload/f_auto,q_auto', '/upload/f_auto,q_auto:low,w_20,e_blur:1000')}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-lg"
                aria-hidden="true"
              />
              {/* Main image */}
              <img
                src={image.src.replace('/upload/f_auto,q_auto', '/upload/f_auto,q_auto:best,w_1200')}
                alt={image.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease, opacity 0.3s ease',
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
                // Better touch feedback
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
                className="opacity-0" // Start hidden and fade in on load
                loading={index < 3 ? "eager" : "lazy"}
                fetchPriority={index < 3 ? "high" : "auto"}
              />
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default ImageGrid;
