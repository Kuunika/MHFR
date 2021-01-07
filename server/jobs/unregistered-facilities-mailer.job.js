'use strict';

const Cron = require('node-cron');
const FileSys = require('fs');

const MailService = require('../services/mail.service');
const JobScheduler = require('./job-scheduler');
const FacilitiesService = require('../services/facilities.service');
const ENV = require('../utils/env.util');
const faciltyNotRegisteredTemplate = require('../templates/emails/facility-not-registered.template');

const JOB_DATA = {
  name: 'unregistered-facilities-mailer',
  cronExpr: ENV.get('MHFR_EMAIL_WORKER_CRON_EXPR')
}

/**
 * @returns {void}
 */
function begin(models) {
  const Scheduler = new JobScheduler(Cron, FileSys, {lockPath: __dirname});
  const facilitiesService = new FacilitiesService(models);

  Scheduler.schedule(JOB_DATA, async () => {
    const unregistered = await facilitiesService.unregistered();
    if (!unregistered.length) return;
    const mapped = unregistered.map(facility => ({id: facility.id, name: facility.facility_name}));
    const message = faciltyNotRegisteredTemplate({contactName: 'Sir/Madam', facilities: mapped});
    await MailService.send(message);
  });
}

module.exports = {
  begin
}
