import { toast } from "sonner";
// import { uploadFileS3 } from '../function';

class PdfUploader {
  quill;
  options;
  loadingOverlay;
  isLoading;
  selectionRange;
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;

    this.isLoading = false;
    this.selectionRange = null;
    this.loadingOverlay = this.createLoadingOverlay();

    const toolbar = quill.getModule("toolbar");
    if (toolbar) {
      toolbar.addHandler("pdf", this.selectPdf.bind(this));
    }

    this.quill.on("selection-change", (range) => {
      if (!this.isLoading) {
        this.selectionRange = range;
      }
    });
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
    this.quill.disable();
    this.isLoading = true;
  }

  hideLoadingOverlay() {
    this.loadingOverlay.style.visibility = "hidden";
    this.quill.enable();
    this.isLoading = false;
  }

  selectPdf() {
    if (this.quill.isEnabled()) {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "application/pdf");
      input.click();

      input.onchange = async () => {
        const file = input.files?.[0];
        if (file) {
          const allowedTypes = ["application/pdf"];
          if (!allowedTypes.includes(file.type)) {
            toast.error("Chỉ chấp nhận file pdf");
            return;
          }

          const maxSize = 8 * 1024 * 1024; // 8MB
          if (file.size > maxSize) {
            toast.error("Kích thước file pdf không được lớn hơn 8MB");
            return;
          }

          this.selectionRange = this.quill.getSelection();

          this.showLoadingOverlay();

          try {
            // const url = await uploadFileS3(file);
            const url = "";

            if (url) {
              this.insertPdfLink(file.name, url);
            } else {
              toast.error("Lỗi khi tải file pdf");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            toast.error("Lỗi khi tải file pdf");
          } finally {
            this.hideLoadingOverlay();
          }
        }
      };
    }
  }

  insertPdfLink(filename, url) {
    const range = this.selectionRange;

    if (range) {
      this.quill.insertText(range.index, filename, "link", url);
      this.quill.setSelection(range.index + filename.length, 0);
    } else {
      console.error("Failed to get selection range.");
    }
  }
}

export default PdfUploader;
