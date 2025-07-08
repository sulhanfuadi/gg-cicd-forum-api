const pool = require("../src/Infrastructures/database/postgres/pool");

const CommentsTableTestHelper = {
  /**
   * Adds a comment to the comments table for testing purposes.
   * @param {Object} params - The parameters for the comment.
   * @param {string} params.id - The ID of the comment.
   * @param {string} params.threadId - The ID of the thread the comment belongs to.
   * @param {string} params.content - The content of the comment.
   * @param {string} params.owner - The ID of the user who owns the comment.
   * @param {Date} params.date - The date of the comment.
   * @param {boolean} params.isDeleted - Whether the comment is deleted.
   * @returns {Promise<void>} - Resolves when the comment is added.
   */
  async addComment({
    id = "comment-123",
    threadId = "thread-123",
    content = "isi komen",
    owner = "user-123",
    date = new Date(),
    isDeleted = false,
  } = {}) {
    const query = {
      text: "INSERT INTO comments (id, thread_id, content, owner, date, is_deleted) VALUES($1, $2, $3, $4, $5, $6)",
      values: [id, threadId, content, owner, date, isDeleted],
    };

    await pool.query(query);
  },

  /**
   * Verifies if a comment exists in the comments table.
   * @param {string} id - The ID of the comment to verify.
   * @returns {Promise<void>} - Resolves if the comment exists, rejects with an error if not.
   */
  async findCommentById(id) {
    const query = {
      text: "SELECT * FROM comments WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  /**
   * Verifies if a comment exists in the comments table by thread ID.
   * @param {string} threadId - The ID of the thread to verify comments for.
   * @returns {Promise<void>} - Resolves if comments exist, rejects with an error if not.
   */
  async markDeleted(id) {
    const query = {
      text: "UPDATE comments SET is_deleted = true WHERE id = $1",
      values: [id],
    };

    await pool.query(query);
  },

  /**
   * Deletes all comments from the comments table for testing purposes.
   * @returns {Promise<void>} - Resolves when the table is cleaned.
   */
  async cleanTable() {
    await pool.query("DELETE FROM comments WHERE 1=1");
  },
};

module.exports = CommentsTableTestHelper;
