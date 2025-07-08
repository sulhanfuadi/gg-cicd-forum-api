class NewAuth {
  /**
   * Represents a new authentication entity containing access and refresh tokens.
   * @param {Object} payload - The payload containing access and refresh tokens.
   * @param {string} payload.accessToken - The access token for the user.
   * @param {string} payload.refreshToken - The refresh token for the user.
   */
  constructor(payload) {
    this._verifyPayload(payload);

    this.accessToken = payload.accessToken;
    this.refreshToken = payload.refreshToken;
  }

  /**
   * Validates the payload for the NewAuth entity.
   * @param {Object} payload - The payload to validate.
   * @throws {Error} If the payload does not contain accessToken or refreshToken, or if they are not strings.
   */
  _verifyPayload(payload) {
    const { accessToken, refreshToken } = payload;

    if (!accessToken || !refreshToken) {
      throw new Error("NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof accessToken !== "string" || typeof refreshToken !== "string") {
      throw new Error("NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = NewAuth;
