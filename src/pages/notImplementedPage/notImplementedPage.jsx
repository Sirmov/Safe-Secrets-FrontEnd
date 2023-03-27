import React from 'react';

import { IconArrowLeft } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';

function NotImplementedPage() {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }

    return (
        <div className="page page-center vh-100">
            <div className="container-tight py-4">
                <div className="empty">
                    <div className="empty-img">
                        <img src="../../assets/images/not-implemented.svg" height={128} alt="" />
                    </div>
                    <p className="empty-title">Not implemented</p>
                    <p className="empty-subtitle text-muted">
                        Sorry for the inconvenience but we’re are working hard on implementing this feature.
                    </p>
                    <div className="empty-action">
                        <Link onClick={goBack} className="btn btn-primary">
                            <IconArrowLeft className="icon" color="currentColor" stroke={2} size={24} />
                            Take me home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotImplementedPage;
