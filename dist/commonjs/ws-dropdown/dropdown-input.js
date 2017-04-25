'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownInput = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imports = require('../imports');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KEY_ENTER = 13;

var DropdownInput = exports.DropdownInput = function (_Component) {
  _inherits(DropdownInput, _Component);

  function DropdownInput(props) {
    _classCallCheck(this, DropdownInput);

    var _this = _possibleConstructorReturn(this, (DropdownInput.__proto__ || Object.getPrototypeOf(DropdownInput)).call(this, props));

    _this.state = {
      value: props.value
    };
    return _this;
  }

  _createClass(DropdownInput, [{
    key: 'onKeyDown',
    value: function onKeyDown(event) {
      if (event.which === KEY_ENTER) {
        this.onSubmit();
        event.preventDefault();
        return false;
      }
      return true;
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      this.state.value = event.target.value;
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit() {
      this.props.handle('change', this.state.value);
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this.menuContainer.clientHeight;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _imports.React.createElement(
        'ul',
        { className: 'dropdown-menu dropdown-root-menu', ref: function ref(element) {
            _this2.menuContainer = element;
          } },
        _imports.React.createElement(
          'li',
          { className: 'dropdown-input', key: 'filter' },
          _imports.React.createElement('input', {
            type: 'text',
            defaultValue: this.state.value,
            placeholder: this.props.placeholder,
            onKeyDown: function onKeyDown(event) {
              return _this2.onKeyDown(event);
            },
            onChange: function onChange(event) {
              return _this2.onChange(event);
            }
          })
        ),
        _imports.React.createElement(
          'li',
          { className: 'dropdown-submit', key: 'submit' },
          _imports.React.createElement(
            'button',
            { className: 'mod-small', onClick: function onClick() {
                return _this2.onSubmit();
              } },
            'OK'
          )
        )
      );
    }
  }]);

  return DropdownInput;
}(_imports.Component);

Object.defineProperty(DropdownInput, 'defaultProps', {
  enumerable: true,
  writable: true,
  value: {
    value: null,
    placeholder: '',
    handle: function handle() {}
  }
});
Object.defineProperty(DropdownInput, 'propTypes', {
  enumerable: true,
  writable: true,
  value: {
    value: _imports.React.PropTypes.string,
    placeholder: _imports.React.PropTypes.string,
    handle: _imports.React.PropTypes.func
  }
});