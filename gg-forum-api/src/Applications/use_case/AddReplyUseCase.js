// Use Case for adding a reply to a comment in a thread

const NewReply = require("../../Domains/replies/entities/NewReply");
const AddedReply = require("../../Domains/replies/entities/AddedReply");

class AddReplyUseCase {
  /**
   * @param {Object} dependencies - The dependencies for the use case.
   * @param {Object} dependencies.threadRepository - The thread repository.
   * @param {Object} dependencies.commentRepository - The comment repository.
   * @param {Object} dependencies.replyRepository - The reply repository.
   */
  constructor({ threadRepository, commentRepository, replyRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
  }
  /**
   * Executes the use case to add a reply to a comment in a thread.
   * @param {Object} useCasePayload - The payload containing the reply details.
   * @param {string} useCasePayload.content - The content of the reply.
   * @param {string} useCasePayload.commentId - The ID of the comment to which the reply is added.
   * @param {string} useCasePayload.owner - The owner of the reply.
   * @returns {Promise<AddedReply>} - A promise that resolves to the added reply.
   */
  async execute(useCasePayload) {
    await this._threadRepository.verifyThreadExist(useCasePayload.threadId);
    await this._commentRepository.verifyCommentExist(useCasePayload.commentId);
    const newReply = new NewReply({
      content: useCasePayload.content,
      commentId: useCasePayload.commentId,
      owner: useCasePayload.owner,
    });
    const addedReply = await this._replyRepository.addReply(newReply);
    return new AddedReply(addedReply);
  }
}

module.exports = AddReplyUseCase;
