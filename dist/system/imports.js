System.register(['react', 'react-dom'], function (_export, _context) {
  "use strict";

  var _React_, ReactDOM, React, Component, PureComponent, render;

  return {
    setters: [function (_react) {
      _React_ = _react;
    }, function (_reactDom) {
      ReactDOM = _reactDom;
    }],
    execute: function () {
      _export('React', React = {
        createElement: _React_.createElement || _React_.h,
        PropTypes: _React_.PropTypes || { oneOf: function oneOf() {} } });

      _export('React', React);

      _export('Component', Component = _React_.Component);

      _export('Component', Component);

      _export('PureComponent', PureComponent = _React_.PureComponent || _React_.Component);

      _export('PureComponent', PureComponent);

      _export('render', render = ReactDOM.render);

      _export('render', render);
    }
  };
});