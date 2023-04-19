import React from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import Footer from '@layout/footer/footer';
import NavigationHeader from '@layout/navigation/navigationHeader';
import PageBody from '@layout/pageBody/pageBody';
import PageHeader from '@layout/pageHeader/pageHeader';

import SecretDetailsCard from '@components/secretDetailsCard/secretDetailsCard';

function SecretDetailsPage() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Safe Secrets - Secret Details</title>
            </Helmet>

            <NavigationHeader />

            <div className="page-wrapper">
                <PageHeader title="Secret details" subtitle="Additional information about your secret."></PageHeader>

                <PageBody>
                    <SecretDetailsCard />
                </PageBody>
            </div>

            <Footer />
        </HelmetProvider>
    );
}

export default SecretDetailsPage;
