import React from "react";
import { loadBugs } from "./store/entitites/reducers/bugTracker";

// need to fetch first --> React Hooks with componentDidMount

function Bugs() {
  return (
    <div>
      <ul>
        <li>Bug1</li>
      </ul>
    </div>
  );
}

export default Bugs;
