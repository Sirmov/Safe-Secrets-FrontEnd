import httpClient from './httpClient';

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
};

export async function login(data) {
    const userData = await httpClient.post(endpoints.login, data);
    return userData;
}

export async function register(data) {
    const userData = await httpClient.post(endpoints.register, data);
    return userData;
}

export async function loginEmail(email, password) {
    const userData = await httpClient.post(endpoints.login, { email, password });
    return userData;
}

export async function registerEmail(email, password) {
    const userData = await httpClient.post(endpoints.register, { email, password });
    return userData;
}

export async function loginUsername(username, password) {
    const userData = await httpClient.post(endpoints.login, { username, password });
    return userData;
}

export async function registerUsername(username, password) {
    const userData = await httpClient.post(endpoints.register, { username, password });
    return userData;
}

export async function logout() {
    await httpClient.get(endpoints.logout);
}
