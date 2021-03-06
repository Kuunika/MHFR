'use strict';

const createResourceValueMappings = require('./createResourceValueMappings');
const server = require('../../server/server');
const handleError = require('./handleError');

const { FacilityResource } = server.models;

const getResourceId = (resources, resourceName) => {
  const foundResource = resources.find(
    (resource) => resource.resource_name == resourceName,
  );
  return foundResource ? foundResource.id : null;
};

module.exports = async (resources, facility, facility_id) => {
  const facilityResources = [];
  const resourceValueMappings = createResourceValueMappings(facility);

  for (const resourceValueMapping of resourceValueMappings) {
    const { resourceName, value } = resourceValueMapping;
    if (!value || isNaN(value) || value == 0) continue;

    const resource_id = getResourceId(resources, resourceName);
    if (!resource_id) continue;

    facilityResources.push({
      resource_id,
      facility_id,
      client_id: 1,
      quantity: Number(value),
      description: resourceName,
      created_date: new Date(Date.now()),
    });
  }

  if (facilityResources.length < 0) return;
  await FacilityResource.create(facilityResources).catch(handleError);
};
