import React from 'react';

import { IconPlus } from '@tabler/icons-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';

import { useAuthContext } from '@contexts/authContext';
import { PostsProvider } from '@contexts/postsContext';

import Footer from '@layout/footer/footer';
import NavigationHeader from '@layout/navigation/navigationHeader';
import PageBody from '@layout/pageBody/pageBody';
import PageHeader from '@layout/pageHeader/pageHeader';

import ParamLink from '@components/paramLink/paramLink';
import PostAddModal from '@components/postsList/postAddModal/postAddModal';
import PostsList from '@components/postsList/postsList';
import RouteGuard from '@components/routeGuard/routeGuard';

import { isAuthenticated } from '@utils/_';

function PostsPage() {
    const { auth } = useAuthContext();

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
                        {isAuthenticated(auth) ? (
                            <ParamLink to="add" className="btn btn-primary">
                                <IconPlus className="icon" />
                                Add post
                            </ParamLink>
                        ) : null}
                    </div>
                </PageHeader>

                <PageBody>
                    <PostsProvider>
                        <PostsList />
                        <Routes>
                            <Route element={<RouteGuard />}>
                                <Route path="add" element={<PostAddModal />} />
                            </Route>
                        </Routes>
                    </PostsProvider>
                </PageBody>
            </div>

            <Footer />
        </HelmetProvider>
    );
}

export default PostsPage;
