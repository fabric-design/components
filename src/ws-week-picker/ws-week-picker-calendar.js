import {React, Component} from '../imports';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

    const selectedDate = props.selectedYear != null && props.selectedWeek != null
      ? getDateOfISOWeek(props.selectedWeek, props.selectedYear) : new Date(Date.now());
    this.state = {
      showingYear: selectedDate.getFullYear()
    };

    const today = new Date(Date.now());
    this.todayYear = today.getFullYear();
    this.todayWeek = getWeekOfYear(today);
  }

  prevYear() {
    this.setState({
      showingYear: this.state.showingYear - 1
    });
  }

  nextYear() {
    this.setState({
      showingYear: this.state.showingYear + 1
    });
  }

  isActive(year, week) {
    return this.props.selectedYear === year && this.props.selectedWeek === week;
  }

  isToday(year, week) {
    return this.todayYear === year && this.todayWeek === week;
  }

  buildWeekRows(allMonths, weeksPerMonth) {
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

  render() {
    const weeksPerMonth = [];
    for (let i = -2; i <= 13; i++) {
      weeksPerMonth.push(getWeeks(i, this.state.showingYear));
    }
    const allMonths = [months[10], months[11]].concat(months).concat([months[0], months[1]]);
    return (
      <div>
        <div className="arrow-up"></div>
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
              {this.buildWeekRows(allMonths, weeksPerMonth)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

// src: http://stackoverflow.com/questions/16590500/javascript-calculate-date-from-week-number
function getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}

// src: https://gist.github.com/dblock/1081513
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

function getWeeks(m, y) {
  while (m > 11) {
    ++y;
    m = m - 12;
  }
  while (m < 0) {
    --y;
    m = m + 12;
  }
  let startWeek = getWeekOfYear(new Date(y, m, 1));
  // 1.1. is always 1st week
  if (m === 0) {
    startWeek = 1;
  } else {
    startWeek = getDateOfISOWeek(startWeek, y).getMonth() !== m ? startWeek + 1 : startWeek;
  }
  let endWeek = getWeekOfYear(new Date(y, m + 1, 0));
  // the last da of the year can already be in the first week of the next year
  if (endWeek === 1) {
    endWeek = getWeekOfYear(new Date(y, m + 1, -7));
  }
  let weeks = [];
  for (let i = startWeek; i <= endWeek; i++) {
    weeks.push({
      week: i,
      year: y
    });
  }
  return weeks;
}