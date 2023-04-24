import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthContext } from '@contexts/authContext';

import { Secret } from '@models/secret/secret';
import { SecretViewModel } from '@models/secret/secretViewModel';

import { getSecret } from '@services/secretsService';

import { formatDateLong } from '@utils/_';

import SecretDetailsCardSkeleton from './secretDetailsCardSkeleton/secretDetailsCardSkeleton';

function SecretDetailsCard() {
    const { secretId } = useParams();
    const [secret, setSecret] = useState<Nullable<SecretViewModel>>(null);
    const { auth } = useAuthContext();

    useEffect(() => {
        getSecret(secretId || '')
            .then((res) => {
                if (!res.isOk) {
                    toast.error('Something went wrong.');
                } else {
                    const secret = res.data as Secret;
                    setSecret({ ...secret, isEncrypted: true, decryptedSecret: '' });
                }
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
                                        <label htmlFor="secret-title" className="form-label">
                                            Title
                                        </label>
                                        <input
                                            id="secret-title"
                                            className="form-control"
                                            disabled
                                            type="text"
                                            value={secret.title}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="secret-secret" className="form-label">
                                            Text
                                        </label>
                                        <textarea
                                            id="secret-secret"
                                            className="form-control"
                                            rows={3}
                                            disabled
                                            value={secret.secret}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="secret-is-favorite" className="form-label">
                                            Favorite
                                        </label>
                                        <input
                                            id="secret-is-favorite"
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
                                        <label htmlFor="secret-created-on" className="form-label">
                                            Created on
                                        </label>
                                        <input
                                            id="secret-created-on"
                                            className="form-control"
                                            disabled
                                            type="text"
                                            value={formatDateLong(secret._createdOn)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="secret-updated-on" className="form-label">
                                            Updated on
                                        </label>
                                        <input
                                            id="secret-updated-on"
                                            className="form-control"
                                            disabled
                                            type="text"
                                            value={
                                                secret._updatedOn
                                                    ? formatDateLong(secret._updatedOn)
                                                    : 'The secret has not been updated'
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="secret-author-email" className="form-label">
                                            Author email
                                        </label>
                                        <input
                                            id="secret-author-email"
                                            className="form-control"
                                            disabled
                                            type="text"
                                            value={auth?.email}
                                        />
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
