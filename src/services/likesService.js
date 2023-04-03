import httpClient from '@services/httpClient';

const endpoints = {
    likes: '/data/likes',
    like: (likeId) => `/data/likes/${likeId}`,
    userLikes: (userId) => `/data/likes?where=_ownerId%3D%22${userId}%22`,
    userLike: (userId, postId) => `/data/likes?where=_ownerId%3D%22${userId}%22%20AND%20_postId%3D%22${postId}%22`,
};

export async function likePost(userId, postId) {
    const like = { _ownerId: userId, _postId: postId };
    return await httpClient.post(endpoints.likes, like);
}

export async function unLikePost(userId, postId) {
    return await httpClient.delete(endpoints.userLike(userId, postId));
}
