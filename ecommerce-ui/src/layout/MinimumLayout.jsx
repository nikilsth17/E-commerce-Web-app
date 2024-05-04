import React from 'react'
// import { Outlet } from 'react-router-dom'
import CustomSnackbar from '../component/CustomSnackbar'
import Login from '../pages/Login'

const MinimumLayout = () => {
  return (
    <>
    <CustomSnackbar/>
        <Login/>
    </>
  )
}

export default MinimumLayout