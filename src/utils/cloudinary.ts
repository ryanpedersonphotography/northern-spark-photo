// Import necessary classes and functions from Cloudinary URL Gen SDK
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize"; // For resizing actions
import { quality, format, dpr } from "@cloudinary/url-gen/actions/delivery"; // For delivery actions (quality, format, DPR)
import { Effect, grayscale } from "@cloudinary/url-gen/actions/effect"; // Import grayscale effect explicitly
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
// NOTE: This enum is no longer used by generateImageUrl as specific settings are now hardcoded.
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
 * Generates a "raw" Cloudinary URL with no transformations applied.
 * Used for the lightbox view.
 * @param publicId Cloudinary public ID of the image
 * @returns Base URL string for the image.
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
 * Generates an optimized Cloudinary URL specifically for the image grid,
 * replicating the transformations from the user-provided example URL.
 * @param publicId Cloudinary public ID of the image (e.g., 'folder/imagename')
 * @param width Optional target width for resizing (default: 1200px)
 * @param height Optional target height for resizing (ignored in this specific implementation)
 * @param imageQuality Quality preset (ignored in this specific implementation)
 * @param enableHDR Whether to enable HDR (ignored in this specific implementation)
 * @returns Fully qualified, optimized Cloudinary URL string for the grid.
 */
export const generateImageUrl = (
  publicId: string,
  width: number = 1200,
  // height, imageQuality, enableHDR are kept for signature compatibility but ignored below
  height?: number,
  imageQuality?: ImageQuality, // No longer used here
  enableHDR?: boolean // No longer used here
): string => {
  // Basic validation: return empty string if publicId is missing
  if (!publicId) {
    console.error('Missing publicId for image URL generation');
    return '';
  }

  // Create a CloudinaryImage object for the given public ID
  const image = cld.image(publicId);

  // Apply transformations exactly matching the example URL:
  // c_fill,g_auto,w_1200
  image.resize(fill().width(width).gravity('auto'));

  // e_enhance (Replaced e_improve)
  image.addTransformation('e_enhance'); 

  // e_auto_contrast (Added)
  image.addTransformation('e_auto_contrast');

  // e_vibrance remains removed

  // q_auto:good
  image.delivery(quality('auto:good'));

  // fl_progressive
  image.addTransformation('fl_progressive');

  // dpr_auto
  image.delivery(dpr('auto'));

  // f_jpg
  image.delivery(format('jpg'));

// Apply grayscale effect
image.effect(grayscale());

  // Convert the configured CloudinaryImage object to its final URL string.
  return image.toURL();
};

/**
 * Generate a responsive 'srcset' attribute string for an image grid item.
 * Uses the specific transformations defined in the updated generateImageUrl.
 * @param publicId Cloudinary public ID of the image
 * @param widths Array of width values (in pixels) to include in the srcSet (default: common sizes)
 * @param imageQuality Quality preset (ignored, as generateImageUrl now uses fixed settings)
 * @returns A complete 'srcset' string (e.g., "url1 400w, url2 800w, ...") ready to use in an img tag.
 */
export const generateSrcSet = (
  publicId: string,
  widths: number[] = [400, 800, 1200, 1600, 2000], // Default set of common widths
  imageQuality?: ImageQuality // No longer used by generateImageUrl
): string => {
  // Basic validation: return empty string if publicId is missing
  if (!publicId) {
    console.error('Missing publicId for srcSet generation');
    return '';
  }

  // Map each width to a corresponding URL generated by generateImageUrl, appending the width descriptor 'w'.
  // generateImageUrl will apply the fixed set of transformations regardless of the imageQuality parameter.
  return widths
    .map(width => `${generateImageUrl(publicId, width)} ${width}w`)
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
  // Note: generateImageUrl now ignores height, imageQuality, enableHDR parameters passed here.
  return generateImageUrl(
    publicId,
    transformations.width || 1200, // Use provided width or default to 1200
    transformations.height // Pass height (though it's ignored by generateImageUrl now)
  );
};

// Export generateImageUrl as the default export for convenience.
// Note: If components import specific functions like generatePlaceholderUrl,
// they should use named imports: import { generateImageUrl, generatePlaceholderUrl, ... } from '...'
// If they only need generateImageUrl, they can use: import generateImageUrl from '...'
export default generateImageUrl;
