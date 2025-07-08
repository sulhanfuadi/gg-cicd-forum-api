class ReplyRepository {
  /**
   * @typedef {Object} NewReply
   * @property {string} commentId - The ID of the comment to which the reply belongs.
   * @property {string} content - The content of the reply.
   * @property {string} owner - The ID of the user who owns the reply.
   */
  async addReply(newReply) {
    throw new Error("REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
  /**
   * @typedef {Object} AddedReply
   * @property {string} id - The ID of the added reply.
   * @property {string} content - The content of the added reply.
   * @property {string} owner - The ID of the user who owns the added reply.
   */
  async verifyReplyExist(replyId) {
    throw new Error("REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  /**
   * @typedef {Object} VerifyReplyOwner
   * @property {string} replyId - The ID of the reply to verify ownership.
   * @property {string} userId - The ID of the user to verify as the owner of the reply.
   */
  async verifyReplyOwner({ replyId, userId }) {
    throw new Error("REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  /**
   * @typedef {Object} DeletedReply
   * @property {string} id - The ID of the deleted reply.
   */
  async deleteReplyById(replyId) {
    throw new Error("REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  /**
   * @typedef {Object} ReplyDetails
   * @property {string} id - The ID of the reply.
   * @property {string} content - The content of the reply.
   * @property {string} owner - The ID of the user who owns the reply.
   * @property {Date} date - The date when the reply was created.
   */
  async getRepliesByCommentId(commentId) {
    throw new Error("REPLY_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = ReplyRepository;
