import httpClient from '@services/httpClient';

const endpoints = {
    posts: '/data/posts',
    allPosts: '/data/posts?sortBy=_createdOn%20desc',
    post: (postId) => `/data/posts/${postId}?load=author%3D_ownerId%3Ausers`,
    userPosts: (userId) => `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
};

export async function getAllPosts() {
    return await httpClient.get(endpoints.allPosts);
}

export async function getUserPosts(userId) {
    return await httpClient.get(endpoints.userPosts(userId));
}

export async function getPost(postId) {
    return await httpClient.get(endpoints.post(postId));
}

export async function createPost(post) {
    return await httpClient.post(endpoints.posts, post);
}

export async function updatePost(postId, post) {
    return await httpClient.put(endpoints.post(postId), post);
}

export async function deletePost(postId) {
    return await httpClient.delete(endpoints.post(postId));
}
