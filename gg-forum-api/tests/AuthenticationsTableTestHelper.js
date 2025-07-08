// Description: A helper module for managing the authentications table in tests

const pool = require("../src/Infrastructures/database/postgres/pool");

const AuthenticationsTableTestHelper = {
  /**
   * Adds a token to the authentications table
   * @param {string} token - The token to be added
   * @returns {Promise<void>}
   */
  async addToken(token) {
    const query = {
      text: "INSERT INTO authentications VALUES($1)",
      values: [token],
    };

    await pool.query(query);
  },

  /**
   * Checks if a token is available in the authentications table
   * @param {string} token - The token to check
   * @returns {Promise<void>}
   * @throws {InvariantError} If the token is not found in the database
   */
  async findToken(token) {
    const query = {
      text: "SELECT token FROM authentications WHERE token = $1",
      values: [token],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  /**
   * Deletes a token from the authentications table
   * @param {string} token - The token to be deleted
   * @returns {Promise<void>}
   */
  async cleanTable() {
    await pool.query("DELETE FROM authentications WHERE 1=1");
  },
};

module.exports = AuthenticationsTableTestHelper;
