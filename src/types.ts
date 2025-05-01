// Define all types here
export interface Image {
  publicId: string;
  alt: string;
  orientation: string;
}

export interface ImageCategory {
  'senior-grads': Image[];
}

// No need for separate export statement since we're using export inline