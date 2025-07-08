const AddReplyUseCase = require("../../../../Applications/use_case/AddReplyUseCase");
const DeleteReplyUseCase = require("../../../../Applications/use_case/DeleteReplyUseCase");

class RepliesHandler {
  constructor(container) {
    this._container = container;

    this.postReplyHandler = this.postReplyHandler.bind(this);
    this.deleteReplyHandler = this.deleteReplyHandler.bind(this);
  }

  /**
   * Handles posting a reply to a comment in a thread.
   * @param {Object} request - The request object containing threadId, commentId, and reply content.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response containing the added reply data.
   */
  async postReplyHandler(request, h) {
    const { threadId, commentId } = request.params;
    const { content } = request.payload;
    const { id: owner } = request.auth.credentials;

    const addReplyUseCase = this._container.getInstance(AddReplyUseCase.name);
    const addedReply = await addReplyUseCase.execute({
      threadId,
      commentId,
      content,
      owner,
    });

    const response = h.response({
      status: "success",
      data: {
        addedReply,
      },
    });
    response.code(201);
    return response;
  }

  /**
   * Handles deleting a reply from a comment in a thread.
   * @param {Object} request - The request object containing threadId, commentId, and replyId.
   * @param {Object} h - The response toolkit.
   * @returns {Promise<Object>} The response indicating success.
   */
  async deleteReplyHandler(request, h) {
    const { threadId, commentId, replyId } = request.params;
    const { id: userId } = request.auth.credentials;

    const deleteReplyUseCase = this._container.getInstance(
      DeleteReplyUseCase.name
    );
    await deleteReplyUseCase.execute({
      threadId,
      commentId,
      replyId,
      userId,
    });

    const response = h.response({
      status: "success",
    });
    response.code(200);
    return response;
  }
}

module.exports = RepliesHandler;
