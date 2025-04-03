export interface Image {
  src: string;
  alt: string;
  orientation: string;
}

export interface ImageCategory {
  'senior-grads': Image[]; // Updated key
  nature: Image[];        // Updated key
  // Removed family and fashion keys
}
