/**
 * @deprecated - This file is kept for backward compatibility.
 * Import from the main cloudinary.ts file instead.
 */

// Manual implementation for backward compatibility

/**
 * Parse a Cloudinary URL into its components
 */
export function parseCloudinaryUrl(url) {
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

export function createCloudinaryUrl(baseUrl, version, publicId, transformations = {}) {
    // Use our new TS utility if possible
    try {
        // Dynamic import might not work in all build systems
        const cloudinaryTs = require('./cloudinary');
        if (cloudinaryTs && cloudinaryTs.generateImageUrl && publicId) {
            return cloudinaryTs.generateImageUrl(publicId, transformations.width, transformations.height);
        }
    } catch (e) {
        console.warn('Failed to use TS utility, falling back to JS implementation');
    }
    
    // Fallback to original implementation
    const paramMapping = {
        dpr: 'dpr',
        quality: 'q'
    };
    
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
    
    const transformParams = [];
    for (const [key, value] of Object.entries(options)) {
        if (value !== undefined) {
            const paramKey = paramMapping[key] || key.charAt(0);
            transformParams.push(`${paramKey}_${value}`);
        }
    }
    const transformString = transformParams.join(',');
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    return `${cleanBaseUrl}/upload/${transformString}/v${version}/${publicId}`;
}

/**
 * Optimize a Cloudinary URL with specified parameters
 */
export function optimizeCloudinaryUrl(url, transformations = {}) {
    const { baseUrl, version, publicId } = parseCloudinaryUrl(url);
    if (!baseUrl || !version || !publicId) {
        console.warn('Invalid Cloudinary URL format:', url);
        return url; // Return original URL if parsing failed
    }
    return createCloudinaryUrl(baseUrl, version, publicId, transformations);
}