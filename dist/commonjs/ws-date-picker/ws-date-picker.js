'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WSDatePicker = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imports = require('../imports');

var _flatpickr = require('./flatpickr');

var _flatpickr2 = _interopRequireDefault(_flatpickr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WSDatePicker = exports.WSDatePicker = function (_Component) {
  _inherits(WSDatePicker, _Component);

  function WSDatePicker(props) {
    _classCallCheck(this, WSDatePicker);

    var _this = _possibleConstructorReturn(this, (WSDatePicker.__proto__ || Object.getPrototypeOf(WSDatePicker)).call(this, props));

    _this.element = null;
    _this.input = null;
    _this.flatpickr = null;
    _this.state = {
      value: props.value
    };
    return _this;
  }

  _createClass(WSDatePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.flatpickr = new _flatpickr2.default(this.input, _extends({
        weekNumbers: true,
        defaultDate: this.state.value,
        dateFormat: this.props.format
      }, this.props.options, {
        onChange: this.onChange.bind(this)
      }));

      this.input.addEventListener('change', function (event) {
        return event.stopPropagation();
      }, true);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var _this2 = this;

      if (props.value) {
        this.flatpickr.setDate(props.value, false, this.props.format);
      }

      Object.keys(props.options || {}).forEach(function (key) {
        _this2.flatpickr.set(key, props.options[key]);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.flatpickr.destroy();
      this.input.removeEventListener('change', function (event) {
        return event.stopPropagation();
      }, true);
    }
  }, {
    key: 'onChange',
    value: function onChange(_ref, value) {
      var _ref2 = _slicedToArray(_ref, 1),
          selectedDate = _ref2[0];

      this.setState({ value: value });
      this.element.dispatchEvent(new CustomEvent('change', { detail: selectedDate, bubbles: true }));

      if (this.props.onChange) {
        this.props.onChange(selectedDate);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _imports.React.createElement(
        'div',
        {
          className: 'ws-date-picker ' + (this.props.iconOnly ? 'icon-only' : 'with-input'),
          ref: function ref(element) {
            _this3.element = element;
          }
        },
        !this.props.iconOnly && [_imports.React.createElement('input', {
          defaultValue: this.state.value,
          placeholder: this.props.placeholder,
          ref: function ref(element) {
            _this3.input = element;
          },
          key: 'input'
        }), _imports.React.createElement('span', { className: 'icon icon-calendar icon16', key: 'icon' })],
        this.props.iconOnly && _imports.React.createElement('span', {
          className: 'icon icon-calendar icon16',
          ref: function ref(element) {
            _this3.input = element;
          },
          onClick: function onClick(event) {
            return _this3.flatpickr.open(event);
          }
        })
      );
    }
  }]);

  return WSDatePicker;
}(_imports.Component);

Object.defineProperty(WSDatePicker, 'defaultProps', {
  enumerable: true,
  writable: true,
  value: {
    value: null,
    format: 'd.m.Y',
    placeholder: '',
    iconOnly: false,
    options: {},
    onChange: function onChange() {}
  }
});
Object.defineProperty(WSDatePicker, 'propTypes', {
  enumerable: true,
  writable: true,
  value: {
    value: _imports.PropTypes.oneOfType([_imports.PropTypes.string, _imports.PropTypes.number]),
    format: _imports.PropTypes.string,
    placeholder: _imports.PropTypes.string,
    iconOnly: _imports.PropTypes.bool,
    options: _imports.PropTypes.object,
    onChange: _imports.PropTypes.func
  }
});