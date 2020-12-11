import { createStoreBug, createStoreProject } from "./store/configureStore";
import * as actions from "./store/bugTracker";
import * as actionsProjects from "./store/projects";

const bugStore = createStoreBug();

// gets called whenever dispatched
const unsubscribe = bugStore.subscribe(() => {
  console.log("DISPATCHED", bugStore.getState());
});

unsubscribe();

// User clicks on Add Button
bugStore.dispatch(actions.bugAdded({ description: "This is Bug Numero Uno" }));

console.log(bugStore.getState());

bugStore.dispatch(actions.bugMarkedResolved({ id: 1 }));

console.log(bugStore.getState());

bugStore.dispatch(actions.bugAdded({ description: "This is Bug Numero Dos" }));

bugStore.dispatch(actions.bugAdded({ description: "This is Bug Numero Tres" }));

bugStore.dispatch(actions.bugRemoved({ id: 3 }));

console.log(bugStore.getState());

// bugStore.dispatch(REMOVE_BUG(1));

// console.log(bugStore.getState());

const projectStore = createStoreProject();

projectStore.dispatch(actionsProjects.projectAdded({ name: "Project 1" }));
