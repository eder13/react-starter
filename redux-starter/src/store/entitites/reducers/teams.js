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
export const teamWithIdSelector = createSelector(
  (state, id) => {
    // search team with id
    const teams = state.entities.teams;
    return { teams, id };
  },
  (obj) => {
    for (let i = 0; i < obj.teams.length; i++) {
      if (obj.teams[i].id === obj.id) {
        return obj.teams[i];
      }
    }
    return null;
  }
);

export const bugsAssignedTeamSelector = createSelector(
  (state, team) => {
    const bugs = state.entities.bugs;
    console.log(team);
    return { bugs, team };
  },
  (obj) => obj.bugs.filter((bug) => bug.id === obj.team.openBugId)
  //state.entities.bugs.filter((bug) => bug.id === team.openBugId)
);
