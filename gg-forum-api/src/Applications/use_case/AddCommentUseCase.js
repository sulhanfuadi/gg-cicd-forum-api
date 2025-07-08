// Use Case for adding a comment to a thread

const NewComment = require("../../Domains/comments/entities/NewComment");
const AddedComment = require("../../Domains/comments/entities/AddedComment");

class AddCommentUseCase {
  /**
   * @param {Object} dependencies - The dependencies for the use case.
   * @param {Object} dependencies.commentRepository - The comment repository.
   * @param {Object} dependencies.threadRepository - The thread repository.
   */
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  /**
   * Executes the use case to add a comment to a thread.
   * @param {Object} useCasePayload - The payload containing the comment details.
   * @param {string} useCasePayload.content - The content of the comment.
   * @param {string} useCasePayload.threadId - The ID of the thread to which the comment is added.
   * @param {string} useCasePayload.owner - The owner of the comment.
   * @returns {Promise<AddedComment>} - A promise that resolves to the added comment.
   */
  async execute(useCasePayload) {
    await this._threadRepository.verifyThreadExist(useCasePayload.threadId);
    const newComment = new NewComment(useCasePayload);
    const addedComment = await this._commentRepository.addComment(newComment);
    return new AddedComment(addedComment);
  }
}

module.exports = AddCommentUseCase;
