//Get the contents of the template (_currentScript is available with webcomponents.js, use currentScript if you don't use this Polyfill)
var template = document._currentScript.ownerDocument.querySelector('template');
var availableLanguages = ['de','en'];
var state = {
    tokenName: "zalando-internal-access_token",
    stateName: "zalando-internal-access_state",
    languageName: 'language',
    cookiePath: '/',
    cookieDomain: '.zalan.do',
    lang: null,
    loggedIn: null,
    clientId: null,
    redirectUrl: null,
    userServiceUrl: null,
    tokenInfoUrl: null,
}
// Remember url at loadtime to not have sideeffects by ie Angular2
var urlAtStart = window.location.href;

class WSHeader extends HTMLElement {
    // Use createdCallback instead of constructor to init an element.
    createdCallback() {
        let clone = document.importNode(template.content, true);
        
        // This element uses Shadow DOM.
        this.createShadowRoot().appendChild(clone);
        
        this.state = state;
        this.getAttributes();
        
        this.setupLanguages();
        
        // would fire initial before

        document.addEventListener("WebComponentsReady", () => {
            let lang = this.getLanguage();
        this.setLanguage(lang);
        
        this.checkIsLoggedIn()
          .then(() => this.getUser())
    .then(() => this.showUser())
    .catch(() => this.propagateError("Getting Token-/User-Info failed!"));
    });
    }
    
    propagateError(reason) {
        let event = new CustomEvent("error", {
            detail: {
                message: reason
            }
        });
        this.dispatchEvent(event);
    }
    
    getAttributes() {
        this.state = Object.assign({}, this.state, {
            clientId: this.getAttribute('client-id'),
            redirectUrl: this.getAttribute('redirect-url'),
            userServiceUrl: this.getAttribute('userservice-url'),
            tokenInfoUrl: this.getAttribute('tokeninfo-url'),
        });
    }
    
    setupLanguages() {
        let languagesElem = this.shadowRoot.querySelector('#languages');
        
        availableLanguages.map((lang) => {
            let dummy = document.createElement( 'div' );
        dummy.innerHTML = `<li>
                <a><span class="flag flag-${lang}"></span> <span translate="global.language.{{lang}}">${lang}</span></a>
            </li>`;
        let node = dummy.childNodes[0];
        node.addEventListener("click", () => this.setLanguage(lang));
        languagesElem.appendChild(node);
    });
    }
    
    getLanguage() {
        return this.state.lang || window.localStorage.getItem(this.state.languageName) || availableLanguages[0];
    }
    
    setLanguage(lang) {
        if (this.state.lang != lang) {
            this.state.lang = lang;
            window.localStorage.setItem(this.state.languageName, lang);
            this.showLanguage(lang);
            this.propagateLanguageChange(lang);
        }
    }
    
    showLanguage(lang) {
        this.shadowRoot.querySelector('#selectedLanguageFlag').className = "flag flag-" + lang;
        this.shadowRoot.querySelector('#selectedLanguage').innerText = lang;
    }
    
    propagateLanguageChange(lang) {
        let event = new CustomEvent("language-changed", {
            detail: {
                language: lang
            }
        });
        this.dispatchEvent(event);
    }
    
    login() {
        let url = "https://auth.zalando.com/z/oauth2/authorize?realm=employees&response_type=token&scope=uid" +
          "&client_id=" + this.state.clientId +
          "&redirect_uri=" + this.state.redirectUrl +
          "&state=" + this.setSessionState();

        window.location.href = url;
    }
    
    logout() {
        this.removeCookie();
        
        this.showLoggedOut();
        this.propagateLoginStatusChange(false);
    }
    
    checkIsLoggedIn() {
        return new Promise((resolve, reject) => {
              this.getToken(urlAtStart)
            .then((token) => {
              // checking that token is still valid
              this.getTokenInfo()
            .then(() => {
              this.showLoggedIn();

        this.propagateLoginStatusChange(true, token);
        resolve();
    }, () => {
            this.showLoggedOut();

            this.propagateLoginStatusChange(false);
            reject();
        });
    });
    });
    }
    
    propagateLoginStatusChange(isLoggedIn, token) {
        if(this.state.loggedIn !== isLoggedIn){
            this.state.loggedIn = isLoggedIn;
            
            let event = new CustomEvent("login-status-changed", {
                detail: {
                    loggedIn: isLoggedIn,
                    token: token || null
                }
            });
            this.dispatchEvent(event);
        }
    }
    
    showLoggedOut() {
        let loggedInInfo = this.shadowRoot.querySelector('#loggedInInfo');
        loggedInInfo.innerHTML =
          `<a class="auto-size"><span translate="global.menu.signein">Login</span></i></a>`;
        loggedInInfo.removeEventListener("click", this.logout);
        loggedInInfo.addEventListener("click", this.login.bind(this));
    }
    
    showLoggedIn() {
        let loggedInInfo = this.shadowRoot.querySelector('#loggedInInfo');
        loggedInInfo.innerHTML =
          `<span translate="global.menu.signedinas"></span>
            <span id="userName">Loading...</span>
            <a class="auto-size" id="logOutButton" type="button"><div id="logOutIcon"></div></a>`;
        loggedInInfo.removeEventListener("click", this.login);
        loggedInInfo.addEventListener("click", this.logout.bind(this));
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
              var token = this.getTokenFromUrl(url);
        if (token) {
            var sessionState = this.getStateFromUrl(url);
            if (this.checkSessionState(sessionState)) {
                this.setCookie(token);
                return resolve(token);
            }
        }
        token = this.getCookieValue(this.state.tokenName);
        if (token) {
            this.setCookie(token);
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
            this.request('GET', this.state.tokenInfoUrl)
          .then((data) => {
            this.state = Object.assign({}, this.state, {
            userUID: data.uid
        });
        resolve(data.uid);
    }, () => {
            this.logout();
            reject();
        });
    });
    }
    
    getUser() {
        return new Promise((resolve, reject) => {
              this.request('GET', `${this.state.userServiceUrl}?q=${this.state.userUID}`)
            .then((data) => {
              let user = data[0];
        if (!user) {
            reject();
        }
        let userInfo = {
            userName: user.name,
            userEmail: user.email
        };
        this.state = Object.assign({}, this.state, userInfo);
        resolve(userInfo);
    }, () => {
            this.logout();
            reject();
        });
    });
    }
    
    showUser() {
        this.shadowRoot.querySelector('#userName').innerText = this.state.userName;
    }
    
    setCookie(token) {
        // setting domain does not work for dev localhost environment
        //document.cookie = `${this.state.tokenName}=${token},path=${this.state.cookiePath};domain=${this.state.cookieDomain};`
        document.cookie = `${this.state.tokenName}=${token};path=${this.state.cookiePath};`
    }
    
    removeCookie() {
        document.cookie = `${this.state.tokenName}=;path=${this.state.cookiePath};domain=${this.state.cookieDomain};expires=Thu, 01 Jan 1970 00:00:01 GMT";`
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
              headers.append("Authorization", `Bearer ${token}`);
        return Promise.resolve();
    })
    .then(() => {
            return fetch(url, {
                method: method,
                headers: headers,
                mode: 'cors',
                cache: 'default'
            })
              .then(checkStatus)
              .then(function(response) {
                  return response.json();
              });
    });
    }
    
    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
    
    // You can also define the other lifecycle methods.
    attachedCallback() { }
    detachedCallback() { }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "redirect-url":
            case "client-id":
            case "userservice-url":
                this.getAttributes();
                break;
        }
    };
}


//Register the element with the document
document.registerElement('ws-header', WSHeader);