import { createAction, createReducer } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./apiCreators";
import moment from "moment";

// Action Creators                  // Actions
export const bugAdded = createAction("bugAdded");
export const bugRemoved = createAction("bugRemoved");
export const bugMarkedResolved = createAction("bugMarkedResolved");
export const bugsReceived = createAction("bugsReceived");
export const bugsRequested = createAction("bugsRequested");
export const bugsRequestDone = createAction("bugsRequestDone");
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;
  console.log(lastFetch);
  const diffInSeconds = moment().diff(moment(lastFetch), "seconds");

  // but store this number in config file -> how valid, AND generalize this approach, want to reuse cache in other parts as well
  //                  |
  if (diffInSeconds < 30) {
    console.log("Please Wait...");
    return;
  }

  dispatch(
    apiCallBegan({
      url: "/bugs",
      method: "GET",
      data: {},
      onStart: bugsRequested.type,
      onDone: bugsRequestDone.type,
      onSuccess: bugsReceived.type,
    })
  );
};

export const postBug = (bug) => {

  console.log(bug);

  return apiCallBegan({
    url: "/bugs",
    method: "POST",
    data: bug,
    onSuccess: bugAdded.type,
  });
};

// Reducer
let lastId = 0;
export default createReducer(
  {
    list: [],
    loading: false,
    lastFetch: null,
  },
  {
    [bugAdded.type]: (state, action) => {
      state.list.push({
        id: ++lastId, // generate id,
        description: action.payload.description,
        resolved: false,
        projectId: action.payload.projectId,
      });
    },
    [bugRemoved.type]: (state, action) => {
      state.list.splice(
        state.list.findIndex((bug) => bug.id === action.payload.id, 1)
      );
    },
    [bugMarkedResolved.type]: (state, action) => {
      const idx = state.list.findIndex((bug) => bug.id === action.payload.id);
      state.list[idx].resolved = true;
    },
    [bugsReceived.type]: (state, action) => {
      state.list = action.payload.data;
      state.lastFetch = Date.now();
    },
    [bugsRequested.type]: (state, action) => {
      state.loading = true;
    },
    [bugsRequestDone.type]: (state, action) => {
      state.loading = false;
    },
  }
);

// Selectors
export const unresolvedBugsSelector = createSelector(
  (state) => state.entities.bugs.list,
  (bugs) => bugs.filter((bug) => bug.resolved === false)
);

export const resolvedBugsSelector = createSelector(
  (state) => state.entities.bugs.list,
  (bugs) => bugs.filter((bug) => bug.resolved === true)
);
