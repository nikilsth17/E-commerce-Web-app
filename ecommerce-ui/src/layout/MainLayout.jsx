import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../component/Footer'
import { Box } from '@mui/system'
import CustomSnackbar from '../component/CustomSnackbar'
import FilterProduct from '../component/FilterProduct'

import Navbar from '../component/Navbar'

const MainLayout = () => {
  return (
    <>
    <CustomSnackbar/>
    <Navbar/>
     <FilterProduct/>
     <Box >        
      <Outlet/>
    </Box>
        <Footer/>
    </>
  )
}

export default MainLayout