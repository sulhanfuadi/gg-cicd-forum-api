const pool = require("../src/Infrastructures/database/postgres/pool");

const RepliesTableTestHelper = {
  /**
   * Adds a reply to the replies table for testing purposes.
   * @param {Object} params - The parameters for the reply.
   * @param {string} params.id - The ID of the reply.
   * @param {string} params.commentId - The ID of the comment the reply belongs to.
   * @param {string} params.content - The content of the reply.
   * @param {string} params.owner - The ID of the user who owns the reply.
   * @param {Date} params.date - The date of the reply.
   * @returns {Promise<void>} - Resolves when the reply is added.
   */
  async addLike({
    id = "like-123",
    commentId = "comment-123",
    userId = "user-123",
    date = new Date(),
  } = {}) {
    const query = {
      text: "INSERT INTO likes (id, comment_id, owner, date) VALUES($1, $2, $3, $4)",
      values: [id, commentId, userId, date],
    };

    await pool.query(query);
  },

  /**
   * Finds a like by its ID.
   * @param {string} likeId - The ID of the like to find.
   * @returns {Promise<Array>} - Resolves to an array containing the like if found, or an empty array if not found.
   */
  async findLikeById(likeId) {
    const query = {
      text: "SELECT * FROM likes WHERE id = $1",
      values: [likeId],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  /**
   * Verifies if a like exists for a specific comment by a user.
   * @param {Object} params - The parameters containing commentId and userId.
   * @param {string} params.commentId - The ID of the comment to verify.
   * @param {string} params.userId - The ID of the user to check.
   * @returns {Promise<boolean>} - Resolves to true if the like exists, false otherwise.
   */
  async deleteLike(likeId) {
    const query = {
      text: "DELETE FROM likes WHERE id = $1",
      values: [likeId],
    };

    await pool.query(query);
  },

  /**
   * Checks if a user has liked a specific comment.
   * @param {Object} params - The parameters containing commentId and userId.
   * @param {string} params.commentId - The ID of the comment to check.
   * @param {string} params.userId - The ID of the user to check.
   * @returns {Promise<boolean>} - Resolves to true if the user has liked the comment, false otherwise.
   */
  async countCommentLikes(commentId) {
    const query = {
      text: "SELECT COUNT(*) FROM likes WHERE comment_id = $1",
      values: [commentId],
    };

    const result = await pool.query(query);

    return parseInt(result.rows[0].count, 10);
  },

  /**
   * Cleans the likes table for testing purposes.
   * @returns {Promise<void>} - Resolves when the table is cleaned.
   */
  async cleanTable() {
    await pool.query("DELETE FROM likes WHERE 1=1");
  },
};

module.exports = RepliesTableTestHelper;
