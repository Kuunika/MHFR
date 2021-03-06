import actions from "./actions";
import {
  getUtilities,
  getUtilityTypes,
  getServices,
  getServiceTypes,
  getResources,
  getResourceTypes,
  getRegulatoryStatuses,
  getOperationalStatuses,
  getDistricts,
  getOwners,
  getFacilityTypes,
  getUserRoles
} from "../../api";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

// TODO: remove unused functions

export const fetchDependancies = () => {
  const uris = [
    axios.get(`${API}/Utilities`),
    axios.get(`${API}/UtilityTypes`),
    axios.get(`${API}/Services`),
    axios.get(`${API}/ServiceTypes`),
    axios.get(`${API}/Resources`),
    axios.get(`${API}/ResourceTypes`),
    axios.get(`${API}/RegulatoryStatuses`),
    axios.get(`${API}/Districts`),
    axios.get(`${API}/OperationalStatuses`),
    axios.get(`${API}/FacilityTypes`),
    axios.get(`${API}/owners`),
    axios.get(`${API}/FeedbackTypes`)
  ];
  return {
    type: "FETCH_DEPENDANCIES",
    payload: axios.all(uris)
  };
};

export const fetchUtilities = () => {
  return {
    type: actions.fetchUtilities,
    payload: getUtilities()
  };
};

export const fetchUtilityTypes = () => {
  return {
    type: actions.fetchUtilityTypes,
    payload: getUtilityTypes()
  };
};

export const fetchServices = () => {
  return {
    type: actions.fetchServices,
    payload: getServices()
  };
};

export const fetchServiceTypes = () => {
  return {
    type: actions.fetchServiceTypes,
    payload: getServiceTypes()
  };
};

export const fetchResources = () => {
  return {
    type: actions.fetchResources,
    payload: getResources()
  };
};

export const fetchUserRoles = () => {
  return {
    type: actions.fetchUserRoles,
    payload: getUserRoles()
  };
};

export const fetchResourceTypes = () => {
  return {
    type: actions.fetchResourceTypes,
    payload: getResourceTypes()
  };
};

export const fetchRegulatoryStatuses = () => {
  return {
    type: actions.fetchRegulatoryStatuses,
    payload: getRegulatoryStatuses()
  };
};

export const fetchOperationalStatuses = () => {
  return {
    type: actions.fetchOperationalStatuses,
    payload: getOperationalStatuses()
  };
};

export const fetchOwners = () => {
  return {
    type: actions.fetchOwners,
    payload: getOwners()
  };
};

export const fetchFacilityTypes = () => {
  return {
    type: actions.fetchFacilityTypes,
    payload: getFacilityTypes()
  };
};

export const fetchDistricts = () => {
  return {
    type: actions.fetchDistricts,
    payload: getDistricts()
  };
};

export const dispatchDependancyError = () => {
  return {
    type: actions.dependacyError
  };
};
