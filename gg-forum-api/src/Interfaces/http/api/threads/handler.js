const AddThreadUseCase = require("../../../../Applications/use_case/AddThreadUseCase");
const GetThreadUseCase = require("../../../../Applications/use_case/GetThreadUseCase");

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.getThreadHandler = this.getThreadHandler.bind(this);
  }

  /**
   * Handles thread creation by executing the AddThreadUseCase.
   * @param {Object} request - The request object containing thread data.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response containing the added thread data.
   */
  async postThreadHandler(request, h) {
    const { title, body } = request.payload;
    const { id: owner } = request.auth.credentials;

    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute({ title, body, owner });

    const response = h.response({
      status: "success",
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  /**
   * Handles fetching a thread by executing the GetThreadUseCase.
   * @param {Object} request - The request object containing the thread ID.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response containing the thread data.
   */
  async getThreadHandler(request, h) {
    const { threadId } = request.params;

    const getThreadUseCase = this._container.getInstance(GetThreadUseCase.name);
    const thread = await getThreadUseCase.execute(threadId);

    const response = h.response({
      status: "success",
      data: {
        thread,
      },
    });
    response.code(200);
    return response;
  }
}

module.exports = ThreadsHandler;
