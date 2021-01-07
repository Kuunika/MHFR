'use strict';

module.exports = class {
  /**
   * @param {string} key
   * @returns {string|null}
   */
  static get(key) {
    return process.env[key] || null;
  }
}
