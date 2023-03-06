import { IconPlus } from '@tabler/icons-react';
import React from 'react';
import Footer from '../../components/footer/footer';
import NavigationHeader from '../../components/navigation/navigationHeader';

function HomePage() {
    return (
        <>
            <NavigationHeader />
            <div className="page-wrapper">
                {/* Page header */}
                <div className="page-header">
                    <div className="container-xl">
                        <div className="row align-items-center">
                            <div className="col">
                                <h2 className="page-title">Gallery</h2>
                                <div className="text-muted mt-1">1-12 of 241 photos</div>
                            </div>
                            <div className="col-auto ms-auto d-print-none">
                                <div className="d-flex">
                                    <div className="me-3 d-none d-md-block">
                                        <div className="input-icon">
                                            <input type="text" className="form-control" placeholder="Search…" />
                                            <span className="input-icon-addon">
                                                <IconPlus className="icon" color="currentColor" stroke={2} size={24} />
                                            </span>
                                        </div>
                                    </div>
                                    <a href="#" className="btn btn-primary">
                                        <IconPlus className="icon" color="currentColor" stroke={2} size={24} />
                                        Add photo
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Page body */}
                <div className="page-body">
                    <div className="container-xl">{/* Content here */}</div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default HomePage;
