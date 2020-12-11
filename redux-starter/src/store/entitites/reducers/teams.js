// first create an action + handler
import { createAction, createReducer } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

// Create the actions
export const teamAdded = createAction("teamAdded");

let lastId = 0;
// create the reducer
export default createReducer([], {
  [teamAdded.type]: (state, action) => {
    state.push({
      id: ++lastId,
      members: [...action.payload.members],
      projectIds: [...action.payload.projectIds],
      openBugId: action.payload.openBugId,
    });
  },
});

// Selectors
export const teamWithIdSelector = (id) =>
  createSelector(
    (state) => state.entities.teams,
    (teams) => {
      for (let i = 0; i < teams.length; i++) {
        if (teams[i].id === id) {
          return teams[i];
        }
      }
      return null;
    }
  );

export const bugsAssignedTeamSelector = (team) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.id === team.openBugId)
  );
