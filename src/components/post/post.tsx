import { IconThumbUp } from '@tabler/icons-react';
import { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthContext } from '@contexts/authContext';
import { usePostsContext } from '@contexts/postsContext';

import { Like } from '@models/like/like';

import { likePost, unLikePost } from '@services/likesService';
import { ErrorResponse } from '@services/types';

import useLoading from '@hooks/useLoading';

import { debounce, formatDateShort, isAuthenticated } from '@utils/_';

import styles from './post.module.scss';

interface PostProps {
    _id: string;
    title: string;
    text: string;
    _createdOn: number;
    likes: Like[];
}

function Post({ _id, title, text, _createdOn, likes }: PostProps) {
    const { setLikes } = usePostsContext();
    const { isLoading, watch } = useLoading();
    const { auth } = useAuthContext();

    async function handleLike() {
        if (!isAuthenticated(auth)) {
            toast.warning('You have to be logged in to like a post.');
            return;
        }

        let response = await likePost(auth?._id || '', _id);
        let isSuccessful = true;

        if (!response.isOk) {
            response = response as AxiosResponse<ErrorResponse>;
            isSuccessful = false;

            if (response.data.message === "You can't like a post twice.") {
                toast.warning(response.data.message);
            }

            toast.error('Something went wrong.');
        }

        if (isSuccessful) {
            response = response as AxiosResponse<Like>;
            const like = response.data;

            setLikes?.((likes) => (likes ? [...likes, like] : likes));
        }
    }

    async function handleUnLike() {
        if (!isAuthenticated(auth)) {
            toast.warning('You have to be logged in to like a post.');
            return;
        }

        let response = await unLikePost(auth?._id || '', _id);
        let isSuccessful = true;

        if (!response.isOk) {
            response = response as AxiosResponse<ErrorResponse>;
            isSuccessful = false;

            if (response.data.message === "You can't unlike a post which you have not liked.") {
                toast.warning(response.data.message);
            }

            toast.error('Something went wrong.');
        }

        if (isSuccessful) {
            response = response as AxiosResponse<{ _deleteOn: number; _id: string }>;
            const deletedLikeId = response.data._id;

            setLikes?.((likes) => (likes ? likes.filter((l) => l._id !== deletedLikeId) : likes));
        }
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
    );
}

export default Post;
