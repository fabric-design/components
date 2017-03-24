import {React, Component} from '../imports';
import {WSWeekPickerCalendar} from './ws-week-picker-calendar';
import './ws-week-picker.scss';

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

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      selectedYear: null,
      selectedWeek: null
    };
  }

  componentDidMount() {
    this.outsideClickListener = document.body.addEventListener('click', e => {
      if (this.state.show && !isDescendant(this.elem, e.target)) {
        this.setState({show: false});
      }
    });
  }

  componentWillUnmount() {
    document.body.removeEventListener(this.outsideClickListener);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      selectedYear: newProps.selectedYear == null ? newProps.selectedYear : this.state.selectedYear,
      selectedWeek: newProps.selectedWeek == null ? newProps.selectedWeek : this.state.selectedWeek,
      show: newProps.show == null ? newProps.show : this.state.show
    });
  }

  toggleCalendar() {
    this.setState({show: !this.state.show});
  }

  onChange({week, year}) {
    this.setState({
      selectedYear: year,
      selectedWeek: week
    });
    this.props.onChange && this.props.onChange({week, year});
  }

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
