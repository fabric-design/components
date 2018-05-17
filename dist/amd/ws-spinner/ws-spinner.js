define(['exports', '../imports'], function (exports, _imports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WSSpinner = undefined;

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

  var WSSpinner = exports.WSSpinner = function (_Component) {
    _inherits(WSSpinner, _Component);

    function WSSpinner() {
      _classCallCheck(this, WSSpinner);

      return _possibleConstructorReturn(this, (WSSpinner.__proto__ || Object.getPrototypeOf(WSSpinner)).apply(this, arguments));
    }

    _createClass(WSSpinner, [{
      key: 'render',
      value: function render() {
        return _imports.React.createElement(
          'div',
          { className: 'spinner mod-' + this.props.size + ' ' + (this.props.isWhite ? 'mod-white' : '') },
          _imports.React.createElement(
            'div',
            { className: 'spinner-layer' },
            _imports.React.createElement(
              'div',
              { className: 'circle-clipper left' },
              _imports.React.createElement('div', { className: 'circle' })
            ),
            _imports.React.createElement(
              'div',
              { className: 'circle-clipper right' },
              _imports.React.createElement('div', { className: 'circle' })
            )
          )
        );
      }
    }]);

    return WSSpinner;
  }(_imports.Component);

  Object.defineProperty(WSSpinner, 'propTypes', {
    enumerable: true,
    writable: true,
    value: {
      size: _imports.PropTypes.oneOf(['small', 'medium', 'large']),
      isWhite: _imports.PropTypes.bool
    }
  });
  Object.defineProperty(WSSpinner, 'defaultProps', {
    enumerable: true,
    writable: true,
    value: {
      size: 'medium',
      isWhite: false
    }
  });
});