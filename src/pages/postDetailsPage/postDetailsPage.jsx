import React from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import Footer from '@layout/footer/footer';
import NavigationHeader from '@layout/navigation/navigationHeader';
import PageBody from '@layout/pageBody/pageBody';
import PageHeader from '@layout/pageHeader/pageHeader';

import PostDetailsCard from '@components/postDetailsCard/postDetailsCard';

function PostDetailsPage() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Safe Secrets - Post Details</title>
            </Helmet>

            <NavigationHeader />

            <div className="page-wrapper">
                <PageHeader title="Post details" subtitle="Get informed about what you want."></PageHeader>

                <PageBody>
                    <PostDetailsCard />
                </PageBody>
            </div>

            <Footer />
        </HelmetProvider>
    );
}

export default PostDetailsPage;
