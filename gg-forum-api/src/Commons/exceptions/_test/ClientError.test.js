const ClientError = require("../ClientError");

describe("ClientError", () => {
  /**
   * @description
   * This test suite is for the ClientError, which is an abstract class that extends the built-in Error class.
   * It is used as a base class for other specific error classes in the application.
   */
  it("should throw error when directly use it", () => {
    expect(() => new ClientError("")).toThrowError(
      "cannot instantiate abstract class"
    );
  });
});
