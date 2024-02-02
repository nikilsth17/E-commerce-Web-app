import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Progress = () => {
  return (
    <Box sx={{
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    }}>
        <CircularProgress/>
    </Box>
  )
}

export default Progress