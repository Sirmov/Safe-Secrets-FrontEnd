import { ReactNode } from 'react';

function PageHeader({ title, subtitle, children }: { title: string; subtitle: string; children?: ReactNode }) {
    return (
        <div className="page-header mt-2">
            <div className="container-xl">
                <div className="row align-items-center">
                    <div className="col">
                        <h2 className="page-title">{title}</h2>
                        <div className="mt-1">{subtitle}</div>
                    </div>
                    <div className="col-auto ms-auto d-print-none">{children}</div>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default PageHeader;
