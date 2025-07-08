// Use Case for logging out a user by deleting their refresh token

class LogoutUserUseCase {
  /**
   * @param {Object} dependencies - The dependencies for the use case.
   * @param {Object} dependencies.authenticationRepository - The authentication repository.
   */
  constructor({ authenticationRepository }) {
    this._authenticationRepository = authenticationRepository;
  }

  /**
   * Executes the use case to delete an authentication token.
   * @param {Object} useCasePayload - The payload containing the refresh token.
   * @param {string} useCasePayload.refreshToken - The refresh token to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the token is deleted.
   */
  async execute(useCasePayload) {
    this._validatePayload(useCasePayload);
    const { refreshToken } = useCasePayload;
    await this._authenticationRepository.checkAvailabilityToken(refreshToken);
    await this._authenticationRepository.deleteToken(refreshToken);
  }

  /**
   * Validates the payload for the use case.
   * @param {Object} payload - The payload to validate.
   * @throws {Error} If the payload does not contain a refresh token or if the refresh token is not a string.
   */
  _validatePayload(payload) {
    const { refreshToken } = payload;
    if (!refreshToken) {
      throw new Error(
        "DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN"
      );
    }

    if (typeof refreshToken !== "string") {
      throw new Error(
        "DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION"
      );
    }
  }
}

module.exports = LogoutUserUseCase;
