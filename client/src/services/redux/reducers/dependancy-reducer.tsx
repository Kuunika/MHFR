import actions from "../actions/actions";
import { getServicesHierachy } from "../../helpers";
import apiAdaptor from "../../apiAdaptor";
import {
  IDependancies,
  IDistrict,
  IFacilityType,
  IFeedbackType,
  IOperationalStatus,
  IOwner,
  IRegulatoryStatus,
  IResource,
  IResourceType,
  IRole,
  IService,
  IServiceHierachy,
  IServiceType,
  IUtility,
  IUtilityType
} from "../../types";

const initialState = {
  utilities: {
    list: [] as Array<IUtility>,
    types: [] as Array<IUtilityType>
  },
  services: {
    list: [] as Array<IService>,
    hierachy: [] as Array<IServiceHierachy>,
    types: [] as Array<IServiceType>
  },
  resources: {
    list: [] as Array<IResource>,
    types: [] as Array<IResourceType>
  },
  regulatoryStatuses: {
    list: [] as Array<IRegulatoryStatus>
  },
  operationalStatuses: {
    list: [] as Array<IOperationalStatus>
  },
  districts: {
    list: [] as Array<IDistrict>
  },
  owners: {
    list: [] as Array<IOwner>
  },
  facilityTypes: {
    list: [] as Array<IFacilityType>
  },
  feedbackTypes: {
    list: [] as Array<IFeedbackType>
  },
  roles: {
    list: [] as Array<IRole>
  }
} as IDependancies;

export default (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case actions.fetchDependancies + "_FULFILLED":
      return {
        ...state,
        utilities: {
          list: apiAdaptor.getUtilities(action.payload[0].data),
          types: apiAdaptor.getUtilityTypes(action.payload[1].data)
        },
        services: {
          list: apiAdaptor.getServices(action.payload[2].data),
          types: apiAdaptor.getServiceTypes(action.payload[3].data),
          hierachy: apiAdaptor.getServices(
            getServicesHierachy(action.payload[2].data)
          )
        },
        resources: {
          list: apiAdaptor.getResources(action.payload[4].data),
          types: apiAdaptor.getResourceTypes(action.payload[5].data)
        },
        regulatoryStatuses: {
          list: apiAdaptor.getRegulatoryStatuses(action.payload[6].data)
        },
        districts: {
          list: apiAdaptor.getDistricts(action.payload[7].data)
        },
        operationalStatuses: {
          list: apiAdaptor.getOperationalStatuses(action.payload[8].data)
        },
        facilityTypes: {
          list: apiAdaptor.getFacilityTypes(action.payload[9].data)
        },
        owners: {
          list: apiAdaptor.getOwners(action.payload[10].data)
        },
        feedbackTypes: {
          list: action.payload[11].data
        }
      };
    case actions.fetchUserRoles + "_FULFILLED":
      return {
        ...state,
        roles: {
          list: apiAdaptor.getUserRoles(action.payload.data as Array<any>)
        }
      };
    default:
      return state;
  }
};
