import createStore from "./store/configStore";
import {
  bugAdded,
  bugMarkedResolved,
  bugRemoved,
  resolvedBugsSelector,
  unresolvedBugsSelector,
} from "./store/entitites/reducers/bugTracker";
import * as actionsProjects from "./store/entitites/reducers/projects";
import {
  teamAdded,
  bugsAssignedTeamSelector,
  teamWithIdSelector,
} from "./store/entitites/reducers/teams";

const store = createStore();

// gets called whenever dispatched
const unsubscribe = store.subscribe(() => {
  console.log("DISPATCHED", store.getState());
});

store.dispatch(
  bugAdded({ description: "This is Bug Numero Uno", projectId: 1 })
);

// unsubscribe();

// store.dispatch(
//   bugAdded({ description: "This is Bug Numero Dos", projectId: 2 })
// );

// store.dispatch(bugMarkedResolved({ id: 2 }));

// store.dispatch(
//   bugAdded({ description: "This is Bug Numero Tres", projectId: 2 })
// );

// store.dispatch(
//   bugAdded({ description: "This is Bug Numero Quatro", projectId: 2 })
// );

// store.dispatch(bugRemoved({ id: 4 }));

// store.dispatch(actionsProjects.projectAdded({ name: "Project 1", teamId: 1 })); // refers to

// console.log("All unresolved bugs: ", unresolvedBugsSelector(store.getState()));
// console.log("Resolved bugs: ", resolvedBugsSelector(store.getState()));

// store.dispatch(
//   teamAdded({
//     members: ["John Doe", "John Smith", "Max Mustermann"],
//     projectIds: [1],
//     openBugId: 1,
//   })
// );

// const team = teamWithIdSelector(1)(store.getState());
// const assignedBugsForTeams = bugsAssignedTeamSelector(team)(store.getState());

// console.log("Assigned Bugs for Team with ID 1", assignedBugsForTeams);
