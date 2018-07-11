System.register(['../imports', './dropdown-menu-item'], function (_export, _context) {
  "use strict";

  var React, Component, PropTypes, DropdownMenuItem, _createClass, ANIMATION_START_EVENTS, ANIMATION_END_EVENTS, DropdownMenu;

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
    }, function (_dropdownMenuItem) {
      DropdownMenuItem = _dropdownMenuItem.DropdownMenuItem;
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

      ANIMATION_START_EVENTS = ['oAnimationStart', 'MSAnimationStart', 'animationstart'];
      ANIMATION_END_EVENTS = ['oAnimationEnd', 'MSAnimationEnd', 'animationend'];

      _export('DropdownMenu', DropdownMenu = function (_Component) {
        _inherits(DropdownMenu, _Component);

        function DropdownMenu(props, context) {
          _classCallCheck(this, DropdownMenu);

          var _this = _possibleConstructorReturn(this, (DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).call(this, props, context));

          Object.defineProperty(_this, 'onOpen', {
            enumerable: true,
            writable: true,
            value: function value() {
              _this.isActive = true;
              window.addEventListener('keydown', _this.onGlobalKeyDown);
            }
          });
          Object.defineProperty(_this, 'onClose', {
            enumerable: true,
            writable: true,
            value: function value() {
              _this.isActive = false;
              window.removeEventListener('keydown', _this.onGlobalKeyDown);
            }
          });
          Object.defineProperty(_this, 'onGlobalKeyDown', {
            enumerable: true,
            writable: true,
            value: function value(event) {
              switch (event.key) {
                case 'ArrowUp':
                  event.preventDefault();
                  _this.focusNextItem(-1);
                  break;
                case 'ArrowDown':
                  event.preventDefault();
                  _this.focusNextItem(1);
                  break;
                case 'Enter':
                  _this.selectCurrentItem();
                  break;
                default:
                  break;
              }
            }
          });
          Object.defineProperty(_this, 'onKeyUpUpdateFilter', {
            enumerable: true,
            writable: true,
            value: function value(event) {
              event.stopPropagation();
              _this.setState({ filter: event.target.value });
            }
          });
          Object.defineProperty(_this, 'onClickSubmit', {
            enumerable: true,
            writable: true,
            value: function value(event) {
              event.stopPropagation();
              var value = _this.state.items.filter(function (item) {
                item.focused = false;
                item.stored = item.selected;
                return item.selected;
              });

              _this.props.handle('change', value);
              _this.setState({ value: value });
            }
          });
          Object.defineProperty(_this, 'onClickSelectAll', {
            enumerable: true,
            writable: true,
            value: function value() {
              if (_this.state.items) {
                _this.state.items.forEach(function (item) {
                  item.selected = !_this.state.selectAllActive;
                });
                _this.setState({
                  items: _this.state.items,
                  selectAllActive: !_this.state.selectAllActive
                });
              }
            }
          });
          Object.defineProperty(_this, 'handlePropagation', {
            enumerable: true,
            writable: true,
            value: function value(type, data) {
              switch (type) {
                case 'go-back':
                  _this.props.handle('show-parent');
                  break;

                case 'show-parent':
                  _this.showCurrent();
                  break;
                case 'show-child':
                  _this.showChild(data);
                  break;
                case 'change':
                  if (_this.props.filterable) {
                    _this.setState({ filter: '' });
                  }

                  if (!_this.context.multiple) {
                    var previous = _this.state.items.find(function (item) {
                      return item.stored && item !== data;
                    });
                    if (previous) {
                      previous.stored = false;
                      previous.selected = false;
                    }
                  }
                  _this.props.handle(type, data);
                  break;
                case 'change-height':
                default:
                  _this.props.handle(type, data);
                  break;
              }
            }
          });

          _this.openSubMenu = null;
          _this.selectedIndex = -1;
          _this.state = {
            filter: props.filter,
            filtered: props.filtered || props.filterable,
            items: props.items,
            value: props.value,
            selectAllActive: false
          };
          return _this;
        }

        _createClass(DropdownMenu, [{
          key: 'componentDidMount',
          value: function componentDidMount() {
            if (this.input) {
              this.input.addEventListener('keyup', this.onKeyUpUpdateFilter);
              this.input.addEventListener('change', function (event) {
                return event.stopPropagation();
              });
            }
            if (this.button) {
              this.button.addEventListener('click', this.onClickSubmit);
              this.button.addEventListener('keydown', function (event) {
                return event.stopPropagation();
              });
            }
            if (this.selectAllButton) {
              this.selectAllButton.addEventListener('click', this.onClickSelectAll);
            }
          }
        }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(props) {
            this.setState({
              filter: props.filter,
              filtered: props.filtered || props.filterable,
              items: props.items,
              value: props.value,
              selectAllActive: props.selectAllActive
            });
          }
        }, {
          key: 'componentDidUpdate',
          value: function componentDidUpdate() {
            if (this.isActive) {
              this.props.handle('change-height', this.getHeight());
            }
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            if (this.input) {
              this.input.removeEventListener('keyup', this.onKeyUpUpdateFilter);
              this.input.removeEventListener('change', function (event) {
                return event.stopPropagation();
              });
            }
            if (this.button) {
              this.button.removeEventListener('click', this.onClickSubmit);
              this.button.removeEventListener('keydown', function (event) {
                return event.stopPropagation();
              });
            }
            if (this.selectAllButton) {
              this.selectAllButton.removeEventListener('click', this.onClickSelectAll);
            }
          }
        }, {
          key: 'getHeight',
          value: function getHeight() {
            return this.menuContainer.clientHeight;
          }
        }, {
          key: 'getFilteredItems',
          value: function getFilteredItems() {
            var _this2 = this;

            var regex = new RegExp(this.state.filter, 'i');
            return this.state.items.filter(function (item) {
              if (_this2.state.filtered && _this2.state.filter && !regex.test(item.label)) {
                return false;
              }

              if (_this2.state.filtered || _this2.context.multiple) {
                return !item.stored;
              }
              return true;
            });
          }
        }, {
          key: 'getItemAtIndex',
          value: function getItemAtIndex(index) {
            var limit = this.state.filtered ? this.props.limit : this.state.items.length;
            var filteredItems = this.getFilteredItems().slice(0, limit);
            var valueLength = 0;
            if (this.context.multiple || this.state.filtered) {
              if (Array.isArray(this.state.value)) {
                valueLength = this.state.value.length;
              } else {
                valueLength = this.state.value ? 1 : 0;
              }
            }
            var visibleItems = filteredItems.length + valueLength;
            var correctedIndex = index;

            if (index >= visibleItems) {
              correctedIndex = 0;
            } else if (index < 0) {
              correctedIndex = visibleItems - 1;
            }

            if (valueLength && correctedIndex < valueLength && correctedIndex >= 0) {
              return {
                item: Array.isArray(this.state.value) ? this.state.value[correctedIndex] : this.state.value,
                index: correctedIndex
              };
            }
            return { item: filteredItems[correctedIndex - valueLength], index: correctedIndex };
          }
        }, {
          key: 'focusNextItem',
          value: function focusNextItem(direction) {
            this.state.items.forEach(function (item) {
              item.focused = false;
            });
            var result = this.getItemAtIndex(this.selectedIndex + direction);
            result.item.focused = true;

            this.forceUpdate();
            this.selectedIndex = result.index;
          }
        }, {
          key: 'selectCurrentItem',
          value: function selectCurrentItem() {
            var result = this.getItemAtIndex(this.selectedIndex);
            result.item.selected = !result.item.selected;
            if (!this.context.multiple) {
              result.item.stored = result.item.selected;
              this.handlePropagation('change', result.item.stored ? result.item : null);
            }
            this.forceUpdate();
          }
        }, {
          key: 'showChild',
          value: function showChild(subMenu) {
            this.openSubMenu = subMenu;
            this.props.handle('change-height', subMenu.getHeight());
            this.animateOut(false);
            subMenu.animateIn(false);

            subMenu.isActive = true;
            this.isActive = false;
          }
        }, {
          key: 'showCurrent',
          value: function showCurrent() {
            if (this.openSubMenu) {
              this.props.handle('change-height', this.getHeight());
              this.openSubMenu.animateOut(true);
              this.animateIn(true);
              this.openSubMenu.isActive = false;
              this.isActive = true;
              this.openSubMenu = null;
            }
          }
        }, {
          key: 'animateIn',
          value: function animateIn(goBack) {
            var inAnimation = goBack ? 'animate-in' : 'animate-sub-in';

            this.animateElement(this.menuContainer, inAnimation, function (menu) {
              menu.classList.remove('mod-sub-open');
              menu.classList.add('mod-menu-open');
            });
          }
        }, {
          key: 'animateOut',
          value: function animateOut(goBack) {
            var outAnimation = !goBack ? 'animate-out' : 'animate-sub-out';

            this.animateElement(this.menuContainer, outAnimation, function (menu) {
              menu.classList.remove('mod-menu-open');
              if (!goBack) {
                menu.classList.add('mod-sub-open');
              }
            });
          }
        }, {
          key: 'animateElement',
          value: function animateElement(item, animationClass, callback) {
            var eventCounter = 0;

            var handler = function handler() {
              eventCounter -= 1;
              if (eventCounter) {
                return;
              }

              ANIMATION_END_EVENTS.forEach(function (eventName) {
                item.removeEventListener(eventName, handler);
              });
              item.classList.remove(animationClass);
              callback(item);
            };

            ANIMATION_END_EVENTS.forEach(function (eventName) {
              item.addEventListener(eventName, handler);
            });

            ANIMATION_START_EVENTS.forEach(function (eventName) {
              item.addEventListener(eventName, function () {
                eventCounter += 1;
              });
            });

            item.classList.add(animationClass);
          }
        }, {
          key: 'render',
          value: function render() {
            var _this3 = this;

            var limit = this.state.filtered ? this.props.limit : this.state.items.length;
            var items = this.getFilteredItems().slice(0, limit);
            var hasValue = Array.isArray(this.state.value) ? this.state.value.length : this.state.value;

            return React.createElement(
              'ul',
              {
                className: 'dropdown-menu ' + (!this.props.parent ? 'dropdown-root-menu' : 'dropdown-child-menu'),
                ref: function ref(element) {
                  _this3.menuContainer = element;
                }
              },
              this.props.filterable && React.createElement(
                'li',
                { className: 'dropdown-input', key: 'filter' },
                React.createElement('input', {
                  type: 'text',
                  value: this.state.filter,
                  placeholder: this.props.placeholder,
                  ref: function ref(element) {
                    _this3.input = element;
                  }
                })
              ),
              this.props.parent && [React.createElement(DropdownMenuItem, {
                item: this.props.parent,
                icon: 'icon-left',
                handle: this.handlePropagation,
                key: 'parent',
                isParent: true
              }), React.createElement('li', { className: 'dropdown-item-separator', key: 'parent-separator' })],
              hasValue && (this.context.multiple || this.props.filterable) ? [this.state.items.filter(function (item) {
                return item.stored;
              }).map(function (item, index) {
                return React.createElement(DropdownMenuItem, { item: item, handle: _this3.handlePropagation, key: 'value-' + index });
              }), React.createElement('li', { className: 'dropdown-item-separator', key: 'value-separator' })] : null,
              items.map(function (item, index) {
                return React.createElement(DropdownMenuItem, { item: item, handle: _this3.handlePropagation, key: 'item-' + index });
              }),
              (!items || !items.length) && React.createElement(DropdownMenuItem, { item: { label: 'No results found', disabled: true }, key: 'disabled' }),
              this.context.multiple && [React.createElement('li', { className: 'dropdown-item-separator', key: 'submit-separator' }), React.createElement(
                'li',
                { className: 'dropdown-submit', key: 'submit' },
                this.props.selectAll && [React.createElement(
                  'button',
                  {
                    key: 'selectAll',
                    className: 'mod-secondary mr-s mod-small ' + (this.state.selectAllActive ? 'mod-toggle is-active' : ''),
                    ref: function ref(element) {
                      _this3.selectAllButton = element;
                    }
                  },
                  'ALL'
                )],
                React.createElement(
                  'button',
                  { className: 'mod-small dropdown-submit-button', ref: function ref(element) {
                      _this3.button = element;
                    } },
                  'OK'
                )
              )]
            );
          }
        }]);

        return DropdownMenu;
      }(Component));

      _export('DropdownMenu', DropdownMenu);

      Object.defineProperty(DropdownMenu, 'defaultProps', {
        enumerable: true,
        writable: true,
        value: {
          parent: null,
          items: [],
          value: null,
          filterable: false,
          filter: null,
          filtered: false,
          placeholder: '',
          limit: 10,
          selectAll: false,
          handle: function handle() {}
        }
      });
      Object.defineProperty(DropdownMenu, 'propTypes', {
        enumerable: true,
        writable: true,
        value: {
          parent: PropTypes.object,
          items: PropTypes.array,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
          filterable: PropTypes.bool,
          filter: PropTypes.string,
          filtered: PropTypes.bool,
          placeholder: PropTypes.string,
          limit: PropTypes.number,
          selectAll: PropTypes.bool,
          handle: PropTypes.func
        }
      });
      Object.defineProperty(DropdownMenu, 'contextTypes', {
        enumerable: true,
        writable: true,
        value: {
          multiple: PropTypes.bool
        }
      });
    }
  };
});