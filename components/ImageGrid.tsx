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
          }}
          onClick={() => openLightbox(index)}
        >
          <img
            // Use w_1200 for grid thumbnails, rely on base f_auto,q_auto for quality
            src={image.src.replace('/upload/', '/upload/w_1200,')}
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
            fetchPriority={index < 3 ? "high" : "auto"}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
