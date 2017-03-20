import * as _React_ from 'react';
import * as ReactDOM from 'react-dom';

export var React = {
  createElement: _React_.createElement || _React_.h,
  PropTypes: _React_.PropTypes || { oneOf: function oneOf() {}, oneOfType: function oneOfType() {} } };
export var Component = _React_.Component;
export var PureComponent = _React_.PureComponent || _React_.Component;
export var render = ReactDOM.render;