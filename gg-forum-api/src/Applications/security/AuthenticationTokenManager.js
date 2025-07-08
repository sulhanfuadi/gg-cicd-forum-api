// This class defines an interface for managing authentication tokens.
// It includes methods for creating and verifying access and refresh tokens, as well as decoding payloads.

class AuthenticationTokenManager {
  /**
   * Creates a refresh token.
   * @param {Object} payload - The payload to include in the token.
   * @returns {Promise<string>} - A promise that resolves to the created refresh token.
   */
  async createRefreshToken(payload) {
    throw new Error("AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
  }

  /**
   * Creates an access token.
   * @param {Object} payload - The payload to include in the token.
   * @returns {Promise<string>} - A promise that resolves to the created access token.
   */
  async createAccessToken(payload) {
    throw new Error("AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
  }
  /**
   * Verifies a refresh token.
   * @param {string} token - The refresh token to verify.
   * @returns {Promise<Object>} - A promise that resolves to the decoded payload if the token is valid.
   */
  async verifyRefreshToken(token) {
    throw new Error("AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
  }

  /**
   * Decodes the payload from a token.
   * @returns {Promise<Object>} - A promise that resolves to the decoded payload.
   */
  async decodePayload() {
    throw new Error("AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = AuthenticationTokenManager;
