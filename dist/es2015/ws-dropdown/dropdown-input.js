var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { React, Component, PropTypes } from '../imports';

var KEY_ENTER = 13;

export var DropdownInput = function (_Component) {
  _inherits(DropdownInput, _Component);

  function DropdownInput(props) {
    _classCallCheck(this, DropdownInput);

    var _this = _possibleConstructorReturn(this, (DropdownInput.__proto__ || Object.getPrototypeOf(DropdownInput)).call(this, props));

    Object.defineProperty(_this, 'onKeyDown', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (event.which === KEY_ENTER) {
          _this.onChange(event);
          _this.onSubmit();
          event.preventDefault();
          return false;
        }
        return true;
      }
    });
    Object.defineProperty(_this, 'onChange', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        _this.setState({ value: event.target.value });
      }
    });
    Object.defineProperty(_this, 'onSubmit', {
      enumerable: true,
      writable: true,
      value: function value() {
        _this.props.handle('change', _this.state.value);
      }
    });

    _this.state = {
      value: props.value && props.value.value
    };
    return _this;
  }

  _createClass(DropdownInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.input.addEventListener('change', function (event) {
        return event.stopPropagation();
      });
      this.input.addEventListener('keydown', this.onKeyDown);
      this.input.addEventListener('blur', this.onChange);
      this.button.addEventListener('click', this.onSubmit);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.input.removeEventListener('change', function (event) {
        return event.stopPropagation();
      });
      this.input.removeEventListener('keydown', this.onKeyDown);
      this.input.removeEventListener('blur', this.onChange);
      this.button.removeEventListener('click', this.onSubmit);
    }
  }, {
    key: 'onOpen',
    value: function onOpen() {
      if (this.input) {
        this.input.focus();
      }
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

      return React.createElement(
        'ul',
        { className: 'dropdown-menu dropdown-root-menu', ref: function ref(element) {
            _this2.menuContainer = element;
          } },
        React.createElement(
          'li',
          { className: 'dropdown-input', key: 'filter' },
          React.createElement('input', {
            type: 'text',
            defaultValue: this.state.value,
            placeholder: this.props.placeholder,
            ref: function ref(element) {
              _this2.input = element;
            }
          })
        ),
        React.createElement(
          'li',
          { className: 'dropdown-submit', key: 'submit' },
          React.createElement(
            'button',
            { className: 'mod-small', ref: function ref(element) {
                _this2.button = element;
              } },
            'OK'
          )
        )
      );
    }
  }]);

  return DropdownInput;
}(Component);
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
    value: PropTypes.string,
    placeholder: PropTypes.string,
    handle: PropTypes.func
  }
});