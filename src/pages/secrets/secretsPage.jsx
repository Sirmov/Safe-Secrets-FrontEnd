import React from 'react';

import { IconPlus, IconSearch } from '@tabler/icons-react';
import NavigationHeader from '../../components/navigation/navigationHeader';
import PageHeader from '../../components/pageHeader/pageHeader';
import PageBody from '../../components/pageBody/pageBody';
import Footer from '../../components/footer/footer';

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

                <PageBody></PageBody>
            </div>

            <Footer />
        </>
    );
}

export default SecretsPage;
