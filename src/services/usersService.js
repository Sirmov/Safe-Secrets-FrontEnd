import httpClient from './httpClient';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
};

export async function login(data) {
    return await httpClient.post(endpoints.login, data);
}

export async function register(data) {
    return await httpClient.post(endpoints.register, data);
}

export async function loginEmail(email, password) {
    return await httpClient.post(endpoints.login, { email, password });
}

export async function registerEmail(email, password) {
    return await httpClient.post(endpoints.register, { email, password });
}

export async function loginUsername(username, password) {
    return await httpClient.post(endpoints.login, { username, password });
}

export async function registerUsername(username, password) {
    return await httpClient.post(endpoints.register, { username, password });
}

export async function logout() {
    return await httpClient.get(endpoints.logout);
}
