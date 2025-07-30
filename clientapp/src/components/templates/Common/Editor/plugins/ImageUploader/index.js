import { toast } from "sonner";
import { uploadFileS3 } from "../../function";

class ImageUploader {
  quill;
  options;
  t;
  loadingOverlay;

  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.t = options.t;

    this.loadingOverlay = this.createLoadingOverlay();

    const toolbar = quill.getModule("toolbar");
    if (toolbar) {
      toolbar.addHandler("image", this.selectImage.bind(this));
    }
  }

  createLoadingOverlay() {
    const overlay = document.createElement("div");
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "1000";
    overlay.style.visibility = "hidden";

    const spinner = document.createElement("div");
    spinner.style.border = "4px solid #e5e7eb";
    spinner.style.borderTop = "4px solid #2563eb";
    spinner.style.borderRadius = "50%";
    spinner.style.width = "40px";
    spinner.style.height = "40px";
    spinner.style.animation = "spin 1s linear infinite";

    overlay.appendChild(spinner);

    const editorContainer = this.quill.root.parentElement;
    if (editorContainer) {
      editorContainer.style.position = "relative";
      editorContainer.appendChild(overlay);
    }

    return overlay;
  }

  showLoadingOverlay() {
    this.loadingOverlay.style.visibility = "visible";
  }

  hideLoadingOverlay() {
    this.loadingOverlay.style.visibility = "hidden";
  }

  // Convert any file path to a previewable URL
  convertToPreviewableUrl(filePath) {
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

  // Convert local file to data URL
  convertFileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  }

  async selectImage() {
    if (this.quill.isEnabled()) {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/png, image/jpeg, image/jpg");
      input.click();

      input.onchange = async () => {
        const file = input.files?.[0];
        if (file) {
          const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
          if (!allowedTypes.includes(file.type)) {
            toast.error("Chỉ chấp nhận ảnh PNG hoặc JPEG");
            return;
          }

          const maxSize = 8 * 1024 * 1024; // 8MB
          if (file.size > maxSize) {
            toast.error("Kích thước ảnh không được lớn hơn 8MB");
            return;
          }

          this.showLoadingOverlay();

          try {
            // Try to upload to server first
            try {
              const url = await uploadFileS3(file);

              if (url) {
                this.insertImage(url, file?.name || `image-alt-${Date.now()}`);
                toast.success("Tải lên ảnh thành công");
                return;
              }
            } catch (uploadError) {
              // Upload failed, will use data URL
            }

            // If upload fails, use data URL for local display
            const dataUrl = await this.convertFileToDataUrl(file);
            this.insertImage(dataUrl, file?.name || `image-alt-${Date.now()}`);
            toast.success("Chèn ảnh local thành công");
          } catch (error) {
            console.error("Error handling image:", error);
            toast.error(error.message || "Lỗi khi xử lý ảnh");
          } finally {
            this.hideLoadingOverlay();
          }
        }
      };
    }
  }

  insertImage(src, alt) {
    try {
      const range = this.quill.getSelection();
      const index = range ? range.index : 0;

      // Convert any file path to previewable URL
      const previewableUrl = this.convertToPreviewableUrl(src);

      // Insert the image
      this.quill.insertEmbed(index, "image", previewableUrl);

      // Add a newline after the image
      this.quill.insertText(index + 1, "\n");

      // Set cursor position after the image
      this.quill.setSelection(index + 2);
    } catch (error) {
      console.error("Error inserting image:", error);
      toast.error("Lỗi khi chèn ảnh vào editor");
    }
  }
}

export default ImageUploader;
