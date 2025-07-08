class UserLogin {
  /**
   * Represents a user login entity.
   * @param {Object} payload - The payload containing username and password.
   * @param {string} payload.username - The username of the user.
   * @param {string} payload.password - The password of the user.
   */
  constructor(payload) {
    this._verifyPayload(payload);

    this.username = payload.username;
    this.password = payload.password;
  }

  /**
   * Validates the payload for the UserLogin entity.
   * @param {Object} payload - The payload to validate.
   * @throws {Error} If the payload does not contain username or password, or if they are not strings.
   */
  _verifyPayload(payload) {
    const { username, password } = payload;

    if (!username || !password) {
      throw new Error("USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (typeof username !== "string" || typeof password !== "string") {
      throw new Error("USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = UserLogin;
