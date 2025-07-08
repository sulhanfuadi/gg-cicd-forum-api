const pool = require("../src/Infrastructures/database/postgres/pool");

const ThreadsTableTestHelper = {
  /**
   * Adds a thread to the threads table for testing purposes.
   * @param {Object} params - The parameters for the thread.
   * @param {string} params.id - The ID of the thread.
   * @param {string} params.title - The title of the thread.
   * @param {string} params.body - The body of the thread.
   * @param {string} params.owner - The ID of the user who owns the thread.
   * @param {Date} params.date - The date of the thread.
   * @returns {Promise<void>} - Resolves when the thread is added.
   */
  async addThread({
    id = "thread-123",
    title = "judul",
    body = "isi",
    owner = "user-123",
    date = new Date(),
  } = {}) {
    const query = {
      text: "INSERT INTO threads (id, title, body, owner, date) VALUES($1, $2, $3, $4, $5)",
      values: [id, title, body, owner, date],
    };

    await pool.query(query);
  },

  /**
   * Verifies if a thread exists in the threads table.
   * @param {string} id - The ID of the thread to verify.
   * @returns {Promise<void>} - Resolves if the thread exists, rejects with an error if not.
   */
  async findThreadById(id) {
    const query = {
      text: "SELECT * FROM threads WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  /**
   * Verifies if a thread exists in the threads table by title.
   * @param {string} title - The title of the thread to verify.
   * @returns {Promise<void>} - Resolves if the thread exists, rejects with an error if not.
   */
  async cleanTable() {
    await pool.query("DELETE FROM threads WHERE 1=1");
  },
};

module.exports = ThreadsTableTestHelper;
