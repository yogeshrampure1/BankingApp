 
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "../store/reducers/authSlice";
import { RootState } from "../store/store";
import { validationSchema } from "../../utils/validation/LoginValidation";
import styles from "./login.module.css";
import { useEffect } from "react";
 
const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(loginStart()); 
      try { 
        const response = await axios.get("http://localhost:3000/login");
        let val = response.data?.filter(val => val.username === values.username && val.password === values.password)
        console.log(val)
        if(val[0]) {
          dispatch(loginSuccess({ username: response.data.username }));
        } else {
          dispatch(loginFailure("Login failed."));
        }
        
      } catch (error: any) {
        dispatch(loginFailure(error.message || "Login failed."));
      }
    },
  });

  useEffect(() => {
    sessionStorage.setItem('isAuthenticated',isAuthenticated)
    console.log("login",isAuthenticated)
  },[isAuthenticated])

  return (
    <div className={styles.login}>
      {error && <p className={styles.errorMessageGlobal}>{error}</p>} 
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Login</h2>
      
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.formGroup}> 
              <input
                id="username"
                name="username"
                type="text"
                className={`${styles.input} ${
                  formik.touched.username && formik.errors.username
                    ? styles.inputError
                    : ""
                }`}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="username"
              />
              {formik.touched.username && formik.errors.username && (
                <div className={styles.errorMessage}>
                  {formik.errors.username}
                </div>
              ) }
            </div>

            <div className={styles.formGroup}> 
              <input
                id="password"
                name="password"
                type="password"
                className={`${styles.input} ${
                  formik.touched.password && formik.errors.password
                    ? styles.inputError
                    : ""
                }`}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className={styles.errorMessage}>
                  {formik.errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
      </div>
    </div>
  );
};

export default Login;
