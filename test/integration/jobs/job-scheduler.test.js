'use strict';

const {expect} = require('chai');
const Scheduler = require('../../../server/jobs/job-scheduler');

const JOB_DATA = {
  name: 'test-mailer',
  cronExpr: '* * * * *'
};

const PathNotExist = {
  existsSync() {
    return false;
  },
  writeFileSync() {}
}

const PathExist = {
  existsSync() {
    return true;
  },
  writeFileSync() {}
}

const Cron = {
  schedule() {
    return {};
  }
}

describe('#Jobs Scheduler', () => {
  it('schedules the job if it has not already been scheduled', () => {
    const scheduler = new Scheduler(Cron, PathNotExist, {lockPath: __dirname});
    const job = scheduler.schedule(JOB_DATA, () => {});
    expect(job).is.an.instanceOf(Object);
  });

  it('does not schedule the job if it has already been scheduled', () => {
    const scheduler = new Scheduler(Cron, PathExist, {lockPath: __dirname});
    const job = scheduler.schedule(JOB_DATA, () => {});
    expect(job).to.equal(null);
  })
})
