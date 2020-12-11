import { createAction, createReducer } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

// Action Creators                  // Actions
export const bugAdded = createAction("bugAdded");
export const bugRemoved = createAction("bugRemoved");
export const bugMarkedResolved = createAction("bugMarkedResolved");

// Reducer
let lastId = 0;
export default createReducer([], {
  [bugAdded.type]: (state, action) => {
    state.push({
      id: ++lastId, // generate id,
      description: action.payload.description,
      resolved: false,
      projectId: action.payload.projectId,
    });
  },
  [bugRemoved.type]: (state, action) => {
    state.splice(state.findIndex((bug) => bug.id === action.payload.id, 1));
  },
  [bugMarkedResolved.type]: (state, action) => {
    const idx = state.findIndex((bug) => bug.id === action.payload.id);
    state[idx].resolved = true;
  },
});

// Selectors
export const unresolvedBugsSelector = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => bug.resolved === false)
);

export const resolvedBugsSelector = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => bug.resolved === true)
);
