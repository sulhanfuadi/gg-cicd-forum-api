const ReplyRepository = require("../../Domains/replies/ReplyRepository");

const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const AuthorizationError = require("../../Commons/exceptions/AuthorizationError");

class ReplyRepositoryPostgres extends ReplyRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  /**
   * addReply method to insert a new reply into the database
   * @param {Object} newReply - The reply data to be added
   * @param {string} newReply.content - The content of the reply
   * @param {string} newReply.commentId - The ID of the comment to which the reply belongs
   * @param {string} newReply.owner - The ID of the user who owns the reply
   * @returns {Promise<Object>} - The created reply object containing id, content, and owner
   * @throws {Error} If the reply creation fails
   */
  async addReply(newReply) {
    const { content, commentId, owner } = newReply;
    const id = `reply-${this._idGenerator()}`;

    const query = {
      text: "INSERT INTO replies (id, content, comment_id, owner) VALUES($1, $2, $3, $4) RETURNING id, content, owner",
      values: [id, content, commentId, owner],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  /**
   * verifyReplyExist method to check if a reply exists in the database
   * @param {string} replyId - The ID of the reply to verify
   * @returns {Promise<void>} - Resolves if the reply exists, rejects with NotFoundError if not
   * @throws {NotFoundError} If the reply is not found
   */
  async verifyReplyExist(replyId) {
    const query = {
      text: "SELECT 1 FROM replies WHERE id = $1",
      values: [replyId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Reply tidak ditemukan");
    }
  }

  /**
   * verifyReplyOwner method to check if the user is the owner of the reply
   * @param {Object} params - The parameters containing replyId and userId
   * @param {string} params.replyId - The ID of the reply to verify
   * @param {string} params.userId - The ID of the user to check ownership
   * @returns {Promise<void>} - Resolves if the user is the owner, rejects with AuthorizationError if not
   * @throws {AuthorizationError} If the user is not the owner of the reply
   */
  async verifyReplyOwner({ replyId, userId }) {
    const query = {
      text: "SELECT 1 FROM replies WHERE id = $1 AND owner = $2",
      values: [replyId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError("Anda tidak berhak menghapus reply ini");
    }
  }

  /**
   * deleteReplyById method to mark a reply as deleted in the database
   * @param {string} replyId - The ID of the reply to be deleted
   * @returns {Promise<void>} - Resolves when the reply is successfully marked as deleted
   */
  async deleteReplyById(replyId) {
    const query = {
      text: "UPDATE replies SET is_deleted = true WHERE id=$1",
      values: [replyId],
    };

    await this._pool.query(query);
  }

  /**
   * getRepliesByCommentId method to retrieve all replies for a specific comment
   * @param {string} commentId - The ID of the comment for which to retrieve replies
   * @returns {Promise<Array>} - An array of reply objects containing id, username, date, content, and is_deleted status
   * @throws {Error} If the retrieval fails
   */
  async getRepliesByCommentId(commentId) {
    const query = {
      text: "SELECT replies.id, users.username, replies.date, replies.content, replies.is_deleted FROM replies JOIN users ON replies.owner = users.id WHERE replies.comment_id = $1 ORDER BY replies.date ASC",
      values: [commentId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = ReplyRepositoryPostgres;
