import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box className="footer">
    <Typography variant="h6" sx={{ color: "white",gap:"2rem" }}>
      Copyrignt &copy; 2023 Nepmart
    </Typography>
  </Box>
  )
}

export default Footer