import httpClient from '@services/httpClient';

const endpoints = {
    likes: '/data/likes',
    like: (likeId) => `/data/likes/${likeId}`,
    userLikes: (userId) => `/data/likes?where=_ownerId%3D%22${userId}%22`,
    postLikes: (postId) => `/data/likes?where=_postId%3D%22${postId}%22`,
    userLike: (userId, postId) => `/data/likes?where=_ownerId%3D%22${userId}%22%20AND%20_postId%3D%22${postId}%22`,
};

export async function getAllLikes() {
    return await httpClient.get(endpoints.likes);
}

export async function getUserLike(userId, postId) {
    return await httpClient.get(endpoints.userLike(userId, postId));
}

export async function getPostLikes(postId) {
    return await httpClient.get(endpoints.postLikes(postId));
}

export async function likePost(userId, postId) {
    let response = await getUserLike(userId, postId);

    if (!response.isOk) {
        return response;
    }

    const userLike = Object.values(response.data);

    if (userLike.length !== 0) {
        return {
            ...response,
            status: 400,
            statusText: 'Bad Request',
            data: {
                message: "You can't like a post twice.",
            },
        };
    }

    const like = { _ownerId: userId, _postId: postId };
    return await httpClient.post(endpoints.likes, like);
}

export async function unLikePost(userId, postId) {
    let response = await getUserLike(userId, postId);

    if (!response.isOk) {
        return response;
    }
    const userLike = Object.values(response.data);

    if (userLike.length === 0) {
        return {
            ...response,
            status: 400,
            statusText: 'Bad Request',
            data: {
                message: "You can't unlike a post which you have not liked.",
            },
        };
    }

    response = await httpClient.delete(endpoints.like(userLike[0]._id));

    if (response.isOk) {
        return { ...response, data: { ...response.data, ...userLike[0] } };
    }

    return response;
}
