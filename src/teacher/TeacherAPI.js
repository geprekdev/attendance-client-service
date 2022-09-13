import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const teacherAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
  reducerPath: "TeacherAPI",
  endpoints: builder => ({
    getTeacherScheduleClass: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/v1/teacher/schedule",
      }),
    }),

    getTeacherAccountInfo: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/v1/teacher/info",
      }),
    }),

    getTeacherClasslist: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/v1/teacher/class",
      }),
    }),

    getTeacherClassDetail: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: `/v1/teacher/c/?id=${user.idClass}`,
      }),
    }),

    getTeacherActivity: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: `/v1/teacher/activity`,
      }),
    }),

    getTeacherJournal: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: `v1/teacher/journal/?id=${user.id}`,
      }),
    }),

    getTeacherJournalAddNew: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: `v1/teacher/create-journal/`,
      }),
    }),

    postTeacherJournalAddNew: builder.mutation({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        method: "POST",
        body: {
          description: user.description,
        },
        url: `v1/teacher/create-journal/`,
      }),
    }),

    getTeacherLeaveFull: builder.query({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        url: "/v1/leave/",
      }),
    }),
  }),
});

export const {
  useGetTeacherScheduleClassQuery,
  useGetTeacherAccountInfoQuery,
  useGetTeacherClasslistQuery,
  useGetTeacherClassDetailQuery,
  useGetTeacherActivityQuery,
  useGetTeacherJournalQuery,
  useGetTeacherJournalAddNewQuery,
  usePostTeacherJournalAddNewMutation,
  useGetTeacherLeaveFullQuery,
} = teacherAPI;
