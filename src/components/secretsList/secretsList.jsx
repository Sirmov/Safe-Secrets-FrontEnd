import React, { useContext, useEffect } from 'react';

import { toast } from 'react-toastify';

import AuthContext from '@contexts/authContext.js';
import SecretsContext from '@contexts/secretsContext';

import * as secretsService from '@services/secretsService.js';

import Secret from './secret/secret';
import SecretSkeleton from './secretSkeleton/secretSkeleton';

function SecretsList() {
    const { secrets, setSecrets } = useContext(SecretsContext);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        secretsService
            .getUserSecrets(auth._id)
            .then((res) => {
                const secrets = Object.values(res.data);
                secrets.forEach((s) => (s.isEncrypted = true));
                setSecrets(secrets);
            })
            .catch((error) => {
                toast.error('Something went wrong.');
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
                secrets.map((secret) => <Secret key={secret._id} {...secret} />)
            )}
        </>
    );
}

export default SecretsList;
