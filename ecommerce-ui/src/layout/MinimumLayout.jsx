import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomSnackbar from '../component/CustomSnackbar'

const MinimumLayout = () => {
  return (
    <>
    <CustomSnackbar/>
        <Outlet/>
    </>
  )
}

export default MinimumLayout