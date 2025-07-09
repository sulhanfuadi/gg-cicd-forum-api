const LikeRepository = require("../../Domains/likes/LikeRepository");

class LikeRepositoryPostgres extends LikeRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  /**
   * checkIfUserHasLikedComment method to check if a user has liked a specific comment
   * @param {Object} params - The parameters containing commentId and userId
   * @param {string} params.commentId - The ID of the comment to check
   * @param {string} params.userId - The ID of the user to check
   * @returns {Promise<boolean>} - Resolves to true if the user has liked the comment, false otherwise
   * @throws {Error} If the query fails
   */
  async checkIfUserHasLikedComment({ commentId, userId }) {
    const query = {
      text: "SELECT 1 FROM likes WHERE comment_id = $1 AND owner = $2",
      values: [commentId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      return false;
    }
    return true;
  }

  /**
   * likeComment method to add a like to a specific comment by a user
   * @param {Object} params - The parameters containing commentId and userId
   * @param {string} params.commentId - The ID of the comment to like
   * @param {string} params.userId - The ID of the user who is liking the comment
   * @returns {Promise<void>} - Resolves when the like is successfully added
   * @throws {Error} If the insertion fails
   */
  async likeComment({ commentId, userId }) {
    const id = `like-${this._idGenerator()}`;

    const query = {
      text: "INSERT INTO likes (id, comment_id, owner) VALUES($1, $2, $3)",
      values: [id, commentId, userId],
    };

    await this._pool.query(query);
  }

  /**   * unlikeComment method to remove a like from a specific comment by a user
   * @param {Object} params - The parameters containing commentId and userId
   * @param {string} params.commentId - The ID of the comment to unlike
   * @param {string} params.userId - The ID of the user who is unliking the comment
   * @returns {Promise<void>} - Resolves when the like is successfully removed
   * @throws {Error} If the deletion fails
   */
  async unlikeComment({ commentId, userId }) {
    const query = {
      text: "DELETE FROM likes WHERE comment_id = $1 AND owner = $2",
      values: [commentId, userId],
    };

    await this._pool.query(query);
  }

  /**
   * countCommentLikes method to count the number of likes for a specific comment
   * @param {string} commentId - The ID of the comment for which to count likes
   * @returns {Promise<number>} - Resolves to the count of likes for the comment
   * @throws {Error} If the query fails
   */
  async countCommentLikes(commentId) {
    const query = {
      text: "SELECT COUNT(*) FROM likes WHERE comment_id = $1",
      values: [commentId],
    };

    const result = await this._pool.query(query);

    return parseInt(result.rows[0].count, 10);
  }

  /**
   * Get user like history
   * @param {string} userId - User ID
   * @returns {Promise<Array>} List of comment IDs liked by user
   */
  async getUserLikeHistory(userId) {
    // This is the deliberate bug:
    // We're forgetting to add userId to the WHERE clause,
    // which means this will return ALL likes, not just for this user
    const query = {
      text: `SELECT comment_id FROM likes ORDER BY date DESC`,
    };

    const result = await this._pool.query(query);
    return result.rows.map((row) => row.comment_id);
  }
}

module.exports = LikeRepositoryPostgres;
