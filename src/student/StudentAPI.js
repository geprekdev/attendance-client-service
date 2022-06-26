import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https:api.erpeelisme.my.id/"}),
  reducerPath: "studentAPI",
  endpoints: (builder) => ({
    getStudentClasses: builder.query({
      query: () => ({
        headers: {
          Authorization: `Token 7c3dbaa9a0308b987d5b8164fcdf27645af8ad80`,
        },
        url: "/api/v1/student/",
      }),
    }),
    getStudentPresence: builder.query({
      query: () => ({
        headers: {
          Authorization: `Token 7c3dbaa9a0308b987d5b8164fcdf27645af8ad80`,
        },
        url: "/api/v1/student/presences/",
      }),
    }),

    getStudentSubmitGeo: builder.query({
      query: (geo) => ({
        headers: {
          Authorization: `Token 7c3dbaa9a0308b987d5b8164fcdf27645af8ad80`,
        },
        url: `/api/v1/student/submit/?geo=${geo.latitude},${geo.longitude}`,
      }),
    }),
    getStudentStatistic: builder.mutation({
      query: () => ({
        headers: {
          Authorization: `Token 7c3dbaa9a0308b987d5b8164fcdf27645af8ad80`,
        },
        url: "/api/v1/student/statistic/",
      }),
    }),
    getStudentAccount: builder.query({
      query: () => ({
        headers: {
          Authorization: `Token 7c3dbaa9a0308b987d5b8164fcdf27645af8ad80`,
        },
        url: "/api/v1/student/history/",
      }),
    }),
    getStudentAttendance: builder.query({
      query: (geo) => ({
        headers: {
          Authorization: `Token 7c3dbaa9a0308b987d5b8164fcdf27645af8ad80`,
        },
        url: `/v1/attendance?geo=${geo.latitude},${geo.longitude}`,
      }),
    }),
    postStudentAttendance: builder.mutation({
      query: () => ({
        headers: {
          Authorization: `Token 7c3dbaa9a0308b987d5b8164fcdf27645af8ad80`,
        },
        method: "POST",
        url: "/v1/attendance",
      }),
    }),
    postStudentAbsent: builder.mutation({
      query: ({ token, lat, lng }) => ({
        headers: {
          Authorization: `Token 7c3dbaa9a0308b987d5b8164fcdf27645af8ad80`,
        },
        body: { token, lat, lng },
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
  usePostStudentAbsentMutation,
  useGetStudentSubmitGeoQuery,
  useGetStudentAttendanceQuery,
  usePostStudentAttendanceMutation,
} = studentAPI;
