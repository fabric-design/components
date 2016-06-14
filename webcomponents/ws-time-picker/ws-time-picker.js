//Get the contents of the template (_currentScript is available with webcomponents.js, use currentScript if you don't use this Polyfill)
var template = document.currentScript.ownerDocument.querySelector('template');

var hoursValue, minutesValue;

class WSTimePicker extends HTMLElement {
  createdCallback() {
    let clone = document.importNode(template.content, true);
    this.createShadowRoot().appendChild(clone);
    this.hour = new Date().getHours();
    this.minutes = new Date().getMinutes();
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
    this.hoursInput.addEventListener('change', () => this.hourChange());
    this.minutesInput.addEventListener('change', () => this.minutesChange());
    this.input.addEventListener('click', () => this.openTimePicker());
    this.hourUpButton.addEventListener('click', () => this.hourUp());
    this.hourDownButton.addEventListener('click', () => this.hourDown());
    this.minuteUpButton.addEventListener('click', () => this.minuteUp());
    this.minuteDownButton.addEventListener('click', () => this.minuteDown());
    this.cancelButton.addEventListener('click', () => this.cancel());
    this.okButton.addEventListener('click', () => this.ok());
  }

  openTimePicker() {
    this.div.className = 'time-picker opened';
    if (!this.hoursInput.value && !this.minutesInput.value ||
         this.minutesInput.className != 'minutes fail' || this.hoursInput.className != 'hours fail') {
      this.minutesInput.className = 'minutes';
      this.hoursInput.className = 'hours';
      this.hoursInput.value = this.hour < 10 ? '0' + this.hour : this.hour;
      this.minutesInput.value = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    }
  }

  hourChange() {
    if (this.checkHourValidity(this.hoursInput.value)) {
      this.hoursInput.className = 'hours';
      this.hoursInput.value = this.hoursInput.value < 10 ? '0'+ this.hoursInput.value : this.hoursInput.value;
    }
  }

  checkHourValidity(hour) {
    if (hour <= 23 && Number.isInteger(Number(hour)) == true &&
      hour.length == 2 || hour.length == 1 && hour >= 0) {
      return true;
    } else {
      this.hoursInput.className = 'hours fail';
    }
  }

  minutesChange() {
    if (this.checkMinutesValidity(this.minutesInput.value)) {
      this.minutesInput.className = 'minutes';
      this.minutesInput.value = this.minutesInput.value < 10 ? '0'+ this.minutesInput.value : this.minutesInput.value;
    }
  }

  checkMinutesValidity(minutes) {
    if (minutes <= 59 && Number.isInteger(Number(minutes)) == true &&
      minutes.length == 2 || minutes.length == 1 && minutes >= 0) {
      return true;
    } else {
      this.minutesInput.className = 'minutes fail';
    }
  }

  hourUp() {
    var newHour = Number(this.hoursInput.value) + 1;
    if (newHour == 24) {
      this.hoursInput.value = '00';
    } else if (Number(newHour)<10) {
      this.hoursInput.value = '0'+newHour;
    } else {
      this.hoursInput.value = newHour;
    }
  }

  hourDown() {
    var newHour = Number(this.hoursInput.value) - 1;
    if (newHour == 0) {
      this.hoursInput.value = 23;
    } else if (Number(newHour)<10) {
      this.hoursInput.value = '0'+newHour;
    } else {
      this.hoursInput.value = newHour;
    }
  }

  minuteUp() {
    var newMinutes = Number(this.minutesInput.value) + 5;
    if (newMinutes >= 60) {
      this.minutesInput.value = '0' + (newMinutes - 60);
    } else {
      this.minutesInput.value = newMinutes<10 ? '0'+newMinutes : newMinutes;
    }
  }

  minuteDown() {
    var newMinutes = Number(this.minutesInput.value) - 5;
    if (newMinutes <= 0) {
      this.minutesInput.value = 60 + newMinutes;
    } else {
      this.minutesInput.value = newMinutes<10 ? '0'+newMinutes : newMinutes;
    }
  }

  ok() {
    if (this.hoursInput.className != 'hours fail' && this.minutesInput.className != 'minutes fail') {
      this.input.value = this.hoursInput.value + ':' + this.minutesInput.value;
      var event = new CustomEvent('time-changed', {
        detail: {
          hours: this.hoursInput.value,
          minutes: this.minutesInput.value
        }
      });
      this.dispatchEvent(event);
      this.div.className = 'time-picker';
    }
  }

  cancel() {
    this.div.className = 'time-picker';
  }
}

//Register the element with the document
document.registerElement('ws-time-picker', WSTimePicker);