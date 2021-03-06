import { combineReducers } from "redux";
import uiReducer from "./ui-reducer";
import dependancyRed from "./dependancy-reducer";
import errorsReducer from "./errors_reducer";
import statusReducer from "./status_reducer";
import facilitiesReducer from "./facilities-reducer";
import usersReducer from "./users-reducer";
import feedback from "./feedback-reducer";

const rootReducer = combineReducers({
  ui: uiReducer,
  dependancies: dependancyRed,
  errors: errorsReducer,
  status: statusReducer,
  facilities: facilitiesReducer,
  users: usersReducer,
  feedback
});

export default rootReducer;
