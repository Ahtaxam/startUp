import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authorizationHeader } from "../../utils/storeUser";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const sendEmailApi = createApi({
  reducerPath: "sendEmailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      return authorizationHeader(headers, getState);
    },
  }),
  tagTypes: ["sendEmail"],

  endpoints: (builder) => ({
    sendEmail: builder.mutation({
      query: (data) => ({
        url: "/email/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sendEmail"],
    }),
    sendInvestorEmail: builder.mutation({
      query: (data) => ({
        url: "/email/investor/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sendEmail"],
    }),
  }),
});

export const { useSendEmailMutation , useSendInvestorEmailMutation} = sendEmailApi;
