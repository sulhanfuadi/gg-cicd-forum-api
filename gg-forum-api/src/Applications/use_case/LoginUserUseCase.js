// Use Case for logging in a user

const UserLogin = require("../../Domains/users/entities/UserLogin");
const NewAuthentication = require("../../Domains/authentications/entities/NewAuth");

class LoginUserUseCase {
  /**
   * @param {Object} dependencies - The dependencies for the use case.
   * @param {Object} dependencies.userRepository - The user repository.
   * @param {Object} dependencies.authenticationRepository - The authentication repository.
   * @param {Object} dependencies.authenticationTokenManager - The authentication token manager.
   * @param {Object} dependencies.passwordHash - The password hashing utility.
   */
  constructor({
    userRepository,
    authenticationRepository,
    authenticationTokenManager,
    passwordHash,
  }) {
    this._userRepository = userRepository;
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
    this._passwordHash = passwordHash;
  }

  /**
   * Executes the use case to log in a user.
   * @param {Object} useCasePayload - The payload containing the login details.
   * @param {string} useCasePayload.username - The username of the user.
   * @param {string} useCasePayload.password - The password of the user.
   * @returns {Promise<NewAuthentication>} - A promise that resolves to the new authentication object containing access and refresh tokens.
   */
  async execute(useCasePayload) {
    const { username, password } = new UserLogin(useCasePayload);

    const encryptedPassword = await this._userRepository.getPasswordByUsername(
      username
    );

    await this._passwordHash.comparePassword(password, encryptedPassword);

    const id = await this._userRepository.getIdByUsername(username);

    const accessToken =
      await this._authenticationTokenManager.createAccessToken({
        username,
        id,
      });
    const refreshToken =
      await this._authenticationTokenManager.createRefreshToken({
        username,
        id,
      });

    const newAuthentication = new NewAuthentication({
      accessToken,
      refreshToken,
    });

    await this._authenticationRepository.addToken(
      newAuthentication.refreshToken
    );

    return newAuthentication;
  }
}

module.exports = LoginUserUseCase;
