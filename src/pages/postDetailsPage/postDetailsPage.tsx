import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';

import { PostProvider } from '@contexts/postContext';

import Footer from '@layout/footer/footer';
import NavigationHeader from '@layout/navigation/navigationHeader';
import PageBody from '@layout/pageBody/pageBody';
import PageHeader from '@layout/pageHeader/pageHeader';

import PostDeleteModal from '@components/postDetailsCard/postDeleteModal/postDeleteModal';
import PostDetailsCard from '@components/postDetailsCard/postDetailsCard';
import PostEditModal from '@components/postDetailsCard/postEditModal/postEditModal';
import RouteGuard from '@components/routeGuard/routeGuard';

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
                    <PostProvider>
                        <PostDetailsCard />
                        <Routes>
                            <Route element={<RouteGuard />}>
                                <Route path="edit" element={<PostEditModal />} />
                                <Route path="delete" element={<PostDeleteModal />} />
                            </Route>
                        </Routes>
                    </PostProvider>
                </PageBody>
            </div>

            <Footer />
        </HelmetProvider>
    );
}

export default PostDetailsPage;
