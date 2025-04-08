import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
// import HamburgerMenu from '../components/HamburgerMenu'; // Removed
import ImageGrid from '../components/ImageGrid';
import Lightbox from '../components/Lightbox';
import AboutSection from '../components/AboutSection';
import PricingSection from '../components/PricingSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { images } from './data/images'; // Will need update after images.ts is modified
const App = () => {
    const [activeCategory, setActiveCategory] = useState('family'); // Default to family section
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
    // Handle navigation clicks
    const handleNavClick = (category) => {
        setActiveCategory(category);
        // Ensure category is valid before setting state if needed in future
    };
    // // Toggle hamburger menu // Removed
    // const toggleMenu = () => {
    //   setMenuOpen(!menuOpen);
    // };
    // Handle image click to open lightbox
    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };
    // Close lightbox
    const closeLightbox = () => {
        setLightboxOpen(false);
    };
    // Navigate to next image (Ensure category exists in images)
    const nextImage = () => {
        const currentImages = images[activeCategory] || [];
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
    // Handle keyboard navigation and handle ESC for menu close
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (lightboxOpen) {
                if (e.key === 'ArrowLeft') {
                    prevImage();
                }
                else if (e.key === 'ArrowRight') {
                    nextImage();
                }
                else if (e.key === 'Escape') {
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
        if (activeCategory === 'about')
            return _jsx(AboutSection, { handleNavClick: handleNavClick });
        if (activeCategory === 'pricing')
            return _jsx(PricingSection, { handleNavClick: handleNavClick });
        if (activeCategory === 'contact')
            return _jsx(ContactSection, {});
        // Otherwise render the gallery for 'senior-grads' or 'nature'
        const categoryImages = images[activeCategory] || []; // Ensure category exists
        return _jsx(ImageGrid, { images: categoryImages, windowWidth: windowWidth, openLightbox: openLightbox });
    };
    return (_jsxs("div", { className: "bg-gray-100 min-h-screen flex flex-col", children: [_jsxs("div", { className: "max-w-6xl mx-auto p-8 flex-grow relative", children: [_jsx(Header, { windowWidth: windowWidth }), _jsx(Navigation, { activeCategory: activeCategory, handleNavClick: handleNavClick }), _jsxs("div", { className: "flex justify-center space-x-6 mt-4 mb-8 text-sm text-gray-600 uppercase tracking-wider", children: [_jsx("button", { onClick: () => handleNavClick('about'), className: `hover:text-black ${activeCategory === 'about' ? 'text-black font-medium' : ''}`, children: "About" }), _jsx("button", { onClick: () => handleNavClick('contact'), className: `hover:text-black ${activeCategory === 'contact' ? 'text-black font-medium' : ''}`, children: "Contact" }), _jsx("button", { onClick: () => handleNavClick('pricing'), className: `hover:text-black ${activeCategory === 'pricing' ? 'text-black font-medium' : ''}`, children: "Pricing" })] }), renderContent(), _jsx(Lightbox, { images: images[activeCategory] || [], currentImageIndex: currentImageIndex, lightboxOpen: lightboxOpen, closeLightbox: closeLightbox, nextImage: nextImage, prevImage: prevImage })] }), _jsx(Footer, {})] }));
};
export default App;
