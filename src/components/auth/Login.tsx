import { Box, Button, FormLabel, Grid2 } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard");
  };
  const formik = useFormik({
    initialValues: {
      cust_id: '',
      password: '',
    },
    validationSchema: Yup.object({
      amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
      remarks: Yup.string(),
    }),
    onSubmit: () => {
      handleClick();
    },
  });

  return (<>
    <h3>ABC Mortgage Banking</h3>
    <form className="form-container" onSubmit={formik.handleSubmit}>
      <Box mb={1} p={0}>
        <Grid2 container>
          <Grid2 size={6}>
            <FormLabel>Customer ID</FormLabel>
          </Grid2>
          <Grid2 size={6}>
            <input
              type="text"
              name="cust_id"
              className='form-input'
              onChange={formik.handleChange}
              value={formik.values.cust_id}
            />
          </Grid2>
          <Grid2 size={6}>
            <FormLabel>Password</FormLabel>
          </Grid2>
          <Grid2 size={6}>
          <input
            type="password"
            name="password"
            className='form-input'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password} />
          </Grid2>
          <Box className="actions">
            <Button variant="outlined" onClick={handleClick} className='submit' type="submit">LOGIN</Button>
          </Box>
        </Grid2>
      </Box>
    </form>
    </>
  );
};

export default Login;
