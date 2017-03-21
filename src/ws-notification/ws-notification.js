import {React, Component} from '../imports';

// const NOTIFICATIONS_SHOW_LIMIT = 3;
const DEFAULT_NOTIFICATION_LIFETIME = 5000;
const DEFAULT_NOTIFICATION_TYPE = 'info';

/**
 * This class renders a notification list. To add new notifications here you have to publish a event to the window
 * with the name 'ws-notification-open' and the options listed below. To close all notifications just publish a event
 * with the name 'ws-notification-close-all' to the window object.
 *
 * Example with options:
 * @example window.dispatchEvent(new CustomEvent('ws-notification-open', {detail: {
 *   title: 'test', // Required string
 *   description: 'additional info', // Optional string
 *   type: 'warning', // Enum of info|success|warning|error. Default: info
 *   lifetime: 5000, // Lifetime of notification in milliseconds. Default: max int
 * }});
 */
export class WSNotification extends Component {

  /**
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      notifications: [],
      timeoutId: null
    };
    // Bind functions to this scope
    this.addNotify = this.addNotify.bind(this);
    this.closeAllEvents = this.closeAllEvents.bind(this);
  }

  /**
   * Listen to events on window object
   * @returns {void}
   */
  componentDidMount() {
    window.addEventListener('ws-notification-open', this.addNotify);
    window.addEventListener('ws-notification-close-all', this.closeAllEvents);
  }

  /**
   * Trigger animation of new notification if needed
   * @param {Object} prevProps Previous react component properties
   * @param {Object} prevState Previous react component state
   * @returns {void}
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.notifications.length < this.state.notifications.length) {
      this.animateIn(
        this.state.notifications[this.state.notifications.length - 1],
        this.state.notifications.length - 1
      );
    }
  }

  /**
   * Unbind event listener from window object
   * @returns {void}
   */
  componentWillUnmount() {
    window.removeEventListener('ws-notification-open');
    window.removeEventListener('ws-notification-close');
  }

  /**
   * Callback of event to add new notification to the list
   * @param {CustomEvent} event JavaScript event object
   * @returns {void}
   */
  addNotify(event) {
    const {title, description} = event.detail;
    let {type, lifetime} = event.detail;
    if (typeof lifetime === 'undefined') {
      lifetime = DEFAULT_NOTIFICATION_LIFETIME;
    } else if (!lifetime) {
      lifetime = 2147483647;
    }
    if (!type) {
      type = DEFAULT_NOTIFICATION_TYPE;
    }
    this.setState({
      notifications: this.state.notifications.concat([{title, description, type, lifetime}])
    });
  }

  /**
   * Start to animate in a notification
   * @param {Object} notification The notification to animate in
   * @param {Number} index Index of notification in the list
   * @returns {void}
   */
  animateIn(notification, index) {
    const list = this.refs.list;
    list.style.transition = 'none';
    list.style.transform = 'translate3d(0, 80px, 0)';
    setTimeout(() => {
      list.style.transition = 'transform .35s cubic-bezier(.35, 1, .69, .98) .1s';
      list.style.transform = 'translate3d(0, 0, 0)';
    }, 0);
    clearTimeout(this.state.timeoutId);
    this.setState({timeoutId: setTimeout(() => this.close(index), notification.lifetime)});
  }

  /**
   * Close all open notifications
   * @returns {void}
   */
  closeAllEvents() {
    for (let i = 0; i < this.state.notifications.length; i++) {
      this.close(i);
    }
  }

  /**
   * Close a specific notification
   * @param {Number} index The index of the notification in the list
   * @returns {void}
   */
  close(index) {
    const notification = this.refs[`notification-${index}`];
    if (notification) {
      const notifications = this.state.notifications.splice(index, 1);
      notification.style.transition = 'opacity .2s ease-out, max-height .8s ease, margin-bottom .8s ease';
      notification.style.willChange = 'opacity, max-height, margin-bottom';
      notification.style.opacity = 0;
      notification.style.maxHeight = 0;
      notification.style.marginBottom = '-4.5rem';
      setTimeout(() => {
        clearTimeout(this.state.timeoutId);
        this.setState({timeoutId: null, notifications});
      }, 1000);
    }
  }

  /**
   * Render the notification list
   * @returns {Object}
   */
  render() {
    return (<div className="ws-notification-wrapper">
      <div className="ws-notification-list" ref="list">
        {this.state.notifications.map((notification, i) =>
          <div
            className={`notification ${notification.type}`}
            key={`notification-${i}`}
            ref={`notification-${i}`}
            onClick={() => this.close(i)}
          >
            <div className="icons">
              <i className="icon icon-info" />
              <i className="icon icon-warning" />
              <i className="icon icon-success" />
              <i className="icon icon-error" />
            </div>
            <div className="content">
              <div className="title">{notification.title}</div>
              <p className="description">{notification.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>);
  }
}
