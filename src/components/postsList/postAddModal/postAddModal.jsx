import React, { useState } from 'react';

import { IconPlus } from '@tabler/icons-react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthContext } from '@contexts/authContext';
import { usePostsContext } from '@contexts/postsContext';

import { createPost } from '@services/postsService';

import Modal from '@components/modal/modal';

import useForm from '@hooks/useForm';
import useValidation from '@hooks/useValidation';

import { postValidator } from '@validators/post/postValidator';

function PostAddModal() {
    const initialValues = { title: '', text: '' };

    const [isVisible, setIsVisible] = useState(true);
    const { setPosts } = usePostsContext();
    const { auth } = useAuthContext();
    const navigate = useNavigate();

    const { values, setValues, handleChange, handleSubmit } = useForm(initialValues, handleCreate);
    const { errors, areValid, handleValidation } = useValidation(initialValues, postValidator);

    async function handleCreate(_event, data) {
        if (!areValid(data)) {
            return;
        }

        const post = { ...data, _ownerId: auth._id };

        const response = await createPost(post);
        let isSuccessful = true;

        if (!response.isOk) {
            isSuccessful = false;
            toast.error('Something went wrong.');
        }

        if (isSuccessful) {
            setPosts((posts) => [...posts, response.data]);
            closeModal();
        } else {
            setValues(initialValues);
        }
    }

    function closeModal() {
        setIsVisible(false);
        navigate('/posts');
    }

    return (
        <Modal
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            size="lg"
            header={<h5 className="modal-title">New post</h5>}
            footer={
                <>
                    <button className="btn link-secondary" onClick={closeModal} data-bs-dismiss="modal">
                        Cancel
                    </button>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary ms-auto">
                        <IconPlus className="icon" size={24} stroke={2} color="currentColor" />
                        Create new post
                    </button>
                </>
            }>
            <form className="text-start">
                <div className="mb-3">
                    <label className="form-label">Title</label>
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
                    <div className="invalid-feedback">{errors.title}</div>
                </div>
                <div>
                    <label className="form-label">Text</label>
                    <textarea
                        className={classNames({
                            'form-control': true,
                            'is-invalid': errors.text,
                        })}
                        name="text"
                        onChange={handleChange}
                        onBlur={handleValidation}
                        value={values.text}
                        rows={3}
                        placeholder="The text of the article"
                    />
                    <div className="invalid-feedback">{errors.text}</div>
                </div>
            </form>
        </Modal>
    );
}

export default PostAddModal;
