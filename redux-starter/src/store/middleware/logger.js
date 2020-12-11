// next = reference to the next middleware function (or reducer), action = action that was dispatched
const logger = (store) => (next) => (action) => {
  console.log("store", store);
  console.log("next", next);
  console.log("action", action);
  next(action);
};

export default logger;