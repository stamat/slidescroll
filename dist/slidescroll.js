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
      this.currentIndex = 0;
      this.options = {
        start: 0,
        loop: true,
        behavior: "smooth",
        alignment: "start",
        activeClass: "slidescroll-current-slide",
        trackSelector: ".slidescroll-track",
        slideSelector: ":scope > *",
        next: null,
        prev: null
      };
      this.slides = [];
      this.track = null;
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
      this.track = this.element.querySelector(this.options.trackSelector);
      this.slides = Array.from(this.track.querySelectorAll(this.options.slideSelector));
      this.element.setAttribute("data-slidescroll-initialized", "true");
      this.enumerateSlides();
      this.bindControls();
      this.setInitialSlide(this.options.start);
      let scrollTimeout = null;
      this.element.addEventListener("scroll", () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          this.dispatchEvent("scrollstop");
        }, 150);
      });
      this.dispatchEvent("init");
    }
    setInitialSlide() {
      const slide = this.slides[this.options.start];
      if (!slide)
        return;
      slide.scrollIntoView({ behavior: "instant", block: this.options.alignment, inline: this.options.alignment });
    }
    bindControls() {
      if (!this.options.next && !this.options.prev)
        return;
      this.options.next = typeof this.options.next === "string" ? document.querySelector(this.options.next) : this.options.next;
      this.options.prev = typeof this.options.prev === "string" ? document.querySelector(this.options.prev) : this.options.prev;
      if (this.options.next)
        this.options.next.addEventListener("click", this.next.bind(this));
      if (this.options.prev)
        this.options.prev.addEventListener("click", this.prev.bind(this));
    }
    enumerateSlides(slides = this.slides) {
      slides.forEach((slide, index) => {
        slide.setAttribute("data-slidescroll-index", index);
      });
    }
    isScrollable() {
      return this.isVertical() || this.isHorizontal();
    }
    isVertical() {
      return this.track.scrollHeight > this.track.clientHeight;
    }
    isHorizontal() {
      return this.track.scrollWidth > this.track.clientWidth;
    }
    goTo(index) {
      if (this.options.loop) {
        index = index < 0 ? this.slides.length - 1 : index;
        index = index >= this.slides.length ? 0 : index;
      }
      const slide = this.slides[index];
      if (!slide)
        return;
      this.setActiveSlide(index);
      this.currentIndex = index;
      slide.scrollIntoView({ behavior: this.options.behavior, block: this.options.alignment, inline: this.options.alignment });
      this.dispatchEvent("change", { index });
    }
    next() {
      const index = this.currentIndex + 1;
      this.goTo(index);
    }
    prev() {
      const index = this.currentIndex - 1;
      this.goTo(index);
    }
    setActiveSlide(index) {
      this.slides.forEach((slide, i) => {
        slide.classList.toggle(this.options.activeClass, i === index);
      });
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
