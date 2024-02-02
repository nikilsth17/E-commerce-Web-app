import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { closeProductFilter, setCategory, setMaxPrice, setMinPrice } from '../store/slice/productSlice';
import { Formik } from 'formik';
import { Checkbox, FormControl, FormHelperText, InputAdornment, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import { productCategories } from '../constraints/general.constant';
import Yup from 'yup';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ProductFilter=()=> {

  const {productFilterOpen,category}= useSelector((state)=>state.product);
    const [categoryName, setCategoryName] = React.useState(category);

    const dispatch= useDispatch();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setCategoryName(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    };

  const handleClose = () => {
    dispatch(closeProductFilter());
  };

  return (
    <div>
      
      <Dialog
        fullScreen={fullScreen}
        open={productFilterOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
        <Formik
            initialValues={{
              minPrice: 0,
              maxPrice: 0,
            }}
            validationSchema={Yup.object({
              minPrice: Yup.number().min(
                0,
                "Min price must be greater than 0."
              ),
              maxPrice: Yup.number()
                .min(0, "Max price must be greater than 0.")
                .test({
                  name: "maxPrice",
                  message: "Max price must be greater than min price.",
                  test: function (value) {
                    return value >= this.parent.minPrice;
                  },
                }),
            })}
            onSubmit={({ minPrice, maxPrice }) => {
              let category = categoryName;
              dispatch(setMinPrice(minPrice));
              dispatch(setMaxPrice(maxPrice));
              dispatch(setCategory(category));
              handleClose();
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit} id="product-filter-form">
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Min price
                  </InputLabel>
                  <OutlinedInput
                    type="number"
                    {...formik.getFieldProps("minPrice")}
                    startAdornment={
                      <InputAdornment position="start">Rs.</InputAdornment>
                    }
                    label="Min price"
                  />

                  {formik.touched.minPrice && formik.errors.minPrice ? (
                    <FormHelperText error>
                      {formik.errors.minPrice}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Max price
                  </InputLabel>
                  <OutlinedInput
                    {...formik.getFieldProps("maxPrice")}
                    type="number"
                    startAdornment={
                      <InputAdornment position="start">Rs.</InputAdornment>
                    }
                    label="Max price"
                  />
                  {formik.touched.maxPrice && formik.errors.maxPrice ? (
                    <FormHelperText error>
                      {formik.errors.maxPrice}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={categoryName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {productCategories.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={categoryName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </form>
            )}
          </Formik>
        </DialogContent>
    
        <DialogActions>
          <Button autoFocus onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button
            autoFocus
            variant="contained"
            type="submit"
            form="product-filter-form"
           
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default ProductFilter;