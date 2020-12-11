import createStore from "./store/store";
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

unsubscribe();

store.dispatch(
  bugAdded({ description: "This is Bug Numero Uno", projectId: 1 })
);

store.dispatch(
  bugAdded({ description: "This is Bug Numero Dos", projectId: 2 })
);

store.dispatch(bugMarkedResolved({ id: 2 }));

store.dispatch(
  bugAdded({ description: "This is Bug Numero Tres", projectId: 2 })
);

store.dispatch(
  bugAdded({ description: "This is Bug Numero Quatro", projectId: 2 })
);

store.dispatch(bugRemoved({ id: 4 }));

store.dispatch(actionsProjects.projectAdded({ name: "Project 1", teamId: 1 })); // refers to

console.log(unresolvedBugsSelector(store.getState()));
console.log(resolvedBugsSelector(store.getState()));

store.dispatch(
  teamAdded({
    members: ["John Doe", "John Smith", "Max Mustermann"],
    projectIds: [1],
    openBugId: 1,
  })
);

const team = teamWithIdSelector(store.getState(), 1);
console.log(bugsAssignedTeamSelector(store.getState(), team));
