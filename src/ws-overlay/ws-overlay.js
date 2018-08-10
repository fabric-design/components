import {React, PropTypes, Component} from '../imports';

const ANIMATION_END_EVENTS = ['oAnimationEnd', 'MSAnimationEnd', 'animationend'];

/**
 * This class provides basic functionality to show content in an absolute positioned overlay. It either detects
 * the height of it's content automatically by their clientHeight or you can use the setHeight function to
 * programmatically set the overlay height.
 *
 * @property {number} width Width of the overlay in percent
 * @property {string} orientation Can be either left or right
 * @property {Function} onOpen Will be called when dialog opened
 * @property {Function} onClose Will be called when dialog closed
 */
export class WSOverlay extends Component {

  /**
   * React default property values
   * @type {Object}
   */
  static defaultProps = {
    width: '',
    orientation: 'left',
    onOpen: () => {},
    onClose: () => {}
  };

  /**
   * React property types
   * @type {Object}
   */
  static propTypes = {
    width: PropTypes.string,
    orientation: PropTypes.string,
    onOpen: PropTypes.func,
    onClose: PropTypes.func
  };

  /**
   * Holds the instance of the currently open overlay
   * @type {WSOverlay}
   */
  static openOverlay = null;

  /**
   * Init component
   * @param {Object} props React props
   */
  constructor(props) {
    super(props);
    this.contentHeight = 0;
    this.animations = [];
  }

  /**
   * Handles click on document body to close the dropdown if clicked elsewhere
   * @param {MouseEvent} event JavaScript event object
   * @returns {void}
   */
  onDocumentClick = event => {
    let element = event.target;
    while (element && this.element !== element) {
      element = element.parentNode;
    }
    // Element will be empty if not clicked into the current filter dialog
    if (!element) {
      this.close();
    }
  };

  /**
   * Handles global key down events when dropdown was opened
   * @param {KeyboardEvent} event JavaScript event object
   * @returns {void}
   */
  onGlobalKeyDown = event => {
    switch (event.key) {
      case 'Escape':
        this.close();
        break;
      default:
        break;
    }
  };

  /**
   * Set's the size on an element
   * @param {number} newHeight The new size of the active menu will become the new dropdown container size
   * @returns {void}
   */
  setHeight(newHeight) {
    this.contentHeight = newHeight;
    this.container.style.height = `${newHeight}px`;
  }

  /**
   * Opens the dropdown
   * @returns {void}
   */
  open() {
    // Animations could be finished after open function and this would remove mod-open and the height again
    this.finishAnimations();
    // Stop if this dropdown is already opened or close previous opened dropdown
    if (WSOverlay.openOverlay === this) {
      return;
    } else if (WSOverlay.openOverlay) {
      WSOverlay.openOverlay.close();
    }

    WSOverlay.openOverlay = this;
    this.container.style.height = 0;
    this.container.classList.add('mod-open');
    // Calculate initial height from all children if no content height is set
    // because the dropdown wasn't open already
    if (!this.contentHeight) {
      this.contentHeight = Array.from(this.container.children)
        .reduce((height, child) => height + child.clientHeight, 0);
    }
    // A micro task is required to have the previous styles already applied by the render engine
    // and to ensure the transition is triggered by a change
    setTimeout(() => {
      this.setHeight(this.contentHeight);
    }, 0);

    window.addEventListener('keydown', this.onGlobalKeyDown);
    window.addEventListener('click', this.onDocumentClick);

    if (typeof this.props.onOpen === 'function') {
      this.props.onOpen();
    }
  }

  /**
   * Closes the dropdown and clears the selection if needed
   * @returns {void}
   */
  close() {
    if (WSOverlay.openOverlay !== this) {
      return;
    }
    WSOverlay.openOverlay = null;
    this.animateElement(this.container, 'animate-close', container => {
      container.classList.remove('mod-open');
      container.style.height = 0;
    });

    window.removeEventListener('keydown', this.onGlobalKeyDown);
    window.removeEventListener('click', this.onDocumentClick);

    if (typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
  }

  /**
   * Open or close the overlay
   * @returns {void}
   */
  toggle() {
    if (WSOverlay.openOverlay !== this) {
      this.open();
    } else {
      this.close();
    }
  }

  /**
   * Animates an element by adding a class with an css animation and executes a callback when the animation ends
   * @param {Element} item The dom node to animate
   * @param {string} animationClass The css class which holds the animation definition
   * @param {Function} callback Callback which will be executed at the end of the animation
   * @returns {void}
   */
  animateElement(item, animationClass, callback) {
    // Define callback for animation end events
    const eventHandler = () => {
      item.classList.remove(animationClass);
      ANIMATION_END_EVENTS.forEach(eventName => {
        item.removeEventListener(eventName, eventHandler);
      });
      window.removeEventListener('blur', eventHandler);
      callback(item);
    };
    // Listen for all possible animation end events
    ANIMATION_END_EVENTS.forEach(eventName => {
      item.addEventListener(eventName, eventHandler);
    });
    // Force execute callback when window is blurred because browsers stop css animations and this leads to
    // problems as the rendering is resumed after focus again.
    window.addEventListener('blur', eventHandler);
    // Add class to start animation
    item.classList.add(animationClass);

    this.animations.push(eventHandler);
  }

  /**
   * Helper method to finish animations when the element changes and they are not done yet
   * @returns {void}
   */
  finishAnimations() {
    this.animations.forEach(eventHandler => {
      eventHandler();
    });
    this.animations = [];
  }

  /**
   * @returns {string}
   */
  calculateWidth() {
    return this.props.width;
  }

  /**
   * Render the complete dropdown
   * @returns {Object}
   */
  render() {
    return (
      <div className="overlay" ref={element => { if (element) { this.element = element; } }}>
        <div
          className={`overlay-container mod-${this.props.orientation}`}
          style={{width: this.calculateWidth()}}
          ref={element => { if (element) { this.container = element; } }}
        >
          {this.props.children}
        </div>
        <div className="overlay-arrow" />
      </div>
    );
  }
}
