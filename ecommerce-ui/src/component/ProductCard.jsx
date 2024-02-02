import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Popover, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import ProductDetail from '../pages/ProductDetail';
import { useNavigate } from 'react-router-dom';
import { $axios } from '../lib/axios';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { placeHolderImage } from '../constraints/fallBackImage';




const ProductCard = (props) => {

    // popover
    const [anchorEl, setAnchorEl] = React.useState(null);

    const openPopover = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const closePopover = () => {
      setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;


    const product = props.item;
    const userRole = localStorage.getItem("userRole");
    const naviagate= useNavigate();
    const queryClient = useQueryClient();

    const goToDetail=()=>{
      naviagate(`/product/details/${product._id}`);
    }

     // delete product mutation
  const { mutate: deleteProductMutate, isLoading } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: async () => {
      return await $axios.delete(`/product/delete/${product._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("seller-product-list");
    },
  });
  return (
   <>
   <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      > <Typography sx={{ p: 2 }} variant="h6">
      Are you sure you want to delete this product?
    </Typography>
      <Stack
        direction="row"
        spacing={2}
        padding="1rem"
        justifyContent="flex-end"
      >
        <Button variant="contained" onClick={closePopover}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            closePopover();
            deleteProductMutate();
          }}
        >
          Yes
        </Button>
      </Stack>
    </Popover>
      <Card
        sx={{
          maxWidth: {
            xs: "100vw",
            sm: "25vw",
          },
          

          maxHeight: 500,
          boxShadow:
            " rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        }}
      >
        <CardMedia
          onClick={()=>goToDetail()}
          sx={{
            objectFit: "cover", 
            height: "200px",
            cursor:"pointer" // Consider using a consistent height value
          }}
          component="img"
          alt={product?.name}
          image={product?.image || placeHolderImage}
          />
        <CardContent>
          <Stack direction="row" gap="1rem">
            <Typography gutterBottom variant="h5" component="div">
              {product?.name}
            </Typography>
            <Chip label={product?.company} color="success" variant="outlined" />
          </Stack>
          <Typography variant="h6">Rs. {product?.price}</Typography>
          <Typography variant="body2" color="text.secondary">
            {product?.description.slice(0, 100)}.....
          </Typography>
        </CardContent>
        <CardActions>
        <Button
            size="small"
            variant="contained"
            onClick={() => goToDetail()}
          > 
            Explore         
          </Button> 
          {userRole === "seller" && (
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={(event) => openPopover(event)}
            >
              Delete
            </Button>
)}
        </CardActions>
      </Card>
      </>

  );
};

export default ProductCard;
