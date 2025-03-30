export interface Image {
  src: string;
  alt: string;
  orientation: string;
}

export interface ImageCategory {
  senior: Image[];
  family: Image[];
  fashion: Image[];
}