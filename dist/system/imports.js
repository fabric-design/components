System.register(['react', 'react-dom', 'prop-types'], function (_export, _context) {
  "use strict";

  var _React_, ReactDOM, types, React, Component, PureComponent, PropTypes, render;

  return {
    setters: [function (_react) {
      _React_ = _react;
    }, function (_reactDom) {
      ReactDOM = _reactDom;
    }, function (_propTypes) {
      types = _propTypes;
    }],
    execute: function () {
      _export('React', React = {
        createElement: _React_.createElement || _React_.h
      });

      _export('React', React);

      _export('Component', Component = _React_.Component);

      _export('Component', Component);

      _export('PureComponent', PureComponent = _React_.PureComponent || _React_.Component);

      _export('PureComponent', PureComponent);

      _export('PropTypes', PropTypes = types);

      _export('PropTypes', PropTypes);

      _export('render', render = ReactDOM.render);

      _export('render', render);
    }
  };
});