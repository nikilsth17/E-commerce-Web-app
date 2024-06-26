import React from 'react'
import LoginForm from '../component/LoginForm'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'

const Login = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Set the height of the container to full viewport height
      }}
    >
      <Box
        sx={{
          width: { lg: "320px", xs: "90%" }, // Adjusted width for responsiveness
          minHeight: "400px",
          borderRadius: "10px",
          boxShadow:{lg: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",xs:"none"},
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="h4" sx={{ color: "black" }}>
          Login
        </Typography>
        <LoginForm />
        <Link to="/register">Not registered? Register</Link>
      </Box>
    </Box>
  )
}

export default Login
