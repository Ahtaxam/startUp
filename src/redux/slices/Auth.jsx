import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const authApi = createApi({
  reducerPath: "/authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    softwareHouseCompleteProfile: builder.mutation({
      query: (data) => ({
        url: "/profile/software",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useSoftwareHouseCompleteProfileMutation,
  useLoginUserMutation
} = authApi;
