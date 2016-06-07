//Get the contents of the template (_currentScript is available with webcomponents.js, use currentScript if you don't use this Polyfill)
var template = document.currentScript.ownerDocument.querySelector('template');
var input, div, hoursInput, minutesInput, hourUpButton, hourDownButton,
  minuteUpButton, minuteDownButton, cancelButton, okButton;

class WSTimePicker extends HTMLElement {
  createdCallback() {
    let clone = document.importNode(template.content, true);
    this.createShadowRoot().appendChild(clone);
    input = this.shadowRoot.querySelector('.ws-time-picker');
    div = this.shadowRoot.querySelector('.time-picker');
    hoursInput = this.shadowRoot.querySelector('.hours');
    minutesInput = this.shadowRoot.querySelector('.minutes');
    hourUpButton = this.shadowRoot.querySelector('.hourUp');
    hourDownButton = this.shadowRoot.querySelector('.hourDown');
    minuteUpButton = this.shadowRoot.querySelector('.minuteUp');
    minuteDownButton = this.shadowRoot.querySelector('.minuteDown');
    cancelButton = this.shadowRoot.querySelector('.cancel');
    okButton = this.shadowRoot.querySelector('.ok');
    this.shadowRoot.addEventListener('click', this.openTimePicker);
    hourUpButton.addEventListener('click', this.hourUp);
    hourDownButton.addEventListener('click', this.hourDown);
    minuteUpButton.addEventListener('click', this.minuteUp);
    minuteDownButton.addEventListener('click', this.minuteDown);
    cancelButton.addEventListener('click', this.cancel);
    okButton.addEventListener('click', this.ok);
  }
  
  openTimePicker() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    hoursInput.value = hours < 10 ? '0' + hours : hours;
    minutesInput.value = minutes < 10 ? '0' + minutes : minutes;
    div.className = 'time-picker opened';
  }

  hourUp() {
    console.log(hoursInput.value);
    hoursInput.value = Number(hoursInput.value) + 1;
    console.log(hoursInput.value);
  }

  hourDown() {
    hoursInput.value = Number(hoursInput.value) - 1;
  }

  minuteUp() {
    minutesInput.value += 5;
  }

  minuteDown() {
    hoursInput.value = Number(minutesInput.value) - 5;
  }

  ok() {
    input.value = hoursInput.value + ':' + minutesInput.value;
    div.className = 'time-picker';
  }

  cancel() {
    div.className = 'time-picker';
  }
}

//Register the element with the document
document.registerElement('ws-time-picker', WSTimePicker);