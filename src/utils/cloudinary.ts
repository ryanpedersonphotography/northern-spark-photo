/**
 * Cloudinary image utilities with mobile optimization
 */

// Base Cloudinary domain
export const CLOUDINARY_BASE = 'https://res.cloudinary.com/dtszzijrd';

// Type for image transformations
export type CloudinaryTransformation = {
  width?: number;
  height?: number;
  quality?: 'auto' | 'eco' | 'good' | 'best' | 'low';
  format?: 'auto';
  effects?: string[];
  crop?: string;
  gravity?: string;
  dpr?: string;
};

/**
 * Create an optimized Cloudinary URL with transformations
 */
export function getOptimizedUrl(
  url: string,
  {
    width = undefined,
    height = undefined,
    quality = 'auto',
    format = 'auto',
    effects = ['auto_color'],
    crop = undefined,
    gravity = undefined,
    dpr = undefined
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
  
  // Add height if specified
  if (height) transformations.push(`h_${height}`);
  
  // Add crop and gravity if specified
  if (crop) transformations.push(`c_${crop}`);
  if (gravity) transformations.push(`g_${gravity}`);
  
  // Add DPR setting for responsive images
  if (dpr) transformations.push(`dpr_${dpr}`);
  
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

// Get device pixel ratio for better mobile display
const getDPR = () => {
  if (typeof window === 'undefined') return '1.0';
  return window.devicePixelRatio ? Math.min(window.devicePixelRatio, 2).toFixed(1) : '1.0';
};

/**
 * Preset transformations for common use cases with mobile optimization
 */
export const imagePresets = {
  // Extra small image for thumbnails on mobile
  thumbnail: (url: string) => getOptimizedUrl(url, { 
    width: 200, 
    quality: 'auto', 
    effects: ['auto_color'],
    dpr: getDPR()
  }),
  
  // Mobile-optimized grid images
  grid: (url: string) => getOptimizedUrl(url, { 
    width: window.innerWidth < 640 ? 400 : 800, 
    quality: window.innerWidth < 640 ? 'good' : 'auto', 
    effects: ['auto_color'],
    dpr: getDPR()
  }),
  
  // Ultra-small placeholder for quick loading
  gridPlaceholder: (url: string) => getOptimizedUrl(url, { 
    width: 20, 
    quality: 'low', 
    effects: ['auto_color', 'blur:1000'],
    format: 'auto'
  }),
  
  // High quality for lightbox view
  lightbox: (url: string) => getOptimizedUrl(url, { 
    width: window.innerWidth < 640 ? 800 : 1600, 
    quality: 'best', 
    effects: ['auto_color'],
    dpr: getDPR()
  }),
  
  // Medium quality for preview
  previewImage: (url: string) => getOptimizedUrl(url, { 
    width: window.innerWidth < 640 ? 600 : 1200, 
    quality: 'auto', 
    effects: ['auto_color'],
    dpr: getDPR()
  }),
  
  // Custom transformation for flexible needs
  custom: (url: string, options: CloudinaryTransformation) => getOptimizedUrl(url, options)
};