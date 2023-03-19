import React, { useContext, useEffect } from 'react';

import classNames from 'classnames';
import { toast } from 'react-toastify';

import SecretsContext from '@contexts/secretsContext';

import * as secretsService from '@services/secretsService.js';

function SecretsList() {
    const { secrets, setSecrets } = useContext(SecretsContext);

    useEffect(() => {
        secretsService
            .getAllSecrets()
            .then((res) => {
                const secrets = Object.values(res.data);
                secrets.forEach((s) => (s.isEncrypted = true));
                setSecrets(secrets);
            })
            .catch((error) => {
                toast.error('Something went wrong.');
                console.log(error);
            });
    }, []);

    return (
        <>
            {secrets === null ? (
                <>
                    <SecretSkeleton />
                    <SecretSkeleton />
                    <SecretSkeleton />
                </>
            ) : secrets.length < 1 ? (
                <p className="display-6 text-center">No secrets yet 😔.</p>
            ) : (
                secrets.map((secret, index) => (
                    <div
                        className={classNames({
                            card: true,
                            'mt-3': index > 0,
                        })}
                        key={secret._id}>
                        <div className="card-header card-header-light">
                            <h3 className="card-title">{secret.title}</h3>
                        </div>
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col">{secret.text}</div>
                                <div className="col-auto">
                                    <button className="btn btn-warning me-2">Update</button>
                                    <button className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row align-items-center">
                                {secret.isEncrypted ? (
                                    <>
                                        <div className="col">Secrets is encrypted.</div>
                                        <div className="col-auto">
                                            <button className="btn btn-success">Decrypt</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="col">Secret is visible.</div>
                                        <div className="col-auto">
                                            <button className="btn btn-info">Hide</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </>
    );
}

export default SecretsList;

function SecretSkeleton() {
    return (
        <div className="card mt-3">
            <div className="card-header card-header-light">
                <div className="placeholder col-3"></div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="placeholder col"></div>
                    <div className="col-auto">
                        <button className="btn btn-warning me-2">Update</button>
                        <button className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="row align-items-center justify-content-between">
                    <div className="placeholder placeholder-xs col-6"></div>
                    <div className="col-auto">
                        <button className="btn btn-success">Decrypt</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
