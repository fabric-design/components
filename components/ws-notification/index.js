import { React, Component } from '../imports';
import './ws-notification.scss';

//const NOTIFICATIONS_SHOW_LIMIT = 3;
const DEFAULT_NOTIFICATION_LIFETIME = 5000;
const DEFAULT_NOTIFICATION_TYPE = 'info';

export class WSNotification extends Component {
  constructor() {
    super();
    this.state = {
      notifications: [],
      timeoutId: null
    };
    // Bind functions to this scope
    this.addNotify = this.addNotify.bind(this);
    this.closeAllEvent = this.closeAllEvent.bind(this);
  }
  componentDidMount() {
    window.addEventListener('ws-notification-open', this.addNotify);
    window.addEventListener('ws-notification-close-all', this.closeAllEvent);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.notifications.length < this.state.notifications.length) {
      this.animateIn(this.state.notifications[this.state.notifications.length-1], this.state.notifications.length-1);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('ws-notification-open');
    window.removeEventListener('ws-notification-close');
  }
  addNotify (event) {
    let {title, description, type, lifetime} = event.detail;
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
  animateIn(notification, i) {
    const that = this;
    this.refs.list.style.transition = `none`;
    this.refs.list.style.transform = `translate3d(0, 80px, 0)`;
    setTimeout(() => {
        this.refs.list.style.transition = `transform .35s cubic-bezier(.35, 1, .69, .98) .1s`;
        this.refs.list.style.transform = `translate3d(0, 0, 0)`;
    }, 0);
    clearTimeout(this.state.timeoutId);
    this.setState({timeoutId: setTimeout(function () {
      return that.close(i);
    }, notification.lifetime)});
  }
  closeAllEvent() {
    let i;
    let len = this.state.notifications.length;
    for(i = 0; i < len; i++) {
      this.close(i);
    }
  }
  close(i) {
    if (this.refs[`notification-${i}`]) {
      this.refs[`notification-${i}`].style.transition = 'opacity .2s ease-out, max-height .8s ease, margin-bottom .8s ease';
      this.refs[`notification-${i}`].style.willChange = 'opacity, max-height, margin-bottom';
      this.refs[`notification-${i}`].style.opacity = 0;
      this.refs[`notification-${i}`].style.maxHeight = 0;
      this.refs[`notification-${i}`].style.marginBottom = '-4.5rem';
      let notifications = this.state.notifications.splice(i,1);
      setTimeout(() => {
          clearTimeout(this.state.timeoutId);
          this.setState({
            timeoutId: null,
            notifications
          });
      }, 1000);
    }
  }
  render() {
    const that = this;
    let notificationsList = [];
    this.state.notifications.forEach((notification, i) => {
      //if ((i <= NOTIFICATIONS_SHOW_LIMIT)) {
        notificationsList.push(<div className={`notification ${notification.type}`} key={`notification-${i}`} ref={`notification-${i}`} onClick={() => this.close(i)}>
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
        </div>);
      //}
    });
    

    return (<div className="ws-notification-wrapper">
      <div className="ws-notification-list" ref="list">
        {notificationsList}
      </div>
    </div>);
  }
}