import {createAction, createReducer} from "@reduxjs/toolkit";
import {createSelector} from "reselect";
import {apiCallBegan} from "../../middleware/apiCreators";

/*==============
 action creators
 ===============*/

// loading data
const contactDataRequested = createAction("contactDataRequested");
//const taskDataRequested = createAction("taskDataRequested");
const contactDataRequestDone = createAction("contactDataRequestDone");
//const taskDataRequestDone = createAction("taskDataRequestDone");
const contactDataReceived = createAction("contactDataReceived");
//const taskDataReceived = createAction("taskDataReceived");
const contactDataFailed = createAction("contactDataFailed");

// adding data + setting relation to user
const contactAddRequested = createAction("contactAddRequested");
//const taskAddRequested = createAction("taskAddRequested");
const contactAddRequestDone = createAction("contactAddRequestDone");
//const taskAddRequestDone = createAction("taskAddRequestDone");
const contactAdded = createAction("contactAdded");
//const taskAdded = createAction("taskAdded");
const contactAddFailed = createAction("contactAddFailed");
//const taskAddFailed = createAction("taskAddFailed");
const contactRelationSetRequested = createAction("contactRelationSetRequested");
//const taskRelationSetRequested = createAction("taskRelationSetRequested");
const contactRelationSetRequestDone = createAction("contactRelationSetRequestDone");
//const taskRelationSetRequestDone = createAction("taskRelationSetRequestDone");
const contactRelationSet = createAction("contactRelationSet");
//const taskRelationSet = createAction("taskRelationSet");
const contactRelationSettingFailed = createAction("contactRelationSettingFailed");
//const taskRelationSettingFailed = createAction("taskRelationSettingFailed");

// temp data: edit inside form field
const tmpContactDataSet = createAction("tmpContactDataSet");
//const tmpTaskDataSet = createAction("tmpTaskDataSet");
const tmpContactDataWiped = createAction("tmpContactDataWiped");
//const tmpTaskDataWiped = createAction("tmpTaskDataWiped");
const contactUpdateRequested = createAction("contactUpdateRequested");
//const taskUpdateRequested = createAction("taskUpdateRequested");
const contactUpdateRequestDone = createAction("contactUpdateRequestDone");
//const taskUpdateRequestDone = createAction("taskUpdateRequestDone");
const contactUpdated = createAction("contactUpdated");
//const taskUpdated = createAction("taskUpdated");
const contactUpdateFailed = createAction("contactUpdateFailed");
//const taskUpdateFailed = createAction("taskUpdateFailed");

// delete a task
const contactDeleteRequested = createAction("contactDeleteRequested");
//const taskDeleteRequested = createAction("taskDeleteRequested");
const contactDeleteRequestDone = createAction("contactDeleteRequestDone");
//const taskDeleteRequestDone = createAction("taskDeleteRequestDone");
const contactDeleted = createAction("contactDeleted");
//const taskDeleted = createAction("taskDeleted");
const contactDeleteFailed = createAction("contactDeleteFailed");
//const taskDeleteFailed = createAction("taskDeleteFailed");

// wipe ui error/info message
const contactUiMessageWiped = createAction("contactUiMessageWiped");
//const taskUiMessageWiped = createAction("taskUiMessageWiped");

/*==============
  action methods
 ===============*/

//export const loadTasks = () => async (dispatch, getState) => {
export const loadContacts = () => async (dispatch, getState) => {

  const userId = getState().auth.userId;

  // wait until userId is fetched before calling
  if (userId === "") {
    console.error("[tasks]: The user context has not been stored yet.");
    return;
  }

  await dispatch(apiCallBegan({
    url: `/api/users/${userId}/contacts`, // `/api/users/${userId}/tasks`
    method: "get",
    onStart: contactDataRequested.type, // taskDataRequested.type
    onDone: contactDataRequestDone.type, // taskDataRequestDone.type
    onSuccess: contactDataReceived.type, // taskDataReceived.type
    onFailed: contactDataFailed.type // taskDataFailed.type
  }));

  return Promise.resolve(true);
}

//export const addTask = (firstName, lastName, email, date) => async (dispatch, getState) => {
export const addContact = (firstName, lastName, email, date) => async (dispatch, getState) => {

  const before = getState().entities.contactReducer.contacts.length; //getState().entities.taskReducer.tasks.length;

  await dispatch(apiCallBegan({
    url: "/api/contacts", // "/api/tasks"
    method: "post",
    data: {firstName, lastName, email, date},
    onStart: contactAddRequested.type, // taskAddRequested.type
    onDone: contactAddRequestDone.type, // taskAddRequestDone.type
    onSuccess: contactAdded.type, // taskAdded.type
    onFailed: contactAddFailed.type // taskAddFailed.type
  }));

  const after = getState().entities.contactReducer.contacts.length; //getState().entities.taskReducer.tasks.length;

  // check if we were able to post the data
  if (before < after)
    return Promise.resolve(true);
  else
    return Promise.reject("[tasks]: Failed to Add Contact to /api/tasks");
}

//export const bindNewTask = () => async (dispatch, getState) => {
export const bindNewContact = () => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const {tmpReference} = getState().entities.contactReducer; //getState().entities.taskReducer;

  dispatch(apiCallBegan({
    url: tmpReference,
    method: 'put',
    data: `/api/users/${userId}`,
    params: {
      headers: {
        "Content-Type": "text/uri-list"
      }
    },
    onStart: contactRelationSetRequested.type, // taskRelationSetRequested.type
    onDone: contactRelationSetRequestDone.type, // taskRelationSetRequestDone.type
    onSuccess: contactRelationSet.type, // taskRelationSet.type
    onFailed: contactRelationSettingFailed.type // taskRelationSettingFailed
  }));
}

//export const setTmpTask = (href, firstName, lastName, email, date) => (dispatch, getState) => {
export const setTmpContact = (href, firstName, lastName, email, date) => (dispatch, getState) => {
  dispatch({type: tmpContactDataSet.type, payload: {href, firstName, lastName, email, date}});
  //dispatch({type: tmpTaskDataSet.type, payload: {href, firstName, lastName, email, date}});
}

//export const clearTmpTask = () => (dispatch, getState) => {
export const clearTmpContact = () => (dispatch, getState) => {
  dispatch({type: tmpContactDataWiped.type, payload: {}});
  //dispatch({type: tmpTaskDataWiped.type, payload: {}});
}

//export const updateContact = (localHref, localFirstName, localLastName, localEmail, localDate) => (dispatch, getState) => {
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
    onStart: contactUpdateRequested.type, // taskUpdateRequested.type
    onDone: contactUpdateRequestDone.type, // taskUpdateRequestDone.type
    onSuccess: contactUpdated.type, // taskUpdated.type
    onFailed: contactUpdateFailed.type // taskUpdateFailed.type
  }));
}

//export const deleteTask = (url) => (dispatch, getState) => {
export const deleteContact = (url) => (dispatch, getState) => {
  dispatch(apiCallBegan({
    url: url,
    method: "delete",
    onStart: contactDeleteRequested.type, // taskDeleteRequested.type
    onDone: contactDeleteRequestDone.type, // taskDeleteRequestDone.type
    onSuccess: contactDeleted.type, // taskDeleted.type
    onFailed: contactDeleteFailed.type // taskDeleteFailed.type
  }));
}

/*==============
     reducer
 ===============*/

export default createReducer({
  contacts: [],  // tasks: []
  tmpReference: "", // temporary reference url for later binding (1:n)
  tmpContact: {}, // tmpTask: {} // used for updating a task
  loading: false,
  lastFetch: null,
  notification: {
    error: "",
    type: ""
  }
}, {
  [contactDataRequested.type]: contactState => {
    contactState.loading = true;
  },
  // [taskDataRequested.type]: (taskState, action) => {
  //   taskState.loading = true;
  // },
  [contactDataRequestDone.type]: contactState => {
    contactState.loading = false;
  },
  // [taskDataRequestDone.type]: (taskState) => {
  //   taskState.loading = false;
  // },
  [contactDataReceived.type]: (contactState, action) => {
    contactState.contacts = action.payload.data._embedded.contacts;
  },
  // [taskDataReceived.type]: (taskState, action) => {
  //   taskState.tasks = action.payload.data._embedded.tasks;
  // },
  [contactDataFailed.type]: (contactState, action) => {
    const {type, error} = action.payload;
    contactState.notification.type = type;
    contactState.notification.error = error;
  },
  // [taskDateFailed.type]: (taskState, action) => {
  //   const {type, error} = action.payload;
  //   taskState.notification.type = type;
  //   taskState.notification.error = error;
  // },
  [contactAddRequested.type]: contactState => {
    contactState.loading = true;
  },
  // [taskAddRequested.type]: taskState => {
  //   taskState.loading = true;
  // },
  [contactAddRequestDone.type]: (contactState, action) => {
    contactState.loading = false;
  },
  // [taskAddRequestDone.type]: taskState => {
  //   taskState.loading = false;
  // },
  [contactAdded.type]: (contactState, action) => {
    contactState.contacts.push(action.payload.data);
    contactState.tmpReference = action.payload.data._links.user.href;
    console.log(contactState.tmpReference);
  },
  // [taskAdded.type]: (taskState, action) => {
  //   taskState.tasks.push(action.payload.data);
  //   taskState.tmpReference = action.payload.data._links.user.href;
  // },
  [contactAddFailed.type]: (contactState, action) => {
    contactState.notification.type = action.payload.type;
    contactState.notification.error = action.payload.error;
    contactState.tmpReference = "";
  },
  // [taskAddFailed.type]: (taskState, action) => {
  //   taskState.notification.type = action.payload.type;
  //   taskState.notification.error = action.payload.error;
  //   taskState.tmpReference = "";
  // },
  [contactRelationSetRequested.type]: (contactState, action) => {
    contactState.loading = true;
  },
  // [taskRelationSetRequested.type]: taskState => {
  //   taskState.loading = true;
  // },
  [contactRelationSetRequestDone.type]: (contactState, action) => {
    contactState.loading = false;
  },
  // [taskRelationSetRequestDone.type]: taskState => {
  //   taskState.loading = false;
  // },
  [contactRelationSet.type]: (contactState, action) => {
    // clear tmpReference
    contactState.tmpReference = "";
  },
  // [taskRelationSet.type]: taskState => {
  //   taskState.tmpReference = "";
  // },
  [contactRelationSettingFailed.type]: (contactState, action) => {
    contactState.notification.type = action.payload.type;
    contactState.notification.error = action.payload.error;
    contactState.tmpReference = "";
  },
  // [contactRelationSettingFailed.type]: (contactState, action) => {
  //   contactState.notification.type = action.payload.type;
  //   contactState.notification.error = action.payload.error;
  //   contactState.tmpReference = "";
  // },
  [tmpContactDataSet.type]: (contactState, action) => {
    const {href, firstName, lastName, email, date} = action.payload;
    contactState.tmpContact.href = href;
    contactState.tmpContact.firstName = firstName;
    contactState.tmpContact.lastName = lastName;
    contactState.tmpContact.email = email;
    contactState.tmpContact.date = date;
  },
  // [tmpTaskDataSet.type]: (taskState, action) => {
  //   const {href, firstName, lastName, email, date} = action.payload;
  //   taskState.tmpTask.href = href;
  //   taskState.tmpTask.firstName = firstName;
  //   taskState.tmpTask.lastName = lastName;
  //   taskState.tmpTask.email = email;
  //   taskState.tmpTask.date = date;
  // },
  [tmpContactDataWiped.type]: (contactState, action) => {
    contactState.tmpContact = {};
  },
  // [tmpTaskDataWiped.type]: (taskState) => {
  //   taskState.tmpTask = {};
  // },
  [contactUpdateRequested.type]: (contactState, action) => {
    contactState.loading = true;
  },
  // [taskUpdateRequested.type]: (taskState) => {
  //   taskState.loading = true;
  // },
  [contactUpdateRequestDone.type]: (contactState, action) => {
    contactState.loading = false;
  },
  // [taskUpdateRequestDone.type]: taskState => {
  //   taskState.loading = false;
  // },
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
  // [taskUpdated.type]: (taskState, action) => {
  //   const {_links, firstName, lastName, email, date} = action.payload.data;
  //
  //   // find the index of contact by id (href)
  //   const index = taskState.tasks.findIndex(task => task._links.self.href === _links.self.href);
  //
  //   // set updated values
  //   taskState.tasks[index].href = _links.self.href;
  //   taskState.tasks[index].firstName = firstName;
  //   taskState.tasks[index].lastName = lastName;
  //   taskState.tasks[index].email = email;
  //   taskState.tasks[index].date = date;
  //   taskState.tmpTask = {}; // wipe tmp
  // },
  [contactUpdateFailed.type]: (contactState, action) => {
    contactState.notification.type = action.payload.type;
    contactState.notification.error = action.payload.error;
    contactState.tmpContact = {}; // wipe tmp
  },
  // [taskUpdateFailed.type]: (taskState, action) => {
  //   taskState.notification.type = action.payload.type;
  //   taskState.notification.error = action.payload.error;
  //   taskState.tmpTask = {}; // wipe tmp
  // },
  [contactDeleteRequested.type]: (contactState, action) => {
    contactState.loading = true;
  },
  // [taskDeleteRequested.type]: taskState => {
  //   taskState.loading = true;
  // },
  [contactDeleteRequestDone.type]: (contactState, action) => {
    contactState.loading = false;
  },
  // [taskDeleteRequestDone.type]: taskState => {
  //   taskState.loading = false;
  // },
  [contactDeleted.type]: (contactState, action) => {
    // need self.href = id (HATEOAS)
    const {id} = action.payload;

    // find the array position with id (=self href) -> findIndex
    const index = contactState.contacts.findIndex((contact) => contact._links.self.href === id);
    contactState.contacts.splice(index, 1);
    // for safety also wipe tmp (e.g. user is in edit mode, but then wants to delete it anyways)
    contactState.tmpContact = {};
  },
  // [taskDeleted.type]: (taskState, action) => {
  //   // need id (= self.href)
  //   const {id} = action.payload;
  //
  //   // find the array position with id
  //   const index = taskState.tasks.findIndex(task => task._links.self.href === id);
  //   // cut that part
  //   taskState.tasks.splice(index, 1);
  //   // for safety also wipe tmp
  //   // (e.g. user is in edit mode, but then wants to delete it anyways)
  //   taskState.tmpTask = {};
  // },
  [contactDeleteFailed.type]: (contactState, action) => {
    contactState.notification.type = action.payload.type;
    contactState.notification.error = action.payload.error;
  },
  // [taskDeleteFailed.type]: (taskState, action) => {
  //   taskState.notification.type = action.payload.type;
  //   taskState.notification.error = action.payload.error;
  // },
  [contactUiMessageWiped.type]: contactState => {
    contactState.notification.type = "";
    contactState.notification.error = "";
  }
  // [taskUiMessageWiped.type]: taskState => {
  //   taskState.notification.type = "";
  //   taskState.notification.error = "";
  // }
});

/*==============
    selectors
 ===============*/

export const tmpContactSelector = createSelector(
  (state) => state.entities.contactReducer,
  (contactState) => contactState.tmpContact
);
// export const tmpTaskSelector = createSelector(
//   (state) => state.entities.taskReducer,
//   (taskState) => taskState.tmpTask
// );
export const notificationSelector = createSelector(
  (state) => state.entities.contactReducer,
  (contactState) => contactState.notification
);
// export const notificationSelector = createSelector(
//   (state) => state.entities.taskReducer,
//   (taskState) => contactState.notification
// );
export const filteredContactsSelector = (searchString) => createSelector(
  (state) => state.entities.contactReducer,
  (contactState) => contactState.contacts.filter(contact => contact.firstName.indexOf(searchString) !== -1)
);
// TODO: replace filtered with allContacts
// export const allTasksSelector = createSelector(
//   state => state.entities.taskReducer,
//   taskState => taskState.tasks
// );