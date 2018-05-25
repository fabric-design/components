import {React, Component, PropTypes} from '../imports';
import {DropdownMenu} from './dropdown-menu';

/**
 * This class renders a list item inside a dropdown menu. Since the wrapper menu is missing this class is pretty
 * useless as standalone. It also renders child menu's if the passed item has children.
 * The item object can have the following properties
 * {
 *     label: String,
 *     href: String, // Fully qualified URI
 *     icon: String, // The icon of an item must be a css class name
 *     children: Array<Item>,
 *     selected: Boolean, // Adds the class .is-active to the .dropdown-item
 *     focused: Boolean, // Adds the class .is-focused to the .dropdown-item
 *     disabled: Boolean // Adds thr class .is-disabled to the .dropdown-item
 * }
 * @property {Object} props React properties object
 * @property {Object} props.item Dropdown item configuration
 * @property {string} props.icon Class name of icon in trigger
 * @property {Boolean} props.isParent Flag to identify if this item renders the parent dropdown item
 * @property {Function} props.handle Function used to propagate data
 */
export class DropdownMenuItem extends Component {

  /**
   * @type {Object}
   */
  static defaultProps = {
    item: null,
    icon: null,
    isParent: false,
    handle: () => {}
  };

  /**
   * @type {Object}
   */
  static propTypes = {
    item: PropTypes.object,
    icon: PropTypes.string,
    isParent: PropTypes.bool,
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
    this.state = {item: props.item};
    this.menu = null;
  }

  /**
   * Listen for clicks on dropdown item
   * @returns {void}
   */
  componentDidMount() {
    this.dropdownItem.addEventListener('click', this.onClick);
    this.dropdownItem.addEventListener('mousedown', this.onMouseDown);
  }

  /**
   * Important to update the state when the items in menu changed.
   * When in the multi select a dropdown item is selected and stored (submitted) it will be filtered out
   * of the item list and shown in a separate value list. React doesn't created new components but reuses them.
   * This leads to property updates and without this function a wrong item will be rendered.
   * @param {Object} props React component props
   * @returns {void}
   */
  componentWillReceiveProps(props) {
    this.setState({item: props.item});
  }

  /**
   * Listen for clicks on dropdown item
   * @returns {void}
   */
  componentWillUnmount() {
    this.dropdownItem.removeEventListener('click', this.onClick);
    this.dropdownItem.removeEventListener('mousedown', this.onMouseDown);
  }

  onMouseDown = event => {
    event.preventDefault();
  };

  /**
   * Handle clicks on this dropdown item. This can trigger a back navigation, selecting the item on multi selects
   * or change the dropdown value for simple dropdown's
   * @param {MouseEvent} event JavaScript event object
   * @returns {void}
   */
  onClick = event => {
    event.stopPropagation();
    // We prevented blur with mouse down event to ensure the click is captured before the dropdown closed
    if ('activeElement' in document) {
      document.activeElement.blur();
    }
    const {item} = this.state;
    // Do nothing if this item is disabled
    if (item.disabled) {
      return;
    }
    // Click on parent means back navigation
    if (this.props.isParent) {
      // dropdown-item(go-back) -> dropdown-menu(show-parent) -> dropdown-item(show-parent) -> dropdown-menu
      this.props.handle('go-back');
    // Show next menu if item has children
    } else if (item.children && item.children.length) {
      this.props.handle('show-child', this.menu);
    } else {
      if (!this.context.multiple) {
        // If it is selected we publish null because it will be deselected in the upper menu
        if (item.selected) {
          this.props.handle('change', null);
        } else {
          item.selected = true;
          item.stored = true;

          this.setState({item});

          this.props.handle('change', item);
        }
      } else {
        item.selected = !item.selected;
        this.setState({item});
      }
    }
  };

  /**
   * This is required to propagate changes from child menu to parent menu.
   * For instance if the menu size, it's value changed or the parent or child menu should be shown.
   * @param {String} type Type of propagated data
   * @param {*} data Data which was propagated. Can be height of child menu or reference of child
   * @returns {void}
   */
  handlePropagation = (type, data) => {
    this.props.handle(type, data);
  };

  /**
   * Renders the dropdown item
   * @returns {Object}
   */
  render() {
    const {item} = this.state;
    let anchorClass = 'text';
    anchorClass += item.selected ? ' is-active' : '';
    anchorClass += item.focused ? ' is-focused' : '';
    anchorClass += item.disabled ? ' is-disabled' : '';
    anchorClass += ` ${item.className || ''}`;
    let itemClass = 'dropdown-item';
    itemClass += this.props.isParent ? ' dropdown-parent-item' : '';
    itemClass += item.children && !this.props.isParent ? ' has-children' : '';

    return (
      <li
        className={itemClass}
        ref={element => { this.dropdownItem = element; }}
      >
        <a className={anchorClass} href={item.href} title={item.title || item.label}>
          {(this.props.icon || item.icon) &&
            <i className={`icon ${this.props.icon || item.icon}`} />
          }
          {item.label}
        </a>
        {!this.props.isParent && item.children &&
          <DropdownMenu
            items={item.children}
            parent={item}
            ref={element => { this.menu = element; }}
            handle={this.handlePropagation}
          />
        }
      </li>
    );
  }
}
