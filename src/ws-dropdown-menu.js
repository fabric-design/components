import {React, Component} from './imports';
import {WSDropdownItem} from './ws-dropdown-item';

const ANIMATION_START_EVENTS = ['oAnimationStart', 'MSAnimationStart', 'animationstart'];
const ANIMATION_END_EVENTS = ['oAnimationEnd', 'MSAnimationEnd', 'animationend'];

export class WSDropdownMenu extends Component {

  /**
   * @type {Object}
   */
  static defaultProps = {
    parent: null,
    items: [],
    value: null,
    filterable: false,
    filter: null,
    limit: 10,
    handle: () => {}
  };

  /**
   * @type {Object}
   */
  static propTypes = {
    parent: React.PropTypes.object,
    items: React.PropTypes.array,
    filterable: React.PropTypes.bool,
    filter: React.PropTypes.string,
    limit: React.PropTypes.number
  };

  /**
   * @type {Object}
   */
  static contextTypes = {
    multiple: React.PropTypes.bool
  };

  /**
   * @param props {Object}
   * @param context {Object}
   * @constructor
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      filter: props.filter,
      items: props.items,
      value: props.value,
      openSubMenu: null
    };
  }

  /**
   * Gets the current height of the menu
   * @returns {Number}
   */
  getHeight() {
    return this.menuContainer.clientHeight;
  }

  /**
   * Send the new height of this menu after update to the parent.
   * This will be called when updateFilter did set the new state
   * @void
   */
  componentDidUpdate() {
    this.props.handle('change-size', this.getHeight());
  }

  /**
   * Setting the input value as filter
   * @param event {KeyboardEvent}
   * @void
   */
  updateFilter(event) {
    event.stopPropagation();
    this.setState({filter: event.target.value});
  }

  /**
   * If there is a filter active it applies it on the available items
   * @returns {Array<Object>}
   */
  getFilteredItems() {
    let regex = new RegExp(this.state.filter, 'i');
    return this.state.items.filter(item => {
      // Don't show items which doesn't match the filter
      if (this.props.filterable && this.state.filter && !regex.test(item.label)) {
        return false;
      }
      // Don't show items which were stored as value -> don't show them twice
      return this.context.multiple ? !item.stored : true;
    });
  }

  /**
   * Deselect all items which are not stored as value. Only relevant for multi select dropdown.
   * When the dropdown will be closed the state will be restored
   * @void
   */
  clearSelections() {
    if (this.state.items) {
      this.state.items.forEach(item => {
        if (item.selected && !item.stored) {
          item.selected = false;
        }
      });
    }
  }

  /**
   * Handles submit action on multi select drop downs
   * @void
   */
  submit(event) {
    event.stopPropagation();
    this.state.value = this.state.items.filter(item => {
      item.stored = item.selected;
      return item.selected;
    });
    // Propagate new value
    this.props.handle('change', this.state.value);
    this.setState(this.state);
  }

  /**
   * Handles data propagation from child menus
   * @param type {String} Should be just show-parent
   * @param data {*}
   */
  handlePropagation = (type, data) => {
    switch (type) {
      // This comes from an dropdown-item and has to be propagated to the parent
      case 'go-back':
        this.props.handle('show-parent');
        break;
      // This comes from the child menu
      case 'show-parent':
        this.showCurrent();
        break;
      case 'show-child':
        this.showChild(data);
        break;
      case 'change':
        this.clearSelections();
        this.props.handle(type, data);
        break;
      case 'change-size':
        this.props.handle(type, data);
        break;
    }
  };

  /**
   * Shows the child menu and hides the current menu
   * @param subMenu {WSDropdownMenu}
   * @void
   */
  showChild(subMenu) {
    this.state.openSubMenu = subMenu;
    this.props.handle('change-size', subMenu.getHeight());
    this.animateOut(false);
    subMenu.animateIn(false);
  }

  /**
   * Shows this menu and hides currently open sub menu
   * @void
   */
  showCurrent() {
    if (this.state.openSubMenu) {
      this.props.handle('change-size', this.getHeight());
      this.state.openSubMenu.animateOut(true);
      this.animateIn(true);
      this.state.openSubMenu = null;
    }
  }

  /**
   * Animates a menu or sub menu into the view
   * @param goBack {Boolean} True if a menu should be shown and a sub menu be hidden
   * @void
   */
  animateIn(goBack) {
    let inAnimation = goBack ? 'animate-in' : 'animate-sub-in';
    // Create a clone of new sub menu for animations
    this.animateElement(this.menuContainer, inAnimation, menu => {
      menu.classList.remove('mod-sub-open');
      menu.classList.add('mod-menu-open');
    });
  }

  /**
   * Animates a menu or sub menu out of the view
   * @param goBack {Boolean} True if a menu should be hidden and a sub menu be shown
   * @void
   */
  animateOut(goBack) {
    let outAnimation = !goBack ? 'animate-out' : 'animate-sub-out';
    // Fade out old element and set mod-item-open if going back and mod-sub-open for going deeper
    this.animateElement(this.menuContainer, outAnimation, menu => {
      menu.classList.remove('mod-menu-open');
      if (!goBack) {
        menu.classList.add('mod-sub-open');
      }
    });
  }

  /**
   * Animates an element by adding a class with an css animation and executes a callback when the animation ends
   * @param item {Element} The dom node to animate
   * @param animationClass {String} The css class which holds the animation definition
   * @param callback {Function} Callback which will be executed at the end of the animation
   * @void
   */
  animateElement(item, animationClass, callback) {
    let eventCounter = 0;
    // Handler for animation end event
    let handler = event => {
      // Do nothing until all started events are done
      if (--eventCounter) {
        return;
      }
      // Remove all animation end event listeners from this item. They won't get called anymore
      for (let eventName of ANIMATION_END_EVENTS) {
        item.removeEventListener(eventName, handler);
      }
      item.classList.remove(animationClass);
      callback(item);
    };
    // Listen for all possible animation end events
    for (let eventName of ANIMATION_END_EVENTS) {
      item.addEventListener(eventName, handler);
    }
    // Increase started event counter for each animation start event
    for (let eventName of ANIMATION_START_EVENTS) {
      item.addEventListener(eventName, () => eventCounter++);
    }
    // Add class to start animation
    item.classList.add(animationClass);
  }

  /**
   * Renders the dropdown menu
   * @returns {Object}
   */
  render() {
    const items = this.getFilteredItems().slice(0, this.props.limit);
    const getAnchorClass = item => `text  ${item.selected ? 'is-active' : item.focused ? 'is-focused' : ''}`;

    return (
      <ul className={'dropdown-menu ' + (!this.props.parent ? 'dropdown-root-menu' : '')}
          ref={element => this.menuContainer = element}>
        {this.props.filterable &&
          <li className="dropdown-filter" key="filter">
            <input type="text" defaultValue={this.state.filter} onKeyUp={event => this.updateFilter(event)}/>
          </li>
        }
        {this.props.parent && [
          <WSDropdownItem item={this.props.parent}
                          icon="icon-left"
                          isParent={true}
                          handle={this.handlePropagation}
                          key="parent"/>,
          <li className="dropdown-item-separator" key="parent-separator"/>
        ]}
        {this.state.value && [
          this.state.value.map((item, index) =>
            <WSDropdownItem item={item} handle={this.handlePropagation} key={`value-${index}`}/>
          ),
          <li className="dropdown-item-separator" key="value-separator"/>
        ]}
        {items.map((item, index) =>
          <WSDropdownItem item={item} handle={this.handlePropagation} key={`item-${index}`}/>
        )}
        {!items || !items.length &&
          <WSDropdownItem item={{label: 'No results found', disabled: true}} key="disabled"/>
        }
        {this.context.multiple &&
          <li className="dropdown-submit" key="submit">
            <button onClick={event => this.submit(event)}>OK</button>
          </li>
        }
      </ul>
    );
  }
}
