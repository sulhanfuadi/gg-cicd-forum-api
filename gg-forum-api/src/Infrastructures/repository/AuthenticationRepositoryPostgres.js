const InvariantError = require("../../Commons/exceptions/InvariantError");
const AuthenticationRepository = require("../../Domains/authentications/AuthenticationRepository");

class AuthenticationRepositoryPostgres extends AuthenticationRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  /**
   * addToken method to insert a new token into the authentications table
   * @param {string} token - The token to be added
   * @returns {Promise<void>}
   */
  async addToken(token) {
    const query = {
      text: "INSERT INTO authentications VALUES ($1)",
      values: [token],
    };

    await this._pool.query(query);
  }

  /**
   * checkAvailabilityToken method to verify if a token exists in the authentications table
   * @param {string} token - The token to check
   * @returns {Promise<void>}
   * @throws {InvariantError} If the token is not found in the database
   */
  async checkAvailabilityToken(token) {
    const query = {
      text: "SELECT * FROM authentications WHERE token = $1",
      values: [token],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new InvariantError("refresh token tidak ditemukan di database");
    }
  }

  /**
   * deleteToken method to remove a token from the authentications table
   * @param {string} token - The token to be deleted
   * @returns {Promise<void>}
   */
  async deleteToken(token) {
    const query = {
      text: "DELETE FROM authentications WHERE token = $1",
      values: [token],
    };

    await this._pool.query(query);
  }
}

module.exports = AuthenticationRepositoryPostgres;
