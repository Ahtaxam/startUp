import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authorizationHeader } from "../../utils/storeUser";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const investorsApi = createApi({
  reducerPath: "investorsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      return authorizationHeader(headers, getState);
    },
  }),

  endpoints: (builder) => ({
    getAllInvestors: builder.query({
      query: () => "/investor/all",
    }),
    getSingleInvestor: builder.query({
      query: (id) => `/investor/${id}`,
    }),
  }),
});

export const { useGetAllInvestorsQuery, useGetSingleInvestorQuery } = investorsApi;
