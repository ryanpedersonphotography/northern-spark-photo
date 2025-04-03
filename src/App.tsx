import React, { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import ImageGrid from '../components/ImageGrid';
// Lazy load components that aren't needed on initial render
const Lightbox = lazy(() => import('../components/Lightbox'));
const AboutSection = lazy(() => import('../components/AboutSection'));
const PricingSection = lazy(() => import('../components/PricingSection'));
const ContactSection = lazy(() => import('../components/ContactSection'));
import Footer from '../components/Footer';
import { images } from './data/images'; // Import the images
import { ImageCategory } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('senior-grads'); // Default to senior-grads
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  // Reset lightbox index when category changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [activeCategory]);

  // Handle navigation clicks
  const handleNavClick = (category: string) => {
    setActiveCategory(category);
  };

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
    const currentImages = images[activeCategory as keyof ImageCategory] || [];
    if (currentImageIndex < currentImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Navigate to previous image
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };
  
  // Handle keyboard navigation
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
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, currentImageIndex, activeCategory]);

  // Render content based on active category
  const renderContent = () => {
    // Handle non-gallery sections with padding
    if (activeCategory === 'about') 
      return <div className="px-4 md:px-6 lg:px-8"><AboutSection handleNavClick={handleNavClick} /></div>;
      
    if (activeCategory === 'pricing') 
      return <div className="px-4 md:px-6 lg:px-8"><PricingSection handleNavClick={handleNavClick} /></div>;
      
    if (activeCategory === 'contact') 
      return <div className="px-4 md:px-6 lg:px-8"><ContactSection /></div>;

    // Get the images for the current category
    const categoryImages = images[activeCategory as keyof ImageCategory] || [];
      
    // Render the image grid with proper masonry layout
    // No additional padding needed for the grid section
    return (
      <div className="w-full overflow-hidden">
        <ImageGrid
          images={categoryImages}
          windowWidth={windowWidth}
          openLightbox={openLightbox}
        />
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto py-8 flex-grow relative">
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
          {lightboxOpen && (
            <Lightbox
              images={images[activeCategory as keyof ImageCategory] || []}
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
