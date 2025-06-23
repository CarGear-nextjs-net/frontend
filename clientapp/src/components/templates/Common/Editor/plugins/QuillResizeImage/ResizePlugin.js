import { format } from "@/utils/functions";
import "./ResizePlugin.css";
import { I18n, defaultLocale } from "./i18n";

class ResizeElement extends HTMLElement {
  originSize = null;
}

const template = `
<div class="handler" title="{0}"></div>
`;
class ResizePlugin {
  resizeTarget;
  resizer = null;
  container;
  editor;
  startResizePosition = null;
  i18n;
  options;

  constructor(resizeTarget, container, editor, options) {
    this.i18n = new I18n(options?.locale || defaultLocale);
    this.options = options;
    this.resizeTarget = resizeTarget;
    if (!resizeTarget.originSize) {
      resizeTarget.originSize = {
        width: resizeTarget.clientWidth,
        height: resizeTarget.clientHeight,
      };
    }

    this.editor = editor;
    this.container = container;
    this.initResizer();
    this.positionResizerToTarget(resizeTarget);

    this.resizing = this.resizing.bind(this);
    this.endResize = this.endResize.bind(this);
    this.startResize = this.startResize.bind(this);
    this.toolbarClick = this.toolbarClick.bind(this);
    this.toolbarInputChange = this.toolbarInputChange.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.bindEvents();
  }

  initResizer() {
    let resizer = this.container.querySelector("#editor-resizer");
    if (!resizer) {
      resizer = document.createElement("div");
      resizer.setAttribute("id", "editor-resizer");
      resizer.innerHTML = format(
        template,
        this.i18n.findLabel("altTip"),
        this.i18n.findLabel("floatLeft"),
        this.i18n.findLabel("center"),
        this.i18n.findLabel("floatRight"),
        this.i18n.findLabel("restore"),
        this.i18n.findLabel("inputTip")
      );
      this.container.appendChild(resizer);
    }
    this.resizer = resizer;
  }

  positionResizerToTarget(el) {
    if (this.resizer !== null) {
      this.resizer.style.setProperty("left", `${el.offsetLeft}px`);
      this.resizer.style.setProperty("top", `${el.offsetTop - this.editor.scrollTop}px`);
      this.resizer.style.setProperty("width", `${el.clientWidth}px`);
      this.resizer.style.setProperty("height", `${el.clientHeight}px`);
    }
  }

  onScroll() {
    this.positionResizerToTarget(this.resizeTarget);
  }

  _setStylesForToolbar(type, styles) {
    const storeKey = `_styles_${type}`;
    const style = this.resizeTarget.style;
    const originStyles = this.resizeTarget[storeKey];
    style.cssText = `${style.cssText.replace(" ", "").replace(originStyles, "")};${styles}`;
    this.resizeTarget[storeKey] = styles;

    this.positionResizerToTarget(this.resizeTarget);
    this.options?.onChange(this.resizeTarget);
  }

  toolbarInputChange(e) {
    const target = e.target;
    const type = target.dataset.type;
    const value = target.value;
    if (type && Number(value)) {
      this._setStylesForToolbar(type, `width: ${Number(value)}%;`);
    }
  }

  toolbarClick(e) {
    const target = e.target;
    const type = target.dataset.type;

    if (type && target.classList.contains("btn")) {
      this._setStylesForToolbar(type, target.dataset.styles);
    }
  }

  startResize(e) {
    const target = e.target;
    if (target.classList.contains("handler") && e.which === 1) {
      this.startResizePosition = {
        left: e.clientX,
        top: e.clientY,
        width: this.resizeTarget.clientWidth,
        height: this.resizeTarget.clientHeight,
      };
    }
  }

  endResize() {
    this.startResizePosition = null;
    this.options?.onChange(this.resizeTarget);
  }

  resizing(e) {
    if (!this.startResizePosition) return;
    const deltaX = e.clientX - this.startResizePosition.left;
    const deltaY = e.clientY - this.startResizePosition.top;
    let width = this.startResizePosition.width;
    let height = this.startResizePosition.height;

    width += deltaX;
    height += deltaY;

    if (e.altKey) {
      const originSize = this.resizeTarget.originSize;
      const rate = originSize.height / originSize.width;
      height = rate * width;
    }

    const editor = document.getElementsByClassName("ql-editor");

    if (width < editor[0].clientWidth - 30) {
      this.resizeTarget.style.setProperty("width", `${Math.max(width, 30)}px`);
      this.resizeTarget.style.setProperty("height", `${Math.max(height, 30)}px`);
      this.resizeTarget.setAttribute("width", Math.max(width, 30).toString());
      this.resizeTarget.setAttribute("height", Math.max(height, 30).toString());
    }

    this.positionResizerToTarget(this.resizeTarget);
  }

  bindEvents() {
    if (this.resizer !== null) {
      this.resizer.addEventListener("mousedown", this.startResize);
      this.resizer.addEventListener("click", this.toolbarClick);
      this.resizer.addEventListener("change", this.toolbarInputChange);
    }
    window.addEventListener("mouseup", this.endResize);
    window.addEventListener("mousemove", this.resizing);
    this.editor.addEventListener("scroll", this.onScroll);

    this.container.addEventListener("mousedown", this.onOutsideClick);
  }

  onOutsideClick = (e) => {
    if (!this.container.contains(e.target)) {
      this.destory();
    }
  };

  destory() {
    this.container.removeChild(this.resizer);
    window.removeEventListener("mouseup", this.endResize);
    window.removeEventListener("mousemove", this.resizing);
    this.editor.removeEventListener("scroll", this.onScroll);
    this.resizer = null;
  }
}

export default ResizePlugin;
