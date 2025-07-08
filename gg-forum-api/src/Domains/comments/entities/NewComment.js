class NewComment {
  /**
   * Represents a new comment entity.
   * @param {Object} payload - The payload containing threadId, content, and owner.
   * @param {string} payload.threadId - The ID of the thread to which the comment belongs.
   * @param {string} payload.content - The content of the comment.
   * @param {string} payload.owner - The ID of the user who owns the comment.
   */
  constructor(payload) {
    this._verifyPayload(payload);

    const { threadId, content, owner } = payload;

    this.threadId = threadId;
    this.content = content;
    this.owner = owner;
  }

  /**
   * Validates the payload for the NewComment entity.
   * @param {Object} payload - The payload to validate.
   * @throws {Error} If the payload does not contain threadId, content, or owner, or if they are not strings.
   */
  _verifyPayload({ threadId, content, owner }) {
    if (!threadId || !content || !owner) {
      throw new Error("NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof threadId !== "string" ||
      typeof content !== "string" ||
      typeof owner !== "string"
    ) {
      throw new Error("NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = NewComment;
