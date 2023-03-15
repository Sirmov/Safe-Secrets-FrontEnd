import React from 'react';

import { IconPlus, IconSearch } from '@tabler/icons-react';

import Footer from '@components/footer/footer';
import NavigationHeader from '@components/navigation/navigationHeader';
import PageBody from '@components/pageBody/pageBody';
import PageHeader from '@components/pageHeader/pageHeader';
import SecretsList from '@components/secretsList/secretsList';

function SecretsPage() {
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
                    <SecretsList />
                </PageBody>
            </div>

            <Footer />
        </>
    );
}

export default SecretsPage;
