define(['exports', 'react', 'react-dom'], function (exports, _react, _reactDom) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.render = exports.PureComponent = exports.Component = exports.React = undefined;

  var _React_ = _interopRequireWildcard(_react);

  var ReactDOM = _interopRequireWildcard(_reactDom);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  var React = exports.React = {
    createElement: _React_.createElement || _React_.h,
    PropTypes: _React_.PropTypes || { oneOf: function oneOf() {}, oneOfType: function oneOfType() {} } };
  var Component = exports.Component = _React_.Component;
  var PureComponent = exports.PureComponent = _React_.PureComponent || _React_.Component;
  var render = exports.render = ReactDOM.render;
});