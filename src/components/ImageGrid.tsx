// Import React and necessary hooks/components
import React from 'react';
// Import the Masonry component
import Masonry from 'react-masonry-css';
// Import Cloudinary components and plugins
import { AdvancedImage, lazyload, responsive, placeholder } from '@cloudinary/react';
// Import Cloudinary utility functions and types
import { cld, fill, quality, format, dpr, grayscale } from "../utils/cloudinary";
// Import the Image type definition
import { Image } from '../interfaces/Image';

// Define the props expected by the ImageGrid component
interface ImageGridProps {
  images: Image[]; // Array of image objects to display
  // windowWidth is no longer needed as breakpoints are handled by react-masonry-css
  openLightbox: (index: number) => void; // Function to open the lightbox for a specific image index
}

/**
 * ImageGrid Component
 * Displays a responsive masonry layout of images using react-masonry-css.
 * Includes placeholders and hover effects.
 * Handles opening the lightbox when an image is clicked.
 */
const ImageGrid: React.FC<ImageGridProps> = ({ images, openLightbox }) => {
  

  // Define breakpoints for the masonry layout columns
  const breakpointColumnsObj = {
    default: 3, // Default number of columns (desktop)
    1024: 2,    // 2 columns at 1024px screen width and below
    640: 1      // 1 column at 640px screen width and below
  };

  // Render the Masonry layout container
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid" // Custom class for the grid container
      columnClassName="my-masonry-grid_column" // Custom class for columns
    >
      {/* Map over the images array to render each image item within a column */}
      {images.map((image, index) => {
        // Create a Cloudinary image with transformations
        const cldImage = cld.image(image.publicId);
        
        // Apply the same transformations as in the original generateImageUrl function
        cldImage
          .resize(fill().width(1200).gravity('auto'))
          .addTransformation('e_enhance')
          .addTransformation('e_auto_contrast')
          .delivery(quality('auto:good'))
          .addTransformation('fl_progressive')
          .delivery(dpr('auto'))
          .delivery(format('jpg'));

        // Render the container for each grid image
        return (
          <div
            key={index}
            className="overflow-hidden cursor-pointer relative"
            style={{ marginBottom: '1rem' }}
            onClick={() => openLightbox(index)}
          >
            <AdvancedImage
              cldImg={cldImage}
              plugins={[
                // Responsive plugin handles different screen sizes
                responsive({ steps: [400, 800, 1200, 1600, 2000] }),
                // Placeholder plugin creates a blurred loading effect
                placeholder({ mode: 'blur' }),
                // Lazyload plugin defers loading until the image is near the viewport
                lazyload({ rootMargin: '10px 20px 10px 30px', threshold: 0.25 })
              ]}
              alt={image.alt}
              className="w-full object-cover block transition-all duration-500 filter grayscale hover:grayscale-0 hover:scale-105"
            />
          </div>
        );
      })}
    </Masonry>
  );
};

export default ImageGrid;
