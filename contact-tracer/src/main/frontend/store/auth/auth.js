import {createAction, createReducer} from "@reduxjs/toolkit";
import {apiCallBegan} from "../middleware/apiCreators";

// create Actions
const loginRequested = createAction("loginRequested");
const loginRequestDone = createAction("loginRequestDone");
const loginDataReceived = createAction("loginDataReceived"); // user *successfully* logged in
const loginFailed = createAction("loginFailed"); // user *failed* to gather resource - 2 cases: unauthenticated or authroization abort)

// UI actions
export const loadLogin = () => (dispatch, getState) => {
  // do API call
  apiCallBegan({
    url: "/user", // FIXME: Remove Hardcoded URL
    method: "get",
    data: {},
    onStart: loginRequested.type,
    onDone: loginRequestDone.type,
    onSuccess: loginDataReceived.type,
    onFailed: loginFailed.type,
  })
}

// Reducers
export default createReducer(
  {
    userId: "",
    user: "",
    loading: false,
    notification: {
      error: "",
      type: ""
    }
  },
  {
    // Loading Spinners
    [loginRequested.type]: (loginState, action) => {
      loginState.loading = true;
    },
    [loginRequestDone.type]: (loginState, action) => {
      loginState.loading = false;
    },
    // Success: Store Data in state
    [loginDataReceived.type]: (loginState, action) => {
      loginState.userId = action.payload.userId;
      loginState.user = action.payload.user;
    },
    // Failed: Update error message
    [loginFailed.type]: (loginState, action) => {
      const {error, type} = action.payload;
      loginState.notification.error = error;
      loginState.notification.type = type;
    }
  }
);

/// TODO create Selector for getting loginState