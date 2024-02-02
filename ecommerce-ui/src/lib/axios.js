import axios from "axios";

const $axios = axios.create({
    baseURL: 'http://localhost:5000',
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