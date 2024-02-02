import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../store/slice/snackbarSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar=()=> {
  const {open,severity,message}= useSelector((state)=>state.snackbar);
  const dispatch=useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setOpen(false));
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
        </Alert>
      </Snackbar>
     
    </Stack>
  );
}

export default CustomSnackbar;