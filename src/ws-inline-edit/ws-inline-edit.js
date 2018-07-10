import {React, Component, PropTypes} from '../imports';
import {TypeHandler} from './types/type-handler';

/**
 * This class describes a Preact/React component which renders a inline-edit element.
 * The inline-edit component can be used everywhere in block where you want to have ability to change value.
 * As an example you can use it in div blocks, rows, tables.
 */
export class WSInlineEdit extends Component {
  /**
   * Create default onUpdate function to prevent errors if user don't use it
   */
  static defaultProps = {
    value: '',
    options: {},
    type: 'text',
    onChange: () => {}
  };

  /**
   * Types of properties
   */
  static propTypes = {
    value: PropTypes.string,
    options: PropTypes.object,
    type: PropTypes.oneOf(['text', 'number', 'price']),
    onChange: PropTypes.func
  };

  /**
   * @param {Object} props Preact props
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = this.createState(props);
  }

  /**
   * Bind event listeners
   * @returns {void}
   */
  componentDidMount() {
    this.input.addEventListener('focus', this.onFocus);
    this.input.addEventListener('keyup', this.onKeyUp);
    this.input.addEventListener('blur', this.onBlur);
  }

  /**
   * @param {Object} props React props
   * @returns {void}
   */
  componentWillReceiveProps(props) {
    this.setState(this.createState(props));
  }

  /**
   * Unbind event listeners
   * @returns {void}
   */
  componentWillUnmount() {
    this.input.removeEventListener('focus', this.onFocus);
    this.input.removeEventListener('keyup', this.onKeyUp);
    this.input.removeEventListener('blur', this.onBlur);
  }

  /**
   * Handles click on value to enable editing
   * @param {Event} event JavaScript event object
   * @returns {void}
   */
  onFocus = event => {
    event.stopPropagation();

    if (!this.state.isEditing) {
      this.setState({isEditing: true}, () => {
        this.input.select();
        this.input.focus();
      });
    }
  };

  /**
   * Handle keyboard events on input
   * @param {KeyboardEvent} event JavaScript event object
   * @returns {void}
   */
  onKeyUp = event => {
    event.stopPropagation();
    const inputValue = event.target.value;

    switch (event.key) {
      case 'Enter':
        this.submit(inputValue);
        break;
      case 'Escape':
        this.abort();
        break;
      default:
        this.setState({
          isValid: this.type.validate(inputValue),
          value: inputValue
        });
    }
  };

  /**
   * Propagate changed value on blur
   * @param {Event} event JavaScript event object
   * @returns {void}
   */
  onBlur = event => {
    event.stopPropagation();
    this.submit(event.target.value);
  };

  /**
   * Create component state
   * @param {Object} props React props
   * @returns {{isEditing: boolean, value: *}}
   */
  createState(props) {
    this.type = TypeHandler.getStrategy(props.type, props.options);
    return {
      isEditing: false,
      isValid: true,
      value: props.value,
      initialValue: props.value
    };
  }

  /**
   * Propagate changed value
   * @param {string} inputValue Current value in input
   * @returns {{plain: string, value: *}}
   */
  submit(inputValue) {
    const state = {isEditing: false, value: inputValue};
    // Propagate value changes
    if (inputValue !== this.state.initialValue && this.type.validate(inputValue)) {
      state.initialValue = inputValue;

      const eventData = {
        plain: inputValue,
        value: this.type.convert(inputValue)
      };
      this.dispatchEvent('change', eventData);

      if (typeof this.props.onChange === 'function') {
        this.props.onChange(eventData);
      }
    }
    this.setState(state);
  }

  /**
   * Render the complete inline-edit component
   * @returns {Object}
   */
  render() {
    const {isEditing, isValid, value} = this.state;

    let classes = 'ws-inline-edit';
    classes += isEditing ? ' is-editing' : '';
    classes += ` ${this.props.type}`;

    return (
      <div className={classes} ref={element => { this.element = element; }} >
        <div className="input-wrapper">
          <input
            type="text"
            className={!isValid ? 'is-invalid' : ''}
            ref={element => { this.input = element; }}
            value={value}
          />
          {!isValid &&
            <span className="icon icon16 icon-cross" />
          }
        </div>
      </div>
    );
  }
}
