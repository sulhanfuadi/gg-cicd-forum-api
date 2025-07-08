// Use Case for refreshing user authentication tokens

class RefreshAuthenticationUseCase {
  /**
   * @param {Object} dependencies - The dependencies for the use case.
   * @param {Object} dependencies.authenticationRepository - The authentication repository.
   * @param {Object} dependencies.authenticationTokenManager - The authentication token manager.
   */
  constructor({ authenticationRepository, authenticationTokenManager }) {
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  /**
   * Executes the use case to refresh authentication tokens.
   * @param {Object} useCasePayload - The payload containing the refresh token.
   * @param {string} useCasePayload.refreshToken - The refresh token to be used for refreshing the access token.
   * @returns {Promise<string>} - A promise that resolves to the new access token.
   */
  async execute(useCasePayload) {
    this._verifyPayload(useCasePayload);
    const { refreshToken } = useCasePayload;

    await this._authenticationTokenManager.verifyRefreshToken(refreshToken);
    await this._authenticationRepository.checkAvailabilityToken(refreshToken);

    const { username, id } =
      await this._authenticationTokenManager.decodePayload(refreshToken);

    return this._authenticationTokenManager.createAccessToken({ username, id });
  }

  /**
   * Validates the payload for the use case.
   * @param {Object} payload - The payload to validate.
   * @throws {Error} If the payload does not contain a refresh token or if the refresh token is not a string.
   */
  _verifyPayload(payload) {
    const { refreshToken } = payload;

    if (!refreshToken) {
      throw new Error(
        "REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN"
      );
    }

    if (typeof refreshToken !== "string") {
      throw new Error(
        "REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }
  }
}

module.exports = RefreshAuthenticationUseCase;
