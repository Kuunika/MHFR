'use strict';

module.exports = class {
  constructor(models) {
    this.models = models;
  }

  async unregistered() {
    const unregistered = await this.models.RegulatoryStatus.findOne({ where: { name: 'Not Registered' } });
    return this.models.Facility.find(
      {
        include: {
          relation: 'regulatoryStatus',
          scope: {
            id: unregistered.id
          }
        },
        include: {
          relation: 'contactPeople'
        }
      }
    );
  }
}
