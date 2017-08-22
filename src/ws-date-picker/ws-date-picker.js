import {React, Component, PropTypes} from '../imports';
import Flatpickr from './flatpickr';

/**
 * Renders a date picker component which is based on flatpickr.
 * To specify a date format call the setFormat function with the corresponding format.
 * Pls have a look at the flatpickr formatting rules.
 * You can set additional options to the flatpickr by passing the options property.
 * If you only want to display an icon instead of a input set prop iconOnly.
 *
 * @link https://chmln.github.io/flatpickr/
 */
export class WSDatePicker extends Component {

  static defaultProps = {
    value: null,
    placeholder: '',
    iconOnly: false,
    options: {},
    onChange: () => {}
  };

  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    iconOnly: PropTypes.bool,
    options: PropTypes.object,
    onChange: PropTypes.func
  };

  static format = 'd.m.Y';

  /**
   * Set the format for all date picker instances
   * @param {string} format Format following flatpickr options
   * @returns {void}
   */
  static setFormat(format) {
    this.format = format;
  }

  /**
   * @param {Object} props React properties
   * @constructor
   */
  constructor(props) {
    super(props);
    this.element = null;
    this.input = null;
    this.flatpickr = null;
    this.state = {
      value: props.value
    };
  }

  /**
   * Initialize the flatpickr with given options and prevent default change event
   * @returns {void}
   */
  componentDidMount() {
    this.flatpickr = new Flatpickr(this.input, {
      weekNumbers: true,
      defaultDate: this.state.value,
      dateFormat: this.constructor.format,
      ...this.props.options,
      onChange: this.onChange.bind(this)
    });
    // Prevent default change event bubbling
    this.input.addEventListener('change', event => event.stopPropagation(), true);
  }

  /**
   * Update flatpickr when prop's changed
   * @param {Object} props React props
   * @returns {void}
   */
  componentWillReceiveProps(props) {
    if (props.value) {
      this.flatpickr.setDate(props.value, false, this.props.format);
    }
    // Set options to flatpickr
    Object.keys(props.options || {}).forEach(key => {
      this.flatpickr.set(key, props.options[key]);
    });
  }

  /**
   * Destroy the flatpickr and all events and bindings
   * @returns {void}
   */
  componentWillUnmount() {
    this.flatpickr.destroy();
    this.input.removeEventListener('change', event => event.stopPropagation(), true);
  }

  /**
   * Handle date selections and propagate the value via an custom change event and onChange callback
   * @param {Date} selectedDate The currently selected date
   * @param {String} value The date as string using the in props specified formatting
   * @returns {void}
   */
  onChange([selectedDate], value) {
    this.setState({value});
    this.element.dispatchEvent(new CustomEvent('change', {detail: {date: selectedDate, value}, bubbles: true}));
    // Propagate if wanted
    if (this.props.onChange) {
      this.props.onChange(selectedDate);
    }
  }

  /**
   * Render the component
   * @returns {Object}
   */
  render() {
    return (
      <div
        className={`ws-date-picker ${this.props.iconOnly ? 'icon-only' : 'with-input'}`}
        ref={element => { this.element = element; }}
      >
        {!this.props.iconOnly && [
          <input
            defaultValue={this.state.value}
            placeholder={this.props.placeholder}
            ref={element => { this.input = element; }}
            key="input"
          />,
          <span className="icon icon-calendar icon16" key="icon" />
        ]}
        {this.props.iconOnly &&
          <span
            className="icon icon-calendar icon16"
            ref={element => { this.input = element; }}
            onClick={event => this.flatpickr.open(event)}
          />
        }
      </div>
    );
  }
}
