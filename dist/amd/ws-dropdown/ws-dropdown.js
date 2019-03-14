define(['exports', '../imports', './dropdown-menu', './dropdown-input', '../ws-overlay/ws-overlay'], function (exports, _imports, _dropdownMenu, _dropdownInput, _wsOverlay) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WSDropdown = undefined;

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

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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

  function deep(items, getChildren, callback) {
    var levels = [items];
    for (var l = 0; l < levels.length; l++) {
      for (var i = 0; i < levels[l].length; i++) {
        var item = levels[l][i];

        if (callback(item)) {
          return;
        }

        var children = getChildren(item);
        if (children) {
          levels.push(children);
        }
      }
    }
  }

  var WSDropdown = exports.WSDropdown = function (_Component) {
    _inherits(WSDropdown, _Component);

    function WSDropdown(props) {
      _classCallCheck(this, WSDropdown);

      var _this = _possibleConstructorReturn(this, (WSDropdown.__proto__ || Object.getPrototypeOf(WSDropdown)).call(this, props));

      Object.defineProperty(_this, 'onAnyEvent', {
        enumerable: true,
        writable: true,
        value: function value(event) {
          event.stopPropagation();
        }
      });
      Object.defineProperty(_this, 'onTriggerClick', {
        enumerable: true,
        writable: true,
        value: function value(event) {
          event.stopPropagation();
          event.preventDefault();
          if (!_this.props.disabled) {
            _this.overlay.toggle();
          }
        }
      });
      Object.defineProperty(_this, 'onTriggerKeyPress', {
        enumerable: true,
        writable: true,
        value: function value(event) {
          event.stopPropagation();
          event.preventDefault();
          var isEnter = event.key === 'Enter' || event.which === 12;
          var isNotOpen = _wsOverlay.WSOverlay.openOverlay !== _this.overlay;

          if (!_this.props.disabled && isEnter && isNotOpen) {
            _this.overlay.open();
          }
        }
      });
      Object.defineProperty(_this, 'handlePropagation', {
        enumerable: true,
        writable: true,
        value: function value(type, data) {
          if (type === 'change') {
            _this.overlay.close();

            _this.overlay.contentHeight = null;
            _this.setValue(data);
          } else if (type === 'change-height') {
            _this.overlay.setHeight(data);
          }
        }
      });

      _this.state = _this.createState(props);
      return _this;
    }

    _createClass(WSDropdown, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return {
          multiple: this.props.multiple
        };
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.element.addEventListener('click', this.onAnyEvent);
        this.trigger.addEventListener('click', this.onTriggerClick);
        this.trigger.addEventListener('keypress', this.onTriggerKeyPress);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(props) {
        this.setState(this.createState(props));
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.element.removeEventListener('click', this.onAnyEvent);
        this.trigger.removeEventListener('click', this.onTriggerClick);
        this.trigger.removeEventListener('keypress', this.onTriggerKeyPress);
      }
    }, {
      key: 'onOpen',
      value: function onOpen() {
        if (typeof this.dropdownMenu.onOpen === 'function') {
          this.dropdownMenu.onOpen();
        }
      }
    }, {
      key: 'onClose',
      value: function onClose() {
        if (typeof this.dropdownMenu.onClose === 'function') {
          this.dropdownMenu.onClose();
        }
      }
    }, {
      key: 'getTextFromValue',
      value: function getTextFromValue(value) {
        var propsText = (arguments.length <= 1 ? 0 : arguments.length - 1) > 0 ? arguments.length <= 1 ? undefined : arguments[1] : '';
        var text = propsText || (this.state && this.state.text ? this.state.text : '');

        if (this.props.type === 'select') {
          if (Array.isArray(value)) {
            if (value.length) {
              text = value.map(function (item) {
                return item.label || item;
              }).join(', ');
            }
          } else if (value) {
            text = value.label || value;
          }
        }
        return text;
      }
    }, {
      key: 'setValue',
      value: function setValue(value) {
        var _this2 = this;

        this.setState({
          text: this.getTextFromValue(value),
          value: value
        });

        if (this.props.onChange) {
          this.props.onChange(value);
        }

        setTimeout(function () {
          _this2.element.dispatchEvent(new CustomEvent('change', { detail: value, bubbles: true }));
        }, 100);
      }
    }, {
      key: 'createState',
      value: function createState(props) {
        var items = this.enrichItems(props.items);
        var value = props.value;

        if (typeof value === 'string' && props.type !== 'input') {
          deep(items, function (item) {
            return item.children;
          }, function (item) {
            if (item.value === value) {
              value = item;
              return true;
            }
            return false;
          });
        }
        value = this.enrichItems(value, function (val) {
          var item = items.find(function (i) {
            return i.value === val;
          });
          return item ? item.label : val;
        });
        var text = this.getTextFromValue(value, props.text);
        var state = { text: text, value: value, items: items, filter: props.filter };

        deep(state.items, function (item) {
          return item.children;
        }, function (item) {
          var isActive = !!state.value.find(function (val) {
            return val.value === item.value;
          });
          item.selected = isActive;
          item.stored = isActive;
        });
        return state;
      }
    }, {
      key: 'enrichItems',
      value: function enrichItems(items) {
        var _this3 = this;

        var resolveLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (value) {
          return value;
        };

        var itemsToWrap = items;

        if (!Array.isArray(items)) {
          itemsToWrap = items ? [items] : [];
        }
        return itemsToWrap.map(function (item) {
          if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object') {
            return { value: item, label: resolveLabel(item) };
          }
          if (item.children) {
            item.children = _this3.enrichItems(item.children);
          }
          return item;
        });
      }
    }, {
      key: 'renderTrigger',
      value: function renderTrigger() {
        var _this4 = this;

        var icon = void 0;
        if (this.props.icon) {
          icon = _imports.React.createElement('span', { className: 'icon ' + this.props.icon });
        }
        var disabledStyle = this.props.disabled ? ' is-disabled' : '';
        var additionalProperties = {};
        if (this.props.tabIndex) {
          additionalProperties.tabindex = this.props.tabIndex;
        }

        switch (this.props.type) {
          case 'anchor':
            return _imports.React.createElement(
              'a',
              _extends({
                href: '#void',
                className: 'dropdown-trigger ' + disabledStyle,
                ref: function ref(element) {
                  _this4.trigger = element;
                }
              }, additionalProperties),
              icon,
              ' ',
              this.state.text
            );
          case 'button':
            return _imports.React.createElement(
              'button',
              _extends({
                className: 'dropdown-trigger ' + disabledStyle,
                ref: function ref(element) {
                  _this4.trigger = element;
                }
              }, additionalProperties),
              icon,
              ' ',
              this.state.text
            );
          case 'select':
            return _imports.React.createElement(
              'div',
              _extends({
                className: 'dropdown-trigger select-box ' + disabledStyle,
                ref: function ref(element) {
                  _this4.trigger = element;
                }
              }, additionalProperties),
              icon,
              ' ',
              this.state.text || this.props.placeholder
            );
          case 'icon':
          default:
            return _imports.React.createElement(
              'a',
              _extends({
                href: '#void',
                className: 'dropdown-trigger ' + disabledStyle,
                ref: function ref(element) {
                  _this4.trigger = element;
                }
              }, additionalProperties),
              icon
            );
        }
      }
    }, {
      key: 'renderContent',
      value: function renderContent() {
        var _this5 = this;

        if (this.props.inputOnly) {
          return _imports.React.createElement(_dropdownInput.DropdownInput, {
            value: this.state.value[0],
            placeholder: this.props.placeholder,
            handle: this.handlePropagation,
            ref: function ref(element) {
              _this5.dropdownMenu = element;
            }
          });
        }
        return _imports.React.createElement(_dropdownMenu.DropdownMenu, {
          items: this.state.items,
          value: this.state.value,
          limit: this.props.limit,
          filter: this.state.filter,
          filterable: this.props.filterable,
          filtered: this.props.filtered,
          minFilterLength: this.props.minFilterLength,
          placeholder: this.props.placeholder,
          selectAll: this.props.selectAll,
          handle: this.handlePropagation,
          ref: function ref(element) {
            _this5.dropdownMenu = element;
          }
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this6 = this;

        var _props = this.props,
            type = _props.type,
            className = _props.className,
            orientation = _props.orientation,
            width = _props.width;


        var isWide = type === 'select';
        return _imports.React.createElement(
          'div',
          { className: 'dropdown  ' + className, ref: function ref(element) {
              if (element) {
                _this6.element = element;
              }
            } },
          this.renderTrigger(),
          _imports.React.createElement(
            _wsOverlay.WSOverlay,
            {
              width: width || (isWide ? '100%' : ''),
              orientation: orientation,
              onOpen: function onOpen() {
                return _this6.onOpen();
              },
              onClose: function onClose() {
                return _this6.onClose();
              },
              ref: function ref(element) {
                if (element) {
                  _this6.overlay = element;
                }
              }
            },
            this.renderContent()
          )
        );
      }
    }]);

    return WSDropdown;
  }(_imports.Component);

  Object.defineProperty(WSDropdown, 'defaultProps', {
    enumerable: true,
    writable: true,
    value: {
      type: 'anchor',
      text: '',
      icon: '',
      items: [],
      className: '',
      multiple: false,
      inputOnly: false,
      filterable: false,
      filter: '',
      filtered: false,
      minFilterLength: 0,
      limit: 10,
      orientation: 'left',
      placeholder: '',
      width: '',
      value: null,
      onChange: function onChange() {},
      disabled: false,
      selectAll: false,
      tabIndex: undefined
    }
  });
  Object.defineProperty(WSDropdown, 'propTypes', {
    enumerable: true,
    writable: true,
    value: {
      type: _imports.PropTypes.oneOf(['anchor', 'button', 'select', 'icon']),
      text: _imports.PropTypes.string,
      icon: _imports.PropTypes.string,
      items: _imports.PropTypes.array,
      className: _imports.PropTypes.string,
      multiple: _imports.PropTypes.bool,
      inputOnly: _imports.PropTypes.bool,
      filterable: _imports.PropTypes.bool,
      filter: _imports.PropTypes.string,
      filtered: _imports.PropTypes.bool,
      minFilterLength: _imports.PropTypes.number,
      limit: _imports.PropTypes.number,
      orientation: _imports.PropTypes.oneOf(['left', 'right']),
      placeholder: _imports.PropTypes.string,
      width: _imports.PropTypes.string,
      value: _imports.PropTypes.oneOfType([_imports.PropTypes.string, _imports.PropTypes.object, _imports.PropTypes.array]),
      onChange: _imports.PropTypes.func,
      disabled: _imports.PropTypes.bool,
      selectAll: _imports.PropTypes.bool,
      tabIndex: _imports.PropTypes.oneOf(_imports.PropTypes.string, _imports.PropTypes.number)
    }
  });
  Object.defineProperty(WSDropdown, 'childContextTypes', {
    enumerable: true,
    writable: true,
    value: {
      multiple: _imports.PropTypes.bool
    }
  });
});