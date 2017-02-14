import { React, Component } from './imports';
import WSHeaderNavLink from './ws-header-nav-link';
import './ws-header.scss';
let urlAtStart = window.location.href;
let SESSION_TOKEN_NAME = null;

// props: {
// 	setLang?: (lang) => ;
// 	setLogin?: ({ loggedIn, token }) =>;
// 	clientId;
// 	redirectUrl;
// 	logoUrl?;
// 	title;
// 	links?: { label, value, onclick }[];
// }

class Header extends Component {
  constructor() {
    super();
    this.state = {
      cookiePath: '/',
      cookieDomain: '.zalan.do',
	  lang: null,
	  languageStorageId: 'ws-language',
      loggedIn: null,
      id: null, //HEADER_COMPONENT_ID,
      redirectUrl: null, //REDIRECT_URL,
      userServiceUrl: null, //CORS_SERVICE_URL + USER_SERVICE_URL,
      tokenInfoUrl: null, //CORS_SERVICE_URL + TOKEN_SERVICE_URL,
      clientId: null, //getCookieValue(CLIENT_ID_COOKIE_NAME),
      availableLanguages: ['de', 'en'],
      userName: null,
      userEmail: null,
      userUID: null,
    };
	this.state.lang = this.getLanguage(this.state);
  }
  componentDidMount() {
    this.checkIsLoggedIn();
  }
  getStateFromUrl(url) {
    const urlQueryStatePart = /state=([^&]+)/.exec(url);
    return urlQueryStatePart[1];
  }
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
		let url = 'https://auth.zalando.com/z/oauth2/authorize?realm=/employees&response_type=token&scope=uid' +
			'&client_id=' + this.props.clientId +
			'&redirect_uri=' + this.props.redirectUrl +
			'&state=' + setSessionState();

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
          <div className="navigation-wrapper" ref="header">
			<a href='/'>
			{this.props.logoUrl ? <img class="logo" src={this.props.logoUrl} /> : null}
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
                    <span id="selectedLanguageFlag" className={`flag flag-${this.state.lang}`} ref="selectedLanguageFlag"></span>
                    <span id="selectedLanguage" ref="selectedLanguage"> {this.state.lang}</span>
                  </a>
                  <ul className="submenu" id="languages" ref="languages">
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
                <li className="nav-link" id="loggedInInfo" ref="loggedInInfo">
                  {(this.state.loggedIn && this.state.userName) ?
                    <span onClick={() => this.logout()}>
                      <span id="userName" ref="userName">{this.state.userName}</span>
                      <a className="auto-size" id="logOutButton" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100"><path d="M48.501,27.015c0,0.827,0.671,1.5,1.5,1.5h21.486v42.974H50.001c-0.829,0-1.5,0.672-1.5,1.5c0,0.829,0.671,1.5,1.5,1.5  h22.986c0.828,0,1.5-0.671,1.5-1.5V27.013c0-0.828-0.672-1.5-1.5-1.5H50.001C49.172,25.515,48.501,26.187,48.501,27.015z   M48.473,38.447c0,0.384,0.146,0.768,0.438,1.061l8.964,8.963h-30.86c-0.828,0-1.5,0.671-1.5,1.5c0,0.829,0.672,1.5,1.5,1.5h30.86  l-8.993,8.992c-0.293,0.293-0.439,0.677-0.439,1.062c0,0.383,0.146,0.768,0.439,1.061c0.585,0.586,1.536,0.586,2.121,0  l11.553-11.553c0.141-0.141,0.25-0.308,0.327-0.492c0.003-0.008,0.004-0.016,0.007-0.022c0.067-0.169,0.105-0.354,0.105-0.547  s-0.039-0.378-0.105-0.548c-0.003-0.007-0.004-0.015-0.007-0.021c-0.077-0.187-0.188-0.354-0.328-0.493L51.032,37.386  c-0.585-0.586-1.535-0.586-2.121,0C48.618,37.679,48.473,38.063,48.473,38.447z"></path></svg>
                      </a>
                    </span> : <a className="auto-size" onClick={() => this.login()}><span>Login</span></a>}
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;

function getTokenFromUrl(url) {
	let urlQueryTokenPart = /access_token=([^&]+)/.exec(url);
	return urlQueryTokenPart != null ? urlQueryTokenPart[1] : null;
}

function getCookieValue(a) {
	let b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
	return b ? b.pop() : '';
}

function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return '' + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

function setSessionState() {
    // create new state guid
    var state = guid();
    var obj = {
      state: state,
      hash: window.location.hash
    };

    // save the state to check for it on return
    window.localStorage.setItem(SESSION_STATE_NAME, state);
    return encodeURIComponent(JSON.stringify(obj));
  }