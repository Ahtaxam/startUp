import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./slices/Auth";
import { createJobApi } from "./slices/CreateJob";
import { updateProfileApi } from "./slices/UpdateProfile";
import { publishProjectApi } from "./slices/PublishProjects";
import { sendEmailApi } from "./slices/SendEmail";
import { softwareHouseApi } from "./slices/SoftwareHouse";
import { reviewsApi } from "./slices/Reviews";
import { allStudentsApi } from "./slices/Students";
import { investorsApi } from "./slices/Investor";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [createJobApi.reducerPath]: createJobApi.reducer,
    [updateProfileApi.reducerPath]: updateProfileApi.reducer,
    [publishProjectApi.reducerPath]: publishProjectApi.reducer,
    [sendEmailApi.reducerPath]: sendEmailApi.reducer,
    [softwareHouseApi.reducerPath]: softwareHouseApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [allStudentsApi.reducerPath]: allStudentsApi.reducer,
    [investorsApi.reducerPath]: investorsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      createJobApi.middleware,
      updateProfileApi.middleware,
      publishProjectApi.middleware,
      sendEmailApi.middleware,
      softwareHouseApi.middleware,
      reviewsApi.middleware,
      allStudentsApi.middleware,
      investorsApi.middleware
    ),
});

setupListeners(store.dispatch);
