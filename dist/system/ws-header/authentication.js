System.register([], function (_export, _context) {
  "use strict";

  var SESSION_TOKEN_NAME, SESSION_STATE_NAME, ZALANDO_AUTH_URL;
  function login(clientId, redirectUrl) {
    var url = ZALANDO_AUTH_URL + '\n    &client_id=' + clientId + '\n    &redirect_uri=' + redirectUrl + '\n    &state=' + setSessionState();

    window.location.href = url;
  }

  _export('login', login);

  function logout() {
    removeCookie();
  }

  _export('logout', logout);

  function getStateFromUrl(url) {
    var urlQueryStatePart = /state=([^&]+)/.exec(url);
    return urlQueryStatePart[1];
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

  function setCookie(token, cookiePath, cookieDomain) {
    if (process.env.NODE_ENV !== 'dev') {
      document.cookie = SESSION_TOKEN_NAME + '=' + token + ';path=' + cookiePath + ';domain=' + cookieDomain + ';';
    } else {
      document.cookie = SESSION_TOKEN_NAME + '=' + token + ';path=' + cookiePath + ';';
    }
  }

  function removeCookie(cookiePath, cookieDomain) {
    if (process.env.NODE_ENV !== 'dev') {
      document.cookie = SESSION_TOKEN_NAME + '=;path=' + cookiePath + ';domain=' + cookieDomain + ';expires=Thu, 01 Jan 1970 00:00:01 GMT";';
    } else {
      document.cookie = SESSION_TOKEN_NAME + '=;path=' + cookiePath + ';expires=Thu, 01 Jan 1970 00:00:01 GMT";';
    }
  }

  function getTokenFromUrl(url) {
    var urlQueryTokenPart = /access_token=([^&]+)/.exec(url);
    return urlQueryTokenPart != null ? urlQueryTokenPart[1] : null;
  }

  function getCookieValue(key) {
    var b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
  }

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return '' + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  function checkSessionState(state) {
    var stateObj = JSON.parse(decodeURIComponent(state));
    var valid = window.localStorage.getItem(SESSION_STATE_NAME) === stateObj.state;
    window.location.hash = stateObj.hash;
    window.localStorage.removeItem(SESSION_STATE_NAME);
    return valid;
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

  function getUserData(userServiceUrl, tokenInfoUrl, urlAtStart) {
    return new Promise(function (resolve, reject) {
      var accessToken = getToken(urlAtStart);
      if (!accessToken) {
        reject();
        return;
      }
      validateToken(tokenInfoUrl, accessToken).then(function (_ref) {
        var userUID = _ref.userUID;

        requestUser(userServiceUrl, userUID, accessToken).then(function (_ref2) {
          var userName = _ref2.userName,
              userEmail = _ref2.userEmail;

          resolve({
            userName: userName,
            userEmail: userEmail,
            userUID: userUID,
            accessToken: accessToken
          });
        }, reject);
      }, reject);
    });
  }

  _export('getUserData', getUserData);

  function requestUser(userServiceUrl, userUID, accessToken) {
    return new Promise(function (resolve, reject) {
      var requestUserServiceUrl = new XMLHttpRequest();
      requestUserServiceUrl.onload = function userRequestSuccess() {
        var data = JSON.parse(this.responseText);
        resolve({
          userName: data.name,
          userEmail: data.email
        });
      };
      requestUserServiceUrl.onerror = reject;
      if (process.env.NODE_ENV !== 'dev') {
        requestUserServiceUrl.open('get', userServiceUrl + '/' + userUID, true);
      } else {
        requestUserServiceUrl.open('get', '' + userServiceUrl, true);
      }
      requestUserServiceUrl.setRequestHeader('Authorization', 'Bearer ' + accessToken);
      requestUserServiceUrl.send();
    });
  }

  function validateToken(tokenInfoUrl, token) {
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.onload = function tokenRequestSuccess() {
        var data = JSON.parse(this.responseText);
        resolve({
          userUID: data.uid
        });
      };
      request.onerror = reject;
      request.open('get', tokenInfoUrl, true);
      request.setRequestHeader('Authorization', 'Bearer ' + token.split('?')[0]);
      request.send();
    });
  }
  return {
    setters: [],
    execute: function () {
      SESSION_TOKEN_NAME = 'session_token';
      SESSION_STATE_NAME = 'session_state';
      ZALANDO_AUTH_URL = 'https://auth.zalando.com/z/oauth2/authorize?realm=/employees&response_type=token&scope=uid';
    }
  };
});