"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WSHeaderNavLink;

var _imports = require("../imports");

function WSHeaderNavLink(props) {
  return _imports.React.createElement(
    "li",
    { className: "nav-link", key: props.key, onClick: function onClick() {
        return props.link.onclick && props.link.onclick();
      } },
    _imports.React.createElement(
      "a",
      null,
      this.props.link.label
    )
  );
}