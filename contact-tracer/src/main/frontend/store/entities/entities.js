import {combineReducers} from "@reduxjs/toolkit";
import contactReducer from "./reducers/contact";

/// TODO: Combined entitiesReducer with entities slices
export default combineReducers({
  contactReducer
});