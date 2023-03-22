import axios from 'axios';
import { toast } from 'react-toastify';

const host = 'http://localhost:3030';
const storage = window.localStorage;
const axiosInstance = axios.create({ baseURL: host });

axiosInstance.interceptors.request.use(requestInterceptor, requestErrorHandler);

function requestInterceptor(requestConfig) {
    const accessToken = storage.getItem('accessToken');

    if (accessToken !== null) {
        requestConfig.headers['X-Authorization'] = accessToken;
    }

    return requestConfig;
}

function requestErrorHandler(requestError) {
    return Promise.reject(requestError);
}

axiosInstance.interceptors.response.use(responseInterceptor, responseErrorHandler);

function responseInterceptor(response) {
    return response;
}

function responseErrorHandler(responseError) {
    console.error(responseError);
    console.error(responseError.message);
}

export default axiosInstance;
