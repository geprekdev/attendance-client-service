import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const staffAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
  reducerPath: "TeacherAPI",

  endpoints: builder => ({
    postStaffDashboard: builder.mutation({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        method: "POST",
        url: `/v1/teacher/?geo=${user.latitude},${user.longitude}`,
      }),
    }),

    getStaffDashboard: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: `/v1/teacher/?geo=${user.latitude},${user.longitude}`,
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

    postStaffAttendance: builder.mutation({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        method: "POST",
        body: { lat: user.latitude, lng: user.longitude },
        url: "/v1/attendance/",
      }),
    }),
  }),
});

export const {
  usePostStaffDashboardMutation,
  useGetStaffDashboardQuery,
  usePostTeacherDashboardMutation,
  usePostStaffAttendanceMutation,
} = staffAPI;
