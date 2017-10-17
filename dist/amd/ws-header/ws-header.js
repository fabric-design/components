define(['exports', '../imports', './storage/cookie-storage', './storage/local-storage', './authorization', '../ws-dropdown/ws-dropdown'], function (exports, _imports, _cookieStorage, _localStorage, _authorization, _wsDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WSHeader = undefined;

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

  var WSHeader = exports.WSHeader = function (_Component) {
    _inherits(WSHeader, _Component);

    _createClass(WSHeader, null, [{
      key: 'setStorageType',
      value: function setStorageType(type, name) {
        if (type === 'cookie') {
          this.storage = new _cookieStorage.CookieStorage(name);
        } else {
          this.storage = new _localStorage.LocalStorage(name);
        }
      }
    }, {
      key: 'getAccessToken',
      value: function getAccessToken() {
        var _this2 = this;

        var queryString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : location.hash.substr(1);

        return new Promise(function (resolve) {
          var authorization = new _authorization.Authorization(_this2.storage);
          authorization.onAccessTokenChange(function (accessToken) {
            return resolve(accessToken);
          });
          authorization.tryFetchToken(queryString);
        });
      }
    }, {
      key: 'getLocale',
      value: function getLocale() {
        var locale = WSHeader.storage.get('locale') || window.navigator.language.replace(/([a-z]+)-.*/, '$1');
        if (['de', 'en'].indexOf(locale) === -1) {
          return 'en';
        }
        return locale;
      }
    }]);

    function WSHeader(props) {
      _classCallCheck(this, WSHeader);

      var _this = _possibleConstructorReturn(this, (WSHeader.__proto__ || Object.getPrototypeOf(WSHeader)).call(this, props));

      _this.initState();
      _this.initAuthorization(props);
      _this.mounted = false;
      _this.locales = [{ label: 'German', value: 'de' }, { label: 'English', value: 'en' }];
      _this.subMenus = [];
      _this.menuItems = [];
      _this.level2 = null;
      return _this;
    }

    _createClass(WSHeader, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.mounted = true;
      }
    }, {
      key: 'setLocale',
      value: function setLocale(newLocale) {
        this.setState({ locale: newLocale });
        WSHeader.storage.set('locale', newLocale);
        this.dispatchEvent('ws-locale-changed', newLocale);

        if (typeof this.props.onLocaleChange === 'function') {
          this.props.onLocaleChange(newLocale);
        }
      }
    }, {
      key: 'initState',
      value: function initState() {
        this.state = {
          isLoggedIn: false,
          locale: WSHeader.getLocale()
        };
      }
    }, {
      key: 'initAuthorization',
      value: function initAuthorization(props) {
        var _this3 = this;

        this.authorization = new _authorization.Authorization(WSHeader.storage, props.loginUrl, props.clientId, props.businessPartnerId);

        this.authorization.onAccessTokenChange(function (accessToken) {
          if (_this3.mounted) {
            _this3.setState({ isLoggedIn: !!accessToken });
          } else {
            _this3.state.isLoggedIn = !!accessToken;
          }

          _this3.dispatchEvent('ws-auth-changed', accessToken);
        });

        this.authorization.tryFetchToken(location.hash.substr(1));

        window.addEventListener('ws-authorize', function () {
          _this3.authorization.authorize();
        });

        window.addEventListener('ws-unauthorize', function () {
          _this3.authorization.unauthorize();
        });
      }
    }, {
      key: 'enterMenuItem',
      value: function enterMenuItem(index) {
        clearInterval(this.leaveTimeout);
        this.subMenus.forEach(function (subMenu) {
          return subMenu.classList.remove('is-active');
        });
        this.menuItems.forEach(function (item) {
          return item.classList.remove('is-hovered');
        });

        if (this.subMenus[index]) {
          this.level2.classList.add('is-active');
          var subMenu = this.subMenus[index];
          subMenu.classList.add('is-active');
          var item = this.menuItems[index];
          item.classList.add('is-hovered');
        } else {
          this.leaveLevel2();
        }
      }
    }, {
      key: 'leaveMenuItem',
      value: function leaveMenuItem(index) {
        var _this4 = this;

        this.leaveTimeout = setTimeout(function () {
          _this4.level2.classList.remove('is-active');
          if (_this4.subMenus[index]) {
            var subMenu = _this4.subMenus[index];
            subMenu.classList.remove('is-active');
            var item = _this4.menuItems[index];
            item.classList.remove('is-hovered');
          }
        }, 10);
      }
    }, {
      key: 'enterLevel2',
      value: function enterLevel2() {
        clearInterval(this.leaveTimeout);
      }
    }, {
      key: 'leaveLevel2',
      value: function leaveLevel2() {
        this.subMenus.forEach(function (subMenu) {
          return subMenu.classList.remove('is-active');
        });
        this.menuItems.forEach(function (item) {
          return item.classList.remove('is-hovered');
        });
        this.level2.classList.remove('is-active');
      }
    }, {
      key: 'render',
      value: function render() {
        var _this5 = this;

        return _imports.React.createElement(
          'header',
          { className: 'ws-header', ref: function ref(element) {
              _this5.element = element;
            } },
          _imports.React.createElement(
            'div',
            { className: 'level-1' },
            _imports.React.createElement(
              'div',
              { className: 'application-name' },
              this.props.appLogo && _imports.React.createElement(
                'figure',
                { className: 'application-logo' },
                _imports.React.createElement('img', { src: this.props.appLogo, alt: 'Application logo' })
              ),
              this.props.appName
            ),
            _imports.React.createElement(
              'nav',
              { className: 'main-menu' },
              _imports.React.createElement(
                'ul',
                null,
                this.props.links.map(function (link, index) {
                  return _imports.React.createElement(
                    'li',
                    {
                      key: 'header-link' + index,
                      onMouseEnter: function onMouseEnter() {
                        return _this5.enterMenuItem(index);
                      },
                      onMouseLeave: function onMouseLeave() {
                        return _this5.leaveMenuItem(index);
                      },
                      ref: function ref(element) {
                        _this5.menuItems[index] = element;
                      }
                    },
                    _imports.React.createElement(
                      'a',
                      { href: link.href, onClick: function onClick(event) {
                          if (link.onClick) link.onClick(event);
                        } },
                      link.label
                    )
                  );
                })
              )
            ),
            _imports.React.createElement(
              'nav',
              { className: 'menu-controls' },
              _imports.React.createElement(
                'ul',
                null,
                _imports.React.createElement(
                  'li',
                  null,
                  _imports.React.createElement(_wsDropdown.WSDropdown, {
                    className: 'locale',
                    icon: 'icon24 icon-sort-down',
                    items: this.locales,
                    text: this.state.locale,
                    onChange: function onChange(item) {
                      return _this5.setLocale(item.value);
                    },
                    orientation: 'right',
                    type: 'anchor'
                  })
                ),
                !this.state.isLoggedIn ? _imports.React.createElement(
                  'li',
                  { onClick: function onClick() {
                      return _this5.authorization.authorize();
                    } },
                  _imports.React.createElement(
                    'a',
                    null,
                    'Login'
                  )
                ) : _imports.React.createElement(
                  'li',
                  { onClick: function onClick() {
                      return _this5.authorization.unauthorize();
                    } },
                  _imports.React.createElement(
                    'a',
                    null,
                    _imports.React.createElement('span', { className: 'icon icon24 icon-power' })
                  )
                )
              )
            )
          ),
          _imports.React.createElement(
            'div',
            {
              className: 'level-2',
              onMouseEnter: function onMouseEnter() {
                return _this5.enterLevel2();
              },
              onMouseLeave: function onMouseLeave() {
                return _this5.leaveLevel2();
              },
              ref: function ref(element) {
                _this5.level2 = element;
              }
            },
            this.props.links.map(function (parent, index) {
              return parent.children && parent.children.length && _imports.React.createElement(
                'ul',
                { className: 'main-sub-menu', key: 'sub-menu' + index, ref: function ref(element) {
                    _this5.subMenus[index] = element;
                  } },
                parent.children.map(function (child, childIndex) {
                  return _imports.React.createElement(
                    'li',
                    { key: 'sub-link-' + index + '-' + childIndex },
                    _imports.React.createElement(
                      'a',
                      { href: child.href, onClick: function onClick(event) {
                          if (child.onClick) child.onClick(event);
                        } },
                      child.label
                    )
                  );
                })
              );
            })
          )
        );
      }
    }]);

    return WSHeader;
  }(_imports.Component);

  Object.defineProperty(WSHeader, 'storage', {
    enumerable: true,
    writable: true,
    value: new _localStorage.LocalStorage()
  });
  Object.defineProperty(WSHeader, 'defaultProps', {
    enumerable: true,
    writable: true,
    value: {
      loginUrl: 'https://identity.zalando.com/oauth2/authorize',
      businessPartnerId: '810d1d00-4312-43e5-bd31-d8373fdd24c7',
      clientId: null,
      links: [],
      appName: 'Zalando',
      appLogo: null,
      onLocaleChange: function onLocaleChange() {},
      onAuthChange: function onAuthChange() {}
    }
  });
  Object.defineProperty(WSHeader, 'propTypes', {
    enumerable: true,
    writable: true,
    value: {
      loginUrl: _imports.PropTypes.string,
      businessPartnerId: _imports.PropTypes.string,
      clientId: _imports.PropTypes.string,
      links: _imports.PropTypes.array,
      appName: _imports.PropTypes.string,
      appLogo: _imports.PropTypes.string,
      onLocaleChange: _imports.PropTypes.func,
      onAuthChange: _imports.PropTypes.func
    }
  });
});