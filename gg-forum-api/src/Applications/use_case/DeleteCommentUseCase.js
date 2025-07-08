// * Use Case for adding a thread to the forum

class DeleteCommentUseCase {
  /**
   * @param {Object} dependencies - The dependencies for the use case.
   * @param {Object} dependencies.threadRepository - The thread repository.
   * @param {Object} dependencies.commentRepository - The comment repository.
   */
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  /**
   * Executes the use case to delete a comment from a thread.
   * @param {Object} useCasePayload - The payload containing the comment details.
   * @param {string} useCasePayload.commentId - The ID of the comment to be deleted.
   * @param {string} useCasePayload.threadId - The ID of the thread from which the comment is deleted.
   * @param {string} useCasePayload.userId - The ID of the user who is deleting the comment.
   * @returns {Promise<void>} - A promise that resolves when the comment is deleted.
   */
  async execute(useCasePayload) {
    await this._threadRepository.verifyThreadExist(useCasePayload.threadId);
    await this._commentRepository.verifyCommentExist(useCasePayload.commentId);
    await this._commentRepository.verifyCommentOwner({
      commentId: useCasePayload.commentId,
      userId: useCasePayload.userId,
    });
    await this._commentRepository.deleteCommentById(useCasePayload.commentId);
  }
}

module.exports = DeleteCommentUseCase;
