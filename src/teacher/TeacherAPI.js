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
    postAttendace: builder.mutation({
      query: user => ({
        headers: {
          Authorization: user.token,
        },
        method: "POST",
        url: `/v1/general-attendance/`,
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

    postTeacherLeaveFull: builder.mutation({
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
  useGetTeacherDashboardQuery,
  useGetTeacherScheduleClassQuery,
  usePostTeacherDashboardMutation,
  useGetTeacherAccountInfoQuery,
  useGetTeacherClasslistQuery,
  useGetTeacherClassDetailQuery,
  useGetTeacherActivityQuery,
  useGetTeacherJournalQuery,
  useGetTeacherJournalAddNewQuery,
  usePostTeacherJournalAddNewMutation,
  usePostTeacherLeaveFullMutation,
  useGetTeacherLeaveFullQuery,
  usePostAttendaceMutation,
} = teacherAPI;
