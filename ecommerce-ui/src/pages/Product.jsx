import React from 'react'
import BuyerProductList from './BuyerProductList';
import SellerProductList from './SellerProductList';
import { Box, Button, Divider, IconButton, InputBase, Paper, Stack } from '@mui/material';
import {HiOutlineViewGridAdd} from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { clearProductFilter, openProductFilter, setSearchText } from '../store/slice/productSlice';


const Product = () => {
    const userRole =localStorage.getItem("userRole");

    const naviagate= useNavigate();
    const dispatch= useDispatch();
    
    const {minPrice,maxPrice,category}=useSelector((state)=>state.product);
    const useHasAppliedFilter= minPrice>0 || maxPrice>0 || category.length>0;
  return (
    <Box sx={{
      mt:"2rem",
      padding: {
        xs: "3rem",
        sm: "3rem",
      },
      }}
    >
    
      <Box sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: {
            xs: "center",
            sm: "center",
            md: "flex-end",
          },
          alignItems: "center",

          mr: {
            xs: 0,
            sm: "5rem",
          },
          
      }}>


{userRole==="buyer" && (
  <>
    <Button 
      variant='outlined' 
      disabled={!useHasAppliedFilter} 
      onClick={()=>dispatch(clearProductFilter())}
      sx={{
        mb:"2rem", 
        display:"flex", 
        alignItems:"center",
        marginRight:{xs:0,sm:"2%"} 
      }}
    >
      Clear 
    </Button>
    <Button variant='outlined' 
      sx={{
        mb:"2rem", 
        display:"flex", 
        alignItems:"center",
        marginRight:{xs:0,sm:"35%"} 
      }}
      onClick={()=>dispatch(openProductFilter())}>
        Filter
    </Button>
  </>
      
)}


    <Paper 
      sx={{ 
        mb:"2rem", 
        display: 'flex', 
        justifyContent:"center",
        alignItems: 'center', 
        width: 250,
        marginRight:{xs:0,sm:"25%"} 
      }}
      onChange={(e)=>dispatch(setSearchText(e.target.value))}

    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Products"
        inputProps={"aria-label"}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
    
        {
          userRole==="seller" &&   
          <Button variant='contained' 
          onClick={()=>naviagate("/product/add")} 
          sx={{
            gap:"2rem",
            marginBottom:"2rem"
          }}
        ><HiOutlineViewGridAdd size={"1.5rem"}/> Product</Button>
        }
      
   
      </Box>
   
      {userRole==="seller"? <SellerProductList/>:<BuyerProductList/>}
    </Box>
  );
}

export default Product