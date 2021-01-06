import {createAction, createReducer} from "@reduxjs/toolkit";
import {createSelector} from "reselect";
import {apiCallBegan} from "../../middleware/apiCreators";

// Loading Data
const contactDataRequested = createAction("contactDataRequested");
const contactDataRequestDone = createAction("contactDataRequestDone");
const contactDataReceived = createAction("contactDataReceived");
const contactDataFailed = createAction("contactDataFailed");
// Adding data + setting relation to user
const contactAddRequested = createAction("contactAddRequested");
const contactAddRequestDone = createAction("contactAddRequestDone");
const contactAdded = createAction("contactAdded");
const contactAddFailed = createAction("contactAddFailed");
const contactRelationSetRequested = createAction("contactRelationSetRequested");
const contactRelationSetRequestDone = createAction("contactRelationSetRequestDone");
const contactRelationSet = createAction("contactRelationSet");
const contactRelationSettingFailed = createAction("contactRelationSettingFailed");
// Edit Data Form Field
const tmpContactDataSet = createAction("tmpContactDataSet");
const tmpContactDataWiped = createAction("tmpContactDataWiped");
const contactUpdateRequested = createAction("contactUpdateRequested");
const contactUpdateRequestDone = createAction("contactUpdateRequestDone");
const contactUpdated = createAction("contactUpdated");
const contactUpdateFailed = createAction("contactUpdateFailed");
// Delete Data
const contactDeleteRequested = createAction("contactDeleteRequested");
const contactDeleteRequestDone = createAction("contactDeleteRequestDone");
const contactDeleted = createAction("contactDeleted");
const contactDeleteFailed = createAction("contactDeleteFailed");
// UI Popups data wipe
const contactUiMessageWiped = createAction("contactUiMessageWiped");

export const loadContacts = () => async (dispatch, getState) => {

  const userId = getState().auth.userId;
  // wait until userId is fetched before calling - otherwise fetching does not make sense
  if (userId === "")
    return;

  await dispatch(apiCallBegan({
    url: `/api/users/${userId}/contacts`, // FIXME: Remove hardcoded url
    method: "get",
    onStart: contactDataRequested.type,
    onDone: contactDataRequestDone.type,
    onSuccess: contactDataReceived.type,
    onFailed: contactDataFailed.type
  }));

  return Promise.resolve(true);
}

// add contact without binding first
export const addContact = (firstName, lastName, email, date) => async (dispatch, getState) => {
  const before = getState().entities.contactReducer.contacts.length;
  await dispatch(apiCallBegan({
    url: "/api/contacts", // FIXME: Remove hardcoded url
    method: "post",
    data: {firstName, lastName, email, date},
    onStart: contactAddRequested.type,
    onDone: contactAddRequestDone.type,
    onSuccess: contactAdded.type,
    onFailed: contactAddFailed.type
  }));
  const after = getState().entities.contactReducer.contacts.length;
  // Promise based check
  if (before < after)
    return Promise.resolve(true);
  else
    return Promise.reject("Failed to Add Contact to /api/contacts");
}

// bind contact to relational table
export const bindNewContact = () => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const {tmpReference} = getState().entities.contactReducer;

  // wait until userId and tmpReference are set before making the call
  // if (userId === "" || tmpReference === "")
  //   return;

  dispatch(apiCallBegan({
    url: tmpReference, // FIXME: Remove hardcoded url
    method: 'put',
    data: `/api/users/${userId}`, // FIXME: Remove hardcoded relation data-url for contacts
    params: {
      headers: {
        "Content-Type": "text/uri-list"
      }
    },
    onStart: contactRelationSetRequested.type,
    onDone: contactRelationSetRequestDone.type,
    onSuccess: contactRelationSet.type,
    onFailed: contactRelationSettingFailed.type
  }))
}

export const setTmpContact = (href, firstName, lastName, email, date) => (dispatch, getState) => {
  dispatch({type: tmpContactDataSet.type, payload: {href, firstName, lastName, email, date}});
}

export const clearTmpContact = () => (dispatch, getState) => {
  dispatch({type: tmpContactDataWiped.type, payload: {}});
}

export const updateContact = (localHref, localFirstName, localLastName, localEmail, localDate) => (dispatch, getState) => {

  dispatch(apiCallBegan({
    url: localHref,
    method: "put",
    data: {
      firstName: localFirstName,
      lastName: localLastName,
      email: localEmail,
      date: localDate
    },
    params: {
      headers: {
        "Content-Type": "application/json"
      }
    },
    onStart: contactUpdateRequested.type,
    onDone: contactUpdateRequestDone.type,
    onSuccess: contactUpdated.type,
    onFailed: contactUpdateFailed.type
  }));
}

export const deleteContact = (url) => (dispatch, getState) => {
  dispatch(apiCallBegan({
    url: url,
    method: "delete",
    onStart: contactDeleteRequested.type,
    onDone: contactDeleteRequestDone.type,
    onSuccess: contactDeleted.type,
    onFailed: contactDeleteFailed.type
  }));
}

export default createReducer({
  contacts: [],
  tmpReference: "", // temporary reference for later put call to set relation for added data
  tmpContact: {},
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
  [contactDataFailed.type]: (contactState, action) => {
    const {type, error} = action.payload;
    contactState.notification.type = type;
    contactState.notification.error = error;
  },
  [contactAddRequested.type]: (contactState, action) => {
    contactState.loading = true;
  },
  [contactAddRequestDone.type]: (contactState, action) => {
    contactState.loading = false;
  },
  [contactAdded.type]: (contactState, action) => {
    contactState.contacts.push(action.payload.data);
    contactState.tmpReference = action.payload.data._links.user.href;
    console.log(contactState.tmpReference);
  },
  [contactAddFailed.type]: (contactState, action) => {
    // show ui message on screen
    contactState.notification.type = action.payload.type;
    contactState.notification.error = action.payload.error;
    // clear tmpReference
    contactState.tmpReference = "";
  },
  [contactRelationSetRequested.type]: (contactState, action) => {
    contactState.loading = true;
  },
  [contactRelationSetRequestDone.type]: (contactState, action) => {
    contactState.loading = false;
  },
  [contactRelationSet.type]: (contactState, action) => {
    // clear tmpReference
    contactState.tmpReference = "";
  },
  [contactRelationSettingFailed.type]: (contactState, action) => {
    contactState.notification.type = action.payload.type;
    contactState.notification.error = action.payload.error;
    // clear tmpReference
    contactState.tmpReference = "";
  },
  [tmpContactDataSet.type]: (contactState, action) => {
    const {href, firstName, lastName, email, date} = action.payload;
    contactState.tmpContact.href = href;
    contactState.tmpContact.firstName = firstName;
    contactState.tmpContact.lastName = lastName;
    contactState.tmpContact.email = email;
    contactState.tmpContact.date = date;
  },
  [tmpContactDataWiped.type]: (contactState, action) => {
    contactState.tmpContact = {};
  },
  [contactUpdateRequested.type]: (contactState, action) => {
    contactState.loading = true;
  },
  [contactUpdateRequestDone.type]: (contactState, action) => {
    contactState.loading = false;
  },
  [contactUpdated.type]: (contactState, action) => {
    const {_links, firstName, lastName, email, date} = action.payload.data;

    // find the updated by id (href)
    const index = contactState.contacts.findIndex(contact => contact._links.self.href === _links.self.href);

    // set updated values
    contactState.contacts[index].href = _links.self.href;
    contactState.contacts[index].firstName = firstName;
    contactState.contacts[index].lastName = lastName;
    contactState.contacts[index].email = email;
    contactState.contacts[index].date = date;
    contactState.tmpContact = {}; // wipe tmp
  },
  [contactUpdateFailed.type]: (contactState, action) => {
    contactState.notification.type = action.payload.type;
    contactState.notification.error = action.payload.error;
    contactState.tmpContact = {}; // wipe tmp
  },
  [contactDeleteRequested.type]: (contactState, action) => {
    contactState.loading = true;
  },
  [contactDeleteRequestDone.type]: (contactState, action) => {
    contactState.loading = false;
  },
  [contactDeleted.type]: (contactState, action) => {
    // need self.href = id (HATEOAS)
    const {id} = action.payload;

    // find the array position with id (=self href) -> findIndex
    const index = contactState.contacts.findIndex((contact) => contact._links.self.href === id);
    contactState.contacts.splice(index, 1);
    // for safety also wipe tmp (e.g. user is in edit mode, but then wants to delete it anyways)
    contactState.tmpContact = {};
  },
  [contactDeleteFailed.type]: (contactState, action) => {
    contactState.notification.type = action.payload.type;
    contactState.notification.error = action.payload.error;
  },
  [contactUiMessageWiped.type]: (contactState, action) => {
    contactState.notification.type = "";
    contactState.notification.error = "";
  }
});

// Selectors
// export const allContactsSelector = createSelector(
//   (state) => state.entities.contactReducer,
//   (contactState) => contactState.contacts
// );
export const tmpContactSelector = createSelector(
  (state) => state.entities.contactReducer,
  (contactState) => contactState.tmpContact
);
export const notificationSelector = createSelector(
  (state) => state.entities.contactReducer,
  (contactState) => contactState.notification
);
export const filteredContactsSelector = (searchString) => createSelector(
  (state) => state.entities.contactReducer,
  (contactState) => contactState.contacts.filter(contact => contact.firstName.indexOf(searchString) !== -1)
);