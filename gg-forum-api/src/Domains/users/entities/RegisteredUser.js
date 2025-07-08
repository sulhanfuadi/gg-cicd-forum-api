class RegisteredUser {
  /**
   * Represents a registered user entity.
   * @param {Object} payload - The payload containing id, username, and fullname.
   * @param {string} payload.id - The unique identifier of the user.
   * @param {string} payload.username - The username of the user.
   * @param {string} payload.fullname - The full name of the user.
   */
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, username, fullname } = payload;

    this.id = id;
    this.username = username;
    this.fullname = fullname;
  }

  /**
   * Validates the payload for the RegisteredUser entity.
   * @param {Object} payload - The payload to validate.
   * @throws {Error} If the payload does not contain id, username, or fullname, or if they are not strings.
   */
  _verifyPayload({ id, username, fullname }) {
    if (!id || !username || !fullname) {
      throw new Error("REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof username !== "string" ||
      typeof fullname !== "string"
    ) {
      throw new Error("REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = RegisteredUser;
