import { Cloudinary } from "@cloudinary/url-gen";

// Initialize Cloudinary instance with your cloud name
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dtszzijrd' // Replace with your actual cloud name if different
  },
  url: {
    secure: true // Ensure HTTPS URLs are generated
  }
});

export default cld;
