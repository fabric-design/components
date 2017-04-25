'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WSDropdown = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imports = require('../imports');

var _dropdownMenu = require('./dropdown-menu');

var _dropdownInput = require('./dropdown-input');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ANIMATION_END_EVENTS = ['oAnimationEnd', 'MSAnimationEnd', 'animationend'];

var WSDropdown = exports.WSDropdown = function (_Component) {
  _inherits(WSDropdown, _Component);

  function WSDropdown(props) {
    _classCallCheck(this, WSDropdown);

    var _this = _possibleConstructorReturn(this, (WSDropdown.__proto__ || Object.getPrototypeOf(WSDropdown)).call(this, props));

    Object.defineProperty(_this, 'handlePropagation', {
      enumerable: true,
      writable: true,
      value: function value(type, data) {
        if (type === 'change') {
          _this.close();
          _this.setValue(data);
          _this.element.dispatchEvent(new CustomEvent('change', { detail: data }));
        } else if (type === 'change-size') {
          _this.adjustSize(data);
        }
      }
    });

    _this.opened = false;
    _this.state = {
      text: props.text || props.value,
      value: _this.enrichItems(props.value),
      items: _this.enrichItems(props.items)
    };

    _this.state.items.forEach(function (item) {
      if (_this.state.value.find(function (val) {
        return val.label === item.label;
      })) {
        item.selected = true;
        item.stored = true;
      }
    });
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
      window.addEventListener('click', this.onDocumentClick.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('click', this.onDocumentClick.bind(this));
    }
  }, {
    key: 'onDocumentClick',
    value: function onDocumentClick(event) {
      var element = event.target;
      while (element && this.element !== element) {
        element = element.parentNode;
      }

      if (!element) {
        this.close();
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      var text = this.state.text;

      if (this.props.type === 'select') {
        if (Array.isArray(value)) {
          text = value.map(function (item) {
            return item.label;
          }).join(', ');
        } else {
          text = value.label || value;
        }
      }
      this.setState({ text: text, value: value });

      this.element.dispatchEvent(new CustomEvent('change', { detail: value, bubbles: true }));
    }
  }, {
    key: 'enrichItems',
    value: function enrichItems(items) {
      var _this2 = this;

      var itemsToWrap = items;

      if (!Array.isArray(items)) {
        if (this.props.inputOnly) {
          return items;
        }

        itemsToWrap = items ? [items] : [];
      }
      return itemsToWrap.map(function (item) {
        var enriched = (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' ? item : { label: item };
        if (enriched.children) {
          enriched.children = _this2.enrichItems(enriched.children);
        }
        return enriched;
      });
    }
  }, {
    key: 'open',
    value: function open() {
      if (this.opened) {
        return;
      }
      this.opened = true;
      this.dropdownContainer.style.height = 0;
      this.dropdownContainer.classList.add('mod-open');
      this.adjustSize(this.dropdownMenu.getHeight());
    }
  }, {
    key: 'close',
    value: function close() {
      var _this3 = this;

      if (!this.opened) {
        return;
      }
      this.opened = false;
      this.animateElement(this.dropdownContainer, 'animate-close', function (container) {
        container.classList.remove('mod-open');

        if (_this3.props.multiple) {
          _this3.dropdownMenu.clearSelections();
        }
      });
    }
  }, {
    key: 'adjustSize',
    value: function adjustSize(newSize) {
      this.dropdownContainer.style.height = newSize + 'px';
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
    key: 'renderTrigger',
    value: function renderTrigger() {
      var _this4 = this;

      var icon = void 0;
      if (this.props.icon) {
        icon = _imports.React.createElement('span', { className: 'icon ' + this.props.icon });
      }
      switch (this.props.type) {
        case 'anchor':
          return _imports.React.createElement(
            'a',
            { onClick: function onClick() {
                return _this4.open();
              } },
            icon,
            ' ',
            this.state.text
          );
        case 'button':
          return _imports.React.createElement(
            'button',
            { onClick: function onClick() {
                return _this4.open();
              } },
            icon,
            ' ',
            this.state.text
          );
        case 'select':
          return _imports.React.createElement(
            'div',
            { className: 'select-box', onClick: function onClick() {
                return _this4.open();
              } },
            icon,
            ' ',
            this.state.text
          );
        case 'icon':
        default:
          return _imports.React.createElement(
            'a',
            { onClick: function onClick() {
                return _this4.open();
              } },
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
          value: this.state.value,
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
        filterable: this.props.filterable,
        filter: this.props.filter,
        placeholder: this.props.placeholder,
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

      return _imports.React.createElement(
        'div',
        { className: 'dropdown', ref: function ref(element) {
            if (element) {
              _this6.element = element;
            }
          } },
        this.renderTrigger(),
        _imports.React.createElement(
          'div',
          {
            className: 'dropdown-container ' + this.props.orientation,
            ref: function ref(element) {
              if (element) {
                _this6.dropdownContainer = element;
              }
            }
          },
          this.renderContent()
        ),
        _imports.React.createElement('div', { className: 'dropdown-arrow' })
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
    multiple: false,
    inputOnly: false,
    filterable: false,
    filter: '',
    limit: 10,
    orientation: 'left',
    placeholder: '',
    value: null
  }
});
Object.defineProperty(WSDropdown, 'propTypes', {
  enumerable: true,
  writable: true,
  value: {
    type: _imports.React.PropTypes.oneOf(['anchor', 'button', 'select', 'icon']),
    text: _imports.React.PropTypes.string,
    icon: _imports.React.PropTypes.string,
    items: _imports.React.PropTypes.array,
    multiple: _imports.React.PropTypes.bool,
    filterable: _imports.React.PropTypes.bool,
    inputOnly: _imports.React.PropTypes.bool,
    filter: _imports.React.PropTypes.string,
    limit: _imports.React.PropTypes.number,
    orientation: _imports.React.PropTypes.oneOf(['left', 'right']),
    placeholder: _imports.React.PropTypes.string
  }
});
Object.defineProperty(WSDropdown, 'childContextTypes', {
  enumerable: true,
  writable: true,
  value: {
    multiple: _imports.React.PropTypes.bool
  }
});