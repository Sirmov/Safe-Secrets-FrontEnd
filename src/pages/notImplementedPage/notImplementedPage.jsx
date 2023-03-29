import React from 'react';

import { IconArrowLeft } from '@tabler/icons-react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';

import notImplemented from '@assets/images/not-implemented.svg';

function NotImplementedPage() {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }

    return (
        <>
            <Helmet>
                <title>Safe Secrets - Not Implemented</title>
            </Helmet>

            <div className="page page-center vh-100">
                <div className="container-tight py-4">
                    <div className="empty">
                        <div className="empty-img">
                            <img src={notImplemented} height={128} alt="" />
                        </div>
                        <p className="empty-title">Not implemented</p>
                        <p className="empty-subtitle text-muted">
                            Sorry for the inconvenience but we’re are working hard on implementing this feature.
                        </p>
                        <div className="empty-action">
                            <Link onClick={goBack} className="btn btn-primary">
                                <IconArrowLeft className="icon" />
                                Take me home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotImplementedPage;
