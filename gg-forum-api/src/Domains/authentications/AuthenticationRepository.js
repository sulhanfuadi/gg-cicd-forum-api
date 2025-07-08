class AuthenticationRepository {
  /**
   * This method is for adding a token to the repository.
   * @param {Object} token - The token to be added.
   * @throws {Error} If the method is not implemented.
   */
  async addToken(token) {
    throw new Error("AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  /**
   * This method checks if a token is available in the repository.
   * @param {string} token - The token to check for availability.
   * @throws {Error} If the method is not implemented.
   */
  async checkAvailabilityToken(token) {
    throw new Error("AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  /**
   * This method deletes a token from the repository.
   * @param {string} token - The token to be deleted.
   * @throws {Error} If the method is not implemented.
   */
  async deleteToken(token) {
    throw new Error("AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = AuthenticationRepository;
