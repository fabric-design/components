import {React, Component} from '../imports';
import {WSDropdownMenu} from './ws-dropdown-menu';

const ANIMATION_END_EVENTS = ['oAnimationEnd', 'MSAnimationEnd', 'animationend'];

/**
 * This class describes a Preact/React component which renders a dropdown.
 * The dropdown can be used as select, multi select, filterable select or as a simple menu.
 * As trigger type you can choose between an anchor, button or a select like looking container.
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
    filterable: false,
    filter: '',
    limit: 10,
    orientation: 'left',
    value: null
  };

  /**
   * @type {Object}
   */
  static propTypes = {
    type: React.PropTypes.oneOf(['anchor', 'button', 'select']),
    text: React.PropTypes.string,
    icon: React.PropTypes.string,
    items: React.PropTypes.array,
    multiple: React.PropTypes.bool,
    filterable: React.PropTypes.bool,
    filter: React.PropTypes.string,
    limit: React.PropTypes.number,
    orientation: React.PropTypes.oneOf(['left', 'right'])
  };

  /**
   * @type {Object}
   */
  static childContextTypes = {
    multiple: React.PropTypes.bool
  };

  /**
   * @param {Object} props React props
   * @constructor
   */
  constructor(props) {
    super(props);
    // Enforce value to be an array for consistent usage
    const arrayValue = props.value ? [props.value] : [];
    this.opened = false;
    this.state = {
      text: props.text || props.value,
      value: this.enrichItems(Array.isArray(props.value) ? props.value : arrayValue),
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
        text = value.label;
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
      this.element.dispatchEvent(new CustomEvent('change', {detail: data}));
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
    return items.map(item => {
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
   * Render the complete dropdown
   * @returns {Object}
   */
  render() {
    let icon;
    if (this.props.icon) {
      icon = <span className={`icon ${this.props.icon}`} />;
    }
    return (
      <div className="dropdown" ref={element => { if (element) this.element = element; }}>
        {this.props.type === 'anchor' &&
          <a onClick={() => this.open()}>{icon} {this.state.text}</a>
        }
        {this.props.type === 'button' &&
          <button onClick={() => this.open()}>{icon} {this.state.text}</button>
        }
        {this.props.type === 'select' &&
          <div className="select-box" onClick={() => this.open()}>{icon} {this.state.text}</div>
        }
        <div
          className={`dropdown-container ${this.props.orientation}`}
          ref={element => { if (element) this.dropdownContainer = element; }}
        >
          <WSDropdownMenu
            items={this.state.items}
            value={this.state.value}
            limit={this.props.limit}
            filterable={this.props.filterable}
            filter={this.props.filter}
            handle={this.handlePropagation}
            ref={element => { this.dropdownMenu = element; }}
          />
        </div>
        <div className="dropdown-arrow"></div>
      </div>
    );
  }
}
