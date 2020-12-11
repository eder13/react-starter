import { createAction, createReducer } from "@reduxjs/toolkit";

// create ActionCreator with corresponing Actions
export const projectAdded = createAction("projectAdded");

// define the reducers
let lastId = 0;
export default createReducer([], {
  [projectAdded.type]: (state, action) => {
    state.push({
      id: ++lastId,
      name: action.payload.name,
      teamId: action.payload.teamId,
    });
  },
});
