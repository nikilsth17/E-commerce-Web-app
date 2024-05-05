import React, { useEffect, useState } from 'react'
import ProductCard from '../component/ProductCard'
import { Grid, Pagination, Typography, useMediaQuery } from '@mui/material'
import { useQuery } from 'react-query'
import { $axios } from '../lib/axios'
import Progress from '../component/Progress'
import { useDispatch, useSelector } from 'react-redux'
import { openErrorSnackbar } from '../store/slice/snackbarSlice'

const BuyerProductList = () => {
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();
    const { searchText, minPrice, maxPrice, category } = useSelector((state) => state.product);
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    // page to 1 if search text is typed
    useEffect(() => {
        setPage(1)
    }, [searchText])

    const { data, isLoading } = useQuery({
        queryKey: ["buyer-product-list", page, searchText, minPrice, maxPrice, category],
        queryFn: async () => {
            return await $axios.post("/product/buyer/all", {
                page,
                limit: isSmallScreen ? 1 : 3, // Adjust limit based on screen size
                searchText: searchText || "",
                minPrice: minPrice || 0,
                maxPrice: maxPrice || 0,
                category: category.length > 0 ? category : null,
            });
        },
        onError: (error) => {
            dispatch(openErrorSnackbar(error?.res?.data?.message));
        }
    });

    const products = data?.data?.products;
    const totalPage = data?.data?.totalPage;

    if (isLoading) {
        return <Progress />
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
                        spacing={2}
                        sx={{
                            justifyContent: "center",
                            minHeight: {lg:"60vh",xs:"13vh"}
                        }}
                    >
                        {products?.map((item) => {
                            return (
                                <Grid item key={item._id} xs={12} sm={4}>
                                    <ProductCard item={item} />
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Pagination
                        count={totalPage}
                        color="secondary"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            background: "none",
                            mt: {lg:"2rem",xs:"1rem"},
                            mb: "1rem",
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

export default BuyerProductList;
