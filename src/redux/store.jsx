import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./slices/Auth";
import { createJobApi } from "./slices/CreateJob";
import { updateProfileApi } from "./slices/UpdateProfile";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [createJobApi.reducerPath]: createJobApi.reducer,
    [updateProfileApi.reducerPath]: updateProfileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      createJobApi.middleware,
      updateProfileApi.middleware
    ),
});

setupListeners(store.dispatch);
