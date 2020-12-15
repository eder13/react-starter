import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("apiCallBegan");
export const apiCallSucceeded = createAction("apiCallSucceeded");
export const apiCallFailed = createAction("apiCallFailed");