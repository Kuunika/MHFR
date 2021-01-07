'use strict';

const NodeMailer = require('nodemailer');
const ENV = require('../utils/env.util');

const MAILER_CONFIG = {
  service: 'gmail',
  auth: {
    user: ENV.get('MHFR_EMAIL_USER'),
    pass: ENV.get('MHFR_EMAIL_PASSWORD')
  }
}

module.exports = class {
  static async send(payload) {
    const transport = NodeMailer.createTransport(MAILER_CONFIG);
    const response = await transport.sendMail(payload);
    return response.messageId ? true : false;
  }
}