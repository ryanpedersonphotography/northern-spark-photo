// Import React and necessary hooks/components
import React, { useState } from 'react';
// Import Cloudinary utility functions and types
import generateImageUrl, {
  generatePlaceholderUrl,
  generateSrcSet,
  ImageQuality
} from '../utils/cloudinary';
// Import the Image type definition
import { Image } from '../interfaces/Image';

// Define the props expected by the ImageGrid component
interface ImageGridProps {
  images: Image[]; // Array of image objects to display
  windowWidth: number; // Current window width for responsive grid layout
  openLightbox: (index: number) => void; // Function to open the lightbox for a specific image index
}

/**
 * ImageGrid Component
 * Displays a responsive grid of images with placeholders and hover effects.
 * Handles opening the lightbox when an image is clicked.
 */
const ImageGrid: React.FC<ImageGridProps> = ({ images, windowWidth, openLightbox }) => {
  // State to track which images have finished loading their main, high-quality version.
  // Uses a record (object) where keys are publicIds and values are booleans.
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  /**
   * Determines the grid styling based on the current window width.
   * @returns {React.CSSProperties} CSS style object for the grid container.
   */
  const getGridStyle = (): React.CSSProperties => {
    // Uses Tailwind-like breakpoints for responsiveness
    if (windowWidth < 640) { // Small screens (mobile) - 1 column
      return {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1rem' // Gap between grid items
      };
    } else if (windowWidth < 1024) { // Medium screens (tablet) - 2 columns
      return {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
      };
    } else { // Large screens (desktop) - 3 columns
      return {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '1rem'
      };
    }
  };

  /**
   * Callback function triggered when a main image finishes loading.
   * Updates the loadedImages state to mark the specific image as loaded.
   * @param {string} publicId - The public ID of the image that loaded.
   */
  const handleImageLoaded = (publicId: string) => {
    setLoadedImages(prevState => ({
      ...prevState, // Keep existing loaded states
      [publicId]: true // Mark this image as loaded
    }));
  };

  // Render the grid container
  return (
    <div style={getGridStyle()}>
      {/* Map over the images array to render each image item */}
      {images.map((image, index) => {
        // Generate necessary URLs using Cloudinary utilities
        const placeholderUrl = generatePlaceholderUrl(image.publicId); // Tiny, blurred placeholder
        const imageUrl = generateImageUrl(image.publicId, 1200); // Main image URL (default width 1200)
        // Responsive srcset for different screen sizes/resolutions
        const srcSet = generateSrcSet(image.publicId, [400, 800, 1200, 1600, 2000]);
        // Check if the current image is marked as loaded in the state
        const isLoaded = loadedImages[image.publicId] || false;

        // Safety check: If URL generation failed for the main image, skip rendering this item
        if (!imageUrl) {
          console.error(`Failed to generate URL for image with publicId: ${image.publicId}`);
          return null;
        }

        // Render the container for each grid image
        return (
          <div
            key={index} // Unique key for React list rendering
            className="overflow-hidden cursor-pointer relative" // Styling classes
            style={{
              margin: 0,
              padding: 0
              // gridRow and aspectRatio removed to allow natural image dimensions
            }}
            // Open the lightbox with the correct index when the image container is clicked
            onClick={() => openLightbox(index)}
          >
            {/* Render the low-quality image placeholder (LQIP) if the main image isn't loaded yet */}
            {!isLoaded && (
              <img
                src={placeholderUrl}
                alt={image.alt} // Use main image alt text
                className="w-full h-full object-cover absolute inset-0" // Position placeholder behind main image
                style={{
                  filter: 'blur(10px)', // Apply blur effect
                  transform: 'scale(1.1)', // Scale slightly larger to avoid blurred edges showing
                  transition: 'opacity 0.2s ease', // Fade out transition
                  opacity: isLoaded ? 0 : 1 // Control visibility based on load state
                }}
              />
            )}

            {/* Render the main, high-quality image */}
            <img
              src={imageUrl} // Default src
              srcSet={srcSet} // Responsive image sources
              // Define how the browser should select from srcSet based on viewport width
              sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`}
              alt={image.alt} // Image description
              className="w-full object-cover block" // Removed h-full
              style={{
                transition: 'transform 0.5s ease, opacity 0.3s ease', // Transitions for hover and load-in
                // Apply slight scale-up and fade-in effect when loaded
                transform: isLoaded ? 'scale(1)' : 'scale(0.95)',
                opacity: isLoaded ? 1 : 0
              }}
              // Apply hover effect (scale up) only after the image is loaded
              onMouseOver={(e) => {
                if (isLoaded) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              // Reset scale on mouse out if loaded
              onMouseOut={(e) => {
                if (isLoaded) {
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
              // Callback when the main image finishes loading
              onLoad={() => handleImageLoaded(image.publicId)}
              // Native lazy/eager loading attribute
              // Eagerly load the first few images (likely above the fold), lazy load the rest.
              loading={index < 6 ? "eager" : "lazy"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;
