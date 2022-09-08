import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const staffAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
  reducerPath: "StaffAPI",

  endpoints: builder => ({
    postStaffDashboard: builder.mutation({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        method: "POST",
        url: `/v1/staff/?geo=${user.latitude},${user.longitude}`,
      }),
    }),

    getStaffDashboard: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: `/v1/staff/?geo=${user.latitude},${user.longitude}`,
      }),
    }),

    postTeacherDashboard: builder.mutation({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        method: "POST",
        url: `/v1/staff/?geo=${user.latitude},${user.longitude}`,
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

    getStaffActivity: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/v1/staff/activity",
      }),
    }),

    getStaffAccountInfo: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/v1/staff/info",
      }),
    }),

    getStaffLeaveFull: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/v1/leave/",
      }),
    }),

    postStaffLeaveFull: builder.mutation({
      query: user => ({
        headers: {
          Authorization: user.token,
          // "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: user.formData,
        url: `/v1/leave/`,
      }),
    }),
  }),
});

export const {
  usePostStaffDashboardMutation,
  useGetStaffDashboardQuery,
  usePostTeacherDashboardMutation,
  usePostStaffAttendanceMutation,
  useGetStaffActivityQuery,
  useGetStaffAccountInfoQuery,
  usePostStaffLeaveFullMutation,
  useGetStaffLeaveFullQuery,
} = staffAPI;
