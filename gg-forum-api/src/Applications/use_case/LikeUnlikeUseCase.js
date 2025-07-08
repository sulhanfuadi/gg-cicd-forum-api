// Use Case for liking or unliking a comment in a thread

class LikeUnlikeUseCase {
  /**
   * @param {Object} dependencies - The dependencies for the use case.
   * @param {Object} dependencies.threadRepository - The thread repository.
   * @param {Object} dependencies.commentRepository - The comment repository.
   * @param {Object} dependencies.likeRepository - The like repository.
   */
  constructor({ threadRepository, commentRepository, likeRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._likeRepository = likeRepository;
  }

  /**
   * Executes the use case to like or unlike a comment in a thread.
   * @param {Object} useCasePayload - The payload containing the like/unlike details.
   * @param {string} useCasePayload.commentId - The ID of the comment to like or unlike.
   * @param {string} useCasePayload.threadId - The ID of the thread containing the comment.
   * @param {string} useCasePayload.userId - The ID of the user performing the like or unlike action.
   * @returns {Promise<void>} - A promise that resolves when the like or unlike action is completed.
   */
  async execute(useCasePayload) {
    await this._threadRepository.verifyThreadExist(useCasePayload.threadId);

    await this._commentRepository.verifyCommentExist(useCasePayload.commentId);

    const hasUserLikedComment =
      await this._likeRepository.checkIfUserHasLikedComment({
        userId: useCasePayload.userId,
        commentId: useCasePayload.commentId,
      });

    if (hasUserLikedComment) {
      await this._likeRepository.unlikeComment({
        commentId: useCasePayload.commentId,
        userId: useCasePayload.userId,
      });
    } else {
      await this._likeRepository.likeComment({
        commentId: useCasePayload.commentId,
        userId: useCasePayload.userId,
      });
    }
  }
}

module.exports = LikeUnlikeUseCase;
