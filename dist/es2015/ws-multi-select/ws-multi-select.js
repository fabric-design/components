var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { React } from '../imports';
import { WSDropdown } from '../ws-dropdown/ws-dropdown';

export var WSMultiSelect = function (_WSDropdown) {
  _inherits(WSMultiSelect, _WSDropdown);

  function WSMultiSelect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, WSMultiSelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WSMultiSelect.__proto__ || Object.getPrototypeOf(WSMultiSelect)).call.apply(_ref, [this].concat(args))), _this), Object.defineProperty(_this, 'onClickIcon', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        event.stopPropagation();
        _this.input.focus();
      }
    }), Object.defineProperty(_this, 'onKeyUp', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        event.stopPropagation();

        _this.setState({ filter: event.target.value });
      }
    }), Object.defineProperty(_this, 'onFocus', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        event.stopPropagation();
        _this.overlay.open();
      }
    }), Object.defineProperty(_this, 'onBlur', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        event.stopPropagation();

        _this.overlay.close();
      }
    }), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(WSMultiSelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.select = this;
      this.icon.addEventListener('click', this.onClickIcon);
      this.input.addEventListener('keyup', this.onKeyUp);
      this.input.addEventListener('focus', this.onFocus);
      this.input.addEventListener('blur', this.onBlur);
      this.input.addEventListener('change', this.stopPropagation);
      this.element.addEventListener('click', this.stopPropagation);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.icon.removeEventListener('click', this.onClickIcon);
      this.input.removeEventListener('keyup', this.onKeyUp);
      this.input.removeEventListener('focus', this.onFocus);
      this.input.removeEventListener('blur', this.onBlur);
      this.input.removeEventListener('change', this.stopPropagation);
      this.element.removeEventListener('stopPropagation', this.stopPropagation);
    }
  }, {
    key: 'stopPropagation',
    value: function stopPropagation(event) {
      event.stopPropagation();
    }
  }, {
    key: 'setValue',
    value: function setValue(item) {
      var value = [].concat(_toConsumableArray(this.state.value), [item]);

      this.setState({ filter: '' });

      this.overlay.contentHeight = null;

      _get(WSMultiSelect.prototype.__proto__ || Object.getPrototypeOf(WSMultiSelect.prototype), 'setValue', this).call(this, value);
    }
  }, {
    key: 'removeItem',
    value: function removeItem(item) {
      item.selected = false;
      item.stored = false;
      var value = this.state.value.filter(function (i) {
        return i !== item;
      });
      _get(WSMultiSelect.prototype.__proto__ || Object.getPrototypeOf(WSMultiSelect.prototype), 'setValue', this).call(this, value);
    }
  }, {
    key: 'renderTrigger',
    value: function renderTrigger() {
      var _this2 = this;

      return React.createElement(
        'div',
        { className: 'input-wrapper' },
        React.createElement('input', {
          type: 'text',
          placeholder: this.props.placeholder,
          value: this.state.filter,
          ref: function ref(element) {
            _this2.input = element;
          }
        }),
        React.createElement('span', { className: 'icon icon16 icon-magnifiying-glass', ref: function ref(element) {
            _this2.icon = element;
          } })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var jsx = _get(WSMultiSelect.prototype.__proto__ || Object.getPrototypeOf(WSMultiSelect.prototype), 'render', this).call(this);
      return React.createElement(
        'div',
        { className: 'ws-multi-select' },
        jsx,
        React.createElement(
          'ul',
          { className: 'selected-items' },
          this.state.value.map(function (item, index) {
            return React.createElement(
              'li',
              { key: 'selected-item-' + index, title: item.label },
              React.createElement(
                'span',
                { className: 'text' },
                item.label
              ),
              React.createElement('span', { className: 'icon icon16 icon-cross', onClick: function onClick() {
                  return _this3.removeItem(item);
                } })
            );
          })
        )
      );
    }
  }]);

  return WSMultiSelect;
}(WSDropdown);
Object.defineProperty(WSMultiSelect, 'defaultProps', {
  enumerable: true,
  writable: true,
  value: _extends({}, WSDropdown.defaultProps, {
    filtered: true
  })
});