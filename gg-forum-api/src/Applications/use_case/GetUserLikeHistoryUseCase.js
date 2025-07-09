/**
 * @class GetUserLikeHistoryUseCase
 * @description
 * This class is responsible for orchestrating the retrieval of a user's like history.
 * It uses the like repository to get the history of likes made by a specific user.
 */
class GetUserLikeHistoryUseCase {
  /**
   * @param {Object} dependencies - The dependencies for the use case.
   * @param {Object} dependencies.likeRepository - The like repository.
   */
  constructor({ likeRepository }) {
    this._likeRepository = likeRepository;
  }

  /**
   * Executes the use case to retrieve a user's like history.
   * @param {string} userId - The ID of the user whose like history to retrieve.
   * @returns {Promise<Array<string>>} - A promise that resolves to an array of comment IDs that the user has liked.
   */
  async execute(userId) {
    return this._likeRepository.getUserLikeHistory(userId);
  }
}

module.exports = GetUserLikeHistoryUseCase;
