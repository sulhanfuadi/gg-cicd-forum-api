class RegisterUser {
  /**
   * Represents a user registration entity.
   * @param {Object} payload - The payload containing username, password, and fullname.
   * @param {string} payload.username - The username of the user.
   * @param {string} payload.password - The password of the user.
   * @param {string} payload.fullname - The full name of the user.
   */
  constructor(payload) {
    this._verifyPayload(payload);

    const { username, password, fullname } = payload;

    this.username = username;
    this.password = password;
    this.fullname = fullname;
  }

  /**
   * Validates the payload for the RegisterUser entity.
   * @param {Object} payload - The payload to validate.
   * @throws {Error} If the payload does not contain username, password, or fullname, or if they are not strings.
   */
  _verifyPayload({ username, password, fullname }) {
    if (!username || !password || !fullname) {
      throw new Error("REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof fullname !== "string"
    ) {
      throw new Error("REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    if (username.length > 50) {
      throw new Error("REGISTER_USER.USERNAME_LIMIT_CHAR");
    }

    if (!username.match(/^[\w]+$/)) {
      throw new Error("REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER");
    }
  }
}

module.exports = RegisterUser;
