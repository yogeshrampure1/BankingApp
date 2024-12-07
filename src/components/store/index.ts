import { configureStore } from "@reduxjs/toolkit";
import mortgageSlice from "./reducers/mortgage";

const store = configureStore({
  reducer: {
    mortGageReducer: mortgageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
