import {React, Component, PropTypes} from '../imports';
import Flatpickr from './flatpickr';

/**
 * Renders a date picker component which is based on flatpickr.
 * To specify a date format call the setFormat function with the corresponding format.
 * Pls have a look at the flatpickr formatting rules.
 * You can set additional options to the flatpickr by passing the options property.
 * If you only want to display an icon instead of a input set prop iconOnly.
 *
 * @see https://chmln.github.io/flatpickr/
 */
export class WSDatePicker extends Component {
  static defaultProps = {
    value: null,
    placeholder: '',
    className: '',
    iconOnly: false,
    options: {},
    onChange: () => {}
  };

  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    className: PropTypes.string,
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
    this.input.addEventListener('change', this.stopPropagation);
    this.element.addEventListener('click', this.stopPropagation);
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
    this.input.removeEventListener('change', this.stopPropagation);
    this.element.removeEventListener('click', this.stopPropagation);
  }

  /**
   * Handle date selections and propagate the value via an custom change event and onChange callback
   * @param {Date} selectedDate The currently selected date
   * @param {string} value The date as string using the in props specified formatting
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
   * Prevent clicks bubbling out
   * @param {MouseEvent} event JavaScript event object
   * @returns {void}
   */
  stopPropagation = event => {
    event.stopPropagation();
  };

  /**
   * Render the component
   * @returns {Object}
   */
  render() {
    const {
      className,
      iconOnly,
      placeholder
    } = this.props;

    return (
      <div
        className={`ws-date-picker ${iconOnly ? 'icon-only' : 'with-input'}`}
        ref={element => { this.element = element; }}
      >
        {!iconOnly && [
          <input
            className={className}
            defaultValue={this.state.value}
            placeholder={placeholder}
            ref={element => { this.input = element; }}
            key="input"
          />,
          <span className="icon icon-calendar icon16" key="icon" />
        ]}
        {iconOnly &&
          <span
            className={`icon icon-calendar icon16 ${className}`}
            ref={element => { this.input = element; }}
            onClick={event => this.flatpickr.open(event)}
            onKeyDown={event => this.flatpickr.open(event)}
          />
        }
      </div>
    );
  }
}
