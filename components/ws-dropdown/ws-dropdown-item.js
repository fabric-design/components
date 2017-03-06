import {React, Component} from '../imports';
import {WSDropdownMenu} from './ws-dropdown-menu';

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
 */
export class WSDropdownItem extends Component {

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
    item: React.PropTypes.object,
    icon: React.PropTypes.string,
    isParent: React.PropTypes.bool,
    handle: React.PropTypes.func
  };

  /**
   * @type {Object}
   */
  static contextTypes = {
    multiple: React.PropTypes.bool
  };

  /**
   * @param {Object} props React props
   * @param {Object} context React context
   * @constructor
   */
  constructor(props, context) {
    super(props, context);
    this.state = props.item;
    this.menu = null;
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
    this.state = props.item;
  }

  /**
   * Handle clicks on this dropdown item. This can trigger a back navigation, selecting the item on multi selects
   * or change the dropdown value for simple dropdown's
   * @param {MouseEvent} event JavaScript event object
   * @returns {void}
   */
  onClick(event) {
    event.stopPropagation();
    // Click on parent means back navigation
    if (this.props.isParent) {
      // dropdown-item(go-back) -> dropdown-menu(show-parent) -> dropdown-item(show-parent) -> dropdown-menu
      this.props.handle('go-back');
    // Show next menu if item has children
    } else if (this.state.children && this.state.children.length) {
      this.props.handle('show-child', this.menu);
    } else {
      if (!this.context.multiple) {
        this.state.selected = true;
        this.props.handle('change', this.state);
      } else {
        this.state.selected = !this.state.selected;
      }
      // Use this strategy to keep the reference of this.state (item) into dropdown-menu items[x]
      this.setState(this.state);
    }
  }

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
    let anchorClass = 'text';
    anchorClass += this.state.selected ? ' is-active' : '';
    anchorClass += this.state.focused ? ' is-focused' : '';
    anchorClass += this.state.disabled ? ' is-disabled' : '';

    return (
      <li className="dropdown-item" onClick={event => this.onClick(event)}>
        <a className={anchorClass} href={this.state.href}>
          {(this.props.icon || this.state.icon) &&
            <i className={`icon ${this.props.icon || this.state.icon}`} />
          }
          {this.state.label}
        </a>
        {!this.props.isParent && this.state.children &&
          <WSDropdownMenu
            items={this.state.children}
            parent={this.state}
            ref={element => { this.menu = element; }}
            handle={this.handlePropagation}
          />
        }
      </li>
    );
  }
}
