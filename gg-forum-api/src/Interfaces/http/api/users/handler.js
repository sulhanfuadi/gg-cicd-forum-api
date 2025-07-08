const AddUserUseCase = require("../../../../Applications/use_case/AddUserUseCase");

class UsersHandler {
  constructor(container) {
    this._container = container;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  /**
   * Handles user registration by executing the AddUserUseCase.
   * @param {Object} request - The request object containing user data.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response containing the added user data.
   */
  async postUserHandler(request, h) {
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(request.payload);

    const response = h.response({
      status: "success",
      data: {
        addedUser,
      },
    });
    response.code(201);
    return response;
  }
}

module.exports = UsersHandler;
