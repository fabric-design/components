define(['exports', '../imports', './dropdown-menu-item'], function (exports, _imports, _dropdownMenuItem) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DropdownMenu = undefined;

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

  var ANIMATION_START_EVENTS = ['oAnimationStart', 'MSAnimationStart', 'animationstart'];
  var ANIMATION_END_EVENTS = ['oAnimationEnd', 'MSAnimationEnd', 'animationend'];

  var DropdownMenu = exports.DropdownMenu = function (_Component) {
    _inherits(DropdownMenu, _Component);

    function DropdownMenu(props, context) {
      _classCallCheck(this, DropdownMenu);

      var _this = _possibleConstructorReturn(this, (DropdownMenu.__proto__ || Object.getPrototypeOf(DropdownMenu)).call(this, props, context));

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
              if (_this.context.multiple) {
                _this.clearSelections();
              }
              _this.props.handle(type, data);
              break;
            case 'change-size':
            default:
              _this.props.handle(type, data);
              break;
          }
        }
      });

      _this.openSubMenu = null;
      _this.state = {
        filter: props.filter,
        items: props.items,
        value: props.value
      };
      return _this;
    }

    _createClass(DropdownMenu, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.input) {
          this.input.addEventListener('change', function (event) {
            return event.stopPropagation();
          });
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        this.props.handle('change-size', this.getHeight());
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.input) {
          this.input.removeEventListener('change', function (event) {
            return event.stopPropagation();
          });
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
          if (_this2.props.filterable && _this2.state.filter && !regex.test(item.label)) {
            return false;
          }

          return _this2.context.multiple ? !item.stored : true;
        });
      }
    }, {
      key: 'updateFilter',
      value: function updateFilter(event) {
        event.stopPropagation();
        this.setState({ filter: event.target.value });
      }
    }, {
      key: 'clearSelections',
      value: function clearSelections() {
        if (this.state.items) {
          this.state.items.forEach(function (item) {
            if (item.selected && !item.stored) {
              item.selected = false;
            }
          });
        }
      }
    }, {
      key: 'submit',
      value: function submit(event) {
        event.stopPropagation();
        var value = this.state.items.filter(function (item) {
          item.stored = item.selected;
          return item.selected;
        });

        this.props.handle('change', value);
        this.setState({ value: value });
      }
    }, {
      key: 'showChild',
      value: function showChild(subMenu) {
        this.openSubMenu = subMenu;
        this.props.handle('change-size', subMenu.getHeight());
        this.animateOut(false);
        subMenu.animateIn(false);
      }
    }, {
      key: 'showCurrent',
      value: function showCurrent() {
        if (this.openSubMenu) {
          this.props.handle('change-size', this.getHeight());
          this.openSubMenu.animateOut(true);
          this.animateIn(true);
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

        var limit = this.props.filterable ? this.props.limit : this.state.items.length;
        var items = this.getFilteredItems().slice(0, limit);

        return _imports.React.createElement(
          'ul',
          {
            className: 'dropdown-menu ' + (!this.props.parent ? 'dropdown-root-menu' : 'dropdown-child-menu'),
            ref: function ref(element) {
              _this3.menuContainer = element;
            }
          },
          this.props.filterable && _imports.React.createElement(
            'li',
            { className: 'dropdown-input', key: 'filter' },
            _imports.React.createElement('input', {
              type: 'text',
              defaultValue: this.state.filter,
              placeholder: this.props.placeholder,
              onKeyUp: function onKeyUp(event) {
                return _this3.updateFilter(event);
              },
              ref: function ref(element) {
                _this3.input = element;
              }
            })
          ),
          this.props.parent && [_imports.React.createElement(_dropdownMenuItem.DropdownMenuItem, {
            item: this.props.parent,
            icon: 'icon-left',
            handle: this.handlePropagation,
            key: 'parent',
            isParent: true
          }), _imports.React.createElement('li', { className: 'dropdown-item-separator', key: 'parent-separator' })],
          this.state.value && this.state.value.length ? [this.state.value.map(function (item, index) {
            return _imports.React.createElement(_dropdownMenuItem.DropdownMenuItem, { item: item, handle: _this3.handlePropagation, key: 'value-' + index });
          }), _imports.React.createElement('li', { className: 'dropdown-item-separator', key: 'value-separator' })] : null,
          items.map(function (item, index) {
            return _imports.React.createElement(_dropdownMenuItem.DropdownMenuItem, { item: item, handle: _this3.handlePropagation, key: 'item-' + index });
          }),
          (!items || !items.length) && _imports.React.createElement(_dropdownMenuItem.DropdownMenuItem, { item: { label: 'No results found', disabled: true }, key: 'disabled' }),
          this.context.multiple && [_imports.React.createElement('li', { className: 'dropdown-item-separator', key: 'submit-separator' }), _imports.React.createElement(
            'li',
            { className: 'dropdown-submit', key: 'submit' },
            _imports.React.createElement(
              'button',
              { className: 'mod-small', onClick: function onClick(event) {
                  return _this3.submit(event);
                } },
              'OK'
            )
          )]
        );
      }
    }]);

    return DropdownMenu;
  }(_imports.Component);

  Object.defineProperty(DropdownMenu, 'defaultProps', {
    enumerable: true,
    writable: true,
    value: {
      parent: null,
      items: [],
      value: null,
      filterable: false,
      filter: null,
      placeholder: '',
      limit: 10,
      handle: function handle() {}
    }
  });
  Object.defineProperty(DropdownMenu, 'propTypes', {
    enumerable: true,
    writable: true,
    value: {
      parent: _imports.PropTypes.object,
      items: _imports.PropTypes.array,
      filterable: _imports.PropTypes.bool,
      filter: _imports.PropTypes.string,
      placeholder: _imports.PropTypes.string,
      limit: _imports.PropTypes.number
    }
  });
  Object.defineProperty(DropdownMenu, 'contextTypes', {
    enumerable: true,
    writable: true,
    value: {
      multiple: _imports.PropTypes.bool
    }
  });
});