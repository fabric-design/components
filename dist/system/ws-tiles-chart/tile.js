System.register(['react', '../imports'], function (_export, _context) {
  "use strict";

  var React, Component, PropTypes, _createClass, Tile;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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

  return {
    setters: [function (_react) {
      React = _react.default;
    }, function (_imports) {
      Component = _imports.Component;
      PropTypes = _imports.PropTypes;
    }],
    execute: function () {
      _createClass = function () {
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

      _export('Tile', Tile = function (_Component) {
        _inherits(Tile, _Component);

        function Tile() {
          _classCallCheck(this, Tile);

          return _possibleConstructorReturn(this, (Tile.__proto__ || Object.getPrototypeOf(Tile)).apply(this, arguments));
        }

        _createClass(Tile, [{
          key: 'render',
          value: function render() {
            var _props = this.props,
                config = _props.config,
                size = _props.size;

            var style = {
              backgroundColor: config,
              width: size + 'px',
              height: size + 'px'
            };

            return React.createElement('div', { className: 'tile ' + this.props.tileClass, style: style });
          }
        }]);

        return Tile;
      }(Component));

      _export('Tile', Tile);

      Object.defineProperty(Tile, 'propTypes', {
        enumerable: true,
        writable: true,
        value: {
          identifier: PropTypes.string,
          config: PropTypes.string,
          tileClass: PropTypes.string,
          size: PropTypes.number
        }
      });
      Object.defineProperty(Tile, 'defaultProps', {
        enumerable: true,
        writable: true,
        value: {
          identifier: '',
          config: '',
          tileClass: '',
          size: 25
        }
      });
    }
  };
});