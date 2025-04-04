#!/usr/bin/env node

import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dtszzijrd',
  api_key: '148365419933366',
  api_secret: 'VIOb1TBgdhOBEimwo_p7WrIH0K0'
});

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to ask questions
function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Main menu
async function showMenu() {
  console.log('\n=== Cloudinary Helper ===');
  console.log('1. List all resources');
  console.log('2. Upload images from a folder');
  console.log('3. Generate URLs JSON file');
  console.log('4. Check for duplicates');
  console.log('5. Delete duplicate images');
  console.log('0. Exit');
  
  const choice = await question('\nEnter your choice (0-5): ');
  
  switch (choice) {
    case '1':
      await listResources();
      break;
    case '2':
      await uploadImages();
      break;
    case '3':
      await generateUrlsJson();
      break;
    case '4':
      await checkDuplicates();
      break;
    case '5':
      await deleteDuplicates();
      break;
    case '0':
      console.log('Goodbye!');
      rl.close();
      return;
    default:
      console.log('Invalid choice. Please try again.');
  }
  
  await showMenu();
}

// List all resources in Cloudinary
async function listResources() {
  try {
    // Get all root folders
    const foldersResult = await cloudinary.api.root_folders();
    const folderNames = foldersResult.folders.map(folder => folder.path);
    
    console.log(`\nFound ${folderNames.length} folders: ${folderNames.join(', ')}`);
    
    // Process each folder
    for (const folder of folderNames) {
      console.log(`\nFolder: ${folder}`);
      
      let nextCursor = null;
      let resourceCount = 0;
      
      do {
        // Get resources for this folder with pagination
        const result = await cloudinary.api.resources({ 
          type: 'upload',
          prefix: `${folder}/`,
          max_results: 500,
          next_cursor: nextCursor
        });
        
        resourceCount += result.resources.length;
        
        // Update cursor for next page
        nextCursor = result.next_cursor;
        
      } while (nextCursor);
      
      console.log(`- ${resourceCount} resources`);
    }
    
    await question('\nPress Enter to continue...');
  } catch (error) {
    console.error('Error listing resources:', error);
    await question('\nPress Enter to continue...');
  }
}

// Upload images from a folder
async function uploadImages() {
  try {
    // Ask for the folder to upload
    const folderPath = await question('\nEnter the path to the folder containing images: ');
    const targetFolder = await question('Enter the target Cloudinary folder name: ');
    
    // Read all files in the folder
    const files = await fs.readdir(folderPath);
    
    // Filter for image files
    const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExts.includes(ext);
    });
    
    console.log(`\nFound ${imageFiles.length} image files to upload`);
    
    if (imageFiles.length === 0) {
      console.log('No images found in the specified folder.');
      await question('\nPress Enter to continue...');
      return;
    }
    
    const confirm = await question(`Upload ${imageFiles.length} images to '${targetFolder}' folder? (y/n): `);
    
    if (confirm.toLowerCase() !== 'y') {
      console.log('Upload cancelled.');
      await question('\nPress Enter to continue...');
      return;
    }
    
    // Create a file to store URLs
    const urlsFile = path.join(__dirname, `${targetFolder}_urls.txt`);
    await fs.writeFile(urlsFile, ''); // Create or clear the file
    
    // Process files sequentially to avoid rate limits
    let uploadedCount = 0;
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const filePath = path.join(folderPath, file);
      
      console.log(`[${i+1}/${imageFiles.length}] Uploading: ${file}`);
      
      try {
        // Upload with original filename
        const result = await cloudinary.uploader.upload(filePath, {
          folder: targetFolder,
          resource_type: 'image',
          use_filename: true,
          unique_filename: true
        });
        
        // Append URL to file
        await fs.appendFile(urlsFile, `${result.secure_url}\n`);
        
        console.log(`✓ Uploaded: ${file} -> ${result.secure_url}`);
        uploadedCount++;
        
        // Sleep to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`✗ Failed to upload ${file}:`, error);
      }
    }
    
    console.log(`\nUpload complete! ${uploadedCount} images uploaded.`);
    console.log(`URLs saved to ${urlsFile}`);
    
    await question('\nPress Enter to continue...');
  } catch (error) {
    console.error('Error uploading images:', error);
    await question('\nPress Enter to continue...');
  }
}

// Generate URLs JSON file
async function generateUrlsJson() {
  try {
    // Get all root folders
    const foldersResult = await cloudinary.api.root_folders();
    const folderNames = foldersResult.folders.map(folder => folder.path);
    
    console.log(`\nFound ${folderNames.length} folders: ${folderNames.join(', ')}`);
    
    // Store URLs by category
    const urlsByCategory = {};
    
    // Process each folder
    for (const folder of folderNames) {
      console.log(`\nProcessing folder: ${folder}`);
      
      let nextCursor = null;
      let resourceCount = 0;
      let categoryUrls = [];
      
      do {
        // Get resources for this folder with pagination
        const result = await cloudinary.api.resources({ 
          type: 'upload',
          prefix: `${folder}/`,
          max_results: 500,
          next_cursor: nextCursor
        });
        
        resourceCount += result.resources.length;
        
        // Add secure URLs to the list
        result.resources.forEach(resource => {
          categoryUrls.push({
            url: resource.secure_url,
            format: resource.format,
            width: resource.width,
            height: resource.height,
            bytes: resource.bytes,
            created_at: resource.created_at
          });
        });
        
        // Update cursor for next page
        nextCursor = result.next_cursor;
        
      } while (nextCursor);
      
      console.log(`Found ${resourceCount} resources in folder ${folder}`);
      
      // Add to category
      let categoryName = folder;
      urlsByCategory[categoryName] = categoryUrls;
    }
    
    // Save URLs to JSON file
    const jsonPath = path.join(__dirname, 'all-images.json');
    await fs.writeFile(jsonPath, JSON.stringify(urlsByCategory, null, 2));
    
    // Count total
    let totalCount = 0;
    Object.keys(urlsByCategory).forEach(category => {
      totalCount += urlsByCategory[category].length;
    });
    
    console.log(`\nSaved ${totalCount} URLs organized by category to ${jsonPath}`);
    
    // Summary of categories
    console.log('\nSummary:');
    Object.keys(urlsByCategory).forEach(category => {
      console.log(`- ${category}: ${urlsByCategory[category].length} images`);
    });
    
    await question('\nPress Enter to continue...');
  } catch (error) {
    console.error('Error generating URLs JSON:', error);
    await question('\nPress Enter to continue...');
  }
}

// Check for duplicates
async function checkDuplicates() {
  try {
    // Ask for the two folders to compare
    console.log('\nAvailable folders:');
    const foldersResult = await cloudinary.api.root_folders();
    foldersResult.folders.forEach(folder => {
      console.log(`- ${folder.name}`);
    });
    
    const folder1 = await question('\nEnter the first folder name: ');
    const folder2 = await question('Enter the second folder name: ');
    
    // Get resources from both folders
    const result1 = await cloudinary.api.resources({ 
      type: 'upload',
      prefix: `${folder1}/`,
      max_results: 500
    });
    
    const result2 = await cloudinary.api.resources({ 
      type: 'upload',
      prefix: `${folder2}/`,
      max_results: 500
    });
    
    console.log(`\nFound ${result1.resources.length} images in "${folder1}" folder`);
    console.log(`Found ${result2.resources.length} images in "${folder2}" folder`);
    
    // Extract filenames (without folders and extensions)
    const filenames1 = result1.resources.map(resource => {
      const fullName = resource.public_id.replace(`${folder1}/`, '');
      return fullName.split('_')[0]; // Remove any suffix like "_abc123"
    });
    
    const filenames2 = result2.resources.map(resource => {
      const fullName = resource.public_id.replace(`${folder2}/`, '');
      return fullName.split('_')[0]; // Remove any suffix like "_abc123"
    });
    
    // Find duplicates
    const duplicates = [];
    
    filenames2.forEach(name => {
      if (filenames1.includes(name)) {
        duplicates.push(name);
      }
    });
    
    console.log(`\nFound ${duplicates.length} duplicate filenames`);
    
    // Display some sample duplicates
    if (duplicates.length > 0) {
      console.log('\nSample duplicates:');
      duplicates.slice(0, 10).forEach(name => {
        console.log(`- ${name}`);
      });
      
      if (duplicates.length > 10) {
        console.log(`  ... and ${duplicates.length - 10} more`);
      }
    }
    
    // Check for unique files in each folder
    const uniqueToFolder1 = filenames1.filter(name => !filenames2.includes(name));
    const uniqueToFolder2 = filenames2.filter(name => !filenames1.includes(name));
    
    console.log(`\nUnique to "${folder1}" folder: ${uniqueToFolder1.length} files`);
    console.log(`Unique to "${folder2}" folder: ${uniqueToFolder2.length} files`);
    
    if (uniqueToFolder1.length > 0) {
      console.log(`\nSample files unique to "${folder1}":`);
      uniqueToFolder1.slice(0, 5).forEach(name => {
        console.log(`- ${name}`);
      });
    }
    
    if (uniqueToFolder2.length > 0) {
      console.log(`\nSample files unique to "${folder2}":`);
      uniqueToFolder2.slice(0, 5).forEach(name => {
        console.log(`- ${name}`);
      });
    }
    
    await question('\nPress Enter to continue...');
  } catch (error) {
    console.error('Error checking duplicates:', error);
    await question('\nPress Enter to continue...');
  }
}

// Delete duplicate images
async function deleteDuplicates() {
  try {
    // Ask for the folder to delete from
    console.log('\nAvailable folders:');
    const foldersResult = await cloudinary.api.root_folders();
    foldersResult.folders.forEach(folder => {
      console.log(`- ${folder.name}`);
    });
    
    const folderToDelete = await question('\nEnter the folder name to delete from: ');
    
    // Get resources from the folder
    const result = await cloudinary.api.resources({ 
      type: 'upload',
      prefix: `${folderToDelete}/`,
      max_results: 500
    });
    
    console.log(`\nFound ${result.resources.length} images in "${folderToDelete}" folder`);
    
    const confirm = await question(`Are you sure you want to delete all ${result.resources.length} images from "${folderToDelete}"? (yes/no): `);
    
    if (confirm.toLowerCase() !== 'yes') {
      console.log('Deletion cancelled.');
      await question('\nPress Enter to continue...');
      return;
    }
    
    console.log('\nDeleting images...');
    
    // Delete each image
    let deletedCount = 0;
    for (const resource of result.resources) {
      try {
        await cloudinary.uploader.destroy(resource.public_id);
        console.log(`✓ Deleted: ${resource.public_id}`);
        deletedCount++;
        
        // Sleep to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`✗ Failed to delete ${resource.public_id}:`, error);
      }
    }
    
    console.log(`\nDeleted ${deletedCount} images from "${folderToDelete}" folder.`);
    
    await question('\nPress Enter to continue...');
  } catch (error) {
    console.error('Error deleting images:', error);
    await question('\nPress Enter to continue...');
  }
}

// Start the program
showMenu();