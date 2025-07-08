// PasswordHash is an abstract class that defines the contract for hashing passwords.
// It includes methods for hashing a password and comparing a plain password with an encrypted one.

class PasswordHash {
  /**
   * Hashes a password.
   * @param {string} password - The password to hash.
   * @returns {Promise<string>} - A promise that resolves to the hashed password.
   */
  async hash(password) {
    throw new Error("PASSWORD_HASH.METHOD_NOT_IMPLEMENTED");
  }

  /**
   * Compares a plain password with an encrypted one.
   * @param {string} plain - The plain password to compare.
   * @param {string} encrypted - The encrypted password to compare against.
   * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, false otherwise.
   */
  async comparePassword(plain, encrypted) {
    throw new Error("PASSWORD_HASH.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = PasswordHash;
