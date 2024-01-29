import {React, Component, PropTypes} from '../imports';
import {DropdownMenuItem} from './dropdown-menu-item';

const ANIMATION_START_EVENTS = ['oAnimationStart', 'MSAnimationStart', 'animationstart'];
const ANIMATION_END_EVENTS = ['oAnimationEnd', 'MSAnimationEnd', 'animationend'];

/**
 * This class renders the menu inside a dropdown container. Since the wrapper WSDropdown is missing, which provides
 * additional wrapping markup and functionality, you SHOULD NOT use this component as standalone.
 * @property {Object} props React properties object
 * @property {Object} props.parent Parent dropdown item. Only set if this is a child menu
 * @property {Array<Object>} props.items List of dropdown item configs. Each item can contain label, value, disabled, selected
 * @property {Object|Array<Object>} props.value Selected dropdown item(s)
 * @property {boolean} props.filterable Flag if the dropdown menu is filterable
 * @property {boolean} props.filtered Should be true when items are filtered outside but dropdown has no filter possibility
 * @property {string} props.filter Default filter value
 * @property {number} props.minFilterLength Min length of filter to show any item
 * @property {string} props.placeholder Placeholder for text inputs (Filter input or Input only version)
 * @property {number} props.limit Limit visible dropdown items. Use together with filterable flag.
 * @property {boolean} props.selectAll Show button to select all items
 * @property {Function} props.handle Function used to propagate data
 */
export class DropdownMenu extends Component {
  /**
   * @type {Object}
   */
  static defaultProps = {
    parent: null,
    items: [],
    value: null,
    filterable: false,
    filter: '',
    filtered: false,
    minFilterLength: 0,
    placeholder: '',
    limit: 10,
    selectAll: false,
    handle: () => {}
  };

  /**
   * @type {Object}
   */
  static propTypes = {
    parent: PropTypes.object,
    items: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
    filterable: PropTypes.bool,
    filter: PropTypes.string,
    filtered: PropTypes.bool, // True when filtering from outside e.g. multi-select
    minFilterLength: PropTypes.number,
    placeholder: PropTypes.string,
    limit: PropTypes.number,
    selectAll: PropTypes.bool,
    handle: PropTypes.func
  };

  /**
   * @type {Object}
   */
  static contextTypes = {
    multiple: PropTypes.bool
  };

  /**
   * @param {Object} props React props
   * @param {Object} context React context
   * @constructor
   */
  constructor(props, context) {
    super(props, context);
    this.openSubMenu = null;
    this.selectedIndex = -1;
    this.state = {
      filter: props.filter,
      filtered: props.filtered || props.filterable,
      items: props.items,
      value: props.value,
      selectAllActive: false
    };
  }

  /**
   * Prevent default change event to bubble up
   * @returns {void}
   */
  componentDidMount() {
    if (this.input) {
      this.input.addEventListener('keyup', this.onKeyUpUpdateFilter);
      this.input.addEventListener('change', event => event.stopPropagation());
    }
    if (this.button) {
      this.button.addEventListener('click', this.onClickSubmit);
      this.button.addEventListener('keydown', event => event.stopPropagation());
    }
    if (this.selectAllButton) {
      this.selectAllButton.addEventListener('click', this.onClickSelectAll);
    }
  }

  /**
   * Handle changes of passed properties
   * @param {Object} props React props
   * @returns {void}
   */
  componentWillReceiveProps(props) {
    this.setState({
      filter: props.filter,
      filtered: props.filtered || props.filterable,
      items: props.items,
      value: props.value,
      selectAllActive: props.selectAllActive
    });
  }

  /**
   * Send the new height of this menu after update by the parent.
   * This will be called when updateFilter did set the new state or outside new dropdown items came in.
   * Only if the current menu is really active we propagate the new height
   * @returns {void}
   */
  componentDidUpdate() {
    if (this.isActive) {
      this.props.handle('change-height', this.getHeight());
    }
  }

  /**
   * Prevent default change event to bubble up
   * @returns {void}
   */
  componentWillUnmount() {
    if (this.input) {
      this.input.removeEventListener('keyup', this.onKeyUpUpdateFilter);
      this.input.removeEventListener('change', event => event.stopPropagation());
    }
    if (this.button) {
      this.button.removeEventListener('click', this.onClickSubmit);
      this.button.removeEventListener('keydown', event => event.stopPropagation());
    }
    if (this.selectAllButton) {
      this.selectAllButton.removeEventListener('click', this.onClickSelectAll);
    }
  }

  /**
   * Bind keyboard listener and focus input if available when dropdown opens
   * @returns {void}
   */
  onOpen = () => {
    this.isActive = true;
    window.addEventListener('keydown', this.onGlobalKeyDown);
  };

  /**
   * Unbind keyboard listener when dropdown closes
   * @returns {void}
   */
  onClose = () => {
    this.isActive = false;
    window.removeEventListener('keydown', this.onGlobalKeyDown);
  };

  /**
   * Handle global key down events to select items
   * @param {KeyboardEvent} event JavaScript event object
   * @returns {void}
   */
  onGlobalKeyDown = event => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.focusNextItem(-1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusNextItem(1);
        break;
      case 'Enter':
        event.preventDefault();
        event.stopPropagation();
        this.selectCurrentItem();
        break;
      default:
        break;
    }
  };

  /**
   * Sets the input value as filter
   * @param {KeyboardEvent} event JavaScript event object
   * @returns {void}
   */
  onKeyUpUpdateFilter = event => {
    event.stopPropagation();
    this.setState({filter: event.target.value});
  };

  /**
   * Handles submit action on multi select drop downs
   * @param {Event} event JavaScript event object
   * @returns {void}
   */
  onClickSubmit = event => {
    event.stopPropagation();
    const value = this.state.items.filter(item => {
      item.focused = false;
      item.stored = item.selected;
      return item.selected;
    });
    // Propagate new value
    this.props.handle('change', value);
    this.setState({value});
  };

  /**
   * Handles select all action on multi select drop downs
   * @returns {void}
   */
  onClickSelectAll = () => {
    if (this.state.items) {
      this.state.items.forEach(item => {
        item.selected = !this.state.selectAllActive;
      });
      this.setState({
        items: this.state.items,
        selectAllActive: !this.state.selectAllActive
      });
    }
  };

  /**
   * Gets the current height of the menu
   * @returns {number}
   */
  getHeight() {
    return this.menuContainer.clientHeight;
  }

  /**
   * If there is a filter active it applies it on the available items
   * @returns {Array<Object>}
   */
  getFilteredItems() {
    // Abort filtering when the filter value isn't long enough
    const filterLength = this.state.filter ? this.state.filter.length : 0;
    if (filterLength < this.props.minFilterLength) {
      return [];
    }

    const filterValue = this.state.filter.replace(/[.*?^${}()|[]]/g,'$&');
    const regex = new RegExp(filterValue, 'i');

    return this.state.items.filter(item => {
      // Don't show items which doesn't match the filter
      if (this.state.filtered && this.state.filter && !regex.test(item.label)) {
        return false;
      }
      // When we use a filter or multiple items are selectable we show selected items separately
      if (this.state.filtered || this.context.multiple) {
        return !item.stored;
      }
      return true;
    });
  }

  /**
   * Get the item for an index which can match the value or items list
   * @param {number} index Index across value and filtered items
   * @returns {Object}
   */
  getItemAtIndex(index) {
    const limit = this.state.filtered ? this.props.limit : this.state.items.length;
    const filteredItems = this.getFilteredItems().slice(0, limit);
    let valueLength = 0;
    if (this.context.multiple || this.state.filtered) {
      if (Array.isArray(this.state.value)) {
        valueLength = this.state.value.length;
      } else {
        valueLength = this.state.value ? 1 : 0;
      }
    }
    const visibleItems = filteredItems.length + valueLength;
    let correctedIndex = index;
    // Ensure the index is within bounds of visible items (selected and non selected items)
    if (index >= visibleItems) {
      correctedIndex = 0;
    } else if (index < 0) {
      correctedIndex = visibleItems - 1;
    }
    // Check if the index points to value items when it is in this range
    if (valueLength && correctedIndex < valueLength && correctedIndex >= 0) {
      return {
        item: Array.isArray(this.state.value) ? this.state.value[correctedIndex] : this.state.value,
        index: correctedIndex
      };
    }
    return {item: filteredItems[correctedIndex - valueLength], index: correctedIndex};
  }

  /**
   * Depending on the direction it marks the next dropdown item as focused
   * @param {number} direction Can be 1 for down or -1 for up direction
   * @returns {void}
   */
  focusNextItem(direction) {
    // Update focus state of items
    this.state.items.forEach(item => {
      item.focused = false;
    });
    const result = this.getItemAtIndex(this.selectedIndex + direction);
    result.item.focused = true;

    this.forceUpdate();
    this.selectedIndex = result.index;
  }

  /**
   * Mark the currently focused item as selected
   * @returns {void}
   */
  selectCurrentItem() {
    const result = this.getItemAtIndex(this.selectedIndex);
    result.item.selected = !result.item.selected;
    if (!this.context.multiple) {
      result.item.stored = result.item.selected;
      this.handlePropagation('change', result.item.stored ? result.item : null);
    }
    this.forceUpdate();
  }

  /**
   * Handles data propagation from child menus
   * This function uses arrow function to bind the scope to this instance
   * @param {string} type Should be just show-parent
   * @param {*} data Propagated data. Could be for instance a menu reference or the menu height.
   * @returns {void}
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
        // Filterable is used here as it indicates that the dropdown shows and manages the filter value.
        // Therefore the dropdown has to take care about clearing after submission.
        if (this.props.filterable) {
          this.setState({filter: ''});
        }
        // If we have a single select we want to deselect the previous selected item
        if (!this.context.multiple) {
          const previous = this.state.items.find(item => item.stored && item !== data);
          if (previous) {
            previous.stored = false;
            previous.selected = false;
          }
        }
        this.props.handle(type, data);
        break;
      case 'change-height':
      default:
        this.props.handle(type, data);
        break;
    }
  };

  /**
   * Shows the child menu and hides the current menu
   * @param {DropdownMenu} subMenu The reference of the child menu to show
   * @returns {void}
   */
  showChild(subMenu) {
    this.openSubMenu = subMenu;
    this.props.handle('change-height', subMenu.getHeight());
    this.animateOut(false);
    subMenu.animateIn(false);

    subMenu.isActive = true;
    this.isActive = false;
  }

  /**
   * Shows this menu and hides currently open sub menu
   * @returns {void}
   */
  showCurrent() {
    if (this.openSubMenu) {
      this.props.handle('change-height', this.getHeight());
      this.openSubMenu.animateOut(true);
      this.animateIn(true);
      this.openSubMenu.isActive = false;
      this.isActive = true;
      this.openSubMenu = null;
    }
  }

  /**
   * Animates a menu or sub menu into the view
   * @param {boolean} goBack True if a menu should be shown and a sub menu be hidden
   * @returns {void}
   */
  animateIn(goBack) {
    const inAnimation = goBack ? 'animate-in' : 'animate-sub-in';
    // Create a clone of new sub menu for animations
    this.animateElement(this.menuContainer, inAnimation, menu => {
      menu.classList.remove('mod-sub-open');
      menu.classList.add('mod-menu-open');
    });
  }

  /**
   * Animates a menu or sub menu out of the view
   * @param {boolean} goBack True if a menu should be hidden and a sub menu be shown
   * @returns {void}
   */
  animateOut(goBack) {
    const outAnimation = !goBack ? 'animate-out' : 'animate-sub-out';
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
   * @param {Element} item The dom node to animate
   * @param {string} animationClass The css class which holds the animation definition
   * @param {Function} callback Callback which will be executed at the end of the animation
   * @returns {void}
   */
  animateElement(item, animationClass, callback) {
    let eventCounter = 0;
    // Handler for animation end event
    const handler = () => {
      // Do nothing until all started events are done
      eventCounter -= 1;
      if (eventCounter) {
        return;
      }
      // Remove all animation end event listeners from this item. They won't get called anymore
      ANIMATION_END_EVENTS.forEach(eventName => {
        item.removeEventListener(eventName, handler);
      });
      window.removeEventListener('blur', handler);
      item.classList.remove(animationClass);
      callback(item);
    };
    // Listen for all possible animation end events
    ANIMATION_END_EVENTS.forEach(eventName => {
      item.addEventListener(eventName, handler);
    });
    // Force execute callback when window is blurred because browsers stop css animations and this leads to
    // problems as the rendering is resumed after focus again.
    window.addEventListener('blur', handler);
    // Increase started event counter for each animation start event
    ANIMATION_START_EVENTS.forEach(eventName => {
      item.addEventListener(eventName, () => { eventCounter += 1; });
    });
    // Add class to start animation
    item.classList.add(animationClass);
  }

  /**
   * Renders the dropdown menu
   * @returns {Object}
   */
  render() {
    const limit = this.state.filtered ? this.props.limit : this.state.items.length;
    const items = this.getFilteredItems().slice(0, limit);
    const hasValue = Array.isArray(this.state.value) ? this.state.value.length : this.state.value;

    return (
      <ul
        className={`dropdown-menu ${!this.props.parent ? 'dropdown-root-menu' : 'dropdown-child-menu'}`}
        ref={element => { this.menuContainer = element; }}
      >
        {this.props.filterable &&
          <li className="dropdown-input" key="filter">
            <input
              type="text"
              defaultValue={this.state.filter}
              placeholder={this.props.placeholder}
              ref={element => { this.input = element; }}
            />
          </li>
        }
        {this.props.parent && [
          <DropdownMenuItem
            item={this.props.parent}
            icon="icon-left"
            handle={this.handlePropagation}
            key="parent"
            isParent
          />,
          <li className="dropdown-item-separator" key="parent-separator" />
        ]}
        {(hasValue && (this.context.multiple || this.props.filterable)) ? [
          this.state.items.filter(item => item.stored).map((item, index) => (
            <DropdownMenuItem item={item} handle={this.handlePropagation} key={`value-${index}`} />
          )),
          <li className="dropdown-item-separator" key="value-separator" />
        ] : null}
        {items.map((item, index) => (
          <DropdownMenuItem item={item} handle={this.handlePropagation} key={`item-${index}`} />
        ))}
        {this.state.filter.length < this.props.minFilterLength ?
          <DropdownMenuItem item={{label: 'Nothing filtered', disabled: true}} key="disabled" />
          :
          (!items || !items.length) &&
            <DropdownMenuItem item={{label: 'No results found', disabled: true}} key="disabled" />
        }
        {this.context.multiple && [
          <li className="dropdown-item-separator" key="submit-separator" />,
          <li className="dropdown-submit" key="submit">
            {this.props.selectAll && [
              <button
                key="selectAll"
                className={`mod-secondary mr-s mod-small ${this.state.selectAllActive ? 'mod-toggle is-active' : ''}`}
                ref={element => { this.selectAllButton = element; }}
              >
                ALL
              </button>
            ]}
            <button className="mod-small dropdown-submit-button" ref={element => { this.button = element; }}>OK</button>
          </li>
        ]}
      </ul>
    );
  }
}
