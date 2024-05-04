import React from 'react'
import RegisterForm from '../component/RegisterForm'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'




const Register = () => {
  return (
    <Box sx={{
        width: {lg:"400px",xs:"95%"},
        minHeight: "500px",
        borderRadius: {lg:"10px",xs:"none"},
        margin: {lg:"auto",xs:"none"},
        boxShadow:{lg:"rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",xs:"none"},
        padding:{lg: "1rem",xs:"0.5rem"},
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: {lg:"1rem",xs:"none"}

    }}>
    <Typography variant="h4" sx={{ color: "grey", marginBottom: "1rem" }}>
        Register
    </Typography>
        <RegisterForm/>
    <Link to="/login">Already registered? Login</Link>
    </Box>
  )
}

export default Register