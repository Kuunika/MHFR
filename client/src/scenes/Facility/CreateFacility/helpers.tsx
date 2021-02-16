import {
  getServicesLeaves,
  getServicesFromLeaves,
  getServicesFromLeavesForPost
} from "../../../services/helpers";
// @ts-ignore
import { uniqWith, isEqual } from "lodash";
import { check } from "../../../components/atoms/Ac";

export const getAuthorizedBasicDetails = (
  data: any,
  userRole: string,
  create = true
) => {
  let value = {
    facility_name: data.facility_name,
    common_name: data.common_name,
    facility_date_opened: data.facility_date_opened,
    facility_owner_id: data.facility_owner_id,
    facility_operational_status_id: data.facility_operational_status_id,
    district_id: data.district_id,
    facility_code_mapping: data.facility_code_mapping,
    client_id: 1,
    updated_at: Date.now()
  } as any;

  if (
    create ||
    check(undefined, userRole, "facility:basic_details:facility_type")
  ) {
    value = { ...value, facility_type_id: data.facility_type_id };
  }
  if (
    create ||
    check(undefined, userRole, "facility:basic_details:licensing_status")
  ) {
    value = {
      ...value,
      facility_regulatory_status_id: data.facility_regulatory_status_id
    };
  }
  if (
    create ||
    check(undefined, userRole, "facility:basic_details:registration_number")
  ) {
    value = { ...value, registration_number: data.registration_number };
  }
  return value;
};

export const getBasicDetails = (data: any) => ({
  registration_number: data.registrationNumber,
  facility_name: data.facilityName,
  common_name: data.commonName,
  facility_date_opened: data.dateOpened,
  facility_type_id: data.facilityType,
  facility_owner_id: data.facilityOwner,
  facility_operational_status_id: data.operationalStatus,
  facility_regulatory_status_id: data.regulatoryStatus,
  district_id: data.district,
  facility_code_mapping: data.facility_code_mapping,
  client_id: 1,
  updated_at: Date.now()
});

export const getContactDetails = (
  data: any,
  facilityId: number,
  update = false
) => ({
  data: {
    physicalAddress: data.physical_address,
    postalAddress: data.postal_address,
    contactName: data.contact_person_fullname,
    contactPhoneNumber: data.contact_person_phone,
    contactEmail: data.contact_person_email,
    catchmentArea: data.catchment_area,
    catchmentPopulation: data.catchment_population,
    longitude: data.longitude,
    latitude: data.latitude,
    client: 1,
    updated_at: Date.now()
  },
  id: facilityId
});

export const getResources = (
  data: any = [],
  allResources: any,
  facilityId: number
) =>
  allResources.map((resource: any) => {
    const created_date = new Date();
    return {
      facility_id: facilityId,
      client_id: 1,
      resource_id: resource.id,
      quantity:
        typeof data[`resource_${resource.id}`] !== "undefined"
          ? Number(data[`resource_${resource.id}`])
          : 0,
      description: "",
      created_date
    };
  });

export const getUtilities = (data: any = [], facilityId: number) => {
  const created_date = new Date();

  return data.map((utility: any) => ({
    facility_id: facilityId,
    utility_id: utility,
    client_id: 1,
    created_date
  }));
};

export const getServices = (
  data: any,
  facilityId: number,
  allServices: Array<any>
) => {
  const created_date = new Date();
  return uniqWith(
    getServicesFromLeavesForPost(data, allServices).map((ser: any) => ({
      service_id: ser,
      facility_id: facilityId,
      client_id: 1,
      created_date
    })),
    isEqual
  );
};

export const getSelectedServicesFromLeaves = (
  currentServices: Array<any>,
  allServices: Array<any>
) => {
  return getServicesFromLeaves(currentServices, allServices);
};
