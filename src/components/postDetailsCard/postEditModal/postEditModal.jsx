import React, { useEffect, useState } from 'react';

import { IconEdit } from '@tabler/icons-react';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthContext } from '@contexts/authContext';
import { usePostContext } from '@contexts/postContext';

import { getPost, updatePost } from '@services/postsService';

import Modal from '@components/modal/modal';

import useForm from '@hooks/useForm';
import useValidation from '@hooks/useValidation';

import { postValidator } from '@validators/post/postValidator';

function PostEditModal() {
    const { postId } = useParams();
    const { post, setPost } = usePostContext();

    const initialValues = { title: post.title, text: post.text };
    useEffect(() => {
        initialValues.title = post.title;
        initialValues.text = post.text;
    }, [post]);

    const [isVisible, setIsVisible] = useState(true);
    const { auth } = useAuthContext();
    const navigate = useNavigate();

    const { values, setValues, handleChange, handleSubmit } = useForm(initialValues, handleUpdate);
    const { errors, areValid, handleValidation } = useValidation(initialValues, postValidator);

    async function handleUpdate(_event, data) {
        if (auth._id !== post?._ownerId) {
            toast.error('You are not the owner of this post.');
            return;
        }

        if (!areValid(data)) {
            return;
        }

        const response = await updatePost(postId, { ...post, title: data.title, text: data.text });
        let isSuccessful = true;

        if (!response.isOk) {
            isSuccessful = false;
            toast.error('Something went wrong.');
        }

        if (isSuccessful) {
            setPost(response.data);
            closeModal();
        } else {
            setValues(initialValues);
        }
    }

    function closeModal() {
        setIsVisible(false);
        navigate(`/posts/details/${postId}`);
    }

    return (
        <Modal
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            size="lg"
            header={<h5 className="modal-title">Edit post</h5>}
            footer={
                <>
                    <button className="btn link-secondary" onClick={closeModal} data-bs-dismiss="modal">
                        Cancel
                    </button>
                    <button type="submit" onClick={handleSubmit} className="btn btn-warning bg-yellow ms-auto">
                        <IconEdit className="icon" />
                        Edit post
                    </button>
                </>
            }>
            <form className="text-start">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    {post?.title === null ? (
                        <div className="placeholder col-12"></div>
                    ) : (
                        <input
                            className={classNames({
                                'form-control': true,
                                'is-invalid': errors.title,
                            })}
                            name="title"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleValidation}
                            value={values.title}
                            placeholder="The title of the post"
                        />
                    )}

                    <div className="invalid-feedback">{errors.title}</div>
                </div>
                <div>
                    <label className="form-label">Text</label>
                    {post?.text === null ? (
                        <>
                            <div className="placeholder col-12"></div>
                            <div className="placeholder col-12"></div>
                            <div className="placeholder col-12"></div>
                            <div className="placeholder col-12"></div>
                            <div className="placeholder col-12"></div>
                            <div className="placeholder col-12"></div>
                            <div className="placeholder col-12"></div>
                        </>
                    ) : (
                        <textarea
                            className={classNames({
                                'form-control': true,
                                'is-invalid': errors.text,
                            })}
                            name="text"
                            onChange={handleChange}
                            onBlur={handleValidation}
                            value={values.text}
                            rows={8}
                            placeholder="The text of the article"
                        />
                    )}

                    <div className="invalid-feedback">{errors.text}</div>
                </div>
            </form>
        </Modal>
    );
}

export default PostEditModal;
