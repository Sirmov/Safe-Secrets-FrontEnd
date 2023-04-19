import httpClient from './httpClient';

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

interface RegisterResponse {
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
    const result = await httpClient.post<LoginResponse>(endpoints.login, data);
    return result;
}

export async function register(data: { username: string; email: string; password: string }) {
    return await httpClient.post<RegisterResponse>(endpoints.register, data);
}

export async function loginEmail(email: string, password: string) {
    return await httpClient.post<LoginResponse>(endpoints.login, { email, password });
}

export async function registerEmail(email: string, password: string) {
    return await httpClient.post<RegisterResponse>(endpoints.register, { email, password });
}

export async function loginUsername(username: string, password: string) {
    return await httpClient.post<LoginResponse>(endpoints.login, { username, password });
}

export async function registerUsername(username: string, password: string) {
    return await httpClient.post<RegisterResponse>(endpoints.register, { username, password });
}

export async function getMe() {
    return await httpClient.get<MeResponse>(endpoints.me);
}

export async function logout() {
    return await httpClient.get<null>(endpoints.logout);
}
