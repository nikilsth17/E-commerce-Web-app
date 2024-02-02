import { Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MinimumLayout from "../layout/MinimumLayout";
import GuestGuard from "../guards/GuestGuard";

export const loginRoutes=[
    {
        path:"/",
        element:
            <GuestGuard>
                <MinimumLayout/>
            </GuestGuard> ,
        children:[
            {
                path:"/register",
                element:<Register/>
        
            },
            {
                path:"/login",
                element:<Login/>
            },
        ],
    },
    
];