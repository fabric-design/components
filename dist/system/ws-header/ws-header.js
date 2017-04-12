System.register(['../imports', './authentication', './ws-header-nav-link'], function (_export, _context) {
  "use strict";

  var React, Component, _login, _logout, getUserData, WSHeaderNavLink, _createClass, urlAtStart, WSHeader;

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

  return {
    setters: [function (_imports) {
      React = _imports.React;
      Component = _imports.Component;
    }, function (_authentication) {
      _login = _authentication.login;
      _logout = _authentication.logout;
      getUserData = _authentication.getUserData;
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
            var _this2 = this;

            getUserData(this.props.userServiceUrl, this.props.tokenInfoUrl, urlAtStart).then(function (_ref) {
              var userName = _ref.userName,
                  userEmail = _ref.userEmail,
                  userUID = _ref.userUID,
                  accessToken = _ref.accessToken;

              _this2.setState({
                userName: userName, userEmail: userEmail, userUID: userUID
              });
              _this2.propagateLoginStatusChange(true, accessToken);
            }, function () {
              _this2.propagateLoginStatusChange(false);
            });
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
              if (this.props.setLang != null) {
                this.props.setLang(lang);
              }
            }
          }
        }, {
          key: 'login',
          value: function login() {
            _login(this.props.clientId, this.props.redirectUrl);
          }
        }, {
          key: 'logout',
          value: function logout() {
            _logout();
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
          key: 'render',
          value: function render() {
            var _this3 = this;

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
                    this.props.logoUrl ? React.createElement('img', { className: 'logo', alt: this.props.title + '_logo', src: this.props.logoUrl }) : null,
                    React.createElement(
                      'span',
                      null,
                      this.props.title
                    )
                  ),
                  React.createElement(
                    'nav',
                    { role: 'navigation' },
                    React.createElement(
                      'ul',
                      { id: 'js-navigation-menu', className: 'navigation-menu show' },
                      this.state.isLoggedIn && this.state.userName ? React.createElement(
                        'ul',
                        null,
                        this.props.links ? this.props.links.map(function (link, index) {
                          return React.createElement(WSHeaderNavLink, { link: link, key: index });
                        }) : null
                      ) : null,
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
                            ' ',
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
                                  ' ',
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
                              return _this3.logout();
                            } },
                          React.createElement(
                            'span',
                            { id: 'userName' },
                            this.state.userName
                          ),
                          React.createElement(
                            'a',
                            { className: 'auto-size', id: 'logOutButton', type: 'button' },
                            React.createElement('i', { className: 'icon icon-close' })
                          )
                        ) : React.createElement(
                          'a',
                          { className: 'auto-size', onClick: function onClick() {
                              return _this3.login();
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
    }
  };
});