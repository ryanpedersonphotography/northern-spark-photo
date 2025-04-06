export interface Image {
  src: string;
  alt: string;
  orientation: string;
}

export interface ImageCategory {
  'senior-grads': Image[]; 
  nature: Image[];
  family: Image[];        // Re-added family key
}
