import { FormEvent, useState } from 'react';

import { IconPlus } from '@tabler/icons-react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { usePostsContext } from '@contexts/postsContext';

import { CreatePost } from '@models/post/createPost';
import { Post } from '@models/post/post';

import { createPost } from '@services/postsService';

import Modal from '@components/modal/modal';

import useForm from '@hooks/useForm';
import useValidation from '@hooks/useValidation';

import { createPostValidator } from '@validators/post/createPostValidator';

function PostAddModal() {
    const initialValues: CreatePost = { title: '', text: '' };

    const [isVisible, setIsVisible] = useState(true);
    const { setPosts } = usePostsContext();
    const navigate = useNavigate();

    const { values, setValues, handleChange, handleSubmit } = useForm(initialValues, handleCreate);
    const { errors, areValid, handleValidation } = useValidation(initialValues, createPostValidator);

    async function handleCreate(_event: FormEvent<HTMLFormElement>, data: CreatePost) {
        if (!areValid(data)) {
            return;
        }

        const response = await createPost(data);
        let isSuccessful = true;

        if (!response.isOk) {
            isSuccessful = false;
            toast.error('Something went wrong.');
        }

        if (isSuccessful) {
            const createdPost = response.data as Post;
            setPosts?.((posts) => (posts ? [...posts, createdPost] : posts));
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
                    <button form="add-post-form" type="submit" className="btn btn-primary ms-auto">
                        <IconPlus className="icon" />
                        Create new post
                    </button>
                </>
            }>
            <form id="add-post-form" onSubmit={handleSubmit} className="text-start">
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
                        rows={8}
                        placeholder="The text of the article"
                    />
                    <div className="invalid-feedback">{errors.text}</div>
                </div>
            </form>
        </Modal>
    );
}

export default PostAddModal;
