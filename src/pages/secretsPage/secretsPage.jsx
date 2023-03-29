import React, { useRef } from 'react';

import { IconPlus, IconSearch } from '@tabler/icons-react';
import { Route, Routes, useSearchParams } from 'react-router-dom';

import { SecretsProvider } from '@contexts/secretsContext';

import Footer from '@layout/footer/footer';
import NavigationHeader from '@layout/navigation/navigationHeader';
import PageBody from '@layout/pageBody/pageBody';
import PageHeader from '@layout/pageHeader/pageHeader';

import ParamLink from '@components/paramLink/paramLink';
import SecretAddModal from '@components/secretsList/secretAddModal/secretAddModal';
import SecretDecryptModal from '@components/secretsList/secretDecryptModal/secretDecryptModal';
import SecretDeleteModal from '@components/secretsList/secretDeleteModal/secretDeleteModal';
import SecretUpdateModal from '@components/secretsList/secretUpdateModal/secretUpdateModal';
import SecretsList from '@components/secretsList/secretsList';

import { debounce } from '@utils/_';

function SecretsPage() {
    const inputRef = useRef({ current: { value: '' } });
    const [, setSearchParams] = useSearchParams();

    function handleSearch() {
        setSearchParams((params) => {
            const searchParams = new URLSearchParams(params);
            const searchQuery = inputRef.current.value;

            if (searchQuery === '') {
                searchParams.delete('search');
            } else {
                searchParams.set('search', searchQuery);
            }

            return searchParams;
        });
    }

    return (
        <>
            <NavigationHeader />

            <div className="page-wrapper">
                <PageHeader title="Your secrets" subtitle="Manage your information comfortably.">
                    <div className="d-flex">
                        <div className="me-3 d-none d-md-block">
                            <div className="input-icon">
                                <input
                                    type="text"
                                    ref={inputRef}
                                    onChange={debounce(handleSearch)}
                                    className="form-control"
                                    placeholder="Search…"
                                />
                                <span className="input-icon-addon">
                                    <IconSearch className="icon" />
                                </span>
                            </div>
                        </div>
                        <ParamLink to="add" className="btn btn-primary">
                            <IconPlus className="icon" />
                            Add secret
                        </ParamLink>
                    </div>
                </PageHeader>

                <PageBody>
                    <SecretsProvider>
                        <SecretsList />
                        <Routes>
                            <Route path="add" element={<SecretAddModal />} />
                            <Route path="delete/:secretId" element={<SecretDeleteModal />} />
                            <Route path="update/:secretId" element={<SecretUpdateModal />} />
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
