const NewReply = require("../../../Domains/replies/entities/NewReply");
const AddedReply = require("../../../Domains/replies/entities/AddedReply");
const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const CommentRepository = require("../../../Domains/comments/CommentRepository");
const ReplyRepository = require("../../../Domains/replies/ReplyRepository");
const AddReplyUseCase = require("../AddReplyUseCase");

describe("AddReplyUseCase", () => {
  /**
   * @description
   * This test suite is for the AddReplyUseCase, which is responsible for adding a
   * reply to a comment in a thread. It verifies that the use case orchestrates the
   * addition of a reply correctly by interacting with the thread, comment, and reply repositories.
   * It checks that the thread and comment exist before adding the reply and that the reply is
   * added with the correct content and owner.
   * It also ensures that the added reply is returned in the expected format.
   */
  it("should orchestrating the add comment action correctly", async () => {
    // Arrange
    const useCasePayload = {
      threadId: "thread-123",
      commentId: "comment-123",
      content: "isi komen",
      owner: "user-123",
    };

    const mockAddedReply = new AddedReply({
      id: "comment-123",
      content: useCasePayload.content,
      owner: useCasePayload.owner,
    });

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    mockThreadRepository.verifyThreadExist = jest.fn(() => Promise.resolve());

    mockCommentRepository.verifyCommentExist = jest.fn(() => Promise.resolve());

    mockReplyRepository.addReply = jest.fn(() =>
      Promise.resolve({
        id: "comment-123",
        content: useCasePayload.content,
        owner: useCasePayload.owner,
      })
    );

    const addReplyUseCase = new AddReplyUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    // Action
    const addedReply = await addReplyUseCase.execute(useCasePayload);

    // Assert
    expect(mockThreadRepository.verifyThreadExist).toBeCalledWith(
      useCasePayload.threadId
    );
    expect(mockCommentRepository.verifyCommentExist).toBeCalledWith(
      useCasePayload.commentId
    );
    expect(mockReplyRepository.addReply).toBeCalledWith(
      new NewReply({
        commentId: useCasePayload.commentId,
        content: useCasePayload.content,
        owner: useCasePayload.owner,
      })
    );
    expect(addedReply).toStrictEqual(mockAddedReply);
  });
});
