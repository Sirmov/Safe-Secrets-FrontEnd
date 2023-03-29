import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '@contexts/authContext';

import { isAuthenticated } from '@utils/_';

function RouteGuard({ children }) {
    const { auth } = useAuthContext();

    if (!isAuthenticated(auth)) {
        return <Navigate to="/login" />;
    }

    return children ? children : <Outlet />;
}

export default RouteGuard;
