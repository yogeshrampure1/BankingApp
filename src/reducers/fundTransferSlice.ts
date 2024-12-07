import { createSlice } from '@reduxjs/toolkit';

interface FundTransferState {
  fromAccount: string;
  toAccount: string;
  amount: number;
  remarks: string;
  transactionStatus: string;
  message: string;
}

const initialState: FundTransferState = {
  fromAccount: '1234',
  toAccount: '5678',
  amount: 0,
  remarks: '',
  transactionStatus: '',
  message: ''
};

const fundTransferSlice = createSlice({
  name: 'fundTransfer',
  initialState,
  reducers: {
    transferFunds: (state, action) => {
        const {status, message} = action.payload;
        state.transactionStatus = status;
        state.message = message;
    }
  },
});

export const { transferFunds } = fundTransferSlice.actions;
export default fundTransferSlice.reducer;
