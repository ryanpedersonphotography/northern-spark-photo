import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { quality, format } from "@cloudinary/url-gen/actions/delivery";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

// Initialize Cloudinary instance with your cloud name
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dtszzijrd'
  },
  url: {
    secure: true
  }
});

/**
 * Generates an optimized Cloudinary URL for a given public ID
 * @param publicId Cloudinary public ID of the image
 * @param width Optional width for resizing (default: 1200)
 * @param height Optional height for resizing
 * @returns Fully qualified Cloudinary URL
 */
export const generateImageUrl = (
  publicId: string, 
  width: number = 1200,
  height?: number
): string => {
  if (!publicId) {
    console.error('Missing publicId for image URL generation');
    return '';
  }
  
  const image = cld.image(publicId);
  
  // Apply resize transformation with width and optional height
  if (height) {
    image.resize(fill().width(width).height(height).gravity(autoGravity()));
  } else {
    image.resize(fill().width(width).gravity(autoGravity()));
  }
  
  // Apply delivery optimizations
  image.delivery(quality('auto:best'));
  image.delivery(format('auto'));
  
  return image.toURL();
};

/**
 * Extract the Cloudinary public ID from a complete Cloudinary URL
 * @param url The complete Cloudinary URL
 * @returns The extracted public ID or null if extraction fails
 */
export const getPublicIdFromUrl = (url: string): string | null => {
  if (!url) return null;
  const match = url.match(/\/v\d+\/(.+?)(\.[^.]+)?$/);
  return match ? match[1] : null;
};

/**
 * Parse a Cloudinary URL into its components
 * Legacy function maintained for backward compatibility
 * @param url The complete Cloudinary URL
 * @returns Object with baseUrl, version, and publicId
 */
export const parseCloudinaryUrl = (url: string) => {
  // Extract base URL (everything before /upload/)
  const baseUrlMatch = url.match(/(.*?)\/upload\//);
  const baseUrl = baseUrlMatch ? baseUrlMatch[1] : '';
  // Extract version number
  const versionMatch = url.match(/\/v(\d+)\//);
  const version = versionMatch ? versionMatch[1] : '';
  // Extract public ID (everything after version)
  const publicIdMatch = url.match(/\/v\d+\/(.+)$/);
  const publicId = publicIdMatch ? publicIdMatch[1] : '';
  return { baseUrl, version, publicId };
};

/**
 * Optimize a Cloudinary URL with specified parameters
 * Legacy function maintained for backward compatibility
 * @param url The complete Cloudinary URL
 * @param transformations Optional transformations to apply
 * @returns Optimized Cloudinary URL
 */
export const optimizeCloudinaryUrl = (url: string, transformations = {}) => {
  // Extract publicId from URL
  const publicId = getPublicIdFromUrl(url);
  
  if (!publicId) {
    console.warn('Invalid Cloudinary URL format:', url);
    return url; // Return original URL if parsing failed
  }
  
  // Use the SDK method instead
  return generateImageUrl(publicId, 
    transformations.width as number || 1200,
    transformations.height as number);
};

// Export the default function
export default generateImageUrl;