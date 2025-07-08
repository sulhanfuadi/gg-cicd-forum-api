const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const CommentRepository = require("../../../Domains/comments/CommentRepository");
const ReplyRepository = require("../../../Domains/replies/ReplyRepository");
const DeleteReplyUseCase = require("../DeleteReplyUseCase");

describe("DeleteReplyUseCase", () => {
  /**
   * @description
   * This test suite is for the DeleteReplyUseCase, which is responsible for deleting a
   * reply from a comment in a thread. It verifies that the use case orchestrates the
   * deletion of a reply correctly by interacting with the thread, comment, and reply repositories.
   */
  it("should orchestrating the delete reply action correctly", async () => {
    // Arrange
    const useCasePayload = {
      threadId: "thread-123",
      commentId: "comment-123",
      replyId: "reply-123",
      userId: "user-123",
    };

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    mockThreadRepository.verifyThreadExist = jest.fn(() => Promise.resolve());

    mockCommentRepository.verifyCommentExist = jest.fn(() => Promise.resolve());

    mockReplyRepository.verifyReplyExist = jest.fn(() => Promise.resolve());

    mockReplyRepository.verifyReplyOwner = jest.fn(() => Promise.resolve());

    mockReplyRepository.deleteReplyById = jest.fn(() => Promise.resolve());

    const deleteReplyUseCase = new DeleteReplyUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    // Action
    await deleteReplyUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.verifyThreadExist).toBeCalledWith(
      useCasePayload.threadId
    );
    expect(mockCommentRepository.verifyCommentExist).toBeCalledWith(
      useCasePayload.commentId
    );
    expect(mockReplyRepository.verifyReplyExist).toBeCalledWith(
      useCasePayload.replyId
    );
    expect(mockReplyRepository.verifyReplyOwner).toBeCalledWith({
      replyId: useCasePayload.replyId,
      userId: useCasePayload.userId,
    });
    expect(mockReplyRepository.deleteReplyById).toBeCalledWith(
      useCasePayload.replyId
    );
  });
});
