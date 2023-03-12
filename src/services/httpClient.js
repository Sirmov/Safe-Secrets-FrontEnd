import axios from 'axios';
import { toast } from 'react-toastify';

const host = 'http://localhost:3030';
const axiosInstance = axios.create({ baseURL: host });

axiosInstance.interceptors.request.use(requestInterceptor, requestErrorHandler);

function requestInterceptor(requestConfig) {
    const accessToken = null; // ToDo get access token from storage

    if (accessToken !== undefined) {
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
    if (responseError.status === 403) {
        toast.info('Your session has expired.');
    } else {
        toast.warning('Something went wrong.');
    }
}

export default axiosInstance;
