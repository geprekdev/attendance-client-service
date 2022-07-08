import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../auth/AuthSlice";

import { authAPI } from "../auth/AuthAPI";
import { classListAPI } from "../classroom/ClassListAPI";
import { studentAPI } from "../student/StudentAPI";
import { teacherAPI } from "../teacher/TeacherAPI";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    authSlice,
    [classListAPI.reducerPath]: classListAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [studentAPI.reducerPath]: studentAPI.reducer,
    [teacherAPI.reducerPath]: teacherAPI.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware
      .apply()
      .concat(classListAPI.middleware)
      .concat(authAPI.middleware)
      .concat(studentAPI.middleware)
      .concat(teacherAPI.middleware),
});

setupListeners(store.dispatch);
