const pool = require("../src/Infrastructures/database/postgres/pool");

const UsersTableTestHelper = {
  /**
   * Adds a user to the users table for testing purposes.
   * @param {Object} params - The parameters for the user.
   * @param {string} params.id - The ID of the user.
   * @param {string} params.username - The username of the user.
   * @param {string} params.password - The password of the user.
   * @param {string} params.fullname - The full name of the user.
   * @returns {Promise<void>} - Resolves when the user is added.
   */
  async addUser({
    id = "user-123",
    username = "dicoding",
    password = "secret",
    fullname = "Dicoding Indonesia",
  }) {
    const query = {
      text: "INSERT INTO users VALUES($1, $2, $3, $4)",
      values: [id, username, password, fullname],
    };

    await pool.query(query);
  },

  /**
   * Finds a user by their ID.
   * @param {string} id - The ID of the user to find.
   * @returns {Promise<Array>} - Resolves to an array containing the user if found, or an empty array if not found.
   */
  async findUsersById(id) {
    const query = {
      text: "SELECT * FROM users WHERE id = $1",
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  /**
   * Verifies if a user exists in the users table by username.
   * @param {string} username - The username of the user to verify.
   * @returns {Promise<void>} - Resolves if the user exists, rejects with an error if not.
   */
  async cleanTable() {
    await pool.query("DELETE FROM users WHERE 1=1");
  },
};

module.exports = UsersTableTestHelper;
