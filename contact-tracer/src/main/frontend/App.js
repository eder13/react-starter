import React from 'react';
import createStore from "./store/configStore";
import { Provider } from "react-redux";
import Login from "./components/Login";

const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
}

export default App;