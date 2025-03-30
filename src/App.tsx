import React, { useState, useEffect } from 'react';
import './App.css';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import HamburgerMenu from '../components/HamburgerMenu';
import ImageGrid from '../components/ImageGrid';
import Lightbox from '../components/Lightbox';
import AboutSection from '../components/AboutSection';
import PricingSection from '../components/PricingSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { images } from './data/images';
import { Image } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('senior');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Handle navigation clicks
  const handleNavClick = (category: string) => {
    setActiveCategory(category);
  };

  // Toggle hamburger menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
    if (currentImageIndex < images[activeCategory as keyof typeof images].length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Navigate to previous image
  const prevImage = () => {
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
      } else if (menuOpen && e.key === 'Escape') {
        // Close menu when ESC is pressed and menu is open
        setMenuOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, menuOpen, currentImageIndex, activeCategory]); // Dependencies that should trigger a re-binding

  // Render content based on active category
  const renderContent = () => {
    if (activeCategory === 'about') return <AboutSection handleNavClick={handleNavClick} />;
    if (activeCategory === 'pricing') return <PricingSection handleNavClick={handleNavClick} />;
    if (activeCategory === 'contact') return <ContactSection />;

    // Otherwise render the gallery
    const categoryImages = images[activeCategory as keyof typeof images] || [];
    return <ImageGrid 
      images={categoryImages} 
      windowWidth={windowWidth} 
      openLightbox={openLightbox} 
    />;
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto p-8 flex-grow relative">
        <HamburgerMenu 
          menuOpen={menuOpen} 
          toggleMenu={toggleMenu} 
          activeCategory={activeCategory} 
          handleNavClick={handleNavClick} 
          windowWidth={windowWidth}
        />
        
        <Header windowWidth={windowWidth} />
        
        <Navigation 
          activeCategory={activeCategory} 
          handleNavClick={handleNavClick} 
        />
        
        {renderContent()}
        
        <Lightbox 
          images={images[activeCategory as keyof typeof images]} 
          currentImageIndex={currentImageIndex} 
          lightboxOpen={lightboxOpen} 
          closeLightbox={closeLightbox} 
          nextImage={nextImage} 
          prevImage={prevImage} 
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default App;