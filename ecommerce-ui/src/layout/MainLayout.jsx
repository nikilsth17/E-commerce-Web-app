import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../component/Footer'
import Header from '../component/Header'
import { Box } from '@mui/system'
import CustomSnackbar from '../component/CustomSnackbar'
import FilterProduct from '../component/FilterProduct'


//children routes
const MainLayout = () => {
  return (
    <>
    <CustomSnackbar/>
     <Header/>
     <FilterProduct/>
     <Box sx={{minHeight:"90vh"}}>        
      <Outlet/>
    </Box>
        <Footer/>
    </>
  )
}

export default MainLayout