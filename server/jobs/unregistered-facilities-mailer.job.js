'use strict';

const MailService = require('../services/mail.service');
const FacilitiesService = require('../services/facilities.service');
const ENV = require('../utils/env.util');
const faciltyNotRegisteredTemplate = require('../templates/emails/facility-not-registered.template');

module.exports = {
  name: 'unregistered-facilities-mailer',
  cronExpr: ENV.get('MHFR_EMAIL_WORKER_CRON_EXPR'),
  callback: async (app) => {
    try {
      const service = new FacilitiesService(app.models);
      const unregistered = await service.unregistered();
      if (!unregistered.length) return;
      const mapped = unregistered.map(facility => ({id: facility.id, name: facility.facility_name}));
      const message = faciltyNotRegisteredTemplate({contactName: 'Sir/Madam', facilities: mapped});
      await MailService.send(message);
    } catch (e) {
      console.error(`Unregistered Facilities Mailer: ${e.message}`);
    }
  },
};
