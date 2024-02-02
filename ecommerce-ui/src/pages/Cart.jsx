import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import CartTable from '../component/CartTable'
import OrderSummary from '../component/OrderSummary'
import { useQuery } from 'react-query'
import { $axios } from '../lib/axios'
import Progress from '../component/Progress'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const navigate= useNavigate();
  const  {data,isError,error,isLoading}=useQuery({
    queryKey:["cart-data"],
    queryFn: async()=>{
      return await $axios.get("/cart/data");
    },
  })
  const cartData= data?.data?.cartData;
  const subTotal= data?.data?.subTotal;
  const grandTotal= data?.data?.grandTotal;
  if (isLoading){
    return <Progress/>
  }

  return (
    <>
      {!isLoading && cartData.length <1?(
               <Box
               sx={{
                 mt: "5rem",
                 display: "grid",
                 placeItems: "center",
                 minHeight: "calc(100vh - 10rem)",
               }}
             >
               <Grid
                 container
                 flexDirection="column"
                 justifyContent="center"
                 alignItems="center"
                 sx={{
                   width: {
                     xs: "100%",
                     sm: "30%",
                   },
                   height: "20rem",
                   boxShadow:
                     "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                 }}
               >
                 <Typography variant="h6" mb="2rem">
                   No item in cart
                 </Typography>
                 <Button variant="contained" onClick={() => navigate("/product")}>
                   Keep shopping
                 </Button>
               </Grid>
             </Box>
        ):
        ( 
          <Grid
          container
          sx={{
            marginTop:"40px",
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            padding: {
              xs: 0,
              sm: "3rem",
            },
            justifyContent: "space-between",
            alignItems: "center",
            gap: "2rem",
            minHeight: "calc(100vh - 10rem)",
            // background: "#551717",
          }}
        >
          <Grid
            item
            sx={{
              background: "grey",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            }}
            xs={12}
            md={8}
          >
            <CartTable cartData={cartData} />
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            flexDirection="row"
            justifyContent="center"
            mb="2rem"
            sx={{
              minWidth: {
                xs: "auto",
                sm: "25vw",
              },
            }}
          >
            <OrderSummary subTotal={subTotal} grandTotal={grandTotal} />
          </Grid>
        </Grid>
          )}
     


       
      
    </>
    

  );
};

export default Cart