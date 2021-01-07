'use strict';

const {join} = require('path');

module.exports = class {
  /**
   * @param {object} cron
   * @param {object} fs
   * @param {object} options
   */
  constructor(cron, fs, options) {
    this.cron = cron;
    this.fs = fs;
    this.options = options;
  }

  /**
  * @param {string} name
  * @returns {boolean}
  */
  jobIsAlreadyScheduled(name) {
    return this.fs.existsSync(join(this.options.lockPath, `${name}.job.lock`));
  }

  /**
  * @param {object} jobData
  * @param {Function} callback
  * @returns {null|{}}
  */
  schedule(jobData, callback) {
    if (this.jobIsAlreadyScheduled(jobData.name)) return null;
    const job = this.cron.schedule(jobData.cronExpr, callback);
    this.fs.writeFileSync(
      join(this.options.lockPath, `${jobData.name}.job.lock`)
    );
    return job;
  }
}
