import {React, Component, PropTypes} from '../imports';

const KEY_ENTER = 13;

/**
 * Renders renders a text input inside a dropdown container to provide a free text dropdown component.
 * Possible options are value and placeholder which are both strings.
 * @property {Object} props React properties object
 * @property {string} props.value Value of text input
 * @property {string} props.placeholder Placeholder for text inputs (Filter input or Input only version)
 * @property {Function} props.handle Function used to propagate data
 */
export class DropdownInput extends Component {
  /**
   * @type {Object}
   */
  static defaultProps = {
    value: null,
    placeholder: '',
    handle: () => {}
  };

  /**
   * @type {Object}
   */
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    handle: PropTypes.func
  };

  /**
   * @param {Object} props React props
   */
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  /**
   * Prevent default change event to bubble up
   * @returns {void}
   */
  componentDidMount() {
    this.input.addEventListener('change', event => event.stopPropagation());
  }

  /**
   * Prevent default change event to bubble up
   * @returns {void}
   */
  componentWillUnmount() {
    this.input.removeEventListener('change', event => event.stopPropagation());
  }

  /**
   * Call submit on enter key
   * @param {KeyboardEvent} event JavaScript Event object
   * @returns {Boolean}
   */
  onKeyDown(event) {
    if (event.which === KEY_ENTER) {
      this.onSubmit();
      event.preventDefault();
      return false;
    }
    return true;
  }

  /**
   * Set input value to state
   * @param {KeyboardEvent} event JavaScript event object
   * @returns {void}
   */
  onChange(event) {
    this.setState({value: event.target.value});
  }

  /**
   * Called when enter or submit key is pressed
   * @returns {void}
   */
  onSubmit() {
    this.props.handle('change', this.state.value);
  }

  /**
   * Gets the height of the menu container to scale the outer container up
   * @returns {Number}
   */
  getHeight() {
    return this.menuContainer.clientHeight;
  }

  /**
   * @returns {Object}
   */
  render() {
    return (
      <ul className="dropdown-menu dropdown-root-menu" ref={element => { this.menuContainer = element; }}>
        <li className="dropdown-input" key="filter">
          <input
            type="text"
            defaultValue={this.state.value}
            placeholder={this.props.placeholder}
            onKeyDown={event => this.onKeyDown(event)}
            onBlur={event => this.onChange(event)}
            ref={element => { this.input = element; }}
          />
        </li>
        <li className="dropdown-submit" key="submit">
          <button className="mod-small" onClick={() => this.onSubmit()}>OK</button>
        </li>
      </ul>
    );
  }
}
