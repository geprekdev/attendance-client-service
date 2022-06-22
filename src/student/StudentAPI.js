import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
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
    // disiniiiiiiiiiiiiiiiiiiii
    getStudentSubmitPresence: builder.query({
      query: (geo) => ({
        headers: {
          Authorization: `Token 7c3dbaa9a0308b987d5b8164fcdf27645af8ad80`,
        },
        url: `/api/v1/student/submit/?geo=${geo.lat},${geo.lng}`,
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
    getStudentAbsent: builder.mutation({
      query: () => ({
        headers: {
          Authorization: `Token 7c3dbaa9a0308b987d5b8164fcdf27645af8ad80`,
        },
        url: "/api/v1/student/submit/",
      }),
    }),
    postStudentAbsent: builder.mutation({
      query: () => ({
        headers: {
          Authorization: `Token 7c3dbaa9a0308b987d5b8164fcdf27645af8ad80`,
        },
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
  useGetStudentAbsentMutation,
  usePostStudentAbsentMutation,
  useGetStudentSubmitPresenceQuery,
} = studentAPI;
