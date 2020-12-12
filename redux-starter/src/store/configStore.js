import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducers from "./reducer";
import logger from "./middleware/logger";

export default function createStore() {
  return configureStore({
    reducer: reducers,
    middleware: [...getDefaultMiddleware(), logger("console")], // order: logger, func ...
  });
}
