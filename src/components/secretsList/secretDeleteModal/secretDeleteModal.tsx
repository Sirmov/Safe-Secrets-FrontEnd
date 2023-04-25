import { useEffect, useState } from 'react';

import { IconAlertTriangle, IconTrash } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useSecretsContext } from '@contexts/secretsContext';

import { Secret } from '@models/secret/secret';

import { deleteSecret, getSecret } from '@services/secretsService';

import Modal from '@components/modal/modal';

function SecretDeleteModal() {
    const { secretId } = useParams();
    const [secret, setSecret] = useState<Nullable<Secret>>(null);
    const { setSecrets } = useSecretsContext();

    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getSecret(secretId || '')
            .then((res) => {
                if (!res.isOk) {
                    toast.error('Something went wrong.');
                } else {
                    const secret = res.data as Secret;
                    setSecret(secret);
                }
            })
            .catch((error) => {
                toast.error('Something went wrong.');
                console.error(error);
            });
    }, [secretId]);

    async function handleDelete() {
        const response = await deleteSecret(secret?._id || '');
        let isSuccessful = true;

        if (!response.isOk) {
            isSuccessful = false;
            toast.error('Something went wrong.');
        }

        if (isSuccessful) {
            setSecrets?.((secrets) => (secrets ? secrets.filter((s) => s._id !== secretId) : secrets));
            setIsVisible(false);
            navigate('/secrets');
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
                        Delete secret
                    </button>
                </div>
            }>
            <IconAlertTriangle className="icon mb-2 text-danger icon-lg" />

            <h3>Are you sure?</h3>
            <div className="text-muted">
                {secret?.title === undefined ? (
                    <div className="text-left">
                        <div className="placeholder col-10"></div>
                        <div className="placeholder col-11"></div>
                    </div>
                ) : (
                    <p>
                        Do you really want to remove <b>{secret.title}</b> secret? What you are going to make cannot be
                        undone.
                    </p>
                )}
            </div>
        </Modal>
    );
}

export default SecretDeleteModal;
