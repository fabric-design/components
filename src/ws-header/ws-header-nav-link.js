import {React} from '../imports';

/**
 * Helper component which is just rendering a single navigation link element
 * @param {object} props                 - properties
 * @param {string} props.key             - key for the list item
 * @param {object} props.link            - link to render
 * @param {function} props.link.onclick  - callback for clicks on the link
 * @param {string} props.link.label      - label to show for the link
 * @returns {JSX} rendered template
 */
export default function WSHeaderNavLink(props) {
  return (
    <li className="nav-link" key={props.key} onClick={() => props.link.onclick && props.link.onclick()} >
      <a>{props.link.label}</a>
    </li>
  );
}
