import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface TransferData {
    amount: number;
    remarks: string;
}

export const getAccountData = createAsyncThunk<void, any>(
    'fundTransfer/transferFunds',
    async (custId, {dispatch}) => {
        const response = await axios.get('http://localhost:5000/accounts/');
        const fromAccount = response.data[0].accountNumber;
        const toAccount = response.data[1].accountNumber;
        dispatch({type: 'fundTransfer/getAccountData', payload: {
            fromAccount,
            toAccount
        }})
    }
);
export const transferFunds = createAsyncThunk<void, TransferData>(
    'fundTransfer/transferFunds',
    async (transferData: { amount: number; remarks: string }, {dispatch}) => {
        const response = await axios.get('http://localhost:5000/accounts/1');
        if(response.data.balance > transferData.amount) 
            dispatch({type: 'fundTransfer/transferFunds', payload: {status: "success", message: "Transfer completed successfully."}})
        else 
            dispatch({type: 'fundTransfer/transferFunds', payload: {status: "error", message: "Insufficient balance."}})
    }
);