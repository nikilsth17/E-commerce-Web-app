import React, { useEffect, useState } from 'react'
import ProductCard from '../component/ProductCard'
import { Grid, Pagination, Typography } from '@mui/material'
import { useQuery } from 'react-query'
import { $axios } from '../lib/axios'
import Progress from '../component/Progress'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { openErrorSnackbar } from '../store/slice/snackbarSlice'

const BuyerProductList = () => {
    const [page,setPage]=useState(1);

    const dispatch= useDispatch();
    const {searchText,minPrice,maxPrice,category}= useSelector((state)=>state.product);


    // page to 1 if search text is type
    useEffect(()=>{
      setPage(1)
    },[searchText])

    const {data,isLoading}=useQuery({
        queryKey:["buyer-product-list",page,searchText,minPrice,maxPrice,category],
        queryFn:async()=>{
            return await $axios.post("/product/buyer/all",
            {
                page,
                limit:6,
                searchText:searchText || "",
                minPrice:minPrice || 0,
                maxPrice:maxPrice || 0,
                category:category.length>0? category:null ,

            });
        },
        onError:(error)=>{
          dispatch(openErrorSnackbar(error?.res?.data?.message));
        }

    });
    const products=data?.data?.products;
    const totalPage= data?.data?.totalPage;

    if (isLoading){
      return <Progress/>
    }
  return (
    <>
    {products?.length < 1 ? (
      <Typography variant="h3" sx={{ color: "grey" }}>
        No item found
      </Typography>
    ) : (
      <>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap",
            minHeight: "60vh",
          }}
        >
          {products?.map((item) => {
            return <ProductCard key={item._id} item={item} />;
          })}
        </Grid>
        <Pagination
          count={totalPage}
          color="secondary"
          sx={{
            display: "flex",
            justifyContent: "center",
            background: "none",
            mt: "2rem",
            mb: {
              xs: "1rem",
              sm: 0,
            },
          }}
          page={page}
          onChange={(_, value) => {
            setPage(value);
          }}
        />
      </>
    )}
  </>
  );
};

export default BuyerProductList