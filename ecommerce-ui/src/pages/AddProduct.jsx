import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/system';
import { Button, Checkbox, FilledInput, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, TextareaAutosize, Typography } from '@mui/material';
import { useMutation } from 'react-query';
import { $axios } from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openErrorSnackbar } from '../store/slice/snackbarSlice';
import axios from 'axios';
import Progress from '../component/Progress';
import { productCategories } from '../constraints/general.constant';

const AddProduct = () => {

  const [productImage,setProductImage]=useState(null);
  const [localUrl,setLocalUrl]= useState(null);
  const [imageLoading,setImageLoading]=useState(false);
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const {mutate,isLoading,isError,error}= useMutation({
    mutationKey:["add-product"],
    mutationFn:async(values)=>{
      return await $axios.post("/product/add",values);
    },
    onSuccess: (res) => {
      navigate("/product");
    },
    onError:(error)=>{
      dispatch(openErrorSnackbar(error?.res?.data?.message));
    }
  });
    
    
      if (isLoading || imageLoading){
        return <Progress/>
      }
  return (
    <Box 
        sx={{
              
  
                display: "grid",
                placeItems: "center",
                width: "100%",
                // backgroundColor: "grey",
         
        }}>
    <Formik
      initialValues={{ 
        name: "",
        company: "",
        price: 0,
        freeShipping: false,
        quantity: 0,
        description: "",
        category: "",
       }}
      validationSchema={Yup.object({
        name: Yup.string()
            .required("Name is required.")
            .min(2, "Name must be at least 2 characters.")
            .max(55, "Name must be at most 55 characters.")
            .trim(),
          company: Yup.string()
            .required("Company is required.")
            .min(2, "Name must be at least 2 characters.")
            .max(55, "Name must be at most 55 characters.")
            .trim(),
          price: Yup.number()
            .required("Price is required.")
            .min(0, "Price must be greater than 0"),
          description: Yup.string()
            .required("Description is required.")
            .min(200, "Description must be at least 200 characters.")
            .max(1000, "Description must be at most 1000 characters.")
            .trim(),
          category: Yup.string()
            .required("Category is required.")
            .oneOf(productCategories),
          freeShipping: Yup.boolean().required("Free Shipping is required."),
          quantity: Yup.number()
            .min(1, "Quantity must be greater than 0")
            .required("Quantity is required.")
            .integer("Quantity must be an integer."),
      })}
      onSubmit={async(values) => {
        values.category=values.category.toLowerCase();
        // values.price=Number(values.price);

        let imageUrl=""
        if (productImage){
          const cloudName="dwdsb90uh";
          // create from data object 
          const data= new FormData();
          data.append("file",productImage);
          data.append("upload_preset","ecommerce");
          data.append("cloud_name",cloudName);
          
          //hit cloudinary api
          try {
            setImageLoading(true);
            const res=await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,data);
            imageUrl=res?.data?.secure_url;
            setImageLoading(false);
          } catch (error) {
            dispatch(openErrorSnackbar(error?.res?.data?.message));
            setImageLoading(false);
          } 
        }
        if (imageUrl){
          values.image=imageUrl;
        }

        
        mutate(values);
      }}   
    >
      {formik => (
 
 <form
            onSubmit={formik.handleSubmit}
            style={{
              marginTop: "7rem",
              boxShadow:
                " rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem",
              minWidth: "40%",
            }}
          >
            <Typography variant="h6" sx={{ color: "black" }}>
              Add Product
            </Typography>

{/*============================= image part================================== */}
            {
              productImage && <img src={localUrl} style={{width:"100%", height:300}}/>
            }
            <input 
              type="file"
              onChange={(event)=>{
                const productPhoto= event.target.files[0];
                setProductImage(productPhoto);
                setLocalUrl(URL.createObjectURL(productPhoto));
              }}/>

{/* =================================================================================== */}
            <FormControl fullWidth>
              <TextField
                variant="filled"
                label="Name"
                {...formik.getFieldProps("name")}
                fullWidth
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error-message">{formik.errors.name}</div>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                variant="filled"
                label="Company"
                {...formik.getFieldProps("company")}
                fullWidth
              />
              {formik.touched.company && formik.errors.company ? (
                <div className="error-message">{formik.errors.company}</div>
              ) : null}
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
              <FilledInput
                {...formik.getFieldProps("price")}
                startAdornment={
                  <InputAdornment position="start">Rs.</InputAdornment>
                }
              />

              {formik.touched.price && formik.errors.price ? (
                <div className="error-message">{formik.errors.price}</div>
              ) : null}
            </FormControl>

            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <TextField
                type="number"
                {...formik.getFieldProps("quantity")}
                label="Quantity"
                fullWidth
                variant="filled"
              />
              {formik.touched.quantity && formik.errors.quantity ? (
                <div className="error-message">{formik.errors.quantity}</div>
              ) : null}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                variant="filled"
                {...formik.getFieldProps("category")}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                {productCategories.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                // backgroundColor: "red",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ color: "black" }}>
                Free shipping
              </Typography>

              {/* we can set formik values using formik.values and formik.setFieldValue */}
              <Checkbox
                color="success"
                sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
                // {...formik.getFieldProps("freeShipping")}
                checked={formik.values.freeShipping}
                onChange={() => {
                  formik.setFieldValue(
                    "freeShipping",
                    !formik.values.freeShipping
                  );
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <TextareaAutosize
                className="product-description"
                placeholder="Product description here..."
                {...formik.getFieldProps("description")}
              />

              {formik.touched.description && formik.errors.description ? (
                <div className="error-message">{formik.errors.description}</div>
              ) : null}
            </FormControl>

            {/* {console.log(formik.values)} */}

            <Button type="submit" variant="contained" fullWidth>
              Add product
            </Button>
          </form>
      )}
    </Formik>
    </Box>
  
  );
};


export default AddProduct;