'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WSHeader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imports = require('../imports');

var _wsHeaderNavLink = require('./ws-header-nav-link');

var _wsHeaderNavLink2 = _interopRequireDefault(_wsHeaderNavLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var urlAtStart = window.location.href;
var SESSION_TOKEN_NAME = 'session_token';
var SESSION_STATE_NAME = 'session_state';

var WSHeader = exports.WSHeader = function (_Component) {
  _inherits(WSHeader, _Component);

  function WSHeader() {
    _classCallCheck(this, WSHeader);

    var _this = _possibleConstructorReturn(this, (WSHeader.__proto__ || Object.getPrototypeOf(WSHeader)).call(this));

    _this.state = {
      cookiePath: '/',
      cookieDomain: '.zalan.do',
      lang: null,
      languageStorageId: 'ws-language',
      loggedIn: null,
      id: null,
      redirectUrl: null,
      userServiceUrl: null,
      tokenInfoUrl: null,
      clientId: null,
      availableLanguages: ['de', 'en'],
      userName: null,
      userEmail: null,
      userUID: null
    };
    _this.state.lang = _this.getLanguage(_this.state);
    return _this;
  }

  _createClass(WSHeader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.checkIsLoggedIn();
    }
  }, {
    key: 'getStateFromUrl',
    value: function getStateFromUrl(url) {
      var urlQueryStatePart = /state=([^&]+)/.exec(url);
      return urlQueryStatePart[1];
    }
  }, {
    key: 'getToken',
    value: function getToken(orgUrl) {
      var url = orgUrl;
      var that = this;

      if (!url) {
        url = window.location.href;
      }
      var token = getTokenFromUrl(url);
      if (token) {
        var sessionState = that.getStateFromUrl(url);
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
  }, {
    key: 'setCookie',
    value: function setCookie(token) {
      if (process.env.NODE_ENV !== 'dev') {
        document.cookie = SESSION_TOKEN_NAME + '=' + token + ';path=' + this.state.cookiePath + ';domain=' + this.state.cookieDomain + ';';
      } else {
        document.cookie = SESSION_TOKEN_NAME + '=' + token + ';path=' + this.state.cookiePath + ';';
      }
    }
  }, {
    key: 'getLanguage',
    value: function getLanguage(state) {
      return window.localStorage.getItem(state.languageStorageId) || state.availableLanguages[0];
    }
  }, {
    key: 'setLanguage',
    value: function setLanguage(lang) {
      if (lang !== this.state.lang) {
        this.setState({ lang: lang });

        window.localStorage.setItem(this.state.languageStorageId, lang);
        this.props.setLang && this.props.setLang(lang);
      }
    }
  }, {
    key: 'removeCookie',
    value: function removeCookie() {
      if (process.env.NODE_ENV !== 'dev') {
        document.cookie = SESSION_TOKEN_NAME + '=;path=' + this.state.cookiePath + ';domain=' + this.state.cookieDomain + ';expires=Thu, 01 Jan 1970 00:00:01 GMT";';
      } else {
        document.cookie = SESSION_TOKEN_NAME + '=;path=' + this.state.cookiePath + ';expires=Thu, 01 Jan 1970 00:00:01 GMT";';
      }
    }
  }, {
    key: 'checkIsLoggedIn',
    value: function checkIsLoggedIn() {
      var that = this;
      function failureListener() {
        return that.logout();
      }
      function successListener() {
        function userServiceSuccess() {
          var user = JSON.parse(this.responseText);
          that.setState({ userName: user.name });
          that.setState({ userEmail: user.email });
        }
        var data = JSON.parse(this.responseText);
        that.setState({ userUID: data.uid });
        that.propagateLoginStatusChange(true, data.access_token);
        if (data.uid) {
          var requestUserServiceUrl = new XMLHttpRequest();
          requestUserServiceUrl.onload = userServiceSuccess;
          requestUserServiceUrl.onerror = failureListener;
          if (process.env.NODE_ENV !== 'dev') {
            requestUserServiceUrl.open('get', that.state.userServiceUrl + '/' + data.uid, true);
          } else {
            requestUserServiceUrl.open('get', '' + that.state.userServiceUrl, true);
          }
          requestUserServiceUrl.setRequestHeader('Authorization', 'Bearer ' + data.access_token);
          requestUserServiceUrl.send();
          return true;
        }
        return false;
      }
      var token = this.getToken(urlAtStart);
      if (!token) {
        return failureListener();
      }
      var request = new XMLHttpRequest();
      request.onload = successListener;
      request.onerror = failureListener;
      request.open('get', that.state.tokenInfoUrl, true);
      request.setRequestHeader('Authorization', 'Bearer ' + token.split('?')[0]);
      request.send();
      return true;
    }
  }, {
    key: 'propagateLoginStatusChange',
    value: function propagateLoginStatusChange(isLoggedIn, token) {
      if (this.state.loggedIn !== isLoggedIn) {
        this.setState({ loggedIn: isLoggedIn });

        this.props.setLogin && this.props.setLogin({
          loggedIn: isLoggedIn,
          token: token || null
        });
      }
    }
  }, {
    key: 'checkSessionState',
    value: function checkSessionState(state) {
      var stateObj = JSON.parse(decodeURIComponent(state));
      var valid = window.localStorage.getItem(SESSION_STATE_NAME) === stateObj.state;
      window.location.hash = stateObj.hash;
      window.localStorage.removeItem(SESSION_STATE_NAME);
      return valid;
    }
  }, {
    key: 'login',
    value: function login() {
      var url = 'https://auth.zalando.com/z/oauth2/authorize?realm=/employees&response_type=token&scope=uid\n      &client_id=' + this.props.clientId + '\n      &redirect_uri=' + this.props.redirectUrl + '\n      &state=' + setSessionState();

      window.location.href = url;
    }
  }, {
    key: 'logout',
    value: function logout() {
      this.removeCookie();
      this.propagateLoginStatusChange(false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var that = this;
      return _imports.React.createElement(
        'div',
        { className: 'refills-patterns refills-components' },
        _imports.React.createElement(
          'header',
          { className: 'navigation', role: 'banner' },
          _imports.React.createElement(
            'div',
            { className: 'navigation-wrapper' },
            _imports.React.createElement(
              'a',
              { href: '/' },
              this.props.logoUrl ? _imports.React.createElement('img', { className: 'logo', alt: this.props.title + '_logo', src: this.props.logoUrl }) : null,
              _imports.React.createElement(
                'span',
                null,
                this.props.title
              )
            ),
            _imports.React.createElement(
              'nav',
              { role: 'navigation' },
              _imports.React.createElement(
                'ul',
                { id: 'js-navigation-menu', className: 'navigation-menu show' },
                this.state.isLoggedIn && this.state.userName ? _imports.React.createElement(
                  'ul',
                  null,
                  this.props.links ? this.props.links.map(function (link, index) {
                    return _imports.React.createElement(_wsHeaderNavLink2.default, { link: link, key: index });
                  }) : null
                ) : null,
                _imports.React.createElement(
                  'li',
                  { className: 'nav-link more dropdown-menu' },
                  _imports.React.createElement(
                    'a',
                    { href: '#lang' + this.state.lang },
                    _imports.React.createElement('span', { id: 'selectedLanguageFlag', className: 'flag flag-' + this.state.lang }),
                    _imports.React.createElement(
                      'span',
                      { id: 'selectedLanguage' },
                      ' ',
                      this.state.lang
                    )
                  ),
                  _imports.React.createElement(
                    'ul',
                    { className: 'submenu', id: 'languages' },
                    this.state.availableLanguages.map(function (lang) {
                      return _imports.React.createElement(
                        'li',
                        { key: 'lang-' + lang, onClick: function onClick() {
                            return that.setLanguage(lang);
                          } },
                        _imports.React.createElement(
                          'a',
                          null,
                          _imports.React.createElement('span', { className: 'flag flag-' + lang }),
                          _imports.React.createElement(
                            'span',
                            null,
                            ' ',
                            lang
                          )
                        )
                      );
                    })
                  )
                ),
                _imports.React.createElement(
                  'li',
                  { className: 'nav-link', id: 'loggedInInfo' },
                  this.state.loggedIn && this.state.userName ? _imports.React.createElement(
                    'span',
                    { onClick: function onClick() {
                        return _this2.logout();
                      } },
                    _imports.React.createElement(
                      'span',
                      { id: 'userName' },
                      this.state.userName
                    ),
                    _imports.React.createElement(
                      'a',
                      { className: 'auto-size', id: 'logOutButton', type: 'button' },
                      _imports.React.createElement('i', { className: 'icon icon-close' })
                    )
                  ) : _imports.React.createElement(
                    'a',
                    { className: 'auto-size', onClick: function onClick() {
                        return _this2.login();
                      } },
                    _imports.React.createElement(
                      'span',
                      null,
                      'Login'
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return WSHeader;
}(_imports.Component);

function getTokenFromUrl(url) {
  var urlQueryTokenPart = /access_token=([^&]+)/.exec(url);
  return urlQueryTokenPart != null ? urlQueryTokenPart[1] : null;
}

function getCookieValue(a) {
  var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return '' + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function setSessionState() {
  var state = guid();
  var obj = {
    state: state,
    hash: window.location.hash
  };

  window.localStorage.setItem(SESSION_STATE_NAME, state);
  return encodeURIComponent(JSON.stringify(obj));
}