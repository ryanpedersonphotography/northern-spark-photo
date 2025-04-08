// Define all types here
export interface Image {
  publicId: string;
  alt: string;
  orientation: string;
}

export interface ImageCategory {
  'senior-grads': Image[]; 
  nature: Image[];
  family: Image[];
}

// No need for separate export statement since we're using export inline
// The line below is redundant with the export keywords above, but included for backwards compatibility
export type { Image, ImageCategory };