import {React, Component} from '../imports';
import WSHeaderNavLink from './ws-header-nav-link';
const urlAtStart = window.location.href;
const SESSION_TOKEN_NAME = 'session_token';
const SESSION_STATE_NAME = 'session_state';

/**
 * The default Header to be used everywhere
 * @class WSHeader
 * @property {object} props             - properties
 * @property {function} props.setLang   - handler which sets language
 * @property {function} props.setLogin  - handler which sets Login information (token and boolan for loggedin)
 * @property {number} props.clientId    - clientId
 * @property {string} props.redirectUrl - URL to redirect after successfully login
 * @property {string} props.logoUrl     - url for logo
 * @property {string} props.title       - title of Header
 * @property {array} props.links        - List of navigation links based on object format {label, onclick-Handler }
 *
 */
export class WSHeader extends Component {

    static defaultProps = {
      setLang: () => {},
      setLogin: () => {},
      clientId: null,
      redirectUrl: '',
      logoUrl: null,
      title: '',
      links: []
    };

  /**
   * @type {Object} props
   */
  static propTypes = {
    setLang: React.PropTypes.function,
    setLogin: React.PropTypes.function,
    clientId: React.PropTypes.number,
    redirectUrl: React.PropTypes.string,
    logoUrl: React.PropTypes.string,
    title: React.PropTypes.string,
    links: React.PropTypes.array
  };

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
      tokenInfoUrl: '', // CORS_SERVICE_URL + TOKEN_SERVICE_URL,
      clientId: null, // getCookieValue(CLIENT_ID_COOKIE_NAME),
      availableLanguages: ['de', 'en'],
      userName: null,
      userEmail: null,
      userUID: null
    };
    this.state.lang = this.getLanguage(this.state);
  }

  /**
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
   * @returns {String} token string
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

  /**
   * Sets cookie for a given token
   * @param {String} token Token String
   * @returns {void}
   */
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

  /**
   * Language string to set navigation
   * @param {String} lang Language string
   * @returns {void}
   */
  setLanguage(lang) {
    if (lang !== this.state.lang) {
      this.setState({lang});
      // persist
      window.localStorage.setItem(this.state.languageStorageId, lang);
      if (this.props.setLang) {
        this.props.setLang(lang);
      }
    }
  }

  /**
   * Removes cookie
   * @returns {void}
   */
  removeCookie() {
    if (process.env.NODE_ENV !== 'dev') {
      document.cookie = `${SESSION_TOKEN_NAME}=;path=${this.state.cookiePath};domain=${this.state.cookieDomain};expires=Thu, 01 Jan 1970 00:00:01 GMT";`;
    } else {
      document.cookie = `${SESSION_TOKEN_NAME}=;path=${this.state.cookiePath};expires=Thu, 01 Jan 1970 00:00:01 GMT";`;
    }
  }

  /**
   * Helper method checking if the user is already logged in
   * @returns {Boolean|void}
   */
  checkIsLoggedIn() {
    const that = this;

    /**
     * React to failure in user authentication
     * @returns {void}
     */
    function failureListener() {
      that.logout();
    }

    /**
     * react to success in user authentication
     * @returns {boolean} is the user logged in
     */
    function successListener() {
      const that2 = this;

      /**
       * react to success in the user lookup
       * set the local state with the looked up user name and email
       * @returns {void}
       */
      function userServiceSuccess() {
        const user = JSON.parse(this.responseText);
        that.setState({userName: user.name});
        that.setState({userEmail: user.email});
      }
      const data = JSON.parse(that2.responseText);
      that.setState({userUID: data.uid});
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

  /**
   * Updates changed login status
   * @param {boolean} isLoggedIn updated status of logged in user
   * @param {String} token Token String
   * @returns {void}
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
   * Helper method checking current session state
   * @param {String} state String containing state
   * @returns {Boolean} valid boolean
   */
  checkSessionState(state) {
    const stateObj = JSON.parse(decodeURIComponent(state));
    const valid = window.localStorage.getItem(SESSION_STATE_NAME) === stateObj.state;
    window.location.hash = stateObj.hash;
    window.localStorage.removeItem(SESSION_STATE_NAME);
    return valid;
  }

  /**
   * Login
   * @returns {void}
   */
  login() {
    window.location.href = `https://auth.zalando.com/z/oauth2/authorize
      ?realm=/employees&response_type=token&scope=uid
      &client_id=${this.props.clientId}
      &redirect_uri=${this.props.redirectUrl}
      &state=${setSessionState()}`;
  }

  /**
   * Logout
   * @returns {void}
   */
  logout() {
    this.removeCookie();
    this.propagateLoginStatusChange(false, null);
  }

  /**
   * Render function of component
   * @returns {JSX} JSX string representation of WSHeader
   */
  render() {
    return (
      <div className="refills-patterns refills-components">
        <header className="navigation" role="banner">
          <div className="navigation-wrapper">
            <a href="/">
              {this.props.logoUrl &&
                <img className="logo" alt={`${this.props.title}_logo`} src={this.props.logoUrl} />
              }
              <span className="nav-title">{this.props.title}</span>
            </a>
            <nav role="navigation">
              <ul id="js-navigation-menu" className="navigation-menu show">
                {this.state.loggedIn && this.state.userName &&
                  <ul id="nav-links">
                    {this.props.links && this.props.links.map((link, index) =>
                      <WSHeaderNavLink link={link} key={index} />
                    )}
                  </ul>
                }
                <li className="nav-link more dropdown-menu">
                  <a href={`#lang${this.state.lang}`}>
                    <span id="selectedLanguageFlag" className={`flag flag-${this.state.lang}`} />
                    <span id="selectedLanguage">{this.state.lang}</span>
                  </a>
                  <ul className="submenu" id="languages">
                    {this.state.availableLanguages.map(lang =>
                      <li key={`lang-${lang}`} onClick={() => that.setLanguage(lang)}>
                        <a>
                          <span className={`flag flag-${lang}`} />
                          <span>{lang}</span>
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
                        <span className="icon icon-close" />
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

/**
 * getTokenFromUrl
 * @param {String} url url string
 * @returns {String} token part
 */
function getTokenFromUrl(url) {
  const urlQueryTokenPart = /access_token=([^&]+)/.exec(url);
  return urlQueryTokenPart !== null ? urlQueryTokenPart[1] : null;
}

/**
 * Get Cookie Value
 * @param {String} a cookie key to match
 * @returns {String} cookie value for key
 */
function getCookieValue(a) {
  const b = document.cookie.match(`(^|;)\\s*${a}\\s*=\\s*([^;]+)`);
  return b ? b.pop() : '';
}

/**
 * Generate a global unique identifier
 * @returns {String} string
 */
function guid() {
  /**
   * Helper method for calculating a unique Id
   * @returns {String}
   */
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

/**
 * Sets Session State
 * @returns {String} encoded URI component of state
 */
function setSessionState() {
  // create new state guid
  const state = guid();
  const obj = {
    state,
    hash: window.location.hash
  };

  // save the state to check for it on return
  window.localStorage.setItem(SESSION_STATE_NAME, state);
  return encodeURIComponent(JSON.stringify(obj));
}
