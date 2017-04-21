define(["exports", "../imports"], function (exports, _imports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = WSHeaderNavLink;
  function WSHeaderNavLink(props) {
    return _imports.React.createElement(
      "li",
      { className: "nav-link", key: props.key, onClick: function onClick() {
          return props.link.onclick && props.link.onclick();
        } },
      _imports.React.createElement(
        "a",
        null,
        props.link.label
      )
    );
  }
});