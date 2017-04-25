import * as _React_ from 'react';
import * as ReactDOM from 'react-dom';

// API shared by Preact and React
console.log(_React_.h);
export const React = {
  createElement: _React_.createElement || _React_.h,
  PropTypes: _React_.PropTypes || {oneOf: () => {}, oneOfType: () => {}} // The object fills the PropTypes since preact doesn't support it
};
export const Component = _React_.Component;
export const PureComponent = _React_.PureComponent || _React_.Component;
export const render = ReactDOM.render;
