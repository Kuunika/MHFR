// @ts-ignore
import { join, camelCase, split } from "lodash";
import { IErrors } from "../../types";
import actions from "../actions/actions";
export default (
  state = {
    dependancyError: false
  } as IErrors,
  action: any
) => {
  let actionGroup = join(
    split(action.type, "_", split(action.type, "_").length - 1),
    "_"
  );

  let formattedActionGroup = camelCase(actionGroup);

  switch (action.type) {
    case `${actionGroup}_PENDING`:
      return {
        ...state,
        [`${formattedActionGroup}`]: []
      };
    case `${actions.fetchDependancies}_REJECTED`:
      return {
        ...state,
        ["dependancyError"]: true,
        [formattedActionGroup]: action.error
          ? action.payload &&
            action.payload.response &&
            action.payload.response.data.error.details
            ? action.payload.response.data.error.details.messages
            : ["There was a general error"]
          : ["There was a network error "]
      };
    case `${actionGroup}_REJECTED`:
      return {
        ...state,
        [formattedActionGroup]: action.error
          ? action.payload &&
            action.payload.response &&
            action.payload.response.data.error.details
            ? action.payload.response.data.error.details.messages
            : ["There was a general error"]
          : ["There was a network error "]
      };
    case `${actionGroup}_FULFILLED`:
      return {
        ...state,
        [formattedActionGroup]: []
      };

    default:
      return state;
  }
};
