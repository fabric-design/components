import {React, Component} from '../imports';

/**
 * Quick array of all month abriviations
 */
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/**
 * Quick array of all month shown. There are two from the last year and two from the next year.
 */
const allMonths = [months[10], months[11]].concat(months).concat([months[0], months[1]]);

/**
 * Renders a week picker calendar component.
 */
export class WSWeekPickerCalendar extends Component {
  static defaultProps = {
    selectedYear: null,
    selectedWeek: null,
    onChange: () => {}
  };

  static propTypes = {
    selectedYear: React.PropTypes.number,
    selectedWeek: React.PropTypes.number,
    onChange: React.PropTypes.func
  };

  /**
   * @param {Object} props React properties
   * @constructor
   */
  constructor(props) {
    super(props);

    // if there is a week selected show the according year on start
    // else show the current year
    const selectedDate = props.selectedYear != null && props.selectedWeek != null
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
   * @param {{week: number, year: number}[][]} weeksPerMonth Array that holds 4 or 5 weeks for every column index of allMonth.
   * @returns {JSX.Elements[]}
  */
  buildWeekRows(weeksPerMonth) {
    // there are up to 5 weeks per month
    return [0, 1, 2, 3, 4].map(weekIndex =>
      <tr key={weekIndex}>
        {
          allMonths.map((month, monthIndex) => {
            const weekInMonth = weeksPerMonth[monthIndex][weekIndex];
            if (weekInMonth == null) return <td key={`${monthIndex}_${weekIndex}`}></td>;
            const {week, year} = weekInMonth;
            return (
              <td className={(monthIndex < 2 || monthIndex > 13 ? 'off ' : '')
                  + (this.isActive(year, week) ? 'active ' : '')
                  + (this.isToday(year, week) ? 'today ' : '')}
                key={`${monthIndex}_${weekIndex}`}
                onClick={() => this.props.onChange({week, year})}
              >
                <a className="week">{week}</a>
              </td>
            );
          })
        }
      </tr>);
  }

  /**
   * Renders the calendar.
   * @returns {void}
   */
  render() {
    const weeksPerMonth = [];
    for (let i = -2; i <= 13; i++) {
      weeksPerMonth.push(getWeeks(i, this.state.showingYear));
    }
    return (
      <div className="ws-date-picker-calendar">
        <table>
          <caption>
            <span className="prev" onClick={() => this.prevYear()}><i className="icon icon-left" />{this.state.showingYear - 1}</span>
            <span className="next" onClick={() => this.nextYear()}>{this.state.showingYear + 1}<i className="icon icon-right" /></span>
            <span>{this.state.showingYear}</span>
          </caption>
          <thead>
            <tr>
              {allMonths.map((month, index) => <th key={index}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            {this.buildWeekRows(weeksPerMonth)}
          </tbody>
        </table>
      </div>
    );
  }
}

/**
 * Calculate a date from a week and its year. Date is based on the monday of that week.
 * src: http://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number
 * @param {number} year Year of the week
 * @param {number} week Week
 * @returns {Date}
*/
function getDateOfISOWeek(week, year) {
    var simple = new Date(year, 0, 1 + (week - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}

/**
 * Calculate a week number from a date. Weeks are starting on Monday.
 * src: https://gist.github.com/dblock/1081513
 * @param {Date} date Date
 * @returns {Date}
*/
function getWeekOfYear(date) {

  // Create a copy of this date object
  var target  = new Date(date.valueOf());

  // ISO week date weeks start on monday
  var dayNr   = date.getDay();

  // Set the target to the thursday of this week so the
  // target date is in the right year
  target.setDate(target.getDate() - dayNr + 3);

  // ISO 8601 states that week 1 is the week
  // with january 4th in it
  var jan4    = new Date(target.getFullYear(), 0, 4);

  // Number of days between target date and january 4th
  var dayDiff = (target - jan4) / 86400000;

  // Calculate week number: Week 1 (january 4th) plus the
  // number of weeks between target date and january 4th
  var weekNr = 1 + Math.ceil(dayDiff / 7);

  return weekNr;

}

/**
 * Calculate all weeks that are in a certain month.
 * @param {number} week Week
 * @param {number} year Year of the week
 * @returns {{week: number, year: number}[]}
*/
function getWeeks(month, year) {
  while (month > 11) {
    ++year;
    month = month - 12;
  }
  while (month < 0) {
    --year;
    month = month + 12;
  }
  let startWeek = getWeekOfYear(new Date(year, month, 1));
  // 1.1. is always 1st week
  if (month === 0) {
    startWeek = 1;
  } else {
    startWeek = getDateOfISOWeek(startWeek, year).getMonth() !== month ? startWeek + 1 : startWeek;
  }
  let endWeek = getWeekOfYear(new Date(year, month + 1, 0));
  // the last day of the year can already be in the first week of the next year
  if (endWeek === 1) {
    endWeek = getWeekOfYear(new Date(year, month + 1, -7));
  } else {
    endWeek = getDateOfISOWeek(endWeek, year).getMonth() !== month ? endWeek - 1 : endWeek;
  }
  let weeks = [];
  for (let i = startWeek; i <= endWeek; i++) {
    weeks.push({
      week: i,
      year
    });
  }
  return weeks;
}