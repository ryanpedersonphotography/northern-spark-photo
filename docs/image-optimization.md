# Image Optimization

This document outlines strategies implemented to optimize image delivery and performance on our website.

## Cloudinary Integration Improvements

- **Centralized Cloudinary Configuration:** All Cloudinary URL generation and configuration settings have been consolidated in `src/utils/cloudinary.ts` for consistency and ease of maintenance.
- **Enhanced Component Usage:** The Lightbox and ImageGrid components now utilize the `<AdvancedImage>` component from `@cloudinary/react` for optimized image rendering and improved placeholder handling.

## Speed and Image Grid Loading Enhancements

- **Lazyload Optimization:** The ImageGrid component’s lazyload settings have been updated with an increased vertical root margin (200px) and a reduced threshold (0.1) to trigger image loading earlier.
- **Critical Image Preloading:** A preloading function has been added to `src/App.tsx` that automatically preloads the first three critical images from the default ('family') category at a high resolution. This ensures that key images in the initial viewport load quickly, enhancing the overall user experience.

These improvements have been thoroughly tested and are now considered stable. They contribute to faster page loads and improved performance across devices.

## Future Considerations

- Explore further optimizations for placeholder transitions and progressive image loading.
- Investigate additional responsive breakpoints and device-specific customizations for even better performance.

**Stable Release:** The current release is marked as stable for speed and image grid loading improvements.
