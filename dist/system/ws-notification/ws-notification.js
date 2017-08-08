System.register(['../imports'], function (_export, _context) {
  "use strict";

  var React, Component, _createClass, DEFAULT_NOTIFICATION_LIFETIME, DEFAULT_NOTIFICATION_TYPE, WSNotification;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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

  return {
    setters: [function (_imports) {
      React = _imports.React;
      Component = _imports.Component;
    }],
    execute: function () {
      _createClass = function () {
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

      DEFAULT_NOTIFICATION_LIFETIME = 5000;
      DEFAULT_NOTIFICATION_TYPE = 'info';

      _export('WSNotification', WSNotification = function (_Component) {
        _inherits(WSNotification, _Component);

        function WSNotification() {
          _classCallCheck(this, WSNotification);

          var _this = _possibleConstructorReturn(this, (WSNotification.__proto__ || Object.getPrototypeOf(WSNotification)).call(this));

          _this.state = {
            notifications: [],
            timeoutId: null
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
            if (prevState.notifications.length < this.state.notifications.length) {
              this.animateIn(this.state.notifications[this.state.notifications.length - 1], this.state.notifications.length - 1);
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
            this.setState({
              notifications: this.state.notifications.concat([{ title: title, description: description, type: type, lifetime: lifetime }])
            });
          }
        }, {
          key: 'animateIn',
          value: function animateIn(notification, index) {
            var _this2 = this;

            var list = this.list;
            list.style.transition = 'none';
            list.style.transform = 'translate3d(0, 80px, 0)';
            setTimeout(function () {
              list.style.transition = 'transform .35s cubic-bezier(.35, 1, .69, .98) .1s';
              list.style.transform = 'translate3d(0, 0, 0)';
            }, 0);
            clearTimeout(this.state.timeoutId);
            this.setState({ timeoutId: setTimeout(function () {
                return _this2.close(index);
              }, notification.lifetime) });
          }
        }, {
          key: 'closeAllEvents',
          value: function closeAllEvents() {
            for (var i = 0; i < this.state.notifications.length; i++) {
              this.close(i);
            }
          }
        }, {
          key: 'close',
          value: function close(index) {
            var notification = this['notification-' + index];
            if (notification) {
              var notifications = this.state.notifications.slice();
              notifications.splice(index, 1);
              this.setState({
                notifications: notifications
              });
            }
          }
        }, {
          key: 'render',
          value: function render() {
            var _this3 = this;

            return React.createElement(
              'div',
              { className: 'ws-notification-wrapper' },
              React.createElement(
                'div',
                { className: 'ws-notification-list', ref: function ref(element) {
                    _this3.list = element;
                  } },
                this.state.notifications.map(function (notification, i) {
                  return React.createElement(
                    'div',
                    {
                      className: 'notification ' + notification.type,
                      key: 'notification-' + i,
                      ref: function ref(element) {
                        _this3['notification-' + i] = element;
                      },
                      onClick: function onClick() {
                        return _this3.close(i);
                      }
                    },
                    React.createElement(
                      'div',
                      { className: 'icons' },
                      React.createElement('i', { className: 'icon icon-info' }),
                      React.createElement('i', { className: 'icon icon-warning' }),
                      React.createElement('i', { className: 'icon icon-success' }),
                      React.createElement('i', { className: 'icon icon-error' })
                    ),
                    React.createElement(
                      'div',
                      { className: 'content' },
                      React.createElement(
                        'div',
                        { className: notification.description ? 'title' : 'title is-standalone' },
                        notification.title
                      ),
                      notification.description ? React.createElement(
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
      }(Component));

      _export('WSNotification', WSNotification);
    }
  };
});