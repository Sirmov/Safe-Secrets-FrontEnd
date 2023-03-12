import React from 'react';

import { IconBrandGithub, IconBrandTwitter, IconEye } from '@tabler/icons-react';

function LoginCard() {
    return (
        <article className="card card-md">
            <div className="card-body">
                <h2 className="h2 text-center mb-4">Login to your account</h2>
                <form action="./" method="get" autoComplete="off" noValidate>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" placeholder="your@email.com" autoComplete="off" />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">
                            Password
                            <span className="form-label-description">
                                <a href="./forgot-password.html">Forgot password?</a>
                            </span>
                        </label>
                        <div className="input-group input-group-flat">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="your_secret_password"
                                autoComplete="off"
                            />
                            <span className="input-group-text">
                                <a
                                    href="#"
                                    className="link-secondary"
                                    data-bs-toggle="tooltip"
                                    aria-label="Show password"
                                    data-bs-original-title="Show password">
                                    <IconEye className="icon" color="currentColor" stroke={2} size={24} />
                                </a>
                            </span>
                        </div>
                    </div>
                    <div className="mb-2">
                        <label className="form-check">
                            <input type="checkbox" className="form-check-input" />
                            <span className="form-check-label">Remember me on this device</span>
                        </label>
                    </div>
                    <div className="form-footer">
                        <button type="submit" className="btn btn-primary w-100">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
            <div className="hr-text">or</div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <a href="#" className="btn w-100">
                            <IconBrandGithub className="icon" color="currentColor" stroke={2} size={24} />
                            Login with Github
                        </a>
                    </div>
                    <div className="col">
                        <a href="#" className="btn w-100">
                            <IconBrandTwitter className="icon" color="#1da1f2" stroke={2} size={24} />
                            Login with Twitter
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default LoginCard;
