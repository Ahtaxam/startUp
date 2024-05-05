import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authorizationHeader } from "../../utils/storeUser";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      return authorizationHeader(headers, getState);
    },
  }),

  endpoints: (builder) => ({
    postRewiew: builder.mutation({
      query: (data) => ({
        url: "/review",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostRewiewMutation } = reviewsApi;
