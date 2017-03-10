import {React, Component} from '../imports';
import WSHeaderNavLink from './ws-header-nav-link';
const urlAtStart = window.location.href;
const SESSION_TOKEN_NAME = 'session_token';
const SESSION_STATE_NAME = 'session_state';

//  props: {
//    setLang?: (lang) => ;
//    setLogin?: ({ loggedIn, token }) =>;
//    clientId;
//    redirectUrl;
//    logoUrl?;
//    title;
//    links?: { label, value, onclick }[];
//  }


/**
 * The default Header to be used everywhere
 * @class
 * @extends Component
 * @property {object} props             - properties
 * @property {function} props.setLang   - handler which sets language
 * @property {function} props.setLogin  - handler which sets Login information (token and boolan for loggedin)
 * @property {number} props.clientId    - clientId
 * @property {string} props.redirectUrl - URL to redirect after successfully login
 * @property {string} props.logoUrl     - url for logo
 * @property {string} props.title       - title of Header
 * @property {array} props.links        - List of navigation links based on object format {label, value, onclick-Handler }
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
      id: null, // HEADER_COMPONENT_ID,
      redirectUrl: null, // REDIRECT_URL,
      userServiceUrl: null, // CORS_SERVICE_URL + USER_SERVICE_URL,
      tokenInfoUrl: null, // CORS_SERVICE_URL + TOKEN_SERVICE_URL,
      clientId: null, // getCookieValue(CLIENT_ID_COOKIE_NAME),
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
   * @returns {void}
   */
  componentDidMount() {
    this.checkIsLoggedIn();
  }
  /**
   * Method to extract state parameter from url
   * @param {String} url urlString to extract state parameter
   * @returns {String} state information
   */
  getStateFromUrl(url) {
    const urlQueryStatePart = /state=([^&]+)/.exec(url);
    return urlQueryStatePart[1];
  }

  /**
   * Method to get user auth token
   * @param {String} orgUrl url to receive Token
   * @returns {String} auth token
   */
  getToken(orgUrl) {
    let url = orgUrl;
    const that = this;

    if (!url) {
      url = window.location.href;
    }
    let token = getTokenFromUrl(url);
    if (token) {
      const sessionState = that.getStateFromUrl(url);
      if (that.checkSessionState(sessionState)) {
        that.setCookie(token);
        return token;
      }
    }
    token = getCookieValue(SESSION_TOKEN_NAME);
    if (token) {
      return token;
    }
    return null;
  }
  setCookie(token) {
    if (process.env.NODE_ENV !== 'dev') {
      document.cookie = `${SESSION_TOKEN_NAME}=${token};path=${this.state.cookiePath};domain=${this.state.cookieDomain};`;
    } else {
      document.cookie = `${SESSION_TOKEN_NAME}=${token};path=${this.state.cookiePath};`;
    }
  }
  /**
   * get Language from state / localStorage
   * @param {object} state state object of component
   * @returns {object}  language object
   */
  getLanguage(state) {
    return window.localStorage.getItem(state.languageStorageId) || state.availableLanguages[0];
  }
  setLanguage(lang) {
    if (lang !== this.state.lang) {
      this.setState({ lang });
      // persist
      window.localStorage.setItem(this.state.languageStorageId, lang);
      this.props.setLang && this.props.setLang(lang);
    }
  }
  removeCookie() {
    if (process.env.NODE_ENV !== 'dev') {
      document.cookie = `${SESSION_TOKEN_NAME}=;path=${this.state.cookiePath};domain=${this.state.cookieDomain};expires=Thu, 01 Jan 1970 00:00:01 GMT";`;
    } else {
      document.cookie = `${SESSION_TOKEN_NAME}=;path=${this.state.cookiePath};expires=Thu, 01 Jan 1970 00:00:01 GMT";`;
    }
  }
  checkIsLoggedIn() {
    const that = this;
    function failureListener() {
      return that.logout();
    }
    function successListener() {
      function userServiceSuccess() {
        const user = JSON.parse(this.responseText);
        that.setState({ userName: user.name });
        that.setState({ userEmail: user.email });
      }
      const data = JSON.parse(this.responseText);
      that.setState({ userUID: data.uid });
      that.propagateLoginStatusChange(true, data.access_token);
      if (data.uid) {
        const requestUserServiceUrl = new XMLHttpRequest();
        requestUserServiceUrl.onload = userServiceSuccess;
        requestUserServiceUrl.onerror = failureListener;
        if (process.env.NODE_ENV !== 'dev') {
          requestUserServiceUrl.open('get', `${that.state.userServiceUrl}/${data.uid}`, true);
        } else {
          requestUserServiceUrl.open('get', `${that.state.userServiceUrl}`, true);
        }
        requestUserServiceUrl.setRequestHeader('Authorization', `Bearer ${data.access_token}`);
        requestUserServiceUrl.send();
        return true;
      }
      return false;
    }
    const token = this.getToken(urlAtStart);
    if (!token) {
      return failureListener();
    }
    const request = new XMLHttpRequest();
    request.onload = successListener;
    request.onerror = failureListener;
    request.open('get', that.state.tokenInfoUrl, true);
    request.setRequestHeader('Authorization', `Bearer ${token.split('?')[0]}`);
    request.send();
    return true;
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
  checkSessionState(state) {
    const stateObj = JSON.parse(decodeURIComponent(state));
    const valid = window.localStorage.getItem(SESSION_STATE_NAME) === stateObj.state;
    window.location.hash = stateObj.hash;
    window.localStorage.removeItem(SESSION_STATE_NAME);
    return valid;
  }
  login() {
    const url = `https://auth.zalando.com/z/oauth2/authorize?realm=/employees&response_type=token&scope=uid
      &client_id=${this.props.clientId}
      &redirect_uri=${this.props.redirectUrl}
      &state=${setSessionState()}`;

    window.location.href = url;
  }
  logout() {
    this.removeCookie();
    this.propagateLoginStatusChange(false);
  }
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

function getTokenFromUrl(url) {
  const urlQueryTokenPart = /access_token=([^&]+)/.exec(url);
  return urlQueryTokenPart != null ? urlQueryTokenPart[1] : null;
}

function getCookieValue(a) {
  const b = document.cookie.match(`(^|;)\\s*${a}\\s*=\\s*([^;]+)`);
  return b ? b.pop() : '';
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

function setSessionState() {
  // create new state guid
  const state = guid();
  const obj = {
    state,
    hash: window.location.hash,
  };

  // save the state to check for it on return
  window.localStorage.setItem(SESSION_STATE_NAME, state);
  return encodeURIComponent(JSON.stringify(obj));
}
