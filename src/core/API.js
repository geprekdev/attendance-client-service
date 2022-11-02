import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coreAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
  reducerPath: "coreAPI",
  endpoints: builder => ({
    getAttendance: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/v1/general-attendance/",
      }),
    }),
    postAttendance: builder.mutation({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        method: "POST",
        url: `v1/general-attendance/`,
      }),
    }),
    postLeaveFull: builder.mutation({
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
    getLeave: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/v1/leave/",
      }),
    }),
    getActivity: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/v1/activity/",
      }),
    }),
  }),
});

export const {
  useGetAttendanceQuery,
  useGetActivityQuery,
  usePostAttendanceMutation,
  usePostLeaveFullMutation,
  useGetLeaveQuery,
} = coreAPI;
