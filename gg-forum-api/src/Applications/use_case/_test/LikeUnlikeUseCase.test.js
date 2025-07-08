const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const CommentRepository = require("../../../Domains/comments/CommentRepository");
const LikeRepository = require("../../../Domains/likes/LikeRepository");
const LikeUnlikeUseCase = require("../LikeUnlikeUseCase");

describe("LikeUnlikeUseCase", () => {
  /**
   * @description
   * This test suite is for the LikeUnlikeUseCase, which is responsible for liking or
   * unliking a comment in a thread. It verifies that the use case orchestrates the
   * liking and unliking actions correctly by interacting with the thread, comment,
   * and like repositories.
   */
  it("should orchestrating the like action correctly", async () => {
    // Arrange
    const useCasePayload = {
      threadId: "thread-123",
      commentId: "comment-123",
      userId: "user-123",
    };

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockLikeRepository = new LikeRepository();

    mockThreadRepository.verifyThreadExist = jest.fn(() => Promise.resolve());
    mockCommentRepository.verifyCommentExist = jest.fn(() => Promise.resolve());
    mockLikeRepository.checkIfUserHasLikedComment = jest.fn(() =>
      Promise.resolve(false)
    );
    mockLikeRepository.likeComment = jest.fn(() => Promise.resolve());
    mockLikeRepository.unlikeComment = jest.fn(() => Promise.resolve());

    const likeUnlikeUseCase = new LikeUnlikeUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      likeRepository: mockLikeRepository,
    });

    // Action
    await likeUnlikeUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.verifyThreadExist).toBeCalledWith(
      useCasePayload.threadId
    );
    expect(mockCommentRepository.verifyCommentExist).toBeCalledWith(
      useCasePayload.commentId
    );
    expect(mockLikeRepository.checkIfUserHasLikedComment).toBeCalledWith({
      commentId: useCasePayload.commentId,
      userId: useCasePayload.userId,
    });
    expect(mockLikeRepository.likeComment).toBeCalledWith({
      commentId: useCasePayload.commentId,
      userId: useCasePayload.userId,
    });
    expect(mockLikeRepository.unlikeComment).not.toBeCalled();
  });

  it("should orchestrating the unlike action correctly", async () => {
    // Arrange
    const useCasePayload = {
      threadId: "thread-123",
      commentId: "comment-123",
      userId: "user-1234",
    };

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockLikeRepository = new LikeRepository();

    mockThreadRepository.verifyThreadExist = jest.fn(() => Promise.resolve());
    mockCommentRepository.verifyCommentExist = jest.fn(() => Promise.resolve());
    mockLikeRepository.checkIfUserHasLikedComment = jest.fn(() =>
      Promise.resolve(true)
    );
    mockLikeRepository.likeComment = jest.fn(() => Promise.resolve());
    mockLikeRepository.unlikeComment = jest.fn(() => Promise.resolve());

    const likeUnlikeUseCase = new LikeUnlikeUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      likeRepository: mockLikeRepository,
    });

    // Action
    await likeUnlikeUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.verifyThreadExist).toBeCalledWith(
      useCasePayload.threadId
    );
    expect(mockCommentRepository.verifyCommentExist).toBeCalledWith(
      useCasePayload.commentId
    );
    expect(mockLikeRepository.checkIfUserHasLikedComment).toBeCalledWith({
      commentId: useCasePayload.commentId,
      userId: useCasePayload.userId,
    });
    expect(mockLikeRepository.unlikeComment).toBeCalledWith({
      commentId: useCasePayload.commentId,
      userId: useCasePayload.userId,
    });
    expect(mockLikeRepository.likeComment).not.toBeCalled();
  });
});
