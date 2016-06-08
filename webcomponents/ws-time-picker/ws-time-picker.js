//Get the contents of the template (_currentScript is available with webcomponents.js, use currentScript if you don't use this Polyfill)
var template = document.currentScript.ownerDocument.querySelector('template');

class WSTimePicker extends HTMLElement {
  createdCallback() {
    let clone = document.importNode(template.content, true);
    this.createShadowRoot().appendChild(clone);
    this.one = 1;
    this.input = this.shadowRoot.querySelector('.ws-time-picker');
    this.div = this.shadowRoot.querySelector('.time-picker');
    this.hoursInput = this.shadowRoot.querySelector('.hours');
    this.minutesInput = this.shadowRoot.querySelector('.minutes');
    this.hourUpButton = this.shadowRoot.querySelector('.hourUp');
    this.hourDownButton = this.shadowRoot.querySelector('.hourDown');
    this.minuteUpButton = this.shadowRoot.querySelector('.minuteUp');
    this.minuteDownButton = this.shadowRoot.querySelector('.minuteDown');
    this.cancelButton = this.shadowRoot.querySelector('.cancel');
    this.okButton = this.shadowRoot.querySelector('.ok');
    this.shadowRoot.addEventListener('click', () => this.openTimePicker());
    hourUpButton.addEventListener('click', () => this.hourUp());
    hourDownButton.addEventListener('click', () => this.hourDown());
    minuteUpButton.addEventListener('click', () => this.minuteUp());
    minuteDownButton.addEventListener('click', () => this.minuteDown());
    cancelButton.addEventListener('click', () => this.cancel());
    okButton.addEventListener('click', () => this.ok());
  }
  
  openTimePicker() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    this.hoursInput.value = hours < 10 ? '0' + hours : hours;
    this.minutesInput.value = minutes < 10 ? '0' + minutes : minutes;
    this.div.className = 'time-picker opened';
  }

  hourUp() {
    console.log(hoursInput.value);
    this.shadowRoot.querySelector('.hours').value = Number(this.shadowRoot.querySelector('.hours').value) + 1;
    console.log(hoursInput.value);
  }

  hourDown() {
    this.hoursInput.value = Number(this.hoursInput.value) - 1;
  }

  minuteUp() {
    this.minutesInput.value += 5;
  }

  minuteDown() {
    this.hoursInput.value = Number(this.minutesInput.value) - 5;
  }

  ok() {
    this.input.value = this.hoursInput.value + ':' + this.minutesInput.value;
    this.div.className = 'time-picker';
  }

  cancel() {
    this.div.className = 'time-picker';
  }
}

//Register the element with the document
document.registerElement('ws-time-picker', WSTimePicker);