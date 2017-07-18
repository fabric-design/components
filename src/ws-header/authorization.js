import {SimpleSteam} from './simple-steam';

/**
 * This class implements the OAuth2 authorization via the implicit flow.
 *
 */
export class Authorization {

  /**
   * @param {AbstractStorage} storage Key value storage
   * @param {string} loginUrl Url the user get's redirected to authorize
   * @param {string} refreshUrl Url the app will send a POST to request a new access token
   * @param {string} clientId OAuth2 client id
   * @param {string} businessPartnerId OAuth2 business partner id
   */
  constructor(storage, loginUrl = '', refreshUrl = '', clientId = '', businessPartnerId = '') {
    this.storage = storage;
    this.loginUrl = loginUrl;
    this.refreshUrl = refreshUrl;
    this.clientId = clientId;
    this.businessPartnerId = businessPartnerId;
    this.authorized = new SimpleSteam();
    // Check if the access token will expire soon and we can refresh it
    this.checkExpiration();
  }

  /**
   * Refresh access token if it is expired and a refresh token is available
   * @returns {void}
   * @private
   */
  checkExpiration() {
    const expiresAt = this.storage.get('expires_at') || 0;
    const refreshToken = this.storage.get('refresh_token');
    if (!refreshToken) {
      return;
    }
    // Check if expiration date is one minute before expiration
    if (new Date().getTime() > expiresAt - 60000) {
      this.refresh(refreshToken);
    }
    // Check every 59 seconds if the token expires.
    // Use 59 seconds to prevent exact overlapping of check and expiration
    setTimeout(() => this.checkExpiration(), 59000);
  }

  /**
   * Tries to parse the access token from the given query string
   * @param {string} queryString Query string without leading ?
   * @returns {void}
   */
  tryFetchToken(queryString) {
    // Parse params from query string
    const queryParams = {};
    (queryString || '').split('&').forEach(keyValue => {
      const [key, value] = keyValue.split('=');
      queryParams[key] = decodeURIComponent(value);
    });
    // Only accept the token if we know the state and therefore we know that we requested that token
    if (queryParams.state) {
      if (this.storage.get('state') !== queryParams.state) {
        throw new Error('Unexpected authorisation response');
      }
      this.updateTokens(queryParams);
    // Check if we already have an access token stored
    } else if (this.storage.get('access_token')) {
      // Put data into authorized stream
      this.authorized.publish(this.storage.get('access_token'));
    } else {
      this.authorized.publish(null);
    }
  }

  /**
   * Update the tokens and notify the header
   * @param {Object} params Response parameters containing access and refresh token
   * @returns {void}
   * @private
   */
  updateTokens(params) {
    const expires = params.expires_in ? parseInt(params.expires_in, 10) : 3600;
    this.storage.set('access_token', params.access_token);
    this.storage.set('refresh_token', params.refresh_token);
    this.storage.set('expires_at', new Date().getTime() + expires * 1000);
    // Put data into authorized stream
    this.authorized.publish(params.access_token);
  }

  /**
   * Redirect the user to the OAuth2 authorization page
   * @returns {void}
   */
  authorize() {
    const query = this.buildQuery([
      ['business_partner_id', this.businessPartnerId],
      ['client_id', this.clientId],
      ['state', this.createAndRememberUUID()],
      ['response_type', 'token']
    ]);

    location.href = `${this.loginUrl}?${query}`;
  }

  /**
   * Request a new access token
   * @param {string} token Refresh token
   * @returns {void}
   */
  refresh(token) {
    // Abort if we have not enough information to refresh the token
    if (!this.refreshUrl || !token) {
      return;
    }
    const data = this.buildQuery([
      ['business_partner_id', this.businessPartnerId],
      ['client_id', this.clientId],
      ['grant_type', 'refresh_token'],
      ['refresh_token', token],
      ['state', this.createAndRememberUUID()],
      ['response_type', 'token']
    ]);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', this.refreshUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.addEventListener('load', () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          this.updateTokens(JSON.parse(xhr.responseText));
        } else {
          throw new Error(`Could not refresh token: ${xhr.responseText}`);
        }
      }
    });
    xhr.send(data);
  }

  /**
   * Remove authorization
   * @returns {void}
   */
  unauthorize() {
    this.storage.remove('access_key');
    this.storage.remove('refresh_key');
    this.storage.remove('expires_at');
    this.authorized.publish(null);
  }

  /**
   * Creates a uuid and
   * @returns {string}
   * @private
   */
  createAndRememberUUID() {
    const id = length => Math.round(Math.random() * (10 ** length)).toString(16).substring(0, length);
    const uuid = `${id(8)}-${id(4)}-${id(4)}-${id(4)}-${id(12)}`;
    this.storage.set('state', uuid);
    return uuid;
  }

  /**
   * Creates a query string from given parameters
   * @param {Array<Array<String>>} params List of key value pairs
   * @returns {string}
   * @private
   */
  buildQuery(params) {
    return params.map(pair => `${pair[0]}=${encodeURIComponent(pair[1])}`).join('&');
  }
}
