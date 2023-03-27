import React from 'react';

import Footer from '@layout/footer/footer';
import NavigationHeader from '@layout/navigation/navigationHeader';
import PageBody from '@layout/pageBody/pageBody';
import PageHeader from '@layout/pageHeader/pageHeader';

import SecretDetailsCard from '@components/secretDetailsCard/secretDetailsCard';

function SecretDetailsPage() {
    return (
        <>
            <NavigationHeader />

            <div className="page-wrapper">
                <PageHeader title="Secret details" subtitle="Additional information about your secret"></PageHeader>

                <PageBody>
                    <SecretDetailsCard />
                </PageBody>
            </div>

            <Footer />
        </>
    );
}

export default SecretDetailsPage;
