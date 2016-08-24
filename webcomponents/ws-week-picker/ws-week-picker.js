//Get the contents of the template (_currentScript is available with webcomponents.js, use currentScript if you don't use this Polyfill)
var currentScript = document._currentScript || document.currentScript;
var template = currentScript.ownerDocument.querySelector('template');

class WSWeekPicker extends HTMLElement {
  createdCallback() {
    // Take all main DOM elements
    let clone = document.importNode(template.content, true);
    this.createShadowRoot().appendChild(clone);
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.date = new Date();
    this.curYear = this.date.getFullYear();
    this.curMonth = this.months[this.date.getMonth()];
    this.curWeek = this.getWeek(this.curYear, this.date.getMonth(), this.date.getDate());
    this.getElements();
    this.addListeners();
  }
  // Take all elements from week picker
  getElements() {
    this.wrapper = this.shadowRoot.querySelector('.ws-week-wrapper');
    this.input = this.shadowRoot.querySelector('.ws-week-input');
    this.calendar = this.shadowRoot.querySelector('.ws-week-picker');
    this.crossIcon = this.shadowRoot.querySelector('#ws-week-icon');
    this.prevYearButton = this.shadowRoot.querySelector('.checkPrevYear');
    this.nextYearButton = this.shadowRoot.querySelector('.checkNextYear');
    // Calculate previous year and take previous year and weeks elements
    this.prevYear = this.curYear-1;
    this.prevYearNumber = this.shadowRoot.querySelector('.prev-year > .year');
    this.prevYearWeeks = this.shadowRoot.querySelector('.prev-year > .weeks');
    // Take current year and weeks elements
    this.curYearNumber = this.shadowRoot.querySelector('.cur-year > .year');
    this.curYearWeeks = this.shadowRoot.querySelector('.cur-year > .weeks');
    // Calculate next year and take next year and weeks elements
    this.nextYear = this.curYear+1;
    this.nextYearNumber = this.shadowRoot.querySelector('.next-year > .year');
    this.nextYearWeeks = this.shadowRoot.querySelector('.next-year > .weeks');
  }
  // Attach all event liteners
  addListeners() {
    document.addEventListener('click', (e) => this.closeWeekPicker(e));
    this.input.addEventListener('click', () => this.openWeekPicker());
    this.crossIcon.addEventListener('click', () => this.cancel());
    this.calendar.addEventListener('click', (e) => this.calendarClick(e));
    this.prevYearButton.addEventListener('click', () => this.moveYearBefore());
    this.nextYearButton.addEventListener('click', () => this.moveYearAfter());
  }
  // build calendar year, months and week numbers
  buildCalendar(){
    this.buildYears();
    this.buildWeeksAndMonth();
  }

  openWeekPicker() {
    // Prevent on every click full redraw calendar
    this.calendar.className = 'ws-week-picker opened';
    this.input.className = 'ws-week-input active';
    this.crossIcon.className = 'ws-week-icon active';
    // If input clear draw calendar and define current week and select it
    if (this.input.value == '') {
      this.buildCalendar();
      this.defineCurrent();
    } else {
      // if input have value - define current week as selected at previous time
      this.pickedWeekWrapper.className = 'week now';
    }
  }

  calendarClick(e) {
    // If user pick on week number take all elements to return result to input field and close calendar
    if (e.target.className == 'week' || e.target.className == 'week now') {
      if (e.target.parentElement.parentElement.parentElement.className == 'prev-year') {
        this.pickedWeekYear = e.target.parentElement.parentElement.parentElement.children[1].firstElementChild.innerHTML
      } else {
        this.pickedWeekYear = e.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML;
      }
      this.pickedWeekWrapper.className = 'week';
      this.pickedWeekWrapper = e.target;
      this.pickedWeekWrapper.className = 'week now';
      this.pickedResult = `${this.pickedWeekWrapper.innerHTML}-${this.pickedWeekYear}`;
      this.input.value = this.pickedResult;
      this.cancel();
    }
  }
  // Just hide calendar on cross icon click
  cancel() {
    this.calendar.className = 'ws-week-picker';
    this.input.className = 'ws-week-input used';
    this.crossIcon.className = 'ws-week-icon';
  }
  // Changed year if user click left arrow button
  moveYearBefore() {
    this.destroyCalendar();
    this.curYear -= 1;
    this.prevYear -= 1;
    this.nextYear -= 1;
    this.buildCalendar();
  }
  // Changed year if user click right arrow button
  moveYearAfter() {
    this.destroyCalendar();
    this.curYear += 1;
    this.prevYear += 1;
    this.nextYear += 1;
    this.buildCalendar();
  }
  // Clean all generated elements if user change year
  destroyCalendar() {
    this.prevYearNumber.innerHTML = '';
    this.prevYearWeeks.innerHTML = '';
    this.curYearNumber.innerHTML = '';
    this.curYearWeeks.innerHTML = '';
    this.nextYearNumber.innerHTML = '';
    this.nextYearWeeks.innerHTML = '';
  }
  // Close calendar if user don't click on calendar
  closeWeekPicker(e) {
    if (e.target.tagName != 'WS-WEEK-PICKER'){
      this.destroyCalendar();
      this.calendar.className = 'ws-week-picker';
      this.input.className = 'ws-week-input used';
      this.crossIcon.className = 'ws-week-icon';
    }
  }

  createElement(tag, className, content) {
    let element = document.createElement(tag);

    if(content)
      element.innerHTML = content;

    if(className)
      element.className = className;

    return element;
  }
  // Calculate week number of year depending on current day
  getWeek(year,month,day) {
    let y2k = number => number < 1000 ? number + 1900 : number;
    let when = new Date(year, month, day);
    let newYear = new Date(year, 0, 1);
    let modDay = newYear.getDay();
    if (modDay == 0) modDay = 6; else modDay--;
    // Days between current day and 1st of January
    let daynum = ((Date.UTC(y2k(year), when.getMonth(), when.getDate(), 0, 0, 0) - Date.UTC(y2k(year), 0, 1, 0, 0, 0)) / 1000 / 60 / 60 / 24) + 1;

    if (modDay < 4 ) {
      var weeknum = Math.floor((daynum+modDay - 1) / 7) + 1;
    } else {
      var weeknum = Math.floor((daynum+modDay - 1) / 7);
      if (weeknum == 0) {
        year--;
        let prevNewYear = new Date(year, 0, 1);
        let prevmodDay = prevNewYear.getDay();
        if (prevmodDay == 0) prevmodDay = 6; else prevmodDay--;
        if (prevmodDay < 4) weeknum = 53; else weeknum = 52;
      }
    }

    return weeknum;
  }
  // Calculate all week numbers of year in January and save them in array
  // January is explicitly to other months, because need to calculate first week of year
  // It can be week number from previous year
  janWeekNumbers(year) {
    let firstMonthWeeks = [];
    let firstWeek = this.getWeek(year, 0, 1);
    let lastWeek = this.getWeek(year, 0, 31);
    if (firstWeek != 1) {
      firstMonthWeeks[0] = firstWeek;
      for (let j=1; j<=lastWeek; j++) {
        firstMonthWeeks.push(j);
      }
    } else {
      for (let j=0; j<lastWeek; j++) {
        firstMonthWeeks.push(j+1);
      }
    }
    return firstMonthWeeks;
  }
  // Return array of all week numbers of year in month
  weekNumbersByMonth(year, month) {
    let monthWeeks = [];
    let firstWeek = this.getWeek(year, month, 1);
    let lastWeek = this.getWeek(year, month, 31);
    for (let j=firstWeek; j<=lastWeek; j++) {
      monthWeeks.push(j);
    }
    return monthWeeks;
  }
  // Array of all weeks in year, splited by month
  weeksNumbersForYear(year){
    let weeks = [];
    weeks[0] = this.janWeekNumbers(year);
    for (let i=1; i<=11; i++){
      weeks[i] = this.weekNumbersByMonth(year, i);
    }
    return weeks;
  }
  // Draw span with year number
  buildYears() {
    this.prevYearNumber.innerHTML = `<span>${this.prevYear}</span>`;
    this.nextYearNumber.innerHTML = `<span>${this.nextYear}</span>`;
    this.curYearNumber.innerHTML = `<span>${this.curYear}</span>`;
  }
  // Draw months and week numbers
  buildWeeksAndMonth() {
    const self = this;
    this.prevYearWeeksNumbers = this.weeksNumbersForYear(this.prevYear).slice(10);
    // Draw month and it weeks in different spans
    this.prevYearWeeksNumbers.forEach((month, i) => {
      this.prevYearWeeks.innerHTML += `<span class="weekNumbers">
                                          <span class="month">${self.months[i+10]}</span>
                                          <span class="week">${month.join('</span><span class="week">')}</span>
                                       </span>`;
    });
    this.curYearWeeksNumbers = this.weeksNumbersForYear(this.curYear);
    this.curYearWeeksNumbers.forEach((month, i) => {
      this.curYearWeeks.innerHTML += `<span class="weekNumbers">
                                          <span class="month">${self.months[i]}</span>
                                          <span class="week">${month.join('</span><span class="week">')}</span>
                                       </span>`;
    });
    this.nextYearWeeksNumbers = this.weeksNumbersForYear(this.nextYear).slice(0,2);
    this.nextYearWeeksNumbers.forEach((month, i) => {
      this.nextYearWeeks.innerHTML += `<span class="weekNumbers">
                                          <span class="month">${self.months[i]}</span>
                                          <span class="week">${month.join('</span><span class="week">')}</span>
                                       </span>`;
    });
  }
  // Define what is current week number
  defineCurrent() {
    const self = this;
    let wholeWeeks = this.shadowRoot.querySelectorAll('.cur-year .week');
    for (let i=0; i<wholeWeeks.length; i++) {
      if (wholeWeeks[i].innerHTML == self.curWeek &&
        wholeWeeks[i].parentElement.firstElementChild.innerHTML == self.curMonth) {
        self.pickedWeekWrapper = wholeWeeks[i];
        self.pickedWeekWrapper.className = 'week now';
      }
    }
  }

}

//Register the element with the document
document.registerElement('ws-week-picker', WSWeekPicker);