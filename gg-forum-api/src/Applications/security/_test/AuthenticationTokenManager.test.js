// test for AuthenticationTokenManager interface
// which should throw an error when unimplemented methods are invoked

const AuthenticationTokenManager = require("../AuthenticationTokenManager");

// Tests for AuthenticationTokenManager interface
describe("AuthenticationTokenManager interface", () => {
  it("should throw error when invoke unimplemented method", async () => {
    // Arrange
    const tokenManager = new AuthenticationTokenManager();

    // Action & Assert
    await expect(tokenManager.createAccessToken("")).rejects.toThrowError(
      "AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED"
    );
    await expect(tokenManager.createRefreshToken("")).rejects.toThrowError(
      "AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED"
    );
    await expect(tokenManager.verifyRefreshToken("")).rejects.toThrowError(
      "AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED"
    );
    await expect(tokenManager.decodePayload("")).rejects.toThrowError(
      "AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED"
    );
  });
});
