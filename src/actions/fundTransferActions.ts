import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface TransferData {
    amount: number;
    remarks: string;
}

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