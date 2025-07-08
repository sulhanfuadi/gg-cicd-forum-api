const AuthenticationError = require("../AuthenticationError");
const ClientError = require("../ClientError");

describe("AuthenticationError", () => {
  /**
   * @description
   * This test suite is for the AuthenticationError, which is a custom error class
   * that extends ClientError. It is used to represent authentication-related errors
   * in the application.
   */
  it("should create AuthenticationError correctly", () => {
    const authenticationError = new AuthenticationError(
      "authentication error!"
    );

    expect(authenticationError).toBeInstanceOf(AuthenticationError);
    expect(authenticationError).toBeInstanceOf(ClientError);
    expect(authenticationError).toBeInstanceOf(Error);

    expect(authenticationError.statusCode).toEqual(401);
    expect(authenticationError.message).toEqual("authentication error!");
    expect(authenticationError.name).toEqual("AuthenticationError");
  });
});
