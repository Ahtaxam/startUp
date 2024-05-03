import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authorizationHeader } from "../../utils/storeUser";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createJobApi = createApi({
  reducerPath: "createJobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      return authorizationHeader(headers, getState);
    },
  }),
  tagTypes: ["createdJob"],

  endpoints: (builder) => ({
    createJob: builder.mutation({
      query: (data) => ({
        url: "/job/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["createdJob"],
    }),

    getCreatedJob: builder.query({
      query: () => "/job/getAll",
      providesTags: ["createdJob"],
    }),

    getSingleJob: builder.query({
      query: (id) => `/job/${id}`,
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/job/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetCreatedJobQuery,
  useGetSingleJobQuery,
  useDeleteJobMutation,
} = createJobApi;
