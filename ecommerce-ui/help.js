useState => condition rendering 



// import { useQuery } from 'react-query'
// import { getProductBySeller } from '../lib/product.apis'
// import { Typography } from '@mui/material';

// const SellerProductList = () => {
//     const {isLoading,isError,error,data}=useQuery({
//         queryKey:["seller-product-list"],
//         queryFn:()=>getProductBySeller(),
//     });
//     console.log(data);
//   return (
//     <div>
//         {isLoading && <Typography>Loading.....</Typography>}
//         {!isLoading && isError && <Typography>{error.response.data.message}</Typography>}
//         {data?.data?.map((item)=>{
//             console.log(item);
//             return <Typography key={item._id}>{item.name}</Typography>
//         })}
//     </div>
//   )
// }

// export default SellerProductList








// import React from "react";
// import { useQuery } from "react-query";
// import { $axios } from "../lib/axios";
// import { Box, CircularProgress, Grid, Typography } from "@mui/material";
// // import ProductCard from "../component/ProductCard";
// // import Progress from "../component/Progress";
// // import Header from "../component/Header";
// // import Footer from "../component/Footer";

// const BuyerProductList = () => {
//   const { data, error, isError, isLoading } = useQuery({
//     queryKey: ["buyer-product-list"],
//     queryFn: async () => {
//       return await $axios.post("/product/buyer/all", {
//         page: 1,
//         limit: 10,
//       });
//     },
//   });

//   const products = data?.data;
//   console.log(products);
//   return (
//     <>
//       <Grid
//         container
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           gap: "2rem",
//           flexWrap: "wrap",
//         }}
//       >
//         {isLoading && <Typography>Loading.....</Typography>}
//         {isError && (
//           <Typography sx={{ color: "red" }}>
//             {error.response.data.message}
//           </Typography>
//         )}
//         {products?.map((item) => {
//             return <Typography key={item._id}>{item.name}</Typography>
//         })}
//       </Grid>
//     </>
//   );
// };

// export default BuyerProductList;