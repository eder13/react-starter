import store from "./store";
import { ADD_BUG, REMOVE_BUG, MARK_RESOLVED } from "./actionCreators";

// gets called whenever dispatched
const unsubscribe = store.subscribe(() => {
  console.log("DISPATCHED", store.getState());
});

unsubscribe();

// User clicks on Add Button
store.dispatch(ADD_BUG("This is Bug Numero Uno"));

console.log(store.getState());

store.dispatch(MARK_RESOLVED(1));

console.log(store.getState());

// store.dispatch(REMOVE_BUG(1));

// console.log(store.getState());

