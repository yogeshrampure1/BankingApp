import { createSlice } from '@reduxjs/toolkit';

interface FundTransferState {
  fromAccount: string;
  toAccount: string;
  amount: number;
  remarks: string;
  status: string;
}

const initialState: FundTransferState = {
  fromAccount: '1234',
  toAccount: '5678',
  amount: 0,
  remarks: '',
  status: ''
};

const fundTransferSlice = createSlice({
  name: 'fundTransfer',
  initialState,
  reducers: {
    transferFunds: (state, action) => {
        console.log("slice==",action.payload);
        state.status = action.payload.status;
    }
  },
});

export const { transferFunds } = fundTransferSlice.actions;
export default fundTransferSlice.reducer;
