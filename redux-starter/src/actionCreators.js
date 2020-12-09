import * as actionTypes from "./actionTypes";

export function ADD_BUG(description) {
  return {
    type: actionTypes.ADD_BUG,
    payload: {
      description,
    },
  };
}

export function REMOVE_BUG(id) {
  return {
    type: actionTypes.REMOVE_BUG,
    payload: {
      id,
    },
  };
}

export function MARK_RESOLVED(id) {
  return {
    type: actionTypes.MARK_RESOLVED,
    payload: {
      id,
    },
  };
}
