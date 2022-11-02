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
        url: "/v1/student/",
      }),
    }),
    getNewStudentClasses: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/v1/student/new/",
      }),
    }),

    postNewStudentClasses: builder.mutation({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        method: "POST",
        url: `/v1/student/new/`,
      }),
    }),

    getStudentPresence: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/v1/student/presences/",
      }),
    }),

    getStudentSubmitGeo: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: `/v1/student/submit/?geo=${user.latitude},${user.longitude}`,
      }),
    }),

    getStudentStatistic: builder.mutation({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/v1/student/statistic/",
      }),
    }),

    getStudentAccount: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/v1/student/history/",
      }),
    }),

    getStudentHistory: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/v1/student/history/",
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
        body: { lat: user.latitude, lng: user.longitude },
        url: "/v1/attendance/",
      }),
    }),

    postPresenceClass: builder.mutation({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        body: { token: user.bakso, lat: user.lat, lng: user.lng, timetable: user.timetable },
        method: "POST",
        url: "/v1/student/submit/",
      }),
    }),

    getScheduleClass: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/v1/student/schedule/",
      }),
    }),

    postStudentLeaveHalf: builder.mutation({
      query: user => ({
        headers: {
          Authorization: user.token,
          // "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: user.formData,
        url: `/v1/leave/?type=half`,
      }),
    }),
  }),
});

export const {
  useGetStudentClassesQuery,
  useGetNewStudentClassesQuery,
  useGetStudentPresenceQuery,
  useGetStudentStatisticMutation,
  useGetStudentAccountQuery,
  usePostPresenceClassMutation,
  useGetStudentSubmitGeoQuery,
  useGetStudentAttendanceQuery,
  usePostStudentAttendanceMutation,
  useGetScheduleClassQuery,
  usePostStudentLeaveHalfMutation,
  usePostNewStudentClassesMutation,
  useGetStudentHistoryQuery,
} = studentAPI;
