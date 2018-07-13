System.register(['../imports', './dropdown-menu'], function (_export, _context) {
  "use strict";

  var React, Component, PropTypes, DropdownMenu, _createClass, DropdownMenuItem;

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
      PropTypes = _imports.PropTypes;
    }, function (_dropdownMenu) {
      DropdownMenu = _dropdownMenu.DropdownMenu;
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

      _export('DropdownMenuItem', DropdownMenuItem = function (_Component) {
        _inherits(DropdownMenuItem, _Component);

        function DropdownMenuItem(props, context) {
          _classCallCheck(this, DropdownMenuItem);

          var _this = _possibleConstructorReturn(this, (DropdownMenuItem.__proto__ || Object.getPrototypeOf(DropdownMenuItem)).call(this, props, context));

          Object.defineProperty(_this, 'onMouseDown', {
            enumerable: true,
            writable: true,
            value: function value(event) {
              event.preventDefault();
            }
          });
          Object.defineProperty(_this, 'onClick', {
            enumerable: true,
            writable: true,
            value: function value(event) {
              event.stopPropagation();

              if ('activeElement' in document) {
                document.activeElement.blur();
              }
              var item = _this.state.item;

              if (item.disabled) {
                return;
              }

              if (_this.props.isParent) {
                _this.props.handle('go-back');
              } else if (item.children && item.children.length) {
                _this.props.handle('show-child', _this.menu);
              } else if (!_this.context.multiple) {
                if (item.selected) {
                  _this.props.handle('change', null);
                } else {
                  item.selected = true;
                  item.stored = true;

                  _this.setState({ item: item });

                  _this.props.handle('change', item);
                }
              } else {
                item.selected = !item.selected;
                _this.setState({ item: item });
              }
            }
          });
          Object.defineProperty(_this, 'handlePropagation', {
            enumerable: true,
            writable: true,
            value: function value(type, data) {
              _this.props.handle(type, data);
            }
          });

          _this.state = { item: props.item };
          _this.menu = null;
          return _this;
        }

        _createClass(DropdownMenuItem, [{
          key: 'componentDidMount',
          value: function componentDidMount() {
            this.dropdownItem.addEventListener('click', this.onClick);
            this.dropdownItem.addEventListener('mousedown', this.onMouseDown);
          }
        }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(props) {
            this.setState({ item: props.item });
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            this.dropdownItem.removeEventListener('click', this.onClick);
            this.dropdownItem.removeEventListener('mousedown', this.onMouseDown);
          }
        }, {
          key: 'render',
          value: function render() {
            var _this2 = this;

            var item = this.state.item;

            var anchorClass = 'text';
            anchorClass += item.selected ? ' is-active' : '';
            anchorClass += item.focused ? ' is-focused' : '';
            anchorClass += item.disabled ? ' is-disabled' : '';
            anchorClass += ' ' + (item.className || '');
            var itemClass = 'dropdown-item';
            itemClass += this.props.isParent ? ' dropdown-parent-item' : '';
            itemClass += item.children && !this.props.isParent ? ' has-children' : '';

            return React.createElement(
              'li',
              { className: itemClass },
              React.createElement(
                'a',
                {
                  className: anchorClass,
                  href: item.href,
                  title: item.title || item.label,
                  ref: function ref(element) {
                    _this2.dropdownItem = element;
                  }
                },
                (this.props.icon || item.icon) && React.createElement('i', { className: 'icon ' + (this.props.icon || item.icon) }),
                item.label
              ),
              !this.props.isParent && item.children && React.createElement(DropdownMenu, {
                items: item.children,
                parent: item,
                ref: function ref(element) {
                  _this2.menu = element;
                },
                handle: this.handlePropagation
              })
            );
          }
        }]);

        return DropdownMenuItem;
      }(Component));

      _export('DropdownMenuItem', DropdownMenuItem);

      Object.defineProperty(DropdownMenuItem, 'defaultProps', {
        enumerable: true,
        writable: true,
        value: {
          item: null,
          icon: null,
          isParent: false,
          handle: function handle() {}
        }
      });
      Object.defineProperty(DropdownMenuItem, 'propTypes', {
        enumerable: true,
        writable: true,
        value: {
          item: PropTypes.object,
          icon: PropTypes.string,
          isParent: PropTypes.bool,
          handle: PropTypes.func
        }
      });
      Object.defineProperty(DropdownMenuItem, 'contextTypes', {
        enumerable: true,
        writable: true,
        value: {
          multiple: PropTypes.bool
        }
      });
    }
  };
});