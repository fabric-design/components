import {React, Component, PropTypes} from '../imports';

/**
 * This component renders a tab menu and provides the selected tab via a value property.
 * @property {Array} items List of menu items {value: any & required, label: string, className: string, badge: string}
 * @property {*} value Matching a value of an item
 * @property {Function} onChange Callback function for React/Preact applications
 */
export class WSTabMenu extends Component {

  static propTypes = {
    items: PropTypes.array,
    value: PropTypes.any,
    onChange: PropTypes.func
  };

  static defaultProps = {
    items: [],
    value: null,
    onChange: null
  };

  /**
   * @param {Object} props React component properties
   */
  constructor(props) {
    super(props);

    this.state = this.createState(props);
    this.menuItems = [];
  }

  /**
   * Bind listeners after mount
   * @returns {void}
   */
  componentDidMount() {
    this.configureMenuItems();
  }

  /**
   * Update state from property change
   * @param {Object} props React properties
   * @returns {void}
   */
  componentWillReceiveProps(props) {
    this.setState(this.createState(props));
    // If the value changed we have to move the dash
    const index = this.props.items.findIndex(item => item.value === this.state.value) || 0;
    this.animateDash(this.menuItems[index]);
  }

  /**
   * Bind listeners after update
   * @returns {void}
   */
  componentDidUpdate() {
    this.configureMenuItems();
  }

  /**
   * Unbind event listeners
   * @returns {void}
   */
  componentWillUnmount() {
    this.menuItems.forEach(element => element.removeEventListener('click', this.onClick));
  }

  /**
   * Handles clicks on menu items
   * @param {Event} event JavaScript event object
   * @returns {void}
   */
  onClick = event => {
    event.stopPropagation();
    const selectedIndex = this.menuItems.indexOf(event.currentTarget);
    const selectedItem = this.props.items[selectedIndex];

    if (selectedItem.disabled) {
      return;
    }
    if (selectedItem.value === this.state.value) {
      return;
    }

    this.setState({value: selectedItem.value});
    // Animate dash to sit below active item
    this.animateDash(event.currentTarget);
    // Propagate change
    this.dispatchEvent('change', selectedItem.value);
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(selectedItem.value);
    }
  };

  /**
   * Bind listeners and move dash below active item
   * @returns {void}
   */
  configureMenuItems() {
    this.menuItems.forEach((element, index) => {
      const item = this.props.items[index];
      // Move dash below selected item
      if (item.value === this.state.value) {
        this.animateDash(element);
      }
      element.addEventListener('click', this.onClick);
    });
  }

  /**
   * Animate the dash below the new active item
   * @param {HTMLElement} newMenuItem HTMLElement of new active menu item
   * @returns {void}
   */
  animateDash(newMenuItem) {
    this.dash.style.left = `${newMenuItem.offsetLeft}px`;
    this.dash.style.right = `${newMenuItem.parentNode.offsetWidth - newMenuItem.offsetLeft - newMenuItem.offsetWidth}px`;
  }

  /**
   * Create a state object from the properties
   * @param {Object} props React properties
   * @returns {Object}
   * @throws Error when no items are passed
   */
  createState(props) {
    if (!props.items.length) {
      throw new Error(`WSTabMenu has no items specified: ${JSON.stringify(props)}`);
    }
    if (props.value) {
      return {value: props.value};
    }
    return {value: props.items[0].value};
  }

  /**
   * Render a single menu item
   * @param {Object} item Menu item object
   * @param {number} index Index of item in item list
   * @returns {JSX}
   */
  renderMenuItem(item, index) {
    let className = `tab-item ${item.className || ''}`;
    if (item.value === this.state.value) {
      className += ' is-active';
    } else if (item.disabled) {
      className += ' is-disabled';
    }

    return (
      <li className={className} ref={element => { this.menuItems[index] = element; }} key={`item-${index}`}>
        <span className="text">{item.label || item.value}</span>
        {item.badge !== undefined &&
          <span className="badge mod-gray">{item.badge}</span>
        }
      </li>
    );
  }

  /**
   * Render the component markup
   * @returns {JSX}
   */
  render() {
    return (
      <div className="tab-menu-container" ref={element => { this.element = element; }}>
        <ul className="tab-menu">
          {this.props.items.map((item, index) => (
            this.renderMenuItem(item, index)
          ))}
        </ul>
        <div className="dash-bar">
          <div className="dash" ref={element => { this.dash = element; }} />
        </div>
      </div>
    );
  }
}
