import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

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
    <div>
    <Button onClick={handleClickOpen}>
        <BiLogOut size={30}/>
    </Button>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Do you want to logout?"}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
          No
          </Button>
          <Button variant='contained' onClick={()=>{
            localStorage.clear();
            navigate("/login");
          }} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default LogoutDialog;