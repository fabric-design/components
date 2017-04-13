import {React, Component} from '../imports';
import {login, logout, getUserData} from './authentication';
import WSHeaderNavLink from './ws-header-nav-link';
const urlAtStart = window.location.href;

/**
 * The default Header to be used everywhere
 * @class WSHeader
 * @extends Component
 * @property {object} props               - properties
 * @property {function} props.setLang     - handler which sets language
 * @property {function} props.setLogin    - handler which sets Login information (token and boolan for loggedin)
 * @property {number} props.clientId      - clientId
 * @property {string} props.redirectUrl   - URL to redirect after successfully login
 * @property {string} props.userServiceUrl - URL to request user info from
 * @property {string} props.tokenInfoUrl  - URL to validate token
 * @property {string} props.logoUrl       - url for logo
 * @property {string} props.title         - title of Header
 * @property {array} props.links          - List of navigation links based on object format {label, value, onclick-Handler }
 *
 */
export class WSHeader extends Component {

  /**
   * Constructor of WSHeader
   * it is initializing default values for the state object
   */
  constructor() {
    super();
    this.state = {
      cookiePath: '/',
      cookieDomain: '.zalan.do',
      lang: null,
      languageStorageId: 'ws-language',
      loggedIn: null,
      availableLanguages: ['de', 'en'],
      userName: null,
      userEmail: null,
      userUID: null
    };
    this.state.lang = this.getLanguage(this.state);
  }

  /**
   *
   * Lifecycle: componentDidMount handler for component
   * Will check if the user is logged in already and query user data
   * @returns {void};
   */
  componentDidMount() {
    getUserData(this.props.userServiceUrl, this.props.tokenInfoUrl, urlAtStart)
      .then(({userName, userEmail, userUID, accessToken}) => {
        this.setState({
          userName, userEmail, userUID
        });
        this.propagateLoginStatusChange(true, accessToken);
      }, () => {
        this.propagateLoginStatusChange(false);
      });
  }

  /**
   * get Language from state / localStorage
   * @param {object} state state object of component
   * @returns {object}  language object
   */
  getLanguage(state) {
    return window.localStorage.getItem(state.languageStorageId) || state.availableLanguages[0];
  }

  /**
   * Language string to set navigation
   * @param {String} lang Language string
   * @returns {void};
   */
  setLanguage(lang) {
    if (lang !== this.state.lang) {
      this.setState({lang});
      // persist
      window.localStorage.setItem(this.state.languageStorageId, lang);
      if (this.props.setLang != null) {
        this.props.setLang(lang);
      }
    }
  }

  /**
   * Start the zalando implicit oauth flow by redirecting to the auth portal
   * @returns {void};
   */
  login() {
    login(this.props.clientId, this.props.redirectUrl);
  }

  /**
   * Logs the user out removing set credentials
   * @returns {void};
   */
  logout() {
    logout();
    this.setState({
      loggedIn: false,
      userName: null,
      userEmail: null,
      userUID: null
    });
  }

  /**
   * Updates changed login status
   * @param {boolean} isLoggedIn updated status of loggedin user
   * @param {String} token Token String
   * @returns {void};
   */
  propagateLoginStatusChange(isLoggedIn, token) {
    if (this.state.loggedIn !== isLoggedIn) {
      this.setState({loggedIn: isLoggedIn});

      if (this.props.setLogin) {
        this.props.setLogin({
          loggedIn: isLoggedIn,
          token: token || null
        });
      }
    }
  }

  /**
   * Render function of component
   * @returns {JSX} JSX string representation of WSHeader
   */
  render() {
    const that = this;
    return (
      <div className="refills-patterns refills-components">
        <header className="navigation" role="banner">
          <div className="navigation-wrapper">
            <a href="/">
              {this.props.logoUrl ? <img className="logo" alt={`${this.props.title}_logo`} src={this.props.logoUrl} /> : null}
              <span>{this.props.title}</span>
            </a>
            <nav role="navigation">
              <ul id="js-navigation-menu" className="navigation-menu show">
                {(this.state.isLoggedIn && this.state.userName) ?
                  <ul>
                    {this.props.links ? this.props.links.map((link, index) => <WSHeaderNavLink link={link} key={index} />) : null}
                  </ul>
                : null}
                <li className="nav-link more dropdown-menu">
                  <a href={`#lang${this.state.lang}`}>
                    <span id="selectedLanguageFlag" className={`flag flag-${this.state.lang}`}></span>
                    <span id="selectedLanguage"> {this.state.lang}</span>
                  </a>
                  <ul className="submenu" id="languages">
                    {this.state.availableLanguages.map(lang =>
                      <li key={`lang-${lang}`} onClick={() => that.setLanguage(lang)}>
                        <a>
                          <span className={`flag flag-${lang}`}></span>
                          <span> {lang}</span>
                        </a>
                      </li>
                    )}
                  </ul>
                </li>
                <li className="nav-link" id="loggedInInfo">
                  {(this.state.loggedIn && this.state.userName) ?
                    <span onClick={() => this.logout()}>
                      <span id="userName">{this.state.userName}</span>
                      <a className="auto-size" id="logOutButton" type="button">
                        <i className="icon icon-close" />
                      </a>
                    </span> :
                    <a className="auto-size" onClick={() => this.login()}><span>Login</span></a>}
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    );
  }
}
