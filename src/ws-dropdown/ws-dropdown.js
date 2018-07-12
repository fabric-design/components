import {React, Component, PropTypes} from '../imports';
import {DropdownMenu} from './dropdown-menu';
import {DropdownInput} from './dropdown-input';
import {WSOverlay} from '../ws-overlay/ws-overlay';

/**
 * Helper function to iterate over all nesting levels without recursion
 * @param {Array} items List of array items with possible children
 * @param {Function} getChildren Callback to get the children of the items
 * @param {Function} callback Will be called with each item. If return value is true the iteration will be aborted
 * @returns {void}
 */
function deep(items, getChildren, callback) {
  const levels = [items];
  for (let l = 0; l < levels.length; l++) {
    // Iterate over items in this nesting level
    for (let i = 0; i < levels[l].length; i++) {
      const item = levels[l][i];
      // Abort iteration if wished
      if (callback(item)) {
        return;
      }
      // Add children to nesting levels
      const children = getChildren(item);
      if (children) {
        levels.push(children);
      }
    }
  }
}

/**
 * This class describes a Preact/React component which renders a dropdown.
 * The dropdown can be used as select, multi select, filterable select or as a simple menu.
 * Regarding the flags the changed value will look different. The flag inputOnly results in a string,
 * the flag multiple results in an array and without those flags the change event details contain an object.
 * As trigger type you can choose between an anchor, button or a select like looking container.
 * @property {Object} props React properties object
 * @property {string} props.type Type of trigger. Can be anchor, button, select or icon
 * @property {string} props.text Text of trigger
 * @property {string} props.icon Class name of icon in trigger
 * @property {boolean} props.multiple Flag if the dropdown is a multi select menu
 * @property {boolean} props.filterable Flag if the dropdown menu is filterable
 * @property {boolean} props.inputOnly Flag if the dropdown only contains a text input and a button
 * @property {string} props.filter Default filter value
 * @property {number} props.limit Limit visible dropdown items. Use together with filterable flag.
 * @property {string} props.orientation Dropdown orientation. Can be either left or right
 * @property {string} props.placeholder Placeholder for text inputs (Filter input or Input only version)
 * @property {boolean} props.selectAll Show button to select all items
 * @property {string} props.onChange Callback for react components to propagate value changes
 */
export class WSDropdown extends Component {
  /**
   * @type {Object}
   */
  static defaultProps = {
    type: 'anchor',
    text: '',
    icon: '',
    items: [],
    className: '',
    multiple: false,
    inputOnly: false,
    filterable: false,
    filter: '',
    filtered: false,
    limit: 10,
    orientation: 'left',
    placeholder: '',
    width: '',
    value: null,
    onChange: () => {},
    disabled: false,
    selectAll: false
  };

  /**
   * @type {Object}
   */
  static propTypes = {
    type: PropTypes.oneOf(['anchor', 'button', 'select', 'icon']),
    text: PropTypes.string,
    icon: PropTypes.string,
    items: PropTypes.array,
    className: PropTypes.string,
    multiple: PropTypes.bool,
    inputOnly: PropTypes.bool,
    filterable: PropTypes.bool,
    filter: PropTypes.string,
    filtered: PropTypes.bool,
    limit: PropTypes.number,
    orientation: PropTypes.oneOf(['left', 'right']),
    placeholder: PropTypes.string,
    width: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    selectAll: PropTypes.bool
  };

  /**
   * @type {Object}
   */
  static childContextTypes = {
    multiple: PropTypes.bool
  };

  /**
   * @param {Object} props React props
   * @constructor
   */
  constructor(props) {
    super(props);
    // Enforce value to be an array for consistent usage
    this.state = this.createState(props);
  }

  /**
   * Called by React to get the types of the child context values
   * @returns {Object}
   */
  getChildContext() {
    return {
      multiple: this.props.multiple
    };
  }

  /**
   * Start listening for clicks in window
   * @returns {void}
   */
  componentDidMount() {
    this.element.addEventListener('click', this.onAnyEvent);
    this.trigger.addEventListener('click', this.onTriggerClick);
  }

  /**
   * Handle changes of passed properties
   * @param {Object} props React props
   * @returns {void}
   */
  componentWillReceiveProps(props) {
    this.setState(this.createState(props));
  }

  /**
   * Stop listening for clicks in window
   * @returns {void}
   */
  componentWillUnmount() {
    this.element.removeEventListener('click', this.onAnyEvent);
    this.trigger.removeEventListener('click', this.onTriggerClick);
  }

  /**
   * Prevent event to bubble up and keep it inside drop down
   * @param {Event} event Event object
   * @returns {void}
   */
  onAnyEvent = event => {
    event.stopPropagation();
  };

  /**
   * Handle clicks on dropdown trigger
   * @param {MouseEvent} event JavaScript event object
   * @returns {void}
   */
  onTriggerClick = event => {
    event.stopPropagation();
    if (!this.props.disabled) {
      this.overlay.toggle();
    }
  };

  /**
   * Call child onOpen function if available
   * @returns {void}
   */
  onOpen() {
    if (typeof this.dropdownMenu.onOpen === 'function') {
      this.dropdownMenu.onOpen();
    }
  }

  /**
   * Call child onOpen function if available
   * @returns {void}
   */
  onClose() {
    if (typeof this.dropdownMenu.onClose === 'function') {
      this.dropdownMenu.onClose();
    }
  }

  /**
   * Get text from labels of selected items
   * @param {string|Object|Array<Object>} value Selected items
   * @param {Array<*>} args Optionally a default text can be passed
   * @returns {string}
   */
  getTextFromValue(value, ...args) {
    const propsText = args.length > 0 ? args[0] : '';
    let text = propsText || (this.state && this.state.text ? this.state.text : '');
    // Check if we have to update the text value
    if (this.props.type === 'select') {
      if (Array.isArray(value)) {
        if (value.length) {
          text = value.map(item => item.label || item).join(', ');
        }
      } else if (value) {
        // Value can be object from dropdown item or simple string from input
        text = value.label || value;
      }
    }
    return text;
  }

  /**
   * Set the value of the dropdown and update the display text if the trigger element is a select
   * @param {Object|Array<Object>} value The new dropdown value
   * @returns {void}
   */
  setValue(value) {
    this.setState({
      text: this.getTextFromValue(value),
      value
    });
    // Propagate change event for React
    if (this.props.onChange) {
      this.props.onChange(value);
    }
    // Delay this event a bit to ensure the close animation happens
    // For some reasons in chrome the animations are sometimes not executed when the dom changes at the same time
    setTimeout(() => {
      // Emit change event to propagate the value
      this.element.dispatchEvent(new CustomEvent('change', {detail: value, bubbles: true}));
    }, 100);
  }

  /**
   * Create state object from properties
   * @param {Object} props React props
   * @returns {Object}
   */
  createState(props) {
    const items = this.enrichItems(props.items);
    let {value} = props;
    // For better usability the value can be a primitive value matching a dropdown item value
    if (typeof value === 'string' && props.type !== 'input') {
      deep(items, item => item.children, item => {
        if (item.value === value) {
          value = item;
          return true;
        }
        return false;
      });
    }
    value = this.enrichItems(value, val => {
      const item = items.find(i => i.value === val);
      return item ? item.label : val;
    });
    const text = this.getTextFromValue(value, props.text);
    const state = {text, value, items, filter: props.filter};
    // Set states to items in item list for passed values
    deep(state.items, item => item.children, item => {
      // Check if item is is values or set it to false
      // This also un-sets previous selected items when the value from outside changed
      const isActive = !!state.value.find(val => val.value === item.value);
      item.selected = isActive;
      item.stored = isActive;
    });
    return state;
  }

  /**
   * Handles data propagation from child elements
   * @param {string} type Either change for value changes or change-height which will be emitted on menu changes
   * @param {Object|number} data Either new value or height of new menu
   * @returns {void}
   */
  handlePropagation = (type, data) => {
    if (type === 'change') {
      this.overlay.close();
      // Un-setting the overlay height results in reevaluation when opening
      this.overlay.contentHeight = null;
      this.setValue(data);
    } else if (type === 'change-height') {
      this.overlay.setHeight(data);
    }
  };

  /**
   * Used to convert the items if they are strings into the required object structure
   * @param {string|Array<string|Object>} items List of items represented as string or object
   * @param {Function} resolveLabel Optional callback to resolve the item label
   * @returns {Array<Object>}
   */
  enrichItems(items, resolveLabel = value => value) {
    let itemsToWrap = items;
    // The dropdown value can be a simple string or object
    if (!Array.isArray(items)) {
      // Value can be null or an string or an object
      itemsToWrap = items ? [items] : [];
    }
    return itemsToWrap.map(item => {
      if (typeof item !== 'object') {
        return {value: item, label: resolveLabel(item)};
      }
      if (item.children) {
        item.children = this.enrichItems(item.children);
      }
      return item;
    });
  }

  /**
   * Renders the dropdown trigger element
   * @returns {Object}
   */
  renderTrigger() {
    let icon;
    if (this.props.icon) {
      icon = <span className={`icon ${this.props.icon}`} />;
    }
    const disabledStyle = this.props.disabled ? ' is-disabled' : '';
    switch (this.props.type) {
      case 'anchor':
        return (
          <a
            href="#void"
            className={`dropdown-trigger ${disabledStyle}`}
            ref={element => { this.trigger = element; }}
          >
            {icon} {this.state.text}
          </a>);
      case 'button':
        return (
          <button
            className={`dropdown-trigger ${disabledStyle}`}
            ref={element => { this.trigger = element; }}
          >
            {icon} {this.state.text}
          </button>);
      case 'select':
        return (
          <div
            className={`dropdown-trigger select-box ${disabledStyle}`}
            ref={element => { this.trigger = element; }}
          >
            {icon} {this.state.text || this.props.placeholder}
          </div>);
      case 'icon':
      default:
        return (
          <a
            href="#void"
            className={`dropdown-trigger ${disabledStyle}`}
            ref={element => { this.trigger = element; }}
          >
            {icon}
          </a>);
    }
  }

  /**
   * Render the content of the dropdown which can be a menu with only input and submit button
   * or a common menu with list items
   * @returns {Object}
   */
  renderContent() {
    // Return either a menu with input and submit button or a common menu
    if (this.props.inputOnly) {
      return (
        <DropdownInput
          value={this.state.value[0]}
          placeholder={this.props.placeholder}
          handle={this.handlePropagation}
          ref={element => { this.dropdownMenu = element; }}
        />
      );
    }
    return (
      <DropdownMenu
        items={this.state.items}
        value={this.state.value}
        limit={this.props.limit}
        filter={this.state.filter}
        filterable={this.props.filterable}
        filtered={this.props.filtered}
        placeholder={this.props.placeholder}
        selectAll={this.props.selectAll}
        handle={this.handlePropagation}
        ref={element => { this.dropdownMenu = element; }}
      />
    );
  }

  /**
   * Render the complete dropdown
   * @returns {Object}
   */
  render() {
    const {
      type,
      className,
      orientation,
      width
    } = this.props;

    const isWide = type === 'select';
    return (
      <div className={`dropdown  ${className}`} ref={element => { if (element) { this.element = element; } }}>
        {this.renderTrigger()}
        <WSOverlay
          width={width || (isWide ? '100%' : '')}
          orientation={orientation}
          onOpen={() => this.onOpen()}
          onClose={() => this.onClose()}
          ref={element => { if (element) { this.overlay = element; } }}
        >
          {this.renderContent()}
        </WSOverlay>
      </div>
    );
  }
}
