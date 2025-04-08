// Export all interfaces for easy import
export * from './Image';
export * from './ImageCategory';

// Also export as a single object
import Image from './Image';
import ImageCategory from './ImageCategory';

export default {
  Image,
  ImageCategory
};