import React from 'react';

import { IconDots, IconStar } from '@tabler/icons-react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useSecretsContext } from '@contexts/secretsContext';

import { updateSecret } from '@services/secretsService';

import styles from './secret.module.scss';

function Secret({ _id, title, secret, decryptedSecret, isEncrypted, isFavorite }) {
    const { secrets, setSecrets } = useSecretsContext();

    async function handleFavorite() {
        const secret = secrets.find((s) => s._id === _id);
        const response = await updateSecret(_id, { ...secret, isFavorite: !secret.isFavorite });
        let isSuccessful = true;

        if (!response.isOk) {
            isSuccessful = false;
            toast.error('Something went wrong.');
        }

        if (isSuccessful) {
            setSecrets((secrets) =>
                secrets.map((s) => {
                    if (s._id === _id) {
                        return { ...s, isFavorite: !secret.isFavorite };
                    }

                    return s;
                })
            );
        }
    }

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
                <Link to={`details/${_id}`} className="ms-auto me-2 btn btn-sm text-white bg-cyan">
                    <IconDots />
                </Link>
                <div className="cursor-pointer" onClick={handleFavorite}>
                    <IconStar
                        className={classNames({
                            'icon-filled': isFavorite,
                            'text-yellow': isFavorite,
                        })}
                    />
                </div>
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
