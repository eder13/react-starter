import axios from "axios";
import * as apiCreators from "./../entitites/reducers/apiCreators";
// How does an action API call look like?
// "serializable action"
// const action = {
//   type: "apiRequest",
//   payload: {
//     url: "/bugs",
//     method: "GET",
//     data: {},
//     onSuccess: 'bugsReceived',
//     onError: 'bugsRequestFailed'
//   }
// }

const api = ({ dispatch, getState }) => (next) => async (action) => {
  // 0815 actions -> delegate
  if (action.type !== apiCreators.apiCallBegan.type) {
    next(action); // execute the action as usual
    return;
  }

  const {
    url,
    method,
    data,
    onSuccess,
    onError,
    onStart,
    onDone,
  } = action.payload;

  if (onStart) dispatch({ type: onStart, payload: {} }); // start loading spinner

  next(action); // log apiCallBegan in redux

  switch (method) {
    case "GET":
      try {
        const req = await axios.get("http://localhost:3000" + url);

        // General Success Call
        dispatch(apiCreators.apiCallSucceeded(req.data));

        // Specific Success Call
        if (onSuccess) {
          dispatch({
            type: onSuccess,
            payload: { data: req.data },
          });
        }

        if (onDone)
          dispatch({
            type: onDone,
            payload: {},
          });
      } catch (e) {
        // General Error Call
        dispatch(apiCreators.apiCallFailed({ error: e.toString() }));

        // Specific Error Call
        if (onError) {
          dispatch({
            type: onError,
            payload: { error: e.toString() },
          });
        }

        if (onDone)
          dispatch({
            type: onDone,
            payload: {},
          });
      }
      break;

    case "POST":
      try {
        const req = await axios.post("http://localhost:3000" + url, data);
        console.log(req.data);
        // General Success Call
        dispatch(apiCreators.apiCallSucceeded(req.data));

        // Specific Success Call
        if (onSuccess) {
          dispatch({
            type: onSuccess,
            payload: { data: req.data },
          });
        }
      } catch (e) {}
      break;

    default:
      break;
  }
};

export default api;
