import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authorizationHeader } from "../../utils/storeUser";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const softwareHouseApi = createApi({
  reducerPath: "softwareHouseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      return authorizationHeader(headers, getState);
    },
  }),
//   tagTypes: ["softwareHouse"],

  endpoints: (builder) => ({
    getAllSoftwareHouses: builder.query({
      query: () => "/softwarehouse/all",
    }),
    // invalidatesTags: ["softwareHouse"],
  }),
});

export const {useGetAllSoftwareHousesQuery} = softwareHouseApi