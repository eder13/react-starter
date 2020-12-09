import * as actionTypes from "./actionTypes";
// remember, state is represented by array []

let lastId = 0;

export default function reducer(state = [], action) {
  // setting initail state
  if (action.type === actionTypes.ADD_BUG) {
    return [
      ...state,
      {
        id: ++lastId, // generate id,
        description: action.payload.description,
        resolved: false,
      },
    ];
  } else if (action.type === actionTypes.REMOVE_BUG) {
    // ned the id which bug should be removed
    return state.filter((bug) => bug.id !== action.payload.id);
  } else if (action.type === actionTypes.MARK_RESOLVED) {
    // know by id, which to set to resolved
    return state.map((bug) => {
      if (bug.id === action.payload.id) {
        return {
          ...bug,
          resolved: true,
        };
      } else {
        return bug;
      }
    });
  }

  return state;
}
