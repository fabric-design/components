'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownMenuItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imports = require('../imports');

var _dropdownMenu = require('./dropdown-menu');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownMenuItem = exports.DropdownMenuItem = function (_Component) {
  _inherits(DropdownMenuItem, _Component);

  function DropdownMenuItem(props, context) {
    _classCallCheck(this, DropdownMenuItem);

    var _this = _possibleConstructorReturn(this, (DropdownMenuItem.__proto__ || Object.getPrototypeOf(DropdownMenuItem)).call(this, props, context));

    Object.defineProperty(_this, 'onClick', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        event.stopPropagation();

        if (_this.state.disabled) {
          return;
        }

        if (_this.props.isParent) {
          _this.props.handle('go-back');
        } else if (_this.state.children && _this.state.children.length) {
          _this.props.handle('show-child', _this.menu);
        } else {
          if (!_this.context.multiple) {
            if (_this.state.selected) {
              _this.props.handle('change', null);
            } else {
              _this.state.selected = true;
              _this.state.stored = true;
              _this.props.handle('change', _this.state);
            }
          } else {
            _this.state.selected = !_this.state.selected;
          }

          _this.forceUpdate();
        }
      }
    });
    Object.defineProperty(_this, 'handlePropagation', {
      enumerable: true,
      writable: true,
      value: function value(type, data) {
        _this.props.handle(type, data);
      }
    });

    _this.state = props.item;
    _this.menu = null;
    return _this;
  }

  _createClass(DropdownMenuItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.dropdownItem.addEventListener('click', this.onClick);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.state = props.item;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.dropdownItem.removeEventListener('click', this.onClick);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var anchorClass = 'text';
      anchorClass += this.state.selected ? ' is-active' : '';
      anchorClass += this.state.focused ? ' is-focused' : '';
      anchorClass += this.state.disabled ? ' is-disabled' : '';
      anchorClass += ' ' + (this.state.className || '');
      var itemClass = 'dropdown-item';
      itemClass += this.props.isParent ? ' dropdown-parent-item' : '';
      itemClass += this.state.children && !this.props.isParent ? ' has-children' : '';

      return _imports.React.createElement(
        'li',
        {
          className: itemClass,
          ref: function ref(element) {
            _this2.dropdownItem = element;
          }
        },
        _imports.React.createElement(
          'a',
          { className: anchorClass, href: this.state.href, title: this.state.title || this.state.label },
          (this.props.icon || this.state.icon) && _imports.React.createElement('i', { className: 'icon ' + (this.props.icon || this.state.icon) }),
          this.state.label
        ),
        !this.props.isParent && this.state.children && _imports.React.createElement(_dropdownMenu.DropdownMenu, {
          items: this.state.children,
          parent: this.state,
          ref: function ref(element) {
            _this2.menu = element;
          },
          handle: this.handlePropagation
        })
      );
    }
  }]);

  return DropdownMenuItem;
}(_imports.Component);

Object.defineProperty(DropdownMenuItem, 'defaultProps', {
  enumerable: true,
  writable: true,
  value: {
    item: null,
    icon: null,
    isParent: false,
    handle: function handle() {}
  }
});
Object.defineProperty(DropdownMenuItem, 'propTypes', {
  enumerable: true,
  writable: true,
  value: {
    item: _imports.PropTypes.object,
    icon: _imports.PropTypes.string,
    isParent: _imports.PropTypes.bool,
    handle: _imports.PropTypes.func
  }
});
Object.defineProperty(DropdownMenuItem, 'contextTypes', {
  enumerable: true,
  writable: true,
  value: {
    multiple: _imports.PropTypes.bool
  }
});