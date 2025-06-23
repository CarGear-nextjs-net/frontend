class Iframe {
  hasTracked = false;
  constructor(element, cb) {
    this.element = element;
    this.cb = cb;
  }
}

class IframeClick {
  static resolution = 200;
  static iframes = [];
  static interval = null;

  static track(element, cb) {
    this.iframes.push(new Iframe(element, cb));
    if (!this.interval) {
      this.interval = setInterval(() => {
        IframeClick.checkClick();
      }, this.resolution);
    }
  }

  static checkClick() {
    if (document.activeElement) {
      const activeElement = document.activeElement;
      for (const iframe of this.iframes) {
        if (activeElement === iframe.element) {
          if (iframe.hasTracked == false) {
            iframe.cb.apply(window, []);
            iframe.hasTracked = true;
          }
        } else {
          iframe.hasTracked = false;
        }
      }
    }
  }

  static clearIframe() {
    this.iframes = [];
  }
}

export default IframeClick;
