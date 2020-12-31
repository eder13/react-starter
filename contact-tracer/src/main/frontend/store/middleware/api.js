import axios from "axios";
import Cookies from "js-cookie";
import {apiCallBegan, apiCallSucceeded, apiCallFailed} from "./apiCreators";

// axios config for csrf protection
// add xsrf cookie to every stuff
axios.interceptors.request.use((req) => {

  if (
    req.method === "post" ||
    req.method === "delete" ||
    req.method === "put" ||
    req.method === "patch"
  ) {
    // check if relative to url only
    if (!(/^http:.*/.test(req.url) || /^https:.*/.test(req.url))) {
      req.headers.common = {
        ...req.headers.common,
        "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
      };
    }
  }

  return req;
});

const api = ({getState, dispatch}) => (next) => async (action) => {
  if (action.type !== apiCallBegan.type) {
    next(action);
    return;
  }

  // log that api call (apiCallBegan)
  next(action);

  const {url, method, onStart, onDone, onSuccess, onFailed} = action.payload;

  // set loading spinner
  dispatch({type: onStart, payload: {}})

  // check http method
  switch (method) {
    case "get":
      try {

        // get user name
        const req = await axios.get(url);
        const user = req.data.email;

        // get id
        const req1 = await axios.get(`/userid?email=${user}`);
        const userId = req1.data.id;

        // api success
        dispatch({type: apiCallSucceeded(), payload: {}});

        // custom success
        if(onSuccess) {
          dispatch({type: onSuccess, payload: { userId, user }})
        }

      } catch (e) {

        // api error
        dispatch({type: apiCallFailed, payload: {}});

        // custom error
        if(onFailed) {
          try {
            // check if error message generated
            const req = await axios.get("/error");
            if (req.data !== "") {
              // dispatch error with generated error message
              dispatch({type: onFailed, payload: {error: req.data, type: "error"}});
            } else {
              // 403 error: dispatch error with custom unauthorized message
              dispatch({type: onFailed, payload: {error: "Please login to use this service.", type: "info"}});
            }
          } catch (exception) {

            // error when trying to fetch /error
            dispatch({type: onFailed, payload: {error: "Resource not found.", type: "notfound"}});

          }
        }
      }
      dispatch({type: onDone, payload: {}}); // loading spinner stop
      break;

    // TODO: dispatch logout POST
    case "post":
      break;

    default:
      break;
  }
}

export default api;