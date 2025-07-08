// test for PasswordHash interface
// which should throw an error when abstract methods are invoked

const EncryptionHelper = require("../PasswordHash");

// Tests for EncryptionHelper interface
describe("EncryptionHelper interface", () => {
  it("should throw error when invoke abstract behavior", async () => {
    // Arrange
    const encryptionHelper = new EncryptionHelper();

    // Action & Assert
    await expect(encryptionHelper.hash("dummy_password")).rejects.toThrowError(
      "PASSWORD_HASH.METHOD_NOT_IMPLEMENTED"
    );
    await expect(
      encryptionHelper.comparePassword("plain", "encrypted")
    ).rejects.toThrowError("PASSWORD_HASH.METHOD_NOT_IMPLEMENTED");
  });
});
