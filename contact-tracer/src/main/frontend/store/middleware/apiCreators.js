import { createAction } from "@reduxjs/toolkit";

// Schema for API calls
// {
//   url: "",
//   method: "get" || "post",
//   onStart: ... ,
//   onDone: ... ,
//   onSuccess: ... ,
//   onFailed: ...
// }

export const apiCallBegan = createAction("apiCallBegan");
export const apiCallSucceeded = createAction("apiCallSucceeded");
export const apiCallFailed = createAction("apiCallFailed");
