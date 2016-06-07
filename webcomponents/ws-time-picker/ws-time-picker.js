//Get the contents of the template (_currentScript is available with webcomponents.js, use currentScript if you don't use this Polyfill)
var template = document.currentScript.ownerDocument.querySelector('template');
var input, div;

class WSTimePicker extends HTMLElement {
  createdCallback() {
    let clone = document.importNode(template.content, true);
    this.createShadowRoot().appendChild(clone);
    input = this.shadowRoot.querySelector('.ws-time-picker');
    div = this.shadowRoot.querySelector('.time-picker');
    this.shadowRoot.addEventListener('click', this.openTimePicker);
  }
  
  openTimePicker() {
    div.className += ' opened';
  }
}

//Register the element with the document
document.registerElement('ws-time-picker', WSTimePicker);