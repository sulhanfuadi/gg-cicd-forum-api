class CommentRepository {
  /**
   * @typedef {Object} NewComment
   * @property {string} content - The content of the comment.
   * @property {string} threadId - The ID of the thread to which the comment belongs.
   * @property {string} owner - The ID of the user who owns the comment.
   */
  async addComment(newComment) {
    throw new Error("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
  /**
   * @typedef {Object} AddedComment
   * @property {string} id - The ID of the added comment.
   * @property {string} content - The content of the added comment.
   * @property {string} owner - The ID of the user who owns the added comment.
   */
  async verifyCommentExist(commentId) {
    throw new Error("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  /**
   * @typedef {Object} VerifyCommentOwner
   * @property {string} commentId - The ID of the comment to verify ownership.
   * @property {string} userId - The ID of the user to verify as the owner of the comment.
   */
  async verifyCommentOwner({ commentId, userId }) {
    throw new Error("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  /**
   * @typedef {Object} DeletedComment
   * @property {string} id - The ID of the deleted comment.
   */
  async deleteCommentById(commentId) {
    throw new Error("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  /**
   * @typedef {Object} Comment
   * @property {string} id - The ID of the comment.
   * @property {string} content - The content of the comment.
   * @property {string} owner - The ID of the user who owns the comment.
   * @property {Date} date - The date when the comment was created.
   */
  async getCommentsByThreadId(threadId) {
    throw new Error("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = CommentRepository;
