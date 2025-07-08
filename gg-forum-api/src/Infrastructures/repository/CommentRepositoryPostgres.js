const CommentRepository = require("../../Domains/comments/CommentRepository");

const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const AuthorizationError = require("../../Commons/exceptions/AuthorizationError");

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  /**
   * addComment method to insert a new comment into the database
   * @param {Object} newComment - The comment data to be added
   * @param {string} newComment.threadId - The ID of the thread to which the comment belongs
   * @param {string} newComment.content - The content of the comment
   * @param {string} newComment.owner - The ID of the user who owns the comment
   * @returns {Promise<Object>} - The created comment object containing id, content,
   *  and owner
   * @throws {Error} If the comment creation fails
   */
  async addComment(newComment) {
    const { threadId, content, owner } = newComment;
    const id = `comment-${this._idGenerator()}`;

    const query = {
      text: "INSERT INTO comments (id, thread_id, content, owner) VALUES($1, $2, $3, $4) RETURNING id, content, owner",
      values: [id, threadId, content, owner],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  /**
   * verifyCommentExist method to check if a comment exists in the database
   * @param {string} commentId - The ID of the comment to verify
   * @returns {Promise<void>} - Resolves if the comment exists, rejects with NotFoundError if not
   * @throws {NotFoundError} If the comment is not found
   */
  async verifyCommentExist(commentId) {
    const query = {
      text: "SELECT 1 FROM comments WHERE id = $1",
      values: [commentId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Comment tidak ditemukan");
    }
  }

  /**
   * verifyCommentOwner method to check if the user is the owner of the comment
   * @param {Object} params - The parameters containing commentId and userId
   * @param {string} params.commentId - The ID of the comment to verify
   * @param {string} params.userId - The ID of the user to check ownership
   * @returns {Promise<void>} - Resolves if the user is the owner, rejects with AuthorizationError if not
   * @throws {AuthorizationError} If the user is not the owner of the comment
   */
  async verifyCommentOwner({ commentId, userId }) {
    const query = {
      text: "SELECT 1 FROM comments WHERE id = $1 AND owner = $2",
      values: [commentId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError("Anda tidak berhak menghapus comment ini");
    }
  }

  /**
   * deleteCommentById method to mark a comment as deleted in the database
   * @param {string} commentId - The ID of the comment to be deleted
   * @returns {Promise<void>} - Resolves when the comment is successfully marked as deleted
   */
  async deleteCommentById(commentId) {
    const query = {
      text: "UPDATE comments SET is_deleted = true WHERE id=$1",
      values: [commentId],
    };

    await this._pool.query(query);
  }

  /**
   * getCommentsByThreadId method to retrieve all comments for a specific thread
   * @param {string} threadId - The ID of the thread for which to retrieve comments
   * @returns {Promise<Array>} - An array of comment objects containing id, username, date, content, and is_deleted status
   * @throws {Error} If the retrieval fails
   */
  async getCommentsByThreadId(threadId) {
    const query = {
      text: "SELECT comments.id, users.username, comments.date, comments.content, comments.is_deleted FROM comments JOIN users ON comments.owner = users.id WHERE comments.thread_id = $1 ORDER BY comments.date ASC",
      values: [threadId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = CommentRepositoryPostgres;
