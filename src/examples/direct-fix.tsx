import React from 'react';
import generateImageUrl from '../utils/image-helper';

/**
 * This file demonstrates how to directly fix the image with empty src
 * that was provided in the initial task.
 */

const DirectFix: React.FC = () => {
  // Original image had empty src:
  // <img src="" alt="Family portrait in outdoor woodland setting" loading="eager" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; display: block; transform: scale(1);">
  
  // Step 1: Identify the appropriate publicId for this image based on the alt text
  // Looking at the family images collection, we can use this publicId:
  const publicId = "families/-Kp8_bODRd2hTRlQgXQjjg";
  
  // Step 2: Generate the URL using our helper function
  const imageUrl = generateImageUrl(publicId);
  
  // Step 3: Use the generated URL in the img element
  return (
    <div>
      <h2>Fixed Image Example</h2>
      
      {/* FIXED: This image now has a proper Cloudinary URL */}
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
      
      <div style={{ marginTop: '20px' }}>
        <h3>Implementation Details</h3>
        <p>This fixes the original image which had an empty src attribute:</p>
        <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
          {`<img src="" alt="Family portrait in outdoor woodland setting" loading="eager" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; display: block; transform: scale(1);">`}
        </pre>
        
        <p>The fix involves these simple steps:</p>
        <ol>
          <li>Import the generateImageUrl helper function</li>
          <li>Determine the correct publicId for the image</li>
          <li>Generate the Cloudinary URL</li>
          <li>Replace the empty src with the generated URL</li>
        </ol>
      </div>
    </div>
  );
};

export default DirectFix;
