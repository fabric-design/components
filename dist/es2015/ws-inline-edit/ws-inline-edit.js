var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { React, Component, PropTypes } from '../imports';

import './ws-inline-edit.scss';

export var WSInlineEdit = function (_Component) {
  _inherits(WSInlineEdit, _Component);

  function WSInlineEdit(props) {
    _classCallCheck(this, WSInlineEdit);

    var _this = _possibleConstructorReturn(this, (WSInlineEdit.__proto__ || Object.getPrototypeOf(WSInlineEdit)).call(this, props));

    _this.state = {
      isEditing: false,
      text: props.text
    };
    return _this;
  }

  _createClass(WSInlineEdit, [{
    key: 'editElement',
    value: function editElement() {
      var _this2 = this;

      if (!this.state.isEditing) {
        this.setState({ isEditing: true }, function () {
          _this2.editEl.focus();
        });
      }
    }
  }, {
    key: 'keyAction',
    value: function keyAction(e) {
      if (e.keyCode === 13) {
        this.setState({
          text: e.target.value,
          isEditing: false
        });
      } else if (e.keyCode === 27) {
        this.setState({ isEditing: false });
      }
    }
  }, {
    key: 'blurAction',
    value: function blurAction(e) {
      this.setState({
        text: e.target.value,
        isEditing: false
      });
      this.updating(e.target.value);
    }
  }, {
    key: 'updating',
    value: function updating(text) {
      if (text !== this.props.text) {
        this.props.onUpdate(text);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.createElement(
        'div',
        { className: 'ws-inline-edit', onClick: function onClick() {
            return _this3.editElement();
          } },
        React.createElement('input', {
          type: 'text',
          className: 'inlineInput',
          disabled: !this.state.isEditing ? 'disabled' : '',
          onBlur: function onBlur(e) {
            return _this3.blurAction(e);
          },
          onKeyDown: function onKeyDown(e) {
            return _this3.keyAction(e);
          },
          defaultValue: this.state.text,
          ref: function ref(el) {
            _this3.editEl = el;
          }
        })
      );
    }
  }]);

  return WSInlineEdit;
}(Component);
Object.defineProperty(WSInlineEdit, 'propTypes', {
  enumerable: true,
  writable: true,
  value: {
    text: PropTypes.string,
    onUpdate: PropTypes.func
  }
});
Object.defineProperty(WSInlineEdit, 'defaultProps', {
  enumerable: true,
  writable: true,
  value: {
    text: '',
    onUpdate: function onUpdate() {}
  }
});