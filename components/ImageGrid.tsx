import React from 'react';
import Masonry from 'react-masonry-css';

interface Image {
  src: string;
  alt: string;
  orientation: string; // Keep orientation for potential future use, though Masonry handles layout
}

interface ImageGridProps {
  images: Image[];
  windowWidth: number; // Keep windowWidth for breakpoint calculation if needed, though Masonry handles columns
  openLightbox: (index: number) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, openLightbox }) => {

  // Define breakpoints for Masonry columns
  const breakpointColumnsObj = {
    default: 3, // Default number of columns
    1024: 3,    // 3 columns for screens >= 1024px
    768: 2,     // 2 columns for screens >= 768px
    640: 1      // 1 column for screens < 640px (adjust if needed)
  };

  // Create a simple mapping from original index to image data for lightbox
  // Masonry might reorder items visually, but we need the original index
  const imageMap = images.map((img, idx) => ({ ...img, originalIndex: idx }));

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid flex w-auto" // Use flex display for columns
      columnClassName="my-masonry-grid_column bg-clip-padding px-2" // Add padding for gap effect
    >
      {/* Map over the images */}
      {imageMap.map((image) => (
        <div
          key={image.originalIndex} // Use original index for stable key
          className="mb-4" // Vertical gap between items in a column
          style={{
            overflow: 'hidden', // Keep overflow hidden
            cursor: 'pointer',
          }}
          onClick={() => openLightbox(image.originalIndex)} // Pass original index to lightbox
        >
          <img
            // Use w_1200 for grid thumbnails, rely on base f_auto,q_auto for quality
            src={image.src.replace('/upload/', '/upload/w_1200,')}
            alt={image.alt}
            style={{
              width: '100%', // Image takes full width of column
              height: 'auto', // Height adjusts automatically
              objectFit: 'cover', // Cover maintains aspect ratio, might crop
              transition: 'transform 0.5s ease',
              display: 'block' // Remove potential extra space below image
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            // Eager load the first few images (likely above the fold), lazy load the rest
            // Adjust threshold based on typical number of images visible initially in Masonry
            loading={image.originalIndex < 3 ? "eager" : "lazy"}
            fetchPriority={image.originalIndex < 3 ? "high" : "auto"}
          />
        </div>
      ))}
    </Masonry>
  );
};

export default ImageGrid;
