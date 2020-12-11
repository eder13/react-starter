import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducer";

export default function createStore() {
  return configureStore({
    reducer: reducers,
  })
}
