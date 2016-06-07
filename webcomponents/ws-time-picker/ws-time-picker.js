//Get the contents of the template (_currentScript is available with webcomponents.js, use currentScript if you don't use this Polyfill)
var template = document.currentScript.ownerDocument.querySelector('template');

class WSTimePicker extends HTMLElement {
  createdCallback() {
    let clone = document.importNode(template.content, true);
    this.createShadowRoot().appendChild(clone);
    var wsTimePicker = this.shadowRoot.querySelector('.ws-time-picker');
    var divTimePicker = this.shadowRoot.querySelector('.time-picker');
    document.addEventListener('click', this.timePickerClick);
  }
  
  timePickerClick(e) {
    event.target.tagName != 'WS-TIME-PICKER' ? console.log(1) : console.log(2);
  }
}

//Register the element with the document
document.registerElement('ws-time-picker', WSTimePicker);