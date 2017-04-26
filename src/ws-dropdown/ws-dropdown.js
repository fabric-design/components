import {React, Component, PropTypes} from '../imports';
import {DropdownMenu} from './dropdown-menu';
import {DropdownInput} from './dropdown-input';

const ANIMATION_END_EVENTS = ['oAnimationEnd', 'MSAnimationEnd', 'animationend'];

/**
 * This class describes a Preact/React component which renders a dropdown.
 * The dropdown can be used as select, multi select, filterable select or as a simple menu.
 * As trigger type you can choose between an anchor, button or a select like looking container.
 * @property {Object} props React properties object
 * @property {string} props.type Type of trigger. Can be anchor, button, select or icon
 * @property {string} props.text Text of trigger
 * @property {string} props.icon Class name of icon in trigger
 * @property {Boolean} props.multiple Flag if the dropdown is a multi select menu
 * @property {Boolean} props.filterable Flag if the dropdown menu is filterable
 * @property {Boolean} props.inputOnly Flag if the dropdown only contains a text input and a button
 * @property {string} props.filter Default filter value
 * @property {number} props.limit Limit visible dropdown items. Use together with filterable flag.
 * @property {string} props.orientation Dropdown orientation. Can be either left or right
 * @property {string} props.placeholder Placeholder for text inputs (Filter input or Input only version)
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
    multiple: false,
    inputOnly: false,
    filterable: false,
    filter: '',
    limit: 10,
    orientation: 'left',
    placeholder: '',
    value: null
  };

  /**
   * @type {Object}
   */
  static propTypes = {
    type: PropTypes.oneOf(['anchor', 'button', 'select', 'icon']),
    text: PropTypes.string,
    icon: PropTypes.string,
    items: PropTypes.array,
    multiple: PropTypes.bool,
    filterable: PropTypes.bool,
    inputOnly: PropTypes.bool,
    filter: PropTypes.string,
    limit: PropTypes.number,
    orientation: PropTypes.oneOf(['left', 'right']),
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array])
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
    this.opened = false;
    this.state = {
      text: props.text || props.value,
      value: this.enrichItems(props.value),
      items: this.enrichItems(props.items)
    };
    // Set states to items in item list for passed values
    this.state.items.forEach(item => {
      if (this.state.value.find(val => val.label === item.label)) {
        item.selected = true;
        item.stored = true;
      }
    });
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
    window.addEventListener('click', this.onDocumentClick.bind(this));
  }

  /**
   * Stop listening for clicks in window
   * @returns {void}
   */
  componentWillUnmount() {
    window.removeEventListener('click', this.onDocumentClick.bind(this));
  }

  /**
   * Handles click on document body to close the dropdown if clicked elsewhere
   * @param {MouseEvent} event JavaScript event object
   * @returns {void}
   */
  onDocumentClick(event) {
    let element = event.target;
    while (element && this.element !== element) {
      element = element.parentNode;
    }
    // Element will be empty if not clicked into the current filter dialog
    if (!element) {
      this.close();
    }
  }

  /**
   * Set the value of the dropdown and update the display text if the trigger element is a select
   * @param {Object|Array<Object>} value The new dropdown value
   * @returns {void}
   */
  setValue(value) {
    let text = this.state.text;
    // Check if we have to update the text value
    if (this.props.type === 'select') {
      if (Array.isArray(value)) {
        text = value.map(item => item.label).join(', ');
      } else {
        // Value can be object from dropdown item or simple string from input
        text = value.label || value;
      }
    }
    this.setState({text, value});
    // Emit change event to propagate the value
    this.element.dispatchEvent(new CustomEvent('change', {detail: value, bubbles: true}));
  }

  /**
   * Handles data propagation from child elements
   * @param {String} type Either change for value changes or change-size which will be emitted on menu changes
   * @param {Object|Number} data Either new value or height of new menu
   * @returns {void}
   */
  handlePropagation = (type, data) => {
    if (type === 'change') {
      this.close();
      this.setValue(data);
    } else if (type === 'change-size') {
      this.adjustSize(data);
    }
  };

  /**
   * Used to convert the items if they are strings into the required object structure
   * @param {Array<String|Object>} items List of items represented as string or object
   * @returns {Array<Object>}
   */
  enrichItems(items) {
    let itemsToWrap = items;
    // The dropdown value can be a simple string or object
    if (!Array.isArray(items)) {
      // If we only show the input the value will be a simple string
      if (this.props.inputOnly) {
        return items;
      }
      // Value can be null or an string or an object
      itemsToWrap = items ? [items] : [];
    }
    return itemsToWrap.map(item => {
      const enriched = typeof item === 'object' ? item : {label: item};
      if (enriched.children) {
        enriched.children = this.enrichItems(enriched.children);
      }
      return enriched;
    });
  }

  /**
   * Opens the dropdown
   * @returns {void}
   */
  open() {
    if (this.opened) {
      return;
    }
    this.opened = true;
    this.dropdownContainer.style.height = 0;
    this.dropdownContainer.classList.add('mod-open');
    this.adjustSize(this.dropdownMenu.getHeight());
  }

  /**
   * Closes the dropdown and clears the selection if needed
   * @returns {void}
   */
  close() {
    if (!this.opened) {
      return;
    }
    this.opened = false;
    this.animateElement(this.dropdownContainer, 'animate-close', container => {
      container.classList.remove('mod-open');
      // If this a multi select dropdown abort
      if (this.props.multiple) {
        this.dropdownMenu.clearSelections();
      }
    });
  }

  /**
   * Set's the size on an element
   * @param {Number} newSize The new size of the active menu will become the new dropdown container size
   * @returns {void}
   */
  adjustSize(newSize) {
    this.dropdownContainer.style.height = `${newSize}px`;
  }

  /**
   * Animates an element by adding a class with an css animation and executes a callback when the animation ends
   * @param {Element} item The dom node to animate
   * @param {String} animationClass The css class which holds the animation definition
   * @param {Function} callback Callback which will be executed at the end of the animation
   * @returns {void}
   */
  animateElement(item, animationClass, callback) {
    // Define callback for animation end events
    const getEventHandler = eventName => {
      const eventHandler = () => {
        item.classList.remove(animationClass);
        item.removeEventListener(eventName, eventHandler);
        callback(item);
      };
      return eventHandler;
    };
    // Listen for all possible animation end events
    ANIMATION_END_EVENTS.forEach(eventName => {
      item.addEventListener(eventName, getEventHandler(eventName));
    });
    // Add class to start animation
    item.classList.add(animationClass);
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
    switch (this.props.type) {
      case 'anchor':
        return <a onClick={() => this.open()}>{icon} {this.state.text}</a>;
      case 'button':
        return <button onClick={() => this.open()}>{icon} {this.state.text}</button>;
      case 'select':
        return <div className="select-box" onClick={() => this.open()}>{icon} {this.state.text}</div>;
      case 'icon':
      default:
        return <a onClick={() => this.open()}>{icon}</a>;
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
          value={this.state.value}
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
        filterable={this.props.filterable}
        filter={this.props.filter}
        placeholder={this.props.placeholder}
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
    return (
      <div className="dropdown" ref={element => { if (element) { this.element = element; } }}>
        {this.renderTrigger()}
        <div
          className={`dropdown-container ${this.props.orientation}`}
          ref={element => { if (element) { this.dropdownContainer = element; } }}
        >
          {this.renderContent()}
        </div>
        <div className="dropdown-arrow" />
      </div>
    );
  }
}
