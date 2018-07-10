
const log = console;
/**
 * This class represents a JWT token
 */
export class JsonWebToken {
  /**
   * Set the token
   * @param {string} token Json Web Token
   */
  constructor(token) {
    this.token = token;
  }

  /**
   * Parse the token into an object
   * @returns {Object}
   * @private
   */
  getParsedToken() {
    if (!this.parsedToken) {
      const parts = this.token.split('.');
      this.parsedToken = JSON.parse(atob(parts[1]));
    }
    return this.parsedToken;
  }

  /**
   * Determine if the token is still valid
   * @returns {boolean}
   */
  isValid() {
    try {
      const tokenObject = this.getParsedToken();
      const expiresAt = parseInt(tokenObject.exp, 10) * 1000;
      return new Date().getTime() < expiresAt;
    } catch (e) {
      log.warn('The validity of the token could not be determined');
    }
    return false;
  }

  /**
   * Get the user abbreviation the token was issued for
   * @returns {string}
   */
  getUserAbbreviation() {
    try {
      const tokenObject = this.getParsedToken();
      // Find key which contains the name
      const nameKey = Object.keys(tokenObject).find(key => key.includes('managed-id'));
      return tokenObject[nameKey];
    } catch (e) {
      log.warn('The validity of the token could not be determined');
    }
    return null;
  }

  /**
   * Return the real token
   * @returns {string}
   */
  toString() {
    return this.token;
  }

  /**
   * Return the real token
   * @returns {string}
   */
  valueOf() {
    return this.toString();
  }

  /**
   * Return the real token
   * @returns {string}
   */
  toJSON() {
    return this.toString();
  }
}
