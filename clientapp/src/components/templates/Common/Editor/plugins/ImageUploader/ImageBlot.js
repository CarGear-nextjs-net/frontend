import Quill from "quill";

const BlockEmbed = Quill.import("blots/block/embed");

const ATTRIBUTES = ["alt", "height", "width", "style"];

class ImageBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    if (typeof value === "object" && value?.alt) {
      node.setAttribute("src", value.src);
      node.setAttribute("alt", value?.alt);
    }
    if (typeof value === "string" || typeof value?.src === "string") {
      node.setAttribute("src", value?.src || value);
    }
    node.setAttribute("width", "auto");
    node.setAttribute("height", "auto");
    return node;
  }

  static formats(domNode) {
    return ATTRIBUTES.reduce(function (formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  static value(node) {
    return {
      src: node.getAttribute("src"),
      alt: node.getAttribute("alt"),
    };
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

ImageBlot.blotName = "image";
ImageBlot.tagName = "img";

export default ImageBlot;
