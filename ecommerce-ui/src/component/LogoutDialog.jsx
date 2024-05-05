import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

const LogoutDialog=()=> {
  const [open, setOpen] = React.useState(false);
  const navigate= useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Box onClick={handleClickOpen} sx={{width:30,cursor:"pointer"}}>
        <BiLogOut size={26} color='white'/>
    </Box>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Do you want to logout?"}
        </DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
          No
          </Button>
          <Button variant='contained' onClick={()=>{
            localStorage.clear();
            navigate("/");
          }} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


export default LogoutDialog;