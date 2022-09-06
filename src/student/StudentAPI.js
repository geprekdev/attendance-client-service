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

    getStudentActivity: builder.query({
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
        body: { token: user.bakso, lat: user.lat, lng: user.lng },
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

    getStudentLeave: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/v1/leave/",
      }),
    }),

    postStudentLeaveFull: builder.mutation({
      query: user => ({
        headers: {
          Authorization: user.token,
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: {
          leave_type: user.leave_type,
          attendance_scheduled: user.attendance_scheduled,
          reason: user.reason,
          attachment: user.attachment,
        },
        url: `/v1/leave/`,
      }),
    }),

    postStudentLeaveHalf: builder.mutation({
      query: user => ({
        headers: {
          Authorization: user.token,
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: {
          leave_type: user.leave_type,
          classroom_scheduled: user.attendance_scheduled,
          reason: user.reason,
          attachment: user.attachment,
        },
        url: `/v1/leave/?type=half`,
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
  useGetScheduleClassQuery,
  useGetStudentActivityQuery,
  useGetStudentLeaveQuery,
  usePostStudentLeaveHalfMutation,
  usePostStudentLeaveFullMutation,
} = studentAPI;
