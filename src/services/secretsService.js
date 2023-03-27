import httpClient from '@services/httpClient';

const endpoints = {
    secrets: '/data/secrets',
    allSecrets: '/data/secrets?sortBy=_createdOn%20desc',
    secret: (secretId) => `/data/secrets/${secretId}`,
    userSecrets: (userId) => `/data/secrets?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    userFavoriteSecrets: (userId) =>
        `/data/secrets?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc&where=isFavorite%3Dtrue`,
};

export async function getAllSecrets() {
    return await httpClient.get(endpoints.allSecrets);
}

export async function getUserSecrets(userId, onlyFavorites) {
    if (onlyFavorites) {
        return await httpClient.get(endpoints.userFavoriteSecrets(userId));
    }

    return await httpClient.get(endpoints.userSecrets(userId));
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
