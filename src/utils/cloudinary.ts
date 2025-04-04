/**
 * Cloudinary image utilities
 */

// Base Cloudinary domain
export const CLOUDINARY_BASE = 'https://res.cloudinary.com/dtszzijrd';

// Type for image transformations
export type CloudinaryTransformation = {
  width?: number;
  quality?: 'auto' | 'eco' | 'good' | 'best' | 'low';
  format?: 'auto';
  effects?: string[];
  crop?: string;
  gravity?: string;
};

// Function to create optimized Cloudinary URLs
export function getOptimizedUrl(
  url: string,
  {
    width = undefined,
    quality = 'auto',
    format = 'auto',
    effects = ['auto_color'],
    crop = undefined,
    gravity = undefined
  }: CloudinaryTransformation = {}
): string {
  // Extract the version and path part from original URL
  // Pattern: /upload/f_auto,q_auto[,e_auto_color]/vXXXXXXXXXX/path/image.ext
  const urlParts = url.split('/upload/');
  if (urlParts.length !== 2) return url; // Not a valid Cloudinary URL
  
  const pathPart = urlParts[1];
  // Extract everything after the first slash after 'v1234567890/'
  const versionMatch = pathPart.match(/v\d+\/(.*)/);
  if (!versionMatch) return url;
  
  const transformations = [];
  
  // Add format
  if (format) transformations.push(`f_${format}`);
  
  // Add quality
  if (quality) transformations.push(`q_${quality}`);
  
  // Add width if specified
  if (width) transformations.push(`w_${width}`);
  
  // Add crop and gravity if specified
  if (crop) transformations.push(`c_${crop}`);
  if (gravity) transformations.push(`g_${gravity}`);
  
  // Add effects
  if (effects && effects.length > 0) {
    effects.forEach(effect => transformations.push(`e_${effect}`));
  }
  
  // Extract version part
  const versionPart = pathPart.match(/v\d+/)?.[0] || '';
  
  // Reconstruct URL with optimizations
  const imageId = versionMatch[1];
  return `${CLOUDINARY_BASE}/image/upload/${transformations.join(',')}/${versionPart}/${imageId}`;
}

// Preset transformations for common use cases
export const imagePresets = {
  thumbnail: (url: string) => getOptimizedUrl(url, { 
    width: 400, 
    quality: 'auto', 
    effects: ['auto_color'] 
  }),
  grid: (url: string) => getOptimizedUrl(url, { 
    width: 800, 
    quality: 'auto', 
    effects: ['auto_color'] 
  }),
  gridPlaceholder: (url: string) => getOptimizedUrl(url, { 
    width: 20, 
    quality: 'low', 
    effects: ['auto_color', 'blur:1000'] 
  }),
  lightbox: (url: string) => getOptimizedUrl(url, { 
    width: 1600, 
    quality: 'best', 
    effects: ['auto_color'] 
  }),
  previewImage: (url: string) => getOptimizedUrl(url, { 
    width: 1200, 
    quality: 'auto', 
    effects: ['auto_color'] 
  }),
};