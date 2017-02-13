import {Component, createElement as h } from './preact';
import WSHeaderNavLink from './ws-header-nav-link';
let urlAtStart = window.location.href;

export default class WSHeader extends Component {
    constructor() {
        super();
        this.state = {
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
    }

	componentDidMount() {
		// this.setState({
		// 	userServiceUrl: this.props.userServiceUrl,
		// 	tokenInfoUrl: this.props.tokenInfoUrl,
		// 	clientId: this.props.clientId
		// });

		// let lang = this.getLanguage();
		// this.setLanguage(lang);

		this.checkIsLoggedIn()
			.then(() => this.getUser())
			.catch((err) => {
				let message = 'Getting Token-/User-Info failed!';
				if (err) {
					message += ' ' + err.toString();
				}
				this.propagateError(message);
			});
	}

	propagateError(reason) {
		this.props.onError && this.props.onError(reason);
	}

	getLanguage() {
		return this.state.lang || window.localStorage.getItem(this.state.languageName) || this.state.availableLanguages[0];
	}

	setLanguage(lang) {
		if (this.state.lang !== lang) {
			this.setState({ lang });
			window.localStorage.setItem(this.state.languageName, lang);
			this.propagateLanguageChange(lang);
		}
	}

	propagateLanguageChange(lang) {
		this.props.onLanguageChange && this.props.onLanguageChange(lang);
	}

	login() {
		let url = 'https://auth.zalando.com/z/oauth2/authorize?realm=/employees&response_type=token&scope=uid' +
			'&client_id=' + this.props.clientId +
			'&redirect_uri=' + this.props.redirectUrl +
			'&state=' + this.setSessionState();

		window.location.href = url;
	}

	logout() {
		this.removeCookie();
		this.setState({loggedIn: false});
		this.propagateLoginStatusChange(false);
	}

	checkIsLoggedIn() {
		return new Promise((resolve, reject) => {
			this.getToken(urlAtStart)
				.then((token) => {
					// checking that token is still valid
					this.getTokenInfo()
						.then(() => {
							this.propagateLoginStatusChange(true, token);
							resolve();
						}, (err) => {
							this.logout();
							reject(err);
						});
				}, (err) => {
					this.logout();
					reject(err);
				});
		});
	}

	propagateLoginStatusChange(isLoggedIn, token) {
		if (this.state.loggedIn !== isLoggedIn) {
			this.setState({ loggedIn: isLoggedIn });

			this.props.onLoginChange && this.props.onLoginChange(isLoggedIn, token);
		}
	}

	setSessionState() {
		// create new state guid
		let state = this.guid();

		// save the state to check for it on return
		window.localStorage.setItem(this.state.stateName, state);
		return state;
	}

	checkSessionState(state) {
		let valid = window.localStorage.getItem(this.state.stateName) === state;
		window.localStorage.removeItem(this.state.stateName);
		return valid;
	}

	getToken(url) {
		if (!url) {
			url = window.location.href;
		}
		return new Promise((resolve, reject) => {
			let token = this.getTokenFromUrl(url);
			if (token) {
				let sessionState = this.getStateFromUrl(url);
				if (this.checkSessionState(sessionState)) {
					this.setCookie(token);
					return resolve(token);
				}
			}
			token = this.getCookieValue(this.state.tokenName);
			if (token) {
				return resolve(token);
			}

			reject();
		});
	}

	getTokenFromUrl(url) {
		let urlQueryTokenPart = /access_token=([^&]+)/.exec(url);
		return urlQueryTokenPart != null ? urlQueryTokenPart[1] : null;
	}

	getStateFromUrl(url) {
		let urlQueryStatePart = /state=([^&]+)/.exec(url);
		return urlQueryStatePart[1];
	}

	getTokenInfo() {
		return new Promise((resolve, reject) => {
			this.request('GET', this.props.tokenInfoUrl)
				.then((data) => {
					this.state = Object.assign({}, this.state, {
						userUID: data.uid
					});
					resolve(data.uid);
				}, (err) => {
					this.logout();
					reject(err);
				});
		});
	}

	getUser() {
		return new Promise((resolve, reject) => {
			this.request('GET', `${this.props.userServiceUrl}/${this.state.userUID}`)
				.then(([user]) => {
					if (!user) {
						reject();
					}
					this.setState({
						userName: user.name,
						userEmail: user.email
					});

					resolve();
				}, err => {
					this.logout();
					reject(err);
				});
		});
	}

	setCookie(token) {
		var now = new Date();
		now.setTime(now.getTime() + 60*60*1000); // in milliseconds
		// setting domain does not work for dev localhost environment
		if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
			document.cookie = `${this.state.tokenName}=${token};path=${this.state.cookiePath};expires=${now.toGMTString()};`;
		} else {
			document.cookie = `${this.state.tokenName}=${token};path=${this.state.cookiePath};domain=${this.state.cookieDomain};expires=${now.toGMTString()};`;
		}
	}

	removeCookie() {
		if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
			document.cookie = `${this.state.tokenName}=;path=${this.state.cookiePath};expires=${(new Date(0)).toGMTString()};`
		} else {
			document.cookie = `${this.state.tokenName}=;path=${this.state.cookiePath};domain=${this.state.cookieDomain};expires=${(new Date(0)).toGMTString()};`;
		}
	}

	// HELPERS

	// matches a cookie name in the cookie string and returns the last value
	getCookieValue(a) {
		let b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
		return b ? b.pop() : '';
	}

	guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
	}

	// Method: 'GET', 'POST'
	request(method, url) {
		let headers = new Headers();
		return this.getToken(urlAtStart)
			.then((token) => {
				headers.append('Authorization', `Bearer ${token}`);
				return Promise.resolve();
			})
			.then(() => {
				return fetch(url, {
					method: method,
					headers: headers,
					mode: 'cors',
					cache: 'default'
				})
					.then(this.checkStatus)
					.then((response) => response.json());
			});
	}

	checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response;
		} else {
			let error = new Error(response.statusText);
			error.response = response
			throw error;
		}
	}

    render() {
        return <div class="refills-patterns refills-components">
                <header class="navigation" role="banner">
                    <div class="navigation-wrapper">
                        {this.props.logoUrl ? <img class="logo" src={this.props.logoUrl} /> : null}
                        <a href="javascript:void(0)" class="navigation-menu-button" id="js-mobile-menu">MENU</a>
                        <nav role="navigation">
                            <ul id="js-navigation-menu" class="navigation-menu show">
                                {this.props.links ? this.props.links.map((link, index) => <WSHeaderNavLink link={link} key={index} />) : null}
                                <li class="nav-link more dropdown-menu">
                                    <a href="javascript:void(0)">
                                        <span id="selectedLanguageFlag" class="flag flag-{this.state.lang}"></span>
                                        <span id="selectedLanguage">{this.state.lang}</span>
                                    </a>
                                    <ul class="submenu" id="languages">
                                        {this.state.availableLanguages.map(lang => {
                                            return <li onclick={() => this.setLanguage(lang)}>
                                                <a><span class={"flag flag-" + lang}></span> <span translate="global.language.{{lang}}">{lang}</span></a>
                                            </li>
                                        })}
                                    </ul>
                                </li>
                                <li class="nav-link" id="loggedInInfo">
                                    { this.state.loggedIn
                                        ?   <a class="auto-size" onclick={() => this.authenticate()}><span translate="global.menu.signein">Login</span></a>
                                        :   <div>
                                                <span translate="global.menu.signedinas"></span>
                                                <span id="userName">{this.state.userName}</span>
                                                <a className="auto-size" id="logOutButton" type="button" onclick={() => this.logout()}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100"><path d="M48.501,27.015c0,0.827,0.671,1.5,1.5,1.5h21.486v42.974H50.001c-0.829,0-1.5,0.672-1.5,1.5c0,0.829,0.671,1.5,1.5,1.5  h22.986c0.828,0,1.5-0.671,1.5-1.5V27.013c0-0.828-0.672-1.5-1.5-1.5H50.001C49.172,25.515,48.501,26.187,48.501,27.015z   M48.473,38.447c0,0.384,0.146,0.768,0.438,1.061l8.964,8.963h-30.86c-0.828,0-1.5,0.671-1.5,1.5c0,0.829,0.672,1.5,1.5,1.5h30.86  l-8.993,8.992c-0.293,0.293-0.439,0.677-0.439,1.062c0,0.383,0.146,0.768,0.439,1.061c0.585,0.586,1.536,0.586,2.121,0  l11.553-11.553c0.141-0.141,0.25-0.308,0.327-0.492c0.003-0.008,0.004-0.016,0.007-0.022c0.067-0.169,0.105-0.354,0.105-0.547  s-0.039-0.378-0.105-0.548c-0.003-0.007-0.004-0.015-0.007-0.021c-0.077-0.187-0.188-0.354-0.328-0.493L51.032,37.386  c-0.585-0.586-1.535-0.586-2.121,0C48.618,37.679,48.473,38.063,48.473,38.447z"></path></svg>
                                                </a>
                                            </div>
                                    }
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
            </div>
    }
}