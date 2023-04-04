import React, { useEffect, useState } from 'react';

import { IconEdit } from '@tabler/icons-react';
import classNames from 'classnames';
import CryptoJS from 'crypto-js';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useSecretsContext } from '@contexts/secretsContext';

import { getSecret, updateSecret } from '@services/secretsService';

import Modal from '@components/modal/modal';

import useForm from '@hooks/useForm';
import useValidation from '@hooks/useValidation';

import { secretUpdateValidator } from '@validators/secret/secretUpdateValidator';

function SecretUpdateModal() {
    const initialValues = { title: '', key: '', secret: '' };

    const { secretId } = useParams();
    const [secret, setSecret] = useState(null);
    const { setSecrets } = useSecretsContext();

    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();

    const { values, setValues, handleChange, handleSubmit } = useForm(initialValues, handleUpdate);
    const { errors, areValid, handleValidation } = useValidation(initialValues, secretUpdateValidator);

    useEffect(() => {
        getSecret(secretId)
            .then((res) => {
                if (!res.isOk) {
                    toast.error('Something went wrong.');
                } else {
                    setSecret(res.data);
                    initialValues.title = res.data.title;
                    setValues(initialValues);
                }
            })
            .catch((error) => {
                toast.error('Something went wrong.');
                console.error(error);
            });
    }, [secretId]);

    async function handleUpdate(_event, data) {
        if (!areValid(data)) {
            return;
        }

        let payload = { ...secret, title: data.title };

        if (data.secret.length > 0) {
            payload = { ...secret, title: data.title, secret: CryptoJS.AES.encrypt(data.secret, data.key).toString() };
        }

        const response = await updateSecret(secretId, payload);
        let isSuccessful = true;

        if (!response.isOk) {
            isSuccessful = false;
            toast.error('Something went wrong.');
        }

        if (isSuccessful) {
            setSecrets((secrets) =>
                secrets.map((s) => {
                    if (s._id === secretId) {
                        return { ...response.data, isEncrypted: true };
                    }

                    return s;
                })
            );
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
            header={<h5 className="modal-title">Update secret</h5>}
            footer={
                <>
                    <button className="btn link-secondary" onClick={closeModal} data-bs-dismiss="modal">
                        Cancel
                    </button>
                    <button type="submit" onClick={handleSubmit} className="btn btn-warning bg-yellow ms-auto">
                        <IconEdit className="icon" />
                        Update secret
                    </button>
                </>
            }>
            <form className="text-start">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    {secret === null ? (
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
                            placeholder="The name to identify your secret"
                        />
                    )}

                    <div className="invalid-feedback">{errors.title}</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Text</label>
                    <textarea
                        className={classNames({
                            'form-control': true,
                            'is-invalid': errors.secret,
                        })}
                        name="secret"
                        onChange={handleChange}
                        onBlur={handleValidation}
                        value={values.secret}
                        rows={3}
                        placeholder="Keep me empty to only update the title"
                    />
                    <div className="invalid-feedback">{errors.secret}</div>
                </div>
                {values.secret !== '' ? (
                    <div>
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
                ) : null}
            </form>
        </Modal>
    );
}

export default SecretUpdateModal;
