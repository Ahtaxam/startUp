import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authorizationHeader } from "../../utils/storeUser";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const publishProjectApi = createApi({
  reducerPath: "publishProjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      return authorizationHeader(headers, getState);
    },
  }),
  tagTypes: ["publishProject"],

  endpoints: (builder) => ({
    publishProjects: builder.mutation({
      query: (data) => ({
        url: "/project/publish",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["publishProject"],
    }),

    getPublishProjects: builder.query({
      query: () => "/project/getAll",
      providesTags: ["publishProject"],
    }),

    getSingleProject: builder.query({
      query: (id) => `/project/${id}`,
    }),
    // deleteJob: builder.mutation({
    //   query: (id) => ({
    //     url: `/job/${id}`,
    //     method: "DELETE",
    //   }),
    // }),
  }),
});

export const {
  usePublishProjectsMutation,
  useGetPublishProjectsQuery,
  useGetSingleProjectQuery
} = publishProjectApi;
