import { configureStore } from "@reduxjs/toolkit";
// TODO: import all reducers
import bugReducer from "./bugTracker";
import { projectReducer } from "./projects";

export function createStoreBug() {
  return configureStore({
    reducer: bugReducer,
  });
}

export function createStoreProject() {
  return configureStore({
    reducer: projectReducer,
  });
}
