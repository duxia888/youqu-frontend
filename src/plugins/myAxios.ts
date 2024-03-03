import axios, {AxiosInstance} from "axios";
import {Toast} from "vant";

const myAxios: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api'
});

myAxios.defaults.withCredentials = true; //设置为true，向后端发送请求携带上我的凭证

// Add a request interceptor
myAxios.interceptors.request.use(function (config) {
    console.log("我要发请求啦", config);
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
    console.log("我收到你的响应啦",response);
    // Do something with response data
    const data = response.data;
    console.log("收到的数据",data);
    if (data?.code === 40100) {
        Toast("未登录")
        const redirectUrl = window.location.href
        window.location.href = `/user/login?redirect=${redirectUrl}`
    }
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default myAxios;