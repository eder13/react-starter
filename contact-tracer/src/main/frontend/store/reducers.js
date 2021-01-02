import {combineReducers} from "redux";
import auth from "./auth/auth";
import entities from "./entities/entities";

/// TODO: add ui reducer
export default combineReducers({
  entities,
  auth
  //ui
});
