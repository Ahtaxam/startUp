import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authorizationHeader } from "../../utils/storeUser";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const updateProfileApi = createApi({
  reducerPath: "updateProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      return authorizationHeader(headers, getState);
    },
  }),

  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/profile/update",
        method: "POST",
        body: data,
      }),
    }),

    updateSoftwareHouseProfile: builder.mutation({
      query: (data) => ({
        url: "/profile/software",
        method: "POST",
        body: data,
      }),
    }),
  }),
});



export const {useUpdateProfileMutation, useUpdateSoftwareHouseProfileMutation} = updateProfileApi