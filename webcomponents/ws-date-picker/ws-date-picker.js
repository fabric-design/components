var template = document.currentScript.ownerDocument.querySelector('template');

class WSDatePicker extends HTMLInputElement {
  createdCallback() {
    let clone = document.importNode(template.content, true);
    // This element uses Shadow DOM.
    this.createShadowRoot().appendChild(clone);
    let wsDatePicker = this.shadowRoot.querySelector('.ws-date-picker');
    // All logic in flatpickr.js file
    // API and guide how to use: https://chmln.github.io/flatpickr/
    flatpickr(this.shadowRoot, wsDatePicker);
  }
}

document.registerElement('ws-date-picker', WSDatePicker);