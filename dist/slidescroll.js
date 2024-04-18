/* slideswap v1.0.0 | https://stamat.github.io/slideswap/ | MIT License */
(() => {
  // node_modules/book-of-spells/src/helpers.mjs
  function shallowMerge(target, source) {
    for (const key in source) {
      target[key] = source[key];
    }
    return target;
  }

  // slidescroll.js
  var Slidescroll = class {
    constructor(element, options) {
      this.init(element, options);
    }
    init(element, options) {
      this.element = element;
      this.options = {};
      if (typeof element === "string")
        this.element = document.querySelector(element);
      if (!this.element || !(this.element instanceof HTMLElement)) {
        throw new Error("slidescroll: element property not provided, or element not found");
      }
      if (this.element.getAttribute("data-slidescroll-initialized") === "true") {
        throw new Error("slidescroll: element already initialized");
      }
      shallowMerge(
        this.options,
        options
      );
      this.dispatchEvent("init");
    }
    dispatchEvent(type, options = {}) {
      if (!this.slides || !this.slides.length)
        return;
      const event = new CustomEvent(`slidescroll:${type}`, {
        detail: {
          ...options,
          slidescroll: this
        }
      });
      this.element.dispatchEvent(event);
      document.dispatchEvent(event);
    }
  };

  // build/iife.js
  if (!window.Slidescroll) {
    window.Slidescroll = Slidescroll;
  }
})();
//# sourceMappingURL=slidescroll.js.map
