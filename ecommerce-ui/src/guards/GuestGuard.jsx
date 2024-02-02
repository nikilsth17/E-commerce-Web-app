import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isLoggedUser } from '../utilis/loggedInUser';

const GuestGuard = (props) => {
    const navigate= useNavigate();
    const isLoggedIn= isLoggedUser();

    useEffect(()=>{
        if (isLoggedIn){
            navigate("/home");
        }
    },[isLoggedIn,navigate]);
  return  <>
            {!isLoggedIn && props.children}
    </>
  
}

export default GuestGuard