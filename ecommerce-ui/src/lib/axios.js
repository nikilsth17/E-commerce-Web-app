import axios from "axios";

const $axios = axios.create({
    baseURL: 'https://e-commerce-web-app-b9qv.onrender.com',
    timeout: 5000,
  });


// Add a request interceptor
$axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const accesstoken= localStorage.getItem("accesstoken");
    if (accesstoken){
        config.headers.Authorization=`Bearer ${accesstoken}`;
    }
    return config;
});


export {$axios};