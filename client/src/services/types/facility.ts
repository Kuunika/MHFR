import {
  IDistrict,
  IFacilityType,
  IOperationalStatus,
  IOwner,
  IRegulatoryStatus,
  IResource,
  IService,
  IServiceType,
  IUtility
} from "./dependancies";

export type IFacility = {
  id: number;
  code: string;
  name: string;
  common: string;
  ownership: string;
  type: string;
  status: string;
  regulatoryStatus: string;
  district: string;
  dateOpened: string;
  string: string;
  latitude: number | string;
  longitude: number | string;
};

export type IServiceCurrent = {
  service: IService;
  serviceType: IServiceType;
  facilityService: {
    service_id: number;
    facility_id: number;
    client_id: number;
    created_date: string;
    id: number;
    service: IService;
  };
  children: Array<IServiceCurrent>;
};

export type IFacilityCurrent = {
  facility_code?: string;
  facility_code_dhis2?: string;
  facility_code_openlmis?: string;
  registration_number?: string;
  facility_name?: string;
  common_name?: string;
  facility_date_opened?: string;
  facility_type_id?: number;
  facility_owner_id?: number;
  facility_operational_status_id?: number;
  facility_regulatory_status_id?: number;
  district_id?: number;
  client_id?: number;
  archived_date?: string;
  published_date?: string;
  created_at?: string;
  updated_at?: string;
  id?: number;
  facility_code_mapping?: Array<{
    url: string;
    code: string;
    system: string;
  }>;
  owner?: IOwner;
  facilityType?: IFacilityType;
  operationalStatus?: IOperationalStatus;
  regulatoryStatus?: IRegulatoryStatus;
  contactPeople?: {
    contact_person_fullname: string;
    contact_person_phone: string;
    contact_person_email: string;
    postal_address: string;
    facility_id: number;
    client_id: number;
    created_at: string;
    updated_at: string;
    id: number;
  };
  addresses?: {
    physical_address: string;
    postal_address: string;
    village: string;
    ta: string;
    facility_id: number;
    client_id: number | null;
    id: number;
  };
  locations?: {
    catchment_area: string;
    catchment_population: number;
    facility_id: number;
    client_id: number;
    id: number;
  };
  geolocations?: {
    datum: string;
    longitude: string;
    latitude: string;
    facility_id: number;
    client_id: number;
    id: number;
  };
  resources: Array<{
    facility_id: number;
    resource_id: number;
    quantity: number;
    description: string;
    client_id: number;
    created_date: string;
    id: number;
    resource: IResource;
  }>;
  utilities: Array<{
    facility_id: number;
    utility_id: number;
    client_id: number;
    created_date: string;
    id: number;
    utility: IUtility;
  }>;
  services: Array<IServiceCurrent>;
  district: IDistrict & {
    zone: { zone_name: string; description: null | string; id: number };
  };
};

export type IFacilityService = {
  service_id: number;
  facility_id: number;
  client_id: number;
  created_date: string;
  id: number;
  service: IService;
};
export type IFilterTypes =
  | "districts"
  | "facilityTypes"
  | "regulatoryStatuses"
  | "operationalStatuses"
  | "facilityOwners"
  | "lastUpdatedRange"
  | "resources"
  | "utilities"
  | "services";

export type IFilterValues = {
  type: IFilterTypes;
  id: number;
  label: string;
  values?: Array<number>;
  range?: boolean;
};
export type IAdvancedFilter = {
  filterValues: Array<IFilterValues>;
  filterResults: {
    basic: Array<number | Array<number>>;
  };
};

export type IFacilities = {
  list: Array<IFacility>;
  filteredList: Array<IFacility>;
  current: IFacilityCurrent;
  advancedFilter: IAdvancedFilter;
  quickSearchValue: string;
};
