import { combineReducers } from "redux";
import bugReducer from "./reducers/bugTracker";
import projectReducer from "./reducers/projects";
import teamReducer from "./reducers/teams";

export default combineReducers({
  bugs: bugReducer,
  projects: projectReducer,
  teams: teamReducer,
});
