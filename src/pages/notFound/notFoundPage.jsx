import React from 'react';

import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }

    return (
        <div className="page page-center">
            <div className="container-tight py-4">
                <div className="empty">
                    <div className="empty-header">404</div>
                    <p className="empty-title">Oops… You just found an error page</p>
                    <p className="empty-subtitle text-muted">
                        We are sorry but the page you are looking for was not found
                    </p>
                    <div className="empty-action">
                        <button onClick={goBack} className="btn btn-primary">
                            <IconArrowLeft className="icon" color="currentColor" stroke={2} size={24} />
                            Take me home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;
