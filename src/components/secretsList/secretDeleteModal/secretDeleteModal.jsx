import React, { useContext, useEffect, useState } from 'react';

import { IconAlertTriangle } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';

import SecretsContext from '@contexts/secretsContext';

import { getSecret } from '@services/secretsService';

import Modal from '@components/modal/modal';

function SecretDeleteModal() {
    const { secretId } = useParams();
    const [secret, setSecret] = useState(null);
    const [isVisible, setIsVisible] = useState(true);
    const { setSecrets } = useContext(SecretsContext);
    const navigate = useNavigate();

    useEffect(() => {
        getSecret(secretId)
            .then((res) => {
                setSecret(res.data);
            })
            .catch((error) => {
                toast.error('Something went wrong.');
                console.log(error);
            });
    }, [secretId]);

    function handleDelete() {
        setSecrets((secrets) => secrets.filter((s) => s._id !== secretId));
        setIsVisible(false);
        navigate('/secrets');
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
                        Delete secret
                    </button>
                </div>
            }>
            <IconAlertTriangle className="icon mb-2 text-danger icon-lg" color="currentColor" size={24} stroke={2} />

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