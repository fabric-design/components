define(['exports', '../imports'], function (exports, _imports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Tile = undefined;

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

  var Tile = exports.Tile = function (_Component) {
    _inherits(Tile, _Component);

    function Tile() {
      _classCallCheck(this, Tile);

      return _possibleConstructorReturn(this, (Tile.__proto__ || Object.getPrototypeOf(Tile)).apply(this, arguments));
    }

    _createClass(Tile, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            identifier = _props.identifier,
            config = _props.config,
            size = _props.size,
            groupName = _props.groupName,
            className = _props.className;

        var style = {
          backgroundColor: config,
          width: size + 'px',
          height: size + 'px'
        };

        return _imports.React.createElement('div', {
          className: 'tile ' + groupName + ' ' + className,
          style: style,
          onClick: function onClick() {
            return _this2.props.onClick(groupName, identifier);
          },
          onMouseEnter: this.props.onMouseEnter,
          onMouseLeave: this.props.onMouseLeave
        });
      }
    }]);

    return Tile;
  }(_imports.Component);

  Object.defineProperty(Tile, 'propTypes', {
    enumerable: true,
    writable: true,
    value: {
      identifier: _imports.PropTypes.string,
      config: _imports.PropTypes.string,
      groupName: _imports.PropTypes.string,
      size: _imports.PropTypes.number,
      onClick: _imports.PropTypes.func,
      onMouseEnter: _imports.PropTypes.func.isRequired,
      onMouseLeave: _imports.PropTypes.func.isRequired
    }
  });
  Object.defineProperty(Tile, 'defaultProps', {
    enumerable: true,
    writable: true,
    value: {
      identifier: '',
      config: '',
      groupName: '',
      size: 25,
      onClick: function onClick() {}
    }
  });
});