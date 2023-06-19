System.register(['../imports'], function (_export, _context) {
  "use strict";

  var React, PropTypes, Component, _createClass, ANIMATION_END_EVENTS, WSOverlay;

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
      PropTypes = _imports.PropTypes;
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

      ANIMATION_END_EVENTS = ['oAnimationEnd', 'MSAnimationEnd', 'animationend'];

      _export('WSOverlay', WSOverlay = function (_Component) {
        _inherits(WSOverlay, _Component);

        function WSOverlay(props) {
          _classCallCheck(this, WSOverlay);

          var _this = _possibleConstructorReturn(this, (WSOverlay.__proto__ || Object.getPrototypeOf(WSOverlay)).call(this, props));

          Object.defineProperty(_this, 'onDocumentClick', {
            enumerable: true,
            writable: true,
            value: function value(event) {
              var element = event.target;
              while (element && _this.element !== element) {
                element = element.parentNode;
              }

              if (!element) {
                _this.close();
              }
            }
          });
          Object.defineProperty(_this, 'onGlobalKeyDown', {
            enumerable: true,
            writable: true,
            value: function value(event) {
              switch (event.key) {
                case 'Escape':
                  _this.close();
                  break;
                default:
                  break;
              }
            }
          });

          _this.contentHeight = 0;
          return _this;
        }

        _createClass(WSOverlay, [{
          key: 'setHeight',
          value: function setHeight(newHeight) {
            this.contentHeight = newHeight;
            this.container.style.height = newHeight + 'px';
          }
        }, {
          key: 'open',
          value: function open() {
            var _this2 = this;

            if (Overlay.openDropdown === this) {
              return;
            } else if (Overlay.openDropdown) {
              Overlay.openDropdown.close();
            }

            Overlay.openDropdown = this;
            this.container.style.height = 0;
            this.container.classList.add('mod-open');

            if (!this.contentHeight) {
              this.contentHeight = Array.from(this.container.children).reduce(function (height, child) {
                return height + child.clientHeight;
              }, 0);
            }

            setTimeout(function () {
              _this2.setHeight(_this2.contentHeight);
            }, 0);

            window.addEventListener('keydown', this.onGlobalKeyDown);
            window.addEventListener('click', this.onDocumentClick);

            if (typeof this.props.onOpen === 'function') {
              this.props.onOpen();
            }
          }
        }, {
          key: 'close',
          value: function close() {
            var _this3 = this;

            if (Overlay.openDropdown !== this) {
              return;
            }
            Overlay.openDropdown = null;
            this.animateElement(this.container, 'animate-close', function (container) {
              container.classList.remove('mod-open');
              container.style.height = 0;

              if (_this3.props.multiple) {
                _this3.dropdownMenu.clearSelections();
              }
            });

            window.removeEventListener('keydown', this.onGlobalKeyDown);
            window.removeEventListener('click', this.onDocumentClick);

            if (typeof this.props.onClose === 'function') {
              this.props.onClose();
            }
          }
        }, {
          key: 'toggle',
          value: function toggle() {
            if (Overlay.openDropdown !== this) {
              this.open();
            } else {
              this.close();
            }
          }
        }, {
          key: 'animateElement',
          value: function animateElement(item, animationClass, callback) {
            var getEventHandler = function getEventHandler(eventName) {
              var eventHandler = function eventHandler() {
                item.classList.remove(animationClass);
                item.removeEventListener(eventName, eventHandler);
                callback(item);
              };
              return eventHandler;
            };

            ANIMATION_END_EVENTS.forEach(function (eventName) {
              item.addEventListener(eventName, getEventHandler(eventName));
            });

            item.classList.add(animationClass);
          }
        }, {
          key: 'calculateWidth',
          value: function calculateWidth() {
            return this.props.width;
          }
        }, {
          key: 'render',
          value: function render() {
            var _this4 = this;

            return React.createElement(
              'div',
              { className: 'overlay', ref: function ref(element) {
                  if (element) {
                    _this4.element = element;
                  }
                } },
              React.createElement(
                'div',
                {
                  className: 'overlay-container mod-' + this.props.orientation,
                  style: { width: this.calculateWidth() },
                  ref: function ref(element) {
                    if (element) {
                      _this4.container = element;
                    }
                  }
                },
                this.props.children
              ),
              React.createElement('div', { className: 'overlay-arrow' })
            );
          }
        }]);

        return WSOverlay;
      }(Component));

      _export('WSOverlay', WSOverlay);

      Object.defineProperty(WSOverlay, 'defaultProps', {
        enumerable: true,
        writable: true,
        value: {
          width: '',
          orientation: 'left',
          onOpen: function onOpen() {},
          onClose: function onClose() {}
        }
      });
      Object.defineProperty(WSOverlay, 'propTypes', {
        enumerable: true,
        writable: true,
        value: {
          width: PropTypes.string,
          orientation: PropTypes.string,
          onOpen: PropTypes.func,
          onClose: PropTypes.func
        }
      });
      Object.defineProperty(WSOverlay, 'openOverlay', {
        enumerable: true,
        writable: true,
        value: null
      });
    }
  };
});