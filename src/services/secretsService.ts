import httpClient from '@services/httpClient';

import { DeleteResponse } from './types';

const endpoints = {
    secrets: '/data/secrets',
    allSecrets: '/data/secrets?sortBy=_createdOn%20desc',
    secret: (secretId: string) => `/data/secrets/${secretId}`,
    userSecrets: (query: string) => `/data/secrets?${query}&sortBy=_createdOn%20desc`,
};

interface Secret {
    _id: string;
    _ownerId: string;
    title: string;
    secret: string;
    isFavorite: boolean;
    _createdOn: number;
    _updateOn?: number;
}

export async function getAllSecrets() {
    return await httpClient.get<Secret[]>(endpoints.allSecrets);
}

export async function getUserSecrets(userId: string, search = '', onlyFavorites: boolean) {
    const matches = [];

    matches.push(`_ownerId="${userId}"`);

    if (search !== '') {
        matches.push(`title LIKE "${search}"`);
    }

    if (onlyFavorites) {
        matches.push('isFavorite=true');
    }

    const searchQuery = `where=${encodeURIComponent(matches.join(' AND '))}`;

    return await httpClient.get<Secret[]>(endpoints.userSecrets(searchQuery));
}

export async function getSecret(secretId: string) {
    return await httpClient.get<Secret>(endpoints.secret(secretId));
}

export async function createSecret(secret: { tittle: string; secret: string }) {
    return await httpClient.post<Secret>(endpoints.secrets, secret);
}

export async function updateSecret(secretId: string, secret: { tittle: string; secret: string }) {
    return await httpClient.put<Secret>(endpoints.secret(secretId), secret);
}

export async function deleteSecret(secretId: string) {
    return await httpClient.delete<DeleteResponse>(endpoints.secret(secretId));
}
