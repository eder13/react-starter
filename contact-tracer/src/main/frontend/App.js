import React from 'react';
import "./App.css";
import "./normalize.css";

import createStore from "./store/configStore";
import { Provider } from "react-redux";
import Router from "./components/Router";

const store = createStore();

function App() {

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;