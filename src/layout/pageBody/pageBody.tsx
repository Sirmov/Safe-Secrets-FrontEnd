import { ReactNode } from 'react';

function PageBody({ children }: { children: ReactNode }) {
    return (
        <div className="page-body">
            <div className="container-xl">{children}</div>
        </div>
    );
}

export default PageBody;
