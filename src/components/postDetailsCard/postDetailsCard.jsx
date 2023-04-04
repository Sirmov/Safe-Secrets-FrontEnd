import React, { useEffect, useState } from 'react';

import { IconThumbUp } from '@tabler/icons-react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthContext } from '@contexts/authContext';
import { usePostContext } from '@contexts/postContext';

import { getPost } from '@services/postsService';

import ArticleText from '@components/articleText/articleText';

import { formatDateShort } from '@utils/_';

import PostDetailsCardSkeleton from './postDetailsCardSkeleton/postDetailsCardSkeleton';

function PostDetailsCard() {
    const { postId } = useParams();
    const { post, setPost } = usePostContext();
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

    return (
        <>
            {!post ? (
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
                            <div className="col-auto">
                                <span className="fs-3 me-3">Author: {post.author.username}</span>
                                <IconThumbUp size={28} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PostDetailsCard;
