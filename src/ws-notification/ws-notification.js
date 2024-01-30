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
      timeouts: {},
      counter: 0
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
      this.state.notifications.forEach(notification => {
        if (!(notification.id in this.state.timeouts)) {
          this.animateIn(notification);
        }
      });
    }
  }

  /**
   * Unbind event listener from window object
   * @returns {void}
   */
  componentWillUnmount() {
    window.removeEventListener('ws-notification-open', this.addNotify);
    window.removeEventListener('ws-notification-close', this.closeAllEvents);
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
    const counter = this.state.counter + 1;
    this.setState({
      notifications: this.state.notifications.concat([{
        title, description, type, lifetime, id: counter
      }]),
      counter
    });
  }

  /**
   * Start to animate in a notification
   * @param {Object} notification The notification to animate in
   * @returns {void}
   */
  animateIn(notification) {
    this.list.style.transition = 'none';
    this.list.style.transform = 'translate3d(0, 80px, 0)';
    setTimeout(() => {
      this.list.style.transition = 'transform .35s cubic-bezier(.35, 1, .69, .98) .1s';
      this.list.style.transform = 'translate3d(0, 0, 0)';
    }, 0);

    this.setState({
      timeouts: {
        ...this.state.timeouts,
        ...{
          [notification.id]: setTimeout(() => {
            this.close(notification.id);
          }, notification.lifetime)
        }
      }
    });
  }

  /**
   * Close all open notifications
   * @returns {void}
   */
  closeAllEvents() {
    for (let i = 0; i < this.state.notifications.length; i++) {
      this.close(this.state.notifications[i].id);
    }
  }

  /**
   * Close a specific notification
   * @param {number} id The id of the notification in the list
   * @returns {void}
   */
  close(id) {
    const index = this.state.notifications.findIndex(notification => notification.id === id);
    if (index >= 0) {
      const notifications = this.state.notifications.slice();
      const notificationId = notifications[index].id;
      const timeouts = {...this.state.timeouts};
      delete timeouts[notificationId];
      clearTimeout(this.state.timeouts[notificationId]);
      notifications.splice(index, 1);
      this.setState({
        notifications,
        timeouts
      });
    }
  }

  /**
   * Render the notification list
   * @returns {Object}
   */
  render() {
    return (
      <div className="ws-notification-wrapper">
        <div className="ws-notification-list" ref={element => { this.list = element; }}>
          {this.state.notifications.map((notification, i) => (
            <div
              className={`notification ${notification.type}`}
              key={`notification-${i}`}
              ref={element => { this[`notification-${i}`] = element; }}
              onClick={() => this.close(notification.id)}
            >
              <div className="icons">
                <i className="icon icon-info" />
                <i className="icon icon-warning" />
                <i className="icon icon-success" />
                <i className="icon icon-error" />
              </div>
              <div className="content">
                <div className={(notification.description) ? 'title' : 'title is-standalone'}>{notification.title}</div>
                {(notification.description) ? <p className="description">{notification.description}</p> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
