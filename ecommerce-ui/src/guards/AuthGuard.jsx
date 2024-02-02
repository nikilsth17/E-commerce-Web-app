import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isLoggedUser } from '../utilis/loggedInUser';

const AuthGuard = (props) => {
    const navigate= useNavigate();
    const isLoggedIn= isLoggedUser();
    useEffect(()=>{
        if(!isLoggedIn){
            navigate("/login");
        }
    },[navigate,isLoggedIn]);
  return  <>
    {isLoggedIn && props.children}
    </>
    
}

export default AuthGuard