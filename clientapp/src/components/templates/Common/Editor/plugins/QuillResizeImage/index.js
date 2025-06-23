import IframeOnClick from "./IframeClick";
import ResizePlugin from "./ResizePlugin";

function QuillResizeImage(quill, options) {
  const container = quill.root;
  let resizeTarge = null;
  let resizePlugin = null;

  function triggerTextChange() {
    const Delta = quill.getContents().constructor;
    const delta = new Delta().retain(1);
    quill.updateContents(delta);
  }

  container.addEventListener("click", (e) => {
    const target = e.target;
    if (
      e.target &&
      ["img", "video", "iframe"].includes(target.tagName.toLowerCase()) &&
      target.src &&
      !target.src.includes("image-placeholder") &&
      quill.isEnabled()
    ) {
      resizeTarge = target;
      resizePlugin = new ResizePlugin(target, container.parentElement, container, {
        ...options,
        onChange: triggerTextChange,
      });
    }
  });

  quill.on("text-change", (_delta, _source) => {
    // iframe 大小调整
    if (quill.isEnabled()) {
      IframeOnClick.iframes = [];
      container.querySelectorAll("iframe").forEach((item) => {
        IframeOnClick.track(item, () => {
          resizePlugin?.destory();
          resizePlugin = null;
          resizeTarge = null;
          resizeTarge = item;
          resizePlugin = new ResizePlugin(item, container.parentElement, container, {
            ...options,
            onChange: triggerTextChange,
          });
        });
      });
    }
  });

  document.addEventListener(
    "mousedown",
    (e) => {
      const target = e.target;
      if (target !== resizeTarge && !resizePlugin?.resizer?.contains(target)) {
        resizePlugin?.destory();
        resizePlugin = null;
        resizeTarge = null;
      }
    },
    { capture: true }
  );
}

export default QuillResizeImage;
