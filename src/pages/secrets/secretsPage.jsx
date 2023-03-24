import React, { useState } from 'react';

import { IconPlus, IconSearch } from '@tabler/icons-react';
import { Link, Route, Routes } from 'react-router-dom';

import SecretsContext from '@contexts/secretsContext';

import Footer from '@layout/footer/footer';
import NavigationHeader from '@layout/navigation/navigationHeader';
import PageBody from '@layout/pageBody/pageBody';
import PageHeader from '@layout/pageHeader/pageHeader';

import SecretAddModal from '@components/secretsList/secretAddModal/secretAddModal';
import SecretDeleteModal from '@components/secretsList/secretDeleteModal/secretDeleteModal';
import SecretsList from '@components/secretsList/secretsList';

function SecretsPage() {
    const [secrets, setSecrets] = useState(null);

    return (
        <>
            <NavigationHeader />

            <div className="page-wrapper">
                <PageHeader title="Your secrets" subtitle="Manage your information comfortably.">
                    <div className="d-flex">
                        <div className="me-3 d-none d-md-block">
                            <div className="input-icon">
                                <input type="text" className="form-control" placeholder="Search…" />
                                <span className="input-icon-addon">
                                    <IconSearch className="icon" color="currentColor" stroke={2} size={24} />
                                </span>
                            </div>
                        </div>
                        <Link to="add" className="btn btn-primary">
                            <IconPlus className="icon" color="currentColor" stroke={2} size={24} />
                            Add secret
                        </Link>
                    </div>
                </PageHeader>

                <PageBody>
                    <SecretsContext.Provider value={{ secrets, setSecrets }}>
                        <SecretsList />
                        <Routes>
                            <Route path="delete/:secretId" element={<SecretDeleteModal />} />
                            <Route path="add" element={<SecretAddModal />} />
                        </Routes>
                    </SecretsContext.Provider>
                </PageBody>
            </div>

            <Footer />
        </>
    );
}

export default SecretsPage;
