// Use Case for adding a thread to the forum

const NewThread = require("../../Domains/threads/entities/NewThread");
const AddedThread = require("../../Domains/threads/entities/AddedThread");

class AddThreadUseCase {
  /**
   * @param {Object} dependencies - The dependencies for the use case.
   * @param {Object} dependencies.threadRepository - The thread repository.
   */
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }
  /**
   * Executes the use case to add a thread to the forum.
   * @param {Object} useCasePayload - The payload containing the thread details.
   * @param {string} useCasePayload.title - The title of the thread.
   * @param {string} useCasePayload.body - The body of the thread.
   * @param {string} useCasePayload.owner - The owner of the thread.
   * @returns {Promise<AddedThread>} - A promise that resolves to the added thread.
   */

  async execute(useCasePayload) {
    const newThread = new NewThread(useCasePayload);
    const addedThread = await this._threadRepository.addThread(newThread);
    return new AddedThread(addedThread);
  }
}

module.exports = AddThreadUseCase;
