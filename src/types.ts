// Define all types here
interface Image {
  publicId: string;
  alt: string;
  orientation: string;
}

interface ImageCategory {
  'senior-grads': Image[]; 
  nature: Image[];
  family: Image[];
}

// Export all types
export type { Image, ImageCategory };