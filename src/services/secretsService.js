import httpClient from '@services/httpClient';

import { isString } from '@utils/_';

const endpoints = {
    secrets: '/data/secrets',
    allSecrets: '/data/secrets?sortBy=_createdOn%20desc',
    secret: (secretId) => `/data/secrets/${secretId}`,
    userSecrets: (query) => `/data/secrets?${query}&sortBy=_createdOn%20desc`,
};

export async function getAllSecrets() {
    return await httpClient.get(endpoints.allSecrets);
}

export async function getUserSecrets(userId, search = '', onlyFavorites) {
    const matches = [];

    matches.push(`_ownerId="${userId}"`);

    if (isString(search) && search !== '') {
        matches.push(`title LIKE "${search}"`);
    }

    if (onlyFavorites) {
        matches.push('isFavorite=true');
    }

    const searchQuery = `where=${encodeURIComponent(matches.join(' AND '))}`;

    return await httpClient.get(endpoints.userSecrets(searchQuery));
}

export async function getSecret(secretId) {
    return await httpClient.get(endpoints.secret(secretId));
}

export async function createSecret(secret) {
    return await httpClient.post(endpoints.secrets, secret);
}

export async function updateSecret(secretId, secret) {
    return await httpClient.put(endpoints.secret(secretId), secret);
}

export async function deleteSecret(secretId) {
    return await httpClient.delete(endpoints.secret(secretId));
}
