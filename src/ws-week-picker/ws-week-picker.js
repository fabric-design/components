import {React, Component, PropTypes} from '../imports';
import {WSWeekPickerCalendar} from './ws-week-picker-calendar';

/**
 * @class WSWeekPicker
 * @property {object} props               - properties
 * @property {number} props.selectedYear  - set a preselected year
 * @property {number} props.selectedWeek  - set a preselected week
 * @property {function} props.onChange    - handler which notifies about picked week
 *
 */
export class WSWeekPicker extends Component {
  static defaultProps = {
    selectedYear: null,
    selectedWeek: null,
    onChange: () => {}
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

    this.element = null;
    this.state = {
      show: false,
      selectedYear: props.selectedYear,
      selectedWeek: props.selectedWeek
    };
  }

  /**
   * Initialize a listener to clicks outside of the calender to close it.
   * @returns {void}
   */
  componentDidMount() {
    this.outsideClickListener = document.body.addEventListener('click', e => {
      if (this.state.show && !isDescendant(this.element, e.target)) {
        this.setState({show: false});
      }
    });
  }

  /**
   * Updates the internal state of the component if properties change.
   * @param {Object} newProps React properties
   * @returns {void}
   */
  componentWillReceiveProps(newProps) {
    this.setState({
      selectedYear: newProps.selectedYear === null ? newProps.selectedYear : this.state.selectedYear,
      selectedWeek: newProps.selectedWeek === null ? newProps.selectedWeek : this.state.selectedWeek,
      show: newProps.show === null ? newProps.show : this.state.show
    });
  }

  /**
   * Removes the click outside listener on deletion of this component.
   * @returns {void}
   */
  componentWillUnmount() {
    document.body.removeEventListener('click', this.outsideClickListener);
  }

  /**
   * Handler for new selections on the calendar
   * @param {String} week clicked on week
   * @param {String} year clicked on year
   * @returns {void}
   */
  onChange({week, year}) {
    if (this.state.selectedWeek !== week || this.state.selectedYear !== year) {
      this.setState({
        selectedYear: year,
        selectedWeek: week
      });
      if (this.props.onChange) {
        this.props.onChange({week, year});
      } else {
        this.element.dispatchEvent(new CustomEvent('change', {week, year}, {bubbles: true}));
      }
    }
  }

  /**
   * Open or closes the calendar.
   * @returns {void}
   */
  toggleCalendar() {
    this.setState({show: !this.state.show});
  }

  /**
   * Renders the input and the calendar.
   * @returns {Object} virtual dom
   */
  render() {
    return (
      <div className="ws-week-picker" ref={element => { this.element = element; }}>
        <input
          value={this.state.selectedWeek !== null ? `Week ${this.state.selectedWeek}, ${this.state.selectedYear}` : ''}
          placeholder={'Please choose a week'}
          onClick={() => this.toggleCalendar()}
          readOnly
        />
        <span
          className={`icon icon-${this.state.show ? 'cross' : 'calendar'}`}
          onClick={() => this.toggleCalendar()}
        />
        {this.state.show &&
          <WSWeekPickerCalendar
            onChange={selection => this.onChange(selection)}
            selectedYear={this.state.selectedYear}
            selectedWeek={this.state.selectedWeek}
          />
        }
      </div>
    );
  }
}

/**
 * Check if a child element is descendant of a parent element
 * @param {Element} parent parent element
 * @param {Element} child child element
 * @returns {boolean}
 */
function isDescendant(parent, child) {
  let node = child.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
