class CommentDetails {
  /**
   * Represents the details of a comment, including its ID, username, date, content,
   * replies, and like count.
   * @param {Object} payload - The payload containing the comment details.
   * @param {string} payload.id - The ID of the comment.
   * @param {string} payload.username - The username of the comment's author.
   * @param {Date} payload.date - The date when the comment was created.
   * @param {string} payload.content - The content of the comment.
   * @param {Array} payload.replies - An array of replies to the comment.
   * @param {boolean} payload.is_deleted - Indicates if the comment is deleted.
   * @param {number} payload.likeCount - The number of likes the comment has received.
   */
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, username, date, content, replies, likeCount } =
      this._formatPayload(payload);

    this.id = id;
    this.username = username;
    this.date = date;
    this.content = content;
    this.likeCount = likeCount;
    this.replies = replies;
  }

  /**
   * Validates the payload for the CommentDetails entity.
   * @param {Object} payload - The payload to validate.
   * @throws {Error} If the payload does not contain the required properties or if they
   *                 do not meet the expected data types.
   */
  _verifyPayload({
    id,
    username,
    date,
    content,
    replies,
    is_deleted: isDeleted,
    likeCount,
  }) {
    if (
      !id ||
      !username ||
      !date ||
      !content ||
      !replies ||
      isDeleted === undefined ||
      likeCount === undefined
    ) {
      throw new Error("COMMENT_DETAILS.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof username !== "string" ||
      !(date instanceof Date) ||
      typeof content !== "string" ||
      typeof likeCount !== "number" ||
      !(
        Array.isArray(replies) &&
        replies.every((reply) => typeof reply === "object" && reply !== null)
      ) ||
      typeof isDeleted !== "boolean"
      // replies must be array of object(s) and not null since typeof null also returns 'object'
    ) {
      throw new Error("COMMENT_DETAILS.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }

  /**
   * Formats the payload for the CommentDetails entity.
   * @param {Object} payload - The payload to format.
   * @returns {Object} The formatted payload.
   */
  _formatPayload({
    id,
    username,
    date,
    content,
    replies,
    is_deleted: isDeleted,
    likeCount,
  }) {
    return {
      id,
      username,
      date,
      content: isDeleted ? "**komentar telah dihapus**" : content,
      likeCount,
      replies,
    };
  }
}

module.exports = CommentDetails;
