var template = document.currentScript.ownerDocument.querySelector('template');

function updateDateValue(value) {
  let event = new CustomEvent("date-changed", {
    detail: {
      date: value
    }
  });
  document.dispatchEvent(event);
}

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