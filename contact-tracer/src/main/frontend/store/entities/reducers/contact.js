import {createAction, createReducer} from "@reduxjs/toolkit";
import {createSelector} from "reselect";
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
  lastFetch: null,
  notification: {
    error: "",
    type: ""
  }
}, {
  [contactDataRequested.type]: (contactState, action) => {
    contactState.loading = true;
  },
  [contactDataRequestDone.type]: (contactState, action) => {
    contactState.loading = false;
  },
  [contactDataReceived.type]: (contactState, action) => {
    contactState.contacts = action.payload.data._embedded.contacts;
    contactState.notification.error = "";
    contactState.notification.type = "";
  },
  [contactDataFailed().type]: (contactState, action) => {
    const {type, error} = action.payload;
    contactState.notification.type = type;
    contactState.notification.error = error;
  },
});

// Selectors
export const allContactsSelector = createSelector(
  (state) => state.entities.contactReducer,
  (contactState) => contactState.contacts
);