//Get the contents of the template (_currentScript is available with webcomponents.js, use currentScript if you don't use this Polyfill)
var template = document.currentScript.ownerDocument.querySelector('template');

class WSWeekPicker extends HTMLElement {
  createdCallback() {
    let clone = document.importNode(template.content, true);
    this.createShadowRoot().appendChild(clone);
    this.wrapper = this.shadowRoot.querySelector('.ws-week-wrapper');
    this.input = this.shadowRoot.querySelector('.ws-week-input');
    this.picker = this.shadowRoot.querySelector('.ws-week-picker');
    document.addEventListener('click', (e) => this.closeWeekPicker(e));
    this.input.addEventListener('click', () => this.openWeekPicker());
  }

  openWeekPicker() {
    this.picker.className = 'ws-week-picker opened';
  }

  closeWeekPicker(e) {
    if (e.target.tagName != 'WS-WEEK-PICKER'){
      this.picker.className = 'ws-week-picker';
    }
  }
}

//Register the element with the document
document.registerElement('ws-week-picker', WSWeekPicker);