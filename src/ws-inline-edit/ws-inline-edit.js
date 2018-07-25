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
    look: 'default',
    disabled: false,
    onChange: () => {}
  };

  /**
   * Types of properties
   */
  static propTypes = {
    value: PropTypes.string,
    options: PropTypes.object,
    type: PropTypes.oneOf(['text', 'number', 'price']),
    look: PropTypes.oneOf(['narrow', 'default']),
    disabled: PropTypes.bool,
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
    this.input.addEventListener('keydown', this.onKeyDown);
    this.input.addEventListener('blur', this.onBlur);
    this.input.addEventListener('change', this.stopPropagation);
    this.resizeInput();
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
    this.input.removeEventListener('keydown', this.onKeyDown);
    this.input.removeEventListener('keyup', this.onKeyUp);
    this.input.removeEventListener('blur', this.onBlur);
    this.input.removeEventListener('change', this.stopPropagation);
  }

  /**
   * Handles click on value to enable editing
   * @param {Event} event JavaScript event object
   * @returns {void}
   */
  onFocus = event => {
    event.stopPropagation();

    if (!this.state.isEditing) {
      this.resizeInput();
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
    event.preventDefault();
    const inputValue = event.target.value;

    switch (event.key) {
      case 'Enter':
        this.submit(inputValue);
        break;
      case 'Escape':
        this.abort();
        break;
      default:
        this.resizeInput();
        this.setState({
          isValid: this.type.validate(inputValue),
          inputValue
        });
    }
  };

  /**
   * Resize already on
   * @param event
   */
  onKeyDown = event => {
    event.stopPropagation();

    if (event.key.length === 1) {
      this.resizeInput(event.key);
    } else {
      this.resizeInput();
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
   * Stop native events from bubbling up
   * @param {Event} event JavaScript event object
   * @returns {void}
   */
  stopPropagation = event => {
    event.stopPropagation();
  };

  /**
   * Create component state
   * @param {Object} props React props
   * @returns {{isEditing: boolean, inputValue: *, initialValue: *, isValid: boolean}}
   */
  createState(props) {
    this.type = TypeHandler.getStrategy(props.type, props.options);
    return {
      isEditing: false,
      isValid: true,
      inputValue: props.value,
      initialValue: props.value
    };
  }

  /**
   * Aborts editing and restores the initial value
   * @returns {void}
   */
  abort() {
    this.setState({
      isEditing: false,
      isValid: true,
      inputValue: this.state.initialValue
    });
  }

  /**
   * Propagate changed value
   * @param {string} inputValue Current value in input
   * @returns {void}
   */
  submit(inputValue) {
    const state = {isEditing: false, inputValue};
    // Don't permit submission on wrong values
    if (!this.type.validate(inputValue)) {
      return;
    }
    // Propagate value changes
    if (inputValue !== this.state.initialValue) {
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

  resizeInput(additionalChars) {
    if (this.props.look !== 'narrow') {
      return;
    }

    const style = window.getComputedStyle(this.input);
    const calculator = document.createElement('div');
    calculator.style.fontSize = style.fontSize;
    calculator.style.lineHeight = style.lineHeight;
    calculator.style.margin = style.margin;
    calculator.style.padding = style.padding;
    calculator.style.visibility = 'hidden';
    calculator.style.position = 'absolute';
    calculator.style.top = '-1000px';
    calculator.innerText = this.input.value + (additionalChars || '');

    document.body.appendChild(calculator);
    this.input.style.width = `${calculator.clientWidth}px`;
    document.body.removeChild(calculator);
  }

  /**
   * Render the complete inline-edit component
   * @returns {Object}
   */
  render() {
    const {isEditing, isValid, inputValue} = this.state;
    const {type, look, disabled} = this.props;

    let classes = 'ws-inline-edit';
    classes += isEditing ? ' is-editing' : '';
    classes += ` ${type}`;
    classes += look === 'narrow' ? ' mod-narrow' : '';
    classes += disabled ? ' is-disabled' : '';

    return (
      <div className={classes} ref={element => { this.element = element; }} >
        <div className="input-wrapper">
          <input
            type="text"
            className={!isValid ? 'is-invalid' : ''}
            ref={element => { this.input = element; }}
            value={inputValue}
          />
          {!isValid &&
            <span className="icon icon16 icon-cross" />
          }
        </div>
      </div>
    );
  }
}
