import { createAction, createReducer } from "@reduxjs/toolkit";

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
