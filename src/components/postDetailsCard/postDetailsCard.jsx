import React, { useEffect } from 'react';

import { IconThumbUp } from '@tabler/icons-react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthContext } from '@contexts/authContext';
import { usePostContext } from '@contexts/postContext';

import { getPostLikes, getUserLike, likePost, unLikePost } from '@services/likesService';
import { getPost } from '@services/postsService';

import ArticleText from '@components/articleText/articleText';

import useLoading from '@hooks/useLoading';

import { debounce, formatDateShort, isAuthenticated } from '@utils/_';

import PostDetailsCardSkeleton from './postDetailsCardSkeleton/postDetailsCardSkeleton';

function PostDetailsCard() {
    const { postId } = useParams();
    const { post, setPost, likes, setLikes } = usePostContext();

    const [isLoading, watch] = useLoading();
    const { auth } = useAuthContext();

    useEffect(() => {
        getPost(postId)
            .then((res) => {
                if (!res.isOk) {
                    toast.error('Something went wrong.');
                } else {
                    setPost(res.data);
                }
            })
            .catch((error) => {
                toast.error('Something went wrong.');
                console.error(error);
            });
    }, [postId]);

    useEffect(() => {
        getPostLikes(postId)
            .then((res) => {
                if (!res.isOk) {
                    toast.error('Something went wrong.');
                } else {
                    const likes = Object.values(res.data);
                    setLikes(likes);
                }
            })
            .catch((error) => {
                toast.error('Something went wrong.');
                console.error(error);
            });
    }, []);

    async function handleLike() {
        if (!isAuthenticated(auth)) {
            toast.warning('You have to be logged in to like a post.');
            return;
        }

        let response = await getUserLike(auth._id, postId);
        if (!response.isOk) {
            toast.error('Something went wrong.');
            return;
        }
        const userLike = Object.values(response.data);

        if (userLike?.length !== 0) {
            toast.warning("You can't like a post twice.");
            return;
        }

        response = await likePost(auth._id, postId);
        let isSuccessful = true;

        if (!response.isOk) {
            toast.error('Something went wrong.');
            isSuccessful = false;
        }

        if (isSuccessful) {
            setLikes((likes) => [...likes, response.data]);
        }
    }

    async function handleUnLike() {
        if (!isAuthenticated(auth)) {
            toast.warning('You have to be logged in to like a post.');
            return;
        }

        let response = await getUserLike(auth._id, postId);
        if (!response.isOk) {
            toast.error('Something went wrong.');
            return;
        }
        const userLike = Object.values(response.data);

        if (userLike?.length === 0) {
            toast.warning("You can't unlike a post which you have not liked.");
            return;
        }

        response = await unLikePost(userLike[0]._id);
        let isSuccessful = true;

        if (!response.isOk) {
            toast.error('Something went wrong.');
            isSuccessful = false;
        }

        if (isSuccessful) {
            setLikes((likes) => likes.filter((l) => l._id !== userLike[0]._id));
        }
    }

    return (
        <>
            {!post || !likes ? (
                <PostDetailsCardSkeleton />
            ) : (
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">{post.title}</h3>
                    </div>
                    <div className="card-body">
                        <ArticleText>{post.text}</ArticleText>
                    </div>
                    <div className="card-footer">
                        <div className="row align-items-center">
                            <div className="col">Uploaded {formatDateShort(post._createdOn)}</div>
                            {auth._id === post._ownerId ? (
                                <div className="col-auto">
                                    <Link to="edit" className="btn btn-warning bg-yellow me-2">
                                        Edit
                                    </Link>
                                    <Link to="delete" className="btn btn-danger">
                                        Delete
                                    </Link>
                                </div>
                            ) : null}
                            <div className="col-auto d-flex align-items-center">
                                <span className="fs-3 me-3">Author: {post.author.username}</span>
                                {isLoading ? (
                                    <div className="spinner-border" role="status"></div>
                                ) : likes.some((like) => like._ownerId === auth?._id) ? (
                                    <IconThumbUp
                                        onClick={debounce(watch(handleUnLike), 500)}
                                        className="icon-filled text-cyan"
                                        size={32}
                                        stroke={1.25}
                                        color="black"
                                    />
                                ) : (
                                    <IconThumbUp onClick={debounce(watch(handleLike), 500)} size={32} stroke={1.25} />
                                )}
                                <span className="fs-3">{likes.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PostDetailsCard;
