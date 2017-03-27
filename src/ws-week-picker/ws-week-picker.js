import {React, Component} from '../imports';
import {WSWeekPickerCalendar} from './ws-week-picker-calendar';
import './ws-week-picker.scss';

/**
 * @class WSWeekPicker
 * @extends Component
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
  }

  static propTypes = {
    selectedYear: React.PropTypes.number,
    selectedWeek: React.PropTypes.number,
    onChange: React.PropTypes.func
  }

  /**
   * @param {Object} props React properties
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      selectedYear: null,
      selectedWeek: null
    };
  }

  /**
   * Initialize a listener to clicks outside of the calender to close it.
   */
  componentDidMount() {
    this.outsideClickListener = document.body.addEventListener('click', e => {
      if (this.state.show && !isDescendant(this.elem, e.target)) {
        this.setState({show: false});
      }
    });
  }

  /**
   * Removes the click outside listener on deletion of this component.
   */
  componentWillUnmount() {
    document.body.removeEventListener(this.outsideClickListener);
  }

  /**
   * Updates the internal state of the component if properties change.
   * @param {Object} newProps React properties
   */
  componentWillReceiveProps(newProps) {
    this.setState({
      selectedYear: newProps.selectedYear == null ? newProps.selectedYear : this.state.selectedYear,
      selectedWeek: newProps.selectedWeek == null ? newProps.selectedWeek : this.state.selectedWeek,
      show: newProps.show == null ? newProps.show : this.state.show
    });
  }

  /**
   * Open or closes the calendar.
   */
  toggleCalendar() {
    this.setState({show: !this.state.show});
  }

  /**
   * Handler for new selections on the calendar.
   * @param {Object} {week, year} clicked on week and according year
   */
  onChange({week, year}) {
    if (this.state.selectedWeek !== week || this.state.selectedYear !== year) {
      this.setState({
        selectedYear: year,
        selectedWeek: week
      });
      this.props.onChange && this.props.onChange({week, year});
    }
  }

  /**
   * Renders the input and the calendar.
   */
  render() {
    return (
      <div className="ws-week-picker" ref={elem => this.elem = elem}>
        <input
          value={this.state.selectedWeek != null ? `Week ${this.state.selectedWeek}, ${this.state.selectedYear}` : ''}
          placeholder={'Please choose a week'}
          onClick={() => this.toggleCalendar()}
          readOnly
        />
        <i className={`icon icon-${this.state.show ? 'cross' : 'calendar'} icon16`}
          onClick={() => this.toggleCalendar()}
        />
        {this.state.show ? <WSWeekPickerCalendar onChange={selection => this.onChange(selection)} selectedYear={this.state.selectedYear} selectedWeek={this.state.selectedWeek} /> : null}
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
  while (node != null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
