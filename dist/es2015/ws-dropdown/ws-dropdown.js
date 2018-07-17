var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { React, Component, PropTypes } from '../imports';
import { DropdownMenu } from './dropdown-menu';
import { DropdownInput } from './dropdown-input';
import { WSOverlay } from '../ws-overlay/ws-overlay';

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

export var WSDropdown = function (_Component) {
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
        if (!_this.props.disabled) {
          _this.overlay.toggle();
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
        icon = React.createElement('span', { className: 'icon ' + this.props.icon });
      }
      var disabledStyle = this.props.disabled ? ' is-disabled' : '';
      switch (this.props.type) {
        case 'anchor':
          return React.createElement(
            'a',
            {
              href: '#void',
              className: 'dropdown-trigger ' + disabledStyle,
              ref: function ref(element) {
                _this4.trigger = element;
              }
            },
            icon,
            ' ',
            this.state.text
          );
        case 'button':
          return React.createElement(
            'button',
            {
              className: 'dropdown-trigger ' + disabledStyle,
              ref: function ref(element) {
                _this4.trigger = element;
              }
            },
            icon,
            ' ',
            this.state.text
          );
        case 'select':
          return React.createElement(
            'div',
            {
              className: 'dropdown-trigger select-box ' + disabledStyle,
              ref: function ref(element) {
                _this4.trigger = element;
              }
            },
            icon,
            ' ',
            this.state.text || this.props.placeholder
          );
        case 'icon':
        default:
          return React.createElement(
            'a',
            {
              href: '#void',
              className: 'dropdown-trigger ' + disabledStyle,
              ref: function ref(element) {
                _this4.trigger = element;
              }
            },
            icon
          );
      }
    }
  }, {
    key: 'renderContent',
    value: function renderContent() {
      var _this5 = this;

      if (this.props.inputOnly) {
        return React.createElement(DropdownInput, {
          value: this.state.value[0],
          placeholder: this.props.placeholder,
          handle: this.handlePropagation,
          ref: function ref(element) {
            _this5.dropdownMenu = element;
          }
        });
      }
      return React.createElement(DropdownMenu, {
        items: this.state.items,
        value: this.state.value,
        limit: this.props.limit,
        filter: this.state.filter,
        filterable: this.props.filterable,
        filtered: this.props.filtered,
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
      return React.createElement(
        'div',
        { className: 'dropdown  ' + className, ref: function ref(element) {
            if (element) {
              _this6.element = element;
            }
          } },
        this.renderTrigger(),
        React.createElement(
          WSOverlay,
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
}(Component);
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
    limit: 10,
    orientation: 'left',
    placeholder: '',
    width: '',
    value: null,
    onChange: function onChange() {},
    disabled: false,
    selectAll: false
  }
});
Object.defineProperty(WSDropdown, 'propTypes', {
  enumerable: true,
  writable: true,
  value: {
    type: PropTypes.oneOf(['anchor', 'button', 'select', 'icon']),
    text: PropTypes.string,
    icon: PropTypes.string,
    items: PropTypes.array,
    className: PropTypes.string,
    multiple: PropTypes.bool,
    inputOnly: PropTypes.bool,
    filterable: PropTypes.bool,
    filter: PropTypes.string,
    filtered: PropTypes.bool,
    limit: PropTypes.number,
    orientation: PropTypes.oneOf(['left', 'right']),
    placeholder: PropTypes.string,
    width: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    selectAll: PropTypes.bool
  }
});
Object.defineProperty(WSDropdown, 'childContextTypes', {
  enumerable: true,
  writable: true,
  value: {
    multiple: PropTypes.bool
  }
});