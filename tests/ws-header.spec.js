describe('WS-Header', function () {
    // var wsHeaderElement,
	// 	wrapper,
	// 	elementName = "ws-header";

    // beforeEach(function () {
    //     wsHeaderElement = document.createElement('ws-header');

    //     wrapper = document.createElement('div');
    //     wrapper.appendChild(wsHeaderElement);
    // });

    // it('created element should match string representation', function () {
    //     var expectedEl = '<' + elementName + '></' + elementName + '>';

    //     expect(wrapper.innerHTML).toBe(expectedEl);
    // });

    // it('created element should have shadow root', function () {
    //     expect(wrapper.querySelector(elementName).shadowRoot).not.toBeNull();
    // })

    // it('should notify about lang at the start', function (done) {
	// 	var elem = wrapper.querySelector(elementName);
	// 	var langSpy = jasmine.createSpy('language-changed');

	// 	elem.addEventListener('language-changed', langSpy);

	// 	setTimeout(function() {
	// 		expect(langSpy).toHaveBeenCalled();

	// 		done();
	// 	}, 200);
    // })

	// it('should notify about lang change', function (done) {
	// 	var elem = wrapper.querySelector(elementName);
	// 	var langSpy = jasmine.createSpy('language-changed');
	// 	var lang = 'de';

	// 	function handler(event) {
	// 		expect(event.detail.language == lang);
	// 		langSpy();
	// 	}

	// 	setTimeout(function() {
	// 		elem.addEventListener('language-changed', handler);

	// 		elem.setLanguage('de')
	// 		expect(langSpy).toHaveBeenCalled();

	// 		done();
	// 	}, 200);
    // })

	// // checking for event at starttime didnt work
    // it('should notify about login at the start', function (done) {
	// 	var elem = wrapper.querySelector(elementName);
	// 	var loginSpy = jasmine.createSpy('login-status-changed');

	// 	elem.addEventListener('login-status-changed', loginSpy);
	// 	elem.checkIsLoggedIn().then(expectation, expectation);

	// 	function expectation() {
	// 		setTimeout(function() {
	// 			expect(loginSpy).toHaveBeenCalled();

	// 			done();
	// 		}, 200);
	// 	}
    // })

	// it('should get the tokens from the url', function() {
	// 	var url = "http://localhost:8080?access_token=abc&state=def";
	// 	var elem = wrapper.querySelector(elementName);

	// 	expect(elem.getTokenFromUrl(url)).toBe("abc");
	// 	expect(elem.getStateFromUrl(url)).toBe("def");
	// })

	// it('should persist the auth token', function() {
	// 	var url = "http://localhost:8080?access_token=abc&state=def";
	// 	var elem = wrapper.querySelector(elementName);

	// 	elem.getToken(url);
	// 	setTimeout(function() {
	// 		expect(elem.getCookieValue(elem.state.tokenName)).toBe("abc");

	// 		done();
	// 	}, 200);
	// })

	// it('should save the lang', function() {
	// 	var elem = wrapper.querySelector(elementName);

	// 	elem.setLanguage('gb');
	// 	expect(elem.getLanguage()).toBe("gb");
	// })

	// it('should persist the lang', function() {
	// 	var elem = wrapper.querySelector(elementName);

	// 	expect(elem.getLanguage()).toBe("gb");
	// })

	// it('should load the tokeninfo', function() {
	// 	var elem = wrapper.querySelector(elementName);

	// 	elem.state.tokenInfoUrl = 'abc';
	// 	spyOn(elem, "request");

	// 	elem.getTokenInfo();
	// 	expect(elem.request).toHaveBeenCalledWith('GET',elem.state.tokenInfoUrl);
	// })

	// it('should load the userinfo', function() {
	// 	var elem = wrapper.querySelector(elementName);

	// 	elem.state.userServiceUrl = 'abc';
	// 	elem.state.userUID = 'def';
	// 	spyOn(elem, "request");

	// 	elem.getUser();
	// 	expect(elem.request).toHaveBeenCalledWith('GET',`${elem.state.userServiceUrl}?q=${elem.state.userUID}`);
	// })

	// it('should show logged in state', function() {
	// 	var elem = wrapper.querySelector(elementName);

	// 	elem.showLoggedIn();
	// 	expect(elem.shadowRoot.querySelector('#userName').length).not.toBe(0);
	// })

	// it('should show logged out state', function() {
	// 	var elem = wrapper.querySelector(elementName);

	// 	elem.showLoggedIn();
	// 	elem.showLoggedOut();
	// 	expect(elem.shadowRoot.querySelector('#userName')).toBe(null);
	// })

	// it('should show the user info', function() {
	// 	var elem = wrapper.querySelector(elementName);

	// 	elem.state.userName = "Test";
	// 	elem.showLoggedIn();
	// 	elem.showUser();
	// 	expect(elem.shadowRoot.querySelector('#userName').innerText).toBe("Test");
	// })
});