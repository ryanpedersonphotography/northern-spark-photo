import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { quality, format, dpr } from "@cloudinary/url-gen/actions/delivery";
import { autoGravity, focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import { Transformation } from "@cloudinary/url-gen";
import { progressive } from "@cloudinary/url-gen/actions/delivery";
import { face } from "@cloudinary/url-gen/qualifiers/focusOn";

// Initialize Cloudinary instance with your cloud name
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dtszzijrd'
  },
  url: {
    secure: true
  }
});

// Image quality presets
export enum ImageQuality {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  HDR = 'hdr'
}

/**
 * Generates a low-resolution placeholder image URL
 * @param publicId Cloudinary public ID of the image
 * @returns Low quality placeholder image URL
 */
export const generatePlaceholderUrl = (publicId: string): string => {
  if (!publicId) {
    console.error('Missing publicId for placeholder image generation');
    return '';
  }
  
  return cld.image(publicId)
    .resize(fill().width(20).height(20).gravity(focusOn(face())))
    .delivery(quality(auto()))
    .delivery(format('auto'))
    .toURL();
};

/**
 * Generates an optimized Cloudinary URL for a given public ID with enhanced quality options
 * @param publicId Cloudinary public ID of the image
 * @param width Optional width for resizing (default: 1200)
 * @param height Optional height for resizing
 * @param imageQuality Quality preset to use (default: HIGH)
 * @param enableHDR Whether to enable HDR enhancement (default: false)
 * @returns Fully qualified Cloudinary URL
 */
export const generateImageUrl = (
  publicId: string, 
  width: number = 1200,
  height?: number,
  imageQuality: ImageQuality = ImageQuality.HIGH,
  enableHDR: boolean = false
): string => {
  if (!publicId) {
    console.error('Missing publicId for image URL generation');
    return '';
  }
  
  const image = cld.image(publicId);
  
  // Apply resize transformation with width and optional height
  // Use face detection with auto-gravity fallback
  if (height) {
    image.resize(fill().width(width).height(height).gravity(focusOn(face())));
  } else {
    image.resize(fill().width(width).gravity(focusOn(face())));
  }
  
  // Apply quality settings based on preset
  switch (imageQuality) {
    case ImageQuality.LOW:
      image.delivery(quality('auto:low'));
      break;
    case ImageQuality.MEDIUM:
      image.delivery(quality('auto:good'));
      break;
    case ImageQuality.HIGH:
      image.delivery(quality('auto:best'));
      break;
    case ImageQuality.HDR:
      image.delivery(quality('auto:best'));
      
      // If HDR mode is explicitly requested, add HDR effect
      if (enableHDR) {
        image.addTransformation(new Transformation().addActionFromEncoded('e_hdr:10'));
      }
      break;
  }
  
  // Enable progressive loading of JPEGs
  image.delivery(progressive('semi'));
  
  // Responsive DPR for high-resolution displays
  image.delivery(dpr('auto'));
  
  // Auto format for optimal file type
  image.delivery(format('auto'));
  
  return image.toURL();
};

/**
 * Generate responsive srcSet for an image
 * @param publicId Cloudinary public ID of the image
 * @param widths Array of width values to include in the srcSet
 * @param imageQuality Quality preset to use
 * @returns A complete srcSet string ready to use in an img tag
 */
export const generateSrcSet = (
  publicId: string,
  widths: number[] = [400, 800, 1200, 1600, 2000],
  imageQuality: ImageQuality = ImageQuality.HIGH
): string => {
  if (!publicId) {
    console.error('Missing publicId for srcSet generation');
    return '';
  }
  
  return widths
    .map(width => `${generateImageUrl(publicId, width, undefined, imageQuality)} ${width}w`)
    .join(', ');
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
  return generateImageUrl(
    publicId, 
    transformations.width as number || 1200,
    transformations.height as number,
    ImageQuality.HIGH
  );
};

// Export the default function
export default generateImageUrl;