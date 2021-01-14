'use strict';

const {join} = require('path');
const {readdirSync}  = require('fs');
const {schedule} = require('node-cron');

const Preconditions = require('../utils/preconditions');
const ENV = require('../utils/env.util');

const isJob = name => new RegExp('\.job\.js').test(name);

/**
 * @returns {undefined}
 */
function runPreconditions() {
  Preconditions.checkArg(
    ENV.get('MHFR_EMAIL_WORKER_CRON_EXPR'),
    'Please set MHFR_EMAIL_WORKER_CRON_EXPR env var.'
  );
  Preconditions.checkArg(
    ENV.get('MHFR_EMAIL_USER'),
    'Please set MHFR_EMAIL_USER env var.'
  );
  Preconditions.checkArg(
    ENV.get('MHFR_EMAIL_PASSWORD'),
    'Please set MHFR_EMAIL_PASSWORD env var.'
  );
  Preconditions.checkArg(
    ENV.get('MHFR_MEDICAL_COUNCIL_EMAIL'),
    'Please set MHFR_MEDICAL_COUNCIL_EMAIL env var.'
  );
  Preconditions.checkArg(
    ENV.get('MHFR_FACILITIES_PATH'),
    'Please set MHFR_FACILITIES_PATH env var.'
  );
}

module.exports = app => ({
  init: () => {
    try {
      runPreconditions();
      const files = readdirSync(__dirname).filter(isJob);
      if (!files.length) return;
      const jobs = files.map(name => require(join(__dirname, name)));
      jobs.forEach(job => schedule(job.cronExpr, () => job.callback(app)));
    } catch (e) {
      console.error(`Jobs Registry: ${e.message}`);
    }
  }
});
