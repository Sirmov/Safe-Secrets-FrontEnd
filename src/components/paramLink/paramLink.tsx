import React, { ReactNode } from 'react';

import { Link, useLocation } from 'react-router-dom';

function ParamLink({ children, to, ...props }: { children: ReactNode; to: string }) {
    const { search } = useLocation();

    return (
        <Link to={to + search} {...props}>
            {children}
        </Link>
    );
}

export default ParamLink;
