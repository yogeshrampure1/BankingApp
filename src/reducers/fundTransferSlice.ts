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
  fromAccount: '',
  toAccount: '',
  amount: 0,
  remarks: '',
  transactionStatus: '',
  message: ''
};

const fundTransferSlice = createSlice({
  name: 'fundTransfer',
  initialState,
  reducers: {
    getAccountData: (state, action) => {
      const {fromAccount, toAccount} = action.payload;
      state.fromAccount = fromAccount;
      state.toAccount = toAccount;
    },
    transferFunds: (state, action) => {
        const {status, message} = action.payload;
        state.transactionStatus = status;
        state.message = message;
    },
    resetStatus: (state) => {
      state.transactionStatus = '';
    }
  },
});

export const { getAccountData, transferFunds, resetStatus } = fundTransferSlice.actions;
export default fundTransferSlice.reducer;
