const ClientError = require("../ClientError");
const AuthorizationError = require("../AuthorizationError");

describe("AuthorizationError", () => {
  /**
   * @description
   * This test suite is for the AuthorizationError, which is a custom error class
   * that extends ClientError. It is used to represent authorization-related errors
   * in the application.
   */
  it("should create AuthorizationError correctly", () => {
    const authenticationError = new AuthorizationError("authorization error!");

    expect(authenticationError).toBeInstanceOf(AuthorizationError);
    expect(authenticationError).toBeInstanceOf(ClientError);
    expect(authenticationError).toBeInstanceOf(Error);

    expect(authenticationError.statusCode).toEqual(403);
    expect(authenticationError.message).toEqual("authorization error!");
    expect(authenticationError.name).toEqual("AuthorizationError");
  });
});
