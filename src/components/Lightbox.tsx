// Import React and necessary hooks/components
import React, { useEffect, useState, useRef } from 'react';
// Import Cloudinary utility functions and types
import { // Use named imports now that default export might change
  generateImageUrl, 
  generatePlaceholderUrl, 
  generateRawImageUrl, // Import the new function
  ImageQuality 
} from '../utils/cloudinary';
// Import the Image type definition using type-only import to avoid naming conflicts
import type { Image } from '../interfaces/Image';

// Define the props expected by the Lightbox component
interface LightboxProps {
  images: Image[]; // Array of image objects available for the lightbox
  currentImageIndex: number; // Index of the currently displayed image in the 'images' array
  lightboxOpen: boolean; // Boolean indicating if the lightbox is currently visible
  closeLightbox: () => void; // Function to close the lightbox
  nextImage: () => void; // Function to navigate to the next image
  prevImage: () => void; // Function to navigate to the previous image
}

/**
 * Lightbox Component
 * Displays a full-screen view of an image with navigation controls (prev/next/close).
 * Handles keyboard and touch navigation, preloads adjacent images, and shows placeholders.
 */
const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentImageIndex,
  lightboxOpen,
  closeLightbox,
  nextImage,
  prevImage
}) => {
  // State to track if the main high-quality image is still loading
  const [isLoading, setIsLoading] = useState(true);
  // State to control the visibility of the blurred placeholder image
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  // Ref to store preloaded HTMLImageElement objects for adjacent images
  const preloadedImages = useRef<Record<number, HTMLImageElement>>({});
  // Ref to store AbortController instances for ongoing preload requests
  const preloadAbortControllers = useRef<Record<number, AbortController>>({});

  // --- Hooks --- (Called unconditionally at the top)

  // Effect to reset loading states whenever the currentImageIndex changes
  useEffect(() => {
    setIsLoading(true); // Assume the new image is loading
    setShowPlaceholder(true); // Show the placeholder initially
  }, [currentImageIndex]); // Dependency: run only when the index changes

  // Effect to handle keyboard navigation (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if lightbox isn't open or images aren't available
      if (!lightboxOpen || !images || images.length === 0) return;

      // Determine if we are at the first or last image within the hook's scope
      const first = currentImageIndex === 0;
      const last = currentImageIndex === images.length - 1;

      // Handle key presses
      switch (e.key) {
        case 'ArrowLeft':
          if (!first) prevImage(); // Go to previous if not the first image
          break;
        case 'ArrowRight':
          if (!last) nextImage(); // Go to next if not the last image
          break;
        case 'Escape':
          closeLightbox(); // Close lightbox on Escape key
          break;
        default:
          break; // Ignore other keys
      }
    };

    // Add event listener when the component mounts or dependencies change
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function: remove event listener when component unmounts or dependencies change
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // Dependencies: re-run effect if any of these change
  }, [lightboxOpen, nextImage, prevImage, closeLightbox, currentImageIndex, images]);

  // Effect to handle touch swipe navigation (left/right swipes)
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    // Record the starting X position of the touch
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    // Record the ending X position and trigger swipe logic
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    // Determine swipe direction and trigger navigation if distance threshold is met
    const handleSwipe = () => {
      // Ignore if images aren't available
      if (!images || images.length === 0) return;

      // Determine if we are at the first or last image
      const first = currentImageIndex === 0;
      const last = currentImageIndex === images.length - 1;

      const minSwipeDistance = 50; // Minimum pixels to be considered a swipe
      const distance = touchEndX - touchStartX; // Positive for right swipe, negative for left

      // Ignore swipes shorter than the minimum distance
      if (Math.abs(distance) < minSwipeDistance) return;

      if (distance > 0 && !first) { // Swiped right
        prevImage();
      } else if (distance < 0 && !last) { // Swiped left
        nextImage();
      }
    };

    // Add listeners only if the lightbox is open
    if (lightboxOpen) {
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchend', handleTouchEnd);
    }

    // Cleanup function: remove listeners
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
    // Dependencies: re-run effect if any of these change
  }, [lightboxOpen, nextImage, prevImage, currentImageIndex, images]);

  // Effect to preload the next and previous images for smoother navigation
  useEffect(() => {
    // Only run if lightbox is open and there are multiple images
    if (lightboxOpen && images.length > 1) {
      // Cancel any preloading requests that might still be running from previous state
      Object.values(preloadAbortControllers.current).forEach(controller => {
        controller.abort();
      });
      preloadAbortControllers.current = {}; // Clear the controllers ref

      // Function to handle preloading a single image by its index
      const preloadImage = (index: number) => {
        // Skip if index is invalid or image is already preloaded
        if (index < 0 || index >= images.length || preloadedImages.current[index]) return;

        const img = new Image(); // Create a new Image object (uses browser's Image constructor)
        const publicId = images[index].publicId;

        // Create an AbortController to allow cancelling this specific preload request
        const controller = new AbortController();
        preloadAbortControllers.current[index] = controller;

        // Event handler for successful preload
        img.onload = () => {
          // Only store the preloaded image if the request wasn't aborted
          if (!controller.signal.aborted) {
            preloadedImages.current[index] = img; // Store in ref
            delete preloadAbortControllers.current[index]; // Remove controller
          }
        };

        // Event handler for preload error
        img.onerror = () => {
          delete preloadAbortControllers.current[index]; // Remove controller
          console.error(`Failed to preload image: ${publicId}`);
        };

        // Set the src to start loading the image (using high quality and HDR for lightbox)
        img.src = generateImageUrl(publicId, 1600, undefined, ImageQuality.HIGH, true);
      };

      // Trigger preload for the next image if it exists
      if (currentImageIndex < images.length - 1) {
        preloadImage(currentImageIndex + 1);
      }
      // Trigger preload for the previous image if it exists
      if (currentImageIndex > 0) {
        preloadImage(currentImageIndex - 1);
      }

      // Cleanup function: Abort all ongoing preload requests when effect dependencies change or component unmounts
      return () => {
        Object.values(preloadAbortControllers.current).forEach(controller => {
          controller.abort();
        });
      };
    }
    // Dependencies: Re-run preload logic if index, images array, or lightbox visibility changes
  }, [currentImageIndex, images, lightboxOpen]);

  // --- Render Logic ---

  // Callback function triggered when the main high-quality image finishes loading
  const handleMainImageLoaded = () => {
    setIsLoading(false); // Set loading state to false
    // Use a short timeout before hiding the placeholder for a smoother visual transition
    setTimeout(() => {
      setShowPlaceholder(false);
    }, 300); // 300ms delay
  };

  // Early return: If lightbox shouldn't be open or there are no images, render nothing.
  if (!lightboxOpen || !images || images.length === 0) {
    return null;
  }

  // Get the data for the currently selected image *after* the early return check
  const currentImage = images[currentImageIndex];
  // Extra safety check in case the index is somehow invalid
  if (!currentImage) {
    console.error("Lightbox: Invalid currentImageIndex or images array.");
    return null;
  }

  // Generate the URLs for the placeholder and the main image *after* confirming currentImage is valid
  const placeholderUrl = generatePlaceholderUrl(currentImage.publicId);
  // Use the new function for the main image URL to get raw version (f_auto, q_auto only)
  const mainImageUrl = generateRawImageUrl(currentImage.publicId); 

  // Handle potential failure during URL generation
  if (!mainImageUrl) {
    console.error(`Lightbox: Failed to generate URL for ${currentImage.publicId}`);
    // Render an error message within the lightbox structure
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center text-white">
        Error loading image URL.
      </div>
    );
  }

  // Determine if the current image is the first or the last in the array
  const isFirstImage = currentImageIndex === 0;
  const isLastImage = currentImageIndex === images.length - 1;

  // --- JSX Return ---
  // Render the main lightbox structure
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Close Button (Top Right) */}
      <button
        className="absolute top-5 right-5 text-white text-4xl bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center border border-white cursor-pointer z-50 hover:bg-opacity-70 shadow-lg"
        onClick={closeLightbox}
        aria-label="Close lightbox"
      >
        ×
      </button>

      {/* Image Counter (Top Left) */}
      <div className="absolute top-5 left-5 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm z-40">
        {currentImageIndex + 1} / {images.length}
      </div>

      {/* Main Image Display Area */}
      <div className="flex items-center justify-center h-screen w-full relative">
        {/* Loading Spinner (visible while isLoading is true) */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="w-20 h-20 border-4 border-gray-400 border-t-white rounded-full animate-spin shadow-lg"></div>
          </div>
        )}

        {/* Blurred Placeholder Image (visible while showPlaceholder is true) */}
        {showPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={placeholderUrl}
              alt={`Loading ${currentImage.alt}`}
              className="w-full h-full object-cover" // Cover the area
              style={{
                filter: 'blur(15px)', // Apply blur
                transform: 'scale(1.05)', // Scale up slightly
                transition: 'opacity 0.5s ease', // Fade out transition
                opacity: isLoading ? 0.7 : 0 // Fade out when main image loads
              }}
            />
          </div>
        )}

        {/* Main High-Quality Image */}
        <img
          src={mainImageUrl}
          alt={currentImage.alt}
          className="transition-opacity duration-300" // Apply transition class
          style={{
            width: '100vw', // Full viewport width
            height: '100vh', // Full viewport height
            objectFit: 'contain', // Ensure entire image is visible, no cropping
            opacity: isLoading ? 0 : 1, // Fade in when loaded
            transition: 'opacity 0.5s ease' // Smooth fade-in
          }}
          onLoad={handleMainImageLoaded} // Callback when image finishes loading
          onError={(e) => { // Handle loading errors
            const errorSrc = currentImage.publicId || (e.target as HTMLImageElement).src;
            console.error('Image failed to load:', errorSrc);
            setIsLoading(false); // Stop showing spinner on error
          }}
        />
      </div>

      {/* Navigation Buttons (Left/Right Arrows) */}
      {/* Previous Button (shown only if not the first image) */}
      {!isFirstImage && (
        <button
          className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center border border-white cursor-pointer shadow-lg"
          onClick={prevImage}
          aria-label="Previous image"
        >
          ←
        </button>
      )}
      {/* Next Button (shown only if not the last image) */}
      {!isLastImage && (
        <button
          className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center border border-white cursor-pointer shadow-lg"
          onClick={nextImage}
          aria-label="Next image"
        >
          →
        </button>
      )}
    </div>
  );
};

export default Lightbox;
