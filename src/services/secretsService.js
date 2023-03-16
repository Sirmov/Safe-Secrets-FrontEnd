import httpClient from '@services/httpClient';

const endpoints = {
    secrets: '/jsonstore/secrets',
    allSecrets: '/jsonstore/secrets?sortBy=_createdOn%20desc',
    secret: (secretId) => `/jsonstore/secrets/${secretId}`,
    userSecrets: (userId) => `/jsonstore/secrets?where=_ownerId%3D%22${userId}%22`,
    userMemes: (userId) => `/jsonstore/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
};

export async function getAllSecrets() {
    return await httpClient.get(endpoints.allSecrets);
}

export async function getSecret(secretId) {
    return await httpClient.get(endpoints.secret(secretId));
}

export async function createSecret(secret) {
    return await httpClient.put(endpoints.secrets, secret);
}

export async function updateSecret(secretId, secret) {
    return await httpClient.put(endpoints.secret(secretId), secret);
}

export async function deleteSecret(secretId) {
    return await httpClient.delete(endpoints.secret(secretId));
}
