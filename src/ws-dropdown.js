import {React, Component} from './imports';
import {WSDropdownMenu} from './ws-dropdown-menu';

const ANIMATION_END_EVENTS = ['oAnimationEnd', 'MSAnimationEnd', 'animationend'];

export class WSDropdown extends Component {

  /**
   * @type {Object}
   */
  static defaultProps = {
    type: 'anchor',
    text: '',
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
    items: React.PropTypes.array,
    noTrigger: React.PropTypes.bool,
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
   * @param props {Object}
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      height: 0,
      text: props.text || props.value,
      value: this.enrichItems(Array.isArray(props.value) ? props.value : props.value ? [props.value] : []),
      items: this.enrichItems(props.items)
    };
    // Set states to items in item list for passed values
    this.state.items.forEach(item => {
      if (this.state.value.find(val => val.label == item.label)) {
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
    }
  }

  /**
   * Start listening for clicks in window
   * @void
   */
  componentDidMount() {
    window.addEventListener('click', this.onDocumentClick.bind(this));
  }

  /**
   * Stop listening for clicks in window
   * @void
   */
  componentWillUnmount() {
    window.removeEventListener('click', this.onDocumentClick.bind(this));
  }

  /**
   * Used to convert the items if they are strings into the required object structure
   * @param items {Array<String|Object>}
   * @returns {Array<Object>}
   */
  enrichItems(items) {
    return items.map(item => {
      let enriched = typeof item === 'object' ? item : {label: item};
      if (enriched.children) {
        enriched.children = this.enrichItems(enriched.children);
      }
      return enriched;
    });
  }

  /**
   * Handles data propagation from child elements
   * @param type {String} Either change for value changes or change-size which will be emitted on menu changes
   * @param data {Object|Number} Either new value or height of new menu
   * @void
   */
  handlePropagation(type, data) {
    if (type === 'change') {
      this.close();
      this.setValue(data);
      this.element.dispatchEvent(new CustomEvent('change', { detail: data }));
    }
    else if (type === 'change-size') {
      this.adjustSize(data);
    }
  }

  /**
   * Set the value of the dropdown and update the display text if the trigger element is a select
   * @param value {Object|Array<Object>}
   * @void
   */
  setValue(value) {
    this.state.value = value;
    // Check if we have to update the text value
    if (this.props.type === 'select') {
      if (Array.isArray(this.state.value)) {
        this.state.text = this.state.value.map(item => item.label).join(', ');
      }
      else {
        this.state.text = this.state.value.label;
      }
      this.setState(this.state);
    }
  }

  /**
   * Handles click on document body to close the dropdown if clicked elsewhere
   * @param event {MouseEvent}
   * @void
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
   * Opens the dropdown
   * @void
   */
  open() {
    if (this.state.opened) {
      return;
    }
    this.state.opened = true;
    this.dropdownContainer.style.height = 0;
    this.dropdownContainer.classList.add('mod-open');
    this.adjustSize(this.dropdownMenu.getHeight());
  }

  /**
   * Closes the dropdown and clears the selection if needed
   * @void
   */
  close() {
    if (!this.state.opened) {
      return;
    }
    this.state.opened = false;
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
   * @param newSize {Number}
   * @void
   */
  adjustSize(newSize) {
    this.dropdownContainer.style.height = newSize + 'px';
  }

  /**
   * Animates an element by adding a class with an css animation and executes a callback when the animation ends
   * @param item {Element} The dom node to animate
   * @param animationClass {String} The css class which holds the animation definition
   * @param callback {Function} Callback which will be executed at the end of the animation
   * @void
   */
  animateElement(item, animationClass, callback) {
    // Define callback for animation end events
    let getEventHandler = eventName => {
      let eventHandler = () => {
        item.classList.remove(animationClass);
        item.removeEventListener(eventName, eventHandler);
        callback(item);
      };
      return eventHandler;
    };
    // Listen for all possible animation end events
    for (let eventName of ANIMATION_END_EVENTS) {
      item.addEventListener(eventName, getEventHandler(eventName));
    }
    // Add class to start animation
    item.classList.add(animationClass);
  }

  /**
   * Render the complete dropdown
   * @returns {Object}
   */
  render() {
    return (
      <div className={'dropdown ' + this.props.orientation} ref={element => this.element = element}>
        {this.props.type === 'anchor' ?
          <a onClick={() => this.open()}>{this.state.text}</a>
        : this.props.type === 'button' ?
          <button onClick={() => this.open()}>{this.state.text}</button>
        : this.props.type === 'select' &&
          <div className="select-box" onClick={() => this.open()}>{this.state.text}</div>
        }
        <div className="dropdown-container" ref={element => this.dropdownContainer = element}>
          <WSDropdownMenu items={this.state.items}
                          value={this.state.value}
                          limit={this.props.limit}
                          filterable={this.props.filterable}
                          filter={this.props.filter}
                          handle={this.handlePropagation.bind(this)}
                          ref={element => this.dropdownMenu = element}/>
        </div>
        <div className="dropdown-arrow"></div>
      </div>
    );
  }
}
