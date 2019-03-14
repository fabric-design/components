define(['exports', '../imports'], function (exports, _imports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WSNotification = undefined;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var DEFAULT_NOTIFICATION_LIFETIME = 5000;
  var DEFAULT_NOTIFICATION_TYPE = 'info';

  var WSNotification = exports.WSNotification = function (_Component) {
    _inherits(WSNotification, _Component);

    function WSNotification() {
      _classCallCheck(this, WSNotification);

      var _this = _possibleConstructorReturn(this, (WSNotification.__proto__ || Object.getPrototypeOf(WSNotification)).call(this));

      _this.state = {
        notifications: [],
        timeouts: {},
        counter: 0
      };

      _this.addNotify = _this.addNotify.bind(_this);
      _this.closeAllEvents = _this.closeAllEvents.bind(_this);
      return _this;
    }

    _createClass(WSNotification, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        window.addEventListener('ws-notification-open', this.addNotify);
        window.addEventListener('ws-notification-close-all', this.closeAllEvents);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        var _this2 = this;

        if (prevState.notifications.length < this.state.notifications.length) {
          this.state.notifications.forEach(function (notification) {
            if (!(notification.id in _this2.state.timeouts)) {
              _this2.animateIn(notification);
            }
          });
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.removeEventListener('ws-notification-open', this.addNotify);
        window.removeEventListener('ws-notification-close', this.closeAllEvents);
      }
    }, {
      key: 'addNotify',
      value: function addNotify(event) {
        var _event$detail = event.detail,
            title = _event$detail.title,
            description = _event$detail.description;
        var _event$detail2 = event.detail,
            type = _event$detail2.type,
            lifetime = _event$detail2.lifetime;

        if (typeof lifetime === 'undefined') {
          lifetime = DEFAULT_NOTIFICATION_LIFETIME;
        } else if (!lifetime) {
          lifetime = 2147483647;
        }
        if (!type) {
          type = DEFAULT_NOTIFICATION_TYPE;
        }
        var counter = this.state.counter + 1;
        this.setState({
          notifications: this.state.notifications.concat([{
            title: title, description: description, type: type, lifetime: lifetime, id: counter
          }]),
          counter: counter
        });
      }
    }, {
      key: 'animateIn',
      value: function animateIn(notification) {
        var _this3 = this;

        this.list.style.transition = 'none';
        this.list.style.transform = 'translate3d(0, 80px, 0)';
        setTimeout(function () {
          _this3.list.style.transition = 'transform .35s cubic-bezier(.35, 1, .69, .98) .1s';
          _this3.list.style.transform = 'translate3d(0, 0, 0)';
        }, 0);

        this.setState({
          timeouts: _extends({}, this.state.timeouts, _defineProperty({}, notification.id, setTimeout(function () {
            _this3.close(notification.id);
          }, notification.lifetime)))
        });
      }
    }, {
      key: 'closeAllEvents',
      value: function closeAllEvents() {
        for (var i = 0; i < this.state.notifications.length; i++) {
          this.close(this.state.notifications[i].id);
        }
      }
    }, {
      key: 'close',
      value: function close(id) {
        var index = this.state.notifications.findIndex(function (notification) {
          return notification.id === id;
        });
        if (index >= 0) {
          var notifications = this.state.notifications.slice();
          var notificationId = notifications[index].id;
          var timeouts = _extends({}, this.state.timeouts);
          delete timeouts[notificationId];
          clearTimeout(this.state.timeouts[notificationId]);
          notifications.splice(index, 1);
          this.setState({
            notifications: notifications,
            timeouts: timeouts
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this4 = this;

        return _imports.React.createElement(
          'div',
          { className: 'ws-notification-wrapper' },
          _imports.React.createElement(
            'div',
            { className: 'ws-notification-list', ref: function ref(element) {
                _this4.list = element;
              } },
            this.state.notifications.map(function (notification, i) {
              return _imports.React.createElement(
                'div',
                {
                  className: 'notification ' + notification.type,
                  key: 'notification-' + i,
                  ref: function ref(element) {
                    _this4['notification-' + i] = element;
                  },
                  onClick: function onClick() {
                    return _this4.close(notification.id);
                  }
                },
                _imports.React.createElement(
                  'div',
                  { className: 'icons' },
                  _imports.React.createElement('i', { className: 'icon icon-info' }),
                  _imports.React.createElement('i', { className: 'icon icon-warning' }),
                  _imports.React.createElement('i', { className: 'icon icon-success' }),
                  _imports.React.createElement('i', { className: 'icon icon-error' })
                ),
                _imports.React.createElement(
                  'div',
                  { className: 'content' },
                  _imports.React.createElement(
                    'div',
                    { className: notification.description ? 'title' : 'title is-standalone' },
                    notification.title
                  ),
                  notification.description ? _imports.React.createElement(
                    'p',
                    { className: 'description' },
                    notification.description
                  ) : null
                )
              );
            })
          )
        );
      }
    }]);

    return WSNotification;
  }(_imports.Component);
});