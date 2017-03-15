define(['exports', '../imports', './ws-dropdown'], function (exports, _imports, _wsDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WSDropdownInput = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var WSDropdownInput = exports.WSDropdownInput = function (_WSDropdown) {
    _inherits(WSDropdownInput, _WSDropdown);

    function WSDropdownInput() {
      _classCallCheck(this, WSDropdownInput);

      return _possibleConstructorReturn(this, (WSDropdownInput.__proto__ || Object.getPrototypeOf(WSDropdownInput)).apply(this, arguments));
    }

    _createClass(WSDropdownInput, [{
      key: 'onKeyUp',
      value: function onKeyUp(event) {
        event.stopPropagation();

        if (event.keyCode === 13) {
          this.setValue(event.target.value);
        }
      }
    }, {
      key: 'renderMenu',
      value: function renderMenu() {
        var _this2 = this;

        return _imports.React.createElement(
          'ul',
          { className: 'dropdown-menu dropdown-root-menu' },
          _imports.React.createElement(
            'li',
            { className: 'dropdown-input' },
            _imports.React.createElement('input', {
              type: 'text',
              defaultValue: this.state.value,
              onKeyUp: function onKeyUp(event) {
                return _this2.onKeyUp(event);
              },
              onChange: function onChange(event) {
                return event.stopPropagation();
              }
            })
          )
        );
      }
    }]);

    return WSDropdownInput;
  }(_wsDropdown.WSDropdown);

  Object.defineProperty(WSDropdownInput, 'defaultProps', {
    enumerable: true,
    writable: true,
    value: {
      type: 'anchor',
      text: '',
      icon: '',
      orientation: 'left',
      value: null
    }
  });
  Object.defineProperty(WSDropdownInput, 'propTypes', {
    enumerable: true,
    writable: true,
    value: {
      type: _imports.React.PropTypes.oneOf(['anchor', 'button', 'select']),
      text: _imports.React.PropTypes.string,
      icon: _imports.React.PropTypes.string,
      orientation: _imports.React.PropTypes.oneOf(['left', 'right'])
    }
  });
});