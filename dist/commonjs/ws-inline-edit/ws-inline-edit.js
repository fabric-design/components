'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WSInlineEdit = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imports = require('../imports');

var _typeHandler = require('./types/type-handler');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WSInlineEdit = exports.WSInlineEdit = function (_Component) {
  _inherits(WSInlineEdit, _Component);

  function WSInlineEdit(props) {
    _classCallCheck(this, WSInlineEdit);

    var _this = _possibleConstructorReturn(this, (WSInlineEdit.__proto__ || Object.getPrototypeOf(WSInlineEdit)).call(this, props));

    Object.defineProperty(_this, 'onFocus', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        event.stopPropagation();

        if (!_this.state.isEditing) {
          _this.resizeInput();
          _this.setState({ isEditing: true }, function () {
            _this.input.select();
            _this.input.focus();
          });
        }
      }
    });
    Object.defineProperty(_this, 'onKeyUp', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        event.stopPropagation();
        event.preventDefault();
        var inputValue = event.target.value;

        switch (event.key) {
          case 'Enter':
            _this.submit(inputValue);
            break;
          case 'Escape':
            _this.abort();
            break;
          default:
            _this.resizeInput();
            _this.setState({
              isValid: _this.type.validate(inputValue),
              inputValue: inputValue
            });
        }
      }
    });
    Object.defineProperty(_this, 'onKeyDown', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        event.stopPropagation();

        if (event.key.length === 1) {
          _this.resizeInput(event.key);
        } else {
          _this.resizeInput();
        }
      }
    });
    Object.defineProperty(_this, 'onChange', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        event.stopPropagation();
        _this.submit(event.target.value);
      }
    });
    Object.defineProperty(_this, 'stopPropagation', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        event.stopPropagation();
      }
    });

    _this.state = _this.createState(props);
    return _this;
  }

  _createClass(WSInlineEdit, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.input.addEventListener('focus', this.onFocus);
      this.input.addEventListener('keyup', this.onKeyUp);
      this.input.addEventListener('keydown', this.onKeyDown);
      this.input.addEventListener('change', this.onChange);
      this.resizeInput();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var _this2 = this;

      this.setState(this.createState(props), function () {
        _this2.resizeInput();
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.input.removeEventListener('focus', this.onFocus);
      this.input.removeEventListener('keydown', this.onKeyDown);
      this.input.removeEventListener('keyup', this.onKeyUp);
      this.input.removeEventListener('change', this.onChange);
    }
  }, {
    key: 'createState',
    value: function createState(props) {
      this.type = _typeHandler.TypeHandler.getStrategy(props.type, props.options);
      return {
        isEditing: false,
        isValid: true,
        inputValue: props.value,
        initialValue: (props.value || '').toString()
      };
    }
  }, {
    key: 'abort',
    value: function abort() {
      this.setState({
        isEditing: false,
        isValid: true,
        inputValue: this.state.initialValue
      });
    }
  }, {
    key: 'submit',
    value: function submit(inputValue) {
      var state = { isEditing: false, inputValue: inputValue };

      if (!this.type.validate(inputValue)) {
        return;
      }

      if (inputValue !== this.state.initialValue) {
        state.initialValue = inputValue;

        var eventData = {
          plain: inputValue,
          value: this.type.convert(inputValue)
        };
        this.dispatchEvent('change', eventData);

        if (typeof this.props.onChange === 'function') {
          this.props.onChange(eventData);
        }
      }

      this.setState(state);
    }
  }, {
    key: 'resizeInput',
    value: function resizeInput(additionalChars) {
      if (this.props.look !== 'narrow') {
        return;
      }

      var style = window.getComputedStyle(this.input);
      var calculator = document.createElement('div');
      calculator.style.fontSize = style.fontSize || '16px';
      calculator.style.lineHeight = style.lineHeight || '16px';
      calculator.style.margin = style.margin;
      calculator.style.padding = style.padding;
      calculator.style.visibility = 'hidden';
      calculator.style.position = 'absolute';
      calculator.style.top = '-1000px';
      calculator.innerText = this.input.value + (additionalChars || '');

      document.body.appendChild(calculator);
      this.input.style.width = calculator.clientWidth + 'px';
      document.body.removeChild(calculator);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          isEditing = _state.isEditing,
          isValid = _state.isValid,
          inputValue = _state.inputValue;
      var _props = this.props,
          type = _props.type,
          look = _props.look,
          disabled = _props.disabled;


      var classes = 'ws-inline-edit';
      classes += isEditing ? ' is-editing' : '';
      classes += ' ' + type;
      classes += look === 'narrow' ? ' mod-narrow' : '';
      classes += disabled ? ' is-disabled' : '';

      return _imports.React.createElement(
        'div',
        { className: classes, ref: function ref(element) {
            _this3.element = element;
          } },
        _imports.React.createElement(
          'div',
          { className: 'input-wrapper' },
          _imports.React.createElement('input', {
            type: 'text',
            className: !isValid ? 'is-invalid' : '',
            ref: function ref(element) {
              _this3.input = element;
            },
            value: inputValue
          }),
          !isValid && _imports.React.createElement('span', { className: 'icon icon16 icon-cross' })
        )
      );
    }
  }]);

  return WSInlineEdit;
}(_imports.Component);

Object.defineProperty(WSInlineEdit, 'defaultProps', {
  enumerable: true,
  writable: true,
  value: {
    value: '',
    options: {},
    type: 'text',
    look: 'default',
    disabled: false,
    onChange: function onChange() {}
  }
});
Object.defineProperty(WSInlineEdit, 'propTypes', {
  enumerable: true,
  writable: true,
  value: {
    value: _imports.PropTypes.string,
    options: _imports.PropTypes.object,
    type: _imports.PropTypes.oneOf(['text', 'number', 'price']),
    look: _imports.PropTypes.oneOf(['narrow', 'default']),
    disabled: _imports.PropTypes.bool,
    onChange: _imports.PropTypes.func
  }
});