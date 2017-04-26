import * as _React_ from 'react';
import * as ReactDOM from 'react-dom';
import * as types from 'prop-types';

export var React = {
  createElement: _React_.createElement || _React_.h
};
export var Component = _React_.Component;
export var PureComponent = _React_.PureComponent || _React_.Component;
export var PropTypes = types;
export var render = ReactDOM.render;