import {combineReducers} from "@reduxjs/toolkit";
import contactReducer from "./reducers/contact";
//import taskReducer from "./reducers/task"

export default combineReducers({
  contactReducer // taskReducer
});