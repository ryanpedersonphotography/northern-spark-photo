import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { optimizeCloudinaryUrl } from '../src/utils/cloudinary';
const Lightbox = ({ images, currentImageIndex, lightboxOpen, closeLightbox, nextImage, prevImage }) => {
    if (!lightboxOpen || !images || images.length === 0)
        return null;
    const [isLoading, setIsLoading] = React.useState(true);
    const currentImage = images[currentImageIndex];
    const isFirstImage = currentImageIndex === 0;
    const isLastImage = currentImageIndex === images.length - 1;
    // Reset loading state when image changes
    React.useEffect(() => {
        setIsLoading(true);
    }, [currentImageIndex]);
    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen)
                return;
            switch (e.key) {
                case 'ArrowLeft':
                    if (!isFirstImage)
                        prevImage();
                    break;
                case 'ArrowRight':
                    if (!isLastImage)
                        nextImage();
                    break;
                case 'Escape':
                    closeLightbox();
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lightboxOpen, nextImage, prevImage, closeLightbox, isFirstImage, isLastImage]);
    // Handle touch navigation
    useEffect(() => {
        let touchStartX = 0;
        let touchEndX = 0;
        const handleTouchStart = (e) => {
            touchStartX = e.changedTouches[0].screenX;
        };
        const handleTouchEnd = (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        };
        const handleSwipe = () => {
            // Minimum swipe distance (in px)
            const minSwipeDistance = 50;
            const distance = touchEndX - touchStartX;
            if (Math.abs(distance) < minSwipeDistance)
                return;
            if (distance > 0 && !isFirstImage) {
                // Swiped right -> show previous image
                prevImage();
            }
            else if (distance < 0 && !isLastImage) {
                // Swiped left -> show next image
                nextImage();
            }
        };
        if (lightboxOpen) {
            window.addEventListener('touchstart', handleTouchStart);
            window.addEventListener('touchend', handleTouchEnd);
        }
        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [lightboxOpen, nextImage, prevImage, isFirstImage, isLastImage]);
    // Preload adjacent images for smoother navigation
    useEffect(() => {
        if (lightboxOpen && images.length > 1) {
            // Preload next image if it exists
            if (currentImageIndex < images.length - 1) {
                const nextImg = images[currentImageIndex + 1];
                const img = new Image();
                img.src = optimizeCloudinaryUrl(nextImg.src, {
                    width: 1600,
                    height: 900,
                    quality: 'auto'
                });
            }
            // Preload previous image if it exists
            if (currentImageIndex > 0) {
                const prevImg = images[currentImageIndex - 1];
                const img = new Image();
                img.src = optimizeCloudinaryUrl(prevImg.src, {
                    width: 1600,
                    height: 900,
                    quality: 'auto'
                });
            }
        }
    }, [currentImageIndex, images, lightboxOpen]);
    return (_jsxs("div", { className: "fixed inset-0 bg-black z-50 flex items-center justify-center", children: [_jsx("button", { className: "absolute top-5 right-5 text-white text-4xl bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center border border-white cursor-pointer z-50 hover:bg-opacity-70 shadow-lg", onClick: closeLightbox, "aria-label": "Close lightbox", children: "\u00D7" }), _jsxs("div", { className: "absolute top-5 left-5 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm z-40", children: [currentImageIndex + 1, " / ", images.length] }), _jsxs("div", { className: "flex items-center justify-center h-screen w-full relative", children: [isLoading && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center z-30", children: _jsx("div", { className: "w-20 h-20 border-4 border-gray-400 border-t-white rounded-full animate-spin shadow-lg" }) })), _jsx("img", { src: optimizeCloudinaryUrl(currentImage.src, {
                            crop: 'fill',
                            gravity: 'auto:faces',
                            width: 1600,
                            height: 900,
                            dpr: 'auto',
                            format: 'auto',
                            quality: 'auto'
                        }), alt: currentImage.alt, className: `lightbox-image transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`, style: {
                            width: '100vw',
                            height: '100vh',
                            objectFit: 'cover', /* Better for full viewport display */
                            maxWidth: 'none',
                            maxHeight: 'none'
                        }, onLoad: () => setIsLoading(false), onError: (e) => {
                            console.error('Image failed to load:', currentImage.src);
                            // Fall back to original image if optimized version fails
                            e.target.src = currentImage.src;
                            setIsLoading(false);
                        } })] }), !isFirstImage && (_jsx("button", { className: "fixed left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center border border-white cursor-pointer shadow-lg", onClick: prevImage, "aria-label": "Previous image", children: "\u2190" })), !isLastImage && (_jsx("button", { className: "fixed right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center border border-white cursor-pointer shadow-lg", onClick: nextImage, "aria-label": "Next image", children: "\u2192" }))] }));
};
export default Lightbox;
