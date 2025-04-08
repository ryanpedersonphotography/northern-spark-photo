import cld from './cloudinary-instance';
import { fill } from "@cloudinary/url-gen/actions/resize";
import { quality, format } from "@cloudinary/url-gen/actions/delivery";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

/**
 * Generates an optimized Cloudinary URL for a given public ID
 * @param publicId Cloudinary public ID of the image
 * @param width Optional width for resizing (default: 1200)
 * @returns Fully qualified Cloudinary URL
 */
export const generateImageUrl = (publicId: string, width: number = 1200): string => {
  if (!publicId) {
    console.error('Missing publicId for image URL generation');
    return '';
  }
  
  return cld.image(publicId)
    .resize(fill().width(width).gravity(autoGravity()))
    .delivery(quality('auto:best'))
    .delivery(format('auto'))
    .toURL();
};

// Export the function for direct use in any component
export default generateImageUrl;
