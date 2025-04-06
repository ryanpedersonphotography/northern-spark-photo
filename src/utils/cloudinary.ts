/**
 * Parse a Cloudinary URL into its components
 */
export function parseCloudinaryUrl(url: string) {
  // Extract base URL (everything before /upload/)
  const baseUrlMatch = url.match(/(.*?)\/upload\//);
  const baseUrl = baseUrlMatch ? baseUrlMatch[1] : '';
  
  // Extract version number
  const versionMatch = url.match(/\/v(\d+)\//);
  const version = versionMatch ? versionMatch[1] : '';
  
  // Extract public ID (everything after version)
  const publicIdMatch = url.match(/\/v\d+\/(.+)$/);
  const publicId = publicIdMatch ? publicIdMatch[1] : '';
  
  return { baseUrl, version, publicId };
}

/**
 * Create a Cloudinary URL with the specified transformations
 */
export interface CloudinaryTransformations {
  crop?: string;
  gravity?: string;
  width?: string | number;
  height?: string | number;
  dpr?: string;
  format?: string;
  quality?: string;
  [key: string]: string | number | undefined;
}

export function createCloudinaryUrl(
  baseUrl: string, 
  version: string, 
  publicId: string, 
  transformations: CloudinaryTransformations = {}
) {
  // Merge with default transformations
  const options = { 
    crop: 'fill', 
    gravity: 'auto:faces',
    width: 1600,
    height: 900,
    dpr: 'auto',
    format: 'auto',
    quality: 'auto',
    ...transformations 
  };
  
  // Build transformation string from all options
  const transformParams: string[] = [];
  
  for (const [key, value] of Object.entries(options)) {
    if (value !== undefined) {
      transformParams.push(`${key.charAt(0)}_${value}`);
    }
  }
  
  const transformString = transformParams.join(',');
  
  // Ensure baseUrl doesn't end with a slash
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  // Construct the final URL
  return `${cleanBaseUrl}/upload/${transformString}/v${version}/${publicId}`;
}

/**
 * Optimize a Cloudinary URL with specified parameters
 */
export function optimizeCloudinaryUrl(url: string, transformations: CloudinaryTransformations = {}) {
  const { baseUrl, version, publicId } = parseCloudinaryUrl(url);
  
  if (!baseUrl || !version || !publicId) {
    console.warn('Invalid Cloudinary URL format:', url);
    return url; // Return original URL if parsing failed
  }
  
  return createCloudinaryUrl(baseUrl, version, publicId, transformations);
}