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
   * @param {boolean} params.isDeleted - Whether the reply is deleted.
   * @returns {Promise<void>} - Resolves when the reply is added.
   */
  async addReply({
    id = "reply-123",
    commentId = "comment-123",
    content = "isi reply",
    owner = "user-123",
    date = new Date(),
    isDeleted = false,
  } = {}) {
    const query = {
      text: "INSERT INTO replies (id, content, comment_id, owner, date, is_deleted) VALUES($1, $2, $3, $4, $5, $6)",
      values: [id, content, commentId, owner, date, isDeleted],
    };

    await pool.query(query);
  },

  /**
   * Finds a reply by its ID.
   * @param {string} id - The ID of the reply to find.
   * @returns {Promise<Array>} - Resolves to an array containing the reply if found, or an empty array if not found.
   */
  async findReplyById(id) {
    const query = {
      text: "SELECT * FROM replies WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  /**
   * Verifies if a reply exists in the replies table.
   * @param {string} id - The ID of the reply to verify.
   * @returns {Promise<void>} - Resolves if the reply exists, rejects with an error if not.
   */
  async markDeleted(id) {
    const query = {
      text: "UPDATE replies SET is_deleted = true WHERE id = $1",
      values: [id],
    };

    await pool.query(query);
  },

  /**
   * Verifies if a reply exists in the replies table by comment ID.
   * @param {string} commentId - The ID of the comment to verify replies for.
   * @returns {Promise<void>} - Resolves if replies exist, rejects with an error if not.
   */
  async cleanTable() {
    await pool.query("DELETE FROM replies WHERE 1=1");
  },
};

module.exports = RepliesTableTestHelper;
