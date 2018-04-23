'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WSTabMenu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imports = require('../imports');

require('./ws-tab-menu.scss');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WSTabMenu = exports.WSTabMenu = function (_Component) {
  _inherits(WSTabMenu, _Component);

  function WSTabMenu(props) {
    _classCallCheck(this, WSTabMenu);

    var _this = _possibleConstructorReturn(this, (WSTabMenu.__proto__ || Object.getPrototypeOf(WSTabMenu)).call(this, props));

    Object.defineProperty(_this, 'onClick', {
      enumerable: true,
      writable: true,
      value: function value(event) {
        event.stopPropagation();
        var selectedIndex = _this.menuItems.indexOf(event.currentTarget);
        var selectedItem = _this.props.items[selectedIndex];

        if (selectedItem.disabled) {
          return;
        }
        if (selectedItem.value === _this.state.value) {
          return;
        }

        _this.setState({ value: selectedItem.value });

        _this.animateDash(event.currentTarget);

        _this.dispatchEvent('change', selectedItem.value);
        if (typeof _this.props.onChange === 'function') {
          _this.props.onChange(selectedItem.value);
        }
      }
    });


    _this.state = _this.createState(props);
    _this.menuItems = [];
    return _this;
  }

  _createClass(WSTabMenu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.configureMenuItems();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var _this2 = this;

      this.setState(this.createState(props));

      var index = this.props.items.findIndex(function (item) {
        return item.value === _this2.state.value;
      }) || 0;
      this.animateDash(this.menuItems[index]);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.configureMenuItems();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      this.menuItems.forEach(function (element) {
        return element.removeEventListener('click', _this3.onClick);
      });
    }
  }, {
    key: 'configureMenuItems',
    value: function configureMenuItems() {
      var _this4 = this;

      this.menuItems.forEach(function (element, index) {
        var item = _this4.props.items[index];

        if (item.value === _this4.state.value) {
          _this4.animateDash(element);
        }
        element.addEventListener('click', _this4.onClick);
      });
    }
  }, {
    key: 'animateDash',
    value: function animateDash(newMenuItem) {
      this.dash.style.left = newMenuItem.offsetLeft + 'px';
      this.dash.style.right = newMenuItem.parentNode.offsetWidth - newMenuItem.offsetLeft - newMenuItem.offsetWidth + 'px';
    }
  }, {
    key: 'createState',
    value: function createState(props) {
      if (!props.items.length) {
        throw new Error('WSTabMenu has no items specified: ' + JSON.stringify(props));
      }
      if (props.value) {
        return { value: props.value };
      }
      return { value: props.items[0].value };
    }
  }, {
    key: 'renderMenuItem',
    value: function renderMenuItem(item, index) {
      var _this5 = this;

      var className = 'tab-item ' + (item.className || '');
      if (item.value === this.state.value) {
        className += ' is-active';
      } else if (item.disabled) {
        className += ' is-disabled';
      }

      return _imports.React.createElement(
        'li',
        { className: className, ref: function ref(element) {
            _this5.menuItems[index] = element;
          }, key: 'item-' + index },
        _imports.React.createElement(
          'span',
          { className: 'text' },
          item.label || item.value
        ),
        item.badge !== undefined && _imports.React.createElement(
          'span',
          { className: 'badge mod-gray' },
          item.badge
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      return _imports.React.createElement(
        'div',
        { className: 'tab-menu-container', ref: function ref(element) {
            _this6.element = element;
          } },
        _imports.React.createElement(
          'ul',
          { className: 'tab-menu' },
          this.props.items.map(function (item, index) {
            return _this6.renderMenuItem(item, index);
          })
        ),
        _imports.React.createElement(
          'div',
          { className: 'dash-bar' },
          _imports.React.createElement('div', { className: 'dash', ref: function ref(element) {
              _this6.dash = element;
            } })
        )
      );
    }
  }]);

  return WSTabMenu;
}(_imports.Component);

Object.defineProperty(WSTabMenu, 'propTypes', {
  enumerable: true,
  writable: true,
  value: {
    items: _imports.PropTypes.array,
    value: _imports.PropTypes.any,
    onChange: _imports.PropTypes.func
  }
});
Object.defineProperty(WSTabMenu, 'defaultProps', {
  enumerable: true,
  writable: true,
  value: {
    items: [],
    value: null,
    onChange: null
  }
});