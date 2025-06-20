import Quill from 'quill';

const BlockEmbed: any = Quill.import('blots/block/embed');

const ATTRIBUTES = ['alt', 'height', 'width', 'style'];

class VideoBlot extends BlockEmbed {
  static create(value: any) {
    const node = super.create();
    if (typeof value === 'object' && value?.key) {
      node.setAttribute('data-key', value?.key);
    }
    if (typeof value === 'string' || typeof value?.src === 'string') {
      node.setAttribute('src', value?.src || value);
    }
    node.setAttribute('controls', 'true');
    node.setAttribute('width', 'auto');
    node.setAttribute('height', 'auto');
    return node;
  }

  static formats(domNode: any) {
    return ATTRIBUTES.reduce(function (formats: any, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  static value(node: HTMLElement) {
    return {
      src: node.getAttribute('src'),
      key: node.getAttribute('data-key') || null,
    };
  }

  format(name: string, value: string) {
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

VideoBlot.blotName = 'video';
VideoBlot.tagName = 'iframe';

export default VideoBlot;
