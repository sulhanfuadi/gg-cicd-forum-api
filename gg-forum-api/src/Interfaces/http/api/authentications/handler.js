const LoginUserUseCase = require("../../../../Applications/use_case/LoginUserUseCase");
const RefreshAuthenticationUseCase = require("../../../../Applications/use_case/RefreshAuthenticationUseCase");
const LogoutUserUseCase = require("../../../../Applications/use_case/LogoutUserUseCase");

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler =
      this.deleteAuthenticationHandler.bind(this);
  }

  /**
   * Handles user login by executing the LoginUserUseCase.
   * @param {Object} request - The request object containing user credentials.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response containing access and refresh tokens.
   */
  async postAuthenticationHandler(request, h) {
    const loginUserUseCase = this._container.getInstance(LoginUserUseCase.name);
    const { accessToken, refreshToken } = await loginUserUseCase.execute(
      request.payload
    );
    const response = h.response({
      status: "success",
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  /**
   * Handles token refresh by executing the RefreshAuthenticationUseCase.
   * @param {Object} request - The request object containing the refresh token.
   * @returns {Promise<Object>} The response containing the new access token.
   */
  async putAuthenticationHandler(request) {
    const refreshAuthenticationUseCase = this._container.getInstance(
      RefreshAuthenticationUseCase.name
    );
    const accessToken = await refreshAuthenticationUseCase.execute(
      request.payload
    );

    return {
      status: "success",
      data: {
        accessToken,
      },
    };
  }

  /**
   * Handles user logout by executing the LogoutUserUseCase.
   * @param {Object} request - The request object containing the refresh token.
   * @returns {Promise<Object>} The response indicating success.
   */
  async deleteAuthenticationHandler(request) {
    const logoutUserUseCase = this._container.getInstance(
      LogoutUserUseCase.name
    );
    await logoutUserUseCase.execute(request.payload);
    return {
      status: "success",
    };
  }
}

module.exports = AuthenticationsHandler;
