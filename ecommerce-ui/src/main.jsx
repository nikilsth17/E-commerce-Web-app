import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { loginRoutes } from './routes/login.routes.jsx';
import { mainRoutes } from './routes/main.routes';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { Provider } from 'react-redux';
import reduxStore from './store';

const router= createBrowserRouter([...loginRoutes,...mainRoutes]);
const queryClient=new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <QueryClientProvider client={queryClient}> 
        <RouterProvider router={router}/>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
