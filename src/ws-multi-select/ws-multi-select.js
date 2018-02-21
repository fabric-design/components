import {React, PropTypes} from '../imports';
import {WSDropdown} from '../ws-dropdown/ws-dropdown';

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
    this.input.addEventListener('keyup', this.onKeyUp);
    this.input.addEventListener('focus', this.onFocus);
    this.input.addEventListener('blur', this.onBlur);
  }

  /**
   * Unbind event listeners before detaching from dom
   * @returns {void}
   */
  componentWillUnmount() {
    this.input.removeEventListener('keyup', this.onKeyUp);
    this.input.removeEventListener('focus', this.onFocus);
    this.input.removeEventListener('blur', this.onBlur);
  }

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
    this.open();
  };

  /**
   * Close dropdown when blurring the input
   * @param {Object} event JavaScript event object
   * @returns {void}
   */
  onBlur = event => {
    event.stopPropagation();
    // Delay it to make click listener on dropdown item work
    setTimeout(() => this.close(), 50);
  };

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

    super.setValue(value);
  }

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
        <input type="text" placeholder={this.props.placeholder} ref={element => { this.input = element; }} />
        <span className="icon icon24 icon-magnifiying-glass" />
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
          {this.state.value.map((item, index) =>
            <li key={`selected-item-${index}`}>
              <span className="text">{item.label}</span>
              <span className="icon icon16 icon-cross" onClick={() => this.removeItem(item)} />
            </li>
          )}
        </ul>
      </div>
    );
  }
}
