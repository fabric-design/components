define(['exports', '../imports', './authentication', './ws-header-nav-link'], function (exports, _imports, _authentication, _wsHeaderNavLink) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WSHeader = exports.LOGOUT_EVENT = exports.LOGIN_EVENT = undefined;

  var _wsHeaderNavLink2 = _interopRequireDefault(_wsHeaderNavLink);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
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

  var urlAtStart = window.location.href;
  var LOGIN_EVENT = exports.LOGIN_EVENT = 'WS_HEADER_LOGIN_EVENT';
  var LOGOUT_EVENT = exports.LOGOUT_EVENT = 'WS_HEADER_LOGOUT_EVENT';

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
        tokenInfoUrl: '',
        clientId: null,
        availableLanguages: ['de', 'en'],
        userName: null,
        userEmail: null,
        userUID: null
      };
      _this.state.lang = _this.getLanguage(_this.state);
      _this.eventListenersCallback = {
        login: function login() {
          return _this.login();
        },
        logout: function logout() {
          return _this.logout();
        }
      };
      return _this;
    }

    _createClass(WSHeader, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        this.attachEventListeners();

        (0, _authentication.getUserData)(this.props.userServiceUrl, this.props.tokenInfoUrl, urlAtStart).then(function (_ref) {
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
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.detachEventListeners();
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
      key: 'attachEventListeners',
      value: function attachEventListeners() {
        window.addEventListener(LOGOUT_EVENT, this.eventListenersCallback.logout);
        window.addEventListener(LOGIN_EVENT, this.eventListenersCallback.login);
      }
    }, {
      key: 'detachEventListeners',
      value: function detachEventListeners() {
        window.removeEventListener(LOGOUT_EVENT, this.eventListenersCallback.logout);
        window.removeEventListener(LOGIN_EVENT, this.eventListenersCallback.login);
      }
    }, {
      key: 'login',
      value: function login() {
        if (!this.state.loggedIn) {
          (0, _authentication.login)(this.props.clientId, this.props.redirectUrl);
        }
      }
    }, {
      key: 'logout',
      value: function logout() {
        if (this.state.loggedIn) {
          (0, _authentication.logout)();
          this.propagateLoginStatusChange(false);
          this.setState({
            loggedIn: false,
            userName: null,
            userEmail: null,
            userUID: null
          });
        }
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
                this.props.logoUrl && _imports.React.createElement('img', { className: 'logo', alt: this.props.title + '_logo', src: this.props.logoUrl }),
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
                  this.state.isLoggedIn && this.state.userName && _imports.React.createElement(
                    'ul',
                    null,
                    this.props.links && this.props.links.map(function (link, index) {
                      return _imports.React.createElement(_wsHeaderNavLink2.default, { link: link, key: index });
                    })
                  ),
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
                          return _this3.logout();
                        } },
                      _imports.React.createElement(
                        'span',
                        { id: 'userName' },
                        this.state.userName
                      ),
                      _imports.React.createElement(
                        'a',
                        { className: 'auto-size', id: 'logOutButton', type: 'button' },
                        _imports.React.createElement('span', { className: 'icon icon-close' })
                      )
                    ) : _imports.React.createElement(
                      'a',
                      { className: 'auto-size', onClick: function onClick() {
                          return _this3.login();
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
});