import {render} from 'imports';

/**
 * Creates and wraps React / Preact components for easier testing
 */
export class TestComponent {

  /**
   * @type {HTMLElement}
   */
  container;

  /**
   * @type {Component}
   */
  component;

  /**
   * Initialize the component and render the jsx as React / Preact component
   * @param {Object|Function} jsx JSX to render. A callback to retrieve updated jsx can be passed as well
   */
  constructor(jsx) {
    this.jsx = jsx;
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    this.render();
  }

  /**
   * Render the given jsx to DOM
   * @returns {void}
   */
  render() {
    // Preact returns HTMLDomElement with component in ._component variable || React is returning WSHeader Object
    const result = render(typeof this.jsx === 'function' ? this.jsx() : this.jsx, this.container);
    // eslint-disable-next-line no-underscore-dangle
    this.component = result._component || result;
  }

  /**
   * Remove container form DOM for garbage collection
   * @returns {void}
   */
  dispose() {
    document.body.removeChild(this.container);
  }

  /**
   * Helper function for querySelector and querySelectorAll
   * @param {string} selector CSS Selector string
   * @returns {null|Element|Array<Element>} Returns null if nothing found, Element if one was found and otherwise an Array
   */
  q(selector) {
    const results = this.container.querySelectorAll(selector);
    if (!results || !results.length) {
      return null;
    }
    if (results.length === 1) {
      return results[0];
    }
    return Array.from(results);
  }
}
