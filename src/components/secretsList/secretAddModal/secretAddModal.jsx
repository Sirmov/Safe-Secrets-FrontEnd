import React, { useContext, useState } from 'react';

import { IconPlus } from '@tabler/icons-react';
import classNames from 'classnames';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import SecretsContext from '@contexts/secretsContext';

import { createSecret } from '@services/secretsService';

import Modal from '@components/modal/modal';

import useForm from '@hooks/useForm';

import { isStatusOk } from '@utils/_';

function SecretAddModal() {
    const initialValues = { title: '', key: '', text: '' };

    const [isVisible, setIsVisible] = useState(true);
    const { setSecrets } = useContext(SecretsContext);
    const navigate = useNavigate();

    const { values, setValues, errors, handleChange, handleValidation, handleSubmit } = useForm(
        initialValues,
        handleCreate
    );

    async function handleCreate(_event, data) {
        let secret = {
            title: data.title,
            text: CryptoJS.AES.encrypt(data.text, data.key).toString(),
        };

        const response = await createSecret(secret);
        let isSuccessful = true;

        if (!isStatusOk(response.status)) {
            isSuccessful = false;
            toast.error('Something went wrong.');
        }

        if (isSuccessful) {
            secret = { ...secret, isEncrypted: true, _id: response.data._id };
            secret.isEncrypted = true;
            setSecrets((secrets) => [...secrets, secret]);
            closeModal();
        } else {
            setValues(initialValues);
        }
    }

    function closeModal() {
        setIsVisible(false);
        navigate('/secrets');
    }

    return (
        <Modal
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            size="lg"
            header={<h5 className="modal-title">New secret</h5>}
            footer={
                <>
                    <button className="btn link-secondary" onClick={closeModal} data-bs-dismiss="modal">
                        Cancel
                    </button>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary ms-auto">
                        <IconPlus className="icon" size={24} stroke={2} color="currentColor" />
                        Create new report
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
                        placeholder="The name to identify your secret"
                    />
                    <div className="invalid-feedback">{errors.title}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Key</label>
                    <input
                        className={classNames({
                            'form-control': true,
                            'is-invalid': errors.key,
                        })}
                        name="key"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleValidation}
                        value={values.key}
                        placeholder="The key for decrypting the secret"
                    />
                    <div className="invalid-feedback">{errors.key}</div>
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
                        placeholder="The secret you want to keep safe"
                    />
                    <div className="invalid-feedback">{errors.text}</div>
                </div>
            </form>
        </Modal>
    );
}

export default SecretAddModal;
