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
    const like = { _ownerId: userId, _postId: postId };
    return await httpClient.post(endpoints.likes, like);
}

export async function unLikePost(likeId) {
    return await httpClient.delete(endpoints.like(likeId));
}
