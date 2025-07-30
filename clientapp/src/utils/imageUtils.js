/**
 * Convert file:// URLs to API URLs for serving images
 * @param {string} fileUrl - The file:// URL to convert
 * @returns {string} - The API URL
 */
export function convertFileUrlToApiUrl(fileUrl) {
  if (!fileUrl) return fileUrl;

  // Handle file:// URLs
  if (fileUrl.startsWith("file:///")) {
    // Remove file:/// prefix
    const filePath = fileUrl.replace("file:///", "");

    // Check if it's a database-image path
    if (filePath.includes("database-image")) {
      // Extract the relative path from database-image
      const databaseImageIndex = filePath.indexOf("database-image");
      const relativePath = filePath.substring(databaseImageIndex + "database-image".length + 1);

      // Convert to API URL
      const encodedPath = encodeURIComponent(relativePath);
      return `/api/database-images/${encodedPath}`;
    }

    // For other local files, use the local-image API
    const encodedPath = encodeURIComponent(filePath);
    return `/api/local-image/${encodedPath}`;
  }

  // Handle Windows file paths (C:\...)
  if (fileUrl.startsWith("C:") || fileUrl.startsWith("D:")) {
    const encodedPath = encodeURIComponent(fileUrl);
    return `/api/local-image/${encodedPath}`;
  }

  // Return as is if it's already a valid URL
  return fileUrl;
}

/**
 * Check if a URL is a local file path that needs conversion
 * @param {string} url - The URL to check
 * @returns {boolean} - True if it needs conversion
 */
export function isLocalFileUrl(url) {
  return url && (url.startsWith("file:///") || url.startsWith("C:") || url.startsWith("D:"));
}
