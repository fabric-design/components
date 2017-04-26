define(['exports', 'react', 'react-dom', 'prop-types'], function (exports, _react, _reactDom, _propTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.render = exports.PropTypes = exports.PureComponent = exports.Component = exports.React = undefined;

  var _React_ = _interopRequireWildcard(_react);

  var ReactDOM = _interopRequireWildcard(_reactDom);

  var types = _interopRequireWildcard(_propTypes);

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
    createElement: _React_.createElement || _React_.h
  };
  var Component = exports.Component = _React_.Component;
  var PureComponent = exports.PureComponent = _React_.PureComponent || _React_.Component;
  var PropTypes = exports.PropTypes = types;
  var render = exports.render = ReactDOM.render;
});