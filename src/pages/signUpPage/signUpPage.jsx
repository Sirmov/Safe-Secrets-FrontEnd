import React from 'react';

import { Link } from 'react-router-dom';

import logo from '@assets/images/logo.png';

import SignUpCard from '@components/signUpCard/signUpCard';

function SignUpPage() {
    return (
        <div className="page page-center">
            <div className="container container-tight py-5">
                <div className="text-center mb-4">
                    <Link to="/" className="navbar-brand">
                        <img src={logo} height={52} alt="" />
                        <h1 className="ms-2">Safe Secrets</h1>
                    </Link>
                </div>
                <SignUpCard />
                <div className="text-center text-muted mt-3">
                    Already have account?
                    <Link to="/login" className="ms-1" tabIndex={-1}>
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
