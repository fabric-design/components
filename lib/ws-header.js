'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _wsHeaderNavLink = require('./ws-header-nav-link');

var _wsHeaderNavLink2 = _interopRequireDefault(_wsHeaderNavLink);

require('./ws-header.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var urlAtStart = window.location.href;

var WSHeader = function (_Component) {
	_inherits(WSHeader, _Component);

	function WSHeader() {
		_classCallCheck(this, WSHeader);

		var _this = _possibleConstructorReturn(this, (WSHeader.__proto__ || Object.getPrototypeOf(WSHeader)).call(this));

		_this.state = {
			availableLanguages: ['de', 'en'],
			tokenName: 'zalando-internal-access_token',
			stateName: 'zalando-internal-access_state',
			languageName: 'language',
			cookiePath: '/',
			cookieDomain: '.zalan.do',
			lang: null,
			loggedIn: null,
			clientId: null,
			redirectUrl: null,
			userServiceUrl: null,
			tokenInfoUrl: null,
			userUID: null,
			userName: null
		};
		return _this;
	}

	_createClass(WSHeader, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.setState({
				userServiceUrl: this.props.userServiceUrl,
				tokenInfoUrl: this.props.tokenInfoUrl,
				clientId: this.props.clientId
			});

			var lang = this.getLanguage();
			this.setLanguage(lang);

			this.checkIsLoggedIn().then(function () {
				return _this2.getUser();
			}).catch(function (err) {
				var message = 'Getting Token-/User-Info failed!';
				if (err) {
					message += ' ' + err.toString();
				}
				_this2.propagateError(message);
			});
		}
	}, {
		key: 'propagateError',
		value: function propagateError(reason) {
			this.props.onError(reason);
		}
	}, {
		key: 'getLanguage',
		value: function getLanguage() {
			return this.state.lang || window.localStorage.getItem(this.state.languageName) || this.state.availableLanguages[0];
		}
	}, {
		key: 'setLanguage',
		value: function setLanguage(lang) {
			if (this.state.lang !== lang) {
				this.setState({ lang: lang });
				window.localStorage.setItem(this.state.languageName, lang);
				this.propagateLanguageChange(lang);
			}
		}
	}, {
		key: 'propagateLanguageChange',
		value: function propagateLanguageChange(lang) {
			this.props.onLanguageChange(lang);
		}
	}, {
		key: 'login',
		value: function login() {
			var url = 'https://auth.zalando.com/z/oauth2/authorize?realm=/employees&response_type=token&scope=uid' + '&client_id=' + this.state.clientId + '&redirect_uri=' + this.state.redirectUrl + '&state=' + this.setSessionState();

			window.location.href = url;
		}
	}, {
		key: 'logout',
		value: function logout() {
			this.removeCookie();
			this.setState({ loggedIn: false });
			this.propagateLoginStatusChange(false);
		}
	}, {
		key: 'checkIsLoggedIn',
		value: function checkIsLoggedIn() {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				_this3.getToken(urlAtStart).then(function (token) {
					// checking that token is still valid
					_this3.getTokenInfo().then(function () {
						_this3.propagateLoginStatusChange(true, token);
						resolve();
					}, function (err) {
						_this3.logout();
						reject(err);
					});
				}, function (err) {
					_this3.logout();
					reject(err);
				});
			});
		}
	}, {
		key: 'propagateLoginStatusChange',
		value: function propagateLoginStatusChange(isLoggedIn, token) {
			if (this.state.loggedIn !== isLoggedIn) {
				this.setState({ loggedIn: isLoggedIn });

				this.props.onLoginChange(isLoggedIn, token);
			}
		}
	}, {
		key: 'setSessionState',
		value: function setSessionState() {
			// create new state guid
			var state = this.guid();

			// save the state to check for it on return
			window.localStorage.setItem(this.state.stateName, state);
			return state;
		}
	}, {
		key: 'checkSessionState',
		value: function checkSessionState(state) {
			var valid = window.localStorage.getItem(this.state.stateName) === state;
			window.localStorage.removeItem(this.state.stateName);
			return valid;
		}
	}, {
		key: 'getToken',
		value: function getToken(url) {
			var _this4 = this;

			if (!url) {
				url = window.location.href;
			}
			return new Promise(function (resolve, reject) {
				var token = _this4.getTokenFromUrl(url);
				if (token) {
					var sessionState = _this4.getStateFromUrl(url);
					if (_this4.checkSessionState(sessionState)) {
						_this4.setCookie(token);
						return resolve(token);
					}
				}
				token = _this4.getCookieValue(_this4.state.tokenName);
				if (token) {
					return resolve(token);
				}

				reject();
			});
		}
	}, {
		key: 'getTokenFromUrl',
		value: function getTokenFromUrl(url) {
			var urlQueryTokenPart = /access_token=([^&]+)/.exec(url);
			return urlQueryTokenPart != null ? urlQueryTokenPart[1] : null;
		}
	}, {
		key: 'getStateFromUrl',
		value: function getStateFromUrl(url) {
			var urlQueryStatePart = /state=([^&]+)/.exec(url);
			return urlQueryStatePart[1];
		}
	}, {
		key: 'getTokenInfo',
		value: function getTokenInfo() {
			var _this5 = this;

			return new Promise(function (resolve, reject) {
				_this5.request('GET', _this5.state.tokenInfoUrl).then(function (data) {
					_this5.state = Object.assign({}, _this5.state, {
						userUID: data.uid
					});
					resolve(data.uid);
				}, function (err) {
					_this5.logout();
					reject(err);
				});
			});
		}
	}, {
		key: 'getUser',
		value: function getUser() {
			var _this6 = this;

			return new Promise(function (resolve, reject) {
				_this6.request('GET', _this6.state.userServiceUrl + '/' + _this6.state.userUID).then(function (_ref) {
					var _ref2 = _slicedToArray(_ref, 1),
					    user = _ref2[0];

					if (!user) {
						reject();
					}
					_this6.setState({
						userName: user.name,
						userEmail: user.email
					});

					resolve();
				}, function (err) {
					_this6.logout();
					reject(err);
				});
			});
		}
	}, {
		key: 'setCookie',
		value: function setCookie(token) {
			var now = new Date();
			now.setTime(now.getTime() + 60 * 60 * 1000); // in milliseconds
			// setting domain does not work for dev localhost environment
			if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
				document.cookie = this.state.tokenName + '=' + token + ';path=' + this.state.cookiePath + ';expires=' + now.toGMTString() + ';';
			} else {
				document.cookie = this.state.tokenName + '=' + token + ';path=' + this.state.cookiePath + ';domain=' + this.state.cookieDomain + ';expires=' + now.toGMTString() + ';';
			}
		}
	}, {
		key: 'removeCookie',
		value: function removeCookie() {
			if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
				document.cookie = this.state.tokenName + '=;path=' + this.state.cookiePath + ';expires=' + new Date(0).toGMTString() + ';';
			} else {
				document.cookie = this.state.tokenName + '=;path=' + this.state.cookiePath + ';domain=' + this.state.cookieDomain + ';expires=' + new Date(0).toGMTString() + ';';
			}
		}

		// HELPERS

		// matches a cookie name in the cookie string and returns the last value

	}, {
		key: 'getCookieValue',
		value: function getCookieValue(a) {
			var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
			return b ? b.pop() : '';
		}
	}, {
		key: 'guid',
		value: function guid() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			}
			return '' + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		}

		// Method: 'GET', 'POST'

	}, {
		key: 'request',
		value: function request(method, url) {
			var _this7 = this;

			var headers = new Headers();
			return this.getToken(urlAtStart).then(function (token) {
				headers.append('Authorization', 'Bearer ' + token);
				return Promise.resolve();
			}).then(function () {
				return fetch(url, {
					method: method,
					headers: headers,
					mode: 'cors',
					cache: 'default'
				}).then(_this7.checkStatus).then(function (response) {
					return response.json();
				});
			});
		}
	}, {
		key: 'checkStatus',
		value: function checkStatus(response) {
			if (response.status >= 200 && response.status < 300) {
				return response;
			} else {
				var error = new Error(response.statusText);
				error.response = response;
				throw error;
			}
		}
	}, {
		key: 'render',
		value: function render(_ref3, _ref4) {
			var _this8 = this;

			var children = _ref3.children;
			var lang = _ref4.lang,
			    loggedIn = _ref4.loggedIn;

			return (0, _preact.h)(
				'div',
				{ 'class': 'refills-patterns refills-components' },
				(0, _preact.h)(
					'header',
					{ 'class': 'navigation', role: 'banner' },
					(0, _preact.h)(
						'div',
						{ 'class': 'navigation-wrapper' },
						children.filter(function (elem) {
							return elem.classList.contains('logo');
						}),
						(0, _preact.h)(
							'a',
							{ href: 'javascript:void(0)', 'class': 'navigation-menu-button', id: 'js-mobile-menu' },
							'MENU'
						),
						(0, _preact.h)(
							'nav',
							{ role: 'navigation' },
							(0, _preact.h)(
								'ul',
								{ id: 'js-navigation-menu', 'class': 'navigation-menu show' },
								children.filter(function (elem) {
									return elem.classList.contains('nav-link');
								}),
								(0, _preact.h)(
									'li',
									{ 'class': 'nav-link more dropdown-menu' },
									(0, _preact.h)(
										'a',
										{ href: 'javascript:void(0)' },
										(0, _preact.h)('span', { id: 'selectedLanguageFlag', 'class': 'flag flag-{lang}' }),
										(0, _preact.h)(
											'span',
											{ id: 'selectedLanguage' },
											lang
										)
									),
									(0, _preact.h)(
										'ul',
										{ 'class': 'submenu', id: 'languages' },
										this.state.availableLanguages.map(function (lang) {
											return (0, _preact.h)(
												'li',
												{ onclick: _this8.setLanguage.bind(_this8, lang) },
												(0, _preact.h)(
													'a',
													null,
													(0, _preact.h)('span', { 'class': 'flag flag-${lang}' }),
													' ',
													(0, _preact.h)(
														'span',
														{ translate: 'global.language.{{lang}}' },
														lang
													)
												)
											);
										})
									)
								),
								(0, _preact.h)(
									'li',
									{ 'class': 'nav-link', id: 'loggedInInfo' },
									loggedIn ? (0, _preact.h)(
										'a',
										{ 'class': 'auto-size' },
										(0, _preact.h)(
											'span',
											{ translate: 'global.menu.signein' },
											'Login'
										)
									) : (0, _preact.h)(
										'div',
										null,
										(0, _preact.h)('span', { translate: 'global.menu.signedinas' }),
										(0, _preact.h)(
											'span',
											{ id: 'userName' },
											'Loading...'
										),
										(0, _preact.h)(
											'a',
											{ 'class': 'auto-size', id: 'logOutButton', type: 'button' },
											(0, _preact.h)('div', { id: 'logOutIcon' })
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
}(_preact.Component);

exports.default = WSHeader;