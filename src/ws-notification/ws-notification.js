import { React, Component } from '../imports';
import './ws-notification.scss';

// const NOTIFICATIONS_SHOW_LIMIT = 3;
const DEFAULT_NOTIFICATION_LIFETIME = 5000;
const DEFAULT_NOTIFICATION_TYPE = 'info';

export class WSNotification extends Component {
  constructor() {
    super();
    this.state = {
      notifications: [],
      timeoutId: null,
    };
    // Bind functions to this scope
    this.addNotify = this.addNotify.bind(this);
    this.closeAllEvents = this.closeAllEvents.bind(this);
  }
  componentDidMount() {
    window.addEventListener('ws-notification-open', this.addNotify);
    window.addEventListener('ws-notification-close-all', this.closeAllEvents);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.notifications.length < this.state.notifications.length) {
      this.animateIn(this.state.notifications[this.state.notifications.length - 1], this.state.notifications.length - 1);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('ws-notification-open');
    window.removeEventListener('ws-notification-close');
  }
  addNotify(event) {
    const { title, description } = event.detail;
    let { type, lifetime } = event.detail;
    if (typeof lifetime === 'undefined') {
      lifetime = DEFAULT_NOTIFICATION_LIFETIME;
    } else if (!lifetime) {
      lifetime = 2147483647;
    }
    if (!type) {
      type = DEFAULT_NOTIFICATION_TYPE;
    }
    this.setState({
      notifications: this.state.notifications.concat([{ title, description, type, lifetime }]),
    });
  }
  animateIn(notification, i) {
    const that = this;
    const list = that.refs.list;
    list.style.transition = 'none';
    list.style.transform = 'translate3d(0, 80px, 0)';
    setTimeout(() => {
      list.style.transition = 'transform .35s cubic-bezier(.35, 1, .69, .98) .1s';
      list.style.transform = 'translate3d(0, 0, 0)';
    }, 0);
    clearTimeout(this.state.timeoutId);
    this.setState({ timeoutId: setTimeout(() => that.close(i), notification.lifetime) });
  }
  closeAllEvents() {
    let i;
    for (i = 0; i < this.state.notifications.length; i++) {
      this.close(i);
    }
  }
  close(i) {
    const notification = this.refs[`notification-${i}`];
    if (notification) {
      const notifications = this.state.notifications.splice(i, 1);
      notification.style.transition = 'opacity .2s ease-out, max-height .8s ease, margin-bottom .8s ease';
      notification.style.willChange = 'opacity, max-height, margin-bottom';
      notification.style.opacity = 0;
      notification.style.maxHeight = 0;
      notification.style.marginBottom = '-4.5rem';
      setTimeout(() => {
        clearTimeout(this.state.timeoutId);
        this.setState({
          timeoutId: null,
          notifications,
        });
      }, 1000);
    }
  }
  render() {
    return (<div className="ws-notification-wrapper">
      <div className="ws-notification-list" ref="list">
        {this.state.notifications.map((notification, i) =>
          <div className={`notification ${notification.type}`} key={`notification-${i}`} ref={`notification-${i}`} onClick={() => this.close(i)}>
            <div className="icons">
              <i className="icon icon-info"></i>
              <i className="icon icon-warning"></i>
              <i className="icon icon-success"></i>
              <i className="icon icon-error"></i>
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
