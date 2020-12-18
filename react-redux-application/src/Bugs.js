import React, { useEffect } from "react";
import {
  loadBugs,
  updateBug,
  unresolvedBugsSelector,
} from "./store/entitites/reducers/bugTracker";
import { useDispatch, useSelector } from "react-redux";

const markResolved = (dispatch) => (e) => {
  if (e.target.className === "mark-resolved") {
    const id = parseInt(e.target.getAttribute("id"));
    dispatch(updateBug({ resolved: true }, id)); // normally need a PUT action -> updates on server
  }
};

const Bugs = () => {
  const dispatch = useDispatch(); // get the dispatch function from store
  const store = useSelector(unresolvedBugsSelector); // get everything from store to output (bugs)

  // "componentDidMount"
  useEffect(() => {
    // here we specify "side effects"
    //props.loadBugs();
    // dispatch the action
    dispatch(loadBugs()); // pull everything to the store
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <ul onClick={markResolved(dispatch)}>
        {store.map((bug) => {
          return (
            <li key={bug.id}>
              {bug.description}{" "}
              <button className="mark-resolved" id={bug.id}>
                Mark Resolved
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// Bugs.propTypes = {
//   store: PropTypes.object.isRequired,
// };

// // bugs: what do you want from the store -> state.entities.bugs.list
// // takes as input state, and returns the actual object we are interested in in store
// const mapStateToProps = (state) => {
//   return {
//     bugs: state.entities.bugs.list,
//   };
// };
// // map the function we wanna call, when we want to edit/get state -> loadBugs
// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadBugs: () => dispatch(loadBugs()),
//   };
// };

// // connect returns a function, where we want to give Bugs as Parameter

// // This is why the above component is also calld dummy or presentation component
// // --> injecting component to Provider, which was wrapped
// export default connect(mapStateToProps, mapDispatchToProps)(Bugs);

export default Bugs;
