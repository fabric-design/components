import { React, Component } from '../imports';
import WSHeaderNavLink from './ws-header-nav-link';
import { login, logout, checkIsLoggedIn } from './authentication';
import './ws-header.scss';

// using typescript style notations for propertys
// props: {
//   setLang?: (lang: string) => void;
//   setLogin?: ({ loggedIn: boolean, token: string }) => void;
//   clientId: string;
//   redirectUrl: string;
//   tokenInfoUrl: string;
//   userServiceUrl: string;
//   logoUrl?: string;
//   title: string;
//   links?: { label: string, onclick: () => void }[];
// }

const AVAILABLE_LANGUAGES = ['de', 'en'];
const LANGUAGE_STORAGE_ID = 'ws-language';

export default class WSHeader extends Component {
  constructor() {
    super();
    this.state = {
      lang: null,
      loggedIn: null,
      userName: null,
      userEmail: null,
    };
    this.state.lang = this.getLanguage(this.state);
  }
  componentDidMount() {
    checkIsLoggedIn(this.props.tokenInfoUrl, this.props.userServiceUrl)
    .then(({ userName, userEmail, token }) => {
      this.setState({ userName, userEmail });
      this.propagateLoginStatusChange(true, token);
    }, () => {
      this.propagateLoginStatusChange(false);
    });
  }
  getLanguage() {
    return window.localStorage.getItem(LANGUAGE_STORAGE_ID) || AVAILABLE_LANGUAGES[0];
  }
  setLanguage(lang) {
    if (lang !== this.state.lang) {
      this.setState({ lang });
      // persist
      window.localStorage.setItem(LANGUAGE_STORAGE_ID, lang);
      this.props.setLang && this.props.setLang(lang);
    }
  }
  propagateLoginStatusChange(isLoggedIn, token) {
    if (this.state.loggedIn !== isLoggedIn) {
      this.setState({ loggedIn: isLoggedIn });

      this.props.setLogin && this.props.setLogin({
        loggedIn: isLoggedIn,
        token: token || null,
      });
    }
  }
  login() {
    login(this.props.clientId, this.props.redirectUrl);
  }
  logout() {
    logout();
    this.propagateLoginStatusChange(false);
  }
  render() {
    const that = this;
    return (
      <div className="refills-patterns refills-components">
        <header className="navigation" role="banner">
          <div className="navigation-wrapper">
            <a href="/">
              {this.props.logoUrl && <img className="logo" alt={`${this.props.title}_logo`} src={this.props.logoUrl} />}
              <span>{this.props.title}</span>
            </a>
            <nav role="navigation">
              <ul id="js-navigation-menu" className="navigation-menu show">
                {(this.state.isLoggedIn && this.state.userName) &&
                  <ul>
                    {this.props.links && this.props.links.map((link, index) => <WSHeaderNavLink link={link} key={index} />)}
                  </ul>}
                <li className="nav-link more dropdown-menu">
                  <a href={`#lang${this.state.lang}`}>
                    <span id="selectedLanguageFlag" className={`flag flag-${this.state.lang}`}></span>
                    <span id="selectedLanguage"> {this.state.lang}</span>
                  </a>
                  <ul className="submenu" id="languages">
                    {AVAILABLE_LANGUAGES.map(lang =>
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
