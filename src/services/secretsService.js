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
