class AddedThread {
  /**
   * Represents an added thread entity.
   * @param {Object} payload - The payload containing the thread details.
   * @param {string} payload.id - The ID of the added thread.
   * @param {string} payload.title - The title of the added thread.
   * @param {string} payload.owner - The ID of the user who owns the added thread.
   */
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, title, owner } = payload;

    this.id = id;
    this.title = title;
    this.owner = owner;
  }

  /**
   * Validates the payload for the AddedThread entity.
   * @param {Object} payload - The payload to validate.
   * @throws {Error} If the payload does not contain id, title, or owner, or if they are not strings.
   */
  _verifyPayload({ id, title, owner }) {
    if (!id || !title || !owner) {
      throw new Error("ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof title !== "string" ||
      typeof owner !== "string"
    ) {
      throw new Error("ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = AddedThread;
