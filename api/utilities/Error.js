/** Class extending Error */
class AppError extends Error {
  /**
   * @param {string} message error message
   * @param {number} httpStatus error status (defaults to 500)
   */
  constructor(error, httpStatus = 500) {
    super(error);
    this.status = httpStatus;
    this.message = error.message;
    this.timestamp = new Date();
  }
}

module.exports = {
  AppError,
};
