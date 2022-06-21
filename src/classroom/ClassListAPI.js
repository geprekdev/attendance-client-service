import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const classListAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API,
  }),

  reducerPath: "classListAPI",

  endpoints: builder => ({
    getClassLists: builder.query({
      query: accessToken => ({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        url: "/api/classlists/",
      }),
    }),
    getDetailClassList: builder.query({
      query: ({ slug, subject }) => `/api/c/${slug}/${subject}`,
    }),
  }),
});

export const { useGetClassListsQuery, useGetDetailClassListQuery } =
  classListAPI;
