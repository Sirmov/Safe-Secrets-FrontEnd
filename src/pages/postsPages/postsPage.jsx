import React from 'react';

import { IconPlus } from '@tabler/icons-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { PostsProvider } from '@contexts/postsContext';

import Footer from '@layout/footer/footer';
import NavigationHeader from '@layout/navigation/navigationHeader';
import PageBody from '@layout/pageBody/pageBody';
import PageHeader from '@layout/pageHeader/pageHeader';

import ParamLink from '@components/paramLink/paramLink';
import PostsList from '@components/postsList/postsList';

function PostsPage() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Safe Secrets - Posts</title>
            </Helmet>

            <NavigationHeader />

            <div className="page-wrapper">
                <PageHeader title="Posts" subtitle="Read the latests news here.">
                    <div className="d-flex">
                        <div className="me-3 d-none d-md-block"></div>
                        <ParamLink to="add" className="btn btn-primary">
                            <IconPlus className="icon" />
                            Add post
                        </ParamLink>
                    </div>
                </PageHeader>

                <PageBody>
                    <PostsProvider>
                        <PostsList />
                    </PostsProvider>
                </PageBody>
            </div>

            <Footer />
        </HelmetProvider>
    );
}

export default PostsPage;
