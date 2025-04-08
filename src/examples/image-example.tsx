import React from 'react';
import generateImageUrl from '../utils/image-helper';

/**
 * Example component showing how to use the generateImageUrl function 
 * to fix the empty src attribute in image elements
 */
const ImageExample: React.FC = () => {
  // Example publicId from your family images collection
  const familyPublicId = "families/-Kp8_bODRd2hTRlQgXQjjg";
  
  // Generate the optimized Cloudinary URL
  const imageUrl = generateImageUrl(familyPublicId);
  
  return (
    <div>
      <h2>Family Portrait Example</h2>
      
      {/* Image with generated Cloudinary URL */}
      <img 
        src={imageUrl} 
        alt="Family portrait in outdoor woodland setting" 
        loading="eager" 
        style={{
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          transition: 'transform 0.5s', 
          display: 'block', 
          transform: 'scale(1)'
        }}
      />
      
      <p>
        <strong>Generated URL:</strong> {imageUrl}
      </p>
      
      <h3>How to Fix Empty src Attributes</h3>
      <pre>
{`// Import the helper function
import generateImageUrl from '../utils/image-helper';

// Generate URL from publicId
const imageUrl = generateImageUrl("families/-Kp8_bODRd2hTRlQgXQjjg");

// Use in your img element
<img 
  src={imageUrl}
  alt="Family portrait in outdoor woodland setting" 
  loading="eager" 
  style={{...}}
/>`}
      </pre>
    </div>
  );
};

export default ImageExample;
