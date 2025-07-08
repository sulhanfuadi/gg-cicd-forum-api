const ClientError = require("../ClientError");
const InvariantError = require("../InvariantError");

describe("InvariantError", () => {
  /**
   * @description
   * This test suite is for the InvariantError, which is a custom error class
   * that extends ClientError. It is used to represent invariant violations in the application.
   */
  it("should create an error correctly", () => {
    const invariantError = new InvariantError("an error occurs");

    expect(invariantError).toBeInstanceOf(InvariantError);
    expect(invariantError).toBeInstanceOf(ClientError);
    expect(invariantError).toBeInstanceOf(Error);

    expect(invariantError.statusCode).toEqual(400);
    expect(invariantError.message).toEqual("an error occurs");
    expect(invariantError.name).toEqual("InvariantError");
  });
});
