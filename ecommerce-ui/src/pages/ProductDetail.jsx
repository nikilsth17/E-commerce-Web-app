import { Button, Chip, Grid, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useState } from 'react'
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { $axios } from '../lib/axios';
import { useNavigate, useParams } from 'react-router-dom';
import Progress from '../component/Progress';
import { TypeSpecimenOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { openSuccessSnackbar } from '../store/slice/snackbarSlice';

const ProductDetail = () => {
    const [count, setCount]= useState(1);
    const userRole = localStorage.getItem("userRole");

    const queryClient= useQueryClient();
    const dispatch= useDispatch();

    const navigate= useNavigate();
    const params=useParams();


    const {isLoading,isError,error,data}=useQuery({
        queryKey:["product-detail"],
        queryFn:async()=>{
            return await $axios.get(`product/details/${params.productId}`);
        }
    })
    const productDetail= data?.data;
    const availableProductQuantity = productDetail?.quantity;


    //add item to cart mutation
    const {mutate:addToCartMutate,isLoading:isAddingToCart}=useMutation({
        mutationKey:["add-to-cart"],
        mutationFn:async()=>{
            return await $axios.post(`/cart/add/${params.productId}`,{
                quantity:count,
            })
        },
        onSuccess:(data)=>{
            queryClient.invalidateQueries("cart-count");
            dispatch(openSuccessSnackbar(data?.data?.message));
        }
    })


    if (isLoading||isAddingToCart){
        return <Progress/>;
    }
  return (
    <Box sx={{
        margin:"5rem 2rem 2rem 2rem",
        display:"flex", 
        flexDirection:"row",
        minHeight:"600px", 
        padding:"1rem",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"

        }}
    >
        <Grid container sx={{
          
            // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",

            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }}>
            <Grid item>
                <img style={{height:"300px"}}
                src={productDetail?.image}/>
            </Grid>
        </Grid>


        <Grid container sx={{display:"flex", flexDirection:"column", gap:"1rem"}}>
            <Grid item>
            <Typography>Name:{productDetail?.name}</Typography>
            </Grid>
            <Grid item>
            <Typography>Company:{productDetail?.company}</Typography>
            </Grid>
            <Grid item>
            <Typography>Description:{productDetail?.description}</Typography>
            </Grid>
            <Grid item>
            <Typography>Price: Rs{productDetail?.price}</Typography>
            </Grid>
            <Grid item>

           <Grid item sx={{
            display:"flex",
            gap:"2rem",
            justifyContent:"flex-start",
            alignItems:"center"
           }}>
                <Typography>Category</Typography>      
            <Chip
                label={productDetail?.category.toUpperCase()}
                color="success"
                variant="outlined"
            />
        </Grid>     
          
        </Grid>
            <Grid item>
            <Typography>Availability quantity:{productDetail?.quantity}</Typography>
            </Grid>
           <Grid item sx={{
            display: "flex",
            gap: "2rem",
            justifyContent: "flex-start",
            alignItems: "center",
          }}>
            <Typography variant="h6">Free shipping</Typography>
            <Chip
            label={productDetail?.freeShipping ? "Yes" : "No"}
            color={productDetail?.freeShipping ? "success" : "error"}
            variant="outlined"
          />
            </Grid>


            {userRole==="buyer"?(
            <>
                 <Grid item>
                 <Stack direction="row" spacing={5}>
                     <Button variant='contained' onClick={()=>{
                         const newCount= count-1;
                         if (newCount <= 0) {
                             setCount(1);
                           } else {
                             setCount(newCount);
                           }
                     }}>  
                         <AiOutlineMinus />
                     </Button>
                     <Typography>{count}</Typography>
                     <Button variant='contained' onClick={()=>{
                          const newCount = count + 1;
 
                          if (newCount > availableProductQuantity) {
                            setCount(availableProductQuantity);
                          } else {
                            setCount(newCount);
                          }
                     }}>
                         <AiOutlinePlus />
                     </Button>
                 </Stack>
             </Grid>
 
             <Grid item>
                 <Button 
                    color='success' 
                    variant='contained'
                    onClick={()=>{
                        addToCartMutate()
                    }}
                >
                    Add to cart
                </Button>
             </Grid>
             </>
            ):(
                <Button
                variant="contained"
                sx={{ width: "200px" }}
                onClick={() => navigate(`/product/edit/${productDetail?._id}`)}
              >
                Edit Product
              </Button>
            )}
           

           
        </Grid>
    </Box>
)
}

export default ProductDetail