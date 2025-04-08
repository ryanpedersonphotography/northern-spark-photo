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
    // Mapping for parameter keys (only for exceptions)
    const paramMapping = {
        dpr: 'dpr',
        quality: 'q'
        // Add other exceptions as needed
    };
    
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
    const transformParams = [];
    for (const [key, value] of Object.entries(options)) {
        if (value !== undefined) {
            // Use mapping if available, otherwise use first character
            const paramKey = paramMapping[key] || key.charAt(0);
            transformParams.push(`${paramKey}_${value}`);
        }
    }
    const transformString = transformParams.join(',');
    
    // Ensure baseUrl doesn't end with a slash
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    
    // Construct the final URL
    return `${cleanBaseUrl}/upload/${transformString}/v${version}/${publicId}`;
}

// old image builder
// export function createCloudinaryUrl(baseUrl, version, publicId, transformations = {}) {
//     // Merge with default transformations
//     const options = {
//         crop: 'fill',
//         gravity: 'auto:faces',
//         width: 1600,
//         height: 900,
//         dpr: 'auto',
//         format: 'auto',
//         quality: 'auto',
//         ...transformations
//     };
//     // Build transformation string from all options
//     const transformParams = [];
//     for (const [key, value] of Object.entries(options)) {
//         if (value !== undefined) {
//             transformParams.push(`${key.charAt(0)}_${value}`);
//         }
//     }
//     const transformString = transformParams.join(',');
//     // Ensure baseUrl doesn't end with a slash
//     const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
//     // Construct the final URL
//     return `${cleanBaseUrl}/upload/${transformString}/v${version}/${publicId}`;
// }
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
