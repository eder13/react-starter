import {createAction, createReducer} from "@reduxjs/toolkit";
import {createSelector} from "reselect";
import {apiCallBegan} from "../middleware/apiCreators";

// create Actions
const loginRequested = createAction("loginRequested");
const loginRequestDone = createAction("loginRequestDone");
const loginDataReceived = createAction("loginDataReceived"); // user *successfully* logged in
const loginFailed = createAction("loginFailed"); // user *failed* to gather resource - 2 cases: unauthenticated or authroization abort)
const logoutRequested = createAction("logoutRequested");
const logoutRequestedDone = createAction("logoutRequestedDone");
const logoutSucceeded = createAction("logoutSucceeded");
const logoutFailed = createAction("logoutFailed");

// UI actions
export const loadLogin = () => (dispatch, getState) => {
  dispatch(apiCallBegan({
    url: "/user", // FIXME: Remove Hardcoded URL
    method: "get",
    data: {},
    onStart: loginRequested.type,
    onDone: loginRequestDone.type,
    onSuccess: loginDataReceived.type,
    onFailed: loginFailed.type,
  }));
}
export const loadLogout = () => (dispatch, getState) => {
  dispatch(apiCallBegan({
    url: "/logout", // FIXME: Remove Hardcoded URL
    method: "post",
    data: {},
    onStart: logoutRequested.type,
    onDone: logoutRequestedDone.type,
    onSuccess: logoutSucceeded.type,
    onFailed: logoutFailed.type,
  }));
}

/// Reducer
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
    // Loading Spinner start
    [loginRequested.type]: (loginState, action) => {
      loginState.loading = true;
    },
    // Loading Spinner end
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
    },
    // Loading Spinner start
    [logoutRequested.type]: (loginState, action) => {
      loginState.loading = true;
    },
    // Loading Spinner end
    [logoutRequestedDone.type]: (loginState, action) => {
      loginState.loading = false;
    },
    // Success: Reset auth store to initial state
    [logoutSucceeded.type]: (loginState, action) => {
      loginState.notification.type = "";
      loginState.notification.error = "";
      loginState.userId = "";
      loginState.user = "";
    },
    // Failed: Generate Error message (this should normally not happen)
    [logoutFailed.type]: (loginState, action) => {
      const {type, error} = action.payload;
      loginState.notification.type = type;
      loginState.notification.error = error;
    },
  }
);

/// Selectors
export const loginInfoSelector = createSelector(
  (state) => state.auth,
  (loginState) => loginState
);