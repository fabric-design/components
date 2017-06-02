"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WSHeaderNavLink;

var _imports = require("../imports");

function WSHeaderNavLink(props) {
  return _imports.React.createElement(
    "li",
    { className: "nav-link", onClick: function onClick() {
        return props.link.onclick && props.link.onclick(props.link.value);
      } },
    _imports.React.createElement(
      "a",
      null,
      props.link.label
    )
  );
}