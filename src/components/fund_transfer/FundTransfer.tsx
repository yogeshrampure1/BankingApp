import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './FundTransfer.css';
import { useSelector } from 'react-redux';
import {
  Box,
  Select,
  Grid2,
  FormLabel,
  Button,
} from '@mui/material';
import { transferFunds } from '../../actions/fundTransferActions';
import { useAppDispatch } from '../../hooks/index';
import { RootState } from '../store';

const FundTransferForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { fromAccount, toAccount, status } = useSelector((state: RootState) => state.fundTransfer);
// const [showModal, setModalStatus] = useState(status);
  useEffect(() => {
    if(status.length)
    alert(status)
  },[status])
  
  const formik = useFormik({
    initialValues: {
      amount: '',
      remarks: '',
    },
    validationSchema: Yup.object({
      amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
      remarks: Yup.string(),
    }),
    onSubmit: (values) => {
      console.log("=form values=", values);
      dispatch(transferFunds({ amount: Number(values.amount), remarks: values.remarks }));
    },
  });

  return (<>
    <h3 className="title">Fund Transfer</h3>
    <form className="form-container" onSubmit={formik.handleSubmit}>
      <Box mb={1} p={0}>
        <Grid2 container>
          <Grid2 size={6}>
            <FormLabel>From Account</FormLabel>
          </Grid2>
          <Grid2 size={6}>
            <Select size={'small'} className="dropdown" name="fromAccount" value={fromAccount} disabled>
              <option value="1234">1234(Savings)</option>
            </Select>
          </Grid2>
          <Grid2 size={6}>
            <FormLabel>To Account</FormLabel>
          </Grid2>
          <Grid2 size={6}>
            <Select size={'small'} className="dropdown" name="toAccount" value={toAccount} disabled>
              <option value="5678">5678(Mortgage)</option>
            </Select>
          </Grid2>
          <Grid2 size={6}>
            <FormLabel>Amount</FormLabel>
          </Grid2>
          <Grid2 size={6}>
            <input
              type="text"
              name="amount"
              onChange={formik.handleChange}
              value={formik.values.amount}
            />
            {formik.touched.amount && formik.errors.amount ? <div className="form-error">{formik.errors.amount}</div> : null}
          </Grid2>
          <Grid2 size={6}>
            <FormLabel>Remarks</FormLabel>
          </Grid2>
          <Grid2 size={6}>
          <input
            type="text"
            name="remarks"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.remarks} />
          </Grid2>
          <Box className="actions">
            <Button variant="outlined" onClick={() => formik.resetForm()} type="reset">Reset</Button>
            <Button variant="outlined" type="submit">Submit</Button>
          </Box>
        </Grid2>
      </Box>
    </form>
  </>
  );
};

export default FundTransferForm;
