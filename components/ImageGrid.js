import { jsx as _jsx } from "react/jsx-runtime";
const ImageGrid = ({ images, windowWidth, openLightbox }) => {
    // Determine number of columns based on screen width
    const getGridStyle = () => {
        // Explicit grid layout based on window width
        if (windowWidth < 640) {
            return {
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1rem'
            };
        }
        else if (windowWidth < 1024) {
            return {
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
            };
        }
        else {
            return {
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '1rem'
            };
        }
    };
    return (_jsx("div", { style: getGridStyle(), children: images.map((image, index) => (_jsx("div", { style: {
                overflow: 'hidden',
                cursor: 'pointer',
                margin: 0,
                padding: 0,
                gridRow: image.orientation === 'portrait' ? 'span 2' : 'span 1',
                // Add aspect-ratio to reserve space and prevent layout shift
                aspectRatio: image.orientation === 'portrait' ? '2 / 3' : '3 / 2'
            }, onClick: () => openLightbox(index), children: _jsx("img", { 
                // Use w_1200 and q_auto:best for grid thumbnails to enhance HDR quality with reasonable performance
                src: image.src.replace('/upload/f_auto,q_auto', '/upload/f_auto,q_auto:best,w_1200'), alt: image.alt, style: {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    // Ensure image fills the aspect-ratio container
                    display: 'block'
                }, onMouseOver: (e) => e.currentTarget.style.transform = 'scale(1.05)', onMouseOut: (e) => e.currentTarget.style.transform = 'scale(1)', 
                // Eager load the first few images (likely above the fold), lazy load the rest
                loading: index < 3 ? "eager" : "lazy", fetchPriority: index < 3 ? "high" : "auto" }) }, index))) }));
};
export default ImageGrid;
