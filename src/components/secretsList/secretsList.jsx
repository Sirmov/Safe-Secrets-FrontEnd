import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import * as secretsService from '@services/secretsService.js';

function SecretsList() {
    const [secrets, setSecrets] = useState([]);

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

    return secrets.map((secret) => (
        <div className="card mt-2" key={secret._id}>
            <div className="card-header card-header-light">
                <h3 className="card-title">{secret.title}</h3>
            </div>
            <div className="card-body">{secret.text}</div>
            <div class="card-footer">{secret.isEncrypted ? 'Secrets is encrypted.' : 'Secret is visible.'}</div>
        </div>
    ));
}

export default SecretsList;