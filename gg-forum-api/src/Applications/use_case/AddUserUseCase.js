// Use Case for adding a thread to the forum

const RegisterUser = require("../../Domains/users/entities/RegisterUser");

class AddUserUseCase {
  /**
   * @param {Object} dependencies - The dependencies for the use case.
   * @param {Object} dependencies.userRepository - The user repository.
   * @param {Object} dependencies.passwordHash - The password hashing utility.
   */
  constructor({ userRepository, passwordHash }) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
  }

  /**
   * Executes the use case to add a user.
   * @param {Object} useCasePayload - The payload containing the user details.
   * @param {string} useCasePayload.username - The username of the user.
   * @param {string} useCasePayload.password - The password of the user.
   * @returns {Promise<string>} - A promise that resolves to the ID of the added user.
   */
  async execute(useCasePayload) {
    const registerUser = new RegisterUser(useCasePayload);
    await this._userRepository.verifyAvailableUsername(registerUser.username);
    registerUser.password = await this._passwordHash.hash(
      registerUser.password
    );
    return this._userRepository.addUser(registerUser);
  }
}

module.exports = AddUserUseCase;
