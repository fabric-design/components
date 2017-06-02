System.register(['../imports', './ws-header-nav-link'], function (_export, _context) {
  "use strict";

  var React, Component, PropTypes, WSHeaderNavLink, _createClass, urlAtStart, SESSION_TOKEN_NAME, SESSION_STATE_NAME, WSHeader;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function getTokenFromUrl(url) {
    var urlQueryTokenPart = /access_token=([^&]+)/.exec(url);
    return urlQueryTokenPart !== null ? urlQueryTokenPart[1] : null;
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
  return {
    setters: [function (_imports) {
      React = _imports.React;
      Component = _imports.Component;
      PropTypes = _imports.PropTypes;
    }, function (_wsHeaderNavLink) {
      WSHeaderNavLink = _wsHeaderNavLink.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      urlAtStart = window.location.href;
      SESSION_TOKEN_NAME = 'session_token';
      SESSION_STATE_NAME = 'session_state';

      _export('WSHeader', WSHeader = function (_Component) {
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
            tokenInfoUrl: '',
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
              if (this.props.setLang) {
                this.props.setLang(lang);
              }
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
              that.logout();
            }

            function successListener() {
              var that2 = this;

              function userServiceSuccess() {
                var user = JSON.parse(this.responseText);
                that.setState({ userName: user.name });
                that.setState({ userEmail: user.email });
              }
              var data = JSON.parse(that2.responseText);
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

              if (this.props.setLogin) {
                this.props.setLogin({
                  loggedIn: isLoggedIn,
                  token: token || null
                });
              }
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
            window.location.href = 'https://auth.zalando.com/z/oauth2/authorize?realm=/employees&response_type=token&scope=uid&client_id=' + this.props.clientId + '&redirect_uri=' + this.props.redirectUrl + '&state=' + setSessionState();
          }
        }, {
          key: 'logout',
          value: function logout() {
            this.removeCookie();
            this.propagateLoginStatusChange(false, null);
          }
        }, {
          key: 'render',
          value: function render() {
            var _this2 = this;

            var that = this;
            return React.createElement(
              'div',
              { className: 'refills-patterns refills-components' },
              React.createElement(
                'header',
                { className: 'navigation', role: 'banner' },
                React.createElement(
                  'div',
                  { className: 'navigation-wrapper' },
                  React.createElement(
                    'a',
                    { href: '/' },
                    this.props.logoUrl && React.createElement('img', { className: 'logo', alt: this.props.title + '_logo', src: this.props.logoUrl }),
                    React.createElement(
                      'span',
                      { className: 'nav-title' },
                      this.props.title
                    )
                  ),
                  React.createElement(
                    'nav',
                    { role: 'navigation' },
                    React.createElement(
                      'ul',
                      { id: 'js-navigation-menu', className: 'navigation-menu show' },
                      this.state.loggedIn && this.state.userName !== null && React.createElement(
                        'ul',
                        { id: 'nav-links' },
                        this.props.links.length > 0 && this.props.links.map(function (link, index) {
                          return React.createElement(WSHeaderNavLink, { link: link, key: index });
                        })
                      ),
                      React.createElement(
                        'li',
                        { className: 'nav-link more dropdown-menu' },
                        React.createElement(
                          'a',
                          { href: '#lang' + this.state.lang },
                          React.createElement('span', { id: 'selectedLanguageFlag', className: 'flag flag-' + this.state.lang }),
                          React.createElement(
                            'span',
                            { id: 'selectedLanguage' },
                            this.state.lang
                          )
                        ),
                        React.createElement(
                          'ul',
                          { className: 'submenu', id: 'languages' },
                          this.state.availableLanguages.map(function (lang) {
                            return React.createElement(
                              'li',
                              { key: 'lang-' + lang, onClick: function onClick() {
                                  return that.setLanguage(lang);
                                } },
                              React.createElement(
                                'a',
                                null,
                                React.createElement('span', { className: 'flag flag-' + lang }),
                                React.createElement(
                                  'span',
                                  null,
                                  lang
                                )
                              )
                            );
                          })
                        )
                      ),
                      React.createElement(
                        'li',
                        { className: 'nav-link', id: 'loggedInInfo' },
                        this.state.loggedIn && this.state.userName ? React.createElement(
                          'span',
                          { onClick: function onClick() {
                              return _this2.logout();
                            } },
                          React.createElement(
                            'span',
                            { id: 'userName' },
                            this.state.userName
                          ),
                          React.createElement(
                            'a',
                            { className: 'auto-size', id: 'logOutButton', type: 'button' },
                            React.createElement('span', { className: 'icon icon-close' })
                          )
                        ) : React.createElement(
                          'a',
                          { className: 'auto-size', onClick: function onClick() {
                              return _this2.login();
                            } },
                          React.createElement(
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
      }(Component));

      _export('WSHeader', WSHeader);

      Object.defineProperty(WSHeader, 'defaultProps', {
        enumerable: true,
        writable: true,
        value: {
          setLang: function setLang() {},
          setLogin: function setLogin() {},
          clientId: null,
          redirectUrl: '',
          logoUrl: null,
          title: '',
          links: []
        }
      });
      Object.defineProperty(WSHeader, 'propTypes', {
        enumerable: true,
        writable: true,
        value: {
          setLang: PropTypes.func,
          setLogin: PropTypes.func,
          clientId: PropTypes.number,
          redirectUrl: PropTypes.string,
          logoUrl: PropTypes.string,
          title: PropTypes.string,
          links: PropTypes.array
        }
      });
    }
  };
});