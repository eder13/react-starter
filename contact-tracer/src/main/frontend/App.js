import React from 'react';
import "./App.css";

import createStore from "./store/configStore";
import { Provider } from "react-redux";
import Home from "./components/Home";

const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;