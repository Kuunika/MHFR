// utility
export type IUtility = {
  utility_name: string;
  description: string;
  utility_type_id: string;
  id: number;
};

export type IUtilityType = {
  utility_type: string;
  description: string;
  id: number;
};

export type IService = {
  id: number;
  service_name: string;
  service_description: string;
  service_type_id: number;
  service_category_id: number;
};

export type IServiceType = {
  id: number;
  service_type: string;
  description: string;
};

export type IServiceHierachy = IService & {
  serviceType: IServiceType;
  children: Array<IServiceHierachy>;
};

export type IResource = {
  resource_name: string;
  description: string;
  resource_type_id: number;
  id: number;
};

export type IResourceType = {
  resource_type: string;
  description: string;
  id: number;
};

export type IRegulatoryStatus = {
  facility_regulatory_status: string;
  description: string;
  id: number;
};

export type IOperationalStatus = {
  facility_operational_status: string;
  description: string;
  id: number;
};

export type IDistrict = {
  district_name: string;
  district_code: string;
  zone_id: number;
  id: number;
};

export type IOwner = {
  facility_owner: string;
  description: string;
  id: number;
};

export type IFacilityType = {
  facility_type: string;
  description: string;
  id: number;
};

export type IRole = {
  id: number;
  name: string;
  description: string;
};

export type IFeedbackType = {
  feedback_type: string;
  description: string;
  id: number;
};
export type IDependancies = {
  utilities: {
    list: Array<IUtility>;
    types: Array<IUtilityType>;
  };
  services: {
    list: Array<IService>;
    types: Array<IServiceType>;
    hierachy: Array<IServiceHierachy>;
  };
  resources: {
    list: Array<IResource>;
    types: Array<IResourceType>;
  };
  regulatoryStatuses: {
    list: Array<IRegulatoryStatus>;
  };
  operationalStatuses: {
    list: Array<IOperationalStatus>;
  };
  facilityTypes: {
    list: Array<IFacilityType>;
  };
  feedbackTypes: {
    list: Array<IFeedbackType>;
  };
  owners: {
    list: Array<IOwner>;
  };
  roles: {
    list: Array<IRole>;
  };
  districts: {
    list: Array<IDistrict>;
  };
};
