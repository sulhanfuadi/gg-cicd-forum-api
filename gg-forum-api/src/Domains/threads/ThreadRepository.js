class ThreadRepository {
  /**
   * Checks if a user has liked a comment.
   * @param {string} commentId - The ID of the comment to check.
   * @param {string} userId - The ID of the user to check.
   * @returns {Promise<boolean>} - Returns true if the user has liked the comment, false otherwise.
   */
  async addThread(newThread) {
    throw new Error("THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  /**
   * Verifies if a thread exists by its ID.
   * @param {string} threadId - The ID of the thread to verify.
   * @returns {Promise<void>} - Resolves if the thread exists, otherwise throws an error.
   */
  async verifyThreadExist(threadId) {
    throw new Error("THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  /**
   * Verifies if a user is the owner of a thread.
   * @param {Object} params - The parameters containing threadId and userId.
   * @param {string} params.threadId - The ID of the thread to verify.
   * @param {string} params.userId - The ID of the user to verify as the owner.
   * @returns {Promise<void>} - Resolves if the user is the owner, otherwise throws an error.
   */
  async getThreadById(threadId) {
    throw new Error("THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = ThreadRepository;
