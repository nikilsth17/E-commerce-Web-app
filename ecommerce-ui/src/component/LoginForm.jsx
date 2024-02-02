import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { $axios } from '../lib/axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { openErrorSnackbar } from '../store/slice/snackbarSlice';


const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch= useDispatch();
  const  navigate= useNavigate();
  const { mutate, isLoading, error, isError } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (values) => await $axios.post("/user/login", values),
    onSuccess: (res) => {
      localStorage.setItem("accesstoken", res?.data?.token);
      localStorage.setItem("firstName", res?.data?.user?.firstName);
      localStorage.setItem("userRole", res?.data?.user?.role);
      localStorage.setItem("lastName",res?.data?.user?.lastName);
      navigate("/product");
    },
    onError:(error)=>{
      dispatch(openErrorSnackbar(error?.res?.data?.message));
    }
    
  });
  return (
    <>
     <Formik
      initialValues={{ email: '' ,password:''}}
      validationSchema={Yup.object({
        email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .trim(),
       password: Yup.string().required("Password is required"), //TODO:"pattern"

      })}
      onSubmit={(values) => {
        mutate(values);
      }}
    >
      {formik => (
        <form 
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
          }}
        >
        <TextField label="Email" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}         
        {/* <TextField label="Password" {...formik.getFieldProps("password")} />
           */}


        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
            {...formik.getFieldProps("password")}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
              {formik.touched.password && formik.errors.password ? (
              <div className="error-message">{formik.errors.password}</div>
            ) : null}
        </FormControl>

        <Button type="submit" variant="contained" color="success" disabled={isLoading}>
              Sign in
        </Button>

        </form>
      )}
    </Formik>
    </>
   
  );
};


export default LoginForm;