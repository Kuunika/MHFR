export type IErrors = {
  dependacyError: boolean;

  fetchUtilities?: Array<string>;
  fetchUtilityTypes?: Array<string>;

  fetchServices?: Array<string>;
  fetchServiceTypes?: Array<string>;

  fetchResources?: Array<string>;
  fetchResourceTypes?: Array<string>;

  fetchRegulatoryStatuses?: Array<string>;

  fetchOperationalStatuses?: Array<string>;

  fetchDistricts?: Array<string>;

  fetchOwners?: Array<string>;

  postFacilityBasicDetails?: Array<string>;
  putFacilityBasicDetails?: Array<string>;

  postFacilityContactDetails?: Array<string>;
  putFacilityContactDetails?: Array<string>;

  postFacilityResources?: Array<string>;
  putFacilityResources?: Array<string>;

  postFacilityUtilities?: Array<string>;
  putFacilityUtilities?: Array<string>;
  deleteFacilityUtilities?: Array<string>;

  postFacilityServices?: Array<string>;
  putFacilityServices?: Array<string>;
  deleteFacilityServices?: Array<string>;
  archiveFacility?: Array<string>;

  publishFacility?: Array<string>;
  fetchFacilities?: Array<string>;
  fetchFilteredFacilities?: Array<string>;
  fetchFacilityTypes?: Array<string>;

  fetchCurrentBasic?: Array<string>;
  fetchCurrentResources?: Array<string>;
  fetchCurrentServices?: Array<string>;
  fetchCurrentUtilities?: Array<string>;

  fetchUserRoles?: Array<string>;

  fetchUsers?: Array<string>;
  addUser?: Array<string>;
  putUser?: Array<string>;
  deleteUser?: Array<string>;
  userLogin?: Array<string>;
  userLogout?: Array<string>;
  fetchUserDetails?: Array<string>;
  requestResetPassword?: Array<string>;
  resetPassword?: Array<string>;

  fetchFeedbackTypes?: Array<string>;
  sendFeedback?: Array<string>;

  fetchDependancies?: Array<string>;
};
