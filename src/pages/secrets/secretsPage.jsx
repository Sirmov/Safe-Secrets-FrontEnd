import React, { useState } from 'react';

import { IconPlus, IconSearch } from '@tabler/icons-react';
import { Link, Route, Routes } from 'react-router-dom';

import SecretsContext from '@contexts/secretsContext';

import Footer from '@components/footer/footer';
import NavigationHeader from '@components/navigation/navigationHeader';
import PageBody from '@components/pageBody/pageBody';
import PageHeader from '@components/pageHeader/pageHeader';
import SecretDeleteModal from '@components/secretDeleteModal/secretDeleteModal';
import SecretsList from '@components/secretsList/secretsList';

function SecretsPage() {
    const [secrets, setSecrets] = useState(null);

    return (
        <>
            <NavigationHeader />

            <div className="page-wrapper">
                <PageHeader
                    title="Your secrets"
                    subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, ullam?">
                    <div className="d-flex">
                        <div className="me-3 d-none d-md-block">
                            <div className="input-icon">
                                <input type="text" className="form-control" placeholder="Search…" />
                                <span className="input-icon-addon">
                                    <IconSearch className="icon" color="currentColor" stroke={2} size={24} />
                                </span>
                            </div>
                        </div>
                        <a href="#" className="btn btn-primary">
                            <IconPlus className="icon" color="currentColor" stroke={2} size={24} />
                            Add secret
                        </a>
                    </div>
                </PageHeader>

                <PageBody>
                    <SecretsContext.Provider value={{ secrets, setSecrets }}>
                        <SecretsList />
                        <Routes>
                            <Route path="/delete/:secretId" element={<SecretDeleteModal />} />
                        </Routes>
                    </SecretsContext.Provider>
                </PageBody>
            </div>

            <Footer />
        </>
    );
}

export default SecretsPage;
