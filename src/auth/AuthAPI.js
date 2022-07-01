import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const authAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
  reducerPath: "AuthAPI",

  endpoints: builder => ({
    login: builder.mutation({
      query: ({ ...user }) => ({
        url: `/v1/obtain-token/`,
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLoginMutation } = authAPI;
