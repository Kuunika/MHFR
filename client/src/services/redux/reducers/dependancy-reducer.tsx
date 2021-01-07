import actions from "../actions/actions";
import { getServicesHierachy } from "../../helpers";
import apiAdaptor from "../../apiAdaptor";

const initialState = {
  utilities: {
    list: [] as Array<any>,
    types: [] as Array<any>
  },
  services: {
    list: [] as Array<any>,
    hierachy: [] as Array<any>,
    types: [] as Array<any>
  },
  resources: {
    list: [] as Array<any>,
    types: [] as Array<any>
  },
  regulatoryStatuses: {
    list: [] as Array<any>
  },
  operationalStatuses: {
    list: [] as Array<any>
  },
  districts: {
    list: [] as Array<any>
  },
  owners: {
    list: [] as Array<any>
  },
  facilityTypes: {
    list: [] as Array<any>
  },
  feedbackTypes: {
    list: [] as Array<any>
  },
  roles: {
    list: [] as Array<any>
  }
};
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
