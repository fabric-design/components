/**
 * This class implements the OAuth2 authorization via the implicit flow.
 */
export class Authorization {

  /**
   * @param {AbstractStorage} storage Key value storage
   */
  constructor(storage) {
    this.storage = storage;
    this.accessToken = undefined;
  }

  /**
   * Set a listener for access token changes
   * @param {Function} callback Gets called when the access token changes
   * @returns {void}
   */
  onAccessTokenChange(callback) {
    this.accessTokenChange = callback;
  }

  /**
   * Get's called when ever the access token changes
   * @param {string|null} accessToken New access token
   * @returns {void}
   */
  changeAccessToken(accessToken) {
    if (this.accessToken !== accessToken) {
      this.accessToken = accessToken;
      if (typeof this.accessTokenChange === 'function') {
        this.accessTokenChange(accessToken);
      }
    }
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
      this.changeAccessToken(this.storage.get('access_token'));
    } else {
      this.changeAccessToken(null);
    }
  }

  /**
   * Update the tokens and notify the header
   * @param {{expires_in: number, access_token: string}} params Response parameters containing access token
   * @returns {void}
   * @private
   */
  updateTokens(params) {
    const expires = params.expires_in ? parseInt(params.expires_in, 10) : 3600;
    this.storage.set('access_token', params.access_token);
    this.storage.set('expires_at', new Date().getTime() + expires * 1000);
    // Put data into authorized stream
    this.changeAccessToken(params.access_token);
  }

  /**
   * Redirect the user to the OAuth2 authorization page
   * @param {string} loginUrl Url the user get's redirected to authorize
   * @param {string} clientId OAuth2 client id
   * @param {string} businessPartnerId OAuth2 business partner id
   * @returns {void}
   */
  authorize(loginUrl, clientId, businessPartnerId) {
    const query = this.buildQuery([
      ['business_partner_id', businessPartnerId],
      ['client_id', clientId],
      ['state', this.createAndRememberUUID()],
      ['response_type', 'token']
    ]);

    location.href = `${loginUrl}?${query}`;
  }

  /**
   * Remove authorization
   * @returns {void}
   */
  unauthorize() {
    this.storage.remove('access_key');
    this.storage.remove('expires_at');
    this.changeAccessToken(null);
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
