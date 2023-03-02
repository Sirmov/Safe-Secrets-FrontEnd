import React from 'react';
import { IconArrowLeft } from '@tabler/icons-react';

function NotFoundPage() {
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
                        <a href="./." className="btn btn-primary">
                            <IconArrowLeft className="icon" color="currentColor" stroke={2} size={24} />
                            Take me home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;
