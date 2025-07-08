class LikeRepository {
  /**
   * Checks if a user has liked a comment.
   * @param {Object} params - The parameters for checking the like status.
   * @param {string} params.commentId - The ID of the comment.
   * @param {string} params.userId - The ID of the user.
   * @returns {Promise<boolean>} A promise that resolves to true if the user has liked the comment, false otherwise.
   */
  async checkIfUserHasLikedComment({ commentId, userId }) {
    throw new Error("Like_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  /**
   * Likes a comment by a user.
   * @param {Object} params - The parameters for liking the comment.
   * @param {string} params.commentId - The ID of the comment to like.
   * @param {string} params.userId - The ID of the user liking the comment.
   * @returns {Promise<void>} A promise that resolves when the comment is liked.
   */
  async likeComment({ commentId, userId }) {
    throw new Error("Like_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  /**
   * Unlikes a comment by a user.
   * @param {Object} params - The parameters for unliking the comment.
   * @param {string} params.commentId - The ID of the comment to unlike.
   * @param {string} params.userId - The ID of the user unliking the comment.
   * @returns {Promise<void>} A promise that resolves when the comment is unliked.
   */
  async unlikeComment({ commentId, userId }) {
    throw new Error("Like_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  /**
   * Counts the number of likes for a comment.
   * @param {string} commentId - The ID of the comment to count likes for.
   * @returns {Promise<number>} A promise that resolves to the number of likes for the comment.
   */
  async countCommentLikes(commentId) {
    throw new Error("Like_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = LikeRepository;
