import React from 'react';

import { IconArrowLeft, IconHome } from '@tabler/icons-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

function NotImplementedPage() {
    const navigate = useNavigate();

    return (
        <HelmetProvider>
            <Helmet>
                <title>Safe Secrets - Not Implemented</title>
            </Helmet>

            <div className="page page-center vh-100">
                <div className="container-tight py-4">
                    <div className="empty">
                        <div className="empty-img">
                            <img src="/images/not-implemented.svg" height={128} alt="" />
                        </div>
                        <p className="empty-title">Not implemented</p>
                        <p className="empty-subtitle text-muted">
                            Sorry for the inconvenience but we’re are working hard on implementing this feature.
                        </p>
                        <div className="empty-action">
                            <button onClick={() => navigate(-1)} className="btn btn-primary me-2">
                                <IconArrowLeft className="icon" />
                                Back
                            </button>
                            <button onClick={() => navigate('/')} className="btn btn-info">
                                <IconHome className="icon" />
                                Take me home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
}

export default NotImplementedPage;
