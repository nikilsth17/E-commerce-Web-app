import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomSnackbar from '../component/CustomSnackbar'
import Login from '../pages/Login'
import Register from '../pages/Register'


const MinimumLayout = () => {
  return (
    <>
    <CustomSnackbar/>
        <Outlet/>
    </>
  )
}

export default MinimumLayout