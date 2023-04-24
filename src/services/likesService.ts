import { AxiosResponse } from 'axios';

import { Like } from '@models/like/like';

import httpClient from '@services/httpClient';

import { DeleteResponse, ErrorResponse } from './types';

const endpoints = {
    likes: '/data/likes',
    like: (likeId: string) => `/data/likes/${likeId}`,
    userLikes: (userId: string) => `/data/likes?where=_ownerId%3D%22${userId}%22`,
    postLikes: (postId: string) => `/data/likes?where=_postId%3D%22${postId}%22`,
    userLike: (userId: string, postId: string) =>
        `/data/likes?where=_ownerId%3D%22${userId}%22%20AND%20_postId%3D%22${postId}%22`,
};

export async function getAllLikes() {
    return await httpClient.get<Like[] | ErrorResponse>(endpoints.likes);
}

export async function getUserLike(userId: string, postId: string) {
    return await httpClient.get<Like | ErrorResponse>(endpoints.userLike(userId, postId));
}

export async function getPostLikes(postId: string) {
    return await httpClient.get<Like[] | ErrorResponse>(endpoints.postLikes(postId));
}

export async function likePost(userId: string, postId: string) {
    const response = await getUserLike(userId, postId);

    if (!response.isOk) {
        return response as AxiosResponse<ErrorResponse>;
    }

    const userLike = Object.values(response.data);

    if (userLike.length !== 0) {
        const errorResponse: AxiosResponse<ErrorResponse> = {
            ...response,
            status: 400,
            statusText: 'Bad Request',
            isOk: false,
            data: {
                code: 400,
                message: "You can't like a post twice.",
            },
        };

        return errorResponse;
    }

    const like = { _ownerId: userId, _postId: postId };
    return await httpClient.post<Like>(endpoints.likes, like);
}

export async function unLikePost(userId: string, postId: string) {
    const response = await getUserLike(userId, postId);

    if (!response.isOk) {
        return response as AxiosResponse<ErrorResponse>;
    }
    const userLike = Object.values(response.data);

    if (userLike.length === 0) {
        const errorResponse: AxiosResponse<ErrorResponse> = {
            ...response,
            status: 400,
            statusText: 'Bad Request',
            isOk: false,
            data: {
                code: 400,
                message: "You can't unlike a post which you have not liked.",
            },
        };

        return errorResponse;
    }

    const deleteResult = await httpClient.delete<DeleteResponse>(endpoints.like(userLike[0]._id));

    return { ...deleteResult, data: { ...deleteResult.data, _id: userLike[0]._id } } as AxiosResponse<
        DeleteResponse & { _id: string }
    >;
}
