const SESSION_TOKEN_NAME = 'session_token';
const SESSION_STATE_NAME = 'session_state';
const ZALANDO_AUTH_URL = 'https://auth.zalando.com/z/oauth2/authorize?realm=/employees&response_type=token&scope=uid';

/**
 * redirects the user to the zalando oauth portal
 * @param {String} clientId the clientId of the web app (get from s3 bucket of this app)
 * @param {String} redirectUrl the url the oauth portal should redirect to (propably this pages url)
 * @returns {void}
 */
export function login(clientId, redirectUrl) {
  const url = `${ZALANDO_AUTH_URL}
    &client_id=${clientId}
    &redirect_uri=${redirectUrl}
    &state=${setSessionState()}`;

  window.location.href = url;
}

/**
 * logs the user out clearing all credentials
 * @returns {void}
 */
export function logout() {
  removeCookie();
}

/**
 * Method to extract state parameter from url
 * @param {String} url urlString to extract state parameter
 * @returns {String} state information
 */
function getStateFromUrl(url) {
  const urlQueryStatePart = /state=([^&]+)/.exec(url);
  return urlQueryStatePart[1];
}

/**
 * Method to get user auth token
 * @param {String} orgUrl url to receive Token
 * @returns {String} token string
 */
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

/**
 * Sets cookie for a given token
 * @param {String} token Token String
 * @param {String} cookiePath path the cookie is valid for
 * @param {String} cookieDomain domain the cookie is valid for
 * @returns {void}
 */
function setCookie(token, cookiePath, cookieDomain) {
  if (process.env.NODE_ENV !== 'dev') {
    document.cookie = `${SESSION_TOKEN_NAME}=${token};path=${cookiePath};domain=${cookieDomain};`;
  } else {
    document.cookie = `${SESSION_TOKEN_NAME}=${token};path=${cookiePath};`;
  }
}

/**
 * Removes cookie
 * @param {String} cookiePath path the cookie was valid for
 * @param {String} cookieDomain domain the cookie was valid for
 * @returns {void}
 */
function removeCookie(cookiePath, cookieDomain) {
  if (process.env.NODE_ENV !== 'dev') {
    document.cookie = `${SESSION_TOKEN_NAME}=;path=${cookiePath};domain=${cookieDomain};expires=Thu, 01 Jan 1970 00:00:01 GMT";`;
  } else {
    document.cookie = `${SESSION_TOKEN_NAME}=;path=${cookiePath};expires=Thu, 01 Jan 1970 00:00:01 GMT";`;
  }
}

/**
 * getTokenFromUrl
 * @param {String} url url string
 * @returns {String} token part
 */
function getTokenFromUrl(url) {
  const urlQueryTokenPart = /access_token=([^&]+)/.exec(url);
  return urlQueryTokenPart != null ? urlQueryTokenPart[1] : null;
}

/**
 * Get Cookie Value
 * @param {String} key cookie key to match
 * @returns {String} cookie value for key
 */
function getCookieValue(key) {
  const b = document.cookie.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`);
  return b ? b.pop() : '';
}

/**
 * GUID
 * @returns {String} string
 */
function guid() {
  /**
   * Helper method for calculating a unique Id
   * @returns {Number}
   */
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

/**
 * Helper method checking current session state
 * @param {String} state String containing state
 * @returns {Boolean} valid boolean
 */
function checkSessionState(state) {
  const stateObj = JSON.parse(decodeURIComponent(state));
  const valid = window.localStorage.getItem(SESSION_STATE_NAME) === stateObj.state;
  window.location.hash = stateObj.hash;
  window.localStorage.removeItem(SESSION_STATE_NAME);
  return valid;
}

/**
 * Sets Session State
 * @returns {String} encoded URI component of state
 */
function setSessionState() {
  // create new state guid
  const state = guid();
  const obj = {
    state,
    hash: window.location.hash
  };

  // save the state to check for it on return
  window.localStorage.setItem(SESSION_STATE_NAME, state);
  return encodeURIComponent(JSON.stringify(obj));
}

/**
 * @typedef LoginData
 * @property {String} userName
 * @property {String} userEmail
 * @property {String} userUID
 * @property {String} accessToken
 */
/**
 * Helper method checking if the user is already loggedin
 * @param {String} userServiceUrl userServiceUrl
 * @param {String} tokenInfoUrl tokenInfoUrl
 * @param {String} urlAtStart the url the app had when it got first called to catch redirects from the oauth portal
 * @returns {Promise<LoginData>} user data
 */
export function getUserData(userServiceUrl, tokenInfoUrl, urlAtStart) {
  return new Promise((resolve, reject) => {
    const accessToken = getToken(urlAtStart);
    if (!accessToken) {
      reject();
      return;
    }
    validateToken(tokenInfoUrl, accessToken)
      .then(({userUID}) => {
        requestUser(userServiceUrl, userUID, accessToken)
          .then(({userName, userEmail}) => {
            resolve({
              userName,
              userEmail,
              userUID,
              accessToken
            });
          }, reject);
      }, reject);
  });
}

/**
 * @typedef UserData
 * @property {String} userName
 * @property {String} userEmail
 */
/**
* Request the users name and email from the user service
* @param {String} userServiceUrl userServiceUrl
* @param {String} userUID user UID we already got from the token info service
* @param {String} accessToken current accessToken of the user
* @returns {Promise<UserData>}
*/
function requestUser(userServiceUrl, userUID, accessToken) {
  return new Promise((resolve, reject) => {
    const requestUserServiceUrl = new XMLHttpRequest();
    requestUserServiceUrl.onload = function userRequestSuccess() {
      const data = JSON.parse(this.responseText);
      resolve({
        userName: data.name,
        userEmail: data.email
      });
    };
    requestUserServiceUrl.onerror = reject;
    if (process.env.NODE_ENV !== 'dev') {
      requestUserServiceUrl.open('get', `${userServiceUrl}/${userUID}`, true);
    } else {
      requestUserServiceUrl.open('get', `${userServiceUrl}`, true);
    }
    requestUserServiceUrl.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    requestUserServiceUrl.send();
  });
}

/**
 * @typedef TokenData
 * @property {String} userUID
 * @property {String} accessToken
 */
/**
* Check if the provided token is valid and get the user uid
* @param {String} tokenInfoUrl tokenInfoUrl
* @param {String} token accessToken we want to validate
* @returns {Promise<TokenData>}
*/
function validateToken(tokenInfoUrl, token) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.onload = function tokenRequestSuccess() {
      const data = JSON.parse(this.responseText);
      resolve({
        userUID: data.uid
      });
    };
    request.onerror = reject;
    request.open('get', tokenInfoUrl, true);
    request.setRequestHeader('Authorization', `Bearer ${token.split('?')[0]}`);
    request.send();
  });
}
