// Import necessary classes and functions from Cloudinary URL Gen SDK
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize"; // For resizing actions
import { quality, format, dpr } from "@cloudinary/url-gen/actions/delivery"; // For delivery actions (quality, format, DPR)
import { autoGravity, focusOn } from "@cloudinary/url-gen/qualifiers/gravity"; // For gravity qualifiers
import { auto } from "@cloudinary/url-gen/qualifiers/quality"; // For auto quality qualifier
import { Transformation } from "@cloudinary/url-gen"; // For adding raw transformations
import { face } from "@cloudinary/url-gen/qualifiers/focusOn"; // For face focus qualifier

// Initialize Cloudinary instance with your specific cloud name.
// This instance is used throughout the utility functions.
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dtszzijrd' // Replace with your actual Cloudinary cloud name if different
  },
  url: {
    secure: true // Ensures all generated URLs use HTTPS for security
  }
});

// Defines named constants for different image quality levels used in generateImageUrl.
export enum ImageQuality {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  HDR = 'hdr'
}

/**
 * Generates a low-resolution placeholder image URL.
 * Used for the blur-up effect while the main image loads.
 * @param publicId Cloudinary public ID of the image
 * @returns Low quality placeholder image URL string
 */
export const generatePlaceholderUrl = (publicId: string): string => {
  // Basic validation: return empty string if publicId is missing
  if (!publicId) {
    console.error('Missing publicId for placeholder image generation');
    return '';
  }
  
  // Generate a very small (20x20) image URL
  return cld.image(publicId)
    // Resize using fill crop, focusing on faces if detected (placeholders are small, face focus is okay here)
    .resize(fill().width(20).height(20).gravity(focusOn(face()))) 
    // Use automatic quality detection (likely results in low quality for small size)
    .delivery(quality(auto())) 
    // Use automatic format detection (e.g., webp, avif)
    .delivery(format('auto')) 
    // Convert the CloudinaryImage object to a URL string
    .toURL(); 
};

/**
 * Generates a "raw" Cloudinary URL, applying only automatic format and quality.
 * No resizing, cropping, or effects are applied.
 * @param publicId Cloudinary public ID of the image
 * @returns URL string with f_auto, q_auto
 */
export const generateRawImageUrl = (publicId: string): string => {
  if (!publicId) {
    console.error('Missing publicId for raw image URL generation');
    return '';
  }
  
  // Return the base URL with no transformations applied
  return cld.image(publicId)
    .toURL();
};

/**
 * Generates an optimized Cloudinary URL for a given public ID with enhanced quality options.
 * This is the main function for generating image URLs used in components.
 * @param publicId Cloudinary public ID of the image (e.g., 'folder/imagename')
 * @param width Optional target width for resizing (default: 1200px)
 * @param height Optional target height for resizing (if provided, fill crop uses both width and height)
 * @param imageQuality Quality preset to use (default: HIGH, see ImageQuality enum)
 * @param enableHDR Whether to enable HDR enhancement effect (default: false)
 * @returns Fully qualified, optimized Cloudinary URL string
 */
export const generateImageUrl = (
  publicId: string, 
  width: number = 1200,
  height?: number,
  imageQuality: ImageQuality = ImageQuality.HIGH,
  enableHDR: boolean = false
): string => {
  // Basic validation: return empty string if publicId is missing
  if (!publicId) {
    console.error('Missing publicId for image URL generation');
    return '';
  }
  
  // Create a CloudinaryImage object for the given public ID
  const image = cld.image(publicId);
  
  // Apply resize transformation using 'fill' crop mode.
  // 'fill' resizes the image to fill the specified dimensions, potentially cropping excess.
  // Uses default 'auto' gravity (g_auto) to intelligently determine the crop area.
  if (height) {
    // If height is provided, resize to exact width and height
    image.resize(fill().width(width).height(height).gravity('auto'));
  } else {
    // If only width is provided, resize to width, height adjusts automatically based on aspect ratio before cropping
    image.resize(fill().width(width).gravity('auto'));
  }
  
  // Apply quality settings based on the selected preset from the ImageQuality enum.
  switch (imageQuality) {
    case ImageQuality.LOW:
      image.delivery(quality('auto:low')); // Lower quality, smaller file size
      break;
    case ImageQuality.MEDIUM:
      image.delivery(quality('auto:good')); // Medium quality, balanced size
      break;
    case ImageQuality.HIGH:
      image.delivery(quality('auto:best')); // High quality, larger file size
      break;
    case ImageQuality.HDR:
      image.delivery(quality('auto:best')); // Use best quality for HDR base
      
      // If HDR mode is explicitly requested, add the HDR effect transformation.
      // 'e_hdr:10' applies a specific HDR effect strength.
      if (enableHDR) {
        // Add HDR effect as a raw transformation string
        image.addTransformation('e_hdr:10'); 
      }
      break;
  }
  
  // Add progressive flag ('fl_progressive') as a raw transformation string.
  // This helps images load progressively (improving perceived performance) for supported formats (JPEG, PNG, GIF).
  image.addTransformation('fl_progressive'); 
  
  // Apply automatic Device Pixel Ratio (DPR) adjustment.
  // Delivers higher resolution images to devices with high-density screens (e.g., Retina).
  image.delivery(dpr('auto'));
  
  // Force format to JPG ('f_jpg').
  image.delivery(format('jpg'));
  
  // Convert the configured CloudinaryImage object to its final URL string.
  return image.toURL();
};

/**
 * Generate a responsive 'srcset' attribute string for an image.
 * This allows the browser to choose the most appropriate image size based on viewport and device resolution.
 * @param publicId Cloudinary public ID of the image
 * @param widths Array of width values (in pixels) to include in the srcSet (default: common sizes)
 * @param imageQuality Quality preset to use for the generated URLs (default: HIGH)
 * @returns A complete 'srcset' string (e.g., "url1 400w, url2 800w, ...") ready to use in an img tag.
 */
export const generateSrcSet = (
  publicId: string,
  widths: number[] = [400, 800, 1200, 1600, 2000], // Default set of common widths
  imageQuality: ImageQuality = ImageQuality.HIGH
): string => {
  // Basic validation: return empty string if publicId is missing
  if (!publicId) {
    console.error('Missing publicId for srcSet generation');
    return '';
  }
  
  // Map each width to a corresponding URL generated by generateImageUrl, appending the width descriptor 'w'.
  return widths
    .map(width => `${generateImageUrl(publicId, width, undefined, imageQuality)} ${width}w`)
    // Join the generated strings with commas to form the final srcset attribute value.
    .join(', ');
};

/**
 * Extract the Cloudinary public ID from a complete Cloudinary URL.
 * Useful for cases where you only have the full URL and need the ID.
 * @param url The complete Cloudinary URL (e.g., "https://res.cloudinary.com/.../v12345/folder/image.jpg")
 * @returns The extracted public ID (e.g., "folder/image") or null if extraction fails.
 */
export const getPublicIdFromUrl = (url: string): string | null => {
  // Return null if URL is empty or invalid
  if (!url) return null;
  // Regex to capture the part between /v<version>/ and the optional file extension.
  const match = url.match(/\/v\d+\/(.+?)(\.[^.]+)?$/);
  // Return the captured group (public ID) or null if no match.
  return match ? match[1] : null;
};

/**
 * Parse a Cloudinary URL into its components (baseUrl, version, publicId).
 * Legacy function maintained primarily for backward compatibility if needed.
 * Prefer using the SDK methods directly where possible.
 * @param url The complete Cloudinary URL
 * @returns Object containing baseUrl, version, and publicId strings.
 */
export const parseCloudinaryUrl = (url: string) => {
  // Extract base URL (everything before /upload/)
  const baseUrlMatch = url.match(/(.*?)\/upload\//);
  const baseUrl = baseUrlMatch ? baseUrlMatch[1] : '';
  // Extract version number (digits after /v)
  const versionMatch = url.match(/\/v(\d+)\//);
  const version = versionMatch ? versionMatch[1] : '';
  // Extract public ID (everything after version number and slash)
  const publicIdMatch = url.match(/\/v\d+\/(.+)$/);
  const publicId = publicIdMatch ? publicIdMatch[1] : '';
  return { baseUrl, version, publicId };
};

/**
 * Optimize a Cloudinary URL with specified parameters using the modern SDK method.
 * Legacy function maintained for backward compatibility. It now acts as a wrapper
 * around `generateImageUrl`.
 * @param url The complete Cloudinary URL to optimize.
 * @param transformations An object potentially containing legacy transformation keys like 'width' or 'height'.
 * @returns Optimized Cloudinary URL string generated by `generateImageUrl`.
 */
// Define an interface for the expected structure of legacy transformations object
interface LegacyTransformations {
  width?: number;
  height?: number;
  // Add other potential legacy transformation keys here if needed
}

export const optimizeCloudinaryUrl = (url: string, transformations: LegacyTransformations = {}) => {
  // Extract publicId from the input URL using the helper function.
  const publicId = getPublicIdFromUrl(url);
  
  // If publicId extraction fails, log a warning and return the original URL.
  if (!publicId) {
    console.warn('Invalid Cloudinary URL format:', url);
    return url; // Return original URL if parsing failed
  }
  
  // Use the modern generateImageUrl function with extracted/default values.
  return generateImageUrl(
    publicId, 
    transformations.width || 1200, // Use provided width or default to 1200
    transformations.height, // Pass height if provided
    ImageQuality.HIGH // Default to HIGH quality for this legacy function
  );
};

// Export generateImageUrl as the default export for convenience.
// Note: If components import specific functions like generatePlaceholderUrl, 
// they should use named imports: import { generateImageUrl, generatePlaceholderUrl } from '...'
// If they only need generateImageUrl, they can use: import generateImageUrl from '...'
export default generateImageUrl;
