import React from 'react';

import { Link } from 'react-router-dom';

import { useSecretsContext } from '@contexts/secretsContext';

import styles from './secret.module.scss';

function Secret({ _id, title, secret, decryptedSecret, isEncrypted }) {
    const { setSecrets } = useSecretsContext();

    function handleHide() {
        setSecrets((secrets) =>
            secrets.map((s) => {
                if (s._id === _id) {
                    s.decryptedSecret = '';
                    s.isEncrypted = true;
                }

                return s;
            })
        );
    }

    return (
        <div className={`card ${styles['secret-card']}`}>
            <div className="card-header card-header-light">
                <h3 className="card-title">{title}</h3>
            </div>
            <div className="card-body">
                <div className="row flex-column align-items-center flex-md-row">
                    <div className="col">{isEncrypted ? secret : decryptedSecret}</div>
                    <div className="col-auto mt-2 mt-md-0">
                        <Link to={`update/${_id}`} className="btn btn-warning bg-yellow me-2">
                            Update
                        </Link>
                        <Link to={`delete/${_id}`} className="btn btn-danger">
                            Delete
                        </Link>
                    </div>
                </div>
            </div>
            <div className="card-footer bg-light">
                <div className="row align-items-center">
                    {isEncrypted ? (
                        <>
                            <div className="col">Secrets is encrypted.</div>
                            <div className="col-auto">
                                <Link to={`decrypt/${_id}`} className="btn btn-success">
                                    Decrypt
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="col">Secret is visible.</div>
                            <div className="col-auto">
                                <button className="btn btn-info" onClick={handleHide}>
                                    Hide
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Secret;
