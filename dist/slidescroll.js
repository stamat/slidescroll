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
      this.visibility = [];
      this.options = {
        start: 0,
        loop: true,
        behavior: "smooth",
        alignment: "start",
        activeClass: "slidescroll-current-slide",
        trackSelector: ".slidescroll-track",
        slideSelector: ":scope > *",
        autoGoTo: false,
        next: null,
        prev: null
      };
      this.slides = [];
      this.track = null;
      this.isScrollingTo = false;
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
      if (this.options.start)
        this.setInitialSlide(this.options.start);
      if (!this.options.start)
        this.calculateSlideVisibility();
      let scrollTimeout = null, lastScrollTop = 0, lastScrollLeft = 0, scrollDirection = "forward";
      this.element.addEventListener("scroll", () => {
        let st = this.element.scrollTop;
        let sl = this.element.scrollLeft;
        if (st < 0)
          st = 0;
        if (sl < 0)
          sl = 0;
        if (st !== lastScrollTop) {
          scrollDirection = st > lastScrollTop ? "forward" : "backward";
        } else if (sl !== lastScrollLeft) {
          scrollDirection = sl > lastScrollLeft ? "forward" : "backward";
        }
        if (scrollTimeout)
          clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (lastScrollLeft !== sl || lastScrollTop !== st)
            return;
          this.dispatchEvent("scrollstop", { direction: scrollDirection });
        }, 100);
        lastScrollTop = st;
        lastScrollLeft = sl;
      });
      if (this.options.autoGoTo)
        this.element.addEventListener("slidescroll:scrollstop", () => {
          if (this.isScrollingTo) {
            this.isScrollingTo = false;
            return;
          }
          this.calculateSlideVisibility();
          const lastVisibleSlide = this.getLastVisibleSlide(scrollDirection);
          if (lastVisibleSlide === void 0)
            return;
          this.goTo(lastVisibleSlide);
        });
      this.dispatchEvent("init");
    }
    calculateSlideVisibility() {
      const containerRect = this.element.getBoundingClientRect();
      this.slides.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect();
        if (rect.bottom < containerRect.top || rect.top > containerRect.bottom || rect.right < containerRect.left || rect.left > containerRect.right) {
          this.visibility[index] = 0;
          return;
        }
        const vVisible = Math.max(0, Math.min(rect.bottom, containerRect.bottom) - Math.max(rect.top, containerRect.top));
        const hVisible = Math.max(0, Math.min(rect.right, containerRect.right) - Math.max(rect.left, containerRect.left));
        const vHeight = rect.bottom - rect.top;
        const hWidth = rect.right - rect.left;
        const visibleArea = vVisible * hVisible;
        const totalArea = vHeight * hWidth;
        this.visibility[index] = visibleArea / totalArea * 100;
      });
    }
    getLastVisibleSlide(direction) {
      if (!this.visibility.length)
        return;
      if (direction === "backward") {
        return this.visibility.findIndex((v) => v > 0);
      }
      for (let i = this.visibility.length - 1; i >= 0; i--) {
        if (this.visibility[i] > 0)
          return i;
      }
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
      this.isScrollingTo = true;
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
