import {createAction, createReducer} from "@reduxjs/toolkit";
import {apiCallBegan} from "../../middleware/apiCreators";

const contactDataRequested = createAction("contactDataRequested");
const contactDataRequestDone = createAction("contactDataRequestDone");
const contactDataReceived = createAction("contactDataReceived");
const contactDataFailed = createAction("contactDataFailed");

export const loadContacts = (id) => (dispatch, getState) => {
  dispatch(apiCallBegan({
    url: `/api/users/${id}/contacts`, // FIXME: Remove hardcoded url
    method: "get",
    onStart: contactDataRequested.type,
    onDone: contactDataRequestDone.type,
    onSuccess: contactDataReceived.type,
    onFailed: contactDataFailed.type
  }));
}

export default createReducer({
  contacts: [],
  loading: false,
  lastFetch: null
}, {
  [contactDataRequested.type]: (contactState, action) => {
    contactState.loading = true;
  },
  [contactDataRequestDone.type]: (contactState, action) => {
    contactState.loading = false;
  },
  [contactDataReceived.type]: (contactState, action) => {
    console.log("Hi Data Received Reducer!");
  },
  [contactDataFailed().type]: (contactState, action) => {
    console.log("Hi Data Failed Reducer :(");
  },
});