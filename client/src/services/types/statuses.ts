export type IStatuses = {
  fetchUtilities?: boolean;
  fetchUtilityTypes?: boolean;

  fetchServices?: boolean;
  fetchServiceTypes?: boolean;

  fetchResources?: boolean;
  fetchResourceTypes?: boolean;

  fetchRegulatoryStatuses?: boolean;

  fetchOperationalStatuses?: boolean;

  fetchDistricts?: boolean;

  fetchOwners?: boolean;

  postFacilityBasicDetails?: boolean;
  putFacilityBasicDetails?: boolean;

  postFacilityContactDetails?: boolean;
  putFacilityContactDetails?: boolean;

  postFacilityResources?: boolean;
  putFacilityResources?: boolean;

  postFacilityUtilities?: boolean;
  putFacilityUtilities?: boolean;
  deleteFacilityUtilities?: boolean;

  postFacilityServices?: boolean;
  putFacilityServices?: boolean;
  deleteFacilityServices?: boolean;
  archiveFacility?: boolean;

  publishFacility?: boolean;
  fetchFacilities?: boolean;
  fetchFilteredFacilities?: boolean;
  fetchFacilityTypes?: boolean;

  fetchCurrentBasic?: boolean;
  fetchCurrentResources?: boolean;
  fetchCurrentServices?: boolean;
  fetchCurrentUtilities?: boolean;

  fetchUserRoles?: boolean;

  fetchUsers?: boolean;
  addUser?: boolean;
  putUser?: boolean;
  deleteUser?: boolean;
  userLogin?: boolean;
  userLogout?: boolean;
  fetchUserDetails?: boolean;
  requestResetPassword?: boolean;
  resetPassword?: boolean;

  fetchFeedbackTypes?: boolean;
  sendFeedback?: boolean;

  fetchDependancies?: boolean;
};
