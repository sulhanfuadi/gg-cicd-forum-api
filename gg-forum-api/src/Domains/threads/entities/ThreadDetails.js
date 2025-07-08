class ThreadDetails {
  /**
   * Represents a thread details entity.
   * @param {Object} payload - The payload containing thread details.
   * @param {string} payload.id - The ID of the thread.
   * @param {string} payload.title - The title of the thread.
   * @param {string} payload.body - The body content of the thread.
   * @param {Date} payload.date - The date of the thread.
   * @param {string} payload.username - The username of the thread owner.
   * @param {Array} payload.comments - The comments associated with the thread.
   */
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, title, body, date, username, comments } = payload;

    this.id = id;
    this.title = title;
    this.body = body;
    this.date = date;
    this.username = username;
    this.comments = comments;
  }

  /**
   * Validates the payload for the ThreadDetails entity.
   * @param {Object} payload - The payload to validate.
   * @throws {Error} If the payload does not contain id, title, body, date, username, or comments,
   *                 or if they do not meet the expected data types.
   */
  _verifyPayload({ id, title, body, date, username, comments }) {
    if (!id || !title || !body || !date || !username || !comments) {
      throw new Error("THREAD_DETAILS.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof title !== "string" ||
      typeof body !== "string" ||
      !(date instanceof Date) ||
      typeof username !== "string" ||
      !(
        Array.isArray(comments) &&
        comments.every(
          (comment) => typeof comment === "object" && comment !== null
        )
      )
      // comments must be array of object(s) and not null since typeof null also returns 'object'
    ) {
      throw new Error("THREAD_DETAILS.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = ThreadDetails;
