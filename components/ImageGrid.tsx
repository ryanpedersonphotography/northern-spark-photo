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
            gridRow: image.orientation === 'portrait' ? 'span 2' : 'span 1'
          }}
          onClick={() => openLightbox(index)}
        >
          <img
            // Use w_1200 and fixed quality q_85 for grid thumbnails
            src={image.src.replace('/upload/', '/upload/w_1200,q_85,')}
            alt={image.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            // Apply lazy loading only to images after the first few (e.g., index 6+)
            loading={index >= 6 ? "lazy" : "eager"}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
