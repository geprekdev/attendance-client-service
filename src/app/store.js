import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "../auth/AuthAPI";
import authSlice from "../auth/AuthSlice";

import { classListAPI } from "../classroom/ClassListAPI";
import { studentAPI } from "../student/StudentAPI";

export const store = configureStore({
  reducer: {
    authSlice,
    [classListAPI.reducerPath]: classListAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [studentAPI.reducerPath]: studentAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware
      .apply()
      .concat(classListAPI.middleware)
      .concat(authAPI.middleware)
      .concat(studentAPI.middleware),
});
