export interface Image {
  src: string;
  alt: string;
  orientation: string;
}

export interface ImageCategory {
  family: Image[];         // Added family key
  'senior-grads': Image[]; // Updated key
  nature: Image[];        // Updated key
  // Removed fashion key
}
