import { DetailedPost } from '@models/post/detailedPost';
import { Post } from '@models/post/post';

import httpClient from '@services/httpClient';

import { DeleteResponse, ErrorResponse } from './types';

const endpoints = {
    posts: '/data/posts',
    allPosts: '/data/posts?sortBy=_createdOn%20desc',
    post: (postId: string) => `/data/posts/${postId}?load=author%3D_ownerId%3Ausers`,
    userPosts: (userId: string) => `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
};

export async function getAllPosts() {
    return await httpClient.get<Post[] | ErrorResponse>(endpoints.allPosts);
}

export async function getUserPosts(userId: string) {
    return await httpClient.get<Post[] | ErrorResponse>(endpoints.userPosts(userId));
}

export async function getPost(postId: string) {
    return await httpClient.get<DetailedPost | ErrorResponse>(endpoints.post(postId));
}

export async function createPost(post: { title: string; text: string }) {
    return await httpClient.post<Post | ErrorResponse>(endpoints.posts, post);
}

export async function updatePost(postId: string, post: { title: string; text: string }) {
    return await httpClient.put<Post | ErrorResponse>(endpoints.post(postId), post);
}

export async function deletePost(postId: string) {
    return await httpClient.delete<DeleteResponse | ErrorResponse>(endpoints.post(postId));
}
