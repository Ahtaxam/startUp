import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authorizationHeader } from "../../utils/storeUser";
import { build } from "vite";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const allStudentsApi = createApi({
  reducerPath: "allStudentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      return authorizationHeader(headers, getState);
    },
  }),

  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: () => "/students/all",
    }),
    getStudentProjects: builder.query({
      query: (id) => `/student/${id}`,
    }),
  }),
});

export const { useGetAllStudentsQuery, useGetStudentProjectsQuery } = allStudentsApi;
