class UserRepository {
  /**
   * Adds a new user to the repository.
   * @param {Object} registerUser - The user data to be added.
   * @throws {Error} If the method is not implemented.
   */
  async addUser(registerUser) {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  /**
   * Verifies if a username is available.
   * @param {string} username - The username to verify.
   * @throws {Error} If the method is not implemented.
   */
  async verifyAvailableUsername(username) {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  /**
   * Verifies if an email is available.
   * @param {string} email - The email to verify.
   * @throws {Error} If the method is not implemented.
   */
  async getPasswordByUsername(username) {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  /**
   * Gets the user ID by username.
   * @param {string} username - The username to get the ID for.
   * @returns {Promise<string>} - The user ID associated with the username.
   * @throws {Error} If the method is not implemented.
   */
  async getIdByUsername(username) {
    throw new Error("USER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = UserRepository;
