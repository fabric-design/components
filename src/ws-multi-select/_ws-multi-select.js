import {React, Component, PropTypes} from '../imports';
import {DropdownMenu} from '../ws-dropdown/dropdown-menu';

export class WSMultiSelect extends Component {

  static propTypes = {
    items: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array])
  };

  static defaultProps = {
    items: [],
    value: null
  };

  /**
   * @param {Object} props React props
   */
  constructor(props) {
    super(props);
    this.state = this.createState(props);
  }

  /**
   * Bind event listeners when attached to DOM
   * @returns {void}
   */
  componentDidMount() {
    this.input.addEventListener('keyup', this.onKeyUp);
  }

  /**
   * Create state from new props
   * @param {Object} props React props
   * @returns {void}
   */
  componentWillReceiveProps(props) {
    this.setState(this.createState(props));
  }

  /**
   * Unbind event listeners before detaching from dom
   * @returns {void}
   */
  componentWillUnmount() {
    this.input.removeEventListener('keyup', this.onKeyUp);
  }

  /**
   * Handle input change
   * @param {KeyboardEvent} event JavaScript event object
   * @returns {void}
   */
  onKeyUp = event => {
    event.stopPropagation();

    this.setState({filter: event.target.value});
  };

  /**
   * Handles data propagation from child elements
   * @param {String} type Either change for value changes or change-size which will be emitted on menu changes
   * @param {Object|Number} data Either new value or height of new menu
   * @returns {void}
   */
  handlePropagation = (type, data) => {
    if (type === 'change') {
      this.close();
      const value = [
        ...this.state.value,
        data
      ];
      this.setState({value});
    } else if (type === 'change-size') {
      this.adjustSize(data);
    }
  };

  /**
   * Set's the size on an element
   * @param {Number} newSize The new size of the active menu will become the new dropdown container size
   * @returns {void}
   */
  adjustSize(newSize) {
    this.dropdownContainer.style.height = `${newSize}px`;
  }

  /**
   * Creates a state object from React props
   * @param {Object} props React props
   * @returns {Object}
   */
  createState(props) {
    const items = this.enrichItems(props.items);
    // If value is set mark related item as selected
    if (props.value) {
      if (!Array.isArray(props.value)) {
        props.value = [props.value];
      }
      props.value.forEach(value => {
        items.find(item => item.value === value).selected = true;
      });
    }
    return {
      items,
      visible: props.initialVisible,
      value: props.value
    };
  }

  /**
   * Used to convert the items if they are strings into the required object structure
   * @param {Array<String|Object>} items List of items represented as string or object
   * @returns {Array<Object>}
   */
  enrichItems(items) {
    return items.map(item => {
      if (typeof item === 'object') {
        return item;
      }
      return {label: item, value: item};
    });
  }

  /**
   * @returns {JSX}
   */
  render() {
    const regex = new RegExp(`/${this.state.filter}/`, 'i');
    const filteredItems = this.state.items.filter(item => regex.test(item.label));

    return (
      <div className="dropdown" ref={element => { if (element) { this.element = element; } }}>
        <input type="text" ref={element => { this.input = element; }} />
        <div
          className={`dropdown-container ${this.props.orientation}`}
          style={{width: this.props.width || '100%'}}
          ref={element => { if (element) { this.dropdownContainer = element; } }}
        >
          <DropdownMenu items={filteredItems} />
        </div>
        <div className="dropdown-arrow" />
      </div>
    );
  }
}
