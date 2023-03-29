import React from 'react';

import { IconFlask2, IconKey, IconShieldCheck } from '@tabler/icons-react';

import logo from '@assets/images/logo.png';

import Footer from '@layout/footer/footer';
import NavigationHeader from '@layout/navigation/navigationHeader';

import Feature from '@components/feature/feature';

function HomePage() {
    return (
        <>
            <NavigationHeader />

            <div className="page-wrapper">
                <div className="container-xl py-4">
                    <div className="row">
                        <div className="col-lg-6 g-3">
                            <h1 className="display-4 text-primary fw-semibold lh-1 mb-3">Safe Secrets</h1>
                            <p className="display-6 lh-sm fw-light">
                                The place where you can forget. Store all of your passwords and any other sensitive
                                data.
                            </p>
                        </div>
                        <div className="col-10 col-sm-8 col-lg-6">
                            <img
                                src={logo}
                                className="d-block mx-lg-auto img-fluid"
                                alt="Safe secrets"
                                width={300}
                                height={200}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
                <div className="container-xl">
                    <div className="row justify-content-around text-center mt-3">
                        <Feature
                            icon={<IconShieldCheck color="#3b8acb" size={70} />}
                            description="Excellent Cybersecurity"
                        />
                        <Feature icon={<IconKey color="#6A0DAD" size={70} />} description="Encryption Algorithms" />
                        <Feature icon={<IconFlask2 color="#50C878" size={70} />} description="Newest Technology" />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default HomePage;
