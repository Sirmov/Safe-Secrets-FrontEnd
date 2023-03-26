import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import CryptoJS from 'crypto-js';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useSecretsContext } from '@contexts/secretsContext';

import Modal from '@components/modal/modal';

import useForm from '@hooks/useForm';
import useValidation from '@hooks/useValidation';

import { secretDecryptValidator } from '@validators/secret/secretDecryptValidator';

function SecretDecryptModal() {
    const initialValues = { key: '' };

    const { secretId } = useParams();
    const { secrets, setSecrets } = useSecretsContext();
    const [secret, setSecret] = useState(() => secrets.find((s) => s._id === secretId) ?? {});

    useEffect(() => {
        const secret = secrets.find((s) => s._id === secretId) ?? {};

        setSecret(secret);
    }, [secretId]);

    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();

    const { values, setValues, handleChange, handleSubmit } = useForm(initialValues, handleDecrypt);
    const { errors, areValid, handleValidation } = useValidation(initialValues, secretDecryptValidator);

    function handleDecrypt(_event, data) {
        if (!areValid(data)) {
            return;
        }

        const decryptedSecret = CryptoJS.AES.decrypt(secret.text, data.key).toString(CryptoJS.enc.Utf8);
        const isSuccessful = decryptedSecret !== '';

        if (isSuccessful) {
            setSecrets((secrets) =>
                secrets.map((s) => {
                    if (s._id === secretId) {
                        s.decryptedText = decryptedSecret;
                        s.isEncrypted = false;
                    }

                    return s;
                })
            );
            closeModal();
        } else {
            toast.warning('Wrong key provided.');
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
            size="md"
            header={<h5 className="modal-title">Decrypt secret</h5>}
            footer={
                <>
                    <button className="btn link-secondary" onClick={closeModal} data-bs-dismiss="modal">
                        Cancel
                    </button>
                    <button type="submit" onClick={handleSubmit} className="btn btn-success ms-auto">
                        Reveal the secret
                    </button>
                </>
            }>
            <h3 className="fw-normal pb-3">
                By providing a valid key you will expose <b>{secret.title}</b> secret
            </h3>
            <form className="text-start">
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
                        placeholder="The key used when creating"
                    />
                    <div className="invalid-feedback">{errors.key}</div>
                </div>
            </form>
        </Modal>
    );
}

export default SecretDecryptModal;
