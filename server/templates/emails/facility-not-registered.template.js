'use strict';

const ENV = require("../../utils/env.util");

/**
 * @param {object} facility
 * @returns {string}
 */
function createFacilityLink(facility) {
  const host = ENV.get('MHFR_FACILITIES_PATH');
  const link = `<a href="${host}/${facility.id}">Register</a>`;
  return `${facility.name}: ${link}`;
}

/**
 * @param {object} data
 * @returns {object}
 */
function message(data) {
  return `Dear ${data.contactName}<br /><br />
  The facilities below are not registered in the facility registry.<br /><br />
  ${data.facilities.reduce((acc, val) => {
    acc += `${createFacilityLink(val)}<br />`;
    return acc;
  }, '')}<br />
  Your assistance will be greatly appreciated.<br /><br />
  Regards,<br /><br />
  The Systems Administrator @ Kuunika - Data for Action
  `;
}

module.exports = data => ({
  to: ENV.get('MHFR_MEDICAL_COUNCIL_EMAIL'),
  subject: `MHFR Facility Registration`,
  html: message(data)
})
