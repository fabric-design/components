System.register(['react', 'react-dom', 'prop-types'], function (_export, _context) {
  "use strict";

  var _React_, ReactDOM, types, _createClass, React, PropTypes, render, Component;

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
      _React_ = _react;
    }, function (_reactDom) {
      ReactDOM = _reactDom;
    }, function (_propTypes) {
      types = _propTypes;
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

      _export('React', React = {
        createElement: _React_.createElement || _React_.h,
        cloneElement: _React_.cloneElement,
        Children: _React_.Children
      });

      _export('React', React);

      _export('PropTypes', PropTypes = types);

      _export('PropTypes', PropTypes);

      _export('render', render = ReactDOM.render);

      _export('render', render);

      _export('Component', Component = function (_React_$Component) {
        _inherits(Component, _React_$Component);

        function Component() {
          _classCallCheck(this, Component);

          return _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).apply(this, arguments));
        }

        _createClass(Component, [{
          key: 'dispatchEvent',
          value: function dispatchEvent(name, detail) {
            var bubbles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            var event = new window.CustomEvent(name, { detail: detail, bubbles: bubbles });

            if (this.element) {
              this.element.dispatchEvent(event);
            }
          }
        }]);

        return Component;
      }(_React_.Component));

      _export('Component', Component);
    }
  };
});