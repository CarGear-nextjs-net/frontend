import { toast } from "sonner";
// import { uploadFileS3 } from '../../function';

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

  async selectImage() {
    if (this.quill.isEnabled()) {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/png, image/jpeg");
      input.click();

      input.onchange = async () => {
        const file = input.files?.[0];
        if (file) {
          const allowedTypes = ["image/png", "image/jpeg"];
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
            // const url = await uploadFileS3(file);
            const url = "";

            if (url) {
              this.insertImage(url, file?.name || `image-alt-${Date.now()}`);
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (_error) {
            toast.error("Lỗi khi tải lên ảnh");
          } finally {
            this.hideLoadingOverlay();
          }
        }
      };
    }
  }

  insertImage(src, alt) {
    const range = this.quill.getSelection();
    const delta = this.quill.insertEmbed(range.index, "image", { src: src, alt: alt });
    this.quill.history.record(delta);
  }
}

export default ImageUploader;
