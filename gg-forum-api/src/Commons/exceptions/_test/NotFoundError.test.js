const NotFoundError = require("../NotFoundError");
const ClientError = require("../ClientError");

describe("NotFoundError", () => {
  /**
   * @description
   * This test suite is for the NotFoundError, which is a custom error class
   * that extends ClientError. It is used to represent not found errors in the application.
   */
  it("should create error correctly", () => {
    const notFoundError = new NotFoundError("not found!");

    expect(notFoundError).toBeInstanceOf(NotFoundError);
    expect(notFoundError).toBeInstanceOf(ClientError);
    expect(notFoundError).toBeInstanceOf(Error);

    expect(notFoundError.message).toEqual("not found!");
    expect(notFoundError.statusCode).toEqual(404);
    expect(notFoundError.name).toEqual("NotFoundError");
  });
});
