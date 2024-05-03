import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./slices/Auth";
import { createJobApi } from "./slices/CreateJob";
import { updateProfileApi } from "./slices/UpdateProfile";
import { publishProjectApi } from "./slices/PublishProjects";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [createJobApi.reducerPath]: createJobApi.reducer,
    [updateProfileApi.reducerPath]: updateProfileApi.reducer,
    [publishProjectApi.reducerPath]:publishProjectApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      createJobApi.middleware,
      updateProfileApi.middleware,
      publishProjectApi.middleware
    ),
});

setupListeners(store.dispatch);
