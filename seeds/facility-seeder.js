'use strict'
const server = require('../server/server');
const faker = require('faker');

const {
    FacilityType, 
    OperationalStatus,
    RegulatoryStatus,
    Owner,
    District,
    Client,
    Resource,
    Facility
} = server.models;

const dataSource = server.dataSources.db;

const getIds = async (Model) => {
    return await Model.find({ fields: { id: true } }).map(model => model.id);
}

const facilitySeeder = async (facilityCount) => {
    const facilityTypeIds = await getIds(FacilityType);
    const operationalStatusIds = await getIds(OperationalStatus);
    const ownerIds = await getIds(Owner);
    const regulatoryStatusIds = await getIds(RegulatoryStatus);
    const districtIds = await getIds(District);
    const clientIds = await getIds(Client);
    const ResourcesIds = await getIds(Resource);
    const facilities = [];
    for(let counter = 0; counter <= facilityCount; counter++){
        const facility = {
            facility_code: faker.random.number({min: 1000, max: 9000}),
            facility_name: faker.name.findName(),
            common_name: faker.company.companyName(),
            facility_date_opened: faker.date.recent(),
            facility_type_id: faker.random.arrayElement(facilityTypeIds),
            facility_owner_id: faker.random.arrayElement(ownerIds),
            facility_operational_status_id: faker.random.arrayElement(operationalStatusIds),
            facility_regulatory_status_id: faker.random.arrayElement(regulatoryStatusIds),
            district_id: faker.random.arrayElement(districtIds),
            client_id: faker.random.arrayElement(clientIds),
            archived_date: "",
        }
        facilities.push(facility);
    }
    const facilityResults = await Facility.create(facilities);
    await dataSource.disconnect();
}

const facilityCount = process.argv[2];

facilitySeeder(facilityCount);
