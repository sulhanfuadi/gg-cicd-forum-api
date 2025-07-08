const EncryptionHelper = require("../../Applications/security/PasswordHash");
const AuthenticationError = require("../../Commons/exceptions/AuthenticationError");

class BcryptPasswordHash extends EncryptionHelper {
  constructor(bcrypt, saltRound = 10) {
    super();
    this._bcrypt = bcrypt;
    this._saltRound = saltRound;
  }

  /**
   * Hash a password using bcrypt
   * @param {string} password - The password to hash
   * @returns {Promise<string>} - The hashed password
   */
  async hash(password) {
    return this._bcrypt.hash(password, this._saltRound);
  }

  /**
   * Compare a plain password with a hashed password
   * @param {string} password - The plain password to compare
   * @param {string} hashedPassword - The hashed password to compare against
   * @returns {Promise<void>} - Resolves if the passwords match, rejects with AuthenticationError if they do not
   * @throws {AuthenticationError} If the passwords do not match
   */
  async comparePassword(password, hashedPassword) {
    const result = await this._bcrypt.compare(password, hashedPassword);

    if (!result) {
      throw new AuthenticationError("kredensial yang Anda masukkan salah");
    }
  }
}

module.exports = BcryptPasswordHash;
