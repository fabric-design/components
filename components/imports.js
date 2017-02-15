import * as _React_ from 'react';
import * as ReactDOM from 'react-dom';

// API shared by Preact and React
export const React = {
	createElement: _React_.createElement || _React_.h
};
export const Component = _React_.Component;
export const PureComponent = _React_.PureComponent || _React_.Component;
export const render = ReactDOM.render;