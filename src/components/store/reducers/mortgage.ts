import { createSlice } from "@reduxjs/toolkit";

export interface IMortgageInterface {
  userData: {
    userName: string | null;
    customerId: string | null;
    userRole: string | null;
    address: string | null;
    mobileNumber: string | null;
  };
}

const initialMorgageState: IMortgageInterface = {
  userData: {
    userName: "Test",
    customerId: "",
    userRole: "",
    address: "",
    mobileNumber: null,
  },
};
const mortgageSlice = createSlice({
  name: "mortgage",
  initialState: initialMorgageState,
  reducers: {
    updateUserData: (state, action) => {
      state.userData.userName = action.payload.userName;
    },
  },
});

export const { updateUserData } = mortgageSlice.actions;
export default mortgageSlice.reducer;
