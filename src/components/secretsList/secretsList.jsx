import React, { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthContext } from '@contexts/authContext';
import { useSecretsContext } from '@contexts/secretsContext';

import { getUserSecrets } from '@services/secretsService';

import Secret from '@components/secret/secret';
import SecretSkeleton from '@components/secret/secretSkeleton/secretSkeleton';

import { stringToBoolean } from '@utils/_';

function SecretsList() {
    const [searchParams] = useSearchParams();
    const { secrets, setSecrets } = useSecretsContext();
    const { auth } = useAuthContext();

    useEffect(() => {
        getUserSecrets(auth._id, searchParams.get('search'), stringToBoolean(searchParams.get('favorites')))
            .then((res) => {
                if (!res.isOk) {
                    toast.error('Something went wrong.');
                } else {
                    const secrets = Object.values(res.data);
                    secrets.forEach((s) => (s.isEncrypted = true));
                    setSecrets(secrets);
                }
            })
            .catch((error) => {
                toast.error('Something went wrong.');
                console.error(error);
            });
    }, [auth, searchParams]);

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
