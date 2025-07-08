// Use Case for getting thread details along with comments and replies

const ThreadDetails = require("../../Domains/threads/entities/ThreadDetails");
const CommentDetails = require("../../Domains/comments/entities/CommentDetails");
const ReplyDetails = require("../../Domains/replies/entities/ReplyDetails");

class GetThreadUseCaseUseCase {
  /**
   * @param {Object} dependencies - The dependencies for the use case.
   * @param {Object} dependencies.threadRepository - The thread repository.
   * @param {Object} dependencies.commentRepository - The comment repository.
   * @param {Object} dependencies.replyRepository - The reply repository.
   * @param {Object} dependencies.likeRepository - The like repository.
   */
  constructor({
    threadRepository,
    commentRepository,
    replyRepository,
    likeRepository,
  }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
    this._likeRepository = likeRepository;
  }

  /**
   * Executes the use case to get thread details along with comments and replies.
   * @param {Object} useCasePayload - The payload containing the thread ID.
   * @param {string} useCasePayload.threadId - The ID of the thread to be retrieved.
   * @returns {Promise<ThreadDetails>} - A promise that resolves to the thread details
   * including comments and replies.
   * @throws {Error} - Throws an error if the thread does not exist.
   * @throws {Error} - Throws an error if the thread ID is not provided.
   * @throws {Error} - Throws an error if there are issues retrieving comments or replies.
   * @throws {Error} - Throws an error if there are issues counting comment likes.
   */
  async execute(useCasePayload) {
    await this._threadRepository.verifyThreadExist(useCasePayload);

    const thread = await this._threadRepository.getThreadById(useCasePayload);

    const comments = await this._commentRepository.getCommentsByThreadId(
      useCasePayload
    );

    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await this._replyRepository.getRepliesByCommentId(
          comment.id
        );
        const formattedReplies = replies.map(
          (reply) => new ReplyDetails(reply)
        );

        const likeCount = await this._likeRepository.countCommentLikes(
          comment.id
        );

        return new CommentDetails({
          ...comment,
          likeCount,
          replies: formattedReplies,
        });
      })
    );

    return new ThreadDetails({ ...thread, comments: commentsWithReplies });
  }
}

module.exports = GetThreadUseCaseUseCase;
