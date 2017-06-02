import { React } from '../imports';

export default function WSHeaderNavLink(props) {
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