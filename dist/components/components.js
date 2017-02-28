(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define("wholesale-components", ["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["wholesale-components"] = factory(require("react"), require("react-dom"));
	else
		root["wholesale-components"] = factory(root["react"], root["react-dom"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = exports.PureComponent = exports.Component = exports.React = undefined;

var _react = __webpack_require__(9);

var _React_ = _interopRequireWildcard(_react);

var _reactDom = __webpack_require__(10);

var ReactDOM = _interopRequireWildcard(_reactDom);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// API shared by Preact and React
var React = exports.React = {
  createElement: _React_.createElement || _React_.h
};
var Component = exports.Component = _React_.Component;
var PureComponent = exports.PureComponent = _React_.PureComponent || _React_.Component;
var render = exports.render = ReactDOM.render;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imports = __webpack_require__(0);

var _wsHeaderNavLink = __webpack_require__(3);

var _wsHeaderNavLink2 = _interopRequireDefault(_wsHeaderNavLink);

var _authentication = __webpack_require__(2);

__webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var AVAILABLE_LANGUAGES = ['de', 'en'];
var LANGUAGE_STORAGE_ID = 'ws-language';

var WSHeader = function (_Component) {
  _inherits(WSHeader, _Component);

  function WSHeader() {
    _classCallCheck(this, WSHeader);

    var _this = _possibleConstructorReturn(this, (WSHeader.__proto__ || Object.getPrototypeOf(WSHeader)).call(this));

    _this.state = {
      lang: null,
      loggedIn: null,
      userName: null,
      userEmail: null
    };
    _this.state.lang = _this.getLanguage(_this.state);
    return _this;
  }

  _createClass(WSHeader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      (0, _authentication.checkIsLoggedIn)(this.props.tokenInfoUrl, this.props.userServiceUrl).then(function (_ref) {
        var userName = _ref.userName,
            userEmail = _ref.userEmail,
            token = _ref.token;

        _this2.setState({ userName: userName, userEmail: userEmail });
        _this2.propagateLoginStatusChange(true, token);
      }, function () {
        _this2.propagateLoginStatusChange(false);
      });
    }
  }, {
    key: 'getLanguage',
    value: function getLanguage() {
      return window.localStorage.getItem(LANGUAGE_STORAGE_ID) || AVAILABLE_LANGUAGES[0];
    }
  }, {
    key: 'setLanguage',
    value: function setLanguage(lang) {
      if (lang !== this.state.lang) {
        this.setState({ lang: lang });
        // persist
        window.localStorage.setItem(LANGUAGE_STORAGE_ID, lang);
        this.props.setLang && this.props.setLang(lang);
      }
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
    key: 'login',
    value: function login() {
      (0, _authentication.login)(this.props.clientId, this.props.redirectUrl);
    }
  }, {
    key: 'logout',
    value: function logout() {
      (0, _authentication.logout)();
      this.propagateLoginStatusChange(false);
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
                    AVAILABLE_LANGUAGES.map(function (lang) {
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
                      _imports.React.createElement('i', { className: 'icon icon-close' })
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

exports.default = WSHeader;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.logout = logout;
exports.checkIsLoggedIn = checkIsLoggedIn;
var urlAtStart = window.location.href;
var AUTH_SERVICE_URL = 'https://auth.zalando.com/z/oauth2/authorize?realm=/employees&response_type=token&scope=uid';
var SESSION_TOKEN_NAME = 'session_token';
var SESSION_STATE_NAME = 'session_state';
var COOKIE_PATH = '/';
var COOKIE_DOMAIN = '.zalan.do';

function login(clientId, redirectUrl) {
  var url = AUTH_SERVICE_URL + '\n    &client_id=' + clientId + '\n    &redirect_uri=' + redirectUrl + '\n    &state=' + setSessionState();

  window.location.href = url;
}

function logout() {
  removeCookie();
}

function checkIsLoggedIn(tokenInfoUrl, userServiceUrl) {
  return new Promise(function (resolve, reject) {
    function failureListener() {
      logout();
      reject();
    }
    function successListener(tokenServiceResponseText) {
      var _JSON$parse = JSON.parse(tokenServiceResponseText),
          uid = _JSON$parse.uid,
          accessToken = _JSON$parse.access_token;

      function userServiceSuccess(userServiceResponseText) {
        var user = JSON.parse(userServiceResponseText);
        resolve({
          userName: user.name,
          userEmail: user.email,
          token: accessToken
        });
      }

      if (uid) {
        var requestUserServiceUrl = new XMLHttpRequest();
        requestUserServiceUrl.onload = userServiceSuccess;
        requestUserServiceUrl.onerror = failureListener;
        if (process.env.NODE_ENV !== 'dev') {
          requestUserServiceUrl.open('get', userServiceUrl + '/' + uid, true);
        } else {
          requestUserServiceUrl.open('get', '' + userServiceUrl, true);
        }
        requestUserServiceUrl.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        requestUserServiceUrl.send();
        return true;
      }
      return false;
    }

    var token = getToken(urlAtStart);
    if (!token) {
      return failureListener();
    }
    requestTokenInfo(token, tokenInfoUrl, successListener, failureListener);
    return true;
  });
}

function requestTokenInfo(token, tokenInfoUrl, successListener, failureListener) {
  var request = new XMLHttpRequest();
  request.onload = successListener;
  request.onerror = failureListener;
  request.open('get', tokenInfoUrl, true);
  request.setRequestHeader('Authorization', 'Bearer ' + token.split('?')[0]);
  request.send();
}

function getTokenFromUrl(url) {
  var urlQueryTokenPart = /access_token=([^&]+)/.exec(url);
  return urlQueryTokenPart != null ? urlQueryTokenPart[1] : null;
}

function getToken(orgUrl) {
  var url = orgUrl;

  if (!url) {
    url = window.location.href;
  }
  var token = getTokenFromUrl(url);
  if (token) {
    var sessionState = getStateFromUrl(url);
    if (checkSessionState(sessionState)) {
      setCookie(token);
      return token;
    }
  }
  token = getCookieValue(SESSION_TOKEN_NAME);
  if (token) {
    return token;
  }
  return null;
}

function getCookieValue(a) {
  var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

function setCookie(token) {
  if (process.env.NODE_ENV !== 'dev') {
    document.cookie = SESSION_TOKEN_NAME + '=' + token + ';path=' + COOKIE_PATH + ';domain=' + COOKIE_DOMAIN + ';';
  } else {
    document.cookie = SESSION_TOKEN_NAME + '=' + token + ';path=' + COOKIE_PATH + ';';
  }
}

function removeCookie() {
  if (process.env.NODE_ENV !== 'dev') {
    document.cookie = SESSION_TOKEN_NAME + '=;path=' + COOKIE_PATH + ';domain=' + COOKIE_DOMAIN + ';expires=Thu, 01 Jan 1970 00:00:01 GMT";';
  } else {
    document.cookie = SESSION_TOKEN_NAME + '=;path=' + COOKIE_PATH + ';expires=Thu, 01 Jan 1970 00:00:01 GMT";';
  }
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

function checkSessionState(state) {
  var stateObj = JSON.parse(decodeURIComponent(state));
  var valid = window.localStorage.getItem(SESSION_STATE_NAME) === stateObj.state;
  window.location.hash = stateObj.hash;
  window.localStorage.removeItem(SESSION_STATE_NAME);
  return valid;
}

function getStateFromUrl(url) {
  var urlQueryStatePart = /state=([^&]+)/.exec(url);
  return urlQueryStatePart[1];
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imports = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WSHeaderNavLink = function (_Component) {
  _inherits(WSHeaderNavLink, _Component);

  function WSHeaderNavLink() {
    _classCallCheck(this, WSHeaderNavLink);

    return _possibleConstructorReturn(this, (WSHeaderNavLink.__proto__ || Object.getPrototypeOf(WSHeaderNavLink)).apply(this, arguments));
  }

  _createClass(WSHeaderNavLink, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _imports.React.createElement(
        "li",
        { className: "nav-link", key: this.props.key, onClick: function onClick() {
            return _this2.props.link.onclick && _this2.props.link.onclick();
          } },
        _imports.React.createElement(
          "a",
          null,
          this.props.link.label
        )
      );
    }
  }]);

  return WSHeaderNavLink;
}(_imports.Component);

exports.default = WSHeaderNavLink;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n/**\n * Parse a numeric value from a string\n */\n/**\n * Convert a pixel value to rem\n */\n/**\n * Convert a list of pixel values to rem values\n */\n/**\n* Z-index function for managing the values\n*/\n.flag {\n  display: inline-block;\n  width: 16px;\n  height: 11px;\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAWCAYAAAChWZ5EAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADuUlEQVRIibWVXWjWdRTHP/9nz6KYVG5Ggk4x3NLCUS41bEtZvlCkqwulUClNHNJFgUTtIswmUQoaEolgoxvR0JQIJS8ctCE6kprLlyYbilFT2sqs+f+9ntPF88wRCF38nw4czuH3wvmcL/zOL1FVstiyZYuUmIIIlOVxQXA+oOIB+c/7+UzVAe9TNm16GwARQUSIMRDjaAyEUHTvCTEQgsd7z+HDB7MD5HI5AE539xYKhID3Hucczjqss1g75sYYrDE0v9AElECBauB+EaqLxYNzBO/x1uKtxTmHNwZnDdZafGqwzjIx+NIAvOQt9TFS7z3qHDoarUWtRYxFrCnmBk0t4gzlPpAvBYB6h8YIzqHOo9agziG3AYrFrUXS9DaUeoeWBAAghn937RxqDGLMGEiaos4SjS2cjZ5YCgA/H6hVtEzQKIgXxMfbuQYtRohe0QDiFX0iwXSVQoE60MmCjo+IFFwlIjGgIoiEwvOMEYlaXAOtSpDFJQDAgQYP5bPJ4UgkouJIJIB6VCIqHpWAakQ1oBrABXIjkGSdhEd2PqZ3RxAHWgY2Lcw/vRdyBiSCK4PoCnl5DsQAZXDTQbJrT4fWNtTR1XmJ60MAkSiRd1bP4twHn6AxMuvdN3hzRzfqc4zcMlTX3ENTzzEuP7+SrevmJ1kayFfeN46l/R0saVnBwM8jnPphkKgJNdMqqX28ApxFp1Xy7NxqfIg0PFrFnM49cGgbu45ezKQeQK6jP+XExEUk+w8w/Uo3a5qnMzhoSRLg7AD09pMkcHVYaSnvp67rAMlbbXz+ZR8fvX86OwDAL4N/sHmojqvxIWLbe7RufKSwm/4FaQrA9su7qVjSQN+L62h67gDnfrqJsTYzAH0Dwyqid7YVK1SXL7/jlojqmQvXVVXJ4vkft35M7ewKONsP3oNzY1EEtZawcGFhvHqPOAcxkp8xieNn/qb+ysn/UYHGRg1znxztWVVVY4waYlAfgnafv5ZZgdyGLSfZ0d7DqpbjnL9wA34fxq1/FQAdKXweBVN+faaJzr3fMHlKOy+v/5p5T7dl6x7IGRN4sOou9u1ZytRDO/nzs3ZeG98CUPhInANVnlq4nwknOpiTXKNncSd1c6aChOwAq9fUsKp5BubDVnoXrGHLrXlUjouoQjJzEsnMiagq1Q9XsvqVQ3TNbOSBvXvZ+N1mXl/bmBkgP/jbMJ8u2cCRmgV8v+9bfEgJMbJ2ZQ3HTt1AQ2DpxSG++OoESOTg0U4mTBlP6/ZtXGrdDazKBPAP38BUStCEE90AAAAASUVORK5CYII=\");\n  background-position: 0 0;\n  background-repeat: no-repeat; }\n  .flag.flag-de {\n    background-position: -16px 0; }\n  .flag.flag-en {\n    background-position: 0 -11px; }\n\nheader.navigation {\n  background-color: #333;\n  border-bottom: 1px solid #1a1a1a;\n  min-height: 60px;\n  width: 100%;\n  z-index: 999; }\n  header.navigation .navigation-wrapper {\n    max-width: 1200px;\n    margin-left: auto;\n    margin-right: auto;\n    position: relative;\n    z-index: 9999; }\n    header.navigation .navigation-wrapper::after {\n      clear: both;\n      content: \"\";\n      display: block; }\n    header.navigation .navigation-wrapper::after {\n      clear: both;\n      content: \"\";\n      display: block; }\n  header.navigation .logo {\n    float: left;\n    max-height: 60px;\n    padding-left: 1em;\n    padding-right: 2em; }\n    header.navigation .logo img {\n      max-height: 60px;\n      padding: 0.8em 0; }\n  header.navigation .navigation-menu-button {\n    color: rgba(255, 255, 255, 0.7);\n    display: block;\n    float: right;\n    line-height: 60px;\n    margin: 0;\n    padding-right: 1em;\n    text-decoration: none;\n    text-transform: uppercase; }\n    @media screen and (min-width: 53.75em) {\n      header.navigation .navigation-menu-button {\n        display: none; } }\n    header.navigation .navigation-menu-button:focus, header.navigation .navigation-menu-button:hover {\n      color: white; }\n  header.navigation nav {\n    float: none;\n    min-height: 60px;\n    z-index: 9999999; }\n    @media screen and (min-width: 53.75em) {\n      header.navigation nav {\n        float: left; } }\n  header.navigation ul.navigation-menu {\n    clear: both;\n    display: none;\n    margin: 0 auto;\n    overflow: visible;\n    padding: 0;\n    width: 100%;\n    z-index: 9999; }\n    header.navigation ul.navigation-menu.show {\n      display: block; }\n    @media screen and (min-width: 53.75em) {\n      header.navigation ul.navigation-menu {\n        display: inline;\n        margin: 0;\n        padding: 0; } }\n  header.navigation ul li.nav-link {\n    background: #333;\n    display: block;\n    line-height: 60px;\n    overflow: hidden;\n    padding-right: 0.8em;\n    text-align: right;\n    width: 100%;\n    z-index: 9999;\n    cursor: pointer;\n    color: rgba(255, 255, 255, 0.7); }\n    header.navigation ul li.nav-link:hover {\n      color: white; }\n    @media screen and (min-width: 53.75em) {\n      header.navigation ul li.nav-link {\n        background: transparent;\n        display: inline;\n        line-height: 60px;\n        text-decoration: none;\n        width: auto; } }\n    header.navigation ul li.nav-link a {\n      color: rgba(255, 255, 255, 0.7);\n      display: inline-block;\n      text-decoration: none;\n      box-sizing: content-box; }\n      @media screen and (min-width: 53.75em) {\n        header.navigation ul li.nav-link a {\n          padding-right: 1em; } }\n      header.navigation ul li.nav-link a:focus, header.navigation ul li.nav-link a:hover {\n        color: white; }\n      header.navigation ul li.nav-link a:after {\n        position: relative !important; }\n  header.navigation .active-nav-item a {\n    border-bottom: 1px solid rgba(255, 255, 255, 0.5);\n    padding-bottom: 3px; }\n  header.navigation li.more.nav-link {\n    padding-right: 0; }\n    @media screen and (min-width: 53.75em) {\n      header.navigation li.more.nav-link {\n        padding-right: 1em; } }\n    header.navigation li.more.nav-link > ul > li:first-child a {\n      padding-top: 1em; }\n    header.navigation li.more.nav-link a {\n      margin-right: 1em; }\n    header.navigation li.more.nav-link > a {\n      padding-right: 0.6em; }\n    header.navigation li.more.nav-link > a:after {\n      position: absolute;\n      top: auto;\n      right: -0.4em;\n      bottom: auto;\n      left: auto;\n      content: '\\25BE';\n      color: rgba(255, 255, 255, 0.7); }\n  header.navigation li.more {\n    overflow: visible;\n    padding-right: 0; }\n    header.navigation li.more a {\n      padding-right: 0.8em; }\n    header.navigation li.more > a {\n      padding-right: 1.6em;\n      position: relative; }\n      @media screen and (min-width: 53.75em) {\n        header.navigation li.more > a {\n          margin-right: 1em; } }\n      header.navigation li.more > a:after {\n        content: '\\203A';\n        font-size: 1.2em;\n        position: absolute;\n        right: 0.5em; }\n    header.navigation li.more:focus > .submenu,\n    header.navigation li.more:hover > .submenu {\n      display: block; }\n    @media screen and (min-width: 53.75em) {\n      header.navigation li.more {\n        padding-right: 0.8em;\n        position: relative; } }\n  header.navigation .dropdown-menu .flag {\n    margin-top: 25px; }\n  header.navigation ul.submenu {\n    display: none;\n    padding-left: 0; }\n    @media screen and (min-width: 53.75em) {\n      header.navigation ul.submenu {\n        left: -1em;\n        position: absolute;\n        top: 1.5em; } }\n    @media screen and (min-width: 53.75em) {\n      header.navigation ul.submenu .submenu {\n        left: 11.8em;\n        top: 0; } }\n    header.navigation ul.submenu li {\n      display: block;\n      padding-right: 0; }\n      @media screen and (min-width: 53.75em) {\n        header.navigation ul.submenu li {\n          line-height: 46.15385px; }\n          header.navigation ul.submenu li:first-child > a {\n            border-top-left-radius: 3px;\n            border-top-right-radius: 3px; }\n          header.navigation ul.submenu li:last-child > a {\n            border-bottom-left-radius: 3px;\n            border-bottom-right-radius: 3px;\n            padding-bottom: 0.7em; } }\n      header.navigation ul.submenu li a {\n        background-color: #2b2b2b;\n        display: inline-block;\n        text-align: right;\n        width: 100%;\n        padding-top: 0em !important; }\n        @media screen and (min-width: 53.75em) {\n          header.navigation ul.submenu li a {\n            background-color: #333;\n            padding-left: 1em;\n            text-align: left;\n            width: 12em; } }\n  header.navigation .navigation-tools {\n    background: #505050;\n    clear: both;\n    display: block;\n    height: 60px; }\n    @media screen and (min-width: 53.75em) {\n      header.navigation .navigation-tools {\n        background: transparent;\n        clear: none;\n        float: right; } }\n  header.navigation #loggedInInfo a {\n    margin-right: 1em; }\n  header.navigation #loggedInInfo #logOutButton {\n    margin-left: 0.5em;\n    width: 1em;\n    height: 1em;\n    vertical-align: middle;\n    zoom: 1.5; }\n    header.navigation #loggedInInfo #logOutButton #logOutIcon {\n      height: 100%;\n      background-color: white;\n      mask-image: url('data:image/svg+xml;utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" enable-background=\"new 0 0 100 100\" xml:space=\"preserve\"><path d=\"M48.501,27.015c0,0.827,0.671,1.5,1.5,1.5h21.486v42.974H50.001c-0.829,0-1.5,0.672-1.5,1.5c0,0.829,0.671,1.5,1.5,1.5  h22.986c0.828,0,1.5-0.671,1.5-1.5V27.013c0-0.828-0.672-1.5-1.5-1.5H50.001C49.172,25.515,48.501,26.187,48.501,27.015z   M48.473,38.447c0,0.384,0.146,0.768,0.438,1.061l8.964,8.963h-30.86c-0.828,0-1.5,0.671-1.5,1.5c0,0.829,0.672,1.5,1.5,1.5h30.86  l-8.993,8.992c-0.293,0.293-0.439,0.677-0.439,1.062c0,0.383,0.146,0.768,0.439,1.061c0.585,0.586,1.536,0.586,2.121,0  l11.553-11.553c0.141-0.141,0.25-0.308,0.327-0.492c0.003-0.008,0.004-0.016,0.007-0.022c0.067-0.169,0.105-0.354,0.105-0.547  s-0.039-0.378-0.105-0.548c-0.003-0.007-0.004-0.015-0.007-0.021c-0.077-0.187-0.188-0.354-0.328-0.493L51.032,37.386  c-0.585-0.586-1.535-0.586-2.121,0C48.618,37.679,48.473,38.063,48.473,38.447z\"></path></svg>'); }\n\n::content .logo {\n  float: left;\n  max-height: 60px;\n  margin-left: 1em;\n  margin-right: 2em;\n  line-height: 60px;\n  padding-top: 0;\n  background-color: transparent;\n  color: #00abf2;\n  text-decoration: none;\n  transition: color .1s linear; }\n  ::content .logo img {\n    box-sizing: content-box;\n    padding: 1.2em 0;\n    height: 20px; }\n  ::content .logo > span {\n    display: block;\n    float: right;\n    margin-left: 10px; }\n  ::content .logo img {\n    padding: 1.2em 0; }\n\n::content li.nav-link {\n  background: transparent;\n  display: inline;\n  line-height: 60px;\n  text-decoration: none;\n  width: auto; }\n  ::content li.nav-link a {\n    padding-right: 1em;\n    color: rgba(255, 255, 255, 0.7);\n    display: inline-block;\n    text-decoration: none; }\n", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(7)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/lib/loader.js!./ws-header.scss", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/lib/loader.js!./ws-header.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wsHeader = __webpack_require__(1);

Object.defineProperty(exports, 'WSHeader', {
  enumerable: true,
  get: function get() {
    return _wsHeader.WSHeader;
  }
});

/***/ })
/******/ ]);
});