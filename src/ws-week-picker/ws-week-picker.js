import {React, Component} from '../imports';

export class WSWeekPicker extends Component {
  static defaultProps = {
    year: null,
    week: null,
    onChange: () => {}
  };
  static propTypes = {
    year: React.PropTypes.number,
    week: React.PropTypes.number,
    onChange: React.PropTypes.func
  };

  /**
   * @param {Object} props React properties
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      year: props.year,
      week: props.week
    };
  }

  createdCallback() {
    // Take all main DOM elements
    let clone = document.importNode(template.content, true);
    this.createShadowRoot().appendChild(clone);
    this.open = false;
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.getAttributes();
    this.getElements();
    this.addListeners();
    this.setInputValue();
  }

  // Take all elements from week picker
  getElements() {
    this.wrapper = this.shadowRoot.querySelector('.ws-week-wrapper');
    this.input = this.shadowRoot.querySelector('.ws-week-input');
    this.calendar = this.shadowRoot.querySelector('.ws-week-picker');
    this.crossIcon = this.shadowRoot.querySelector('input + i');
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
    document.addEventListener('click', (e) => this.open && e.target != this ? this.closeWeekPicker() : null);
    this.input.addEventListener('click', (e) => this.open ? this.closeWeekPicker() : this.openWeekPicker());
    this.crossIcon.addEventListener('click', (e) => this.open ? this.closeWeekPicker() : this.openWeekPicker());
    this.calendar.addEventListener('click', (e) => this.calendarClick(e));
    this.prevYearButton.addEventListener('click', () => this.moveYearBefore());
    this.nextYearButton.addEventListener('click', () => this.moveYearAfter());
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

      let pickedDate = parseDate(this.pickedWeekYear, this.pickedWeekWrapper.innerHTML);
      this.parseDates(pickedDate);
      this.setInputValue();
      this.closeWeekPicker();
      this.propagateWeekChanges(this.selectedWeek, this.selectedYear);
    }
  }

  // build calendar year, months and week numbers
  buildCalendar() {
    this.destroyCalendar();
    this.buildYears();
    this.buildWeeksAndMonth();
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

  openWeekPicker() {
    this.open = true;
    // Prevent on every click full redraw calendar
    this.calendar.className = 'ws-week-picker opened';
    this.input.className = 'ws-week-input active';
    this.crossIcon.className = 'icon icon-cross';
    // If input clear draw calendar and define current week and select it
    if (!this.pickedWeekWrapper) {
      this.buildCalendar();
      this.highlightCurrentWeek();
    } else {
      // if input have value - define current week as selected at previous time
      this.pickedWeekWrapper.className = 'week now';
    }
  }

  // Close calendar if user don't click on calendar
  closeWeekPicker() {
    this.open = false;
    this.calendar.className = 'ws-week-picker';
    this.input.className = 'ws-week-input used';
    this.crossIcon.className = 'icon icon-calendar';
  }

  setInputValue() {
    this.input.value = `${this.selectedWeek}-${this.curYear}`;
  }

  // Changed year if user click left arrow button
  moveYearBefore() {
    this.curYear -= 1;
    this.prevYear -= 1;
    this.nextYear -= 1;
    this.buildCalendar();
    this.highlightCurrentWeek();
  }

  // Changed year if user click right arrow button
  moveYearAfter() {
    this.curYear += 1;
    this.prevYear += 1;
    this.nextYear += 1;
    this.buildCalendar();
    this.highlightCurrentWeek();
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
    this.prevYearWeeksNumbers = weeksNumbersForYear(this.prevYear).slice(10);
    // Draw month and it weeks in different spans
    this.prevYearWeeksNumbers.forEach((month, i) => {
      this.prevYearWeeks.innerHTML += `<span class="weekNumbers">
                                          <span class="month">${self.months[i+10]}</span>
                                          <span class="week">${month.join('</span><span class="week">')}</span>
                                       </span>`;
    });
    this.curYearWeeksNumbers = weeksNumbersForYear(this.curYear);
    this.curYearWeeksNumbers.forEach((month, i) => {
      this.curYearWeeks.innerHTML += `<span class="weekNumbers">
                                          <span class="month">${self.months[i]}</span>
                                          <span class="week">${month.join('</span><span class="week">')}</span>
                                       </span>`;
    });
    this.nextYearWeeksNumbers = weeksNumbersForYear(this.nextYear).slice(0,2);
    this.nextYearWeeksNumbers.forEach((month, i) => {
      this.nextYearWeeks.innerHTML += `<span class="weekNumbers">
                                          <span class="month">${self.months[i]}</span>
                                          <span class="week">${month.join('</span><span class="week">')}</span>
                                       </span>`;
    });
  }

  // Highlight the current week number
  highlightCurrentWeek() {
    if (this.selectedYear !== this.curYear) {
      return;
    }
    let wholeWeeks = this.shadowRoot.querySelectorAll('.cur-year .week');
    for (let i=0; i<wholeWeeks.length; i++) {
      if (wholeWeeks[i].innerHTML == this.selectedWeek &&
        wholeWeeks[i].parentElement.firstElementChild.innerHTML == this.selectedMonth) {
        this.pickedWeekWrapper = wholeWeeks[i];
        this.pickedWeekWrapper.className = 'week now';
      }
    }
  }

  getAttributes() {
    let selectedYear = parseInt(this.getAttribute('year'));
    let selectedWeek = parseInt(this.getAttribute('week'));
    this.date = selectedYear && selectedWeek ? parseDate(selectedYear,selectedWeek) : new Date();
    this.parseDates(this.date);
  }

  parseDates(date) {
    this.curYear = this.selectedYear = date.getFullYear();
    this.selectedMonth = this.months[date.getMonth()];
    this.selectedWeek = getWeek(this.selectedYear, date.getMonth(), date.getDate());
  }

  propagateWeekChanges(week, year) {
    let event = new CustomEvent("change", {
      detail: {
        week,
        year
      }
    });
    this.dispatchEvent(event);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    switch (attrName) {
      case "year":
      case "week":
        this.getAttributes();
        this.buildCalendar();
        this.setInputValue();
        break;
    }
  };
}

//Register the element with the document
document.registerElement('ws-week-picker', WSWeekPicker);

//
// HELPERS
//
function getWeek(year,month,day) {
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

function parseDate(year,week) {
  var simple = new Date(year, 0, 1 + (week - 1) * 7);
  var dow = simple.getDay();
  var ISOweekStart = simple;
  if (dow <= 4)
    ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else
    ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
}

// Calculate all week numbers of year in January and save them in array
// January is explicitly to other months, because need to calculate first week of year
// It can be week number from previous year
function janWeekNumbers(year) {
  let firstMonthWeeks = [];
  let firstWeek = getWeek(year, 0, 1);
  let lastWeek = getWeek(year, 0, 31);
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
function weekNumbersByMonth(year, month) {
  let monthWeeks = [];
  let firstWeek = getWeek(year, month, 1);
  let lastWeek = getWeek(year, month, 31);
  for (let j=firstWeek; j<=lastWeek; j++) {
    monthWeeks.push(j);
  }
  return monthWeeks;
}

// Array of all weeks in year, splited by month
function weeksNumbersForYear(year) {
  let weeks = [];
  weeks[0] = janWeekNumbers(year);
  for (let i=1; i<=11; i++){
    weeks[i] = weekNumbersByMonth(year, i);
  }
  return weeks;
}
