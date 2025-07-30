export function format(str, ...values) {
  return str.replace(/\{(\d+)\}/g, function (_match, index) {
    if (values.length > index) {
      return values[index];
    } else {
      return "";
    }
  });
}

function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}
export function generateSlug(name) {
  return removeVietnameseTones(name)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

export function flattenCategories(categories) {
  let flat = [];
  categories.forEach((cat) => {
    flat.push(cat);
    if (cat.children && cat.children.length > 0) {
      flat = flat.concat(flattenCategories(cat.children));
    }
  });
  return flat;
}

export function convertToPreviewableUrl(filePath) {
  if (!filePath) return filePath;

  // Handle file:// URLs
  if (filePath.startsWith("file:///")) {
    const filePathWithoutPrefix = filePath.replace("file:///", "");

    // Check if it's a database-image path
    if (filePathWithoutPrefix.includes("database-image")) {
      const databaseImageIndex = filePathWithoutPrefix.indexOf("database-image");
      const relativePath = filePathWithoutPrefix.substring(
        databaseImageIndex + "database-image".length + 1
      );
      const encodedPath = encodeURIComponent(relativePath);
      return `/api/database-images/${encodedPath}`;
    }

    // For other local files
    const encodedPath = encodeURIComponent(filePathWithoutPrefix);
    return `/api/local-image/${encodedPath}`;
  }

  // Handle Windows file paths (C:\...)
  if (filePath.startsWith("C:") || filePath.startsWith("D:")) {
    const encodedPath = encodeURIComponent(filePath);
    return `/api/local-image/${encodedPath}`;
  }

  // Handle Unix file paths (/...)
  if (filePath.startsWith("/")) {
    const encodedPath = encodeURIComponent(filePath);
    return `/api/local-image/${encodedPath}`;
  }

  // If it's already a valid URL (http/https), return as is
  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }

  // If it's a data URL, return as is
  if (filePath.startsWith("data:")) {
    return filePath;
  }

  // For any other case, try to treat it as a local file
  const encodedPath = encodeURIComponent(filePath);
  return `/api/local-image/${encodedPath}`;
}
