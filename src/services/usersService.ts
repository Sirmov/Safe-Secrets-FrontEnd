import httpClient from './httpClient';
import { ErrorResponse } from './types';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    user: (userId: string) => `/users/${userId}`,
    me: '/users/me',
};

interface LoginResponse {
    _id: string;
    email: string;
    username: string;
    accessToken: string;
}

export interface RegisterResponse {
    _id: string;
    email: string;
    username: string;
    password: string;
    _createdOn: number;
    accessToken: string;
}

interface MeResponse {
    _id: string;
    email: string;
    username: string;
}

export async function login(data: { email: string; password: string }) {
    const result = await httpClient.post<LoginResponse | ErrorResponse>(endpoints.login, data);
    return result;
}

export async function register(data: { email: string; username: string; password: string }) {
    return await httpClient.post<RegisterResponse | ErrorResponse>(endpoints.register, data);
}

export async function getMe() {
    return await httpClient.get<MeResponse | ErrorResponse>(endpoints.me);
}

export async function logout() {
    return await httpClient.get<null | ErrorResponse>(endpoints.logout);
}
