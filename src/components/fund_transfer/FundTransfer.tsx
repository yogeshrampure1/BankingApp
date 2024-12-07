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
import { getAccountData, transferFunds } from '../../actions/fundTransferActions';
import { useAppDispatch } from '../../hooks/index';
import { RootState } from '../store';
import Modal from '../../shared/modal';
import { useNavigate } from 'react-router-dom';

const FundTransferForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { fromAccount, toAccount, transactionStatus = '' } = useSelector((state: RootState) => state.fundTransfer);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAccountData(''));
  },[]);

  useEffect(() => {
    if(transactionStatus.length)
      setShowDialog(true)
  },[transactionStatus])
  
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
      dispatch(transferFunds({ amount: Number(values.amount), remarks: values.remarks }));
    },
  });

  const onModalClose = () => {
    setShowDialog(false);
    dispatch({type: 'fundTransfer/resetStatus'})
    formik.resetForm();
  };

  const handleBack = () => {
    navigate('/dashboard')
  }
  return (<>
  <div>
    <Button onClick={handleBack}>Back to Home</Button>
    <h3 className="title">Fund Transfer</h3>
    </div>
    
    {showDialog ? <Modal isOpen={showDialog} onClose={onModalClose} /> : null}
    <form className="form-container" onSubmit={formik.handleSubmit}>
      <Box mb={1} p={0}>
        <Grid2 container>
          <Grid2 size={6}>
            <FormLabel>From Account</FormLabel>
          </Grid2>
          <Grid2 size={6}>
            <Select size={'small'} className='form-input' name="fromAccount" value={fromAccount} disabled>
              <option value={fromAccount}>123456789(Savings)</option>
            </Select>
          </Grid2>
          <Grid2 size={6}>
            <FormLabel>To Account</FormLabel>
          </Grid2>
          <Grid2 size={6}>
            <Select size={'small'} className='form-input' name="toAccount" value={toAccount} disabled>
              <option value={toAccount}>567891234(Mortgage)</option>
            </Select>
          </Grid2>
          <Grid2 size={6}>
            <FormLabel>Amount</FormLabel>
          </Grid2>
          <Grid2 size={6}>
            <input
              type="text"
              name="amount"
              className='form-input'
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
            className='form-input'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.remarks} />
          </Grid2>
          <Box className="actions">
            <Button variant="outlined" onClick={() => formik.resetForm()} type="reset">Reset</Button>
            <Button variant="outlined" className='submit' type="submit">Submit</Button>
          </Box>
        </Grid2>
      </Box>
    </form>
  </>
  );
};

export default FundTransferForm;
