import { React } from '../imports';

export default function WSHeaderNavLink(props) {
  return React.createElement(
    "li",
    { className: "nav-link", key: props.key, onClick: function onClick() {
        return props.link.onclick && props.link.onclick();
      } },
    React.createElement(
      "a",
      null,
      props.link.label
    )
  );
}