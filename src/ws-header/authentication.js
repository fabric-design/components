const urlAtStart = window.location.href;
const AUTH_SERVICE_URL = 'https://auth.zalando.com/z/oauth2/authorize?realm=/employees&response_type=token&scope=uid';
const SESSION_TOKEN_NAME = 'session_token';
const SESSION_STATE_NAME = 'session_state';
const COOKIE_PATH = '/';
const COOKIE_DOMAIN = '.zalan.do';

export function login(clientId, redirectUrl) {
  const url = `${AUTH_SERVICE_URL}
    &client_id=${clientId}
    &redirect_uri=${redirectUrl}
    &state=${setSessionState()}`;

  window.location.href = url;
}

export function logout() {
  removeCookie();
}

export function checkIsLoggedIn(tokenInfoUrl, userServiceUrl) {
  return new Promise((resolve, reject) => {
    function failureListener() {
      logout();
      reject();
    }
    function successListener(tokenServiceResponseText) {
      const { uid, access_token: accessToken } = JSON.parse(tokenServiceResponseText);

      function userServiceSuccess(userServiceResponseText) {
        const user = JSON.parse(userServiceResponseText);
        resolve({
          userName: user.name,
          userEmail: user.email,
          token: accessToken,
        });
      }

      if (uid) {
        const requestUserServiceUrl = new XMLHttpRequest();
        requestUserServiceUrl.onload = userServiceSuccess;
        requestUserServiceUrl.onerror = failureListener;
        if (process.env.NODE_ENV !== 'dev') {
          requestUserServiceUrl.open('get', `${userServiceUrl}/${uid}`, true);
        } else {
          requestUserServiceUrl.open('get', `${userServiceUrl}`, true);
        }
        requestUserServiceUrl.setRequestHeader('Authorization', `Bearer ${accessToken}`);
        requestUserServiceUrl.send();
        return true;
      }
      return false;
    }

    const token = getToken(urlAtStart);
    if (!token) {
      return failureListener();
    }
    requestTokenInfo(token, tokenInfoUrl, successListener, failureListener);
    return true;
  });
}

function requestTokenInfo(token, tokenInfoUrl, successListener, failureListener) {
  const request = new XMLHttpRequest();
  request.onload = successListener;
  request.onerror = failureListener;
  request.open('get', tokenInfoUrl, true);
  request.setRequestHeader('Authorization', `Bearer ${token.split('?')[0]}`);
  request.send();
}

function getTokenFromUrl(url) {
  const urlQueryTokenPart = /access_token=([^&]+)/.exec(url);
  return urlQueryTokenPart != null ? urlQueryTokenPart[1] : null;
}

function getToken(orgUrl) {
  let url = orgUrl;

  if (!url) {
    url = window.location.href;
  }
  let token = getTokenFromUrl(url);
  if (token) {
    const sessionState = getStateFromUrl(url);
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
  const b = document.cookie.match(`(^|;)\\s*${a}\\s*=\\s*([^;]+)`);
  return b ? b.pop() : '';
}

function setCookie(token) {
  if (process.env.NODE_ENV !== 'dev') {
    document.cookie = `${SESSION_TOKEN_NAME}=${token};path=${COOKIE_PATH};domain=${COOKIE_DOMAIN};`;
  } else {
    document.cookie = `${SESSION_TOKEN_NAME}=${token};path=${COOKIE_PATH};`;
  }
}

function removeCookie() {
  if (process.env.NODE_ENV !== 'dev') {
    document.cookie = `${SESSION_TOKEN_NAME}=;path=${COOKIE_PATH};domain=${COOKIE_DOMAIN};expires=Thu, 01 Jan 1970 00:00:01 GMT";`;
  } else {
    document.cookie = `${SESSION_TOKEN_NAME}=;path=${COOKIE_PATH};expires=Thu, 01 Jan 1970 00:00:01 GMT";`;
  }
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

function setSessionState() {
  // create new state guid
  const state = guid();
  const obj = {
    state,
    hash: window.location.hash,
  };

  // save the state to check for it on return
  window.localStorage.setItem(SESSION_STATE_NAME, state);
  return encodeURIComponent(JSON.stringify(obj));
}

function checkSessionState(state) {
  const stateObj = JSON.parse(decodeURIComponent(state));
  const valid = window.localStorage.getItem(SESSION_STATE_NAME) === stateObj.state;
  window.location.hash = stateObj.hash;
  window.localStorage.removeItem(SESSION_STATE_NAME);
  return valid;
}

function getStateFromUrl(url) {
  const urlQueryStatePart = /state=([^&]+)/.exec(url);
  return urlQueryStatePart[1];
}
