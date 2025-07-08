class NewThread {
  /**
   * Represents a new thread entity.
   * @param {Object} payload - The payload containing title, body, and owner.
   * @param {string} payload.title - The title of the thread.
   * @param {string} payload.body - The body content of the thread.
   * @param {string} payload.owner - The ID of the user who owns the thread.
   */
  constructor(payload) {
    this._verifyPayload(payload);

    const { title, body, owner } = payload;

    this.title = title;
    this.body = body;
    this.owner = owner;
  }

  /**
   * Validates the payload for the NewThread entity.
   * @param {Object} payload - The payload to validate.
   * @throws {Error} If the payload does not contain title, body, or owner, or if they are not strings.
   */
  _verifyPayload({ title, body, owner }) {
    if (!title || !body || !owner) {
      throw new Error("NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof title !== "string" ||
      typeof body !== "string" ||
      typeof owner !== "string"
    ) {
      throw new Error("NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = NewThread;
