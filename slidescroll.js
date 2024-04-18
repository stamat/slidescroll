import { shallowMerge } from 'book-of-spells'

/**
 * @name Slidescroll
 * @description A minimal ES6 module slider based on scrollIntoView
 */
export default class Slidescroll {
  constructor(element, options) {
    this.init(element, options)
  }

  init(element, options) {
    this.element = element
    this.options = {
      
    }

    if (typeof element === 'string') this.element = document.querySelector(element)

    if (!this.element || !(this.element instanceof HTMLElement)) {
      throw new Error('slidescroll: element property not provided, or element not found')
    }

    if (this.element.getAttribute('data-slidescroll-initialized') === 'true') {
      throw new Error('slidescroll: element already initialized')
    }

    shallowMerge(
      this.options,
      options
    )
    
    /**
     * @event Slidescroll#init
     * @type {object}
     * @property {object} detail - The event details
     * @property {Slidescroll} detail.slidescroll - The initialized slideshow
     * @example
     * document.addEventListener('slidescroll:init', (e) => {
     *  console.log(e.detail.slidescroll)
     * })
     */
    this.dispatchEvent('init')
  }

  dispatchEvent(type, options = {}) {
    if (!this.slides || !this.slides.length) return
    const event = new CustomEvent(`slidescroll:${type}`, {
      detail: {
        ...options,
        slidescroll: this
      }
    })
    this.element.dispatchEvent(event)
    document.dispatchEvent(event)
  }
}
