export interface Image {
  publicId: string; // Changed from src to publicId
  alt: string;
  orientation: string;
}

// Add explicit export
export { Image };

export interface ImageCategory {
  'senior-grads': Image[]; 
  nature: Image[];
  family: Image[];        // Re-added family key
}
