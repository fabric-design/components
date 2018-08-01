import {React} from '../imports';
import {WSDropdown} from '../ws-dropdown/ws-dropdown';

/**
 * This component provides another way to hav a multi select with dropdown.
 * It renders an input which opens a dropdown on focus. Items selected from the dropdown
 * appear in a list below the input.
 *
 * @extends WSDropdown
 * @prop {boolean} filtered Must be true to tell the underlaying dropdown that the filtering is outside
 */
export class WSMultiSelect extends WSDropdown {

  static defaultProps = {
    ...WSDropdown.defaultProps,
    filtered: true
  };

  /**
   * Bind event listeners when attached to DOM
   * @returns {void}
   */
  componentDidMount() {
    window.select = this;
    this.icon.addEventListener('click', this.onClickIcon);
    this.input.addEventListener('keyup', this.onKeyUp);
    this.input.addEventListener('focus', this.onFocus);
    this.input.addEventListener('blur', this.onBlur);
    this.input.addEventListener('change', this.stopPropagation);
    this.element.addEventListener('click', this.stopPropagation);
  }

  /**
   * Unbind event listeners before detaching from dom
   * @returns {void}
   */
  componentWillUnmount() {
    this.icon.removeEventListener('click', this.onClickIcon);
    this.input.removeEventListener('keyup', this.onKeyUp);
    this.input.removeEventListener('focus', this.onFocus);
    this.input.removeEventListener('blur', this.onBlur);
    this.input.removeEventListener('change', this.stopPropagation);
    this.element.removeEventListener('stopPropagation', this.stopPropagation);
  }

  /**
   * Focus input on icon click
   * @param {MouseEvent} event JavaScript event object
   * @returns {void}
   */
  onClickIcon = event => {
    event.stopPropagation();
    this.input.focus();
  };

  /**
   * Handle input change
   * @param {KeyboardEvent} event JavaScript event object
   * @returns {void}
   */
  onKeyUp = event => {
    event.stopPropagation();

    this.setState({filter: event.target.value});
  };

  /**
   * Opening dropdown when focusing the input
   * @param {Event} event JavaScript event object
   * @returns {void}
   */
  onFocus = event => {
    event.stopPropagation();
    this.overlay.open();
  };

  /**
   * Close dropdown when blurring the input
   * @param {Object} event JavaScript event object
   * @returns {void}
   */
  onBlur = event => {
    event.stopPropagation();
    // Delay it to make click listener on dropdown item work
    this.overlay.close();
  };

  /**
   * Stop propagation of native change events
   * @param {Event} event JavaScript event object
   * @returns {void}
   */
  stopPropagation(event) {
    event.stopPropagation();
  }

  /**
   * Create new value
   * @param {Object} item Selected item
   * @returns {void}
   */
  setValue(item) {
    const value = [
      ...this.state.value,
      item
    ];
    // Clear input after selecting a item
    this.setState({filter: ''});
    // Un-setting the overlay height results in reevaluation when opening
    this.overlay.contentHeight = null;

    super.setValue(value);
  }

  /**
   * Remove clicked item from value list
   * @param {Object} item Clicked item
   * @returns {void}
   */
  removeItem(item) {
    item.selected = false;
    item.stored = false;
    const value = this.state.value.filter(i => i !== item);
    super.setValue(value);
  }

  /**
   * @returns {JSX}
   */
  renderTrigger() {
    return (
      <div className="input-wrapper">
        <input
          type="text"
          placeholder={this.props.placeholder}
          defaultValue={this.state.filter}
          ref={element => { this.input = element; }}
        />
        <span className="icon icon16 icon-magnifiying-glass" ref={element => { this.icon = element; }} />
      </div>
    );
  }

  /**
   * @returns {JSX}
   */
  render() {
    const jsx = super.render();
    return (
      <div className="ws-multi-select">
        {jsx}
        <ul className="selected-items">
          {this.state.value.map((item, index) => (
            <li key={`selected-item-${index}`} title={item.label}>
              <span className="text">{item.label}</span>
              <span className="icon icon16 icon-cross" onClick={() => this.removeItem(item)} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
