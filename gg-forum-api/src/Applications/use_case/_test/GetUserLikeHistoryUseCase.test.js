const LikeRepository = require("../../../Domains/likes/LikeRepository");
const GetUserLikeHistoryUseCase = require("../GetUserLikeHistoryUseCase");

describe("GetUserLikeHistoryUseCase", () => {
  it("should orchestrate the get user like history action correctly", async () => {
    // Arrange
    const userId = "user-123";
    const expectedLikedComments = ["comment-123", "comment-456"];

    const mockLikeRepository = new LikeRepository();
    mockLikeRepository.getUserLikeHistory = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedLikedComments));

    const getUserLikeHistoryUseCase = new GetUserLikeHistoryUseCase({
      likeRepository: mockLikeRepository,
    });

    // Action
    const likedComments = await getUserLikeHistoryUseCase.execute(userId);

    // Assert
    expect(mockLikeRepository.getUserLikeHistory).toBeCalledWith(userId);
    expect(likedComments).toEqual(expectedLikedComments);
  });
});
