import {React, Component, PropTypes} from '../imports';

/**
 * Renders a list of clickable buttons. The amount of initial visible buttons can be controlled with
 * the initialVisible property. The user is able to show more than these defined amount by clicking the "more" button.
 *
 * @property {Array} items List of items like {label: "Button 1", value: 1}
 * @property {number} initialVisible Number of items visible without expanding the list
 * @property {number} maxSelected Amount of maximum selectable buttons at once
 * @property {string} buttonClass Additional css classes for each button
 */
export class WSOptionButtons extends Component {

  static propTypes = {
    items: PropTypes.array,
    initialVisible: PropTypes.number,
    value: PropTypes.string,
    buttonClass: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    items: [],
    initialVisible: 3,
    value: null,
    buttonClass: '',
    onChange: () => {}
  };

  /**
   * @param {Object} props React props
   */
  constructor(props) {
    super(props);
    this.buttons = [];

    this.state = this.createState(props);
  }

  /**
   * Binds event listeners when element is attached to dom
   * @returns {void}
   */
  componentDidMount() {
    this.buttons.forEach(button => button.addEventListener('click', this.onClickButton));
    if (this.moreAnchor) {
      this.moreAnchor.addEventListener('click', this.onClickToggle);
    }
  }

  /**
   * Updates the state if props changes from outside
   * @param {Object} props React props
   * @returns {void}
   */
  componentWillReceiveProps(props) {
    this.setState(this.createState(props));
  }

  /**
   * Bind to new elements
   * @returns {void}
   */
  componentDidUpdate() {
    this.buttons.forEach(button => button.addEventListener('click', this.onClickButton));
    if (this.moreAnchor) {
      this.moreAnchor.addEventListener('click', this.onClickToggle);
    }
  }

  /**
   * Removes event listeners before element is detached from dom
   * @returns {void}
   */
  componentWillUnmount() {
    this.buttons.forEach(button => button.removeEventListener('click', this.onClickButton));
    if (this.moreAnchor) {
      this.moreAnchor.removeEventListener('click', this.onClickToggle);
    }
  }

  /**
   * Handles toggling visible amount
   * @param {MouseEvent} event JavaScript event object
   * @returns {void}
   */
  onClickToggle = event => {
    event.stopPropagation();

    if (this.state.visible === this.state.items.length) {
      this.setState({visible: this.props.initialVisible});
    } else {
      this.setState({visible: this.state.items.length});
    }
  };

  /**
   * Handles button selection
   * @param {MouseEvent} event JavaScript event object
   * @returns {void}
   */
  onClickButton = event => {
    event.stopPropagation();
    const {items} = this.state;
    const clickedIndex = this.buttons.indexOf(event.currentTarget);
    // Mark other items as de-selected and toggle selection of clicked one
    items[clickedIndex].selected = !items[clickedIndex].selected;
    this.setState({items});

    const value = items.filter(item => item.selected).map(item => item.value);
    this.dispatchEvent('change', value);
    // Notify react and preact parents
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(value);
    }
  };

  /**
   * Creates a state object from React props
   * @param {Object} props React props
   * @returns {Object}
   */
  createState(props) {
    const items = this.enrichItems(props.items);
    // allow single value and list of values
    let value = [];
    if (props.value) {
      value = Array.isArray(props.value) ? props.value : [props.value];
    }
    items.forEach(item => {
      item.selected = value.includes(item.value);
    });
    return {
      items,
      visible: props.initialVisible,
      value
    };
  }

  /**
   * Used to convert the items if they are strings into the required object structure
   * @param {Array<string|Object>} items List of items represented as string or object
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
   * Renders the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="ws-option-buttons" ref={element => { this.element = element; }}>
        {this.state.items.map((item, index) => (
          <div className={`option-button ${index < this.state.visible ? '' : 'is-hidden'}`}>
            <a
              className={`${this.props.buttonClass} ${item.selected ? 'is-active' : ''}`}
              data-index=""
              ref={element => { this.buttons[index] = element; }}
            >
              {item.label || item.value}
            </a>
          </div>
        ))}
        <a
          className={`show-more ${this.props.initialVisible < this.state.items.length ? 'is-hidden' : ''}`}
          ref={element => { this.moreAnchor = element; }}
        >
          {this.state.visible === this.state.items.length ? 'less' : 'more'}
        </a>
      </div>
    );
  }
}
