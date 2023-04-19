import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

import { isStatusOk } from '@utils/_';

import { ErrorResponse } from './types';

const host = import.meta.env.VITE_API_BASE_URL;
const storage = window.localStorage;
const axiosInstance = axios.create({ baseURL: host });

axiosInstance.interceptors.request.use(requestInterceptor, requestErrorHandler);

function requestInterceptor(requestConfig: InternalAxiosRequestConfig) {
    const auth = storage.getItem('auth');

    if (auth !== null) {
        const accessToken = JSON.parse(auth)?.accessToken;

        if (accessToken !== undefined) {
            requestConfig.headers['X-Authorization'] = accessToken;
        }
    }

    return requestConfig;
}

function requestErrorHandler(requestError: AxiosError) {
    return Promise.reject(requestError);
}

axiosInstance.interceptors.response.use(responseInterceptor, responseErrorHandler);

function responseInterceptor(response: AxiosResponse) {
    response.isOk = isStatusOk(response.status);

    return response;
}

function responseErrorHandler(responseError: AxiosError) {
    console.error(responseError);
    console.error(responseError.message);

    if (responseError.code === 'ERR_NETWORK' && responseError.message === 'Network Error') {
        toast.warning('Check your internet connection.');
        return { ...responseError, status: 503, isOk: false };
    }

    if (responseError.response !== undefined) {
        const response = responseError.response as AxiosResponse<ErrorResponse>;
        response.isOk = false;

        if (response.status === 403 && response.data.message === 'Invalid access token') {
            toast.warn('Your session expired. Please logout and sign in.');
        }
    }

    return responseError.response;
}

export default axiosInstance;
