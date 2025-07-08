const InvariantError = require("../../Commons/exceptions/InvariantError");
const RegisteredUser = require("../../Domains/users/entities/RegisteredUser");
const UserRepository = require("../../Domains/users/UserRepository");

class UserRepositoryPostgres extends UserRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  /**
   * verifyAvailableUsername method to check if a username is available
   * @param {string} username - The username to check
   * @returns {Promise<void>} - Resolves if the username is available, rejects with an InvariantError if not
   * @throws {InvariantError} If the username is not available
   */
  async verifyAvailableUsername(username) {
    const query = {
      text: "SELECT username FROM users WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError("username tidak tersedia");
    }
  }

  /**
   * addUser method to insert a new user into the database
   * @param {Object} registerUser - The user registration data
   * @param {string} registerUser.username - The username of the user
   * @param {string} registerUser.password - The password of the user
   * @param {string} registerUser.fullname - The full name of the user
   * @returns {Promise<RegisteredUser>} - The registered user object
   * @throws {InvariantError} If the user registration fails
   */
  async addUser(registerUser) {
    const { username, password, fullname } = registerUser;
    const id = `user-${this._idGenerator()}`;

    const query = {
      text: "INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id, username, fullname",
      values: [id, username, password, fullname],
    };

    const result = await this._pool.query(query);

    return new RegisteredUser({ ...result.rows[0] });
  }

  /**
   * getPasswordByUsername method to retrieve the password of a user by username
   * @param {string} username - The username of the user
   * @returns {Promise<string>} - The password of the user
   * @throws {InvariantError} If the username is not found
   */
  async getPasswordByUsername(username) {
    const query = {
      text: "SELECT password FROM users WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("username tidak ditemukan");
    }

    return result.rows[0].password;
  }

  /**
   * getIdByUsername method to retrieve the user ID by username
   * @param {string} username - The username of the user
   * @returns {Promise<string>} - The ID of the user
   * @throws {InvariantError} If the user is not found
   */
  async getIdByUsername(username) {
    const query = {
      text: "SELECT id FROM users WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError("user tidak ditemukan");
    }

    const { id } = result.rows[0];

    return id;
  }
}

module.exports = UserRepositoryPostgres;
