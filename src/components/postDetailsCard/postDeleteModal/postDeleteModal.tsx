import { useEffect, useState } from 'react';

import { IconAlertTriangle, IconTrash } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthContext } from '@contexts/authContext';

import { DetailedPost } from '@models/post/detailedPost';

import { deletePost, getPost } from '@services/postsService';

import Modal from '@components/modal/modal';

import { isAuthenticated } from '@utils/_';

function PostDeleteModal() {
    const { postId } = useParams();
    const [post, setPost] = useState<Nullable<DetailedPost>>(null);

    const [isVisible, setIsVisible] = useState(true);
    const { auth } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        getPost(postId || '')
            .then((res) => {
                if (!res.isOk) {
                    toast.error('Something went wrong.');
                } else {
                    const post = res.data as DetailedPost;
                    setPost(post);
                }
            })
            .catch((error) => {
                toast.error('Something went wrong.');
                console.error(error);
            });
    }, [postId]);

    async function handleDelete() {
        if (isAuthenticated(auth) && auth?._id !== post?._ownerId) {
            toast.error('You are not the owner of this post.');
            return;
        }

        const response = await deletePost(postId || '');
        let isSuccessful = true;

        if (!response.isOk) {
            isSuccessful = false;
            toast.error('Something went wrong.');
        }

        if (isSuccessful) {
            setIsVisible(false);
            navigate('/posts');
        }
    }

    return (
        <Modal
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            size="sm"
            status="danger"
            footer={
                <div className="w-100">
                    <button className="btn btn-danger w-100" data-bs-dismiss="modal" onClick={handleDelete}>
                        <IconTrash className="icon" />
                        Delete post
                    </button>
                </div>
            }>
            <IconAlertTriangle className="icon mb-2 text-danger icon-lg" />

            <h3>Are you sure?</h3>
            <div className="text-muted">
                {post?.title === undefined ? (
                    <div className="text-left">
                        <div className="placeholder col-10"></div>
                        <div className="placeholder col-11"></div>
                    </div>
                ) : (
                    <p>
                        Do you really want to remove <b>{post.title}</b> post? What you are going to make cannot be
                        undone.
                    </p>
                )}
            </div>
        </Modal>
    );
}

export default PostDeleteModal;
