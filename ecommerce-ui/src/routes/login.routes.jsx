import Login from "../pages/Login";
import Register from "../pages/Register";
import MinimumLayout from "../layout/MinimumLayout";
import GuestGuard from "../guards/GuestGuard";

export const loginRoutes=[
    {
        path: "/",
        element: (
          <GuestGuard>
            <MinimumLayout />
            <Login />
          </GuestGuard>
        )
      },
      {
        path: "/register",
        element: <Register />
      }
    
];