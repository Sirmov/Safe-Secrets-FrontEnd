import axios from 'axios';
import { toast } from 'react-toastify';

import { isStatusOk } from '@utils/_';

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
    response.isOk = isStatusOk(response.status);

    return response;
}

function responseErrorHandler(responseError) {
    console.error(responseError);
    console.error(responseError.message);

    if (responseError.code === 'ERR_NETWORK' && responseError.message === 'Network Error') {
        toast.warning('Check your internet connection.');
        return { ...responseError, status: 503, isOk: false };
    }

    responseError.response.isOk = false;

    if (responseError?.response?.status === 403 && responseError?.response?.data?.message === 'Invalid access token') {
        toast.warn('Your session expired. Please logout and sign in.');
    }

    return responseError.response;
}

export default axiosInstance;
