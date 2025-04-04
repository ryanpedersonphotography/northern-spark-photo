import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import './App.css';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import ImageGrid from '../components/ImageGrid';
import { images } from './data/images'; 
import { ImageCategory } from './types';

// Lazy load components that aren't needed on initial render
const Lightbox = lazy(() => import('../components/Lightbox'));
const AboutSection = lazy(() => import('../components/AboutSection'));
const PricingSection = lazy(() => import('../components/PricingSection'));
const ContactSection = lazy(() => import('../components/ContactSection'));
import Footer from '../components/Footer';

const App: React.FC = () => {
  // State management
  const [activeCategory, setActiveCategory] = useState<string>('family');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  // Track window size for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Initial call and event listener
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset lightbox index when category changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [activeCategory]);

  // Memoized event handlers to prevent unnecessary re-renders
  const handleNavClick = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    const currentImages = images[activeCategory as keyof ImageCategory] || [];
    if (currentImageIndex < currentImages.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    }
  }, [activeCategory, currentImageIndex]);

  const prevImage = useCallback(() => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  }, [currentImageIndex]);

  // Handle keyboard navigation
  useEffect(() => {
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
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, prevImage, nextImage, closeLightbox]);

  // Current images for the active category
  const categoryImages = images[activeCategory as keyof ImageCategory] || [];

  // Render content based on active category
  const renderContent = () => {
    if (activeCategory === 'about') 
      return (
        <div className="px-4 md:px-6 lg:px-8">
          <AboutSection handleNavClick={handleNavClick} />
        </div>
      );
      
    if (activeCategory === 'pricing') 
      return (
        <div className="px-4 md:px-6 lg:px-8">
          <PricingSection handleNavClick={handleNavClick} />
        </div>
      );
      
    if (activeCategory === 'contact') 
      return (
        <div className="px-4 md:px-6 lg:px-8">
          <ContactSection />
        </div>
      );

    // Render the image grid for gallery categories
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
            <button 
              onClick={() => handleNavClick('about')} 
              className={`hover:text-black transition-colors ${activeCategory === 'about' ? 'text-black font-medium' : ''}`}
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('contact')} 
              className={`hover:text-black transition-colors ${activeCategory === 'contact' ? 'text-black font-medium' : ''}`}
            >
              Contact
            </button>
            <button 
              onClick={() => handleNavClick('pricing')} 
              className={`hover:text-black transition-colors ${activeCategory === 'pricing' ? 'text-black font-medium' : ''}`}
            >
              Pricing
            </button>
          </div>
        </div>

        {/* Main content area with Suspense fallback */}
        <Suspense fallback={<div className="flex justify-center p-8">Loading...</div>}>
          {renderContent()}
        </Suspense>

        {/* Lightbox with Suspense (only render when needed) */}
        <Suspense fallback={null}>
          {lightboxOpen && (
            <Lightbox
              images={categoryImages}
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