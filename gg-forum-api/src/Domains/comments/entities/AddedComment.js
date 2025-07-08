class AddedComment {
  /**
   * Represents an added comment entity.
   * @param {Object} payload - The payload containing the comment details.
   * @param {string} payload.id - The ID of the added comment.
   * @param {string} payload.content - The content of the added comment.
   * @param {string} payload.owner - The ID of the user who owns the added comment.
   */
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, content, owner } = payload;

    this.id = id;
    this.content = content;
    this.owner = owner;
  }

  /**
   * Validates the payload for the AddedComment entity.
   * @param {Object} payload - The payload to validate.
   * @throws {Error} If the payload does not contain id, content, or owner, or if they are not strings.
   */
  _verifyPayload({ id, content, owner }) {
    if (!id || !content || !owner) {
      throw new Error("ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof content !== "string" ||
      typeof owner !== "string"
    ) {
      throw new Error("ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = AddedComment;
