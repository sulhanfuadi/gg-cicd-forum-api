const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const CommentRepository = require("../../../Domains/comments/CommentRepository");
const DeleteCommentUseCase = require("../DeleteCommentUseCase");

describe("DeleteCommentUseCase", () => {
  /**
   * @description
   * This test suite is for the DeleteCommentUseCase, which is responsible for deleting a
   * comment from a thread in the forum. It verifies that the use case orchestrates the
   * deletion of a comment correctly by interacting with the thread and comment repositories.
   */
  it("should orchestrating the delete comment action correctly", async () => {
    // Arrange
    const useCasePayload = {
      threadId: "thread-123",
      commentId: "comment-123",
      userId: "user-123",
    };

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.verifyThreadExist = jest.fn(() => Promise.resolve());

    mockCommentRepository.verifyCommentExist = jest.fn(() => Promise.resolve());

    mockCommentRepository.verifyCommentOwner = jest.fn(() => Promise.resolve());

    mockCommentRepository.deleteCommentById = jest.fn(() => Promise.resolve());

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    await deleteCommentUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.verifyThreadExist).toBeCalledWith(
      useCasePayload.threadId
    );
    expect(mockCommentRepository.verifyCommentExist).toBeCalledWith(
      useCasePayload.commentId
    );
    expect(mockCommentRepository.verifyCommentOwner).toBeCalledWith({
      commentId: useCasePayload.commentId,
      userId: useCasePayload.userId,
    });
    expect(mockCommentRepository.deleteCommentById).toBeCalledWith(
      useCasePayload.commentId
    );
  });
});
