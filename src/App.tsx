import React, { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
// import HamburgerMenu from '../components/HamburgerMenu'; // Removed
import ImageGrid from '../components/ImageGrid';
// Lazy load components that aren't needed on initial render
const Lightbox = lazy(() => import('../components/Lightbox'));
const AboutSection = lazy(() => import('../components/AboutSection'));
const PricingSection = lazy(() => import('../components/PricingSection'));
const ContactSection = lazy(() => import('../components/ContactSection'));
import Footer from '../components/Footer';
// import { images } from './data/images'; // Removed static import
import { Image } from './types'; // Import Image type

// Fisher-Yates (Knuth) Shuffle function
const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('senior-grads'); // Default to senior-grads
  const [displayedImages, setDisplayedImages] = useState<Image[]>([]); // State for shuffled images
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const [menuOpen, setMenuOpen] = useState(false); // Removed menu state
  const [windowWidth, setWindowWidth] = useState(1024); // Default to desktop view

  // Track window size for responsive layout
  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    // Update width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect to load and shuffle images when category changes
  useEffect(() => {
    const loadImages = async () => {
      let allImages: Image[] = [];
      const category = activeCategory; // Capture current category
      console.log(`Loading images for category: ${category}`); // DEBUG

      if (category === 'senior-grads' || category === 'nature') {
        try {
          const module = await import(`../data/all_${category}.json`);
          console.log('Imported module:', module); // DEBUG
          // Try accessing JSON directly, fallback to default
          allImages = (module.default || module) as Image[];
          console.log(`Loaded ${allImages?.length ?? 0} images raw.`); // DEBUG
        } catch (error) {
          console.error(`Error loading images for category ${category}:`, error);
          allImages = []; // Reset on error
        }
      }

      if (allImages && allImages.length > 0) {
        const shuffled = shuffleArray([...allImages]); // Shuffle a copy
        const sliced = shuffled.slice(0, 30); // Take first 30 shuffled images
        console.log(`Setting displayed images (count: ${sliced.length})`); // DEBUG
        setDisplayedImages(sliced);
      } else {
        console.log('No images loaded or not a gallery category, clearing displayed images.'); // DEBUG
        setDisplayedImages([]); // Clear images if not a gallery category or error
      }
      setCurrentImageIndex(0); // Reset lightbox index on category change
    };

    loadImages();
  }, [activeCategory]); // Rerun when activeCategory changes

  // Handle navigation clicks
  const handleNavClick = (category: string) => {
    setActiveCategory(category);
    // Ensure category is valid before setting state if needed in future
  };

  // // Toggle hamburger menu // Removed
  // const toggleMenu = () => {
  //   setMenuOpen(!menuOpen);
  // };

  // Handle image click to open lightbox
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Navigate to next image
  const nextImage = () => {
    // Use displayedImages state
    if (currentImageIndex < displayedImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Navigate to previous image
  const prevImage = () => {
    // Use displayedImages state
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  
  // Handle keyboard navigation and handle ESC for menu close
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        } else if (e.key === 'Escape') {
          closeLightbox();
        }
      } // Removed menu escape logic
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, currentImageIndex, activeCategory]); // Removed menuOpen dependency

  // Render content based on active category
  const renderContent = () => {
    // Handle non-gallery sections with padding
    if (activeCategory === 'about') 
      return <div className="px-4 md:px-6 lg:px-8"><AboutSection handleNavClick={handleNavClick} /></div>;
      
    if (activeCategory === 'pricing') 
      return <div className="px-4 md:px-6 lg:px-8"><PricingSection handleNavClick={handleNavClick} /></div>;
      
    if (activeCategory === 'contact') 
      return <div className="px-4 md:px-6 lg:px-8"><ContactSection /></div>;

    // Render the shuffled image grid if images are loaded
    if (displayedImages.length === 0 && (activeCategory === 'senior-grads' || activeCategory === 'nature')) {
       return <div className="flex justify-center p-8">Loading images...</div>; // Loading state
    }

    return <ImageGrid
      images={displayedImages} // Use shuffled state
      windowWidth={windowWidth}
      openLightbox={openLightbox}
    />;
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto py-8 flex-grow relative">
        {/* HamburgerMenu removed */}

        {/* Header and navigation with padding */}
        <div className="px-4 md:px-6 lg:px-8">
          <Header windowWidth={windowWidth} />

          {/* Main Navigation Tabs */}
          <Navigation
            activeCategory={activeCategory}
            handleNavClick={handleNavClick}
          />

          {/* Secondary Navigation Links */}
          <div className="flex justify-center space-x-6 mt-4 mb-8 text-sm text-gray-600 uppercase tracking-wider">
            <button onClick={() => handleNavClick('about')} className={`hover:text-black ${activeCategory === 'about' ? 'text-black font-medium' : ''}`}>About</button>
            <button onClick={() => handleNavClick('contact')} className={`hover:text-black ${activeCategory === 'contact' ? 'text-black font-medium' : ''}`}>Contact</button>
            <button onClick={() => handleNavClick('pricing')} className={`hover:text-black ${activeCategory === 'pricing' ? 'text-black font-medium' : ''}`}>Pricing</button>
          </div>
        </div>

        <Suspense fallback={<div className="flex justify-center p-8">Loading...</div>}>
          {renderContent()}
        </Suspense>

        <Suspense fallback={null}>
          {lightboxOpen && displayedImages.length > 0 && ( // Check if images exist before rendering Lightbox
            <Lightbox
              images={displayedImages} // Use shuffled state
              currentImageIndex={currentImageIndex}
              lightboxOpen={lightboxOpen}
              closeLightbox={closeLightbox} 
              nextImage={nextImage} 
              prevImage={prevImage} 
            />
          )}
        </Suspense>
      </div>
      
      <Footer />
    </div>
  );
};

export default App;
