var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import * as _React_ from 'react';
import * as ReactDOM from 'react-dom';
import * as types from 'prop-types';

export var React = {
  createElement: _React_.createElement || _React_.h,
  cloneElement: _React_.cloneElement,
  Children: _React_.Children
};
export var PropTypes = types;
export var render = ReactDOM.render;

export var Component = function (_React_$Component) {
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
}(_React_.Component);