import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import ImageGrid from './components/ImageGrid';
import Lightbox from './components/Lightbox';
import AboutSection from './components/AboutSection';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import images from './data/images';
import { generateImageUrl } from './utils/cloudinary';
const App = () => {
    const [activeCategory, setActiveCategory] = useState('photos'); // Default to photos section
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
    // Preload critical images on mount
    const preloadCriticalImages = (categoryName, count = 3) => {
        console.log(`Preloading ${count} critical images from ${categoryName} category`);
        const categoryImages = images[categoryName] || [];
        const criticalImages = categoryImages.slice(0, count);
        criticalImages.forEach((image, index) => {
            const img = new Image();
            img.src = generateImageUrl(image.publicId, 1200);
            console.log(`Preloading image ${index + 1}/${count}: ${image.publicId}`);
        });
    };
    useEffect(() => {
        preloadCriticalImages('senior-grads', 3); // Still preload from senior-grads category
    }, []);
    // Handle navigation clicks
    const handleNavClick = (category) => {
        setActiveCategory(category);
        // Ensure category is valid before setting state if needed in future
    };
    // Handle image click to open lightbox
    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };
    // Close lightbox
    const closeLightbox = () => {
        setLightboxOpen(false);
    };
    // Navigate to next image
    const nextImage = () => {
        const currentImages = images['senior-grads'] || [];
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
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        // Cleanup function
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lightboxOpen, currentImageIndex, activeCategory]);
    // Get random subset of images (9)
    const getRandomSubset = (array, count) => {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };
    // Render content based on active category
    const renderContent = () => {
        if (activeCategory === 'about')
            return _jsx(AboutSection, { handleNavClick: handleNavClick });
        if (activeCategory === 'pricing')
            return _jsx(PricingSection, { handleNavClick: handleNavClick });
        if (activeCategory === 'contact')
            return _jsx(ContactSection, {});
        // For 'photos' category or any default, always use senior-grads images
        const categoryImages = images['senior-grads'] || [];
        const randomNineImages = getRandomSubset(categoryImages, 9);
        return _jsx(ImageGrid, { images: randomNineImages, openLightbox: (index) => {
                // Map the index from random subset back to full set
                const selectedImage = randomNineImages[index];
                const fullSetIndex = categoryImages.findIndex(img => img.publicId === selectedImage.publicId);
                setCurrentImageIndex(fullSetIndex >= 0 ? fullSetIndex : 0);
                setLightboxOpen(true);
            } });
    };
    return (_jsxs("div", { className: "bg-gray-100 min-h-screen flex flex-col", children: [_jsxs("div", { className: "max-w-6xl mx-auto p-8 flex-grow relative", children: [_jsx(Header, { windowWidth: windowWidth }), _jsxs("div", { className: "flex justify-center space-x-6 mt-4 mb-8 text-sm text-gray-600 uppercase tracking-wider", children: [_jsx("button", { onClick: () => handleNavClick('photos'), className: `hover:text-black ${activeCategory === 'photos' ? 'text-black font-medium' : ''}`, children: "Gallery" }), _jsx("button", { onClick: () => handleNavClick('about'), className: `hover:text-black ${activeCategory === 'about' ? 'text-black font-medium' : ''}`, children: "About" }), _jsx("button", { onClick: () => handleNavClick('contact'), className: `hover:text-black ${activeCategory === 'contact' ? 'text-black font-medium' : ''}`, children: "Contact" }), _jsx("button", { onClick: () => handleNavClick('pricing'), className: `hover:text-black ${activeCategory === 'pricing' ? 'text-black font-medium' : ''}`, children: "Pricing" })] }), renderContent(), _jsx(Lightbox, { images: images['senior-grads'] || [], currentImageIndex: currentImageIndex, lightboxOpen: lightboxOpen, closeLightbox: closeLightbox, nextImage: nextImage, prevImage: prevImage })] }), _jsx(Footer, {})] }));
};
export default App;
