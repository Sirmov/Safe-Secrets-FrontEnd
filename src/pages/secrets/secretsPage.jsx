import React from 'react';

import { IconPlus, IconSearch } from '@tabler/icons-react';
import { Link, Route, Routes } from 'react-router-dom';

import { SecretsProvider } from '@contexts/secretsContext';

import Footer from '@layout/footer/footer';
import NavigationHeader from '@layout/navigation/navigationHeader';
import PageBody from '@layout/pageBody/pageBody';
import PageHeader from '@layout/pageHeader/pageHeader';

import SecretAddModal from '@components/secretsList/secretAddModal/secretAddModal';
import SecretDecryptModal from '@components/secretsList/secretDecryptModal/secretDecryptModal';
import SecretDeleteModal from '@components/secretsList/secretDeleteModal/secretDeleteModal';
import SecretsList from '@components/secretsList/secretsList';

function SecretsPage() {
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
                    <SecretsProvider>
                        <SecretsList />
                        <Routes>
                            <Route path="delete/:secretId" element={<SecretDeleteModal />} />
                            <Route path="add" element={<SecretAddModal />} />
                            <Route path="decrypt/:secretId" element={<SecretDecryptModal />} />
                        </Routes>
                    </SecretsProvider>
                </PageBody>
            </div>

            <Footer />
        </>
    );
}

export default SecretsPage;
