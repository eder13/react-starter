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

  console.log("url:" + url);

  // set loading spinner
  dispatch({type: onStart, payload: {}})

  // check http method
  switch (method) {
    case "get": // TODO: case the different actual calls (login, contacts etc.)
      try {

        // todo: this is specify code for auth store api all
        // get user name
        const req = await axios.get(url);
        const user = req.data.email;

        // get id
        const req1 = await axios.get(`/userid?email=${user}`);
        const userId = req1.data.id;

        // api success
        dispatch({type: apiCallSucceeded.type, payload: {}});

        // custom success
        if (onSuccess) {
          dispatch({type: onSuccess, payload: {userId, user}})
        }

      } catch (e) {

        // api error
        dispatch({type: apiCallFailed.type, payload: {}});

        // custom error
        if (onFailed) {
          try {
            // check if error message generated
            const req = await axios.get("/error", {params: {message: "true"}});
            if (req.data !== "") {
              // dispatch error with generated error message
              if(onFailed)
                dispatch({type: onFailed, payload: {error: req.data, type: "error"}});
            } else {
              // 403 error: dispatch error with custom unauthorized message
              if(onFailed)
                dispatch({type: onFailed, payload: {error: "Please login to use this service.", type: "info"}});
            }
          } catch (exception) {
            // error when trying to fetch /error
            if(onFailed)
              dispatch({type: onFailed, payload: {error: "Error: but could not load error message from OAuth2 Provider.", type: "error"}});
          }
        }
      }
      // loading spinner stop
      setTimeout(() => dispatch({type: onDone, payload: {}}), 500);
      break;

    case "post":
      try {
        await axios.post(url);
        dispatch({type: apiCallSucceeded.type, payload: {}});

        if(onSuccess)
          dispatch({type: onSuccess, payload: {}});
      } catch (e) {
        dispatch({type: apiCallFailed.type, payload: {}});

        if(onFailed)
          dispatch({type: onFailed, payload: {error: e.toString(), type: "error"}});
      }
      // loading spinner stop
      setTimeout(() => dispatch({type: onDone, payload: {}}), 500);
      break;

    default:
      break;
  }
}

export default api;