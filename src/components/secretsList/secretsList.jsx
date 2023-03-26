import React, { useContext, useEffect } from 'react';

import { toast } from 'react-toastify';

import { useAuthContext } from '@contexts/authContext';
import SecretsContext from '@contexts/secretsContext';

import * as secretsService from '@services/secretsService';

import Secret from '@components/secret/secret';
import SecretSkeleton from '@components/secret/secretSkeleton/secretSkeleton';

function SecretsList() {
    const { secrets, setSecrets } = useContext(SecretsContext);
    const { auth } = useAuthContext();

    useEffect(() => {
        secretsService
            .getUserSecrets(auth._id)
            .then((res) => {
                const secrets = Object.values(res.data);
                secrets.forEach((s) => (s.isEncrypted = true));
                setSecrets(secrets);
            })
            .catch(() => {
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
