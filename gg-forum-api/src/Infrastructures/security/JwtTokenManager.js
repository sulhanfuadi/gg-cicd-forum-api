const AuthenticationTokenManager = require("../../Applications/security/AuthenticationTokenManager");
const InvariantError = require("../../Commons/exceptions/InvariantError");

class JwtTokenManager extends AuthenticationTokenManager {
  constructor(jwt) {
    super();
    this._jwt = jwt;
  }

  /**
   * Create an access token with the given payload
   * @param {Object} payload - The payload to include in the token
   * @returns {Promise<string>} - The generated access token
   */
  async createAccessToken(payload) {
    return this._jwt.generate(payload, process.env.ACCESS_TOKEN_KEY);
  }

  /**
   * Verify the validity of an access token
   * @param {string} token - The access token to verify
   * @returns {Promise<void>} - Resolves if the token is valid, rejects with InvariantError if not
   */
  async createRefreshToken(payload) {
    return this._jwt.generate(payload, process.env.REFRESH_TOKEN_KEY);
  }

  /**
   * Verify the validity of a refresh token
   * @param {string} token - The refresh token to verify
   * @returns {Promise<void>} - Resolves if the token is valid, rejects with InvariantError if not
   */
  async verifyRefreshToken(token) {
    try {
      const artifacts = this._jwt.decode(token);
      this._jwt.verify(artifacts, process.env.REFRESH_TOKEN_KEY);
    } catch (error) {
      throw new InvariantError("refresh token tidak valid");
    }
  }

  /**
   * Verify the validity of an access token
   * @param {string} token - The access token to verify
   * @returns {Promise<void>} - Resolves if the token is valid, rejects with InvariantError if not
   */
  async decodePayload(token) {
    const artifacts = this._jwt.decode(token);
    return artifacts.decoded.payload;
  }
}

module.exports = JwtTokenManager;
