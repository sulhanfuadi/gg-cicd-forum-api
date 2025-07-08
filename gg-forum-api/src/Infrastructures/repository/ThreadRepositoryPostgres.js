const ThreadRepository = require("../../Domains/threads/ThreadRepository");

const NotFoundError = require("../../Commons/exceptions/NotFoundError");

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  /**
   * addThread method to insert a new thread into the database
   * @param {Object} newThread - The thread data to be added
   * @param {string} newThread.title - The title of the thread
   * @param {string} newThread.body - The body content of the thread
   * @param {string} newThread.owner - The ID of the user who owns the thread
   * @returns {Promise<Object>} - The created thread object containing id, title,
   *  and owner
   * @throws {Error} If the thread creation fails
   */
  async addThread(newThread) {
    const { title, body, owner } = newThread;
    const id = `thread-${this._idGenerator()}`;

    const query = {
      text: "INSERT INTO threads (id, title, body, owner) VALUES($1, $2, $3, $4) RETURNING id, title, owner",
      values: [id, title, body, owner],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  /**
   * verifyThreadExist method to check if a thread exists in the database
   * @param {string} threadId - The ID of the thread to verify
   * @returns {Promise<void>} - Resolves if the thread exists, rejects with NotFoundError if not
   * @throws {NotFoundError} If the thread is not found
   */
  async verifyThreadExist(threadId) {
    const query = {
      text: "SELECT 1 FROM threads WHERE id = $1",
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("Thread tidak ditemukan");
    }
  }

  /**
   * getThreadById method to retrieve a thread by its ID
   * @param {string} threadId - The ID of the thread to retrieve
   * @returns {Promise<Object>} - The thread object containing id, title, body,
   *  date, and username of the owner
   * @throws {NotFoundError} If the thread is not found
   */
  async getThreadById(threadId) {
    const query = {
      text: "SELECT threads.id, threads.title, threads.body, threads.date, users.username FROM threads JOIN users ON threads.owner = users.id WHERE threads.id = $1",
      values: [threadId],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }
}

module.exports = ThreadRepositoryPostgres;
