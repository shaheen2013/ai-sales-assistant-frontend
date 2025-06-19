import { apiSlice } from '@/features/api/apiSlice';
import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from "@/features/notification/notificationStateSlice"

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    "notificationState": notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>

export default store;
