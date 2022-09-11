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



    // -------------
  }),
});

export const {
  useGetAttendanceQuery,
  usePostAttendanceMutation,
} = coreAPI;
