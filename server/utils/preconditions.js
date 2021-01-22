'use strict';

module.exports = class {
  /**
   * @param {boolean} expr
   * @param {string|undefined} errorMessage
   * @returns {undefined}
   */
  static checkArg(expr, errorMessage = '') {
    if (!expr) throw new Error(errorMessage);
  }
}
