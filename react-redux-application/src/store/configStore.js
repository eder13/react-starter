import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducers from "./reducer";
import logger from "./middleware/logger";
import api from "./middleware/API";

export default function createStore() {
  return configureStore({
    reducer: reducers,
    middleware: [...getDefaultMiddleware(), logger("console"), api], // order: logger, func ...
  });
}
