import "./App.css";
import "./Bugs";
import Bugs from "./Bugs";
import createStore from "./store/configStore";
import { Provider } from "react-redux";

// Create our Store Object
const store = createStore();

function App() {
  console.log(store);

  return (
    <div>
      <Provider store={store}>
        <Bugs />
      </Provider>
    </div>
  );
}

export default App;
