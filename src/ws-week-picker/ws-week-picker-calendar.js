import {React, Component, PropTypes} from '../imports';

/**
 * Quick array of all month abbreviations
 */
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/**
 * Quick array of all month shown. There are two from the last year and two from the next year.
 */
const allMonths = [months[10], months[11]].concat(months).concat([months[0], months[1]]);

/**
 * @class WSWeekPickerCalendar
 * @property {object} props               - properties
 * @property {number} props.selectedYear  - set a preselected year
 * @property {number} props.selectedWeek  - set a preselected week
 * @property {function} props.onChange    - handler which notifies about picked week
 */
export class WSWeekPickerCalendar extends Component {
  static defaultProps = {
    selectedYear: null,
    selectedWeek: null,
    onChange: () => { }
  };

  static propTypes = {
    selectedYear: PropTypes.number,
    selectedWeek: PropTypes.number,
    onChange: PropTypes.func
  };

  /**
   * @param {Object} props React properties
   * @constructor
   */
  constructor(props) {
    super(props);

    // if there is a week selected show the according year on start
    // else show the current year
    const selectedDate = props.selectedYear !== null && props.selectedWeek !== null
      ? getDateOfISOWeek(props.selectedWeek, props.selectedYear) : new Date(Date.now());
    this.state = {
      showingYear: selectedDate.getFullYear()
    };

    const today = new Date(Date.now());
    this.todayYear = today.getFullYear();
    this.todayWeek = getWeekOfYear(today);
  }

  /**
   * Show the previous year.
   * @returns {void}
   */
  prevYear() {
    this.setState({
      showingYear: this.state.showingYear - 1
    });
  }

  /**
   * Show the next year.
   * @returns {void}
   */
  nextYear() {
    this.setState({
      showingYear: this.state.showingYear + 1
    });
  }

  /**
   * Checks if a week is selected and therefor equals the input properties.
   * @param {number} year Year of the week
   * @param {number} week Week
   * @returns {boolean}
   */
  isActive(year, week) {
    return this.props.selectedYear === year && this.props.selectedWeek === week;
  }

  /**
   * Checks if a week is the current week.
   * @param {number} year Year of the week
   * @param {number} week Week
   * @returns {boolean}
   */
  isToday(year, week) {
    return this.todayYear === year && this.todayWeek === week;
  }

  /**
   * Builds an array of rows for the calendar. Every row holds one or none week of the month referenced by the column.
   * @returns {Object}
   */
  buildWeekRows() {
    const weeksPerMonth = [];
    for (let i = -2; i <= 13; i++) {
      weeksPerMonth.push(getWeeks(i, this.state.showingYear));
    }
    // there are up to 5 weeks per month
    return [0, 1, 2, 3, 4].map(weekIndex =>
      <tr key={weekIndex}>
        {allMonths.map((month, monthIndex) => {
          const weekInMonth = weeksPerMonth[monthIndex][weekIndex];
          if (weekInMonth === null || weekInMonth === undefined) {
            return <td key={`${monthIndex}_${weekIndex}`} />;
          }
          const {week, year} = weekInMonth;
          return (
            <td
              className={(monthIndex < 2 || monthIndex > 13 ? 'off ' : '')
                        + (this.isActive(year, week) ? 'active ' : '')
                        + (this.isToday(year, week) ? 'today ' : '')}
              key={`${monthIndex}_${weekIndex}`}
              onClick={() => this.props.onChange({week, year})}
            >
              <a className="week">{week}</a>
            </td>
          );
        })}
      </tr>);
  }

  /**
   * Renders the calendar.
   * @returns {Object} virtual dom
   */
  render() {
    return (
      <div className="ws-date-picker-calendar">
        <table>
          <caption>
            <span className="prev" onClick={() => this.prevYear()}>
              <span className="icon icon-left" />
              {this.state.showingYear - 1}
            </span>
            <span className="current_year">{this.state.showingYear}</span>
            <span className="next" onClick={() => this.nextYear()}>
              {this.state.showingYear + 1}
              <span className="icon icon-right" />
            </span>
          </caption>
          <thead>
            <tr>
              {allMonths.map((month, index) => <th key={index}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            {this.buildWeekRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

/**
 * Calculate a date from a week and its year. Date is based on the monday of that week.
 * src: http://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number
 * @param {number} week Week
 * @param {number} year Year of the week
 * @returns {Date}
 */
function getDateOfISOWeek(week, year) {
  const simple = new Date(year, 0, 1 + ((week - 1) * 7));
  const dow = simple.getDay();
  const ISOWeekStart = simple;
  if (dow <= 4) {
    ISOWeekStart.setDate(1 + (simple.getDate() - simple.getDay()));
  } else {
    ISOWeekStart.setDate(simple.getDate() + (8 - simple.getDay()));
  }
  return ISOWeekStart;
}

/**
 * Calculate a week number from a date. Weeks are starting on Monday.
 * src: https://gist.github.com/dblock/1081513
 * @param {Date} date Date
 * @returns {Number}
 */
function getWeekOfYear(date) {
  // Create a copy of this date object
  const target = new Date(date.valueOf());

  // ISO week date weeks start on monday
  const dayNr = date.getDay();

  // Set the target to the thursday of this week so the
  // target date is in the right year
  target.setDate(target.getDate() - (dayNr + 3));

  // ISO 8601 states that week 1 is the week
  // with january 4th in it
  const jan4 = new Date(target.getFullYear(), 0, 4);

  // Number of days between target date and january 4th
  const dayDiff = (target - jan4) / 86400000;

  // Calculate week number: Week 1 (january 4th) plus the
  // number of weeks between target date and january 4th
  return 1 + Math.ceil(dayDiff / 7);
}

/**
 * Calculate all weeks that are in a certain month.
 * @param {number} month Month to get weeks for
 * @param {number} year Year of the week
 * @returns {{week: number, year: number}[]}
 */
function getWeeks(month, year) {
  let actualMonth = month;
  let actualYear = year;
  while (actualMonth > 11) {
    actualYear += 1;
    actualMonth -= 12;
  }
  while (actualMonth < 0) {
    actualYear -= 1;
    actualMonth += 12;
  }
  let startWeek = getWeekOfYear(new Date(actualYear, actualMonth, 1));
  // 1.1. is always 1st week
  if (actualMonth === 0) {
    startWeek = 1;
  } else {
    startWeek = getDateOfISOWeek(startWeek, actualYear).getMonth() !== actualMonth ? startWeek + 1 : startWeek;
  }
  let endWeek = getWeekOfYear(new Date(actualYear, actualMonth + 1, 0));
  // the last day of the year can already be in the first week of the next year
  if (endWeek === 1) {
    endWeek = getWeekOfYear(new Date(actualYear, actualMonth + 1, -7));
  } else {
    endWeek = getDateOfISOWeek(endWeek, actualYear).getMonth() !== actualMonth ? endWeek - 1 : endWeek;
  }
  const weeks = [];
  for (let i = startWeek; i <= endWeek; i++) {
    weeks.push({
      week: i,
      year: actualYear
    });
  }
  return weeks;
}
