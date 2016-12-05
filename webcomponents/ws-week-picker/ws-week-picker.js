//Get the contents of the template (_currentScript is available with webcomponents.js, use currentScript if you don't use this Polyfill)
var currentScript = document._currentScript || document.currentScript;
var template = currentScript.ownerDocument.querySelector('template');

class WSWeekPicker extends HTMLElement {
  createdCallback() {
    // Take all main DOM elements
    let clone = document.importNode(template.content, true);
    // this.appendChild(clone);
    applyTemplate(this, clone);
    this.open = false;
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.getAttributes();
    this.getElements();
    this.addListeners();
    this.setInputValue();
  }

  // Take all elements from week picker
  getElements() {
    this.wrapper = this.querySelector('.ws-week-wrapper');
    this.input = this.querySelector('.ws-week-input');
    this.calendar = this.querySelector('.ws-week-picker-calendar');
    this.crossIcon = this.querySelector('input + i');
    this.prevYearButton = this.querySelector('.checkPrevYear');
    this.nextYearButton = this.querySelector('.checkNextYear');
    // Calculate previous year and take previous year and weeks elements
    this.prevYear = this.curYear-1;
    this.prevYearNumber = this.querySelector('.prev-year > .year');
    this.prevYearWeeks = this.querySelector('.prev-year > .weeks');
    // Take current year and weeks elements
    this.curYearNumber = this.querySelector('.cur-year > .year');
    this.curYearWeeks = this.querySelector('.cur-year > .weeks');
    // Calculate next year and take next year and weeks elements
    this.nextYear = this.curYear+1;
    this.nextYearNumber = this.querySelector('.next-year > .year');
    this.nextYearWeeks = this.querySelector('.next-year > .weeks');
  }

  // Attach all event liteners
  addListeners() {
    document.addEventListener('click', (e) => {
      this.open && e.target.closest('ws-week-picker') !== this ? this.closeWeekPicker() : null
    });
    this.input.addEventListener('click', (e) => this.open ? this.closeWeekPicker() : this.openWeekPicker());
    this.crossIcon.addEventListener('click', (e) => this.open ? this.closeWeekPicker() : this.openWeekPicker());
    this.calendar.addEventListener('click', (e) => this.calendarClick(e));
    this.prevYearButton.addEventListener('click', () => {
      if (parseDate(this.prevYear, this.prevYearWeeksNumbers[0][0]) < parseDate(this.minYear, this.minWeek)) {
        return;
      }
      this.moveYearBefore();
    });
    this.nextYearButton.addEventListener('click', () => {
      if (parseDate(this.nextYear, this.nextYearWeeksNumbers[1][this.nextYearWeeksNumbers[1].length - 1]) > parseDate(this.maxYear, this.maxWeek)) {
        return;
      }
      this.moveYearAfter();
    });
  }

  calendarClick(e) {
    // If user pick on week number take all elements to return result to input field and close calendar
    if (e.target.classList.contains('week')) {
      let pickedWeekYear, pickedWeek = parseInt(e.target.innerHTML);
      if (e.target.classList.contains('prevYear')) {
        pickedWeekYear = this.prevYear;
      } else if (e.target.classList.contains('nextYear')) {
        pickedWeekYear = this.nextYear;
      } else {
        pickedWeekYear = this.curYear;
      }

      let pickedDate = parseDate(pickedWeekYear, pickedWeek);
      if (pickedDate < parseDate(this.minYear, this.minWeek) || pickedDate > parseDate(this.maxYear, this.maxWeek)) {
        return;
      }

      this.pickedWeekWrapper.classList.remove('now');
      this.pickedWeekWrapper = e.target;
      this.pickedWeekWrapper.classList.add('now');

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
    this.calendar.classList.add('opened');
    this.input.classList.add('active');
    this.crossIcon.className = 'icon icon-cross';
    this.buildCalendar();
    this.highlightCurrentWeek();
  }

  // Close calendar if user don't click on calendar
  closeWeekPicker() {
    this.open = false;
    this.calendar.classList.remove('opened');
    this.input.classList.remove('active');
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
    let prevYearWeeksNumbers = weeksNumbersForYear(this.prevYear).slice(10);
    if (parseDate(this.prevYear, prevYearWeeksNumbers[0][0]) < parseDate(this.minYear, this.minWeek)) {
      this.prevYearButton.setAttribute('disabled', 'disabled');
      this.querySelector('.prev-year .year').setAttribute('disabled', 'disabled')
    } else {
      this.prevYearButton.removeAttribute('disabled');
      this.querySelector('.prev-year .year').removeAttribute('disabled');
    }

    this.nextYearNumber.innerHTML = `<span>${this.nextYear}</span>`;
    let nextYearWeeksNumbers = weeksNumbersForYear(this.nextYear).slice(0,2);
    if (parseDate(this.nextYear, nextYearWeeksNumbers[1][nextYearWeeksNumbers[1].length - 1]) > parseDate(this.maxYear, this.maxWeek)) {
      this.nextYearButton.setAttribute('disabled', 'disabled');
      this.querySelector('.next-year .year').setAttribute('disabled', 'disabled')
    } else {
      this.nextYearButton.removeAttribute('disabled');
      this.querySelector('.next-year .year').removeAttribute('disabled');
    }
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
                                          ${month.map(week => {
                                            return `<span class="prevYear week" 
                                                ${parseDate(this.prevYear, week) < parseDate(this.minYear, this.minWeek) ? 'disabled="disabled"' : ''}>
                                                ${week}</span>`
                                          }).join('')}
                                          </span>
                                       </span>`;
    });
    this.curYearWeeksNumbers = weeksNumbersForYear(this.curYear);
    this.curYearWeeksNumbers.forEach((month, i) => {
      this.curYearWeeks.innerHTML += `<span class="weekNumbers">
                                          <span class="month">${self.months[i]}</span>
                                          ${month.map(week => {
                                            return `<span class="curYear week" 
                                              ${parseDate(this.curYear, week) < parseDate(this.minYear, this.minWeek) 
                                                || parseDate(this.curYear, week) > parseDate(this.maxYear, this.maxWeek)
                                                ? 'disabled="disabled"' 
                                                : ''}>${week}</span>`
                                          }).join('')}
                                       </span>`;
    });
    this.nextYearWeeksNumbers = weeksNumbersForYear(this.nextYear).slice(0,2);
    this.nextYearWeeksNumbers.forEach((month, i) => {
      this.nextYearWeeks.innerHTML += `<span class="weekNumbers">
                                          <span class="month">${self.months[i]}</span>
                                          ${month.map(week => {
                                            return `<span class="nextYear week" 
                                              ${parseDate(this.nextYear, week) > parseDate(this.maxYear, this.maxWeek) ? 'disabled="disabled"' : ''}>${week}</span>`;
                                          }).join('')}
                                       </span>`;
    });
  }

  // Highlight the current week number
  highlightCurrentWeek() {
	let wholeWeeks;
    if (this.selectedYear === this.curYear) {
      wholeWeeks = this.querySelectorAll('.curYear.week');
    } else if (this.selectedYear === this.prevYear) {
      wholeWeeks = this.querySelectorAll('.prevYear.week');
    } else if (this.selectedYear === this.nextYear) {
      wholeWeeks = this.querySelectorAll('.nextYear.week');
    } else {
      return;
    }

    this.pickedWeekWrapper = Array.from(wholeWeeks).find(week => parseInt(week.innerHTML) === this.selectedWeek);
    if (this.pickedWeekWrapper) {
      this.pickedWeekWrapper.classList.add('now');
    }
  }

  getAttributes() {
    let selectedYear = parseInt(this.getAttribute('year'));
    let selectedWeek = parseInt(this.getAttribute('week'));
    this.date = selectedYear && selectedWeek ? parseDate(selectedYear,selectedWeek) : new Date();
    this.parseDates(this.date);
    this.minWeek = this.getAttribute('min-week') || 1;
    this.minYear = this.getAttribute('min-year') || 0;
    this.maxWeek = this.getAttribute('max-week') || 60;
    this.maxYear = this.getAttribute('max-year') || 5000;
  }

  parseDates(date) {
    this.curYear = this.selectedYear = date.getFullYear();
    this.prevYear = this.curYear - 1;
    this.nextYear = this.curYear + 1;
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
      case "min-week":
      case "max-week":
      case "min-year":
      case "max-year":
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
  let firstWeek = 1;
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
    if (weeks[i - 1][weeks[i - 1].length - 1] === weeks[i][0]) {
      weeks[i] = weeks[i].slice(1);
    }
  }
  return weeks;
}
