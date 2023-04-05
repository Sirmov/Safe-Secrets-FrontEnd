import React, { useState } from 'react';

import { IconThumbUp } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthContext } from '@contexts/authContext';
import { usePostsContext } from '@contexts/postsContext';

import { getUserLike, likePost, unLikePost } from '@services/likesService';

import { debounce, formatDateShort, isAuthenticated } from '@utils/_';

import styles from './post.module.scss';

function Post({ _id, title, text, _createdOn, likes }) {
    const { setLikes } = usePostsContext();
    const [isLoading, setIsLoading] = useState(false);
    const { auth } = useAuthContext();

    async function handleLike() {
        setIsLoading(true);

        if (!isAuthenticated(auth)) {
            toast.warning('You have to be logged in to like a post.');
            setIsLoading(false);
            return;
        }

        let response = await getUserLike(auth._id, _id);
        if (!response.isOk) {
            toast.error('Something went wrong.');
            setIsLoading(false);
            return;
        }
        const userLike = Object.values(response.data);

        if (userLike?.length !== 0) {
            toast.warning("You can't like a post twice.");
            setIsLoading(false);
            return;
        }

        response = await likePost(auth._id, _id);
        let isSuccessful = true;

        if (!response.isOk) {
            toast.error('Something went wrong.');
            isSuccessful = false;
        }

        if (isSuccessful) {
            setLikes((likes) => [...likes, response.data]);
        }

        setIsLoading(false);
    }

    async function handleUnLike() {
        setIsLoading(true);

        if (!isAuthenticated(auth)) {
            toast.warning('You have to be logged in to like a post.');
            setIsLoading(false);
            return;
        }

        let response = await getUserLike(auth._id, _id);
        if (!response.isOk) {
            toast.error('Something went wrong.');
            setIsLoading(false);
            return;
        }
        const userLike = Object.values(response.data);

        if (userLike?.length === 0) {
            toast.warning("You can't unlike a post which you have not liked.");
            setIsLoading(false);
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

        setIsLoading(false);
    }

    return (
        <div className={`card ${styles.card}`} style={{ height: 250 + 'px' }}>
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
            </div>
            <div className="card-body">
                <p>{text.split(' ').slice(0, 40).join(' ')} ...</p>
            </div>
            <div className="card-footer">
                <div className="row align-items-center">
                    <div className="col">Uploaded {formatDateShort(_createdOn)}</div>
                    <div className="col-auto d-flex align-items-center">
                        <Link to={`details/${_id}`} className="btn btn-primary me-2">
                            Read more
                        </Link>
                        {isLoading ? (
                            <div className="spinner-border" role="status"></div>
                        ) : likes.some((like) => like._ownerId === auth?._id) ? (
                            <IconThumbUp
                                onClick={debounce(handleUnLike, 500)}
                                className="icon-filled text-cyan"
                                size={32}
                                stroke={1.25}
                                color="black"
                            />
                        ) : (
                            <IconThumbUp onClick={debounce(handleLike, 500)} size={32} stroke={1.25} />
                        )}
                        <span className="fs-3">{likes.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
