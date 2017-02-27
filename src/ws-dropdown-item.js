import {React, Component} from './imports';
import {WSDropdownMenu} from './ws-dropdown-menu';

export class WSDropdownItem extends Component {

  /**
   * @type {Object}
   */
  static defaultProps = {
    item: null,
    icon: null,
    multiple: false,
    isParent: false,
    handle: () => {}
  };

  /**
   * @type {Object}
   */
  static propTypes = {
    item: React.PropTypes.object,
    icon: React.PropTypes.string,
    multiple: React.PropTypes.bool,
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
   * @param props {Object}
   * @param context {Object}
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
   * @param props {Object}
   * @void
   */
  componentWillReceiveProps(props) {
    this.state = props.item;
  }

  /**
   * Handle clicks on this dropdown item. This can trigger a back navigation, selecting the item on multi selects
   * or change the dropdown value for simple dropdown's
   * @param event {MouseEvent}
   * @void
   */
  onClick(event) {
    event.stopPropagation();
    // Click on parent means back navigation
    if (this.props.isParent) {
      // dropdown-item(go-back) -> dropdown-menu(show-parent) -> dropdown-item(show-parent) -> dropdown-menu
      this.props.handle('go-back');
    }
    // Show next menu if item has children
    else if (this.state.children && this.state.children.length) {
      this.props.handle('show-child', this.menu);
    }
    else {
      if (!this.context.multiple) {
        this.state.selected = true;
        this.props.handle('change', this.state);
      }
      else {
        this.state.selected = !this.state.selected;
      }
      // Use this strategy to keep the reference of this.state (item) into dropdown-menu items[x]
      this.setState(this.state);
    }
  }

  /**
   * This is required to propagate changes from child menu to parent menu.
   * For instance if the menu size, it's value changed or the parent or child menu should be shown.
   * @param type {String}
   * @param data {*}
   * @void
   */
  handlePropagation(type, data) {
    this.props.handle(type, data);
  }

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
          {this.state.icon || this.props.icon &&
            <i className={`icon ${this.state.icon || this.props.icon}`}/>
          }
          {this.state.label}
        </a>
        {!this.props.isParent && this.state.children &&
          <WSDropdownMenu items={this.state.children}
                          parent={this.state}
                          ref={element => this.menu = element}
                          handle={this.handlePropagation.bind(this)}/>
        }
      </li>
    )
  }
}
