import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const teacherAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
  reducerPath: "TeacherAPI",
  endpoints: builder => ({
    getTeacherDashboard: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: `/v1/teacher/?geo=${user.latitude},${user.longitude}`,
      }),
    }),

    getTeacherScheduleClass: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/v1/teacher/schedule",
      }),
    }),
    postTeacherDashboard: builder.mutation({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        method: "POST",
        url: `/v1/teacher/?geo=${user.latitude},${user.longitude}`,
      }),
    }),
  }),
});

export const {
  useGetTeacherDashboardQuery,
  useGetTeacherScheduleClassQuery,
  usePostTeacherDashboardMutation,
} = teacherAPI;
