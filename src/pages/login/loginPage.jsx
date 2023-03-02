import React from 'react';
import LoginCard from '../../components/loginCard/loginCard';

function Login() {
    return (
        <div className="page page-center">
            <div className="container container-tight py-5">
                <div className="text-center mb-4">
                    <a href="." className="navbar-brand navbar-brand-autodark">
                        <img src="/assets/images/logo.png" height={52} alt="" />
                        <h1 className="ms-2">Safe Secrets</h1>
                    </a>
                </div>
                <LoginCard />
                <div className="text-center text-muted mt-3">
                    Don&apos;t have account yet?
                    <a className="ms-1" href="/sign-up" tabIndex={-1}>
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;
