import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
  reducerPath: "studentAPI",
  endpoints: builder => ({
    getStudentClasses: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/api/v1/student/",
      }),
    }),
    getStudentPresence: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/api/v1/student/presences/",
      }),
    }),

    getStudentSubmitGeo: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: `/api/v1/student/submit/?geo=${user.latitude},${user.longitude}`,
      }),
    }),
    getStudentStatistic: builder.mutation({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/api/v1/student/statistic/",
      }),
    }),
    getStudentAccount: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/api/v1/student/history/",
      }),
    }),
    getStudentAttendance: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: `/v1/attendance?geo=${user.latitude},${user.longitude}`,
      }),
    }),
    postStudentAttendance: builder.mutation({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        method: "POST",
        url: "/v1/attendance",
      }),
    }),
    postPresenceClass: builder.mutation({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        body: { token: user.bakso, lat: user.lat, lng: user.lng },
        method: "POST",
        url: "/api/v1/student/submit/",
      }),
    }),
  }),
});

export const {
  useGetStudentClassesQuery,
  useGetStudentPresenceQuery,
  useGetStudentStatisticMutation,
  useGetStudentAccountQuery,
  usePostPresenceClassMutation,
  useGetStudentSubmitGeoQuery,
  useGetStudentAttendanceQuery,
  usePostStudentAttendanceMutation,
} = studentAPI;
