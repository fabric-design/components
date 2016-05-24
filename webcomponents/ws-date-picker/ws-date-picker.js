var template = document.currentScript.ownerDocument.querySelector('template');

class WSDatePicker extends HTMLInputElement {
  createdCallback() {
    let clone = document.importNode(template.content, true);
    // This element uses Shadow DOM.
    this.createShadowRoot().appendChild(clone);
    let wsDatePicker = this.shadowRoot.querySelector('.ws-date-picker');
    flatpickr(wsDatePicker);
  }
}

document.registerElement('ws-date-picker', WSDatePicker);