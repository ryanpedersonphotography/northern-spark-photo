/**
 * @deprecated - This file is kept for backward compatibility.
 * Import from the main cloudinary.ts file instead.
 */

import { Cloudinary } from "@cloudinary/url-gen";

// Initialize Cloudinary instance with your cloud name
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dtszzijrd'
  },
  url: {
    secure: true
  }
});

export default cld;