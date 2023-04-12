import React, { ReactNode } from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthContext } from '@contexts/authContext';

import { isAuthenticated } from '@utils/_';

function RouteGuard({ children }: { children: ReactNode }) {
    const { auth } = useAuthContext();

    if (!isAuthenticated(auth)) {
        toast.warning('Unauthorized. You have to be logged in.');
        return <Navigate to="/login" />;
    }

    return children ? children : <Outlet />;
}

export default RouteGuard;
