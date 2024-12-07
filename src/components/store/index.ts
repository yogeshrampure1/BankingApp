import { configureStore } from "@reduxjs/toolkit";
import mortgageSlice from "./reducers/mortgage";
import authReducer from './reducers/authSlice';
import fundTransferSlice from "../../reducers/fundTransferSlice";

const store = configureStore({
  reducer: {
    mortGageReducer: mortgageSlice,
    auth: authReducer,
    fundTransfer: fundTransferSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
