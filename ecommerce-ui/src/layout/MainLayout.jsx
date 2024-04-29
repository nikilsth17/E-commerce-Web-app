import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../component/Footer'
import { Box } from '@mui/system'
import CustomSnackbar from '../component/CustomSnackbar'
import FilterProduct from '../component/FilterProduct'

import Navbar from '../component/Navbar'

//children routes
const MainLayout = () => {
  return (
    <>
    <CustomSnackbar/>
    <Navbar/>
     {/* <Header/> */}
     {/* <Headers/> */}
     <FilterProduct/>
     <Box sx={{minHeight:"90vh"}}>        
      <Outlet/>
    </Box>
        <Footer/>
    </>
  )
}

export default MainLayout