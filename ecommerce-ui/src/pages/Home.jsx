import { Box } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux'
import { $axios } from '../lib/axios';
import { openErrorSnackbar } from '../store/slice/snackbarSlice';
import Progress from '../component/Progress';
import ProductCard from '../component/ProductCard';
import {getRandomId} from "../utilis/randomIdGenerate.js";
import { isSeller } from '../utilis/user.role';


const Home = () => {
  const dispatch= useDispatch();
  const {data,isLoading}=useQuery({
    queryKey:["latest-products"],
    queryFn:async()=>{
      return await $axios.get("/product/latest");
    },
    onError:(error)=>{
      dispatch(openErrorSnackbar(error?.res?.data?.message));
    },
    enabled: !isSeller(),
  })


  const products= data?.data;
  if(isLoading){
    return <Progress/>
  }


  return (
  
    <Box sx={{mt:"5rem"}}>
      <h2 style={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          fontFamily:"Gill Sans Extrabold, sans-serif"
        }}>
          Welcome to home
      </h2>
      <h2>New Arrivals</h2>

      <Box 
        sx={{display:"flex",
          justifyContent:"center",
          alignItems:"center",
          flexWrap:"wrap",
          minHeight:"60vh",
          gap:"2rem",
          mb:"2rem"
        }}
      > 
      {
        products?.map((item)=>{
          return <ProductCard key={getRandomId} item={item}/>
        })
      }
      </Box>
     
    </Box>

  )
}

export default Home