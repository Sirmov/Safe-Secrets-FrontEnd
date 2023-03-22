import axios from 'axios';
import { toast } from 'react-toastify';

const host = 'http://localhost:3030';
const storage = window.localStorage;
const axiosInstance = axios.create({ baseURL: host });

axiosInstance.interceptors.request.use(requestInterceptor, requestErrorHandler);

function requestInterceptor(requestConfig) {
    const auth = storage.getItem('auth');

    if (auth !== null) {
        const accessToken = JSON.parse(auth)?.accessToken;

        if (accessToken !== undefined) {
            requestConfig.headers['X-Authorization'] = accessToken;
        }
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

    if (responseError.status === 403) {
        toast.warn('Your session expired. Please logout and sign in.');
    }

    return responseError.response;
}

export default axiosInstance;
