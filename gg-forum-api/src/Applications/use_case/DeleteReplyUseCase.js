// Use Case for deleting a reply from a comment in a thread

class DeleteReplyUseCase {
  /**
   * @param {Object} dependencies - The dependencies for the use case.
   * @param {Object} dependencies.threadRepository - The thread repository.
   * @param {Object} dependencies.commentRepository - The comment repository.
   * @param {Object} dependencies.replyRepository - The reply repository.
   */
  constructor({ threadRepository, commentRepository, replyRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
  }

  /**
   * Executes the use case to delete a reply from a comment in a thread.
   * @param {Object} useCasePayload - The payload containing the reply details.
   * @param {string} useCasePayload.replyId - The ID of the reply to be deleted.
   * @param {string} useCasePayload.commentId - The ID of the comment from which the reply is deleted.
   * @param {string} useCasePayload.threadId - The ID of the thread containing the comment.
   * @param {string} useCasePayload.userId - The ID of the user who is deleting the reply.
   * @returns {Promise<void>} - A promise that resolves when the reply is deleted.
   */
  async execute(useCasePayload) {
    await this._threadRepository.verifyThreadExist(useCasePayload.threadId);
    await this._commentRepository.verifyCommentExist(useCasePayload.commentId);
    await this._replyRepository.verifyReplyExist(useCasePayload.replyId);
    await this._replyRepository.verifyReplyOwner({
      replyId: useCasePayload.replyId,
      userId: useCasePayload.userId,
    });
    await this._replyRepository.deleteReplyById(useCasePayload.replyId);
  }
}

module.exports = DeleteReplyUseCase;
