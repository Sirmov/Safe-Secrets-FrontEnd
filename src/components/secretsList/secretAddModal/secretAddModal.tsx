import { FormEvent, useState } from 'react';

import { IconPlus } from '@tabler/icons-react';
import classNames from 'classnames';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useSecretsContext } from '@contexts/secretsContext';

import { CreateSecret } from '@models/secret/createSecret';
import { Secret } from '@models/secret/secret';

import { createSecret } from '@services/secretsService';

import Modal from '@components/modal/modal';

import useForm from '@hooks/useForm';
import useValidation from '@hooks/useValidation';

import { secretValidator } from '@validators/secret/secretValidator';

function SecretAddModal() {
    const initialValues: CreateSecret = { title: '', key: '', secret: '' };

    const [isVisible, setIsVisible] = useState(true);
    const { setSecrets } = useSecretsContext();
    const navigate = useNavigate();

    const { values, setValues, handleChange, handleSubmit } = useForm(initialValues, handleCreate);
    const { errors, areValid, handleValidation } = useValidation(initialValues, secretValidator);

    async function handleCreate(_event: FormEvent<HTMLFormElement>, data: CreateSecret) {
        if (!areValid(data)) {
            return;
        }

        const secret = {
            title: data.title,
            secret: CryptoJS.AES.encrypt(data.secret, data.key).toString(),
            isFavorite: false,
        };

        const response = await createSecret(secret);
        let isSuccessful = true;

        if (!response.isOk) {
            isSuccessful = false;
            toast.error('Something went wrong.');
        }

        if (isSuccessful) {
            const createdSecret = response.data as Secret;
            setSecrets?.((secrets) =>
                secrets ? [...secrets, { ...createdSecret, isEncrypted: true, decryptedSecret: '' }] : secrets
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
            header={<h5 className="modal-title">New secret</h5>}
            footer={
                <>
                    <button className="btn link-secondary" onClick={closeModal} data-bs-dismiss="modal">
                        Cancel
                    </button>
                    <button form="add-secret-form" type="submit" className="btn btn-primary ms-auto">
                        <IconPlus className="icon" />
                        Create new secret
                    </button>
                </>
            }>
            <form id="add-secret-form" onSubmit={handleSubmit} className="text-start">
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
                            'is-invalid': errors.secret,
                        })}
                        name="secret"
                        onChange={handleChange}
                        onBlur={handleValidation}
                        value={values.secret}
                        rows={3}
                        placeholder="The secret you want to keep safe"
                    />
                    <div className="invalid-feedback">{errors.secret}</div>
                </div>
            </form>
        </Modal>
    );
}

export default SecretAddModal;
