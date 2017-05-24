System.register(["../imports"], function (_export, _context) {
  "use strict";

  var React;
  function WSHeaderNavLink(props) {
    return React.createElement(
      "li",
      { className: "nav-link", onClick: function onClick() {
          return props.link.onclick && props.link.onclick(props.link.value);
        } },
      React.createElement(
        "a",
        null,
        props.link.label
      )
    );
  }

  _export("default", WSHeaderNavLink);

  return {
    setters: [function (_imports) {
      React = _imports.React;
    }],
    execute: function () {}
  };
});