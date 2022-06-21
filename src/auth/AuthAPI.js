import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const authAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
  reducerPath: "AuthAPI",

  endpoints: builder => ({
    // postLogin: builder.mutation({
    //   query: ({ ...user }) => ({
    //     url: "/auth/login/",
    //     method: "POST",
    //     body: user,
    //   }),
    // }),
    login: builder.mutation({
      query: ({ ...user }) => ({
        url: "/api/token/",
        method: "POST",
        body: user,
      }),
    }),
    logout: builder.mutation({
      query: ({ refreshToken, accessToken }) => ({
        url: "/api/blacklist/",
        method: "POST",
        body: { refresh: refreshToken },
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      }),
    }),

    validatorToken: builder.mutation({
      query: refreshToken => ({
        url: "/api/token/refresh/",
        method: "POST",
        body: {
          refresh: refreshToken,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  usePostLogoutMutation,
  useValidatorTokenMutation,
  useLogoutMutation,
} = authAPI;
