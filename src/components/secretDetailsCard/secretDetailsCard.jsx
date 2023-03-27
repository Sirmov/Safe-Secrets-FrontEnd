import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthContext } from '@contexts/authContext';

import { getSecret } from '@services/secretsService';

import { formatDate } from '@utils/_';

import SecretDetailsCardSkeleton from './secretDetailsCardSkeleton/secretDetailsCardSkeleton';

function SecretDetailsCard() {
    const { secretId } = useParams();
    const [secret, setSecret] = useState(null);
    const { auth } = useAuthContext();

    useEffect(() => {
        getSecret(secretId)
            .then((res) => {
                setSecret({ ...res.data, isEncrypted: true });
            })
            .catch((error) => {
                toast.error('Something went wrong.');
                console.error(error);
            });
    }, [secretId]);

    return (
        <>
            {secret === null ? (
                <SecretDetailsCardSkeleton />
            ) : (
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">{secret.title}</h3>
                    </div>
                    <div className="card-body p-4">
                        <form>
                            <div className="d-flex gap-3 flex-column flex-md-row">
                                <div className="w-100 w-50-md">
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input className="form-control" disabled type="text" value={secret.title} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Text</label>
                                        <textarea className="form-control" rows={3} disabled value={secret.secret} />
                                    </div>
                                    <div>
                                        <label className="form-label">Favorite</label>
                                        <input
                                            className="form-control"
                                            disabled
                                            type="text"
                                            value={
                                                secret.isFavorite
                                                    ? 'The secret is marked as favorite'
                                                    : 'The secret has not been marked as favorite'
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="w-100 w-50-md">
                                    <div className="mb-3">
                                        <label className="form-label">Created on</label>
                                        <input
                                            className="form-control"
                                            disabled
                                            type="text"
                                            value={formatDate(secret._createdOn)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Updated on</label>
                                        <input
                                            className="form-control"
                                            disabled
                                            type="text"
                                            value={
                                                secret._updatedOn
                                                    ? formatDate(secret._updatedOn)
                                                    : 'The secret has not been updated'
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="form-label">Author email</label>
                                        <input className="form-control" disabled type="text" value={auth.email} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default SecretDetailsCard;
