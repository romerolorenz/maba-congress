const {forEach} = require('lodash');

/**
 * Class to provide uniform instance/formatting for HTTP success responses
 * @module HttpSuccess
 */
class AppSuccess {
  /**
   * @constructor
   * @param {string} message - Error description
   * @param {object} additionalData - Other data to be added in response
   */
  constructor(
      message = 'Operation completed successfully',
      additionalData) {
    this.timestamp = new Date();
    this.status = 200;
    this.message = message;

    forEach(additionalData, (value, key) => {
      this[key] = value;
    });
  }
}

module.exports = {
  AppSuccess
}
